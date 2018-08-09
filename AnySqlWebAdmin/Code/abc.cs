
// Namespace:   System.Data.Spatial
// Assembly:  System.Data.Entity(in System.Data.Entity.dll)

// System.Data.Entity.Spatial.DbGeography vs. Microsoft.SqlServer.Types.SqlGeography
// DbGeography is just a dumbed down version of SqlGeography,

using System.Linq;

namespace AnySqlWebAdmin
{

    public class test
    {

        // https://stackoverflow.com/questions/1175888/determine-if-a-type-is-static
        // static classes are declared abstract and sealed at the IL level. 
        // type.IsAbstract && type.IsSealed
        // However, abstract classes are not the only types you can't instantiate directly. 
        // You should check for things like interfaces (without the CoClass attribute) 
        // and types that don't have a constructor accessible by the calling code.
        public static void isstatic()
        {
            System.Type t = typeof(System.GC);
            System.Console.WriteLine(t.Attributes);
            System.Reflection.TypeAttributes attribForStaticClass = System.Reflection.TypeAttributes.AutoLayout 
                | System.Reflection.TypeAttributes.AnsiClass 
                | System.Reflection.TypeAttributes.Class |
            System.Reflection.TypeAttributes.Public | System.Reflection.TypeAttributes.Abstract 
            | System.Reflection.TypeAttributes.Sealed | System.Reflection.TypeAttributes.BeforeFieldInit;
            System.Console.WriteLine((t.Attributes == attribForStaticClass));
        }


        public static void ByPublicConstructor()
        {
            System.Type t = typeof(System.Environment);
            var c = t.GetConstructors(System.Reflection.BindingFlags.Public);
            if (!t.IsAbstract && c.Length > 0)
            {
                //You can create instance
            }

            // Or if you only interested in parameterless constructor you can use

            var cc = t.GetConstructor(System.Type.EmptyTypes);
            if (cc != null && cc.IsPublic && !t.IsAbstract)
            {
                //You can create instance
            }

        }


        // https://stackoverflow.com/questions/1198417/generate-list-of-methods-of-a-class-with-method-types
        public static void ShowMethods(System.Type type)
        {
            foreach (var method in type.GetMethods())
            {
                var parameters = method.GetParameters();
                var parameterDescriptions = string.Join
                    (", ", method.GetParameters()
                                 .Select(x => x.ParameterType + " " + x.Name)
                                 .ToArray());

                System.Console.WriteLine("{0} {1} ({2})",
                                  method.ReturnType,
                                  method.Name,
                                  parameterDescriptions);
            }
        }

        public static void ListAllClasses()
        {
            System.Reflection.Assembly assembly1 = System.Reflection.Assembly.ReflectionOnlyLoad("fullAssemblyName");
            System.Reflection.Assembly assembly2 = System.Reflection.Assembly.ReflectionOnlyLoadFrom("fileName");

            System.Reflection.Assembly mscorlib = typeof(string).Assembly;
            foreach (System.Type type in mscorlib.GetTypes())
            {
                System.Console.WriteLine(type.FullName);
            }
        }

    }



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
