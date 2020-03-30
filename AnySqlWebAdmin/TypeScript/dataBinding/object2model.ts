'use strict';

/*
// Needed in lower version, causes conflict in higher version
interface EventTarget
{
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
    // The dataset property on the HTMLOrForeignElement interface provides read/write access 
    // to all the custom data attributes (data-*) set on the element.
    // The problem here is, Element, document, and window can be an EventTarget.
    dataset: any;
}
*/


function createState(state: any) {
    return new Proxy(state, {
        set(target: any, property: string, value: any) {
            let oldVal = target[property];
            if (oldVal === value) {
                return;
            }

            let type = oldVal === undefined ? 'add' : 'update';

            target[property] = value; // default set behaviour
            render(); // updates the view every time the state changes
            return true;
        },
        deleteProperty(target: any, propKey: string | number | symbol): boolean {
            // Don't send change record if prop doesn't exist.
            if (!(propKey in target)) {
                return;
            }

            var changeRecord = {
                name: propKey,
                type: 'delete',
                object: target,
                oldValue: target[propKey]
            };

            delete target[propKey]; // remove prop from target.

            // TODO: handle multiple changes in a single callback.
            //callback([changeRecord]);
            return true;
        }
    });
}

const state = createState({
    "name": 'Francesco',
    "title": 'Front-end Engineer'
});



// change model and re-render scene
state.name = 'Richard';
state.title = 'Technical Lead';



function render()
{
    (<HTMLHeadingElement>document.querySelector('[data-binding="name"]')).innerHTML = state.name;
    (<HTMLHeadingElement>document.querySelector('[data-binding="title"]')).innerHTML = state.title;
    (<HTMLInputElement>document.querySelector('[data-model="name"]')).value = state.name;
    (<HTMLInputElement>document.querySelector('[data-model="title"]')).value = state.title;
}





function listener(event: Event)
{
    // The problem here is, Element, document, and window can be an EventTarget. 
    // You should detect your EventTarget if is an element.
    // let test = (<HTMLOrSVGElement><any>event.target).dataset.model; 
    state[(<HTMLOrSVGElement><any>event.target).dataset.model] = (<HTMLInputElement>event.target).value;
}





let obj = { foo: 1, bar: 2 };

let proxied = new Proxy(obj, {
    get: function (target: any, prop: string): any {
        console.log({ type: 'get', target, prop });
        //return Reflect.get(target, prop);
        return target[prop];
    },
    set: function (target: any, prop: string | number | symbol, value: any, receiver: any): boolean {
        console.log({ type: 'set', target, prop, value });
        // return Reflect.set(target, prop, value);
        target[prop] = value;

        return true;
    }
});

proxied.bar = 2;
// {type: 'set', target: <obj>, prop: 'bar', value: 2}

proxied.foo;
// {type: 'get', target: <obj>, prop: 'bar'}
