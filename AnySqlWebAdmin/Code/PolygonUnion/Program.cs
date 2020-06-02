
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Vectors;

namespace TestTransform
{


    static class DistanceAlgorithm
    {

        const double MEAN_RADIUS = 6371.0088; // https://en.wikipedia.org/wiki/Earth_radius#Mean_radius
        const double RADIUS_EQUATORIAL = 6378.1370; // https://en.wikipedia.org/wiki/Earth_radius#Equatorial_radius
        const double AUTHALIC_RADIUS = 6371.0072; // https://en.wikipedia.org/wiki/Earth_radius#Authalic_radius
        const double VOLUMETRIC_RADIUS = 6371.0008; // https://en.wikipedia.org/wiki/Earth_radius#Volumetric_radius
        const double AVERAGE_RADIUS = 6371.230; // https://en.wikipedia.org/wiki/Earth_radius#Average_distance_from_center_to_surface
        const double RADIUS = MEAN_RADIUS;


        /// <summary>
        /// Convert degrees to Radians
        /// </summary>
        /// <param name="x">Degrees</param>
        /// <returns>The equivalent in radians</returns>
        public static double Radians(double x)
        {
            return x * System.Math.PI / 180;
        }

        /// <summary>
        /// Calculate the distance between two places.
        /// </summary>
        /// <param name="lon1"></param>
        /// <param name="lat1"></param>
        /// <param name="lon2"></param>
        /// <param name="lat2"></param>
        /// <returns></returns>
        public static double DistanceBetweenPlaces(
              double lat1
            , double lon1
            , double lat2
            , double lon2
            )
        {
            // The Haversine formula doesn't account for the Earth being a spheroid, so you'll get some error introduced due to that fact. 
            // It can't be guaranteed correct to better than 0.5%
            double dlon = Radians(lon2 - lon1);
            double dlat = Radians(lat2 - lat1);

            double a = (System.Math.Sin(dlat / 2) * System.Math.Sin(dlat / 2)) + System.Math.Cos(Radians(lat1)) *
                System.Math.Cos(Radians(lat2)) * (System.Math.Sin(dlon / 2) * System.Math.Sin(dlon / 2));

            double angle = 2 * System.Math.Atan2(System.Math.Sqrt(a), System.Math.Sqrt(1 - a));
            return angle * RADIUS;
        }

    }


    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    static class FastDistance
    {
        public static double DistanceBetweenPlaces(double lat1
            , double lon1
            , double lat2
            , double lon2)
        {
            double p = 0.017453292519943295;    // Math.PI / 180

            double a = 0.5 - System.Math.Cos((lat2 - lat1) * p) / 2 +
                    System.Math.Cos(lat1 * p) * System.Math.Cos(lat2 * p) *
                    (1 - System.Math.Cos((lon2 - lon1) * p)) / 2;

            return 12742.0 * System.Math.Asin(System.Math.Sqrt(a)); // 2 * R; R = 6371 km
        }
    }
    
    
    public static class LOLdistance
    {
        
        
        public static double DistanceBetweenPlaces(double lat1
            , double lon1
            , double lat2
            , double lon2)
        {
            // new GeoAPI.Geometries.Coordinate((double)coords[i].Latitude, (double)coords[i].Longitude, 0.0);
            var pointACoordinate = new GeoAPI.Geometries.Coordinate(lat1, lon1, 0.0);
            var pointBCoordinate = new GeoAPI.Geometries.Coordinate(lat2, lon2, 0.0);
            
            return pointACoordinate.Distance(pointBCoordinate);
        }

        public static double Distance3dBetweenPlaces(double lat1
            , double lon1
            , double lat2
            , double lon2)
        {
            var pointACoordinate = new GeoAPI.Geometries.Coordinate(lat1, lon1, 0.0);
            var pointBCoordinate = new GeoAPI.Geometries.Coordinate(lat2, lon2, 0.0);
            
            return pointACoordinate.Distance3D(pointBCoordinate);
        }


