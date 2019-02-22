
function SpatialDistanceBetweenPlaces(lat1, lng1, lat2, lng2)
{

    var fablat = new SpatialDistance.Latitude(lat1);
    var fablng = new SpatialDistance.Longitude(lng1);

    var sglat = new SpatialDistance.Latitude(lat2);
    var sglng = new SpatialDistance.Longitude(lng2);

    var fab = new SpatialDistance.Position(fablat, fablng);
    var sg = new SpatialDistance.Position(sglat, sglng);

    var dist = fab.DistanceTo(sg);

    return dist.ToMeters().Value;
}

let lat1 = 47.552063;
let lng1 = 9.226081;
let lat2 = 47.374487;
let lng2 = 9.556946;


let distance1 = SpatialDistanceBetweenPlaces(lat1, lng1, lat2, lng2);
