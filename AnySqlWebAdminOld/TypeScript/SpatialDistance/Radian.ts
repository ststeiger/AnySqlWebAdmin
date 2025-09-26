
namespace SpatialDistance
{


    export class Radian
    {
        public static  RADIANS_PER_DEGREE = Math.PI / 180.0;
        public static  DEGREES_PER_RADIAN = 180.0 / Math.PI;

        private _value: number;

        constructor(value: number) {
            this._value = value;
        }


        public get Value() {
            return this._value;
        }


    }


}
