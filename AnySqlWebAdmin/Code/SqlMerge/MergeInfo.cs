
using Dapper;
using System.Linq;


namespace AnySqlWebAdmin.Code.SqlMerge
{
    

    public class MergeInfo
    {


        internal class MergeSchemaInfo
        {
            public string column_name;
            public string column_sql_datatype;
            public string column_of_pk;
            public int is_identity;
        } // End Class MergeInfo 


        private static string GetMergeScript(string table_schema, string table_name, bool with_merge,
            System.Collections.Generic.IEnumerable<MergeSchemaInfo> mis, System.Text.StringBuilder xml)
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

            string select = double_padding + " " + string.Join(" " + System.Environment.NewLine + double_padding + ",", selectColumns);
            string from = double_padding + " " + string.Join(" " + System.Environment.NewLine + double_padding + ",", xqueryColumns);
            string insert = double_padding + " " + string.Join(" " + System.Environment.NewLine + double_padding + ",", selectColumns);
            string insert_select = double_padding + " CTE." + string.Join(" " + System.Environment.NewLine + double_padding + ",CTE.", selectColumns);

            string[] joinConditions = pkColumns.Select(x => "CTE." + x + " = A." + x).ToArray();
            string joinCondition = string.Join(" AND ", joinConditions);


            string updateStatement = string.Join(System.Environment.NewLine + double_padding + padding + ",", updateColumns);

            if (joinCondition.Length == 0)
                throw new System.InvalidOperationException("Cannot generate MERGE-statement for table without primary-key");



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
");




                if (updateColumns.Length == 0)
                {
                    
                    xml.Append($@"-- WHEN MATCHED THEN UPDATE 
-- Syntax error on WHEN MATCHED statement with no columns in UPDATE-statement - occurs if all columns belong to the PK … 
");
                }
                else
                {

                    xml.Append($@"WHEN MATCHED THEN 
    UPDATE 
        SET  {updateStatement}
");
                }


                xml.Append($@"
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
        } // End Function GetMergeScript 


        private static System.Xml.XmlWriter CreateXmlWriter(System.Text.StringBuilder builder)
        {
            System.Xml.XmlWriterSettings xs = new System.Xml.XmlWriterSettings();
            xs.Indent = true;
            xs.IndentChars = "    ";
            xs.NewLineChars = System.Environment.NewLine;
            xs.OmitXmlDeclaration = false; // // <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            // xs.Encoding = System.Text.Encoding.UTF8; // doesn't work with pgsql 
            // xs.Encoding = new System.Text.UTF8Encoding(false);
            xs.Encoding = new System.Text.UnicodeEncoding(false, false);


            StringWriterWithEncoding sw = new StringWriterWithEncoding(builder, xs.Encoding);

            // string exportFilename = System.IO.Path.Combine(@"d:\", table_name + ".xml");
            // using (System.Xml.XmlWriter writer = System.Xml.XmlWriter.Create(exportFilename, xs))
            return System.Xml.XmlWriter.Create(sw, xs);
        } // End Function CreateXmlWriter 


        public static string MergeStatementForTable(string table_schema, string table_name, System.Data.Common.DbConnection conn)
        {
            string sql = System.IO.Path.Combine("SQL", "Schema.Merge.sql");
            sql = System.IO.File.ReadAllText(sql, System.Text.Encoding.UTF8);

            System.Collections.Generic.IEnumerable<MergeSchemaInfo> mis = conn.Query<MergeSchemaInfo>(sql, new { __table_schema = table_schema, __table_name = table_name });


            System.Text.StringBuilder xmlBuilder = new System.Text.StringBuilder();

            using (System.Xml.XmlWriter writer = CreateXmlWriter(xmlBuilder))
            {
                string dataSQL = @"


SELECT * 
FROM T_ZO_SYS_Backoffice_Table 
WHERE ZO_BOT_ID > 103 

";

               // dataSQL = null;



                conn.AsXml(table_schema, table_name, writer, dataSQL);
            } // End Using writer 

            return GetMergeScript(table_schema, table_name, true, mis, xmlBuilder);
        } // End Sub MergeStatementForTable 


        internal static void Test()
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
            table_name = "T_SYS_Navigationrechte";
            table_name = "T_SYS_Registerrechte";
            table_name = "T_SYS_AdresseRollenrechte";
            table_name = "T_SYS_Form_Register_Recht";
            table_name = "T_SYS_Form_Feld_Recht";
            table_name = "T_SYS_Layersetrechte";
            table_name = "T_SYS_Backofficerechte";
            table_name = "T_SYS_BackOfficeMenuerechte";
            table_name = "T_VWS_Ref_PaperSize";
            table_name = "T_VWS_Ref_PdfLegendenKategorie";
            table_name = "T_VWS_PdfLegende";

            
            table_name = "T_ZO_SYS_Mimetyperechte_Benutzergruppe"; // NO PK ! 
            /*
            table_name = "T_SM2_ZO_Stoerungstatus_Benutzergruppe";
            table_name = "T_SM2_ZO_StoerungStatus_Formularzone_Benutzergruppe";
            table_name = "T_VWS_ZO_DarstellungRechte_Lesen"; // TODO: Omit update if only PKs
            */

            table_name = "T_VWS_PdfBibliothek";
            table_name = "T_SYS_Language";
            table_name = "T_SYS_Language_DayNames";
            table_name = "T_SYS_Language_MonthNames";
            table_name = "T_VWS_Ref_PdfBibliotheksGruppe";
            table_name = "T_VWS_Ref_PdfBibliotheksGruppe_i18n";
            table_name = "T_VWS_Ref_PdfBibliotheksGruppe_i18n_Cust";
            table_name = "T_VWS_PdfBibliothek"; // Caution: XML-datatype...
            table_name = "T_VWS_PdfLegende";

            table_name = "T_FMS_Configuration";
            table_name = "T_FMS_Navigation";
            table_name = "T_VWS_Ref_Stempel";
            table_name = "T_VWS_ZO_Ref_Stempel_Stylizer";
            table_name = "T_VWS_Ref_Stylizer";
            table_name = "T_FMS_Translation";
            table_name = "T_ZO_SYS_Backoffice_Table";

            string cmd = null;
            using (System.Data.Common.DbConnection conn = service.Connection)
            {
                cmd = MergeStatementForTable(table_schema, table_name, conn);
            } // End Using conn 

            System.Console.WriteLine(cmd);
        } // End Sub Test 


    } // End Class MergeTst 


}