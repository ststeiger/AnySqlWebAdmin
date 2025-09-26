'use strict';
function createState(state) {
    return new Proxy(state, {
        set: function (target, property, value) {
            var oldVal = target[property];
            if (oldVal === value) {
                return;
            }
            var type = oldVal === undefined ? 'add' : 'update';
            target[property] = value;
            render();
            return true;
        },
        deleteProperty: function (target, propKey) {
            if (!(propKey in target)) {
                return;
            }
            var changeRecord = {
                name: propKey,
                type: 'delete',
                object: target,
                oldValue: target[propKey]
            };
            delete target[propKey];
            return true;
        }
    });
}
var state = createState({
    "name": 'Francesco',
    "title": 'Front-end Engineer'
});
state.name = 'Richard';
state.title = 'Technical Lead';
function render() {
    document.querySelector('[data-binding="name"]').innerHTML = state.name;
    document.querySelector('[data-binding="title"]').innerHTML = state.title;
    document.querySelector('[data-model="name"]').value = state.name;
    document.querySelector('[data-model="title"]').value = state.title;
}
function listener(event) {
    state[event.target.dataset.model] = event.target.value;
}
var obj = { foo: 1, bar: 2 };
var proxied = new Proxy(obj, {
    get: function (target, prop) {
        console.log({ type: 'get', target: target, prop: prop });
        return target[prop];
    },
    set: function (target, prop, value, receiver) {
        console.log({ type: 'set', target: target, prop: prop, value: value });
        target[prop] = value;
        return true;
    }
});
proxied.bar = 2;
proxied.foo;
