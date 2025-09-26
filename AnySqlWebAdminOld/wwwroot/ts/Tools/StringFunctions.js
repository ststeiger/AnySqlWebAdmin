function leftPadCharacter(str, len, ch) {
    ch = ch.toString();
    str = String(str);
    var i = -1;
    if (!ch)
        ch = ' ';
    len = len - str.length;
    while (++i < len) {
        str = String(ch[0]) + str;
    }
    return str;
}
function rightPadCharacter(str, len, ch) {
    ch = ch.toString();
    str = String(str);
    var i = -1;
    if (!ch)
        ch = ' ';
    len = len - str.length;
    while (++i < len) {
        str = str + String(ch[0]);
    }
    return str;
}
function padStart(str, targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));
    if (str.length > targetLength)
        return String(str);
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(str);
}
function rightpad(str, targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));
    if (str.length > targetLength)
        return String(str);
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
    }
    return String(str) + padString.slice(0, targetLength);
}
