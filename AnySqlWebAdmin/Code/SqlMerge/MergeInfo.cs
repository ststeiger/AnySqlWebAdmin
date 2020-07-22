
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



        public static string MergeStatementForTable(System.Data.Common.DbConnection conn, string table_schema, string table_name)
        {
            return MergeStatementForTable( conn, table_schema, table_name, null);
        }


        public static string MergeStatementForTable(System.Data.Common.DbConnection conn, string table_schema, string table_name, string dataSQL
            , object param = null
            , System.Data.IDbTransaction transaction = null
            , int? commandTimeout = null
            , System.Data.CommandType? commandType = null
            )
        {
            string sql = System.IO.Path.Combine("SQL", "Schema.Merge.sql");
            sql = System.IO.File.ReadAllText(sql, System.Text.Encoding.UTF8);

            System.Collections.Generic.IEnumerable<MergeSchemaInfo> mis = conn.Query<MergeSchemaInfo>(sql, new { __table_schema = table_schema, __table_name = table_name });


            System.Text.StringBuilder xmlBuilder = new System.Text.StringBuilder();

            using (System.Xml.XmlWriter writer = CreateXmlWriter(xmlBuilder))
            {
                conn.AsXml(table_schema, table_name, writer, dataSQL, param, transaction, commandTimeout, commandType);
            } // End Using writer 

            return GetMergeScript(table_schema, table_name, true, mis, xmlBuilder);
        } // End Sub MergeStatementForTable 



        internal static void SlickListBasedOnSample()
        {
            SlickListBasedOnSample("8E5523E3-32D1-4018-0000-000000000000");
        }


        internal static void SlickListBasedOnSample(string sampleId)
        {
            string newSlickListUID = System.Guid.NewGuid().ToString();

            //return 
                SlickListBasedOnSample(sampleId, newSlickListUID);
        }


        internal static void SlickListBasedOnSample(string sampleId, string newSlickListUID)
        {

            string table_schema = "dbo";
            string table_name = null;
            string sql = null;

            sampleId = sampleId.Replace("'", "''");
            newSlickListUID = newSlickListUID.Replace("'", "''");





            SqlService service = new SqlService();
            using (System.Data.Common.DbConnection conn = service.Connection)
            {


                sql = @"
IF OBJECT_ID('tempdb..##tempSlickColumnInsertMapper') IS NOT NULL
    EXECUTE('DROP TABLE ##tempSlickColumnInsertMapper; ');
";

                conn.Execute(sql);


                table_name = "T_SYS_Language_Forms";

                sql = @"
SELECT TOP 1 
	 '" + newSlickListUID + @"' AS LANG_UID 
	,LANG_Modul 
	,LANG_Object 
	,LANG_Register 
	,LANG_Position 
	,LANG_DE 
	,LANG_FR 
	,LANG_EN 
	,LANG_IT 
	,LANG_Fieldname 
	,LANG_FieldType 
	,LANG_IsRequired 
	,LANG_Validate 
	,LANG_Reftable 
	,LANG_CheckHistory 
	,LANG_LUT_UID 
	,LANG_IsValidity 
	,CURRENT_TIMESTAMP AS LANG_ErfDate 
	,LANG_Status 
	,LANG_Tooltip_DE 
	,LANG_Tooltip_EN 
	,LANG_Tooltip_FR 
	,LANG_Tooltip_IT 
FROM T_SYS_Language_Forms 
WHERE LANG_UID = ( SELECT TOP 1 SL_LANG_UID FROM T_COR_Slicklist WHERE SL_UID = '" + sampleId + @"' ) 
";
                string slickListTitle = MergeStatementForTable(conn, table_schema, table_name, sql);





                table_name = "T_COR_Slicklist";
                sql = @"

SELECT 
	 '" + newSlickListUID + @"' AS SL_UID 
	,SL_SQL 
	,SL_SQL_onChanges 
	,SL_asyncEditorLoading 
	,SL_autoEdit 
	,SL_autoHeight 
	,SL_defaultColumnWidth 
	,SL_defaultSortString 
	,SL_editable 
	,SL_enableAddRow 
	,SL_enableCellNavigation 
	,SL_enableColumnReorder 
	,SL_forceFitColumns 
	,SL_hasCheckbox 
	,SL_headerRowHeight 
	,SL_leaveSpaceForNewRows 
	,SL_multiSelect 
	,SL_rowHeight 
	,SL_showHeaderRow 
	,SL_showTopPanel 
	,SL_Lang_DE 
	,SL_Lang_EN 
	,SL_Lang_FR 
	,SL_Lang_IT 
	,SL_groupingKey 
	,'" + newSlickListUID + @"' AS SL_LANG_UID 
FROM T_COR_Slicklist 
WHERE SL_UID = '" + sampleId + @"' 
";
                string slickList = MergeStatementForTable(conn, table_schema, table_name, sql);



                sql = @"
SELECT 
	 NEWID() AS SLCOL_UID 
	,NEWID() AS SLCOL_LANG_UID -- T_SYS_Language_Forms.LANG_UID 
	,SLCOL_UID AS old_SLCOL_UID 
	,SLCOL_LANG_UID AS old_SLCOL_LANG_UID 
-- INTO ##tempSlickColumnInsertMapper 
FROM T_COR_Ref_Slickcolumn 
-- WHERE SLCOL_SL_UID = '8E5523E3-32D1-4018-0000-000000000000' 
WHERE SLCOL_SL_UID =  '" + sampleId + @"' 
ORDER BY SLCOL_Sort 
";

                


                System.Text.StringBuilder xmlBuilder = new System.Text.StringBuilder();

                using (System.Xml.XmlWriter writer = CreateXmlWriter(xmlBuilder))
                {
                    conn.AsXml(null, null, writer, sql);
                } // End Using writer 


                string xml = xmlBuilder.ToString();
                xmlBuilder.Length = 0;
                xmlBuilder = null;


                /*
                 DECLARE @foo xml 
SET @foo = CONVERT(xml, @xmlColumnMap)


SELECT
   doc.col.value('SLCOL_UID[1]', 'uniqueidentifier') ponumber
  ,doc.col.value('SLCOL_LANG_UID[1]', 'uniqueidentifier') podate 
 
FROM @foo.nodes('//row/*') AS doc(col)

                 */


                table_name = "T_SYS_Language_Forms";
                sql = @"
SELECT 
	 SLCOL_LANG_UID AS LANG_UID
	,LANG_Modul
	,LANG_Object
	,LANG_Register
	,LANG_Position
	,LANG_DE
	,LANG_FR
	,LANG_EN
	,LANG_IT
	,LANG_Fieldname
	,LANG_FieldType
	,LANG_IsRequired
	,LANG_Validate
	,LANG_Reftable
	,LANG_CheckHistory
	,LANG_LUT_UID
	,LANG_IsValidity
	,CURRENT_TIMESTAMP AS LANG_ErfDate
	,LANG_Status
	,LANG_Tooltip_DE
	,LANG_Tooltip_EN
	,LANG_Tooltip_FR
	,LANG_Tooltip_IT
FROM ##tempSlickColumnInsertMapper 

LEFT JOIN T_SYS_Language_Forms 
	ON T_SYS_Language_Forms.LANG_UID = old_SLCOL_LANG_UID

";
                string slickListColumnNames = MergeStatementForTable(conn, table_schema, table_name, sql, new { xmlColumnMap = xml });



                table_name = "T_COR_Ref_Slickcolumn";
                sql = @"

SELECT 
	 tColumnMap.SLCOL_UID AS SLCOL_UID 
	,'" + newSlickListUID + @"' AS SLCOL_SL_UID 
	,SLCOL_MOD_UID 
	,SLCOL_LANG_DE 
	,SLCOL_LANG_EN 
	,SLCOL_LANG_FR 
	,SLCOL_LANG_IT 
	,SLCOL_Sort 
	,SLCOL_Status 
	,SLCOL_asyncPostRender 
	,SLCOL_backgroundcolorfield 
	,SLCOL_cannotTriggerInsert 
	,SLCOL_colorfield 
	,SLCOL_cssClass 
	,NULL AS SLCOL_displayfield 
	,SLCOL_editor 
	,SLCOL_field 
	,SLCOL_footer 
	,SLCOL_formatter 
	,SLCOL_headerCssClass 
	,SLCOL_minWidth 
	,SLCOL_maxWidth 
	,SLCOL_name 
	,NULL AS SLCOL_referenceTablename 
	,SLCOL_required 
	,SLCOL_requiredFieldRead 
	,SLCOL_requiredFieldWrite 
	,SLCOL_rerenderOnResize 
	,SLCOL_resizable 
	,SLCOL_show 
	,SLCOL_showInHeaderRow 
	,SLCOL_sortable 
	,NULL AS SLCOL_sorter 
	,SLCOL_tooltip 
	,SLCOL_unselectable 
	,SLCOL_width 
	,SLCOL_includeInExport 
	,SLCOL_export 
	,NULL AS SLCOL_referenceSQL 
	,tColumnMap.SLCOL_LANG_UID -- T_SYS_Language_Forms.LANG_UID 
	,0 AS SLCOL_multiple 
	,SLCOL_formatString 
FROM ##tempSlickColumnInsertMapper AS tColumnMap 

LEFT JOIN T_COR_Ref_Slickcolumn 
	ON T_COR_Ref_Slickcolumn.SLCOL_UID = tColumnMap.old_SLCOL_UID 

WHERE SLCOL_SL_UID = '" + sampleId + @"' 
-- WHERE SLCOL_SL_UID = '8E5523E3-32D1-4018-0000-000000000000' 
ORDER BY SLCOL_Sort 

";
                string slickListColumns = MergeStatementForTable(conn, table_schema, table_name, sql);




                sql = @"
IF OBJECT_ID('tempdb..##tempSlickColumnInsertMapper') IS NOT NULL
    EXECUTE('DROP TABLE ##tempSlickColumnInsertMapper; ');
";


                conn.Execute(sql);

            } // End Using conn 



        }



        internal static void Test()
        {
            SlickListBasedOnSample();

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
            table_name = "T_COR_Slicklist";
            table_name = "T_COR_Ref_Slickcolumn";
            table_name = "T_SYS_Language_Forms";



            string cmd = null;
            using (System.Data.Common.DbConnection conn = service.Connection)
            {
                cmd = MergeStatementForTable(conn, table_schema, table_name);
            } // End Using conn 

            System.Console.WriteLine(cmd);
        } // End Sub Test 


    } // End Class MergeTst 


}