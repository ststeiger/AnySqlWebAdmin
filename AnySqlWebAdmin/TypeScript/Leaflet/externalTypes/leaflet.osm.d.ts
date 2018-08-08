
import * as geojson from 'geojson';


// https://github.com/openstreetmap/leaflet-osm/blob/master/leaflet-osm.js
// https://github.com/openstreetmap/leaflet-osm
// https://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/


declare global
{

    namespace L
    {
        
        export namespace OSM
        {
            export class DataLayer
                extends L.Layer
            {
                constructor(xml: any);

                getBounds(): LatLngBounds;

            } // End Class DataLayer 

        } // End namespace OSM 

    } // End namespace L 

}
