
namespace TestTransform
{


    class PolygonParsingExtensions
    {


        public static bool IsClockwise(System.Collections.Generic.List<Wgs84Coordinates> poly)
        {
            double sum = 0;

            for (int i = 0; i < poly.Count - 1; i++)
            {
                Wgs84Coordinates cur = poly[i], next = poly[i + 1];
                sum += (next.Latitude - cur.Latitude) * (next.Longitude + cur.Longitude);
            } // Next i 

            return sum > 0;
        } // End Function isClockwise 


        // MSSQL is CLOCKWISE (MS-SQL polygon wants the points clockwise) 
        public static System.Collections.Generic.List<Wgs84Coordinates> ToClockWise(System.Collections.Generic.List<Wgs84Coordinates> poly)
        {
            if (!IsClockwise(poly))
                poly.Reverse();

            return poly;
        } // End Function toClockWise 


        // OSM is COUNTER-clockwise
        public static System.Collections.Generic.List<Wgs84Coordinates> ToCounterClockWise(System.Collections.Generic.List<Wgs84Coordinates> poly)
        {
            if (IsClockwise(poly))
                poly.Reverse();

            return poly;
        } // End Function toCounterClockWise 


        public static Wgs84Coordinates[] PolygonStringToCoordinates(string polygonString)
        {
            System.Collections.Generic.List<Wgs84Coordinates> ls = new System.Collections.Generic.List<Wgs84Coordinates>();


            System.Text.RegularExpressions.Match match = System.Text.RegularExpressions.Regex.Match(
                polygonString, @"\s*POLYGON\s*\(\s*\(\s*(.*?)\s*\)\s*\)\s*", System.Text.RegularExpressions.RegexOptions.IgnoreCase);

            if (!match.Success)
                return null;

            polygonString = match.Groups[1].Value;
            polygonString = System.Text.RegularExpressions.Regex.Replace(polygonString, @"\s*,\s", ",");

            string[] allPoints = polygonString.Split(',');

            for (int i = 0; i < allPoints.Length; ++i)
            {
                string[] pointComponents = allPoints[i].Split(' ');
                ls.Add(new Wgs84Coordinates(
                      double.Parse(pointComponents[1], System.Globalization.CultureInfo.InvariantCulture)
                    , double.Parse(pointComponents[0], System.Globalization.CultureInfo.InvariantCulture)
                    )
                );
                // ls.Add(new Wgs84Coordinates(double.Parse(pointComponents[0]), double.Parse(pointComponents[1])));
            } // Next i 

            // Close Polygon 
            // if (ls[0] != ls[ls.Count - 1]) ls.Add(ls[0]);

            // Open Polygon 
            // if (ls[0] == ls[ls.Count - 1]) ls.RemoveAt(ls.Count - 1);


            // ls = ToCounterClockWise(ls); // OSM is COUNTER-clockwise
            ls = ToClockWise(ls);

            return ls.ToArray();
        } // End Function PolygonStringToCoordinates 
        

        public string CreatePolygon(System.Collections.Generic.List<Wgs84Coordinates> poly)
        {
            //POLYGON ((73.232821 34.191819,73.233755 34.191942,73.233653 34.192358,73.232843 34.192246,73.23269 34.191969,73.232821 34.191819))
            string polyString = "";

            // MS-SQL polygon absolutely wants to be clockwise...
            // Don't copy array, just switch direction if necessary 
            if (IsClockwise(poly))
            {
                for (int i = 0; i < poly.Count; ++i)
                {
                    if (i != 0)
                        polyString += ",";

                    polyString += poly[i].Longitude.ToString(System.Globalization.CultureInfo.InvariantCulture)
                        + " " 
                        + poly[i].Latitude.ToString(System.Globalization.CultureInfo.InvariantCulture); 
                }
            }
            else
            {
                for (int i = poly.Count - 1; i > -1; --i)
                {
                    if (i != poly.Count - 1)
                        polyString += ",";

                    polyString += poly[i].Longitude.ToString(System.Globalization.CultureInfo.InvariantCulture) 
                        + " " 
                        + poly[i].Latitude.ToString(System.Globalization.CultureInfo.InvariantCulture);
                }
            }

            polyString = "POLYGON((" + polyString + "))";
            return polyString;
        } // End Function CreatePolygon 


        public string CreateSqlPolygon(System.Collections.Generic.List<Wgs84Coordinates> poly)
        {
            string s = "geography::STPolyFromText('" + CreatePolygon(poly) + "', 4326)";
            return s;
        } // End Function CreateSqlPolygon 


    } // End Class PolygonParsingExtensions 


} // End Namespace TestTransform 
