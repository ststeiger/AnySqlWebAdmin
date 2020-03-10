
SELECT 
	(
		SELECT 
			CASE WHEN ORDINAL_POSITION = 1 THEN N'     ' ELSE N'    ,' END 
			+ N'"' + COLUMN_NAME 
			+ N'" '  
			+ 
			CASE 
				WHEN DATA_TYPE = 'nvarchar' THEN N'national character varying' 
				WHEN DATA_TYPE = 'varchar' THEN N'character varying' 
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
			+ ' ''' + COLUMN_NAME + '[not(@*[local-name()="nil" and . ="true"])]''' 
			+ CHAR(13) + CHAR(10) 
		FROM INFORMATION_SCHEMA.COLUMNS 
		WHERE TABLE_SCHEMA = 'dbo' 
		AND TABLE_NAME = 'T_Benutzer'  
		ORDER BY ORDINAL_POSITION 
		FOR XML PATH(''), TYPE 
	).value('.', 'nvarchar(MAX)')
	AS columns