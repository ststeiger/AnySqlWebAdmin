var SpatialDistance;
(function (SpatialDistance) {
    var DistanceUnit;
    (function (DistanceUnit) {
        DistanceUnit[DistanceUnit["Kilometers"] = 0] = "Kilometers";
        DistanceUnit[DistanceUnit["Meters"] = 1] = "Meters";
        DistanceUnit[DistanceUnit["Centimeters"] = 2] = "Centimeters";
        DistanceUnit[DistanceUnit["NauticalMiles"] = 3] = "NauticalMiles";
        DistanceUnit[DistanceUnit["StatuteMiles"] = 4] = "StatuteMiles";
        DistanceUnit[DistanceUnit["Feet"] = 5] = "Feet";
        DistanceUnit[DistanceUnit["Inches"] = 6] = "Inches";
    })(DistanceUnit = SpatialDistance.DistanceUnit || (SpatialDistance.DistanceUnit = {}));
})(SpatialDistance || (SpatialDistance = {}));
