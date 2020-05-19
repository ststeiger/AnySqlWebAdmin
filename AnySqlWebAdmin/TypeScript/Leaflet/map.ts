
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
        result = [];

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
        polygon.on("click", function (uuid: string, e: L.LeafletMouseEvent)
        {
            let t = "{@basic}gebaeude.aspx?uid={@obj}&muid=@GB&env=ov&ro=false&proc={@BE_Hash}";
            t = SetDefaultVariables(t);

            //navigateTo(uuid);
            let ml = <HTMLIFrameElement>window.parent.document.querySelector('#frameDWGForm');

            if (ml)
                ml.src = t.replace("{@obj}", uuid);

            observeIframe();
        }.bind(this, uid));

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
    console.log("xml", xml);
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

    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    
    
    let options = {
        position: <L.ControlPosition>"topright",
        shapeOptions: {
            showArea: true,
            clickable: true
        },
        metric: true,
        edit: {
            featureGroup: drawnItems
        }
    };

    let drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

    map.on('draw:created', function(e:L.DrawEvents.Created) {
        let type = e.layerType,
            layer = e.layer;
        drawnItems.addLayer(layer);
    });

    map.on('draw:editstart', function() {
        console.log('edit start');
    });

    map.on('draw:editstop', function() {
        console.log('edit stop');
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
        console.log(e.latlng);
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


function drawTestPolygon(t: any)
{
    let unionPolygon = "POLYGON ((7.5989804 47.5512929, 7.5989968 47.5512834, 7.5989937 47.5512791, 7.5989966 47.5512774, 7.5990021 47.5512803, 7.5990346 47.5512613, 7.5990315 47.5512572, 7.5990342 47.5512556, 7.5990398 47.5512583, 7.5990723 47.5512393, 7.5990692 47.5512354, 7.5990722 47.5512336, 7.5990774 47.5512364, 7.5990942 47.5512266, 7.5990778 47.5512139, 7.5990943 47.5512043, 7.5990911 47.5512004, 7.5990939 47.5511988, 7.5990993 47.5512014, 7.5991178 47.5511907, 7.5991321 47.5511824, 7.5991291 47.5511784, 7.5991318 47.5511769, 7.5991371 47.5511795, 7.5991696 47.5511606, 7.5991668 47.5511566, 7.5991696 47.5511549, 7.5991748 47.5511575, 7.5992073 47.5511387, 7.5992043 47.5511348, 7.5992073 47.551133, 7.5992123 47.5511358, 7.5992453 47.5511167, 7.5992423 47.5511128, 7.5992453 47.551111, 7.5992505 47.5511136, 7.5992655 47.5511049, 7.599283 47.5510947, 7.5992803 47.5510907, 7.5992829 47.5510892, 7.5992882 47.5510917, 7.5993207 47.5510729, 7.5993178 47.551069, 7.5993206 47.5510674, 7.5993255 47.55107, 7.5993585 47.5510509, 7.5993557 47.551047, 7.5993584 47.5510454, 7.5993634 47.551048, 7.5993802 47.5510383, 7.5993658 47.5510271, 7.5993593 47.5510293, 7.5993569 47.5510274, 7.5993615 47.5510237, 7.5993472 47.5510126, 7.5993632 47.5510033, 7.5993605 47.5509993, 7.5993631 47.5509978, 7.5993682 47.5510004, 7.5993839 47.5509913, 7.5994011 47.5509813, 7.5993983 47.5509773, 7.599401 47.5509757, 7.5994062 47.5509783, 7.5994391 47.5509592, 7.599436 47.5509554, 7.5994388 47.5509537, 7.5994442 47.5509562, 7.5994768 47.5509372, 7.5994737 47.5509334, 7.5994765 47.5509318, 7.599482 47.5509342, 7.5994984 47.5509246, 7.5995125 47.5509357, 7.5995179 47.5509337, 7.5995206 47.5509358, 7.599517 47.5509392, 7.5995451 47.5509614, 7.5995507 47.5509595, 7.599553 47.5509613, 7.5995494 47.5509647, 7.5995778 47.550987, 7.5995832 47.550985, 7.5995857 47.550987, 7.5995823 47.5509906, 7.5996104 47.5510126, 7.5996158 47.5510106, 7.599618 47.5510123, 7.5996144 47.5510159, 7.599643 47.5510383, 7.5996485 47.5510363, 7.5996508 47.5510381, 7.5996474 47.5510417, 7.5996752 47.5510636, 7.5996807 47.5510616, 7.599683 47.5510634, 7.5996794 47.5510669, 7.599708 47.5510894, 7.5997134 47.5510873, 7.5997157 47.5510892, 7.5997121 47.5510926, 7.5997408 47.5511152, 7.599746 47.5511129, 7.5997484 47.5511149, 7.5997448 47.5511183, 7.5997732 47.5511406, 7.5997784 47.5511384, 7.5997807 47.5511402, 7.5997771 47.5511437, 7.5998051 47.5511657, 7.5998107 47.5511638, 7.5998134 47.551166, 7.5998096 47.5511692, 7.5998186 47.5511762, 7.5996618 47.5512599, 7.5996588 47.5512574, 7.5996532 47.5512593, 7.5996507 47.5512573, 7.5996544 47.5512539, 7.5996264 47.5512319, 7.5996207 47.5512338, 7.5996182 47.5512319, 7.5996222 47.5512286, 7.5995939 47.5512064, 7.5995881 47.5512083, 7.5995855 47.5512063, 7.5995896 47.551203, 7.5995613 47.5511809, 7.5995557 47.5511829, 7.5995532 47.5511809, 7.5995571 47.5511776, 7.5995287 47.5511552, 7.599523 47.5511573, 7.5995204 47.5511553, 7.5995244 47.5511519, 7.5995101 47.5511407, 7.5994938 47.5511501, 7.5994969 47.5511541, 7.5994942 47.5511556, 7.599489 47.5511529, 7.599456 47.5511721, 7.599459 47.551176, 7.5994562 47.5511776, 7.599451 47.551175, 7.5994181 47.551194, 7.5994214 47.5511978, 7.5994186 47.5511995, 7.5994132 47.5511969, 7.5993958 47.551207, 7.5993804 47.5512159, 7.5993838 47.5512196, 7.5993808 47.5512213, 7.5993754 47.5512188, 7.5993423 47.5512379, 7.5993455 47.5512418, 7.5993427 47.5512434, 7.5993376 47.5512407, 7.5993046 47.5512598, 7.5993076 47.5512637, 7.5993049 47.5512653, 7.5992995 47.5512627, 7.5992832 47.5512722, 7.5992996 47.551285, 7.5992837 47.5512947, 7.5992865 47.551298, 7.5992834 47.5512999, 7.5992782 47.5512981, 7.5993219 47.5513338, 7.5993856 47.5512967, 7.5994706 47.551364, 7.5993337 47.5514442, 7.599248 47.551377, 7.5992923 47.5513511, 7.5992518 47.5513191, 7.5991152 47.5513981, 7.599097 47.551384, 7.5990913 47.5513859, 7.5990889 47.551384, 7.5990928 47.5513806, 7.5990643 47.5513584, 7.5990589 47.5513604, 7.5990563 47.5513583, 7.59906 47.551355, 7.5990314 47.5513327, 7.5990263 47.5513348, 7.599024 47.5513329, 7.5990274 47.5513296, 7.5989986 47.5513071, 7.5989936 47.551309, 7.5989913 47.5513072, 7.5989946 47.551304, 7.5989804 47.5512929))";
    if (t) unionPolygon = "POLYGON((7.5994698 47.5519639, 7.5994811 47.5519362, 7.5994732 47.5519337, 7.5994742 47.5519312, 7.5994831 47.5519313, 7.5994942 47.5519042, 7.5994863 47.5519014, 7.5994873 47.5518991, 7.5994961 47.5518995, 7.5995074 47.5518718, 7.5994994 47.5518693, 7.5995004 47.5518668, 7.5995092 47.5518672, 7.5995202 47.5518401, 7.5995332 47.5518425, 7.5995374 47.5518372, 7.5995406 47.5518378, 7.5995398 47.5518438, 7.5995805 47.5518513, 7.5995846 47.551846, 7.5995878 47.5518466, 7.5995871 47.5518526, 7.599628 47.5518602, 7.5996319 47.5518549, 7.599635 47.5518555, 7.5996349 47.5518615, 7.599675 47.551869, 7.5996789 47.5518637, 7.5996822 47.5518643, 7.5996817 47.5518702, 7.5997224 47.5518778, 7.5997265 47.5518725, 7.5997302 47.5518732, 7.5997296 47.5518792, 7.5997697 47.5518867, 7.5997738 47.5518814, 7.5997772 47.551882, 7.5997766 47.551888, 7.5998137 47.5518949, 7.5998177 47.5518896, 7.599821 47.5518902, 7.5998202 47.5518961, 7.5998247 47.551897, 7.5998422 47.5518528, 7.5998389 47.5518541, 7.5998362 47.5518523, 7.5998388 47.5518505, 7.5998269 47.5518423, 7.5998315 47.5518316, 7.5998279 47.5518309, 7.599829 47.5518283, 7.5998326 47.551829, 7.5998365 47.5518198, 7.5998267 47.551813, 7.599824 47.5518148, 7.5998213 47.5518129, 7.5998239 47.5518111, 7.5998017 47.5517958, 7.5997991 47.5517976, 7.5997963 47.5517957, 7.599799 47.5517939, 7.5997883 47.5517866, 7.5997755 47.5517889, 7.5997765 47.5517913, 7.5997726 47.551792, 7.5997716 47.5517896, 7.5997408 47.5517951, 7.5997418 47.5517976, 7.5997379 47.5517983, 7.599737 47.5517958, 7.5997202 47.5517988, 7.5997081 47.5517905, 7.5997054 47.5517923, 7.5997028 47.5517905, 7.5997055 47.5517887, 7.5996944 47.5517811, 7.5997281 47.5517749, 7.5996679 47.5517334, 7.5996651 47.5517352, 7.5996625 47.5517334, 7.5996653 47.5517316, 7.5996553 47.5517247, 7.5996414 47.5517272, 7.5996424 47.5517297, 7.5996388 47.5517304, 7.5996378 47.5517278, 7.5996211 47.5517308, 7.5996091 47.5517224, 7.5996064 47.5517241, 7.5996037 47.5517222, 7.5996063 47.5517205, 7.5995842 47.5517052, 7.5995821 47.5517069, 7.5995791 47.5517053, 7.5995815 47.5517033, 7.5995697 47.5516952, 7.5995743 47.5516838, 7.5995707 47.5516832, 7.5995718 47.5516805, 7.5995754 47.5516812, 7.5995837 47.5516606, 7.5995801 47.5516599, 7.5995812 47.5516574, 7.5995847 47.5516581, 7.599589 47.5516475, 7.5996055 47.5516446, 7.5996046 47.5516421, 7.5996085 47.5516414, 7.5996095 47.5516439, 7.5996394 47.5516385, 7.5996385 47.5516361, 7.5996423 47.5516354, 7.5996433 47.5516378, 7.5996574 47.5516353, 7.5996611 47.5516261, 7.5996575 47.5516254, 7.5996586 47.5516227, 7.5996622 47.5516234, 7.5996705 47.551603, 7.5996669 47.5516023, 7.599668 47.5515997, 7.5996716 47.5516004, 7.599676 47.5515895, 7.599693 47.5515864, 7.599692 47.551584, 7.5996962 47.5515832, 7.5996972 47.5515856, 7.5997269 47.5515803, 7.5997259 47.5515779, 7.5997301 47.5515771, 7.599731 47.5515795, 7.5997472 47.5515766, 7.5997593 47.5515849, 7.5997619 47.5515831, 7.5997646 47.551585, 7.599762 47.5515867, 7.5997841 47.5516019, 7.5997867 47.5516001, 7.5997895 47.551602, 7.5997869 47.5516038, 7.5997988 47.5516121, 7.5997942 47.5516234, 7.5997979 47.5516241, 7.5997969 47.5516265, 7.5997932 47.5516258, 7.5997848 47.5516464, 7.5997885 47.5516471, 7.5997875 47.5516495, 7.5997838 47.5516488, 7.5997795 47.5516594, 7.5997887 47.5516657, 7.5997916 47.5516638, 7.5997942 47.5516655, 7.5997913 47.5516675, 7.5998135 47.5516828, 7.5998164 47.5516808, 7.599819 47.5516826, 7.5998161 47.5516845, 7.5998257 47.5516911, 7.5998413 47.5516883, 7.5998403 47.5516857, 7.5998439 47.5516851, 7.5998449 47.5516877, 7.5998615 47.5516847, 7.599874 47.551693, 7.5998766 47.5516912, 7.5998793 47.551693, 7.5998766 47.5516948, 7.5998987 47.5517099, 7.5999013 47.5517081, 7.5999041 47.5517101, 7.5999015 47.5517118, 7.5999235 47.5517269, 7.5999261 47.5517252, 7.5999291 47.5517272, 7.5999264 47.5517289, 7.5999485 47.5517441, 7.5999512 47.5517423, 7.599954 47.5517443, 7.5999513 47.551746, 7.5999611 47.5517527, 7.5999751 47.5517503, 7.5999742 47.5517478, 7.5999781 47.5517472, 7.599979 47.5517496, 7.5999958 47.5517467, 7.6000077 47.5517548, 7.6000103 47.5517531, 7.6000128 47.5517548, 7.6000102 47.5517566, 7.6000322 47.5517718, 7.6000349 47.55177, 7.6000378 47.551772, 7.6000351 47.5517738, 7.6000571 47.551789, 7.6000598 47.5517872, 7.6000625 47.5517891, 7.6000598 47.5517909, 7.6000813 47.5518057, 7.600084 47.5518039, 7.6000872 47.5518061, 7.6000845 47.5518079, 7.6000967 47.5518163, 7.600092 47.5518277, 7.6000956 47.5518283, 7.6000945 47.5518309, 7.6000909 47.5518302, 7.6000824 47.5518508, 7.600086 47.5518514, 7.6000851 47.5518537, 7.6000815 47.551853, 7.6000767 47.5518646, 7.60006 47.5518675, 7.6000609 47.55187, 7.600057 47.5518706, 7.6000561 47.5518682, 7.6000261 47.5518734, 7.6000271 47.5518759, 7.6000229 47.5518766, 7.600022 47.5518741, 7.5999918 47.5518794, 7.5999928 47.5518819, 7.5999888 47.5518826, 7.5999879 47.5518801, 7.5999578 47.5518854, 7.5999587 47.5518878, 7.599955 47.5518885, 7.5999541 47.551886, 7.5999367 47.5518891, 7.5999247 47.5518807, 7.5999221 47.5518825, 7.5999191 47.5518804, 7.5999218 47.5518787, 7.5999002 47.5518636, 7.5998975 47.5518654, 7.5998949 47.5518635, 7.5998975 47.5518617, 7.5998877 47.5518548, 7.5998744 47.5518575, 7.5998755 47.5518599, 7.5998715 47.5518607, 7.5998697 47.5518585, 7.5998513 47.5519019, 7.5998638 47.5519043, 7.5998675 47.5518989, 7.5998715 47.5518996, 7.5998711 47.5519056, 7.5999109 47.5519131, 7.5999148 47.5519077, 7.5999183 47.5519084, 7.5999175 47.5519143, 7.5999583 47.5519219, 7.5999621 47.5519166, 7.5999658 47.5519172, 7.5999649 47.5519231, 7.6000056 47.5519307, 7.6000094 47.5519254, 7.600013 47.5519261, 7.6000121 47.551932, 7.6000527 47.5519395, 7.6000568 47.5519342, 7.6000605 47.5519349, 7.6000593 47.5519408, 7.6000998 47.5519483, 7.6001037 47.551943, 7.6001074 47.5519437, 7.6001059 47.5519495, 7.600147 47.5519571, 7.6001513 47.5519519, 7.600155 47.5519526, 7.6001537 47.5519584, 7.6001651 47.5519596, 7.6001692 47.5519594, 7.6001699 47.5519577, 7.6001709 47.5519579, 7.6001194 47.5520849, 7.6001044 47.5520819, 7.6001008 47.5520873, 7.6000979 47.5520867, 7.6000981 47.5520807, 7.600057 47.5520731, 7.6000537 47.5520785, 7.6000501 47.5520778, 7.6000507 47.5520719, 7.6000103 47.5520644, 7.6000064 47.5520697, 7.6000032 47.5520691, 7.6000039 47.5520632, 7.5999633 47.5520556, 7.5999591 47.5520609, 7.5999557 47.5520603, 7.5999566 47.5520544, 7.5999158 47.5520468, 7.5999115 47.5520521, 7.5999084 47.5520515, 7.5999094 47.5520456, 7.5998683 47.552038, 7.5998642 47.5520433, 7.599861 47.5520427, 7.5998615 47.5520367, 7.5998383 47.5520324, 7.5998208 47.5520292, 7.5998172 47.5520345, 7.5998137 47.5520339, 7.5998137 47.5520278, 7.599774 47.5520205, 7.5997693 47.5520256, 7.599766 47.552025, 7.5997667 47.5520191, 7.5997262 47.5520116, 7.5997218 47.5520168, 7.5997186 47.5520162, 7.5997189 47.5520102, 7.5996788 47.5520028, 7.5996744 47.552008, 7.5996714 47.5520074, 7.5996717 47.5520014, 7.5996317 47.551994, 7.5996276 47.5519993, 7.5996243 47.5519987, 7.5996246 47.5519927, 7.5995844 47.5519852, 7.5995807 47.5519906, 7.5995772 47.5519899, 7.5995779 47.551984, 7.5995367 47.5519764, 7.5995324 47.5519816, 7.5995293 47.551981, 7.5995298 47.5519751, 7.5994894 47.5519676, 7.5994856 47.5519729, 7.5994821 47.5519723, 7.5994828 47.5519663, 7.5994698 47.5519639))";
    if (t) unionPolygon = "POLYGON((7.599767 47.5526798,7.5997487 47.5526866,7.5994203 47.5526245,7.599491 47.5524535,7.5995463 47.5524639,7.5997672 47.5525058,7.5997611 47.5525208,7.5997976 47.5525277,7.5997457 47.5526517,7.599767 47.5526798))";

    unionPolygon = "POLYGON((8.2950902 47.0539674,8.2956315 47.0537371,8.2960512 47.0534912,8.2961082 47.0534977,8.2962449 47.0536413,8.2963513 47.0535908,8.2965773 47.0538069,8.2965222 47.0538302,8.2965716 47.0538872,8.2963323 47.0539958,8.2962183 47.0538755,8.296243 47.0538639,8.2960265 47.0536646,8.2959771 47.0536905,8.296338 47.0540644,8.2961708 47.0541459,8.2961177 47.0541045,8.2960588 47.0541317,8.296036 47.0541071,8.2960968 47.0540787,8.2958575 47.0538212,8.2958233 47.0538406,8.2958053 47.053824,8.2958404 47.0538043,8.2958252 47.0537888,8.2957283 47.0538445,8.2955384 47.0539221,8.2958423 47.054287,8.2959069 47.0542624,8.2958328 47.0541796,8.2959619 47.0541252,8.296055 47.0542197,8.2964044 47.054058,8.2964595 47.0541201,8.2961025 47.0542818,8.2959809 47.0543284,8.2955251 47.0544371,8.2950902 47.0539674))";
    unionPolygon = "POLYGON((7.5854178 47.5546641,7.5856047 47.5547157,7.5854861 47.5549134,7.5855174 47.5549418,7.58542 47.5549891,7.5854217 47.5549906,7.5853935 47.5550036,7.5853897 47.5549999,7.5852379 47.5549567,7.5852531 47.5549313,7.585316 47.5548265,7.5853835 47.5547142,7.5853943 47.5547036,7.5854178 47.5546641))";
    unionPolygon = "POLYGON((7.5862853 47.5545559,7.5863232 47.5545891,7.5863658 47.5546264,7.5860517 47.554783,7.5859754 47.5547135,7.5860047 47.5546982,7.5860746 47.5546618,7.5862853 47.5545559))";
    unionPolygon = "POLYGON((2.3135697 48.8747166,2.3136716 48.8743745,2.3139455 48.8744217,2.3139041 48.8745557,2.3139838 48.8745648,2.3139936 48.8745669,2.3140003 48.8745702,2.3140039 48.8745744,2.3140053 48.8745773,2.3140059 48.8745822,2.314005 48.8745864,2.3140362 48.8745885,2.3140375 48.8745847,2.3140406 48.8745809,2.3140488 48.8745758,2.3140577 48.8745724,2.3140667 48.8745723,2.3140756 48.8744441,2.3142516 48.8744744,2.314242 48.874586,2.3142362 48.8746542,2.3138877 48.8746057,2.3138336 48.8747533,2.313729 48.8747387,2.3135697 48.8747166))";


    let latlongs: L.LatLng[] = polygonStringToCoordinates(unionPolygon);
    console.log(latlongs);
    console.log("string", t, JSON.stringify(latlongs, null, 2));

    let polygon = L.polygon(latlongs);

    polygon.bindPopup(unionPolygon)
        .addTo(map);
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


function foo()
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
