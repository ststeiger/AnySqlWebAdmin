
async function geoCode(address: string)
    : Promise<google.maps.GeocoderResult[]>
{
    return new Promise(
        function (resolve: (value?: google.maps.GeocoderResult[]) => void, reject: (reason?: Error) => void) : void 
        {
            let geocoder = new google.maps.Geocoder();

            geocoder.geocode({ "address": address }, function (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus)
            {
                if (results != null && results.length > 0 && status === google.maps.GeocoderStatus.OK)
                {
                    console.log("result:");
                    console.log(JSON.stringify(results[0].geometry.location));
                    // document.getElementById("resultat").innerHTML = JSON.stringify(results[0].geometry.location);
                    document.getElementById("resultat").innerHTML = JSON.stringify(results);
                    resolve(results);
                }
                else
                {
                    // alert('Geocode was not successful for the following reason: ' + status);
                    reject(new Error("Geocode was not successful for the following reason: " + status));
                }
            });
        }
    );
}



// https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
// http://ejohn.org/blog/cross-window-messaging/
// http://benalman.com/projects/jquery-postmessage-plugin/
// http://benalman.com/code/projects/jquery-postmessage/docs/files/jquery-ba-postmessage-js.html

// .data � A string holding the message passed from the other window.
// .domain (origin?) � The domain name of the window that sent the message.
// .uri � The full URI for the window that sent the message.
// .source � A reference to the window object of the window that sent the message.
async function receiveMessage(evt:MessageEvent)
{
    let message;
    //if (evt.origin !== "http://robertnyman.com")
    if (false)
    {
        message = 'You ("' + evt.origin + '") are not worthy';
    }
    else
    {
        message = 'I got "' + evt.data + '" from "' + evt.origin + '"';
    }

    //alert(evt.source.location.href)

    let ta = document.getElementById("taRecvMessage");
    if (ta == null)
        alert(message);
    else
        document.getElementById("taRecvMessage").innerHTML = message;

    // http://javascript.info/tutorial/cross-window-messaging-with-postmessage
    //evt.source.postMessage("thanks, got it", evt.origin);
    // evt.source.postMessage("thanks, got it (" + evt.data + ")", "*");

    let received = JSON.parse(evt.data);
    // console.log("received.messageId: " + received.messageId);


    let payload = {
        "inResponseTo": received.messageId,
        "content": "thanks, got it (" + evt.data + ")"
    }

    // payload.content = await geoCode("Fabrikstrasse 1, Erlen"); 
    console.log("wanna know", received.content.address);
    payload.content = <any> await geoCode(received.content.address);


    // https://github.com/Microsoft/TypeScript/issues/26403
    // Before you can post a message to a MessageEventSource, 
    // you need to know whether it is a Window 
    // (which requires a targetOrigin parameter) 
    // or a MessagePort or ServiceWorker 
    // (which does not accept a targetOrigin parameter).
    if (evt.source instanceof Window) 
    {
        // evt.source.postMessage('message', 'origin');
        // evt.source.postMessage("thanks, got it (" + evt.data + ")", "*");
        evt.source.postMessage(JSON.stringify(payload), "*");
    }

} // End Function ReceiveMessage 


function initGeocoder()
{

    if (!window['postMessage'])
        alert("oh crap");
    else
    {
        if (window.addEventListener)
        {
            //alert("standards-compliant");
            // For standards-compliant web browsers (ie9+)
            window.addEventListener("message", receiveMessage, false);
        }
        else
        {
            //alert("not standards-compliant (ie8)");
            window.attachEvent("onmessage", receiveMessage);
        }
    }
}
