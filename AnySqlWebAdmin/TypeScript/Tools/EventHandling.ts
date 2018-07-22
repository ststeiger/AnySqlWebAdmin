
namespace JQuery.Replacement 
{
    
    
    export function Test()
    {
        let main = document.getElementsByTagName("main")[0];

        //JQuery.Replacement.on(main, "click", "div", function (e)
        //{
        //    console.log("on target", e.target);
        //});

        JQuery.Replacement.subscribeEvent(main, "click", "li", function (e)
        {
            console.log("on target", e.target);
        });

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
        // https://developer.mozilla.org/bm/docs/Web/JavaScript/Reference/Errors
        
        // https://docs.microsoft.com/en-us/vsts/git/tutorial/history?tabs=visual-studio
        let ele = document.querySelector("#main > div.checklist > ul > li:nth-child(1)");
        ele.insertAdjacentHTML("afterend", "<li>Hello</li>");

        // JQuery.Replacement.Test();
    }

    
    /// attach an event handler, now or in the future, 
    /// for all elements which match childselector,
    /// within the child tree of the element maching parentSelector.
    export function subscribeEvent(parentSelector: string | Element
        , eventName: string
        , childSelector: string
        , eventCallback:EventListenerOrEventListenerObject | null)
    {
        if (parentSelector == null)
            throw new ReferenceError("Parameter parentSelector is NULL");

        if (childSelector == null)
            throw new ReferenceError("Parameter childSelector is NULL");

        // nodeToObserve: the node that will be observed for mutations
        let nodeToObserve: Element = <Element>parentSelector;
        if (typeof (parentSelector) === 'string')
            nodeToObserve = document.querySelector(<string>parentSelector);


        let eligibleChildren: NodeListOf<Element> = nodeToObserve.querySelectorAll(childSelector);

        for (let i = 0; i < eligibleChildren.length; ++i)
        {
            eligibleChildren[i].addEventListener(eventName, eventCallback, false);
        } // Next i 

        // https://stackoverflow.com/questions/2712136/how-do-i-make-this-loop-all-children-recursively
        function allDescendants(node: Node)
        {
            if (node == null)
                return;

            for (let i = 0; i < node.childNodes.length; i++)
            {
                let child = node.childNodes[i];
                allDescendants(child);
            } // Next i 

            // IE 11 Polyfill 
            if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;

            if ((<Element>node).matches)
            {
                if ((<Element>node).matches(childSelector))
                {
                    // console.log("match");
                    node.addEventListener(eventName, eventCallback, false);
                } // End if ((<Element>node).matches(childSelector))
                // else console.log("no match");

            } // End if ((<Element>node).matches) 
            // else console.log("no matchfunction");

        } // End Function allDescendants 


        // Callback function to execute when mutations are observed
        let callback:MutationCallback = function (mutationsList: MutationRecord[], observer: MutationObserver)
        {
            for (let mutation of mutationsList)
            {
                // console.log("mutation.type", mutation.type);
                // console.log("mutation", mutation);

                if (mutation.type == 'childList')
                {
                    for (let i = 0; i < mutation.addedNodes.length; ++i)
                    {
                        let thisNode: Node = mutation.addedNodes[i];
                        allDescendants(thisNode);
                    } // Next i 

                } // End if (mutation.type == 'childList') 
                // else if (mutation.type == 'attributes') { console.log('The ' + mutation.attributeName + ' attribute was modified.');

            } // Next mutation 

        }; // End Function callback 

        // Options for the observer (which mutations to observe)
        let config = { attributes: false, childList: true, subtree: true };

        // Create an observer instance linked to the callback function
        let observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(nodeToObserve, config);
    } // End Function subscribeEvent 


    // $('.feed').on('click', '.feed-item', function (event)
    // {
    //     // Do something
    // })

    
    // Should be redone with MutationObserver
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
    // https://developer.mozilla.org/en-US/docs/Web/Events/DOMSubtreeModified
    
    // https://stackoverflow.com/questions/15112067/how-does-jquery-on-work
    // https://elliotekj.com/2016/11/05/jquery-to-pure-js-event-listeners-on-dynamically-created-elements/
    export function on(
          parentSelector: string | Element
        , eventName:string
        , childSelector:string
        , eventCallback: EventListenerOrEventListenerObject | null)
    {
        if (parentSelector == null)
            throw new ReferenceError("Parameter parentSelector is NULL.");

        if (childSelector == null)
            throw new ReferenceError("Parameter childSelector is NULL.");

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
        // https://developer.mozilla.org/bm/docs/Web/JavaScript/Reference/Errors

        let parent: Element = <Element>parentSelector;
        if (typeof (parentSelector) === 'string')
            parent = document.querySelector(<string>parentSelector);
        
        function isDescendant(parent: Node, child: Node)
        {
            let node = child.parentNode;
            while (node != null)
            {
                if (node == parent)
                {
                    return true;
                }
                node = node.parentNode;
            } // Whend 

            return false;
        } // End Function isDescendant 


        // jQuery().off( eventName );
        parent.addEventListener(eventName,
            function (event)
            {
                // if (event.target.tagName.toLowerCase() === 'span')
                // if (event.target.classList.contains(childSelector))
                // eventCallback(event);
                
                let eligibleChildren: NodeListOf<Element> = parent.querySelectorAll(childSelector);
                
                for (let i = 0; i < eligibleChildren.length; ++i)
                {

                    // if (event.target === eligibleChildren[i])
                    // {
                    //     return eventCallback.apply(this, arguments);
                    // }

                    if (isDescendant(eligibleChildren[i], <Node> event.target))
                    {
                        // https://stackoverflow.com/questions/4706236/how-to-pass-all-arguments-as-collection-to-another-function-and-not-as-single-ar
                        
                        return ( <Function>eventCallback).apply(this, arguments);
                    } // End if (isDescendant(eligibleChildren[i], event.target)) 
                    
                } // Next i 

                return null;
            } // End EventHandler 

        ); // End AddEventListener 

    } // End Function on


} // End Namespace 
