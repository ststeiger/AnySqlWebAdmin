var SpatialDistance;
(function (SpatialDistance) {
    var SpeedUnit;
    (function (SpeedUnit) {
        SpeedUnit[SpeedUnit["Knots"] = 0] = "Knots";
        SpeedUnit[SpeedUnit["StatuteMilesPerHour"] = 1] = "StatuteMilesPerHour";
        SpeedUnit[SpeedUnit["KilometersPerHour"] = 2] = "KilometersPerHour";
        SpeedUnit[SpeedUnit["KilometersPerSecond"] = 3] = "KilometersPerSecond";
        SpeedUnit[SpeedUnit["FeetPerSecond"] = 4] = "FeetPerSecond";
        SpeedUnit[SpeedUnit["MetersPerSecond"] = 5] = "MetersPerSecond";
    })(SpeedUnit = SpatialDistance.SpeedUnit || (SpatialDistance.SpeedUnit = {}));
})(SpatialDistance || (SpatialDistance = {}));
