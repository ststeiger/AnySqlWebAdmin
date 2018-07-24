
namespace AnySqlWebAdmin 
{


    public class TreeHelper
    {


        public static void GetTreeData(
            Microsoft.AspNetCore.Http.HttpContext context,
            object parent)
        {
            if (parent == null || "null".Equals(System.Convert.ToString(parent), System.StringComparison.OrdinalIgnoreCase)
                || string.IsNullOrWhiteSpace(System.Convert.ToString(parent)))
                parent = System.DBNull.Value;

            string sql = @"
-- DECLARE  @__in_parent varchar(36)  
-- SET @__in_parent = 'F0000000-E000-0000-0000-000000000002'
-- -- SET @__in_parent =  'BEB6CD1D-5ACB-4FB1-93F4-A3F07A053DB7'
-- SET @__in_parent = NULL 

SELECT 
T_FMS_Navigation.NA_UID AS id 
    ,T_FMS_Navigation.NA_NA_UID AS parent 
    ,T_FMS_Translation.FT_DE AS text 
    --,T_FMS_Navigation.NA_Sort 

    ,CASE 
    WHEN EXISTS
(
    SELECT * 
    FROM T_FMS_Navigation AS Children 
    WHERE Children.NA_Status = 1 
AND Children.NA_NA_UID = T_FMS_Navigation.NA_UID 
    ) 
THEN 1 
ELSE 0 
END AS hasChildren 
    FROM T_FMS_Navigation 
    LEFT JOIN T_FMS_Translation ON T_FMS_Translation.FT_UID = T_FMS_Navigation.NA_FT_UID 
WHERE T_FMS_Navigation.NA_Status = 1 
AND 
(
    NA_NA_UID = @__in_parent 
OR 
(
    @__in_parent IS NULL 
AND 
    NA_NA_UID IS NULL 
    )
    )

ORDER BY 
-- T_FMS_Navigation.NA_Sort,
text 
";
            using (System.Data.Common.DbCommand cmd = new System.Data.SqlClient.SqlCommand())
            {
                cmd.CommandText = sql;
                cmd.Parameters.Add(
                    new System.Data.SqlClient.SqlParameter("__in_parent", parent)
                );

                SerializeDataTableAsAssociativeJsonArray(cmd, context, true, System.Text.Encoding.UTF8);
            }


        }// End Sub 



        public static void SerializeDataTableAsAssociativeJsonArray(
              System.Data.Common.DbCommand cmd 
            , Microsoft.AspNetCore.Http.HttpContext context 
            , bool pretty 
            , System.Text.Encoding enc) 
        {
            SqlService service = (SqlService) context.RequestServices.GetService(typeof(SqlService));
            
            using (System.IO.TextWriter sw = new System.IO.StreamWriter(context.Response.Body, enc))
            {
                
                using (Newtonsoft.Json.JsonTextWriter jsonWriter = new Newtonsoft.Json.JsonTextWriter(sw))
                {
                    if (pretty)
                        jsonWriter.Formatting = Newtonsoft.Json.Formatting.Indented;
                    
                    // jsonWriter.WriteStartObject();
                    // jsonWriter.WritePropertyName("tables");
                    // jsonWriter.WriteStartArray();
                    
                    using (System.Data.Common.DbConnection con = service.Connection)
                    {
                        cmd.Connection = con;
                        
                        if (con.State != System.Data.ConnectionState.Open)
                            con.Open();
                        
                        try
                        {
                            
                            using (System.Data.Common.DbDataReader dr = cmd.ExecuteReader(System.Data.CommandBehavior.SequentialAccess
                                 | System.Data.CommandBehavior.CloseConnection
                                ))
                            {
                                
                                do
                                {
                                    // jsonWriter.WriteStartObject(); // tbl = new Table();
                                    
                                    //jsonWriter.WritePropertyName("columns");
                                    
                                    //// WriteArray(jsonWriter, dr);
                                    //WriteAssociativeArray(jsonWriter, dr);
                                    
                                    //jsonWriter.WritePropertyName("rows");
                                    jsonWriter.WriteStartArray();
                                    
                                    if (dr.HasRows)
                                    {
                                        string[] columns = new string[dr.FieldCount];
                                        
                                        for (int i = 0; i < dr.FieldCount; i++)
                                        {
                                            columns[i] = dr.GetName(i);
                                        } // Next i 
                                        
                                        while (dr.Read())
                                        {                                            
                                            // jsonWriter.WriteStartArray(); // object[] thisRow = new object[dr.FieldCount];
                                            jsonWriter.WriteStartObject(); // tbl = new Table();
                                            
                                            for (int i = 0; i < dr.FieldCount; ++i)
                                            {
                                                jsonWriter.WritePropertyName(columns[i]);
                                                
                                                object obj = dr.GetValue(i);
                                                if (obj == System.DBNull.Value) 
                                                    obj = null;
                                                
                                                jsonWriter.WriteValue(obj);
                                            } // Next i
                                            
                                            // jsonWriter.WriteEndArray(); // tbl.Rows.Add(thisRow);
                                            jsonWriter.WriteEndObject();
                                        } // Whend 
                                        
                                    } // End if (dr.HasRows) 
                                    
                                    jsonWriter.WriteEndArray();
                                    
                                    // jsonWriter.WriteEndObject(); // ser.Tables.Add(tbl);
                                } while (dr.NextResult());
                                
                            } // End using dr 
                        }
                        catch (System.Exception ex)
                        {
                            System.Console.WriteLine(ex.Message);
                            throw;
                        }
                        
                        if (con.State != System.Data.ConnectionState.Closed)
                            con.Close();
                    } // End using con 
                    
                    // jsonWriter.WriteEndArray();
                    
                    // jsonWriter.WriteEndObject();
                    jsonWriter.Flush();
                } // End Using jsonWriter 
                
            } // End Using sw 
            
        } // End Sub SerializeDataTableAsAssociativeJsonArray 
        
        
        public void Test(Microsoft.AspNetCore.Http.HttpContext context)
        {
            object parent = context.Request.Query["id"].ToString();
            
            if (context.Request.HasFormContentType)
            {
                if (context.Request.Form != null)
                    parent = context.Request.Form["id"].ToString();
            } // End if (context.Request.HasFormContentType) 
            
            if ("null".Equals((string)parent, System.StringComparison.OrdinalIgnoreCase) || string.IsNullOrWhiteSpace((string)parent))
                parent = System.DBNull.Value;
        } // End Sub Test 
        
        
    } // End Class TreeHelper 
    
    
} // End Namespace AnySqlWebAdmin 
