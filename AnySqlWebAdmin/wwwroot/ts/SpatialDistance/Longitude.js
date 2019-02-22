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
