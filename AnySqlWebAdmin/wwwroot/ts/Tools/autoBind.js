export var autoBind;
(function (autoBind_1) {
    function autoBind(self) {
        for (var _i = 0, _a = Object.getOwnPropertyNames(self.constructor.prototype); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key !== 'constructor') {
                var isFunction = true;
                var desc = Object.getOwnPropertyDescriptor(self.constructor.prototype, key);
                if (desc.get != null) {
                    desc.get = desc.get.bind(self);
                    isFunction = false;
                }
                if (desc.set != null) {
                    desc.set = desc.set.bind(self);
                    isFunction = false;
                }
                if (isFunction && typeof (self[key]) === 'function') {
                    var val = self[key];
                    self[key] = val.bind(self);
                }
            }
        }
        return self;
    }
    autoBind_1.autoBind = autoBind;
    function autoBind_old(self) {
        for (var _i = 0, _a = Object.getOwnPropertyNames(self.constructor.prototype); _i < _a.length; _i++) {
            var key = _a[_i];
            var val = self[key];
            if (key !== 'constructor' && typeof val === 'function') {
                self[key] = val.bind(self);
            }
        }
        return self;
    }
    autoBind_1.autoBind_old = autoBind_old;
})(autoBind || (autoBind = {}));
