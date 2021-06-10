'use strict';
var SimpleTable;
(function (SimpleTable) {
    var NonVirtual = (function () {
        function NonVirtual(data, columnInfo) {
            this.m_data = data;
            this.m_columnInfo = columnInfo;
            this.defaultFormatter = this.defaultFormatter.bind(this);
            this.reRender = this.reRender.bind(this);
            this.appendTo = this.appendTo.bind(this);
        }
        Object.defineProperty(NonVirtual.prototype, "data", {
            get: function () {
                return this.m_data;
            },
            set: function (value) {
                this.m_data = value;
            },
            enumerable: false,
            configurable: true
        });
        NonVirtual.prototype.defaultFormatter = function (cellData) {
            return document.createTextNode(cellData);
        };
        NonVirtual.prototype.reRender = function () {
            var rowCount = this.m_data.length;
            var columnCount = this.m_columnInfo.length;
            if (this.m_table != null)
                this.m_table.innerHTML = "";
            else
                this.m_table = document.createElement("table");
            var thead = document.createElement("thead");
            var tr = document.createElement("tr");
            for (var c = 0; c < columnCount; ++c) {
                var th = document.createElement("th");
                th.appendChild(document.createTextNode(this.m_columnInfo[c].Label));
                tr.appendChild(th);
            }
            thead.appendChild(tr);
            this.m_table.appendChild(thead);
            var tBody = document.createElement("tbody");
            for (var i = 0; i < rowCount; ++i) {
                tr = document.createElement("tr");
                for (var j = 0; j < columnCount; ++j) {
                    var data = this.m_data[i][this.m_columnInfo[j].Key];
                    var td = document.createElement("td");
                    var formatter = this.m_columnInfo[j].Formatter || this.defaultFormatter;
                    var cell = formatter(data);
                    td.appendChild(cell);
                    tr.appendChild(td);
                }
                tBody.appendChild(tr);
            }
            this.m_table.appendChild(tBody);
            var tFoot = document.createElement("tfoot");
            this.m_table.appendChild(tFoot);
        };
        NonVirtual.prototype.appendTo = function (parent) {
            this.reRender();
            parent.appendChild(this.m_table);
        };
        return NonVirtual;
    }());
    SimpleTable.NonVirtual = NonVirtual;
})(SimpleTable || (SimpleTable = {}));
