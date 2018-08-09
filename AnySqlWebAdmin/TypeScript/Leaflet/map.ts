
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


    interface Function 
    {
        name: string;
    }


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
    setPrototypeOf(obj: any, prototype: any):any;
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
async function getData(url:string, data?: any)
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
        ,"body": <any>null
    };


    if (data != null)
    {
        if (typeof data === 'string' || data instanceof String)
            options["body"] = data;
        else
            options["body"] = JSON.stringify( { "id": 123 } );
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
        if(req != null)
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
let polygons:any = [];
let markers: any = [];
let werbetafeln :any= [];




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
    
    
function SetDefaultVariables(url:string)
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


function spreadMessage(object:any)
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
        Portal.Global.spreadMessage(object);
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


function navigateTo(uuid:string)
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

    let len:number = poly.length;
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
function thousandSeparator(x:number | string): string
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


async function addWerbetafel(lat: number, lng:number)
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
        let uid:string = table.rows[i][index_uid];
        let latitude:number = table.rows[i][index_latitude];
        let longitude:number = table.rows[i][index_longitude];

        if (latitude == null || longitude == null)
            continue;

        let werbetafel_icon = createWerbetafelIcon();

        // let marker = L.marker([latitude, longitude]).addTo(map);
        let marker = L.marker([latitude, longitude], { icon: werbetafel_icon }).addTo(map);
        marker.on("click", onMarkerClick.bind(this, uid)); // uid is now called uuid
        marker.on("contextmenu", onMarkerContextMenu.bind(this, uid)); // uid is now called uuid
        werbetafeln[uid] = marker;
    } // Next i 

} // End Function addWerbetafel 


async function deleteWerbetafel(uuid:string)
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


function logParams(args:IArguments)
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

    function resolveCaller(a: Function):string
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

    let container = <HTMLElement> <any>document.createDocumentFragment();
    let title = document.createElement("span");
    title.setAttribute("style", "font-weight: bold;");
    title.appendChild( document.createTextNode("Hier können Sie") );
    container.appendChild(title);
    container.appendChild(document.createElement("br"));

    let menuOption = document.createElement("a");
    menuOption.addEventListener("click", deleteWerbetafel.bind(this, uuid) );
    
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

