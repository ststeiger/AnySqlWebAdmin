
namespace AnySqlWebAdmin
{


    public class GeoPoint
    {
        public decimal Lat;
        public decimal Lng;
    }


    public class GeographicOperations
    {


        public enum IntersectionType_t 
            : int
        {
            None = 0,
            Intersects = 1,
            COLLINEAR = 2
        }


        public class Vector
        {
            public Point Start;
            public Point End;
        }


        public class Point
        {
            public float X;
            public float Y;
        }

        // The idea of the algorithm is pretty simple: 
        // Draw a virtual ray from anywhere outside the polygon to your point 
        // and count how often it hits a side of the polygon.
        // If the number of hits is even, it's outside of the polygon, 
        // if it's odd, it's inside.

        // https://en.wikipedia.org/wiki/Point_in_polygon
        // The number of intersections for a ray passing from the exterior of the polygon 
        // to any point; if odd, it shows that the point lies inside the polygon. 
        // If it is even, the point lies outside the polygon; 
        // this test also works in three dimensions.
        // One simple way of finding whether the point is inside or outside a simple polygon 
        // is to test how many times a ray, starting from the point 
        // and going in any fixed direction, intersects the edges of the polygon.
        // If the point is on the outside of the polygon the ray will intersect 
        // its edge an even number of times. 
        // If the point is on the inside of the polygon then it will intersect 
        // the edge an odd number of times.
        // Unfortunately, this method won't work if the point is on the edge of the polygon.

        // https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
        // https://stackoverflow.com/questions/4243042/c-sharp-point-in-polygon
        public void BoundingBox(Point testPoint, Point[] polygon)
        {
            float minX = polygon[0].X;
            float maxX = polygon[0].X;
            float minY = polygon[0].Y;
            float maxY = polygon[0].Y;

            for (int i = 1; i < polygon.Length; i++)
            {
                Point q = polygon[i];
                minX = System.Math.Min(q.X, minX);
                maxX = System.Math.Max(q.X, maxX);
                minY = System.Math.Min(q.Y, minY);
                maxY = System.Math.Max(q.Y, maxY);
                
                // check if point is q.x/y
            } // Next i 
            
            float edgePointX = minX - float.Epsilon;
            float edgePointY = minY - float.Epsilon;

            // Vector point outside polygon => clickPint
            Vectors.cVector_2d ray = Vectors.cVector_2d.MakeVector(edgePointX, edgePointY, testPoint.X, testPoint.Y);
            
            // Schnittpunkt 
            // Test schnittpunkt aus Linie 
            
            int numIntersections = 0;

            for (int i = 1; i < polygon.Length; i++)
            {

                IntersectionType_t t = areIntersecting(polygon[i - i].X, polygon[i - i].Y,
                    polygon[i].X, polygon[i].Y,
                   edgePointX, edgePointY, testPoint.X, testPoint.Y
                );

                if (t == IntersectionType_t.Intersects)
                    numIntersections++;
                // else if (t == IntersectionType_t.COLLINEAR)
                    // numIntersections++;

            } // Next i 


        }
        
        
        public static IntersectionType_t areIntersecting(
            float v1x1, float v1y1, float v1x2, float v1y2, // i-1, i
            float v2x1, float v2y1, float v2x2, float v2y2
        )
        {
            float d1, d2;
            float a1, a2, b1, b2, c1, c2;

            // Convert vector 1 to a line (line 1) of infinite length.
            // We want the line in linear equation standard form: A*x + B*y + C = 0
            // See: http://en.wikipedia.org/wiki/Linear_equation
            a1 = v1y2 - v1y1;
            b1 = v1x1 - v1x2;
            c1 = (v1x2 * v1y1) - (v1x1 * v1y2);

            // Every point (x,y), that solves the equation above, is on the line,
            // every point that does not solve it, is not. The equation will have a
            // positive result if it is on one side of the line and a negative one 
            // if is on the other side of it. We insert (x1,y1) and (x2,y2) of vector
            // 2 into the equation above.
            d1 = (a1 * v2x1) + (b1 * v2y1) + c1;
            d2 = (a1 * v2x2) + (b1 * v2y2) + c1;

            // If d1 and d2 both have the same sign, they are both on the same side
            // of our line 1 and in that case no intersection is possible. Careful, 
            // 0 is a special case, that's why we don't test ">=" and "<=", 
            // but "<" and ">".
            if (d1 > 0 && d2 > 0)
                return IntersectionType_t.None;

            if (d1 < 0 && d2 < 0)
                return IntersectionType_t.None;

            // The fact that vector 2 intersected the infinite line 1 above doesn't 
            // mean it also intersects the vector 1. Vector 1 is only a subset of that
            // infinite line 1, so it may have intersected that line before the vector
            // started or after it ended. To know for sure, we have to repeat the
            // the same test the other way round. We start by calculating the 
            // infinite line 2 in linear equation standard form.
            a2 = v2y2 - v2y1;
            b2 = v2x1 - v2x2;
            c2 = (v2x2 * v2y1) - (v2x1 * v2y2);

            // Calculate d1 and d2 again, this time using points of vector 1.
            d1 = (a2 * v1x1) + (b2 * v1y1) + c2;
            d2 = (a2 * v1x2) + (b2 * v1y2) + c2;

            // Again, if both have the same sign (and neither one is 0),
            // no intersection is possible.
            if (d1 > 0 && d2 > 0)
                return IntersectionType_t.None;
            if (d1 < 0 && d2 < 0)
                return IntersectionType_t.None;

            // If we get here, only two possibilities are left. Either the two
            // vectors intersect in exactly one point or they are collinear, which
            // means they intersect in any number of points from zero to infinite.
            if ((a1 * b2) - (a2 * b1) == 0.0f)
                return IntersectionType_t.COLLINEAR;

            // If they are not collinear, they must intersect in exactly one point.
            return IntersectionType_t.Intersects;
        }









