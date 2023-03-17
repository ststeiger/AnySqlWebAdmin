'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
                    myHeaders.append("pragma", "no-cache");
                    myHeaders.append("cache-control", "no-cache");
                    options = {
                        "method": "POST",
                        "headers": myHeaders,
                        credentials: 'same-origin',
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
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (func, thisArg) {
            'use strict';
            if (!((typeof func === 'function') && this))
                throw new TypeError();
            var len = this.length >>> 0, res = new Array(len), t = this, c = 0, i = -1;
            if (thisArg === undefined) {
                while (++i !== len) {
                    if (i in this) {
                        if (func(t[i], i, t)) {
                            res[c++] = t[i];
                        }
                    }
                }
            }
            else {
                while (++i !== len) {
                    if (i in this) {
                        if (func.call(thisArg, t[i], i, t)) {
                            res[c++] = t[i];
                        }
                    }
                }
            }
            res.length = c;
            return res;
        };
    }
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
    if (inFrame) {
        window.top.Portal.Global.spreadMessage(object);
    }
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
                        marker = L.marker([latitude, longitude], {
                            icon: werbetafel_icon,
                            draggable: true
                        }).addTo(map);
                        marker.on("click", onMarkerClick.bind(this, uid));
                        marker.on("contextmenu", onMarkerContextMenu.bind(this, uid));
                        marker.on('dragend', moveWerbetafel.bind(this, uid, marker));
                        werbetafeln[uid] = marker;
                    }
                    return [2];
            }
        });
    });
}
function moveWerbetafel(uuid, marker, event) {
    return __awaiter(this, void 0, void 0, function () {
        var position, url, result, ex_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("move werbetafel ", uuid);
                    position = marker.getLatLng();
                    marker.setLatLng(position);
                    map.panTo(position);
                    url = "../ajax/AnySelect.ashx?sql=Maps.UpdateWerbetafelLocation.sql&al_uid=" + uuid + "&lat=" + position.lat + "&lng=" + position.lng;
                    url = SetDefaultVariables(url);
                    result = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, getData(url)];
                case 2:
                    result = _a.sent();
                    console.log("finished moving werbetafel ", uuid, result);
                    return [3, 4];
                case 3:
                    ex_3 = _a.sent();
                    console.log(ex_3);
                    return [3, 4];
                case 4:
                    if (map.gl)
                        map.gl._update();
                    return [2];
            }
        });
    });
}
function deleteWerbetafel(uuid) {
    return __awaiter(this, void 0, void 0, function () {
        var url, result, ex_4;
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
                    ex_4 = _a.sent();
                    console.log(ex_4);
                    return [3, 4];
                case 4:
                    map.closePopup();
                    if (map.gl)
                        map.gl._update();
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
function onMarkerMove(uuid, marker, event) {
    return __awaiter(this, void 0, void 0, function () {
        var position, url, result, ex_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("moving marker ", uuid);
                    position = marker.getLatLng();
                    marker.setLatLng(position);
                    map.panTo(position);
                    url = "../ajax/AnySelect.ashx?sql=Maps.UpdateMarkerLocation.sql&gb_uid=" + uuid + "&lat=" + position.lat + "&lng=" + position.lng;
                    url = SetDefaultVariables(url);
                    result = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, getData(url)];
                case 2:
                    result = _a.sent();
                    console.log("finished moving marker ", uuid, result);
                    return [3, 4];
                case 3:
                    ex_5 = _a.sent();
                    console.log(ex_5);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
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
                        marker = L.marker([latitude, longitude], {
                            icon: werbetafel_icon,
                            draggable: true
                        });
                        if (map.getZoom() > 16) {
                            marker.addTo(map);
                        }
                        marker.on("click", onMarkerClick.bind(this, uid));
                        marker.on("contextmenu", onMarkerContextMenu.bind(this, uid));
                        marker.on('dragend', moveWerbetafel.bind(this, uid, marker));
                        werbetafeln[uid] = marker;
                    }
                    if (map.gl)
                        map.gl._update();
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
    label.style.display = "hidden";
    document.body.appendChild(label);
    var ow = label.offsetWidth;
    var oh = label.offsetHeight;
    label.parentElement.removeChild(label);
    var textIcon = L.divIcon({
        className: "customTextIcon",
        iconSize: [ow, oh],
        iconAnchor: [ow / 2, oh / 2],
        popupAnchor: [0, 0],
        html: label.outerHTML
    });
    var textMarker = L.marker(centroid, { icon: textIcon }).addTo(map);
}
function createVertexLabelDiv(i) {
    var indexDiv = document.createElement("div");
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(i.toString()));
    indexDiv.appendChild(span);
    return indexDiv;
}
function createVertexLabels(map, poly) {
    for (var i = 0; i < poly.length; ++i) {
        var label = createVertexLabelDiv(i);
        label.style.display = "hidden";
        document.body.appendChild(label);
        var ow = label.offsetWidth;
        var oh = label.offsetHeight;
        label.parentElement.removeChild(label);
        var textIcon = L.divIcon({
            className: "customTextIcon",
            iconSize: [ow, oh],
            iconAnchor: [ow / 2, oh / 2],
            popupAnchor: [0, 0],
            html: label.outerHTML
        });
        var textMarker = L.marker(poly[i], { icon: textIcon }).addTo(map);
    }
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
                        var poly = null;
                        if (polyString != null)
                            poly = polyString.split(",").map(function (x) { var z = x.split(' '); return new L.LatLng(Number(z[0]), Number(z[1])); });
                        if (latitude == null || longitude == null)
                            return "continue";
                        var latlng = L.latLng(latitude, longitude);
                        allCoords.push(latlng);
                        var houseImage = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\"\n   viewBox=\"0 0 512 512\" width=\"22px\" height=\"22px\">\n    <path fill=\"{@col1}\" d=\"M256,69.972L50,275.814h42.507v166.214h326.985V275.814H462L256,69.972z M374.492,397.028  h-73.768v-86.495h-89.451v86.495h-73.768V251.99L256,133.587l118.492,118.402V397.028z\" />\n    <path fill=\"{@col2}\" opacity=\"0.4\" d=\"M 137.505,251.99 256,133.587 374.492,251.989 v 145.039 h -73.768 v -86.495 h -89.451 v 86.495 h -73.768 z\" />\n</svg>";
                        var greenIcon = L.divIcon({
                            className: "customIcon",
                            iconAnchor: [12, 12],
                            popupAnchor: [0, 0],
                            html: houseImage.replace("{@col1}", color).replace("{@col2}", color)
                        });
                        var withDrag = true;
                        var marker = L.marker([latitude, longitude], { icon: greenIcon, draggable: withDrag }).addTo(map);
                        var tooltipContent = createBuildingContentDiv(uid, null, label);
                        var tt = L.tooltip({
                            permanent: true,
                            direction: 'top'
                        })
                            .setContent(tooltipContent);
                        var popupContent = createBuildingContentDiv(uid, category, label);
                        var popup = new L.Popup()
                            .setLatLng(latlng)
                            .setContent(popupContent);
                        marker
                            .bindPopup(popup)
                            .addTo(map);
                        marker.on("click", function (uuid, e) {
                            console.log('marker.on("click",', uuid);
                            map.setView(e.latlng, 18, { animate: true });
                            if (marker && marker.popup)
                                marker.popup();
                            var ml = window.parent.document.querySelector('#iMenuLeft');
                            if (ml) {
                                ignoreThisNavigation = true;
                                navigateTo(uuid);
                            }
                            if (map.gl)
                                map.gl._update();
                        }.bind(this_1, uid));
                        if (withDrag)
                            marker.on('dragend', onMarkerMove.bind(this_1, uid, marker));
                        markers[uid] = marker;
                        if (poly == null)
                            return "continue";
                        poly = toCounterClockWise(poly);
                        var polygon = L.polygon(poly);
                        var polygonStamp = createBuildingContentDiv(null, null, label);
                        addTextLabel(map, poly, polygonStamp);
                        createVertexLabels(map, poly);
                        var dd = document.createElement("div");
                        var spn = document.createElement("span");
                        spn.appendChild(document.createTextNode("Fläche" + ": "));
                        spn.appendChild(document.createTextNode(thousandSeparator(polygonArea(poly))));
                        spn.appendChild(document.createTextNode(" m"));
                        var sup2 = document.createElement("sup");
                        sup2.appendChild(document.createTextNode("2"));
                        spn.appendChild(sup2);
                        dd.appendChild(spn);
                        polygon.addTo(map);
                        polygon.on("click", function (uuid, polygon, e) {
                            console.log('polygon.on("click",', e, uuid, polygon);
                            console.log("polygon latlngs", polygon.getLatLngs());
                            polygon.editing.enable();
                            var t = "{@basic}gebaeude.aspx?uid={@obj}&muid=@GB&env=ov&ro=false&proc={@BE_Hash}";
                            t = SetDefaultVariables(t);
                            var ml = window.parent.document.querySelector('#frameDWGForm');
                            if (ml)
                                ml.src = t.replace("{@obj}", uuid);
                            observeIframe();
                        }.bind(this_1, uid, polygon));
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
                        if (map.gl)
                            map.gl._update();
                    }.bind(this, initialBounds);
                    map.zoomHome();
                    return [2];
            }
        });
    });
}
function createBuildingContentDiv(uid, category, label) {
    var popupContent = document.createElement("div");
    if (category != null) {
        var pspan1 = document.createElement("span");
        pspan1.appendChild(document.createTextNode(category));
        popupContent.appendChild(pspan1);
        popupContent.appendChild(document.createElement("br"));
    }
    if (label != null) {
        var labelParts = label.split(/(?:\r\n|\r|\n)/g);
        for (var lin = 0; lin < labelParts.length; ++lin) {
            var pspan2 = document.createElement("span");
            pspan2.appendChild(document.createTextNode(labelParts[lin]));
            popupContent.appendChild(pspan2);
            popupContent.appendChild(document.createElement("br"));
        }
    }
    if (uid != null) {
        popupContent.appendChild(document.createComment("GB: " + uid));
    }
    return popupContent;
}
function zoomIn(uid) {
    return __awaiter(this, void 0, void 0, function () {
        var boundsUrl, result, table, index_objt, index_uid, index_latitude, index_longitude, index_minLat, index_minLng, index_maxLat, index_maxLng, i, code, uid_1, latitude, longitude, minLat, minLng, maxLat, maxLng, zoomBounds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    boundsUrl = "../ajax/AnySelect.ashx?sql=Maps.ObjectBounds.sql&obj_uid={@obj_uid}&in_stichtag={@stichtag}";
                    boundsUrl = replaceAll(boundsUrl, "{@obj_uid}", uid);
                    boundsUrl = replaceAll(boundsUrl, "{@stichtag}", (new Date()).getTime().toString());
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
                    if (map.gl)
                        map.gl._update();
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
                        case "eg": return [3, 5];
                        case "og": return [3, 5];
                        case "ug": return [3, 5];
                    }
                    return [3, 6];
                case 1: return [4, zoomIn(uid)];
                case 2:
                    _b.sent();
                    return [3, 7];
                case 3: return [4, zoomIn(uid)];
                case 4:
                    _b.sent();
                    if (markers != null && markers[uid] != null)
                        markers[uid].openPopup();
                    return [3, 7];
                case 5: return [3, 7];
                case 6:
                    console.log("Objekt nicht definiert.");
                    _b.label = 7;
                case 7:
                    if (map.gl)
                        map.gl._update();
                    return [2];
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
        var req, xml, obj, ex1, ex2, ex3, myHeaders, options, ex_6, ex_7;
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
                    ex_6 = _a.sent();
                    console.log(ex_6);
                    ex1 = ex_6;
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
                    ex_7 = _a.sent();
                    console.log(ex_7);
                    ex2 = ex_7;
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
                    layer = new L.OSM.DataLayer(xml).addTo(map);
                    return [2];
            }
        });
    });
}
function getSiteConfig() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, {
                    settings: {
                        "mandant": "140",
                        "logo": "helvetia23.png",
                        language: "DE"
                    },
                    translations: {}
                }];
        });
    });
}
function IEdetection() {
    var ua = window.navigator.userAgent;
    var result = {};
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        result.crap = true;
        result.isIE = true;
        result.v = 11;
    }
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        result.crap = true;
        result.isIE = true;
        result.v = 10;
        var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
        if (re.exec(ua) !== null) {
            result.v = parseFloat(RegExp.$1);
        }
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        result.crap = true;
        result.isEdge = true;
        result.v = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return result;
}
function initMap() {
    return __awaiter(this, void 0, void 0, function () {
        function straightLine() {
            var pointA = new L.LatLng(47.54297305496059, 9.186017817687999);
            var pointB = new L.LatLng(40.69245766686793, -74.04423198459618);
            var pointList = [pointA, pointB];
            var firstpolyline = new L.Polyline(pointList, {
                color: 'red',
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
            });
            firstpolyline.addTo(map);
        }
        function calcCrow(p1, p2) {
            function toRad(val) {
                return val * Math.PI / 180;
            }
            var lat1 = p1.lat;
            var lon1 = p1.lng;
            var lat2 = p2.lat;
            var lon2 = p2.lng;
            var R = 6371;
            var dLat = toRad(lat2 - lat1);
            var dLon = toRad(lon2 - lon1);
            lat1 = toRad(lat1);
            lat2 = toRad(lat2);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d;
        }
        function flugLinie2() {
            var options = {
                color: 'rgb(145, 146, 150)',
                fillColor: 'rgb(145, 146, 150)',
                dashArray: 8,
                opacity: 0.8,
                weight: '1',
                iconTravelLength: 0.5,
                iconMaxWidth: 50,
                iconMaxHeight: 50,
                fullAnimatedTime: 7000,
                easeOutPiece: 4,
                easeOutTime: 2500,
            };
            var pointA = new L.LatLng(47.54297305496059, 9.186017817687999);
            var pointB = new L.LatLng(46.1538928965763, 8.80292035094359);
            console.log("distance:", calcCrow(pointA, pointB));
            L.bezier({
                path: [
                    [pointA, pointB]
                ],
                icon: { path: "plane.png" }
            }, options).addTo(map);
        }
        function flugLinie() {
            var pointA = new L.LatLng(47.54297305496059, 9.186017817687999);
            var pointB = new L.LatLng(46.1538928965763, 8.80292035094359);
            var geodesic = new L.Geodesic([pointA, pointB]).addTo(map);
        }
        var ml, southWest, northEast, bounds, scale, scalex, lv95, crs, useWebGL, gl, drawnItems, options, drawControl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ml = window.parent.document.querySelector('#iMenuLeft');
                    map = L.map('swissMap', { zoomControl: false });
                    map.setView(new L.LatLng(47.317390, 8.520293), 18);
                    map.zoomHome = function () { console.log("wrong instance"); };
                    createZoomControl(map);
                    southWest = new L.LatLng(45.802216, 5.920721);
                    northEast = new L.LatLng(47.968862, 10.769762);
                    bounds = new L.LatLngBounds(southWest, northEast);
                    map.fitBounds(bounds, null);
                    scale = bracketDevicePixelRatio();
                    scalex = (scale === 1) ? '' : ('@' + scale + 'x');
                    lv95 = {
                        epsg: 'EPSG:2056',
                        def: '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
                        resolutions: [4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.2, 0.1],
                        origin: [2420000, 1350000]
                    };
                    crs = new L.Proj.CRS(lv95.epsg, lv95.def, {
                        resolutions: lv95.resolutions,
                        origin: lv95.origin
                    });
                    useWebGL = true;
                    if (!useWebGL) {
                        L.tileLayer("{server}/{style}/{z}/{x}/{y}.jpeg?lang={language}", {
                            attribution: '<a target="blank" href="https://map.geo.admin.ch/">map.geo.admin.ch</a> | Map data &copy; <a target="blank" href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                            server: "https://wmts100.geo.admin.ch/",
                            style: "1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857",
                            scalex: scalex,
                            language: getUserLanguage(),
                            continuousWorld: false,
                            minZoom: 8,
                            maxZoom: 19,
                            crs: L.CRS.EPSG3857
                        }).addTo(map);
                    }
                    if (useWebGL) {
                        gl = L.mapboxGL({
                            accessToken: 'no-token',
                            updateInterval: IEdetection().crap ? 5 : 20,
                            attribution: '<a target="blank" href="https://github.com/ststeiger/VectorTileServer ">Steiger&apos;s public vector tile server</a> | <a target="blank" href="https://openmaptiles.org ">OpenMapTiles</a> | Map data &copy; <a target="blank" href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                            style: "https://corpool.cor-asp.ch/VectorTileServer/styles/bright/style.json"
                        }).addTo(map);
                        map.gl = gl;
                    }
                    drawnItems = new L.FeatureGroup();
                    map.addLayer(drawnItems);
                    options = {
                        position: "topright",
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
                            polyline: false,
                            rectangle: false,
                            circle: false,
                            marker: false,
                            circlemarker: false
                        },
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
                    L.drawLocal.draw.toolbar.buttons.polygon = "Ein Polygon zeichnen.";
                    L.drawLocal.draw.toolbar.actions.title = "Zeichnen abbrechen";
                    L.drawLocal.draw.toolbar.actions.text = "Abbrechen";
                    L.drawLocal.draw.toolbar.finish.title = "Zeichen abschliessen";
                    L.drawLocal.draw.toolbar.finish.text = "Abschliessen";
                    L.drawLocal.draw.toolbar.undo.title = "Den letzten gezeichneten Punkt löschen";
                    L.drawLocal.draw.toolbar.undo.text = "Letzten Punkt löschen";
                    L.drawLocal.draw.handlers.polygon.tooltip.start = "Klicken um das Zeichnen eines Polygons zu starten.";
                    L.drawLocal.draw.handlers.polygon.tooltip.cont = "Klicken um das Zeichnen des Polygons weiterzuführen.";
                    L.drawLocal.draw.handlers.polygon.tooltip.end = "Auf den ersten Punkt klicken um das Polygon zu schliessen.";
                    L.drawLocal.edit.toolbar.actions.save.title = "Änderungen speichern";
                    L.drawLocal.edit.toolbar.actions.save.text = "Speichern";
                    L.drawLocal.edit.toolbar.actions.cancel.title = "Bearbeiten abbrechen, alle Änderungen verwerfen";
                    L.drawLocal.edit.toolbar.actions.cancel.text = "Abbrechen";
                    L.drawLocal.edit.toolbar.actions.clearAll.title = "Alle Layer löschen";
                    L.drawLocal.edit.toolbar.actions.clearAll.text = "Alle löschen";
                    L.drawLocal.edit.toolbar.buttons.edit = "Layer bearbeiten";
                    L.drawLocal.edit.toolbar.buttons.editDisabled = "Keine Layer zum bearbeiten";
                    L.drawLocal.edit.toolbar.buttons.remove = "Layer löschen";
                    L.drawLocal.edit.toolbar.buttons.removeDisabled = "Keine Layer zum Löschen";
                    L.drawLocal.edit.handlers.edit.tooltip.text = "Ziehen Sie Ziehpunkte oder Markierungen, um Features zu bearbeiten.";
                    L.drawLocal.edit.handlers.edit.tooltip.subtext = "Klicken Sie auf Abbrechen, um die Änderungen rückgängig zu machen.";
                    L.drawLocal.edit.handlers.remove.tooltip.text = "Klicken Sie auf ein Gebilde um es zu entfernen.";
                    drawControl = new L.Control.Draw(options);
                    map.addControl(drawControl);
                    map.on('draw:created', function (e) {
                        console.log('On draw:created', e.target);
                        console.log(e.type, e);
                        e.layer.bindPopup('A popup!');
                        console.log(e.layerType);
                        var feat = e.layer.toGeoJSON();
                        if (feat.geometry && feat.geometry.coordinates && feat.geometry.coordinates.length > 0) {
                            var polygonCoords = feat.geometry.coordinates[0].map(function (c) { return [c[1], c[0]]; });
                            console.log("polygonCoords", polygonCoords);
                        }
                        var type = e.layerType, layer = e.layer;
                        drawnItems.addLayer(layer);
                    });
                    map.on('draw:editstart', function (e) {
                        console.log('draw:editstart', e, e.type, e.target);
                    });
                    map.on('draw:editstop', function (e) {
                        console.log('draw:editstop', e, e.type, e.target);
                    });
                    map.on('draw:edited', function (e) {
                        console.log('draw:edited', e, e.type, e.target);
                    });
                    map.on('draw:deleted', function (e) {
                        console.log('draw:deleted', e, e.type, e.target);
                    });
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
                        if (map.gl)
                            map.gl._update();
                    });
                    {
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
                    }
                    map.on("click", function (e) {
                        console.log('map.on("click",', e.latlng);
                    });
                    flugLinie();
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
function createInsertScriptSQL(latlongs) {
    var insertString = "\nDECLARE @GB_UID AS uniqueidentifier; \nDECLARE @SO_UID AS uniqueidentifier; \n\nSET @GB_UID = NULLIF('abc', ''); \nSET @SO_UID = NULLIF('', ''); \n\n\nDELETE FROM T_ZO_Objekt_Wgs84Polygon WHERE ZO_OBJ_WGS84_GB_UID = @GB_UID; \n\n\n/*\nINSERT INTO T_ZO_Objekt_Wgs84Polygon\n(\n     ZO_OBJ_WGS84_UID\n    ,ZO_OBJ_WGS84_GB_UID\n    ,ZO_OBJ_WGS84_SO_UID\n    ,ZO_OBJ_WGS84_Sort\n    ,ZO_OBJ_WGS84_GM_Lat\n    ,ZO_OBJ_WGS84_GM_Lng\n)\n*/";
    latlongs = toCounterClockWise(latlongs);
    if (latlongs[0].lat !== latlongs[latlongs.length - 1].lat || latlongs[0].lng !== latlongs[latlongs.length - 1].lng)
        latlongs.push(latlongs[0]);
    for (var i = 0; i < latlongs.length; ++i) {
        if (i !== 0)
            insertString += " \r\n\r\n\r\nUNION ALL \r\n\r\n";
        insertString += "\nSELECT\n     NEWID() AS ZO_OBJ_WGS84_UID\n    ,CAST(@GB_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_GB_UID\n    ,CAST(@SO_UID AS uniqueidentifier) AS ZO_OBJ_WGS84_SO_UID\n    ,CAST(" + i + " AS integer) + 1 AS ZO_OBJ_WGS84_Sort\n    ," + latlongs[i].lat + " AS ZO_OBJ_WGS84_GM_Lat -- decimal(23, 20)\n    ," + latlongs[i].lng + " AS ZO_OBJ_WGS84_GM_Lng -- decimal(23, 20) ";
    }
    insertString += " \r\n; \r\n\r\n";
    return insertString;
}
function createInsertScript(unionPolygon) {
    if (unionPolygon == null) {
        unionPolygon = "POLYGON ((8.3038582 47.0506309, 8.3038611 47.050588, 8.3038772 47.0504833, 8.3041581 47.0505083, 8.3042898 47.0505392, 8.3042879 47.050571, 8.30442 47.05058, 8.3044327 47.0507439, 8.3043001 47.0507637, 8.304174 47.050784, 8.3041695 47.0507507, 8.3041592 47.0506835, 8.3041585 47.0506448, 8.3042166 47.0506438, 8.3042225 47.0506777, 8.3042885 47.0506777, 8.3042854 47.0506139, 8.3041532 47.0506229, 8.303965 47.0506089, 8.3039616 47.0506342, 8.3038582 47.0506309))";
    }
    var latlongs = polygonStringToCoordinates(unionPolygon);
    console.log(latlongs);
    console.log("string", JSON.stringify(latlongs, null, 2));
    var polygon = L.polygon(latlongs);
    polygon.bindPopup(unionPolygon).addTo(map);
    var insertScript = createInsertScriptSQL(latlongs);
    return insertScript;
}
function startMap() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    polyFills();
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
                    return [4, loadLegend()];
                case 1:
                    _a.sent();
                    return [2];
            }
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
function UNUSED_extendLayerGroup() {
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
function replaceAll(str, find, newToken, ignoreCase) {
    var i = -1;
    if (!str) {
        if ((str == null) && (find == null))
            return newToken;
        return str;
    }
    if (!find)
        return str;
    ignoreCase = ignoreCase || false;
    find = ignoreCase ? find.toLowerCase() : find;
    while ((i = (ignoreCase ? str.toLowerCase() : str).indexOf(find, i >= 0 ? i + newToken.length : 0)) !== -1) {
        str = str.substring(0, i) +
            newToken +
            str.substring(i + find.length);
    }
    return str;
}
function getBuildings() {
    return __awaiter(this, void 0, void 0, function () {
        var bb, area, OSM_API_VERSION, url, xml, buildingsNodes, nodes, nodeDictionary, buildings, i, nodeId, i, buildingNodes, coords, j, ref, wayId, property, myway, thisBuilding, contentString, popup;
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
                            myway = "osm_data_polygon";
                            thisBuilding = L.polygon(buildings[property], { className: myway });
                            thisBuilding.addTo(map);
                            contentString = "OSM way-id: " + property + "<br />" + "area: ~" + thousandSeparator(polygonArea(buildings[property])) + "m<sup>2</sup><br />GPS:<br />";
                            contentString += CreateSqlPolygon(buildings[property]);
                            contentString += '<textarea style="width: 100%; height: 5cm;">';
                            contentString += createInsertScriptSQL(buildings[property]);
                            contentString += "</textarea>";
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
