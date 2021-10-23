
using Dapper;
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

        protected SqlService m_service; 
        protected readonly Microsoft.AspNetCore.Http.RequestDelegate _next;
        
        
        public SqlMiddleware(Microsoft.AspNetCore.Http.RequestDelegate next, SqlService service)
        {
            this._next = next;
            this.m_service = service;
        }
        
        
        public async System.Threading.Tasks.Task Invoke(Microsoft.AspNetCore.Http.HttpContext context)
        {
            // Do some request logic here.
            // await this._next.Invoke(context).ConfigureAwait(false);


            // Do some response logic here.
            // context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
            // throw new Exception("YaY");
            string sql = null;
            System.Collections.Generic.Dictionary<string, object> pars = null;

            try
            {   
                pars = await SqlServiceHelper.GetParameters(context);
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


                using (System.Data.Common.DbConnection cnn = this.m_service.Connection)
                {
                    System.Exception hasErrors = await cnn.AsJSON(context.Response.Body,sql, format, pars);

                    if (hasErrors != null)
                    {
                        // TOOD: Log if not NULL
                        throw new System.Exception("SQL-Error", hasErrors);
                    }
                    
                }
                

                // await SqlServiceJsonHelper.AnyDataReaderToJson(sql, pars, context, format);
                
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

                SqlException se = new SqlException(ex.Message, sql, pars, context, ex);
                se.ToJSON(context.Response.Body);
                
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

        } // End Async Invoke 


    } // End Class SqlMiddleware 
    

    public static class SqlMiddlewareExtensions
    {

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
        } // End Function UseSqlMiddleware 


    } // End Class SqlMiddlewareExtensions 


} // End Namespace AnySqlWebAdmin 