        /// <summary>
        /// Determines if the given point is inside the polygon
        /// </summary>
        /// <param name="polygon">the vertices of polygon</param>
        /// <param name="testPoint">the given point</param>
        /// <returns>true if the point is inside the polygon; otherwise, false</returns>
        public static bool IsPointInPolygon4(GeoPoint[] polygon, GeoPoint testPoint)
        {
            bool result = false;
            int j = polygon.Length - 1;

            for (int i = 0; i < polygon.Length; i++)
            {
                if (polygon[i].Lng < testPoint.Lng && polygon[j].Lng >= testPoint.Lng || polygon[j].Lng < testPoint.Lng && polygon[i].Lng >= testPoint.Lng)
                {
                    if (polygon[i].Lat + (testPoint.Lng - polygon[i].Lng) / (polygon[j].Lng - polygon[i].Lng) * (polygon[j].Lat - polygon[i].Lat) < testPoint.Lat)
                    {
                        result = !result;
                    }
                }

                j = i;
            } // Next i 

            return result;
        } // End Function IsPointInPolygon4 


    } // End CLass GeographicOperations 


#if false

    public class GeoPoint
    {
        public decimal Lat;
        public decimal Long;


        public GeoPoint(decimal latitude, decimal longitude)
        {
            this.Lat = latitude;
            this.Long = longitude;
        }
        
        public GeoPoint()
            :this(0,0)
        { }
        
        public override string ToString()
        {
            return this.Lat.ToString(System.Globalization.CultureInfo.InvariantCulture)
                + " "
                + this.Long.ToString(System.Globalization.CultureInfo.InvariantCulture);
        }
    }


    public class GeographicOperations 
    {
        
        
        public static string ObjJoin(string separator, params object[] objs)
        {
            string result = null;
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            
            bool isNotFirst = false;
            
            for (int i = 0; i < objs.Length; ++i)
            {
                if (objs[i] == null)
                    continue;

                if (separator != null && isNotFirst)
                {
                    sb.Append(separator);
                }
                else
                    isNotFirst = true;
                
                if(objs[i] != null)
                    sb.Append(objs[i].ToString());
            }
            
            result = sb.ToString();
            sb.Clear();
            sb = null;
            
            return result;
        }

        
        // geography::STPolyFromText('POLYGON((9.3763619 47.4330074,9.3764389 47.4329684,9.3764072 47.4329405,9.3763969 47.4329322,9.3759864 47.4326004,9.376056 47.4325644,9.3761349 47.4325167,9.37619 47.4325653,9.376312 47.4326732,9.3765907 47.4328683,9.3766389 47.4328521,9.3767794 47.4329452,9.3764748 47.4331106,9.3763619 47.4330074))', 4326)
        // geography::STPolyFromText('POLYGON((9.3766833 47.4319973,9.3772045 47.4324131,9.3771257 47.432459,9.3769959 47.4323535,9.3767225 47.4325076,9.3768938 47.432637,9.3769843 47.4325975,9.3772713 47.432826,9.3771862 47.4328789,9.376941 47.4326789,9.3767283 47.4327757,9.3765053 47.4325749,9.376312 47.4326732,9.37619 47.4325653,9.3761349 47.4325167,9.376056 47.4325644,9.3757946 47.43237,9.3760399 47.4322419,9.376144 47.4323272,9.3761809 47.4323125,9.3762975 47.432428,9.3762371 47.4324602,9.3763095 47.4325246,9.3764699 47.4324328,9.3763633 47.4323437,9.3763976 47.4323193,9.3763247 47.4322628,9.3763972 47.4322251,9.3764363 47.4322061,9.3766528 47.4323718,9.3768611 47.4322514,9.3765976 47.4320409,9.3766833 47.4319973))', 4326)
        
