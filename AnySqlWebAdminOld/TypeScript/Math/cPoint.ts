
namespace Vectors
{


    export class Point
    {

        public x: number;
        public y: number;

        constructor(nXparam: number = 0, nYparam: number = 0)
        { }
    }


	export class cPoint extends Point
	{
        public bCurrentlyValid: boolean=true;
		public bHasInterSection:boolean=false;
		public z:number=0;

		
		constructor(nXparam:number=0, nYparam:number=0, nZparam:number=0)
		{
            super(nXparam, nYparam);
			this.x=nXparam;
			this.y=nYparam;
			this.z=nZparam;
			this.bCurrentlyValid=true;
		}  // End Constructor
		
		
		// instance.ToNormalPoint()
		public ToNormalPoint():Point
		{
			let ptReturnValue:Point = new Point();
			if(this.bCurrentlyValid)
			{
				ptReturnValue.x = this.x;
				ptReturnValue.y = this.y;
				return ptReturnValue;
			}
			
			ptReturnValue = null;
			return ptReturnValue;
		}
		
		
		// instance.tostring();
		public tostring():string
		{
			let strReturnValue:string="(" + this.x + "," + this.y;
			if(this.z!=0)
				strReturnValue+= ", " + this.z + ")";
			else
				strReturnValue+= ")";
			
			if(!this.bCurrentlyValid)
				strReturnValue+=" INVALID";
			
			return strReturnValue;
		}  // End function tostring
		
		
	} // End cPoint 
	
} // End Package
