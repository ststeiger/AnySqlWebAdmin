
interface ScriptLoaderOptions
{
    js: string[];
    css: string[];
}



class cScriptLoader
{
    private m_js_files: string[];
    private m_css_files: string[];
    private m_head: HTMLHeadElement;

    private log = (t: any) =>
    {
        console.log("ScriptLoader: " + t);
    };

    //private static getVersion()
    //{
    //    let isIE = false;
    //    let ver: number = -1;
    //    let ua = navigator.userAgent.toLowerCase();
    //    if (ua.indexOf(" msie ") != -1) // 4-10
    //    {
    //        isIE = true;
    //        let r1 = new RegExp("(msie\\s*([\\d]+))", "i");
    //        let vMain = ua.match(r1) || [];
    //        ver = 0 - -(vMain[2] || -1);

    //    }
    //    else if (ua.indexOf("trident/") != -1)  // IE11
    //    {
    //        isIE = true;
    //        ver = 11;
    //    }
    //    else if (ua.indexOf("edge/") != -1)
    //    {
    //        let r1 = new RegExp("(" + "edge" + "(?=\\/))\\/?\\s*([\\d]+)", "i");
    //        let vMain = ua.match(r1) || [];
    //        ver = 0 - -(vMain[2] || -1);
    //    }

    //    console.log("ver", ver);
    //    return ver;
    //}


