
namespace Vectors
{

    public class cVector_3d
    {
        public bool bCurrentlyValid = true;
        public double x = 0;
        public double y = 0;
        public double z = 0;


        //Constructor
        public cVector_3d(double nXparam = 0, double nYparam = 0, double nZparam = 0)
        {
            this.bCurrentlyValid = true;
            this.x = nXparam;
            this.y = nYparam;
            this.z = nZparam;
        } // End Constructor



        // cVector_3d.MakeVector(endx, endy, endz [, startx, starty, starz]);
        public static cVector_3d MakeVector(double nX1param, double nY1param, double nZ1param, double nX0param = 0, double nY0param = 0, double nZ0param = 0)
        {
            cVector_3d vecReturnValue = new cVector_3d(nX1param - nY0param, nY1param - nY0param, nZ1param - nZ0param);
            return vecReturnValue;
        } // End function MakeVector


        // cVector_3d.VectorSubtract(vec2, vec1);
        public static cVector_3d VectorSubtract(cVector_3d b, cVector_3d a)
        {
            cVector_3d vecReturnValue = new cVector_3d(b.x - a.x, b.y - a.y, b.z - a.z);
            return vecReturnValue;
        } // End function VectorSubtract


        // cVector_3d.VectorAdd(vec1, vec2);
        public static cVector_3d VectorAdd(cVector_3d a, cVector_3d b)
        {
            cVector_3d vecReturnValue = new cVector_3d(a.x + b.x, a.y + b.y, a.z + b.z);
            return vecReturnValue;
        } // End function VectorAdd



        // cVector_3d.CrossP(vec1, vec2);
        public static cVector_3d CrossP(cVector_3d a, cVector_3d b)
        {
            //A × B = [(ay*bz-az*by),(az*bx-ax*bz),(ax*by-ay*bx)]
            cVector_3d vecReturnValue = new cVector_3d((a.y * b.z - a.z * b.y), (a.z * b.x - a.x * b.z), (a.x * b.y - a.y * b.x));
            return vecReturnValue;
        } // End function CrossP



        // cVector_3d.DotP(vec1, vec2);
        public static double DotP(cVector_3d a, cVector_3d b)
        {
            //A * B = ax*bx+ay*by+az*bz
            double nReturnValue = a.x * b.x + a.y * b.y + a.z * b.z;
            return nReturnValue;
        } // End function DotP



        // cVector_3d.VectorLength(vec);
        public static double VectorLength(cVector_3d vec)
        {
            double nReturnValue = System.Math.Pow(vec.x, 2) + System.Math.Pow(vec.y, 2) + System.Math.Pow(vec.z, 2);
            nReturnValue = System.Math.Sqrt(nReturnValue);
            return nReturnValue;
        } // End function VectorLength



        // cVector_3d.VectorNorm(vec);
        public static double VectorNorm(cVector_3d vec)
        {
            return VectorLength(vec);
        } // End function VectorNorm



        // cVector_3d.CrossP(vec1, vec2);
        public static cVector_3d UnitVector(cVector_3d vec)
        {
            double len = VectorLength(vec);
            cVector_3d vecReturnValue = new cVector_3d(vec.x / len, vec.y / len, vec.z / len);
            return vecReturnValue;
        } // End function UnitVector



        // cVector_3d.Angle_Rad(vec1, vec2);
        public static double Angle_Rad(cVector_3d a, cVector_3d b)
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


        // cVector_3d.Angle_Degrees(vec1, vec2);
        public static double Angle_Degrees(cVector_3d a, cVector_3d b)
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
            return nReturnValue * 180 / System.Math.PI;
        }  // End function Angle_Degrees



    } // End cPoint 

} // End Package

// http://mathworld.wolfram.com/Point-LineDistance3-Dimensional.html
// http://mathworld.wolfram.com/Point-LineDistance2-Dimensional.html

