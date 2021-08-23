
SELECT 
	 FK_CONSTRAINT_NAME
	,FK_TABLE_SCHEMA 
	,FK_TABLE_NAME 
	--,COUNT(*) AS cnt 
	 
	-- ,COUNT(*) OVER (ORDER BY U.userid) AS CNT calulates a "running count" - the count until "that" row. 
	-- If you want to count all rows in the complete result, use the window function without the order by
	,COUNT(*) OVER (PARTITION BY FK_TABLE_SCHEMA, FK_TABLE_NAME, FK_CONSTRAINT_NAME) AS cnt  
	 
	,FK_COLUMN_NAME
	,FK_ORDINAL_POSITION 
	,REFERENCED_TABLE_SCHEMA 
	,REFERENCED_TABLE_NAME
	,REFERENCED_COLUMN_NAME
	-- ,REFERENCED_ORDINAL_POSITION 
FROM V_DELDATA_ForeignKeyRelations 
WHERE (1=1) 
-- AND FK_TABLE_NAME = 'T_COR_ZO_Ref_Slickcolumn_Benutzer' 
-- AND FK_TABLE_NAME = 'T_PSM_Teilchen' 
-- AND FK_TABLE_SCHEMA = 'dbo' 
-- AND FK_TABLE_NAME = 'T_COR_ZO_ObjektVariante' 
AND FK_TABLE_SCHEMA = @__table_schema 
AND FK_TABLE_NAME = @__table_name 



ORDER BY CNT DESC, FK_TABLE_SCHEMA, FK_TABLE_NAME, FK_CONSTRAINT_NAME, FK_ORDINAL_POSITION 