        public static double ProjectedDistanceBetweenPlaces(Wgs84Coordinates a, Wgs84Coordinates b)
        {
            Wgs84Coordinates[] mycoordinates = new Wgs84Coordinates[] { a, b };

            DotSpatial.Projections.ProjectionInfo projFrom = DotSpatial.Projections.KnownCoordinateSystems.Geographic.World.WGS1984;
            DotSpatial.Projections.ProjectionInfo projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.CylindricalEqualAreaworld;
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.EquidistantConicworld;
            // projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.EquidistantCylindricalworld;

            // projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.WebMercator;
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.Mercatorsphere;
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.EckertVsphere; // Exception
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.MillerCylindricalsphere;
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.EquidistantCylindricalsphere;
            // projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.EquidistantConicsphere;
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.SpheroidBased.Lambert2;
            // projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.SpheroidBased.Lambert2Wide;
            // projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.EckertIVsphere;
            // projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.Europe.EuropeEquidistantConic;

            double[] latLonPoints = new double[mycoordinates.Length * 2];
            double[] z = new double[mycoordinates.Length];
            
            // dotspatial takes the x,y in a single array, and z in a separate array.  I'm sure there's a 
            // reason for this, but I don't know what it is.
            for (int i = 0; i < mycoordinates.Length; i++)
            {
                latLonPoints[i * 2] = (double)mycoordinates[i].Longitude;
                latLonPoints[i * 2 + 1] = (double)mycoordinates[i].Latitude;
                z[i] = 0;
            } // Next i 
            
            // prepare for ReprojectPoints (it's mutate array)
            DotSpatial.Projections.Reproject.ReprojectPoints(
                latLonPoints, z, projFrom, projTo
                , 0, latLonPoints.Length / 2
            );
            
            // assemblying new points array to create polygon
            GeoAPI.Geometries.Coordinate[] polyPoints = new GeoAPI.Geometries.Coordinate[latLonPoints.Length / 2];

            for (int i = 0; i < latLonPoints.Length / 2; ++i)
            {
                polyPoints[i] = new GeoAPI.Geometries.Coordinate(latLonPoints[i * 2], latLonPoints[i * 2 + 1]);
            } // Next i 

            // Assembling linear ring to create polygon 
            // NetTopologySuite.Geometries.LinearRing lr = new NetTopologySuite.Geometries.LinearRing(polyPoints);

            var line = new NetTopologySuite.Geometries.LineString(polyPoints);
            // var line = new NetTopologySuite.Geometries.LineSegment(polyPoints[0], polyPoints[1]);
            line.SRID = 4326;


            GeoAPI.Geometries.Coordinate[] unprojPoints = new GeoAPI.Geometries.Coordinate[]
            {
                new GeoAPI.Geometries.Coordinate((double)a.Latitude, (double)a.Longitude, 0),
                new GeoAPI.Geometries.Coordinate((double)b.Latitude, (double)b.Longitude, 0)
            };
            var unprojline = new NetTopologySuite.Geometries.LineString(unprojPoints);
            unprojline.SRID = 4326;
            
            System.Console.WriteLine(unprojline.Length);

            double dist = polyPoints[0].Distance(polyPoints[1]);
            System.Console.WriteLine(dist);

            // SELECT geography::Point(47.552063, 9.226081, 4326).STDistance(geography::Point(47.374487, 9.556946, 4326))
            // 31813.1626618977

            return line.Length;
        }


        public static double SpatialDistanceBetweenPlaces(Wgs84Coordinates a, Wgs84Coordinates b)
        {
            var fablat = new DotSpatial.Positioning.Latitude((double)a.Latitude);
            var fablng = new DotSpatial.Positioning.Longitude((double)a.Longitude);

            var sglat = new DotSpatial.Positioning.Latitude((double)b.Latitude);
            var sglng = new DotSpatial.Positioning.Longitude((double)b.Longitude);

            var fab = new DotSpatial.Positioning.Position(fablat, fablng);
            var sg = new DotSpatial.Positioning.Position(sglat, sglng);

            DotSpatial.Positioning.Distance dist = fab.DistanceTo(sg);

            return dist.ToMeters().Value;
        } // End Function SpatialDistanceBetweenPlaces


