
let Portal = {

    Debug: {

        Feedback: {
            //h:=header, m:=message
            Send: function (h:any, m:any)
            {
                //if (typeof window.top.Confirm != 'undefined' && typeof window.top.Confirm.Feedback == 'function') { window.top.Confirm.Feedback(h, m) }
                // else 
                alert(m)
            }
        },

        Log: function (n:any, o:any)
        {
            if (typeof console === 'object' && typeof console.log !== 'undefined')
            {
                console.log(n, o);
                //this.Feedback.Send(n, o)
            }
            else alert(o)
        },

        Throw: function(n:any,o:any)
        {
            //this._isActive() && this.Log(n, o)
            console.log(n, o);
        },

        Trace: function (m: any, a: any)
        {
            // this._isActive() && this._Trace.Log(m, a)
        }
    }
    
    
    ,Global: {

        register: function()
        {
            if (!window['postMessage'])
                alert("oh crap");
            else {
                if (window.addEventListener) {
                    //alert("standards-compliant");
                    // For standards-compliant web browsers (ie9+)
                    window.addEventListener("message", this.receiveMessage, false);
                }
                else {
                    //alert("not standards-compliant (ie8)");
                    window.attachEvent("onmessage", this.receiveMessage);
                }
            }
        }
        
        ,receiveMessage: function (event:MessageEvent)
        {
            if (event && event.data)
            {
                //REM: Die automatische Object-Konvertierung gibt Probleme im IE8/9 :p
                //https://stackoverflow.com/questions/13830480/ie8-9-window-postmessage-not-working-but-why
                let tData = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data;

                //REM: Führt das Vererben wird eine Handlung gefordert
                if (tData && tData.Action)
                {
                    //REM: Vererbt die Daten als String an die iframes weiter
                    for (let tL = document.querySelectorAll('iframe'), i = 0, j = tL.length; i < j; i++)
                    {
                        try
                        {
                            (typeof tL[i].contentWindow.postMessage === 'function') && tL[i].contentWindow.postMessage(JSON.stringify(tData), '*')
                        }
                        catch (err)
                        {
                            //CORS
                        }
                    }
                }
            }
        },

        spreadMessage: function (obj:any)
        {
            let tWindow = window.top;
            
            if (tWindow.addEventListener)
            {
                tWindow.top.removeEventListener('message', tWindow.Portal.Global.receiveMessage, false);
                tWindow.top.addEventListener('message', tWindow.Portal.Global.receiveMessage, false)
            }
            else if (tWindow.attachEvent)
            {
                tWindow.top.detachEvent('onmessage', tWindow.Portal.Global.receiveMessage);
                tWindow.top.attachEvent('onmessage', tWindow.Portal.Global.receiveMessage)
            }
            
            tWindow.postMessage(JSON.stringify(obj), '*')
        }
    }
    , Frameset: {
        focusFrameByWindow: function (window:Window)
        {
            let _Log = function (o:any, f:any)
            {
                (typeof Portal.Debug === 'object') ?
                    Portal.Debug.Throw('w8', f + ': ' + o) : (typeof console === 'object'
                    && typeof console.log !== 'undefined')
                    && console.log('w8', f + ': ' + o)
            };
            
            let _Remove = function (e:Node)
            {
                this._Trace('_Remove');

                try
                {
                    e && e.parentNode.removeChild(e)
                }
                catch (err) { this._Log(err, '_Remove') }
            };
            
            let showFrame = function (e:HTMLElement, unusedC:any)
            {
                this._Trace('showFrame');

                try
                {
                    // for (var tL = document.querySelectorAll('#naRight iframe'), i = 0, j = tL.length; i < j; i++) tL[i].style.display = 'none';

                    e.style.display = 'block';

                    // _Remove(document.querySelector('#W'))
                }
                catch (err) { this._Log(err, 'showFrame') }
            };
            
            if (window)
            {
                for (let tL = document.querySelectorAll('iframe'), i = 0, j = tL.length; i < j; i++)
                {
                    try
                    {
                        (tL[i].contentWindow === window) && this.showFrame(tL[i])
                    }
                    catch (err)
                    {
                        //Nix
                    }
                }
            }
        }
    }
    ,Session: {
        ID: function ()
        {
            return "123";
        }
    }
};
