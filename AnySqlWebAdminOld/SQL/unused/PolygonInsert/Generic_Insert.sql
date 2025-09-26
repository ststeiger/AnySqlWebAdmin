
-- When DB is restored from SQL-Server < 2016
-- ALTER DATABASE <DB_Name> SET COMPATIBILITY_LEVEL = 130
-- ALTER DATABASE COR_Basic_Demo_V4 SET COMPATIBILITY_LEVEL = 130


DECLARE @json NVARCHAR(MAX)
DECLARE @SO_UID uniqueidentifier 
DECLARE @GB_UID uniqueidentifier 


SET @SO_UID = NULL 
SET @GB_UID = '9ECA4341-2D3D-464E-9710-DAD58531AFA8' -- oberes: 'St. Alban-Anlage 38' 

-- Example JSON: 
SET @json='
[
  {
    "lat": 47.5519639,
    "lng": 7.5994698
  },
  {
    "lat": 47.5519663,
    "lng": 7.5994828
  },
  {
    "lat": 47.5519639,
    "lng": 7.5994698
  }
]
'



DELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_SO_UID = @SO_UID; 
DELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_GB_UID = @GB_UID; 



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


INSERT INTO T_ZO_Objekt_Wgs84Polygon
(
	 ZO_OBJ_WGS84_UID
	,ZO_OBJ_WGS84_GB_UID
	,ZO_OBJ_WGS84_SO_UID
	,ZO_OBJ_WGS84_Sort
	,ZO_OBJ_WGS84_GM_Lat
	,ZO_OBJ_WGS84_GM_Lng
) 
SELECT 
	 NEWID() AS ZO_OBJ_WGS84_UID 
	,CAST(@GB_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_GB_UID 
	,CAST(@SO_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_SO_UID 
	,CAST(t1.[key] AS integer) + 1 AS ZO_OBJ_WGS84_Sort  
	--,ROW_NUMBER() OVER (ORDER BY CAST(t1.[key] AS integer) DESC) AS ZO_OBJ_WGS84_Sort 
	,tRowValues.lat AS ZO_OBJ_WGS84_GM_Lat -- decimal(23,20) 
	,tRowValues.lng AS ZO_OBJ_WGS84_GM_Lng -- decimal(23,20) 
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