        // TestTransform.LOLdistance.Test();
        public static void Test()
        {

            var fab = new Wgs84Coordinates(47.552063m, 9.226081m);
            var sg = new Wgs84Coordinates(47.374487m, 9.556946m);

            double lat1 = (double)fab.Latitude;
            double lon1 = (double)fab.Longitude;
            double lat2 = (double)sg.Latitude;
            double lon2 = (double)sg.Longitude;

            double d = LOLdistance.DistanceBetweenPlaces(lat1, lon1, lat2, lon2);
            double d3d = LOLdistance.Distance3dBetweenPlaces(lat1, lon1, lat2, lon2);

            double fastd = FastDistance.DistanceBetweenPlaces(lat1, lon1, lat2, lon2);
            double dp = DistanceAlgorithm.DistanceBetweenPlaces(lat1, lon1, lat2, lon2);
            decimal decDistance = DecimalDistanceAlgorithm.DistanceBetweenPlaces(fab.Latitude, fab.Longitude, sg.Latitude, sg.Longitude);
            double pd = LOLdistance.ProjectedDistanceBetweenPlaces(fab, sg);
            double sd = SpatialDistanceBetweenPlaces(fab, sg);


            // DECLARE @fab geography;
            // SET @fab = geography::Point(47.552063, 9.226081, 4326)

            // DECLARE @sg geography;
            // SET @sg = geography::Point(47.374487, 9.556946, 4326)

            // SELECT @fab.STDistance(@sg), @sg.STDistance(@fab)-- 31813.1626618977

            System.Console.WriteLine("", d, d3d, fastd, dp, decDistance, pd, sd);
        }

    }



    static class DecimalDistanceAlgorithm
    {

        const decimal MEAN_RADIUS = 6371.0088m; // https://en.wikipedia.org/wiki/Earth_radius#Mean_radius
        const decimal RADIUS_EQUATORIAL = 6378.1370m; // https://en.wikipedia.org/wiki/Earth_radius#Equatorial_radius
        const decimal AUTHALIC_RADIUS = 6371.0072m; // https://en.wikipedia.org/wiki/Earth_radius#Authalic_radius
        const decimal VOLUMETRIC_RADIUS = 6371.0008m; // https://en.wikipedia.org/wiki/Earth_radius#Volumetric_radius
        const decimal AVERAGE_RADIUS = 6371.230m; // https://en.wikipedia.org/wiki/Earth_radius#Average_distance_from_center_to_surface
        // const decimal RADIUS = 6378.16m;
        const decimal RADIUS = MEAN_RADIUS;



        /// <summary>
        /// Convert degrees to Radians
        /// </summary>
        /// <param name="x">Degrees</param>
        /// <returns>The equivalent in radians</returns>
        public static decimal Radians(decimal x)
        {
            return x * System.DecimalMath.PI / 180.0m;
        }

        /// <summary>
        /// Calculate the distance between two places.
        /// </summary>
        /// <param name="lon1"></param>
        /// <param name="lat1"></param>
        /// <param name="lon2"></param>
        /// <param name="lat2"></param>
        /// <returns></returns>
        public static decimal DistanceBetweenPlaces(
              decimal lat1
            , decimal lon1
            , decimal lat2
            , decimal lon2
            )
        {
            decimal dlon = Radians(lon2 - lon1);
            decimal dlat = Radians(lat2 - lat1);


            decimal a = (System.DecimalMath.Sin(dlat / 2) * System.DecimalMath.Sin(dlat / 2)) + System.DecimalMath.Cos(Radians(lat1)) *
                System.DecimalMath.Cos(Radians(lat2)) * (System.DecimalMath.Sin(dlon / 2) * System.DecimalMath.Sin(dlon / 2));

            decimal angle = 2 * System.DecimalMath.Atan2(System.DecimalMath.Sqrt(a), System.DecimalMath.Sqrt(1 - a));
            return angle * RADIUS;
        }

    }


    public class TestNetTopology
    {


