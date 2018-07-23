
// document.querySelector("div").constructor.prototype.__proto__.__proto__.__proto__.__proto__.__proto__
// Object.getPrototypeOf(document.querySelector("div"))
// Object.prototype.isPrototypeOf()

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain


interface Object
{
    __proto__: any; // This is not part of the standard
    // Use Object.getPrototypeOf instead ... 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto#Browser_compatibility
}


function listPrototypes_noncompliant()
{
    let obj = document.querySelector("div");

    while (obj != null)
    {
        obj = obj.__proto__;
        console.log(obj);
    } // Whend 
} // End Function listPrototypes_noncompliant 


function listPrototypes()
{
    let obj = document.querySelector("div");
    while (obj != null)
    {
        obj = Object.getPrototypeOf(obj);
        console.log(obj);
    } // Whend 
} // End Function listPrototypes 

// An object can only have one prototype.
// Inheriting from two classes can be done
// by creating a parent object as a combination of two parent prototypes.
// https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance/35925061
