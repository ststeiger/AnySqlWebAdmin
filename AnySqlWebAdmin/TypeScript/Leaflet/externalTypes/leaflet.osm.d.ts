
import * as geojson from 'geojson';


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

            }

        }

    }

}
