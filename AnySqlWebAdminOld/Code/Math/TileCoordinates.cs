
namespace AnySqlWebAdmin.OSM
{



    public class PointF
    {
        public double X;
        public double Y;
    }

    public class PointD
    {
        public decimal X;
        public decimal Y;
    }


    public class TileCoordinates
    {

        // top-left: 47.889142, 5.573473
        // top-right: 47.890595, 10.880230

        // bottom-left: 45.698722, 5.852018
        // bottom-right: 45.593918, 10.642308


        // top: 47.890595

        // top: 47.890595, 5.573473
        // bottom: 45.593918, 10.880230

        // zoom-0: welt
        // zoom-19: detail


        // https://tools.geofabrik.de/calc/#type=geofabrik_standard&bbox=5.834693,45.79238,10.668923,47.834578

        // pro Tile: 3.5 - 4 kB [0.5-10kb]
        // Schweiz: 40 GB - zoom level 18: 27 GB
        public static void Test()
        {
            PointF p1 = WorldToTilePos(47.890595, 5.573473, 18); // WTF ?
            PointF p2 = WorldToTilePos(45.593918, 10.880230, 18); // WTF ?
            PointF p3 = CalcTileXY(45.593918, 10.880230, 18); // Correct 
            
            string tiles= getTileNumber(45.593918, 10.880230, 18);
            System.Console.WriteLine(tiles);

            System.Console.WriteLine("{0}{1}{2}", p1, p2, p3);
        }

        public static double ToRadians(double val)
        {
            return (System.Math.PI / 180) * val;
        }

        public static string getTileNumber(double lat, double lon, int zoom)
        {
            int xtile = (int)System.Math.Floor((lon + 180) / 360 * (1 << zoom));

            int ytile = (int)System.Math.Floor((1 - System.Math.Log(System.Math.Tan(ToRadians(lat)) + 1 / System.Math.Cos(ToRadians(lat))) / System.Math.PI) / 2 * (1 << zoom));

            if (xtile < 0)
                xtile = 0;
            if (xtile >= (1 << zoom))
                xtile = ((1 << zoom) - 1);
            if (ytile < 0)
                ytile = 0;
            if (ytile >= (1 << zoom))
                ytile = ((1 << zoom) - 1);
            return ("" + zoom + "/" + xtile + "/" + ytile);
        }


        // Correct, from VB
        // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#C.23
        public static PointF CalcTileXY(double lat, double lon, int zoom)
        {
            PointF tile = new PointF();

            tile.X = System.Convert.ToInt32(System.Math.Floor((lon + 180) / 360.0 * System.Math.Pow(2, zoom)));
            tile.Y = System.Convert.ToInt32(System.Math.Floor((1 - System.Math.Log(System.Math.Tan(lat * System.Math.PI / 180) + 1 / System.Math.Cos(lat * System.Math.PI / 180)) / System.Math.PI) / 2 * System.Math.Pow(2, zoom)));

            // tile.X = (lon + 180) / 360.0 * System.Math.Pow(2, zoom);
            // tile.Y = (1 - System.Math.Log(System.Math.Tan(lat * System.Math.PI / 180) + 1 / System.Math.Cos(lat * System.Math.PI / 180)) / System.Math.PI) / 2 * System.Math.Pow(2, zoom);

            return tile;
        }




        // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#C.23
        // https://gis.stackexchange.com/questions/133205/wmts-convert-geolocation-lat-long-to-tile-index-at-a-given-zoom-level
        // WRONG !!!
        public static PointF WorldToTilePos(double lon, double lat, int zoom)
        {
            PointF p = new PointF();
            p.X = (float)((lon + 180.0) / 360.0 * (1 << zoom));
            p.Y = (float)((1.0 - System.Math.Log(System.Math.Tan(lat * System.Math.PI / 180.0) +
                1.0 / System.Math.Cos(lat * System.Math.PI / 180.0)) / System.Math.PI) / 2.0 * (1 << zoom));

            return p;
        }

        // WRONG !!!
        public static PointF TileToWorldPos(double tile_x, double tile_y, int zoom)
        {
            PointF p = new PointF();
            double n = System.Math.PI - ((2.0 * System.Math.PI * tile_y) / System.Math.Pow(2.0, zoom));

            p.X = (float)((tile_x / System.Math.Pow(2.0, zoom) * 360.0) - 180.0);
            p.Y = (float)(180.0 / System.Math.PI * System.Math.Atan(System.Math.Sinh(n)));

            return p;
        }

        // WRONG !!!
        public static PointD WorldToTilePos(decimal lon, decimal lat, int zoom)
        {
            PointD p = new PointD();

            p.X = (decimal)((lon + 180.0m) / 360.0m * (1 << zoom));
            p.Y = (decimal)((1.0m - System.DecimalMath.Log(System.DecimalMath.Tan(lat * System.DecimalMath.PI / 180.0m) +
                1.0m / System.DecimalMath.Cos(lat * System.DecimalMath.PI / 180.0m)) / System.DecimalMath.PI) / 2.0m * (1 << zoom));

            return p;
        }

        // WRONG !!!
        public static PointD TileToWorldPos(decimal tile_x, decimal tile_y, int zoom)
        {

            PointD p = new PointD();
            decimal n = System.DecimalMath.PI - ((2.0M * System.DecimalMath.PI * tile_y) / System.DecimalMath.Power(2.0M, (decimal)zoom));

            p.X = (decimal)((tile_x / System.DecimalMath.Power(2.0M, (decimal)zoom) * 360.0M) - 180.0M);
            p.Y = (decimal)(180.0M / System.DecimalMath.PI * System.DecimalMath.Atan(System.DecimalMath.Sinh(n)));

            return p;
        }

    }
}
