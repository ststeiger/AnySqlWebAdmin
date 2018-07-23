
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
    
    
    public class SqlMiddleware
    {
        protected readonly Microsoft.AspNetCore.Http.RequestDelegate _next;
        
        
        public SqlMiddleware(Microsoft.AspNetCore.Http.RequestDelegate next)
        {
            this._next = next;
        }
        
        
        public async System.Threading.Tasks.Task Invoke(Microsoft.AspNetCore.Http.HttpContext context)
        {
            // Do some request logic here.
            await this._next.Invoke(context).ConfigureAwait(false);
            // Do some response logic here.
            // context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
            // throw new Exception("YaY");
            string sql = null;
            System.Collections.Generic.Dictionary<string, object> pars = null;

            try
            {   
                pars = SqlServiceHelper.GetParameters(context);
                pars["BE_Hash"] = 12435;
                pars["__stichtag"] = System.DateTime.Now.ToString("yyyyMMdd", System.Globalization.CultureInfo.InvariantCulture);
                
                if (!pars.ContainsKey("sql"))
                    throw new System.Exception("Parameter sql not provided....");

                sql = System.Convert.ToString(pars["sql"]);
                sql = System.IO.Path.Combine("SQL", sql);
                sql = System.IO.File.ReadAllText(sql, System.Text.Encoding.UTF8);
                
                
                RenderType_t format = RenderType_t.Array;
                
                if (pars.ContainsKey("format"))
                {
                    string form = System.Convert.ToString(pars["format"]);
                    int renderType = 1;
                    int.TryParse(form, out renderType);

                    format = (RenderType_t)renderType;
                } // End if (pars.ContainsKey("format")) 
                
                await SqlServiceJsonHelper.AnyDataReaderToJson(sql, pars, context, format);
                
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
                context.Response.Headers["X-Error-Message"] = "Incorrect username or password";

                context.Response.ContentType = "text/plain";

                await context.Response.WriteAsync(ex.Message);
                await context.Response.WriteAsync(System.Environment.NewLine);
                await context.Response.WriteAsync(System.Environment.NewLine);
                await context.Response.WriteAsync(ex.StackTrace);
                await context.Response.WriteAsync(System.Environment.NewLine);
                await context.Response.WriteAsync(System.Environment.NewLine);
                await context.Response.WriteAsync(sql);
                await context.Response.WriteAsync(System.Environment.NewLine);
                await context.Response.WriteAsync(System.Environment.NewLine);
                await context.Response.WriteAsync(System.Convert.ToString(pars));
                System.Console.WriteLine();
            } // End Catch 
        }


    } // End Class SqlMiddleware 


    // https://stackoverflow.com/questions/38630076/asp-net-core-web-api-exception-handling
    public class ErrorHandlingMiddleware
    {
        private readonly Microsoft.AspNetCore.Http.RequestDelegate next;


        public ErrorHandlingMiddleware(Microsoft.AspNetCore.Http.RequestDelegate next)
        {
            this.next = next;
        }


        public async System.Threading.Tasks.Task Invoke(Microsoft.AspNetCore.Http.HttpContext context /* other dependencies */)
        {
            try
            {
                await next(context);
            }
            catch (System.Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }

            //if (context.Response.StatusCode != 200 && context.Response.StatusCode != 500)
            if (context.Response.StatusCode >= 400 && context.Response.StatusCode < 500)
                await HandleUnsuccessfullStatusAsync(context);
        }


        // https://stackoverflow.com/questions/35599050/correct-way-to-notify-http-client-of-error-after-partial-response-has-been-sent
        private static System.Threading.Tasks.Task HandleUnsuccessfullStatusAsync(Microsoft.AspNetCore.Http.HttpContext context)
        {
            int code = context.Response.StatusCode;
            System.Net.HttpStatusCode hc = (System.Net.HttpStatusCode)code;

            // if (exception is MyNotFoundException) code = System.Net.HttpStatusCode.NotFound;
            // else if (exception is MyUnauthorizedException) code = System.Net.HttpStatusCode.Unauthorized;
            // else if (exception is MyException) code = System.Net.HttpStatusCode.BadRequest;

            string result = Newtonsoft.Json.JsonConvert.SerializeObject(new { error = hc.ToString() });

            context.Response.Headers.Clear();
            context.Response.Clear();
            
            context.Response.StatusCode = (int)code;
            context.Response.ContentType = "application/json";
            
            return context.Response.WriteAsync(result);
        }


        private static System.Threading.Tasks.Task HandleExceptionAsync(Microsoft.AspNetCore.Http.HttpContext context, System.Exception exception)
        {
            System.Net.HttpStatusCode code = System.Net.HttpStatusCode.InternalServerError; // 500 if unexpected

            // if (exception is MyNotFoundException) code = System.Net.HttpStatusCode.NotFound;
            // else if (exception is MyUnauthorizedException) code = System.Net.HttpStatusCode.Unauthorized;
            // else if (exception is MyException) code = System.Net.HttpStatusCode.BadRequest;

            string result = Newtonsoft.Json.JsonConvert.SerializeObject(new { error = exception.Message });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        }

    } // End Class ErrorHandlingMiddleware 



    public static class MyMiddlewareExtensions
    {
        public static Microsoft.AspNetCore.Builder.IApplicationBuilder UseErrorHandlingMiddleware(
            this Microsoft.AspNetCore.Builder.IApplicationBuilder app)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            return app;
        }


            public static Microsoft.AspNetCore.Builder.IApplicationBuilder UseSqlMiddleware(
            this Microsoft.AspNetCore.Builder.IApplicationBuilder app)
        {
            // return app.UseMiddleware<SqlMiddleware>();

            // app.UseWhen(context => context.Request.Path.StartsWithSegments("/blob"), appBuilder => { }

            // https://www.devtrends.co.uk/blog/conditional-middleware-based-on-request-in-asp.net-core
            app.UseWhen(
                delegate(Microsoft.AspNetCore.Http.HttpContext context) 
                {
                    return context.Request.Path.StartsWithSegments("/sql")
                    || context.Request.Path.StartsWithSegments("/ajax/AnySelect.ashx");
                }
                , delegate(Microsoft.AspNetCore.Builder.IApplicationBuilder appBuilder )
                {
                    // appBuilder.UseStatusCodePagesWithReExecute("/apierror/{0}");
                    appBuilder.UseMiddleware<SqlMiddleware>();
                    //appBuilder.UseExceptionHandler("/apierror/500");
                }
            );

            return app;
        }

    } // End Class MyMiddlewareExtensions 


}

