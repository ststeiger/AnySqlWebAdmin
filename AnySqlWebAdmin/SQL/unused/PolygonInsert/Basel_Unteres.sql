
-- When DB is restored from SQL-Server < 2016
-- ALTER DATABASE <DB_Name> SET COMPATIBILITY_LEVEL = 130
-- ALTER DATABASE COR_Basic_Demo_V4 SET COMPATIBILITY_LEVEL = 130


DECLARE @json NVARCHAR(MAX)
DECLARE @SO_UID uniqueidentifier 
DECLARE @GB_UID uniqueidentifier 


SET @SO_UID = NULL 
SET @GB_UID = 'BDD9FC91-750C-4FE2-BB42-03585C9B65A2' -- Unteres: 'Engelgasse 9+11' 


DELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_SO_UID = @SO_UID; 
DELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE T_ZO_Objekt_Wgs84Polygon.ZO_OBJ_WGS84_GB_UID = @GB_UID; 


/*
SELECT 
	 T_AP_Standort.SO_UID
	,T_AP_Standort.SO_Nr
	,T_AP_Standort.SO_Bezeichnung
	,T_AP_Gebaeude.GB_UID
	,T_AP_Gebaeude.GB_Nr
	,T_AP_Gebaeude.GB_Strasse
	,T_AP_Gebaeude.GB_StrasseNr
	,T_AP_Gebaeude.GB_PLZ
	,T_AP_Gebaeude.GB_Ort
	,T_AP_Gebaeude.GB_Bezeichnung
	,T_AP_Gebaeude.GB_GM_Lat
	,T_AP_Gebaeude.GB_GM_Lng
FROM T_AP_Standort
LEFT JOIN T_AP_Gebaeude 
	ON T_AP_Gebaeude.GB_SO_UID = T_AP_Standort.SO_UID 
	AND T_AP_Gebaeude.GB_Status = 1
	AND CURRENT_TIMESTAMP BETWEEN T_AP_Gebaeude.GB_DatumVon AND T_AP_Gebaeude.GB_DatumBis 
WHERE (1=1) 
AND T_AP_Standort.SO_Status = 1 
AND CURRENT_TIMESTAMP BETWEEN T_AP_Standort.SO_DatumVon AND T_AP_Standort.SO_DatumBis 
-- AND GB_Ort LIKE 'Basel'
AND SO_Bezeichnung = 'Hauptsitz' 
-- AND GB_Bezeichnung LIKE '%alban%'
AND GB_Bezeichnung = 'St. Alban-Anlage 38' -- GB: 9ECA4341-2D3D-464E-9710-DAD58531AFA8 (oberes)
-- AND GB_Bezeichnung = 'Engelgasse 9+11'  -- GB: BDD9FC91-750C-4FE2-BB42-03585C9B65A2 (unteres)
--AND GB_SO_UID = '49DD1D3C-5D56-4624-8893-6820DF7A8579' 
--AND GB_Strasse LIKE '%Alban%'
*/ 



