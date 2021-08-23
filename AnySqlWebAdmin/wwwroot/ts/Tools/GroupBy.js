var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function groupBy(array, grouping) {
    var keys = grouping.keys;
    var groups = array.reduce(function (groups, item) {
        var group = groups.find(function (g) { return keys.every(function (key) { return item[key] === g.key[key]; }); });
        var data = Object.getOwnPropertyNames(item)
            .filter(function (prop) { return !keys.find(function (key) { return key === prop; }); })
            .reduce(function (o, key) {
            var _a;
            return (__assign(__assign({}, o), (_a = {}, _a[key] = item[key], _a)));
        }, {});
        return group
            ? groups.map(function (g) { return (g === group ? __assign(__assign({}, g), { items: __spread(g.items, [data]) }) : g); })
            : __spread(groups, [
                {
                    key: keys.reduce(function (o, key) {
                        var _a;
                        return (__assign(__assign({}, o), (_a = {}, _a[key] = item[key], _a)));
                    }, {}),
                    items: [data]
                }
            ]);
    }, []);
    return grouping.thenby ? groups.map(function (g) { return (__assign(__assign({}, g), { items: groupBy(g.items, grouping.thenby) })); }) : groups;
}
function LinqGroupBy(source, keySelector) {
    if (source == null)
        throw new Error("ArgumentNullException: Source");
    if (keySelector == null)
        throw new Error("ArgumentNullException: keySelector");
    var dict = {};
    for (var i = 0; i < source.length; ++i) {
        var key = keySelector(source[i]).toString();
        if (!dict.hasOwnProperty(key)) {
            dict[key] = [];
        }
        dict[key].push(source[i]);
    }
    return dict;
}
function Any(source, predicate) {
    if (source == null)
        throw new Error("ArgumentNullException: source");
    if (predicate == null)
        throw new Error("ArgumentNullException: predicate");
    for (var i = 0; i < source.length; ++i) {
        if (predicate(source[i]))
            return true;
    }
    return false;
}
