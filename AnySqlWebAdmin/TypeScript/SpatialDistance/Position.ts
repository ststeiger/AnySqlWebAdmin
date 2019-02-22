
namespace SpatialDistance {


    

    export class Position {
        private _latitude: Latitude;
        private _longitude: Longitude;

        // Accuracy is set to 1.0E-12, the smallest value allowed by a Latitude or Longitude
        /// <summary>
        ///
        /// </summary>
        private static TARGET_ACCURACY = 1.0E-12;


        //constructor(longitude: Longitude, latitude: Latitude )
        //{
        //    this._latitude = latitude;
        //    this._longitude = longitude;
        //}


        constructor(latitude: Latitude, longitude: Longitude) {
            this._latitude = latitude;
            this._longitude = longitude;
        }


        public get Latitude(): Latitude {
            return this._latitude;
        }

        public get Longitude(): Longitude {
            return this._longitude;
        }


        public Equals(f:Position):boolean {
            return (this.Latitude.Value == f.Latitude.Value && this.Longitude.Value == f.Longitude.Value);
        }


        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign#Polyfill
        public sign(x: number): number 
        {
            return (<number><any>(x > 0) - <number><any>(x < 0)) || +x;
        }


        // public DistanceTo(destination: Position): Distance { return this.DistanceTo(destination, Ellipsoid.Wgs1984); }


