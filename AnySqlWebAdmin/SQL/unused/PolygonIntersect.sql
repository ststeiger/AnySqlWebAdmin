
-- https://stackoverflow.com/questions/47967913/determine-if-point-is-inside-shape-sql-server-2014

DECLARE @point GEOGRAPHY;
SET @point = geography::Point(47.653, -122.358, 4326)

DECLARE @polygon geography;  
SET @polygon = geography::STPolyFromText('POLYGON((-122.358 47.653, -122.348 47.649, -122.348 47.658, -122.358 47.658, -122.358 47.653))', 4326);  

SELECT @polygon.STIntersects(@point) 


SELECT 
	 GB_UID
	,GB_SO_UID
	,_GB_Label
	--,_GB_Sort
	--,GB_Nr
	
	--,GB_Strasse
	--,GB_StrasseNr
	--,GB_PLZ
	--,GB_Ort
	--,GB_Bezeichnung
	,GB_GM_Lat
	,GB_GM_Lng
	--,GB_GM_SVLat
	--,GB_GM_SVLng
	--,geography::Point(T_AP_Gebaeude.GB_GM_Lat, T_AP_Gebaeude.GB_GM_Lng, 4326) AS point 
FROM T_AP_Gebaeude 
WHERE (1=1) 
AND T_AP_Gebaeude.GB_Status= 1 
AND CURRENT_TIMESTAMP BETWEEN T_AP_Gebaeude.GB_DatumVon AND T_AP_Gebaeude.GB_DatumBis	
-- WHERE POLYGON.STIntersects(@point) = 1
AND @polygon.STIntersects(geography::Point(T_AP_Gebaeude.GB_GM_Lat, T_AP_Gebaeude.GB_GM_Lng, 4326)) = 1 
