
namespace SpatialDistance {

    export class Distance {
        private _value: number;
        private _units: DistanceUnit;


        private static FEET_PER_METER = 3.2808399;
        private static FEET_PER_CENTIMETER = 0.032808399;
        private static FEET_PER_STATUTE_MILE = 5280;
        private static FEET_PER_KILOMETER = 3280.8399;
        private static FEET_PER_INCH = 0.0833333333333333;
        private static FEET_PER_NAUTICAL_MILE = 6076.11549;
        private static INCHES_PER_METER = 39.3700787;
        private static INCHES_PER_CENTIMETER = 0.393700787;
        private static INCHES_PER_STATUTE_MILE = 63360;
        private static INCHES_PER_KILOMETER = 39370.0787;
        private static INCHES_PER_FOOT = 12.0;
        private static INCHES_PER_NAUTICAL_MILE = 72913.3858;
        private static STATUTE_MILES_PER_METER = 0.000621371192;
        private static STATUTE_MILES_PER_CENTIMETER = 0.00000621371192;
        private static STATUTE_MILES_PER_KILOMETER = 0.621371192;
        private static STATUTE_MILES_PER_INCH = 0.0000157828283;
        private static STATUTE_MILES_PER_FOOT = 0.000189393939;
        private static STATUTE_MILES_PER_NAUTICAL_MILE = 1.15077945;
        private static NAUTICAL_MILES_PER_METER = 0.000539956803;
        private static NAUTICAL_MILES_PER_CENTIMETER = 0.00000539956803;
        private static NAUTICAL_MILES_PER_KILOMETER = 0.539956803;
        private static NAUTICAL_MILES_PER_INCH = 0.0000137149028;
        private static NAUTICAL_MILES_PER_FOOT = 0.000164578834;
        private static NAUTICAL_MILES_PER_STATUTE_MILE = 0.868976242;
        private static CENTIMETERS_PER_STATUTE_MILE = 160934.4;
        private static CENTIMETERS_PER_KILOMETER = 100000;
        private static CENTIMETERS_PER_FOOT = 30.48;
        private static CENTIMETERS_PER_INCH = 2.54;
        private static CENTIMETERS_PER_METER = 100;
        private static CENTIMETERS_PER_NAUTICAL_MILE = 185200;
        private static METERS_PER_STATUTE_MILE = 1609.344;
        private static METERS_PER_CENTIMETER = 0.01;
        private static METERS_PER_KILOMETER = 1000;
        private static METERS_PER_FOOT = 0.3048;
        private static METERS_PER_INCH = 0.0254;
        private static METERS_PER_NAUTICAL_MILE = 1852;
        private static KILOMETERS_PER_METER = 0.001;
        private static KILOMETERS_PER_CENTIMETER = 0.00001;
        private static KILOMETERS_PER_STATUTE_MILE = 1.609344;
        private static KILOMETERS_PER_FOOT = 0.0003048;
        private static KILOMETERS_PER_INCH = 0.0000254;
        private static KILOMETERS_PER_NAUTICAL_MILE = 1.852;

        public static readonly Empty: Distance = new Distance(0, DistanceUnit.Meters).ToLocalUnitType();


        public get Units(): DistanceUnit {

            return this._units;

        }


        public get Value(): number {

            return this._value;

        }


        public constructor(value: number, units: DistanceUnit) {
            this._value = value;
            this._units = units;
        }

        /// <summary>
        /// Returns whether the value is zero.
        /// </summary>
        public get IsEmpty(): boolean {

            return this._value == 0;

        }


