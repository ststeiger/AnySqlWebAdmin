/**
 * Virtual scroll driver for dynamic row heights
 *
 * License: GNU LGPLv3.0+
 * (c) Vitaliy Filippov 2018+
 **/



interface IProps
{
    viewportHeight: number;
    totalItems: number;
    minRowHeight: number;
    scrollTop: number;
}


interface IState
{
    items?: any;
    viewportHeight?: number;
    viewportItemCount?: number; // not in oldState
    totalItems?: number; // not in oldState
    scrollHeightInItems?: number;
    avgRowHeight?: number;

    targetHeight?: number; // not in oldState
    topPlaceholderHeight?: number; // not in oldState
    firstMiddleItem?: number; // not in oldState
    middleItemCount?: number; // not in oldState
    middlePlaceholderHeight?: number; // not in oldState
    lastItemCount?: number; // not in oldState

    lastItemsTotalHeight?: number;

    [index: string]: number;
}




/**
 * @param props { totalItems, minRowHeight, viewportHeight, scrollTop }
 * @param oldState - previous state object
 * @param getRenderedItemHeight = (itemIndex) => height
 *     this function MUST return the height of currently rendered item or 0 if it's not currently rendered
 *     the returned height MUST be >= props.minRowHeight
 *     the function MAY cache heights of rendered items if you want your list to be more responsive
 * @returns new state object
 *     you MUST re-render your list when any state values change
 *     you MUST preserve all keys in the state object and pass it back via `oldState` on the next run
 *     you MUST use the following keys for rendering:
 *         newState.targetHeight - height of the 1px wide invisible div you should render in the scroll container
 *         newState.topPlaceholderHeight - height of the first (top) placeholder. omit placeholder if it is 0
 *         newState.firstMiddleItem - first item to be rendered after top placeholder
 *         newState.middleItemCount - item count to be renderer after top placeholder. omit items if it is 0
 *         newState.middlePlaceholderHeight - height of the second (middle) placeholder. omit placeholder if it is 0
 *         newState.lastItemCount - item count to be rendered in the end of the list
 */
