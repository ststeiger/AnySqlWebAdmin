'use strict';
var modelState = createState({
    "name": 'Francesco',
    "title": 'Front-end Engineer'
});
function observe(target) {
    function observeMutations(mutations, observer) {
        var finish = performance.now();
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                console.log("MutationObserver observed childList as ".concat(target.textContent));
            }
            if (mutation.type === 'childList') {
            }
            else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        });
    }
    var observer = new MutationObserver(observeMutations);
    observer.observe(target, { childList: true });
}
var source = document.querySelector('#source');
function foo(list) {
    function observeMutations() {
    }
    var observer = new MutationObserver(observeMutations);
    observer.observe(list, {
        attributes: true,
        childList: true,
        characterData: true
    });
}
document.querySelector('[data-model="name"]').addEventListener('keyup', listener);
document.querySelector('[data-model="title"]').addEventListener('keyup', listener);
function isGecko() {
    var w = window;
    if (!w.navigator || !w.navigator.userAgent) {
        return false;
    }
    var ua = w.navigator.userAgent;
    return ua.indexOf('Gecko') > 0 && ua.toLowerCase().indexOf('webkit') < 0 && ua.indexOf('Edge') < 0 && ua.indexOf('Trident') < 0 && ua.indexOf('MSIE') < 0;
}
function testObjectObservation() {
    var obj = {};
    Object.defineProperty(obj, 'a', {
        value: 37,
        writable: true,
        enumerable: true,
        configurable: true
    });
    function observeCallback(changes) {
        console.log(changes);
        changes.forEach(function (change, i) {
            console.log('what property changed? ' + change.name);
            console.log('how did it change? ' + change.type);
            console.log('whats the current value? ' + change.object[change.name]);
            console.log(change);
        });
    }
    Object.observe(obj, observeCallback);
}
