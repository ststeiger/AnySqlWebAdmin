"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var fs = {
    file: "\n    module.exports = function(){ return 5*3;};\n    module.exports.hello_world = \"Hello World\";\n    ",
    readFileAsync: function (fileName, encoding) {
        return __awaiter(this, void 0, void 0, function () {
            var textDecoder, response, buffer, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        textDecoder = new TextDecoder(encoding);
                        return [4, fetch(fileName)];
                    case 1:
                        response = _a.sent();
                        console.log(response.ok);
                        console.log(response.status);
                        console.log(response.statusText);
                        return [4, response.arrayBuffer()];
                    case 2:
                        buffer = _a.sent();
                        file = textDecoder.decode(buffer);
                        return [2, file];
                }
            });
        });
    },
    getFile: function (fileName, encoding) {
        var client = new XMLHttpRequest();
        client.open("GET", fileName, false);
        client.send();
        if (client.status === 200)
            return client.responseText;
        return null;
    },
    readFileSync: function (fileName, encoding) {
        return this.file;
    }
};
function myRequire(name) {
    console.log("Evaluating file ".concat(name));
    if (!(name in myRequire.cache)) {
        console.log("".concat(name, " is not in cache; reading from disk"));
        var code = fs.readFileSync(name, 'utf8');
        var module = { exports: {} };
        myRequire.cache[name] = module;
        var wrapper = Function("require, exports, module", code);
        wrapper(myRequire, module.exports, module);
    }
    console.log("".concat(name, " is in cache. Returning it..."));
    return myRequire.cache[name].exports;
}
myRequire.cache = Object.create(null);
window.require = myRequire;
var stuff = window.require('./main.js');
console.log(stuff);
function myRequireAsync(name) {
    return __awaiter(this, void 0, void 0, function () {
        var code, module, wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Evaluating file ".concat(name));
                    if (!!(name in myRequireAsync.cache)) return [3, 3];
                    console.log("".concat(name, " is not in cache; reading from disk"));
                    return [4, fs.readFileAsync(name, 'utf8')];
                case 1:
                    code = _a.sent();
                    module = { exports: {} };
                    myRequireAsync.cache[name] = module;
                    wrapper = Function("asyncRequire, exports, module", code);
                    return [4, wrapper(myRequireAsync, module.exports, module)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    console.log("".concat(name, " is in cache. Returning it..."));
                    return [2, myRequireAsync.cache[name].exports];
            }
        });
    });
}
myRequireAsync.cache = Object.create(null);
window.asyncRequire = myRequireAsync;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var asyncStuff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, window.asyncRequire('./main.js')];
            case 1:
                asyncStuff = _a.sent();
                console.log(asyncStuff);
                return [2];
        }
    });
}); });
function get(url, timeoutMS) {
    function urlJoinChar(u) {
        return u.indexOf('?') >= 0 ? '&' : '?';
    }
    return new Promise(function (resolve, reject) {
        var timeout = timeoutMS || 10000;
        var callbackName = 'jsonp_callback_' + Date.now();
        var head = document.getElementsByTagName('head')[0] || document.documentElement;
        var script = document.createElement('script');
        var timerId = null;
        script.src = url + urlJoinChar(url) + 'callback=' + callbackName;
        script.async = true;
        function cleanUp() {
            timerId && clearTimeout(timerId);
            window[callbackName] && delete window[callbackName];
            script && head.removeChild(script);
        }
        function onResolve(data) {
            cleanUp();
            resolve(JSON.stringify(data));
        }
        function onError() {
            cleanUp();
            reject(Error("Network error loading " + script.src));
        }
        function onTimeout() {
            cleanUp();
            reject(Error("Request to " + url + " failed to execute callback after " + timeout + "ms."));
        }
        window[callbackName] = onResolve;
        script.onerror = onError;
        head.appendChild(script);
        timerId = setTimeout(onTimeout, timeout);
    });
}
function getJSON(url) {
    return get(url).then(JSON.parse);
}
function sleepTwice(interval) {
    return new Promise(function (resolve, reject) {
        var wait = setTimeout(function () {
            clearTimeout(wait);
            resolve();
            resolve();
        }, interval);
    });
}
sleepTwice(2000).then(function () {
    console.log("Do I resolve twice, or not ?");
});
