
DELETE FROM T_COR_ZO_ObjektRechte_Lesen 
WHERE (1=1) 
AND T_COR_ZO_ObjektRechte_Lesen.ZO_OBJR_OBJ_OBJT_Code = 'AL' 
AND T_COR_ZO_ObjektRechte_Lesen.ZO_OBJR_OBJ_UID IN (SELECT AL_UID FROM T_AP_Anlage WHERE AL_Nr LIKE '%Werbetafel @%' ) 
;

DELETE FROM T_SYS_Anlagerechte 
WHERE (1=1) 
AND T_SYS_Anlagerechte.ALR_AL_UID IN (SELECT AL_UID FROM T_AP_Anlage WHERE AL_Nr LIKE '%Werbetafel @%' ) 
;

DELETE FROM T_COR_Objekte 
WHERE OBJ_OBJT_Code = 'AL' 
AND T_COR_Objekte.OBJ_UID IN (SELECT AL_UID FROM T_AP_Anlage WHERE AL_Nr LIKE '%Werbetafel @%' ) 
;

DELETE FROM T_AP_Anlage WHERE (1=1) 
AND AL_Nr LIKE '%Werbetafel @%'
; 
