
#if false



// http://blog.ivank.net/lightweight-matrix-class-in-c-strassen-algorithm-lu-decomposition.html
// C# of LAPACK, BLAS and EISPACK, respectively:
// http://www.dotnumerics.com/
// https://github.com/davidsiaw/neuron/tree/master/DotNumerics
// https://stackoverflow.com/questions/4159385/dotnumerics-alglib-dnanalytics-math-net-f-for-numerics-mtxvec
// https://www.nuget.org/packages/DotNumerics/
// https://archive.codeplex.com/?p=dnanalytics
// https://rtmath.net/products/finmath/
// https://en.smath.info/forum/yaf_postst1918_DotNumerics-plugin.aspx
namespace Vectors
{

    // Mirror: 
    // https://github.com/fact-project/NAMOD/blob/master/Vector3D.cpp
    public class cVector_2d
    {
        public bool bCurrentlyValid = true;
        public double x = 0;
        public double y = 0;
        public double z = 0; // Yay, for 3D abuse in 2D


        // http://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
        // cVector_2d.DistanceOfPointToLine(vecP, vecA, vecB)
        // x0: the point
        // x1,x2: start and end point of line
        public static double DistanceOfPointToLine(cVector_2d x0, cVector_2d x1, cVector_2d x2)
        {
            // vec2-vec1
            cVector_2d x2minusx1 = VectorSubtract(x2, x1); 
            //trace("x2minusx1: " + x2minusx1.toString());
            cVector_2d x1minusx0 = VectorSubtract(x1, x0); // vec2-vec1
            //trace("x1minusx0: " + x1minusx0.toString());

            // Yay, 2D crossp = determinant = scalar result = saved in z ;-)
            cVector_2d DeltaVector = CrossP(x2minusx1, x1minusx0); 

            //trace("DeltaVector.z: " + DeltaVector.z);

            // Get the scalar value from crossp z, z=sqrt(z^2) ;-)
            double DeltaNorm = VectorNorm(DeltaVector); 
            
            //trace("DeltaNorm: " + DeltaNorm);
            double x2minusx1Norm = VectorNorm(x2minusx1);
            //trace("x2minusx1Norm: " + x2minusx1Norm);
            double nReturnValue = DeltaNorm / x2minusx1Norm;
            return nReturnValue;
        }



        // a*v1 + b+v2 = 0
        // l(v1) *e(v1) + b*v2

        // b = a(x+y+x)/(u+v+w) where u+v+w != 0 

