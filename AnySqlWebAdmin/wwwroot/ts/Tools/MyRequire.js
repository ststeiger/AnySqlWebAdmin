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
    console.log("howdy");
});
var fs = {
    file: "\n    // module.exports = \"Hello World\";\n        \n    module.exports = function(){ return 5*3;};\n    \n    \n    \n    ",
    getFileAsync: function (fileName, encoding) {
        return __awaiter(this, void 0, void 0, function () {
            var textDecoder, response, reader, result, chunks, partN, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        textDecoder = new TextDecoder(encoding);
                        return [4, fetch(fileName)];
                    case 1:
                        response = _a.sent();
                        console.log(response.statusText);
                        reader = response.body.getReader();
                        chunks = [];
                        _a.label = 2;
                    case 2: return [4, reader.read()];
                    case 3:
                        result = _a.sent();
                        partN = textDecoder.decode(result.value);
                        console.log("result: ", result.value, partN);
                        chunks.push(partN);
                        _a.label = 4;
                    case 4:
                        if (!result.done) return [3, 2];
                        _a.label = 5;
                    case 5:
                        file = chunks.join('');
                        return [2, file];
                }
            });
        });
    },
    getFile: function (fileName, encoding) {
        var client = new XMLHttpRequest();
        client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
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
    console.log("Evaluating file " + name);
    if (!(name in myRequire.cache)) {
        console.log(name + " is not in cache; reading from disk");
        var code = fs.readFileSync(name, 'utf8');
        var module = { exports: {} };
        myRequire.cache[name] = module;
        var wrapper = Function("require, exports, module", code);
        wrapper(myRequire, module.exports, module);
    }
    console.log(name + " is in cache. Returning it...");
    return myRequire.cache[name].exports;
}
myRequire.cache = Object.create(null);
window.require = myRequire;
var stuff = window.require('./main.js');
console.log(stuff);
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
