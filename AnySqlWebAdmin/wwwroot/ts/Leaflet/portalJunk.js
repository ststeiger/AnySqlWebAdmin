var Portal = {
    Debug: {
        Feedback: {
            Send: function (h, m) {
                alert(m);
            }
        },
        Log: function (n, o) {
            if (typeof console === 'object' && typeof console.log !== 'undefined') {
                console.log(n, o);
            }
            else
                alert(o);
        },
        Throw: function (n, o) {
            console.log(n, o);
        },
        Trace: function (m, a) {
        }
    },
    Global: {
        register: function () {
            if (!window['postMessage'])
                alert("oh crap");
            else {
                if (window.addEventListener) {
                    window.addEventListener("message", this.receiveMessage, false);
                }
                else {
                    window.attachEvent("onmessage", this.receiveMessage);
                }
            }
        },
        receiveMessage: function (event) {
            if (event && event.data) {
                var tData = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data;
                if (tData && tData.Action) {
                    for (var tL = document.querySelectorAll('iframe'), i = 0, j = tL.length; i < j; i++) {
                        try {
                            (typeof tL[i].contentWindow.postMessage === 'function') && tL[i].contentWindow.postMessage(JSON.stringify(tData), '*');
                        }
                        catch (err) {
                        }
                    }
                }
            }
        },
        spreadMessage: function (obj) {
            var tWindow = window.top;
            if (tWindow.addEventListener) {
                tWindow.top.removeEventListener('message', tWindow.Portal.Global.receiveMessage, false);
                tWindow.top.addEventListener('message', tWindow.Portal.Global.receiveMessage, false);
            }
            else if (tWindow.attachEvent) {
                tWindow.top.detachEvent('onmessage', tWindow.Portal.Global.receiveMessage);
                tWindow.top.attachEvent('onmessage', tWindow.Portal.Global.receiveMessage);
            }
            tWindow.postMessage(JSON.stringify(obj), '*');
        }
    },
    Frameset: {
        focusFrameByWindow: function (window) {
            var _Log = function (o, f) {
                (typeof Portal.Debug === 'object') ?
                    Portal.Debug.Throw('w8', f + ': ' + o) : (typeof console === 'object'
                    && typeof console.log !== 'undefined')
                    && console.log('w8', f + ': ' + o);
            };
            var _Remove = function (e) {
                this._Trace('_Remove');
                try {
                    e && e.parentNode.removeChild(e);
                }
                catch (err) {
                    this._Log(err, '_Remove');
                }
            };
            var showFrame = function (e, unusedC) {
                this._Trace('showFrame');
                try {
                    e.style.display = 'block';
                }
                catch (err) {
                    this._Log(err, 'showFrame');
                }
            };
            if (window) {
                for (var tL = document.querySelectorAll('iframe'), i = 0, j = tL.length; i < j; i++) {
                    try {
                        (tL[i].contentWindow === window) && this.showFrame(tL[i]);
                    }
                    catch (err) {
                    }
                }
            }
        }
    },
    Session: {
        ID: function () {
            return "123";
        }
    }
};
