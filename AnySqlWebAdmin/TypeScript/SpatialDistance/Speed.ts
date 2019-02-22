
namespace SpatialDistance {


    export class Speed {
        private _value: number;
        private _units: SpeedUnit;


        private static STATUTE_MPH_PER_KNOT = 0.8689762;
        private static KPH_PER_KNOT = 0.5399568;
        private static FPS_PER_KNOT = 0.5924838;
        private static MPS_PER_KNOT = 1.943845;
        private static KPS_PER_KNOT = 1943.845;
        private static KNOTS_PER_STATUTE_MPH = 1.150779;
        private static KPH_PER_STATUTE_MPH = 0.6213712;
        private static FPS_PER_STATUTE_MPH = 0.6818182;
        private static MPS_PER_STATUTE_MPH = 2.236936;
        private static KPS_PER_STATUTE_MPH = 2236.936;
        private static KNOTS_PER_KPH = 1.852;
        private static STATUTE_MPH_PER_KPH = 1.609344;
        private static FPS_PER_KPH = 1.09728;
        private static MPS_PER_KPH = 3.6;
        private static KPS_PER_KPH = 3600;
        private static KNOTS_PER_KPS = 0.0005144444;
        private static STATUTE_MPH_PER_KPS = 0.000447;
        private static FPS_PER_KPS = 0.0003048;
        private static MPS_PER_KPS = 0.001;
        private static KPH_PER_KPS = 0.0002777778;
        private static KNOTS_PER_FPS = 1.68781;
        private static STATUTE_MPH_PER_FPS = 1.466667;
        private static KPH_PER_FPS = 0.9113444;
        private static MPS_PER_FPS = 3.28084;
        private static KPS_PER_FPS = 3280.84;
        private static KNOTS_PER_MPS = 0.5144444;
        private static STATUTE_MPH_PER_MPS = 0.447;
        private static FPS_PER_MPS = 0.3048;
        private static KPH_PER_MPS = 0.2777778;
        private static KPS_PER_MPS = 1000;


        public static readonly Empty: Speed = new Speed(0, SpeedUnit.MetersPerSecond);
        public static readonly AtRest: Speed = new Speed(0, SpeedUnit.MetersPerSecond);
        public static readonly SpeedOfLight: Speed = new Speed(299792458, SpeedUnit.MetersPerSecond);
        public static readonly Maximum: Speed = new Speed(Number.MAX_VALUE, SpeedUnit.KilometersPerSecond).ToLocalUnitType();
        public static readonly Minimum: Speed = new Speed(Number.MIN_VALUE, SpeedUnit.KilometersPerSecond).ToLocalUnitType();
        public static readonly SpeedOfSoundAtSeaLevel: Speed = new Speed(340.29, SpeedUnit.MetersPerSecond);
        public static readonly Infinity: Speed = new Speed(Number.POSITIVE_INFINITY, SpeedUnit.MetersPerSecond);
        public static readonly Invalid: Speed = new Speed(Number.NaN, SpeedUnit.KilometersPerSecond);





        public get Value(): number {
            return this._value;
        }

        public get Units(): SpeedUnit {
            return this._units;

        }


        public get IsEmpty(): boolean {

            return this._value == 0;
        }


        public get IsMetric(): boolean {
            return this._units == SpeedUnit.KilometersPerHour
                || this._units == SpeedUnit.KilometersPerSecond
                || this._units == SpeedUnit.MetersPerSecond;

        }

        public get IsInvalid(): boolean {
            return isNaN(this._value);
        }

        public constructor(value: number, units: SpeedUnit) {
            this._value = value;
            this._units = units;
        }


