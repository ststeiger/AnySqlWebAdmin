
function createTimeoutPromise<T>(timeout:number, executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void)
  :Promise<T>
{
  // Will resolve after 200ms
  let promiseA = new Promise(
    function(resolve:(value?:T)=> void, reject:(reason?:any)=> void) 
    {
      let wait = setTimeout(
        function()  
        {
          clearTimeout(wait);
          reject('Promise timed out !');
        }, timeout);
    }
  );
  
  // Will resolve after 400ms
  let promiseB = new Promise<T>(executor);
  
  // Let's race our promises
  return Promise.race( [promiseA, promiseB] );
}




async function bar()
{
  let foo = await createTimeoutPromise(200,
      function(resolve:(x:string)=> void, reject:(x:string)=> void)
      {
        let wait = setTimeout(
            function()
            {
              clearTimeout(wait);
              resolve('Promise B win!');
            }, 400);
      }
  );
  
  console.log(foo)
}


// -----------------------------------------------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// https://italonascimento.github.io/applying-a-timeout-to-your-promises/
// -----------------------------------------------------------------------------------------
