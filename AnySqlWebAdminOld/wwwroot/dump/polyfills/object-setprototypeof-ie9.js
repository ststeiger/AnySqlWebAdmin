// https://gist.github.com/edoardocavazza/47246856759f2273e48b
(function () {
    if (typeof Object.setPrototypeOf === 'undefined' && typeof Object.getOwnPropertyNames === 'function') {
        var _exclude = ['length', 'name', 'arguments', 'caller', 'prototype'];

        function bindFunction(ctx, fn) {
            return function() {
                return fn.apply(this, arguments);
            }
        }

        function bindProperty(ctx, prop, parentDescriptor) {
            if (!parentDescriptor) {
                var defaultValue = ctx.__proto__[prop];
                parentDescriptor = {
                    get: function () {
                        return ctx['__' + prop] || defaultValue
                    },
                    set: function (val) {
                        ctx['__' + prop] = val;
                    }
                }
            }
            Object.defineProperty(ctx, prop, {
                get: parentDescriptor.get ? parentDescriptor.get.bind(ctx) : undefined,
                set: parentDescriptor.set ? parentDescriptor.set.bind(ctx) : undefined,
                configurable: true
            });

        }

        function iterateProps(subClass, superClass) {
            var props = Object.getOwnPropertyNames(superClass),
                proto;

            subClass.__proto__ = superClass;
            for (var i = 0, len = props.length; i < len; i++) {
                var prop = props[i];
                if (prop === '__proto__') {
                    proto = superClass[prop];
                } else if (_exclude.indexOf(i) === -1) {
                    var descriptor = Object.getOwnPropertyDescriptor(subClass, prop);
                    if (!descriptor) {
                        var superDescriptor = Object.getOwnPropertyDescriptor(superClass, prop);
                        if (typeof superDescriptor.get !== 'function' && typeof superClass[prop] === 'function') {
                            subClass[prop] = bindFunction(subClass, superClass[prop]);
                        } else if (typeof superDescriptor.get == 'function') {
                            bindProperty(subClass, prop, superDescriptor);
                        } else {
                            bindProperty(subClass, prop);
                        }
                    }
                }
            }
            if (proto) {
                iterateProps(subClass, proto);
            }
        }

        Object.setPrototypeOf = iterateProps;
    }
})();
