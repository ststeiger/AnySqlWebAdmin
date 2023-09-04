
'use strict';
// BlueMine => maps.ts

// import * as L from "./externalTypes/leaflet";


// declare global {

interface IPortalSession
{
    ID: () => string;
}

interface IPortalGlobal
{
    spreadMessage: (object: any) => void;
    receiveMessage: (event: MessageEvent) => void;
}

interface IFrameset
{
    focusFrameByWindow: (window: any) => void;
}

interface IPortal
{
    basicLink: string;
    Session: IPortalSession;
    Global: IPortalGlobal;
    Frameset: IFrameset;
}

interface ISettings
{
    basicLink: string;
}

interface Window
{
    Settings: ISettings;
    Portal: IPortal;
}


interface Math
{
    trunc: (x: number) => number;
    radians: (x: number) => number;
}


// interface Function { name: string; }


// }

// export module maps {


// declare let Portal: any;


interface IMapWithZoom 
{
    zoomHome: (homeView?: L.LatLngBoundsExpression) => void;
}


// [System.Flags]
enum RenderType_t 
{
    Default = 0,                        // 0000000000
    Indented = 1, // 1 << 0             // 0000000001
    DataTable = 2, // 1 << 1            // 0000000010
    Array = 4, // 1 << 2                // 0000000100
    Data_Only = 8, // 1 << 3            // 0000001000
    Columns_Associative = 16, // 1 << 4 // 0000010000
    Columns_ObjectArray = 32, // 1 << 5 // 0000100000
    WithDetail = 64,  // 1 << 6         // 0000100000
    ShortName = 128,  // 1 << 7         // 0001000000
    LongName = 256,  // 1 << 8          // 0010000000
    AssemblyQualifiedName = 512, // 1<<9// 0100000000
    All = ~(~0 << 10)                   // 1111111111
}




class BaseError
{
    constructor()
    {
        Error.apply(this, arguments);
    }
}


BaseError.prototype = new Error();



class HttpRequestError extends BaseError
{
    constructor(public status: number, public message: string)
    {
        super();
    }
}


// https://gist.github.com/WebReflection/5593554
// https://gist.github.com/edoardocavazza/47246856759f2273e48b
interface Object
{
    // Object.setPrototypeOf() is in ECMAScript 2015 
    setPrototypeOf(obj: any, prototype: any): any;
}



// https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript
class ApplicationOfflineError extends Error
{
    constructor(m: string)
    {
        super(m);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApplicationOfflineError.prototype);
    }

    sayHello()
    {
        return "hello " + this.message;
    }
}








// https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/

// https://stackoverflow.com/questions/14339313/what-is-the-smallest-amd-loader-to-date
// https://github.com/MaxMotovilov/eeMD
// https://github.com/TikiTDO/ultralight_amd



// https://code4developers.com/spread-syntax-in-javascript/
// distinct: console.log([...new Set([1, 2, 3, 4, 5, 1, 3, 2, 7])])
// [...document.querySelectorAll("span")] // not in iCrap or IE
// Array.from(document.querySelectorAll('div')) // more browser-support 
// https://execsqlformat.herokuapp.com/


function checkData()
{
    let sql = `
-- SELECT 
-- 	 T_AP_Ref_AnlageKategorie.AK_UID 
-- 	,T_AP_Ref_AnlageKategorie.AK_Code 
-- 	,T_AP_Ref_AnlageKategorie.AK_Lang_DE 
-- 	,T_AP_Ref_AnlageKategorie.AK_AK_UID 
-- FROM T_AP_Ref_AnlageKategorie 
-- WHERE T_AP_Ref_AnlageKategorie.AK_Status = 1 
-- AND T_AP_Ref_AnlageKategorie.AK_LANG_DE LIKE '%werbe%' 


SELECT 
	 T_AP_Anlage.AL_UID
	,T_AP_Anlage.AL_AK_UID
	,T_AP_Anlage.AL_ApertureKey
	,T_AP_Anlage.AL_Nr
	,T_AP_Anlage.AL_GM_Lat
	,T_AP_Anlage.AL_GM_Lng
	,T_AP_Anlage.AL_GM_SVLat
	,T_AP_Anlage.AL_GM_SVLng
	  
	,T_AP_Anlage.AL_BE_ID
	,T_AP_Anlage.AL_AL_UID
	,T_AP_Anlage.AL_RM_UID
	,T_AP_Anlage.AL_ADR_UID
	,T_AP_Anlage.AL_GS_UID
	,T_AP_Anlage.AL_GB_UID
	,T_AP_Anlage.AL_SO_UID
	,T_AP_Anlage.AL_BKP_UID
FROM T_AP_Anlage
WHERE (1=1) 
-- AND T_AP_Anlage.AL_Status = 1 
-- AND CURRENT_TIMESTAMP BETWEEN T_AP_Anlage.AL_DatumVon AND T_AP_Anlage.AL_DatumBis 
AND T_AP_Anlage.AL_AK_UID = 'ED49E68B-AB6A-4FAC-93B4-B1507E9FDB68'
;

/*
DELETE FROM T_COR_ZO_ObjektRechte_Lesen 
WHERE (CAST(ZO_OBJR_OBJ_UID AS varchar(36)) + ZO_OBJR_OBJ_OBJT_Code) IN 
(
	SELECT CAST(T_COR_Objekte.OBJ_UID AS varchar(36)) +  T_COR_Objekte.OBJ_OBJT_Code 
	FROM T_COR_Objekte 
	WHERE T_COR_Objekte.OBJ_AL_UID IN 
	(SELECT T_AP_Anlage.AL_UID FROM T_AP_Anlage WHERE (1=1) AND T_AP_Anlage.AL_AK_UID = 'ED49E68B-AB6A-4FAC-93B4-B1507E9FDB68') 
); 

DELETE FROM T_COR_Objekte WHERE T_COR_Objekte.OBJ_AL_UID IN 
(
	SELECT T_AP_Anlage.AL_UID FROM T_AP_Anlage WHERE (1=1) AND T_AP_Anlage.AL_AK_UID = 'ED49E68B-AB6A-4FAC-93B4-B1507E9FDB68'
); 

DELETE FROM T_AP_Anlage WHERE (1=1) AND T_AP_Anlage.AL_AK_UID = 'ED49E68B-AB6A-4FAC-93B4-B1507E9FDB68';
*/

`;

}


// let url = "http://localhost:59799/sql?sql=Maps.Gebaeudekategorie.sql&BE_Hash=12435&format=" + badDataTable.toString();
async function getData(url: string, data?: any)
{
    if (url == null)
    {
        throw Error("URL is NULL...");
    }


    // https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events
    // window.addEventListener('online', updateOnlineStatus);
    // window.addEventListener('offline', updateOnlineStatus);
    // https://caniuse.com/#feat=online-status // it doesn't work on Android's WebView...
    if (!navigator.onLine)
    {
        // throw new Error("offline");
        // throw new ApplicationOfflineError("msg");
        throw new HttpRequestError(500, 'Client offline');
        // if (error instanceof ApplicationOfflineError) { console.log(error.sayHello(); }
    }


    let prettyDataTable = RenderType_t.Indented | RenderType_t.DataTable;
    let prettyBadDataTable = RenderType_t.Columns_Associative | RenderType_t.Indented;
    let badDataTable = RenderType_t.Columns_Associative;

    if (url.indexOf("?") != -1)
        url += "&format=" + prettyBadDataTable;
    else
        url += "?format=" + prettyBadDataTable;

    if (url.indexOf("no_cache") == -1)
        url += "&no_cache=" + (new Date()).getTime();

    let req: Response = null;
    let json: string = null;
    let obj: any = null;
    let ex1: any = null;
    let ex2: any = null;
    let ex3: any = null;

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Headers
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("cache-control", "no-cache");
    // myHeaders.append("Upgrade-Insecure-Requests", "1");


    // https://stackoverflow.com/questions/37668282/unable-to-fetch-post-without-no-cors-in-header

    // https://davidwalsh.name/fetch
    let options: any = {
        "method": "POST",
        // "headers": { 'auth': '1234','content-type': 'application/json'},
        // https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
        // "headers": new Headers({ 'content-type': 'application/json' })
        // "headers": { "Content-Type": "application/json" } 
        // "headers": new Headers({ 'Content-Type': 'application/json' }) 
        // "headers": { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        // "headers": new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }), 
        "headers": myHeaders
        // ,"mode": "no-cors" 
        , credentials: 'same-origin' // the default would be same-origin, but there's an exciting Edge-bug ...
        , "body": <any>null
    };


    if (data != null)
    {
        if (typeof data === 'string' || data instanceof String)
            options["body"] = data;
        else
            options["body"] = JSON.stringify({ "id": 123 });
    }

    try
    {
        // let result = <any>await fetch(url, options).then(function (response) { return response.json(); });
        req = await fetch(url, options);
    }
    catch (ex)
    {
        console.log(ex);
        ex1 = ex;
    }

    try
    {
        if (req != null)
            json = await req.text();
    }
    catch (ex)
    {
        console.log(ex);
        ex2 = ex;
    }

    try
    {
        // req.json();
        obj = JSON.parse(json);
    }
    catch (ex)
    {
        ex3 = ex;
        console.log(ex);
    }


    if (obj == null)
    {
        throw new HttpRequestError(500, 'Server Error');
    }

    // console.log(obj);
    return obj;
}




let ignoreThisNavigation = false;
let map: L.Map & IMapWithZoom = null;
let polygons: any = [];
let markers: any = [];
let werbetafeln: any = [];




function polyFills()
{
    let debug_ipad = false;
    if (debug_ipad)
    {
        window.onerror = function (messageOrEvent, source, lineno, colno, error)
        {
            alert(messageOrEvent);
            if (source != null)
                alert(source);
        }
    } // End if (debug_ipad) 


    Math.trunc = Math.trunc || function (x)
    {
        let n = x - x % 1;
        return n === 0 && (x < 0 || (x === 0 && (1 / x !== 1 / 0))) ? -0 : n;
    };

    Math.radians = function (degrees)
    {
        return degrees * Math.PI / 180.0;
    };



    if (!Array.prototype.filter)
    {

        Array.prototype.filter = function (func: Function, thisArg?: any)
        {
            'use strict';
            if (!((typeof func === 'function') && this))
                throw new TypeError();

            let len = this.length >>> 0,
                res = new Array(len), // preallocate array
                t = this, c = 0, i = -1;

            if (thisArg === undefined)
            {
                while (++i !== len)
                {
                    // checks to see if the key was set
                    if (i in this)
                    {
                        if (func(t[i], i, t))
                        {
                            res[c++] = t[i];
                        }
                    }
                }
            }
            else
            {
                while (++i !== len)
                {
                    // checks to see if the key was set
                    if (i in this)
                    {
                        if (func.call(thisArg, t[i], i, t))
                        {
                            res[c++] = t[i];
                        }
                    }
                }
            }

            res.length = c; // shrink down array to proper size
            return res;
        };
    }


    // Polyfill for Function#name on browsers that do not support it (IE 11):
    if (!(function f() { }).name)
    {
        Object.defineProperty(Function.prototype, 'name', {
            get: function ()
            {
                let name = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
                // For better performance only parse once, and then cache the
                // result through a new accessor for repeated access.
                Object.defineProperty(this, 'name', { value: name });
                return name;
            }
        });
    } // End if (!(function f() { }).name) 

} // End Function polyFills 


function SetDefaultVariables(url: string)
{
    if (window.parent.Settings)
    {
        url = url.replace("{@basic}", window.parent.Settings.basicLink);
    }

    if (window.top && window.top.Portal && window.top.Portal.Session && window.top.Portal.Session.ID)
    {
        url = url.replace("{@BE_Hash}", window.top.Portal.Session.ID());
    }
    else
        url = url.replace("{@BE_Hash}", "200CEB26807D6BF99FD6F4F0D1CA54D4");

    return url;
} // End Function SetDefaultVariables 


function spreadMessage(object: any)
{
    let inFrame = (function ()
    {
        try
        {
            return window.self !== window.top;
        } catch (e)
        {
            return true;
        }
    })();
    console.log("inFrame", inFrame);

    if (inFrame)
    { 
        window.top.Portal.Global.spreadMessage(object);
    }
    else
    {
        //window.postMessage(JSON.stringify({ "msg": "Hello world" }), '*');
        window.postMessage(JSON.stringify(object), '*');
    }
} // End Function spreadMessage 


function bracketDevicePixelRatio()
{
    let brackets = [1, 1.3, 1.5, 2, 2.6, 3],
        baseRatio = window.devicePixelRatio || 1;

    for (let i = 0; i < brackets.length; i++)
    {
        let scale = brackets[i];
        if (scale >= baseRatio || (baseRatio - scale) < 0.1)
        {
            return scale;
        }
    }

    return brackets[brackets.length - 1];
} // End Function bracketDevicePixelRatio


