
// Namespace:   System.Data.Spatial
// Assembly:  System.Data.Entity(in System.Data.Entity.dll)

// System.Data.Entity.Spatial.DbGeography vs. Microsoft.SqlServer.Types.SqlGeography
// DbGeography is just a dumbed down version of SqlGeography,

namespace AnySqlWebAdmin
{
    public class DbGeography
    {
        public static int DefaultCoordinateSystemId { get; }

        public static DbGeography PolygonFromText(string text, int cooridinateSystemId)
        {
            return null;
        }

        public object ProviderValue;

    }

    public class Coordinate
    {
        public decimal Latitude;
        public decimal Longitude;
    }


    public class Helper 
    {
        // There is a common problem when creating the Polygon types - 
        // the points have to be in a certain order otherwise you would have 
        // a Polygon covering the entire earth except the required Polygon. 
        // To overcome that you can use the following: 
        // https://stackoverflow.com/questions/47967913/determine-if-point-is-inside-shape-sql-server-2014



        // https://stackoverflow.com/questions/23186832/entity-framework-sqlgeography-vs-dbgeography
        public static DbGeography CreatePolygon(Coordinate[] latLongs)
        {
            // SqlGeography to DbGeography
            // SqlGeography geog1 = SqlGeography.STPolyFromText('<coords>', srid);
            // dbGeog = DbGeography.FromText(geog1.ToString(), srid);
            // DbGeography to SqlGeography
            // geog2 = SqlGeography.Parse(dbGeog.AsText());


            //POLYGON ((73.232821 34.191819,73.233755 34.191942,73.233653 34.192358,73.232843 34.192246,73.23269 34.191969,73.232821 34.191819))
            string polyString = "";
            foreach (Coordinate point in latLongs)
            {
                polyString += point.Longitude + " " + point.Latitude + ",";
            }

            polyString = polyString.TrimEnd(',');
            polyString = string.Format("POLYGON(({0}))", polyString);

            DbGeography polygonFromText = DbGeography.PolygonFromText(polyString, DbGeography.DefaultCoordinateSystemId);
            return polygonFromText;
        }


        public static System.Collections.Generic.List<Coordinate> PolygonToGeoPoints(DbGeography sptGeofenceArea)
        {
            System.Collections.Generic.List<Coordinate> points = new System.Collections.Generic.List<Coordinate>();
            string polygonText = sptGeofenceArea.ProviderValue.ToString();
            polygonText = polygonText.Replace("POLYGON", "");
            polygonText = polygonText.Replace("(", "").Replace(")", "").Trim();
            string[] polPoints = polygonText.Split(',');
            foreach (string point in polPoints)
            {
                string[] latlong = point.Trim().Split(' ');
                points.Add(new Coordinate { Latitude = decimal.Parse(latlong[1]), Longitude = decimal.Parse(latlong[0]) });
            }

            return points;
        }


    }
}
