var Vectors;
(function (Vectors) {
    var cVector_3d = (function () {
        function cVector_3d(x0, y0, z0) {
            if (x0 === void 0) { x0 = 0; }
            if (y0 === void 0) { y0 = 0; }
            if (z0 === void 0) { z0 = 0; }
            this.bCurrentlyValid = true;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.bCurrentlyValid = true;
            this.x = x0;
            this.y = y0;
            this.z = z0;
        }
        cVector_3d.MakeVector = function (x1, y1, z1, x0, y0, z0) {
            if (x0 === void 0) { x0 = 0; }
            if (y0 === void 0) { y0 = 0; }
            if (z0 === void 0) { z0 = 0; }
            var vecReturnValue = new cVector_3d(x1 - x0, y1 - y0, z1 - z0);
            return vecReturnValue;
        };
        cVector_3d.VectorSubtract = function (b, a) {
            var vecReturnValue = new cVector_3d(b.x - a.x, b.y - a.y, b.z - a.z);
            return vecReturnValue;
        };
        cVector_3d.VectorAdd = function (a, b) {
            var vecReturnValue = new cVector_3d(a.x + b.x, a.y + b.y, a.z + b.z);
            return vecReturnValue;
        };
        cVector_3d.CrossP = function (a, b) {
            var vecReturnValue = new cVector_3d((a.y * b.z - a.z * b.y), (a.z * b.x - a.x * b.z), (a.x * b.y - a.y * b.x));
            return vecReturnValue;
        };
        cVector_3d.DotP = function (a, b) {
            var nReturnValue = a.x * b.x + a.y * b.y + a.z * b.z;
            return nReturnValue;
        };
        cVector_3d.VectorLength = function (vec) {
            var nReturnValue = Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + Math.pow(vec.z, 2);
            nReturnValue = Math.sqrt(nReturnValue);
            return nReturnValue;
        };
        cVector_3d.VectorNorm = function (vec) {
            return cVector_3d.VectorLength(vec);
        };
        cVector_3d.UnitVector = function (vec) {
            var len = cVector_3d.VectorLength(vec);
            var vecReturnValue = new cVector_3d(vec.x / len, vec.y / len, vec.z / len);
            return vecReturnValue;
        };
        cVector_3d.Angle_Rad = function (a, b) {
            var nReturnValue = Math.acos(((a.x * b.x + a.y * b.y + a.z * b.z) /
                (Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2) + Math.pow(b.z, 2))
                    * Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2)))));
            return nReturnValue;
        };
        cVector_3d.Angle_Degrees = function (a, b) {
            var nReturnValue = Math.acos(((a.x * b.x + a.y * b.y + a.z * b.z) /
                (Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2) + Math.pow(b.z, 2))
                    * Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2)))));
            return nReturnValue * 180 / Math.PI;
        };
        return cVector_3d;
    }());
    Vectors.cVector_3d = cVector_3d;
})(Vectors || (Vectors = {}));
