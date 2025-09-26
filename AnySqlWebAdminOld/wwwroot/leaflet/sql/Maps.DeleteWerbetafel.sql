
-- DECLARE @obj_uid uniqueidentifier 
-- SET @obj_uid = '959C0E4B-17F2-4A2D-8452-29CC218E6B77'


DELETE FROM T_COR_ZO_ObjektRechte_Lesen 
WHERE T_COR_ZO_ObjektRechte_Lesen.ZO_OBJR_OBJ_OBJT_Code = 'AL'
AND T_COR_ZO_ObjektRechte_Lesen.ZO_OBJR_OBJ_UID = @obj_uid 

DELETE FROM T_SYS_Anlagerechte 
WHERE (1=1) 
AND T_SYS_Anlagerechte.ALR_AL_UID = @obj_uid 


DELETE FROM T_COR_Objekte 
WHERE OBJ_OBJT_Code = 'AL' 
AND OBJ_UID =  @obj_uid 

DELETE FROM T_AP_Anlage WHERE AL_UID = @obj_uid 


/*

DELETE FROM T_COR_ZO_ObjektRechte_Lesen 
WHERE ZO_OBJR_OBJ_OBJT_Code = 'AL'
AND ZO_OBJR_OBJ_UID IN 
(
	SELECT AL_UID FROM T_AP_Anlage 
	WHERE AL_Nr LIKE 'Werbetafel @%'
)


DELETE FROM T_SYS_Anlagerechte 
WHERE ALR_AL_UID IN 
(
	SELECT AL_UID FROM T_AP_Anlage 
	WHERE AL_Nr LIKE 'Werbetafel @%'
)

DELETE FROM T_COR_Objekte 
WHERE OBJ_OBJT_Code = 'AL' 
AND OBJ_UID IN 
(
	SELECT AL_UID FROM T_AP_Anlage 
	WHERE AL_Nr LIKE 'Werbetafel @%'
)



DELETE FROM T_AP_Anlage WHERE AL_Nr LIKE 'Werbetafel @%'
*/
