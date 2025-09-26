﻿
using Cassandra.Data.Linq;
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
            public string is_nullable;
        } // End Class MergeInfo 

        internal class ForeignKeyRelationships
        {
            public string FK_CONSTRAINT_NAME;
            public string FK_TABLE_SCHEMA;
            public string FK_TABLE_NAME;
            public int cnt;
            public string FK_COLUMN_NAME;
            public string FK_ORDINAL_POSITION;
            public string REFERENCED_TABLE_SCHEMA;
            public string REFERENCED_TABLE_NAME;
            public string REFERENCED_COLUMN_NAME;
        }


        private static string QuoteObject(string objectName)
        {
            if (string.IsNullOrEmpty(objectName))
                throw new System.ArgumentNullException("objectName");

            return "\"" + objectName.Replace("\"", "\"\"") + "\"";
        } // End Function QuoteObject 


        private static string GetMergeScript(
              System.Data.Common.DbConnection conn 
            , string table_schema 
            , string table_name 
            , string query 
            , System.Collections.Generic.IEnumerable<MergeSchemaInfo> mis 
            , System.Text.StringBuilder xml 
            , bool with_merge 
            , bool with_remove 
            , bool with_xml 
        )
        {
            xml = xml.Replace("'", "''");
            
            if (string.IsNullOrWhiteSpace(query))
                query = "SELECT * FROM " + QuoteObject(table_schema) + "." + QuoteObject(table_name) + "; ";

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

            string select = double_padding + " " + "tSource." + string.Join(" " + System.Environment.NewLine + double_padding + ",tSource.", selectColumns);
            string from = double_padding + " " + string.Join(" " + System.Environment.NewLine + double_padding + ",", xqueryColumns);
            string insert = double_padding + " " + string.Join(" " + System.Environment.NewLine + double_padding + ",", selectColumns);
            string insert_select = double_padding + " CTE." + string.Join(" " + System.Environment.NewLine + double_padding + ",CTE.", selectColumns);

            string[] joinConditions = pkColumns.Select(x => "CTE." + x + " = A." + x).ToArray();
            string joinCondition = string.Join(" AND ", joinConditions);


            string updateStatement = string.Join(System.Environment.NewLine + double_padding + padding + ",", updateColumns);
            /*
            if (joinCondition.Length == 0)
                throw new System.InvalidOperationException("Cannot generate MERGE-statement for table without primary-key");
                */

            if(with_xml)
            xml.Insert(0, $@"
/* 
-- How to create the XML 
DECLARE @xml XML 
SET @xml = ( SELECT ( 

{query} 

FOR XML PATH('row'), ROOT('table'),  ELEMENTS xsinil) AS outerXml ) 
SELECT @xml 
*/ 


DECLARE @xml xml 
SET @xml = N'");


            if (with_xml)
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
    
    -- REM: INNER JOIN ON FOREIGN KEYS should not be done here, because this removes entries with value ""NULL"" 
");




            string sql = System.IO.Path.Combine("SQL", "Schema.ForeignKeyJOINS.sql");
            sql = System.IO.File.ReadAllText(sql, System.Text.Encoding.UTF8);

            System.Collections.Generic.IEnumerable<ForeignKeyRelationships> lsFKs = conn.Query<ForeignKeyRelationships>(sql, new { __table_schema = table_schema, __table_name = table_name });

            // INNER JOIN T_Benutzer ON T_Benutzer.BE_ID = tSource.ZO_SLCOLBE_BE_ID
            if (false && lsFKs.Count() > 0)
            {
                int i = 0;
                foreach (IGrouping<string, ForeignKeyRelationships> group in lsFKs.GroupBy(x => x.FK_CONSTRAINT_NAME))
                {
                    int j = 0;
                    foreach (ForeignKeyRelationships thisColumn in group)
                    {
                        if (j == 0)
                        {
                            xml.Append("    INNER JOIN ");
                            xml.Append(QuoteObject(thisColumn.REFERENCED_TABLE_SCHEMA));
                            xml.Append(".");
                            xml.Append(QuoteObject(thisColumn.REFERENCED_TABLE_NAME));
                            xml.Append(" AS ");
                            xml.Append("tAlias");
                            xml.Append(i.ToString().PadLeft(3, '0'));
                            xml.Append(" ");
                            xml.Append(System.Environment.NewLine);
                            xml.Append("        ON ");
                        } // End if (j == 0)
                        else
                            xml.Append("        AND ");

                        xml.Append("tAlias");
                        xml.Append(i.ToString().PadLeft(3, '0'));
                        xml.Append(".");
                        xml.Append(QuoteObject(thisColumn.REFERENCED_COLUMN_NAME));
                        xml.Append(" = tSource.");
                        xml.Append(QuoteObject(thisColumn.FK_COLUMN_NAME));
                        xml.Append(" ");
                        xml.AppendLine();
                        ++j;
                    } // Next thisColumn 

                    xml.AppendLine();
                    ++i;
                } // Next group

            } // End if (lsFKs.Count > 0) 


            xml.Append(
    $@"
    WHERE (1=1) 
");



            // AND 
            // (
            //    tSource."NA_Guide_UID" IS NULL 
            //    OR EXISTS( SELECT* FROM "dbo"."T_AP_Dokumente" AS tAlias000 WHERE tAlias000."DK_UID" = tSource."NA_Guide_UID" )
            // )

            if (lsFKs.Count() > 0)
            {
                int i = 0;
                foreach (IGrouping<string, ForeignKeyRelationships> group in lsFKs.GroupBy(x => x.FK_CONSTRAINT_NAME))
                {
                    int j = 0;
                    foreach (ForeignKeyRelationships thisColumn in group)
                    {
                        if (j == 0)
                        {
                            xml.Append(@"    AND 
    ( 
        tSource.");
                            xml.Append(QuoteObject(thisColumn.FK_COLUMN_NAME));

                            xml.AppendLine(" IS NULL ");
                            xml.AppendLine("        OR EXISTS ");
                            xml.AppendLine("        ( ");
                            xml.Append("            SELECT * FROM ");
                            xml.Append(QuoteObject(thisColumn.REFERENCED_TABLE_SCHEMA));
                            xml.Append(".");
                            xml.Append(QuoteObject(thisColumn.REFERENCED_TABLE_NAME));
                            xml.Append(" AS ");
                            xml.Append("tAlias");
                            xml.Append(i.ToString().PadLeft(3, '0'));
                            xml.Append(" ");
                            xml.Append(System.Environment.NewLine);
                            xml.AppendLine("            WHERE (1=1) ");
                            xml.Append("            AND ");
                        } // End if (j == 0)
                        else
                            xml.Append("            AND ");

                        xml.Append("tAlias");
                        xml.Append(i.ToString().PadLeft(3, '0'));
                        xml.Append(".");
                        xml.Append(QuoteObject(thisColumn.REFERENCED_COLUMN_NAME));
                        xml.Append(" = tSource.");
                        xml.Append(QuoteObject(thisColumn.FK_COLUMN_NAME));
                        xml.AppendLine(" ");

                        ++j;
                    } // Next thisColumn 

                    xml.AppendLine("        ) ");
                    xml.AppendLine("    ) ");
                    xml.AppendLine();
                    ++i;
                } // Next group

            } // End if (lsFKs.Count > 0) 


            xml.Append(@") -- End CTE 
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
");
                if (!with_remove)
                    xml.Append(" -- ");

                xml.Append(@"WHEN NOT MATCHED BY SOURCE THEN DELETE ");
                xml.Append(@"
;
");

                if (with_xml)
                    xml.Append(@" 
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


        public static string MergeStatementForTable(
            System.Data.Common.DbConnection conn
            , string table_schema
            , string table_name
        ) 
        {
            return MergeStatementForTable(conn, table_schema, table_name, null);
        } // End Function MergeStatementForTable 


        public static string MergeStatementForTable(
              System.Data.Common.DbConnection conn
            , string table_schema
            , string table_name
            , string query
            , object param = null
            , bool with_xml = true
            , bool with_remove = false
            , System.Data.IDbTransaction transaction = null
            , int? commandTimeout = null
            , System.Data.CommandType? commandType = null
        )
        {
            string sql = System.IO.Path.Combine("SQL", "Schema.Merge.sql");
            sql = System.IO.File.ReadAllText(sql, System.Text.Encoding.UTF8);

            System.Collections.Generic.IEnumerable<MergeSchemaInfo> mis = conn.Query<MergeSchemaInfo>(sql, new { __table_schema = table_schema, __table_name = table_name });


            System.Text.StringBuilder xmlBuilder = new System.Text.StringBuilder();

            if (with_xml)
            {
                conn.AsXml(table_schema, table_name, xmlBuilder, query, param, transaction, commandTimeout, commandType);

                // System.Threading.Tasks.Task.Run(async () => {
                //     await conn.AsJSON(xmlBuilder, query, RenderType_t.Array | RenderType_t.Indented, param, transaction, commandTimeout, commandType);
                // }).Wait();

            } // End if (with_xml) 

            return GetMergeScript(conn, table_schema, table_name, query, mis, xmlBuilder, true, with_remove, with_xml);
        } // End Sub MergeStatementForTable 


        internal static void SlickListBasedOnSample()
        {
            SlickListBasedOnSample("8E5523E3-32D1-4018-0000-000000000000");
        } // End Sub SlickListBasedOnSample


        internal static void SlickListBasedOnSample(string sampleId)
        {
            string newSlickListUID = System.Guid.NewGuid().ToString();

            //return 
            SlickListBasedOnSample(sampleId, newSlickListUID);
        } // End Sub SlickListBasedOnSample


        internal static string SlickListBasedOnSample(string sampleId, string newSlickListUID)
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            string slickListTitle;
            string slickList;
            string slickListColumnNames;
            string slickListColumns;


            string table_schema = "dbo";
            string table_name = null;
            string sql = null;

            sampleId = sampleId.Replace("'", "''");
            newSlickListUID = newSlickListUID.Replace("'", "''");

            System.Action<string> AppendOutput =
                delegate (string mergeStatement)
                {
                    sb.Append("-- Table: ");
                    sb.Append(table_schema);
                    sb.Append(".");
                    sb.Append(table_name);
                    sb.AppendLine(mergeStatement);
                    sb.AppendLine(System.Environment.NewLine);

                    sb.AppendLine("GO");

                    sb.AppendLine(System.Environment.NewLine);
                    sb.AppendLine(System.Environment.NewLine);
                }
            ;



            SqlService service = new SqlService();
            using (System.Data.Common.DbConnection conn = service.Connection)
            {

#if false
                sql = @"
IF OBJECT_ID('tempdb..##tempSlickColumnInsertMapper') IS NOT NULL
    EXECUTE('DROP TABLE ##tempSlickColumnInsertMapper; ');
";
                
                
                conn.Execute(sql);
#endif





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
                slickListTitle = MergeStatementForTable(conn, table_schema, table_name, sql);
                AppendOutput(slickListTitle);



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
                slickList = MergeStatementForTable(conn, table_schema, table_name, sql);
                AppendOutput(slickList);


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
                conn.AsXml(null, null, xmlBuilder, sql);

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
/*
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
*/	
	
DECLARE @xmlColMap XML
SET @xmlColMap = CONVERT(XML, @xmlColumnMap)


;WITH CTE AS 
(
    SELECT
        /*
        CAST
        (
            REPLACE(
                
                REPLACE(
                REPLACE(
                replace(doc.col.value('(./SLCOL_UID)[1]', 'varchar(MAX)'), char(9), '')
                ,CHAR(13),'')
                ,CHAR(10), '')
                ,' ', '')
            AS uniqueidentifier
        ) AS SLCOL_UID
        */
         doc.col.value('SLCOL_UID[1]', 'uniqueidentifier') AS SLCOL_UID 
        ,doc.col.value('SLCOL_LANG_UID[1]', 'uniqueidentifier') AS SLCOL_LANG_UID 
        ,doc.col.value('old_SLCOL_UID[1]', 'uniqueidentifier') AS old_SLCOL_UID 
        ,doc.col.value('old_SLCOL_LANG_UID[1]', 'uniqueidentifier') AS old_SLCOL_LANG_UID 
        
        --,doc.col.value('SLCOL_LANG_UID[1]', 'uniqueidentifier') podate 
    FROM @xmlColMap.nodes('//row') AS doc(col)
) 
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
FROM CTE 

LEFT JOIN T_SYS_Language_Forms 
	ON T_SYS_Language_Forms.LANG_UID = old_SLCOL_LANG_UID

";
                slickListColumnNames = MergeStatementForTable(conn, table_schema, table_name, sql, new { xmlColumnMap = xml });
                AppendOutput(slickListColumnNames);



                table_name = "T_COR_Ref_Slickcolumn";
                sql = @"
/*
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
*/


DECLARE @xmlColMap XML
SET @xmlColMap = CONVERT(XML, @xmlColumnMap)


;WITH CTE AS 
(
    SELECT
         doc.col.value('SLCOL_UID[1]', 'uniqueidentifier') AS SLCOL_UID 
        ,doc.col.value('SLCOL_LANG_UID[1]', 'uniqueidentifier') AS SLCOL_LANG_UID 
        ,doc.col.value('old_SLCOL_UID[1]', 'uniqueidentifier') AS old_SLCOL_UID 
        ,doc.col.value('old_SLCOL_LANG_UID[1]', 'uniqueidentifier') AS old_SLCOL_LANG_UID 
    FROM @xmlColMap.nodes('//row') AS doc(col)
) 
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
FROM CTE AS tColumnMap 

LEFT JOIN T_COR_Ref_Slickcolumn 
	ON T_COR_Ref_Slickcolumn.SLCOL_UID = tColumnMap.old_SLCOL_UID 

WHERE SLCOL_SL_UID = '" + sampleId + @"' 
-- WHERE SLCOL_SL_UID = '8E5523E3-32D1-4018-0000-000000000000' 
-- WHERE SLCOL_SL_UID = '67ef86e5-64cf-4300-0000-000000000000' 
ORDER BY SLCOL_Sort 



";

                slickListColumns = MergeStatementForTable(conn, table_schema, table_name, sql, new { xmlColumnMap = xml });
                AppendOutput(slickListColumns);


#if false
                sql = @"
IF OBJECT_ID('tempdb..##tempSlickColumnInsertMapper') IS NOT NULL
    EXECUTE('DROP TABLE ##tempSlickColumnInsertMapper; ');
";
                
                
                conn.Execute(sql);
#endif


            } // End Using conn 



            System.Console.WriteLine(slickListTitle);
            System.IO.File.WriteAllText(@"D:\01_slickListTitle.sql", slickListTitle, System.Text.Encoding.UTF8);

            System.Console.WriteLine(slickList);
            System.IO.File.WriteAllText(@"D:\02_slickList.sql", slickList, System.Text.Encoding.UTF8);

            System.Console.WriteLine(slickListColumnNames);
            System.IO.File.WriteAllText(@"D:\03_slickListColumnNames.sql", slickListColumnNames, System.Text.Encoding.UTF8);

            System.Console.WriteLine(slickListColumns);
            System.IO.File.WriteAllText(@"D:\04_slickListColumns.sql", slickListColumns, System.Text.Encoding.UTF8);



            string allInOne = sb.ToString();
            sb.Length = 0;
            sb = null;
            System.Console.WriteLine(allInOne);
            return allInOne;
        } // End Function SlickListBasedOnSample  


        internal static void Test()
        {
            // SlickListBasedOnSample();

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
            table_name = "T_SYS_Ref_Register";
            table_name = "T_SYS_Registerrechte";
            table_name = "T_SM2_ZO_Stoerungschritt_Benutzergruppe";
            table_name = "T_SM2_ZO_Stoerungschritte";
            table_name = "T_ZO_SYS_DokumentKategorie_Benutzergruppe";
            table_name = "T_VWS_ZO_NavigationRechte_Lesen";
            table_name = "T_VWS_ZO_DarstellungRechte_Lesen";

            table_name = "T_VWS_Ref_Navigation";
            table_name = "T_VWS_Ref_NavigationGruppe";
            table_name = "T_VWS_ZO_NavigationGruppe";

            table_name = "T_VWS_ZO_Ref_Darstellung_Ref_DarstellungGruppe ";
            table_name = "T_VWS_Ref_Darstellung";
            table_name = "T_VWS_Ref_DarstellungGruppe";


            table_name = "T_SYS_Ref_BackOfficeMenue";
            table_name = "T_SYS_Ref_BackOfficeSubMenue";
            table_name = "T_SYS_Ref_MimeTypes";

            table_name = "T_BO_Menu";
            table_name = "T_BO_Menu_CheckDelete";
            table_name = "T_FMS_Navigation";
            table_name = "T_SYS_Ref_Layerset";
            table_name = "T_AP_Ref_DokumentKategorie";
            table_name = "T_VWS_Ref_Darstellung";
            table_name = "T_SYS_Module";
            table_name = "T_SYS_Module";
            table_name = "T_COR_Slicklist";


            table_name = "T_AV_Ref_AdresseRollen";
            table_name = "T_SYS_AdresseRollenrechte";

            table_name = "T_FMS_Configuration";

            table_name = "T_AP_Ref_Land";
            table_name = "T_ZO_Objekt_Wgs84Polygon";


            table_name = "T_VWS_PdfLegende";
            table_name = "T_VWS_Ref_PdfLegendenKategorie";

            table_name = "T_VWS_Ref_PaperSize";


            table_name = "T_VWS_PdfLegende";
            table_name = "T_VWS_Ref_PdfLegendenKategorie";


            table_name = "T_FMS_ZO_Filter";
            table_name = "T_FMS_Navigation";
            table_name = "T_FMS_Translation";
            table_name = "T_SYS_Navigationrechte";

            table_name = "T_COR_Slicklist";
            table_name = "T_COR_Ref_Slickcolumn";


            table_name = "T_ZO_SYS_Module_AP_Ref_Mandant";
            table_name = "T_FMS_ZO_Filter";
            table_name = "T_FMS_Filter";
            table_name = "T_FMS_Navigation";
            table_name = "T_FMS_Translation";
            table_name = "T_FMS_Navigation";
            table_name = "T_COR_ZO_ObjektRechte_Lesen";
            table_name = "T_SYS_Navigationrechte";
            table_name = "T_Benutzergruppen";
            table_name = "___ssrs_folders";
            table_name = "T_RPT_Translations";
            table_name = "T_Benutzer";
            table_name = "T_Benutzer_Benutzergruppen";
            table_name = "T_Benutzerrechte";
            table_name = "T_AP_Kontakte";
            table_name = "T_AP_Anlage";
            table_name = "T_AV_AdresseKontaktpersonen";
            table_name = "T_AV_Ref_AdresseAnrede";
            table_name = "T_AV_Ref_AdresseRollen";
            table_name = "T_AV_Ref_Region";
            table_name = "T_AV_Adressen";
            table_name = "T_AP_Ref_KontaktGeschlecht";
            table_name = "T_FMS_Navigation";
            table_name = "T_FMS_Translation";
            table_name = "T_SYS_Navigationrechte";
            table_name = "T_SYS_Anlagerechte";
            table_name = "T_SYS_AdresseRollenrechte";
            table_name = "T_AP_Ref_AnlageBauform";
            table_name = "T_AP_Ref_AnlageBetriebsart";
            table_name = "T_AP_Ref_AnlageEnergietraeger";
            table_name = "T_AP_Ref_AnlageKaeltemittel";
            table_name = "T_AP_Ref_AnlageKategorie";
            table_name = "T_AP_Ref_AnlageKategorieSchema";
            table_name = "T_AP_Ref_AnlageKategorieVerfuegbarkeit";
            table_name = "T_AP_Ref_AnlagePrioritaet";
            table_name = "T_AP_Ref_AnlageRueckkuehlung";
            table_name = "T_AP_Ref_AnlageWRG";
            table_name = "T_AP_Ref_AnlageZustand";

            
            
            table_name = "T_AP_Ref_Landesteile";
            table_name = "T_AP_Ref_Land";
            table_name = "T_AP_Ref_Region";
            table_name = "T_AP_Ref_Ort";

            table_name = "T_AP_Standort";


            table_name = "T_AP_Ref_GebaeudeKategorie";
            table_name = "T_AP_Ref_GebaeudeUmlaufkonto";

            table_name = "T_AP_Gebaeude";



            table_name = "T_AP_Geschoss";
            table_name = "T_AP_Ref_Geschosstyp";
            
            table_name = "T_AP_Raum";
            table_name = "T_AP_Kunst";
            table_name = "T_AP_Ref_AnlageKategorie";
            table_name = "T_AV_Adressen";
            table_name = "T_AP_Ref_Land";
            table_name = "T_AP_Anlage";
            table_name = "T_ZO_AV_Adresse_AV_Ref_AdresseRollen";
            table_name = "T_TM_Tasks";
            table_name = "T_AP_Anlage";
            table_name = "T_AV_Ref_AdresseRollen";
            table_name = "T_PSM_TeilchenGruppe";
            table_name = "T_AP_Dokumente";
            table_name = "T_AP_Ref_DokumentKategorie";
            table_name = "T_SYS_Ref_MimeTypes";
            table_name = "T_AP_Ref_Bodenbelag";
            table_name = "T_AP_Ref_DIN277";
            table_name = "T_AP_Ref_Fluchtwegmarkierung";
            table_name = "T_AP_Ref_Nutzungsart";
            table_name = "T_AP_Ref_NutzungsartGruppe";
            table_name = "T_AP_Ref_Reinigungsprio";
            table_name = "T_AP_Ref_RaumSicherheitszone";
            table_name = "T_AP_Ref_RaumDeckenkonstruktion";
            table_name = "T_AP_Ref_RaumWandoberflaeche";
            table_name = "T_FMS_Configuration";
            table_name = "T_AP_Trakt";
            table_name = "T_ZO_AP_Anlage_AP_Ref_AnlageMeta";
            table_name = "T_COR_MetaKatalog";
            table_name = "T_COR_MetaTyp";
            table_name = "T_COR_MetaFelder";
            table_name = "T_SYS_Anlagerechte";
            table_name = "T_PSM_ZO_TeilchenGruppe_Objekte";
            table_name = "T_AP_Ref_DokumentStatus";
            table_name = "T_ZO_SYS_Module_AP_Ref_Mandant";
            table_name = "T_SYS_Navigationrechte";
            table_name = "T_FMS_Navigation";
            table_name = "T_ZO_Objekt_Wgs84Polygon";
            table_name = "T_ZO_AP_Dokumente_AP_Ref_DokumentMetadaten";
            table_name = "T_AV_AdresseKontaktpersonen";
            table_name = "T_PSM_Ref_Kategorie";
            table_name = "T_AP_Ref_AnlageMeta";
            table_name = "T_ZO_SYS_Metadatenrechte_Benutzergruppe";
            table_name = "T_ZO_SYS_DokumentKategorie_Benutzergruppe";
            table_name = "T_ZO_SYS_Mimetyperechte_Benutzergruppe";
            table_name = "T_ZO_AP_Dokumentkategorie_Metadaten";
            table_name = "T_ZO_AP_Dokumentkategorie_Metadaten";
            table_name = "T_SYS_Standortrechte";
            table_name = "T_SYS_Gebaeuderechte";
            table_name = "T_COR_ZO_ObjektRechte_Lesen";
            table_name = "T_SYS_AdresseRollenrechte";
            table_name = "T_SYS_Module";
            table_name = "T_SYS_Standortrechte";
            table_name = "T_VWS_Ref_PaperSize";
            table_name = "T_VWS_Ref_PdfLegendenKategorie";
            table_name = "T_VWS_PdfLegende";
            table_name = "T_ZO_OV_Ref_ObjektNr";
            table_name = "T_ZO_Objekt_Wgs84Polygon";
            table_name = "T_VWS_PdfLegende";
            // table_name = "T_VWS_Ref_PdfLegendenKategorie";
            // table_name = "T_SYS_Raumrechte";


            string cmd = null;
            using (System.Data.Common.DbConnection conn = service.Connection)
            {
                string query = @"SELECT * FROM T_Benutzer WHERE (1=2) ";
                query = null;
                cmd = MergeStatementForTable(conn, table_schema, table_name, query, null, true);
            } // End Using conn 

            
            System.Console.WriteLine(cmd);
        } // End Sub Test 


    } // End Class MergeTst 


} // End Namespace 
