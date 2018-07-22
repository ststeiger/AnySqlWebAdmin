
-- FMS_Maps_Gebaeudekategorie.sql 
-- DECLARE @BE_Hash int 
-- SET @BE_Hash = (SELECT TOP 1 BE_ID FROM T_Benutzer WHERE BE_User = 'administrator') 


SELECT 
	 T_AP_Ref_GebaeudeKategorie.GK_UID AS OBJ_UID 
	,
	CASE T_Benutzer.BE_Language 
		WHEN 'FR' THEN T_AP_Ref_GebaeudeKategorie.GK_Kurz_FR 
		WHEN 'IT' THEN T_AP_Ref_GebaeudeKategorie.GK_Kurz_IT 
		WHEN 'EN' THEN T_AP_Ref_GebaeudeKategorie.GK_Kurz_EN 
		ELSE T_AP_Ref_GebaeudeKategorie.GK_Kurz_DE 
	END AS OBJ_Kurz 
	
	,
	CASE T_Benutzer.BE_Language 
		WHEN 'FR' THEN T_AP_Ref_GebaeudeKategorie.GK_Lang_FR 
		WHEN 'IT' THEN T_AP_Ref_GebaeudeKategorie.GK_Lang_IT 
		WHEN 'EN' THEN T_AP_Ref_GebaeudeKategorie.GK_Lang_EN 
		ELSE T_AP_Ref_GebaeudeKategorie.GK_Lang_DE 
	END AS OBJ_Lang 
	 
	,'#' + T_SYS_ApertureColorToHex.COL_Hex AS OBJ_Color 

	,T_AP_Ref_GebaeudeKategorie.GK_Sort AS OBJ_Sort 
FROM T_AP_Ref_GebaeudeKategorie

LEFT JOIN T_SYS_ApertureColorToHex 
	ON T_SYS_ApertureColorToHex.COL_Aperture = T_AP_Ref_GebaeudeKategorie.GK_StylizerFore   

INNER JOIN T_Benutzer 
	ON 
	(
		CAST(T_Benutzer.BE_ID AS varchar(50)) = @BE_Hash 
		OR 
		T_Benutzer.BE_Hash = CAST(@BE_Hash AS varchar(50)) 
	) 
	AND T_Benutzer.BE_Status = 1 

WHERE T_AP_Ref_GebaeudeKategorie.GK_Status = 1 

ORDER BY OBJ_Sort, OBJ_Lang 
