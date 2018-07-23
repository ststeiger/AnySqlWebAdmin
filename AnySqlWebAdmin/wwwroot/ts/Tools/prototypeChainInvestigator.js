function listPrototypes_noncompliant() {
    var obj = document.querySelector("div");
    while (obj != null) {
        obj = obj.__proto__;
        console.log(obj);
    }
}
function listPrototypes() {
    var obj = document.querySelector("div");
    while (obj != null) {
        obj = Object.getPrototypeOf(obj);
        console.log(obj);
    }
}
