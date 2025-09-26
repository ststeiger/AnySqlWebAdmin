
SELECT 
	 so.name AS ObjectName
	,so.type
	,SCHEMA_NAME(so.schema_id) AS SchemaName 
	,asmbly.name AS AssemblyName 
	,asmbly.permission_set_desc
	,am.assembly_class
	,am.assembly_method
FROM sys.assembly_modules AS am 

INNER JOIN sys.assemblies AS asmbly 
	ON asmbly.assembly_id = am.assembly_id
	-- AND asmbly.is_user_defined = 1 -- if using SQL Server 2008 or newer
	-- AND asmbly.name NOT LIKE 'Microsoft%' -- if using SQL Server 2005

INNER JOIN sys.objects AS so 
	ON so.[object_id] = am.[object_id]

UNION ALL

SELECT 
	 at.name AS ObjectName
	,'UDT' AS type
	,SCHEMA_NAME(at.schema_id) AS SchemaName
	,asmbly.name AS AssemblyName
	,asmbly.permission_set_desc
	,at.assembly_class
	,NULL AS assembly_method
FROM sys.assembly_types AS at
INNER JOIN sys.assemblies AS asmbly 
	ON asmbly.assembly_id = at.assembly_id 
	-- AND asmbly.is_user_defined = 1 -- if using SQL Server 2008 or newer
	-- AND asmbly.name NOT LIKE 'Microsoft%' -- if using SQL Server 2005
ORDER BY 
	 AssemblyName 
	,type 
	,ObjectName 
	 