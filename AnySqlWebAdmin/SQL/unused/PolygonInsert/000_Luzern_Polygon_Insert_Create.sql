
-- When DB is restored from SQL-Server < 2016
-- ALTER DATABASE <DB_Name> SET COMPATIBILITY_LEVEL = 130
-- ALTER DATABASE COR_Basic_Demo_V4 SET COMPATIBILITY_LEVEL = 130


/*
SELECT 
	 T_AP_Standort.SO_UID
	,T_AP_Standort.SO_Nr
	,T_AP_Standort.SO_Bezeichnung
	,T_AP_Gebaeude.GB_UID
	,T_AP_Gebaeude.GB_Nr
	,T_AP_Gebaeude.GB_Strasse
	,T_AP_Gebaeude.GB_StrasseNr
	,T_AP_Gebaeude.GB_PLZ
	,T_AP_Gebaeude.GB_Ort
	,T_AP_Gebaeude.GB_Bezeichnung
	,T_AP_Gebaeude.GB_GM_Lat
	,T_AP_Gebaeude.GB_GM_Lng
FROM T_AP_Standort
LEFT JOIN T_AP_Gebaeude 
	ON T_AP_Gebaeude.GB_SO_UID = T_AP_Standort.SO_UID 
	AND T_AP_Gebaeude.GB_Status = 1
	AND CURRENT_TIMESTAMP BETWEEN T_AP_Gebaeude.GB_DatumVon AND T_AP_Gebaeude.GB_DatumBis 
WHERE (1=1) 
AND T_AP_Standort.SO_Status = 1 
AND CURRENT_TIMESTAMP BETWEEN T_AP_Standort.SO_DatumVon AND T_AP_Standort.SO_DatumBis 
-- AND GB_Ort LIKE 'Basel'
AND SO_Bezeichnung = 'Hauptsitz' 
-- AND GB_Bezeichnung LIKE '%alban%'
AND GB_Bezeichnung = 'St. Alban-Anlage 38' -- GB: 9ECA4341-2D3D-464E-9710-DAD58531AFA8 (oberes)
-- AND GB_Bezeichnung = 'Engelgasse 9+11'  -- GB: BDD9FC91-750C-4FE2-BB42-03585C9B65A2 (unteres)
--AND GB_SO_UID = '49DD1D3C-5D56-4624-8893-6820DF7A8579' 
--AND GB_Strasse LIKE '%Alban%'
*/ 





DECLARE @json NVARCHAR(MAX)
DECLARE @SO_UID uniqueidentifier 
DECLARE @GB_UID uniqueidentifier 

SET @SO_UID = NULL 
SET @GB_UID = '36010390-A224-4A46-A3AE-E31C6118190D' -- oberes: 'St. Alban-Anlage 38' 

DELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_SO_UID = @SO_UID; 
DELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_GB_UID = @GB_UID; 


-- 
SET @json='
[
  {
    "lat": 47.0539674,
    "lng": 8.2950902
  },
  {
    "lat": 47.0544371,
    "lng": 8.2955251
  },
  {
    "lat": 47.0543284,
    "lng": 8.2959809
  },
  {
    "lat": 47.0542818,
    "lng": 8.2961025
  },
  {
    "lat": 47.0541201,
    "lng": 8.2964595
  },
  {
    "lat": 47.054058,
    "lng": 8.2964044
  },
  {
    "lat": 47.0542197,
    "lng": 8.296055
  },
  {
    "lat": 47.0541252,
    "lng": 8.2959619
  },
  {
    "lat": 47.0541796,
    "lng": 8.2958328
  },
  {
    "lat": 47.0542624,
    "lng": 8.2959069
  },
  {
    "lat": 47.054287,
    "lng": 8.2958423
  },
  {
    "lat": 47.0539221,
    "lng": 8.2955384
  },
  {
    "lat": 47.0538445,
    "lng": 8.2957283
  },
  {
    "lat": 47.0537888,
    "lng": 8.2958252
  },
  {
    "lat": 47.0538043,
    "lng": 8.2958404
  },
  {
    "lat": 47.053824,
    "lng": 8.2958053
  },
  {
    "lat": 47.0538406,
    "lng": 8.2958233
  },
  {
    "lat": 47.0538212,
    "lng": 8.2958575
  },
  {
    "lat": 47.0540787,
    "lng": 8.2960968
  },
  {
    "lat": 47.0541071,
    "lng": 8.296036
  },
  {
    "lat": 47.0541317,
    "lng": 8.2960588
  },
  {
    "lat": 47.0541045,
    "lng": 8.2961177
  },
  {
    "lat": 47.0541459,
    "lng": 8.2961708
  },
  {
    "lat": 47.0540644,
    "lng": 8.296338
  },
  {
    "lat": 47.0536905,
    "lng": 8.2959771
  },
  {
    "lat": 47.0536646,
    "lng": 8.2960265
  },
  {
    "lat": 47.0538639,
    "lng": 8.296243
  },
  {
    "lat": 47.0538755,
    "lng": 8.2962183
  },
  {
    "lat": 47.0539958,
    "lng": 8.2963323
  },
  {
    "lat": 47.0538872,
    "lng": 8.2965716
  },
  {
    "lat": 47.0538302,
    "lng": 8.2965222
  },
  {
    "lat": 47.0538069,
    "lng": 8.2965773
  },
  {
    "lat": 47.0535908,
    "lng": 8.2963513
  },
  {
    "lat": 47.0536413,
    "lng": 8.2962449
  },
  {
    "lat": 47.0534977,
    "lng": 8.2961082
  },
  {
    "lat": 47.0534912,
    "lng": 8.2960512
  },
  {
    "lat": 47.0537371,
    "lng": 8.2956315
  },
  {
    "lat": 47.0539674,
    "lng": 8.2950902
  }
]
'

