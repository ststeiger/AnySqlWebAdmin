

;WITH CTE_Poly AS 
(
	          SELECT 'a' AS id, geography::STPolyFromText('POLYGON((-122.358 47.653, -122.348 47.649, -122.348 47.658, -122.358 47.658, -122.358 47.653))', 4326) AS poly 
	UNION ALL SELECT 'b' AS id, geography::STPolyFromText('POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))', 4326) AS poly 
)
,CTE_Points AS 
(
	--           SELECT 1 AS id, geography::Point(47.653, -122.358, 4326) AS point 
	-- UNION ALL SELECT 2 AS id, geography::Point(47.653, -122.358, 4326) AS point 

	-- UNION ALL 
	
	SELECT 
		 ROW_NUMBER() OVER (ORDER BY GB_UID) AS id 
		,geography::Point(T_AP_Gebaeude.GB_GM_Lat, T_AP_Gebaeude.GB_GM_Lng, 4326) AS point 
	FROM T_AP_Gebaeude 
	WHERE (1=1) 
	AND T_AP_Gebaeude.GB_Status= 1 
	AND CURRENT_TIMESTAMP BETWEEN T_AP_Gebaeude.GB_DatumVon AND T_AP_Gebaeude.GB_DatumBis 
)
SELECT * FROM CTE_Points 
CROSS JOIN CTE_Poly 
WHERE poly.STIntersects(point) = 1 
