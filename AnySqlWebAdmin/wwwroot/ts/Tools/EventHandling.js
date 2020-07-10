var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var JQuery;
(function (JQuery) {
    var Replacement;
    (function (Replacement) {
        function Test() {
            var main = document.getElementsByTagName("main")[0];
            JQuery.Replacement.subscribeEvent(main, "click", "li", function (e) {
                console.log("on target", e.target);
            });
            var ele = document.querySelector("#main > div.checklist > ul > li:nth-child(1)");
            ele.insertAdjacentHTML("afterend", "<li>Hello</li>");
        }
        Replacement.Test = Test;
        function subscribeEvent(parentSelector, eventName, childSelector, eventCallback) {
            if (parentSelector == null)
                throw new ReferenceError("Parameter parentSelector is NULL");
            if (childSelector == null)
                throw new ReferenceError("Parameter childSelector is NULL");
            var nodeToObserve = parentSelector;
            if (typeof (parentSelector) === 'string')
                nodeToObserve = document.querySelector(parentSelector);
            var eligibleChildren = nodeToObserve.querySelectorAll(childSelector);
            for (var i = 0; i < eligibleChildren.length; ++i) {
                eligibleChildren[i].addEventListener(eventName, eventCallback, false);
            }
            function allDescendants(node) {
                if (node == null)
                    return;
                for (var i = 0; i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    allDescendants(child);
                }
                if (!Element.prototype.matches)
                    Element.prototype.matches = Element.prototype.msMatchesSelector;
                if (node.matches) {
                    if (node.matches(childSelector)) {
                        node.addEventListener(eventName, eventCallback, false);
                    }
                }
            }
            var callback = function (mutationsList, observer) {
                var e_1, _a;
                try {
                    for (var mutationsList_1 = __values(mutationsList), mutationsList_1_1 = mutationsList_1.next(); !mutationsList_1_1.done; mutationsList_1_1 = mutationsList_1.next()) {
                        var mutation = mutationsList_1_1.value;
                        if (mutation.type == 'childList') {
                            for (var i = 0; i < mutation.addedNodes.length; ++i) {
                                var thisNode = mutation.addedNodes[i];
                                allDescendants(thisNode);
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (mutationsList_1_1 && !mutationsList_1_1.done && (_a = mutationsList_1.return)) _a.call(mutationsList_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            };
            var config = { attributes: false, childList: true, subtree: true };
            var observer = new MutationObserver(callback);
            observer.observe(nodeToObserve, config);
        }
        Replacement.subscribeEvent = subscribeEvent;
        function on(parentSelector, eventName, childSelector, eventCallback) {
            if (parentSelector == null)
                throw new ReferenceError("Parameter parentSelector is NULL.");
            if (childSelector == null)
                throw new ReferenceError("Parameter childSelector is NULL.");
            var parent = parentSelector;
            if (typeof (parentSelector) === 'string')
                parent = document.querySelector(parentSelector);
            function isDescendant(parent, child) {
                var node = child.parentNode;
                while (node != null) {
                    if (node == parent) {
                        return true;
                    }
                    node = node.parentNode;
                }
                return false;
            }
            parent.addEventListener(eventName, function (event) {
                var eligibleChildren = parent.querySelectorAll(childSelector);
                for (var i = 0; i < eligibleChildren.length; ++i) {
                    if (isDescendant(eligibleChildren[i], event.target)) {
                        return eventCallback.apply(this, arguments);
                    }
                }
                return null;
            });
        }
        Replacement.on = on;
    })(Replacement = JQuery.Replacement || (JQuery.Replacement = {}));
})(JQuery || (JQuery = {}));