-- Unteres (Engelgasse)
SET @json='
[
  {
    "lat": 47.5512929,
    "lng": 7.5989804
  },
  {
    "lat": 47.551304,
    "lng": 7.5989946
  },
  {
    "lat": 47.5513072,
    "lng": 7.5989913
  },
  {
    "lat": 47.551309,
    "lng": 7.5989936
  },
  {
    "lat": 47.5513071,
    "lng": 7.5989986
  },
  {
    "lat": 47.5513296,
    "lng": 7.5990274
  },
  {
    "lat": 47.5513329,
    "lng": 7.599024
  },
  {
    "lat": 47.5513348,
    "lng": 7.5990263
  },
  {
    "lat": 47.5513327,
    "lng": 7.5990314
  },
  {
    "lat": 47.551355,
    "lng": 7.59906
  },
  {
    "lat": 47.5513583,
    "lng": 7.5990563
  },
  {
    "lat": 47.5513604,
    "lng": 7.5990589
  },
  {
    "lat": 47.5513584,
    "lng": 7.5990643
  },
  {
    "lat": 47.5513806,
    "lng": 7.5990928
  },
  {
    "lat": 47.551384,
    "lng": 7.5990889
  },
  {
    "lat": 47.5513859,
    "lng": 7.5990913
  },
  {
    "lat": 47.551384,
    "lng": 7.599097
  },
  {
    "lat": 47.5513981,
    "lng": 7.5991152
  },
  {
    "lat": 47.5513191,
    "lng": 7.5992518
  },
  {
    "lat": 47.5513511,
    "lng": 7.5992923
  },
  {
    "lat": 47.551377,
    "lng": 7.599248
  },
  {
    "lat": 47.5514442,
    "lng": 7.5993337
  },
  {
    "lat": 47.551364,
    "lng": 7.5994706
  },
  {
    "lat": 47.5512967,
    "lng": 7.5993856
  },
  {
    "lat": 47.5513338,
    "lng": 7.5993219
  },
  {
    "lat": 47.5512981,
    "lng": 7.5992782
  },
  {
    "lat": 47.5512999,
    "lng": 7.5992834
  },
  {
    "lat": 47.551298,
    "lng": 7.5992865
  },
  {
    "lat": 47.5512947,
    "lng": 7.5992837
  },
  {
    "lat": 47.551285,
    "lng": 7.5992996
  },
  {
    "lat": 47.5512722,
    "lng": 7.5992832
  },
  {
    "lat": 47.5512627,
    "lng": 7.5992995
  },
  {
    "lat": 47.5512653,
    "lng": 7.5993049
  },
  {
    "lat": 47.5512637,
    "lng": 7.5993076
  },
  {
    "lat": 47.5512598,
    "lng": 7.5993046
  },
  {
    "lat": 47.5512407,
    "lng": 7.5993376
  },
  {
    "lat": 47.5512434,
    "lng": 7.5993427
  },
  {
    "lat": 47.5512418,
    "lng": 7.5993455
  },
  {
    "lat": 47.5512379,
    "lng": 7.5993423
  },
  {
    "lat": 47.5512188,
    "lng": 7.5993754
  },
  {
    "lat": 47.5512213,
    "lng": 7.5993808
  },
  {
    "lat": 47.5512196,
    "lng": 7.5993838
  },
  {
    "lat": 47.5512159,
    "lng": 7.5993804
  },
  {
    "lat": 47.551207,
    "lng": 7.5993958
  },
  {
    "lat": 47.5511969,
    "lng": 7.5994132
  },
  {
    "lat": 47.5511995,
    "lng": 7.5994186
  },
  {
    "lat": 47.5511978,
    "lng": 7.5994214
  },
  {
    "lat": 47.551194,
    "lng": 7.5994181
  },
  {
    "lat": 47.551175,
    "lng": 7.599451
  },
  {
    "lat": 47.5511776,
    "lng": 7.5994562
  },
  {
    "lat": 47.551176,
    "lng": 7.599459
  },
  {
    "lat": 47.5511721,
    "lng": 7.599456
  },
  {
    "lat": 47.5511529,
    "lng": 7.599489
  },
  {
    "lat": 47.5511556,
    "lng": 7.5994942
  },
  {
    "lat": 47.5511541,
    "lng": 7.5994969
  },
  {
    "lat": 47.5511501,
    "lng": 7.5994938
  },
  {
    "lat": 47.5511407,
    "lng": 7.5995101
  },
  {
    "lat": 47.5511519,
    "lng": 7.5995244
  },
  {
    "lat": 47.5511553,
    "lng": 7.5995204
  },
  {
    "lat": 47.5511573,
    "lng": 7.599523
  },
  {
    "lat": 47.5511552,
    "lng": 7.5995287
  },
  {
    "lat": 47.5511776,
    "lng": 7.5995571
  },
  {
    "lat": 47.5511809,
    "lng": 7.5995532
  },
  {
    "lat": 47.5511829,
    "lng": 7.5995557
  },
  {
    "lat": 47.5511809,
    "lng": 7.5995613
  },
  {
    "lat": 47.551203,
    "lng": 7.5995896
  },
  {
    "lat": 47.5512063,
    "lng": 7.5995855
  },
  {
    "lat": 47.5512083,
    "lng": 7.5995881
  },
  {
    "lat": 47.5512064,
    "lng": 7.5995939
  },
  {
    "lat": 47.5512286,
    "lng": 7.5996222
  },
  {
    "lat": 47.5512319,
    "lng": 7.5996182
  },
  {
    "lat": 47.5512338,
    "lng": 7.5996207
  },
  {
    "lat": 47.5512319,
    "lng": 7.5996264
  },
  {
    "lat": 47.5512539,
    "lng": 7.5996544
  },
  {
    "lat": 47.5512573,
    "lng": 7.5996507
  },
  {
    "lat": 47.5512593,
    "lng": 7.5996532
  },
  {
    "lat": 47.5512574,
    "lng": 7.5996588
  },
  {
    "lat": 47.5512599,
    "lng": 7.5996618
  },
  {
    "lat": 47.5511762,
    "lng": 7.5998186
  },
  {
    "lat": 47.5511692,
    "lng": 7.5998096
  },
  {
    "lat": 47.551166,
    "lng": 7.5998134
  },
  {
    "lat": 47.5511638,
    "lng": 7.5998107
  },
  {
    "lat": 47.5511657,
    "lng": 7.5998051
  },
  {
    "lat": 47.5511437,
    "lng": 7.5997771
  },
  {
    "lat": 47.5511402,
    "lng": 7.5997807
  },
  {
    "lat": 47.5511384,
    "lng": 7.5997784
  },
  {
    "lat": 47.5511406,
    "lng": 7.5997732
  },
  {
    "lat": 47.5511183,
    "lng": 7.5997448
  },
  {
    "lat": 47.5511149,
    "lng": 7.5997484
  },
  {
    "lat": 47.5511129,
    "lng": 7.599746
  },
  {
    "lat": 47.5511152,
    "lng": 7.5997408
  },
  {
    "lat": 47.5510926,
    "lng": 7.5997121
  },
  {
    "lat": 47.5510892,
    "lng": 7.5997157
  },
  {
    "lat": 47.5510873,
    "lng": 7.5997134
  },
  {
    "lat": 47.5510894,
    "lng": 7.599708
  },
  {
    "lat": 47.5510669,
    "lng": 7.5996794
  },
  {
    "lat": 47.5510634,
    "lng": 7.599683
  },
  {
    "lat": 47.5510616,
    "lng": 7.5996807
  },
  {
    "lat": 47.5510636,
    "lng": 7.5996752
  },
  {
    "lat": 47.5510417,
    "lng": 7.5996474
  },
  {
    "lat": 47.5510381,
    "lng": 7.5996508
  },
  {
    "lat": 47.5510363,
    "lng": 7.5996485
  },
  {
    "lat": 47.5510383,
    "lng": 7.599643
  },
  {
    "lat": 47.5510159,
    "lng": 7.5996144
  },
  {
    "lat": 47.5510123,
    "lng": 7.599618
  },
  {
    "lat": 47.5510106,
    "lng": 7.5996158
  },
  {
    "lat": 47.5510126,
    "lng": 7.5996104
  },
  {
    "lat": 47.5509906,
    "lng": 7.5995823
  },
  {
    "lat": 47.550987,
    "lng": 7.5995857
  },
  {
    "lat": 47.550985,
    "lng": 7.5995832
  },
  {
    "lat": 47.550987,
    "lng": 7.5995778
  },
  {
    "lat": 47.5509647,
    "lng": 7.5995494
  },
  {
    "lat": 47.5509613,
    "lng": 7.599553
  },
  {
    "lat": 47.5509595,
    "lng": 7.5995507
  },
  {
    "lat": 47.5509614,
    "lng": 7.5995451
  },
  {
    "lat": 47.5509392,
    "lng": 7.599517
  },
  {
    "lat": 47.5509358,
    "lng": 7.5995206
  },
  {
    "lat": 47.5509337,
    "lng": 7.5995179
  },
  {
    "lat": 47.5509357,
    "lng": 7.5995125
  },
  {
    "lat": 47.5509246,
    "lng": 7.5994984
  },
  {
    "lat": 47.5509342,
    "lng": 7.599482
  },
  {
    "lat": 47.5509318,
    "lng": 7.5994765
  },
  {
    "lat": 47.5509334,
    "lng": 7.5994737
  },
  {
    "lat": 47.5509372,
    "lng": 7.5994768
  },
  {
    "lat": 47.5509562,
    "lng": 7.5994442
  },
  {
    "lat": 47.5509537,
    "lng": 7.5994388
  },
  {
    "lat": 47.5509554,
    "lng": 7.599436
  },
  {
    "lat": 47.5509592,
    "lng": 7.5994391
  },
  {
    "lat": 47.5509783,
    "lng": 7.5994062
  },
  {
    "lat": 47.5509757,
    "lng": 7.599401
  },
  {
    "lat": 47.5509773,
    "lng": 7.5993983
  },
  {
    "lat": 47.5509813,
    "lng": 7.5994011
  },
  {
    "lat": 47.5509913,
    "lng": 7.5993839
  },
  {
    "lat": 47.5510004,
    "lng": 7.5993682
  },
  {
    "lat": 47.5509978,
    "lng": 7.5993631
  },
  {
    "lat": 47.5509993,
    "lng": 7.5993605
  },
  {
    "lat": 47.5510033,
    "lng": 7.5993632
  },
  {
    "lat": 47.5510126,
    "lng": 7.5993472
  },
  {
    "lat": 47.5510237,
    "lng": 7.5993615
  },
  {
    "lat": 47.5510274,
    "lng": 7.5993569
  },
  {
    "lat": 47.5510293,
    "lng": 7.5993593
  },
  {
    "lat": 47.5510271,
    "lng": 7.5993658
  },
  {
    "lat": 47.5510383,
    "lng": 7.5993802
  },
  {
    "lat": 47.551048,
    "lng": 7.5993634
  },
  {
    "lat": 47.5510454,
    "lng": 7.5993584
  },
  {
    "lat": 47.551047,
    "lng": 7.5993557
  },
  {
    "lat": 47.5510509,
    "lng": 7.5993585
  },
  {
    "lat": 47.55107,
    "lng": 7.5993255
  },
  {
    "lat": 47.5510674,
    "lng": 7.5993206
  },
  {
    "lat": 47.551069,
    "lng": 7.5993178
  },
  {
    "lat": 47.5510729,
    "lng": 7.5993207
  },
  {
    "lat": 47.5510917,
    "lng": 7.5992882
  },
  {
    "lat": 47.5510892,
    "lng": 7.5992829
  },
  {
    "lat": 47.5510907,
    "lng": 7.5992803
  },
  {
    "lat": 47.5510947,
    "lng": 7.599283
  },
  {
    "lat": 47.5511049,
    "lng": 7.5992655
  },
  {
    "lat": 47.5511136,
    "lng": 7.5992505
  },
  {
    "lat": 47.551111,
    "lng": 7.5992453
  },
  {
    "lat": 47.5511128,
    "lng": 7.5992423
  },
  {
    "lat": 47.5511167,
    "lng": 7.5992453
  },
  {
    "lat": 47.5511358,
    "lng": 7.5992123
  },
  {
    "lat": 47.551133,
    "lng": 7.5992073
  },
  {
    "lat": 47.5511348,
    "lng": 7.5992043
  },
  {
    "lat": 47.5511387,
    "lng": 7.5992073
  },
  {
    "lat": 47.5511575,
    "lng": 7.5991748
  },
  {
    "lat": 47.5511549,
    "lng": 7.5991696
  },
  {
    "lat": 47.5511566,
    "lng": 7.5991668
  },
  {
    "lat": 47.5511606,
    "lng": 7.5991696
  },
  {
    "lat": 47.5511795,
    "lng": 7.5991371
  },
  {
    "lat": 47.5511769,
    "lng": 7.5991318
  },
  {
    "lat": 47.5511784,
    "lng": 7.5991291
  },
  {
    "lat": 47.5511824,
    "lng": 7.5991321
  },
  {
    "lat": 47.5511907,
    "lng": 7.5991178
  },
  {
    "lat": 47.5512014,
    "lng": 7.5990993
  },
  {
    "lat": 47.5511988,
    "lng": 7.5990939
  },
  {
    "lat": 47.5512004,
    "lng": 7.5990911
  },
  {
    "lat": 47.5512043,
    "lng": 7.5990943
  },
  {
    "lat": 47.5512139,
    "lng": 7.5990778
  },
  {
    "lat": 47.5512266,
    "lng": 7.5990942
  },
  {
    "lat": 47.5512364,
    "lng": 7.5990774
  },
  {
    "lat": 47.5512336,
    "lng": 7.5990722
  },
  {
    "lat": 47.5512354,
    "lng": 7.5990692
  },
  {
    "lat": 47.5512393,
    "lng": 7.5990723
  },
  {
    "lat": 47.5512583,
    "lng": 7.5990398
  },
  {
    "lat": 47.5512556,
    "lng": 7.5990342
  },
  {
    "lat": 47.5512572,
    "lng": 7.5990315
  },
  {
    "lat": 47.5512613,
    "lng": 7.5990346
  },
  {
    "lat": 47.5512803,
    "lng": 7.5990021
  },
  {
    "lat": 47.5512774,
    "lng": 7.5989966
  },
  {
    "lat": 47.5512791,
    "lng": 7.5989937
  },
  {
    "lat": 47.5512834,
    "lng": 7.5989968
  },
  {
    "lat": 47.5512929,
    "lng": 7.5989804
  }
]'


