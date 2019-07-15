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
function createTimeoutPromise1(timeout, executor) {
    var promiseA = new Promise(function (resolve, reject) {
        var wait = setTimeout(function () {
            clearTimeout(wait);
            reject(new Error("Promise timed out ! (timeout = " + timeout + ")"));
        }, timeout);
    });
    var promiseB = new Promise(executor);
    return Promise.race([promiseA, promiseB]);
}
function newid() {
    function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function postMessageAsync(targetWindow, data) {
    return __awaiter(this, void 0, void 0, function () {
        function postMessageAnswerHandler(resolve, reject) {
            console.log('[processPromise]', data);
            persist.callbackStorage[id] = function (event) {
                try {
                    console.log('[iframeResponse]', event.source, event.data);
                    var response = JSON.parse(event.data);
                    if (response.inResponseTo === id) {
                        try {
                            window.removeEventListener('message', persist.callbackStorage[id], false);
                            delete persist.callbackStorage[id];
                            resolve(response.content);
                        }
                        catch (ex) {
                            reject(ex);
                        }
                    }
                }
                catch (err) {
                    reject(err);
                }
            };
            window.addEventListener('message', persist.callbackStorage[id], false);
            targetWindow.postMessage(JSON.stringify(payloadData), '*');
        }
        var persist, payloadData, id;
        return __generator(this, function (_a) {
            persist = this;
            payloadData = null;
            if (!persist.callbackStorage)
                persist.callbackStorage = {};
            id = newid();
            while (persist.callbackStorage[id] != null) {
                id = newid();
            }
            payloadData = {
                "messageId": id,
                "content": data
            };
            return [2, createTimeoutPromise(5000, postMessageAnswerHandler)];
        });
    });
}
function testPostMessage() {
    return __awaiter(this, void 0, void 0, function () {
        var targetWindow, answer, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    targetWindow = document.getElementById("ifrmChild").contentWindow;
                    return [4, postMessageAsync(targetWindow, { "address": "Fabrikstrasse 1, CH-8586 Erlen, Switzerland" })];
                case 1:
                    answer = _a.sent();
                    console.log("answer: ", answer);
                    console.log("location.lat: ", answer[0].geometry.location.lat);
                    console.log("location.lng: ", answer[0].geometry.location.lng);
                    console.log("viewport.s: ", answer[0].geometry.viewport.south);
                    console.log("viewport.w: ", answer[0].geometry.viewport.west);
                    console.log("viewport.n: ", answer[0].geometry.viewport.north);
                    console.log("viewport.e: ", answer[0].geometry.viewport.east);
                    return [3, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log("error in testPostMessage:", err_1);
                    return [3, 3];
                case 3:
                    console.log('End [testPostMessage]');
                    return [2];
            }
        });
    });
}
