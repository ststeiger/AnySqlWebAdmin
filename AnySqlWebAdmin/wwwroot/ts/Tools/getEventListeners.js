(function () {
    Element.prototype._addEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function (type, listener, useCapture) {
        if (useCapture == undefined)
            useCapture = false;
        this._addEventListener(type, listener, useCapture);
        if (!this.eventListenerList)
            this.eventListenerList = {};
        if (!this.eventListenerList[type])
            this.eventListenerList[type] = [];
        this.eventListenerList[type].push({ "listener": listener, "useCapture": useCapture });
    };
    Element.prototype.getEventListeners = function (type) {
        if (!this.eventListenerList)
            this.eventListenerList = {};
        if (type == undefined)
            return this.eventListenerList;
        return this.eventListenerList[type];
    };
    Element.prototype.clearEventListeners = function (type) {
        if (!this.eventListenerList)
            this.eventListenerList = {};
        if (type == undefined) {
            for (var thisType in (this.getEventListeners()))
                this.clearEventListeners(thisType);
            return;
        }
        var el = this.getEventListeners(type);
        if (el == undefined)
            return;
        for (var i = el.length - 1; i >= 0; --i) {
            var ev = el[i];
            this.removeEventListener(type, ev.listener, ev.useCapture);
        }
    };
    Element.prototype._removeEventListener = Element.prototype.removeEventListener;
    Element.prototype.removeEventListener = function (type, listener, options) {
        if (options == undefined)
            options = false;
        this._removeEventListener(type, listener, options);
        if (!this.eventListenerList)
            this.eventListenerList = {};
        if (!this.eventListenerList[type])
            this.eventListenerList[type] = [];
        for (var i = 0; i < this.eventListenerList[type].length; i++) {
            if (this.eventListenerList[type][i].listener == listener, this.eventListenerList[type][i].useCapture == options) {
                this.eventListenerList[type].splice(i, 1);
                break;
            }
        }
        if (this.eventListenerList[type].length == 0)
            delete this.eventListenerList[type];
    };
})();
