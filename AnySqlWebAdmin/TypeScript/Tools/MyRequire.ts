interface Window
{
    require: (fileName: string) => string;
}


function sleepTwice(interval: number)
    : Promise<void>
{
    return new Promise(
        function (resolve: () => void, reject: (reason?: any) => void)
        {
            let wait:number = setTimeout(
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


sleepTwice(2000).then(function(){
    console.log("howdy");
});





const fs = {
    file: `
    // module.exports = \"Hello World\";
        
    module.exports = function(){ return 5*3;};
    
    
    
    `
    ,async getFileAsync(fileName: string, encoding: string):string
    {
        const textDecoder = new TextDecoder(encoding);
        const response = await fetch(fileName);
        
        console.log(response.ok);
        console.log(response.status);
        console.log(response.statusText);
        // let json = await response.json();
        // let txt = await response.text();
        // let blo:Blob = response.blob();
        // let ab:ArrayBuffer = await response.arrayBuffer();
        // let fd = await response.formData()
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader
        const reader = response.body.getReader();
        let result:ReadableStreamReadResult<Uint8Array>;
        let chunks:Uint8Array[] = [];
        
        // due to done, this is unlike C#:
        // byte[] buffer = new byte[32768];
        // int read;
        // while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
        // {
        //     output.Write (buffer, 0, read);
        // }

        // let responseBuffer:ArrayBuffer = await response.arrayBuffer();
        // let text:string = textDecoder.decode(responseBuffer);
        
        do
        {
            result = await reader.read();
            chunks.push(result.value);
            let partN = textDecoder.decode(result.value);
            // chunks.push(partN);
            console.log("result: ", result.value, partN);
            
        } while(!result.done)

        let chunkLength:number = chunks.reduce(
            function(a, b)
            {
                return a + (b||[]).length;
            }
            , 0
        );
        
        let mergedArray = new Uint8Array(chunkLength);
        let currentPosition = 0;
        for(let i = 0; i < chunks.length; ++i)
        {
            mergedArray.set(chunks[i],currentPosition);
            currentPosition += (chunks[i]||[]).length;
        } // Next i 

        let file:string = textDecoder.decode(mergedArray);
        
        // let file:string = chunks.join('');
        return file;
    } // End Function getFileAsync
    
    ,getFile(fileName: string, encoding: string): string
    {
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
        let client = new XMLHttpRequest();
        client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        
        // open(method, url, async)
        client.open("GET", fileName, false);
        client.send();
        if (client.status === 200) 
            return client.responseText;
        
        return null;
    }
    
    
    ,readFileSync: function (fileName: string, encoding: string): string
    {
        return this.file;
    }
};


// https://michelenasti.com/2018/10/02/let-s-write-a-simple-version-of-the-require-function.html
function myRequire(name: string)
{
    console.log(`Evaluating file ${name}`);

    if (!(name in myRequire.cache))
    {
        console.log(`${name} is not in cache; reading from disk`);
        let code = fs.readFileSync(name, 'utf8');
        let module = {exports: {}};
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
