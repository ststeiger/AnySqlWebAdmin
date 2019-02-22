var SpatialDistance;
(function (SpatialDistance) {
    var Radian = (function () {
        function Radian(value) {
            this._value = value;
        }
        Object.defineProperty(Radian.prototype, "Value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Radian.RADIANS_PER_DEGREE = Math.PI / 180.0;
        Radian.DEGREES_PER_RADIAN = 180.0 / Math.PI;
        return Radian;
    }());
    SpatialDistance.Radian = Radian;
})(SpatialDistance || (SpatialDistance = {}));
var SpatialDistance;
(function (SpatialDistance) {
    var Latitude = (function () {
        function Latitude(decimalDegrees) {
            this._decimalDegrees = decimalDegrees;
        }
        Object.defineProperty(Latitude.prototype, "Value", {
            get: function () {
                return this.Normalize()._decimalDegrees;
            },
            enumerable: true,
            configurable: true
        });
        Latitude.prototype.ToRadians = function () {
            return new SpatialDistance.Radian(this._decimalDegrees * SpatialDistance.Radian.RADIANS_PER_DEGREE);
        };
        Object.defineProperty(Latitude.prototype, "IsNormalized", {
            get: function () {
                return this._decimalDegrees >= -90 && this._decimalDegrees <= 90;
            },
            enumerable: true,
            configurable: true
        });
        Latitude.prototype.Normalize = function () {
            if (!isFinite(this._decimalDegrees)
                || isNaN(this._decimalDegrees)
                || this.IsNormalized)
                return this;
            var hemisphereFlips = Math.floor(this._decimalDegrees / 180.0);
            if (this._decimalDegrees < 0)
                hemisphereFlips++;
            var newValue = this._decimalDegrees % 180;
            if (newValue > 90)
                newValue = 180 - newValue;
            else if (newValue < -90.0)
                newValue = -180.0 - newValue;
            if (hemisphereFlips % 2 != 0)
                return new Latitude(-newValue);
            return new Latitude(newValue);
        };
        return Latitude;
    }());
    SpatialDistance.Latitude = Latitude;
})(SpatialDistance || (SpatialDistance = {}));
var SpatialDistance;
(function (SpatialDistance) {
    var Longitude = (function () {
        function Longitude(decimalDegrees) {
            this._decimalDegrees = decimalDegrees;
        }
        Object.defineProperty(Longitude.prototype, "Value", {
            get: function () {
                return this.Normalize()._decimalDegrees;
            },
            enumerable: true,
            configurable: true
        });
        Longitude.prototype.ToRadians = function () {
            return new SpatialDistance.Radian(this._decimalDegrees * SpatialDistance.Radian.RADIANS_PER_DEGREE);
        };
        Object.defineProperty(Longitude.prototype, "IsNormalized", {
            get: function () {
                return this._decimalDegrees >= -180 && this._decimalDegrees <= 180;
            },
            enumerable: true,
            configurable: true
        });
        Longitude.prototype.Normalize = function () {
            if (!isFinite(this._decimalDegrees) || isNaN(this._decimalDegrees))
                return this;
            if (this._decimalDegrees > 180)
                return new Longitude(-180 + (this._decimalDegrees % 180));
            return this._decimalDegrees < -180 ? new Longitude(180 + (this._decimalDegrees % 180)) : this;
        };
        return Longitude;
    }());
    SpatialDistance.Longitude = Longitude;
})(SpatialDistance || (SpatialDistance = {}));
var SpatialDistance;
(function (SpatialDistance) {
    var SpeedUnit;
    (function (SpeedUnit) {
        SpeedUnit[SpeedUnit["Knots"] = 0] = "Knots";
        SpeedUnit[SpeedUnit["StatuteMilesPerHour"] = 1] = "StatuteMilesPerHour";
        SpeedUnit[SpeedUnit["KilometersPerHour"] = 2] = "KilometersPerHour";
        SpeedUnit[SpeedUnit["KilometersPerSecond"] = 3] = "KilometersPerSecond";
        SpeedUnit[SpeedUnit["FeetPerSecond"] = 4] = "FeetPerSecond";
        SpeedUnit[SpeedUnit["MetersPerSecond"] = 5] = "MetersPerSecond";
    })(SpeedUnit = SpatialDistance.SpeedUnit || (SpatialDistance.SpeedUnit = {}));
})(SpatialDistance || (SpatialDistance = {}));
var SpatialDistance;
(function (SpatialDistance) {
    var Speed = (function () {
        function Speed(value, units) {
            this._value = value;
            this._units = units;
        }
        Object.defineProperty(Speed.prototype, "Value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Speed.prototype, "Units", {
            get: function () {
                return this._units;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Speed.prototype, "IsEmpty", {
            get: function () {
                return this._value == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Speed.prototype, "IsMetric", {
            get: function () {
                return this._units == SpatialDistance.SpeedUnit.KilometersPerHour
                    || this._units == SpatialDistance.SpeedUnit.KilometersPerSecond
                    || this._units == SpatialDistance.SpeedUnit.MetersPerSecond;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Speed.prototype, "IsInvalid", {
            get: function () {
                return isNaN(this._value);
            },
            enumerable: true,
            configurable: true
        });
        Speed.prototype.ToKilometersPerSecond = function () {
            switch (this.Units) {
                case SpatialDistance.SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_KPS, SpatialDistance.SpeedUnit.KilometersPerSecond);
                case SpatialDistance.SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_KPS, SpatialDistance.SpeedUnit.KilometersPerSecond);
                case SpatialDistance.SpeedUnit.KilometersPerSecond:
                    return this;
                case SpatialDistance.SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_KPS, SpatialDistance.SpeedUnit.KilometersPerSecond);
                case SpatialDistance.SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_KPS, SpatialDistance.SpeedUnit.KilometersPerSecond);
                case SpatialDistance.SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_KPS, SpatialDistance.SpeedUnit.KilometersPerSecond);
                default:
                    return Speed.Empty;
            }
        };
        Speed.prototype.ToMetersPerSecond = function () {
            switch (this.Units) {
                case SpatialDistance.SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_MPS, SpatialDistance.SpeedUnit.MetersPerSecond);
                case SpatialDistance.SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_MPS, SpatialDistance.SpeedUnit.MetersPerSecond);
                case SpatialDistance.SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_MPS, SpatialDistance.SpeedUnit.MetersPerSecond);
                case SpatialDistance.SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_MPS, SpatialDistance.SpeedUnit.MetersPerSecond);
                case SpatialDistance.SpeedUnit.MetersPerSecond:
                    return this;
                case SpatialDistance.SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_MPS, SpatialDistance.SpeedUnit.MetersPerSecond);
                default:
                    return Speed.Empty;
            }
        };
        Speed.prototype.ToMetricUnitType = function () {
            var temp = this.ToKilometersPerHour();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToMetersPerSecond();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToKilometersPerSecond();
            return temp;
        };
        Speed.prototype.ToImperialUnitType = function () {
            var temp = this.ToStatuteMilesPerHour();
            if (Math.abs(temp.Value) < 1.0)
                temp = temp.ToFeetPerSecond();
            return temp;
        };
        Speed.prototype.ToLocalUnitType = function () {
            if (true)
                return this.ToMetricUnitType();
            return this.ToImperialUnitType();
        };
        Speed.prototype.ToUnitType = function (value) {
            switch (value) {
                case SpatialDistance.SpeedUnit.FeetPerSecond:
                    return this.ToFeetPerSecond();
                case SpatialDistance.SpeedUnit.KilometersPerHour:
                    return this.ToKilometersPerHour();
                case SpatialDistance.SpeedUnit.KilometersPerSecond:
                    return this.ToKilometersPerSecond();
                case SpatialDistance.SpeedUnit.Knots:
                    return this.ToKnots();
                case SpatialDistance.SpeedUnit.MetersPerSecond:
                    return this.ToMetersPerSecond();
                case SpatialDistance.SpeedUnit.StatuteMilesPerHour:
                    return this.ToStatuteMilesPerHour();
                default:
                    return Speed.Empty;
            }
        };
        Speed.prototype.ToKnots = function () {
            switch (this.Units) {
                case SpatialDistance.SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_KNOT, SpatialDistance.SpeedUnit.Knots);
                case SpatialDistance.SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_KNOT, SpatialDistance.SpeedUnit.Knots);
                case SpatialDistance.SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_KNOT, SpatialDistance.SpeedUnit.Knots);
                case SpatialDistance.SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_KNOT, SpatialDistance.SpeedUnit.Knots);
                case SpatialDistance.SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_KNOT, SpatialDistance.SpeedUnit.Knots);
                case SpatialDistance.SpeedUnit.Knots:
                    return this;
                default:
                    return Speed.Empty;
            }
        };
        Speed.prototype.ToStatuteMilesPerHour = function () {
            switch (this.Units) {
                case SpatialDistance.SpeedUnit.StatuteMilesPerHour:
                    return this;
                case SpatialDistance.SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_STATUTE_MPH, SpatialDistance.SpeedUnit.StatuteMilesPerHour);
                case SpatialDistance.SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_STATUTE_MPH, SpatialDistance.SpeedUnit.StatuteMilesPerHour);
                case SpatialDistance.SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_STATUTE_MPH, SpatialDistance.SpeedUnit.StatuteMilesPerHour);
                case SpatialDistance.SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_STATUTE_MPH, SpatialDistance.SpeedUnit.StatuteMilesPerHour);
                case SpatialDistance.SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_STATUTE_MPH, SpatialDistance.SpeedUnit.StatuteMilesPerHour);
                default:
                    return Speed.Empty;
            }
        };
        Speed.prototype.ToFeetPerSecond = function () {
            switch (this.Units) {
                case SpatialDistance.SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_FPS, SpatialDistance.SpeedUnit.FeetPerSecond);
                case SpatialDistance.SpeedUnit.KilometersPerHour:
                    return new Speed(this.Value * Speed.KPH_PER_FPS, SpatialDistance.SpeedUnit.FeetPerSecond);
                case SpatialDistance.SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_FPS, SpatialDistance.SpeedUnit.FeetPerSecond);
                case SpatialDistance.SpeedUnit.FeetPerSecond:
                    return this;
                case SpatialDistance.SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_FPS, SpatialDistance.SpeedUnit.FeetPerSecond);
                case SpatialDistance.SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_FPS, SpatialDistance.SpeedUnit.FeetPerSecond);
                default:
                    return Speed.Empty;
            }
        };
        Speed.prototype.ToKilometersPerHour = function () {
            switch (this.Units) {
                case SpatialDistance.SpeedUnit.StatuteMilesPerHour:
                    return new Speed(this.Value * Speed.STATUTE_MPH_PER_KPH, SpatialDistance.SpeedUnit.KilometersPerHour);
                case SpatialDistance.SpeedUnit.KilometersPerHour:
                    return this;
                case SpatialDistance.SpeedUnit.FeetPerSecond:
                    return new Speed(this.Value * Speed.FPS_PER_KPH, SpatialDistance.SpeedUnit.KilometersPerHour);
                case SpatialDistance.SpeedUnit.MetersPerSecond:
                    return new Speed(this.Value * Speed.MPS_PER_KPH, SpatialDistance.SpeedUnit.KilometersPerHour);
                case SpatialDistance.SpeedUnit.Knots:
                    return new Speed(this.Value * Speed.KNOTS_PER_KPH, SpatialDistance.SpeedUnit.KilometersPerHour);
                case SpatialDistance.SpeedUnit.KilometersPerSecond:
                    return new Speed(this.Value * Speed.KPS_PER_KPH, SpatialDistance.SpeedUnit.KilometersPerHour);
                default:
                    return Speed.Empty;
            }
        };
        Speed.STATUTE_MPH_PER_KNOT = 0.8689762;
        Speed.KPH_PER_KNOT = 0.5399568;
        Speed.FPS_PER_KNOT = 0.5924838;
        Speed.MPS_PER_KNOT = 1.943845;
        Speed.KPS_PER_KNOT = 1943.845;
        Speed.KNOTS_PER_STATUTE_MPH = 1.150779;
        Speed.KPH_PER_STATUTE_MPH = 0.6213712;
        Speed.FPS_PER_STATUTE_MPH = 0.6818182;
        Speed.MPS_PER_STATUTE_MPH = 2.236936;
        Speed.KPS_PER_STATUTE_MPH = 2236.936;
        Speed.KNOTS_PER_KPH = 1.852;
        Speed.STATUTE_MPH_PER_KPH = 1.609344;
        Speed.FPS_PER_KPH = 1.09728;
        Speed.MPS_PER_KPH = 3.6;
        Speed.KPS_PER_KPH = 3600;
        Speed.KNOTS_PER_KPS = 0.0005144444;
        Speed.STATUTE_MPH_PER_KPS = 0.000447;
        Speed.FPS_PER_KPS = 0.0003048;
        Speed.MPS_PER_KPS = 0.001;
        Speed.KPH_PER_KPS = 0.0002777778;
        Speed.KNOTS_PER_FPS = 1.68781;
        Speed.STATUTE_MPH_PER_FPS = 1.466667;
        Speed.KPH_PER_FPS = 0.9113444;
        Speed.MPS_PER_FPS = 3.28084;
        Speed.KPS_PER_FPS = 3280.84;
        Speed.KNOTS_PER_MPS = 0.5144444;
        Speed.STATUTE_MPH_PER_MPS = 0.447;
        Speed.FPS_PER_MPS = 0.3048;
        Speed.KPH_PER_MPS = 0.2777778;
        Speed.KPS_PER_MPS = 1000;
        Speed.Empty = new Speed(0, SpatialDistance.SpeedUnit.MetersPerSecond);
        Speed.AtRest = new Speed(0, SpatialDistance.SpeedUnit.MetersPerSecond);
        Speed.SpeedOfLight = new Speed(299792458, SpatialDistance.SpeedUnit.MetersPerSecond);
        Speed.Maximum = new Speed(Number.MAX_VALUE, SpatialDistance.SpeedUnit.KilometersPerSecond).ToLocalUnitType();
        Speed.Minimum = new Speed(Number.MIN_VALUE, SpatialDistance.SpeedUnit.KilometersPerSecond).ToLocalUnitType();
        Speed.SpeedOfSoundAtSeaLevel = new Speed(340.29, SpatialDistance.SpeedUnit.MetersPerSecond);
        Speed.Infinity = new Speed(Number.POSITIVE_INFINITY, SpatialDistance.SpeedUnit.MetersPerSecond);
        Speed.Invalid = new Speed(Number.NaN, SpatialDistance.SpeedUnit.KilometersPerSecond);
        return Speed;
    }());
    SpatialDistance.Speed = Speed;
})(SpatialDistance || (SpatialDistance = {}));
var SpatialDistance;
(function (SpatialDistance) {
    var DistanceUnit;
    (function (DistanceUnit) {
        DistanceUnit[DistanceUnit["Kilometers"] = 0] = "Kilometers";
        DistanceUnit[DistanceUnit["Meters"] = 1] = "Meters";
        DistanceUnit[DistanceUnit["Centimeters"] = 2] = "Centimeters";
        DistanceUnit[DistanceUnit["NauticalMiles"] = 3] = "NauticalMiles";
        DistanceUnit[DistanceUnit["StatuteMiles"] = 4] = "StatuteMiles";
        DistanceUnit[DistanceUnit["Feet"] = 5] = "Feet";
        DistanceUnit[DistanceUnit["Inches"] = 6] = "Inches";
    })(DistanceUnit = SpatialDistance.DistanceUnit || (SpatialDistance.DistanceUnit = {}));
})(SpatialDistance || (SpatialDistance = {}));
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
var SpatialDistance;
(function (SpatialDistance) {
    var Ellipsoid = (function () {
        function Ellipsoid(epsgNumber, a, invf, b, name) {
            this._epsgNumber = 32767;
            this._name = name;
            this._epsgNumber = epsgNumber;
            this._equatorialRadius = SpatialDistance.Distance.FromMeters(a);
            this._polarRadius = SpatialDistance.Distance.FromMeters(b);
            this._inverseFlattening = invf;
            this.Calculate();
            this.SanityCheck();
        }
        Object.defineProperty(Ellipsoid.prototype, "Eccentricity", {
            get: function () {
                return this._eccentricity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "EquatorialRadius", {
            get: function () {
                return this._equatorialRadius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "PolarRadius", {
            get: function () {
                return this._polarRadius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "PolarRadiusMeters", {
            get: function () {
                return this._polarRadiusMeters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "EquatorialRadiusMeters", {
            get: function () {
                return this._equatorialRadiusMeters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "Flattening", {
            get: function () {
                return this._flattening;
            },
            enumerable: true,
            configurable: true
        });
        Ellipsoid.prototype.Calculate = function () {
            var a = this._equatorialRadius.ToMeters().Value;
            var b = this._polarRadius.ToMeters().Value;
            var invf = this._inverseFlattening;
            if (b == 0)
                b = -(((1.0 / invf) * a) - a);
            this._polarRadius = SpatialDistance.Distance.FromMeters(b);
            this._flattening = (this._equatorialRadius.ToMeters().Value - this._polarRadius.ToMeters().Value) / this._equatorialRadius.ToMeters().Value;
            this._inverseFlattening = 1.0 / this._flattening;
            this._eccentricity = Math.sqrt((Math.pow(this._equatorialRadius.Value, 2) - Math.pow(this._polarRadius.Value, 2)) / Math.pow(this._equatorialRadius.Value, 2));
            this._eccentricitySquared = Math.pow(this.Eccentricity, 2);
            this._equatorialRadiusMeters = this._equatorialRadius.ToMeters().Value;
            this._polarRadiusMeters = this._polarRadius.ToMeters().Value;
        };
        Ellipsoid.prototype.SanityCheck = function () {
            if ((this._equatorialRadius.IsEmpty && this._inverseFlattening == 0) || (this._equatorialRadius.IsEmpty && this._polarRadius.IsEmpty))
                throw new Error("The radii and inverse flattening of an allipsoid cannot be zero.   Please specify either the equatorial and polar radius, or the equatorial radius and the inverse flattening for this ellipsoid.");
        };
        Ellipsoid.Wgs1984 = new Ellipsoid(7030, 6378137, 298.2572236, 0, "WGS 84");
        return Ellipsoid;
    }());
    SpatialDistance.Ellipsoid = Ellipsoid;
})(SpatialDistance || (SpatialDistance = {}));
var SpatialDistance;
(function (SpatialDistance) {
    var Position = (function () {
        function Position(latitude, longitude) {
            this._latitude = latitude;
            this._longitude = longitude;
        }
        Object.defineProperty(Position.prototype, "Latitude", {
            get: function () {
                return this._latitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Position.prototype, "Longitude", {
            get: function () {
                return this._longitude;
            },
            enumerable: true,
            configurable: true
        });
        Position.prototype.Equals = function (f) {
            return (this.Latitude.Value == f.Latitude.Value && this.Longitude.Value == f.Longitude.Value);
        };
        Position.prototype.sign = function (x) {
            return ((x > 0) - (x < 0)) || +x;
        };
        Position.prototype.DistanceTo = function (destination, ellipsoid) {
            if (ellipsoid === void 0) { ellipsoid = SpatialDistance.Ellipsoid.Wgs1984; }
            if (this.Equals(destination))
                return SpatialDistance.Distance.Empty;
            var goodAlpha = 0;
            var goodSigma = 0;
            var goodCos2SigmaM = 0;
            var a = ellipsoid.EquatorialRadiusMeters;
            var b = ellipsoid.PolarRadiusMeters;
            var lat1 = this.Latitude.Normalize().ToRadians().Value;
            var lon1 = this.Longitude.Normalize().ToRadians().Value;
            var lat2 = destination.Latitude.Normalize().ToRadians().Value;
            var lon2 = destination.Longitude.Normalize().ToRadians().Value;
            if (Math.abs(Math.PI * 0.5 - Math.abs(lat1)) < 1E-10) {
                lat1 = this.sign(lat1) * (Math.PI * 0.5 - 1E-10);
            }
            if (Math.abs(Math.PI * 0.5 - Math.abs(lat2)) < 1E-10) {
                lat2 = this.sign(lat2) * (Math.PI * 0.5 - 1E-10);
            }
            var f = ellipsoid.Flattening;
            var u1 = Math.atan((1 - f) * Math.tan(lat1));
            var u2A = Math.atan((1 - f) * Math.tan(lat2));
            lon1 = lon1 % (2 * Math.PI);
            lon2 = lon2 % (2 * Math.PI);
            var l = Math.abs(lon2 - lon1);
            if (l > Math.PI) {
                l = 2.0 * Math.PI - l;
            }
            var lambda = l;
            var itercount = 0;
            var notdone = true;
            while (notdone) {
                itercount++;
                if (itercount > 50) {
                    break;
                }
                var lambdaold = lambda;
                var sinsigma = Math.sqrt(Math.pow((Math.cos(u2A) * Math.sin(lambda)), 2)
                    + Math.pow((Math.cos(u1) * Math.sin(u2A) - Math.sin(u1) *
                        Math.cos(u2A) * Math.cos(lambda)), 2));
                var cossigma = Math.sin(u1) * Math.sin(u2A) +
                    Math.cos(u1) * Math.cos(u2A) * Math.cos(lambda);
                var sigma = Math.atan2(sinsigma, cossigma);
                var alpha = Math.asin(Math.cos(u1) * Math.cos(u2A) *
                    Math.sin(lambda) / Math.sin(sigma));
                var cos2SigmaM = Math.cos(sigma) - 2.0 * Math.sin(u1) *
                    Math.sin(u2A) / Math.pow(Math.cos(alpha), 2);
                var c = f / 16 * Math.pow(Math.cos(alpha), 2) * (4 + f * (4 - 3 *
                    Math.pow(Math.cos(alpha), 2)));
                lambda = l + (1 - c) * f * Math.sin(alpha)
                    * (sigma + c * Math.sin(sigma) *
                        (cos2SigmaM + c * Math.cos(sigma) *
                            (-1 + 2 * Math.pow(cos2SigmaM, 2))));
                if (lambda > Math.PI) {
                    lambdaold = Math.PI;
                    lambda = Math.PI;
                }
                notdone = Math.abs(lambda - lambdaold) > Position.TARGET_ACCURACY;
                if (!isNaN(alpha)) {
                    goodAlpha = alpha;
                    goodSigma = sigma;
                    goodCos2SigmaM = cos2SigmaM;
                }
            }
            var u2 = Math.pow(Math.cos(goodAlpha), 2) * (Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(b, 2);
            var aa = 1 + u2 / 16384 * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
            var bb = u2 / 1024 * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
            var deltasigma = bb * Math.sin(goodSigma) * (goodCos2SigmaM + bb / 4 * (Math.cos(goodSigma) * (-1 + 2 *
                Math.pow(goodCos2SigmaM, 2)) - bb / 6 * goodCos2SigmaM * (-3 + 4 * Math.pow(Math.sin(goodSigma), 2)) * (-3 + 4 *
                Math.pow(goodCos2SigmaM, 2))));
            var s = b * aa * (goodSigma - deltasigma);
            return new SpatialDistance.Distance(s, SpatialDistance.DistanceUnit.Meters).ToLocalUnitType();
        };
        Position.prototype.DistanceToApproximation = function (destination, ellipsoid, isApproximated) {
            if (!isApproximated)
                return this.DistanceTo(destination, ellipsoid);
            if (ellipsoid == null)
                throw new Error("ellipsoid - Resources.Position_DistanceTo_Null_Ellipsoid");
            var lat1 = this.Latitude.ToRadians().Value;
            var lat2 = destination.Latitude.ToRadians().Value;
            var long1 = this.Longitude.ToRadians().Value;
            var long2 = destination.Longitude.ToRadians().Value;
            var dlat = Math.abs(lat2 - lat1);
            var dlong = Math.abs(long2 - long1);
            var l = (lat1 + lat2) * 0.5;
            var a = ellipsoid.EquatorialRadius.ToKilometers().Value;
            var b = ellipsoid.PolarRadius.ToKilometers().Value;
            var e = Math.sqrt(1 - (b * b) / (a * a));
            var r1 = (a * (1 - (e * e))) / Math.pow((1 - (e * e) * (Math.sin(l) * Math.sin(l))), 3 * 0.5);
            var r2 = a / Math.sqrt(1 - (e * e) * (Math.sin(l) * Math.sin(l)));
            var ravg = (r1 * (dlat / (dlat + dlong))) + (r2 * (dlong / (dlat + dlong)));
            var sinlat = Math.sin(dlat * 0.5);
            var sinlon = Math.sin(dlong * 0.5);
            a = Math.pow(sinlat, 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(sinlon, 2);
            var c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
            var d = ravg * c;
            if (isNaN(d)) {
                d = 0.0;
            }
            return new SpatialDistance.Distance(d, SpatialDistance.DistanceUnit.Kilometers).ToLocalUnitType();
        };
        Position.TARGET_ACCURACY = 1.0E-12;
        return Position;
    }());
    SpatialDistance.Position = Position;
})(SpatialDistance || (SpatialDistance = {}));
