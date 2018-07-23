
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;


namespace AnySqlWebAdmin
{


    // https://stackoverflow.com/questions/38630076/asp-net-core-web-api-exception-handling
    public class ErrorHandlingMiddleware
    {
        private readonly Microsoft.AspNetCore.Http.RequestDelegate next;


        public ErrorHandlingMiddleware(Microsoft.AspNetCore.Http.RequestDelegate next)
        {
            this.next = next;
        } // End Constructor 


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
        } // End Task Invoke 


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
        } // End Task HandleUnsuccessfullStatusAsync 


        private static System.Threading.Tasks.Task HandleExceptionAsync(Microsoft.AspNetCore.Http.HttpContext context, System.Exception exception)
        {
            System.Net.HttpStatusCode code = System.Net.HttpStatusCode.InternalServerError; // 500 if unexpected

            // if (exception is MyNotFoundException) code = System.Net.HttpStatusCode.NotFound;
            // else if (exception is MyUnauthorizedException) code = System.Net.HttpStatusCode.Unauthorized;
            // else if (exception is MyException) code = System.Net.HttpStatusCode.BadRequest;

            string result = Newtonsoft.Json.JsonConvert.SerializeObject(
                new
                {
                    error = exception,
                    context = new HttpContextWrapper(context)
                }
            );

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        } // End Task HandleExceptionAsync 


    } // End Class ErrorHandlingMiddleware 


    public static class ErrorHandlingMiddlewareExtensions
    {
        public static Microsoft.AspNetCore.Builder.IApplicationBuilder UseErrorHandlingMiddleware(
            this Microsoft.AspNetCore.Builder.IApplicationBuilder app)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            return app;
        } // End Function UseErrorHandlingMiddleware 

    } // End Class ErrorHandlingMiddlewareExtensions 


} // End Namespace AnySqlWebAdmin 
