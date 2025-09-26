var DemonstrateScopingProblems = (function () {
    function DemonstrateScopingProblems() {
        this.status = "blah";
        this.run = this.run.bind(this);
        this.eventActionHandler = this.eventActionHandler.bind(this);
    }
    Object.defineProperty(DemonstrateScopingProblems.prototype, "kickMe", {
        get: function () {
            return this.status;
        },
        enumerable: false,
        configurable: true
    });
    DemonstrateScopingProblems.prototype.run = function () {
        console.log("this", this);
        console.log("status:", this.status);
        return this.status;
    };
    DemonstrateScopingProblems.prototype.testFiltering = function () {
        var array = [0, 0, 0, null, "", "abc", 0, 0, 0, 123, 0, 0];
        var filter = function (array) {
            return array.filter(function (last) {
                return function (v) {
                    return last = last || v;
                };
            }(false));
        };
        console.log(filter([0, 0, 0, 14, 0, 63, 0]));
        console.log(filter([243, 0, 0, 0, 1]));
        console.log(filter([0, 0, 1, 0]));
        console.log(filter([0, 0]));
        console.log(filter([0]));
    };
    DemonstrateScopingProblems.prototype.eventActionHandler = function (e) {
        console.log(e.target);
        console.log(e.srcElement);
        console.log(e.currentTarget);
    };
    DemonstrateScopingProblems.prototype.callback = function (fn) {
        console.log("this", this);
        var res = fn();
        console.log("status:", res);
        return res;
    };
    DemonstrateScopingProblems.prototype.propertyBack = function (thisClass) {
        console.log("this", this);
        console.log("status:", thisClass.run());
        return thisClass.run();
    };
    return DemonstrateScopingProblems;
}());
var bbb = new DemonstrateScopingProblems();
bbb.callback(bbb.run);