        // https://stackoverflow.com/questions/46159499/calculate-area-of-polygon-having-wgs-coordinates-using-dotspatial
        // pfff wrong... 
        public static void TestComputeArea()
        {
            // this feature can be see visually here http://www.allhx.ca/on/toronto/westmount-park-road/25/
            string feature = "-79.525542519049552,43.691278124243432 -79.525382520578987,43.691281097414787 -79.525228855617627,43.69124858593392 -79.525096151437353,43.691183664769774 -79.52472799258571,43.690927163079735 -79.525379447437814,43.690771996666641 -79.525602330675355,43.691267524226838 -79.525542519049552,43.691278124243432";
            feature = "47.3612503,8.5351944 47.3612252,8.5342631 47.3610145,8.5342755 47.3610212,8.5345227 47.3606405,8.5345451 47.3606350,8.5343411 47.3604067,8.5343545 47.3604120,8.5345623 47.3604308,8.5352457 47.3606508,8.5352328 47.3606413,8.5348784 47.3610383,8.5348551 47.3610477,8.5352063 47.3612503,8.5351944";

            string[] coordinates = feature.Split(' ');
            // System.Array.Reverse(coordinates);

            Wgs84Coordinates[] points = new Wgs84Coordinates[coordinates.Length];

            for (int i = 0; i < coordinates.Length; i++)
            {
                double lon = double.Parse(coordinates[i].Split(',')[0]);
                double lat = double.Parse(coordinates[i].Split(',')[1]);

                points[i] = new Wgs84Coordinates((decimal)lat, (decimal)lon);
            } // Next i 

            double area = CalculateArea(points);
            System.Console.WriteLine(area);
        } // End Sub TestComputeArea 


        public static double ToRadians(double degrees)
        {
            return degrees / 180.0 * System.Math.PI;
        } // End Function ToRadian 


        public static void PolygonArea()
        {
            double[][] poly = new double[][]
            {
                new double[] {47.3612503, 8.5351944},
                new double[] {47.3612252, 8.5342631},
                new double[] {47.3610145, 8.5342755},
                new double[] {47.3610212, 8.5345227},
                new double[] {47.3606405, 8.5345451},
                new double[] {47.3606350, 8.5343411},
                new double[] {47.3604067, 8.5343545},
                new double[] {47.3604120, 8.5345623},
                new double[] {47.3604308, 8.5352457},
                new double[] {47.3606508, 8.5352328},
                new double[] {47.3606413, 8.5348784},
                new double[] {47.3610383, 8.5348551},
                new double[] {47.3610477, 8.5352063},
                new double[] {47.3612503, 8.5351944}
            };

            double area = PolygonArea(poly);
            System.Console.WriteLine(area);
        } // End Sub PolygonArea 


        // https://gis.stackexchange.com/a/816/3997
        public static double PolygonArea(double[][] poly)
        {
            double area = 0.0;
            int len = poly.Length;

            if (len > 2)
            {
                double[] p1, p2;

                for (int i = 0; i < len - 1; i++)
                {
                    p1 = poly[i];
                    p2 = poly[i + 1];

                    area += ToRadians(p2[0] - p1[0]) *
                        (
                            2
                            + System.Math.Sin(ToRadians(p1[1]))
                            + System.Math.Sin(ToRadians(p2[1]))
                        );
                } // Next i 

                // https://en.wikipedia.org/wiki/Earth_radius#Equatorial_radius
                // https://en.wikipedia.org/wiki/Earth_ellipsoid
                // The radius you are using, 6378137.0 m corresponds to the equatorial radius of the Earth.
                double equatorial_radius = 6378137; // m
                double polar_radius = 6356752.3142; // m
                double mean_radius = 6371008.8; // m
                double authalic_radius = 6371007.2; // m (radius of perfect sphere with same surface as reference ellipsoid)
                double volumetric_radius = 6371000.8; // m (radius of a sphere of volume equal to the ellipsoid)
                // geodetic latitude φ
                double siteLatitude = ToRadians(poly[0][0]);

                // https://en.wikipedia.org/wiki/Semi-major_and_semi-minor_axes
                // https://en.wikipedia.org/wiki/World_Geodetic_System
                double a = 6378137; // m
                double b = 6356752.3142; // m
                // where a and b are, respectively, the equatorial radius and the polar radius.
                double R1 = System.Math.Pow(a * a * System.Math.Cos(siteLatitude), 2) +
                         System.Math.Pow(b * b * System.Math.Sin(siteLatitude), 2);
                double R2 = System.Math.Pow(a * System.Math.Cos(siteLatitude), 2) +
                         System.Math.Pow(b * System.Math.Sin(siteLatitude), 2);

                // https://en.wikipedia.org/wiki/Earth_radius#Radius_at_a_given_geodetic_latitude
                // Geocentric radius
                double R = System.Math.Sqrt(R1 / R2);
                // double merid_radius = ((a * a) * (b * b)) / Math.Pow(Math.Pow(a * Math.Cos(siteLatitude), 2) + Math.Pow(b * Math.Sin(siteLatitude), 2), 3.0 / 2.0);


                // System.Console.WriteLine(R);
                // double hrad = polar_radius + (90 - Math.Abs(siteLatitude)) / 90 * (equatorial_radius - polar_radius);
                double radius = mean_radius;

                area = area * radius * radius / 2.0;
            } // End if len > 0 

            // equatorial_radius: 6391.565558418869 m2
            // mean_radius:       6377.287126172337m2
            // authalic_radius:   6377.283923019292 m2
            // volumetric_radius: 6377.271110415153 m2
            // merid_radius:      6375.314923754325 m2
            // polar_radius:      6348.777989748668 m2
            // R:                 6368.48180842528 m2
            // hrad:              6391.171919886588 m2

            // http://postgis.net/docs/doxygen/2.2/dc/d52/geography__measurement_8c_a1a7c48d59bcf4ed56522ab26c142f61d.html
            // ST_Area(false)     6379.25032051953
            // ST_Area(true)      6350.65051177517

            // return area;
            return System.Math.Round(area, 2);
        } // End Function PolygonArea 


