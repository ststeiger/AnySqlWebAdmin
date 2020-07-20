
using Microsoft.ApplicationInsights.Extensibility.Implementation.Tracing;

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
            } // Next mi 

            return null;
        } // End Function GetToObjectMethod 


        static SqlServiceHelper()
        {
            s_ToObjectMethodInfo = GetToObjectMethod();
        }


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


        public static System.Collections.Generic.Dictionary<string, object>
            GetParameters(Microsoft.AspNetCore.Http.HttpContext context)
        {
            // Note: 
            // Reverse sequence: last inserted item is prefered item...
            // Missing server-variables
            // Missing cookies
            System.Collections.Generic.Dictionary<string, object> dict = null;

            //foreach (System.Collections.Generic.KeyValuePair<string
            //    , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Headers)
            //{
            //    dict[kvp.Key] = kvp.Value;
            //} // Next kvp 


            System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>> lss = GetJsonObjectAsParameterList(context);
            if (lss != null && lss.Count == 1)
            {
                dict = lss[0];
            }
            else
            {
                dict = new System.Collections.Generic.Dictionary<string, object>
                        (System.StringComparer.InvariantCultureIgnoreCase);
            }
            

            if (context.Request.HasFormContentType)
            {
                foreach (System.Collections.Generic.KeyValuePair<string
                    , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Form)
                {
                    if (ParameterNameHelper.IsInvalid(kvp.Key))
                        continue;

                    dict[kvp.Key] = System.Convert.ToString(kvp.Value);
                } // Next kvp 

            } // End if (context.Request.HasFormContentType) 

            if (context.Request.QueryString.HasValue)
            {
                foreach (System.Collections.Generic.KeyValuePair<string
                       , Microsoft.Extensions.Primitives.StringValues> kvp in context.Request.Query)
                {
                    if (ParameterNameHelper.IsInvalid(kvp.Key))
                        continue;

                    dict[kvp.Key] = System.Convert.ToString(kvp.Value);
                } // Next kvp 

            } // End if (context.Request.QueryString.HasValue) 

            return dict;
        }


        public static System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>>
            GetJsonObjectAsParameterList(Microsoft.AspNetCore.Http.HttpContext context)
        {
            System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>> lss = new System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>>();

            // Contenct can be JSON, and content type is wrong ... 
            //if (string.Equals(context.Request.ContentType, "application/json", System.StringComparison.InvariantCultureIgnoreCase))
            //{
            Newtonsoft.Json.Linq.JToken jsonData = null;


            // Can only be read ONCE ! 
            using (System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.Body, System.Text.Encoding.UTF8, false, 4096, true))
            {

                using (Newtonsoft.Json.JsonTextReader jsonReader = new Newtonsoft.Json.JsonTextReader(reader))
                {

                    // https://github.com/JamesNK/Newtonsoft.Json/issues/1773
                    if (jsonReader.Read())
                    {
                        jsonData = Newtonsoft.Json.Linq.JToken.Load(jsonReader);

                        if (jsonData != null)
                        {
                            lss = Json2List(jsonData);
                        } // End if (jsonData == null)

                    } // End if (jsonReader.Read()) 

                } // End Using jsonReader 

            } // End Using reader 

            // } // End if (string.Equals(context.Request.ContentType, "application/json", 

            return lss;
        } // End Function GetParameters 




        // private delegate object GetValue_t(Newtonsoft.Json.Linq.JToken val);


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


        private static System.Collections.Generic.Dictionary<string, object> ProcessObject(Newtonsoft.Json.Linq.JToken json)
        {
            if (json == null)
                throw new System.ArgumentNullException(nameof(json));

            System.Collections.Generic.Dictionary<string, object> lss = new System.Collections.Generic.Dictionary<string, object>(System.StringComparer.OrdinalIgnoreCase);
            Newtonsoft.Json.Linq.JObject jo = (Newtonsoft.Json.Linq.JObject)json;

            foreach (System.Collections.Generic.KeyValuePair<string, Newtonsoft.Json.Linq.JToken> kvp in jo)
            {
                string name = kvp.Key;
                object value = GetValue(kvp.Value);
                System.Console.WriteLine(value);

                if (ParameterNameHelper.IsInvalid(name))
                    continue;

                lss.Add(name, value);
            }

            return lss;
        } // ProcessObject


        private static System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>> ProcessArray(Newtonsoft.Json.Linq.JToken json)
        {
            if (json == null)
                throw new System.ArgumentNullException(nameof(json));

            System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>> lss = new System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>>();
            Newtonsoft.Json.Linq.JArray jsonArray = (Newtonsoft.Json.Linq.JArray)json;

            for (int i = 0; i < jsonArray.Count; ++i)
            {
                Newtonsoft.Json.Linq.JToken jtoken = jsonArray[i];

                if (jtoken.Type != Newtonsoft.Json.Linq.JTokenType.Object)
                    throw new System.InvalidCastException("This is not a JSON-object");

                lss.Add(ProcessObject(jtoken));
            }

            return lss;
        } // ProcessArray 


        public static System.Collections.Generic.List<
            System.Collections.Generic.Dictionary<string, object>
        > Json2List(Newtonsoft.Json.Linq.JToken jsonData)
        {
            System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>> lss;

            if (jsonData.Type == Newtonsoft.Json.Linq.JTokenType.Object)
            {
                lss = new System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>>();
                lss.Add(ProcessObject(jsonData));
            }
            else if (jsonData.Type == Newtonsoft.Json.Linq.JTokenType.Array)
            {
                lss = ProcessArray(jsonData);
            }
            else
            {
                throw new System.InvalidOperationException(
                    "Cannot perform this operation on anything other than JSON-object, or JSON-array of JSON-object.");
            }

            return lss;
        } // End Function Json2List 


        public static System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>>
            Json2List(System.IO.Stream inputStream, System.Text.Encoding enc)
        {
            if (inputStream == null)
            {
                throw new System.ArgumentNullException(nameof(inputStream));
            } // End if (inputStream == null)

            Newtonsoft.Json.Linq.JToken jsonData = null;

            using (System.IO.TextReader tr = new System.IO.StreamReader(inputStream, enc))
            {
                using (Newtonsoft.Json.JsonTextReader jsonReader = new Newtonsoft.Json.JsonTextReader(tr))
                {
                    jsonData = Newtonsoft.Json.Linq.JToken.ReadFrom(jsonReader);
                } // End Using jsonReader 

            } // End Using tr 

            return Json2List(jsonData);
        } // End Function Json2List 


        public static System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>>
            Json2List(System.IO.Stream inputStream)
        {
            return Json2List(inputStream, System.Text.Encoding.UTF8);
        }


        public static System.Collections.Generic.List<System.Collections.Generic.Dictionary<string, object>>
            Json2List(string json)
        {
            if (string.IsNullOrEmpty(json))
            {
                throw new System.ArgumentNullException(nameof(json));
            } // End if (string.IsNullOrEmpty(json)) 

            Newtonsoft.Json.Linq.JToken jsonData = Newtonsoft.Json.Linq.JToken.Parse(json);
            return Json2List(jsonData);
        } // End Function Json2List 


    } // End Class SqlServiceHelper 


} // End Namespace AnySqlWebAdmin 
