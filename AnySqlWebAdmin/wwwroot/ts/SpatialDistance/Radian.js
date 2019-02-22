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
