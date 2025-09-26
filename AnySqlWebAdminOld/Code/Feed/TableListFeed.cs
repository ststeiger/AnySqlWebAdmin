
using AnySqlDataFeed.XML;


namespace AnySqlDataFeed.OData 
{


    public class SQL
    {

        public static System.Data.DataTable GetDataTable(string sql)
        {
            System.Data.DataTable dt = new System.Data.DataTable();

            System.Data.SqlClient.SqlConnectionStringBuilder csb = new System.Data.SqlClient.SqlConnectionStringBuilder();
            csb.DataSource = System.Environment.MachineName + @"\SQLEXPRESS";
            csb.InitialCatalog = "COR_Basic_Demo_V4";
            
            csb.IntegratedSecurity = true;

            using (System.Data.SqlClient.SqlDataAdapter da = new System.Data.SqlClient.SqlDataAdapter(sql, csb.ConnectionString))
            {
                da.Fill(dt);
            }

            return dt;
        }
    }




    public class TableListFeed
    {
        

        public static AnySqlDataFeed.XML.Service GetSerializationData(System.Uri url)
        {
            AnySqlDataFeed.XML.Service ser = new AnySqlDataFeed.XML.Service();
            ser.Base = "http://localhost:5570/ExcelDataFeed.svc/";
            ser.Base = "http://localhost:54129/DataFeed";


            //ser.Base = url.Scheme + "://" + url.Authority + (System.Web.Hosting.HostingEnvironment.ApplicationVirtualPath + "/").Replace("//", "/") + "ajax/ExcelDataFeed.ashx";
            ser.Base = url.Scheme + "://" + url.Authority + "/DataFeed";

            if (System.Environment.OSVersion.Platform != System.PlatformID.Unix)
                ser.Xmlns = "http://www.w3.org/2007/app";

            ser.Atom = "http://www.w3.org/2005/Atom";

            ser.Workspace = new AnySqlDataFeed.XML.Workspace();
            ser.Workspace.Title = "Default";
            ser.Workspace.Collection = new System.Collections.Generic.List<AnySqlDataFeed.XML.Collection>();



            string strSQL = @"
SELECT 
     TABLE_SCHEMA AS table_schema 
    ,TABLE_NAME AS table_name 
FROM INFORMATION_SCHEMA.TABLES 
WHERE (1=1) 
AND table_schema NOT IN( 'information_schema', 'pg_catalog')
AND TABLE_TYPE = 'BASE TABLE'
AND TABLE_NAME LIKE 't\_%' ESCAPE '\'

ORDER BY TABLE_SCHEMA, TABLE_NAME 
";
            using (System.Data.DataTable dt = SQL.GetDataTable(strSQL))
            {
                foreach (System.Data.DataRow dr in dt.Rows)
                {
                    string tableName = System.Convert.ToString(dr["table_name"]);

                    ser.Workspace.Collection.Add(
                            new AnySqlDataFeed.XML.Collection()
                            {
                                Title = tableName
                                ,
                                Href = tableName
                            }
                    );
                } // Next dr 

            } // End Using System.Data.DataTable dt 

            return ser;
        }


        public static string Serialize(System.Uri url)
        {
            AnySqlDataFeed.XML.Service ser = GetSerializationData(url);
            return Tools.XML.Serialization.SerializeToXml(ser);
        }


        public static void SerializeToFile(System.Uri url)
        {
            AnySqlDataFeed.XML.Service ser = GetSerializationData(url);
            Tools.XML.Serialization.SerializeToXml(ser, @"d:\myatomtext.xml");
        }


    }
    

}
