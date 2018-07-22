
-- DECLARE @__stichtag varchar(50) 
-- SET @__stichtag = '31.12.2017'


-- DECLARE @BE_Hash varchar(50) 
-- SET @BE_Hash = (SELECT TOP 1 CAST(BE_ID  AS varchar(50)) FROM T_Benutzer WHERE BE_User = 'administrator') 
-- SET @BE_Hash = (SELECT TOP 1 BE_Hash FROM T_Benutzer WHERE BE_User = 'administrator') 


;WITH CTE AS 
(
	SELECT 
		 GB_UID AS OBJ_UID 
		,T_OV_Ref_ObjektTyp.OBJT_Code AS OBJT_Code 
		--,T_AP_Gebaeude.GB_Nr AS OBJ_Nr 
		--,T_AP_Gebaeude.GB_Bezeichnung AS OBJ_Bez
		--,T_AP_Gebaeude._GB_Label AS OBJ_Label 

		,  
		   ISNULL(NULLIF(T_AP_Gebaeude.GB_Nr, '') + ' ', '')
		 + ISNULL(NULLIF(T_AP_Gebaeude.GB_Bezeichnung, '') 
		 + CHAR(13) + CHAR(10), '') 
		 + ISNULL(NULLIF(ISNULL(NULLIF(T_AP_Gebaeude.GB_Strasse, '') + ' ', '') + ISNULL(NULLIF(T_AP_Gebaeude.GB_StrasseNr, ''), ''), '') 
		 + CHAR(13) + CHAR(10), '') 
		 + ISNULL(NULLIF(T_AP_Gebaeude.GB_PLZ, '') + ' ', '') + ISNULL(NULLIF(T_AP_Gebaeude.GB_Ort, ''), '') 
		 AS OBJ_Label 
		 
		,T_AP_Gebaeude.GB_GM_Lat AS OBJ_Lat 
		,T_AP_Gebaeude.GB_GM_Lng AS OBJ_Long 

		,
		CASE T_Benutzer.BE_Language 
			WHEN 'FR' THEN T_AP_Ref_GebaeudeKategorie.GK_Lang_FR 
			WHEN 'IT' THEN T_AP_Ref_GebaeudeKategorie.GK_Lang_IT 
			WHEN 'EN' THEN T_AP_Ref_GebaeudeKategorie.GK_Lang_EN 
			ELSE T_AP_Ref_GebaeudeKategorie.GK_Lang_DE 
		END AS OBJ_Kategorie 

		--,
		---- https://simple.wikipedia.org/wiki/Color_wheel
		--CASE T_AP_Ref_GebaeudeKategorie.GK_Kurz_DE 
		--	WHEN 'HS' THEN '#FF0000' -- Hauptsitz: red 
		--	WHEN 'GA' THEN '#FF7F00' -- Generalagentur: orange 
		--	WHEN 'HA' THEN '#007FFF' -- Hauptagentur: yellow 
		--	WHEN 'AG' THEN '#00FF00' -- Agentur: green 
		--	WHEN 'HUB' THEN '#00FFFF' -- Hubs: cyan 
		--	WHEN 'SPEZ' THEN '#FFFF00' -- -- Spezial: azure/blue
		--	ELSE '#FF007F' -- rose
		--END AS OBJ_Color 

		,'#' + T_SYS_ApertureColorToHex.COL_Hex AS OBJ_Color 

		--,GB_Nr 
		--,GB_Bezeichnung 
		,GB_Strasse 
		,GB_PLZ
		,GB_Ort
		,_GB_Sort 

		--,T_AP_Gebaeude.GB_GM_SVLat
		--,T_AP_Gebaeude.GB_GM_SVLng
		--,T_AP_Gebaeude._GB_Sort AS OBJ_Sort 


		--,T_AP_Gebaeude.GB_Nr
		--,T_AP_Gebaeude.GB_Strasse
		--,T_AP_Gebaeude.GB_StrasseNr
		--,T_AP_Gebaeude.GB_PLZ
		--,T_AP_Gebaeude.GB_Ort
		--,T_AP_Gebaeude.GB_Bezeichnung
		--,T_AP_Gebaeude.GB_Bemerkung 

		--,T_AP_Standort.SO_UID 
		--,T_AP_Standort.SO_Bezeichnung 
		--,T_AP_Standort.SO_Nr 


		,STUFF
		(
			(
				SELECT 
					',' 
					+ CAST(T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_GM_Lat AS varchar(25)) 
					+ ' ' 
					+ CAST(T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_GM_Lng AS varchar(25)) 
					AS [text()] 
				FROM T_ZO_Objekt_Wgs84Polygon
				WHERE T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_GB_UID = T_AP_Gebaeude.GB_UID
				-- WHERE T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_SO_UID = T_AP_Standort.SO_UID 
				ORDER BY T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_Sort ASC 
				FOR XML PATH(''), TYPE
			).value('.', 'varchar(MAX)') 
			,1
			,1
			, ''
		) 
		AS OBJ_Polygon 

	FROM T_AP_Gebaeude 
	
	LEFT JOIN T_AP_Ref_GebaeudeKategorie 
		ON T_AP_Ref_GebaeudeKategorie.GK_UID = T_AP_Gebaeude.GB_GK_UID 

	LEFT JOIN T_SYS_ApertureColorToHex 
		ON T_SYS_ApertureColorToHex.COL_Aperture = ISNULL(T_AP_Ref_GebaeudeKategorie.GK_StylizerFore, 104) 

	INNER JOIN T_OV_Ref_ObjektTyp -- GRU, SO, GB 
		ON T_OV_Ref_ObjektTyp.OBJT_Code = 'GB' 
		AND T_OV_Ref_ObjektTyp.OBJT_Status = 1 

	INNER JOIN T_Benutzer 
		ON 
		(
			CAST(T_Benutzer.BE_ID AS varchar(50)) = @BE_Hash 
			OR 
			T_Benutzer.BE_Hash = CAST(@BE_Hash AS varchar(50)) 
		) 
		AND T_Benutzer.BE_Status = 1 
		
	INNER JOIN T_AP_Standort 
		ON T_AP_Standort.SO_UID = T_AP_Gebaeude.GB_SO_UID 
		AND T_AP_Standort.SO_Status = 1 
		AND @__stichtag BETWEEN T_AP_Standort.SO_DatumVon AND T_AP_Standort.SO_DatumBis 
		/*
	INNER JOIN T_COR_Objekte 
		ON T_COR_Objekte.OBJ_UID = T_AP_Gebaeude.GB_UID 
		AND T_COR_Objekte.OBJ_OBJT_Code = T_OV_Ref_ObjektTyp.OBJT_Code 
		AND @__stichtag BETWEEN T_COR_Objekte.OBJ_DatumVon AND T_COR_Objekte.OBJ_DatumBis 
		AND 
		(
			(T_COR_Objekte.OBJ_usePRT = 0) 
			OR
			(
				T_COR_Objekte.OBJ_usePRT = 1 
				AND 
				EXISTS
				(
					SELECT T_COR_ZO_ObjektRechte_Lesen.ZO_OBJR_OBJ_UID
					FROM T_Benutzer_Benutzergruppen
					INNER JOIN T_COR_ZO_ObjektRechte_Lesen 
						ON T_COR_ZO_ObjektRechte_Lesen.ZO_OBJR_ID = T_Benutzer_Benutzergruppen.BEBG_BG
						AND (T_Benutzer_Benutzergruppen.BEBG_BE = T_Benutzer.BE_ID)
						AND (T_COR_ZO_ObjektRechte_Lesen.ZO_OBJR_OBJ_OBJT_Code = T_COR_Objekte.OBJ_OBJT_Code) 
					WHERE T_COR_ZO_ObjektRechte_Lesen.ZO_OBJR_OBJ_UID = T_COR_Objekte.OBJ_UID 
				)
			)
		)
		*/
	WHERE T_AP_Gebaeude.GB_Status = 1 
	AND @__stichtag BETWEEN T_AP_Gebaeude.GB_DatumVon AND T_AP_Gebaeude.GB_DatumBis 
	
	AND 
	(
		(
			GB_GM_Lat IS NOT NULL 
			AND 
			GB_GM_Lng IS NOT NULL 
		)
		AND NOT 
		(
			GB_GM_Lat = 0.0 
			AND 
			GB_GM_Lng = 0.0 
		)
	)

)
SELECT 
	 OBJ_UID 
	,OBJT_Code 
	,OBJ_Label 
	,OBJ_Lat 
	,OBJ_Long 
	,OBJ_Kategorie 
	,OBJ_Color 
	--,GB_Strasse 
	--,GB_PLZ 
	--,GB_Ort 
	--,_GB_Sort 
	,OBJ_Polygon 
FROM CTE 
WHERE (1=1) 

-- AND polygon IS NULL 
-- AND GB_UID = '921A3415-51A1-431B-B12B-00AE5E867ABE' 

ORDER BY 
	 --OBJ_Sort 
	--,OBJ_Nr 
	 _GB_Sort 
	,OBJ_Label 
	 