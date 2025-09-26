
namespace Vectors
{


    public class Arithmetics<T>
        where T : System.IComparable<T>, System.IEquatable<T>
    {

        public readonly static decimal DecimalEpsilon;
        public readonly static decimal DecimalPositiveInfinity;
        public readonly static decimal DecimalNegativeInfinity;

        public delegate T Operation_T(T a, T b);

        public static Operation_T Add;
        public static Operation_T Subtract;
        private static Operation_T MultiplyInternal;
        public static Operation_T Divide;
        public static Operation_T Mod;

        public readonly static T MINUS_ONE;
        public readonly static T ZERO;
        public readonly static T ONE;
        public readonly static T TWO;
        public readonly static T THREE;


        public static T Div(T a, T b)
        {
            T mod = Mod(a, b);
            T noRemainder = Subtract(a, mod);
            return Divide(noRemainder, b);
        }


        public static T Minus(T a)
        {
            T result = MultiplyInternal(a, MINUS_ONE);
            return result;
        }


        public static T Half(T a)
        {
            T result = Divide(a, TWO);
            return result;
        }


        public static T Third(T a)
        {
            T result = Divide(a, THREE);
            return result;
        }


        public static T Acos(T a)
        {
            double b = System.Convert.ToDouble(a);
            b = System.Math.Acos(b);
            T c = (T)System.Convert.ChangeType(b, typeof(T));

            return c;
        }
        

        public static T Sqrt(T a)
        {
            double b = System.Convert.ToDouble(a);
            b = System.Math.Sqrt(b);
            T c = (T)System.Convert.ChangeType(b, typeof(T));

            return c;
        }


        // The signum function is the derivative of the absolute value function
        // (up to the indeterminacy at zero): 
        // -1 if x < 0
        // 0 if x == 0
        // 1 if x > 0 
        public static int Sign(T a)
        {
            int comp = a.CompareTo(ZERO);

            if (comp == 0)
                return 0;

            if (comp < 0)
                return -1;

            return 1;
        }


        public static T Abs(T a)
        {
            if (a.CompareTo(ZERO) < 0)
                return MultiplyInternal(a, MINUS_ONE);

            return a;
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
            MINUS_ONE = (T)System.Convert.ChangeType(-1, typeof(T));
            ZERO = (T)System.Convert.ChangeType(0, typeof(T));
            ONE = (T)System.Convert.ChangeType(1, typeof(T));
            TWO = (T)System.Convert.ChangeType(2, typeof(T));
            THREE = (T)System.Convert.ChangeType(3, typeof(T));



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

            for (int i = 1; i < list.Length; ++i)
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
            
            if (n == 0)
                return ONE;
            
            if (n < 0)
                return Pow(Divide(ONE, num), -n);
            
            T product = ONE;
            
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


}