// export
function virtualScrollDriver(props: IProps, oldState: IState, getRenderedItemHeight: (height: number) => any)
{
    // debugger;
    const viewportHeight = props.viewportHeight;
    const viewportItemCount = Math.ceil(viewportHeight / props.minRowHeight); // +border?
    const newState = {
        viewportHeight,
        viewportItemCount,
        totalItems: props.totalItems,
        scrollHeightInItems: oldState.scrollHeightInItems,
        avgRowHeight: oldState.avgRowHeight,
        targetHeight: 0,
        topPlaceholderHeight: 0,
        firstMiddleItem: 0,
        middleItemCount: 0,
        middlePlaceholderHeight: 0,
        lastItemCount: props.totalItems,
        lastItemsTotalHeight: oldState.lastItemsTotalHeight,
    };

    if (!oldState.viewportHeight)
    {
        oldState = { ...oldState };
        for (let k in newState)
        {
            oldState[k] = oldState[k] || 0;
        }
    }

    if (2 * newState.viewportItemCount >= props.totalItems)
    {
        // We need at least 2*viewportItemCount to perform virtual scrolling
        return newState;
    }

    newState.lastItemCount = newState.viewportItemCount;
    {
        let lastItemsHeight = 0, lastVisibleItems = 0;
        let lastItemSize;
        while (lastItemsHeight < viewportHeight)
        {
            lastItemSize = getRenderedItemHeight(props.totalItems - 1 - lastVisibleItems);
            if (!lastItemSize)
            {
                // Some required items in the end are missing
                return newState;
            }

            lastItemsHeight += lastItemSize < props.minRowHeight ? props.minRowHeight : lastItemSize;
            lastVisibleItems++;
        }

        newState.scrollHeightInItems = props.totalItems - lastVisibleItems + (lastItemsHeight - viewportHeight) / lastItemSize;

        // Calculate heights of the rest of items
        while (lastVisibleItems < newState.viewportItemCount)
        {
            lastItemsHeight += getRenderedItemHeight(props.totalItems - 1 - lastVisibleItems);
            lastVisibleItems++;
        }

        newState.lastItemsTotalHeight = lastItemsHeight;
        newState.avgRowHeight = lastItemsHeight / lastVisibleItems;
        newState.avgRowHeight = !oldState.avgRowHeight || newState.avgRowHeight > oldState.avgRowHeight
            ? newState.avgRowHeight
            : oldState.avgRowHeight;
    }

    newState.targetHeight = newState.avgRowHeight * newState.scrollHeightInItems + newState.viewportHeight;
    const scrollTop = props.scrollTop;
    let scrollPos = scrollTop / (newState.targetHeight - newState.viewportHeight);

    if (scrollPos > 1)
    {
        // Rare case - avgRowHeight isn't enough and we need more
        // avgRowHeight will be corrected after rendering all items
        scrollPos = 1;
    }

    let firstVisibleItem = scrollPos * newState.scrollHeightInItems;
    const firstVisibleItemOffset = firstVisibleItem - Math.floor(firstVisibleItem);
    // FIXME: Render some items before current for smoothness
    firstVisibleItem = Math.floor(firstVisibleItem);
    let firstVisibleItemHeight = getRenderedItemHeight(firstVisibleItem) || newState.avgRowHeight;
    newState.topPlaceholderHeight = scrollTop - firstVisibleItemHeight * firstVisibleItemOffset;

    if (newState.topPlaceholderHeight < 0)
    {
        newState.topPlaceholderHeight = 0;
    }

    if (firstVisibleItem + newState.viewportItemCount >= props.totalItems - newState.viewportItemCount)
    {
        // Only one placeholder is required
        newState.lastItemCount = props.totalItems - firstVisibleItem;

        let sum = 0, count = props.totalItems - newState.viewportItemCount - firstVisibleItem;
        count = count > 0 ? count : 0;

        for (let i = 0; i < count; i++)
        {
            const itemSize = getRenderedItemHeight(i + newState.firstMiddleItem);
            if (!itemSize)
            {
                // Some required items in the middle are missing
                return newState;
            }
            sum += itemSize;
        }

        const correctedAvg = (sum + newState.lastItemsTotalHeight) / (count + newState.viewportItemCount);

        if (correctedAvg > newState.avgRowHeight)
        {
            newState.avgRowHeight = correctedAvg;
        }
    }
    else
    {
        newState.firstMiddleItem = firstVisibleItem;
        newState.middleItemCount = newState.viewportItemCount;

        let sum = 0;
        for (let i = 0; i < newState.middleItemCount; i++)
        {
            const itemSize = getRenderedItemHeight(i + newState.firstMiddleItem);
            if (!itemSize)
            {
                // Some required items in the middle are missing
                return newState;
            }
            sum += itemSize;
        }
        newState.middlePlaceholderHeight = newState.targetHeight - sum - newState.lastItemsTotalHeight - newState.topPlaceholderHeight;

        if (newState.middlePlaceholderHeight < 0)
        {
            newState.middlePlaceholderHeight = 0;
        }

        const correctedAvg = (sum + newState.lastItemsTotalHeight) / (newState.middleItemCount + newState.viewportItemCount);

        if (correctedAvg > newState.avgRowHeight)
        {
            newState.avgRowHeight = correctedAvg;
        }
    }

    return newState;
}






function testRun()
{
    const items = [];
    for (let i = 0; i < 1000; i++) {
        items[i] = 30 + Math.round(Math.random() * 50);
    }



   

    var old_state: IState = {
        //viewportHeight: 199,
        //viewportItemCount: 100, // not in oldState
        //totalItems: 1000, // not in oldState
        //scrollHeightInItems: 100,
        //avgRowHeight: 100,

        //targetHeight: 100, // not in oldState
        //topPlaceholderHeight: 100, // not in oldState
        //firstMiddleItem: 100, // not in oldState
        //middleItemCount: 100, // not in oldState
        //middlePlaceholderHeight: 100, // not in oldState
        //lastItemCount: 100, // not in oldState
        //lastItemsTotalHeight: 100
        "items": items
    };

    
    
    var props: IProps = {
        "totalItems": items.length,
        "minRowHeight": 30,
        // "viewportHeight": this.viewport.clientHeight - (this.useFixedHeader ? 30 : 0),
        "viewportHeight": 100,
        //"scrollTop": this.viewport.scrollTop,
        "scrollTop": 0,
    };


    const newState = virtualScrollDriver(props, old_state,
        function getRenderedItemHeight(itemIndex) {
            return 60;
        }
    );

    console.log(newState);
}


