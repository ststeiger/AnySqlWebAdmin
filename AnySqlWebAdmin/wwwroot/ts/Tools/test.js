var DemonstrateScopingProblems = (function () {
    function DemonstrateScopingProblems() {
        this.status = "blah";
        this.run = this.run.bind(this);
    }
    Object.defineProperty(DemonstrateScopingProblems.prototype, "kickMe", {
        get: function () {
            return this.status;
        },
        enumerable: true,
        configurable: true
    });
    DemonstrateScopingProblems.prototype.run = function () {
        console.log("this", this);
        console.log("status:", this.status);
        return this.status;
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
