
/*
 * This is the implementation for a custom 2D Vector class
 * 
 * @author Stefan Steiger
 * stefan.steiger [at] rsnweb [dot] ch
 */

namespace Vectors
{


	export class cVector_2d
	{
		public bCurrentlyValid:boolean = true;
		public x:number = 0;
		public y:number = 0;
		public z:number = 0; // Yay, for 3D abuse in 2D
		
		
        constructor(x0:number=0, y0:number=0, z0:number=0)
		{
			this.bCurrentlyValid=true;
            this.x = x0;
            this.y = y0;
            this.z = z0;
		} // End Constructor
		
		
		public tostring():string
		{
			let strReturnValue:string = "[" + this.x + ", " + this.y + "]"
			return strReturnValue
		}
		
		
		// cVector_2d.GetRelativeLength();
		public GetRelativeLength():number
		{
			let nReturnValue:number = Math.pow(this.x, 2) + Math.pow(this.y,2);
			return nReturnValue;
		} // End function GetRelativeLength
		
		
		// cVector_2d.GetLength();
		public GetLength():number
		{
			let nReturnValue:number = Math.pow(this.x, 2)+Math.pow(this.y,2)+Math.pow(this.z,2);
			nReturnValue=Math.sqrt(nReturnValue);
			return nReturnValue;
		} // End function VectorLength
		
		
		// cVector_2d.MakeVector(endx, endy [, startx, starty]);
		public static MakeVector(x1:number, y1:number, x0:number=0, y0:number=0):cVector_2d
		{
            let vecReturnValue: cVector_2d = new cVector_2d(x1 - x0, y1 - y0);
			return vecReturnValue;
		} // End function MakeVector
		
		
		// cVector_2d.cPoint2Vector(cptPoint);
		public static cPoint2Vector(cptPoint:cPoint):cVector_2d
		{
			let vecReturnValue:cVector_2d= new cVector_2d(cptPoint.x, cptPoint.y);
			return vecReturnValue;
		} // End function MakeVector
		
		
		// cVector_2d.VectorSubtract(vec2, vec1); // vec2-vec1
		public static VectorSubtract(b:cVector_2d,a:cVector_2d):cVector_2d
		{
			let vecReturnValue:cVector_2d= new cVector_2d(b.x-a.x, b.y-a.y);
			return vecReturnValue;
		} // End function VectorSubtract
		
		
		// cVector_2d.VectorAdd(vec1, vec2);
		public static VectorAdd(a:cVector_2d,b:cVector_2d):cVector_2d
		{
			let vecReturnValue:cVector_2d = new cVector_2d(a.x+b.x, a.y+b.y);
			return vecReturnValue;
		} // End function VectorAdd
		
		
		// cVector_2d.CrossP(vec1, vec2); // z= det([vecA,vecB])
		public static CrossP(a:cVector_2d, b:cVector_2d):cVector_2d
		{
			let vecReturnValue:cVector_2d= new cVector_2d(0, 0); // Faster than 3d-version
			vecReturnValue.z = a.x*b.y-a.y*b.x; //  Yay, z-Abuse in 2d
			return vecReturnValue;
		} // End function CrossP
		
		
		// cVector_2d.DotP(vec1, vec2);
		public static DotP(a:cVector_2d, b:cVector_2d):number
		{
			//A * B = ax*bx+ay*by+az*bz
			let nReturnValue:number = a.x*b.x+a.y*b.y+a.z*b.z; // Z is zero in 2D
			return nReturnValue;
		} // End function DotP
		
		
		// cVector_2d.VectorLength(vec);
		public static VectorLength(vec:cVector_2d):number
		{
			let nReturnValue:number = Math.pow(vec.x, 2) + Math.pow(vec.y,2) + Math.pow(vec.z,2);
			nReturnValue = Math.sqrt(nReturnValue);
			return nReturnValue;
		} // End function VectorLength
		
		
		// cVector_2d.VectorNorm(vec);
		public static VectorNorm(vec:cVector_2d):number
		{
            return cVector_2d.VectorLength(vec);
		} // End function VectorNorm
		
		
		// cVector_2d.CrossP(vec1, vec2);
		public static UnitVector(vec:cVector_2d):cVector_2d
		{
            let len: number =cVector_2d.VectorLength(vec);
			let vecReturnValue:cVector_2d = new cVector_2d(vec.x/len, vec.y/len);
			return vecReturnValue;
		} // End function UnitVector
		
		
		// cVector_2d.Angle_Rad(vec1, vec2);
		public static Angle_Rad(a:cVector_2d,b:cVector_2d):number
		{
			let nReturnValue:number =
			Math.acos(
						(
							(a.x*b.x+a.y*b.y+a.z*b.z)/
								(   Math.sqrt(Math.pow(b.x,2) + Math.pow(b.y,2) + Math.pow(b.z,2)   )
								*   Math.sqrt(Math.pow(a.x,2) + Math.pow(a.y,2) + Math.pow(a.z,2)   ) 
							)
						)
						
					);
			return nReturnValue;
		}  // End function Angle_Rad
		
		
		// cVector_2d.Angle_Degrees(vec1, vec2);
		public static Angle_Degrees(a:cVector_2d,b:cVector_2d):number
		{
			let nReturnValue:number =
			Math.acos(
						(
							(a.x*b.x+a.y*b.y+a.z*b.z)/
								(   Math.sqrt(Math.pow(b.x,2) + Math.pow(b.y,2) + Math.pow(b.z,2)   )
								*   Math.sqrt(Math.pow(a.x,2) + Math.pow(a.y,2) + Math.pow(a.z,2)   ) 
							)
						)
						
					);
			return nReturnValue*180.0/Math.PI;
		}  // End function Angle_Degrees
		
		
		// http://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
		// cVector_2d.DistanceOfPointToLine(vecP, vecA, vecB)
		public static DistanceOfPointToLine(x0:cVector_2d,x1:cVector_2d, x2:cVector_2d):number
		{
            let x2minusx1: cVector_2d = cVector_2d.VectorSubtract(x2, x1); // vec2-vec1
			//trace("x2minusx1: " + x2minusx1.tostring());
            let x1minusx0: cVector_2d = cVector_2d.VectorSubtract(x1, x0); // vec2-vec1
			//trace("x1minusx0: " + x1minusx0.tostring());
            let DeltaVector: cVector_2d = cVector_2d.CrossP(x2minusx1,x1minusx0); // Yay, 2D crossp = determinant = scalar result = saved in z ;-)
			//trace("DeltaVector.z: " + DeltaVector.z);
			
            let DeltaNorm: number = cVector_2d.VectorNorm(DeltaVector); // Get the scalar value from crossp z, z=sqrt(z^2) ;-)
			//trace("DeltaNorm: " + DeltaNorm);
            let x2minusx1Norm: number = cVector_2d.VectorNorm(x2minusx1);
			//trace("x2minusx1Norm: " + x2minusx1Norm);
			let nReturnValue:number = DeltaNorm/x2minusx1Norm;
			return nReturnValue;
		}


