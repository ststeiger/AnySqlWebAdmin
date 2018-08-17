
using Microsoft.AspNetCore.Builder;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Vectors
{


    public class ParametricForms
    {
        
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



    public class Point
    {
        public Point(double x, double y)
        {
            this.x = x;
            this.y = y;
        }

        public Point()
            :this(0,0)
        { }

        public double x;
        public double y;
    }

    public class cPoint
        : Point
    {
        public bool bCurrentlyValid = true;
        public bool bHasInterSection = false;
        public double z = 0;


        //Constructor
        public cPoint(double nXparam = 0, double nYparam = 0, double nZparam = 0)
        {
            this.x = nXparam;
            this.y = nYparam;
            this.z = nZparam;
            this.bCurrentlyValid = true;
        }  // End Constructor


        // instance.ToNormalPoint()
        public Point ToNormalPoint()
        {

            if (this.bCurrentlyValid)
            {
                Point ptReturnValue = new Point();
                ptReturnValue.x = this.x;
                ptReturnValue.y = this.y;
                return ptReturnValue;
            }

            return null;
        }


        // instance.toString();
        public override string ToString()
        {
            string strReturnValue = "(" + this.x + "," + this.y;
            if (z != 0)
                strReturnValue += ", " + this.z + ")";
            else
                strReturnValue += ")";

            if (!this.bCurrentlyValid)
                strReturnValue += " INVALID";

            return strReturnValue;
        }  // End function toString


    } // End cPoint 

} // End Package
