'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RenderType_t;
(function (RenderType_t) {
    RenderType_t[RenderType_t["Default"] = 0] = "Default";
    RenderType_t[RenderType_t["Indented"] = 1] = "Indented";
    RenderType_t[RenderType_t["DataTable"] = 2] = "DataTable";
    RenderType_t[RenderType_t["Array"] = 4] = "Array";
    RenderType_t[RenderType_t["Data_Only"] = 8] = "Data_Only";
    RenderType_t[RenderType_t["Columns_Associative"] = 16] = "Columns_Associative";
    RenderType_t[RenderType_t["Columns_ObjectArray"] = 32] = "Columns_ObjectArray";
    RenderType_t[RenderType_t["WithDetail"] = 64] = "WithDetail";
    RenderType_t[RenderType_t["ShortName"] = 128] = "ShortName";
    RenderType_t[RenderType_t["LongName"] = 256] = "LongName";
    RenderType_t[RenderType_t["AssemblyQualifiedName"] = 512] = "AssemblyQualifiedName";
    RenderType_t[RenderType_t["All"] = 1023] = "All";
})(RenderType_t || (RenderType_t = {}));
var BaseError = (function () {
    function BaseError() {
        Error.apply(this, arguments);
    }
    return BaseError;
}());
BaseError.prototype = new Error();
var HttpRequestError = (function (_super) {
    __extends(HttpRequestError, _super);
    function HttpRequestError(status, message) {
        var _this = _super.call(this) || this;
        _this.status = status;
        _this.message = message;
        return _this;
    }
    return HttpRequestError;
}(BaseError));
var ApplicationOfflineError = (function (_super) {
    __extends(ApplicationOfflineError, _super);
    function ApplicationOfflineError(m) {
        var _this = _super.call(this, m) || this;
        Object.setPrototypeOf(_this, ApplicationOfflineError.prototype);
        return _this;
    }
    ApplicationOfflineError.prototype.sayHello = function () {
        return "hello " + this.message;
    };
    return ApplicationOfflineError;
}(Error));
function checkData() {
    var sql = "\n-- SELECT \n-- \t T_AP_Ref_AnlageKategorie.AK_UID \n-- \t,T_AP_Ref_AnlageKategorie.AK_Code \n-- \t,T_AP_Ref_AnlageKategorie.AK_Lang_DE \n-- \t,T_AP_Ref_AnlageKategorie.AK_AK_UID \n-- FROM T_AP_Ref_AnlageKategorie \n-- WHERE T_AP_Ref_AnlageKategorie.AK_Status = 1 \n-- AND T_AP_Ref_AnlageKategorie.AK_LANG_DE LIKE '%werbe%' \n\n\nSELECT \n\t T_AP_Anlage.AL_UID\n\t,T_AP_Anlage.AL_AK_UID\n\t,T_AP_Anlage.AL_ApertureKey\n\t,T_AP_Anlage.AL_Nr\n\t,T_AP_Anlage.AL_GM_Lat\n\t,T_AP_Anlage.AL_GM_Lng\n\t,T_AP_Anlage.AL_GM_SVLat\n\t,T_AP_Anlage.AL_GM_SVLng\n\t  \n\t,T_AP_Anlage.AL_BE_ID\n\t,T_AP_Anlage.AL_AL_UID\n\t,T_AP_Anlage.AL_RM_UID\n\t,T_AP_Anlage.AL_ADR_UID\n\t,T_AP_Anlage.AL_GS_UID\n\t,T_AP_Anlage.AL_GB_UID\n\t,T_AP_Anlage.AL_SO_UID\n\t,T_AP_Anlage.AL_BKP_UID\nFROM T_AP_Anlage\nWHERE (1=1) \n-- AND T_AP_Anlage.AL_Status = 1 \n-- AND CURRENT_TIMESTAMP BETWEEN T_AP_Anlage.AL_DatumVon AND T_AP_Anlage.AL_DatumBis \nAND T_AP_Anlage.AL_AK_UID = 'ED49E68B-AB6A-4FAC-93B4-B1507E9FDB68'\n;\n\n/*\nDELETE FROM T_COR_ZO_ObjektRechte_Lesen \nWHERE (CAST(ZO_OBJR_OBJ_UID AS varchar(36)) + ZO_OBJR_OBJ_OBJT_Code) IN \n(\n\tSELECT CAST(T_COR_Objekte.OBJ_UID AS varchar(36)) +  T_COR_Objekte.OBJ_OBJT_Code \n\tFROM T_COR_Objekte \n\tWHERE T_COR_Objekte.OBJ_AL_UID IN \n\t(SELECT T_AP_Anlage.AL_UID FROM T_AP_Anlage WHERE (1=1) AND T_AP_Anlage.AL_AK_UID = 'ED49E68B-AB6A-4FAC-93B4-B1507E9FDB68') \n); \n\nDELETE FROM T_COR_Objekte WHERE T_COR_Objekte.OBJ_AL_UID IN \n(\n\tSELECT T_AP_Anlage.AL_UID FROM T_AP_Anlage WHERE (1=1) AND T_AP_Anlage.AL_AK_UID = 'ED49E68B-AB6A-4FAC-93B4-B1507E9FDB68'\n); \n\nDELETE FROM T_AP_Anlage WHERE (1=1) AND T_AP_Anlage.AL_AK_UID = 'ED49E68B-AB6A-4FAC-93B4-B1507E9FDB68';\n*/\n\n";
}
function getData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var prettyDataTable, prettyBadDataTable, badDataTable, req, json, obj, ex1, ex2, ex3, myHeaders, options, ex_1, ex_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (url == null) {
                        throw Error("URL is NULL...");
                    }
                    if (!navigator.onLine) {
                        throw new HttpRequestError(500, 'Client offline');
                    }
                    prettyDataTable = RenderType_t.Indented | RenderType_t.DataTable;
                    prettyBadDataTable = RenderType_t.Columns_Associative | RenderType_t.Indented;
                    badDataTable = RenderType_t.Columns_Associative;
                    if (url.indexOf("?") != -1)
                        url += "&format=" + prettyBadDataTable;
                    else
                        url += "?format=" + prettyBadDataTable;
                    if (url.indexOf("no_cache") == -1)
                        url += "&no_cache=" + (new Date()).getTime();
                    req = null;
                    json = null;
                    obj = null;
                    ex1 = null;
                    ex2 = null;
                    ex3 = null;
                    myHeaders = new Headers();
                    myHeaders.append("Accept", "application/json");
                    myHeaders.append("Content-Type", "application/json");
                    options = {
                        "method": "POST",
                        "headers": myHeaders,
                        "body": null
                    };
                    if (data != null) {
                        if (typeof data === 'string' || data instanceof String)
                            options["body"] = data;
                        else
                            options["body"] = JSON.stringify({ "id": 123 });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fetch(url, options)];
                case 2:
                    req = _a.sent();
                    return [3, 4];
                case 3:
                    ex_1 = _a.sent();
                    console.log(ex_1);
                    ex1 = ex_1;
                    return [3, 4];
                case 4:
                    _a.trys.push([4, 7, , 8]);
                    if (!(req != null)) return [3, 6];
                    return [4, req.text()];
                case 5:
                    json = _a.sent();
                    _a.label = 6;
                case 6: return [3, 8];
                case 7:
                    ex_2 = _a.sent();
                    console.log(ex_2);
                    ex2 = ex_2;
                    return [3, 8];
                case 8:
                    try {
                        obj = JSON.parse(json);
                    }
                    catch (ex) {
                        ex3 = ex;
                        console.log(ex);
                    }
                    if (obj == null) {
                        throw new HttpRequestError(500, 'Server Error');
                    }
                    return [2, obj];
            }
        });
    });
}
var ignoreThisNavigation = false;
var map = null;
var polygons = [];
var markers = [];
var werbetafeln = [];
function polyFills() {
    var debug_ipad = false;
    if (debug_ipad) {
        window.onerror = function (messageOrEvent, source, lineno, colno, error) {
            alert(messageOrEvent);
            if (source != null)
                alert(source);
        };
    }
    Math.trunc = Math.trunc || function (x) {
        var n = x - x % 1;
        return n === 0 && (x < 0 || (x === 0 && (1 / x !== 1 / 0))) ? -0 : n;
    };
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180.0;
    };
    if (!(function f() { }).name) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function () {
                var name = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
                Object.defineProperty(this, 'name', { value: name });
                return name;
            }
        });
    }
}
function SetDefaultVariables(url) {
    if (window.parent.Settings) {
        url = url.replace("{@basic}", window.parent.Settings.basicLink);
    }
    if (window.top && window.top.Portal && window.top.Portal.Session && window.top.Portal.Session.ID) {
        url = url.replace("{@BE_Hash}", window.top.Portal.Session.ID());
    }
    else
        url = url.replace("{@BE_Hash}", "200CEB26807D6BF99FD6F4F0D1CA54D4");
    return url;
}
function spreadMessage(object) {
    var inFrame = (function () {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    })();
    console.log("inFrame", inFrame);
    if (inFrame)
        Portal.Global.spreadMessage(object);
    else {
        window.postMessage(JSON.stringify(object), '*');
    }
}
function bracketDevicePixelRatio() {
    var brackets = [1, 1.3, 1.5, 2, 2.6, 3], baseRatio = window.devicePixelRatio || 1;
    for (var i = 0; i < brackets.length; i++) {
        var scale = brackets[i];
        if (scale >= baseRatio || (baseRatio - scale) < 0.1) {
            return scale;
        }
    }
    return brackets[brackets.length - 1];
}
function testNaviSO() {
    var msg = {
        "Action": "VWS.Tree.onAfterSelectionChange",
        "Param": {
            "Action": "",
            "Data": {
                "Type": "SO",
                "Value": "c38860a1-1c61-4590-9410-9fa1ab8586b1",
                "Text": "0006 Althardstrasse",
                "Parent": "31bfa452-e97d-475a-ac65-cf4d885fcd5c",
                "ApertureObjID": "0000000002GQ0000C2",
                "_hasPRT": 1,
                "_hasInsert": 1,
                "_hasDelete": 1
            }
        }
    };
    spreadMessage(msg);
}
function testNaviGB() {
    var msg = {
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
    };
    spreadMessage(msg);
}
function testFilterChange() {
    var msg = {
        "Action": "VWS.Tree.onAfterFilterChange",
        "Param": {
            "Datum": "",
            "LD": "",
            "RG": "",
            "ORT": ""
        }
    };
    spreadMessage(msg);
}
function navigateTo(uuid) {
    spreadMessage({
        Action: 'vws.tree.navigateto',
        Param: {
            navigateTo: uuid
        }
    });
}
function polygonAreaOld(poly2) {
    var area = 0.0;
    var poly = JSON.parse(JSON.stringify(poly2));
    var len = poly.length;
    for (var i = 0; i < len; i++) {
        poly[i] = poly[i].map(Math.radians);
    }
    if (len > 2) {
        for (var i = 0; i < len - 1; i++) {
            var p1 = poly[i];
            var p2 = poly[i + 1];
            area += (p2[0] - p1[0]) *
                (2
                    + Math.sin(p1[1])
                    + Math.sin(p2[1]));
        }
        var mean_radius = 6371008.8;
        var radius = mean_radius;
        area = area * radius * radius / 2.0;
    }
    return Math.abs(area).toFixed(0);
}
function polygonArea(poly2) {
    var area = 0.0;
    var poly = [];
    for (var q = 0; q < poly2.length; ++q) {
        poly.push(new L.LatLng(Math.radians(poly2[q].lat), Math.radians(poly2[q].lng)));
    }
    if (poly[0].lat != poly[poly.length - 1].lat || poly[0].lng != poly[poly.length - 1].lng) {
        poly.push(new L.LatLng(poly[0].lat, poly[0].lng));
    }
    var len = poly.length;
    for (var i = 0; i < len; i++) {
        if (len > 2) {
            for (i = 0; i < len - 1; i++) {
                var p1 = poly[i];
                var p2 = poly[i + 1];
                area += (p2.lat - p1.lat) *
                    (2
                        + Math.sin(p1.lng)
                        + Math.sin(p2.lng));
            }
            var equatorial_radius = 6378137;
            var polar_radius = 6356752.3142;
            var mean_radius = 6371008.8;
            var authalic_radius = 6371007.2;
            var volumetric_radius = 6371000.8;
            var radius = mean_radius;
            area = area * radius * radius / 2.0;
        }
    }
    return parseFloat(Math.abs(area).toFixed(0));
}
function latLongToString(latlng) {
    var x = latlng.lat;
    var y = latlng.lng;
    var prefix1 = x < 0 ? "S" : "N";
    var prefix2 = y < 0 ? "W" : "E";
    x = Math.abs(x);
    y = Math.abs(y);
    var grad1 = Math.trunc(x);
    x = (x - grad1) * 60;
    var grad2 = Math.trunc(y);
    y = (y - grad2) * 60;
    var min1 = Math.trunc(x);
    var min2 = Math.trunc(y);
    var sec1 = ((x - min1) * 60).toFixed(1);
    var sec2 = ((y - min2) * 60).toFixed(1);
    min1 = (min1 < 10 ? "0" : "") + min1;
    min2 = (min2 < 10 ? "0" : "") + min2;
    sec1 = (sec1 < 10 ? "0" : "") + sec1;
    sec2 = (sec2 < 10 ? "0" : "") + sec2;
    var res = grad1 + "°" + min1 + "'" + sec1 + '"' + prefix1 + " " + grad2 + "°" + min2 + "'" + sec2 + '"' + prefix2;
    return res;
}
function thousandSeparator(x) {
    if (x == null)
        return "";
    var s = x.toString();
    var i = s.indexOf(".");
    var comma = "";
    if (i != -1) {
        comma = s.substr(i);
        s = s.substr(0, i);
    }
    s = s.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    s += comma;
    return s;
}
function addWerbetafel(lat, lng) {
    return __awaiter(this, void 0, void 0, function () {
        var url, result, table, index_uid, index_latitude, index_longitude, i, uid, latitude, longitude, werbetafel_icon, marker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map.closePopup();
                    url = "../ajax/AnySelect.ashx?sql=Maps.InsertWerbetafel.sql&lat={@lat}&lng={@lng}";
                    url = SetDefaultVariables(url);
                    url = url.replace("{@lat}", lat.toString());
                    url = url.replace("{@lng}", lng.toString());
                    return [4, getData(url)];
                case 1:
                    result = _a.sent();
                    table = result.tables[0];
                    index_uid = table.columns["OBJ_UID"].index;
                    index_latitude = table.columns["OBJ_Lat"].index;
                    index_longitude = table.columns["OBJ_Lng"].index;
                    for (i = 0; i < table.rows.length; ++i) {
                        uid = table.rows[i][index_uid];
                        latitude = table.rows[i][index_latitude];
                        longitude = table.rows[i][index_longitude];
                        if (latitude == null || longitude == null)
                            continue;
                        werbetafel_icon = createWerbetafelIcon();
                        marker = L.marker([latitude, longitude], { icon: werbetafel_icon }).addTo(map);
                        marker.on("click", onMarkerClick.bind(this, uid));
                        marker.on("contextmenu", onMarkerContextMenu.bind(this, uid));
                        werbetafeln[uid] = marker;
                    }
                    return [2];
            }
        });
    });
}
function deleteWerbetafel(uuid) {
    return __awaiter(this, void 0, void 0, function () {
        var url, result, ex_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("delete werbetafel ", uuid);
                    url = "../ajax/AnySelect.ashx?sql=Maps.DeleteWerbetafel.sql&obj_uid=" + uuid;
                    url = SetDefaultVariables(url);
                    result = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, getData(url)];
                case 2:
                    result = _a.sent();
                    console.log("finished deleting werbetafel ", uuid);
                    werbetafeln[uuid].remove();
                    delete werbetafeln[uuid];
                    return [3, 4];
                case 3:
                    ex_3 = _a.sent();
                    console.log(ex_3);
                    return [3, 4];
                case 4:
                    map.closePopup();
                    return [2];
            }
        });
    });
}
function getParamNames(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}
function logParams(args) {
    var pn = getParamNames(args.callee);
    var x = {};
    for (var i = 0; i < args.length; ++i) {
        if (i >= pn.length)
            x["arg[" + (i + 1).toString() + "]"] = args[i];
        else
            x[pn[i]] = args[i];
    }
    function resolveCaller(a) {
        if (a == null)
            return "'window/global'";
        if (a.name != null && a.name != "")
            return a.name;
        return "'anonymous function' in " + resolveCaller(a.caller);
    }
}
function onMarkerContextMenu(uuid, e) {
    function addPosition(latlng) {
        return ' data-position="' + latlng.lat + ' ' + latlng.lng + '" ';
    }
    var container = document.createDocumentFragment();
    var title = document.createElement("span");
    title.setAttribute("style", "font-weight: bold;");
    title.appendChild(document.createTextNode("Hier können Sie"));
    container.appendChild(title);
    container.appendChild(document.createElement("br"));
    var menuOption = document.createElement("a");
    menuOption.addEventListener("click", deleteWerbetafel.bind(this, uuid));
    menuOption.appendChild(document.createTextNode("eine Leuchtreklame entfernen"));
    container.appendChild(menuOption);
    var popup = new L.Popup({ closeButton: true, autoClose: true })
        .setLatLng(e.latlng)
        .setContent(container);
    popup.openOn(map);
}
function onMarkerClick(uuid, e) {
    var t = "{@basic}anlage.aspx?uid={@obj}&muid=AL&env=ov&ro=false&proc={@BE_Hash}";
    t = SetDefaultVariables(t);
    var ml = window.parent.document.querySelector('#frameDWGForm');
    if (ml)
        ml.src = t.replace("{@obj}", uuid);
    observeIframe();
}
function createWerbetafelIcon() {
    var icon = L.divIcon({
        className: "customIcon",
        iconAnchor: [12, 12],
        popupAnchor: [0, 0],
        html: "<img src=\"../leaflet/images/helvetia23.png\" />"
    });
    return icon;
}
function loadWerbetafeln() {
    return __awaiter(this, void 0, void 0, function () {
        var url, result, table, index_uid, index_latitude, index_longitude, i, uid, latitude, longitude, werbetafel_icon, marker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "../ajax/AnySelect.ashx?sql=Maps.Marker_Werbetafeln.sql";
                    url = SetDefaultVariables(url);
                    return [4, getData(url)];
                case 1:
                    result = _a.sent();
                    table = result.tables[0];
                    index_uid = table.columns["OBJ_UID"].index;
                    index_latitude = table.columns["OBJ_Lat"].index;
                    index_longitude = table.columns["OBJ_Lng"].index;
                    for (i = 0; i < table.rows.length; ++i) {
                        uid = table.rows[i][index_uid];
                        latitude = table.rows[i][index_latitude];
                        longitude = table.rows[i][index_longitude];
                        if (latitude == null || longitude == null)
                            continue;
                        werbetafel_icon = createWerbetafelIcon();
                        marker = L.marker([latitude, longitude], { icon: werbetafel_icon });
                        if (map.getZoom() > 16) {
                            marker.addTo(map);
                        }
                        marker.on("click", onMarkerClick.bind(this, uid));
                        marker.on("contextmenu", onMarkerContextMenu.bind(this, uid));
                        werbetafeln[uid] = marker;
                    }
                    return [2];
            }
        });
    });
}
function onWerbetafelChange() {
    return __awaiter(this, void 0, void 0, function () {
        var uid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    for (uid in werbetafeln) {
                        if (werbetafeln.hasOwnProperty(uid)) {
                            werbetafeln[uid].remove();
                            delete werbetafeln[uid];
                        }
                    }
                    return [4, loadWerbetafeln()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function observeIframe() {
    var blocker = window.parent.document.querySelector('#frameDWGForm');
    if (blocker == null)
        return;
    var timoutHandle = null;
    var timoutHandle2 = null;
    try {
        var observer_1 = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var cs = window.getComputedStyle(blocker);
                if (mutation.attributeName === 'style' && cs.getPropertyValue('display') === 'none') {
                    window.clearTimeout(timoutHandle);
                    timoutHandle = window.setTimeout(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        observer_1.disconnect();
                                        window.top.Portal.Frameset.focusFrameByWindow(window);
                                        return [4, onWerbetafelChange()];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        });
                    }, 400);
                }
                if (mutation.attributeName === 'style' && cs.getPropertyValue('display') !== 'none') {
                    window.clearTimeout(timoutHandle2);
                    timoutHandle2 = window.setTimeout(function () {
                    }, 400);
                }
            });
        });
        observer_1.observe(blocker, { attributes: true });
    }
    catch (crapPad) { }
}
function get_polygon_centroid(pts) {
    var first = pts[0], last = pts[pts.length - 1];
    if (first.lat != last.lat || first.lng != last.lng)
        pts.push(first);
    var twicearea = 0, x = 0, y = 0, nPts = pts.length, p1, p2, f;
    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[i];
        p2 = pts[j];
        f = p1.lat * p2.lng - p2.lat * p1.lng;
        twicearea += f;
        x += (p1.lat + p2.lat) * f;
        y += (p1.lng + p2.lng) * f;
    }
    f = twicearea * 3;
    return new L.LatLng(x / f, y / f);
}
function addTextLabel(map, poly, label) {
    var centroid = get_polygon_centroid(poly);
    var span = document.createElement("span");
    var labeltexts = label.split("<br />");
    for (var l = 0; l < labeltexts.length; ++l) {
        if (l != 0)
            span.appendChild(document.createElement("br"));
        span.appendChild(document.createTextNode(labeltexts[l]));
    }
    span.style.display = "hidden";
    document.body.appendChild(span);
    var ow = span.offsetWidth;
    var oh = span.offsetHeight;
    span.parentElement.removeChild(span);
    var textIcon = L.divIcon({
        className: "customTextIcon",
        iconSize: [ow, oh],
        iconAnchor: [ow / 2, oh / 2],
        popupAnchor: [0, 0],
        html: span.outerHTML
    });
    var textMarker = L.marker(centroid, { icon: textIcon }).addTo(map);
}
function loadMarkers() {
    return __awaiter(this, void 0, void 0, function () {
        var markerUrl, result, table, index_uid, index_code, index_label, index_latitude, index_longitude, index_category, index_color, index_poly, allCoords, markerHtmlStyles, options, _loop_1, this_1, i, initialBounds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    markerUrl = "../ajax/AnySelect.ashx?sql=Maps.Marker_GB.sql";
                    markerUrl = SetDefaultVariables(markerUrl);
                    return [4, getData(markerUrl)];
                case 1:
                    result = _a.sent();
                    table = result.tables[0];
                    index_uid = table.columns["OBJ_UID"].index;
                    index_code = table.columns["OBJT_Code"].index;
                    index_label = table.columns["OBJ_Label"].index;
                    index_latitude = table.columns["OBJ_Lat"].index;
                    index_longitude = table.columns["OBJ_Long"].index;
                    index_category = table.columns["OBJ_Kategorie"].index;
                    index_color = table.columns["OBJ_Color"].index;
                    index_poly = table.columns["OBJ_Polygon"].index;
                    allCoords = [];
                    markerHtmlStyles = "display: block; margin-left: -15px; margin-top: -15px; width: 0; \n  height: 0; \n  border-left: 20px solid transparent;\n  border-right: 20px solid transparent;\n  \n  border-top: 20px solid #f00;\n  ";
                    options = {
                        iconUrl: 'marker-icon.png',
                        iconRetinaUrl: 'marker-icon-2x.png',
                        shadowUrl: 'marker-shadow.png',
                        iconSize: [25, 411],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -120],
                        tooltipAnchor: [16, -228],
                        shadowSize: [41, 41]
                    };
                    _loop_1 = function (i) {
                        var uid = table.rows[i][index_uid];
                        var code = table.rows[i][index_code];
                        var label = table.rows[i][index_label] || "";
                        var latitude = table.rows[i][index_latitude];
                        var longitude = table.rows[i][index_longitude];
                        var category = table.rows[i][index_category];
                        var color = table.rows[i][index_color];
                        var polyString = table.rows[i][index_poly];
                        label = label.replace(/(?:\r\n|\r|\n)/g, '<br />');
                        var poly = null;
                        if (polyString != null)
                            poly = polyString.split(",").map(function (x) { var z = x.split(' '); return new L.LatLng(Number(z[0]), Number(z[1])); });
                        if (latitude == null || longitude == null)
                            return "continue";
                        var latlng = L.latLng(latitude, longitude);
                        allCoords.push(latlng);
                        var houseImage = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\"\n   viewBox=\"0 0 512 512\" width=\"22px\" height=\"22px\">\n<path\n d=\"M256,69.972L50,275.814h42.507v166.214h326.985V275.814H462L256,69.972z M374.492,397.028  h-73.768v-86.495h-89.451v86.495h-73.768V251.99L256,133.587l118.492,118.402V397.028z\"\n  fill=\"{@col1}\" />\n<path\n fill=\"{@col2}\" opacity=\"0.4\" \n d=\"M 137.505,251.99 256,133.587 374.492,251.989 v 145.039 h -73.768 v -86.495 h -89.451 v 86.495 h -73.768 z\" />\n</svg>";
                        var greenIcon = L.divIcon({
                            className: "customIcon",
                            iconAnchor: [12, 12],
                            popupAnchor: [0, 0],
                            html: houseImage.replace("{@col1}", color).replace("{@col2}", color)
                        });
                        var marker = L.marker([latitude, longitude], { icon: greenIcon }).addTo(map);
                        var tt = L.tooltip({
                            permanent: true,
                            direction: 'top'
                        })
                            .setContent(label);
                        var contentString = category + "<br />" + label;
                        var popup = new L.Popup()
                            .setLatLng(latlng)
                            .setContent(contentString);
                        marker
                            .bindPopup(popup)
                            .addTo(map);
                        marker.on("click", function (uuid, e) {
                            map.setView(e.latlng, 18, { animate: true });
                            if (marker && marker.popup)
                                marker.popup();
                            var ml = window.parent.document.querySelector('#iMenuLeft');
                            if (ml) {
                                ignoreThisNavigation = true;
                                navigateTo(uuid);
                            }
                        }.bind(this_1, uid));
                        markers[uid] = marker;
                        if (poly == null)
                            return "continue";
                        poly = toCounterClockWise(poly);
                        var polygon = L.polygon(poly);
                        addTextLabel(map, poly, label);
                        var popupString = "Fl&auml;che: " + thousandSeparator(polygonArea(poly)) + " m<sup>2</sup>";
                        polygon.addTo(map);
                        polygon.on("click", function (uuid, e) {
                            var t = "{@basic}gebaeude.aspx?uid={@obj}&muid=@GB&env=ov&ro=false&proc={@BE_Hash}";
                            t = SetDefaultVariables(t);
                            var ml = window.parent.document.querySelector('#frameDWGForm');
                            if (ml)
                                ml.src = t.replace("{@obj}", uuid);
                            observeIframe();
                        }.bind(this_1, uid));
                        polygons[uid] = marker;
                    };
                    this_1 = this;
                    for (i = 0; i < table.rows.length; ++i) {
                        _loop_1(i);
                    }
                    initialBounds = null;
                    if (allCoords && allCoords.length > 0)
                        initialBounds = L.latLngBounds(allCoords);
                    else {
                        initialBounds = L.latLngBounds(new L.LatLng(45.77694774030000246512, 6.02260949058999983663), new L.LatLng(47.83082754170000328031, 10.44270145019999951330));
                    }
                    map.zoomHome = function (homeView) {
                        map.fitBounds(homeView);
                    }.bind(this, initialBounds);
                    map.zoomHome();
                    return [2];
            }
        });
    });
}
function zoomIn(uid) {
    return __awaiter(this, void 0, void 0, function () {
        var boundsUrl, result, table, index_objt, index_uid, index_latitude, index_longitude, index_minLat, index_minLng, index_maxLat, index_maxLng, i, code, uid_1, latitude, longitude, minLat, minLng, maxLat, maxLng, zoomBounds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    boundsUrl = "../ajax/AnySelect.ashx?sql=Maps.ObjectBounds.sql&obj_uid=";
                    boundsUrl = SetDefaultVariables(boundsUrl);
                    return [4, getData(boundsUrl)];
                case 1:
                    result = _a.sent();
                    table = result.tables[0];
                    index_objt = table.columns["OBJT_UID"].index;
                    index_uid = table.columns["OBJ_UID"].index;
                    index_latitude = table.columns["OBJ_Lat"].index;
                    index_longitude = table.columns["OBJ_Lng"].index;
                    index_minLat = table.columns["OBJ_Min_Lat"].index;
                    index_minLng = table.columns["OBJ_Min_Long"].index;
                    index_maxLat = table.columns["OBJ_Max_Lat"].index;
                    index_maxLng = table.columns["OBJ_Max_Lng"].index;
                    for (i = 0; i < table.rows.length; ++i) {
                        code = table.rows[i][index_objt];
                        uid_1 = table.rows[i][index_uid];
                        latitude = table.rows[i][index_latitude];
                        longitude = table.rows[i][index_longitude];
                        minLat = table.rows[i][index_minLat];
                        minLng = table.rows[i][index_minLng];
                        maxLat = table.rows[i][index_maxLat];
                        maxLng = table.rows[i][index_maxLng];
                        if (minLat != null && minLng != null && maxLat != null && maxLng != null) {
                            zoomBounds = L.latLngBounds([[minLat, minLng], [maxLat, maxLng]]);
                            map.fitBounds(zoomBounds);
                        }
                        else if (latitude != null && longitude != null) {
                            map.setView([latitude, longitude], 18, { animate: true });
                        }
                    }
                    return [2];
            }
        });
    });
}
function onBaumClick(uid, typ) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    typ = (typ || "").toLowerCase();
                    if (ignoreThisNavigation) {
                        if (typ == "so")
                            ignoreThisNavigation = false;
                        return [2];
                    }
                    if (typ === "gs") {
                        return [2];
                    }
                    window.top.Portal.Frameset.focusFrameByWindow(window);
                    _a = typ;
                    switch (_a) {
                        case "ld": return [3, 1];
                        case "ort": return [3, 1];
                        case "so": return [3, 1];
                        case "gb": return [3, 3];
                        case "eg": return [3, 4];
                        case "og": return [3, 4];
                        case "ug": return [3, 4];
                    }
                    return [3, 5];
                case 1: return [4, zoomIn(uid)];
                case 2:
                    _b.sent();
                    return [3, 6];
                case 3:
                    zoomIn(uid);
                    if (markers != null && markers[uid] != null)
                        markers[uid].openPopup();
                    return [3, 6];
                case 4: return [3, 6];
                case 5:
                    console.log("Objekt nicht definiert.");
                    _b.label = 6;
                case 6: return [2];
            }
        });
    });
}
function receiveMessage(event) {
    return __awaiter(this, void 0, void 0, function () {
        var tData, tAction, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (event == null || event.data == null) {
                        console.log("no event or no data", event);
                        return [2];
                    }
                    tData = null;
                    try {
                        tData = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data;
                    }
                    catch (ex) {
                        console.log(ex, event);
                        console.dir(event);
                    }
                    tAction = (tData.Action || '').toLowerCase();
                    _a = tAction;
                    switch (_a) {
                        case 'vws.tree.onafterselectionchange': return [3, 1];
                        case 'vws.tree.navigateto': return [3, 4];
                    }
                    return [3, 5];
                case 1:
                    _b = (tData.Param);
                    if (!_b) return [3, 3];
                    return [4, onBaumClick(tData.Param.Data.Value, tData.Param.Data.Type)];
                case 2:
                    _b = (_c.sent());
                    _c.label = 3;
                case 3:
                    _b;
                    return [3, 6];
                case 4: return [3, 6];
                case 5:
                    tData = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data;
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
function loadLegend() {
    return __awaiter(this, void 0, void 0, function () {
        function addRow(color, text) {
            var tr = document.createElement("tr");
            var tdSquare = document.createElement("td");
            var tdText = document.createElement("td");
            tdSquare.className = "leg";
            tdSquare.style["background-color"] = color;
            tdText.className = "cont";
            tdText.appendChild(document.createTextNode(text));
            tr.appendChild(tdSquare);
            tr.appendChild(tdText);
            return tr;
        }
        var url, result, table, index_uid, index_kurz, index_lang, index_color, gk_legend, i, uid, kurz, lang, color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "../ajax/AnySelect.ashx?sql=Maps.Gebaeudekategorie.sql";
                    url = SetDefaultVariables(url);
                    return [4, getData(url)];
                case 1:
                    result = _a.sent();
                    table = result.tables[0];
                    index_uid = table.columns["OBJ_UID"].index;
                    index_kurz = table.columns["OBJ_Kurz"].index;
                    index_lang = table.columns["OBJ_Lang"].index;
                    index_color = table.columns["OBJ_Color"].index;
                    gk_legend = document.getElementById("gk_legend");
                    while (gk_legend.hasChildNodes()) {
                        gk_legend.removeChild(gk_legend.lastChild);
                    }
                    for (i = 0; i < table.rows.length; ++i) {
                        uid = table.rows[i][index_uid];
                        kurz = table.rows[i][index_kurz];
                        lang = table.rows[i][index_lang];
                        color = table.rows[i][index_color];
                        gk_legend.appendChild(addRow(color, lang));
                    }
                    return [2];
            }
        });
    });
}
function loadApertureColors() {
    return __awaiter(this, void 0, void 0, function () {
        function addRow(color, text) {
            var tr = document.createElement("tr");
            var tdSquare = document.createElement("td");
            var tdText = document.createElement("td");
            tdSquare.className = "leg";
            tdSquare.style["background-color"] = color;
            tdText.className = "cont";
            tdText.appendChild(document.createTextNode(text));
            tr.appendChild(tdSquare);
            tr.appendChild(tdText);
            return tr;
        }
        var url, result, table, index_uid, index_color, gk_legend, i, uid, color;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "../ajax/AnySelect.ashx?sql=Maps.ApertureColors.sql";
                    url = SetDefaultVariables(url);
                    return [4, getData(url)];
                case 1:
                    result = _a.sent();
                    table = result.tables[0];
                    index_uid = table.columns["COL_Aperture"].index;
                    index_color = table.columns["COL_Hex"].index;
                    gk_legend = document.getElementById("gk_legend");
                    while (gk_legend.hasChildNodes()) {
                        gk_legend.removeChild(gk_legend.lastChild);
                    }
                    for (i = 0; i < table.rows.length; ++i) {
                        uid = table.rows[i][index_uid];
                        color = table.rows[i][index_color];
                        gk_legend.appendChild(addRow(color, uid));
                    }
                    return [2];
            }
        });
    });
}
function getFirstBrowserLanguage() {
    var nav = window.navigator, browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'], i, language;
    if (Object.prototype.toString.call(nav.languages) === '[object Array]') {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }
    return null;
}
function getBrowserLanguage(dft) {
    var bl = getFirstBrowserLanguage() || dft, pos = bl.indexOf("-");
    if (pos !== -1)
        bl = bl.substr(0, pos);
    return bl;
}
function getUserLanguage() {
    return getBrowserLanguage("de");
}
function createZoomControl(map) {
    var zoomControl = document.createElement("div");
    zoomControl.setAttribute("class", "zoomControl");
    var homeZoom = document.createElement("div");
    homeZoom.setAttribute("class", "mp");
    homeZoom.setAttribute("style", "border-top-left-radius: 5mm; border-top-right-radius: 5mm;");
    homeZoom.appendChild(document.createTextNode("\u2606"));
    homeZoom.addEventListener("click", function () {
        map.zoomHome();
    }, false);
    zoomControl.appendChild(homeZoom);
    var clearHomeZoom = document.createElement("div");
    clearHomeZoom.setAttribute("style", "clear: both;");
    zoomControl.appendChild(clearHomeZoom);
    var plusZoom = document.createElement("div");
    plusZoom.setAttribute("class", "mp");
    plusZoom.appendChild(document.createTextNode("+"));
    plusZoom.addEventListener("click", function () {
        map.zoomIn();
    }, false);
    zoomControl.appendChild(plusZoom);
    var clearPlusZoom = document.createElement("div");
    clearPlusZoom.setAttribute("style", "clear: both;");
    zoomControl.appendChild(clearPlusZoom);
    var minusZoom = document.createElement("div");
    minusZoom.setAttribute("class", "mp");
    minusZoom.setAttribute("style", "border-bottom-left-radius: 5mm; border-bottom-right-radius: 5mm;");
    minusZoom.appendChild(document.createTextNode("-"));
    minusZoom.addEventListener("click", function () {
        map.zoomOut();
    }, false);
    zoomControl.appendChild(minusZoom);
    var clearMinusZoom = document.createElement("div");
    clearMinusZoom.setAttribute("style", "clear: both;");
    zoomControl.appendChild(clearMinusZoom);
    document.body.appendChild(zoomControl);
}
function getXml(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var req, xml, obj, ex1, ex2, ex3, myHeaders, options, ex_4, ex_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (url == null) {
                        throw Error("URL is NULL...");
                    }
                    if (!navigator.onLine) {
                        throw new HttpRequestError(500, 'Client offline');
                    }
                    if (url.indexOf("no_cache") == -1)
                        url += "&no_cache=" + (new Date()).getTime();
                    req = null;
                    xml = null;
                    obj = null;
                    ex1 = null;
                    ex2 = null;
                    ex3 = null;
                    myHeaders = new Headers();
                    myHeaders.append("accept", "*/*");
                    myHeaders.append("pragma", "no-cache");
                    myHeaders.append("cache-control", "no-cache");
                    options = {
                        "method": "GET",
                        "headers": myHeaders,
                        "referrerPolicy": "origin-when-cross-origin",
                        "body": null
                    };
                    if (data != null) {
                        if (typeof data === 'string' || data instanceof String)
                            options["body"] = data;
                        else
                            options["body"] = JSON.stringify({ "id": 123 });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, fetch(url, options)];
                case 2:
                    req = _a.sent();
                    return [3, 4];
                case 3:
                    ex_4 = _a.sent();
                    console.log(ex_4);
                    ex1 = ex_4;
                    return [3, 4];
                case 4:
                    _a.trys.push([4, 7, , 8]);
                    if (!(req != null)) return [3, 6];
                    return [4, req.text()];
                case 5:
                    xml = _a.sent();
                    _a.label = 6;
                case 6: return [3, 8];
                case 7:
                    ex_5 = _a.sent();
                    console.log(ex_5);
                    ex2 = ex_5;
                    return [3, 8];
                case 8:
                    try {
                        obj = (new DOMParser()).parseFromString(xml, "text/xml");
                    }
                    catch (ex) {
                        ex3 = ex;
                        console.log(ex);
                    }
                    if (obj == null) {
                        throw new HttpRequestError(500, 'Server Error');
                    }
                    return [2, obj];
            }
        });
    });
}
function getBoundsArea(bounds) {
    var nw = bounds.getNorthWest();
    var se = bounds.getSouthEast();
    var maxLng = Math.max(nw.lng, se.lng);
    var maxLat = Math.max(nw.lat, se.lat);
    var minLng = Math.min(nw.lng, se.lng);
    var minLat = Math.min(nw.lat, se.lat);
    var area = (maxLng - minLng) * (maxLat - minLat);
    return area;
}
function addDataLayer() {
    return __awaiter(this, void 0, void 0, function () {
        var bb, area, OSM_API_VERSION, url, xml, layer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map.closePopup();
                    bb = map.getBounds();
                    area = getBoundsArea(bb);
                    if (area > 0.25) {
                        alert("The maximum bbox size is 0.25, and your request was too large.\nEither request a smaller area, or use planet.osm.");
                        return [2];
                    }
                    OSM_API_VERSION = "0.6";
                    url = "https://www.openstreetmap.org/api/" + OSM_API_VERSION + "/map?bbox=" + bb.toBBoxString();
                    return [4, getXml(url)];
                case 1:
                    xml = _a.sent();
                    console.log("xml", xml);
                    layer = new L.OSM.DataLayer(xml).addTo(map);
                    return [2];
            }
        });
    });
}
function initMap() {
    return __awaiter(this, void 0, void 0, function () {
        var ml, southWest, northEast, bounds, scale, scalex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ml = window.parent.document.querySelector('#iMenuLeft');
                    map = L.map('swissMap', { zoomControl: false }).setView([47.317390, 8.520293], 18);
                    map.zoomHome = function () { console.log("wrong instance"); };
                    createZoomControl(map);
                    southWest = new L.LatLng(45.802216, 5.920721);
                    northEast = new L.LatLng(47.968862, 10.769762);
                    bounds = new L.LatLngBounds(southWest, northEast);
                    map.fitBounds(bounds, null);
                    scale = bracketDevicePixelRatio();
                    scalex = (scale === 1) ? '' : ('@' + scale + 'x');
                    L.tileLayer("{server}/{style}/{z}/{x}/{y}{scalex}.png?lang={language}", {
                        maxZoom: 18,
                        attribution: '<a target="blank" href="https://www.mediawiki.org/wiki/Maps/Technical_Implementation">Wikimedia maps beta</a> | Map data &copy; <a target="blank" href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                        server: "https://maps.wikimedia.org",
                        style: "osm-intl",
                        scalex: scalex,
                        language: getUserLanguage()
                    }).addTo(map);
                    return [4, loadMarkers()];
                case 1:
                    _a.sent();
                    return [4, loadWerbetafeln()];
                case 2:
                    _a.sent();
                    L.control.scale({ metric: true, imperial: false, maxWidth: 150 }).addTo(map);
                    map.on('zoomend', function () {
                        var uid = null;
                        document.getElementById('zoom-level').innerHTML = 'Zoom Level: ' + map.getZoom();
                        if (map.getZoom() > 16) {
                            for (uid in werbetafeln) {
                                if (werbetafeln.hasOwnProperty(uid)) {
                                    werbetafeln[uid].addTo(map);
                                }
                            }
                        }
                        else {
                            for (uid in werbetafeln) {
                                if (werbetafeln.hasOwnProperty(uid)) {
                                    werbetafeln[uid].remove();
                                }
                            }
                        }
                    });
                    map.on("contextmenu", function (e) {
                        var container = document.createDocumentFragment();
                        var title = document.createElement("span");
                        title.setAttribute("style", "font-weight: bold;");
                        title.appendChild(document.createTextNode("Hier können Sie"));
                        container.appendChild(title);
                        container.appendChild(document.createElement("br"));
                        var menuOption = document.createElement("a");
                        menuOption.addEventListener("click", addWerbetafel.bind(this, e.latlng.lat, e.latlng.lng));
                        menuOption.appendChild(document.createTextNode("eine Leuchtreklame hinzufügen"));
                        container.appendChild(menuOption);
                        var popup = new L.Popup({ closeButton: true, autoClose: true })
                            .setLatLng(e.latlng)
                            .setContent(container);
                        popup.openOn(map);
                    });
                    return [2];
            }
        });
    });
}
function CreatePolygon(latLongs) {
    var polyString = "";
    if (isClockwise(latLongs)) {
        for (var i = 0; i < latLongs.length; ++i) {
            if (i !== 0)
                polyString += ",";
            polyString += latLongs[i].lng + " " + latLongs[i].lat;
        }
    }
    else {
        for (var i = latLongs.length - 1; i > -1; --i) {
            if (i !== latLongs.length - 1)
                polyString += ",";
            polyString += latLongs[i].lng + " " + latLongs[i].lat;
        }
    }
    polyString = "POLYGON((" + polyString + "))";
    return polyString;
}
function CreateSqlPolygon(latLongs) {
    var s = "geography::STPolyFromText('" + CreatePolygon(latLongs) + "', 4326)";
    return s;
}
function setPositon(latitude, longitude) {
    map.setView(new L.LatLng(latitude, longitude), 18);
}
function isClockwiseSimple(poly) {
    var sum = 0;
    for (var i = 0; i < poly.length - 1; i++) {
        var cur = poly[i], next = poly[i + 1];
        sum += (next[0] - cur[0]) * (next[1] + cur[1]);
    }
    return sum > 0;
}
function isClockwise(poly) {
    var sum = 0;
    for (var i = 0; i < poly.length - 1; i++) {
        var cur = poly[i], next = poly[i + 1];
        sum += (next.lat - cur.lat) * (next.lng + cur.lng);
    }
    return sum > 0;
}
function toClockWise(poly) {
    if (!isClockwise(poly))
        poly.reverse();
    return poly;
}
function toCounterClockWise(poly) {
    if (isClockwise(poly))
        poly.reverse();
    return poly;
}
function polygonStringToCoordinates(polygonString) {
    var latlongs = [];
    polygonString = polygonString.match(/\s*POLYGON\s*\(\s*\(\s*(.*?)\s*\)\s*\)\s*/)[1];
    polygonString = polygonString.replace(/\s*,\s*/g, ",");
    var allPoints = polygonString.split(",");
    for (var i = 0; i < allPoints.length; ++i) {
        var pointComponents = allPoints[i].split(" ");
        latlongs.push(new L.LatLng(parseFloat(pointComponents[1]), parseFloat(pointComponents[0])));
    }
    latlongs = toCounterClockWise(latlongs);
    return latlongs;
}
function drawTestPolygon(t) {
    var unionPolygon = "POLYGON ((7.5989804 47.5512929, 7.5989968 47.5512834, 7.5989937 47.5512791, 7.5989966 47.5512774, 7.5990021 47.5512803, 7.5990346 47.5512613, 7.5990315 47.5512572, 7.5990342 47.5512556, 7.5990398 47.5512583, 7.5990723 47.5512393, 7.5990692 47.5512354, 7.5990722 47.5512336, 7.5990774 47.5512364, 7.5990942 47.5512266, 7.5990778 47.5512139, 7.5990943 47.5512043, 7.5990911 47.5512004, 7.5990939 47.5511988, 7.5990993 47.5512014, 7.5991178 47.5511907, 7.5991321 47.5511824, 7.5991291 47.5511784, 7.5991318 47.5511769, 7.5991371 47.5511795, 7.5991696 47.5511606, 7.5991668 47.5511566, 7.5991696 47.5511549, 7.5991748 47.5511575, 7.5992073 47.5511387, 7.5992043 47.5511348, 7.5992073 47.551133, 7.5992123 47.5511358, 7.5992453 47.5511167, 7.5992423 47.5511128, 7.5992453 47.551111, 7.5992505 47.5511136, 7.5992655 47.5511049, 7.599283 47.5510947, 7.5992803 47.5510907, 7.5992829 47.5510892, 7.5992882 47.5510917, 7.5993207 47.5510729, 7.5993178 47.551069, 7.5993206 47.5510674, 7.5993255 47.55107, 7.5993585 47.5510509, 7.5993557 47.551047, 7.5993584 47.5510454, 7.5993634 47.551048, 7.5993802 47.5510383, 7.5993658 47.5510271, 7.5993593 47.5510293, 7.5993569 47.5510274, 7.5993615 47.5510237, 7.5993472 47.5510126, 7.5993632 47.5510033, 7.5993605 47.5509993, 7.5993631 47.5509978, 7.5993682 47.5510004, 7.5993839 47.5509913, 7.5994011 47.5509813, 7.5993983 47.5509773, 7.599401 47.5509757, 7.5994062 47.5509783, 7.5994391 47.5509592, 7.599436 47.5509554, 7.5994388 47.5509537, 7.5994442 47.5509562, 7.5994768 47.5509372, 7.5994737 47.5509334, 7.5994765 47.5509318, 7.599482 47.5509342, 7.5994984 47.5509246, 7.5995125 47.5509357, 7.5995179 47.5509337, 7.5995206 47.5509358, 7.599517 47.5509392, 7.5995451 47.5509614, 7.5995507 47.5509595, 7.599553 47.5509613, 7.5995494 47.5509647, 7.5995778 47.550987, 7.5995832 47.550985, 7.5995857 47.550987, 7.5995823 47.5509906, 7.5996104 47.5510126, 7.5996158 47.5510106, 7.599618 47.5510123, 7.5996144 47.5510159, 7.599643 47.5510383, 7.5996485 47.5510363, 7.5996508 47.5510381, 7.5996474 47.5510417, 7.5996752 47.5510636, 7.5996807 47.5510616, 7.599683 47.5510634, 7.5996794 47.5510669, 7.599708 47.5510894, 7.5997134 47.5510873, 7.5997157 47.5510892, 7.5997121 47.5510926, 7.5997408 47.5511152, 7.599746 47.5511129, 7.5997484 47.5511149, 7.5997448 47.5511183, 7.5997732 47.5511406, 7.5997784 47.5511384, 7.5997807 47.5511402, 7.5997771 47.5511437, 7.5998051 47.5511657, 7.5998107 47.5511638, 7.5998134 47.551166, 7.5998096 47.5511692, 7.5998186 47.5511762, 7.5996618 47.5512599, 7.5996588 47.5512574, 7.5996532 47.5512593, 7.5996507 47.5512573, 7.5996544 47.5512539, 7.5996264 47.5512319, 7.5996207 47.5512338, 7.5996182 47.5512319, 7.5996222 47.5512286, 7.5995939 47.5512064, 7.5995881 47.5512083, 7.5995855 47.5512063, 7.5995896 47.551203, 7.5995613 47.5511809, 7.5995557 47.5511829, 7.5995532 47.5511809, 7.5995571 47.5511776, 7.5995287 47.5511552, 7.599523 47.5511573, 7.5995204 47.5511553, 7.5995244 47.5511519, 7.5995101 47.5511407, 7.5994938 47.5511501, 7.5994969 47.5511541, 7.5994942 47.5511556, 7.599489 47.5511529, 7.599456 47.5511721, 7.599459 47.551176, 7.5994562 47.5511776, 7.599451 47.551175, 7.5994181 47.551194, 7.5994214 47.5511978, 7.5994186 47.5511995, 7.5994132 47.5511969, 7.5993958 47.551207, 7.5993804 47.5512159, 7.5993838 47.5512196, 7.5993808 47.5512213, 7.5993754 47.5512188, 7.5993423 47.5512379, 7.5993455 47.5512418, 7.5993427 47.5512434, 7.5993376 47.5512407, 7.5993046 47.5512598, 7.5993076 47.5512637, 7.5993049 47.5512653, 7.5992995 47.5512627, 7.5992832 47.5512722, 7.5992996 47.551285, 7.5992837 47.5512947, 7.5992865 47.551298, 7.5992834 47.5512999, 7.5992782 47.5512981, 7.5993219 47.5513338, 7.5993856 47.5512967, 7.5994706 47.551364, 7.5993337 47.5514442, 7.599248 47.551377, 7.5992923 47.5513511, 7.5992518 47.5513191, 7.5991152 47.5513981, 7.599097 47.551384, 7.5990913 47.5513859, 7.5990889 47.551384, 7.5990928 47.5513806, 7.5990643 47.5513584, 7.5990589 47.5513604, 7.5990563 47.5513583, 7.59906 47.551355, 7.5990314 47.5513327, 7.5990263 47.5513348, 7.599024 47.5513329, 7.5990274 47.5513296, 7.5989986 47.5513071, 7.5989936 47.551309, 7.5989913 47.5513072, 7.5989946 47.551304, 7.5989804 47.5512929))";
    if (t)
        unionPolygon = "POLYGON((7.5994698 47.5519639, 7.5994811 47.5519362, 7.5994732 47.5519337, 7.5994742 47.5519312, 7.5994831 47.5519313, 7.5994942 47.5519042, 7.5994863 47.5519014, 7.5994873 47.5518991, 7.5994961 47.5518995, 7.5995074 47.5518718, 7.5994994 47.5518693, 7.5995004 47.5518668, 7.5995092 47.5518672, 7.5995202 47.5518401, 7.5995332 47.5518425, 7.5995374 47.5518372, 7.5995406 47.5518378, 7.5995398 47.5518438, 7.5995805 47.5518513, 7.5995846 47.551846, 7.5995878 47.5518466, 7.5995871 47.5518526, 7.599628 47.5518602, 7.5996319 47.5518549, 7.599635 47.5518555, 7.5996349 47.5518615, 7.599675 47.551869, 7.5996789 47.5518637, 7.5996822 47.5518643, 7.5996817 47.5518702, 7.5997224 47.5518778, 7.5997265 47.5518725, 7.5997302 47.5518732, 7.5997296 47.5518792, 7.5997697 47.5518867, 7.5997738 47.5518814, 7.5997772 47.551882, 7.5997766 47.551888, 7.5998137 47.5518949, 7.5998177 47.5518896, 7.599821 47.5518902, 7.5998202 47.5518961, 7.5998247 47.551897, 7.5998422 47.5518528, 7.5998389 47.5518541, 7.5998362 47.5518523, 7.5998388 47.5518505, 7.5998269 47.5518423, 7.5998315 47.5518316, 7.5998279 47.5518309, 7.599829 47.5518283, 7.5998326 47.551829, 7.5998365 47.5518198, 7.5998267 47.551813, 7.599824 47.5518148, 7.5998213 47.5518129, 7.5998239 47.5518111, 7.5998017 47.5517958, 7.5997991 47.5517976, 7.5997963 47.5517957, 7.599799 47.5517939, 7.5997883 47.5517866, 7.5997755 47.5517889, 7.5997765 47.5517913, 7.5997726 47.551792, 7.5997716 47.5517896, 7.5997408 47.5517951, 7.5997418 47.5517976, 7.5997379 47.5517983, 7.599737 47.5517958, 7.5997202 47.5517988, 7.5997081 47.5517905, 7.5997054 47.5517923, 7.5997028 47.5517905, 7.5997055 47.5517887, 7.5996944 47.5517811, 7.5997281 47.5517749, 7.5996679 47.5517334, 7.5996651 47.5517352, 7.5996625 47.5517334, 7.5996653 47.5517316, 7.5996553 47.5517247, 7.5996414 47.5517272, 7.5996424 47.5517297, 7.5996388 47.5517304, 7.5996378 47.5517278, 7.5996211 47.5517308, 7.5996091 47.5517224, 7.5996064 47.5517241, 7.5996037 47.5517222, 7.5996063 47.5517205, 7.5995842 47.5517052, 7.5995821 47.5517069, 7.5995791 47.5517053, 7.5995815 47.5517033, 7.5995697 47.5516952, 7.5995743 47.5516838, 7.5995707 47.5516832, 7.5995718 47.5516805, 7.5995754 47.5516812, 7.5995837 47.5516606, 7.5995801 47.5516599, 7.5995812 47.5516574, 7.5995847 47.5516581, 7.599589 47.5516475, 7.5996055 47.5516446, 7.5996046 47.5516421, 7.5996085 47.5516414, 7.5996095 47.5516439, 7.5996394 47.5516385, 7.5996385 47.5516361, 7.5996423 47.5516354, 7.5996433 47.5516378, 7.5996574 47.5516353, 7.5996611 47.5516261, 7.5996575 47.5516254, 7.5996586 47.5516227, 7.5996622 47.5516234, 7.5996705 47.551603, 7.5996669 47.5516023, 7.599668 47.5515997, 7.5996716 47.5516004, 7.599676 47.5515895, 7.599693 47.5515864, 7.599692 47.551584, 7.5996962 47.5515832, 7.5996972 47.5515856, 7.5997269 47.5515803, 7.5997259 47.5515779, 7.5997301 47.5515771, 7.599731 47.5515795, 7.5997472 47.5515766, 7.5997593 47.5515849, 7.5997619 47.5515831, 7.5997646 47.551585, 7.599762 47.5515867, 7.5997841 47.5516019, 7.5997867 47.5516001, 7.5997895 47.551602, 7.5997869 47.5516038, 7.5997988 47.5516121, 7.5997942 47.5516234, 7.5997979 47.5516241, 7.5997969 47.5516265, 7.5997932 47.5516258, 7.5997848 47.5516464, 7.5997885 47.5516471, 7.5997875 47.5516495, 7.5997838 47.5516488, 7.5997795 47.5516594, 7.5997887 47.5516657, 7.5997916 47.5516638, 7.5997942 47.5516655, 7.5997913 47.5516675, 7.5998135 47.5516828, 7.5998164 47.5516808, 7.599819 47.5516826, 7.5998161 47.5516845, 7.5998257 47.5516911, 7.5998413 47.5516883, 7.5998403 47.5516857, 7.5998439 47.5516851, 7.5998449 47.5516877, 7.5998615 47.5516847, 7.599874 47.551693, 7.5998766 47.5516912, 7.5998793 47.551693, 7.5998766 47.5516948, 7.5998987 47.5517099, 7.5999013 47.5517081, 7.5999041 47.5517101, 7.5999015 47.5517118, 7.5999235 47.5517269, 7.5999261 47.5517252, 7.5999291 47.5517272, 7.5999264 47.5517289, 7.5999485 47.5517441, 7.5999512 47.5517423, 7.599954 47.5517443, 7.5999513 47.551746, 7.5999611 47.5517527, 7.5999751 47.5517503, 7.5999742 47.5517478, 7.5999781 47.5517472, 7.599979 47.5517496, 7.5999958 47.5517467, 7.6000077 47.5517548, 7.6000103 47.5517531, 7.6000128 47.5517548, 7.6000102 47.5517566, 7.6000322 47.5517718, 7.6000349 47.55177, 7.6000378 47.551772, 7.6000351 47.5517738, 7.6000571 47.551789, 7.6000598 47.5517872, 7.6000625 47.5517891, 7.6000598 47.5517909, 7.6000813 47.5518057, 7.600084 47.5518039, 7.6000872 47.5518061, 7.6000845 47.5518079, 7.6000967 47.5518163, 7.600092 47.5518277, 7.6000956 47.5518283, 7.6000945 47.5518309, 7.6000909 47.5518302, 7.6000824 47.5518508, 7.600086 47.5518514, 7.6000851 47.5518537, 7.6000815 47.551853, 7.6000767 47.5518646, 7.60006 47.5518675, 7.6000609 47.55187, 7.600057 47.5518706, 7.6000561 47.5518682, 7.6000261 47.5518734, 7.6000271 47.5518759, 7.6000229 47.5518766, 7.600022 47.5518741, 7.5999918 47.5518794, 7.5999928 47.5518819, 7.5999888 47.5518826, 7.5999879 47.5518801, 7.5999578 47.5518854, 7.5999587 47.5518878, 7.599955 47.5518885, 7.5999541 47.551886, 7.5999367 47.5518891, 7.5999247 47.5518807, 7.5999221 47.5518825, 7.5999191 47.5518804, 7.5999218 47.5518787, 7.5999002 47.5518636, 7.5998975 47.5518654, 7.5998949 47.5518635, 7.5998975 47.5518617, 7.5998877 47.5518548, 7.5998744 47.5518575, 7.5998755 47.5518599, 7.5998715 47.5518607, 7.5998697 47.5518585, 7.5998513 47.5519019, 7.5998638 47.5519043, 7.5998675 47.5518989, 7.5998715 47.5518996, 7.5998711 47.5519056, 7.5999109 47.5519131, 7.5999148 47.5519077, 7.5999183 47.5519084, 7.5999175 47.5519143, 7.5999583 47.5519219, 7.5999621 47.5519166, 7.5999658 47.5519172, 7.5999649 47.5519231, 7.6000056 47.5519307, 7.6000094 47.5519254, 7.600013 47.5519261, 7.6000121 47.551932, 7.6000527 47.5519395, 7.6000568 47.5519342, 7.6000605 47.5519349, 7.6000593 47.5519408, 7.6000998 47.5519483, 7.6001037 47.551943, 7.6001074 47.5519437, 7.6001059 47.5519495, 7.600147 47.5519571, 7.6001513 47.5519519, 7.600155 47.5519526, 7.6001537 47.5519584, 7.6001651 47.5519596, 7.6001692 47.5519594, 7.6001699 47.5519577, 7.6001709 47.5519579, 7.6001194 47.5520849, 7.6001044 47.5520819, 7.6001008 47.5520873, 7.6000979 47.5520867, 7.6000981 47.5520807, 7.600057 47.5520731, 7.6000537 47.5520785, 7.6000501 47.5520778, 7.6000507 47.5520719, 7.6000103 47.5520644, 7.6000064 47.5520697, 7.6000032 47.5520691, 7.6000039 47.5520632, 7.5999633 47.5520556, 7.5999591 47.5520609, 7.5999557 47.5520603, 7.5999566 47.5520544, 7.5999158 47.5520468, 7.5999115 47.5520521, 7.5999084 47.5520515, 7.5999094 47.5520456, 7.5998683 47.552038, 7.5998642 47.5520433, 7.599861 47.5520427, 7.5998615 47.5520367, 7.5998383 47.5520324, 7.5998208 47.5520292, 7.5998172 47.5520345, 7.5998137 47.5520339, 7.5998137 47.5520278, 7.599774 47.5520205, 7.5997693 47.5520256, 7.599766 47.552025, 7.5997667 47.5520191, 7.5997262 47.5520116, 7.5997218 47.5520168, 7.5997186 47.5520162, 7.5997189 47.5520102, 7.5996788 47.5520028, 7.5996744 47.552008, 7.5996714 47.5520074, 7.5996717 47.5520014, 7.5996317 47.551994, 7.5996276 47.5519993, 7.5996243 47.5519987, 7.5996246 47.5519927, 7.5995844 47.5519852, 7.5995807 47.5519906, 7.5995772 47.5519899, 7.5995779 47.551984, 7.5995367 47.5519764, 7.5995324 47.5519816, 7.5995293 47.551981, 7.5995298 47.5519751, 7.5994894 47.5519676, 7.5994856 47.5519729, 7.5994821 47.5519723, 7.5994828 47.5519663, 7.5994698 47.5519639))";
    if (t)
        unionPolygon = "POLYGON((7.599767 47.5526798,7.5997487 47.5526866,7.5994203 47.5526245,7.599491 47.5524535,7.5995463 47.5524639,7.5997672 47.5525058,7.5997611 47.5525208,7.5997976 47.5525277,7.5997457 47.5526517,7.599767 47.5526798))";
    var latlongs = polygonStringToCoordinates(unionPolygon);
    console.log(latlongs);
    console.log("string", t, JSON.stringify(latlongs, null, 2));
    var polygon = L.polygon(latlongs);
    polygon.bindPopup(unionPolygon)
        .addTo(map);
}
function startMap() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            polyFills();
            loadLegend();
            window.setTimeout(initMap, 100);
            if (window.removeEventListener)
                window.removeEventListener("message", receiveMessage, false);
            else
                window.detachEvent("onmessage", receiveMessage);
            if (!window['postMessage'])
                alert("oh crap");
            else {
                if (window.addEventListener) {
                    window.addEventListener("message", receiveMessage, false);
                }
                else {
                    window.attachEvent("onmessage", receiveMessage);
                }
            }
            return [2];
        });
    });
}
startMap();
function long2tile(lon, zoom) {
    return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
}
function lat2tile(lat, zoom) {
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
}
function tile2long(x, z) {
    return (x / Math.pow(2, z) * 360 - 180);
}
function tile2lat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}
function foo() {
    var layerGroupNew = new L.LayerGroup();
    layerGroupNew.addTo(map);
    var x = L.marker(new L.LatLng(0, 0, 0));
    x.addTo(layerGroupNew);
    var featureGroupNew = new L.FeatureGroup().addTo(layerGroupNew);
}
function boundsFomDistance(lat, lon, distanceInMeters) {
    function toRadians(val) {
        return (val / 180.0 * Math.PI);
    }
    function toDegrees(val) {
        return val / Math.PI * 180.0;
    }
    var R = 6371.0088;
    var radius = distanceInMeters * 0.001;
    var lon1 = lon - toDegrees(radius / R / Math.cos(toRadians(lat)));
    var lon2 = lon + toDegrees(radius / R / Math.cos(toRadians(lat)));
    var lat1 = lat + toDegrees(radius / R);
    var lat2 = lat - toDegrees(radius / R);
    return new L.LatLngBounds(new L.LatLng(lat2, lon2), new L.LatLng(lat1, lon1));
}
function deg2rad(degrees) {
    return Math.PI * degrees / 180.0;
}
;
function rad2deg(radians) {
    return 180.0 * radians / Math.PI;
}
function WGS84EarthRadius(lat) {
    var WGS84_a = 6378137.0;
    var WGS84_b = 6356752.3;
    var An = WGS84_a * WGS84_a * Math.cos(lat);
    var Bn = WGS84_b * WGS84_b * Math.sin(lat);
    var Ad = WGS84_a * Math.cos(lat);
    var Bd = WGS84_b * Math.sin(lat);
    return Math.sqrt((An * An + Bn * Bn) / (Ad * Ad + Bd * Bd));
}
function boundingBox(latitudeInDegrees, longitudeInDegrees, halfSideInKm) {
    var lat = deg2rad(latitudeInDegrees);
    var lon = deg2rad(longitudeInDegrees);
    var halfSide = 1000 * halfSideInKm;
    var radius = WGS84EarthRadius(lat);
    var pradius = radius * Math.cos(lat);
    var latMin = lat - halfSide / radius;
    var latMax = lat + halfSide / radius;
    var lonMin = lon - halfSide / pradius;
    var lonMax = lon + halfSide / pradius;
    return new L.LatLngBounds(new L.LatLng(rad2deg(latMin), rad2deg(lonMin)), new L.LatLng(rad2deg(latMax), rad2deg(lonMax)));
}
function getBuildings() {
    return __awaiter(this, void 0, void 0, function () {
        var bb, area, OSM_API_VERSION, url, xml, buildingsNodes, nodes, nodeDictionary, buildings, i, nodeId, i, buildingNodes, coords, j, ref, wayId, property, thisBuilding, contentString, popup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bb = map.getBounds();
                    area = getBoundsArea(bb);
                    if (area > 0.25) {
                        alert("The maximum bbox size is 0.25, and your request was too large.\nEither request a smaller area, or use planet.osm.");
                        return [2];
                    }
                    OSM_API_VERSION = "0.6";
                    url = "https://www.openstreetmap.org/api/" + OSM_API_VERSION + "/map?bbox=" + bb.toBBoxString();
                    return [4, getXml(url)];
                case 1:
                    xml = _a.sent();
                    buildingsNodes = Array.prototype.slice.call(xml.querySelectorAll('way tag[k="building"]')).map(function (x) { return x.parentElement || x.parentNode; });
                    nodes = Array.prototype.slice.call(xml.querySelectorAll('node'));
                    nodeDictionary = {};
                    buildings = {};
                    for (i = 0; i < nodes.length; ++i) {
                        nodeId = nodes[i].getAttribute("id");
                        nodeDictionary[nodeId] = new L.LatLng(parseFloat(nodes[i].getAttribute("lat")), parseFloat(nodes[i].getAttribute("lon")));
                    }
                    for (i = 0; i < buildingsNodes.length; ++i) {
                        buildingNodes = Array.prototype.slice.call(buildingsNodes[i].getElementsByTagName("nd"));
                        coords = [];
                        for (j = 0; j < buildingNodes.length; ++j) {
                            ref = buildingNodes[j].getAttribute("ref");
                            coords.push(nodeDictionary[ref]);
                        }
                        toCounterClockWise(coords);
                        wayId = buildingsNodes[i].getAttribute("id");
                        buildings[wayId] = coords;
                    }
                    for (property in buildings) {
                        if (buildings.hasOwnProperty(property)) {
                            thisBuilding = L.polygon(buildings[property], { className: 'osm_data_polygon' });
                            thisBuilding.addTo(map);
                            contentString = "area: ~" + thousandSeparator(polygonArea(buildings[property])) + "m<sup>2</sup></br>GPS:</br>";
                            contentString += CreateSqlPolygon(buildings[property]);
                            popup = new L.Popup()
                                .setContent(contentString);
                            thisBuilding.bindPopup(popup);
                            thisBuilding.on("click", function (event) {
                                if (event.originalEvent.target.classList.contains("active"))
                                    event.originalEvent.target.classList.remove("active");
                                else
                                    event.originalEvent.target.classList.add("active");
                            });
                        }
                    }
                    return [2];
            }
        });
    });
}
var GeoPoint = (function () {
    function GeoPoint() {
    }
    return GeoPoint;
}());
var GeographicOperations = (function () {
    function GeographicOperations() {
    }
    GeographicOperations.prototype.isPointInPolygon = function (p, polygon) {
        var isInside = false;
        var minX = polygon[0].Lat, maxX = polygon[0].Lat;
        var minY = polygon[0].Lng, maxY = polygon[0].Lng;
        for (var n = 1; n < polygon.length; n++) {
            var q = polygon[n];
            minX = Math.min(q.Lat, minX);
            maxX = Math.max(q.Lat, maxX);
            minY = Math.min(q.Lng, minY);
            maxY = Math.max(q.Lng, maxY);
        }
        if (p.Lat < minX || p.Lat > maxX || p.Lng < minY || p.Lng > maxY) {
            return false;
        }
        var i = 0, j = polygon.length - 1;
        for (i, j; i < polygon.length; j = i++) {
            if ((polygon[i].Lng > p.Lng) != (polygon[j].Lng > p.Lng)
                && p.Lat <
                    (polygon[j].Lat - polygon[i].Lat) * (p.Lng - polygon[i].Lng)
                        / (polygon[j].Lng - polygon[i].Lng) + polygon[i].Lat) {
                isInside = !isInside;
            }
        }
        return isInside;
    };
    GeographicOperations.prototype.isPointInPolygon4 = function (polygon, testPoint) {
        var result = false;
        var j = polygon.length - 1;
        for (var i = 0; i < polygon.length; i++) {
            if (polygon[i].Lng < testPoint.Lng && polygon[j].Lng >= testPoint.Lng || polygon[j].Lng < testPoint.Lng && polygon[i].Lng >= testPoint.Lng) {
                if (polygon[i].Lat + (testPoint.Lng - polygon[i].Lng) / (polygon[j].Lng - polygon[i].Lng) * (polygon[j].Lat - polygon[i].Lat) < testPoint.Lat) {
                    result = !result;
                }
            }
            j = i;
        }
        return result;
    };
    return GeographicOperations;
}());