        public ToCentimeters(): Distance {
            switch (this._units) {
                case DistanceUnit.Centimeters:
                    return this;
                case DistanceUnit.Meters:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_METER, DistanceUnit.Centimeters);
                case DistanceUnit.Feet:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_FOOT, DistanceUnit.Centimeters);
                case DistanceUnit.Inches:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_INCH, DistanceUnit.Centimeters);
                case DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_KILOMETER, DistanceUnit.Centimeters);
                case DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_STATUTE_MILE, DistanceUnit.Centimeters);
                case DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_NAUTICAL_MILE, DistanceUnit.Centimeters);
                default:
                    return Distance.Empty;
            }
        }


        /// <summary>
        /// Attempts to adjust the unit type to keep the value above 1 and uses the local region measurement system.
        /// </summary>
        /// <returns>A <strong>Distance</strong> converted to the chosen unit type.</returns>
        /// <remarks>When a distance becomes smaller, it may make more sense to the
        /// user to be expressed in a smaller unit type.  For example, a distance of
        /// 0.001 kilometers might be better expressed as 1 meter.  This method will
        /// determine the smallest metric unit type.</remarks>
        public ToMetricUnitType(): Distance {
            // Yes. Start with the largest possible unit
            let temp: Distance = this.ToKilometers();

            // If the value is less than one, bump down
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToMeters();

            // And so on until we find the right unit
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToCentimeters();

            return temp;
        }


        public ToNauticalMiles(): Distance {
            switch (this._units) {
                case DistanceUnit.Meters:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_METER, DistanceUnit.NauticalMiles);
                case DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_CENTIMETER, DistanceUnit.NauticalMiles);
                case DistanceUnit.Feet:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_FOOT, DistanceUnit.NauticalMiles);
                case DistanceUnit.Inches:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_INCH, DistanceUnit.NauticalMiles);
                case DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_KILOMETER, DistanceUnit.NauticalMiles);
                case DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_STATUTE_MILE, DistanceUnit.NauticalMiles);
                case DistanceUnit.NauticalMiles:
                    return this;
                default:
                    return Distance.Empty;
            }
        }


        public ToStatuteMiles(): Distance {
            switch (this._units) {
                case DistanceUnit.Meters:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_METER, DistanceUnit.StatuteMiles);
                case DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_CENTIMETER, DistanceUnit.StatuteMiles);
                case DistanceUnit.Feet:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_FOOT, DistanceUnit.StatuteMiles);
                case DistanceUnit.Inches:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_INCH, DistanceUnit.StatuteMiles);
                case DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_KILOMETER, DistanceUnit.StatuteMiles);
                case DistanceUnit.StatuteMiles:
                    return this;
                case DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_NAUTICAL_MILE, DistanceUnit.StatuteMiles);
                default:
                    return Distance.Empty;
            }
        }



        public ToFeet(): Distance {
            switch (this._units) {
                case DistanceUnit.Meters:
                    return new Distance(this._value * Distance.FEET_PER_METER, DistanceUnit.Feet);
                case DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.FEET_PER_CENTIMETER, DistanceUnit.Feet);
                case DistanceUnit.Feet:
                    return this;
                case DistanceUnit.Inches:
                    return new Distance(this._value * Distance.FEET_PER_INCH, DistanceUnit.Feet);
                case DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.FEET_PER_KILOMETER, DistanceUnit.Feet);
                case DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.FEET_PER_STATUTE_MILE, DistanceUnit.Feet);
                case DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.FEET_PER_NAUTICAL_MILE, DistanceUnit.Feet);
                default:
                    return Distance.Empty;
            }
        }


        public ToInches(): Distance {
            switch (this._units) {
                case DistanceUnit.Meters:
                    return new Distance(this._value * Distance.INCHES_PER_METER, DistanceUnit.Inches);
                case DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.INCHES_PER_CENTIMETER, DistanceUnit.Inches);
                case DistanceUnit.Feet:
                    return new Distance(this._value * Distance.INCHES_PER_FOOT, DistanceUnit.Inches);
                case DistanceUnit.Inches:
                    return this;
                case DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.INCHES_PER_KILOMETER, DistanceUnit.Inches);
                case DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.INCHES_PER_STATUTE_MILE, DistanceUnit.Inches);
                case DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.INCHES_PER_NAUTICAL_MILE, DistanceUnit.Inches);
                default:
                    return Distance.Empty;
            }
        }


        /// <summary>
        /// Attempts to adjust the unit type to keep the value above 1 and uses the local region measurement system.
        /// </summary>
        /// <returns>A <strong>Distance</strong> converted to the chosen unit type.</returns>
        /// <remarks>When a distance becomes smaller, it may make more sense to the
        /// user to be expressed in a smaller unit type.  For example, a distance of
        /// 0.001 kilometers might be better expressed as 1 meter.  This method will
        /// determine the smallest Imperial unit type.</remarks>
        public ToImperialUnitType(): Distance {
            // Start with the largest possible unit
            let temp: Distance = this.ToStatuteMiles();
            // If the value is less than one, bump down
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToFeet();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToInches();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToCentimeters();
            return temp;
        }

        public ToLocalUnitType(): Distance {
            // Find the largest possible units in the local region's system
            // if (System.Globalization.RegionInfo.CurrentRegion.IsMetric)
            if (true)
                return this.ToMetricUnitType();

            return this.ToImperialUnitType();
        }


        /// <summary>
        /// Froms the meters.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static FromMeters(value: number): Distance {
            return new Distance(value, DistanceUnit.Meters);
        }


        public ToMeters(): Distance {
            switch (this._units) {
                case DistanceUnit.Meters:
                    return this;
                case DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.METERS_PER_CENTIMETER, DistanceUnit.Meters);
                case DistanceUnit.Feet:
                    return new Distance(this._value * Distance.METERS_PER_FOOT, DistanceUnit.Meters);
                case DistanceUnit.Inches:
                    return new Distance(this._value * Distance.METERS_PER_INCH, DistanceUnit.Meters);
                case DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.METERS_PER_KILOMETER, DistanceUnit.Meters);
                case DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.METERS_PER_STATUTE_MILE, DistanceUnit.Meters);
                case DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.METERS_PER_NAUTICAL_MILE, DistanceUnit.Meters);
                default:
                    return Distance.Empty;
            }
        }




        //public ToSpeed(time: System.TimeSpan): Speed
        //{
        //    return new Speed(this.ToMeters().Value / (time.TotalMilliseconds / 1000.0), SpeedUnit.MetersPerSecond).ToLocalUnitType();
        //}







        public ToKilometers(): Distance {
            switch (this._units) {
                case DistanceUnit.Meters:
                    return new Distance(this._value * Distance.KILOMETERS_PER_METER, DistanceUnit.Kilometers);
                case DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.KILOMETERS_PER_CENTIMETER, DistanceUnit.Kilometers);
                case DistanceUnit.Feet:
                    return new Distance(this._value * Distance.KILOMETERS_PER_FOOT, DistanceUnit.Kilometers);
                case DistanceUnit.Inches:
                    return new Distance(this._value * Distance.KILOMETERS_PER_INCH, DistanceUnit.Kilometers);
                case DistanceUnit.Kilometers:
                    return this;
                case DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.KILOMETERS_PER_STATUTE_MILE, DistanceUnit.Kilometers);
                case DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.KILOMETERS_PER_NAUTICAL_MILE, DistanceUnit.Kilometers);
                default:
                    return Distance.Empty;
            }
        }

    }


}