function testNaviSO()
{
    let msg =
        {
            "Action": "VWS.Tree.onAfterSelectionChange"
            , "Param": {
                "Action": ""
                , "Data": {
                    "Type": "SO"
                    , "Value": "c38860a1-1c61-4590-9410-9fa1ab8586b1"
                    , "Text": "0006 Althardstrasse"
                    , "Parent": "31bfa452-e97d-475a-ac65-cf4d885fcd5c"
                    , "ApertureObjID": "0000000002GQ0000C2"
                    , "_hasPRT": 1
                    , "_hasInsert": 1
                    , "_hasDelete": 1
                }
            }
        };

    spreadMessage(msg);
} // End Function testNaviSO 


function testNaviGB()
{
    let msg =
        {
            "Action": "VWS.Tree.onAfterSelectionChange",
            "Param": {
                "Action": "",
                "Data": {
                    "Type": "GB",
                    "Value": "e79223ff-02a8-4a7a-b148-e1fbafa8d934",
                    "Text": "GB01 Althardstrasse 10",
                    "Background": "#00FF00",
                    "Parent": "c38860a1-1c61-4590-9410-9fa1ab8586b1",
                    "ApertureObjID": "0000000002GQ0000FQ",
                    "_hasPRT": 1,
                    "_hasInsert": 1,
                    "_hasDelete": 1
                }
            }
        }
        ;

    spreadMessage(msg);
} // End Function testNaviGB 


function testFilterChange()
{
    let msg =
        {
            "Action": "VWS.Tree.onAfterFilterChange",
            "Param": {
                "Datum": "",
                "LD": "",
                "RG": "",
                "ORT": ""
            }
        }
        ;

    spreadMessage(msg);
} // End Function testFilterChange 


function navigateTo(uuid: string)
{
    spreadMessage(
        {
            Action: 'vws.tree.navigateto',
            Param: {
                navigateTo: uuid // '9dc95c1c-4830-4b01-85b5-593b6ea5e44b'
            }
        }
    );
} // End Function navigateTo 


// https://gis.stackexchange.com/a/816/3997
// https://jsfiddle.net/xwaocc00/
function polygonAreaOld(poly2: Number[]): string 
{
    let area = 0.0;
    let poly = JSON.parse(JSON.stringify(poly2));
    let len = poly.length;

    for (let i = 0; i < len; i++)
    {
        poly[i] = poly[i].map(Math.radians)
    }

    if (len > 2)
    {
        for (let i = 0; i < len - 1; i++)
        {
            let p1 = poly[i];
            let p2 = poly[i + 1];

            area += (p2[0] - p1[0]) *
                (
                    2
                    + Math.sin(p1[1])
                    + Math.sin(p2[1])
                );
        } // Next i 

        // https://en.wikipedia.org/wiki/Earth_radius#Equatorial_radius
        // https://en.wikipedia.org/wiki/Earth_ellipsoid
        // The radius you are using, 6378137.0 m corresponds to the equatorial radius of the Earth.
        // let equatorial_radius = 6378137; // m
        // let polar_radius = 6356752.3142; // m
        let mean_radius = 6371008.8; // m
        // let authalic_radius = 6371007.2; // m (radius of perfect sphere with same surface as reference ellipsoid)
        // let volumetric_radius = 6371000.8 // m (radius of a sphere of volume equal to the ellipsoid)

        let radius = mean_radius;

        area = area * radius * radius / 2.0;
    } // End if len > 0

    // equatorial_radius: 6391.565558418869 m2
    // mean_radius:       6377.287126172337m2
    // authalic_radius:   6377.283923019292 m2
    // volumetric_radius: 6377.271110415153 m2
    // merid_radius:      6375.314923754325 m2
    // polar_radius:      6348.777989748668 m2
    // R:                 6368.48180842528 m2
    // hrad:              6391.171919886588 m2

    // http://postgis.net/docs/doxygen/2.2/dc/d52/geography__measurement_8c_a1a7c48d59bcf4ed56522ab26c142f61d.html
    // ST_Area(g)               5.21556075001092E-07
    // ST_Area(g, false)     6379.25032051953
    // ST_Area(g, true)      6350.65051177517

    // return area;
    // return area.toFixed(2);
    return Math.abs(area).toFixed(0);
} // End Function polygonArea 



// https://gis.stackexchange.com/a/816/3997
// https://jsfiddle.net/xwaocc00/
function polygonArea(poly2: L.LatLng[]): number  
{
    let area: number = 0.0;
    let poly: L.LatLng[] = [];

    // Don't override the original array... 
    for (let q = 0; q < poly2.length; ++q)
    {
        poly.push(
            new L.LatLng(
                Math.radians(poly2[q].lat)
                , Math.radians(poly2[q].lng)
            )
        );
    } // Next q

    // Ensure polygon is closed... 
    if (poly[0].lat != poly[poly.length - 1].lat || poly[0].lng != poly[poly.length - 1].lng)
    {
        poly.push(new L.LatLng(
            poly[0].lat
            , poly[0].lng
        ));
    } // End if (poly[0].lat != poly[poly.length - 1].lat || poly[0].lng != poly[poly.length - 1].lng) 

    let len: number = poly.length;
    for (let i = 0; i < len; i++)
    {

        if (len > 2)
        {

            for (i = 0; i < len - 1; i++)
            {
                let p1: L.LatLng = poly[i];
                let p2: L.LatLng = poly[i + 1];

                area += (p2.lat - p1.lat) *
                    (
                        2
                        + Math.sin(p1.lng)
                        + Math.sin(p2.lng)
                    );
            } // Next i 

            // https://en.wikipedia.org/wiki/Earth_radius#Equatorial_radius
            // https://en.wikipedia.org/wiki/Earth_ellipsoid
            // The radius you are using, 6378137.0 m corresponds to the equatorial radius of the Earth.
            let equatorial_radius = 6378137; // m
            let polar_radius = 6356752.3142; // m
            let mean_radius = 6371008.8; // m
            let authalic_radius = 6371007.2; // m (radius of perfect sphere with same surface as reference ellipsoid)
            let volumetric_radius = 6371000.8; // m (radius of a sphere of volume equal to the ellipsoid)

            let radius = mean_radius;

            area = area * radius * radius / 2.0;
        } // End if len > 2 

    } // Next i 

    // equatorial_radius: 6391.565558418869 m2
    // mean_radius:       6377.287126172337m2
    // authalic_radius:   6377.283923019292 m2
    // volumetric_radius: 6377.271110415153 m2
    // merid_radius:      6375.314923754325 m2
    // polar_radius:      6348.777989748668 m2
    // R:                 6368.48180842528 m2
    // hrad:              6391.171919886588 m2

    // http://postgis.net/docs/doxygen/2.2/dc/d52/geography__measurement_8c_a1a7c48d59bcf4ed56522ab26c142f61d.html
    // ST_Area(g)               5.21556075001092E-07
    // ST_Area(g, false)     6379.25032051953
    // ST_Area(g, true)      6350.65051177517

    // return area;
    // return area.toFixed(2);
    return parseFloat(Math.abs(area).toFixed(0));
} // End Function polygonArea 



interface IGeoPoint
{
    lat: number;
    lng: number;
}

function latLongToString(latlng: IGeoPoint)
{
    let x = latlng.lat;
    let y = latlng.lng;

    let prefix1 = x < 0 ? "S" : "N";
    let prefix2 = y < 0 ? "W" : "E";

    x = Math.abs(x);
    y = Math.abs(y);

    let grad1 = Math.trunc(x);
    x = (x - grad1) * 60;
    let grad2 = Math.trunc(y);
    y = (y - grad2) * 60;

    let min1: any = Math.trunc(x);
    let min2: any = Math.trunc(y);

    let sec1: any = ((x - min1) * 60).toFixed(1);
    let sec2: any = ((y - min2) * 60).toFixed(1);

    min1 = (min1 < 10 ? "0" : "") + min1;
    min2 = (min2 < 10 ? "0" : "") + min2;

    sec1 = (sec1 < 10 ? "0" : "") + sec1;
    sec2 = (sec2 < 10 ? "0" : "") + sec2;

    let res = grad1 + "°" + min1 + "'" + sec1 + '"' + prefix1 + " " + grad2 + "°" + min2 + "'" + sec2 + '"' + prefix2;
    return res;
} // End Function latLongToString 


// PRE: x= integer - Works only with natural numbers 
function thousandSeparator(x: number | string): string
{
    if (x == null)
        return "";

    let s = x.toString();
    let i = s.indexOf(".");
    let comma = "";

    if (i != -1)
    {
        comma = s.substr(i);
        s = s.substr(0, i);
    }

    s = s.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    s += comma;

    return s;
} // End Function thousandSeparator 


interface IWerbetafelTable 
{
    uid: string;
    latitude: number;
    longitude: number;
}


async function addWerbetafel(lat: number, lng: number)
{
    map.closePopup();
    let url = "../ajax/AnySelect.ashx?sql=Maps.InsertWerbetafel.sql&lat={@lat}&lng={@lng}";
    url = SetDefaultVariables(url);
    url = url.replace("{@lat}", lat.toString());
    url = url.replace("{@lng}", lng.toString());


    let result = await getData(url);
    // console.log(result);

    let table = result.tables[0];
    // console.log(table);

    let index_uid = table.columns["OBJ_UID"].index;
    let index_latitude = table.columns["OBJ_Lat"].index;
    let index_longitude = table.columns["OBJ_Lng"].index;

    for (let i = 0; i < table.rows.length; ++i)
    {
        let uid: string = table.rows[i][index_uid];
        let latitude: number = table.rows[i][index_latitude];
        let longitude: number = table.rows[i][index_longitude];

        if (latitude == null || longitude == null)
            continue;

        let werbetafel_icon = createWerbetafelIcon();

        // let marker = L.marker([latitude, longitude]).addTo(map);
        // let marker = L.marker([latitude, longitude], { icon: werbetafel_icon }).addTo(map);
        let marker = L.marker([latitude, longitude], {
            icon: werbetafel_icon
            , draggable: true
        }).addTo(map);

        marker.on("click", onMarkerClick.bind(this, uid)); // uid is now called uuid
        marker.on("contextmenu", onMarkerContextMenu.bind(this, uid)); // uid is now called uuid
        marker.on('dragend', moveWerbetafel.bind(this, uid, marker));

        werbetafeln[uid] = marker;
    } // Next i 

} // End Function addWerbetafel 


async function moveWerbetafel(uuid: string, marker: L.Marker, event: L.LeafletEvent)
{
    console.log("move werbetafel ", uuid);
    // https://g.co/chrome/symantecpkicerts

    let position: L.LatLng = marker.getLatLng();
    marker.setLatLng(position);
    map.panTo(position);

    let url = "../ajax/AnySelect.ashx?sql=Maps.UpdateWerbetafelLocation.sql&al_uid=" + uuid + "&lat=" + position.lat + "&lng=" + position.lng;
    url = SetDefaultVariables(url);
    // TODO: SQL-Update position

    let result = null;

    try
    {
        result = await getData(url);
        console.log("finished moving werbetafel ", uuid, result);
        // console.log(result);
    }
    catch (ex)
    {
        console.log(ex);
    }

    if (map.gl) map.gl._update();
}


async function deleteWerbetafel(uuid: string)
{
    console.log("delete werbetafel ", uuid);

    //let url = "../ajax/Data.ashx?sql=Maps.DeleteWerbetafel.sql&obj_uid=" + uuid;
    let url = "../ajax/AnySelect.ashx?sql=Maps.DeleteWerbetafel.sql&obj_uid=" + uuid;
    url = SetDefaultVariables(url);

    let result = null;

    try
    {
        result = await getData(url);
        console.log("finished deleting werbetafel ", uuid);

        // console.log(result);
        werbetafeln[uuid].remove();
        delete werbetafeln[uuid];
    }
    catch (ex)
    {
        console.log(ex);
    }

    map.closePopup();
    if (map.gl) map.gl._update();
} // End Function deleteWerbetafel 


// https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
function getParamNames(func: Function): RegExpMatchArray
{
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;

    let fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = <RegExpMatchArray><any>[];

    return result;
} // End Function getParamNames 


function logParams(args: IArguments)
{
    let pn = getParamNames(args.callee);
    let x: object & { [key: string]: any; } = {};

    for (let i = 0; i < args.length; ++i)
    {
        if (i >= pn.length)
            x["arg[" + (i + 1).toString() + "]"] = args[i];
        else
            x[pn[i]] = args[i];
    }

    function resolveCaller(a: Function): string
    {
        if (a == null)
            return "'window/global'";

        if (a.name != null && a.name != "")
            return a.name;

        return "'anonymous function' in " + resolveCaller(a.caller);
    }

    // console.log(resolveCaller(args.callee), "called with", x);
} // End Function logParams 


