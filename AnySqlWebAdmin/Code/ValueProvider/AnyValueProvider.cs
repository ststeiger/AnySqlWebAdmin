
namespace AnySqlWebAdmin
{
    // https://stackoverflow.com/questions/20488156/bind-from-custom-headers-and-request-body
    // https://www.dotnetexpertguide.com/2017/09/aspnet-core-mvc-value-provider-for.html
    // https://www.strathweb.com/2017/07/customizing-query-string-parameter-binding-in-asp-net-core-mvc/
    // https://docs.microsoft.com/en-us/aspnet/core/mvc/models/model-binding?view=aspnetcore-2.1
    // https://lbadri.wordpress.com/2014/11/23/web-api-model-binding-in-asp-net-mvc-6-asp-net-5/
    
    [System.AttributeUsage(System.AttributeTargets.Parameter)]
    public class FromAnywhereAttribute 
        : System.Attribute, Microsoft.AspNetCore.Mvc.ModelBinding.IBindingSourceMetadata
    {


        Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource Microsoft.AspNetCore.Mvc.ModelBinding.IBindingSourceMetadata.BindingSource
        {
            get
            {
                return AnywhereValueProviderFactory.Source;
            }
        } // End Property BindingSource 

    } // End Attribute FromAnywhereAttribute 


    public class AnywhereValueProvider 
        : Microsoft.AspNetCore.Mvc.ModelBinding.BindingSourceValueProvider
    {
        protected Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderFactoryContext m_context;
        protected Newtonsoft.Json.Linq.JObject m_data;

        protected bool m_Initialized;

        protected bool m_isJSON;
        protected bool m_isForm;
        protected bool m_isPost;
        protected bool m_isGet;


        public AnywhereValueProvider(
            Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource bindingSource,
            Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderFactoryContext context
        ) : base(bindingSource)
        {
            this.m_context = context;
        }


        // WTF ??? 
        // Let's construct all providers, even when we don't need them... 
        // Well done MS... 
        public void Init()
        {
            if (this.m_Initialized)
                return;

            this.m_Initialized = true;

            if (string.Equals(this.m_context.ActionContext.HttpContext.Request.ContentType, "application/json", System.StringComparison.InvariantCultureIgnoreCase))
            {
                this.m_isJSON = true;

                using (System.IO.StreamReader reader = new System.IO.StreamReader(this.m_context.ActionContext.HttpContext.Request.Body, System.Text.Encoding.UTF8))
                {
                    
                    using (Newtonsoft.Json.JsonTextReader jsonReader = new Newtonsoft.Json.JsonTextReader(reader))
                    {
                        this.m_data = Newtonsoft.Json.Linq.JObject.Load(jsonReader);
                    } // End Using jsonReader 

                } // End Using reader 
            }
            else if (this.m_context.ActionContext.HttpContext.Request.HasFormContentType)
            {
                this.m_isForm = true;
            }
            else if ("GET".Equals(this.m_context.ActionContext.HttpContext.Request.Method, System.StringComparison.InvariantCultureIgnoreCase))
            {
                this.m_isGet = true;
            }
        } // End Constructor 


        public override bool ContainsPrefix(string prefix)
        {
            Init();

            if (this.m_isJSON)
            {
                return this.m_data != null && this.m_data[prefix] != null;
            }
            if (this.m_isForm)
            {
                return this.m_context.ActionContext.HttpContext.Request.Form.ContainsKey(prefix);
            }
            else if (this.m_isGet)
            {
                return this.m_context.ActionContext.HttpContext.Request.Query.ContainsKey(prefix);
            }

            return false;
        } // End Function ContainsPrefix 


        public override Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderResult 
            GetValue(string key)
        {
            if (this.m_isJSON && this.m_data != null)
            {
                Newtonsoft.Json.Linq.JToken k = this.m_data[key];

                if (k != null)
                {
                    //string[] hello = k.Values<string>();
                    string token = k.ToObject<string>();
                    return new Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderResult(
                        new Microsoft.Extensions.Primitives.StringValues(token)
                    );
                }

            }
            else if (this.m_isForm)
            {
                if (this.m_context.ActionContext.HttpContext.Request.Form != null)
                {
                    string value = this.m_context.ActionContext.HttpContext.Request.Form[key];
                    return new Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderResult(
                        new Microsoft.Extensions.Primitives.StringValues(value)
                    );
                }
            }
            else if (this.m_isGet)
            {
                if (this.m_context.ActionContext.HttpContext.Request.Query != null)
                {
                    string value = this.m_context.ActionContext.HttpContext.Request.Query[key];
                    return new Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderResult(
                        new Microsoft.Extensions.Primitives.StringValues(value)
                    );
                }
            }

            return Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderResult.None;
        } // End Function GetValue 

    } // End Class JsonValueProvider 



    public class AnywhereValueProviderFactory 
        : Microsoft.AspNetCore.Mvc.ModelBinding.IValueProviderFactory
    {
        public static readonly Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource Source;


        static AnywhereValueProviderFactory()
        {
            Source = new Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource(
                    "FromAnywhere",
                    "FromAnywhere_BindingSource",
                    isGreedy: false,
                    isFromRequest: true);
        } // End Static Constructor 


        public System.Threading.Tasks.Task CreateValueProviderAsync(
            Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderFactoryContext context
        )
        {
            // var paramsProtector = (CryptoParamsProtector)context.ActionContext.HttpContext
            //      .RequestServices.GetService(typeof(CryptoParamsProtector));

            context.ValueProviders.Add( new AnywhereValueProvider(Source, context) );

            return System.Threading.Tasks.Task.CompletedTask;
        } // End Function CreateValueProviderAsync 


    } // End Class AnywhereValueProviderFactory 


} // End Namespace AnySqlWebAdmin 
