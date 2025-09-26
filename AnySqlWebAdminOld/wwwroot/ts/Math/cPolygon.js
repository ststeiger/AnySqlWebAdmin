var Vectors;
(function (Vectors) {
    var cPolygon = (function () {
        function cPolygon(pAddPolygonCallbackParameter, pRemovePolygonCallbackParameter) {
            if (pAddPolygonCallbackParameter === void 0) { pAddPolygonCallbackParameter = null; }
            if (pRemovePolygonCallbackParameter === void 0) { pRemovePolygonCallbackParameter = null; }
            this.aptDefinitionPoints = [];
        }
        cPolygon.prototype.FindNearestLineEndIndex = function (cptPointToAdd) {
            if (this.aptDefinitionPoints.length == 0) {
                return 0;
            }
            if (this.aptDefinitionPoints.length > 1) {
                var nOldDistance = 1000000;
                var iOldIndex = 0;
                var nDistance = 0;
                var vec2_LineStart = null;
                var vec2_LineEnd = null;
                var vec2_Point = null;
                var vec2_VecLine = null;
                var cptIntersectionPoint = null;
                var bHasFirst = false;
                var bHasLast = true;
                var iFirst = 0;
                var iLast = 0;
                for (var i = 0; i < this.aptDefinitionPoints.length; ++i) {
                    if (this.aptDefinitionPoints[i].bCurrentlyValid) {
                        if (bHasFirst == false) {
                            bHasFirst = true;
                            iFirst = i;
                            iLast = i;
                            continue;
                        }
                        bHasLast = true;
                        vec2_LineStart = Vectors.cVector_2d.MakeVector(this.aptDefinitionPoints[iLast].x, this.aptDefinitionPoints[iLast].y);
                        vec2_LineEnd = Vectors.cVector_2d.MakeVector(this.aptDefinitionPoints[i].x, this.aptDefinitionPoints[i].y);
                        vec2_Point = Vectors.cVector_2d.MakeVector(cptPointToAdd.x, cptPointToAdd.y);
                        nDistance = Vectors.cVector_2d.DistanceOfPointToLine(vec2_Point, vec2_LineStart, vec2_LineEnd);
                        vec2_VecLine = Vectors.cVector_2d.VectorSubtract(vec2_LineStart, vec2_LineEnd);
                        if (nDistance < nOldDistance) {
                            cptIntersectionPoint = Vectors.cVector_2d.GetPointVerticalIntersection(this.aptDefinitionPoints[i], vec2_VecLine, cptPointToAdd);
                            if (cptIntersectionPoint.bHasInterSection) {
                                if (Vectors.cVector_2d.isPointOnLine(this.aptDefinitionPoints[i], this.aptDefinitionPoints[iLast], cptIntersectionPoint)) {
                                    nOldDistance = nDistance;
                                    iOldIndex = i;
                                }
                            }
                        }
                        iLast = i;
                    }
                }
                if (bHasLast) {
                    vec2_LineStart = Vectors.cVector_2d.MakeVector(this.aptDefinitionPoints[iLast].x, this.aptDefinitionPoints[iLast].y);
                    vec2_LineEnd = Vectors.cVector_2d.MakeVector(this.aptDefinitionPoints[iFirst].x, this.aptDefinitionPoints[iFirst].y);
                    vec2_Point = Vectors.cVector_2d.MakeVector(cptPointToAdd.x, cptPointToAdd.y);
                    nDistance = Vectors.cVector_2d.DistanceOfPointToLine(vec2_Point, vec2_LineStart, vec2_LineEnd);
                    vec2_VecLine = Vectors.cVector_2d.VectorSubtract(vec2_LineStart, vec2_LineEnd);
                    if (nDistance < nOldDistance) {
                        cptIntersectionPoint = Vectors.cVector_2d.GetPointVerticalIntersection(this.aptDefinitionPoints[iLast], vec2_VecLine, cptPointToAdd);
                        if (cptIntersectionPoint.bHasInterSection) {
                            if (Vectors.cVector_2d.isPointOnLine(this.aptDefinitionPoints[iLast], this.aptDefinitionPoints[iFirst], cptIntersectionPoint)) {
                                nOldDistance = nDistance;
                                iOldIndex = iLast + 1;
                            }
                        }
                    }
                    return iOldIndex;
                }
                else {
                    return 1;
                }
            }
            else
                return 1;
            return this.aptDefinitionPoints.length;
        };
        cPolygon.prototype.AddPoint = function (ptPoint, iIndex) {
            this.aptDefinitionPoints.splice(iIndex, 0, ptPoint);
            this.aptDefinitionPoints.push(ptPoint);
        };
        cPolygon.prototype.CalculateMathematicalArea = function () {
            var nArea = 0;
            var i;
            for (i = 0; i < this.aptDefinitionPoints.length; ++i) {
                if (this.aptDefinitionPoints[i] != null) {
                    if (!this.aptDefinitionPoints[i].bCurrentlyValid)
                        continue;
                    if (i != this.aptDefinitionPoints.length - 1) {
                        nArea += this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[i + 1].y - this.aptDefinitionPoints[i + 1].x * this.aptDefinitionPoints[i].y;
                    }
                    else {
                        nArea += this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[0].y - this.aptDefinitionPoints[0].x * this.aptDefinitionPoints[i].y;
                    }
                }
            }
            nArea *= 0.5;
            return nArea;
        };
        cPolygon.prototype.CalculateArea = function () {
            var nArea = Math.abs(this.CalculateMathematicalArea());
            return nArea;
        };
        cPolygon.prototype.CalculateCentroid = function () {
            var nCentroidX = 0;
            var nCentroidY = 0;
            var iFirst = 0;
            var bFirst = true;
            var i;
            for (i = 0; i < this.aptDefinitionPoints.length; ++i) {
                if (this.aptDefinitionPoints[i] != null) {
                    if (!this.aptDefinitionPoints[i].bCurrentlyValid)
                        continue;
                    if (bFirst) {
                        bFirst = false;
                        iFirst = i;
                    }
                    if (i != this.aptDefinitionPoints.length - 1) {
                        nCentroidX += (this.aptDefinitionPoints[i].x + this.aptDefinitionPoints[i + 1].x) * (this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[i + 1].y - this.aptDefinitionPoints[i + 1].x * this.aptDefinitionPoints[i].y);
                        nCentroidY += (this.aptDefinitionPoints[i].y + this.aptDefinitionPoints[i + 1].y) * (this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[i + 1].y - this.aptDefinitionPoints[i + 1].x * this.aptDefinitionPoints[i].y);
                    }
                    else {
                        nCentroidX += (this.aptDefinitionPoints[i].x + this.aptDefinitionPoints[iFirst].x) * (this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[iFirst].y - this.aptDefinitionPoints[iFirst].x * this.aptDefinitionPoints[i].y);
                        nCentroidY += (this.aptDefinitionPoints[i].y + this.aptDefinitionPoints[iFirst].y) * (this.aptDefinitionPoints[i].x * this.aptDefinitionPoints[iFirst].y - this.aptDefinitionPoints[iFirst].x * this.aptDefinitionPoints[i].y);
                    }
                }
            }
            var nArea = this.CalculateMathematicalArea();
            nCentroidX *= 1 / (6 * nArea);
            nCentroidY *= 1 / (6 * nArea);
            var ptCentroid = new Vectors.Point(nCentroidX, nCentroidY);
            return ptCentroid;
        };
        cPolygon.prototype.CalculateMidPoint = function () {
            var nX = 0;
            var nY = 0;
            var j = 0;
            var i;
            for (i = 0; i < this.aptDefinitionPoints.length; ++i) {
                if (this.aptDefinitionPoints[i] != null) {
                    if (!this.aptDefinitionPoints[i].bCurrentlyValid)
                        continue;
                    nX += this.aptDefinitionPoints[i].x;
                    nY += this.aptDefinitionPoints[i].y;
                    j += 1;
                }
            }
            nX /= j;
            nY /= j;
            var ptReturnValue = new Vectors.Point(nX, nY);
            return ptReturnValue;
        };
        cPolygon.prototype.ContainsPoint = function (ptPointInQuestion) {
            return this.ContainsXY(ptPointInQuestion.x, ptPointInQuestion.y);
        };
        cPolygon.prototype.ContainsXY = function (xc, yc) {
            return false;
        };
        return cPolygon;
    }());
    Vectors.cPolygon = cPolygon;
})(Vectors || (Vectors = {}));
