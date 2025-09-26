
// https://github.com/Microsoft/TypeScript/issues/30164
// https://stackoverflow.com/questions/55887719/how-to-use-spread-as-argument-of-function/55887905#55887905

// https://code.visualstudio.com/docs/typescript/typescript-tutorial
// npm install -g typescript
// tsc --version

// https://stackoverflow.com/questions/29996145/visual-studio-code-compile-on-save
// Press Ctrl+Shift+B to open a list of tasks in VS Code and select tsc: watch - tsconfig.json.
// CTRL + SHIFT + B
// tsc: watch - tsconfig.json

function createTimeoutPromise<T>(timeout: number, executor: (
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


async function testPromise()
{
    try
    {
        let testResult = await createTimeoutPromise(200,
            function (resolve: (x: string) => void, reject: (x: string) => void)
            {
                let wait = setTimeout(
                    function ()
                    {
                        clearTimeout(wait);
                        resolve('Promise B win!');
                    }, 400);
            }
        );

        console.log(testResult);
    }
    catch (err)
    {
        console.log("Timeout: ", err, err.name, err.stack, err.message);
    }

    console.log("End Sub testPromise");
}


// -----------------------------------------------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// https://italonascimento.github.io/applying-a-timeout-to-your-promises/
// -----------------------------------------------------------------------------------------


function sleep<T>(interval: number)
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
                }, interval);
        }
    );
}


async function testSleep()
{
    await sleep(5000);
    console.log("i waited 5 seconds");
}