    public static CreateInstance(): cScriptLoader
    {

      

        (function iePolyfills()
        {
            'use strict';
            
            // IE 11: CustomEvent 
            // IE8: string.trim, array.map, array.filter, function.bind

            if (typeof window["CustomEvent"] !== "function")
            {
                
                let CustomEvent = function (event:string, params:any)
                {
                    if (!document.createEvent)
                        return params || {};

                    params = params || { bubbles: false, cancelable: false, detail: undefined };
                    let evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                };

                CustomEvent.prototype = (<any>window)["Event"].prototype;
                window["CustomEvent"] = CustomEvent;
            }

            if (document.attachEvent)
            {
                if (!document.attachCustomEvent)
                document.attachCustomEvent = function (eventName:string, callback:any)
                {
                    document.documentElement.attachEvent("onpropertychange", function (event:any)
                    {
                        // if the property changed is the custom eventName property
                        if (event.propertyName == eventName)
                        {
                            let data = (<any>document.documentElement)[event.propertyName];
                            callback(data);
                            // document.documentElement.detachEvent("onpropertychange", arguments.callee);
                        }
                    });
                };
            }

            if (!String.prototype.trim)
            {
                String.prototype.trim = function ()
                {
                    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                };
            }

            if (!Array.prototype.map) Array.prototype.map = function (f: any) { let r = []; for (let i = 0; i < this.length; i++)r.push(f(this[i])); return r };
            if (!Array.prototype.filter) Array.prototype.filter = function (f: any) { let r = []; for (let i = 0; i < this.length; i++)if (f(this[i])) r.push(this[i]); return r };

            let slice = Array.prototype.slice;

            if (Function.prototype.bind)
            {
                return;
            }

            function bind(context:any)
            {
                let args = slice.call(arguments, 1),
                    self = this;

                function Noop(): void // LoL, "TypeScript"...
                { // this has to be internal to ensure that the prototype stays specific to the context
                    return this;
                }

                if (typeof this !== 'function')
                {
                    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }

                function bound()
                {
                    return self.apply(this instanceof Noop ? this : context, args.concat(slice.call(arguments)));
                }

                Noop.prototype = this.prototype;
                //bound.prototype = new Noop(); // WTF ? "TypeScript" ...
                bound.prototype = Noop();

                return bound;
            }

            Function.prototype.bind = bind;
        })();

        // Prevent console errors (Safari, IE 8-11, old Firefox) 
        (function (): void 
        {
            // Variable c: "console" - TypeScript workaround - console "readonly" ...
            let c: string = "console", method: string, noop = function () { }
                , methods: string[] = [
                    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                    'timeStamp', 'trace', 'warn'
                ], length: number = methods.length;

            if (!(<any>window)[c])
                (<any>window)[c] = {};

            while (length--)
            {
                method = methods[length];

                // Only stub undefined methods.
                if (!(<any>window)[c][method])
                {
                    (<any>window)[c][method] = noop;
                }
            }
        })();


        // https://stackoverflow.com/questions/3025885/xpath-1-0-to-find-if-an-elements-value-is-in-a-list-of-values/44967753#44967753
        // let scripts = document.getElementsByTagName("script");
        // let scripts = document.head.querySelectorAll('script[data-scripts]');
        // let loader = document.head.querySelector('script[src*="loader.js"][data-scripts]');
        // let loader = document.head.querySelector('script[contains("0000X1,0000X2", @)');
        // let loader = document.head.querySelector("script /@*[starts-with(name(), 's')]");
        // let loader = document.head.querySelector("script /@*[starts-with(name(), 's')]");
        // let loader = document.head.querySelector('script[contains("0000X1,0000X2", @src)]');
        let head: HTMLHeadElement = document.getElementsByTagName("head")[0];
        // no, this doesn't find loader if it isn't in head
        // let loader: HTMLScriptElement = <HTMLScriptElement>document.currentScript || <HTMLScriptElement>head.querySelector('script[src*="loader.js"][data-js],[src*="loader.js"][data-css]');
        let loader: HTMLScriptElement = <HTMLScriptElement>document.currentScript || <HTMLScriptElement>document.querySelector('script[src*="loader.js"][data-js],[src*="loader.js"][data-css]');
        

        function arrayify(str: string): string[]
        {
            return str.split('[').join(',').split(']').join(',')
                .split('"').join(',').split("'").join(',').split(',')
                //.map(Function.prototype.call, String.prototype.trim)
                .map(function (s: string) { return s.trim(); })
                .filter(function (n) { return n.length > 0; })
        }

        function mapExtension(a: string[], ext:string): string[]
        {
            return a.map(function (str)
            {
                // str = str.replace("js/", "GeneratedScripts/");
                return str + "." + ext;
            });
        }

        function attributeArray(attributeName:string): string[] 
        {
            if (loader.hasAttribute(attributeName))
                return arrayify((<any>loader.attributes)[attributeName].value);

            return [];
        }

        function addAll(a1: string[], a2: string[])
        {
            for (let i: number = 0; i < a2.length; ++i)
            {
                a1.unshift(a2[i]);
            }
        }


        let js: string[] = attributeArray("data-js");
        let css: string[] = attributeArray("data-css");
        // console.log("js", js);
        // console.log("css", css);

        let isIE: boolean = false;
        let isEdge: boolean = false;

        let ua: string = navigator.userAgent.toLowerCase();
        if (ua.indexOf(" msie ") != -1 || ua.indexOf("trident/") != -1) // 4-10
            isIE = true;
        else if (ua.indexOf("edge/") != -1)
            isEdge = true;

        // console.log("IE", isIE);
        // console.log("Edge", isEdge);

        // Sequence matters - we prepend, so we need to reverse the order 
        if (isEdge)
        {
            let jsEdge: string[] = attributeArray("data-polyfill-js-edge");
            // console.log("js Edge", jsEdge);
            addAll(js, jsEdge);

            let cssEdge: string[] = attributeArray("data-css-edge");
            // console.log("css Edge", cssEdge);
            addAll(css, cssEdge);
        }

        if (isIE || isEdge)
        {
            let jsInterEdge: string[] = attributeArray("data-js-iedge");
            // console.log("js InterEdge", jsInterEdge);
            addAll(js, jsInterEdge);

            let cssInterEdge: string[] = attributeArray("data-css-iedge");
            // console.log("css InterEdge", cssInterEdge);
            addAll(css, cssInterEdge);
        }

        if (isIE)
        {
            // https://www.npmjs.com/package/js-polyfills
            // https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
            let jsIE: string[] = attributeArray("data-js-ie");
            // console.log("js IE", jsIE);
            addAll(js, jsIE);

            let cssIE: string[] = attributeArray("data-css-ie");
            // console.log("css IE", cssIE);
            addAll(css, cssIE)
        }


        js = mapExtension(js, "js");
        css = mapExtension(css, "css");

        let sl = new cScriptLoader({ "js": js, "css": css });

        function onDomReady()
        {
            console.log("dom ready");
            sl.loadFiles();
        }

        if (document.addEventListener) document.addEventListener("DOMContentLoaded", onDomReady, false);
        else if (document.attachEvent) document.attachEvent("onreadystatechange", onDomReady);
        else window.onload = onDomReady;

        return sl;
    }