        public static double CalculateArea(Wgs84Coordinates[] mycoordinates)
        {
            double[] latLonPoints = new double[mycoordinates.Length * 2];
            double[] z = new double[mycoordinates.Length];

            // dotspatial takes the x,y in a single array, and z in a separate array.  I'm sure there's a 
            // reason for this, but I don't know what it is.
            for (int i = 0; i < mycoordinates.Length; i++)
            {
                latLonPoints[i * 2] = (double)mycoordinates[i].Longitude;
                latLonPoints[i * 2 + 1] = (double)mycoordinates[i].Latitude;
                z[i] = 0;
            } // Next i 


            // source projection is WGS1984
            // https://productforums.google.com/forum/#!msg/gec-data-discussions/FxwUP7bd59g/02tvMDD3vtEJ
            // https://epsg.io/3857
            DotSpatial.Projections.ProjectionInfo projFrom = DotSpatial.Projections.KnownCoordinateSystems.Geographic.World.WGS1984;

            // most complicated problem - you have to find most suitable projection
            DotSpatial.Projections.ProjectionInfo projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.UtmWgs1984.WGS1984UTMZone37N;
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.Europe.EuropeAlbersEqualAreaConic; // 6350.9772005155683
            // projTo= DotSpatial.Projections.KnownCoordinateSystems.Geographic.World.WGS1984; // 5.215560750019806E-07
            // projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.EckertIVsphere; // 6377.26664171461
            // projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.EckertIVworld; // 6391.5626849671826
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.CylindricalEqualAreaworld; // 6350.6506013739854
            /*
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.CylindricalEqualAreasphere; // 6377.2695087222382
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.EquidistantCylindricalsphere; // 6448.6818862780929
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.Polyconicworld; // 8483.7701716953889
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.EquidistantCylindricalworld; // 6463.1380225215107
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.EquidistantConicworld; // 8197.4427198320627
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.VanderGrintenIworld; // 6537.3942984174937
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.WebMercator; // 6535.5119516421109
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.Mercatorworld; // 6492.7180733950809
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.SpheroidBased.Lambert2; // 9422.0631835013628
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.SpheroidBased.Lambert2Wide; // 9422.0614012926817
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.TransverseMercator.WGS1984lo33; // 6760.01638841012
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.Europe.EuropeAlbersEqualAreaConic; // 6350.9772005155683
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.UtmOther.EuropeanDatum1950UTMZone37N; // 6480.7883094931021
            */


            // ST_Area(g, false)     6379.25032051953
            // ST_Area(g, true)      6350.65051177517
            // ST_Area(g)            5.21556075001092E-07


            // prepare for ReprojectPoints (it's mutate array)
            DotSpatial.Projections.Reproject.ReprojectPoints(
                latLonPoints, z, projFrom, projTo
                , 0, latLonPoints.Length / 2
            );

            // assemblying new points array to create polygon
            GeoAPI.Geometries.Coordinate[] polyPoints = new GeoAPI.Geometries.Coordinate[latLonPoints.Length / 2];

            for (int i = 0; i < latLonPoints.Length / 2; ++i)
            {
                polyPoints[i] = new GeoAPI.Geometries.Coordinate(latLonPoints[i * 2], latLonPoints[i * 2 + 1]);
            } // Next i 

            // Assembling linear ring to create polygon 
            NetTopologySuite.Geometries.LinearRing lr =
                new NetTopologySuite.Geometries.LinearRing(polyPoints);

            if (!lr.IsValid)
                throw new System.IO.InvalidDataException("Coordinates are invalid.");

            GeoAPI.Geometries.IPolygon poly = new NetTopologySuite.Geometries.Polygon(lr);
            if (!poly.IsValid)
                throw new System.IO.InvalidDataException("Polygon is invalid.");

            return poly.Area;
        } // End Function CalculateArea 


