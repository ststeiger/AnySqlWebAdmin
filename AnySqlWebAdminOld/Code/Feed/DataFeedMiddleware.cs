
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;


// https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-2.1&tabs=aspnetcore2x
// https://www.thomaslevesque.com/2018/03/27/understanding-the-asp-net-core-middleware-pipeline/
// https://stackoverflow.com/questions/38630076/asp-net-core-web-api-exception-handling
// https://dusted.codes/error-handling-in-aspnet-core
// https://blog.dudak.me/2017/error-handling-in-asp-net-core-applications/
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
namespace AnySqlWebAdmin
{


    public class DataFeedMiddleware
    {

        protected readonly Microsoft.AspNetCore.Http.RequestDelegate _next;
        
        
        public DataFeedMiddleware(Microsoft.AspNetCore.Http.RequestDelegate next)
        {
            this._next = next;
        }



        private static string[] ParseAuthHeader(string authHeader)
        {
            // Check if this is a Basic Auth header 
            if (
                authHeader == null ||
                authHeader.Length == 0 ||
                !authHeader.StartsWith("Basic", System.StringComparison.InvariantCultureIgnoreCase)
            ) return null;

            // Pull out the Credentials with are seperated by ':' and Base64 encoded 
            string base64Credentials = authHeader.Substring(6);
            string[] credentials = System.Text.Encoding.ASCII.GetString(
                  System.Convert.FromBase64String(base64Credentials)
            ).Split(':');

            if (credentials.Length != 2 ||
                string.IsNullOrEmpty(credentials[0]) || string.IsNullOrEmpty(credentials[0])
            )
                return null;

            return credentials;
        } // End Function ParseAuthHeader


        private static bool TryGetPrincipal(string[] creds, out System.Security.Principal.IPrincipal principal)
        {
            if (creds[0] == "Administrator" && creds[1] == "SecurePassword")
            {
                principal = new System.Security.Principal.GenericPrincipal(
                   new System.Security.Principal.GenericIdentity("Administrator"),
                   new string[] { "Administrator", "User" }
                );
                return true;
            }
            else if (creds[0] == "JoeBlogs" && creds[1] == "Password")
            {
                principal = new System.Security.Principal.GenericPrincipal(
                   new System.Security.Principal.GenericIdentity("JoeBlogs"),
                   new string[] { "User" }
                );
                return true;
            }
            else if (!string.IsNullOrEmpty(creds[0]) && !string.IsNullOrEmpty(creds[1]))
            {
                // GenericPrincipal(GenericIdentity identity, string[] Roles)
                principal = new System.Security.Principal.GenericPrincipal(new System.Security.Principal.GenericIdentity(creds[0]),
                    new string[] { "Administrator", "User" }
                );
                return true;
            }
            else
            {
                principal = null;
            }
            
            return false;
        } // End Function TryGetPrincipal 


        // http://blogs.msdn.com/b/odatateam/archive/2010/07/21/odata-and-authentication-part-6-custom-basic-authentication.aspx
        public static bool Authenticate(HttpContext context)
        {
            // One should be able to test on a developer system without https
            // if (!context.Request.IsSecureConnection) return false;

            string authHeader = context.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(authHeader))
                return false;

            string[] credentials = ParseAuthHeader(authHeader);
            System.Console.WriteLine(credentials);

            System.Security.Principal.IPrincipal principal = default(System.Security.Principal.IPrincipal);
            if (TryGetPrincipal(credentials, out principal))
            {
                context.User= new System.Security.Claims.ClaimsPrincipal(principal);
                return true;
            }

            return false;
        } // End Function Authenticate 


