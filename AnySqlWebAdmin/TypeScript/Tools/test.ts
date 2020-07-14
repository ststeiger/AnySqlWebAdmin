

class DemonstrateScopingProblems
{
    private status = "blah";

    constructor()
    {
        this.run = this.run.bind(this);
        this.eventActionHandler = this.eventActionHandler.bind(this);
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

    public testFiltering()
    {
        let array: any[] = [0, 0, 0, null, "", "abc", 0, 0, 0, 123, 0, 0];
        // const filter = array.filter((last => v => last = last || v)(false));


        const filter = function (array:any[])
        {
            return array.filter(
                function (last)
                {
                    return function (v:any)
                    {
                        return last = last || v;
                    }
                }
                (false)
            );
        };


        console.log(filter([0, 0, 0, 14, 0, 63, 0]));
        console.log(filter([243, 0, 0, 0, 1]));
        console.log(filter([0, 0, 1, 0]));
        console.log(filter([0, 0]));
        console.log(filter([0]));
    }


    public eventActionHandler(e:MouseEvent)
    {
        // Because we bound "this" to the class, we now have to use e.currentTarget
        console.log(e.target); // the clicked-on element
        console.log(e.srcElement); // esrcElement = alias for .target
        console.log(e.currentTarget); // = this

        // Event.currentTarget(https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
        //   - It always refers to the element to which the event handler has been attached

        // Event.target(https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)
        //   - which identifies the element on which the event occurred


        // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
        // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
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
