
// https://github.com/mono/opentk/tree/master/Source/OpenTK/Math
// https://github.com/mono/opentk/blob/master/Source/OpenTK/Math/Vector3.cs
// https://github.com/mono/opentk/blob/master/Source/OpenTK/Math/Quaternion.cs

namespace Vectors
{


    public class MyPoint3D<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {
        public T X;
        public T Y;
        public T Z;
        

        public MyPoint3D(T x, T y, T z)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;
        }


        public MyPoint3D(MyPoint3D<T> point)
        {
            this.X = point.X;
            this.Y = point.Y;
            this.Z = point.Z;
        }


        public MyPoint3D<T> Clone()
        {
            return new MyPoint3D<T>(this);
        }
        
        
        public MyPoint3D()
            : this(default(T), default(T), default(T)) 
        { }


        /// <summary>
        /// Returns the hashcode for this instance.
        /// </summary>
        /// <returns>A System.Int32 containing the unique hashcode for this instance.</returns>
        public override int GetHashCode()
        {
            return this.X.GetHashCode() ^ this.Y.GetHashCode() ^ this.Z.GetHashCode();
        }


        /// <summary>
        /// Returns a System.String that represents the current Vector3.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Format("({0}, {1}, {2})", this.X, this.Y, this.Z);
        }


        /// <summary>
        /// Returns a new Vector that is the linear blend of the 2 given Vectors
        /// </summary>
        /// <param name="a">First input vector</param>
        /// <param name="b">Second input vector</param>
        /// <param name="blend">The blend factor. a when blend=0, b when blend=1.</param>
        /// <returns>a when blend=0, b when blend=1, and a linear combination otherwise</returns>
        public static MyPoint3D<T> Lerp(MyPoint3D<T> a, MyPoint3D<T> b, T blend)
        {
            T bxax = Arithmetics<T>.Subtract(b.X, a.X);
            T byay = Arithmetics<T>.Subtract(b.Y, a.Y);
            T bzaz = Arithmetics<T>.Subtract(b.Z, a.Z);

            T f1 = Arithmetics<T>.Multiply(blend, bxax);
            T f2 = Arithmetics<T>.Multiply(blend, byay);
            T f3 = Arithmetics<T>.Multiply(blend, bzaz);

            T x = Arithmetics<T>.Add(f1, a.X);
            T y = Arithmetics<T>.Add(f2, a.Y);
            T z = Arithmetics<T>.Add(f3, a.Z);

            return new MyPoint3D<T>(x, y, z);
        }


    } // End Class MyPoint3D<T> 


    public class MyVector3D<T> 
        : MyPoint3D<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {


        public MyVector3D(MyPoint3D<T> a, MyPoint3D<T> b)
        {
            this.X = Arithmetics<T>.Subtract(a.X, b.X);
            this.Y = Arithmetics<T>.Subtract(a.Y, b.Y);
            this.Z = Arithmetics<T>.Subtract(a.Z, b.Z);
        }


        public MyVector3D(T x, T y, T z)
            : base(x, y, z)
        { }


        public MyVector3D(MyVector3D<T> vector)
            : base(vector.X, vector.Y, vector.Z)
        { }

        
        public MyVector3D(MyPoint3D<T> point)
            : base(point.X, point.Y, point.Z)
        { }
        
        
        public MyVector3D()
            :base()
        { }


        public new MyVector3D<T> Clone()
        {
            return new MyVector3D<T>(this);
        }
        
        
        // https://math.stackexchange.com/questions/799783/slope-of-a-line-in-3d-coordinate-system
        public decimal Slope2D
        {
            get
            {
                if (!this.Z.Equals(0))
                    throw new System.ArgumentException("Not a 2d line.");

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
        
        
        public static bool operator== (MyVector3D<T> a, MyVector3D<T> b) 
        {
            return a.X.Equals(b.X)
                   && a.Y.Equals(b.Y)
                   && a.Z.Equals(b.Z);
        }
        
        
        public static bool operator!= (MyVector3D<T> a, MyVector3D<T> b) 
        {
            return !a.X.Equals(b.X)
                   || !a.Y.Equals(b.Y)
                   || !a.Z.Equals(b.Z);
        }
        
        
        public static MyVector3D<T> operator+ (MyVector3D<T> a, MyVector3D<T> b) 
        {
            MyVector3D<T> v = a.Clone();
            
            v.X = Arithmetics<T>.Add(v.X, b.X);
            v.Y = Arithmetics<T>.Add(v.Y, b.Y);
            v.Z = Arithmetics<T>.Add(v.Z, b.Z);
            
            return v;
        }
        

        public static MyPoint3D<T> operator+(MyVector3D<T> a, MyPoint3D<T> point)
        {
            MyPoint3D<T> p = point.Clone();
            
            p.X = Arithmetics<T>.Add(p.X, a.X);
            p.Y = Arithmetics<T>.Add(p.Y, a.Y);
            p.Z = Arithmetics<T>.Add(p.Z, a.Z);

            return p;
        }
        
        
        public static MyPoint3D<T> operator+(MyPoint3D<T> point, MyVector3D<T> a)
        {
            MyPoint3D<T> p = point.Clone();
            
            p.X = Arithmetics<T>.Add(p.X, a.X);
            p.Y = Arithmetics<T>.Add(p.Y, a.Y);
            p.Z = Arithmetics<T>.Add(p.Z, a.Z);

            return p;
        }
        
        
        public static MyVector3D<T> operator- (MyVector3D<T> a, MyVector3D<T> b) 
        {
            MyVector3D<T> v = a.Clone();
            
            v.X = Arithmetics<T>.Subtract(v.X, b.X);
            v.Y = Arithmetics<T>.Subtract(v.Y, b.Y);
            v.Z = Arithmetics<T>.Subtract(v.Z, b.Z);
            
            return v;
        }
        
        
        public static MyVector3D<T> operator*(MyVector3D<T> a, MyVector3D<T> b)
        {
            return CrossP(a, b);
        }
        
        
        public static MyVector3D<T> operator* (MyVector3D<T> a, T b) 
        {
            MyVector3D<T> v = a.Clone();
            
            v.X = Arithmetics<T>.Multiply(v.X, b);
            v.Y = Arithmetics<T>.Multiply(v.Y, b);
            v.Z = Arithmetics<T>.Multiply(v.Z, b);
            
            return v;
        }
        

        public T MagnitudeSquared
        {
            get {
                T a = Arithmetics<T>.Multiply(this.X, this.X);
                T b = Arithmetics<T>.Multiply(this.Y, this.Y);
                T c = Arithmetics<T>.Multiply(this.Z, this.Z);

                T nReturnValue = Arithmetics<T>.Sum(a, b, c);
                return nReturnValue;
            }
        }


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
        }


        public MyVector3D<T> Normalized
        {
            get {
                T len = this.Magnitude;

                T a = Arithmetics<T>.Divide(this.X, len);
                T b = Arithmetics<T>.Divide(this.Y, len);
                T c = Arithmetics<T>.Divide(this.Z, len);

                MyVector3D<T> vecReturnValue = new MyVector3D<T>(a, b, c);
                return vecReturnValue;
            }
        }


        // http://mathworld.wolfram.com/NormalVector.html
        public static MyVector3D<T> GetNormalVector(MyVector3D<T> vec)
        {
            MyVector3D<T> normalVector1 = new MyVector3D<T>(Arithmetics<T>.Minus(vec.Y), vec.X, vec.Z);
            // MyVector3D<T> normalVector2 = new MyVector3D<T>(vec.Y, Arithmetics<T>.Minus(vec.X), vec.Z);

            return normalVector1;
        }

        public MyVector3D<T> NormalVector
        {
            get
            {
                MyVector3D<T> normalVector1 = new MyVector3D<T>(Arithmetics<T>.Minus(this.Y), this.X, this.Z);
                // MyVector3D<T> normalVector2 = new MyVector3D<T>(this.Y, Arithmetics<T>.Minus(this.X), this.Z);

                return normalVector1;
            }
        }


        // http://mathworld.wolfram.com/NormalVector.html
        public MyVector3D<T> NormalVectorTo(MyVector3D<T> vec)
        {
            MyVector3D<T> cross = CrossP(this, vec);
            return cross.Normalized;
        }


        // http://mathworld.wolfram.com/NormalVector.html
        public static MyVector3D<T> GetNormalVector(MyVector3D<T> vec1, MyVector3D<T> vec2)
        {
            MyVector3D<T> cross = CrossP(vec1, vec2);
            return cross.Normalized;
        }


        /// <summary>
        /// Returns the CrossProduct.
        /// </summary>
        /// <returns>Vector&lt;T&gt; containing the value of the CrossProduct.</returns>
        public static MyVector3D<T> CrossP(MyVector3D<T> a, MyVector3D<T> b)
        {
            T x1 = Arithmetics<T>.Multiply(a.Y, b.Z);
            T x2 = Arithmetics<T>.Multiply(a.Z, b.Y);
            
            
            T y1 = Arithmetics<T>.Multiply(a.Z, b.X);
            T y2 = Arithmetics<T>.Multiply(a.X, b.Z);
            
            T z1 = Arithmetics<T>.Multiply(a.X, b.Y);
            T z2 = Arithmetics<T>.Multiply(a.Y, b.X);
            
            //A × B = [(ay*bz-az*by),(az*bx-ax*bz),(ax*by-ay*bx)]
            MyVector3D<T> vecReturnValue = new MyVector3D<T>(
                  Arithmetics<T>.Subtract(x1, x2)
                , Arithmetics<T>.Subtract(y1, y2)
                , Arithmetics<T>.Subtract(z1, z2)
            );
            
            return vecReturnValue;
        } // End function CrossP


        /// <summary>
        /// Returns the DotProduct.
        /// </summary>
        /// <returns>T containing the value of the DotProduct.</returns>
        public static T DotP(MyVector3D<T> a, MyVector3D<T> b)
        {
            T s1 = Arithmetics<T>.Multiply(a.X, b.X);
            T s2 = Arithmetics<T>.Multiply(a.Y, b.Y);
            T s3 = Arithmetics<T>.Multiply(a.Z, b.Z);

            //A * B = ax*bx+ay*by+az*bz
            T retValue = Arithmetics<T>.Sum(s1, s2, s3);

            return retValue;
        } // End function DotP


        public static T Angle_Rad(MyVector3D<T> a, MyVector3D<T> b)
        {
            T axbx = Arithmetics<T>.Multiply(a.X, b.X);
            T ayby = Arithmetics<T>.Multiply(a.Y, b.Y);
            T azbz = Arithmetics<T>.Multiply(a.Z, b.Z);

            T sumAB = Arithmetics<T>.Sum(axbx, ayby, azbz);

            T ax2 = Arithmetics<T>.Pow(a.X, 2);
            T ay2 = Arithmetics<T>.Pow(a.Y, 2);
            T az2 = Arithmetics<T>.Pow(a.Z, 2);

            T bx2 = Arithmetics<T>.Pow(b.X, 2);
            T by2 = Arithmetics<T>.Pow(b.Y, 2);
            T bz2 = Arithmetics<T>.Pow(b.Z, 2);


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


        public static T Angle_Degrees(MyVector3D<T> a, MyVector3D<T> b)
        {
            T nReturnValue = Angle_Rad(a, b);

            decimal decReturnType = System.Convert.ToDecimal(nReturnValue);
            decimal quotient = decReturnType * 180.0m / (decimal)System.Math.PI;
            T ret = (T)System.Convert.ChangeType(quotient, typeof(T));

            return ret;
        }  // End function Angle_Degrees


        public override bool Equals(object obj)
        {
            MyVector3D<T> tof = (MyVector3D<T>)obj;
            return this == tof;
        }


        /// <summary>
        /// Returns the hashcode for this instance.
        /// </summary>
        /// <returns>A System.Int32 containing the unique hashcode for this instance.</returns>
        public override int GetHashCode()
        {
            return this.X.GetHashCode() ^ this.Y.GetHashCode() ^ this.Z.GetHashCode();
        }


        /// <summary>
        /// Returns a System.String that represents the current Vector3.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return string.Format("({0}, {1}, {2})", this.X, this.Y, this.Z);
        }


        /// <summary>
        /// Returns a new Vector that is the linear blend of the 2 given Vectors
        /// </summary>
        /// <param name="a">First input vector</param>
        /// <param name="b">Second input vector</param>
        /// <param name="blend">The blend factor. a when blend=0, b when blend=1.</param>
        /// <returns>a when blend=0, b when blend=1, and a linear combination otherwise</returns>
        public static MyVector3D<T> Lerp(MyVector3D<T> a, MyVector3D<T> b, T blend)
        {
            T bxax = Arithmetics<T>.Subtract(b.X, a.X);
            T byay = Arithmetics<T>.Subtract(b.Y, a.Y);
            T bzaz = Arithmetics<T>.Subtract(b.Z, a.Z);

            T f1 = Arithmetics<T>.Multiply(blend, bxax);
            T f2 = Arithmetics<T>.Multiply(blend, byay);
            T f3 = Arithmetics<T>.Multiply(blend, bzaz);

            T x = Arithmetics<T>.Add(f1, a.X);
            T y = Arithmetics<T>.Add(f2, a.Y);
            T z = Arithmetics<T>.Add(f3, a.Z);

            return new MyVector3D<T>(x, y, z);
        }


    } // End Class MyVector3<T> 


    public class MyLine3D<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {

        protected MyPoint3D<T> m_start;
        protected MyPoint3D<T> m_end;
        protected MyVector3D<T> m_cachedVector;
        
        
        public MyLine3D(MyPoint3D<T> start, MyPoint3D<T> end)
        {
            this.Start = start;
            this.End = end;
        }
        
        
        public MyLine3D(MyPoint3D<T> start, MyVector3D<T> vec)
        {
            this.Start = start;
            this.End = start + vec;
        }
        
        
        public MyLine3D()
        {
            this.Start = new MyPoint3D<T>();
            this.End = new MyPoint3D<T>();
        }




        // https://math.stackexchange.com/questions/799783/slope-of-a-line-in-3d-coordinate-system
        public decimal Slope2D
        {
            get
            {
                if (!this.Start.Equals(0) || !this.End.Z.Equals(0))
                    throw new System.ArgumentException("Not a 2d line.");
                
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
        public bool IsPointOnLine(MyPoint3D<T> p)
        {
            T norm = this.Vector.MagnitudeSquared;
            MyVector3D<T> vec1 = new MyVector3D<T>(this.m_start, p);
            MyVector3D<T> vec2 = new MyVector3D<T>(this.m_end, p);
            
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
        }
        
        
        public static MyVector3D<T> ToVector(MyPoint3D<T> start, MyPoint3D<T> end)
        {
            T x = Arithmetics<T>.Subtract(end.X, start.X);
            T y = Arithmetics<T>.Subtract(end.Y, start.Y);
            T z = Arithmetics<T>.Subtract(end.Z, start.Z);

            return new MyVector3D<T>(x, y, z);
        }


        public MyPoint3D<T> Start
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


        public MyPoint3D<T> End
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



        public MyVector3D<T> Vector
        {
            get
            {
                return m_cachedVector;
            }
        }


        public MyPoint3D<T> MidPoint
        {
            get
            {
                T x = Arithmetics<T>.Add(this.Start.X, this.End.X);
                T y = Arithmetics<T>.Add(this.Start.Y, this.End.Y);
                T z = Arithmetics<T>.Add(this.Start.Z, this.End.Z);

                x = Arithmetics<T>.Third(x);
                y = Arithmetics<T>.Third(y);
                z = Arithmetics<T>.Third(z);

                MyPoint3D<T> ret = new MyPoint3D<T>(x, y, z);
                return ret;
            }
        }


        public override int GetHashCode()
        {
            return Start.GetHashCode() ^ End.GetHashCode();
        }


    } // End Class MyLine3D<T> 


} // End Namespace Vectors 
