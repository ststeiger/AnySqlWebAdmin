
using Dapper;
using System.Linq;


namespace AnySqlWebAdmin.Code.SqlMerge
{
    
    
    public class MergeInfo
    {
        public string column_name;
        public string column_sql_datatype;
        public string column_of_pk;
        public int is_identity;
    }


    public class MergeTst
    {
        
        
        private static string GetMergeCommand(string table_schema, string table_name, bool with_merge,
            System.Collections.Generic.IEnumerable<MergeInfo> mis, System.Text.StringBuilder xml)
        {
            xml = xml.Replace("'", "''");

            string[] selectColumns = mis.Select(x => x.column_name).ToArray();
            string[] xqueryColumns = mis.Select(x =>
                "\"" + x.column_name + "\" " + x.column_sql_datatype + " '" + x.column_name +
                "[not(@*[local-name()=\"nil\" and . =\"true\"])]'").ToArray();
            // "BE_Name" character varying(50) 'BE_Name[not(@*[local-name()="nil" and . ="true"])]'
            string[] pkColumns = mis.Where(x => x.column_of_pk != null).Select(x => x.column_of_pk).ToArray();
            string[] updateColumns = mis.Where(x => x.column_of_pk == null)
                .Select(x => "A." + x.column_name + " = CTE." + x.column_name + " ").ToArray();
            bool is_identity = mis.Any(x => x.is_identity == 1);


            const string padding = "    ";
            const string double_padding = padding + padding;

            string select = double_padding + " " +
                            string.Join(" " + System.Environment.NewLine + double_padding + ",", selectColumns);
            string from = double_padding + " " +
                          string.Join(" " + System.Environment.NewLine + double_padding + ",", xqueryColumns);

            string insert = double_padding + " " +
                            string.Join(" " + System.Environment.NewLine + double_padding + ",", selectColumns);
            string insert_select = double_padding + " CTE." +
                                   string.Join(" " + System.Environment.NewLine + double_padding + ",CTE.", selectColumns);

            string[] joinConditions = pkColumns.Select(x => "CTE." + x + " = A." + x).ToArray();
            string joinCondition = string.Join(" AND ", joinConditions);


            string updateStatement =
                string.Join(System.Environment.NewLine + double_padding + padding + ",", updateColumns);


            xml.Insert(0, $@"
/* 
-- How to create the XML 
DECLARE @xml XML 
SET @xml = ( SELECT ( 

SELECT * FROM {table_schema}.{table_name} 

FOR XML PATH('row'), ROOT('table'),  ELEMENTS xsinil) AS outerXml ) 
SELECT @xml 
*/ 


DECLARE @xml xml 
SET @xml = N'");


            xml.Append(@"'


DECLARE @handle int 
DECLARE @PrepareXmlStatus int 

EXEC @PrepareXmlStatus = sp_xml_preparedocument @handle OUTPUT, @XML 
-- EXEC @PrepareXmlStatus = sp_xml_preparedocument @handle OUTPUT, 'C:\Export1\med_Form.xml' 

");


            if (with_merge && is_identity)
                xml.Append($@"
SET IDENTITY_INSERT {table_schema}.{table_name} ON; 
");

            xml.Append($@"
;WITH CTE AS 
( 
    SELECT 
{select} 
    FROM OPENXML(@handle, '/table/row', 2) WITH 
    ( 
{from} 
    ) AS tSource 
    
    -- TODO: INNER JOIN ON FOREIGN KEYS 
    
    WHERE (1=1) 
    
    /* 
    AND NOT EXISTS 
    ( 
	    SELECT T_Benutzer.* FROM T_Benutzer WHERE T_Benutzer.BE_ID = tSource.BE_ID 
    ) 
    */ 
) 
");
            if (with_merge)
                xml.Append("-- ");


            xml.Append(@"SELECT * FROM CTE 
");

            if (with_merge)
            {
                xml.Append($@"


MERGE INTO {table_schema}.{table_name} AS A 
USING CTE ON {joinCondition} 
WHEN MATCHED THEN 
    UPDATE 
        SET  {updateStatement}

WHEN NOT MATCHED BY TARGET THEN 
    INSERT 
    ( 
");
                xml.Append(insert);
                xml.AppendLine(@" 
    ) 
    VALUES 
    ( ");
                xml.Append(insert_select);

                xml.Append(@" 
    ) 
-- WHEN NOT MATCHED BY SOURCE THEN DELETE 
;


EXEC sp_xml_removedocument @handle 
");

                if (is_identity)
                {
                    xml.Append($@"
SET IDENTITY_INSERT {table_schema}.{table_name} OFF; 
");
                }
            } // End if (with_merge)

            return xml.ToString();
        } // End Function GetMergeCommand 


        public static void Test()
        {
            SqlService service = new SqlService();
            // System.Collections.Generic.Dictionary<string, object> pars = null;
            // service.AddParameterList(pars);
            
            string table_schema = "dbo";
            string table_name = "T_VWS_ZO_SVG_AP_Objekt";
            table_name = "T_AP_Standort";
            table_name = "T_AP_Gebaeude";

            table_name = "T_Benutzer";
            table_name = "T_Benutzergruppen";
            table_name = "T_Benutzerrechte";
            table_name = "T_SYS_Registerrechte";
            table_name = "T_SYS_AdresseRollenrechte";
            table_name = "T_SYS_Form_Register_Recht";
            table_name = "T_SYS_Form_Feld_Recht";
            table_name = "T_SYS_Layersetrechte";
            table_name = "T_SYS_Backofficerechte";
            table_name = "T_SYS_BackOfficeMenuerechte";

            using (System.Data.Common.DbConnection conn = service.Connection)
            {
                Test(table_schema, table_name, conn);
            } // End Using conn 
            
        } // End Sub Test 


        /*
         Kannst du vom Projekt https://corpool.cor-asp.ch/FM_StadtBasel/w8/index.html die Benutzergruppen 
         Administratoren, Power-User, Provider, R-User und W-User mit allen Berechtigungen in das Projekt 
         https://cordemo.cor-asp.ch/FM_COR_Demo_V4/w8/index.html Übernehmen?

Und in Zukunft im Skript für die neuen Projekte alle Benutzergruppen rauslöschen ausser die 5 oben erwähnten?

             */

        public static void Test(string table_schema, string table_name, System.Data.Common.DbConnection conn)
        {
            string sql = System.IO.Path.Combine("SQL", "Schema.Merge.sql");
            sql = System.IO.File.ReadAllText(sql, System.Text.Encoding.UTF8);

            System.Text.StringBuilder xml;
            System.Collections.Generic.IEnumerable<MergeInfo> mis = null;

            mis = conn.Query<MergeInfo>(sql, new {__table_schema = table_schema, __table_name = table_name});
            string xml1 = conn.ExecuteScalar<string>($@"DECLARE @xml XML 
SET @xml = (SELECT( 

SELECT * FROM {table_schema}.{table_name} 

FOR XML PATH('row'), ROOT('table'), ELEMENTS xsinil) AS outerXml ) 
SELECT @xml "
            );


            using (System.Data.IDataReader reader = conn.ExecuteReader($"SELECT * FROM {table_schema}.{table_name} ;"))
            {
                xml = LargeDataToXML(table_schema, table_name, reader);
            }
            
            string cmd = GetMergeCommand(table_schema, table_name, true, mis, xml);
            System.Console.WriteLine(cmd);
        } // End Sub Test 


        public class StringWriterWithEncoding
            : System.IO.StringWriter
        {
            private readonly System.Text.Encoding m_Encoding;


            public StringWriterWithEncoding(System.Text.StringBuilder sb, System.Text.Encoding encoding)
                : base(sb)
            {
                this.m_Encoding = encoding;
            }


            public override System.Text.Encoding Encoding
            {
                get { return this.m_Encoding; }
            }
        } // End Class StringWriterWithEncoding


        public static System.Text.StringBuilder LargeDataToXML(
            string table_schema
            , string table_name
            , System.Data.IDataReader dr)
        {
            System.Text.StringBuilder builder = new System.Text.StringBuilder();

            System.Xml.XmlWriterSettings xs = new System.Xml.XmlWriterSettings();
            xs.Indent = true;
            xs.IndentChars = "    ";
            xs.NewLineChars = System.Environment.NewLine;
            xs.OmitXmlDeclaration = false; // // <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            // xs.Encoding = System.Text.Encoding.UTF8; // doesn't work with pgsql 
            // xs.Encoding = new System.Text.UTF8Encoding(false);
            xs.Encoding = new System.Text.UnicodeEncoding(false, false);


            using (StringWriterWithEncoding sw = new StringWriterWithEncoding(builder, xs.Encoding))
            {
                // string exportFilename = System.IO.Path.Combine(@"d:\", table_name + ".xml");
                // using (System.Xml.XmlWriter writer = System.Xml.XmlWriter.Create(exportFilename, xs))
                using (System.Xml.XmlWriter writer = System.Xml.XmlWriter.Create(sw, xs))
                {
                    writer.WriteStartDocument(true);
                    writer.WriteStartElement("table");
                    // writer.WriteStartElement(table_name);
                    writer.WriteAttributeString(null, "table_schema", null, table_schema);
                    writer.WriteAttributeString(null, "table_name", null, table_name);

                    writer.WriteAttributeString("xmlns", "xsi", null, System.Xml.Schema.XmlSchema.InstanceNamespace);
                    // writer.WriteAttributeString("xsi", "schemaLocation", null, System.Xml.Schema.XmlSchema.InstanceNamespace);

                    int fc = dr.FieldCount;

                    string[] columnNames = new string[fc];
                    System.Type[] columnTypes = new System.Type[fc];

                    for (int i = 0; i < dr.FieldCount; ++i)
                    {
                        columnNames[i] = dr.GetName(i);
                        columnTypes[i] = dr.GetFieldType(i);
                    } // Next i 
                    
                    while (dr.Read())
                    {
                        writer.WriteStartElement("row");

                        for (int i = 0; i < fc; ++i)
                        {
                            writer.WriteStartElement(columnNames[i]);
                            object obj = dr.GetValue(i);
                            
                            if (obj != System.DBNull.Value)
                            {
                                if (object.ReferenceEquals(columnTypes[i], typeof(System.DateTime)))
                                {
                                    System.DateTime dt = (System.DateTime) obj;
                                    writer.WriteValue(dt.ToString("yyyy-MM-dd'T'HH':'mm':'ss'.'fff",
                                        System.Globalization.CultureInfo.InvariantCulture));
                                }
                                else
                                    writer.WriteValue(System.Convert.ToString(obj,
                                        System.Globalization.CultureInfo.InvariantCulture));
                            }
                            else
                                writer.WriteAttributeString("xsi", "nil",
                                    System.Xml.Schema.XmlSchema.InstanceNamespace, "true");

                            writer.WriteEndElement();
                        } // Next i

                        writer.WriteEndElement();
                    } // Whend 
                    
                    writer.WriteEndElement();
                } // End Using writer 
                
            } // End Using stringWriter 
            
            return builder;
        } // End Sub LargeDataToXML 
        
        
    } // End Class MergeTst 
    
    
}