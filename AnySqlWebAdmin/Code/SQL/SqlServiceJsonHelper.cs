
namespace AnySqlWebAdmin 
{
    
    
    [System.Flags]
    public enum RenderType_t : int
    {
        Default = 0,
        Indented = 1,
        DataTable = 2,
        Array = 4,
        Data_Only = 8,
        Columns_Associative = 16,
        Columns_ObjectArray = 32,
        WithDetail = 64,
        ShortName = 128,
        LongName = 256,
        AssemblyQualifiedName = 512
    }
    
    
    public class SqlServiceJsonHelper 
    {
        
        
        private static string GetAssemblyQualifiedNoVersionName(string input)
        {
            int i = 0;
            bool isNotFirst = false;
            while (i < input.Length)
            {
                if (input[i] == ',')
                {
                    if (isNotFirst)
                        break;

                    isNotFirst = true;
                }
                i += 1;
            }
            
            return input.Substring(0, i);
        } // GetAssemblyQualifiedNoVersionName
        
        
        private static string GetAssemblyQualifiedNoVersionName(System.Type type)
        {
            if (type == null)
                return null;

            return GetAssemblyQualifiedNoVersionName(type.AssemblyQualifiedName);
        } // GetAssemblyQualifiedNoVersionName
        
        
        private static string GetTypeName(System.Type type, RenderType_t renderType)
        {
            if (type == null)
                return null;

            if (renderType.HasFlag(RenderType_t.ShortName))
                return type.Name;

            if (renderType.HasFlag(RenderType_t.LongName))
                return type.FullName;

            if (renderType.HasFlag(RenderType_t.AssemblyQualifiedName))
                return GetAssemblyQualifiedNoVersionName(type);

            return type.Name;
        } // GetAssemblyQualifiedNoVersionName
        
        
        private static async System.Threading.Tasks.Task WriteAssociativeColumnsArray(Newtonsoft.Json.JsonTextWriter jsonWriter
            , System.Data.Common.DbDataReader dr, RenderType_t renderType)
        {
            //await jsonWriter.WriteStartObjectAsync();
            await jsonWriter.WriteStartObjectAsync();


            for (int i = 0; i <= dr.FieldCount - 1; i++)
            {
                await jsonWriter.WritePropertyNameAsync(dr.GetName(i));
                await jsonWriter.WriteStartObjectAsync();

                await jsonWriter.WritePropertyNameAsync("index");
                await jsonWriter.WriteValueAsync(i);

                if (renderType.HasFlag(RenderType_t.WithDetail))
                {
                    await jsonWriter.WritePropertyNameAsync("fieldType");
                    // await jsonWriter.WriteValueAsync(GetAssemblyQualifiedNoVersionName(dr.GetFieldType(i)));
                    await jsonWriter.WriteValueAsync(GetTypeName(dr.GetFieldType(i), renderType));
                }

                await jsonWriter.WriteEndObjectAsync();
            }

            await jsonWriter.WriteEndObjectAsync();
        } // WriteAssociativeArray
        
        
        private static async System.Threading.Tasks.Task WriteComplexArray(Newtonsoft.Json.JsonTextWriter jsonWriter, System.Data.Common.DbDataReader dr, RenderType_t renderType)
        {
            //await jsonWriter.WriteStartObjectAsync();
            await jsonWriter.WriteStartArrayAsync();

            for (int i = 0; i <= dr.FieldCount - 1; i++)
            {
                await jsonWriter.WriteStartObjectAsync();

                await jsonWriter.WritePropertyNameAsync("name");
                await jsonWriter.WriteValueAsync(dr.GetName(i));

                await jsonWriter.WritePropertyNameAsync("index");
                await jsonWriter.WriteValueAsync(i);

                if (renderType.HasFlag(RenderType_t.WithDetail))
                {
                    await jsonWriter.WritePropertyNameAsync("fieldType");
                    //await jsonWriter.WriteValueAsync(GetAssemblyQualifiedNoVersionName(dr.GetFieldType(i)));
                    await jsonWriter.WriteValueAsync(GetTypeName(dr.GetFieldType(i), renderType));
                    
                }

                await jsonWriter.WriteEndObjectAsync();
            }

            // await jsonWriter.WriteEndObjectAsync();
            await jsonWriter.WriteEndArrayAsync();
        } // WriteAssociativeArray
        
        
        private static async System.Threading.Tasks.Task WriteArray(Newtonsoft.Json.JsonTextWriter jsonWriter, System.Data.Common.DbDataReader dr)
        {
            await jsonWriter.WriteStartArrayAsync();
            for (int i = 0; i <= dr.FieldCount - 1; i++)
                await jsonWriter.WriteValueAsync(dr.GetName(i));

            await jsonWriter.WriteEndArrayAsync();
        } // End Sub WriteArray 


