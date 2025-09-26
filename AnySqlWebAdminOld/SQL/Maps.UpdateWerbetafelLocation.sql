
-- DECLARE @BE_Hash varchar(50) 
-- SET @BE_Hash = '200CEB26807D6BF99FD6F4F0D1CA54D4'
-- SET @BE_Hash = '12435'
-- SET @BE_Hash= '12605' 

-- -- DECLARE @BE_Hash int 
-- -- SET @BE_Hash = 12435


-- DECLARE @AL_UID uniqueidentifier 
-- DECLARE @lat decimal(23, 20)  
-- DECLARE @lng decimal(23, 20)  

-- SET @AL_UID = '2611B457-9445-4BC9-88C1-9DC787133020' 
-- SET @lat = 1.0
-- SET @lng = 2.0 


DECLARE @tAnlageToUpdate TABLE (AL_UID uniqueidentifier NOT NULL); 
INSERT INTO @tAnlageToUpdate(AL_UID) 
SELECT 
	T_AP_Anlage.AL_UID 
FROM T_AP_Anlage 
WHERE (1=1) 
AND T_AP_Anlage.AL_Status = 1 
AND T_AP_Anlage.AL_UID = @AL_UID 
AND T_AP_Anlage.AL_UID IN 
( 
	SELECT 
		T_SYS_Anlagerechte.ALR_AL_UID 
	FROM T_SYS_Anlagerechte 
	WHERE T_SYS_Anlagerechte.ALR_Status = 1 
	AND T_SYS_Anlagerechte.ALR_IsWrite = 1 
	AND T_SYS_Anlagerechte.ALR_GRANTEE_ID IN 
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


UPDATE T_AP_Anlage  
	SET  AL_GM_Lat = @lat 
		,AL_GM_Lng = @lng 
WHERE T_AP_Anlage.AL_UID IN (SELECT t.AL_UID FROM @tAnlageToUpdate AS t ) 
; 

SELECT * FROM @tAnlageToUpdate; 
