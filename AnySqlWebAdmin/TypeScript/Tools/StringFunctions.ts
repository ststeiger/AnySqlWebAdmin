
// function leftPadCharacter(str, len, ch)
function leftPadCharacter(str: string, len: number, ch: string): string
{
    ch = ch.toString();
    str = String(str);

    let i = -1;

    if (!ch)
        ch = ' ';

    len = len - str.length;

    while (++i < len)
    {
        str = String(ch[0]) + str;
    }

    return str;
}


// function rightPadCharacter(str, len, ch)
function rightPadCharacter(str: string, len: number, ch: string): string
{
    ch = ch.toString();
    str = String(str);

    let i = -1;

    if (!ch)
        ch = ' ';

    len = len - str.length;

    while (++i < len)
    {
        str = str + String(ch[0]);
    }

    return str;
}


// function padStart(str, targetLength, padString)
function padStart(str: string, targetLength: number, padString: string)
{
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));

    if (str.length > targetLength)
        return String(str);

    targetLength = targetLength - str.length;
    if (targetLength > padString.length)
    {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }

    return padString.slice(0, targetLength) + String(str);
}


// function rightpad(str, targetLength, padString)
function rightpad(str: string, targetLength: number, padString: string): string
{
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));

    if (str.length > targetLength)
        return String(str);

    targetLength = targetLength - str.length;
    if (targetLength > padString.length)
    {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }

    return String(str) + padString.slice(0, targetLength);
}
