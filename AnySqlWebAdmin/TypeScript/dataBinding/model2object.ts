
'use strict';


const modelState = createState({
    "name": 'Francesco',
    "title": 'Front-end Engineer'
});


function observe(target:Node) {
    // create an observer instance
    function observeMutations(mutations: MutationRecord[], observer: MutationObserver)
    {
        let finish = performance.now();
        // out.innerHTML += `MutationObserver took: ${finish - start}ms<br>`;
        
        mutations.forEach(
            function(mutation:any)
            {
                if (mutation.addedNodes.length) {
                    console.log(`MutationObserver observed childList as ${target.textContent}`)
                }
                if (mutation.type === 'childList')
                {
                    // addition/deletion of nodes in DOM.                    
                }
                else if (mutation.type === 'attributes') {
                    console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
                
                
                
            }
        );
    }
    
    let observer = new MutationObserver(observeMutations);
    observer.observe(target, {childList: true});
}

let source = document.querySelector('#source');
// observe(source); // setup MO


function foo(list:Node)
{
    function observeMutations(){
        
    }

    // let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    let observer = new MutationObserver(observeMutations);
    
    observer.observe(list, {
        attributes: true,
        childList: true, // Set childList to true if want to observe any addition/deletion to a particular child nodes.
        characterData: true
    });    
}





// https://dev.to/phoinixi/two-way-data-binding-in-vanilla-js-poc-4e06
document.querySelector('[data-model="name"]').addEventListener('keyup', listener);
document.querySelector('[data-model="title"]').addEventListener('keyup', listener);


function isGecko()
{
    let w = window;

    if (!w.navigator || !w.navigator.userAgent)
    {
        return false;
    }
    var ua = w.navigator.userAgent;
    return ua.indexOf('Gecko') > 0 && ua.toLowerCase().indexOf('webkit') < 0 && ua.indexOf('Edge') < 0 && ua.indexOf('Trident') < 0 && ua.indexOf('MSIE') < 0;
}



interface IObjectChanges
{
    name:string;
    type:string;
    object:any;
}



// IE11 - no doesn't work in IE11
// https://github.com/microsoft/TypeScript/issues/2075
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
// Array.observe instead of Object.observe. 
interface ObjectConstructor  {
    // acceptList: ["add", "update", "delete", "reconfigure", "setPrototype", "preventExtensions"];
    // This means that the "add" change is listed before the "delete" in the following snippet:
    // observe(beingObserved: any, callback: (update: any) => any, acceptList?:any) : void;
    observe(beingObserved: any, callback: (changes:IObjectChanges[]) => any, acceptList?:any) : void;
    unobserve(beingObserved: any, callback: (changes:IObjectChanges[]) => any) : void;
    
    // callback is called each time a change is made to obj, with an array of all changes in the order in which they occurred.
    // Environments that don't support Object.getOwnPropertyNames (most notably, Internet Explorer prior to version 9) can't detect changes to non-enumerable properties:
}   



function testObjectObservation()
{
    let obj = {}; // Creates a new object

    // Example of an object property added with defineProperty with a data property descriptor
    Object.defineProperty(obj, 'a', {
        value: 37,
        writable: true,
        enumerable: true,
        configurable: true
    });
    
    
    function observeCallback(changes: IObjectChanges[]) {
        console.log(changes);
        changes.forEach(function(change, i){
            console.log('what property changed? ' + change.name);
            console.log('how did it change? ' + change.type);
            console.log('whats the current value? ' + change.object[change.name]);
            console.log(change); // all changes
        });
    }

    Object.observe(obj, observeCallback);
    // Object.unobserve(obj, observeCallback);
}
