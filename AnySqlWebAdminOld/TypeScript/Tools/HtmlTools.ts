
interface IUIA extends Object
{
    Android: Function;
    BlackBerry: Function;
    iOS: Function;
    WindowsMobile: Function;
    anyMobile: Function;
    hasWindowResizeBug?: boolean;
}

interface IDropDownData
{
    t: string;
    v: string;
    s: boolean;
}



let HtmlTools =
{
    "DomReady": function (a: EventListenerOrEventListenerObject)
    {
        document.addEventListener ? document.addEventListener("DOMContentLoaded", a) : window.attachEvent("onload", a);
    }
    
    //object & {[key: string]: string
    // dispatch event cross browser
    , "dispatchEvent": function (el:HTMLElement, e:string)
    {
        // console.log("dispatching");

        if ("createEvent" in document)
        {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent(e, false, true);
            el.dispatchEvent(evt);
        }
        else
        {
            el.fireEvent("on" + e);
        }

    }

    , "userAgent": function ()
    {
        let s:string = null;
        if (navigator && navigator.userAgent && navigator.userAgent != null)
            s = navigator.userAgent.toLowerCase();
        else
            s = "";

        let uai: IUIA = {
            Android: function ()
            {
                return s.match(/android|opera mobi|opera mini/i);
            },
            BlackBerry: function ()
            {
                return s.match(/blackberry/i);
            },
            iOS: function ()
            {
                return s.match(/iphone|ipad|ipod/i);
            },
            WindowsMobile: function ()
            {
                return s.match(/iemobile|windows ce|pocket pc/i);
            },
            anyMobile: function ()
            {
                return (uai.Android() || uai.BlackBerry() || uai.iOS() || uai.WindowsMobile());
            }
            
        };
        uai.hasWindowResizeBug = uai.anyMobile();

        return uai;
    }

    // add event cross browser
    // HtmlTools(elem, "click", function(evt){});
        , "addEvent": function (elem: Element, event:string, fn: EventListenerOrEventListenerObject)
    {
        if (elem.addEventListener)
            elem.addEventListener(event, fn, false);
        else
        {
            elem.attachEvent("on" + event, function ()
            {
                // set the this pointer same as addEventListener when fn is called
                return ((<Function>fn).call(elem, window.event) );
            });
        }
    }
    
    // Populate dropdown with data
    , "popDrop": function (sel: HTMLSelectElement | string, data: IDropDownData[])
    {
        // console.log(data);
        
        if (typeof sel === 'string' || sel instanceof String)
            sel = <HTMLSelectElement>document.getElementById(<string><any>sel);

        sel.options.length = 0; // clear out existing items

        let ogl = sel.getElementsByTagName('optgroup');
        for (let j = ogl.length - 1; j >= 0; j--)
            sel.removeChild(ogl[j]);
        
        let docfrag = document.createDocumentFragment();

        // let combinationGroup = document.createElement("optgroup");
        // combinationGroup.label = GroupName;

        // let data = [{ t: "Internet Explorer", v: "MSFT" }, { t: "Mozilla Firefox", v: "MOZ" }, { t: "Safari", v: "AAPL" }, { t: "Chrome", v: "GOOG" }, { t: "Opera", v: "O" }];
        for (let i = 0; i < data.length; i++)
        {
            // opts.push('<option value="' + value.abc + '" text="' + value.abc + '" />');
            // let opt = document.createElement('option');
            // opt.value = cuisines[i];
            // if (opt.textContent) opt.textContent = cuisines[i];
            // else opt.innerText = cuisines[i];

            let d = data[i];
            let opt = new Option(d.t, d.v, null, d.s);
            // if(d.s) opt.selected = true;

            docfrag.appendChild(opt);

            // sel.appendChild(opt);
        } // Next i 

        sel.appendChild(docfrag);
        this.dispatchEvent(sel, "change")
    } // End Function PopDrop

} // End Obj HtmlTools
;
