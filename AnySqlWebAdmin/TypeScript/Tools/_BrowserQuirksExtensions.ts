
interface Element
{
    msMatchesSelector(selectors: string): boolean; // IE Quirk
}

interface Window
{
    CustomEvent: any;
    attachEvent: any; // IE Quirk
    detachEvent: any; // IE Quirk
    
    getStackTrace: any;
    AudioContext: any;
    webkitAudioContext: any;
    clipboardData: DataTransfer | null; // IE Quirk
}



interface Document
{
    attachEvent: any; // IE Quirk
    attachCustomEvent: any; // IE Quirk
}

interface Response
{
    useFinalURL: any;
}

interface ErrorConstructor
{
    // captureStackTrace: any;
}

interface EventTarget
{
    value: any; // IE Quirk
}

interface HTMLScriptElement
{
    onreadystatechange: any; // IE Quirk
}

interface Element
{
    attachEvent: any; // IE Quirk
    detachEvent: any; // IE Quirk
    fireEvent: (eventName: string) => void; // IE Quirk
}

interface Event
{
    clientX: any; // IE Quirk
    clientY: any; // IE Quirk
}

interface CustomEvent
{
    pageX: number; // IE Quirk
    pageY: number; // IE Quirk
}
