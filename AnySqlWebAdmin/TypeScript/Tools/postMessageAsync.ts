
// https://stackoverflow.com/questions/29996145/visual-studio-code-compile-on-save
// CTRL + SHIFT + B
// tsc: watch - tsconfig.json

function createTimeoutPromise1<T>(timeout: number, executor: (
        resolve: (value?: T) => void, reject: (reason?: any) => void
    ) => void
): Promise<T>
{
    // Will resolve after 200ms
    let promiseA = new Promise(
        function (resolve: (value?: T) => void, reject: (reason?: any) => void) 
        {
            let wait = setTimeout(
                function ()  
                {
                    clearTimeout(wait);
                    reject(new Error(`Promise timed out ! (timeout = ${timeout})`));
                }, timeout);
        }
    );

    // Will resolve after 400ms
    let promiseB = new Promise<T>(executor);

    // Let's race our promises
    return Promise.race([promiseA, promiseB]);
}


function newid()
{
    function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


// http://www.ctomczyk.pl/lab/postmessage/
// http://www.ctomczyk.pl/lab/postmessage/2/
// https://github.com/dollarshaveclub/postmate

async function postMessageAsync<T>(targetWindow:Window, data:any)
{
    let persist = this;
    let payloadData: any = null;
    
    if (!persist.callbackStorage)
        persist.callbackStorage = {};

    let id = newid(); 
    while (persist.callbackStorage[id] != null)
    {
        id = newid();
    }
    // console.log("id: " + id);


    payloadData = {
        "messageId": id,
        "content": data
    };


    function postMessageAnswerHandler(resolve: (x: T) => void, reject: (x?: Error) => void): void
    {
        console.log('[processPromise]', data);

        //function messageCallback(event)
        persist.callbackStorage[id] = function (event:MessageEvent)
        {
            try
            {
                console.log('[iframeResponse]', event.source, event.data);
                
                let response = JSON.parse(event.data);

                if (response.inResponseTo === id)
                {
                    try
                    {
                        //window.removeEventListener('message', messageCallback, false);
                        window.removeEventListener('message', persist.callbackStorage[id], false);
                        delete persist.callbackStorage[id];

                        // resolve(event.data);
                        resolve(response.content);
                    }
                    catch (ex)
                    {
                        reject(ex);
                    }

                } // End if (response.inResponseTo === id) 
            }
            catch (err)
            {
                reject(err);
            }

        };

        //window.addEventListener('message', messageCallback, false);
        window.addEventListener('message', persist.callbackStorage[id], false);
        targetWindow.postMessage(JSON.stringify(payloadData), '*');
    } // End Function promiseWrapper 

    // return new Promise(postMessageAnswerHandler);
    return createTimeoutPromise(5000, postMessageAnswerHandler); 
}


async function testPostMessage()
{
    try
    {
        let targetWindow = document.getElementById<HTMLIFrameElement>("ifrmChild").contentWindow;

        let answer = await postMessageAsync<google.maps.GeocoderResult[]>(targetWindow, { "address": "Fabrikstrasse 1, CH-8586 Erlen, Switzerland" });

        console.log("answer: ", answer);
        console.log("location.lat: ", answer[0].geometry.location.lat);
        console.log("location.lng: ", answer[0].geometry.location.lng);

        console.log("viewport.south: ", (<google.maps.LatLngBoundsLiteral><any>answer[0].geometry.viewport).south);
        console.log("viewport.west: ", (<google.maps.LatLngBoundsLiteral><any>answer[0].geometry.viewport).west);
        console.log("viewport.north: ", (<google.maps.LatLngBoundsLiteral><any>answer[0].geometry.viewport).north);
        console.log("viewport.east: ", (<google.maps.LatLngBoundsLiteral><any>answer[0].geometry.viewport).east);
    }
    catch (err)
    {
        console.log("error in testPostMessage:", err);
    }

    console.log('End [testPostMessage]');
}
