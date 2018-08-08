'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
                    console.log(obj);
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
    var poly = JSON.parse(JSON.stringify(poly2));
    poly = poly.map(function (x) {
        return new L.LatLng(Math.radians(x.lat), Math.radians(x.lng));
    });
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
    return Math.abs(area).toFixed(0);
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
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
                    myHeaders.append("Accept", "*/*");
                    options = {
                        "method": "GET",
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
                    console.log(obj);
                    return [2, obj];
            }
        });
    });
}
function mapArea() {
    var bb = map.getBounds();
    var nw = bb.getNorthWest();
    var se = bb.getSouthEast();
    var maxLng = Math.max(nw.lng, se.lng);
    var maxLat = Math.max(nw.lat, se.lat);
    var minLng = Math.min(nw.lng, se.lng);
    var minLat = Math.min(nw.lat, se.lat);
    var area = (maxLng - minLng) * (maxLat - minLat);
    console.log("bb", bb.toBBoxString());
    console.log("map area: ", area);
}
function addDataLayer() {
    return __awaiter(this, void 0, void 0, function () {
        var bb, OSM_API_VERSION, url, xml, layer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map.closePopup();
                    bb = map.getBounds();
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