function onMarkerContextMenu(uuid: string, e: L.LeafletMouseEvent) // uid is now called uuid
{
    // console.log("onMarkerContextMenu", e)
    // e.originalEvent.target.parentElement.remove()
    // e.target._leaflet_id

    function addPosition(latlng: L.LatLng)
    {
        return ' data-position="' + latlng.lat + ' ' + latlng.lng + '" ';
    }

    let container = <HTMLElement><any>document.createDocumentFragment();
    let title = document.createElement("span");
    title.setAttribute("style", "font-weight: bold;");
    title.appendChild(document.createTextNode("Hier können Sie"));
    container.appendChild(title);
    container.appendChild(document.createElement("br"));

    let menuOption = document.createElement("a");
    menuOption.addEventListener("click", deleteWerbetafel.bind(this, uuid));

    menuOption.appendChild(document.createTextNode("eine Leuchtreklame entfernen"));
    container.appendChild(menuOption);
    // let contextMenu = container.innerHTML;
    // console.log(contextMenu);

    let popup = new L.Popup({ closeButton: true, autoClose: true })
        .setLatLng(e.latlng)
        //.setContent(contextMenu)
        .setContent(container)
        //.openOn(map)
        ;

    popup.openOn(map);
} // End Function onMarkerContextMenu 


function onMarkerClick(uuid: string, e: L.LeafletMouseEvent)
{
    let t = "{@basic}anlage.aspx?uid={@obj}&muid=AL&env=ov&ro=false&proc={@BE_Hash}";
    t = SetDefaultVariables(t);
    // console.log(t);
    // navigateTo(uuid);

    let ml = <HTMLIFrameElement>window.parent.document.querySelector('#frameDWGForm');
    if (ml) ml.src = t.replace("{@obj}", uuid);

    observeIframe();
} // End Function onMarkerClick 



async function onMarkerMove(uuid: string, marker: L.Marker, event: L.LeafletEvent)
{
    console.log("moving marker ", uuid);
    // https://g.co/chrome/symantecpkicerts

    let position: L.LatLng = marker.getLatLng();
    marker.setLatLng(position);
    map.panTo(position);

    let url = "../ajax/AnySelect.ashx?sql=Maps.UpdateMarkerLocation.sql&gb_uid=" + uuid + "&lat=" + position.lat + "&lng=" + position.lng;
    url = SetDefaultVariables(url);
    // TODO: SQL-Update position

    let result = null;

    try
    {
        result = await getData(url);
        console.log("finished moving marker ", uuid, result);
        // console.log(result);
    }
    catch (ex)
    {
        console.log(ex);
    }
}



function createWerbetafelIcon()
{
    let icon = L.divIcon(
        {
            className: "customIcon",
            iconAnchor: [12, 12],
            popupAnchor: [0, 0],
            html: "<img src=\"../leaflet/images/helvetia23.png\" />"
        }
    );

    return icon;
} // End Function createWerbetafelIcon 


interface IWerbetafelMarkerTable
{
    uid: string;
    latitude: number;
    longitude: number;
}


async function loadWerbetafeln()
{
    let url = "../ajax/AnySelect.ashx?sql=Maps.Marker_Werbetafeln.sql";
    url = SetDefaultVariables(url);

    let result = await getData(url);
    // console.log("loadWerbetafeln: success");

    let table = result.tables[0];
    // console.log(table);

    let index_uid: string = table.columns["OBJ_UID"].index;
    let index_latitude: number = table.columns["OBJ_Lat"].index;
    let index_longitude: number = table.columns["OBJ_Lng"].index;

    for (let i = 0; i < table.rows.length; ++i)
    {
        let uid = table.rows[i][index_uid];
        let latitude = table.rows[i][index_latitude];
        let longitude = table.rows[i][index_longitude];

        if (latitude == null || longitude == null)
            continue;

        let werbetafel_icon = createWerbetafelIcon();

        // let marker = L.marker([latitude, longitude]).addTo(map);
        // let marker = L.marker([latitude, longitude], { icon: werbetafel_icon });

        let marker = L.marker([latitude, longitude], {
            icon: werbetafel_icon
            , draggable: true
        });

        if (map.getZoom() > 16)
        {
            marker.addTo(map);
        }

        marker.on("click", onMarkerClick.bind(this, uid)); // uid is now called uuid
        marker.on("contextmenu", onMarkerContextMenu.bind(this, uid)); // uid is now called uuid
        marker.on('dragend', moveWerbetafel.bind(this, uid, marker));
        werbetafeln[uid] = marker;
    } // Next i

    if (map.gl) map.gl._update();
} // End Function loadWerbetafeln 



async function onWerbetafelChange()
{
    for (let uid in werbetafeln)
    {
        if (werbetafeln.hasOwnProperty(uid))
        {
            werbetafeln[uid].remove();
            delete werbetafeln[uid];
        }
    } // Next uid

    await loadWerbetafeln();
} // End Function onWerbetafelChange 


// https://jsfiddle.net/Lru99de0/1/
function observeIframe()
{
    // Blocker is the element that has a changing display value
    let blocker = window.parent.document.querySelector('#frameDWGForm');
    if (blocker == null)
        return;

    let timoutHandle: number = null;
    let timoutHandle2: number = null;

    try
    {
        // Our mutation observer, which we attach to blocker later
        let observer = new MutationObserver(function (mutations)
        {
            mutations.forEach(function (mutation)
            {
                // console.log("style changed");
                let cs = window.getComputedStyle(blocker);

                if (mutation.attributeName === 'style' && cs.getPropertyValue('display') === 'none')
                {
                    window.clearTimeout(timoutHandle);
                    timoutHandle = window.setTimeout(async function ()
                    {
                        observer.disconnect();
                        window.top.Portal.Frameset.focusFrameByWindow(window);

                        // console.log("form-frame again is invisible NOW.");
                        await onWerbetafelChange();
                    }, 400);
                }

                // Was it the style attribute that changed? (Maybe a classname or other attribute change could do this too? You might want to remove the attribute condition) Is display set to 'none'?
                if (mutation.attributeName === 'style' && cs.getPropertyValue('display') !== 'none')
                {
                    window.clearTimeout(timoutHandle2);
                    timoutHandle2 = window.setTimeout(function ()
                    {
                        // console.log("form-frame is now visible.");
                    }, 400);
                }
            });
        });

        // Attach the mutation observer to blocker, and only when attribute values change
        observer.observe(blocker, { attributes: true });
    }
    catch (crapPad) { }
} // End Function observeIframe


// https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
// https://stackoverflow.com/questions/9692448/how-can-you-find-the-centroid-of-a-concave-irregular-polygon-in-javascript
// https://math.stackexchange.com/questions/3177/why-doesnt-a-simple-mean-give-the-position-of-a-centroid-in-a-polygon
function get_polygon_centroid(pts: L.LatLng[])
{
    let first = pts[0], last = pts[pts.length - 1];
    if (first.lat != last.lat || first.lng != last.lng)
        pts.push(first);

    let twicearea = 0,
        x = 0, y = 0,
        nPts = pts.length,
        p1, p2, f;

    for (let i = 0, j = nPts - 1; i < nPts; j = i++)
    {
        p1 = pts[i]; p2 = pts[j];
        f = p1.lat * p2.lng - p2.lat * p1.lng;
        twicearea += f;
        x += (p1.lat + p2.lat) * f;
        y += (p1.lng + p2.lng) * f;
    }
    f = twicearea * 3;

    // return { x: x / f, y: y / f };
    return new L.LatLng(x / f, y / f);
}


function addTextLabel(map: L.Map, poly: L.LatLng[], label: HTMLElement)
{
    let centroid = get_polygon_centroid(poly);
    label.style.display = "hidden";
    document.body.appendChild(label);
    let ow = label.offsetWidth;
    let oh = label.offsetHeight;
    label.parentElement.removeChild(label);


    let textIcon = L.divIcon(
        {
            className: "customTextIcon",
            iconSize: [ow, oh],
            iconAnchor: [ow / 2, oh / 2],
            popupAnchor: [0, 0],
            html: label.outerHTML
        }
    );

    let textMarker = L.marker(centroid, { icon: textIcon }).addTo(map);
}



function createVertexLabelDiv(i: number)
{
    let indexDiv = document.createElement("div");
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(i.toString()));
    indexDiv.appendChild(span);
    
    return indexDiv;
}


function createVertexLabels(map: L.Map, poly: L.LatLng[])
{
    for (let i = 0; i < poly.length; ++i)
    {
        var label = createVertexLabelDiv(i);
        label.style.display = "hidden";
        document.body.appendChild(label);
        let ow = label.offsetWidth;
        let oh = label.offsetHeight;
        label.parentElement.removeChild(label);

        
        let textIcon = L.divIcon(
            {
                className: "customTextIcon",
                iconSize: [ow, oh],
                iconAnchor: [ow / 2, oh / 2],
                popupAnchor: [0, 0],
                html: label.outerHTML
            }
        );

        let textMarker = L.marker(poly[i], { icon: textIcon }).addTo(map);
    }

}
    



interface IGbMarkerTable
{
    uid: string;
    code: string;
    label: string;
    latitude: number;
    longitude: number;
    category: string;
    color: string;
    polyString: string;
}


