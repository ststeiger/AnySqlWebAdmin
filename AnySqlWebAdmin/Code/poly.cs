
using System.Data.SqlTypes;
using System.Text;
using Microsoft.SqlServer.Types;


namespace AnySqlWebAdmin
{

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
            System.Text.StringBuilder sb = new StringBuilder();
            
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
        
        public static SqlGeography ToPolygon(string text)
        {
            // text = @"POLYGON((-122.358 47.653, -122.348 47.649, -122.348 47.658, -122.358 47.658, -122.358 47.653))";
            
            SqlChars polygon = new SqlChars(new SqlString(text));
            SqlGeography poly = SqlGeography.STMPolyFromText(polygon, 4326);
            
            return poly;
        }
        
        public static SqlGeography ToPolygon(GeoPoint[] points)
        {
            string pointText = ObjJoin(", ", points);
            string text = "POLYGON((" + pointText + "))";
            
            SqlGeography poly = ToPolygon(text);
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
            
            SqlGeography poly1 = ToPolygon(s1); // points);
            SqlGeography poly2 = ToPolygon(s2); // points);
            
            SqlGeography poly3 = poly1.STUnion(poly2);
            
        }
        
        
    }
    
    
}