    //constructor(files: string[])
    constructor(options: ScriptLoaderOptions & object)
    {
        this.m_js_files = options.js || [];
        this.m_css_files = options.css || [];
        this.m_head = document.getElementsByTagName("head")[0];
        // this.m_head = document.head; // IE9+ only

        /*
        function endsWith(str: string, suffix: string): boolean 
        {
            if (str === null || suffix === null)
                return false;

            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        
        
        for (let i: number = 0; i < files.length; ++i) 
        {
            if (endsWith(files[i], ".css"))
            {
                this.m_css_files.push(files[i]);
            }
            else if (endsWith(files[i], ".js"))
            {
                this.m_js_files.push(files[i]);
            }
            else
                this.log('Error unknown filetype "' + files[i] + '".');
        }
        */
        // this.loadFiles();
    }


    public withNoCache = (filename: string): string =>
    {
        if (filename != null && filename.indexOf("?") === -1)
            filename += "?no_cache=" + new Date().getTime();
        else
            filename += "&no_cache=" + new Date().getTime();

        return filename;
    };


    public loadStyle = (filename: string) =>
    {
        // HTMLLinkElement
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = this.withNoCache(filename);

        this.log('Loading style ' + filename);
        link.onload = () =>
        {
            this.log('Loaded style "' + filename + '".');

        };

        link.onerror = () =>
        {
            this.log('Error loading style "' + filename + '".');
        };

        this.m_head.appendChild(link);
    };


    public loadScript = (i: number) => 
    {
        let loadNextScript = () => 
        {
            if (i + 1 < this.m_js_files.length)
            {
                this.loadScript(i + 1);
            }
            else
            {
                console.log("finished loading scripts");
                let evtName = "allScriptsLoaded";
                let loadCompleteEvent = new CustomEvent(evtName, {
                    detail: {
                        withError: false
                    }
                });

                //window.addEventListener("allScriptsLoaded", function (e: CustomEvent)
                //{
                //    console.log("awww", e.detail);
                //});

                if (document.dispatchEvent) 
                    window.dispatchEvent(loadCompleteEvent);
                else
                    //document.documentElement[evtName]++;
                    (<any>document.documentElement)[evtName] = loadCompleteEvent;
            }
        };

        
        if (this.m_js_files[i] == null)
        {
            this.log('Skipping script "' + this.m_js_files[i] + '".');
            loadNextScript();
            return;
        }


        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.withNoCache(this.m_js_files[i]);

        //script.onreadystatechange = () =>
        //{
        //    console.log("readychange");
        //};

        // Not working for IE8...
        //script.onload = () =>
        //{
        //    console.log("f3oo");
        //    this.log('Loaded script "' + this.m_js_files[i] + '".');
        //    loadNextScript();
        //};

        let done = false;

        // onreadystatechange: IE8
        script.onload = script.onreadystatechange = function()
        {
            if (!done && (!this.readyState ||
                this.readyState === "loaded" || this.readyState === "complete"))
            {
                done = true;
                loadNextScript();

                // Handle memory leak in IE
                let head = document.getElementsByTagName("head")[0];
                script.onload = script.onreadystatechange = null;
                if (head && script.parentNode)
                {
                    head.removeChild(script);
                }
            }
        };



        script.onerror = () =>
        {
            this.log('Error loading script "' + this.m_js_files[i] + '".');
            loadNextScript();
        };

        
        this.log('Loading script "' + this.m_js_files[i] + '".');
        this.m_head.appendChild(script);
    };

    public loadFiles = () => 
    {
        // this.log(this.m_css_files);
        // this.log(this.m_js_files);

        for (let i: number = 0; i < this.m_css_files.length; ++i)
            this.loadStyle(this.m_css_files[i]);

        this.loadScript(0);
    };

}


cScriptLoader.CreateInstance();
