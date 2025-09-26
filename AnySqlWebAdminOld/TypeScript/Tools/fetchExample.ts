﻿
namespace TestFetchAsync 
{

    export async function get(url:string):Promise<Response>
    {
        return await fetch(url, {
            method: 'GET'
        });
    }

}


namespace TestFetch
{


    // https://deanhume.com/a-basic-guide-to-the-fetch-api/
    // https://github.com/mdn/fetch-examples
    export function basicExample(url:string)
    {
        let myImage = document.querySelector('img');
        //let myRequest = new Request('flowers.jpg');
        let myRequest = new Request(url);

        fetch(myRequest)
            .then(function (response:Response)
            {
                console.log(response.type);
                console.log(response.url);
                console.log(response.useFinalURL);
                console.log(response.status);
                console.log(response.ok);
                console.log(response.statusText);
                console.log(response.headers);
                return response.blob();
            })
            .then(function (myBlob)
            {
                let objectURL = URL.createObjectURL(myBlob);
                myImage.src = objectURL;
            });

        let myBlob = new Blob();
        let init = { "status": 200, "statusText": "SuperSmashingGreat!" };
        let myResponse = new Response(myBlob, init);
    }


    interface IOptions
    {
        propA: string;
        propB: number;
        propC: Date;
        procD: boolean;
    }


    export async function getSomeTableExample(id: string) // : Promise<IOptions[]>
    {
        let data: IOptions[] = null;
            
        try
        {
            data = <IOptions[]><any>await fetch("sql?sql=Tree.Navigation.sql&format=3", {
                "method": 'POST',
                // "headers": { 'auth': '1234','content-type': 'application/json'},
                    
                // https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
                "headers": new Headers({ 'content-type': 'application/json' }),
                    
                "body": JSON.stringify(
                    { "__in_parent": id, }
                )
            })
            .then(function (response) { return response.json(); })
            .then(function (dat) { return dat.tables[0]; })
            ;
                
        }
        catch (e)
        {
            console.log(e);
            alert("error fetching branch data\n" + e);
        }

        return data;
    }


    export function getImage(url:string)
    {
        let myImage: HTMLImageElement = <HTMLImageElement> document.querySelector('.my-image');

        //fetch('flowers.jpg')
        fetch(url)
            .then(function (response:Response)
            {
                if (!response.ok) return new Error(<any>response);
                return <any>response.blob();
            })
            .then(function (myBlob)
            {
                let objectURL = URL.createObjectURL(myBlob);
                myImage.src = objectURL;
            })
            .catch(function (err)
            {
                console.log(err);
            });

    }


    export function getAudio()
    {
        // define variables
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let source:any;


        let pre = document.querySelector('pre');
        let myScript = document.querySelector('script');
        let play: HTMLElement = document.querySelector<any>('.play');
        let stop: HTMLElement = document.querySelector<any>('.stop');

        // use fetch to load an audio track, and
        // decodeAudioData to decode it and stick it in a buffer.
        // Then we put the buffer into the source
        function getData()
        {
            source = audioCtx.createBufferSource();
            
            fetch('viper.ogg')
                .then(function (response) { return response.arrayBuffer(); })
                .then(async function (buffer)
                {
                    await audioCtx.decodeAudioData(buffer, function (decodedData:any)
                    {
                        source.buffer = decodedData;
                        source.connect(audioCtx.destination);
                    });
                });
        }
        
        // wire up buttons to stop and play audio
        play.onclick = function ()
        {
            getData();
            source.start(0);
            play.setAttribute('disabled', 'disabled');
        };

        stop.onclick = function ()
        {
            source.stop(0);
            play.removeAttribute('disabled');
        };

        // dump script to pre element
        pre.innerHTML = myScript.innerHTML;
    }


    export function fetchJSON()
    {
        let myList = document.querySelector('ul');

        fetch('products.json')
            .then(function (response) { return response.json(); })
            .then(function (json)
            {
                for (let i = 0; i < json.products.length; i++)
                {
                    let listItem = document.createElement('li');
                    listItem.innerHTML = '<strong>' + json.products[i].Name + '</strong>';
                    listItem.innerHTML += ' can be found in ' + json.products[i].Location + '.';
                    listItem.innerHTML += ' Cost: <strong>£' + json.products[i].Price + '</strong>';
                    myList.appendChild(listItem);
                }
            });
    }


    export function fetchText()
    {
        let myArticle = document.querySelector('article');
        let x = <NodeListOf<HTMLAnchorElement>>document.querySelectorAll('ul a');
        
        for(let i = 0; i < x.length; ++i)
        {
            let mylink = x.item(i);
            mylink.onclick = function (e:MouseEvent)
            {
                e.preventDefault();
                let linkData = (<HTMLAnchorElement>e.target).getAttribute('data-page');
                getData(linkData);
            }
        }
        
        
        function getData(pageId:string)
        {
            console.log(pageId);
            let myRequest = new Request(pageId + '.txt');

            fetch(myRequest)
                .then(function (response) { return response.text() })
                .then(function (text)
                {
                    myArticle.innerHTML = text;
                });
        }

    }


    export function post(url:string)
    {
        fetch(url, {
            method: 'POST',
            headers: {
                'auth': '1234'
            },
            body: JSON.stringify({
                name: 'dean',
                login: 'dean',
            })
        })
        .then(function (data)
        {
            console.log('Request success: ', data);
        })
        .catch(function (error)
        {
            console.log('Request failure: ', error);
        });
    }


    export function get(url:string)
    {
        fetch(url, {
            method: 'GET'
        })
        .then(function (response)
        {
            // success
        })
        .catch(function (err)
        {
            // something went wrong
        });
    }


}
