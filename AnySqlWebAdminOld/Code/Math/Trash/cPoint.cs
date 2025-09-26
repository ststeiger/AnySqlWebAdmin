
namespace Vectors
{


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
