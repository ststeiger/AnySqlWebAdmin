
// https://stackoverflow.com/questions/2623118/inspect-attached-event-handlers-for-any-dom-element
// https://stackoverflow.com/questions/446892/how-to-find-event-listeners-on-a-dom-node-when-debugging-or-from-the-javascript
// This is a nice answer, but I can't get it to work on the body and document elements

interface Element
{
    _addEventListener: (type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) => void;
    _removeEventListener: (type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void;

    getEventListeners: (type?: string) => any; 
    clearEventListeners: (type?: string) =>void;
}


// https://stackoverflow.com/questions/14486110/how-to-check-if-a-javascript-class-inherits-another-without-creating-an-obj
// How to check if a Javascript Class inherits another(without creating an obj) ?
// HTMLAnchorElement.prototype instanceof HTMLElement


// https://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
// How do I get the name of an object's type in JavaScript?
// document.body.constructor.name
// let a = "hello"; a.constructor.name

// HTMLBodyElement.prototype, Element.prototype, HTMLElement.prototype, HTMLAnchorElement.prototype

(function ()
{
    Element.prototype._addEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function (type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void
    {
        if (useCapture == undefined)
            useCapture = false;
        
        this._addEventListener(type, listener, useCapture);
        
        if (!this.eventListenerList)
            this.eventListenerList = {};
        
        if (!this.eventListenerList[type])
            this.eventListenerList[type] = [];
        
        // this.removeEventListener(type, listener, useCapture); // TODO - handle duplicates..
        this.eventListenerList[type].push({ "listener": listener, "useCapture": useCapture });
    };
    
    
    Element.prototype.getEventListeners = function (type?: string):any 
    {
        if (!this.eventListenerList)
            this.eventListenerList = {};

        if (type == undefined)
            return this.eventListenerList;

        return this.eventListenerList[type];
    };
    
    
    Element.prototype.clearEventListeners = function (type?: string) :void 
    {
        if (!this.eventListenerList)
            this.eventListenerList = {};

        if (type == undefined)
        {
            let els = this.getEventListeners();
            for (let thisType in els)
            {
                if (!els.hasOwnProperty(thisType)) 
                    continue;
                
                this.clearEventListeners(thisType);
            }
            return;
        } // End if (type == undefined) 

        let el = this.getEventListeners(type);
        if (el == undefined)
            return;

        for (let i = el.length - 1; i >= 0; --i)
        {
            let ev = el[i];
            this.removeEventListener(type, ev.listener, ev.useCapture);
        } // Next i 
    };

    
    Element.prototype._removeEventListener = Element.prototype.removeEventListener;
    Element.prototype.removeEventListener = function (type: string, listener?: EventListenerOrEventListenerObject, options?: boolean) : void
    {
        if (options == undefined)
            options = false;

        this._removeEventListener(type, listener, options);

        if (!this.eventListenerList)
            this.eventListenerList = {};

        if (!this.eventListenerList[type])
            this.eventListenerList[type] = [];

        // Find the event in the list
        for (let i = 0; i < this.eventListenerList[type].length; i++)
        {
            
            // Comma expression ? returns last value in list... 
            // The comma operator evaluates each of its operands (from left to right) 
            // and returns the value of the last operand.
            if (this.eventListenerList[type][i].listener == listener && 
                this.eventListenerList[type][i].useCapture == options)
            {
                // Hmm..
                this.eventListenerList[type].splice(i, 1);
                break;
            }
            
        } // Next i 

        if (this.eventListenerList[type].length == 0)
            delete this.eventListenerList[type];
    };

})();

// Tests: 
// function hello() { console.log("ciao"); }
// function ciao() { console.log("ciao"); }
// document.getElementById("answer-2623352").onclick = hello;
// document.getElementById("answer-2623352").addEventListener("click", ciao);
// document.getElementById("answer-2623352").addEventListener("click", function () { console.log(arguments); });
// document.getElementById("answer-2623352").getEventListeners().click 
// document.getElementById("answer-2623352").getEventListeners("click")
