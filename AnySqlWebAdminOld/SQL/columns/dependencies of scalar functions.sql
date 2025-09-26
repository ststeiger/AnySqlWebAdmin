


-- columns -non-computed
-- pk
-- computed columns without functions 
--pk/fk


-- functions used in computed columns 

-- computed column cannot be used in other computed column 
-- computed columns with functions 
-- views,  scalar functions and table-valued functions  by dependency tree 

-- stored procedures 

SELECT * 
FROM sys.sql_expression_dependencies AS sed  



-- dependencies of scalar functions
SELECT
     O.Name
    ,T.Dependencies
FROM sys.Objects O
OUTER APPLY
(
    SELECT SUBSTRING(
        (
        SELECT ',' + OBJECT_NAME(D.referenced_id)
        FROM sys.SQL_Expression_Dependencies D
        WHERE D.referencing_id = O.Object_ID
        GROUP BY OBJECT_NAME(D.referenced_id)
        ORDER BY OBJECT_NAME(D.referenced_id)
        FOR XML PATH('')
        )
    ,2,4000) AS Dependencies
) T
WHERE O.Type = 'FN'
ORDER BY O.Name
;