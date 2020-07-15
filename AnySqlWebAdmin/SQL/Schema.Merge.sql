/*
  DECLARE @__table_schema national character varying(256)
  DECLARE @__table_name national character varying(256)
  SET @__table_schema = 'dbo' 
  SET @__table_name = 'T_VWS_ZO_SVG_AP_Objekt' 
  SET @__table_name = 'T_Benutzer' 
  */


-- select name, definition,* from sys.computed_columns
;WITH CTE AS 
(
	SELECT 
		--  sp_helptext 'information_schema.columns'
		-- DB_NAME() AS TABLE_CATALOG
		 schem.name AS TABLE_SCHEMA
		,o.name AS TABLE_NAME
		,c.name AS COLUMN_NAME 
		-- ,COLUMNPROPERTY(c.object_id, c.name, 'ordinal') AS ORDINAL_POSITION 
		,ROW_NUMBER() OVER (ORDER BY COLUMNPROPERTY(c.object_id, c.name, 'ordinal')) AS ORDINAL_POSITION 

		,c.is_computed AS IS_COMPUTED 
		,cc.definition AS COMPUTATION_DEFINITION 
		,o.type 
		,CASE o.type  
			WHEN 'U' THEN 'BASE TABLE'  
			WHEN 'V' THEN 'VIEW'  
			WHEN 'IF' THEN 'INLINE TABLE VALUED FUNCTION' 
			WHEN 'TF' THEN 'TABLE VALUED FUNCTION' 
		END AS TABLE_TYPE  

	  ,CONVERT(nvarchar(4000), OBJECT_DEFINITION(c.default_object_id)) AS COLUMN_DEFAULT
		--,CONVERT(varchar(3), CASE c.is_nullable WHEN 1 THEN 'YES' ELSE 'NO' END) AS IS_NULLABLE
		,c.is_nullable AS IS_NULLABLE

		,ISNULL(TYPE_NAME(c.system_type_id), t.name) AS DATA_TYPE
		,COLUMNPROPERTY(c.object_id, c.name, 'charmaxlen') AS CHARACTER_MAXIMUM_LENGTH
		,COLUMNPROPERTY(c.object_id, c.name, 'octetmaxlen') AS CHARACTER_OCTET_LENGTH 

		,CONVERT(tinyint, CASE -- int/decimal/numeric/real/float/money  
				WHEN c.system_type_id IN (48,52,56,59,60,62,106,108,122,127)
					THEN c.precision
				END
		) AS NUMERIC_PRECISION

		,CONVERT(smallint, CASE -- int/money/decimal/numeric  
				WHEN c.system_type_id IN (48,52,56,60,106,108,122,127) THEN 10
				WHEN c.system_type_id IN (59,62) THEN 2
				END
		) AS NUMERIC_PRECISION_RADIX

		,-- real/float  
		CONVERT(integer, CASE -- datetime/smalldatetime  
				WHEN c.system_type_id IN (40,41,42,43,58,61) THEN NULL
				ELSE ODBCSCALE(c.system_type_id, c.scale)
				END
		) AS NUMERIC_SCALE

		,CONVERT(smallint, CASE -- datetime/smalldatetime  
				WHEN c.system_type_id IN ( 40,41,42,43,58,61)
					THEN ODBCSCALE(c.system_type_id, c.scale)
				END
		) AS DATETIME_PRECISION

		,CONVERT(sysname, NULL) AS CHARACTER_SET_CATALOG
		,CONVERT(sysname, NULL) COLLATE catalog_default AS CHARACTER_SET_SCHEMA

		,CONVERT(sysname, CASE 
				WHEN c.system_type_id IN (35, 167, 175) -- char/varchar/text  
					THEN COLLATIONPROPERTY(c.collation_name, 'sqlcharsetname')
				WHEN c.system_type_id IN (99,231,239) -- nchar/nvarchar/ntext  
					THEN N'UNICODE'
				END
		) AS CHARACTER_SET_NAME 

		,CONVERT(sysname, NULL) AS COLLATION_CATALOG
		,CONVERT(sysname, NULL) COLLATE catalog_default AS COLLATION_SCHEMA
		,c.collation_name AS COLLATION_NAME
		,CONVERT(sysname, CASE WHEN c.user_type_id > 256 THEN DB_NAME() END) AS DOMAIN_CATALOG
		,CONVERT(sysname, CASE WHEN c.user_type_id > 256 THEN SCHEMA_NAME(t.schema_id) END ) AS DOMAIN_SCHEMA 
		,CONVERT(sysname,  CASE WHEN c.user_type_id > 256 THEN TYPE_NAME(c.user_type_id) END ) AS DOMAIN_NAME 

		,CASE 
			WHEN ic.object_id IS NULL THEN NULL
			ELSE c.name 
		 END AS COLUMN_OF_PK 

		 ,c.is_identity AS IS_IDENTITY 
	FROM sys.columns AS c 

	LEFT JOIN sys.objects AS o 
		ON o.object_id = c.object_id
	
	LEFT JOIN sys.schemas AS schem 
		ON schem.schema_id = o.schema_id 

	LEFT JOIN sys.computed_columns AS cc 
		ON cc.object_id = c.object_id AND cc.column_id = c.column_id 

	LEFT JOIN sys.types t 
		ON t.user_type_id = c.user_type_id 

	LEFT JOIN sys.indexes AS pk
		ON pk.object_id = o.object_id 
		AND pk.is_primary_key = 1 

	LEFT JOIN sys.index_columns AS ic 
		ON ic.object_id = pk.object_id
		AND ic.index_id = pk.index_id
		AND ic.column_id = c.column_id 

	WHERE (1=1) 
	-- AND c.object_id = OBJECT_ID('[dbo].[T_AP_Dokumente]')
	-- AND o.type NOT IN ('V', 'U','IF', 'TF'
	AND o.type NOT IN ('IT', 'S', 'TT' )
	AND o.type = 'U' 
	-- AND c.is_identity = 0 
	AND c.is_computed = 0 
	AND schem.name = @__table_schema 
	AND o.name = @__table_name 
)
SELECT 
	 COLUMN_NAME 
	------------------ 
	, -- N'"' + COLUMN_NAME + N'" '  + 
    CASE 
        WHEN DATA_TYPE = 'nvarchar' THEN N'national character varying' 
        WHEN DATA_TYPE = 'varchar' THEN N'character varying' 
		WHEN DATA_TYPE = 'varbinary' THEN N'binary varying' 
		-- XML comes wrong when handled as XML
		WHEN DATA_TYPE = 'xml' THEN N'national character varying(MAX)' 
        ELSE DATA_TYPE 
    END 
    + 
    CASE 
        WHEN DATA_TYPE IN ('char', 'nchar', 'binary') THEN 
                  N'(' 
                + CAST(CHARACTER_MAXIMUM_LENGTH AS nvarchar(36)) 
                + N')' 
        WHEN DATA_TYPE IN ('varchar', 'nvarchar', 'varbinary') THEN 
                N'(' + 
                CASE WHEN CHARACTER_MAXIMUM_LENGTH = -1 THEN 'MAX' ELSE CAST(CHARACTER_MAXIMUM_LENGTH AS nvarchar(36)) END 
                + N')' 
        WHEN DATA_TYPE IN ('datetimeoffset', 'datetime2', 'time', 'smalldatetime') THEN 
                  N'(' 
                + CAST(DATETIME_PRECISION AS nvarchar(36)) 
                + N')' 
        WHEN DATA_TYPE IN ('decimal', 'numeric') THEN 
                  N'(' 
                + CAST(NUMERIC_PRECISION AS nvarchar(36)) 
                + N',' 
                + CAST(NUMERIC_SCALE AS nvarchar(36)) 
                + N')' 

        ELSE N'' -- N'(default)' 
    END 
    -- + ' ''' + COLUMN_NAME + '[not(@*[local-name()="nil" and . ="true"])]''' 
	AS COLUMN_SQL_DATATYPE 

	,COLUMN_OF_PK 
	,IS_IDENTITY 
FROM CTE 

ORDER BY
	 TABLE_SCHEMA 
	,TABLE_NAME 
	,ORDINAL_POSITION 
	 