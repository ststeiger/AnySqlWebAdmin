var SpatialDistance;
(function (SpatialDistance) {
    var Ellipsoid = (function () {
        function Ellipsoid(epsgNumber, a, invf, b, name) {
            this._epsgNumber = 32767;
            this._name = name;
            this._epsgNumber = epsgNumber;
            this._equatorialRadius = SpatialDistance.Distance.FromMeters(a);
            this._polarRadius = SpatialDistance.Distance.FromMeters(b);
            this._inverseFlattening = invf;
            this.Calculate();
            this.SanityCheck();
        }
        Object.defineProperty(Ellipsoid.prototype, "Eccentricity", {
            get: function () {
                return this._eccentricity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "EquatorialRadius", {
            get: function () {
                return this._equatorialRadius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "PolarRadius", {
            get: function () {
                return this._polarRadius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "PolarRadiusMeters", {
            get: function () {
                return this._polarRadiusMeters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "EquatorialRadiusMeters", {
            get: function () {
                return this._equatorialRadiusMeters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ellipsoid.prototype, "Flattening", {
            get: function () {
                return this._flattening;
            },
            enumerable: true,
            configurable: true
        });
        Ellipsoid.prototype.Calculate = function () {
            var a = this._equatorialRadius.ToMeters().Value;
            var b = this._polarRadius.ToMeters().Value;
            var invf = this._inverseFlattening;
            if (b == 0)
                b = -(((1.0 / invf) * a) - a);
            this._polarRadius = SpatialDistance.Distance.FromMeters(b);
            this._flattening = (this._equatorialRadius.ToMeters().Value - this._polarRadius.ToMeters().Value) / this._equatorialRadius.ToMeters().Value;
            this._inverseFlattening = 1.0 / this._flattening;
            this._eccentricity = Math.sqrt((Math.pow(this._equatorialRadius.Value, 2) - Math.pow(this._polarRadius.Value, 2)) / Math.pow(this._equatorialRadius.Value, 2));
            this._eccentricitySquared = Math.pow(this.Eccentricity, 2);
            this._equatorialRadiusMeters = this._equatorialRadius.ToMeters().Value;
            this._polarRadiusMeters = this._polarRadius.ToMeters().Value;
        };
        Ellipsoid.prototype.SanityCheck = function () {
            if ((this._equatorialRadius.IsEmpty && this._inverseFlattening == 0) || (this._equatorialRadius.IsEmpty && this._polarRadius.IsEmpty))
                throw new Error("The radii and inverse flattening of an allipsoid cannot be zero.   Please specify either the equatorial and polar radius, or the equatorial radius and the inverse flattening for this ellipsoid.");
        };
        Ellipsoid.Wgs1984 = new Ellipsoid(7030, 6378137, 298.2572236, 0, "WGS 84");
        return Ellipsoid;
    }());
    SpatialDistance.Ellipsoid = Ellipsoid;
})(SpatialDistance || (SpatialDistance = {}));
