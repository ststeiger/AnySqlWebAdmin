var TableWrapper = (function () {
    function TableWrapper(columns, data) {
        this.item.bind(this);
        this.getIndex.bind(this);
        this.rows = data;
        this.columns = columns;
    }
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
        set: function (cols) {
            this.m_columnLength = cols.length;
            this.m_columnMap = null;
            this.m_columnMap = {};
            for (var i = 0; i < this.m_columnLength; ++i) {
                this.m_columnMap[cols[i]] = i;
            }
            this.m_columns = cols;
        },
        enumerable: true,
        configurable: true
    });
    TableWrapper.prototype.getIndex = function (name) {
        return this.m_columnMap[name];
    };
    TableWrapper.prototype.item = function (row, item) {
        return (this.rows[row][this.getIndex(item)]);
    };
    return TableWrapper;
}());
export { TableWrapper };
var tab = new TableWrapper(["col1", "col2"], [[1, 2], [3, 4]]);
tab.columns = ["col1", "col2", "col3"];
tab.item(0, "col1");
var aaa = tab.item(0, "abc");
var x = tab.rows[0][1];
console.log(x);
