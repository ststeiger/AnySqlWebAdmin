
namespace Vectors
{


	export class cVector_3d
	{
		public bCurrentlyValid:boolean=true;
		public x:number=0;
		public y:number=0;
		public z:number=0;
		
		
		constructor(nXparam:number=0, nYparam:number=0, nZparam:number=0)
		{
			this.bCurrentlyValid=true;
			this.x=nXparam;
			this.y=nYparam;
			this.z=nZparam;
		} // End Constructor
		
		
		
		// cVector_3d.MakeVector(endx, endy, endz [, startx, starty, starz]);
		public static MakeVector(nX1param:number, nY1param:number, nZ1param:number, nX0param:number=0, nY0param:number=0, nZ0param:number=0):cVector_3d
		{
			let vecReturnValue:cVector_3d= new cVector_3d(nX1param-nY0param, nY1param-nY0param, nZ1param-nZ0param);
			return vecReturnValue;
		} // End function MakeVector
		
		
		// cVector_3d.VectorSubtract(vec2, vec1);
		public static VectorSubtract(b:cVector_3d,a:cVector_3d):cVector_3d
		{
			let vecReturnValue:cVector_3d= new cVector_3d(b.x-a.x, b.y-a.y, b.z-a.z);
			return vecReturnValue;
		} // End function VectorSubtract
		
		
		// cVector_3d.VectorAdd(vec1, vec2);
		public static VectorAdd(a:cVector_3d,b:cVector_3d):cVector_3d
		{
			let vecReturnValue:cVector_3d= new cVector_3d(a.x+b.x, a.y+b.y, a.z+b.z);
			return vecReturnValue;
		} // End function VectorAdd
		
		
		
		// cVector_3d.CrossP(vec1, vec2);
		public static CrossP(a:cVector_3d, b:cVector_3d):cVector_3d
		{
			//A × B = [(ay*bz-az*by),(az*bx-ax*bz),(ax*by-ay*bx)]
			let vecReturnValue:cVector_3d = new cVector_3d(   (a.y*b.z-a.z*b.y),    (a.z*b.x-a.x*b.z),    (a.x*b.y-a.y*b.x)    );
			return vecReturnValue;
		} // End function CrossP
		
		
		
		// cVector_3d.DotP(vec1, vec2);
		public static DotP(a:cVector_3d, b:cVector_3d):number
		{
			//A * B = ax*bx+ay*by+az*bz
			let nReturnValue:number = a.x*b.x+a.y*b.y+a.z*b.z;
			return nReturnValue;
		} // End function DotP
		
		
		
		// cVector_3d.VectorLength(vec);
		public static VectorLength(vec:cVector_3d):number
		{
			let nReturnValue:number= Math.pow(vec.x,2)+Math.pow(vec.y,2)+Math.pow(vec.z, 2);
			nReturnValue=Math.sqrt(nReturnValue);
			return nReturnValue;
		} // End function VectorLength
		
		
		
		// cVector_3d.VectorNorm(vec);
		public static VectorNorm(vec:cVector_3d):number
		{
            return cVector_3d.VectorLength(vec);
		} // End function VectorNorm
		
		
		
		// cVector_3d.CrossP(vec1, vec2);
		public static UnitVector(vec:cVector_3d):cVector_3d
		{
            let len: number =cVector_3d.VectorLength(vec);
			let vecReturnValue:cVector_3d = new cVector_3d(vec.x/len, vec.y/len, vec.z/len);
			return vecReturnValue;
		} // End function UnitVector
		
		
		
		// cVector_3d.Angle_Rad(vec1, vec2);
		public static Angle_Rad(a:cVector_3d,b:cVector_3d):number
		{
			let nReturnValue:number=
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
		
		
		// cVector_3d.Angle_Degrees(vec1, vec2);
		public static Angle_Degrees(a:cVector_3d,b:cVector_3d):number
		{
			let nReturnValue:number=
			Math.acos(
						(
							(a.x*b.x+a.y*b.y+a.z*b.z)/
								(   Math.sqrt(Math.pow(b.x,2) + Math.pow(b.y,2) + Math.pow(b.z,2)   )
								*   Math.sqrt(Math.pow(a.x,2) + Math.pow(a.y,2) + Math.pow(a.z,2)   ) 
							)
						)

					);
			return nReturnValue*180/Math.PI;
		}  // End function Angle_Degrees
        
        
    } // End cPoint 


} // End Package

// http://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
// http://mathworld.wolfram.com/Point-LineDistance2-Dimensional.html

