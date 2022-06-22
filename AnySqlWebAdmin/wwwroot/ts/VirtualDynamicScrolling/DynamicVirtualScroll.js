var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function virtualScrollDriver(props, oldState, getRenderedItemHeight) {
    var viewportHeight = props.viewportHeight;
    var viewportItemCount = Math.ceil(viewportHeight / props.minRowHeight);
    var newState = {
        viewportHeight: viewportHeight,
        viewportItemCount: viewportItemCount,
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
    if (!oldState.viewportHeight) {
        oldState = __assign({}, oldState);
        for (var k in newState) {
            oldState[k] = oldState[k] || 0;
        }
    }
    if (2 * newState.viewportItemCount >= props.totalItems) {
        return newState;
    }
    newState.lastItemCount = newState.viewportItemCount;
    {
        var lastItemsHeight = 0, lastVisibleItems = 0;
        var lastItemSize = void 0;
        while (lastItemsHeight < viewportHeight) {
            lastItemSize = getRenderedItemHeight(props.totalItems - 1 - lastVisibleItems);
            if (!lastItemSize) {
                return newState;
            }
            lastItemsHeight += lastItemSize < props.minRowHeight ? props.minRowHeight : lastItemSize;
            lastVisibleItems++;
        }
        newState.scrollHeightInItems = props.totalItems - lastVisibleItems + (lastItemsHeight - viewportHeight) / lastItemSize;
        while (lastVisibleItems < newState.viewportItemCount) {
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
    var scrollTop = props.scrollTop;
    var scrollPos = scrollTop / (newState.targetHeight - newState.viewportHeight);
    if (scrollPos > 1) {
        scrollPos = 1;
    }
    var firstVisibleItem = scrollPos * newState.scrollHeightInItems;
    var firstVisibleItemOffset = firstVisibleItem - Math.floor(firstVisibleItem);
    firstVisibleItem = Math.floor(firstVisibleItem);
    var firstVisibleItemHeight = getRenderedItemHeight(firstVisibleItem) || newState.avgRowHeight;
    newState.topPlaceholderHeight = scrollTop - firstVisibleItemHeight * firstVisibleItemOffset;
    if (newState.topPlaceholderHeight < 0) {
        newState.topPlaceholderHeight = 0;
    }
    if (firstVisibleItem + newState.viewportItemCount >= props.totalItems - newState.viewportItemCount) {
        newState.lastItemCount = props.totalItems - firstVisibleItem;
        var sum = 0, count = props.totalItems - newState.viewportItemCount - firstVisibleItem;
        count = count > 0 ? count : 0;
        for (var i = 0; i < count; i++) {
            var itemSize = getRenderedItemHeight(i + newState.firstMiddleItem);
            if (!itemSize) {
                return newState;
            }
            sum += itemSize;
        }
        var correctedAvg = (sum + newState.lastItemsTotalHeight) / (count + newState.viewportItemCount);
        if (correctedAvg > newState.avgRowHeight) {
            newState.avgRowHeight = correctedAvg;
        }
    }
    else {
        newState.firstMiddleItem = firstVisibleItem;
        newState.middleItemCount = newState.viewportItemCount;
        var sum = 0;
        for (var i = 0; i < newState.middleItemCount; i++) {
            var itemSize = getRenderedItemHeight(i + newState.firstMiddleItem);
            if (!itemSize) {
                return newState;
            }
            sum += itemSize;
        }
        newState.middlePlaceholderHeight = newState.targetHeight - sum - newState.lastItemsTotalHeight - newState.topPlaceholderHeight;
        if (newState.middlePlaceholderHeight < 0) {
            newState.middlePlaceholderHeight = 0;
        }
        var correctedAvg = (sum + newState.lastItemsTotalHeight) / (newState.middleItemCount + newState.viewportItemCount);
        if (correctedAvg > newState.avgRowHeight) {
            newState.avgRowHeight = correctedAvg;
        }
    }
    return newState;
}
function foo(ev) {
    var hd = ev.currentTarget;
    console.log(hd.scrollTop);
    console.log(hd.scrollLeft);
    console.log(hd.scrollWidth);
    console.log(hd.scrollHeight);
    console.log(hd.scroll);
    console.log(hd.scrollBy);
}
function myrender() {
    var itemElements = [];
    var useFixedHeader = true;
    var topPlaceholderHeight = true;
    var middlePlaceholderHeight = true;
    var scrollbarWidth = 123;
    var baseDiv = document.createElement("DIV");
    baseDiv.setAttribute("style", "position: relative; width: 400px;");
    var overflowDiv = document.createElement("DIV");
    overflowDiv.setAttribute("style", "overflow-y: scroll; width: 400px;height: 400px; overflow-anchor: none; outline: none;");
    overflowDiv.setAttribute("tabIndex", "1");
    overflowDiv.onscroll = foo;
    if (useFixedHeader) {
        var fixedHeader = document.createElement("DIV");
        fixedHeader.setAttribute("style", "height: 30px;");
    }
    if (topPlaceholderHeight) {
        var topPlaceHolder = document.createElement("DIV");
        topPlaceHolder.setAttribute("style", "height: " + topPlaceholderHeight + "px;");
    }
    if (middlePlaceholderHeight) {
        var middlePlaceHolder = document.createElement("DIV");
        middlePlaceHolder.setAttribute("style", "height: " + middlePlaceholderHeight + "px;");
    }
    if (useFixedHeader) {
        var fixedHeader = document.createElement("DIV");
        fixedHeader.setAttribute("style", "position: absolute; top: 0; left: 0; right: " + scrollbarWidth + "px; height: 30px; background: #0080c0; color: white; text-align: center; line-height: 30px;");
    }
}
function testRun() {
    var vb = document.getElementById("viewBox");
    console.log(vb);
    vb.onscroll = foo;
    var items = [];
    for (var i = 0; i < 1000; i++) {
        items[i] = 30 + Math.round(Math.random() * 50);
    }
    var old_state = {
        "items": items
    };
    var props = {
        "totalItems": items.length,
        "minRowHeight": 30,
        "viewportHeight": 100,
        "scrollTop": 0,
    };
    var newState = virtualScrollDriver(props, old_state, function getRenderedItemHeight(itemIndex) {
        return 60;
    });
    console.log(newState);
}
