

class DemonstrateScopingProblems
{
    private status = "blah";

    constructor()
    {
        this.run = this.run.bind(this);
    }

    get kickMe(): string
    {
        return this.status;
    }

    public run(): string 
    {
        console.log("this", this)
        console.log("status:", this.status);

        return this.status;
    }


    public callback(fn: () => string)
    {
        console.log("this", this)
        var res = fn();
        console.log("status:", res);

        return res;
    }

    public propertyBack(thisClass: DemonstrateScopingProblems)
    {
        console.log("this", this)
        // console.log("status:", thisClass.kickMe);
        console.log("status:", thisClass.run());

        //return thisClass.kickMe;
        return thisClass.run();
    }
}







/*

var aaa = new DemonstrateScopingProblems();
console.log("First - should be working");
aaa.run();


var hello = function ()
{
    var b = new DemonstrateScopingProblems();
    b.run();
}.bind({ "hello": "nihao" });

console.log("Second - should NOT be working");
hello();

// --------------------------


var x = {
    "hello": (function () { return aaa.run(); })()
};
console.log("hi", x.hello);

*/


var bbb = new DemonstrateScopingProblems();
bbb.callback(bbb.run);
