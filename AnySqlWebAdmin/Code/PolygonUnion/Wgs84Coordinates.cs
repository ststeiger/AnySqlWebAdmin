
namespace TestTransform
{


    public class Wgs84Coordinates 
    {
        public decimal Latitude;
        public decimal Longitude;
        public int ZoomLevel;


        public Wgs84Coordinates(decimal lat, decimal lng, int zoom)
        {
            this.Latitude = lat;
            this.Longitude = lng;
            this.ZoomLevel = zoom;
        } // End Constructor 


        public Wgs84Coordinates(decimal lat, decimal lng)
            : this(lat, lng, 0)
        { } // End Constructor 


        public Wgs84Coordinates()
            : this(0, 0)
        { } // End Constructor 


        public override string ToString()
        {
            return "( Latitude: " + this.Latitude.ToString(System.Globalization.CultureInfo.InvariantCulture)
                                  + "    Longitude: " + this.Longitude.ToString(System.Globalization.CultureInfo.InvariantCulture)
                                  + " )";
        } // End Function ToString 


        public static bool operator ==(Wgs84Coordinates lhs, Wgs84Coordinates rhs)
        {
            return (lhs.Latitude == rhs.Latitude && lhs.Longitude == rhs.Longitude);
        } // End Operator == 


        public static bool operator !=(Wgs84Coordinates lhs, Wgs84Coordinates rhs)
        {
            return (lhs.Latitude != rhs.Latitude && lhs.Longitude != rhs.Longitude);
        } // End Operator != 

        public override bool Equals(object obj)
        {
            if(!object.ReferenceEquals(typeof(Wgs84Coordinates), obj.GetType()))
                return false;

            Wgs84Coordinates wgsObj = (Wgs84Coordinates) obj;
            
            return this == wgsObj;
        }
        
        
        public override int GetHashCode()
        {
            return unchecked(this.Latitude.GetHashCode()) ^ ((int)(this.Longitude.GetHashCode() >> 32));  
        }
        
        
    } // End Class Wgs84Coordinates 


} // End Namespace TestTransform 