        public static async System.Threading.Tasks.Task AnyDataReaderToJson(
              string sql
            , System.Collections.Generic.Dictionary<string, object> pars
            , Microsoft.AspNetCore.Http.HttpContext context
            , RenderType_t format)
        {
            SqlService service = (SqlService) context.RequestServices.GetService(typeof(SqlService));
            
            using (System.Data.Common.DbConnection con = service.Connection)
            {
                
                using (System.Data.Common.DbCommand cmd = con.CreateCommand())
                {
                    cmd.CommandText = sql;
                    // cmd.CommandText = "SELECT  * FROM T_Benutzer; SELECT * FROM T_Benutzergruppen;";

                    service.AddParameterList(pars, cmd);
                    // cmd.ExecuteNonQueryAsync
                    // cmd.ExecuteReaderAsync
                    // cmd.ExecuteScalarAsync

                    using (System.Data.Common.DbDataReader dr = await cmd.ExecuteReaderAsync(
                        System.Data.CommandBehavior.SequentialAccess
                        | System.Data.CommandBehavior.CloseConnection))
                    {

                        using (System.IO.StreamWriter output = new System.IO.StreamWriter(context.Response.Body))
                        {
                            using (Newtonsoft.Json.JsonTextWriter jsonWriter =
                                new Newtonsoft.Json.JsonTextWriter(output)) // context.Response.Output)
                            {
                                if (format.HasFlag(RenderType_t.Indented))
                                    jsonWriter.Formatting = Newtonsoft.Json.Formatting.Indented;


                                context.Response.StatusCode = (int)System.Net.HttpStatusCode.OK;
                                context.Response.ContentType = "application/json";


                                await jsonWriter.WriteStartObjectAsync();

                                await jsonWriter.WritePropertyNameAsync("tables");
                                await jsonWriter.WriteStartArrayAsync();

                                do
                                {

                                    if (!format.HasFlag(RenderType_t.Data_Only) &&
                                        !format.HasFlag(RenderType_t.DataTable))
                                    {
                                        await jsonWriter.WriteStartObjectAsync();
                                        await jsonWriter.WritePropertyNameAsync("columns");

                                        if (format.HasFlag(RenderType_t.Columns_Associative))
                                        {
                                            await WriteAssociativeColumnsArray(jsonWriter, dr, format);
                                        }
                                        else if (format.HasFlag(RenderType_t.Columns_ObjectArray))
                                        {
                                            await WriteComplexArray(jsonWriter, dr, format);
                                        }
                                        else // (format.HasFlag(RenderType_t.Array))
                                        {
                                            await WriteArray(jsonWriter, dr);
                                        }
                                    } // End if (!format.HasFlag(RenderType_t.Data_Only)) 



                                    if (!format.HasFlag(RenderType_t.Data_Only) &&
                                        !format.HasFlag(RenderType_t.DataTable))
                                    {
                                        await jsonWriter.WritePropertyNameAsync("rows");
                                    } // End if (!format.HasFlag(RenderType_t.Data_Only))

                                    await jsonWriter.WriteStartArrayAsync();

                                    if (dr.HasRows)
                                    {
                                        string[] columns = null;
                                        if (format.HasFlag(RenderType_t.DataTable))
                                        {
                                            columns = new string[dr.FieldCount];
                                            for (int i = 0; i < dr.FieldCount; i++)
                                            {
                                                columns[i] = dr.GetName(i);
                                            } // Next i 
                                        } // End if (format.HasFlag(RenderType_t.DataTable)) 

                                        while (await dr.ReadAsync())
                                        {
                                            if (format.HasFlag(RenderType_t.DataTable))
                                                await jsonWriter.WriteStartObjectAsync();
                                            else
                                                await jsonWriter.WriteStartArrayAsync();

                                            for (int i = 0; i <= dr.FieldCount - 1; i++)
                                            {
                                                object obj = await dr.GetFieldValueAsync<object>(i);
                                                if (obj == System.DBNull.Value)
                                                    obj = null;

                                                if (columns != null && format.HasFlag(RenderType_t.DataTable))
                                                {
                                                    await jsonWriter.WritePropertyNameAsync(columns[i]);
                                                }

                                                await jsonWriter.WriteValueAsync(obj);
                                            } // Next i 

                                            if (format.HasFlag(RenderType_t.DataTable))
                                                await jsonWriter.WriteEndObjectAsync();
                                            else
                                                await jsonWriter.WriteEndArrayAsync();
                                        } // Whend 

                                    } // End if (dr.HasRows) 

                                    await jsonWriter.WriteEndArrayAsync();

                                    if (!format.HasFlag(RenderType_t.Data_Only) &&
                                        !format.HasFlag(RenderType_t.DataTable))
                                    {
                                        await jsonWriter.WriteEndObjectAsync();
                                    } // End if (!format.HasFlag(RenderType_t.Data_Only)) 

                                } while (await dr.NextResultAsync());
                                
                                await jsonWriter.WriteEndArrayAsync();
                                await jsonWriter.WriteEndObjectAsync();
                                
                                await jsonWriter.FlushAsync();
                                await output.FlushAsync();
                            } // jsonWriter 
                            
                        } // output 
                        
                    } // dr 
                    
                } // End Using cmd 
                
                if (con.State != System.Data.ConnectionState.Closed)
                    con.Close();
            } // con 
            
        } // End Sub WriteArray 
        
        
    } // End Class 
    
    
} // End Namespace 
