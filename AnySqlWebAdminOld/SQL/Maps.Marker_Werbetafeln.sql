
-- FMS_Maps_Marker_Werbetafeln.sql

SELECT 
	 T_AP_Anlage.AL_UID AS OBJ_UID 
	--,T_AP_Anlage.AL_Nr 
	--,T_AP_Anlage.AL_SO_UID 
	--,T_AP_Anlage.AL_GB_UID 
	--,T_AP_Anlage.AL_GS_UID 
	--,T_AP_Anlage.AL_RM_UID 
	,T_AP_Anlage.AL_GM_Lat AS OBJ_Lat 
	,T_AP_Anlage.AL_GM_Lng AS OBJ_Lng 
FROM T_AP_Anlage 
WHERE (1=1) 
AND T_AP_Anlage.AL_Status = 1 
AND CAST(FLOOR(CAST(CURRENT_TIMESTAMP AS float)) AS datetime) BETWEEN T_AP_Anlage.AL_DatumVon AND T_AP_Anlage.AL_DatumBis  
AND T_AP_Anlage.AL_AK_UID = 'ed49e68b-ab6a-4fac-93b4-b1507e9fdb68' 


-- SELECT * FROM T_AP_Ref_AnlageKategorie WHERE AK_UID = 'ed49e68b-ab6a-4fac-93b4-b1507e9fdb68'
