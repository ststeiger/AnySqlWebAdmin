var cScriptLoader = (function () {
    function cScriptLoader(options) {
        var _this = this;
        this.log = function (t) {
            console.log("ScriptLoader: " + t);
        };
        this.withNoCache = function (filename) {
            if (filename != null && filename.indexOf("?") === -1)
                filename += "?no_cache=" + new Date().getTime();
            else
                filename += "&no_cache=" + new Date().getTime();
            return filename;
        };
        this.loadStyle = function (filename) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = _this.withNoCache(filename);
            _this.log('Loading style ' + filename);
            link.onload = function () {
                _this.log('Loaded style "' + filename + '".');
            };
            link.onerror = function () {
                _this.log('Error loading style "' + filename + '".');
            };
            _this.m_head.appendChild(link);
        };
        this.loadScript = function (i) {
            var loadNextScript = function () {
                if (i + 1 < _this.m_js_files.length) {
                    _this.loadScript(i + 1);
                }
                else {
                    console.log("finished loading scripts");
                    var evtName = "allScriptsLoaded";
                    var loadCompleteEvent = new CustomEvent(evtName, {
                        detail: {
                            withError: false
                        }
                    });
                    if (document.dispatchEvent)
                        window.dispatchEvent(loadCompleteEvent);
                    else
                        document.documentElement[evtName] = loadCompleteEvent;
                }
            };
            if (_this.m_js_files[i] == null) {
                _this.log('Skipping script "' + _this.m_js_files[i] + '".');
                loadNextScript();
                return;
            }
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = _this.withNoCache(_this.m_js_files[i]);
            var done = false;
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState ||
                    this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    loadNextScript();
                    var head = document.getElementsByTagName("head")[0];
                    script.onload = script.onreadystatechange = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                }
            };
            script.onerror = function () {
                _this.log('Error loading script "' + _this.m_js_files[i] + '".');
                loadNextScript();
            };
            _this.log('Loading script "' + _this.m_js_files[i] + '".');
            _this.m_head.appendChild(script);
        };
        this.loadFiles = function () {
            for (var i = 0; i < _this.m_css_files.length; ++i)
                _this.loadStyle(_this.m_css_files[i]);
            _this.loadScript(0);
        };
        this.m_js_files = options.js || [];
        this.m_css_files = options.css || [];
        this.m_head = document.getElementsByTagName("head")[0];
    }
    cScriptLoader.CreateInstance = function () {
        (function iePolyfills() {
            'use strict';
            if (typeof window["CustomEvent"] !== "function") {
                var CustomEvent_1 = function (event, params) {
                    if (!document.createEvent)
                        return params || {};
                    params = params || { bubbles: false, cancelable: false, detail: undefined };
                    var evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                };
                CustomEvent_1.prototype = window["Event"].prototype;
                window["CustomEvent"] = CustomEvent_1;
            }
            if (document.attachEvent) {
                if (!document.attachCustomEvent)
                    document.attachCustomEvent = function (eventName, callback) {
                        document.documentElement.attachEvent("onpropertychange", function (event) {
                            if (event.propertyName == eventName) {
                                var data = document.documentElement[event.propertyName];
                                callback(data);
                            }
                        });
                    };
            }
            if (!String.prototype.trim) {
                String.prototype.trim = function () {
                    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                };
            }
            if (!Array.prototype.map)
                Array.prototype.map = function (f) { var r = []; for (var i = 0; i < this.length; i++)
                    r.push(f(this[i])); return r; };
            if (!Array.prototype.filter)
                Array.prototype.filter = function (f) { var r = []; for (var i = 0; i < this.length; i++)
                    if (f(this[i]))
                        r.push(this[i]); return r; };
            var slice = Array.prototype.slice;
            if (Function.prototype.bind) {
                return;
            }
            function bind(context) {
                var args = slice.call(arguments, 1), self = this;
                function Noop() {
                    return this;
                }
                if (typeof this !== 'function') {
                    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }
                function bound() {
                    return self.apply(this instanceof Noop ? this : context, args.concat(slice.call(arguments)));
                }
                Noop.prototype = this.prototype;
                bound.prototype = Noop();
                return bound;
            }
            Function.prototype.bind = bind;
        })();
        (function () {
            var c = "console", method, noop = function () { }, methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeStamp', 'trace', 'warn'
            ], length = methods.length;
            if (!window[c])
                window[c] = {};
            while (length--) {
                method = methods[length];
                if (!window[c][method]) {
                    window[c][method] = noop;
                }
            }
        })();
        var head = document.getElementsByTagName("head")[0];
        var loader = document.currentScript || head.querySelector('script[src*="loader.js"][data-js],[src*="loader.js"][data-css]');
        function arrayify(str) {
            return str.split('[').join(',').split(']').join(',')
                .split('"').join(',').split("'").join(',').split(',')
                .map(function (s) { return s.trim(); })
                .filter(function (n) { return n.length > 0; });
        }
        function mapExtension(a, ext) {
            return a.map(function (str) {
                return str + "." + ext;
            });
        }
        function attributeArray(attributeName) {
            if (loader.hasAttribute(attributeName))
                return arrayify(loader.attributes[attributeName].value);
            return [];
        }
        function addAll(a1, a2) {
            for (var i = 0; i < a2.length; ++i) {
                a1.unshift(a2[i]);
            }
        }
        var js = attributeArray("data-js");
        var css = attributeArray("data-css");
        var isIE = false;
        var isEdge = false;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf(" msie ") != -1 || ua.indexOf("trident/") != -1)
            isIE = true;
        else if (ua.indexOf("edge/") != -1)
            isEdge = true;
        if (isEdge) {
            var jsEdge = attributeArray("data-polyfill-js-edge");
            addAll(js, jsEdge);
            var cssEdge = attributeArray("data-css-edge");
            addAll(css, cssEdge);
        }
        if (isIE || isEdge) {
            var jsInterEdge = attributeArray("data-js-iedge");
            addAll(js, jsInterEdge);
            var cssInterEdge = attributeArray("data-css-iedge");
            addAll(css, cssInterEdge);
        }
        if (isIE) {
            var jsIE = attributeArray("data-js-ie");
            addAll(js, jsIE);
            var cssIE = attributeArray("data-css-ie");
            addAll(css, cssIE);
        }
        js = mapExtension(js, "js");
        css = mapExtension(css, "css");
        var sl = new cScriptLoader({ "js": js, "css": css });
        function onDomReady() {
            console.log("dom ready");
            sl.loadFiles();
        }
        if (document.addEventListener)
            document.addEventListener("DOMContentLoaded", onDomReady, false);
        else if (document.attachEvent)
            document.attachEvent("onreadystatechange", onDomReady);
        else
            window.onload = onDomReady;
        return sl;
    };
    return cScriptLoader;
}());
cScriptLoader.CreateInstance();
