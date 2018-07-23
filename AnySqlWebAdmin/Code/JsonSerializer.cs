
namespace AnySqlWebAdmin
{


    public class JsonSerializer
    {


        public static void Serialize(object value, System.IO.Stream s, Newtonsoft.Json.Serialization.IContractResolver resolver)
        {
            using (System.IO.StreamWriter writer = new System.IO.StreamWriter(s, System.Text.Encoding.UTF8))
            using (Newtonsoft.Json.JsonTextWriter jsonWriter = new Newtonsoft.Json.JsonTextWriter(writer))
            {
                Newtonsoft.Json.JsonSerializer ser = new Newtonsoft.Json.JsonSerializer();
                ser.Formatting = Newtonsoft.Json.Formatting.Indented;

                if (resolver != null)
                    ser.ContractResolver = resolver;

                ser.Serialize(jsonWriter, value);
                
                jsonWriter.Flush();
            } // End Using jsonWriter 
        } // End Sub Serialize 


        public static void Serialize(object value, System.IO.Stream s)
        {
            Serialize(value, s, null);
        } // End Sub Serialize 


        public static void SerializeAndIgnoreSerializableInterface(object value, System.IO.Stream s)
        {
            Newtonsoft.Json.Serialization.IContractResolver resolver =
                new Newtonsoft.Json.Serialization.DefaultContractResolver()
                {
                    IgnoreSerializableInterface = true
                };

            Serialize(value, s, resolver);
        } // End Sub SerializeAndIgnoreSerializableInterface 


        public static T Deserialize<T>(System.IO.Stream s)
        {
            T retValue = default(T);

            using (System.IO.StreamReader reader = new System.IO.StreamReader(s, System.Text.Encoding.UTF8))
            {

                using (Newtonsoft.Json.JsonTextReader jsonReader = new Newtonsoft.Json.JsonTextReader(reader))
                {
                    Newtonsoft.Json.JsonSerializer ser = new Newtonsoft.Json.JsonSerializer();
                    retValue = ser.Deserialize<T>(jsonReader);
                } // End Using jsonReader  

            } // End Using reader 

            return retValue;
        } // End Function Deserialize 


    }


}