// TODO: lat/lng als Argumente überflüssig... lat?: any, lng?:any
async function loadWerbetafeln()
{
    let url = "../ajax/AnySelect.ashx?sql=Maps.Marker_Werbetafeln.sql";
    url = SetDefaultVariables(url);

    let result = await getData(url);
    // console.log("loadWerbetafeln: success");

    let table = result.tables[0];
    // console.log(table);

    let index_uid:string = table.columns["OBJ_UID"].index;
    let index_latitude:number = table.columns["OBJ_Lat"].index;
    let index_longitude:number = table.columns["OBJ_Lng"].index;

    for (let i = 0; i < table.rows.length; ++i)
    {
        let uid = table.rows[i][index_uid];
        let latitude = table.rows[i][index_latitude];
        let longitude = table.rows[i][index_longitude];

        if (latitude == null || longitude == null)
            continue;

        let werbetafel_icon = createWerbetafelIcon();

        // let marker = L.marker([latitude, longitude]).addTo(map);
        let marker = L.marker([latitude, longitude], { icon: werbetafel_icon });

        if (map.getZoom() > 16)
        {
            marker.addTo(map);
        }

        marker.on("click", onMarkerClick.bind(this, uid)); // uid is now called uuid
        marker.on("contextmenu", onMarkerContextMenu.bind(this, uid)); // uid is now called uuid
        werbetafeln[uid] = marker;
    } // Next i 

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

    let timoutHandle:number = null;
    let timoutHandle2:number = null;

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
                if (mutation.attributeName === 'style' && cs.getPropertyValue('display') !== 'none' )
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


function addTextLabel(map: L.Map, poly: L.LatLng[], label: string)
{
    let centroid = get_polygon_centroid(poly);

    let span = document.createElement("span");
    let labeltexts = label.split("<br />");




    for (let l = 0; l < labeltexts.length; ++l)
    {
        if (l != 0)
            span.appendChild(document.createElement("br"));

        span.appendChild(document.createTextNode(labeltexts[l]));
    } // Next l 


    span.style.display = "hidden";
    document.body.appendChild(span);
    let ow = span.offsetWidth;
    let oh = span.offsetHeight;
    span.parentElement.removeChild(span);

    let textIcon = L.divIcon(
        {
            className: "customTextIcon",
            iconSize: [ow, oh],
            iconAnchor: [ow / 2, oh / 2],
            popupAnchor: [0, 0],
            html: span.outerHTML
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
        let uid:string = table.rows[i][index_uid];
        let code:string = table.rows[i][index_code];
        let label:string = table.rows[i][index_label] || "";
        let latitude:number = table.rows[i][index_latitude];
        let longitude:number = table.rows[i][index_longitude];
        let category: string = table.rows[i][index_category];
        let color:string = table.rows[i][index_color];
        let polyString:string = table.rows[i][index_poly];


        // console.log(uid);
        // console.log(code);
        // console.log(label);
        // console.log(latitude);
        // console.log(longitude);
        // console.log(poly);

        label = label.replace(/(?:\r\n|\r|\n)/g, '<br />');
        // console.log(label);

        //let poly: string[][] = null;
        let poly: L.LatLng[] = null;
        if (polyString != null)
            poly = polyString.split(",").map(function (x) { let z = x.split(' '); return new L.LatLng(Number(z[0]), Number(z[1]))});
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


        let houseImage = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\"\n   viewBox=\"0 0 512 512\" width=\"22px\" height=\"22px\">\n<path\n d=\"M256,69.972L50,275.814h42.507v166.214h326.985V275.814H462L256,69.972z M374.492,397.028  h-73.768v-86.495h-89.451v86.495h-73.768V251.99L256,133.587l118.492,118.402V397.028z\"\n  fill=\"{@col1}\" />\n<path\n fill=\"{@col2}\" opacity=\"0.4\" \n d=\"M 137.505,251.99 256,133.587 374.492,251.989 v 145.039 h -73.768 v -86.495 h -89.451 v 86.495 h -73.768 z\" />\n</svg>";

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

        // https://jsfiddle.net/guspersson/393ehmsq/
        // let marker = L.marker([latitude, longitude]).addTo(map);
        let marker = L.marker([latitude, longitude], { icon: greenIcon }).addTo(map);


        let tt = L.tooltip(
            {
                permanent: true,
                direction: 'top'
                // direction: 'right'
                //tooltipAnchor: [1120, 1120]
                // , _anchor: [0, -110]
            }
        )
        .setContent(label);

        // marker.bindTooltip(tt);


        let contentString = category + "<br />" + label;
        // + "<br />GPS: " + latLongToString(latlng);
        // contentString = contentString + "<br />" + "Fl&auml;che: " + thousandSeparator(polygonArea(poly)) + " m<sup>2</sup>&nbsp;&nbsp;(+/-30m<sup>2</sup>)";
        let popup = new L.Popup()
            .setLatLng(latlng)
            .setContent(contentString)
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

        }.bind(this, uid));
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


        let polygon = L.polygon(poly);
        addTextLabel(map, poly, label);


        /*
        polygon.setStyle({
        fillColor: '#FF00FF'
        ,fillOpacity: 0.7
        ,color: 'white'  //Outline color
        ,weight: 2
        ,opacity: 1
        });
        */
        
        let popupString = "Fl&auml;che: " + thousandSeparator(polygonArea(poly)) + " m<sup>2</sup>";
        polygon.addTo(map)
            //.bindPopup(popupString)
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
    }.bind(this, initialBounds);
        
    map.zoomHome();
    // console.log("leaving loadMarkers");
} // End Function loadMarkers 



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
    
    
async function zoomIn(uid:string)
{
    // console.log("zoomIn", uid);
    let boundsUrl = "../ajax/AnySelect.ashx?sql=Maps.ObjectBounds.sql&obj_uid=";
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
        let code:string = table.rows[i][index_objt];
        let uid:string = table.rows[i][index_uid];
        let latitude: number = table.rows[i][index_latitude];
        let longitude: number = table.rows[i][index_longitude];


        let minLat: number= table.rows[i][index_minLat];
        let minLng: number= table.rows[i][index_minLng];
        let maxLat: number= table.rows[i][index_maxLat];
        let maxLng: number= table.rows[i][index_maxLng];

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
    }

} // End Function ZoomIn
    
    
// target: typ (ld, ort, so, gb)
async function onBaumClick(uid:string, typ:string)
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
            zoomIn(uid);
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

} // End Function onBaumClick


async function receiveMessage(event:MessageEvent)
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
    sort:number;
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

    function addRow(color:string, text:string)
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
        let uid:string = table.rows[i][index_uid];
        let kurz:string = table.rows[i][index_kurz];
        let lang:string = table.rows[i][index_lang];
        let color:string = table.rows[i][index_color];
        //let sort:number = table.rows[i][index_sort];

        // console.log(uid, kurz, lang, color);
        gk_legend.appendChild(addRow(color, lang));
    } // Next i 

} // End Function loadLegend



