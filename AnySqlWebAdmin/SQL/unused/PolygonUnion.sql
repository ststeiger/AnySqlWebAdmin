
DECLARE @point GEOGRAPHY;
SET @point = geography::Point(47.653, -122.358, 4326)

DECLARE @polygon geography;  
SET @polygon = geography::STPolyFromText('POLYGON((-122.358 47.653, -122.348 47.649, -122.348 47.658, -122.358 47.658, -122.358 47.653))', 4326);  

SELECT @polygon.STIntersects(@point) , @polygon.STUnion(@point)



-- string s1 = "POLYGON((9.3763619 47.4330074,9.3764389 47.4329684,9.3764072 47.4329405,9.3763969 47.4329322,9.3759864 47.4326004,9.376056 47.4325644,9.3761349 47.4325167,9.37619 47.4325653,9.376312 47.4326732,9.3765907 47.4328683,9.3766389 47.4328521,9.3767794 47.4329452,9.3764748 47.4331106,9.3763619 47.4330074))";
-- string s2 = "POLYGON((9.3766833 47.4319973,9.3772045 47.4324131,9.3771257 47.432459,9.3769959 47.4323535,9.3767225 47.4325076,9.3768938 47.432637,9.3769843 47.4325975,9.3772713 47.432826,9.3771862 47.4328789,9.376941 47.4326789,9.3767283 47.4327757,9.3765053 47.4325749,9.376312 47.4326732,9.37619 47.4325653,9.3761349 47.4325167,9.376056 47.4325644,9.3757946 47.43237,9.3760399 47.4322419,9.376144 47.4323272,9.3761809 47.4323125,9.3762975 47.432428,9.3762371 47.4324602,9.3763095 47.4325246,9.3764699 47.4324328,9.3763633 47.4323437,9.3763976 47.4323193,9.3763247 47.4322628,9.3763972 47.4322251,9.3764363 47.4322061,9.3766528 47.4323718,9.3768611 47.4322514,9.3765976 47.4320409,9.3766833 47.4319973))'";



SELECT 
	geography::STPolyFromText('POLYGON((7.5999034 47.5506347,7.5997595 47.5507183,7.5998959 47.5508256,7.5999759 47.5508885,7.6001195 47.550805,7.5999034 47.5506347))', 4326)
	.STUnion(geography::STPolyFromText('POLYGON((7.6003356 47.5509754,7.6001195 47.550805,7.5999759 47.5508885,7.6000322 47.5509328,7.6001926 47.551059,7.6003356 47.5509754))', 4326))
	.STAsText()

-- FULLGLOBE: order is wrong ==> array.reverse
SELECT 
	geography::STPolyFromText('POLYGON((7.5999034 47.5506347,7.6001195 47.550805,7.5999759 47.5508885,7.5998959 47.5508256,7.5997595 47.5507183,7.5999034 47.5506347))', 4326)
	.STUnion(
	geography::STPolyFromText('POLYGON((7.6003356 47.5509754,7.6001926 47.551059,7.6000322 47.5509328,7.5999759 47.5508885,7.6001195 47.550805,7.6003356 47.5509754))', 4326)
	).STAsText()



-- ----------------------------------------------------------------
-- Extract points from geography/geometry
-- ----------------------------------------------------------------

-- https://gis.stackexchange.com/questions/66142/trying-to-convert-geometry-to-geography-keep-failing-in-mssql-2012
-- https://spatialdbadvisor.com/sql_server_blog/267/extract-elements-of-sql-server-spatial-geometry-object


  
  
DECLARE @geo1 GEOGRAPHY
DECLARE @geo2 GEOGRAPHY
SET @geo1 = geography::STPolyFromText('POLYGON((7.5999034 47.5506347,7.6001195 47.550805,7.5999759 47.5508885,7.5998959 47.5508256,7.5997595 47.5507183,7.5999034 47.5506347))', 4326)
SET @geo2 = geography::STPolyFromText('POLYGON((7.6003356 47.5509754,7.6001926 47.551059,7.6000322 47.5509328,7.5999759 47.5508885,7.6001195 47.550805,7.6003356 47.5509754))', 4326)


DECLARE @geom1 GEOMETRY
DECLARE @geom2 GEOMETRY
SET @geom1 = geometry::STPolyFromText('POLYGON((7.5999034 47.5506347,7.6001195 47.550805,7.5999759 47.5508885,7.5998959 47.5508256,7.5997595 47.5507183,7.5999034 47.5506347))', 4326)
SET @geom2 = geometry::STPolyFromText('POLYGON((7.6003356 47.5509754,7.6001926 47.551059,7.6000322 47.5509328,7.5999759 47.5508885,7.6001195 47.550805,7.6003356 47.5509754))', 4326)


-- SELECT @geom1.STGeometryType()
-- SELECT @geo1.STGeometryType()
  

-- SELECT @geo1.STSrid, @geom1.STSrid
-- SELECT @geom1.STCentroid().ToString()
-- SELECT @geo1.STNumPoints(),  @geom1.STNumPoints()

-- SELECT @geo1.STPointN(2).ToString();  
-- SELECT @geo1.STPointN(2).Lat, @geo1.STPointN(2).Long
-- SELECT @geom1.STPointN(2).STX, @geom1.STPointN(2).STY;  

;WITH CTE AS
        (
          SELECT @geo1.STNumPoints() AS l, 1 AS i, @geo1.STNumPoints() AS OsmSort WHERE 0 < @geo1.STNumPoints()
          UNION ALL
          SELECT CTE.l AS l, i+1 AS i, CTE.OsmSort-1 AS OsmSort
          FROM CTE WHERE CTE.i < CTE.l
        )
 SELECT
   i
      ,OsmSort
      ,@geo1.STPointN(i).ToString() AS pt
      ,@geo1.STPointN(i).Lat AS lat
      ,@geo1.STPointN(i).Long AS lng
 FROM CTE

;WITH CTE AS
        (
          SELECT @geom1.STNumPoints() AS l, 1 AS i, @geom1.STNumPoints() AS OsmSort WHERE 0 < @geom1.STNumPoints()
          UNION ALL
          SELECT CTE.l AS l, i+1 AS i, CTE.OsmSort-1 AS OsmSort
          FROM CTE WHERE CTE.i < CTE.l
        )
 SELECT
   i
      ,OsmSort
      ,@geom1.STPointN(i).ToString() AS pt
      ,@geom1.STPointN(i).STX AS X
      ,@geom1.STPointN(i).STY AS Y
 FROM CTE




-- SELECT @geom1.STNumInteriorRing()
-- SELECT @geom1.STNumInteriorRing()
-- SELECT @geom1.STExteriorRing().STExteriorRing().STNumInteriorRing()

-- SELECT @geom1.STExteriorRing().STAsText()
-- SELECT geography::Point(47.65100,-122.34720, 4326);
-- SELECT geometry::Point(47.65100,-122.34720, 4326);
-- SELECT geography::STPointFromText('POINT(' + CAST([Longitude] AS VARCHAR(20)) + ' ' + CAST([Latitude] AS VARCHAR(20)) + ')', 4326)
-- SELECT location.STDistance(@DistanceFromPoint)


-- SELECT @geo1.STUnion(@geo2).STAsText() 


-- SELECT @geo1.STArea(), @geom1.STArea()

-- SELECT @geom2.starea()
-- SELECT @geo1.()
-- SELECT CAST(@geo1 AS geometry)
