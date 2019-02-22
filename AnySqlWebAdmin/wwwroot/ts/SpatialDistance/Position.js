var SpatialDistance;
(function (SpatialDistance) {
    var Position = (function () {
        function Position(latitude, longitude) {
            this._latitude = latitude;
            this._longitude = longitude;
        }
        Object.defineProperty(Position.prototype, "Latitude", {
            get: function () {
                return this._latitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Position.prototype, "Longitude", {
            get: function () {
                return this._longitude;
            },
            enumerable: true,
            configurable: true
        });
        Position.prototype.Equals = function (f) {
            return (this.Latitude.Value == f.Latitude.Value && this.Longitude.Value == f.Longitude.Value);
        };
        Position.prototype.sign = function (x) {
            return ((x > 0) - (x < 0)) || +x;
        };
        Position.prototype.DistanceTo = function (destination, ellipsoid) {
            if (ellipsoid === void 0) { ellipsoid = SpatialDistance.Ellipsoid.Wgs1984; }
            if (this.Equals(destination))
                return SpatialDistance.Distance.Empty;
            var goodAlpha = 0;
            var goodSigma = 0;
            var goodCos2SigmaM = 0;
            var a = ellipsoid.EquatorialRadiusMeters;
            var b = ellipsoid.PolarRadiusMeters;
            var lat1 = this.Latitude.Normalize().ToRadians().Value;
            var lon1 = this.Longitude.Normalize().ToRadians().Value;
            var lat2 = destination.Latitude.Normalize().ToRadians().Value;
            var lon2 = destination.Longitude.Normalize().ToRadians().Value;
            if (Math.abs(Math.PI * 0.5 - Math.abs(lat1)) < 1E-10) {
                lat1 = this.sign(lat1) * (Math.PI * 0.5 - 1E-10);
            }
            if (Math.abs(Math.PI * 0.5 - Math.abs(lat2)) < 1E-10) {
                lat2 = this.sign(lat2) * (Math.PI * 0.5 - 1E-10);
            }
            var f = ellipsoid.Flattening;
            var u1 = Math.atan((1 - f) * Math.tan(lat1));
            var u2A = Math.atan((1 - f) * Math.tan(lat2));
            lon1 = lon1 % (2 * Math.PI);
            lon2 = lon2 % (2 * Math.PI);
            var l = Math.abs(lon2 - lon1);
            if (l > Math.PI) {
                l = 2.0 * Math.PI - l;
            }
            var lambda = l;
            var itercount = 0;
            var notdone = true;
            while (notdone) {
                itercount++;
                if (itercount > 50) {
                    break;
                }
                var lambdaold = lambda;
                var sinsigma = Math.sqrt(Math.pow((Math.cos(u2A) * Math.sin(lambda)), 2)
                    + Math.pow((Math.cos(u1) * Math.sin(u2A) - Math.sin(u1) *
                        Math.cos(u2A) * Math.cos(lambda)), 2));
                var cossigma = Math.sin(u1) * Math.sin(u2A) +
                    Math.cos(u1) * Math.cos(u2A) * Math.cos(lambda);
                var sigma = Math.atan2(sinsigma, cossigma);
                var alpha = Math.asin(Math.cos(u1) * Math.cos(u2A) *
                    Math.sin(lambda) / Math.sin(sigma));
                var cos2SigmaM = Math.cos(sigma) - 2.0 * Math.sin(u1) *
                    Math.sin(u2A) / Math.pow(Math.cos(alpha), 2);
                var c = f / 16 * Math.pow(Math.cos(alpha), 2) * (4 + f * (4 - 3 *
                    Math.pow(Math.cos(alpha), 2)));
                lambda = l + (1 - c) * f * Math.sin(alpha)
                    * (sigma + c * Math.sin(sigma) *
                        (cos2SigmaM + c * Math.cos(sigma) *
                            (-1 + 2 * Math.pow(cos2SigmaM, 2))));
                if (lambda > Math.PI) {
                    lambdaold = Math.PI;
                    lambda = Math.PI;
                }
                notdone = Math.abs(lambda - lambdaold) > Position.TARGET_ACCURACY;
                if (!isNaN(alpha)) {
                    goodAlpha = alpha;
                    goodSigma = sigma;
                    goodCos2SigmaM = cos2SigmaM;
                }
            }
            var u2 = Math.pow(Math.cos(goodAlpha), 2) * (Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(b, 2);
            var aa = 1 + u2 / 16384 * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
            var bb = u2 / 1024 * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
            var deltasigma = bb * Math.sin(goodSigma) * (goodCos2SigmaM + bb / 4 * (Math.cos(goodSigma) * (-1 + 2 *
                Math.pow(goodCos2SigmaM, 2)) - bb / 6 * goodCos2SigmaM * (-3 + 4 * Math.pow(Math.sin(goodSigma), 2)) * (-3 + 4 *
                Math.pow(goodCos2SigmaM, 2))));
            var s = b * aa * (goodSigma - deltasigma);
            return new SpatialDistance.Distance(s, SpatialDistance.DistanceUnit.Meters).ToLocalUnitType();
        };
        Position.prototype.DistanceToApproximation = function (destination, ellipsoid, isApproximated) {
            if (!isApproximated)
                return this.DistanceTo(destination, ellipsoid);
            if (ellipsoid == null)
                throw new Error("ellipsoid - Resources.Position_DistanceTo_Null_Ellipsoid");
            var lat1 = this.Latitude.ToRadians().Value;
            var lat2 = destination.Latitude.ToRadians().Value;
            var long1 = this.Longitude.ToRadians().Value;
            var long2 = destination.Longitude.ToRadians().Value;
            var dlat = Math.abs(lat2 - lat1);
            var dlong = Math.abs(long2 - long1);
            var l = (lat1 + lat2) * 0.5;
            var a = ellipsoid.EquatorialRadius.ToKilometers().Value;
            var b = ellipsoid.PolarRadius.ToKilometers().Value;
            var e = Math.sqrt(1 - (b * b) / (a * a));
            var r1 = (a * (1 - (e * e))) / Math.pow((1 - (e * e) * (Math.sin(l) * Math.sin(l))), 3 * 0.5);
            var r2 = a / Math.sqrt(1 - (e * e) * (Math.sin(l) * Math.sin(l)));
            var ravg = (r1 * (dlat / (dlat + dlong))) + (r2 * (dlong / (dlat + dlong)));
            var sinlat = Math.sin(dlat * 0.5);
            var sinlon = Math.sin(dlong * 0.5);
            a = Math.pow(sinlat, 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(sinlon, 2);
            var c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
            var d = ravg * c;
            if (isNaN(d)) {
                d = 0.0;
            }
            return new SpatialDistance.Distance(d, SpatialDistance.DistanceUnit.Kilometers).ToLocalUnitType();
        };
        Position.TARGET_ACCURACY = 1.0E-12;
        return Position;
    }());
    SpatialDistance.Position = Position;
})(SpatialDistance || (SpatialDistance = {}));
