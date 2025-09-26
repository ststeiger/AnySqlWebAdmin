var Vectors;
(function (Vectors) {
    var cVector_2d = (function () {
        function cVector_2d(x0, y0, z0) {
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
        cVector_2d.MakeVector = function (x1, y1, x0, y0) {
            if (x0 === void 0) { x0 = 0; }
            if (y0 === void 0) { y0 = 0; }
            var vecReturnValue = new cVector_2d(x1 - x0, y1 - y0);
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
        cVector_2d.schnittpunktlii = function (p1, vec1, p2, vec2) {
            return cVector_2d.schnittpunktli(p1, new Vectors.Point(p1.x + vec1.x, p1.y + vec1.y), p2, new Vectors.Point(p2.x + vec2.x, p2.y + vec2.y));
        };
        cVector_2d.schnittpunktli = function (p1, p2, p3, p4) {
            var x1 = p1.x;
            var x2 = p2.x;
            var x3 = p3.x;
            var x4 = p4.x;
            var y1 = p1.y;
            var y2 = p2.y;
            var y3 = p3.y;
            var y4 = p4.y;
            var topaX = cVector_2d.Determinant2d(x1, y1, x2, y2);
            var topbX = cVector_2d.Determinant2d(x1, 1, x2, 1);
            var topcX = cVector_2d.Determinant2d(x3, y3, x4, y4);
            var topdX = cVector_2d.Determinant2d(x3, 1, x4, 1);
            var topX = cVector_2d.Determinant2d(topaX, topbX, topcX, topdX);
            var bottomaX = cVector_2d.Determinant2d(x1, 1, x2, 1);
            var bottombX = cVector_2d.Determinant2d(y1, 1, y2, 1);
            var bottomcX = cVector_2d.Determinant2d(x3, 1, x4, 1);
            var bottomdX = cVector_2d.Determinant2d(y3, 1, y4, 1);
            var bottomX = cVector_2d.Determinant2d(bottomaX, bottombX, bottomcX, bottomdX);
            var x = topX / bottomX;
            var topaY = cVector_2d.Determinant2d(x1, y1, x2, y2);
            var topbY = cVector_2d.Determinant2d(y1, 1, y2, 1);
            var topcY = cVector_2d.Determinant2d(x3, y3, x4, y4);
            var topdY = cVector_2d.Determinant2d(x3, 1, y4, 1);
            var topY = cVector_2d.Determinant2d(topaY, topbY, topcY, topdY);
            var bottomaY = cVector_2d.Determinant2d(x1, 1, x2, 1);
            var bottombY = cVector_2d.Determinant2d(y1, 1, y2, 1);
            var bottomcY = cVector_2d.Determinant2d(x3, 1, x4, 1);
            var bottomdY = cVector_2d.Determinant2d(y3, 1, y4, 1);
            var bottomY = cVector_2d.Determinant2d(bottomaY, bottombY, bottomcY, bottomdY);
            var y = topY / bottomY;
            return new Vectors.Point(x, y);
        };
        cVector_2d.Determinant2d = function (a, b, c, d) {
            return a * d - b * c;
        };
        cVector_2d.Determinant3d = function (a, b, c, d, e, f, g, h, i) {
            return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
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
