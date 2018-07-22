export var table_wrapper;
(function (table_wrapper) {
    var TableWrapper = (function () {
        function TableWrapper(rows, columnNames) {
            this.data = rows;
            this.m_i = 0;
            this.columns = {};
            for (var i = 0; i < columnNames.length; ++i) {
                this.columns[columnNames[i]] = i;
            }
            this.row = this.row.bind(this);
            var handlerPropertyAccess = {
                get: function (obj, prop, receiver) {
                    return this.obj[this.i][this.columns[prop]];
                }
            };
            handlerPropertyAccess.get = handlerPropertyAccess.get.bind(this);
            this.m_accessor = new Proxy(this.data, handlerPropertyAccess);
            var handlerIndex = {
                get: function (obj, prop, receiver) {
                    return this.row(prop);
                }
            };
            handlerIndex.get = handlerIndex.get.bind(this);
            this.rows = new Proxy(this.data, handlerIndex);
        }
        TableWrapper.prototype.row = function (index) {
            this.m_i = index;
            return this.m_accessor;
        };
        return TableWrapper;
    }());
    table_wrapper.TableWrapper = TableWrapper;
    function testTable() {
        var columns = ["col1", "col2", "col3"];
        var rows = [
            ["row 1 col 1", "row 1 col 2", "row 1 col 3"],
            ["row 2 col 1", "row 2 col 2", "row 2 col 3"],
            ["row 3 col 1", "row 3 col 2", "row 3 col 3"],
            ["row 4 col 1", "row 4 col 2", "row 4 col 3"],
            ["row 5 col 1", "row 5 col 2", "row 5 col 3"]
        ];
        var x = new TableWrapper(rows, columns);
        console.log(x.rows[0].col1);
    }
    table_wrapper.testTable = testTable;
    function proxy() {
        var columns = ["col1", "col2", "col3"];
        var rows = [
            ["row 1 col 1", "row 1 col 2", "row 1 col 3"],
            ["row 2 col 1", "row 2 col 2", "row 2 col 3"],
            ["row 3 col 1", "row 3 col 2", "row 3 col 3"],
            ["row 4 col 1", "row 4 col 2", "row 4 col 3"],
            ["row 5 col 1", "row 5 col 2", "row 5 col 3"]
        ];
        var cols = {};
        for (var i = 0; i < columns.length; ++i) {
            cols[columns[i]] = i;
        }
        var handler2 = {
            get: function (obj, prop, receiver) {
                return obj[cols[prop]];
            }
        };
        var handler = {
            get: function (obj, prop, receiver) {
                console.log("obj:", obj, "prop:", prop, "receiver :", receiver);
                return new Proxy(obj[prop], handler2);
            },
            set: function (obj, key, value) {
                console.log(obj, key, value);
                return true;
            }
        };
        var p = new Proxy(rows, handler);
    }
    table_wrapper.proxy = proxy;
    function tableTest1() {
        var columns = ["col1", "col2", "col3"];
        var rows = [
            ["row 1 col 1", "row 1 col 2", "row 1 col 3"],
            ["row 2 col 1", "row 2 col 2", "row 2 col 3"],
            ["row 3 col 1", "row 3 col 2", "row 3 col 3"],
            ["row 4 col 1", "row 4 col 2", "row 4 col 3"],
            ["row 5 col 1", "row 5 col 2", "row 5 col 3"]
        ];
        var cols = {};
        for (var i = 0; i < columns.length; ++i) {
            cols[columns[i]] = i;
        }
        var index_col1 = cols["col1"];
        var index_col2 = cols["col2"];
        var index_col3 = cols["col3"];
        for (var i = 0; i < rows.length; ++i) {
            console.log("col1:", rows[i][index_col1], "col2:", rows[i][index_col2], "col3:", rows[i][index_col3]);
        }
    }
    table_wrapper.tableTest1 = tableTest1;
    function tableTest() {
        var columns = ["col1", "col2", "col3"];
        var data = [
            ["row 1 col 1", "row 1 col 2", "row 1 col 3"],
            ["row 2 col 1", "row 2 col 2", "row 2 col 3"],
            ["row 3 col 1", "row 3 col 2", "row 3 col 3"],
            ["row 4 col 1", "row 4 col 2", "row 4 col 3"],
            ["row 5 col 1", "row 5 col 2", "row 5 col 3"]
        ];
        var arr = [];
        for (var j = 0; j < data.length; ++j) {
            var obj = {};
            for (var i = 0; i < columns.length; ++i) {
                obj[columns[i]] = data[j][i];
            }
            arr.push(obj);
        }
        var b = [
            { "col1": "row 1 col 1", "col2": "row 1 col 2", "col3": "row 1 col 3" },
            { "col1": "row 2 col 1", "col2": "row 2 col 2", "col3": "row 2 col 3" },
            { "col1": "row 3 col 1", "col2": "row 3 col 2", "col3": "row 3 col 3" },
            { "col1": "row 4 col 1", "col2": "row 4 col 2", "col3": "row 4 col 3" },
            { "col1": "row 5 col 1", "col2": "row 5 col 2", "col3": "row 5 col 3" }
        ];
        var dataJSON = "[\n            [\n                \"row 1 col 1\",\n                \"row 1 col 2\",\n                \"row 1 col 3\"\n            ],\n            [\n                \"row 2 col 1\",\n                \"row 2 col 2\",\n                \"row 2 col 3\"\n            ],\n            [\n                \"row 3 col 1\",\n                \"row 3 col 2\",\n                \"row 3 col 3\"\n            ],\n            [\n                \"row 4 col 1\",\n                \"row 4 col 2\",\n                \"row 4 col 3\"\n            ],\n            [\n                \"row 5 col 1\",\n                \"row 5 col 2\",\n                \"row 5 col 3\"\n            ]\n]";
        var bb = "[\n  {\n    \"col1\": \"row 1 col 1\",\n    \"col2\": \"row 1 col 2\",\n    \"col3\": \"row 1 col 3\"\n  },\n  {\n    \"col1\": \"row 2 col 1\",\n    \"col2\": \"row 2 col 2\",\n    \"col3\": \"row 2 col 3\"\n  },\n  {\n    \"col1\": \"row 3 col 1\",\n    \"col2\": \"row 3 col 2\",\n    \"col3\": \"row 3 col 3\"\n  },\n  {\n    \"col1\": \"row 4 col 1\",\n    \"col2\": \"row 4 col 2\",\n    \"col3\": \"row 4 col 3\"\n  },\n  {\n    \"col1\": \"row 5 col 1\",\n    \"col2\": \"row 5 col 2\",\n    \"col3\": \"row 5 col 3\"\n  }\n]";
    }
    table_wrapper.tableTest = tableTest;
})(table_wrapper || (table_wrapper = {}));