        public static double CalculateArea2(Wgs84Coordinates[] mycoordinates)
        {
            double[] pointsArray = mycoordinates.ToDoubleArray();
            var z = new double[mycoordinates.Length];

            // public static double[] ToDoubleArray(this Wgs84Coordinates[] mycoordinates)


            // source projection is WGS1984
            var projFrom = DotSpatial.Projections.KnownCoordinateSystems.Geographic.World.WGS1984;
            // most complicated problem - you have to find most suitable projection
            var projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.UtmWgs1984.WGS1984UTMZone37N;
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.Europe.EuropeAlbersEqualAreaConic; 
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.WorldSpheroid.CylindricalEqualAreasphere;
            projTo = DotSpatial.Projections.KnownCoordinateSystems.Projected.World.CylindricalEqualAreaworld; 


            DotSpatial.Projections.Reproject.ReprojectPoints(pointsArray, z, projFrom, projTo, 0, pointsArray.Length / 2);

            // assemblying new points array to create polygon
            var points = new System.Collections.Generic.List<GeoAPI.Geometries.Coordinate>(pointsArray.Length / 2);
            for (int i = 0; i < pointsArray.Length / 2; i++)
                points.Add(new GeoAPI.Geometries.Coordinate(pointsArray[i * 2], pointsArray[i * 2 + 1]));

            NetTopologySuite.Geometries.LinearRing lr =
                new NetTopologySuite.Geometries.LinearRing(points.ToArray());

            GeoAPI.Geometries.IPolygon poly = new NetTopologySuite.Geometries.Polygon(lr);
            return poly.Area;
        }


