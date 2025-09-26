
-- DECLARE @BE_Hash varchar(50) 
-- SET @BE_Hash = '200CEB26807D6BF99FD6F4F0D1CA54D4'
-- SET @BE_Hash = '12435'
-- SET @BE_Hash= '12605' 

-- -- DECLARE @BE_Hash int 
-- -- SET @BE_Hash = 12435


-- DECLARE @GB_UID uniqueidentifier 
-- DECLARE @lat decimal(23, 20)  
-- DECLARE @lng decimal(23, 20)  

-- SET @GB_UID = '2611B457-9445-4BC9-88C1-9DC787133020' 
-- SET @lat = 1.0
-- SET @lng = 2.0 


DECLARE @tBuildingToUpdate TABLE (GB_UID uniqueidentifier NOT NULL); 
INSERT INTO @tBuildingToUpdate(GB_UID) 
SELECT 
	T_AP_Gebaeude.GB_UID 
FROM T_AP_Gebaeude 
WHERE (1=1) 
AND T_AP_Gebaeude.GB_Status = 1 
AND T_AP_Gebaeude.GB_UID = @GB_UID 
AND T_AP_Gebaeude.GB_UID IN 
( 
	SELECT 
		T_SYS_Gebaeuderechte.GBR_GB_UID 
	FROM T_SYS_Gebaeuderechte 
	WHERE T_SYS_Gebaeuderechte.GBR_Status = 1 
	AND T_SYS_Gebaeuderechte.GBR_IsWrite = 1 
	AND T_SYS_Gebaeuderechte.GBR_GRANTEE_ID IN 
	( 
		SELECT 
			T_Benutzer_Benutzergruppen.BEBG_BG 
		FROM T_Benutzer 
		INNER JOIN T_Benutzer_Benutzergruppen 
			ON T_Benutzer_Benutzergruppen.BEBG_BE = T_Benutzer.BE_ID 
		WHERE T_Benutzer.BE_Status = 1 
		AND 
		( 
			CAST(T_Benutzer.BE_ID AS varchar(50)) = @BE_Hash 
			OR 
			T_Benutzer.BE_Hash = CAST(@BE_Hash AS varchar(50)) 
		) 
	) 
); 


UPDATE T_AP_Gebaeude  
	SET  GB_GM_Lat = @lat 
		,GB_GM_Lng = @lng 
WHERE T_AP_Gebaeude.GB_UID IN (SELECT t.GB_UID FROM @tBuildingToUpdate AS t ) 
; 

SELECT * FROM @tBuildingToUpdate; 
