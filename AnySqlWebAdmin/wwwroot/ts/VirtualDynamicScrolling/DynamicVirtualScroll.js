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
