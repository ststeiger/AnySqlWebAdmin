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
var e_1, _a;
var TableWrapper = (function () {
    function TableWrapper(columns, data, ignoreCase) {
        if (ignoreCase == null)
            ignoreCase = true;
        for (var i = 0; i < columns.length; ++i) {
            columns[i] = columns[i].toLowerCase();
        }
        var that = this;
        this.getIndex.bind(this);
        this.setColumns.bind(this);
        this.row.bind(this);
        this.addRow.bind(this);
        this.removeRow.bind(this);
        this.rows = data;
        this.setColumns(columns);
        this.m_accessor = {};
        var _loop_1 = function (i) {
            var propName = columns[i];
            Object.defineProperty(this_1.m_accessor, propName, {
                get: function () {
                    var currentRow = that.rows[that.m_i];
                    return currentRow == null ? currentRow : currentRow[i];
                },
                set: function (value) {
                    var currentRow = that.rows[that.m_i];
                    if (currentRow != null)
                        currentRow[i] = value;
                },
                enumerable: true,
                configurable: true
            });
        };
        var this_1 = this;
        for (var i = 0; i < columns.length; ++i) {
            _loop_1(i);
        }
    }
    Object.defineProperty(TableWrapper.prototype, "rowCount", {
        get: function () {
            return this.rows.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableWrapper.prototype, "columnCount", {
        get: function () {
            return this.m_columns.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableWrapper.prototype, "columns", {
        get: function () {
            return this.m_columns;
        },
        enumerable: false,
        configurable: true
    });
    TableWrapper.prototype.setColumns = function (cols) {
        this.m_columnLength = cols.length;
        this.m_columnMap = null;
        this.m_columnMap = {};
        for (var i = 0; i < this.m_columnLength; ++i) {
            this.m_columnMap[cols[i]] = i;
        }
        this.m_columns = cols;
    };
    TableWrapper.prototype.row = function (i) {
        this.m_i = i;
        return this.m_accessor;
    };
    TableWrapper.prototype.getIndex = function (name) {
        return this.m_columnMap[name];
    };
    TableWrapper.prototype.addRow = function (dat) {
        this.rows.push(dat);
        return this;
    };
    TableWrapper.prototype.removeRow = function (i) {
        this.rows.splice(i, 1);
        return this;
    };
    return TableWrapper;
}());
var a = ["a", "b", "c"];
try {
    for (var a_1 = __values(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
        var val = a_1_1.value;
        console.log(val);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
    }
    finally { if (e_1) throw e_1.error; }
}
