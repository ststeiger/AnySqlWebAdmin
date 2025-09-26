
-- DECLARE @__user_id int 
-- SET @__user_id = (SELECT TOP 1 BE_ID FROM T_Benutzer WHERE BE_User = 'administrator') 

-- DECLARE @__stichtag datetime 
-- SET @__stichtag = CAST(FLOOR(CAST(CURRENT_TIMESTAMP AS float)) AS datetime) 


-- DECLARE @BE_Hash int 
-- SET @BE_Hash = (SELECT TOP 1 BE_ID FROM T_Benutzer WHERE BE_User = 'administrator') 



SELECT 
	 T_AP_Standort.SO_UID AS OBJ_UID 
	,T_OV_Ref_ObjektTyp.OBJT_Code AS OBJT_Code
	--,T_AP_Standort.SO_Nr AS OBJ_Nr 
	--,T_AP_Standort.SO_Bezeichnung AS OBJ_Bez
	
	--,T_AP_Standort._SO_Label AS OBJ_Label 
	,T_AP_Standort._SO_Label + CHAR(13) + CHAR(10) 
	 + 	
		CASE T_Benutzer.BE_Language 
			WHEN 'FR' THEN T_AP_Ref_Ort.ORT_Lang_FR 
			WHEN 'IT' THEN T_AP_Ref_Ort.ORT_Lang_IT 
			WHEN 'EN' THEN T_AP_Ref_Ort.ORT_Lang_EN 
			ELSE T_AP_Ref_Ort.ORT_Lang_DE 
		END 
	AS OBJ_Label 


	,COALESCE
	(
		 NULLIF(T_AP_Standort.SO_GM_Lat, 0.0) 
		,NULLIF(T_AP_Ref_Ort.ORT_GM_Lat, 0.0)
	) AS OBJ_Lat 

	,COALESCE
	(
		 NULLIF(T_AP_Standort.SO_GM_Lng, 0.0) 
		,NULLIF(T_AP_Ref_Ort.ORT_GM_Lng, 0.0)
	) AS OBJ_Long 

	--,T_AP_Standort._SO_Sort AS OBJ_Sort 

FROM T_AP_Standort 

INNER JOIN T_Benutzer 
	ON 
	(
		CAST(T_Benutzer.BE_ID AS varchar(50)) = @BE_Hash 
		OR 
		T_Benutzer.BE_Hash = CAST(@BE_Hash AS varchar(50)) 
	) 
	AND T_Benutzer.BE_Status = 1 

LEFT JOIN T_AP_Ref_Ort 
	ON T_AP_Ref_Ort.ORT_UID = T_AP_Standort.SO_ORT_UID 

INNER JOIN T_OV_Ref_ObjektTyp -- GRU, SO, GB 
	ON T_OV_Ref_ObjektTyp.OBJT_Code = 'SO' 
	AND T_OV_Ref_ObjektTyp.OBJT_Status = 1 
	
INNER JOIN T_COR_Objekte 
	ON T_COR_Objekte.OBJ_UID = T_AP_Standort.SO_UID 
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

ORDER BY 
	-- OBJ_Sort 
	--,OBJ_Nr 
	 T_AP_Standort._SO_Sort 
	,OBJ_Label 
	 