        public ToKilometersPerSecond(): Speed  //'Implements ISpeed.ToKilometersPerSecond
        {
            switch (this.Units) {
                case SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_KPS, SpeedUnit.KilometersPerSecond);
                case SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_KPS, SpeedUnit.KilometersPerSecond);
                case SpeedUnit.KilometersPerSecond:
                    return this;
                case SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_KPS, SpeedUnit.KilometersPerSecond);
                case SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_KPS, SpeedUnit.KilometersPerSecond);
                case SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_KPS, SpeedUnit.KilometersPerSecond);
                default:
                    return Speed.Empty;
            }
        }


        public ToMetersPerSecond(): Speed  //'Implements ISpeed.ToMetersPerSecond
        {
            switch (this.Units) {

                case SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_MPS, SpeedUnit.MetersPerSecond);
                case SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_MPS, SpeedUnit.MetersPerSecond);
                case SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_MPS, SpeedUnit.MetersPerSecond);
                case SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_MPS, SpeedUnit.MetersPerSecond);
                case SpeedUnit.MetersPerSecond:
                    return this;
                case SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_MPS, SpeedUnit.MetersPerSecond);
                default:
                    return Speed.Empty;
            }
        }


        public ToMetricUnitType(): Speed {
            // Start with the largest possible unit
            let temp: Speed = this.ToKilometersPerHour();
            // If the value is less than one, bump down
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToMetersPerSecond();
            // And so on until we find the right unit
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToKilometersPerSecond();
            return temp;
        }

        public ToImperialUnitType(): Speed {
            // Start with the largest possible unit
            let temp: Speed = this.ToStatuteMilesPerHour();
            // If the value is less than one, bump down
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToFeetPerSecond();
            return temp;
        }

        public ToLocalUnitType(): Speed {
            // Find the largest possible units in the local region's system
            // if (System.Globalization.RegionInfo.CurrentRegion.IsMetric)
            if (true)
                return this.ToMetricUnitType();

            return this.ToImperialUnitType();
        }


        public ToUnitType(value: SpeedUnit): Speed {
            switch (value) {
                case SpeedUnit.FeetPerSecond:
                    return this.ToFeetPerSecond();
                case SpeedUnit.KilometersPerHour:
                    return this.ToKilometersPerHour();
                case SpeedUnit.KilometersPerSecond:
                    return this.ToKilometersPerSecond();
                case SpeedUnit.Knots:
                    return this.ToKnots();
                case SpeedUnit.MetersPerSecond:
                    return this.ToMetersPerSecond();
                case SpeedUnit.StatuteMilesPerHour:
                    return this.ToStatuteMilesPerHour();
                default:
                    return Speed.Empty;
            }
        }


        public ToKnots(): Speed //'Implements ISpeed.ToKnots
        {
            switch (this.Units) {
                case SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_KNOT, SpeedUnit.Knots);
                case SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_KNOT, SpeedUnit.Knots);
                case SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_KNOT, SpeedUnit.Knots);
                case SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_KNOT, SpeedUnit.Knots);
                case SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_KNOT, SpeedUnit.Knots);
                case SpeedUnit.Knots:
                    return this;
                default:
                    return Speed.Empty;
            }
        }


        public ToStatuteMilesPerHour(): Speed {
            switch (this.Units) {
                case SpeedUnit.StatuteMilesPerHour:
                    return this;
                case SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_STATUTE_MPH, SpeedUnit.StatuteMilesPerHour);
                case SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_STATUTE_MPH, SpeedUnit.StatuteMilesPerHour);
                case SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_STATUTE_MPH, SpeedUnit.StatuteMilesPerHour);
                case SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_STATUTE_MPH, SpeedUnit.StatuteMilesPerHour);
                case SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_STATUTE_MPH, SpeedUnit.StatuteMilesPerHour);
                default:
                    return Speed.Empty;
            }
        }


        /// <summary>
        /// Returns the current instance converted to feet per second.
        /// </summary>
        /// <returns></returns>
        /// <remarks>The measurement is converted regardless of its current unit type.</remarks>
        public ToFeetPerSecond(): Speed //'Implements ISpeed.ToFeetPerSecond
        {
            switch (this.Units) {
                case SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_FPS, SpeedUnit.FeetPerSecond);
                case SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_FPS, SpeedUnit.FeetPerSecond);
                case SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_FPS, SpeedUnit.FeetPerSecond);
                case SpeedUnit.FeetPerSecond:
                    return this;
                case SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_FPS, SpeedUnit.FeetPerSecond);
                case SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_FPS, SpeedUnit.FeetPerSecond);
                default:
                    return Speed.Empty;
            }
        }

        /// <summary>
        /// Converts the current measurement into kilometers per hour.
        /// </summary>
        /// <returns></returns>
        /// <remarks>The measurement is converted regardless of its current unit type.</remarks>
        public ToKilometersPerHour(): Speed//'Implements ISpeed.ToKilometersPerHour
        {
            switch (this.Units) {
                case SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_KPH, SpeedUnit.KilometersPerHour);
                case SpeedUnit.KilometersPerHour:
                    return this;
                case SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_KPH, SpeedUnit.KilometersPerHour);
                case SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_KPH, SpeedUnit.KilometersPerHour);
                case SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_KPH, SpeedUnit.KilometersPerHour);
                case SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_KPH, SpeedUnit.KilometersPerHour);
                default:
                    return Speed.Empty;
            }
        }

    }


}
