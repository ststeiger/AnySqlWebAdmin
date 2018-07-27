
-- warn FK list

-- RETURNS TABLE(v2 INTEGER, v3 INTEGER)
-- PG: CREATE TEMP TABLE temp_table1 ( product_id int, revenue money );

-- CREATE TABEL @name (
--     foreach noncomputed column => columnname, type length nullable 
-- );

--

-- foreach noncomputed column => columnname
--     insert into @name (columnlist) VALUES (valuelist); 


-- INSERT INTO table_name (columnlist) values ( valuelist)
-- SELECT 
-- foreach noncomputed column => columnname
--     t1.columnname 
-- FROM @name AS t1 
-- LEFT JOIN table_name ON table_name .pk = t1.pk 
-- WHERE t1.pk IS NULL;

-- UPDATE table_name SET fieldList -- no PK 
-- FROM table_name AS target 
-- INNER JOIN @name AS t1 ON t1.pk = target.pk
-- ON (1=2) -- missing pk -- IF NO PK 

-- DROP TABLE IF EXISTS temp_table1;

SELECT 
	-- DB_NAME() AS TABLE_CATALOG
	 schem.name AS TABLE_SCHEMA
	,o.name AS TABLE_NAME
	,c.name AS COLUMN_NAME 
	,COLUMNPROPERTY(c.object_id, c.name, 'ordinal')  AS ORDINAL_POSITION 
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

	,CONVERT(sysname, CASE 
			WHEN c.system_type_id IN (35, 167, 175) -- char/varchar/text  
				THEN COLLATIONPROPERTY(c.collation_name, 'sqlcharsetname')
			WHEN c.system_type_id IN (99,231,239) -- nchar/nvarchar/ntext  
				THEN N'UNICODE'
			END
	) AS CHARACTER_SET_NAME 
	
FROM sys.columns AS c 
LEFT JOIN sys.objects AS o ON o.object_id = c.object_id
LEFT JOIN sys.schemas AS schem ON schem.schema_id = o.schema_id 
LEFT JOIN sys.computed_columns AS cc ON cc.object_id = c.object_id AND cc.column_id = c.column_id 
LEFT JOIN sys.types t ON t.user_type_id = c.user_type_id 

