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
export var autoBind;
(function (autoBind_1) {
    function autoBind(self) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.getOwnPropertyNames(self.constructor.prototype)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (key !== 'constructor') {
                    var desc = Object.getOwnPropertyDescriptor(self.constructor.prototype, key);
                    if (desc != null) {
                        if (!desc.configurable) {
                            console.log("AUTOBIND-WARNING: Property \"" + key + "\" not configurable ! (" + self.constructor.name + ")");
                            continue;
                        }
                        var g = desc.get != null;
                        var s = desc.set != null;
                        if (g || s) {
                            var newDescriptor = {};
                            newDescriptor.enumerable = desc.enumerable;
                            newDescriptor.configurable = desc.configurable;
                            if (g)
                                newDescriptor.get = desc.get.bind(self);
                            if (s)
                                newDescriptor.set = desc.set.bind(self);
                            Object.defineProperty(self, key, newDescriptor);
                            continue;
                        }
                    }
                    if (typeof (self[key]) === 'function') {
                        var val = self[key];
                        self[key] = val.bind(self);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return self;
    }
    autoBind_1.autoBind = autoBind;
    function autoBind_old(self) {
        var e_2, _a;
        try {
            for (var _b = __values(Object.getOwnPropertyNames(self.constructor.prototype)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var val = self[key];
                if (key !== 'constructor' && typeof val === 'function') {
                    self[key] = val.bind(self);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return self;
    }
    autoBind_1.autoBind_old = autoBind_old;
})(autoBind || (autoBind = {}));
