
;WITH DepTree (referenced_id, referenced_name, referencing_id, referencing_name, NestLevel) 
AS 
(
    SELECT  
		 o.object_id AS referenced_id 
		,o.name AS referenced_name 
		,o.object_id AS referencing_id 
		,o.name AS referencing_name 
		,0 AS NestLevel 
	FROM sys.objects AS o 
    WHERE 1=1 
	AND o.type_desc = 'VIEW' 

	UNION ALL

	SELECT  
		 d1.referenced_id AS referenced_id 
		,OBJECT_NAME( d1.referenced_id) AS referenced_name 
		,d1.referencing_id 
		,OBJECT_NAME( d1.referencing_id) AS referencing_name 
		,NestLevel + 1 AS NestLevel 
	FROM sys.sql_expression_dependencies AS d1 
	JOIN DepTree r ON d1.referenced_id =  r.referencing_id
)
SELECT DISTINCT 
	-- referenced_id 
	 referenced_name 
	-- referencing_id, 
	-- referencing_name, 
	,SCHEMA_NAME(r.schema_id) AS "schema_name" 
	,NestLevel 
FROM DepTree d
INNER JOIN sys.objects AS o ON d.referencing_id = o.object_id
INNER JOIN sys.objects AS r ON d.referenced_id = r.object_id
WHERE o.type = 'V' 

ORDER BY 
	 NestLevel DESC 
	,referenced_name 

OPTION (MAXRECURSION 0) 
