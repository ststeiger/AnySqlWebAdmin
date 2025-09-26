
SELECT 
	 ind.object_id
	,ind.type
	,ind.type_desc
	,ind.name AS IndexName 
	,ind.index_id AS IndexId 
	,t.name AS TableName 
	,CASE 
		WHEN ind.is_primary_key = 1 THEN 'PK'
		WHEN ind.is_unique_constraint = 1 THEN 'UC'
		WHEN ind.is_unique = 1 THEN 'UX' 
		ELSE 'IX' 
	END AS indexType  
	
     -- ,ic.index_column_id AS ColumnId 
     --,col.name AS ColumnName 
     
	 -- ,ind.* 
     -- ,ic.* 
     -- ,col.* 
FROM sys.indexes ind 
-- INNER JOIN sys.index_columns ic ON  ind.object_id = ic.object_id and ind.index_id = ic.index_id 
-- INNER JOIN sys.columns col ON ic.object_id = col.object_id and ic.column_id = col.column_id 
INNER JOIN sys.tables t ON t.object_id = ind.object_id 

WHERE ind.type <> 0 -- no heap tables 

/*
AND ind.is_primary_key = 0 
AND ind.is_unique = 0 
AND ind.is_unique_constraint = 0 
AND t.is_ms_shipped = 0 
*/

-- WHERE ind.object_id = object_id('dbo.T_Benutzer')

-- ORDER BY t.name, ind.name, ind.index_id, ic.index_column_id;