        public static schnittpunktlii(p1: Point, vec1: cVector_2d, p2: Point, vec2: cVector_2d): Point 
        {
            return cVector_2d.schnittpunktli(p1, new Point(p1.x + vec1.x, p1.y + vec1.y), p2, new Point(p2.x + vec2.x, p2.y + vec2.y));
        }

        public static schnittpunktli(p1: Point, p2: Point, p3: Point, p4: Point): Point
        {
            let x1 = p1.x;
            let x2 = p2.x;
            let x3 = p3.x;
            let x4 = p4.x;

            let y1 = p1.y;
            let y2 = p2.y;
            let y3 = p3.y;
            let y4 = p4.y;

            let topaX = cVector_2d.Determinant2d(x1, y1, x2, y2);
            let topbX = cVector_2d.Determinant2d(x1, 1, x2, 1);
            let topcX = cVector_2d.Determinant2d(x3, y3, x4, y4);
            let topdX = cVector_2d.Determinant2d(x3, 1, x4, 1);
            let topX = cVector_2d.Determinant2d(topaX, topbX, topcX, topdX);

            let bottomaX = cVector_2d.Determinant2d(x1, 1, x2, 1);
            let bottombX = cVector_2d.Determinant2d(y1, 1, y2, 1);
            let bottomcX = cVector_2d.Determinant2d(x3, 1, x4, 1);
            let bottomdX = cVector_2d.Determinant2d(y3, 1, y4, 1);
            let bottomX = cVector_2d.Determinant2d(bottomaX, bottombX, bottomcX, bottomdX);

            let x = topX / bottomX;


            let topaY = cVector_2d.Determinant2d(x1, y1, x2, y2);
            let topbY = cVector_2d.Determinant2d(y1, 1, y2, 1);
            let topcY = cVector_2d.Determinant2d(x3, y3, x4, y4);
            let topdY = cVector_2d.Determinant2d(x3, 1, y4, 1);
            let topY = cVector_2d.Determinant2d(topaY, topbY, topcY, topdY);

            let bottomaY = cVector_2d.Determinant2d(x1, 1, x2, 1);
            let bottombY = cVector_2d.Determinant2d(y1, 1, y2, 1);
            let bottomcY = cVector_2d.Determinant2d(x3, 1, x4, 1);
            let bottomdY = cVector_2d.Determinant2d(y3, 1, y4, 1);
            let bottomY = cVector_2d.Determinant2d(bottomaY, bottombY, bottomcY, bottomdY);

            let y = topY / bottomY;

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
        public static Determinant2d(a: number, b: number, c: number, d: number):number
        {
            return a * d - b * c;
        }

        // | a  b c |
        // | d  e f |
        // | g  h i |
        public static Determinant3d(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number
        {
            return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
        }

		
		// let vec:cVector_2d=cVector_2d.GetNormalVector(vec2_VecLine);
		public static GetNormalVector(vec:cVector_2d):cVector_2d
		{
			let vecReturnValue:cVector_2d= new cVector_2d(-vec.y, vec.x, 0);
			return vecReturnValue;
		}
		
		
		// cVector_2d.GetPointVerticalIntersection(aptDefinitionPoints[i], vec2_VecLine, cptPointToAdd);
		public static GetPointVerticalIntersection(cptPointQ:cPoint, vecInputLine:cVector_2d, cpPointP:cPoint):cPoint
		{
			// Q: Line start/endpoint
			// P + a * vecNormalVector = Intersection = Q + b * vecInputLine
			// a = (-(Px*vy-Py*vx-Qx*vy+Qy*vx))/(nx*vy-ny*vx)
			// b = (-(Px*ny-Py*nx-Qx*ny+Qy*nx))/(nx*vy-ny*vx)
			
			let vecNormalVector:cVector_2d= cVector_2d.GetNormalVector(vecInputLine);
			let nDenominator:number = vecNormalVector.x * vecInputLine.y-vecNormalVector.y * vecInputLine.x;
			
			
			let cptIntersectionPoint:cPoint = new cPoint();
			if(nDenominator == 0) 
			{
				// no intersection
				cptIntersectionPoint.bHasInterSection = false;
				return cptIntersectionPoint;
			}
			
			let a:number = (-(cpPointP.x*vecInputLine.y-cpPointP.y*vecInputLine.x-cptPointQ.x*vecInputLine.y+cptPointQ.y*vecInputLine.x))/nDenominator ;
			let b:number = (-(cpPointP.x*vecNormalVector.y-cpPointP.y*vecNormalVector.x-cptPointQ.x*vecNormalVector.y+cptPointQ.y*vecNormalVector.x))/nDenominator;
			cptIntersectionPoint.bHasInterSection=true;
			cptIntersectionPoint.x = cpPointP.x + a * vecNormalVector.x
			cptIntersectionPoint.y = cpPointP.y + a * vecNormalVector.y
			
			return cptIntersectionPoint;
		}
		
		
		// cVector_2d.isPointOnLine(cpLinePoint1, cpLinePoint2, cpPointInQuestion);
		public static isPointOnLine(cptLinePoint1:cPoint, cptLinePoint2:cPoint, cptPoint:cPoint):Boolean
		{
			let cptPointA:cPoint = new cPoint();
			let cptPointB:cPoint = new cPoint();
			
			if(cptLinePoint1.x < cptLinePoint2.x)
			{
				cptPointA.x=cptLinePoint1.x;
				cptPointB.x=cptLinePoint2.x;
			}
			else
			{
				cptPointA.x=cptLinePoint2.x;
				cptPointB.x=cptLinePoint1.x;
			}
			
			if(cptLinePoint1.y < cptLinePoint2.y)
			{
				cptPointA.y=cptLinePoint1.y;
				cptPointB.y=cptLinePoint2.y;
			}
			else
			{
				cptPointA.y=cptLinePoint2.y;
				cptPointB.y=cptLinePoint1.y;
			}
			
			
			if( cptPoint.x >= cptPointA.x && cptPoint.y >= cptPointA.y && cptPoint.x <= cptPointB.x && cptPoint.y <= cptPointB.y)
			{
				return true;
			}
			
			return false;
		} // End function isPointOnLine
		
		
		// let xy:Point=cVector_2d.GetPolygonCenter(pt1, pt2,..., ptn);
        public static GetPolygonCenter(...args: Point[]):Point
		{
			// http://www.flex888.com/574/can-i-have-a-variable-number-of-arguments-in-as3.html
			let sum:Point = new Point(0, 0);
			for(let i:number = 0; i < args.length;i++)
			{
				sum.x += args[i].x;
				sum.y += args[i].y;
			}
			
			sum.x/=args.length;
			sum.y/=args.length;
			return sum;
		} // End function GetPolygonCenter
		
		
		
		/*
		// let xy:Point=cVector_2d.GetIntersection(vec1, vec2);
		public static GetIntersection ( v1:cVector_2d , v2:cVector_2d ):Point
		{
			// trace( "cVector_2d.GetIntersection" );
			
			let v3bx:number = v2.x - v1.x;
			let v3by:number = v2.y - v1.y;
			let perP1:number = v3bx*v2.by - v3by*v2.bx;
			let perP2:number = v1.bx*v2.by - v1.by*v2.bx;
			let t:number = perP1/perP2;
			
			let cx:number = v1.x + v1.bx*t;
			let cy:number = v1.y + v1.by*t;
			return new Point( cx , cy );
		}
		*/
		
		
	} // End cPoint 
	
} // End Package

// http://mathworld.wolfram.com/NormalVector.html
// http://www.softsurfer.com/Archive/algorithm_0104/algorithm_0104B.htm
// http://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/curves/normal.html
// http://en.wikibooks.org/wiki/Linear_Algebra/Orthogonal_Projection_Into_a_Line