        /// <summary>
        /// Returns the distance over land from the given starting point to the specified
        /// destination.
        /// </summary>
        /// <param name="destination">The ending point of a segment.</param>
        /// <param name="ellipsoid">The model of the Earth to use for the distance calculation.</param>
        /// <returns>A <strong>Distance</strong> object containing the calculated distance in
        /// kilometers.</returns>
        /// <overloads>Calculates the great circle distance between any two points on
        /// Earth using a specific model of Earth's shape.</overloads>
        /// <remarks>This method uses trigonometry to calculate the Great Circle (over Earth's curved
        /// surface) distance between any two points on Earth. The distance is returned in
        /// kilometers but can be converted to any other unit type using methods in the
        /// <see cref="Distance">Distance</see>
        /// class.</remarks>
        public DistanceTo(destination: Position, ellipsoid: Ellipsoid = Ellipsoid.Wgs1984): Distance {
            // From: http://www.mathworks.com/matlabcentral/files/8607/vdist.m

            // If positions are equivalent, return zero
            if (this.Equals(destination))
                return Distance.Empty;
            

            let goodAlpha: number = 0;
            let goodSigma: number = 0;
            let goodCos2SigmaM: number = 0;

            //            % reshape inputs
            // keepsize = size(lat1);
            // lat1=lat1(:);
            // lon1=lon1(:);
            // lat2=lat2(:);
            // lon2=lon2(:);

            // ?

            //% Input check:
            // if any(abs(lat1)>90 | abs(lat2)>90)
            //    error('Input latitudes must be between -90 and 90 degrees, inclusive.')
            // end

            // The -90 to 90 check is handled by Normalize

            //% Supply WGS84 earth ellipsoid axis lengths in meters:
            // a = 6378137; % definitionally
            // b = 6356752.31424518; % computed from WGS84 earth flattening coefficient

            let a: number = ellipsoid.EquatorialRadiusMeters;
            let b: number = ellipsoid.PolarRadiusMeters;

            //% preserve true input latitudes:
            // lat1tr = lat1;
            // lat2tr = lat2;

            // double lat1tr = pLatitude.DecimalDegrees;
            // double lat2tr = destination.Latitude.DecimalDegrees;

            //% convert inputs in degrees to radians:
            // lat1 = lat1 * 0.0174532925199433;
            // lon1 = lon1 * 0.0174532925199433;
            // lat2 = lat2 * 0.0174532925199433;
            // lon2 = lon2 * 0.0174532925199433;

            // Convert inputs into radians
            let lat1: number = this.Latitude.Normalize().ToRadians().Value;
            let lon1: number = this.Longitude.Normalize().ToRadians().Value;
            let lat2: number = destination.Latitude.Normalize().ToRadians().Value;
            let lon2: number = destination.Longitude.Normalize().ToRadians().Value;

            //% correct for errors at exact poles by adjusting 0.6 millimeters:
            // kidx = abs(pi/2-abs(lat1)) < 1e-10;
            // if any(kidx);
            //    lat1(kidx) = sign(lat1(kidx))*(pi/2-(1e-10));
            // end

            // Correct for errors at exact poles by adjusting 0.6mm
            if (Math.abs(Math.PI * 0.5 - Math.abs(lat1)) < 1E-10) {
                lat1 = this.sign(lat1) * (Math.PI * 0.5 - 1E-10);
            }

            // kidx = abs(pi/2-abs(lat2)) < 1e-10;
            // if any(kidx)
            //    lat2(kidx) = sign(lat2(kidx))*(pi/2-(1e-10));
            // end

            if (Math.abs(Math.PI * 0.5 - Math.abs(lat2)) < 1E-10) {
                lat2 = this.sign(lat2) * (Math.PI * 0.5 - 1E-10);
            }

            // f = (a-b)/a;

            let f: number = ellipsoid.Flattening;

            // U1 = atan((1-f)*tan(lat1));

            let u1: number = Math.atan((1 - f) * Math.tan(lat1));

            // U2 = atan((1-f)*tan(lat2));

            let u2A: number = Math.atan((1 - f) * Math.tan(lat2));

            // lon1 = mod(lon1, 2*pi);

            lon1 = lon1 % (2 * Math.PI);

            // lon2 = mod(lon2, 2*pi);

            lon2 = lon2 % (2 * Math.PI);

            // L = abs(lon2-lon1);

            let l: number = Math.abs(lon2 - lon1);

            // kidx = L > pi;
            // if any(kidx)
            //    L(kidx) = 2*pi - L(kidx);
            // end

            if (l > Math.PI) {
                l = 2.0 * Math.PI - l;
            }

            // lambda = L;

            let lambda: number = l;

            // lambdaold = 0*lat1;

            // itercount = 0;

            let itercount: number = 0;

            // notdone = logical(1+0*lat1);

            let notdone: boolean = true;

            // alpha = 0*lat1;

            // sigma = 0*lat1;

            // cos2sigmam = 0*lat1;

            // C = 0*lat1;

            // warninggiven = logical(0);

            // bool warninggiven = false;

            // while any(notdone)  % force at least one execution

            while (notdone) {
                //    %disp(['lambda(21752) = ' num2str(lambda(21752), 20)]);
                //    itercount = itercount+1;

                itercount++;

                //    if itercount > 50

                if (itercount > 50) {
                    //        if ~warninggiven

                    // if (!warninggiven)
                    //{
                    //    //            warning(['Essentially antipodal points encountered. ' ...
                    //    //                'Precision may be reduced slightly.']);

                    //    warninggiven = true;
                    //    throw new WarningException("Distance calculation accuracy may be reduced because the two endpoints are antipodal.");
                    //}

                    //        end
                    //        lambda(notdone) = pi;

                    // lambda = Math.PI;

                    //        break

                    break;

                    //    end
                }

                //    lambdaold(notdone) = lambda(notdone);

                let lambdaold: number = lambda;

                //    sinsigma(notdone) = sqrt((cos(U2(notdone)).*sin(lambda(notdone)))...
                //        .^2+(cos(U1(notdone)).*sin(U2(notdone))-sin(U1(notdone)).*...
                //        cos(U2(notdone)).*cos(lambda(notdone))).^2);

                let sinsigma: number = Math.sqrt(Math.pow((Math.cos(u2A) * Math.sin(lambda)), 2)
                    + Math.pow((Math.cos(u1) * Math.sin(u2A) - Math.sin(u1) *
                        Math.cos(u2A) * Math.cos(lambda)), 2));

                //    cossigma(notdone) = sin(U1(notdone)).*sin(U2(notdone))+...
                //        cos(U1(notdone)).*cos(U2(notdone)).*cos(lambda(notdone));

                let cossigma: number = Math.sin(u1) * Math.sin(u2A) +
                    Math.cos(u1) * Math.cos(u2A) * Math.cos(lambda);

                //    % eliminate rare imaginary portions at limit of numerical precision:
                //    sinsigma(notdone)=real(sinsigma(notdone));
                //    cossigma(notdone)=real(cossigma(notdone));

                // Eliminate rare imaginary portions at limit of numerical precision:
                // ?

                //    sigma(notdone) = atan2(sinsigma(notdone), cossigma(notdone));

                let sigma: number = Math.atan2(sinsigma, cossigma);

                //    alpha(notdone) = asin(cos(U1(notdone)).*cos(U2(notdone)).*...
                //        sin(lambda(notdone))./sin(sigma(notdone)));

                let alpha: number = Math.asin(Math.cos(u1) * Math.cos(u2A) *
                    Math.sin(lambda) / Math.sin(sigma));

                //    cos2sigmam(notdone) = cos(sigma(notdone))-2*sin(U1(notdone)).*...
                //        sin(U2(notdone))./cos(alpha(notdone)).^2;

                let cos2SigmaM: number = Math.cos(sigma) - 2.0 * Math.sin(u1) *
                    Math.sin(u2A) / Math.pow(Math.cos(alpha), 2);

                //    C(notdone) = f/16*cos(alpha(notdone)).^2.*(4+f*(4-3*...
                //        cos(alpha(notdone)).^2));

                let c: number = f / 16 * Math.pow(Math.cos(alpha), 2) * (4 + f * (4 - 3 *
                    Math.pow(Math.cos(alpha), 2)));

                //    lambda(notdone) = L(notdone)+(1-C(notdone)).*f.*sin(alpha(notdone))...
                //        .*(sigma(notdone)+C(notdone).*sin(sigma(notdone)).*...
                //        (cos2sigmam(notdone)+C(notdone).*cos(sigma(notdone)).*...
                //        (-1+2.*cos2sigmam(notdone).^2)));

                lambda = l + (1 - c) * f * Math.sin(alpha)
                    * (sigma + c * Math.sin(sigma) *
                        (cos2SigmaM + c * Math.cos(sigma) *
                            (-1 + 2 * Math.pow(cos2SigmaM, 2))));

                //    %disp(['then, lambda(21752) = ' num2str(lambda(21752), 20)]);
                //    % correct for convergence failure in the case of essentially antipodal
                //    % points

                // Correct for convergence failure in the case of essentially antipodal points

                //    if any(lambda(notdone) > pi)

                if (lambda > Math.PI) {
                    //        if ~warninggiven

                    // if (!warninggiven)
                    //{
                    //    //            warning(['Essentially antipodal points encountered. ' ...
                    //    //                'Precision may be reduced slightly.']);

                    //    warninggiven = true;
                    //    throw new WarningException("Distance calculation accuracy may be reduced because the two endpoints are antipodal.");
                    //}

                    //        end

                    //        lambdaold(lambda>pi) = pi;

                    lambdaold = Math.PI;

                    //        lambda(lambda>pi) = pi;

                    lambda = Math.PI;

                    //    end
                }

                //    notdone = abs(lambda-lambdaold) > 1e-12;

                notdone = Math.abs(lambda - lambdaold) > Position.TARGET_ACCURACY;

                // end

                // notice In some cases "alpha" would return a "NaN".  If values are healthy,
                // remember them so we get a good distance calc.
                if (!isNaN(alpha)) {
                    goodAlpha = alpha;
                    goodSigma = sigma;
                    goodCos2SigmaM = cos2SigmaM;
                }

                // Allow other threads some breathing room
                // System.Threading.Thread.Sleep(0);
            }

            // u2 = cos(alpha).^2.*(a^2-b^2)/b^2;

            let u2: number = Math.pow(Math.cos(goodAlpha), 2) * (Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(b, 2);

            // A = 1+u2./16384.*(4096+u2.*(-768+u2.*(320-175.*u2)));

            let aa: number = 1 + u2 / 16384 * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));