        // https://stackoverflow.com/questions/38977088/asp-net-core-web-api-authentication
        public async System.Threading.Tasks.Task Invoke(Microsoft.AspNetCore.Http.HttpContext context)
        {
            // Do some request logic here.
            
            // Do some response logic here.
            // context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
            // throw new Exception("YaY");
            

            try
            {
#if true // USE_BASIC_AUTH

                if (!Authenticate(context))
                {
                    context.Response.StatusCode = 401;
                    context.Response.Headers["WWW-Authenticate"] = "Basic";
                    context.Response.Headers["X-Status-Message"] = "401 Unauthorized";

                    await System.Threading.Tasks.Task.CompletedTask;
                    return;
                }
#endif

                string table_name = "";

                if (context.Request.Path.HasValue)
                { 
                    string[] splittedPath = context.Request.Path.Value.Split('/', System.StringSplitOptions.RemoveEmptyEntries);
                    string[] arguments = new string[splittedPath.Length - 1];
                    System.Array.Copy(splittedPath, 1, arguments, 0, splittedPath.Length - 1);
                    table_name = string.Join('/', arguments);
                }
                


                await AnySqlDataFeed.DataFeed.SendFeed(context, table_name);
                
                // throw new Exception("SQL error");
                // await context.Response.WriteAsync("Howdy");
                // context.Response.StatusCode = 500;
            } // End Try 
            catch (System.Exception ex)
            {
                // header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
                // header("HTTP/1.0 500 Internal Server Error");
                // header('HTTP/1.1 200 OK');

                // context.Response.Headers["HTTP/1.0 500 Internal Server Error"] = "";
                context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
                context.Response.Headers["X-Error-Message"] = ex.Message;

                context.Response.ContentType = "text/plain";
                await context.Response.WriteAsync(ex.Message);
                await context.Response.WriteAsync(System.Environment.NewLine);
                await context.Response.WriteAsync(ex.StackTrace);


                // SqlException se = new SqlException(ex.Message, sql, pars, context, ex);
                // se.ToJSON(context.Response.Body);

                //await context.Response.WriteAsync(ex.Message);
                //await context.Response.WriteAsync(System.Environment.NewLine);
                //await context.Response.WriteAsync(System.Environment.NewLine);
                //await context.Response.WriteAsync(ex.StackTrace);
                //await context.Response.WriteAsync(System.Environment.NewLine);
                //await context.Response.WriteAsync(System.Environment.NewLine);
                //await context.Response.WriteAsync(sql);
                //await context.Response.WriteAsync(System.Environment.NewLine);
                //await context.Response.WriteAsync(System.Environment.NewLine);
                //await context.Response.WriteAsync(System.Convert.ToString(pars));
                System.Console.WriteLine();
            } // End Catch 

            // Does not need to be called
            // await this._next.Invoke(context).ConfigureAwait(false);
        } // End Async Invoke 


    } // End Class SqlMiddleware 
    

    public static class DataFeedMiddlewareExtensions
    {

        public static Microsoft.AspNetCore.Builder.IApplicationBuilder UseDataFeedMiddleware(
            this Microsoft.AspNetCore.Builder.IApplicationBuilder app)
        {
            // return app.UseMiddleware<SqlMiddleware>();

            // app.UseWhen(context => context.Request.Path.StartsWithSegments("/blob"), appBuilder => { }

            // https://www.devtrends.co.uk/blog/conditional-middleware-based-on-request-in-asp.net-core
            app.UseWhen(
                delegate(Microsoft.AspNetCore.Http.HttpContext context) 
                {
                    return context.Request.Path.StartsWithSegments("/DataFeed");
                }
                , delegate(Microsoft.AspNetCore.Builder.IApplicationBuilder appBuilder )
                {
                    // appBuilder.UseStatusCodePagesWithReExecute("/apierror/{0}");
                    appBuilder.UseMiddleware<DataFeedMiddleware>();
                    //appBuilder.UseExceptionHandler("/apierror/500");
                }
            );

            return app;
        } // End Function UseSqlMiddleware 


    } // End Class SqlMiddlewareExtensions 


} // End Namespace AnySqlWebAdmin 
