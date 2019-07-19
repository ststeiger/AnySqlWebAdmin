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
var TestFetchAsync;
(function (TestFetchAsync) {
    function get(url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(url, {
                            method: 'GET'
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    }
    TestFetchAsync.get = get;
})(TestFetchAsync || (TestFetchAsync = {}));
var TestFetch;
(function (TestFetch) {
    function basicExample(url) {
        var myImage = document.querySelector('img');
        var myRequest = new Request(url);
        fetch(myRequest)
            .then(function (response) {
            console.log(response.type);
            console.log(response.url);
            console.log(response.useFinalURL);
            console.log(response.status);
            console.log(response.ok);
            console.log(response.statusText);
            console.log(response.headers);
            return response.blob();
        })
            .then(function (myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        });
        var myBlob = new Blob();
        var init = { "status": 200, "statusText": "SuperSmashingGreat!" };
        var myResponse = new Response(myBlob, init);
    }
    TestFetch.basicExample = basicExample;
    function getSomeTableExample(id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, fetch("sql?sql=Tree.Navigation.sql&format=3", {
                                "method": 'POST',
                                "headers": new Headers({ 'content-type': 'application/json' }),
                                "body": JSON.stringify({ "__in_parent": id, })
                            })
                                .then(function (response) { return response.json(); })
                                .then(function (dat) { return dat.tables[0]; })];
                    case 2:
                        data = (_a.sent());
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        alert("error fetching branch data\n" + e_1);
                        return [3, 4];
                    case 4: return [2, data];
                }
            });
        });
    }
    TestFetch.getSomeTableExample = getSomeTableExample;
    function getImage(url) {
        var myImage = document.querySelector('.my-image');
        fetch(url)
            .then(function (response) {
            if (!response.ok)
                return new Error(response);
            return response.blob();
        })
            .then(function (myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    TestFetch.getImage = getImage;
    function getAudio() {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var source;
        var pre = document.querySelector('pre');
        var myScript = document.querySelector('script');
        var play = document.querySelector('.play');
        var stop = document.querySelector('.stop');
        function getData() {
            source = audioCtx.createBufferSource();
            fetch('viper.ogg')
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (buffer) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, audioCtx.decodeAudioData(buffer, function (decodedData) {
                                    source.buffer = decodedData;
                                    source.connect(audioCtx.destination);
                                })];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                });
            });
        }
        play.onclick = function () {
            getData();
            source.start(0);
            play.setAttribute('disabled', 'disabled');
        };
        stop.onclick = function () {
            source.stop(0);
            play.removeAttribute('disabled');
        };
        pre.innerHTML = myScript.innerHTML;
    }
    TestFetch.getAudio = getAudio;
    function fetchJSON() {
        var myList = document.querySelector('ul');
        fetch('products.json')
            .then(function (response) { return response.json(); })
            .then(function (json) {
            for (var i = 0; i < json.products.length; i++) {
                var listItem = document.createElement('li');
                listItem.innerHTML = '<strong>' + json.products[i].Name + '</strong>';
                listItem.innerHTML += ' can be found in ' + json.products[i].Location + '.';
                listItem.innerHTML += ' Cost: <strong>£' + json.products[i].Price + '</strong>';
                myList.appendChild(listItem);
            }
        });
    }
    TestFetch.fetchJSON = fetchJSON;
    function fetchText() {
        var myArticle = document.querySelector('article');
        var x = document.querySelectorAll('ul a');
        for (var i = 0; i < x.length; ++i) {
            var mylink = x.item(i);
            mylink.onclick = function (e) {
                e.preventDefault();
                var linkData = e.target.getAttribute('data-page');
                getData(linkData);
            };
        }
        function getData(pageId) {
            console.log(pageId);
            var myRequest = new Request(pageId + '.txt');
            fetch(myRequest)
                .then(function (response) { return response.text(); })
                .then(function (text) {
                myArticle.innerHTML = text;
            });
        }
    }
    TestFetch.fetchText = fetchText;
    function post(url) {
        fetch(url, {
            method: 'POST',
            headers: {
                'auth': '1234'
            },
            body: JSON.stringify({
                name: 'dean',
                login: 'dean',
            })
        })
            .then(function (data) {
            console.log('Request success: ', data);
        })
            .catch(function (error) {
            console.log('Request failure: ', error);
        });
    }
    TestFetch.post = post;
    function get(url) {
        fetch(url, {
            method: 'GET'
        })
            .then(function (response) {
        })
            .catch(function (err) {
        });
    }
    TestFetch.get = get;
})(TestFetch || (TestFetch = {}));
