using Microsoft.AspNetCore.Http.Authentication.Internal;

using System.Linq.Expressions;


namespace Vectors
{

    public class MyPoint<T>
    {
        public T X;
        public T Y;
        public T Z;
        
        public MyPoint(T x, T y, T z)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;
        }

        public MyPoint()
            : this(default(T), default(T), default(T)) 
        { }
    }
    
    
    public class MyVector<T> 
        :MyPoint<T>
    {
        
        public MyVector(T x, T y, T z)
            :base(x,y,z)
        { }
        
        public MyVector()
            :base()
        { }
        
    }
    
    
    public class MyLine<T>
    {

        public MyPoint<T> Start;
        public MyPoint<T> End;
        
        
        public static T Add<T>(T a, T b)
        {
            // Declare the parameters
            var paramA = Expression.Parameter(typeof(T), "a");
            var paramB = Expression.Parameter(typeof(T), "b");

            // Add the parameters together
            BinaryExpression body = Expression.Add(paramA, paramB);
            
            // Expression.Modulo()
            // Expression.Divide()
            // Expression.Subtract()
            
            // Compile it
            System.Func<T, T, T> add = Expression.Lambda<System.Func<T, T, T>>(body, paramA, paramB).Compile();

            // Call it
            return add(a, b);
        }
        
        
        public MyVector<T> ToVector()
        {
            return new MyVector<T>(End.X - Start.X, End.Y - Start.Y, End.Z - Start.Z);
        }


        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}