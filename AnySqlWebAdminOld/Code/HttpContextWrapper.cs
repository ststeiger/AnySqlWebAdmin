
namespace AnySqlWebAdmin 
{


    public class HttpContextWrapper
    {
        public string Protocol;
        public string Method;
        public string Url;
        public string ContentType;

        public System.Collections.Generic.IEnumerable<
            System.Collections.Generic.KeyValuePair<string, string>> Cookie;

        public System.Collections.Generic.IDictionary<string, Microsoft.Extensions.Primitives.StringValues> Headers;

        public System.Collections.Generic.IEnumerable<
            System.Collections.Generic.KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>
            > Form;

        public System.Collections.Generic.IEnumerable<
            System.Collections.Generic.KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>
            > Query;


        public HttpContextWrapper(Microsoft.AspNetCore.Http.HttpContext context)
        {
            try
            {
                this.Protocol = context.Request.Protocol;
                this.Method = context.Request.Method;

                try
                {
                    this.Url = context.Request.Scheme + "://" + context.Request.Host.Value + context.Request.Path.Value + context.Request.QueryString.Value;
                }
                catch (System.Exception ex)
                {
                    System.Console.WriteLine(ex.Message);
                }

                this.ContentType = context.Request.ContentType;
                this.Cookie = context.Request.Cookies;
                this.Headers = context.Request.Headers;
                this.Query = context.Request.Query;

                if (context.Request.HasFormContentType)
                    this.Form = context.Request.Form;
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex.Message);
            }

        } // End Constructor 


    } // End Class HttpContextWrapper 


} // End Namespace AnySqlWebAdmin 
