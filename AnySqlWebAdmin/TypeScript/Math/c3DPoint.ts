
namespace Vectors
{	


    export class c3DPoint
        extends Point
	{
		public bCurrentlyValid:Boolean=true;
		public z:Number;


        constructor(nXparam:number = 0, nYparam:number = 0, nZparam:number=0)
        {
            super(nXparam, nYparam);
			this.x=nXparam;
			this.y=nYparam;
			this.z=nZparam;
			this.bCurrentlyValid=true;
		}  // End Constructor
		
		
	} // End cPoint 
	
} // End Package
