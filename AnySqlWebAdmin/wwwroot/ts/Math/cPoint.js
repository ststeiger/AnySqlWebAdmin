var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vectors;
(function (Vectors) {
    var Point = (function () {
        function Point(nXparam, nYparam) {
            if (nXparam === void 0) { nXparam = 0; }
            if (nYparam === void 0) { nYparam = 0; }
        }
        return Point;
    }());
    Vectors.Point = Point;
    var cPoint = (function (_super) {
        __extends(cPoint, _super);
        function cPoint(nXparam, nYparam, nZparam) {
            if (nXparam === void 0) { nXparam = 0; }
            if (nYparam === void 0) { nYparam = 0; }
            if (nZparam === void 0) { nZparam = 0; }
            var _this = _super.call(this, nXparam, nYparam) || this;
            _this.bCurrentlyValid = true;
            _this.bHasInterSection = false;
            _this.z = 0;
            _this.x = nXparam;
            _this.y = nYparam;
            _this.z = nZparam;
            _this.bCurrentlyValid = true;
            return _this;
        }
        cPoint.prototype.ToNormalPoint = function () {
            var ptReturnValue = new Point();
            if (this.bCurrentlyValid) {
                ptReturnValue.x = this.x;
                ptReturnValue.y = this.y;
                return ptReturnValue;
            }
            ptReturnValue = null;
            return ptReturnValue;
        };
        cPoint.prototype.tostring = function () {
            var strReturnValue = "(" + this.x + "," + this.y;
            if (this.z != 0)
                strReturnValue += ", " + this.z + ")";
            else
                strReturnValue += ")";
            if (!this.bCurrentlyValid)
                strReturnValue += " INVALID";
            return strReturnValue;
        };
        return cPoint;
    }(Point));
    Vectors.cPoint = cPoint;
})(Vectors || (Vectors = {}));
