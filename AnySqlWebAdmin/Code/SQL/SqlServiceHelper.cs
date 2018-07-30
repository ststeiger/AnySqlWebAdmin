
namespace AnySqlWebAdmin
{


    public class SqlServiceHelper
    {
        private static System.Reflection.MethodInfo s_ToObjectMethodInfo;

        private static System.Reflection.MethodInfo GetToObjectMethod()
        {
            System.Reflection.MethodInfo[] mis = typeof(Newtonsoft.Json.Linq.JToken).GetMethods();

            foreach (System.Reflection.MethodInfo mi in mis)
            {
                if (!mi.IsGenericMethodDefinition)
                    continue;

                if (!"ToObject".Equals(mi.Name))
                    continue;

                System.Reflection.ParameterInfo[] pis = mi.GetParameters();
                if (pis.Length != 0)
                    continue;

                return mi;
            }

            return null;
        } // End Function GetToObjectMethod 


        static SqlServiceHelper()
        {
            s_ToObjectMethodInfo = GetToObjectMethod();
        } // End Static Constructor 



        private static System.Type MapJTokenTypeToDotNet(Newtonsoft.Json.Linq.JTokenType t)
        {
            //System.Collections.Generic.Dictionary<Newtonsoft.Json.Linq.JTokenType, System.Type> du = new System.Collections.Generic.Dictionary<Newtonsoft.Json.Linq.JTokenType, System.Type>();

            switch (t)
            {
                case Newtonsoft.Json.Linq.JTokenType.None: // None = 0
                case Newtonsoft.Json.Linq.JTokenType.Object: // Object = 1
                    return typeof(object);
                case Newtonsoft.Json.Linq.JTokenType.Array: // Array = 2
                    // return typeof(System.Array);
                    throw new System.Exception("Value type Array not mappable");
                case Newtonsoft.Json.Linq.JTokenType.Integer: // Integer = 6
                    return typeof(System.Int32);
                case Newtonsoft.Json.Linq.JTokenType.Float: // Float = 7
                    return typeof(System.Decimal);
                case Newtonsoft.Json.Linq.JTokenType.String: // String = 8
                    return typeof(System.String);
                case Newtonsoft.Json.Linq.JTokenType.Boolean: // Boolean = 9
                    return typeof(System.Boolean);
                case Newtonsoft.Json.Linq.JTokenType.Null: // Null = 10
                    return typeof(System.Object);
                case Newtonsoft.Json.Linq.JTokenType.Undefined: // Undefined = 11
                    // return typeof(System.Object);
                    throw new System.Exception("Value type Undefined not mappable.");
                case Newtonsoft.Json.Linq.JTokenType.Date: // Date = 12
                    return typeof(System.DateTime);
                case Newtonsoft.Json.Linq.JTokenType.Raw: // Date = 13
                    // return typeof(System.Object);
                    throw new System.Exception("Value type Raw not mappable.");
                case Newtonsoft.Json.Linq.JTokenType.Bytes: // Null = 14
                    return typeof(System.Byte[]);
                case Newtonsoft.Json.Linq.JTokenType.Guid: // Null = 15
                    return typeof(System.Guid);
                case Newtonsoft.Json.Linq.JTokenType.Uri: // Uri = 16
                    return typeof(System.String);
                case Newtonsoft.Json.Linq.JTokenType.TimeSpan: // Uri = 17
                    return typeof(System.TimeSpan);
                default:
                    throw new System.NotImplementedException($"JObject type mapping for type \"{t}\" not implemented.");
            } // End switch (t) 

            // Array = 2,
            // Constructor = 3,
            // Property = 4,
            // Comment = 5,
            // return null;
        } // End Function MapJTokenTypeToDotNet


        private static object GetValue(Newtonsoft.Json.Linq.JToken value, System.Type t)
        {
            // string foo1 = value.ToString();
            // string foo = value.ToObject<string>();
            // int bar = value.ToObject<int>();

            // System.Reflection.MethodInfo method = GetToObjectMethod();
            System.Reflection.MethodInfo generic = s_ToObjectMethodInfo.MakeGenericMethod(t);
            return generic.Invoke(value, null);
        } // End Function GetValue 

