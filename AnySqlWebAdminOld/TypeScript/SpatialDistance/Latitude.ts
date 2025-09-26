
namespace SpatialDistance {


    export class Latitude {
        private _decimalDegrees: number;

        public get Value(): number
        {
            return this.Normalize()._decimalDegrees;
        }



        constructor(decimalDegrees: number) {
            this._decimalDegrees = decimalDegrees;
        }

        public ToRadians(): Radian {
            return new Radian(this._decimalDegrees * SpatialDistance.Radian.RADIANS_PER_DEGREE);
        }


        /// <summary>
        /// Indicates whether the value has been normalized and is within the
        /// allowed bounds of -90° and 90°.
        /// </summary>
        public get IsNormalized(): boolean {
            return this._decimalDegrees >= -90 && this._decimalDegrees <= 90;
        }



        /// <summary>
        /// Causes the value to be adjusted to between -90 and +90.
        /// </summary>
        /// <returns></returns>
        public Normalize(): Latitude {
            // Is the value not a number, infinity, or already normalized?
            if (!isFinite(this._decimalDegrees)
                || isNaN(this._decimalDegrees)
                || this.IsNormalized)
                return this;

            // Calculate the number of times the degree value winds completely
            // through a hemisphere

            let hemisphereFlips = Math.floor(this._decimalDegrees / 180.0);

            // If the value is in the southern hemisphere, apply another flip
            if (this._decimalDegrees < 0)
                hemisphereFlips++;

            // Calculate the new value
            let newValue = this._decimalDegrees % 180;

            // if the value is > 90, return 180 - X
            if (newValue > 90)
                newValue = 180 - newValue;

            // If the value id < -180, return -180 - X
            else if (newValue < -90.0)
                newValue = -180.0 - newValue;

            // Account for flips around hemispheres by flipping the sign
            if (hemisphereFlips % 2 != 0)
                return new Latitude(-newValue);

            return new Latitude(newValue);
        }

    }


}
