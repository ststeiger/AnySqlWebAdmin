
-- https://stackoverflow.com/questions/49026886/how-to-insert-query-result-into-a-global-temporary-table

-- oracle: CREATE GLOBAL TEMPORARY TABLE temptbl (id ) 
-- PG: CREATE UNLOGGED TABLE test_global_temporary_table(id numeric, col text, pid bigint default pg_backend_pid());
-- CREATE TABLE ##TempTable (ID INT IDENTITY(1,1))

/*
-- CREATE TABLE ##TempTable (ID INT)

INSERT INTO ##TempTable(ID)
          SELECT 1 AS id 
UNION ALL SELECT 2 AS id 

SELECT * FROM ##TempTable 


IF OBJECT_ID('tempdb..##TempTable') is not null
BEGIN 
    DROP TABLE ##TempTable
END 

*/


SELECT * 
FROM T_VWS_PdfBibliothek 


SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'T_VWS_PdfBibliothek' 
AND TABLE_SCHEMA = 'dbo' 
ORDER BY ORDINAL_POSITION


SELECT 
	 TABLE_SCHEMA
	,TABLE_NAME
	,COLUMN_NAME
	,IS_NULLABLE
	,DATA_TYPE
	,CHARACTER_MAXIMUM_LENGTH
	,NUMERIC_PRECISION
	,NUMERIC_SCALE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'T_VWS_PdfBibliothek' 
AND TABLE_SCHEMA = 'dbo' 
ORDER BY ORDINAL_POSITION






;WITH CTE AS 
( 
	SELECT 
		 '091089E7-B7EE-4CEB-9272-51E4954C15FF' AS SL_UID
		,'~\Modules\Visualiser\sql\Overview_T_VWS_PdfBibliothek.sql' AS SL_SQL
		,'~\Modules\Visualiser\sql\Changes_T_VWS_PdfBibliothek.sql' AS SL_SQL_onChanges
		,NULL AS SL_asyncEditorLoading
		,NULL AS SL_autoEdit
		,NULL AS SL_autoHeight
		,NULL AS SL_defaultColumnWidth
		,NULL AS SL_defaultSortString
		,1 AS SL_editable 
		,1 AS SL_enableAddRow 
		,1 AS SL_enableCellNavigation
		,1 AS SL_enableColumnReorder
		,1 AS SL_forceFitColumns
		,0 AS SL_hasCheckbox
		,25 AS SL_headerRowHeight
		,0 AS SL_leaveSpaceForNewRows
		,NULL AS SL_multiSelect
		,NULL AS SL_rowHeight
		,1 AS SL_showHeaderRow
		,1 AS SL_showTopPanel
		,'SVG-Bibliothek PDF Übersicht' AS SL_Lang_DE
		,'SVG-Library PDF Overview' AS SL_Lang_EN
		,'Aperçu SVG-bibliothèque PDF' AS SL_Lang_FR
		,'Panoramica SVG-libreria PDF' AS SL_Lang_IT
	-- WHERE NOT EXISTS (SELECT t.* FROM T_COR_Slicklist AS t WHERE t.SL_UID = '091089E7-B7EE-4CEB-9272-51E4954C15FF' ) 
)

MERGE INTO T_COR_Slicklist AS A 
USING CTE ON CTE.SL_UID = A.SL_UID 
WHEN MATCHED 
	THEN UPDATE
		SET  A.SL_SQL = CTE.SL_SQL
			,A.SL_SQL_onChanges = CTE.SL_SQL_onChanges
			,A.SL_asyncEditorLoading = CTE.SL_asyncEditorLoading
			,A.SL_autoEdit = CTE.SL_autoEdit
			,A.SL_autoHeight = CTE.SL_autoHeight
			,A.SL_defaultColumnWidth = CTE.SL_defaultColumnWidth
			,A.SL_defaultSortString = CTE.SL_defaultSortString
			,A.SL_editable = CTE.SL_editable
			,A.SL_enableAddRow = CTE.SL_enableAddRow
			,A.SL_enableCellNavigation = CTE.SL_enableCellNavigation
			,A.SL_enableColumnReorder = CTE.SL_enableColumnReorder
			,A.SL_forceFitColumns = CTE.SL_forceFitColumns
			,A.SL_hasCheckbox = CTE.SL_hasCheckbox
			,A.SL_headerRowHeight = CTE.SL_headerRowHeight
			,A.SL_leaveSpaceForNewRows = CTE.SL_leaveSpaceForNewRows
			,A.SL_multiSelect = CTE.SL_multiSelect
			,A.SL_rowHeight = CTE.SL_rowHeight
			,A.SL_showHeaderRow = CTE.SL_showHeaderRow
			,A.SL_showTopPanel = CTE.SL_showTopPanel
			,A.SL_Lang_DE = CTE.SL_Lang_DE
			,A.SL_Lang_EN = CTE.SL_Lang_EN
			,A.SL_Lang_FR = CTE.SL_Lang_FR
			,A.SL_Lang_IT = CTE.SL_Lang_IT


WHEN NOT MATCHED THEN 
INSERT 
( 
	 SL_UID 
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
)
VALUES
(
	 CTE.SL_UID
	,CTE.SL_SQL
	,CTE.SL_SQL_onChanges
	,CTE.SL_asyncEditorLoading
	,CTE.SL_autoEdit
	,CTE.SL_autoHeight
	,CTE.SL_defaultColumnWidth
	,CTE.SL_defaultSortString
	,CTE.SL_editable
	,CTE.SL_enableAddRow
	,CTE.SL_enableCellNavigation
	,CTE.SL_enableColumnReorder
	,CTE.SL_forceFitColumns
	,CTE.SL_hasCheckbox
	,CTE.SL_headerRowHeight
	,CTE.SL_leaveSpaceForNewRows
	,CTE.SL_multiSelect
	,CTE.SL_rowHeight
	,CTE.SL_showHeaderRow
	,CTE.SL_showTopPanel
	,CTE.SL_Lang_DE
	,CTE.SL_Lang_EN
	,CTE.SL_Lang_FR
	,CTE.SL_Lang_IT 
);

-- SELECT * FROM T_COR_Slicklist WHERE SL_UID = '091089E7-B7EE-4CEB-9272-51E4954C15FF'
