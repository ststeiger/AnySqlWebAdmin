
namespace AnySqlWebAdmin
{


    [System.AttributeUsage(System.AttributeTargets.Parameter)]
    public class FromJSONAttribute :
        System.Attribute, Microsoft.AspNetCore.Mvc.ModelBinding.IBindingSourceMetadata
    {
        Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource Microsoft.AspNetCore.Mvc.ModelBinding.IBindingSourceMetadata.BindingSource
        {
            get
            {
                return JsonValueProviderFactory.Source;
            }
        } // End Property BindingSource 

    } // End Attribute FromJSONAttribute 


    public class JsonValueProvider 
        : Microsoft.AspNetCore.Mvc.ModelBinding.BindingSourceValueProvider
    {
        protected Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderFactoryContext m_context;
        protected Newtonsoft.Json.Linq.JObject m_data;
        

        public JsonValueProvider(
            Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource bindingSource,
            Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderFactoryContext context)
            : base(bindingSource)
        {
            this.m_context = context;
        }


        // WTF ??? 
        // Let's construct all providers, even when we don't need them... 
        // Well done MS... 
        public void Init()
        {
            if (this.m_data != null)
                return;

            if (string.Equals(this.m_context.ActionContext.HttpContext.Request.ContentType, "application/json", System.StringComparison.InvariantCultureIgnoreCase))
            {
                using (System.IO.StreamReader reader = new System.IO.StreamReader(this.m_context.ActionContext.HttpContext.Request.Body, System.Text.Encoding.UTF8))
                {
                    using (Newtonsoft.Json.JsonTextReader jsonReader = new Newtonsoft.Json.JsonTextReader(reader))
                    {
                        this.m_data = Newtonsoft.Json.Linq.JObject.Load(jsonReader);
                    } // End Using jsonReader 

                } // End Using reader 

            }
            else
            {
                throw new System.InvalidOperationException("Cannot get value from JSON when ContentType != 'application/json'...");
            }
        } // End Constructor 


        public override bool ContainsPrefix(string prefix)
        {
            Init();

            return this.m_data != null && this.m_data[prefix] != null;
        } // End Function ContainsPrefix 


        public override Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderResult 
            GetValue(string key)
        {
            if (this.m_data != null)
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

            } // End if (this.m_data != null) 

            return Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderResult.None;
        } // End Function GetValue 


    } // End Class JsonValueProvider 



    public class JsonValueProviderFactory
        : Microsoft.AspNetCore.Mvc.ModelBinding.IValueProviderFactory
    {
        public static readonly Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource Source;

        static JsonValueProviderFactory()
        {
            Source = new Microsoft.AspNetCore.Mvc.ModelBinding.BindingSource(
                    "FromJSON",
                    "FromJSON_BindingSource",
                    isGreedy: false,
                    isFromRequest: true
            );
        } // End Static Constructor 


        public System.Threading.Tasks.Task CreateValueProviderAsync(
            Microsoft.AspNetCore.Mvc.ModelBinding.ValueProviderFactoryContext context
        )
        {
            context.ValueProviders.Add( new JsonValueProvider(Source, context) );

            return System.Threading.Tasks.Task.CompletedTask;
        } // End Function CreateValueProviderAsync 


    } // End Class JsonValueProviderFactory 


} // End Namespace AnySqlWebAdmin 