async function loadMarkers()
{
    let markerUrl = "../ajax/AnySelect.ashx?sql=Maps.Marker_GB.sql";
    markerUrl = SetDefaultVariables(markerUrl);
    // console.log("markerUrl", markerUrl);

    let result = await getData(markerUrl);
    // console.log(result);

    let table = result.tables[0];
    // console.log(table.columns);
    // console.log(table.columns["OBJ_Label"].index);

    let index_uid = table.columns["OBJ_UID"].index;
    let index_code = table.columns["OBJT_Code"].index;
    let index_label = table.columns["OBJ_Label"].index;
    let index_latitude = table.columns["OBJ_Lat"].index;
    let index_longitude = table.columns["OBJ_Long"].index;
    let index_category = table.columns["OBJ_Kategorie"].index;
    let index_color = table.columns["OBJ_Color"].index;
    let index_poly = table.columns["OBJ_Polygon"].index;

    let allCoords: L.LatLng[] = [];

    // Singapur
    // table.rows.push(["uid", "code", "label", 1.345733633103394 , 103.83649706840517, null ]);


    // let markerHtmlStyles = "background-color: #583470;\n  width: 16px;\n  height: 16px;\n  display: block;\n  left: -8px;\n  top: -8px;\n  position: relative;\n  border-radius: 16px 16px 0;\n transform: rotate(45deg); \n  border: 1px solid #FFFFFF";
    // let markerHtmlStyles = "background-color: #583470;\n  width: 16px;\n  height: 16px;\n  display: block;\n  left: -8px;\n  top: -8px;\n  position: relative;\n  border-radius: 16px 16px 0;\n transform: rotate(45deg); \n  border: 1px solid #FFFFFF";
    let markerHtmlStyles = "display: block; margin-left: -15px; margin-top: -15px; width: 0; \n  height: 0; \n  border-left: 20px solid transparent;\n  border-right: 20px solid transparent;\n  \n  border-top: 20px solid #f00;\n  ";


    let options = {
        iconUrl: 'marker-icon.png',
        iconRetinaUrl: 'marker-icon-2x.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 411],
        iconAnchor: [12, 41],
        popupAnchor: [1, -120],
        tooltipAnchor: [16, -228],
        shadowSize: [41, 41]
    };


    for (let i = 0; i < table.rows.length; ++i)
    {
        let uid: string = table.rows[i][index_uid];
        let code: string = table.rows[i][index_code];
        let label: string = table.rows[i][index_label] || "";
        let latitude: number = table.rows[i][index_latitude];
        let longitude: number = table.rows[i][index_longitude];
        let category: string = table.rows[i][index_category];
        let color: string = table.rows[i][index_color];
        let polyString: string = table.rows[i][index_poly];


        // console.log(uid);
        // console.log(code);
        // console.log(label);
        // console.log(latitude);
        // console.log(longitude);
        // console.log(poly);

        // label = label.replace(/(?:\r\n|\r|\n)/g, '<br />');
        // console.log(label);

        //let poly: string[][] = null;
        let poly: L.LatLng[] = null;
        if (polyString != null)
            poly = polyString.split(",").map(function (x) { let z = x.split(' '); return new L.LatLng(Number(z[0]), Number(z[1])) });
        // poly = polyString.split(',').map(function (x:string) { return x.split(' ') });

        if (latitude == null || longitude == null)
            continue;


        // allCoords.push([latitude, longitude]);
        let latlng = L.latLng(latitude, longitude);
        allCoords.push(latlng);


        // let nongreenIcon = L.divIcon({
        //    className: "MapElement",
        //    // iconAnchor: [0, 24],
        //    // labelAnchor: [-6, 0],
        //    // popupAnchor: [0, -36],
        //    html: "<span style=\"" + markerHtmlStyles + "\" />"
        //});

        // private static async Task DelayAsync()
        let houseImage = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
   viewBox="0 0 512 512" width="22px" height="22px">
    <path fill="{@col1}" d="M256,69.972L50,275.814h42.507v166.214h326.985V275.814H462L256,69.972z M374.492,397.028  h-73.768v-86.495h-89.451v86.495h-73.768V251.99L256,133.587l118.492,118.402V397.028z" />
    <path fill="{@col2}" opacity="0.4" d="M 137.505,251.99 256,133.587 374.492,251.989 v 145.039 h -73.768 v -86.495 h -89.451 v 86.495 h -73.768 z" />
</svg>`;


        let greenIcon = L.divIcon(
            {
                className: "customIcon",
                iconAnchor: [12, 12],
                // tooltipAnchor: [1120, 0],
                // labelAnchor: [1120, 0],
                popupAnchor: [0, 0],
                //html: "<img src=\"images/icons/gm_SR.png\" />"
                //html: "<img src=\"images/icons/GB.png\" />"
                //html: "<img src=\"../images/leaflet/helvetia23.png\" />"
                html: houseImage.replace("{@col1}", color).replace("{@col2}", color)
            }
        );

        let withDrag = true;

        // https://jsfiddle.net/guspersson/393ehmsq/
        // let marker = L.marker([latitude, longitude]).addTo(map);
        let marker = L.marker([latitude, longitude], { icon: greenIcon, draggable: withDrag }).addTo(map);
        let tooltipContent = createBuildingContentDiv(uid, null, label);


        let tt = L.tooltip(
            {
                permanent: true,
                direction: 'top'
                // direction: 'right'
                //tooltipAnchor: [1120, 1120]
                // , _anchor: [0, -110]
            }
        )
            //.setContent(label);
            .setContent(tooltipContent);

        // marker.bindTooltip(tt);


        let popupContent = createBuildingContentDiv(uid, category, label);
        // label = label.replace(/(?:\r\n|\r|\n)/g, '<br />');
        // let contentString = category + "<br />" + label;
        // let contentString = [category, label].filter(function (e) { return e; }).join("<br />");
        // + "<br />GPS: " + latLongToString(latlng);
        // contentString = contentString + "<br />" + "Fl&auml;che: " + thousandSeparator(polygonArea(poly)) + " m<sup>2</sup>&nbsp;&nbsp;(+/-30m<sup>2</sup>)";
        let popup = new L.Popup()
            .setLatLng(latlng)
            // .setContent(contentString)
            .setContent(popupContent)
            //.openOn(map)
            ;

        marker
            .bindPopup(popup)
            .addTo(map)
            ;

        // console.log(uid);
        marker.on("click", function (uuid: string, e: L.LeafletMouseEvent) // uid is now called uuid
        {
            console.log('marker.on("click",', uuid);

            // console.log("onclick");
            map.setView(e.latlng, 18, { animate: true });
            if (marker && marker.popup)
                marker.popup();

            let ml = window.parent.document.querySelector('#iMenuLeft');
            if (ml)
            {
                // console.clear();
                // console.log("navto: ", uuid)
                ignoreThisNavigation = true;
                navigateTo(uuid);
            }

            if (map.gl) map.gl._update();
        }.bind(this, uid));

        if (withDrag)
            marker.on('dragend', onMarkerMove.bind(this, uid, marker));

        markers[uid] = marker;

        

        /*
        let circle = L.circle(latlng,
        {
        color: 'red'
        , fillColor: '#f03'
        , fillOpacity: 0.5
        , radius: 15
        }).addTo(map);
        */

        if (poly == null)
            continue;

        poly = toCounterClockWise(poly); // OSM is COUNTER-clockwise !

        let polygon = L.polygon(poly);
        let polygonStamp = createBuildingContentDiv(null, null, label);
        addTextLabel(map, poly, polygonStamp);
        createVertexLabels(map, poly);
        


        /*
        polygon.setStyle({
        fillColor: '#FF00FF'
        ,fillOpacity: 0.7
        ,color: 'white'  //Outline color
        ,weight: 2
        ,opacity: 1
        });
        */

        let dd = document.createElement("div");
        let spn = document.createElement("span");
        spn.appendChild(document.createTextNode("Fläche" + ": "));
        spn.appendChild(document.createTextNode(thousandSeparator(polygonArea(poly))));
        spn.appendChild(document.createTextNode(" m"));

        let sup2 = document.createElement("sup");
        sup2.appendChild(document.createTextNode("2"));
        spn.appendChild(sup2);
        dd.appendChild(spn);

        // let popupString = "Fl&auml;che: " + thousandSeparator(polygonArea(poly)) + " m<sup>2</sup>";
        polygon.addTo(map)
            //.bindPopup(popupString)
            //.bindPopup(dd)
            //.openPopup()
            ;

        

        // polygon.on("dblclick", function (uuid, e)
        polygon.on("click", function (uuid: string, polygon: L.Polygon, e: L.LeafletMouseEvent)
        {
            console.log('polygon.on("click",', e, uuid, polygon);
            console.log("polygon latlngs", polygon.getLatLngs());
            (<any>polygon).editing.enable();

            let t = "{@basic}gebaeude.aspx?uid={@obj}&muid=@GB&env=ov&ro=false&proc={@BE_Hash}";
            t = SetDefaultVariables(t);

            //navigateTo(uuid);
            let ml = <HTMLIFrameElement>window.parent.document.querySelector('#frameDWGForm');

            if (ml)
                ml.src = t.replace("{@obj}", uuid);

            observeIframe();
        }.bind(this, uid, polygon));

        polygons[uid] = marker;
    } // next i

    let initialBounds: L.LatLngBounds = null;

    if (allCoords && allCoords.length > 0)
        initialBounds = L.latLngBounds(allCoords);
    else
    {
        // Be neutral - assume Switzerland ;) 
        initialBounds = L.latLngBounds(new L.LatLng(45.77694774030000246512, 6.02260949058999983663), new L.LatLng(47.83082754170000328031, 10.44270145019999951330));
    }

    map.zoomHome = function (homeView?: L.LatLngBoundsExpression)
    {
        map.fitBounds(homeView);
        if (map.gl) map.gl._update();
    }.bind(this, initialBounds);

    map.zoomHome();
    // console.log("leaving loadMarkers");
} // End Function loadMarkers 


function createBuildingContentDiv(uid: string, category: string, label: string)
{
    let popupContent = document.createElement("div");

    if (category != null)
    {
        let pspan1 = document.createElement("span");
        pspan1.appendChild(document.createTextNode(category));
        popupContent.appendChild(pspan1);
        popupContent.appendChild(document.createElement("br"));
    }

    if (label != null)
    {
        // console.log("lbl", "\"" + label + "\"");
        // label = label.replace(/(?:\r\n|\r|\n)/g, '<br />');
        // label = label.replace(/<br\s*[\/]?>/gi, "\n");
        // console.log("lbl2", "\"" + label + "\"");
        // let labelParts: string[] = label.split(/<br\s*[\/]?>/gi);
        let labelParts: string[] = label.split(/(?:\r\n|\r|\n)/g);
        // console.log(labelParts);

        for (let lin = 0; lin < labelParts.length; ++lin)
        {
            let pspan2 = document.createElement("span");
            pspan2.appendChild(document.createTextNode(labelParts[lin]));
            popupContent.appendChild(pspan2);
            popupContent.appendChild(document.createElement("br"));
        }

    }

    if (uid != null)
    {
        popupContent.appendChild(document.createComment("GB: " + uid));
    }

    return popupContent;
}



interface IObjectBoundsTable
{
    code: string;
    uid: string;
    latitude: number;
    longitude: number;

    minLat: number;
    minLng: number;
    maxLat: number;
    maxLng: number;
}


async function zoomIn(uid: string)
{
    // console.log("zoomIn", uid);
    let boundsUrl = "../ajax/AnySelect.ashx?sql=Maps.ObjectBounds.sql&obj_uid={@obj_uid}&in_stichtag={@stichtag}";
    boundsUrl = replaceAll(boundsUrl, "{@obj_uid}", uid);
    // window.top.document.getElementById("iMenuLeft").contentDocument.getElementById("inDatum").value
    boundsUrl = replaceAll(boundsUrl, "{@stichtag}", (new Date()).getTime().toString());
    boundsUrl = SetDefaultVariables(boundsUrl);


    let result = await getData(boundsUrl);
    // console.log(result);

    let table = result.tables[0];
    // console.log(table.columns);
    // console.log(table.columns["OBJ_Label"].index);

    let index_objt = table.columns["OBJT_UID"].index;
    let index_uid = table.columns["OBJ_UID"].index;

    let index_latitude = table.columns["OBJ_Lat"].index;
    let index_longitude = table.columns["OBJ_Lng"].index;

    let index_minLat = table.columns["OBJ_Min_Lat"].index;
    let index_minLng = table.columns["OBJ_Min_Long"].index;
    let index_maxLat = table.columns["OBJ_Max_Lat"].index;
    let index_maxLng = table.columns["OBJ_Max_Lng"].index;

    for (let i = 0; i < table.rows.length; ++i)
    {
        let code: string = table.rows[i][index_objt];
        let uid: string = table.rows[i][index_uid];
        let latitude: number = table.rows[i][index_latitude];
        let longitude: number = table.rows[i][index_longitude];

        let minLat: number = table.rows[i][index_minLat];
        let minLng: number = table.rows[i][index_minLng];
        let maxLat: number = table.rows[i][index_maxLat];
        let maxLng: number = table.rows[i][index_maxLng];

        if (minLat != null && minLng != null && maxLat != null && maxLng != null)
        {
            let zoomBounds = L.latLngBounds([[minLat, minLng], [maxLat, maxLng]]);
            map.fitBounds(zoomBounds);
        }
        else if (latitude != null && longitude != null)
        {
            map.setView([latitude, longitude], 18, { animate: true });
            // Zoom coordinates
        }
    } // Next i 

    if (map.gl) map.gl._update();
} // End Function ZoomIn


// target: typ (ld, ort, so, gb)
async function onBaumClick(uid: string, typ: string)
{
    typ = (typ || "").toLowerCase();

    if (ignoreThisNavigation)
    {
        if (typ == "so")
            ignoreThisNavigation = false;

        return;
    }

    if (typ === "gs")
    {
        return;
    }

    window.top.Portal.Frameset.focusFrameByWindow(window);

    switch (typ)
    {
        case "ld":
        case "ort":
        case "so":
            await zoomIn(uid);
            break;
        case "gb":
            await zoomIn(uid);
            if (markers != null && markers[uid] != null)
                markers[uid].openPopup();
            break;
        case "eg":
        case "og":
        case "ug":
            //console.log("Geschoss");
            break;
        default:
            console.log("Objekt nicht definiert.");
    } // End Switch

    if (map.gl) map.gl._update();
} // End Function onBaumClick


async function receiveMessage(event: MessageEvent)
{
    // console.log("receiveMessage");
    if (event == null || event.data == null)
    {
        console.log("no event or no data", event);
        return;
    }


    // let message;
    //if (event.origin !== "http://robertnyman.com")
    // if (false)
    // { 
    //      message = 'You ("' + event.origin + '") are not worthy';
    // } 
    // else
    // {
    //     message = 'I got "' + event.data + '" from "' + event.origin + '"';
    // }

    let tData = null;

    try
    {
        tData = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data;
    }
    catch (ex)
    {
        console.log(ex, event);
        console.dir(event);
    }

    let tAction = (tData.Action || '').toLowerCase();

    switch (tAction)
    {
        case 'vws.tree.onafterselectionchange':
            //window.top.Portal.Frameset.focusFrameByWindow(window);
            //console.log("type", tData.Param.Data.Type)
            //console.log("value", tData.Param.Data.Value)
            //console.log("text", tData.Param.Data.Text)
            //console.log("parent", tData.Param.Data.Parent)
            //console.log("ap", tData.Param.Data.ApertureObjID)
            //console.log("_hasPRT", tData.Param.Data._hasPRT);
            //console.log("_hasInsert", tData.Param.Data._hasInsert);
            //console.log("_hasDelete", tData.Param.Data._hasDelete);

            // target: typ (ld, ort, so, gb)
            (tData.Param) && await onBaumClick(tData.Param.Data.Value, tData.Param.Data.Type);
            break;
        case 'vws.tree.navigateto':
            // This is the event I need to CALL !
            /*
            VWS.Tree.navigateTo(
            tData.Param.navigateTo,
            tData.Param.navigateToAction
            );
            */
            break;
        default:
            // console.log("unhandled event", event);
            tData = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data;
            // console.log(JSON.stringify(tData, null, 2));
            break;
    }

    // event.source.postMessage("thanks, got it ;)", event.origin);
} // End Function ReceiveMessage




interface IGebaeudeKategorieLegendeTable 
{
    uid: string;
    kurz: string;
    lang: string;
    color: string;
    sort: number;
}


async function loadLegend()
{
    let url = "../ajax/AnySelect.ashx?sql=Maps.Gebaeudekategorie.sql";
    url = SetDefaultVariables(url);


    let result = await getData(url);
    // console.log(result);

    let table = result.tables[0];
    // console.log(table.columns);
    // console.log(table.columns["OBJ_Label"].index);

    let index_uid = table.columns["OBJ_UID"].index;
    let index_kurz = table.columns["OBJ_Kurz"].index;
    let index_lang = table.columns["OBJ_Lang"].index;
    let index_color = table.columns["OBJ_Color"].index;
    // let index_sort = table.columns["OBJ_Sort"].index;


    // Empty legends
    let gk_legend = document.getElementById("gk_legend");
    while (gk_legend.hasChildNodes())
    {
        gk_legend.removeChild(gk_legend.lastChild);
    } // Whend

    function addRow(color: string, text: string)
    {

        let tr = document.createElement("tr");
        let tdSquare = document.createElement("td");
        let tdText = document.createElement("td");
        tdSquare.className = "leg";
        (<any>tdSquare.style)["background-color"] = color;
        tdText.className = "cont";

        tdText.appendChild(document.createTextNode(text));
        tr.appendChild(tdSquare);
        tr.appendChild(tdText);

        return tr;
    } // End Function addRow


    for (let i = 0; i < table.rows.length; ++i)
    {
        let uid: string = table.rows[i][index_uid];
        let kurz: string = table.rows[i][index_kurz];
        let lang: string = table.rows[i][index_lang];
        let color: string = table.rows[i][index_color];
        //let sort:number = table.rows[i][index_sort];

        // console.log(uid, kurz, lang, color);
        gk_legend.appendChild(addRow(color, lang));
    } // Next i

} // End Function loadLegend



interface IApertureColorTable 
{
    uid: string;
    color: string;
    sort: number;
}


async function loadApertureColors()
{
    let url = "../ajax/AnySelect.ashx?sql=Maps.ApertureColors.sql";
    url = SetDefaultVariables(url);

    let result = await getData(url);
    // console.log(result);

    let table = result.tables[0];
    let index_uid = table.columns["COL_Aperture"].index;
    let index_color = table.columns["COL_Hex"].index;

    // Empty legends
    let gk_legend = document.getElementById("gk_legend");
    while (gk_legend.hasChildNodes())
    {
        gk_legend.removeChild(gk_legend.lastChild);
    } // Whend

    function addRow(color: string, text: string)
    {
        let tr = document.createElement("tr");
        let tdSquare = document.createElement("td");
        let tdText = document.createElement("td");
        tdSquare.className = "leg";
        (<any>tdSquare.style)["background-color"] = color;
        tdText.className = "cont";

        tdText.appendChild(document.createTextNode(text));
        tr.appendChild(tdSquare);
        tr.appendChild(tdText);

        return tr;
    } // End Function addRow


    for (let i = 0; i < table.rows.length; ++i)
    {
        let uid: string = table.rows[i][index_uid];
        let color: string = table.rows[i][index_color];
        //let sort:number = table.rows[i][index_sort];

        gk_legend.appendChild(addRow(color, uid));
    } // Next i 

} // End Function loadApertureColors 




// https://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
function getFirstBrowserLanguage()
{
    let nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

    // support for HTML 5.1 "navigator.languages"
    //if (Array.isArray(nav.languages)) // IE8-trap
    if (Object.prototype.toString.call(nav.languages) === '[object Array]')
    {
        for (i = 0; i < nav.languages.length; i++)
        {
            language = nav.languages[i];
            if (language && language.length)
            {
                return language;
            }

        } // Next i 

    } // End if (Object.prototype.toString.call(nav.languages) === '[object Array]') 

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++)
    {
        language = (<any>nav)[browserLanguagePropertyKeys[i]];
        if (language && language.length)
        {
            return language;
        }

    } // Next i 

    return null;
} // End Function getFirstBrowserLanguage 


function getBrowserLanguage(dft: string)
{
    let bl = getFirstBrowserLanguage() || dft,
        pos = bl.indexOf("-");
    if (pos !== -1)
        bl = bl.substr(0, pos);

    return bl;
} // End Function getBrowserLanguage 


function getUserLanguage()
{
    return getBrowserLanguage("de");
} // End Function getUserLanguage 



function createZoomControl(map: L.Map & IMapWithZoom)
{
    let zoomControl = document.createElement("div");
    zoomControl.setAttribute("class", "zoomControl");

    let homeZoom = document.createElement("div");
    homeZoom.setAttribute("class", "mp");
    homeZoom.setAttribute("style", "border-top-left-radius: 5mm; border-top-right-radius: 5mm;");
    homeZoom.appendChild(document.createTextNode("\u2606")); // &#x2606;

    homeZoom.addEventListener("click", function ()
    {
        map.zoomHome();
    }, false);

    zoomControl.appendChild(homeZoom);
    let clearHomeZoom = document.createElement("div");
    clearHomeZoom.setAttribute("style", "clear: both;");
    zoomControl.appendChild(clearHomeZoom);





    let plusZoom = document.createElement("div");
    plusZoom.setAttribute("class", "mp");
    plusZoom.appendChild(document.createTextNode("+"));

    plusZoom.addEventListener("click", function ()
    {
        map.zoomIn();
    }, false);

    zoomControl.appendChild(plusZoom);

    let clearPlusZoom = document.createElement("div");
    clearPlusZoom.setAttribute("style", "clear: both;");
    zoomControl.appendChild(clearPlusZoom);


    let minusZoom = document.createElement("div");
    minusZoom.setAttribute("class", "mp");
    minusZoom.setAttribute("style", "border-bottom-left-radius: 5mm; border-bottom-right-radius: 5mm;");
    minusZoom.appendChild(document.createTextNode("-"));

    minusZoom.addEventListener("click", function ()
    {
        map.zoomOut();
    }, false);

    zoomControl.appendChild(minusZoom);


    let clearMinusZoom = document.createElement("div");
    clearMinusZoom.setAttribute("style", "clear: both;");
    zoomControl.appendChild(clearMinusZoom);


    document.body.appendChild(zoomControl);
}




// let url = "http://localhost:59799/sql?sql=Maps.Gebaeudekategorie.sql&BE_Hash=12435&format=" + badDataTable.toString();
async function getXml(url: string, data?: any)
{
    if (url == null)
    {
        throw Error("URL is NULL...");
    }


    // https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events
    // window.addEventListener('online', updateOnlineStatus);
    // window.addEventListener('offline', updateOnlineStatus);
    // https://caniuse.com/#feat=online-status // it doesn't work on Android's WebView...
    if (!navigator.onLine)
    {
        // throw new Error("offline");
        // throw new ApplicationOfflineError("msg");
        throw new HttpRequestError(500, 'Client offline');
        // if (error instanceof ApplicationOfflineError) { console.log(error.sayHello(); }
    }


    if (url.indexOf("no_cache") == -1)
        url += "&no_cache=" + (new Date()).getTime();

    let req: Response = null;
    let xml: string = null;
    let obj: Document = null;
    let ex1: any = null;
    let ex2: any = null;
    let ex3: any = null;

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Headers
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
    let myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("cache-control", "no-cache");
    // myHeaders.append("Upgrade-Insecure-Requests", "1");

    // myHeaders.append("Content-Type", "application/json");

    // https://stackoverflow.com/questions/37668282/unable-to-fetch-post-without-no-cors-in-header

    // https://davidwalsh.name/fetch
    let options: any = {
        "method": "GET"
        // "headers": { 'auth': '1234','content-type': 'application/json'},
        // https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
        // "headers": new Headers({ 'content-type': 'application/json' })
        // "headers": { "Content-Type": "application/json" } 
        // "headers": new Headers({ 'Content-Type': 'application/json' }) 
        // "headers": { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        // "headers": new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }), 
        , "headers": myHeaders

        // https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/
        // https://googlechrome.github.io/samples/fetch-api/fetch-referrer-policy.html
        // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-state-origin
        // https://w3c.github.io/webappsec/
        // https://github.com/w3c/WebAppSec
        , "referrerPolicy": "origin-when-cross-origin"

        // ,"mode": "no-cors" 
        , "body": <any>null
    };


    if (data != null)
    {
        if (typeof data === 'string' || data instanceof String)
            options["body"] = data;
        else
            options["body"] = JSON.stringify({ "id": 123 });
    }

    try
    {
        // let result = <any>await fetch(url, options).then(function (response) { return response.json(); });
        req = await fetch(url, options);
    }
    catch (ex)
    {
        console.log(ex);
        ex1 = ex;
    }

    try
    {
        if (req != null)
            xml = await req.text();
    }
    catch (ex)
    {
        console.log(ex);
        ex2 = ex;
    }

    try
    {
        obj = (new DOMParser()).parseFromString(xml, "text/xml");
    }
    catch (ex)
    {
        ex3 = ex;
        console.log(ex);
    }


    if (obj == null)
    {
        throw new HttpRequestError(500, 'Server Error');
    }

    // console.log(obj);
    return obj;
} // End Function getXml 


function getBoundsArea(bounds: L.LatLngBounds): number 
{
    let nw = bounds.getNorthWest();
    let se = bounds.getSouthEast();
    // https://github.com/openstreetmap/cgimap/blob/master/src/bbox.cpp
    // double bbox::area() const { return (maxlon - minlon) * (maxlat - minlat);

    let maxLng = Math.max(nw.lng, se.lng);
    let maxLat = Math.max(nw.lat, se.lat);

    let minLng = Math.min(nw.lng, se.lng);
    let minLat = Math.min(nw.lat, se.lat);
    let area = (maxLng - minLng) * (maxLat - minLat);

    return area;
} // End Function getBoundsArea 


// new function see getBuildings()
async function addDataLayer()
{
    map.closePopup();
    let bb = map.getBounds();

    // https://github.com/openstreetmap/cgimap/blob/master/src/api06/map_handler.cpp
    // Currently it is 0.25 degrees squared (e.g. 1°x0.25° or 0.5x0.5° etc), 
    // or an area containing 50,000 nodes, whichever limit is reached first.
    // if (bounds.area() > MAX_AREA) 
    // #define MAX_AREA 0.25
    // #define MAX_NODES 50000
    // int num_nodes = sel->select_nodes_from_bbox(b, MAX_NODES);
    let area = getBoundsArea(bb);
    if (area > 0.25)
    {
        alert("The maximum bbox size is 0.25, and your request was too large.\nEither request a smaller area, or use planet.osm.");
        return;
    }

    let OSM_API_VERSION = "0.6";
    let url = "https://www.openstreetmap.org/api/" + OSM_API_VERSION + "/map?bbox=" + bb.toBBoxString();

    
    let xml = await getXml(url);
    // console.log("xml", xml);
    
    let layer = new L.OSM.DataLayer(xml).addTo(map);
    // map.fitBounds(layer.getBounds());
    
    // console.log(layer);
}


async function getSiteConfig()
{
    return {
        settings:
        {
              "mandant": "140"
            , "logo": "helvetia23.png"
            , language: "DE"
        }

        ,translations: {}
    };
}

interface IInternetExplorerVersionDetectionResult 
{
    crap?: boolean;
    isIE?: boolean;
    isEdge?: boolean;
    v?: number;
}

function IEdetection()
{
    let ua = window.navigator.userAgent;
    let result: IInternetExplorerVersionDetectionResult = {};

    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11, return version number
        result.crap = true;
        result.isIE = true;
        result.v = 11;
    }

    let msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older, return version number

        result.crap = true;
        result.isIE = true;
        result.v = 10;

        let re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

        if (re.exec(ua) !== null)
        {
            result.v = parseFloat(RegExp.$1);
        }

    }

    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
        //Edge (IE 12+), return version number
        result.crap = true;
        result.isEdge = true;
        result.v = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // User uses other browser
    return result;
} // End Function IEdetection 


// https://maps.wikimedia.org
// https://maps.wikimedia.org/main.js
async function initMap()
{
    // L.DomUtil.get('swissMap')._leaflet_id

    // console.log("init");
    let ml: HTMLElement = <HTMLElement>window.parent.document.querySelector('#iMenuLeft');

    // Create a map
    map = <L.Map & IMapWithZoom><any>L.map('swissMap', { zoomControl: false });
    map.setView(new L.LatLng(47.317390, 8.520293), 18); // SwissRe Soodring 33, Adliswil
    map.zoomHome = function () { console.log("wrong instance"); };
    createZoomControl(map);

    // https://jsfiddle.net/BC7q4/444/
    // let bounds = [[45.802216, 5.920721], [47.968862, 10.769762]];
    let southWest = new L.LatLng(45.802216, 5.920721);
    let northEast = new L.LatLng(47.968862, 10.769762);
    let bounds = new L.LatLngBounds(southWest, northEast);

    // https://stackoverflow.com/questions/17187161/bounding-view-of-a-leaflet-image-map-to-a-landscape-viewport
    // http://leafletjs.com/reference-1.2.0.html#map-fitbounds

    // map.fitBounds(bounds, { padding: [] });
    map.fitBounds(bounds, null);


    // scale:
    // Optional scale for the high- resolution screens such as Retina.
    // Supported scales are 1.3, 1.5, 2, 2.6, 3
    let scale = bracketDevicePixelRatio();
    let scalex = (scale === 1) ? '' : ('@' + scale + 'x');

    /*
    // Add a map layer
    L.tileLayer("{server}/{style}/{z}/{x}/{y}{scalex}.png?lang={language}",
        {
              maxZoom: 19
            , attribution: '<a target="blank" href="https://www.mediawiki.org/wiki/Maps/Technical_Implementation">Wikimedia maps beta</a> | Map data &copy; <a target="blank" href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            , server: "https://maps.wikimedia.org"
            , style: "osm-intl" // "osm" // Map style to use.Use "osm-intl" for map with labels, "osm" for map without labels.
            , scalex: scalex
            , language: getUserLanguage() // fr, it, en
        }
    ).addTo(map);
    */

    /**/


    // https://github.com/kartena/Proj4Leaflet
    // https://kartena.github.io/Proj4Leaflet/api/
    // https://opendatazurich.github.io/geoportal/#wmswmts-in-leaflet-einbinden
    // https://opendatazurich.github.io/
    // https://codesandbox.io/s/geoadmin-with-vanilla-openlayers-z3dij?file=/src/index.js


    var lv95 = {
        epsg: 'EPSG:2056',
        def: '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
        resolutions: [4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.2, 0.1],
        origin: [2420000, 1350000]
    };







    var crs = new (<any>L).Proj.CRS(lv95.epsg, lv95.def, {
        resolutions: lv95.resolutions,
        origin: lv95.origin
    });



    let useWebGL = true;

    if (!useWebGL)
    { 
        // Add a map layer
        // https://api3.geo.admin.ch/api/doc.html
        // https://api3.geo.admin.ch/services/sdiservices.html
        // https://codesandbox.io/s/geoadmin-with-vanilla-openlayers-z3dij?file=/src/index.js
        // https://api3.geo.admin.ch/services/sdiservices.html#mapbox-vector-tiles
        L.tileLayer("{server}/{style}/{z}/{x}/{y}.jpeg?lang={language}",
            {
                  attribution: '<a target="blank" href="https://map.geo.admin.ch/">map.geo.admin.ch</a> | Map data &copy; <a target="blank" href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                , server: "https://wmts100.geo.admin.ch/"
                // , server: "https://wmts.geo.admin.ch/"
                // warning: projection-system after current
                // Supported values: 21781(LV03), 2056(LV95), 4326(WGS84) and 3857(Web Pseudo- Mercator).
                // Defaults to “21781”.
                // , style: "1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/2056"
                , style: `1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857`
                , scalex: scalex
                , language: getUserLanguage() // fr, it, en

                // https://stackoverflow.com/questions/33632608/markers-do-not-appear-on-continuous-world-in-leaflet
                , continuousWorld: false 
                , minZoom: 8
                , maxZoom: 19

                // web or spherical mercator (EPSG:900913 et al.)
                // , crs: crs // EPSG:2056 - Swiss CH1903+ / LV95
                // , crs: L.CRS.EPSG3395 // WGS 84 / World Mercator - EPSG:3395
                // , crs: L.CRS.EPSG4326 // used in GPS 
                , crs: L.CRS.EPSG3857 // WGS 84 / Pseudo-Mercator - EPSG:3857
                // , crs: L.CRS.Simple
            }
        ).addTo(map);
    } // End if (!useWebGL)


    if (useWebGL)
    {
        let gl = L.mapboxGL(
            {
                accessToken: 'no-token',
                // updateInterval: https://github.com/mapbox/mapbox-gl-leaflet/issues/55
                // updateInterval: 5, // per 200 ms
                // updateInterval: IEdetection().crap ? 5 : 32, // per 200 ms
                updateInterval: IEdetection().crap ? 5 : 20, // per 50 ms
                attribution: '<a target="blank" href="https://github.com/ststeiger/VectorTileServer ">Steiger&apos;s public vector tile server</a> | <a target="blank" href="https://openmaptiles.org ">OpenMapTiles</a> | Map data &copy; <a target="blank" href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                style: "https://corpool.cor-asp.ch/VectorTileServer/styles/bright/style.json"
            }
        ).addTo(map);

        map.gl = gl;
    } // End if (useWebGL) 

    

    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    
    
    let options = <any>{
        position: <L.ControlPosition>"topright",
        draw: {
            
            polygon: {
                metric: true,
                showArea: false,
                allowIntersection: false,
                drawError: {
                    color: "#b00b00",
                    message: '<strong>Oh snap!<strong> you can\'t draw that!', 
                    timeout: 1000
                },
                icon: new L.DivIcon({
                    iconSize: new L.Point(5, 5),
                    className: 'leaflet-div-icon leaflet-editing-icon'
                }),
                touchIcon: new L.DivIcon({
                    iconSize: new L.Point(5, 5),
                    className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
                }),
                shapeOptions: {
                    stroke: true,
                    weight: 2,
                    color: "#bada55"
                }

            },

            // polyline: { metric: true },
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false, 
            circlemarker: false
        },
         
        // shapeOptions: { showArea: true, clickable: true },
        // metric: true,
        edit: {
            featureGroup: drawnItems, 
            remove: true,

            icon: new L.DivIcon({
                iconSize: new L.Point(8, 8),
                className: 'leaflet-div-icon leaflet-editing-icon'
            }),
            touchIcon: new L.DivIcon({
                iconSize: new L.Point(20, 20),
                className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon'
            }),
            
        }
    };


    L.drawLocal.draw.toolbar.buttons.polygon = "Ein Polygon zeichnen."; // Draw a polygon


    L.drawLocal.draw.toolbar.actions.title = "Zeichnen abbrechen"; // "Cancel drawing"; 
    L.drawLocal.draw.toolbar.actions.text = "Abbrechen"; // "Cancel"; 

    L.drawLocal.draw.toolbar.finish.title = "Zeichen abschliessen"; // "Finish drawing";
    L.drawLocal.draw.toolbar.finish.text = "Abschliessen"; // "Finish";

    L.drawLocal.draw.toolbar.undo.title = "Den letzten gezeichneten Punkt löschen"; // "Delete last point drawn";
    L.drawLocal.draw.toolbar.undo.text = "Letzten Punkt löschen"; // "Delete last point";

    L.drawLocal.draw.handlers.polygon.tooltip.start = "Klicken um das Zeichnen eines Polygons zu starten."; // 'Click to start drawing shape.';
    L.drawLocal.draw.handlers.polygon.tooltip.cont = "Klicken um das Zeichnen des Polygons weiterzuführen."; // 'Click to continue drawing shape.'; 
    L.drawLocal.draw.handlers.polygon.tooltip.end = "Auf den ersten Punkt klicken um das Polygon zu schliessen."; // 'Click first point to close this shape.' 

    L.drawLocal.edit.toolbar.actions.save.title = "Änderungen speichern"; // 'Save changes',
    L.drawLocal.edit.toolbar.actions.save.text = "Speichern"; // 'Save'
    L.drawLocal.edit.toolbar.actions.cancel.title = "Bearbeiten abbrechen, alle Änderungen verwerfen"; // 'Cancel editing, discards all changes',
    L.drawLocal.edit.toolbar.actions.cancel.text = "Abbrechen"; // 'Cancel'
    L.drawLocal.edit.toolbar.actions.clearAll.title = "Alle Layer löschen"; // 'Clear all layers',
    L.drawLocal.edit.toolbar.actions.clearAll.text = "Alle löschen"; // 'Clear All'




    L.drawLocal.edit.toolbar.buttons.edit = "Layer bearbeiten"; // 'Edit layers',
    L.drawLocal.edit.toolbar.buttons.editDisabled = "Keine Layer zum bearbeiten"; // 'No layers to edit',
    L.drawLocal.edit.toolbar.buttons.remove = "Layer löschen"; // 'Delete layers',
    L.drawLocal.edit.toolbar.buttons.removeDisabled = "Keine Layer zum Löschen"; // 'No layers to delete'

    L.drawLocal.edit.handlers.edit.tooltip.text = "Ziehen Sie Ziehpunkte oder Markierungen, um Features zu bearbeiten."; // 'Drag handles or markers to edit features.',
    L.drawLocal.edit.handlers.edit.tooltip.subtext = "Klicken Sie auf Abbrechen, um die Änderungen rückgängig zu machen."; // 'Click cancel to undo changes.'

    L.drawLocal.edit.handlers.remove.tooltip.text = "Klicken Sie auf ein Gebilde um es zu entfernen."; // 'Click on a feature to remove.'



    let drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);


    map.on('draw:created', function (e: L.DrawEvents.Created)
    {
        console.log('On draw:created', e.target);
        console.log(e.type, e);


        e.layer.bindPopup('A popup!');

        console.log(e.layerType);
        // console.log((<any>e.layer).getLatLngs()); // polyline
        // console.log((<any>e.layer).getLatLng()); // circle

        // e.layerType // polygon, circle, etc. 

        // polygon 
        // e.layer.getLatLngs()

        // circle
        // e.layer.getLatLng()
        // e.layer.getRadius()


        // e.layer.toGeoJSON().geometry.type // is point if circle 
        // e.layer.toGeoJSON().geometry.coordinates

        let feat = e.layer.toGeoJSON();

        if (feat.geometry && feat.geometry.coordinates && feat.geometry.coordinates.length > 0)
        {
            let polygonCoords = (<number[][][]>feat.geometry.coordinates)[0].map(function (c: number[]) { return [c[1], c[0]] });
            console.log("polygonCoords", polygonCoords); // geoJSON has (longitude, latitude), not (latitude, longitude)
        }   

        // https://www.gaiaresources.com.au/drawing-features-leaflet-using-leaflet-draw-plugin/
        // https://jsfiddle.net/user2314737/Lscupxqp/
        // https://jsfiddle.net/user2314737/324h2d9q/
        
        // https://stackoverflow.com/questions/12687779/how-do-you-produce-a-d-ts-typings-definition-file-from-an-existing-javascript
        
        // https://www.liquidweb.com/kb/how-to-install-node-version-manager-on-ubuntu/
        // https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/
        // https://docs.npmjs.com/try-the-latest-stable-version-of-npm
        // https://github.com/Microsoft/dts-gen/issues/58
        
        // e.layer.editing.latlngs
        
        
        let type = e.layerType,
            layer = e.layer;
        drawnItems.addLayer(layer);
    });
    
    map.on('draw:editstart', function(e:L.DrawEvents.EditStart) 
    {
        console.log('draw:editstart', e, e.type, e.target);
    });
    
    map.on('draw:editstop', function(e:L.DrawEvents.EditStop) 
    {
        console.log('draw:editstop', e, e.type, e.target);
    });
    
    map.on('draw:edited', function(e:L.DrawEvents.Edited) {
        console.log('draw:edited', e, e.type, e.target);
    });
    
    map.on('draw:deleted', function(e:L.DrawEvents.Deleted) {
        console.log('draw:deleted', e, e.type, e.target);


        // drawnItems.clearLayers();
    });
    
    
    await loadMarkers();
    await loadWerbetafeln();


    // Add a km/miles scale
    L.control.scale({ metric: true, imperial: false, maxWidth: 150 }).addTo(map);



    // Update the zoom level label
    map.on('zoomend', function ()
    {
        let uid = null;
        document.getElementById('zoom-level').innerHTML = 'Zoom Level: ' + map.getZoom();

        if (map.getZoom() > 16)
        {
            for (uid in werbetafeln)
            {
                if (werbetafeln.hasOwnProperty(uid))
                {
                    //werbetafeln[uid].remove();
                    werbetafeln[uid].addTo(map);
                }
            }
        }
        else
        {
            for (uid in werbetafeln)
            {
                if (werbetafeln.hasOwnProperty(uid))
                {
                    werbetafeln[uid].remove();
                }
            }
        }

        if (map.gl) map.gl._update();
    });



    //let legend = L.control({ position: 'topright' });
    //legend.onAdd = function (map)
    //{
    //    let div = L.DomUtil.create('div', 'info legend');
    //    div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
    //    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    //    return div;
    //};
    //legend.addTo(map);



    //Right click on the map activated


    //if (false)
    // if mandant = Heletia || leucktreklame-APK_UID IS NOT NULL 
    {
        map.on("contextmenu", function (e: L.LeafletMouseEvent)
        {
            // console.log("map contextmenu", e)

            let container = <HTMLElement><any>document.createDocumentFragment();
            let title = document.createElement("span");
            title.setAttribute("style", "font-weight: bold;");
            title.appendChild(document.createTextNode("Hier können Sie"));
            container.appendChild(title);
            container.appendChild(document.createElement("br"));
            let menuOption = document.createElement("a");
            menuOption.addEventListener("click", addWerbetafel.bind(this, e.latlng.lat, e.latlng.lng));

            menuOption.appendChild(document.createTextNode("eine Leuchtreklame hinzufügen"));
            container.appendChild(menuOption);

            // let contextMenu = container.innerHTML;
            // console.log(contextMenu);

            let popup = new L.Popup({ closeButton: true, autoClose: true })
                .setLatLng(e.latlng)
                //.setContent(contextMenu)
                .setContent(container)
                //.openOn(map)
                ;

            popup.openOn(map);
        });
    }

    
    map.on("click", function (e:L.LeafletMouseEvent)
    {
        console.log('map.on("click",', e.latlng);
    });
    

    //map.on("dblclick", function (e: L.LeafletMouseEvent)
    //{
    //    console.log("doubleClicked");
    //});


    /*
    // Add current location to URL hash
    // let hash = new L.Hash(map);
    let marker = L.marker([47.552096, 9.226189]).addTo(map);
    marker
    .bindTooltip("COR Managementsysteme GmbH",
    {
    permanent: true,
    direction: 'top'
    //direction: 'right'
    }
    )
    .bindPopup("<b>COR Managementsysteme GmbH</b><br />Fabrikstrasse 1<br />8586 Erlen/TG<br />+41 (0)71 649 22 46")
    // .openPopup()
    ;
    */


    function straightLine()
    {
        let pointA = new L.LatLng(47.54297305496059, 9.186017817687999);
        // let pointB = new L.LatLng(46.1538928965763, 8.80292035094359);
        let pointB = new L.LatLng(40.69245766686793, -74.04423198459618);


        let pointList = [pointA, pointB];

        let firstpolyline = new L.Polyline(pointList, <any>{
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
            , edit_with_drag: true
        });
        firstpolyline.addTo(map);
    }



    function calcCrow(p1: L.LatLng, p2: L.LatLng) 
    {
        // converts numeric degrees to radians
        function toRad(val:number) 
        {
            return val * Math.PI / 180;
        }


        let lat1 = p1.lat;
        let lon1 = p1.lng;
        let lat2 = p2.lat;
        let lon2 = p2.lng;
        


        let R = 6371; // km
        let dLat = toRad(lat2 - lat1);
        let dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        return d;
    }

    // C
    
    // requires leaflet.bezier.js which requires snap.svg-min.js
    function flugLinie2()
    {
        var options = {
            color: 'rgb(145, 146, 150)',
            fillColor: 'rgb(145, 146, 150)',
            dashArray: 8,
            opacity: 0.8,
            weight: '1',
            iconTravelLength: 0.5, //How far icon should go. 0.5 = 50%
            iconMaxWidth: 50,
            iconMaxHeight: 50,
            fullAnimatedTime: 7000,// animation time in ms
            easeOutPiece: 4, // animation easy ou time in ms
            easeOutTime: 2500, // animation easy ou time in ms
        };

        let pointA = new L.LatLng(47.54297305496059, 9.186017817687999);
        let pointB = new L.LatLng(46.1538928965763, 8.80292035094359);
        // let pointB = new L.LatLng(40.69245766686793, -74.04423198459618);


        console.log("distance:", calcCrow(pointA, pointB));

        (<any>L).bezier({
            path: [
                [pointA, pointB]
            ],

            icon: { path: "plane.png" }
        }, options).addTo(map);
    }


    function flugLinie()
    {
        // let pointA = { lat: 52.5, lng: 13.35 }; // Berlin
        let pointA = new L.LatLng(47.54297305496059, 9.186017817687999); // Sulgen

        // let pointB = { lat: 33.82, lng: -118.38 }; // LosAngeles
        // let pointB = new L.LatLng(40.68921685910933, -74.04456477296566);// Statue of liberty, NY
        let pointB = new L.LatLng(46.1538928965763, 8.80292035094359); // Locarno 
        // let pointB = new L.LatLng(47.373505958350876, 9.558968171113646); // Im Hebler
        // let pointB = new L.LatLng(43.971231250127026, 4.278893717779308); // Rue du Four 


        // Requires: https://github.com/henrythasler/Leaflet.Geodesic
        let geodesic = new (<any>L).Geodesic([pointA, pointB]).addTo(map);
    }


    // flugLinie();
    straightLine();
    

} // End Function initMap 


function CreatePolygon(latLongs: L.LatLng[])
{
    //POLYGON ((73.232821 34.191819,73.233755 34.191942,73.233653 34.192358,73.232843 34.192246,73.23269 34.191969,73.232821 34.191819))
    let polyString = "";

    // MS-SQL polygon absolutely wants to be clockwise...
    // Don't copy array, just switch direction if necessary 
    if (isClockwise(latLongs))
    {
        for (let i = 0; i < latLongs.length; ++i)
        {
            if (i !== 0)
                polyString += ",";

            polyString += latLongs[i].lng + " " + latLongs[i].lat; // + ",";
        }
    }
    else
    {
        for (let i = latLongs.length - 1; i > -1; --i)
        {
            if (i !== latLongs.length - 1)
                polyString += ",";

            polyString += latLongs[i].lng + " " + latLongs[i].lat; // + ",";
        }
    }

    polyString = "POLYGON((" + polyString + "))";
    return polyString;
}


function CreateSqlPolygon(latLongs: L.LatLng[])
{
    let s = "geography::STPolyFromText('" + CreatePolygon(latLongs) + "', 4326)";
    return s;
}


// setPositon(47.551811, 7.599570);
function setPositon(latitude: number, longitude: number)
{
    // It just depends on what behavior you want.
    // map.panTo() will pan to the location with zoom/pan animation, 
    // while map.setView() immediately set the new view to the desired location/zoom level.

    // Use map.panTo(); does not do anything if the point is in the current view. 
    // Use map.setView() instead.

    // map.panTo(new L.LatLng(latitude, longitude));
    // map.setZoom(8);
    map.setView(new L.LatLng(latitude, longitude), 18);
}


// https://github.com/mattdesl/is-clockwise
// MIT, see LICENSE.md for details.
function isClockwiseSimple(poly: number[][])
{
    let sum = 0;
    for (let i = 0; i < poly.length - 1; i++)
    {
        let cur = poly[i],
            next = poly[i + 1];
        sum += (next[0] - cur[0]) * (next[1] + cur[1])
    }
    return sum > 0
}


function isClockwise(poly: L.LatLng[])
{
    let sum = 0;

    for (let i = 0; i < poly.length - 1; i++)
    {
        let cur = poly[i], next = poly[i + 1];
        sum += (next.lat - cur.lat) * (next.lng + cur.lng);
    } // Next i 

    return sum > 0;
} // End Function isClockwise 


// MSSQL is CLOCKWISE (MS-SQL wants the polygon points in clockwise sequence) 
function toClockWise(poly: L.LatLng[])
{
    if (!isClockwise(poly))
        poly.reverse();

    return poly;
} // End Function toClockWise 


// OSM is COUNTER-clockwise  (OSM wants the polygon points in counterclockwise sequence) 
function toCounterClockWise(poly: L.LatLng[])
{
    if (isClockwise(poly))
        poly.reverse();

    return poly;
} // End Function toCounterClockWise 


function polygonStringToCoordinates(polygonString: string)
{
    let latlongs: L.LatLng[] = [];

    // mystring.match(/\[(.*?)\]/);
    polygonString = polygonString.match(/\s*POLYGON\s*\(\s*\(\s*(.*?)\s*\)\s*\)\s*/)[1];
    // polygonString = polygonString.replace( new RegExp("\\s*,\\s*", 'g'), ",");
    polygonString = polygonString.replace(/\s*,\s*/g, ",");


    //let allPoints: string[] = polygonString.split(", ");
    let allPoints: string[] = polygonString.split(",");
    for (let i = 0; i < allPoints.length; ++i)
    {
        let pointComponents: string[] = allPoints[i].split(" ");
        latlongs.push(new L.LatLng(parseFloat(pointComponents[1]), parseFloat(pointComponents[0])));
    } // Next i 

    latlongs = toCounterClockWise(latlongs); // OSM is COUNTER-clockwise
    return latlongs;
}



function createInsertScriptSQL(latlongs: L.LatLng[])
{
    let insertString = `
DECLARE @GB_UID AS uniqueidentifier; 
DECLARE @SO_UID AS uniqueidentifier; 

SET @GB_UID = NULLIF('abc', ''); 
SET @SO_UID = NULLIF('', ''); 


DELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE ZO_OBJ_WGS84_GB_UID = @GB_UID; 


/*
INSERT INTO T_ZO_Objekt_Wgs84Polygon
(
     ZO_OBJ_WGS84_UID
    ,ZO_OBJ_WGS84_GB_UID
    ,ZO_OBJ_WGS84_SO_UID
    ,ZO_OBJ_WGS84_Sort
    ,ZO_OBJ_WGS84_GM_Lat
    ,ZO_OBJ_WGS84_GM_Lng
)
*/`;

    latlongs = toCounterClockWise(latlongs);

    // Close polygon if unclosed
    if (latlongs[0].lat !== latlongs[latlongs.length - 1].lat || latlongs[0].lng !== latlongs[latlongs.length - 1].lng)
        latlongs.push(latlongs[0]);

    for (let i = 0; i < latlongs.length; ++i)
    {
        if(i!== 0)
            insertString += " \r\n\r\n\r\nUNION ALL \r\n\r\n"; 

        insertString += `
SELECT
     NEWID() AS ZO_OBJ_WGS84_UID
    ,CAST(@GB_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_GB_UID
    ,CAST(@SO_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_SO_UID
    ,CAST(${i} AS integer) + 1 AS ZO_OBJ_WGS84_Sort
    ,${latlongs[i].lat} AS ZO_OBJ_WGS84_GM_Lat -- decimal(23, 20)
    ,${latlongs[i].lng} AS ZO_OBJ_WGS84_GM_Lng -- decimal(23, 20) `;
    }

    insertString += " \r\n; \r\n\r\n"; 

    return insertString;
}


function createInsertScript(unionPolygon: string):string
{
    if (unionPolygon == null)
    {
        unionPolygon = "POLYGON ((8.3038582 47.0506309, 8.3038611 47.050588, 8.3038772 47.0504833, 8.3041581 47.0505083, 8.3042898 47.0505392, 8.3042879 47.050571, 8.30442 47.05058, 8.3044327 47.0507439, 8.3043001 47.0507637, 8.304174 47.050784, 8.3041695 47.0507507, 8.3041592 47.0506835, 8.3041585 47.0506448, 8.3042166 47.0506438, 8.3042225 47.0506777, 8.3042885 47.0506777, 8.3042854 47.0506139, 8.3041532 47.0506229, 8.303965 47.0506089, 8.3039616 47.0506342, 8.3038582 47.0506309))";
    }
    
    let latlongs = polygonStringToCoordinates(unionPolygon);
    console.log(latlongs);
    console.log("string", JSON.stringify(latlongs, null, 2));

    // draw test-polygon
    let polygon = L.polygon(latlongs);
    polygon.bindPopup(unionPolygon).addTo(map);

    let insertScript = createInsertScriptSQL(latlongs)
    // console.log("SQL-INSERT-Script: ", insertScript);

    return insertScript;
}


async function startMap()
{
    polyFills();

    // initMap();
    window.setTimeout(initMap, 100);
    // loadApertureColors();

    if (window.removeEventListener)
        window.removeEventListener("message", receiveMessage, false);
    else
        window.detachEvent("onmessage", receiveMessage);


    if (!window['postMessage'])
        alert("oh crap");
    else
    {
        if (window.addEventListener)
        {
            // console.log("listening for message...");
            window.addEventListener("message", receiveMessage, false);
        }
        else
        {
            // console.log("listening for IE message...");
            window.attachEvent("onmessage", receiveMessage);
        }
    }

    await loadLegend();
}

startMap();


// }


// marker.bindTooltip("My Label", { permanent: true, className: "my-label", offset: [0, 0] });
// polygon.bindTooltip("My Label", { permanent: true, className: "my-label", offset: [0, 0] });

// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Lon..2Flat._to_tile_numbers_2
function long2tile(lon: number, zoom: number) 
{
    return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
}


function lat2tile(lat: number, zoom: number)  
{
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
}


function tile2long(x: number, z: number) 
{
    return (x / Math.pow(2, z) * 360 - 180);
}

function tile2lat(y: number, z: number) 
{
    let n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}


function UNUSED_extendLayerGroup()
{
    let layerGroupNew = new L.LayerGroup();
    layerGroupNew.addTo(map);

    let x = L.marker(new L.LatLng(0, 0, 0));
    x.addTo(layerGroupNew);

    // Extended LayerGroup that makes it easier to do the same thing to all its member layers:
    let featureGroupNew = new L.FeatureGroup().addTo(layerGroupNew);

    /*
    L.featureGroup([marker1, marker2, polyline])
    .bindPopup('Hello world!')
    .on('click', function() { alert('Clicked on a member of the group!'); })
    .addTo(map); 
    */
}

// https://gis.stackexchange.com/questions/161940/how-to-add-layers-and-update-layer-control-dynamically-leaflet
// https://leafletjs.com/examples/layers-control/
// https://leafletjs.com/examples/extending/extending-2-layers.html

// INCORRECT !!! 
function boundsFomDistance(lat: number, lon: number, distanceInMeters: number): L.LatLngBounds 
{

    function toRadians(val: number): number
    {

        return (val / 180.0 * Math.PI);
    }

    function toDegrees(val: number): number
    {
        return val / Math.PI * 180.0;
    }

    // https://en.wikipedia.org/wiki/Earth_radius
    // For Earth, the mean radius is 6,371.0088 km
    let R = 6371.0088;  // earth radius in km
    let radius = distanceInMeters * 0.001; // km


    let lon1 = lon - toDegrees(radius / R / Math.cos(toRadians(lat)));
    let lon2 = lon + toDegrees(radius / R / Math.cos(toRadians(lat)));

    let lat1 = lat + toDegrees(radius / R);
    let lat2 = lat - toDegrees(radius / R);

    return new L.LatLngBounds(new L.LatLng(lat2, lon2), new L.LatLng(lat1, lon1))
} // End Function boundsFomDistance 


// degrees to radians
function deg2rad(degrees: number)
{
    return Math.PI * degrees / 180.0;
}

// radians to degrees
function rad2deg(radians: number)
{
    return 180.0 * radians / Math.PI;
}


// Earth radius at a given latitude, according to the WGS- 84 ellipsoid [m]
function WGS84EarthRadius(lat: number)
{
    // Semi - axes of WGS- 84 geoidal reference
    const WGS84_a = 6378137.0;  // Major semiaxis [m]
    const WGS84_b = 6356752.3;  // Minor semiaxis [m]

    // http://en.wikipedia.org/wiki/Earth_radius
    let An = WGS84_a * WGS84_a * Math.cos(lat);
    let Bn = WGS84_b * WGS84_b * Math.sin(lat);
    let Ad = WGS84_a * Math.cos(lat);
    let Bd = WGS84_b * Math.sin(lat);
    return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd))
}

// Bounding box surrounding the point at given coordinates,
// assuming local approximation of Earth surface as a sphere
// of radius given by WGS84
// https://stackoverflow.com/questions/238260/how-to-calculate-the-bounding-box-for-a-given-lat-lng-location
function boundingBox(latitudeInDegrees: number, longitudeInDegrees: number, halfSideInKm: number)
{
    let lat = deg2rad(latitudeInDegrees);
    let lon = deg2rad(longitudeInDegrees);
    let halfSide = 1000 * halfSideInKm;

    // Radius of Earth at given latitude
    let radius = WGS84EarthRadius(lat);
    // Radius of the parallel at given latitude
    let pradius = radius * Math.cos(lat);

    let latMin = lat - halfSide / radius;
    let latMax = lat + halfSide / radius;
    let lonMin = lon - halfSide / pradius;
    let lonMax = lon + halfSide / pradius;

    // return (rad2deg(latMin), rad2deg(lonMin), rad2deg(latMax), rad2deg(lonMax));
    return new L.LatLngBounds(new L.LatLng(rad2deg(latMin), rad2deg(lonMin)), new L.LatLng(rad2deg(latMax), rad2deg(lonMax)));
}

// boundsFomDistance(47.430383, 9.378554, 50)
// boundingBox(47.430383, 9.378554, 0.050)


function replaceAll(str: string, find: string, newToken: string, ignoreCase?:boolean)
{
    let i: number = -1;
    
    if (!str)
    {
        // Instead of throwing, act as COALESCE if find == null/empty and str == null
        if ((str == null) && (find == null))
            return newToken;

        return str;
    }

    if (!find) // sanity check 
        return str;

    ignoreCase = ignoreCase || false;
    find = ignoreCase ? find.toLowerCase() : find;

    while (
        (
            i = (ignoreCase ? str.toLowerCase() : str).indexOf(
                find, i >= 0 ? i + newToken.length : 0)
        ) !== -1
    )
    {
        str = str.substring(0, i) +
            newToken +
            str.substring(i + find.length);
    } // Whend 

    return str;
}


// old function see addDataLayer()
// with this, including leaflet-osm is obsolete
async function getBuildings()
{
    let bb = map.getBounds();

    let area = getBoundsArea(bb);
    if (area > 0.25)
    {
        alert("The maximum bbox size is 0.25, and your request was too large.\nEither request a smaller area, or use planet.osm.");
        return;
    } // End if (area > 0.25) 

    let OSM_API_VERSION = "0.6";
    let url = "https://www.openstreetmap.org/api/" + OSM_API_VERSION + "/map?bbox=" + bb.toBBoxString();

    let xml = await getXml(url);
    // console.log("xml", xml);

    // let hello = ``
    // let xml = (new DOMParser()).parseFromString(hello, "text/xml");

    let buildingsNodes: Element[] = Array.prototype.slice.call(xml.querySelectorAll('way tag[k="building"]')).map(function (x: Node) { return x.parentElement || x.parentNode });
    let nodes: Element[] = Array.prototype.slice.call(xml.querySelectorAll('node'));
    // console.log("buildingsNodes", buildingsNodes);
    // console.log("nodes", nodes);

    let nodeDictionary: any = {};
    let buildings: any = {};

    for (let i = 0; i < nodes.length; ++i)
    {
        let nodeId = nodes[i].getAttribute("id");
        nodeDictionary[nodeId] = new L.LatLng(parseFloat(nodes[i].getAttribute("lat"))
            , parseFloat(nodes[i].getAttribute("lon"))
        );
    } // Next i 

    for (let i = 0; i < buildingsNodes.length; ++i)
    {
        // console.log(buildings[i].id);

        let buildingNodes: Element[] = Array.prototype.slice.call(buildingsNodes[i].getElementsByTagName("nd"));
        let coords: L.LatLng[] = [];
        for (let j = 0; j < buildingNodes.length; ++j)
        {
            let ref = buildingNodes[j].getAttribute("ref");
            coords.push(nodeDictionary[ref]);
            // console.log("ref", ref, coords[j]);
        } // Next j 

        toCounterClockWise(coords);
        let wayId = buildingsNodes[i].getAttribute("id");
        buildings[wayId] = coords;
        // console.log(buildingsNodes[i].id, coords);
    } // Next i 

    // console.log(buildings);


    for (let property in buildings)
    {
        if (buildings.hasOwnProperty(property))
        {
            // console.log(property, buildings[property]);

            // class for polygon  - different color when nearest polygon to position as per manual selection (property ===)
            let myway = "osm_data_polygon";
            //if (property === "218003784")
            //if (property === "192704208") 
            //if (property === "192704206") 
            // if (property === "192482861") 
            // if (property === "192725294")
                // myway = "osm_data_polygon_nearest";
            


            // let thisBuilding = L.polygon(buildings[property], { className: 'osm_data_polygon' /*, "__color": "red", "__dashArray": '10,10'*/ });
            let thisBuilding = L.polygon(buildings[property], { className: myway /*, "__color": "red", "__dashArray": '10,10'*/ });
            thisBuilding.addTo(map);
            
            let contentString = "OSM way-id: " + property + "<br />" + "area: ~" + thousandSeparator(polygonArea(buildings[property])) + "m<sup>2</sup><br />GPS:<br />";
            contentString += CreateSqlPolygon(buildings[property]);
            contentString += '<textarea style="width: 100%; height: 5cm;">'
            contentString += createInsertScriptSQL(buildings[property]);
            contentString += "</textarea>"

            /*
            for (let r = 0; r < polygonData.length; ++r)
            {
                contentString += polygonData[r].lat+ "°N,"+ polygonData[r].lng + "°E<br />";
            }
            */

            let popup = new L.Popup()
                .setContent(contentString)
                ;

            thisBuilding.bindPopup(popup);

            thisBuilding.on("click", function (event: L.LeafletMouseEvent)
            {
                // console.log("lc", event);
                // console.log("tgt", event.target);
                // console.log("sd", event.sourceTarget);
                // console.log("ogt", event.originalEvent.target);
                // event.originalEvent.target.setAttribute("style", "fill: blue !important;");

                // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
                if ((<Element>event.originalEvent.target).classList.contains("active"))
                    (<Element>event.originalEvent.target).classList.remove("active");
                else
                    (<Element>event.originalEvent.target).classList.add("active");
            });
        } // End if (buildings.hasOwnProperty(property)) 

    } // Next property 




    // my.querySelector('way[id="28858269"]').getElementsByTagName("nd")

    /*
    // Xpathresult is undefined in IE11
    // Internet Explorer does not support XPATH.
    
    let iterator = my.evaluate(
         '//way/tag[@k="building"]/..' 
        ,my 
        ,{
            // interface XPathNSResolver { lookupNamespaceURI(prefix: string): string }
            lookupNamespaceURI: function (prefix:string):string
            {
                if (prefix === 'ns1')
                    return 'http://tempuri.org/AWEService/API/WASAPI';
                else
                    return null;
            }
        }
        , XPathResult.ANY_TYPE
        , null
    );

    try
    {
        let thisNode = iterator.iterateNext();

        while (thisNode)
        {
            console.log(thisNode);
            thisNode = iterator.iterateNext();
        }
    }
    catch (e)
    {
        console.log("error", e);
    }
    */
}


// let a = new L.LatLng(0, 0); a.lng a.lat
class GeoPoint
{
    public Lat: number;
    public Lng: number;
}


class GeographicOperations
{

    constructor()
    { }


    // https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
    public isPointInPolygon(p: GeoPoint, polygon: GeoPoint[])
    {
        let isInside = false;
        let minX = polygon[0].Lat, maxX = polygon[0].Lat;
        let minY = polygon[0].Lng, maxY = polygon[0].Lng;
        for (let n = 1; n < polygon.length; n++)
        {
            let q = polygon[n];
            minX = Math.min(q.Lat, minX);
            maxX = Math.max(q.Lat, maxX);
            minY = Math.min(q.Lng, minY);
            maxY = Math.max(q.Lng, maxY);
        } // Next n 

        if (p.Lat < minX || p.Lat > maxX || p.Lng < minY || p.Lng > maxY)
        {
            return false;
        } // End if point not in bounding box 

        let i = 0, j = polygon.length - 1;
        for (i, j; i < polygon.length; j = i++)
        {
            if ((polygon[i].Lng > p.Lng) != (polygon[j].Lng > p.Lng)
                && p.Lat <
                (polygon[j].Lat - polygon[i].Lat) * (p.Lng - polygon[i].Lng)
                / (polygon[j].Lng - polygon[i].Lng) + polygon[i].Lat)
            {
                isInside = !isInside;
            } // End if 

        } // Next i,j 

        return isInside;
    } // End Function isPointInPolygon 


    /// Determines if the given point is inside the polygon
    // https://stackoverflow.com/questions/4243042/c-sharp-point-in-polygon
    public isPointInPolygon4(polygon: GeoPoint[], testPoint: GeoPoint)
    {
        let result = false;
        let j = polygon.length - 1;

        for (let i = 0; i < polygon.length; i++)
        {
            if (polygon[i].Lng < testPoint.Lng && polygon[j].Lng >= testPoint.Lng || polygon[j].Lng < testPoint.Lng && polygon[i].Lng >= testPoint.Lng)
            {
                if (polygon[i].Lat + (testPoint.Lng - polygon[i].Lng) / (polygon[j].Lng - polygon[i].Lng) * (polygon[j].Lat - polygon[i].Lat) < testPoint.Lat)
                {
                    result = !result;
                }
            }

            j = i;
        } // Next i 

        return result;
    } // End Function isPointInPolygon4 


} // End CLass GeographicOperations
