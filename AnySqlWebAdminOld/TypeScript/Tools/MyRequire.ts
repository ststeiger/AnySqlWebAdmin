
"use strict"; 

// declare global
// {
    interface Window
    {
        require: (fileName: string) => any;
        asyncRequire: (name: string) => Promise<any>;
    }
// }

// https://mariusschulz.com/blog/declaring-global-variables-in-typescript
// global scope without window
declare var require: (fileName: string) => string;
declare var asyncRequire: (fileName: string) => Promise<string>;



const fs = {
    file: `
    module.exports = function(){ return 5*3;};
    module.exports.hello_world = \"Hello World\";
    `
    , async readFileAsync(fileName: string, encoding: string)
        : Promise<string>
    {
        const textDecoder = new TextDecoder(encoding);
        // textDecoder.ignoreBOM = true;

        const response = await fetch(fileName);

        console.log(response.ok);
        console.log(response.status);
        console.log(response.statusText);
        // let json = await response.json();
        // let txt = await response.text();
        // let blo:Blob = response.blob();
        // let ab:ArrayBuffer = await response.arrayBuffer();
        // let fd = await response.formData()

        // Read file almost by line
        // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader/read#Example_2_-_handling_text_line_by_line

        let buffer: ArrayBuffer = await response.arrayBuffer();
        let file: string = textDecoder.decode(buffer);
        return file;
    } // End Function getFileAsync

    , getFile(fileName: string, encoding: string): string
    {
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
        let client = new XMLHttpRequest();
        // client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

        // open(method, url, async)
        client.open("GET", fileName, false);
        client.send();
        if (client.status === 200)
            return client.responseText;

        return null;
    }


    , readFileSync: function (fileName: string, encoding: string): string
    {
        // this.getFile(fileName, encoding);
        return this.file; // Example 
    }
};




// https://michelenasti.com/2018/10/02/let-s-write-a-simple-version-of-the-require-function.html
function myRequire(name: string): any 
{
    console.log(`Evaluating file ${name}`);

    if (!(name in myRequire.cache))
    {
        console.log(`${name} is not in cache; reading from disk`);
        let code = fs.readFileSync(name, 'utf8');
        // let code = await fs.readFileAsync(name, 'utf8');
        let module = { exports: {} };
        myRequire.cache[name] = module;
        let wrapper = Function("require, exports, module", code);
        wrapper(myRequire, module.exports, module);
    }

    console.log(`${name} is in cache. Returning it...`);
    return myRequire.cache[name].exports;
}


myRequire.cache = Object.create(null);
window.require = myRequire;

const stuff = window.require('./main.js');
console.log(stuff);



async function myRequireAsync(name: string)
    : Promise<any>
{
    console.log(`Evaluating file ${name}`);

    if (!(name in myRequireAsync.cache))
    {
        console.log(`${name} is not in cache; reading from disk`);
        let code = await fs.readFileAsync(name, 'utf8');
        let module = { exports: {} };
        myRequireAsync.cache[name] = module;
        let wrapper = Function("asyncRequire, exports, module", code);
        await wrapper(myRequireAsync, module.exports, module);
    }

    console.log(`${name} is in cache. Returning it...`);
    return myRequireAsync.cache[name].exports;
}

myRequireAsync.cache = Object.create(null);
window.asyncRequire = myRequireAsync;


async () =>
{
    const asyncStuff = await window.asyncRequire('./main.js');
    console.log(asyncStuff);
}





// jsonp Promise
function get(url: string, timeoutMS?: number)
    : Promise<any>
{
    function urlJoinChar(u: string): string
    {
        return u.indexOf('?') >= 0 ? '&' : '?'
    }

    return new Promise(function (resolve: (value: any) => void, reject: (reason?: any) => void)
    {
        let timeout: number = timeoutMS || 10000; // default timeout
        let callbackName = 'jsonp_callback_' + Date.now();
        let head = document.getElementsByTagName('head')[0] || document.documentElement;
        let script = document.createElement('script');
        let timerId: number = null;
        script.src = url + urlJoinChar(url) + 'callback=' + callbackName;
        script.async = true;


        function cleanUp()
        {
            timerId && clearTimeout(timerId);
            (<any>window)[callbackName] && delete (<any>window)[callbackName];
            script && head.removeChild(script);
        }

        function onResolve(data: any)
        {
            cleanUp();
            resolve(JSON.stringify(data));
        }

        function onError()
        {
            cleanUp();
            reject(Error("Network error loading " + script.src));
        }

        function onTimeout()
        {
            cleanUp();
            reject(Error("Request to " + url + " failed to execute callback after " + timeout + "ms."))
        }


        (<any>window)[callbackName] = onResolve;
        script.onerror = onError;

        head.appendChild(script);
        timerId = setTimeout(onTimeout, timeout);
    });
}

function getJSON(url: string)
    : Promise<any>
{
    return get(url).then(JSON.parse);
}




function sleepTwice(interval: number)
    : Promise<void>
{
    return new Promise(
        function (resolve: () => void, reject: (reason?: any) => void)
        {
            let wait: number = setTimeout(
                function ()
                {
                    clearTimeout(wait);
                    //reject(new Error(`Promise timed out ! (timeout = ${timeout})`));
                    resolve();
                    resolve();
                }, interval);
        }
    );
}


sleepTwice(2000).then(function ()
{
    console.log("Do I resolve twice, or not ?");
});