/*
INSERT INTO T_ZO_Objekt_Wgs84Polygon
(
	 ZO_OBJ_WGS84_UID
	,ZO_OBJ_WGS84_GB_UID
	,ZO_OBJ_WGS84_SO_UID
	,ZO_OBJ_WGS84_Sort
	,ZO_OBJ_WGS84_GM_Lat
	,ZO_OBJ_WGS84_GM_Lng
) 
*/
SELECT 
	 NEWID() AS ZO_OBJ_WGS84_UID 
	,CAST(@GB_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_GB_UID 
	,CAST(@SO_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_SO_UID 
	,CAST(t1.[key] AS integer) + 1 AS ZO_OBJ_WGS84_Sort  
	--,ROW_NUMBER() OVER (ORDER BY CAST(t1.[key] AS integer) DESC) AS ZO_OBJ_WGS84_Sort 
	,tRowValues.lat AS ZO_OBJ_WGS84_GM_Lat -- decimal(23,20) 
	,tRowValues.lng AS ZO_OBJ_WGS84_GM_Lng -- decimal(23,20) 
	
	,'INSERT INTO T_ZO_Objekt_Wgs84Polygon
(
	 ZO_OBJ_WGS84_UID
	,ZO_OBJ_WGS84_GB_UID
	,ZO_OBJ_WGS84_SO_UID
	,ZO_OBJ_WGS84_Sort
	,ZO_OBJ_WGS84_GM_Lat
	,ZO_OBJ_WGS84_GM_Lng
) 
SELECT 
	 ''' + CAST(NEWID() AS varchar(36)) + ''' AS ZO_OBJ_WGS84_UID 
	,CAST(''' + CAST(@GB_UID AS varchar(36)) + ''' AS uniqueidentifier) AS ZO_OBJ_WGS84_GB_UID 
	,CAST(NULL AS uniqueidentifier) AS ZO_OBJ_WGS84_SO_UID 
	,CAST(''' + CAST(t1.[key] AS varchar(36)) + ''' AS integer) + 1 AS ZO_OBJ_WGS84_Sort  
	,''' + CAST(tRowValues.lat AS varchar(36)) + ''' AS ZO_OBJ_WGS84_GM_Lat 
	,''' + CAST(tRowValues.lng AS varchar(36)) + ''' AS ZO_OBJ_WGS84_GM_Lng 
; 
' AS cmd 
--,CAST(''' + CAST(@SO_UID AS varchar(36)) + ''' AS uniqueidentifier) AS ZO_OBJ_WGS84_SO_UID 
--,ROW_NUMBER() OVER (ORDER BY CAST(t1.[key] AS integer) DESC) AS ZO_OBJ_WGS84_Sort 

FROM OPENJSON( @json) AS t1 

OUTER APPLY 
(
	-- https://stackoverflow.com/questions/38285223/accessing-json-array-in-sql-server-2016-using-json-value
	SELECT * 
	FROM OPENJSON(t1.value) 
	-- decimal(23,20) 
	WITH (lat decimal(23,20) '$.lat', lng decimal(23,20) '$.lng') 
	AS ttttt 
) AS tRowValues


ORDER BY ZO_OBJ_WGS84_Sort 