        public static Microsoft.SqlServer.Types.SqlGeography ToPolygon(string text)
        {
            // text = @"POLYGON((-122.358 47.653, -122.348 47.649, -122.348 47.658, -122.358 47.658, -122.358 47.653))";

            System.Data.SqlTypes.SqlChars polygon = new System.Data.SqlTypes.SqlChars(new System.Data.SqlTypes.SqlString(text));
            Microsoft.SqlServer.Types.SqlGeography poly = Microsoft.SqlServer.Types.SqlGeography.STMPolyFromText(polygon, 4326);
            
            return poly;
        }
        
        public static Microsoft.SqlServer.Types.SqlGeography ToPolygon(GeoPoint[] points)
        {
            string pointText = ObjJoin(", ", points);
            string text = "POLYGON((" + pointText + "))";

            Microsoft.SqlServer.Types.SqlGeography poly = ToPolygon(text);
            return poly;
        }
        
        
        public static void Test()
        {
            // DECLARE @Geom TABLE ( shape geometry ); 
            // SELECT geometry::UnionAggregate(shape).ToString() FROM @Geom;
            // geometry ST_Union(geometry[] g1_array);
            // https://docs.microsoft.com/en-us/sql/t-sql/spatial-geometry/unionaggregate-geometry-data-type?view=sql-server-2017
            // https://gis.stackexchange.com/questions/237644/what-does-the-st-union-of-the-geometry-column-of-two-tables-produce
            
            
            GeoPoint[] points = new GeoPoint[]
            {
                  new GeoPoint(0,0)
                , new GeoPoint(0,0)
                , new GeoPoint(0,0)
                , new GeoPoint(0,0)
                , new GeoPoint(0,0)
            };



            string s1 = "POLYGON((9.3763619 47.4330074,9.3764389 47.4329684,9.3764072 47.4329405,9.3763969 47.4329322,9.3759864 47.4326004,9.376056 47.4325644,9.3761349 47.4325167,9.37619 47.4325653,9.376312 47.4326732,9.3765907 47.4328683,9.3766389 47.4328521,9.3767794 47.4329452,9.3764748 47.4331106,9.3763619 47.4330074))";
            string s2 = "POLYGON((9.3766833 47.4319973,9.3772045 47.4324131,9.3771257 47.432459,9.3769959 47.4323535,9.3767225 47.4325076,9.3768938 47.432637,9.3769843 47.4325975,9.3772713 47.432826,9.3771862 47.4328789,9.376941 47.4326789,9.3767283 47.4327757,9.3765053 47.4325749,9.376312 47.4326732,9.37619 47.4325653,9.3761349 47.4325167,9.376056 47.4325644,9.3757946 47.43237,9.3760399 47.4322419,9.376144 47.4323272,9.3761809 47.4323125,9.3762975 47.432428,9.3762371 47.4324602,9.3763095 47.4325246,9.3764699 47.4324328,9.3763633 47.4323437,9.3763976 47.4323193,9.3763247 47.4322628,9.3763972 47.4322251,9.3764363 47.4322061,9.3766528 47.4323718,9.3768611 47.4322514,9.3765976 47.4320409,9.3766833 47.4319973))'";

            // ST_GeomFromText(text WKT, integer srid);
            // ST_Union, ST_AsText
            // ST_GeomFromText('POINT(-2 3)') ) )
            // ST_Intersects( geography geogA , geography geogB )

            // Could not load Microsoft.SqlServer.Server

            Microsoft.SqlServer.Types.SqlGeography poly1 = ToPolygon(s1); // points);
            Microsoft.SqlServer.Types.SqlGeography poly2 = ToPolygon(s2); // points);

            Microsoft.SqlServer.Types.SqlGeography poly3 = poly1.STUnion(poly2);
            System.Data.SqlTypes.SqlChars chars = poly3.STAsText();
            string value = new string(chars.Value);
            System.Console.WriteLine(value);
        }
        
        
    }
    
#endif
}