        // https://www.matheplanet.com/default3.html?call=viewtopic.php?topic=11311&ref=https%3A%2F%2Fwww.google.com%2F
        // http://mathworld.wolfram.com/Line-LineIntersection.html
        // https://math.stackexchange.com/questions/2188507/how-do-you-find-the-point-of-intersection-of-2-vectors
        public static cVector_2d Schnittpunkt(cVector_2d p1, cVector_2d vec1, cVector_2d p2, cVector_2d vec2)
        {
            // First write the two equations like this: 
            // L1 = P1 + a V1
            // L2 = P2 + b V2

            // If we assume that the lines intersect, we can look for the point on L1 
            // that satisfies the equation for L2.
            // This gives us this equation to solve.
            // P1 + a V1 = P2 + b V2

            // Now rewrite it like this.
            // a V1 = (P2 - P1) + b V2 

            // Now take the cross product of each side with V2. 
            // This will make the term with 'b' drop out.
            // a(V1 X V2) = (P2 - P1) X V2

            // If the lines intersect at a single point,
            // then the resultant vectors on each side of this equation must be parallel,
            // and the left side must not be the zero vector.
            // We should check to make sure that this is true.
            // Once we have checked this, we can solve for 'a' by taking the
            // magnitude of each side and dividing.

            // If the resultant vectors are parallel, but in opposite directions, 
            // then 'a' is the negative of the ratio of magnitudes.
            // Once we have 'a' we can go back to the equation for L1 to find the intersection point.



            // var p1a = VectorAdd(p1, vec1);
            // var p2a = VectorAdd(p2, vec2);

            // Slope vec1/2
            var m1 = vec1.y / vec1.x; 
            var m2 = vec2.y / vec2.x;


            var v1CrossV2 = Vectors.cVector_2d.CrossP(vec1, vec2);
            var deltaP = Vectors.cVector_2d.VectorSubtract(p2, p1);
            var rightSide = Vectors.cVector_2d.CrossP(deltaP, vec2);

            var a = rightSide.x / v1CrossV2.x; // rightSide.y / v1CrossV2.y;


            // DotP



            // if(m1==m2) System.Console.WriteLine("parallel");

            // if (m1 = -1.0 / m2) System.Console.WriteLine("orthogonal/right-angled");

            // https://stackoverflow.com/questions/2316490/the-algorithm-to-find-the-point-of-intersection-of-two-3d-line-segment
            // http://mathworld.wolfram.com/Line-LineIntersection.html

            cVector_3d dc = cVector_3d.MakeVector(1, 2, 3, 4, 5, 6);
            cVector_3d db = cVector_3d.MakeVector(1, 2, 3, 4, 5, 6);
            cVector_3d da = cVector_3d.MakeVector(1, 2, 3, 4, 5, 6);

            var s = cVector_3d.DotP(cVector_3d.CrossP(dc, db), cVector_3d.CrossP(da, db)) / cVector_3d.VectorNormSquared(cVector_3d.CrossP(da, db));
            var t = cVector_3d.DotP(cVector_3d.CrossP(dc, da), cVector_3d.CrossP(da, db)) / cVector_3d.VectorNormSquared(cVector_3d.CrossP(da, db));


            return null;
        }

        // https://stackoverflow.com/questions/2316490/the-algorithm-to-find-the-point-of-intersection-of-two-3d-line-segment
        // http://mathworld.wolfram.com/Line-LineIntersection.html
        // in 3d; will also work in 2d if z components are 0
        // bool intersection(const Line& a, const Line& b, Coord& ip)
        bool intersection(cVector_2d da, cVector_2d a, cVector_2d db, cVector_2d dc, out cVector_2d ip)
        {
            // Coord da = a.second - a.first;
            // Coord db = b.second - b.first;
            // Coord dc = b.first - a.first;

            if (cVector_2d.DotP(dc, cVector_2d.CrossP(da, db)) != 0.0) // lines are not coplanar
            {
                ip = null;
                return false;
            }

            double s = cVector_2d.DotP(cVector_2d.CrossP(dc, db), cVector_2d.CrossP(da, db)) / cVector_2d.VectorNormSquared(cVector_2d.CrossP(da, db));
            if (s >= 0.0 && s <= 1.0)
            {
                ip = null;
                //ip = a.first + da* MakeVector(s, s, s);
                return true;
            }

            ip = null;
            return false;
        }


        


        /*
        // Point xy = cVector_2d.GetIntersection(vec1, vec2);
        public static Point GetIntersection (cVector_2d v1 , cVector_2d v2)
		{
			// trace( "cVector_2d.GetIntersection" );
			
			double v3bx = v2.x - v1.x;
            double v3by = v2.y - v1.y;
            double perP1 = v3bx*v2.by - v3by*v2.bx;
            double perP2 = v1.bx*v2.by - v1.by*v2.bx;
            double t = perP1/perP2;

            double cx= v1.x + v1.bx*t;
            double cy = v1.y + v1.by*t;
			return new Point( cx , cy );
		}
		*/


    } // End cPoint 

} // End Package

// http://mathworld.wolfram.com/NormalVector.html
// http://www.softsurfer.com/Archive/algorithm_0104/algorithm_0104B.htm
// http://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/curves/normal.html
// http://en.wikibooks.org/wiki/Linear_Algebra/Orthogonal_Projection_Into_a_Line

// http://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
// http://mathworld.wolfram.com/Point-LineDistance2-Dimensional.html

# endif 
