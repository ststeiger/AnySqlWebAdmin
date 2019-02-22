
namespace SpatialDistance {

    export class Ellipsoid {

        private _equatorialRadius: Distance;
        private _polarRadius: Distance;
        private _equatorialRadiusMeters: number;
        private _polarRadiusMeters: number;
        private _flattening: number;
        private _inverseFlattening: number;
        private _eccentricity: number;
        private _eccentricitySquared: number;



        private _name: string;
        private _epsgNumber: number = 32767;

        /// <summary>
        /// Represents the World Geodetic System ellipsoid of 1984.
        /// </summary>
        public static readonly Wgs1984: Ellipsoid = new Ellipsoid(7030, 6378137, 298.2572236, 0, "WGS 84");




        /// <summary>
        /// Returns the rate of flattening of the ellipsoid.
        /// </summary>
        /// <value>A <strong>Double</strong> measuring how elongated the ellipsoid is.</value>
        /// <remarks>The eccentricity is a positive number less than 1, or 0 in the case of a circle.
        /// The greater the eccentricity is, the larger the ratio of the equatorial radius to the
        /// polar radius is, and therefore the more elongated the ellipse is.</remarks>
        public get Eccentricity(): number {
            return this._eccentricity;
        }


        /// <summary>
        /// Represents the distance from Earth's center to the equator.
        /// </summary>
        /// <value>A <strong>Distance</strong> object.</value>
        /// <seealso cref="PolarRadius">PolarRadius Property</seealso>
        /// <remarks>This property defines the radius of the Earth from its center to the equator.
        /// This property is used in conjunction with the <strong>PolarRadius</strong> property
        /// to define an ellipsoidal shape. This property returns the same value as the
        /// <strong>SemiMajorAxis</strong> property.</remarks>
        public get EquatorialRadius(): Distance {
            return this._equatorialRadius;
        }


        /// <summary>
        /// Represents the distance from Earth's center to the North or South pole.
        /// </summary>
        /// <value>A <strong>Distance</strong> object.</value>
        /// <seealso cref="EquatorialRadius">EquatorialRadius Property</seealso>
        /// <remarks>This property defines the radius of the Earth from its center to the equator.
        /// This property is used in conjunction with the <strong>EquatorialRadius</strong>
        /// property to define an ellipsoidal shape. This property returns the same value as
        /// the <strong>SemiMinorAxis</strong> property.</remarks>
        public get PolarRadius(): Distance {
            return this._polarRadius;
        }

        /// <summary>
        /// Gets the polar radius meters.
        /// </summary>
        public get PolarRadiusMeters(): number {
            return this._polarRadiusMeters;
        }

        /// <summary>
        /// Gets the equatorial radius meters.
        /// </summary>
        public get EquatorialRadiusMeters(): number {
            return this._equatorialRadiusMeters;
        }

        /// <summary>
        /// Indicates the shape of the ellipsoid relative to a sphere.
        /// </summary>
        /// <value>A <strong>Double</strong> containing the ellipsoid's flattening.</value>
        /// <seealso cref="EquatorialRadius">EquatorialRadius Property</seealso>
        /// <remarks>This property compares the equatorial radius with the polar radius to measure the
        /// amount that the ellipsoid is "squished" vertically.</remarks>
        public get Flattening(): number {
            return this._flattening;
        }



        /// <summary>
        /// Calculates the common ellipsoid properties. Called from the constructor
        /// </summary>
        private Calculate(): void {
            let a: number = this._equatorialRadius.ToMeters().Value;
            let b: number = this._polarRadius.ToMeters().Value;
            let invf: number = this._inverseFlattening;

            // Check the input. If a minor axis wasn't supplied, calculate it.
            if (b == 0) b = -(((1.0 / invf) * a) - a);

            this._polarRadius = Distance.FromMeters(b);

            this._flattening = (this._equatorialRadius.ToMeters().Value - this._polarRadius.ToMeters().Value) / this._equatorialRadius.ToMeters().Value;
            this._inverseFlattening = 1.0 / this._flattening;
            this._eccentricity = Math.sqrt((Math.pow(this._equatorialRadius.Value, 2) - Math.pow(this._polarRadius.Value, 2)) / Math.pow(this._equatorialRadius.Value, 2));
            this._eccentricitySquared = Math.pow(this.Eccentricity, 2);

            // This is used very frequently by calculations.  Since ellipsoids do not change, there's
            // no need to call .ToMeters() thousands of times.
            this._equatorialRadiusMeters = this._equatorialRadius.ToMeters().Value;
            this._polarRadiusMeters = this._polarRadius.ToMeters().Value;
        }

        /// <summary>
        /// Validates the ellipsoid. Called in the constructor.
        /// </summary>
        private SanityCheck(): void {
            if ((this._equatorialRadius.IsEmpty && this._inverseFlattening == 0) || (this._equatorialRadius.IsEmpty && this._polarRadius.IsEmpty))
                throw new Error("The radii and inverse flattening of an allipsoid cannot be zero.   Please specify either the equatorial and polar radius, or the equatorial radius and the inverse flattening for this ellipsoid.");
        }


        /// <summary>
        /// Internal constructor for static list generation
        /// </summary>
        /// <param name="epsgNumber">The epsg number.</param>
        /// <param name="a">A.</param>
        /// <param name="invf">The invf.</param>
        /// <param name="b">The b.</param>
        /// <param name="name">The name.</param>
        constructor(epsgNumber: number, a: number, invf: number, b: number, name: string) {
            this._name = name;
            this._epsgNumber = epsgNumber;
            this._equatorialRadius = Distance.FromMeters(a);
            this._polarRadius = Distance.FromMeters(b);
            this._inverseFlattening = invf;
            this.Calculate();

            this.SanityCheck();
            // _epsgEllipsoids.Add(this);
        }


    }


}
