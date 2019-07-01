
namespace AnySqlDataFeed
{


    public class DataFeed
    { 


        private static System.Uri GetUri(Microsoft.AspNetCore.Http.HttpRequest request)
        {
            System.UriBuilder uriBuilder = new System.UriBuilder();
            uriBuilder.Scheme = request.Scheme;
            uriBuilder.Host = request.Host.Host;

            if (request.Host.Port.HasValue)
                uriBuilder.Port = request.Host.Port.Value;

            uriBuilder.Path = request.Path.ToString();
            uriBuilder.Query = request.QueryString.ToString();
            return uriBuilder.Uri;
        } // End Function GetUri 


        // AnySqlDataFeed.DataFeed.SendFeed(tableName);
        public static async System.Threading.Tasks.Task SendFeed(Microsoft.AspNetCore.Http.HttpContext context, string tableName)
        {
            System.Uri url = GetUri(context.Request);
            Microsoft.AspNetCore.Http.HttpResponse response = context.Response;

            // application/xml;charset=utf-8

            response.Headers.Add("Cache-Control", "no-cache");
            response.Headers.Add("DataServiceVersion", "1.0;");
            response.Headers.Add("Date", "Thu, 27 Aug 2015 20:16:35 GMT");
            response.Headers.Add("X-Content-Type-Options", "nosniff");
            
            if (string.IsNullOrEmpty(tableName))
            {
                AnySqlDataFeed.XML.Service tableList = OData.TableListFeed.GetSerializationData(url);

                if (tableList != null)
                {
                    context.Response.StatusCode = 200;
                    context.Response.ContentType = "application/xml";

                    /*
                    System.Xml.XmlWriterSettings xs = new System.Xml.XmlWriterSettings();
                    xs.Indent = true;
                    xs.NewLineChars = System.Environment.NewLine;
                    xs.Encoding = System.Text.Encoding.UTF8;

                    using (var xw = System.Xml.XmlWriter.Create(response.Body, xs))
                    {
                        xw.WriteStartDocument();
                        
                        xw.WriteStartElement("service");
                        xw.WriteAttributeString("xmlns", "atom", null, "http://www.w3.org/2005/Atom");
                        
                        xw.WriteAttributeString("xmlns", "base", null, "http://localhost:3831/COR-Basic/ajax/ExcelDataFeed.ashx");
                        xw.WriteAttributeString("xmlns", "xml", null, "http://www.w3.org/XML/1998/namespace");

                        xw.WriteStartElement("workspace");
                        xw.WriteStartElement("title", "atom");
                        xw.WriteValue("Default");
                        xw.WriteEndElement(); // title

                        xw.WriteStartElement("collection");
                        xw.WriteAttributeString("href", "T_Admin");
                        xw.WriteStartElement("title", "atom");
                        xw.WriteValue("T_Admin");
                        xw.WriteEndElement(); // title
                        xw.WriteEndElement(); // collection


                        xw.WriteEndElement(); // workspace
                        xw.WriteEndDocument();
                    }
                    */

                    
                    using (System.IO.TextWriter tw = new System.IO.StreamWriter(response.Body, System.Text.Encoding.UTF8))
                    {
                        Tools.XML.Serialization.SerializeToXml(tableList, tw);
                    } // End Using tw 


                    
                } // End if (m_objectToSerialize != null) 

                await System.Threading.Tasks.Task.CompletedTask;
                return;
            } // End if (string.IsNullOrEmpty(tableName)) 

            context.Response.StatusCode = 200;
            context.Response.ContentType = "application/atom+xml;type=feed";
            using (System.IO.TextWriter tw = new System.IO.StreamWriter(response.Body, System.Text.Encoding.UTF8))
            {
                OData.TableDataFeed.GetSerializationData(tableName, tw, url);
            } // End Using tw 

            await System.Threading.Tasks.Task.CompletedTask;
        } // End Task SendFeed 


    } // End Class DataFeed 


} // End Namespace AnySqlDataFeed 
