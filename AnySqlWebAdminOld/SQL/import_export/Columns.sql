SELECT 
	CASE WHEN ORDINAL_POSITION = 1 THEN 
		-- N'INSERT INTO ' + TABLE_NAME + NCHAR(13) + NCHAR(10) + N'SELECT ' + NCHAR(13) + NCHAR(10)  
		-- +
		N'     ' 
	ELSE N'    ,' 
	END + COLUMN_NAME AS cl 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'dbo' 
AND TABLE_NAME = 'T_Benutzer'  
ORDER BY ORDINAL_POSITION 


-- string foo = System.Xml.XmlConvert.EncodeName("foo bar");
-- foo = System.Xml.XmlConvert.DecodeName(foo);

-- foo = System.Xml.XmlConvert.VerifyName("foo");
-- System.Console.WriteLine(foo);
