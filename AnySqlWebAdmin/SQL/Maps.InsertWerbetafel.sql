
 -- -- FMS_Maps_InsertWerbetafel.sql
 -- DECLARE @BE_Hash varchar(50) 
 -- DECLARE @lat decimal(23, 20)  
 -- DECLARE @lng decimal(23, 20)  

 -- SET @BE_Hash = '200CEB26807D6BF99FD6F4F0D1CA54D4'
 -- SET @lat = 1.0
 -- SET @lng = 0.0 


DECLARE @uid uniqueidentifier 
SET @uid = NEWID() 


DECLARE @alNumeration varchar(8)
SET @alNumeration = (
	SELECT 
		'Lrk' + 
		RIGHT
		(
			REPLICATE('0', 5) + 
			CAST
			(
				ISNULL
				(
					(
						SELECT TOP 1 
							CASE WHEN ISNUMERIC(SUBSTRING(AL_Nr, 4, 10000)) = 1 AND LEN(SUBSTRING(AL_Nr, 4, 10000)) = 5
								THEN CAST(SUBSTRING(AL_Nr, 4, 10000) AS integer) 
								ELSE 0
							END AS NextEntry 
						FROM T_AP_Anlage 
						WHERE AL_Nr LIKE 'Lrk[0-9][0-9][0-9][0-9][0-9]'
						ORDER BY AL_Nr DESC 
					)
					,0
				) + 1 
				AS varchar(20)
			)
			, 5
		) 
); 


INSERT INTO T_AP_Anlage
(
	 AL_UID
	,AL_MDT_ID
	,AL_AK_UID
	,AL_Baujahr
	,AL_DatumVon
	,AL_DatumBis
	,AL_Status
	,AL_Lebensdauer
	,AL_Anschaffungspreis
	,AL_BE_ID
	,AL_IsPraeventiv
	,AL_IsInstandhaltung
	,AL_IsFehlerbehebung
	,AL_IsGesVorschriften
	,AL_IsRelevantNebenkosten
	
	,AL_GM_Lat 
	,AL_GM_Lng 

	,AL_SO_UID 
	,AL_GB_UID 
	,AL_GS_UID 
	,AL_RM_UID 
	,AL_Nr 
	--,AL_Beschreibung 
	--,AL_Bemerkung 
) 
SELECT TOP 1 
	 tInsert.OBJ_UID AS AL_UID 
	,0 AS AL_MDT_ID 
	-- SELECT * FROM T_AP_Ref_AnlageKategorie WHERE AK_UID = 'ed49e68b-ab6a-4fac-93b4-b1507e9fdb68'
	,'ed49e68b-ab6a-4fac-93b4-b1507e9fdb68' AS AL_AK_UID
	,YEAR(CURRENT_TIMESTAMP) AS AL_Baujahr -- int
	,CAST(FLOOR(CAST(CURRENT_TIMESTAMP AS float)) AS datetime) AS AL_DatumVon
	,'29991231' AS AL_DatumBis
	,1 AS AL_Status
	,10 AS AL_Lebensdauer -- int
	,1000 AS AL_Anschaffungspreis -- int
	,tInsert.BE_ID AS AL_BE_ID
	,0 AS AL_IsPraeventiv 
	,0 AS AL_IsInstandhaltung 
	,0 AS AL_IsFehlerbehebung 
	,0 AS AL_IsGesVorschriften 
	,0 AS AL_IsRelevantNebenkosten 

	,tInsert.OBJ_Lat -- AL_GM_Lat 
	,tInsert.OBJ_Lng -- AL_GM_Lng 

	,NULL AS AL_SO_UID 
	,T_AP_Gebaeude.GB_UID AS AL_GB_UID 
	,NULL AS AL_GS_UID 
	,NULL AS AL_RM_UID 

	-- ,'Werbetafel @ ' + tInsert.OBJ_HumanCoordinates AS AL_Nr -- varchar(255) 
	,@alNumeration 
	--,'' AS AL_Beschreibung -- text
	--,'' AS AL_Bemerkung -- , text 
