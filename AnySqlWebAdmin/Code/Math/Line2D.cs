
namespace Vectors
{


    public class MyPoint2D<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {
        public T X;
        public T Y;
        

        public MyPoint2D(T x, T y)
        {
            this.X = x;
            this.Y = y;
        }

        public MyPoint2D(MyPoint2D<T> point)
        {
            this.X = point.X;
            this.Y = point.Y;
        }

        public MyPoint2D<T> Clone()
        {
            return new MyPoint2D<T>(this);
        }
        
        
        public MyPoint2D()
            : this(default(T), default(T)) 
        { }
    }
    
    
    public class MyVector2D<T> 
        : MyPoint2D<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {
        
        
        public MyVector2D(MyPoint2D<T> a, MyPoint2D<T> b)
        {
            this.X = Arithmetics<T>.Subtract(a.X, b.X);
            this.Y = Arithmetics<T>.Subtract(a.Y, b.Y);
        }


        public MyVector2D(T x, T y)
            : base(x, y)
        { }
        
        public MyVector2D(MyVector2D<T> vector)
            : base(vector.X, vector.Y)
        { }

        
        public MyVector2D(MyPoint2D<T> point)
            : base(point.X, point.Y)
        { }
        
        
        public MyVector2D()
            :base()
        { }

        public MyVector2D<T> Clone()
        {
            return new MyVector2D<T>(this);
        }
        
        
        // https://math.stackexchange.com/questions/799783/slope-of-a-line-in-3d-coordinate-system
        public decimal Slope
        {
            get
            {
                
                // m = (y2-y1)/(x2-x1)
                // Case 1: horizontal line: slope = 0           | y=constant, x=variable
                // Case 2: vertical line:   slope = +/-infinity | x=constant, y=variable 
                // Case 3: Parallel => m1 = m2
                // Case 4: orthogonal resp. right-angle => m1 = -1/m2 

                decimal nominator = System.Convert.ToDecimal(this.Y);
                decimal denominator = System.Convert.ToDecimal(this.X);

                if (denominator != 0m)
                    return nominator / denominator;

                if (nominator == 0m)
                    return 0m;

                if (nominator < 0m)
                    return Arithmetics<T>.DecimalNegativeInfinity;

                return Arithmetics<T>.DecimalPositiveInfinity;
            }
        }
        
        
        public static bool operator== (MyVector2D<T> a, MyVector2D<T> b)
        {
            return a.X.Equals(b.X)
                   && a.Y.Equals(b.Y);
        }
        
        
        public static bool operator!= (MyVector2D<T> a, MyVector2D<T> b)
        {
            return !a.X.Equals(b.X)
                   || !a.Y.Equals(b.Y);
        }
        
        
        public static MyVector2D<T> operator+ (MyVector2D<T> a, MyVector2D<T> b) 
        {
            MyVector2D<T> v = a.Clone();
            
            v.X = Arithmetics<T>.Add(v.X, b.X);
            v.Y = Arithmetics<T>.Add(v.Y, b.Y);
            
            return v;
        }
        
        public static MyPoint2D<T> operator+(MyVector2D<T> a, MyPoint2D<T> point)
        {
            MyPoint2D<T> p = point.Clone();
            
            p.X = Arithmetics<T>.Add(p.X, a.X);
            p.Y = Arithmetics<T>.Add(p.Y, a.Y);

            return p;
        }
        
        public static MyPoint2D<T> operator+(MyPoint2D<T> point, MyVector2D<T> a)
        {
            MyPoint2D<T> p = point.Clone();
            
            p.X = Arithmetics<T>.Add(p.X, a.X);
            p.Y = Arithmetics<T>.Add(p.Y, a.Y);
            
            return p;
        }
        
        
        
        public static MyVector2D<T> operator- (MyVector2D<T> a, MyVector2D<T> b) 
        {
            MyVector2D<T> v = a.Clone();
            
            v.X = Arithmetics<T>.Subtract(v.X, b.X);
            v.Y = Arithmetics<T>.Subtract(v.Y, b.Y);
            
            return v;
        }
        
        
        public static MyVector2D<T> operator*(MyVector2D<T> a, MyVector2D<T> b)
        {
            return CrossP(a, b);
        }
        
        
        public static MyVector2D<T> operator* (MyVector2D<T> a, T b) 
        {
            MyVector2D<T> v = a.Clone();
            
            v.X = Arithmetics<T>.Multiply(v.X, b);
            v.Y = Arithmetics<T>.Multiply(v.Y, b);
            
            return v;
        }
        

        public T VectorNormSquared
        {
            get {
                T a = Arithmetics<T>.Multiply(this.X, this.X);
                T b = Arithmetics<T>.Multiply(this.Y, this.Y);
                
                T nReturnValue = Arithmetics<T>.Add(a, b);
                return nReturnValue;
            }
        }


        // Length of vector 
        public T VectorNorm
        {
            get
            {
                T retValue = this.VectorNormSquared;

                double ret = System.Convert.ToDouble(retValue);
                ret = System.Math.Sqrt(ret);
                retValue = (T)System.Convert.ChangeType(ret, typeof(T));

                return retValue;
            }
        }
        

        public MyVector2D<T> UnitVector()
        {
            T len = this.VectorNorm;

            T a = Arithmetics<T>.Divide(this.X, len);
            T b = Arithmetics<T>.Divide(this.Y, len);

            MyVector2D<T> vecReturnValue = new MyVector2D<T>(a, b, c);
            return vecReturnValue;
        } // End function UnitVector
        
        
        // http://mathworld.wolfram.com/CrossProduct.html
        // the cross product is a vector that is perpendicular to both 
        // a and b and thus normal to the plane containing them
        // |u x v| = |u| x |v| * sin(phi) 
        public static T CrossP(MyVector2D<T> a, MyVector2D<T> b)
        {
            // crossp = det(a,b) = a.X*b.Y- a.Y*b.X
            T s1 = Arithmetics<T>.Multiply(a.X, b.Y);
            T s2 = Arithmetics<T>.Multiply(a.Y, b.X);
            
            T retValue = Arithmetics<T>.Subtract(s1, s2);
            
            return retValue;
        } // End function CrossP
        
        
        // The dot product (also called the scalar product) is the magnitude of
        // vector b multiplied by the size of the projection of a onto b.
        // The size of the projection is a cosθ (where θ is the angle between the 2 vectors).
        // https://coderwall.com/p/icvt-g/2d-vector-dot-product
        // where theta is the angle between u and v, given by the dot product
        // cos(theta) = u dotp v
        public static T DotP(MyVector2D<T> a, MyVector2D<T> b)
        {
            T s1 = Arithmetics<T>.Multiply(a.X, b.X);
            T s2 = Arithmetics<T>.Multiply(a.Y, b.Y);
            
            //A * B = ax*bx+ay*by+az*bz
            T retValue = Arithmetics<T>.Add(s1, s2);
            
            return retValue;
        } // End function DotP

    }
    
    
    public class MyLine2D<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {

        protected MyPoint2D<T> m_start;
        protected MyPoint2D<T> m_end;
        protected MyVector2D<T> m_cachedVector;
        
        
        public MyLine2D(MyPoint2D<T> start, MyPoint2D<T> end)
        {
            this.Start = start;
            this.End = end;
        }
        
        
        public MyLine2D(MyPoint2D<T> start, MyVector2D<T> vec)
        {
            this.Start = start;
            this.End = start + vec;
        }
        
        
        public MyLine2D()
        {
            this.Start = new MyPoint2D<T>();
            this.End = new MyPoint2D<T>();
        }
        
        
        // https://math.stackexchange.com/questions/799783/slope-of-a-line-in-3d-coordinate-system
        public decimal Slope
        {
            get
            {
                // m = (y2-y1)/(x2-x1)
                // Case 1: horizontal line: slope = 0           | y=constant, x=variable
                // Case 2: vertical line:   slope = +/-infinity | x=constant, y=variable 
                // Case 3: Parallel => m1 = m2
                // Case 4: orthogonal resp. right-angle => m1 = -1/m2 

                T deltaX = Arithmetics<T>.Subtract(this.m_end.X, this.m_start.X);
                T deltaY = Arithmetics<T>.Subtract(this.m_end.Y, this.m_start.Y);

                decimal nominator = System.Convert.ToDecimal(deltaY);
                decimal denominator = System.Convert.ToDecimal(deltaX);

                if (denominator != 0m)
                    return nominator / denominator;

                if (nominator == 0m)
                    return 0m;

                if (nominator < 0m)
                    return Arithmetics<T>.DecimalNegativeInfinity;

                return Arithmetics<T>.DecimalPositiveInfinity;
            }
        }
        
        
        // https://stackoverflow.com/questions/17692922/check-is-a-point-x-y-is-between-two-points-drawn-on-a-straight-line
        public bool IsPointOnLine(MyPoint2D<T> p)
        {
            T norm = this.Vector.VectorNorm;
            MyVector2D<T> vec1 = new MyVector2D<T>(this.m_start, p);
            MyVector2D<T> vec2 = new MyVector2D<T>(this.m_end, p);
            
            T dist = Arithmetics<T>.Add(vec1.VectorNormSquared, vec2.VectorNormSquared);
            
            if (norm.Equals(dist))
                return true;
            
            T delta = Arithmetics<T>.Subtract(vec1.VectorNormSquared, vec2.VectorNormSquared);
            
            decimal decDelta = System.Convert.ToDecimal(delta);
            decDelta = System.Math.Abs(decDelta);
            
            // Greatest possible floating-point difference 
            decimal decFloatEpsilon = System.Convert.ToDecimal(float.Epsilon);
            
            if (decDelta <= decFloatEpsilon)
                return true;
            
            return false;
        }
        
        
        public static MyVector2D<T> ToVector(MyPoint2D<T> start, MyPoint2D<T> end)
        {
            T x = Arithmetics<T>.Subtract(end.X, start.X);
            T y = Arithmetics<T>.Subtract(end.Y, start.Y);
            
            return new MyVector2D<T>(x, y);
        }
        
        
        public MyPoint2D<T> Start
        {
            get
            {
                return this.m_start;
            }
            set
            {
                this.m_start = value;
                this.m_cachedVector = ToVector(this.m_start, this.m_end);
            }
        }
        
        
        public MyPoint2D<T> End
        {
            get
            {
                return this.m_end;
            }
            set
            {
                this.m_end = value;
                this.m_cachedVector = ToVector(this.m_start, this.m_end);
            }
        }
        
        
        public MyVector2D<T> Vector
        {
            get
            {
                return m_cachedVector;
            }
        }
        
        
        public override int GetHashCode()
        {
            return Start.GetHashCode() | End.GetHashCode();
        }
        
        
    }
    
    
}