        public static void TestUnion()
        {
            string s1 = "POLYGON((8.3038582 47.0506309,8.3038611 47.050588,8.3038772 47.0504833,8.3041581 47.0505083,8.3041532 47.0506229,8.303965 47.0506089,8.3039616 47.0506342,8.3038582 47.0506309))";
            string s2 = "POLYGON((8.3041532 47.0506229,8.3041581 47.0505083,8.3042898 47.0505392,8.3042879 47.050571,8.3042854 47.0506139,8.3041532 47.0506229))";
            string s3 = "POLYGON((8.3042879 47.050571,8.30442 47.05058,8.3044327 47.0507439,8.3043001 47.0507637,8.3042885 47.0506777,8.3042854 47.0506139,8.3042879 47.050571))";
            string s4 = "POLYGON((8.304174 47.050784,8.3041695 47.0507507,8.3041592 47.0506835,8.3041585 47.0506448,8.3042166 47.0506438,8.3042225 47.0506777,8.3042885 47.0506777,8.3043001 47.0507637,8.304174 47.050784))";


            Wgs84Coordinates[] coords1 = PolygonParsingExtensions.PolygonStringToCoordinates(s1);
            Wgs84Coordinates[] coords2 = PolygonParsingExtensions.PolygonStringToCoordinates(s2);
            Wgs84Coordinates[] coords3 = PolygonParsingExtensions.PolygonStringToCoordinates(s3);
            Wgs84Coordinates[] coords4 = PolygonParsingExtensions.PolygonStringToCoordinates(s4);


            NetTopologySuite.Geometries.GeometryFactory geomFactory = new NetTopologySuite.Geometries.GeometryFactory();

            GeoAPI.Geometries.IPolygon poly1 = geomFactory.CreatePolygon(coords1.ToNetTopologyCoordinates());
            GeoAPI.Geometries.IPolygon poly2 = geomFactory.CreatePolygon(coords2.ToNetTopologyCoordinates());
            GeoAPI.Geometries.IPolygon poly3 = geomFactory.CreatePolygon(coords3.ToNetTopologyCoordinates());
            GeoAPI.Geometries.IPolygon poly4 = geomFactory.CreatePolygon(coords4.ToNetTopologyCoordinates());



            System.Collections.Generic.List<GeoAPI.Geometries.IGeometry> lsPolygons =
                new System.Collections.Generic.List<GeoAPI.Geometries.IGeometry>();

            lsPolygons.Add(poly1);
            lsPolygons.Add(poly2);
            lsPolygons.Add(poly3);
            lsPolygons.Add(poly4);


            GeoAPI.Geometries.IGeometry ig = NetTopologySuite.Operation.Union.CascadedPolygonUnion.Union(lsPolygons);
            System.Console.WriteLine(ig.GetType().FullName);

            GeoAPI.Geometries.IPolygon unionPolygon = (GeoAPI.Geometries.IPolygon)ig;
            System.Console.WriteLine(poly3);
            System.Console.WriteLine(unionPolygon.Shell.Coordinates);


            System.Collections.Generic.List<Wgs84Coordinates> coords = new System.Collections.Generic.List<Wgs84Coordinates>();

            for (int i = 0; i < unionPolygon.Shell.Coordinates.Length; ++i)
            {
                coords.Add(new Wgs84Coordinates(unionPolygon.Shell.Coordinates[i].X, unionPolygon.Shell.Coordinates[i].Y));
            }


            coords = PolygonParsingExtensions.ToCounterClockWise(coords);


            // Close polygon if unclosed
            if (coords[0].Latitude != coords[coords.Count - 1].Latitude || coords[0].Longitude != coords[coords.Count - 1].Longitude)
                coords.Add(coords[0]);
            
            string insertString = @"
DECLARE @GB_UID AS uniqueidentifier;
DECLARE @SO_UID AS uniqueidentifier;

SET @GB_UID = NULLIF('abc', '');
SET @SO_UID = NULLIF('', '');


DELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE ZO_OBJ_WGS84_GB_UID = @GB_UID; 


/*
INSERT INTO T_ZO_Objekt_Wgs84Polygon
(
     ZO_OBJ_WGS84_UID
    ,ZO_OBJ_WGS84_GB_UID
    ,ZO_OBJ_WGS84_SO_UID
    ,ZO_OBJ_WGS84_Sort
    ,ZO_OBJ_WGS84_GM_Lat
    ,ZO_OBJ_WGS84_GM_Lng
)
*/";


            for (int i = 0; i < coords.Count; ++i)
            {
                if (i != 0)
                    insertString += " \r\n\r\n\r\nUNION ALL \r\n\r\n";

                

                insertString += $@"
SELECT
     NEWID() AS ZO_OBJ_WGS84_UID
    ,CAST(@GB_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_GB_UID
    ,CAST(@SO_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_SO_UID
    ,CAST({i.ToString(System.Globalization.CultureInfo.InvariantCulture)} AS integer) + 1 AS ZO_OBJ_WGS84_Sort
    ,{coords[i].Latitude.ToString(System.Globalization.CultureInfo.InvariantCulture)} AS ZO_OBJ_WGS84_GM_Lat -- decimal(23, 20)
    ,{coords[i].Longitude.ToString(System.Globalization.CultureInfo.InvariantCulture)} AS ZO_OBJ_WGS84_GM_Lng -- decimal(23, 20) ";
            }




            insertString += " \r\n; \r\n\r\n";
            System.Console.WriteLine(insertString);

            System.Console.WriteLine("--- Press any key to continue --- ");
            System.Console.ReadKey();
        }



        public static void Test()
        {
            string s1 = "POLYGON((7.5999034 47.5506347,7.5997595 47.5507183,7.5998959 47.5508256,7.5999759 47.5508885,7.6001195 47.550805,7.5999034 47.5506347))";
            string s2 = "POLYGON((7.6003356 47.5509754,7.6001195 47.550805,7.5999759 47.5508885,7.6000322 47.5509328,7.6001926 47.551059,7.6003356 47.5509754))";

            s1 = "POLYGON((7.5999034 47.5506347,7.6001195 47.550805,7.5999759 47.5508885,7.5998959 47.5508256,7.5997595 47.5507183,7.5999034 47.5506347))";
            s2 = "POLYGON((7.6003356 47.5509754,7.6001926 47.551059,7.6000322 47.5509328,7.5999759 47.5508885,7.6001195 47.550805,7.6003356 47.5509754))";


            // NetTopologySuite.Geometries.Implementation.CoordinateArraySequenceFactory
            // GeoAPI.Geometries.IGeometryFactory geoFactory = new NetTopologySuite.Geometries.GeometryFactory();


            NetTopologySuite.IO.WKTReader wr = new NetTopologySuite.IO.WKTReader();

            Wgs84Coordinates[] coords1 = PolygonParsingExtensions.PolygonStringToCoordinates(s1);
            Wgs84Coordinates[] coords2 = PolygonParsingExtensions.PolygonStringToCoordinates(s2);

            var lr = new NetTopologySuite.Geometries.LinearRing(coords1.ToNetTopologyCoordinates());
            System.Console.WriteLine(lr.IsValid);

            var x = new NetTopologySuite.Geometries.Polygon(new NetTopologySuite.Geometries.LinearRing(coords1.ToNetTopologyCoordinates()));
            System.Console.WriteLine(x.IsValid);

            NetTopologySuite.Geometries.GeometryFactory geomFactory = new NetTopologySuite.Geometries.GeometryFactory();

            GeoAPI.Geometries.IPolygon poly1 = geomFactory.CreatePolygon(coords1.ToNetTopologyCoordinates());
            GeoAPI.Geometries.IPolygon poly2 = geomFactory.CreatePolygon(coords2.ToNetTopologyCoordinates());



            /*
            GeoAPI.Geometries.IPolygon poly1 = (GeoAPI.Geometries.IPolygon)wr.Read(s1);
            GeoAPI.Geometries.IPolygon poly2 = (GeoAPI.Geometries.IPolygon)wr.Read(s2);
            */

            poly1.SRID = 4326;
            poly2.SRID = 4326;



            CalculateArea2(coords1);
            CalculateArea2(coords2);


            System.Console.WriteLine(poly1.Area);
            System.Console.WriteLine(poly2.Area);


            GeoAPI.Geometries.IPolygon poly3quick = (GeoAPI.Geometries.IPolygon)poly1.Union(poly2);
            System.Console.WriteLine(poly3quick.IsValid);

            // https://gis.stackexchange.com/questions/209797/how-to-get-geometry-points-using-geo-api
            System.Console.Write(poly1.IsValid);
            System.Console.Write(poly2.IsValid);


            System.Collections.Generic.List<GeoAPI.Geometries.IGeometry> lsPolygons =
                new System.Collections.Generic.List<GeoAPI.Geometries.IGeometry>();

            lsPolygons.Add(poly1);
            lsPolygons.Add(poly2);


            GeoAPI.Geometries.IGeometry ig = NetTopologySuite.Operation.Union.CascadedPolygonUnion.Union(lsPolygons);
            System.Console.WriteLine(ig.GetType().FullName);

            GeoAPI.Geometries.IPolygon poly3 = (GeoAPI.Geometries.IPolygon)ig;
            System.Console.WriteLine(poly3);

            // POLYGON ((7.5997595 47.5507183, 7.5999034 47.5506347, 7.6001195 47.550805, 7.6003356 47.5509754
            // , 7.6001926 47.551059, 7.6000322 47.5509328, 7.5999759 47.5508885
            // , 7.5998959 47.5508256, 7.5997595 47.5507183))

            System.Console.WriteLine(poly3.Shell.Coordinates);


            /*
            // GeoAPI.Geometries.IPolygon poly3 = (GeoAPI.Geometries.IPolygon)ig;
            NetTopologySuite.Geometries.MultiPolygon poly3a = (NetTopologySuite.Geometries.MultiPolygon)ig;
            GeoAPI.Geometries.IGeometry ig2 = poly3a.ConvexHull();
            System.Console.WriteLine(ig2.GetType().FullName);
            */

            // GeoAPI.Geometries.IPolygon poly4 = (GeoAPI.Geometries.IPolygon)ig2;
            // System.Console.WriteLine(poly4);


            System.Console.WriteLine("--- Press any key to continue --- ");
            System.Console.ReadKey();
        } // End Sub Test 


    } // End Class Program 


} // End Namespace TestTransform 