        private static object GetValue(Newtonsoft.Json.Linq.JToken value)
        {
            System.Type t = MapJTokenTypeToDotNet(value.Type);

            // GetValue_t getValue = GetValueDelegate(t);
            // return getValue(value);

            return GetValue(value, t);
        } // End Function GetValue 


        public static System.Collections.Generic.Dictionary<string, object>
            GetParameters(Microsoft.AspNetCore.Http.HttpContext context)
        {
            System.Collections.Generic.Dictionary<string, object>
                dict = new System.Collections.Generic.Dictionary
                <string, object>
                (System.StringComparer.InvariantCultureIgnoreCase);

            // Note: Reverse sequence: last inserted item is prefered item...


            //foreach (System.Collections.Generic.KeyValuePair<string
            //    , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Headers)
            //{
            //    dict[kvp.Key] = kvp.Value;
            //} // Next kvp 


            // Missing server-variables
            // Missing cookies

            if (context.Request.HasFormContentType)
            {
                foreach (System.Collections.Generic.KeyValuePair<string
                    , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Form)
                {
                    dict[kvp.Key] = System.Convert.ToString(kvp.Value);
                } // Next kvp 
            } // End if (context.Request.HasFormContentType) 

            //if (string.Equals(context.Request.ContentType, "application/json", System.StringComparison.InvariantCultureIgnoreCase))
            //{
            Newtonsoft.Json.Linq.JToken jsonData = null;
            
            // bool hasContent = true;
            // if (context.Request.Headers.ContainsKey(Microsoft.Net.Http.Headers.HeaderNames.ContentLength))
            // {
            //     if ("0" == context.Request.Headers[Microsoft.Net.Http.Headers.HeaderNames.ContentLength])
            //         hasContent = false;
            // } // End if (context.Request.Headers.ContainsKey(Microsoft.Net.Http.Headers.HeaderNames.ContentLength)) 


            // if (hasContent)
            // {



            // Can only be read ONCE ! 
            using (System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.Body, System.Text.Encoding.UTF8, false, 4096, true))
            {

                using (Newtonsoft.Json.JsonTextReader jsonReader = new Newtonsoft.Json.JsonTextReader(reader))
                {

                    // https://github.com/JamesNK/Newtonsoft.Json/issues/1773
                    if (jsonReader.Read())
                    {
                        jsonData = Newtonsoft.Json.Linq.JToken.Load(jsonReader);
                    } // End if (jsonReader.Read()) 

                } // End Using jsonReader 

            } // End Using reader 



            // } // End if (hasContent) 

            if (jsonData != null)
            {

                if (jsonData.Type == Newtonsoft.Json.Linq.JTokenType.Object)
                {
                    //lss = new System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>>();
                    // lss.Add(ProcessObject(jsonData));

                    Newtonsoft.Json.Linq.JObject jo = (Newtonsoft.Json.Linq.JObject)jsonData;

                    foreach (System.Collections.Generic.KeyValuePair<string, Newtonsoft.Json.Linq.JToken> kvp in jo)
                    {
                        string name = kvp.Key;
                        object value = GetValue(kvp.Value);
                        System.Console.WriteLine(value);
                        // ls.Add(new Parameter(name, value));
                        dict[name] = value;
                    } // Next kvp 

                }
                else if (jsonData.Type == Newtonsoft.Json.Linq.JTokenType.Array)
                {
                    // lss = ProcessArray(jsonData);
                    throw new System.NotImplementedException("JTokenType.Array");
                }
                else
                {
                    throw new System.InvalidOperationException(
                        "Cannot perform this operation on anything other than JSON-object, or JSON-array of JSON-object.");
                }

            } // End if (jsonData == null)

            // } // End if (string.Equals(context.Request.ContentType, "application/json", 


            if (context.Request.QueryString.HasValue)
            {
                foreach (System.Collections.Generic.KeyValuePair<string
                       , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Query)
                {
                    dict[kvp.Key] = System.Convert.ToString(kvp.Value);
                } // Next kvp 

            } // End if (context.Request.QueryString.HasValue) 

            return dict;
        } // End Function GetParameters 


    } // End Class 


} // End Namespace 
