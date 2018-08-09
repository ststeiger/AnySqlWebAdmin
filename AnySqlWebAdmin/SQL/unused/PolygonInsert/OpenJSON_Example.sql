
DECLARE @json NVARCHAR(MAX)
SET @json='
[
  {
    "lat": 47.5519639,
    "lng": 7.5994698
  },
  {
    "lat": 47.5519663,
    "lng": 7.5994828
  },
  {
    "lat": 47.5519639,
    "lng": 7.5994698
  }
]
'

SELECT 
	 CAST(t1.[key] AS integer) + 1 AS i 
	,t1.value 
	,tRow.lat 
	,tRow.lng 
	,ROW_NUMBER() OVER (ORDER BY CAST(t1.[key] AS integer) DESC) AS reverseClockwiseDirectionSort 
FROM OPENJSON( @json) AS t1 

OUTER APPLY 
(
	-- https://stackoverflow.com/questions/38285223/accessing-json-array-in-sql-server-2016-using-json-value
	SELECT * 
	FROM OPENJSON(t1.value) 
	-- Nando: decimal(23,20) 
	-- https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
	-- https://stackoverflow.com/questions/7167604/how-accurately-should-i-store-latitude-and-longitude
	-- If you're using SQL Server... It's worth noting that a precision of 1-9 uses 5 bytes. 
	-- So you may was well use a decimal(9,6) instead of decimal(7,4) 
	-- and take advantage of the higher accuracy since they both occupy the same amount of space. 
	-- Ten or more decimal places indicates a computer or calculator was used 
	-- and that no attention was paid to the fact that the extra decimals are useless. 
	-- Be careful, because unless you are the one reading these numbers off the device, 
	-- this can indicate low quality processing !
	WITH (lat decimal(9,6) '$.lat', lng decimal(9,6) '$.lng') 
) AS tRow 

ORDER BY i 
