
namespace SpatialDistance {


    export class Longitude
    {
        private  _decimalDegrees:number;


        public get Value(): number {
            return this.Normalize()._decimalDegrees;
        }


        constructor (decimalDegrees:number)
        {
            this._decimalDegrees = decimalDegrees;
        }


        public ToRadians(): Radian {
            return new Radian(this._decimalDegrees * Radian.RADIANS_PER_DEGREE);
        }

        /// <summary>
        /// Indicates whether the value has been normalized and is within the
        /// allowed bounds of -180° and 180°.
        /// </summary>
        public get IsNormalized(): boolean {
            return this._decimalDegrees >= -180 && this._decimalDegrees <= 180;
        }

        /// <summary>
        /// Normalizes this instance.
        /// </summary>
        /// <returns>A <strong>Longitude</strong> containing the normalized value.</returns>
        /// <remarks>This function is used to ensure that an angular measurement is within the
        /// allowed bounds of 0° and 180°. If a value of 360° or 720° is passed, a value of 0°
        /// is returned since traveling around the Earth 360° or 720° brings you to the same
        /// place you started.</remarks>
        public Normalize(): Longitude {
            // Is the value not a number, infinity, or already normalized?
            if (!isFinite(this._decimalDegrees) || isNaN(this._decimalDegrees))
                return this;

            // If we're off the eastern edge (180E) wrap back around from the west
            if (this._decimalDegrees > 180)
                return new Longitude(-180 + (this._decimalDegrees % 180));

            // If we're off the western edge (180W) wrap back around from the east
            return this._decimalDegrees < -180 ? new Longitude(180 + (this._decimalDegrees % 180)) : this;
        }


    }


}
