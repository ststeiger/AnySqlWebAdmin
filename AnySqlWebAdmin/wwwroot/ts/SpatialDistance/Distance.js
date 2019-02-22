var SpatialDistance;
(function (SpatialDistance) {
    var Distance = (function () {
        function Distance(value, units) {
            this._value = value;
            this._units = units;
        }
        Object.defineProperty(Distance.prototype, "Units", {
            get: function () {
                return this._units;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Distance.prototype, "Value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Distance.prototype, "IsEmpty", {
            get: function () {
                return this._value == 0;
            },
            enumerable: true,
            configurable: true
        });
        Distance.prototype.ToCentimeters = function () {
            switch (this._units) {
                case SpatialDistance.DistanceUnit.Centimeters:
                    return this;
                case SpatialDistance.DistanceUnit.Meters:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_METER, SpatialDistance.DistanceUnit.Centimeters);
                case SpatialDistance.DistanceUnit.Feet:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_FOOT, SpatialDistance.DistanceUnit.Centimeters);
                case SpatialDistance.DistanceUnit.Inches:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_INCH, SpatialDistance.DistanceUnit.Centimeters);
                case SpatialDistance.DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_KILOMETER, SpatialDistance.DistanceUnit.Centimeters);
                case SpatialDistance.DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_STATUTE_MILE, SpatialDistance.DistanceUnit.Centimeters);
                case SpatialDistance.DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.CENTIMETERS_PER_NAUTICAL_MILE, SpatialDistance.DistanceUnit.Centimeters);
                default:
                    return Distance.Empty;
            }
        };
        Distance.prototype.ToMetricUnitType = function () {
            var temp = this.ToKilometers();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToMeters();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToCentimeters();
            return temp;
        };
        Distance.prototype.ToNauticalMiles = function () {
            switch (this._units) {
                case SpatialDistance.DistanceUnit.Meters:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_METER, SpatialDistance.DistanceUnit.NauticalMiles);
                case SpatialDistance.DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_CENTIMETER, SpatialDistance.DistanceUnit.NauticalMiles);
                case SpatialDistance.DistanceUnit.Feet:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_FOOT, SpatialDistance.DistanceUnit.NauticalMiles);
                case SpatialDistance.DistanceUnit.Inches:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_INCH, SpatialDistance.DistanceUnit.NauticalMiles);
                case SpatialDistance.DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_KILOMETER, SpatialDistance.DistanceUnit.NauticalMiles);
                case SpatialDistance.DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.NAUTICAL_MILES_PER_STATUTE_MILE, SpatialDistance.DistanceUnit.NauticalMiles);
                case SpatialDistance.DistanceUnit.NauticalMiles:
                    return this;
                default:
                    return Distance.Empty;
            }
        };
        Distance.prototype.ToStatuteMiles = function () {
            switch (this._units) {
                case SpatialDistance.DistanceUnit.Meters:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_METER, SpatialDistance.DistanceUnit.StatuteMiles);
                case SpatialDistance.DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_CENTIMETER, SpatialDistance.DistanceUnit.StatuteMiles);
                case SpatialDistance.DistanceUnit.Feet:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_FOOT, SpatialDistance.DistanceUnit.StatuteMiles);
                case SpatialDistance.DistanceUnit.Inches:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_INCH, SpatialDistance.DistanceUnit.StatuteMiles);
                case SpatialDistance.DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_KILOMETER, SpatialDistance.DistanceUnit.StatuteMiles);
                case SpatialDistance.DistanceUnit.StatuteMiles:
                    return this;
                case SpatialDistance.DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.STATUTE_MILES_PER_NAUTICAL_MILE, SpatialDistance.DistanceUnit.StatuteMiles);
                default:
                    return Distance.Empty;
            }
        };
        Distance.prototype.ToFeet = function () {
            switch (this._units) {
                case SpatialDistance.DistanceUnit.Meters:
                    return new Distance(this._value * Distance.FEET_PER_METER, SpatialDistance.DistanceUnit.Feet);
                case SpatialDistance.DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.FEET_PER_CENTIMETER, SpatialDistance.DistanceUnit.Feet);
                case SpatialDistance.DistanceUnit.Feet:
                    return this;
                case SpatialDistance.DistanceUnit.Inches:
                    return new Distance(this._value * Distance.FEET_PER_INCH, SpatialDistance.DistanceUnit.Feet);
                case SpatialDistance.DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.FEET_PER_KILOMETER, SpatialDistance.DistanceUnit.Feet);
                case SpatialDistance.DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.FEET_PER_STATUTE_MILE, SpatialDistance.DistanceUnit.Feet);
                case SpatialDistance.DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.FEET_PER_NAUTICAL_MILE, SpatialDistance.DistanceUnit.Feet);
                default:
                    return Distance.Empty;
            }
        };
        Distance.prototype.ToInches = function () {
            switch (this._units) {
                case SpatialDistance.DistanceUnit.Meters:
                    return new Distance(this._value * Distance.INCHES_PER_METER, SpatialDistance.DistanceUnit.Inches);
                case SpatialDistance.DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.INCHES_PER_CENTIMETER, SpatialDistance.DistanceUnit.Inches);
                case SpatialDistance.DistanceUnit.Feet:
                    return new Distance(this._value * Distance.INCHES_PER_FOOT, SpatialDistance.DistanceUnit.Inches);
                case SpatialDistance.DistanceUnit.Inches:
                    return this;
                case SpatialDistance.DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.INCHES_PER_KILOMETER, SpatialDistance.DistanceUnit.Inches);
                case SpatialDistance.DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.INCHES_PER_STATUTE_MILE, SpatialDistance.DistanceUnit.Inches);
                case SpatialDistance.DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.INCHES_PER_NAUTICAL_MILE, SpatialDistance.DistanceUnit.Inches);
                default:
                    return Distance.Empty;
            }
        };
        Distance.prototype.ToImperialUnitType = function () {
            var temp = this.ToStatuteMiles();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToFeet();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToInches();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToCentimeters();
            return temp;
        };
        Distance.prototype.ToLocalUnitType = function () {
            if (true)
                return this.ToMetricUnitType();
            return this.ToImperialUnitType();
        };
        Distance.FromMeters = function (value) {
            return new Distance(value, SpatialDistance.DistanceUnit.Meters);
        };
        Distance.prototype.ToMeters = function () {
            switch (this._units) {
                case SpatialDistance.DistanceUnit.Meters:
                    return this;
                case SpatialDistance.DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.METERS_PER_CENTIMETER, SpatialDistance.DistanceUnit.Meters);
                case SpatialDistance.DistanceUnit.Feet:
                    return new Distance(this._value * Distance.METERS_PER_FOOT, SpatialDistance.DistanceUnit.Meters);
                case SpatialDistance.DistanceUnit.Inches:
                    return new Distance(this._value * Distance.METERS_PER_INCH, SpatialDistance.DistanceUnit.Meters);
                case SpatialDistance.DistanceUnit.Kilometers:
                    return new Distance(this._value * Distance.METERS_PER_KILOMETER, SpatialDistance.DistanceUnit.Meters);
                case SpatialDistance.DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.METERS_PER_STATUTE_MILE, SpatialDistance.DistanceUnit.Meters);
                case SpatialDistance.DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.METERS_PER_NAUTICAL_MILE, SpatialDistance.DistanceUnit.Meters);
                default:
                    return Distance.Empty;
            }
        };
        Distance.prototype.ToKilometers = function () {
            switch (this._units) {
                case SpatialDistance.DistanceUnit.Meters:
                    return new Distance(this._value * Distance.KILOMETERS_PER_METER, SpatialDistance.DistanceUnit.Kilometers);
                case SpatialDistance.DistanceUnit.Centimeters:
                    return new Distance(this._value * Distance.KILOMETERS_PER_CENTIMETER, SpatialDistance.DistanceUnit.Kilometers);
                case SpatialDistance.DistanceUnit.Feet:
                    return new Distance(this._value * Distance.KILOMETERS_PER_FOOT, SpatialDistance.DistanceUnit.Kilometers);
                case SpatialDistance.DistanceUnit.Inches:
                    return new Distance(this._value * Distance.KILOMETERS_PER_INCH, SpatialDistance.DistanceUnit.Kilometers);
                case SpatialDistance.DistanceUnit.Kilometers:
                    return this;
                case SpatialDistance.DistanceUnit.StatuteMiles:
                    return new Distance(this._value * Distance.KILOMETERS_PER_STATUTE_MILE, SpatialDistance.DistanceUnit.Kilometers);
                case SpatialDistance.DistanceUnit.NauticalMiles:
                    return new Distance(this._value * Distance.KILOMETERS_PER_NAUTICAL_MILE, SpatialDistance.DistanceUnit.Kilometers);
                default:
                    return Distance.Empty;
            }
        };
        Distance.FEET_PER_METER = 3.2808399;
        Distance.FEET_PER_CENTIMETER = 0.032808399;
        Distance.FEET_PER_STATUTE_MILE = 5280;
        Distance.FEET_PER_KILOMETER = 3280.8399;
        Distance.FEET_PER_INCH = 0.0833333333333333;
        Distance.FEET_PER_NAUTICAL_MILE = 6076.11549;
        Distance.INCHES_PER_METER = 39.3700787;
        Distance.INCHES_PER_CENTIMETER = 0.393700787;
        Distance.INCHES_PER_STATUTE_MILE = 63360;
        Distance.INCHES_PER_KILOMETER = 39370.0787;
        Distance.INCHES_PER_FOOT = 12.0;
        Distance.INCHES_PER_NAUTICAL_MILE = 72913.3858;
        Distance.STATUTE_MILES_PER_METER = 0.000621371192;
        Distance.STATUTE_MILES_PER_CENTIMETER = 0.00000621371192;
        Distance.STATUTE_MILES_PER_KILOMETER = 0.621371192;
        Distance.STATUTE_MILES_PER_INCH = 0.0000157828283;
        Distance.STATUTE_MILES_PER_FOOT = 0.000189393939;
        Distance.STATUTE_MILES_PER_NAUTICAL_MILE = 1.15077945;
        Distance.NAUTICAL_MILES_PER_METER = 0.000539956803;
        Distance.NAUTICAL_MILES_PER_CENTIMETER = 0.00000539956803;
        Distance.NAUTICAL_MILES_PER_KILOMETER = 0.539956803;
        Distance.NAUTICAL_MILES_PER_INCH = 0.0000137149028;
        Distance.NAUTICAL_MILES_PER_FOOT = 0.000164578834;
        Distance.NAUTICAL_MILES_PER_STATUTE_MILE = 0.868976242;
        Distance.CENTIMETERS_PER_STATUTE_MILE = 160934.4;
        Distance.CENTIMETERS_PER_KILOMETER = 100000;
        Distance.CENTIMETERS_PER_FOOT = 30.48;
        Distance.CENTIMETERS_PER_INCH = 2.54;
        Distance.CENTIMETERS_PER_METER = 100;
        Distance.CENTIMETERS_PER_NAUTICAL_MILE = 185200;
        Distance.METERS_PER_STATUTE_MILE = 1609.344;
        Distance.METERS_PER_CENTIMETER = 0.01;
        Distance.METERS_PER_KILOMETER = 1000;
        Distance.METERS_PER_FOOT = 0.3048;
        Distance.METERS_PER_INCH = 0.0254;
        Distance.METERS_PER_NAUTICAL_MILE = 1852;
        Distance.KILOMETERS_PER_METER = 0.001;
        Distance.KILOMETERS_PER_CENTIMETER = 0.00001;
        Distance.KILOMETERS_PER_STATUTE_MILE = 1.609344;
        Distance.KILOMETERS_PER_FOOT = 0.0003048;
        Distance.KILOMETERS_PER_INCH = 0.0000254;
        Distance.KILOMETERS_PER_NAUTICAL_MILE = 1.852;
        Distance.Empty = new Distance(0, SpatialDistance.DistanceUnit.Meters).ToLocalUnitType();
        return Distance;
    }());
    SpatialDistance.Distance = Distance;
})(SpatialDistance || (SpatialDistance = {}));
