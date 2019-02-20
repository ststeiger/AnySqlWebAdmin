
namespace TestTransform
{


    public class TestNetTopology
    {


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
        } // End Sub Main 


    } // End Class Program 


} // End Namespace TestTransform 