            // B = u2./1024.*(256+u2.*(-128+u2.*(74-47.*u2)));

            let bb: number = u2 / 1024 * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));

            // deltasigma = B.*sin(sigma).*(cos2sigmam+B./4.*(cos(sigma).*(-1+2.*...
            //    cos2sigmam.^2)-B./6.*cos2sigmam.*(-3+4.*sin(sigma).^2).*(-3+4*...
            //    cos2sigmam.^2)));

            let deltasigma: number = bb * Math.sin(goodSigma) * (goodCos2SigmaM + bb / 4 * (Math.cos(goodSigma) * (-1 + 2 *
                Math.pow(goodCos2SigmaM, 2)) - bb / 6 * goodCos2SigmaM * (-3 + 4 * Math.pow(Math.sin(goodSigma), 2)) * (-3 + 4 *
                    Math.pow(goodCos2SigmaM, 2))));

            // varargout{1} = reshape(b.*A.*(sigma-deltasigma), keepsize);
            let s: number = b * aa * (goodSigma - deltasigma);

            // Return the Distance in meters
            return new Distance(s, DistanceUnit.Meters).ToLocalUnitType();
        }


        public DistanceToApproximation(destination: Position, ellipsoid: Ellipsoid, isApproximated: boolean): Distance {
            //// Make sure the destination isn't null
            // if (destination == null)
            //    throw new ArgumentNullException("destination", "The Position.DistanceTo method requires a non-null destination parameter.");

            // If they want the high-speed formula, use it
            if (!isApproximated)
                return this.DistanceTo(destination, ellipsoid);

            // The ellipsoid cannot be null
            if (ellipsoid == null)
                throw new Error("ellipsoid - Resources.Position_DistanceTo_Null_Ellipsoid");

            // Dim AdjustedDestination As Position = destination.ToDatum(Datum)
            // USING THE FORMULA FROM:
            //$lat1 = deg2rad(28.5333);
            let lat1: number = this.Latitude.ToRadians().Value;
            //$lat2 = deg2rad(31.1000);
            let lat2: number = destination.Latitude.ToRadians().Value;
            //$long1 = deg2rad(-81.3667);
            let long1: number = this.Longitude.ToRadians().Value;
            //$long2 = deg2rad(121.3667);
            let long2: number = destination.Longitude.ToRadians().Value;
            //$dlat = abs($lat2 - $lat1);
            let dlat: number = Math.abs(lat2 - lat1);
            //$dlong = abs($long2 - $long1);
            let dlong: number = Math.abs(long2 - long1);
            //$l = ($lat1 + $lat2) / 2;
            let l: number = (lat1 + lat2) * 0.5;
            //$a = 6378;
            let a: number = ellipsoid.EquatorialRadius.ToKilometers().Value;
            //$b = 6357;
            let b: number = ellipsoid.PolarRadius.ToKilometers().Value;
            //$e = sqrt(1 - ($b * $b)/($a * $a));
            let e: number = Math.sqrt(1 - (b * b) / (a * a));
            //$r1 = ($a * (1 - ($e * $e))) / pow((1 - ($e * $e) * (sin($l) * sin($l))), 3/2);
            let r1: number = (a * (1 - (e * e))) / Math.pow((1 - (e * e) * (Math.sin(l) * Math.sin(l))), 3 * 0.5);
            //$r2 = $a / sqrt(1 - ($e * $e) * (sin($l) * sin($l)));
            let r2: number = a / Math.sqrt(1 - (e * e) * (Math.sin(l) * Math.sin(l)));
            //$ravg = ($r1 * ($dlat / ($dlat + $dlong))) + ($r2 * ($dlong / ($dlat + $dlong)));
            let ravg: number = (r1 * (dlat / (dlat + dlong))) + (r2 * (dlong / (dlat + dlong)));
            //$sinlat = sin($dlat / 2);
            let sinlat: number = Math.sin(dlat * 0.5);
            //$sinlon = sin($dlong / 2);
            let sinlon: number = Math.sin(dlong * 0.5);
            //$a = pow($sinlat, 2) + cos($lat1) * cos($lat2) * pow($sinlon, 2);
            a = Math.pow(sinlat, 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(sinlon, 2);
            //$c = 2 * asin(min(1, sqrt($a)));
            let c: number = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
            //$d = $ravg * $c;
            let d: number = ravg * c;
            // If it's NaN, return zero
            if (isNaN(d)) {
                d = 0.0;
            }
            // Return a new distance
            return new Distance(d, DistanceUnit.Kilometers).ToLocalUnitType();
        }

    }


}
