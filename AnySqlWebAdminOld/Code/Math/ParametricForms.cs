
namespace AnySqlWebAdmin.Code.Math
{


    public class ParametricForms
    {


        // https://en.wikipedia.org/wiki/Determinant
        // | a  b |
        // | c  d |
        public static double Determinant2d(double a, double b, double c, double d)
        {
            return a * d - b * c;
        }


        // | a  b c |
        // | d  e f |
        // | g  h i |
        public static double Determinant3d(double a, double b, double c, double d, double e, double f, double g, double h, double i)
        {
            return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
        }


        // https://www.mathopenref.com/coordparamcircle.html
        public static void Circle()
        {
            double r = 20;
            double t = 33; // 0-2pi radian

            // x² + y² = r²
            // sin² + cos² = 1

            // x²/r² + y²/r² = 1


            double x = r * System.Math.Cos(t);
            double y = r * System.Math.Sin(t);
        }


        // https://math.stackexchange.com/questions/22064/calculating-a-point-that-lies-on-an-ellipse-given-an-angle
        public static void Ellipse()
        {
            //  radius along the x-axis is usually called a.
            double a = 30;
            //  radius along the y-axis is usually called b.
            double b = 15;
            double t = 33; // 0-2pi radian

            // Centered at the origin:

            // x = a cos t 
            // y = b sin t

            // x²/a² + y²/b² = 1
            // y = x*tan(t)

            // x²/a² + x²*tan²(t)/b² = 1
            // ==> x = +/- a*b/√(b²+a²*tan²(t))
            // where sign is + if -pi/2 < t < pi/2

            double h = 200; // x-coordinate of the ellipsis center
            double k = 200; // y-coordinate of the ellipsis center

            // in a circle, a = b = r 

            // if the circle is based on the origin, h&k = 0
            double x = h + a * System.Math.Cos(t);
            double y = k + b * System.Math.Sin(t);

        }


    }


}