// https://github.com/vitalif/dynamic-virtual-scroll/blob/master/DynamicVirtualScrollExample.js
// http://yourcmc.ru/dynamic-virtual-scroll/


/*
<div style="position: relative; width: 400px;">
    <div tabindex="1" style="overflow-y: scroll; height: 400px; width: 400px; overflow-anchor: none; outline: none;">
        <div style="height: 50462.8px;">
        <div style="height: 30px;"></div>
        <div style="height: 68px; color: white; text-align: center; line-height: 68px; background: rgb(217, 0, 0);">№ 0: 68px</div>
        <div style="height: 41px; color: white; text-align: center; line-height: 41px; background: rgb(131, 0, 0);">№ 1: 41px</div>
        <div style="height: 37px; color: white; text-align: center; line-height: 37px; background: rgb(118, 0, 0);">№ 2: 37px</div>
        <div style="height: 70px; color: white; text-align: center; line-height: 70px; background: rgb(223, 0, 0);">№ 3: 70px</div>
        <div style="height: 30px; color: white; text-align: center; line-height: 30px; background: rgb(96, 0, 0);">№ 4: 30px</div>
        <div style="height: 61px; color: white; text-align: center; line-height: 61px; background: rgb(194, 0, 0);">№ 5: 61px</div>
        <div style="height: 56px; color: white; text-align: center; line-height: 56px; background: rgb(179, 0, 0);">№ 6: 56px</div>
        <div style="height: 39px; color: white; text-align: center; line-height: 39px; background: rgb(124, 0, 0);">№ 7: 39px</div>
        <div style="height: 35px; color: white; text-align: center; line-height: 35px; background: rgb(112, 0, 0);">№ 8: 35px</div>
        <div style="height: 71px; color: white; text-align: center; line-height: 71px; background: rgb(226, 0, 0);">№ 9: 71px</div>
        <div style="height: 42px; color: white; text-align: center; line-height: 42px; background: rgb(134, 0, 0);">№ 10: 42px</div>
        <div style="height: 59px; color: white; text-align: center; line-height: 59px; background: rgb(188, 0, 0);">№ 11: 59px</div>
        <div style="height: 58px; color: white; text-align: center; line-height: 58px; background: rgb(185, 0, 0);">№ 12: 58px</div>
    </div>

    <div style="position: absolute; top: 0px; left: 0px; height: 30px; background: rgb(0, 128, 192); color: white; text-align: center; line-height: 30px; right: 17px;">
        fixed header
    </div>
</div>
*/


// https://www.davrous.com/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript/
// https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib
// https://dev.to/adamklein/build-your-own-virtual-scroll-part-ii-3j86
// https://github.com/adamkleingit/react-rich-tree/blob/master/src/models/tree-virtual-scroll.model.ts
// https://github.com/CirclonGroup/angular-tree-component/tree/master/projects/angular-tree-component/src
// http://localhost:5080/dvirtual.htm
// https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/






// https://fubardevelopment.github.io/WebDavServer/articles/getting-started.html
// https://github.com/FubarDevelopment/WebDavServer
// https://www.webdavsystem.com/server/server_examples/cross_platform_asp_net_core_file_system/
// https://github.com/skazantsev/WebDavClient
// https://nugetmusthaves.com/tag/webdav
// https://realtimelogic.com/ba/examples/WebDAV/readme.html
// https://www.akadia.com/services/mod_dav.html
// https://wiki.ubuntuusers.de/WebDAV/

// "http" ersetzt man dabei aber durch "dav",
// "https" entsprechend durch "davs".Also beispielsweise
// davs://webdav.mc.gmx.net/

// (universe)
// sudo apt-get install ca-certificates davfs2
// dpkg-reconfigure ca-certificates
// sudo mount - t davfs https://mediacenter.gmx.net /mountpoint


// Falls ein normaler Benutzer die Freigabe einhängen soll,
// muss das über die Datei /etc/fstab erlaubt werden.
// Dazu wird diese in einem Editor[3] mit Root - Rechten geöffnet und folgende Zeile eingetragen:

// # Allgemein
// http://<webdavurl> <mountpunkt> davfs user,noauto 0 0
// # Allgemein mit verschlüsselter Übertragung
// https://<webdavurl> <mountpunkt> davfs user,noauto 0 0
// # Beispiel gmx.mediacenter
// https://mediacenter.gmx.net /home/otto/mnt/gmx davfs noauto,user,rw 0 0

