
// https://github.com/mono/opentk/tree/master/Source/OpenTK/Math
// https://github.com/mono/opentk/blob/master/Source/OpenTK/Math/Vector2.cs
// https://github.com/mono/opentk/blob/master/Source/OpenTK/Math/Quaternion.cs

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
        } // End Constructor 


        public MyPoint2D(MyPoint2D<T> point)
        {
            this.X = point.X;
            this.Y = point.Y;
        } // End Constructor 


        public MyPoint2D()
            : this(default(T), default(T))
        { } // End Constructor 


        public MyPoint2D<T> Clone()
        {
            return new MyPoint2D<T>(this);
        } // End Function Clone 


        /// <summary>
        /// Returns the hashcode for this instance.
        /// </summary>
        /// <returns>A System.Int32 containing the unique hashcode for this instance.</returns>
        public override int GetHashCode()
        {
            return this.X.GetHashCode() ^ this.Y.GetHashCode();
        } // End Function GetHashCode 


        /// <summary>
        /// Returns a System.String that represents the current Vector3.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Format("({0}, {1})", this.X, this.Y);
        } // End Function ToString 


        /// <summary>
        /// Returns a new Vector that is the linear blend of the 2 given Vectors
        /// </summary>
        /// <param name="a">First input vector</param>
        /// <param name="b">Second input vector</param>
        /// <param name="blend">The blend factor. a when blend=0, b when blend=1.</param>
        /// <returns>a when blend=0, b when blend=1, and a linear combination otherwise</returns>
        public static MyPoint2D<T> Lerp(MyPoint2D<T> a, MyPoint2D<T> b, T blend)
        {
            T bxax = Arithmetics<T>.Subtract(b.X, a.X);
            T byay = Arithmetics<T>.Subtract(b.Y, a.Y);

            T f1 = Arithmetics<T>.Multiply(blend, bxax);
            T f2 = Arithmetics<T>.Multiply(blend, byay);

            T x = Arithmetics<T>.Add(f1, a.X);
            T y = Arithmetics<T>.Add(f2, a.Y);

            return new MyPoint2D<T>(x, y);
        } // End Function Lerp 


    } // End Class MyPoint2D<T> 


    public class MyVector2D<T>
        : MyPoint2D<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {


        public MyVector2D(MyPoint2D<T> a, MyPoint2D<T> b)
        {
            this.X = Arithmetics<T>.Subtract(a.X, b.X);
            this.Y = Arithmetics<T>.Subtract(a.Y, b.Y);
        } // End Constructor 


        public MyVector2D(T x, T y)
            : base(x, y)
        { } // End Constructor 


        public MyVector2D(MyVector2D<T> vector)
            : base(vector.X, vector.Y)
        { } // End Constructor 


        public MyVector2D(MyPoint2D<T> point)
            : base(point.X, point.Y)
        { } // End Constructor 


        public MyVector2D()
            : base()
        { } // End Constructor 


        public new MyVector2D<T> Clone()
        {
            return new MyVector2D<T>(this);
        } // End Function Clone 


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
        } // End Property Slope 


        public static bool operator ==(MyVector2D<T> a, MyVector2D<T> b)
        {
            return    a.X.Equals(b.X)
                   && a.Y.Equals(b.Y);
        } // End Operator == 


        public static bool operator !=(MyVector2D<T> a, MyVector2D<T> b)
        {
            return    !a.X.Equals(b.X)
                   || !a.Y.Equals(b.Y);
        } // End Operator != 


        public static MyVector2D<T> operator +(MyVector2D<T> a, MyVector2D<T> b)
        {
            MyVector2D<T> v = a.Clone();

            v.X = Arithmetics<T>.Add(v.X, b.X);
            v.Y = Arithmetics<T>.Add(v.Y, b.Y);

            return v;
        } // End Operator + 


        public static MyPoint2D<T> operator +(MyVector2D<T> a, MyPoint2D<T> point)
        {
            MyPoint2D<T> p = point.Clone();

            p.X = Arithmetics<T>.Add(p.X, a.X);
            p.Y = Arithmetics<T>.Add(p.Y, a.Y);

            return p;
        } // End Operator + 


        public static MyPoint2D<T> operator +(MyPoint2D<T> point, MyVector2D<T> a)
        {
            MyPoint2D<T> p = point.Clone();

            p.X = Arithmetics<T>.Add(p.X, a.X);
            p.Y = Arithmetics<T>.Add(p.Y, a.Y);

            return p;
        } // End Operator + 


        public static MyVector2D<T> operator -(MyVector2D<T> a, MyVector2D<T> b)
        {
            MyVector2D<T> v = a.Clone();

            v.X = Arithmetics<T>.Subtract(v.X, b.X);
            v.Y = Arithmetics<T>.Subtract(v.Y, b.Y);

            return v;
        } // End Operator - 


        public static T operator *(MyVector2D<T> a, MyVector2D<T> b)
        {
            return CrossP(a, b);
        } // End Operator * 


        public static MyVector2D<T> operator *(MyVector2D<T> a, T b)
        {
            MyVector2D<T> v = a.Clone();

            v.X = Arithmetics<T>.Multiply(v.X, b);
            v.Y = Arithmetics<T>.Multiply(v.Y, b);

            return v;
        } // End Operator * 


        public T MagnitudeSquared
        {
            get
            {
                T a = Arithmetics<T>.Multiply(this.X, this.X);
                T b = Arithmetics<T>.Multiply(this.Y, this.Y);

                T nReturnValue = Arithmetics<T>.Add(a, b);
                return nReturnValue;
            }
        } // End Property MagnitudeSquared 


        // Length of vector 
        public T Magnitude
        {
            get
            {
                T retValue = this.MagnitudeSquared;

                double ret = System.Convert.ToDouble(retValue);
                ret = System.Math.Sqrt(ret);
                retValue = (T)System.Convert.ChangeType(ret, typeof(T));

                return retValue;
            }
        } // End Property Magnitude 


        public MyVector2D<T> Normalized
        {
            get
            {
                T len = this.Magnitude;

                T a = Arithmetics<T>.Divide(this.X, len);
                T b = Arithmetics<T>.Divide(this.Y, len);

                MyVector2D<T> vecReturnValue = new MyVector2D<T>(a, b);
                return vecReturnValue;
            }

        } // End Property Normalized


        // http://mathworld.wolfram.com/NormalVector.html
        // https://stackoverflow.com/questions/1243614/how-do-i-calculate-the-normal-vector-of-a-line-segment
        public static MyVector2D<T> GetNormalVector(MyVector2D<T> vec)
        {
            MyVector2D<T> normal1 = new MyVector2D<T>(Arithmetics<T>.Minus(vec.Y), vec.X);
            // MyVector2D<T> normal2 = new MyVector2D<T>(vec.Y, Arithmetics<T>.Minus(vec.X));

            return normal1;
        } // End Function GetNormalVector 


        public MyVector2D<T> NormalVector
        {
            get
            {
                MyVector2D<T> normalVector1 = new MyVector2D<T>(Arithmetics<T>.Minus(this.Y), this.X);
                // MyVector2D<T> normalVector2 = new MyVector2D<T>(this.Y, Arithmetics<T>.Minus(this.X));

                return normalVector1;
            }

        } // End Property NormalVector 


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


        public static T Angle_Rad(MyVector2D<T> a, MyVector2D<T> b)
        {
            T axbx = Arithmetics<T>.Multiply(a.X, b.X);
            T ayby = Arithmetics<T>.Multiply(a.Y, b.Y);
            T azbz = Arithmetics<T>.ZERO;

            T sumAB = Arithmetics<T>.Sum(axbx, ayby, azbz);

            T ax2 = Arithmetics<T>.Pow(a.X, 2);
            T ay2 = Arithmetics<T>.Pow(a.Y, 2);
            T az2 = Arithmetics<T>.ZERO;

            T bx2 = Arithmetics<T>.Pow(b.X, 2);
            T by2 = Arithmetics<T>.Pow(b.Y, 2);
            T bz2 = Arithmetics<T>.ZERO;


            T aSquare = Arithmetics<T>.Sum(ax2, ay2, az2);
            T bSquare = Arithmetics<T>.Sum(bx2, by2, bz2);

            T val = Arithmetics<T>.Divide(sumAB,
                            (
                                Arithmetics<T>.Multiply(Arithmetics<T>.Sqrt(aSquare), Arithmetics<T>.Sqrt(bSquare))
                            )
            );

            T nReturnValue = Arithmetics<T>.Acos(val);

            return nReturnValue;
        }  // End function Angle_Rad


        public static T Angle_Degrees(MyVector2D<T> a, MyVector2D<T> b)
        {
            T nReturnValue = Angle_Rad(a, b);

            decimal decReturnType = System.Convert.ToDecimal(nReturnValue);
            decimal quotient = decReturnType * 180.0m / (decimal)System.Math.PI;
            T ret = (T)System.Convert.ChangeType(quotient, typeof(T));

            return ret;
        }  // End function Angle_Degrees


        public MyPoint2D<T> Schnittpunktli(MyPoint2D<T> p1, MyVector2D<T> vec1, MyPoint2D<T> p2, MyVector2D<T> vec2)
        {
            T x1 = Arithmetics<T>.Add(p1.X, vec1.X);
            T y1 = Arithmetics<T>.Add(p1.Y, vec1.Y);

            T x2 = Arithmetics<T>.Add(p2.X, vec2.X);
            T y2 = Arithmetics<T>.Add(p2.Y, vec2.Y);

            return Schnittpunktli(p1, new MyPoint2D<T>(x1, x1), p2, new MyPoint2D<T>(x2, y2));
        } // End Function Schnittpunktli 


        // https://en.wikipedia.org/wiki/Determinant
        // | a  b |
        // | c  d |
        private static T Determinant2d(T a, T b, T c, T d)
        {
            T f1 = Arithmetics<T>.Multiply(a, d);
            T f2 = Arithmetics<T>.Multiply(b, c);

            T result = Arithmetics<T>.Subtract(f1, f2);
            return result;
        } // End Function Determinant2d 


        public MyPoint2D<T> Schnittpunktli(MyPoint2D<T> p1, MyPoint2D<T> p2, MyPoint2D<T> p3, MyPoint2D<T> p4)
        {
            T x1 = p1.X;
            T x2 = p2.X;
            T x3 = p3.X;
            T x4 = p4.X;

            T y1 = p1.Y;
            T y2 = p2.Y;
            T y3 = p3.Y;
            T y4 = p4.Y;

            T topaX = Determinant2d(x1, y1, x2, y2);
            T topbX = Determinant2d(x1, Arithmetics<T>.ONE, x2, Arithmetics<T>.ONE);
            T topcX = Determinant2d(x3, y3, x4, y4);
            T topdX = Determinant2d(x3, Arithmetics<T>.ONE, x4, Arithmetics<T>.ONE);
            T topX = Determinant2d(topaX, topbX, topcX, topdX);

            T bottomaX = Determinant2d(x1, Arithmetics<T>.ONE, x2, Arithmetics<T>.ONE);
            T bottombX = Determinant2d(y1, Arithmetics<T>.ONE, y2, Arithmetics<T>.ONE);
            T bottomcX = Determinant2d(x3, Arithmetics<T>.ONE, x4, Arithmetics<T>.ONE);
            T bottomdX = Determinant2d(y3, Arithmetics<T>.ONE, y4, Arithmetics<T>.ONE);
            T bottomX = Determinant2d(bottomaX, bottombX, bottomcX, bottomdX);

            T x = Arithmetics<T>.Divide(topX, bottomX);

            T topaY = Determinant2d(x1, y1, x2, y2);
            T topbY = Determinant2d(y1, Arithmetics<T>.ONE, y2, Arithmetics<T>.ONE);
            T topcY = Determinant2d(x3, y3, x4, y4);
            T topdY = Determinant2d(x3, Arithmetics<T>.ONE, y4, Arithmetics<T>.ONE);
            T topY = Determinant2d(topaY, topbY, topcY, topdY);

            T bottomaY = Determinant2d(x1, Arithmetics<T>.ONE, x2, Arithmetics<T>.ONE);
            T bottombY = Determinant2d(y1, Arithmetics<T>.ONE, y2, Arithmetics<T>.ONE);
            T bottomcY = Determinant2d(x3, Arithmetics<T>.ONE, x4, Arithmetics<T>.ONE);
            T bottomdY = Determinant2d(y3, Arithmetics<T>.ONE, y4, Arithmetics<T>.ONE);
            T bottomY = Determinant2d(bottomaY, bottombY, bottomcY, bottomdY);

            T y = Arithmetics<T>.Divide(topY, bottomY);

            // m = (y2-y1)/(x2-x1)
            // Case 1: horizontal line: slope = 0           | y=constant, x=variable
            // Case 2: vertical line:   slope = +/-infinity | x=constant, y=variable 
            // Case 3: Parallel => m1 = m2
            // Case 4: orthogonal resp. right-angle => m1 = -1/m2 

            return new MyPoint2D<T>(x, y);
        } // End Function Schnittpunktli 


        public override bool Equals(object obj)
        {
            MyVector2D<T> tof = (MyVector2D<T>)obj;
            return this == tof;
        } // End Function Equals 


        /// <summary>
        /// Returns the hashcode for this instance.
        /// </summary>
        /// <returns>A System.Int32 containing the unique hashcode for this instance.</returns>
        public override int GetHashCode()
        {
            return this.X.GetHashCode() ^ this.Y.GetHashCode();
        } // End Function GetHashCode 


        /// <summary>
        /// Returns a System.String that represents the current Vector3.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Format("({0}, {1})", this.X, this.Y);
        } // End Function ToString 


        /// <summary>
        /// Returns a new Vector that is the linear blend of the 2 given Vectors
        /// </summary>
        /// <param name="a">First input vector</param>
        /// <param name="b">Second input vector</param>
        /// <param name="blend">The blend factor. a when blend=0, b when blend=1.</param>
        /// <returns>a when blend=0, b when blend=1, and a linear combination otherwise</returns>
        public static MyVector2D<T> Lerp(MyVector2D<T> a, MyVector2D<T> b, T blend)
        {
            T bxax = Arithmetics<T>.Subtract(b.X, a.X);
            T byay = Arithmetics<T>.Subtract(b.Y, a.Y);

            T f1 = Arithmetics<T>.Multiply(blend, bxax);
            T f2 = Arithmetics<T>.Multiply(blend, byay);

            T x = Arithmetics<T>.Add(f1, a.X);
            T y = Arithmetics<T>.Add(f2, a.Y);

            return new MyVector2D<T>(x, y);
        } // End Function Lerp 


    } // End Class MyVector2D<T> 


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
        } // End Constructor 


        public MyLine2D(MyPoint2D<T> start, MyVector2D<T> vec)
        {
            this.Start = start;
            this.End = start + vec;
        } // End Constructor 


        public MyLine2D()
        {
            this.Start = new MyPoint2D<T>();
            this.End = new MyPoint2D<T>();
        } // End Constructor 


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

        } // End Property Slope 


        // https://stackoverflow.com/questions/17692922/check-is-a-point-x-y-is-between-two-points-drawn-on-a-straight-line
        public bool IsPointOnLine(MyPoint2D<T> p)
        {
            T norm = this.Vector.MagnitudeSquared;
            MyVector2D<T> vec1 = new MyVector2D<T>(this.m_start, p);
            MyVector2D<T> vec2 = new MyVector2D<T>(this.m_end, p);

            T dist = Arithmetics<T>.Add(vec1.MagnitudeSquared, vec2.MagnitudeSquared);

            if (norm.Equals(dist))
                return true;

            T delta = Arithmetics<T>.Subtract(vec1.MagnitudeSquared, vec2.MagnitudeSquared);

            decimal decDelta = System.Convert.ToDecimal(delta);
            decDelta = System.Math.Abs(decDelta);

            // Greatest possible floating-point difference 
            decimal decFloatEpsilon = System.Convert.ToDecimal(float.Epsilon);

            if (decDelta <= decFloatEpsilon)
                return true;

            return false;
        } // End Function IsPointOnLine 


        public static MyVector2D<T> ToVector(MyPoint2D<T> start, MyPoint2D<T> end)
        {
            T x = Arithmetics<T>.Subtract(end.X, start.X);
            T y = Arithmetics<T>.Subtract(end.Y, start.Y);

            return new MyVector2D<T>(x, y);
        } // End Function ToVector 


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
        } // End Property Start 


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
        } // End Property End 


        public MyVector2D<T> Vector
        {
            get
            {
                return m_cachedVector;
            }
        } // End Property Vector 


        public MyPoint2D<T> MidPoint
        {
            get
            {
                T x = Arithmetics<T>.Add(this.Start.X, this.End.X);
                T y = Arithmetics<T>.Add(this.Start.Y, this.End.Y);

                x = Arithmetics<T>.Half(x);
                y = Arithmetics<T>.Half(y);

                MyPoint2D<T> ret = new MyPoint2D<T>(x, y);
                return ret;
            }
        } // End Property MidPoint 


        public override int GetHashCode()
        {
            return Start.GetHashCode() ^ End.GetHashCode();
        } // End Function GetHashCode 


    } // End Class MyLine2D<T> 


} // End Namespace Vectors 