FROM 
( 
	SELECT 
		 @uid AS OBJ_UID 
		,@lat AS OBJ_Lat 
		,@lng AS OBJ_Lng 
		,dbo.fu_RPT_FormatGPS(@lat, @lng) AS OBJ_HumanCoordinates 
		,T_Benutzer.BE_ID 
	FROM T_Benutzer
	WHERE (1=1) 
	AND T_Benutzer.BE_Status = 1 
	AND 
	(
		CAST(T_Benutzer.BE_ID AS varchar(50)) = @BE_Hash 
		OR 
		T_Benutzer.BE_Hash = CAST(@BE_Hash AS varchar(50)) 
	)
) AS tInsert
CROSS JOIN  
	(
		SELECT 
			 T_AP_Gebaeude.GB_UID 
			,T_AP_Gebaeude.GB_SO_UID 
			,T_AP_Gebaeude.GB_GM_Lat 
			,T_AP_Gebaeude.GB_GM_Lng 
		FROM T_AP_Gebaeude 
		WHERE (1=1) 
		AND T_AP_Gebaeude.GB_Status = 1 
		AND CONVERT(CHAR(8), CURRENT_TIMESTAMP, 112) BETWEEN T_AP_Gebaeude.GB_DatumVon AND T_AP_Gebaeude.GB_DatumBis 
		AND 
		( 
			T_AP_Gebaeude.GB_GM_Lat IS NOT NULL 
			AND 
			T_AP_Gebaeude.GB_GM_Lng IS NOT NULL 
		) 
	) AS T_AP_Gebaeude 

CROSS APPLY 
(
	SELECT geography::Point(tInsert.OBJ_Lat, tInsert.OBJ_Lng, 4326).STDistance(geography::Point(T_AP_Gebaeude.GB_GM_Lat, T_AP_Gebaeude.GB_GM_Lng, 4326)) AS OBJ_Distance 
) AS tDistance 
ORDER BY tDistance.OBJ_Distance 
;


/*
SELECT * FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'T_AP_Anlage' 
AND IS_NULLABLE = 'NO'

ORDER BY ORDINAL_POSITION
*/ 



INSERT INTO T_SYS_Anlagerechte
(
	 ALR_UID
	,ALR_MDT_ID
	,ALR_GRANTEE_ID
	,ALR_AL_UID
	,ALR_IsRead
	,ALR_IsWrite
	,ALR_IsInsert
	,ALR_IsDelete
	,ALR_Status
)
SELECT 
	 NEWID() AS ALR_UID 
	,T_AP_Anlage.AL_MDT_ID AS ALR_MDT_ID 
	,T_Benutzergruppen.ID AS ALR_GRANTEE_ID 
	,T_AP_Anlage.AL_UID AS ALR_AL_UID 
	,1 AS ALR_IsRead 
	,1 AS ALR_IsWrite 
	,1 AS ALR_IsInsert 
	,1 AS ALR_IsDelete 
	,1 AS ALR_Status 
FROM 
(
	SELECT 
		 T_AP_Anlage.AL_UID 
		,T_AP_Anlage.AL_MDT_ID 
	FROM T_AP_Anlage 
	WHERE T_AP_Anlage.AL_UID = @uid 
) AS T_AP_Anlage 

CROSS JOIN 
(
	SELECT 
		 T_Benutzergruppen.ID 
		,T_Benutzergruppen.Name 
	FROM T_Benutzer 
	INNER JOIN T_Benutzer_Benutzergruppen ON BEBG_BE = T_Benutzer.BE_ID 
	INNER JOIN T_Benutzergruppen ON T_Benutzergruppen.ID = T_Benutzer_Benutzergruppen.BEBG_BG

	WHERE (1=1) 
	AND T_Benutzer.BE_Status = 1 
	AND 
	(
		CAST(T_Benutzer.BE_ID AS varchar(50)) = @BE_Hash 
		OR 
		T_Benutzer.BE_Hash = CAST(@BE_Hash AS varchar(50)) 
	)

	UNION 

	SELECT 
		 T_Benutzergruppen.ID
		,T_Benutzergruppen.Name
	FROM T_Benutzergruppen 
	WHERE T_Benutzergruppen.IsPotfolioStd = 1 
) AS T_Benutzergruppen 

LEFT JOIN T_SYS_Anlagerechte 
	ON T_SYS_Anlagerechte.ALR_AL_UID = T_AP_Anlage.AL_UID 
	AND T_SYS_Anlagerechte.ALR_GRANTEE_ID = T_Benutzergruppen.ID 

WHERE T_SYS_Anlagerechte.ALR_UID IS NULL 
;



EXEC stp_COR_Objekte_InsertUpdate @uid, 'AL'; 
EXEC stp_COR_ObjektRechte_InsertUpdate @uid, 'AL'; 

SELECT @uid AS OBJ_UID, @lat AS OBJ_Lat, @lng AS OBJ_Lng; 
