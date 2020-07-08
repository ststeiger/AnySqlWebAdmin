using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnySqlWebAdmin
{
    public class Generate
    {

        public static void foo()
        {
            string abc = @"- How to create the XML 
/*
DECLARE @xml XML 
SET @xml = ( SELECT (

SELECT * FROM T_Benutzer 

FOR XML PATH('row'), ROOT('table'),  ELEMENTS xsinil) AS outerXml )
SELECT @xml 
*/


DECLARE @xml xml 
SET @xml = ''


DECLARE @handle INT
DECLARE @PrepareXmlStatus INT

EXEC @PrepareXmlStatus = sp_xml_preparedocument @handle OUTPUT, @XML

SELECT
    names
FROM OPENXML(@handle, '/table/row', 2) WITH
(
    fields
) AS tSource

WHERE(1 = 1)

/*
AND NOT EXISTS 
(
	SELECT T_Benutzer.* FROM T_Benutzer WHERE T_Benutzer.BE_ID = tSource.BE_ID 
)
*/

EXEC sp_xml_removedocument @handle
";
        }

    }
}
