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
