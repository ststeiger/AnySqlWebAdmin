var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vectors;
(function (Vectors) {
    var c3DPoint = (function (_super) {
        __extends(c3DPoint, _super);
        function c3DPoint(nXparam, nYparam, nZparam) {
            if (nXparam === void 0) { nXparam = 0; }
            if (nYparam === void 0) { nYparam = 0; }
            if (nZparam === void 0) { nZparam = 0; }
            var _this = _super.call(this, nXparam, nYparam) || this;
            _this.bCurrentlyValid = true;
            _this.x = nXparam;
            _this.y = nYparam;
            _this.z = nZparam;
            _this.bCurrentlyValid = true;
            return _this;
        }
        return c3DPoint;
    }(Vectors.Point));
    Vectors.c3DPoint = c3DPoint;
})(Vectors || (Vectors = {}));
