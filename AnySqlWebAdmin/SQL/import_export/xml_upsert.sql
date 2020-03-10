
DECLARE @xml xml 
SET @xml = '<table xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <row>
    <PS_UID>BB01AB7A-0AFA-4C00-AD27-0150774EF8B5</PS_UID>
    <PS_Code>A3</PS_Code>
    <PS_Lang_DE>A3 hoch</PS_Lang>
    <PS_Width_mm>297.00</PS_Width_mm>
    <PS_Height_mm>420.00</PS_Height_mm>
    <PS_Sort>4</PS_Sort>
    <PS_Status>1</PS_Status>
  </row>
</table>'


DECLARE @handle INT  
DECLARE @PrepareXmlStatus INT  

EXEC @PrepareXmlStatus = sp_xml_preparedocument @handle OUTPUT, @XML


-- DELETE FROM T_VWS_Ref_PaperSize;



;WITH CTE AS 
(
	SELECT 
		 PS_UID
		,PS_Code
		,PS_Lang_DE
		,PS_Lang_FR
		,PS_Lang_IT
		,PS_Lang_EN
		,PS_Width_mm
		,PS_Height_mm
		,PS_Sort
		,PS_Status
	FROM OPENXML(@handle, '/table/row', 2) WITH 
	(
		 "PS_UID" uniqueidentifier 'PS_UID[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Code" character varying(10) 'PS_Code[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Lang_DE" character varying(50) 'PS_Lang_DE[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Lang_FR" character varying(50) 'PS_Lang_FR[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Lang_IT" character varying(50) 'PS_Lang_IT[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Lang_EN" character varying(50) 'PS_Lang_EN[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Width_mm" decimal(12,2) 'PS_Width_mm[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Height_mm" decimal(12,2) 'PS_Height_mm[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Sort" int 'PS_Sort[not(@*[local-name()="nil" and . ="true"])]'
		,"PS_Status" int 'PS_Status[not(@*[local-name()="nil" and . ="true"])]'
	) AS tSource 

	WHERE (1=1) 
	
	-- AND NOT EXISTS 
	-- ( 
	-- 	SELECT * FROM T_VWS_Ref_PaperSize 
	-- 	WHERE T_VWS_Ref_PaperSize.PS_UID = tSource.PS_UID 
	-- ) 
) 
-- SELECT * FROM CTE 

MERGE INTO T_VWS_Ref_PaperSize AS A 
USING CTE ON CTE.PS_UID = A.PS_UID 
WHEN MATCHED 
	THEN UPDATE 
		SET  A.PS_Code = CTE.PS_Code 
			,A.PS_Lang_DE = CTE.PS_Lang_DE 
			,A.PS_Lang_FR = CTE.PS_Lang_FR 
			,A.PS_Lang_IT = CTE.PS_Lang_IT 
			,A.PS_Lang_EN = CTE.PS_Lang_EN 
			,A.PS_Width_mm = CTE.PS_Width_mm 
			,A.PS_Height_mm = CTE.PS_Height_mm 
			,A.PS_Sort = CTE.PS_Sort 
			,A.PS_Status  = CTE.PS_Status 

WHEN NOT MATCHED BY TARGET THEN 
	INSERT 
	( 
		 PS_UID 
		,PS_Code 
		,PS_Lang_DE 
		,PS_Lang_FR 
		,PS_Lang_IT 
		,PS_Lang_EN 
		,PS_Width_mm 
		,PS_Height_mm 
		,PS_Sort 
		,PS_Status 
	)
	VALUES 
	( 
		 CTE.PS_UID 
		,CTE.PS_Code 
		,CTE.PS_Lang_DE 
		,CTE.PS_Lang_FR 
		,CTE.PS_Lang_IT 
		,CTE.PS_Lang_EN 
		,CTE.PS_Width_mm 
		,CTE.PS_Height_mm 
		,CTE.PS_Sort 
		,CTE.PS_Status 
	)

WHEN NOT MATCHED BY SOURCE THEN DELETE 
;


EXEC sp_xml_removedocument @handle 


-- SELECT * FROM T_VWS_Ref_PaperSize WHERE PLK_UID = '7CA68E6E-E998-FF92-BE70-126064765EAB'