INSERT INTO T_ZO_Objekt_Wgs84Polygon
(
	 ZO_OBJ_WGS84_UID
	,ZO_OBJ_WGS84_GB_UID
	,ZO_OBJ_WGS84_SO_UID
	,ZO_OBJ_WGS84_Sort
	,ZO_OBJ_WGS84_GM_Lat
	,ZO_OBJ_WGS84_GM_Lng
) 
SELECT 
	 NEWID() AS ZO_OBJ_WGS84_UID 
	,CAST(@GB_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_GB_UID 
	,CAST(@SO_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_SO_UID 
	,CAST(t1.[key] AS integer) + 1 AS ZO_OBJ_WGS84_Sort  
	--,ROW_NUMBER() OVER (ORDER BY CAST(t1.[key] AS integer) DESC) AS ZO_OBJ_WGS84_Sort 
	,tRowValues.lat AS ZO_OBJ_WGS84_GM_Lat -- decimal(23,20) 
	,tRowValues.lng AS ZO_OBJ_WGS84_GM_Lng -- decimal(23,20) 
FROM OPENJSON( @json) AS t1 

OUTER APPLY 
(
	-- https://stackoverflow.com/questions/38285223/accessing-json-array-in-sql-server-2016-using-json-value
	SELECT * 
	FROM OPENJSON(t1.value) 
	-- decimal(23,20) 
	WITH (lat decimal(23,20) '$.lat', lng decimal(23,20) '$.lng') 
	AS ttttt 
) AS tRowValues

ORDER BY ZO_OBJ_WGS84_Sort 
