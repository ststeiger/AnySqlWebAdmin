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