WHERE (1=1) 
-- AND c.is_computed = 1
-- AND c.object_id = OBJECT_ID('[dbo].[T_AP_Dokumente]')
-- AND o.type NOT IN ('V', 'U','IF', 'TF'
AND o.type NOT IN ('IT', 'S', 'TT' )
AND o.type = 'U'

ORDER BY
	 TABLE_SCHEMA 
	,TABLE_NAME 
	,ORDINAL_POSITION 
	 


-- Example 
/*

-- INSERT INTO @Ort (ORT_UID, ORT_MDT_ID, ORT_RG_UID, ORT_Code, ORT_Kurz_DE, ORT_Kurz_FR, ORT_Kurz_IT, ORT_Kurz_EN, ORT_Lang_DE, ORT_Lang_FR, ORT_Lang_IT, ORT_Lang_EN, ORT_Status, ORT_Sort, ORT_StylizerFore, ORT_StylizerBack, ORT_StylizerPattern, ORT_StylizerLine, ORT_IsDefault, ORT_DatumMut, ORT_DatumUser, ORT_GM_Lat, ORT_GM_Lng, ORT_Min_Lat, ORT_Min_Lng, ORT_Max_Lat, ORT_Max_Lng) VALUES (N'3e7c328d-9807-48a7-8dcc-014e8573ca59', 0, N'73e01e56-d9ea-4161-8a7a-a2a591ea6f4c', NULL, NULL, NULL, NULL, NULL, N'Herrliberg', N'Herrliberg', N'Herrliberg', N'Herrliberg', 1, 999, 0, 0, 0, 0, 0, NULL, NULL, CAST(47.28958180000000000000 AS Decimal(23, 20)), CAST(8.61342569999999900000 AS Decimal(23, 20)), CAST(47.27761390000000000000 AS Decimal(23, 20)), CAST(8.58726740000000000000 AS Decimal(23, 20)), CAST(47.31109000000000000000 AS Decimal(23, 20)), CAST(8.66204010000000000000 AS Decimal(23, 20)));
-- INSERT [dbo].[T_AP_Standort] ([SO_UID], [SO_MDT_ID], [SO_ORT_UID], [SO_ApertureKey], [SO_Nr], [SO_Bezeichnung], [SO_Bemerkung], [SO_DatumVon], [SO_DatumBis], [SO_Status], [SO_MutDate], [SO_MutUser], [SO_IsSchnittstelleWP], [SO_SO_UID], [SO_GM_Lat], [SO_GM_Lng], [SO_ADR_UID], [SO_UmrechnungsFaktor], [SO_MDT_UID], [SO_Grundstueckflaeche], [SO_Objektleiter], [SO_Manager]) VALUES (N'87ea0418-c8fa-4f14-b28d-120d47f3f482', 0, N'ad4fbfda-d2ad-406c-8188-156510b4fade', N'', N'0025', N'Swissre', N'', CAST(N'2017-05-22T00:00:00.000' AS DateTime), CAST(N'2099-12-31T00:00:00.000' AS DateTime), 1, NULL, N'', 1, NULL, CAST(47.31739200000000000000 AS Decimal(22, 20)), CAST(8.52045000000000000000 AS Decimal(23, 20)), NULL, CAST(0.00000000000000000000 AS Decimal(36, 20)), N'f94d476f-24a6-4410-9b3c-c0b2def278eb', 0, N'', N'')

DECLARE @Landesteile TABLE
(
  	LT_UID uniqueidentifier NOT NULL,
	LT_MDT_ID int NOT NULL,
	LT_Code int NULL,
	LT_Kurz_DE character varying(50) NULL,
	LT_Kurz_FR character varying(50) NULL,
	LT_Kurz_IT character varying(50) NULL,
	LT_Kurz_EN character varying(50) NULL,
	LT_Lang_DE character varying(255) NULL,
	LT_Lang_FR character varying(255) NULL,
	LT_Lang_IT character varying(255) NULL,
	LT_Lang_EN character varying(255) NULL,
	LT_Status int NOT NULL,
	LT_Sort int NOT NULL,
	LT_StylizerBack int NULL,
	LT_StylizerFore int NULL,
	LT_StylizerPattern int NULL,
	LT_StylizerLine int NULL,
	LT_IsDefault bit NOT NULL,
	LT_DatumMut datetime NULL,
	LT_DatumUser character varying(100) NULL 
); 

INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'1372b062-53b2-4e21-8697-0bbf0476a087', 0, 0, NULL, NULL, NULL, NULL, N'Departement', N'Département ', N'Dipartimento ', N'Department', 1, 0, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'236cca12-551c-4072-8716-10f9177bb07f', 0, 0, NULL, NULL, NULL, NULL, N'Region', N'Région', N'Regione', N'Region', 1, 15, 0, 0, 0, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'817f9a84-2e37-4b0d-b47c-1d0ba949f006', 0, 0, NULL, NULL, NULL, NULL, N'Subjekte', N'Sujets ', N'Soggetto ', N'Subject', 1, 0, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'297bf415-1c13-471c-b314-1f094c42b0b1', 0, 0, NULL, NULL, NULL, NULL, N'Bundesstaat', N'État fédéral', N'Stato federale', N'Federal state', 1, 11, 0, 0, 0, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'751d986c-2a7e-4fc3-9e48-264930e9daf2', 0, 0, NULL, NULL, NULL, NULL, N'Grafschaft', N'Comté', N'Contea', N'County', 1, 0, 0, 0, 0, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'f17d6a77-68ba-4d97-9ad8-2bc2de723327', 0, 0, NULL, NULL, NULL, NULL, N'Kommune', N'Commune', N'Commune', N'Commune', 1, 0, 0, 0, 0, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'c8132121-2145-4815-913e-3230620cd41d', 0, 0, NULL, NULL, NULL, NULL, N'Insel', N'Île', N'Isola', N'Island', 1, 7, 0, 0, 0, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'4ece71bf-544d-43fe-9162-457beade085c', 0, 0, NULL, NULL, NULL, NULL, N'Autonome Gemeinschaften', N'Communautés autonomes', N'Comunità autonome', N'Autonomous communities', 1, 0, 0, 0, 0, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'ed1c4e00-10d9-408f-b071-7534b934998b', 0, 0, NULL, NULL, NULL, NULL, N'Emirat', N'Émirat', N'Emirato', N'Emirate', 1, 0, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'49131f6c-b036-4d09-aad3-776d0bfe5a9b', 0, 0, NULL, NULL, NULL, NULL, N'Gouvernement', N'Gouvernorat', N'Governatorato', N'Governorate', 1, 0, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'eba1b158-4186-4347-af48-86aac78fe46a', 0, 0, NULL, NULL, NULL, NULL, N'Division', N'Divison', N'Divisione', N'Division', 1, 13, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'3b6617a4-5c04-4c13-b586-88298f8c5d4b', 0, 0, NULL, NULL, NULL, NULL, N'Kanton', N'Canton', N'Cantone', N'Canton', 1, 1, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'fb797503-8192-4524-a7e1-a106c01cf3f1', 0, 0, NULL, NULL, NULL, NULL, N'Distrikt', N'District', N'Distretto', N'District', 1, 12, 0, 0, 0, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'7fdb1159-7716-4436-81ed-b2d6a4b0920a', 0, 0, NULL, NULL, NULL, NULL, N'Bundesland', N'Région féderal', N'Région féderal', N'Région féderal', 1, 2, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'92702e5d-0445-4489-a683-c4da0197e6e0', 0, 0, NULL, NULL, NULL, NULL, N'Departement', N'Departement', N'Dipartimento', N'Department', 1, 5, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'11166fc6-29b5-455c-9838-e6e2f95d222d', 0, 0, NULL, NULL, NULL, NULL, N'Bezirk', N'Circonscription ', N'Circondario', N'County', 1, 14, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO @Landesteile (LT_UID, LT_MDT_ID, LT_Code, LT_Kurz_DE, LT_Kurz_FR, LT_Kurz_IT, LT_Kurz_EN, LT_Lang_DE, LT_Lang_FR, LT_Lang_IT, LT_Lang_EN, LT_Status, LT_Sort, LT_StylizerBack, LT_StylizerFore, LT_StylizerPattern, LT_StylizerLine, LT_IsDefault, LT_DatumMut, LT_DatumUser) VALUES (N'77ed61f3-5095-4cab-b683-f0fdd85b49cb', 0, 0, NULL, NULL, NULL, NULL, N'Provinz', N'Province', N'Provincia', N'Province', 1, 4, 0, 0, 0, 0, 0, NULL, NULL);



INSERT INTO dbo.T_AP_Ref_Landesteile
(
	 LT_UID
	,LT_MDT_ID
	,LT_Code
	,LT_Kurz_DE
	,LT_Kurz_FR
	,LT_Kurz_IT
	,LT_Kurz_EN
	,LT_Lang_DE
	,LT_Lang_FR
	,LT_Lang_IT
	,LT_Lang_EN
	,LT_Status
	,LT_Sort
	,LT_StylizerBack
	,LT_StylizerFore
	,LT_StylizerPattern
	,LT_StylizerLine
	,LT_IsDefault
	,LT_DatumMut
	,LT_DatumUser
) 
SELECT 
	 t1.LT_UID
	,t1.LT_MDT_ID
	,t1.LT_Code
	,t1.LT_Kurz_DE
	,t1.LT_Kurz_FR
	,t1.LT_Kurz_IT
	,t1.LT_Kurz_EN
	,t1.LT_Lang_DE
	,t1.LT_Lang_FR
	,t1.LT_Lang_IT
	,t1.LT_Lang_EN
	,t1.LT_Status
	,t1.LT_Sort
	,t1.LT_StylizerBack
	,t1.LT_StylizerFore
	,t1.LT_StylizerPattern
	,t1.LT_StylizerLine
	,t1.LT_IsDefault
	,t1.LT_DatumMut
	,t1.LT_DatumUser
FROM @Landesteile AS t1
LEFT JOIN T_AP_Ref_Landesteile 
	ON T_AP_Ref_Landesteile.LT_UID = t1.LT_UID 

WHERE T_AP_Ref_Landesteile.LT_UID IS NULL 
;



UPDATE T_AP_Ref_Landesteile 
	SET  T_AP_Ref_Landesteile.LT_MDT_ID = t1.LT_MDT_ID
		,T_AP_Ref_Landesteile.LT_Code = t1.LT_Code 
		 
		,T_AP_Ref_Landesteile.LT_Kurz_DE = t1.LT_Kurz_DE 
		,T_AP_Ref_Landesteile.LT_Kurz_FR = t1.LT_Kurz_FR 
		,T_AP_Ref_Landesteile.LT_Kurz_IT = t1.LT_Kurz_IT 
		,T_AP_Ref_Landesteile.LT_Kurz_EN = t1.LT_Kurz_EN 
		 
		,T_AP_Ref_Landesteile.LT_Lang_DE = t1.LT_Lang_DE 
		,T_AP_Ref_Landesteile.LT_Lang_FR = t1.LT_Lang_FR 
		,T_AP_Ref_Landesteile.LT_Lang_IT = t1.LT_Lang_IT 
		,T_AP_Ref_Landesteile.LT_Lang_EN = t1.LT_Lang_EN 
		 
		,T_AP_Ref_Landesteile.LT_Status = t1.LT_Status 
		,T_AP_Ref_Landesteile.LT_Sort = t1.LT_Sort 
		,T_AP_Ref_Landesteile.LT_StylizerBack = t1.LT_StylizerBack 
		,T_AP_Ref_Landesteile.LT_StylizerFore = t1.LT_StylizerFore 
		,T_AP_Ref_Landesteile.LT_StylizerPattern = t1.LT_StylizerPattern 
		,T_AP_Ref_Landesteile.LT_StylizerLine = t1.LT_StylizerLine 
		,T_AP_Ref_Landesteile.LT_IsDefault = t1.LT_IsDefault 
		,T_AP_Ref_Landesteile.LT_DatumMut = t1.LT_DatumMut 
		,T_AP_Ref_Landesteile.LT_DatumUser = t1.LT_DatumUser 
FROM T_AP_Ref_Landesteile AS tTarget 
INNER JOIN @Landesteile AS t1 
	ON t1.LT_UID = tTarget.LT_UID 
;

*/


-- Datatype-breakdown
/*


SELECT DATA_TYPE  FROM INFORMATION_SCHEMA.COLUMNS 
WHERE DATA_TYPE not in ('char', 'nchar', 'varchar', 'nvarchar', 'text', 'ntext'
	, 'uniqueidentifier', 'float', 'tinyint', 'smallint', 'int', 'bigint', 'bit', 'text'
	, 'decimal', 'numeric'
	,'xml'
	,'varbinary'
	, 'image'
	,'datetime'
	, 'date'
	,'sql_variant'
);




-- SELECT DATA_TYPE, COUNT(*) AS cnt FROM INFORMATION_SCHEMA.COLUMNS GROUP BY DATA_TYPE ORDER BY cnt DESC 

SELECT 
	DATA_TYPE + 
	COALESCE
	(
		'(' + 
		CASE 
			WHEN DATA_TYPE IN ('numeric', 'decimal') THEN 
				  CAST(NUMERIC_PRECISION AS varchar(30))
				+ ','
				+ CAST(NUMERIC_SCALE AS varchar(30)) 
			WHEN DATA_TYPE IN ('text', 'ntext', 'xml', 'image') THEN NULL
			WHEN CHARACTER_MAXIMUM_LENGTH = -1 OR DATA_TYPE IN ('image') THEN 'MAX' 
			ELSE CAST(CHARACTER_MAXIMUM_LENGTH AS varchar(30)) 
		END 
		+ ')'
		, ''
	)
	,COUNT(*) AS cnt 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE DATA_TYPE = 'varchar' 
GROUP BY DATA_TYPE
,	COALESCE
	(
		'(' + 
		CASE 
			WHEN DATA_TYPE IN ('numeric', 'decimal') THEN 
				  CAST(NUMERIC_PRECISION AS varchar(30))
				+ ','
				+ CAST(NUMERIC_SCALE AS varchar(30)) 
			WHEN DATA_TYPE IN ('text', 'ntext', 'xml', 'image') THEN NULL
			WHEN CHARACTER_MAXIMUM_LENGTH = -1 OR DATA_TYPE IN ('image') THEN 'MAX' 
			ELSE CAST(CHARACTER_MAXIMUM_LENGTH AS varchar(30)) 
		END 
		+ ')'
		, ''
	)
ORDER BY cnt DESC 

*/


-- column-names

/*

-- https://stackoverflow.com/questions/1196415/what-datatype-to-use-when-storing-latitude-and-longitude-data-in-sql-databases
-- https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
-- GPS: decimal(9,6)
SELECT 
	 TABLE_NAME
	,COLUMN_NAME 
	--,ORDINAL_POSITION
	 DATA_TYPE
	,CHARACTER_MAXIMUM_LENGTH
	,NUMERIC_SCALE
	, 
	DATA_TYPE + 
	COALESCE
	(
		'(' + 
		CASE 
			WHEN DATA_TYPE IN ('numeric', 'decimal') THEN 
				  CAST(NUMERIC_PRECISION AS varchar(30))
				+ ','
				+ CAST(NUMERIC_SCALE AS varchar(30)) 
			WHEN DATA_TYPE IN ('text', 'ntext', 'xml', 'image') THEN NULL
			WHEN CHARACTER_MAXIMUM_LENGTH = -1 OR DATA_TYPE IN ('image') THEN 'MAX' 
			ELSE CAST(CHARACTER_MAXIMUM_LENGTH AS varchar(30)) 
		END 
		+ ')'
		, ''
	)
FROM INFORMATION_SCHEMA.COLUMNS 
--WHERE DATA_TYPE IN ('decimal' )
*/