interface IApertureColorTable 
{
    uid: string;
    color: string;
    sort:number;
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

    
    
function createZoomControl(map:L.Map & IMapWithZoom)
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
    clearHomeZoom.setAttribute("style","clear: both;");
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
    clearPlusZoom.setAttribute("style","clear: both;");
    zoomControl.appendChild(clearPlusZoom);
    
    
    let minusZoom = document.createElement("div");
    minusZoom.setAttribute("class", "mp");
    minusZoom.setAttribute("style","border-bottom-left-radius: 5mm; border-bottom-right-radius: 5mm;");
    minusZoom.appendChild(document.createTextNode("-"));
    
    minusZoom.addEventListener("click", function ()
    {
        map.zoomOut();
    }, false);
        
    zoomControl.appendChild(minusZoom);
        
        
    let clearMinusZoom = document.createElement("div");
    clearMinusZoom.setAttribute("style","clear: both;");
    zoomControl.appendChild(clearMinusZoom);
    
    
    document.body.appendChild(zoomControl);
}




// let url = "http://localhost:59799/sql?sql=Maps.Gebaeudekategorie.sql&BE_Hash=12435&format=" + badDataTable.toString();
async function getXml(url:string, data?: any)
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
        ,"headers": myHeaders

        // https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/
        // https://googlechrome.github.io/samples/fetch-api/fetch-referrer-policy.html
        // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-state-origin
        // https://w3c.github.io/webappsec/
        // https://github.com/w3c/WebAppSec
        , "referrerPolicy": "origin-when-cross-origin" 

        // ,"mode": "no-cors" 
        ,"body": <any>null
    };
    
    
    if (data != null)
    {
        if (typeof data === 'string' || data instanceof String)
            options["body"] = data;
        else
            options["body"] = JSON.stringify( { "id": 123 } );
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
        if(req != null)
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


function getBoundsArea(bounds:L.LatLngBounds):number 
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


// https://maps.wikimedia.org
// https://maps.wikimedia.org/main.js
async function initMap()
{
    // L.DomUtil.get('swissMap')._leaflet_id
        
    // console.log("init");
    let ml: HTMLElement = <HTMLElement>window.parent.document.querySelector('#iMenuLeft');

    // Create a map
    map = <any>L.map('swissMap', { zoomControl: false }).setView([47.317390, 8.520293], 18); // SwissRe Soodring 33, Adliswil
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

    // Add a map layer
    L.tileLayer("{server}/{style}/{z}/{x}/{y}{scalex}.png?lang={language}",
        {
            maxZoom: 18
            , attribution: '<a target="blank" href="https://www.mediawiki.org/wiki/Maps/Technical_Implementation">Wikimedia maps beta</a> | Map data &copy; <a target="blank" href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            , server: "https://maps.wikimedia.org"
            , style: "osm-intl" // "osm" // Map style to use.Use "osm-intl" for map with labels, "osm" for map without labels.
            , scalex: scalex
            , language: getUserLanguage() // fr, it, en
        }
    ).addTo(map);

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
        menuOption.addEventListener("click", addWerbetafel.bind(this, e.latlng.lat, e.latlng.lng) );
        
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


    //map.on("click", function (e)
    //{
    //    console.log(e.latlng);
    //});


    //map.on("dblclick", function (e)
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


function CreatePolygon( latLongs:L.LatLng[])
{
    //POLYGON ((73.232821 34.191819,73.233755 34.191942,73.233653 34.192358,73.232843 34.192246,73.23269 34.191969,73.232821 34.191819))
    let polyString = "";

    for (let i = 0; i < latLongs.length; ++i)
    {
        if (i !== 0)
            polyString += ",";

        polyString += latLongs[i].lng + " " + latLongs[i].lat; // + ",";
    }
    
    polyString = "POLYGON((" + polyString+"))";
    return polyString;
}

function CreateSqlPolygon( latLongs:L.LatLng[])
{
    let s = "geography::STPolyFromText('" + CreatePolygon(latLongs) + "', 4326)";
    console.log(s);
    return s; 
}


// setPositon(47.551811, 7.599570);
function setPositon(latitude:number, longitude:number)
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


async function startMap()
{
    polyFills();
    loadLegend();
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

}

startMap();


// }


// marker.bindTooltip("My Label", { permanent: true, className: "my-label", offset: [0, 0] });
// polygon.bindTooltip("My Label", { permanent: true, className: "my-label", offset: [0, 0] });
