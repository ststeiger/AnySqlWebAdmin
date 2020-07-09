
using Dapper;
using System.Collections.Generic;
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


        public static string GetMergeCommand(string table_schema, string table_name, bool with_merge, System.Collections.Generic.IEnumerable<MergeInfo> mis, System.Text.StringBuilder xml)
        {
            xml = xml.Replace("'", "''");


            string[] selectColumns = mis.Select(x => x.column_name).ToArray();
            string[] xqueryColumns = mis.Select(x => "\"" + x.column_name + "\" " + x.column_sql_datatype + " '" + x.column_name + "[not(@*[local-name()=\"nil\" and . =\"true\"])]' ").ToArray();
            // "BE_Name" character varying(50) 'BE_Name[not(@*[local-name()="nil" and . ="true"])]'
            string[] pkColumns = mis.Where(x => x.column_of_pk != null).Select(x => x.column_of_pk).ToArray();
            string[] updateColumns = mis.Where(x => x.column_of_pk == null).Select(x => "A." + x.column_name + " = CTE." + x.column_name + " ").ToArray();
            bool is_identity = mis.Any(x => x.is_identity == 1);
            

            const string padding = "    ";
            const string double_padding = padding + padding;

            string select = double_padding + " " + string.Join(System.Environment.NewLine + double_padding + ",", selectColumns);
            string from = double_padding + " " + string.Join(System.Environment.NewLine+ double_padding+",", xqueryColumns);

            string insert = double_padding + " " + string.Join(System.Environment.NewLine + double_padding + ",", selectColumns);
            string insert_select = double_padding + " CTE." + string.Join(System.Environment.NewLine + double_padding + ",CTE.", selectColumns);

            string[] joinConditions = pkColumns.Select(x => "CTE." + x + " = A." + x).ToArray();
            string joinCondition = string.Join(" AND ", joinConditions);

            
            string updateStatement = string.Join(System.Environment.NewLine + double_padding + padding + ",", updateColumns);



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


DECLARE @handle INT
DECLARE @PrepareXmlStatus INT

EXEC @PrepareXmlStatus = sp_xml_preparedocument @handle OUTPUT, @XML


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

    WHERE(1 = 1)

    /*
    AND NOT EXISTS 
    (
	    SELECT T_Benutzer.* FROM T_Benutzer WHERE T_Benutzer.BE_ID = tSource.BE_ID 
    )
    */
)
");
            if(with_merge)
                xml.Append("-- ");



            xml.Append( @"SELECT * FROM CTE 
");

            if (with_merge)
            {

                xml.Append($@"


MERGE INTO {table_schema}.{table_name} AS A 
USING CTE ON {joinCondition}
WHEN MATCHED 
	THEN UPDATE
		SET  {updateStatement}

WHEN NOT MATCHED BY TARGET THEN 
    INSERT  
    (
{insert}
    )
    VALUES
    (
{insert_select}
    )
-- WHEN NOT MATCHED BY SOURCE THEN DELETE
;


EXEC sp_xml_removedocument @handle
");

                if (is_identity)
                {
                    xml.Append( $@"
SET IDENTITY_INSERT { table_schema}.{ table_name} OFF; 
");
                }

            }

            return xml.ToString();
        }



        public static void Test()
        {
            var service = new SqlService();
            // System.Collections.Generic.Dictionary<string, object> pars = null;
            // service.AddParameterList(pars);

            string __table_schema = "dbo";
            string __table_name = "T_VWS_ZO_SVG_AP_Objekt";
            __table_name = "T_AP_Standort";
            __table_name = "T_AP_Gebaeude";
            // __table_name = "T_Benutzer";

            string sql = System.IO.Path.Combine("SQL", "Schema.Merge.sql");
            sql = System.IO.File.ReadAllText(sql, System.Text.Encoding.UTF8);

            System.Text.StringBuilder xmlBuilder;

            string xml = $@"DECLARE @xml XML
SET @xml = (SELECT(

SELECT * FROM {__table_schema}.{__table_name}

FOR XML PATH('row'), ROOT('table'), ELEMENTS xsinil) AS outerXml )
SELECT @xml";



            System.Collections.Generic.IEnumerable<MergeInfo> mis = null;

            using (var conn = service.Connection)
            {
                mis = conn.Query<MergeInfo>(sql, new { __table_schema, __table_name });
                // xml = conn.ExecuteScalar<string>(xml);

                using (System.Data.IDataReader reader = conn.ExecuteReader($"SELECT * FROM {__table_schema}.{__table_name};"))
                {
                    // use reader here
                    xmlBuilder = LargeDataToXML(__table_schema, __table_name, reader);
                }


            } // End Using conn 

            string cmd = GetMergeCommand(__table_schema, __table_name, false, mis, xmlBuilder);
            System.Console.WriteLine(cmd);
        }



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
                get
                {
                    return this.m_Encoding;
                }
            }
        }


        public static System.Text.StringBuilder LargeDataToXML(string table_schema, string table_name, System.Data.IDataReader dr)
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

                    //if (dr.HasRows)
                    {
                        int fc = dr.FieldCount;

                        string[] columnNames = new string[fc];
                        // System.Type[] columnTypes = new System.Type[fc];

                        for (int i = 0; i < dr.FieldCount; ++i)
                        {
                            columnNames[i] = dr.GetName(i);
                            // columnTypes[i] = dr.GetFieldType(i);
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
                                    if (object.ReferenceEquals(obj.GetType(), typeof(System.DateTime)))
                                    {
                                        System.DateTime t = (System.DateTime)obj;
                                        writer.WriteValue(t.ToString("yyyy-MM-dd'T'HH':'mm':'ss'.'fff", System.Globalization.CultureInfo.InvariantCulture));
                                    }
                                    else
                                        writer.WriteValue(System.Convert.ToString(obj, System.Globalization.CultureInfo.InvariantCulture));
                                }
                                else
                                    writer.WriteAttributeString("xsi", "nil", System.Xml.Schema.XmlSchema.InstanceNamespace, "true");

                                writer.WriteEndElement();
                            } // Next i

                            writer.WriteEndElement();
                        } // Whend 

                    } // End if (dr.HasRows) 

                    writer.WriteEndElement();
                } // End Using writer 

            } // End Using stringWriter 

            return builder;
        } // End Sub LargeDataToXML 



    }


}
