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
                    var aa = that.rows[that.m_i];
                    return aa == null ? aa : aa[i];
                },
                set: function (value) {
                    var aa = that.rows[that.m_i];
                    if (aa != null)
                        aa[i] = value;
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableWrapper.prototype, "columnCount", {
        get: function () {
            return this.m_columns.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableWrapper.prototype, "columns", {
        get: function () {
            return this.m_columns;
        },
        enumerable: true,
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
    };
    TableWrapper.prototype.removeRow = function (i) {
        this.rows.splice(i, 1);
    };
    return TableWrapper;
}());
export { TableWrapper };
var tab = new TableWrapper(["col1", "col2"], [[1, 2], [3, 4]]);
var hi = new TableWrapper(["a", "b", "c"], [[1, 2, 3], [4, 5, 6]]);
console.log(tab.row(0).col1);
console.log(hi.row(0).a);
console.log(hi.row(1).b);
console.log(hi.row(0).c);
hi.row(0).a = 123;
for (var i = 0; i < hi.rowCount; ++i) {
    for (var j = 0; j < hi.columnCount; ++j) {
        console.log(hi.rows[i][j]);
        console.log(hi.row(i).a);
        console.log(hi.row(i).b);
        console.log(hi.row(i).c);
        console.log(hi.row(i)[hi.columns[j]]);
        console.log(hi.row(i)[hi.columns[j]]);
        console.log(hi.row(i)[hi.columns[j]]);
    }
}
