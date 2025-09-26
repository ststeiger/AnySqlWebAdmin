
-- SELECT * FROM sys.table_types AS syst 
-- SELECT * FROM sys.types
-- SELECT * FROM sys.assembly_types -- CLR-Types

SELECT 
	 syst.name
	,sysc.* 
	,systy.* 
FROM sys.table_types AS syst 
LEFT JOIN sys.columns AS sysc ON sysc.object_id = syst.type_table_object_id 
INNER JOIN sys.systypes AS systy ON systy.xtype = sysc.system_type_id
WHERE syst.name = 'GuidTableType' 


-- select * from sys.assemblies
-- select * from sys.assembly_modules



-- ,@in_gebaeude GUIDTableType readonly 
-- ,@in_geschoss GeschossIdentifierTableType readonly 
-- ,@in_benutzer IdTableType readonly 



IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'GeschossIdentifierTableType' AND ss.name = N'dbo')
CREATE TYPE [dbo].[GeschossIdentifierTableType] AS TABLE(
	[GeschossIdentifierValue] [varchar](76) NULL
)
GO



IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'GuidTableType' AND ss.name = N'dbo')
CREATE TYPE [dbo].[GuidTableType] AS TABLE(
	[GuidValue] [uniqueidentifier] NULL
)
GO

IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'IdTableType' AND ss.name = N'dbo')
CREATE TYPE [dbo].[IdTableType] AS TABLE(
	[IdValue] [int] NULL
)
GO


-- Nur Alias
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'email' AND ss.name = N'dbo')
CREATE TYPE [dbo].[email] FROM [varchar](300) NOT NULL
GO


