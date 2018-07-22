var HtmlTools = {
    "DomReady": function (a) {
        document.addEventListener ? document.addEventListener("DOMContentLoaded", a) : window.attachEvent("onload", a);
    },
    "dispatchEvent": function (el, e) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(e, false, true);
            el.dispatchEvent(evt);
        }
        else {
            el.fireEvent("on" + e);
        }
    },
    "userAgent": function () {
        var s = null;
        if (navigator && navigator.userAgent && navigator.userAgent != null)
            s = navigator.userAgent.toLowerCase();
        else
            s = "";
        var uai = {
            Android: function () {
                return s.match(/android|opera mobi|opera mini/i);
            },
            BlackBerry: function () {
                return s.match(/blackberry/i);
            },
            iOS: function () {
                return s.match(/iphone|ipad|ipod/i);
            },
            WindowsMobile: function () {
                return s.match(/iemobile|windows ce|pocket pc/i);
            },
            anyMobile: function () {
                return (uai.Android() || uai.BlackBerry() || uai.iOS() || uai.WindowsMobile());
            }
        };
        uai.hasWindowResizeBug = uai.anyMobile();
        return uai;
    },
    "addEvent": function (elem, event, fn) {
        if (elem.addEventListener)
            elem.addEventListener(event, fn, false);
        else {
            elem.attachEvent("on" + event, function () {
                return (fn.call(elem, window.event));
            });
        }
    },
    "popDrop": function (sel, data) {
        if (typeof sel === 'string' || sel instanceof String)
            sel = document.getElementById(sel);
        sel.options.length = 0;
        var ogl = sel.getElementsByTagName('optgroup');
        for (var j = ogl.length - 1; j >= 0; j--)
            sel.removeChild(ogl[j]);
        var docfrag = document.createDocumentFragment();
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var opt = new Option(d.t, d.v, null, d.s);
            docfrag.appendChild(opt);
        }
        sel.appendChild(docfrag);
        this.dispatchEvent(sel, "change");
    }
};
