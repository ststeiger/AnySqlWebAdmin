var Vectors;
(function (Vectors) {
    var cVector_2d = (function () {
        function cVector_2d(nXparam, nYparam, nZparam) {
            if (nXparam === void 0) { nXparam = 0; }
            if (nYparam === void 0) { nYparam = 0; }
            if (nZparam === void 0) { nZparam = 0; }
            this.bCurrentlyValid = true;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.bCurrentlyValid = true;
            this.x = nXparam;
            this.y = nYparam;
            this.z = nZparam;
        }
        cVector_2d.prototype.tostring = function () {
            var strReturnValue = "[" + this.x + ", " + this.y + "]";
            return strReturnValue;
        };
        cVector_2d.prototype.GetRelativeLength = function () {
            var nReturnValue = Math.pow(this.x, 2) + Math.pow(this.y, 2);
            return nReturnValue;
        };
        cVector_2d.prototype.GetLength = function () {
            var nReturnValue = Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
            nReturnValue = Math.sqrt(nReturnValue);
            return nReturnValue;
        };
        cVector_2d.MakeVector = function (nX1param, nY1param, nX0param, nY0param) {
            if (nX0param === void 0) { nX0param = 0; }
            if (nY0param === void 0) { nY0param = 0; }
            var vecReturnValue = new cVector_2d(nX1param - nX0param, nY1param - nY0param);
            return vecReturnValue;
        };
        cVector_2d.cPoint2Vector = function (cptPoint) {
            var vecReturnValue = new cVector_2d(cptPoint.x, cptPoint.y);
            return vecReturnValue;
        };
        cVector_2d.VectorSubtract = function (b, a) {
            var vecReturnValue = new cVector_2d(b.x - a.x, b.y - a.y);
            return vecReturnValue;
        };
        cVector_2d.VectorAdd = function (a, b) {
            var vecReturnValue = new cVector_2d(a.x + b.x, a.y + b.y);
            return vecReturnValue;
        };
        cVector_2d.CrossP = function (a, b) {
            var vecReturnValue = new cVector_2d(0, 0);
            vecReturnValue.z = a.x * b.y - a.y * b.x;
            return vecReturnValue;
        };
        cVector_2d.DotP = function (a, b) {
            var nReturnValue = a.x * b.x + a.y * b.y + a.z * b.z;
            return nReturnValue;
        };
        cVector_2d.VectorLength = function (vec) {
            var nReturnValue = Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + Math.pow(vec.z, 2);
            nReturnValue = Math.sqrt(nReturnValue);
            return nReturnValue;
        };
        cVector_2d.VectorNorm = function (vec) {
            return cVector_2d.VectorLength(vec);
        };
        cVector_2d.UnitVector = function (vec) {
            var len = cVector_2d.VectorLength(vec);
            var vecReturnValue = new cVector_2d(vec.x / len, vec.y / len);
            return vecReturnValue;
        };
        cVector_2d.Angle_Rad = function (a, b) {
            var nReturnValue = Math.acos(((a.x * b.x + a.y * b.y + a.z * b.z) /
                (Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2) + Math.pow(b.z, 2))
                    * Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2)))));
            return nReturnValue;
        };
        cVector_2d.Angle_Degrees = function (a, b) {
            var nReturnValue = Math.acos(((a.x * b.x + a.y * b.y + a.z * b.z) /
                (Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2) + Math.pow(b.z, 2))
                    * Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2)))));
            return nReturnValue * 180.0 / Math.PI;
        };
        cVector_2d.DistanceOfPointToLine = function (x0, x1, x2) {
            var x2minusx1 = cVector_2d.VectorSubtract(x2, x1);
            var x1minusx0 = cVector_2d.VectorSubtract(x1, x0);
            var DeltaVector = cVector_2d.CrossP(x2minusx1, x1minusx0);
            var DeltaNorm = cVector_2d.VectorNorm(DeltaVector);
            var x2minusx1Norm = cVector_2d.VectorNorm(x2minusx1);
            var nReturnValue = DeltaNorm / x2minusx1Norm;
            return nReturnValue;
        };
        cVector_2d.GetNormalVector = function (vec) {
            var vecReturnValue = new cVector_2d(-vec.y, vec.x, 0);
            return vecReturnValue;
        };
        cVector_2d.GetPointVerticalIntersection = function (cptPointQ, vecInputLine, cpPointP) {
            var vecNormalVector = cVector_2d.GetNormalVector(vecInputLine);
            var nDenominator = vecNormalVector.x * vecInputLine.y - vecNormalVector.y * vecInputLine.x;
            var cptIntersectionPoint = new Vectors.cPoint();
            if (nDenominator == 0) {
                cptIntersectionPoint.bHasInterSection = false;
                return cptIntersectionPoint;
            }
            var a = (-(cpPointP.x * vecInputLine.y - cpPointP.y * vecInputLine.x - cptPointQ.x * vecInputLine.y + cptPointQ.y * vecInputLine.x)) / nDenominator;
            var b = (-(cpPointP.x * vecNormalVector.y - cpPointP.y * vecNormalVector.x - cptPointQ.x * vecNormalVector.y + cptPointQ.y * vecNormalVector.x)) / nDenominator;
            cptIntersectionPoint.bHasInterSection = true;
            cptIntersectionPoint.x = cpPointP.x + a * vecNormalVector.x;
            cptIntersectionPoint.y = cpPointP.y + a * vecNormalVector.y;
            return cptIntersectionPoint;
        };
        cVector_2d.isPointOnLine = function (cptLinePoint1, cptLinePoint2, cptPoint) {
            var cptPointA = new Vectors.cPoint();
            var cptPointB = new Vectors.cPoint();
            if (cptLinePoint1.x < cptLinePoint2.x) {
                cptPointA.x = cptLinePoint1.x;
                cptPointB.x = cptLinePoint2.x;
            }
            else {
                cptPointA.x = cptLinePoint2.x;
                cptPointB.x = cptLinePoint1.x;
            }
            if (cptLinePoint1.y < cptLinePoint2.y) {
                cptPointA.y = cptLinePoint1.y;
                cptPointB.y = cptLinePoint2.y;
            }
            else {
                cptPointA.y = cptLinePoint2.y;
                cptPointB.y = cptLinePoint1.y;
            }
            if (cptPoint.x >= cptPointA.x && cptPoint.y >= cptPointA.y && cptPoint.x <= cptPointB.x && cptPoint.y <= cptPointB.y) {
                return true;
            }
            return false;
        };
        cVector_2d.GetPolygonCenter = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var sum = new Vectors.Point(0, 0);
            for (var i = 0; i < args.length; i++) {
                sum.x += args[i].x;
                sum.y += args[i].y;
            }
            sum.x /= args.length;
            sum.y /= args.length;
            return sum;
        };
        return cVector_2d;
    }());
    Vectors.cVector_2d = cVector_2d;
})(Vectors || (Vectors = {}));
