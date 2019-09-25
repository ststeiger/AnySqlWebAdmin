
namespace TestTransform
{


    public class XYCoordinates 
    {
        public decimal X;
        public decimal Y;
        public int ZoomLevel;


        public XYCoordinates(decimal x, decimal y, int zoom)
        {
            this.X = x;
            this.Y = y;
            this.ZoomLevel = zoom;
        } // End Constructor 


        public XYCoordinates(decimal x, decimal y)
            : this(x, y, 0)
        { } // End Constructor 


        public XYCoordinates()
            : this(0, 0)
        { } // End Constructor 


        public override string ToString()
        {
            return "( X: " + this.X.ToString(System.Globalization.CultureInfo.InvariantCulture)
                                  + "    Y: " + this.Y.ToString(System.Globalization.CultureInfo.InvariantCulture)
                                  + " )";
        } // End Function ToString 


        public static bool operator ==(XYCoordinates lhs, XYCoordinates rhs)
        {
            return (lhs.X == rhs.X && lhs.Y == rhs.Y);
        } // End Operator == 


        public static bool operator !=(XYCoordinates lhs, XYCoordinates rhs)
        {
            return (lhs.X != rhs.X && lhs.Y != rhs.Y);
        } // End Operator != 

        public override bool Equals(object obj)
        {
            if(!object.ReferenceEquals(typeof(XYCoordinates), obj.GetType()))
                return false;

            XYCoordinates wgsObj = (XYCoordinates) obj;
            
            return this == wgsObj;
        }
        
        
        public override int GetHashCode()
        {
            return unchecked(this.X.GetHashCode()) ^ ((int)(this.Y.GetHashCode() >> 32));  
        }
        
        
    } // End Class Wgs84Coordinates 


} // End Namespace TestTransform 
