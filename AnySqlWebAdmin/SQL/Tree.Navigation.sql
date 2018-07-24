-- DECLARE  @__in_parent varchar(36)  
-- SET @__in_parent = 'F0000000-E000-0000-0000-000000000002'
-- -- SET @__in_parent =  'BEB6CD1D-5ACB-4FB1-93F4-A3F07A053DB7'
-- SET @__in_parent = NULL 

SELECT 
     T_FMS_Navigation.NA_UID AS id 
    ,T_FMS_Navigation.NA_NA_UID AS parent 
    ,T_FMS_Translation.FT_DE AS text 
    --,T_FMS_Navigation.NA_Sort 

    ,
    CASE 
      WHEN EXISTS
        (
          SELECT * 
          FROM T_FMS_Navigation AS Children 
          WHERE Children.NA_Status = 1 
          AND Children.NA_NA_UID = T_FMS_Navigation.NA_UID 
        ) THEN 1 
      ELSE 0 
    END AS hasChildren 
FROM T_FMS_Navigation 

LEFT JOIN T_FMS_Translation 
  ON T_FMS_Translation.FT_UID = T_FMS_Navigation.NA_FT_UID 
  
WHERE T_FMS_Navigation.NA_Status = 1 
AND 
(
  NA_NA_UID = @__in_parent 
  OR 
  (
    @__in_parent IS NULL 
    AND 
    NA_NA_UID IS NULL 
  )
)

ORDER BY 
  -- T_FMS_Navigation.NA_Sort,
  text 
  