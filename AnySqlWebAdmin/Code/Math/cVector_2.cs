
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


        //Constructor
        public cVector_2d(double x0 = 0, double y0 = 0, double z0 = 0)
        {
            this.bCurrentlyValid = true;
            this.x = x0;
            this.y = y0;
            this.z = z0;
        } // End Constructor


        public override string ToString()
        {
            string strReturnValue = "[" + this.x + ", " + this.y + "]";
            return strReturnValue;
        }


        // cVector_2d.GetRelativeLength();
        public double GetRelativeLength()
        {
            double nReturnValue = System.Math.Pow(this.x, 2) + System.Math.Pow(this.y, 2);
            return nReturnValue;
        } // End function GetRelativeLength


        // cVector_2d.GetLength();
        public double GetLength()
        {
            double nReturnValue = System.Math.Pow(this.x, 2) + System.Math.Pow(this.y, 2) + System.Math.Pow(this.z, 2);
            nReturnValue = System.Math.Sqrt(nReturnValue);
            return nReturnValue;
        } // End function VectorLength


        // cVector_2d.MakeVector(endx, endy [, startx, starty]);
        public static cVector_2d MakeVector(double x1, double y1, double x0 = 0, double y0 = 0)
        {
            cVector_2d vecReturnValue = new cVector_2d(x1 - x0, y1 - y0);
            return vecReturnValue;
        } // End function MakeVector


        // cVector_2d.cPoint2Vector(cptPoint);
        public static cVector_2d cPoint2Vector(cPoint cptPoint)
        {
            cVector_2d vecReturnValue = new cVector_2d(cptPoint.x, cptPoint.y);
            return vecReturnValue;
        } // End function MakeVector


        // cVector_2d.VectorSubtract(vec2, vec1); // vec2-vec1
        public static cVector_2d VectorSubtract(cVector_2d b, cVector_2d a)
        {
            cVector_2d vecReturnValue = new cVector_2d(b.x - a.x, b.y - a.y);
            return vecReturnValue;
        } // End function VectorSubtract


        // cVector_2d.VectorAdd(vec1, vec2);
        public static cVector_2d VectorAdd(cVector_2d a, cVector_2d b)
        {
            cVector_2d vecReturnValue = new cVector_2d(a.x + b.x, a.y + b.y);
            return vecReturnValue;
        } // End function VectorAdd


        // cVector_2d.CrossP(vec1, vec2); // z= det([vecA,vecB])
        public static cVector_2d CrossP(cVector_2d a, cVector_2d b)
        {
            cVector_2d vecReturnValue = new cVector_2d(0, 0); // Faster than 3d-version
            vecReturnValue.z = a.x * b.y - a.y * b.x; //  Yay, z-Abuse in 2d
            return vecReturnValue;
        } // End function CrossP


        // cVector_2d.DotP(vec1, vec2);
        public static double DotP(cVector_2d a, cVector_2d b)
        {
            //A * B = ax*bx+ay*by+az*bz
            double nReturnValue = a.x * b.x + a.y * b.y + a.z * b.z; // Z is zero in 2D
            return nReturnValue;
        } // End function DotP



        public static double VectorNormSquared(cVector_2d vec)
        {
            return System.Math.Pow(vec.x, 2) + System.Math.Pow(vec.y, 2); 
        }



        // cVector_2d.VectorLength(vec);
        public static double VectorLength(cVector_2d vec)
        {
            double nReturnValue = VectorNormSquared(vec);
            nReturnValue = System.Math.Sqrt(nReturnValue);
            return nReturnValue;
        } // End function VectorLength


        // cVector_2d.VectorNorm(vec);
        public static double VectorNorm(cVector_2d vec)
        {
            return VectorLength(vec);
        } // End function VectorNorm
        

        // cVector_2d.CrossP(vec1, vec2);
        public static cVector_2d UnitVector(cVector_2d vec)
        {
            double len = VectorLength(vec);
            cVector_2d vecReturnValue = new cVector_2d(vec.x / len, vec.y / len);
            return vecReturnValue;
        } // End function UnitVector


        // cVector_2d.Angle_Rad(vec1, vec2);
        public static double Angle_Rad(cVector_2d a, cVector_2d b)
        {
            double nReturnValue =
            System.Math.Acos(
                        (
                            (a.x * b.x + a.y * b.y + a.z * b.z) /
                                (System.Math.Sqrt(System.Math.Pow(b.x, 2) + System.Math.Pow(b.y, 2) + System.Math.Pow(b.z, 2))
                                * System.Math.Sqrt(System.Math.Pow(a.x, 2) + System.Math.Pow(a.y, 2) + System.Math.Pow(a.z, 2))
                            )
                        )

                    );
            return nReturnValue;
        }  // End function Angle_Rad


        // cVector_2d.Angle_Degrees(vec1, vec2);
        public static double Angle_Degrees(cVector_2d a, cVector_2d b)
        {
            double nReturnValue =
            System.Math.Acos(
                        (
                            (a.x * b.x + a.y * b.y + a.z * b.z) /
                                (System.Math.Sqrt(System.Math.Pow(b.x, 2) + System.Math.Pow(b.y, 2) + System.Math.Pow(b.z, 2))
                                * System.Math.Sqrt(System.Math.Pow(a.x, 2) + System.Math.Pow(a.y, 2) + System.Math.Pow(a.z, 2))
                            )
                        )

                    );
            return nReturnValue * 180.0 / System.Math.PI;
        }  // End function Angle_Degrees


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
        

        public Point Schnittpunktli(Point p1, cVector_2d vec1, Point p2, cVector_2d vec2)
        {
            return Schnittpunktli(p1, new Point(p1.x + vec1.x, p1.y + vec1.y), p2, new Point(p2.x + vec2.x, p2.y + vec2.y));
        }


        public Point Schnittpunktli(Point p1, Point p2, Point p3, Point p4)
        {
            double x1 = p1.x;
            double x2 = p2.x;
            double x3 = p3.x;
            double x4 = p4.x;

            double y1 = p1.y;
            double y2 = p2.y;
            double y3 = p3.y;
            double y4 = p4.y;

            double topaX = Determinant2d(x1, y1, x2, y2);
            double topbX = Determinant2d(x1, 1, x2, 1);
            double topcX = Determinant2d(x3, y3, x4, y4);
            double topdX = Determinant2d(x3, 1, x4, 1);
            double topX = Determinant2d(topaX, topbX, topcX, topdX);

            double bottomaX = Determinant2d(x1, 1, x2, 1);
            double bottombX = Determinant2d(y1, 1, y2, 1);
            double bottomcX = Determinant2d(x3, 1, x4, 1);
            double bottomdX = Determinant2d(y3, 1, y4, 1);
            double bottomX = Determinant2d(bottomaX, bottombX, bottomcX, bottomdX);

            double x = topX / bottomX;


            double topaY = Determinant2d(x1, y1, x2, y2);
            double topbY = Determinant2d(y1, 1, y2, 1);
            double topcY = Determinant2d(x3, y3, x4, y4);
            double topdY = Determinant2d(x3, 1, y4, 1);
            double topY = Determinant2d(topaY, topbY, topcY, topdY);

            double bottomaY = Determinant2d(x1, 1, x2, 1);
            double bottombY = Determinant2d(y1, 1, y2, 1);
            double bottomcY = Determinant2d(x3, 1, x4, 1);
            double bottomdY = Determinant2d(y3, 1, y4, 1);
            double bottomY = Determinant2d(bottomaY, bottombY, bottomcY, bottomdY);

            double y = topY / bottomY;

            // m = (y2-y1)/(x2-x1)
            // Case 1: horizontal line: slope = 0           | y=constant, x=variable
            // Case 2: vertical line:   slope = +/-infinity | x=constant, y=variable 
            // Case 3: Parallel => m1 = m2
            // Case 4: orthogonal resp. right-angle => m1 = -1/m2 

            return new Point(x, y);
        }


        // https://en.wikipedia.org/wiki/Determinant
        // | a  b |
        // | c  d |
        public static double Determinant2d(double a, double b, double c, double d)
        {
            return a * d - b * c;
        }

        // | a  b c |
        // | d  e f |
        // | g  h i |
        public static double Determinant3d(double a, double b, double c, double d, double e, double f, double g, double h, double i)
        {
            return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
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


        
        // http://mathworld.wolfram.com/NormalVector.html
        // var vec:cVector_2d=cVector_2d.GetNormalVector(vec2_VecLine);
        public static cVector_2d GetNormalVector(cVector_2d vec)
        {
            cVector_2d vecReturnValue = new cVector_2d(-vec.y, vec.x, 0);
            return vecReturnValue;
        }

        // vec2_LineStart = cVector_2d.MakeVector(aptDefinitionPoints[iLast].x,aptDefinitionPoints[iLast].y);
        // vec2_LineEnd = cVector_2d.MakeVector(aptDefinitionPoints[i].x,aptDefinitionPoints[i].y);
        // vec2_Point = cVector_2d.MakeVector(cptPointToAdd.x,cptPointToAdd.y);
        // nDistance = cVector_2d.DistanceOfPointToLine(vec2_Point, vec2_LineStart, vec2_LineEnd);
        // vec2_VecLine = cVector_2d.VectorSubtract(vec2_LineStart, vec2_LineEnd);
        // cptIntersectionPoint = cVector_2d.GetPointVerticalIntersection(aptDefinitionPoints[i], vec2_VecLine, cptPointToAdd);

        // cVector_2d.GetPointVerticalIntersection(aptDefinitionPoints[i], vec2_VecLine, cptPointToAdd);

        // vecInputLine: vector/line between two polygon points
        // cptPointQ: Origin of vector vecInputLine, one of the two polygon points
        // cpPointP: Click point 
        // Schnittpunkt zwischen Normale zu vecInputLine und cpPointP auf vecInputLine 
        public static cPoint GetPointVerticalIntersection(cPoint cptPointQ, cVector_2d vecInputLine, cPoint cpPointP)
        {
            // Q: Line start/endpoint
            // P + a * vecNormalVector = Intersection = Q + b * vecInputLine
            // a = (-(Px*vy-Py*vx-Qx*vy+Qy*vx))/(nx*vy-ny*vx)
            // b = (-(Px*ny-Py*nx-Qx*ny+Qy*nx))/(nx*vy-ny*vx)

            cVector_2d vecNormalVector = GetNormalVector(vecInputLine);
            double nDenominator = vecNormalVector.x * vecInputLine.y - vecNormalVector.y * vecInputLine.x;


            cPoint cptIntersectionPoint = new cPoint();
            if (nDenominator == 0)
            {
                // no intersection
                cptIntersectionPoint.bHasInterSection = false;
                return cptIntersectionPoint;
            }

            double a = (-(cpPointP.x * vecInputLine.y - cpPointP.y * vecInputLine.x - cptPointQ.x * vecInputLine.y + cptPointQ.y * vecInputLine.x)) / nDenominator;
            double b = (-(cpPointP.x * vecNormalVector.y - cpPointP.y * vecNormalVector.x - cptPointQ.x * vecNormalVector.y + cptPointQ.y * vecNormalVector.x)) / nDenominator;
            cptIntersectionPoint.bHasInterSection = true;
            cptIntersectionPoint.x = cpPointP.x + a * vecNormalVector.x;
            cptIntersectionPoint.y = cpPointP.y + a * vecNormalVector.y;

            return cptIntersectionPoint;
        }


        // cVector_2d.isPointOnLine(cpLinePoint1, cpLinePoint2, cpPointInQuestion);
        // cptLinePoint1 & cptLinePoint2: start and endpoint of a polygon side
        // cptPoint: intersection point on vector of cVector_2d.VectorSubtract(vec2_LineStart (point1), vec2_LineEnd (point2) );
        public static bool isPointOnLine(cPoint cptLinePoint1, cPoint cptLinePoint2, cPoint cptPoint)
        {
            cPoint cptPointA = new cPoint();
            cPoint cptPointB = new cPoint();

            if (cptLinePoint1.x < cptLinePoint2.x)
            {
                cptPointA.x = cptLinePoint1.x;
                cptPointB.x = cptLinePoint2.x;
            }
            else
            {
                cptPointA.x = cptLinePoint2.x;
                cptPointB.x = cptLinePoint1.x;
            }

            if (cptLinePoint1.y < cptLinePoint2.y)
            {
                cptPointA.y = cptLinePoint1.y;
                cptPointB.y = cptLinePoint2.y;
            }
            else
            {
                cptPointA.y = cptLinePoint2.y;
                cptPointB.y = cptLinePoint1.y;
            }


            if (cptPoint.x >= cptPointA.x && cptPoint.y >= cptPointA.y && cptPoint.x <= cptPointB.x && cptPoint.y <= cptPointB.y)
            {
                return true;
            }

            return false;
        } // End function isPointOnLine


        // var xy:Point=cVector_2d.GetPolygonCenter(pt1, pt2,..., ptn);
        public static Point GetPolygonCenter(params cPoint[] args)
        {
            // http://www.flex888.com/574/can-i-have-a-variable-number-of-arguments-in-as3.html
            Point sum = new Point(0, 0);
            for (int i = 0; i < args.Length; i++)
            {
                sum.x += args[i].x;
                sum.y += args[i].y;
            }

            sum.x /= args.Length;
            sum.y /= args.Length;
            return sum;
        } // End function GetPolygonCenter



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
