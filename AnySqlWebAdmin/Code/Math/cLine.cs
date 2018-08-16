
namespace Vectors
{


    public class MyPoint3d<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {
        public T X;
        public T Y;
        public T Z;
        

        public MyPoint3d(T x, T y, T z)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;
        }


        public MyPoint3d()
            : this(default(T), default(T), default(T)) 
        { }
    }
    
    
    public class MyVector<T> 
        : MyPoint3d<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {

        

        public MyVector(MyPoint3d<T> a, MyPoint3d<T> b)
        {
            this.X = Arithmetics<T>.Subtract(a.X, b.X);
            this.Y = Arithmetics<T>.Subtract(a.Y, b.Y);
            this.Z = Arithmetics<T>.Subtract(a.Z, b.Z);
        }


        public MyVector(T x, T y, T z)
            : base(x, y, z)
        { }

        public MyVector(MyVector<T> vector)
            : base(vector.X, vector.Y, vector.Z)
        { }


        public MyVector()
            :base()
        { }

        public MyVector<T> Clone()
        {
            return new MyVector<T>(this);
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



        public T VectorNormSquared
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
        

        public MyVector<T> UnitVector()
        {
            T len = this.VectorNorm;

            T a = Arithmetics<T>.Divide(this.X, len);
            T b = Arithmetics<T>.Divide(this.Y, len);
            T c = Arithmetics<T>.Divide(this.Z, len);

            MyVector<T> vecReturnValue = new MyVector<T>(a, b, c);
            return vecReturnValue;
        } // End function UnitVector


        public static MyVector<T> CrossP(MyVector<T> a, MyVector<T> b)
        {
            T x1 = Arithmetics<T>.Multiply(a.Y, b.Z);
            T x2 = Arithmetics<T>.Multiply(a.Z, b.Y);


            T y1 = Arithmetics<T>.Multiply(a.Z, b.X);
            T y2 = Arithmetics<T>.Multiply(a.X, b.Z);

            T z1 = Arithmetics<T>.Multiply(a.X, b.Y);
            T z2 = Arithmetics<T>.Multiply(a.Y, b.X);

            //A × B = [(ay*bz-az*by),(az*bx-ax*bz),(ax*by-ay*bx)]
            MyVector<T> vecReturnValue = new MyVector<T>(
                  Arithmetics<T>.Subtract(x1, x2)
                , Arithmetics<T>.Subtract(y1, y2)
                , Arithmetics<T>.Subtract(z1, z2)
            );

            return vecReturnValue;
        } // End function CrossP



        // cVector_3d.DotP(vec1, vec2);
        public static T DotP(MyVector<T> a, MyVector<T> b)
        {
            T s1 = Arithmetics<T>.Multiply(a.X, b.X);
            T s2 = Arithmetics<T>.Multiply(a.Y, b.Y);
            T s3 = Arithmetics<T>.Multiply(a.Z, b.Z);

            //A * B = ax*bx+ay*by+az*bz
            T retValue = Arithmetics<T>.Sum(s1, s2, s3);

            return retValue;
        } // End function DotP

    }


    public class Arithmetics<T> 
        where T:System.IComparable<T>, System.IEquatable<T>
    {

        public static decimal DecimalEpsilon;
        public static decimal DecimalPositiveInfinity;
        public static decimal DecimalNegativeInfinity;


        public delegate T Operation_T(T a, T b);

        public static Operation_T Add;
        public static Operation_T Subtract;
        private static Operation_T MultiplyInternal;
        public static Operation_T Divide;
        public static Operation_T Mod;


        public static T Div(T a, T b)
        {
            T mod = Mod(a, b);
            T noRemainder = Subtract(a, mod);
            return Divide(noRemainder, b);
        }


        private static void Test()
        {
            double d = Vectors.Arithmetics<double>.Div(5.1, 0.25);
            double e = Vectors.Arithmetics<double>.Divide(5.1, 0.25);
            //double f = Vectors.Arithmetics<double>.Mod(5.1, 0.25);
            int f = Vectors.Arithmetics<int>.Mod(8, 3);

            double s = Vectors.Arithmetics<double>.Subtract(5, 3);

            System.Console.WriteLine(d);
            System.Console.WriteLine(e);
            System.Console.WriteLine(f);
            System.Console.WriteLine(s);
        }


        static Arithmetics()
        {
            DecimalEpsilon = new decimal(1, 0, 0, false, 27);
            DecimalPositiveInfinity = 1m / DecimalEpsilon;
            DecimalNegativeInfinity = -1m / DecimalEpsilon;

            System.Linq.Expressions.ParameterExpression paramA =
                    System.Linq.Expressions.Expression.Parameter(typeof(T), "a");
            System.Linq.Expressions.ParameterExpression paramB =
                System.Linq.Expressions.Expression.Parameter(typeof(T), "b");

            // Add the parameters together
            System.Linq.Expressions.BinaryExpression addBody =
                System.Linq.Expressions.Expression.Add(paramA, paramB);

            // a-b 
            System.Linq.Expressions.BinaryExpression subtractBody =
                System.Linq.Expressions.Expression.Subtract(paramA, paramB);

            // a*b
            System.Linq.Expressions.BinaryExpression multiplyBody =
                System.Linq.Expressions.Expression.Multiply(paramA, paramB);

            // a/b
            System.Linq.Expressions.BinaryExpression divideBody =
                System.Linq.Expressions.Expression.Divide(paramA, paramB);

            // a%b
            System.Linq.Expressions.BinaryExpression moduloBody =
                System.Linq.Expressions.Expression.Modulo(paramA, paramB);

            Add = System.Linq.Expressions.Expression.Lambda<Operation_T>(addBody, paramA, paramB).Compile();
            Subtract = System.Linq.Expressions.Expression.Lambda<Operation_T>(subtractBody, paramA, paramB).Compile();
            MultiplyInternal = System.Linq.Expressions.Expression.Lambda<Operation_T>(multiplyBody, paramA, paramB).Compile();
            Divide = System.Linq.Expressions.Expression.Lambda<Operation_T>(divideBody, paramA, paramB).Compile();
            Mod = System.Linq.Expressions.Expression.Lambda<Operation_T>(moduloBody, paramA, paramB).Compile();
        }


        public static int Compare(T a, T b)
        {
            return a.CompareTo(b);
        }


        public static bool Equals(T a, T b)
        {
            return a.Equals(b);
        }


        public static T Sum(System.Collections.Generic.IEnumerable<T> list, out long length)
        {
            T sum = default(T);
            length = 0;

            foreach (T thisValue in list)
            {
                sum = Add(sum, thisValue);
                length++;
            } // Next thisValue 

            return sum;
        }


        public static T Sum(System.Collections.Generic.IEnumerable<T> list)
        {
            long length;
            return Sum(list, out length);
        }


        public static T Sum(params T[] list)
        {
            long length;
            return Sum(list, out length);
        }


        public static T Multiply(params T[] list)
        {
            if (list == null || list.Length < 2)
                throw new System.ArgumentException("list NULL or smallerThan2.");

            T product = list[0];

            for(int i = 1; i < list.Length;++i)
            {
                product = MultiplyInternal(product, list[i]);
            } // Next thisValue 

            return product;
        }
        

        public static decimal Average(System.Collections.Generic.IEnumerable<T> list)
        {
            long length;
            T sum = Sum(list, out length);
            decimal decSum = System.Convert.ToDecimal(sum);
            decimal decLen = System.Convert.ToDecimal(length);

            return decSum / decLen;
        }
        

        public static T Pow(T num, long n)
        {
            if (n < 0)
                throw new System.ArgumentException("Expected n >= 0 | Actual: n < 0 ...");

            T one = (T)System.Convert.ChangeType(1, typeof(T));

            if (n == 0)
                return one;

            T product = one;

            for (long i = 0; i < n; ++i)
            {
                product = Multiply(product, num);
            }

            return product;
        }


        public static decimal GetMedian(params T[] sourceNumbers)
        {
            //Framework 2.0 version of this method. there is an easier way in F4        
            if (sourceNumbers == null || sourceNumbers.Length == 0)
                throw new System.Exception("Median of empty array not defined.");

            if (sourceNumbers.Length == 1)
                return System.Convert.ToDecimal(sourceNumbers[0]);

            //make sure the list is sorted, but use a new array
            T[] sortedPNumbers = (T[])sourceNumbers.Clone();
            System.Array.Sort(sortedPNumbers);

            //get the median
            long size = sortedPNumbers.LongLength;
            long mid = size / 2;
            
            decimal median = (size % 2 != 0) ? 
                System.Convert.ToDecimal(sortedPNumbers[mid]) : 
                (System.Convert.ToDecimal(sortedPNumbers[mid]) + System.Convert.ToDecimal(sortedPNumbers[mid - 1])) / 2.0m;

            return median;
        }

        public static T Max(T a, T b)
        {
            int x = a.CompareTo(b);

            if (x < 0) // Less than zero : a precedes b in the sort order.
                return b;

            // if (x > 0) return a; // Greater than zero: a follows b in the sort order.

            // Zero: a occurs in the same position in the sort order as b.
            return a;
        }


        public static T Min(T a, T b)
        {
            int x = a.CompareTo(b);

            if (x > 0)
                return b; // Greater than zero: a follows b in the sort order.

            // if (x < 0) return a; // Less than zero : a precedes b in the sort order.

            // Zero: a occurs in the same position in the sort order as b.
            return a;
        }


        public T Max(params T[] values)
        {
            if (values == null || values.Length < 1)
            {
                throw new System.ArgumentException("Cannot compute the maximum of 0 values.");
            }

            if (values.Length < 2)
            {
                return values[0];
            }

            T runningMax = values[0];
            for (int i = 1; i < values.Length - 1; i++)
            {
                runningMax = Max(runningMax, values[i]);
            }

            return runningMax;
        }


        public T Min(params T[] values)
        {
            if (values == null || values.Length < 1)
            {
                throw new System.ArgumentException("Cannot compute the minimum of 0 values.");
            }

            if (values.Length < 2)
            {
                return values[0];
            }

            T runningMin = values[0];
            for (int i = 1; i < values.Length - 1; i++)
            {
                runningMin = Min(runningMin, values[i]);
            }

            return runningMin;
        }

    }


    public class MyLine<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {

        protected MyPoint3d<T> m_start;
        protected MyPoint3d<T> m_end;
        protected MyVector<T> m_cachedVector;


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


        public bool IsPointOnLine(MyPoint3d<T> p)
        {
            T norm = this.Vector.VectorNorm;
            MyVector<T> vec1 = new MyVector<T>(this.m_start, p);
            MyVector<T> vec2 = new MyVector<T>(this.m_end, p);

            T dist = Arithmetics<T>.Add(vec1.VectorNorm, vec2.VectorNorm);

            if (norm.Equals(dist))
                return true;

            return false;
        }



        public static MyVector<T> ToVector(MyPoint3d<T> start, MyPoint3d<T> end)
        {
            T x = Arithmetics<T>.Subtract(end.X, start.X);
            T y = Arithmetics<T>.Subtract(end.Y, start.Y);
            T z = Arithmetics<T>.Subtract(end.Z, start.Z);

            return new MyVector<T>(x, y, z);
        }


        public MyPoint3d<T> Start
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


        public MyPoint3d<T> End
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



        public MyVector<T> Vector
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