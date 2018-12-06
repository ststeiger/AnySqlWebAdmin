
interface Window
{
    CustomEvent: any;
    // attachEvent: any;
    // detachEvent: any;
    attachEvent(eventName: string, callback: (event: any) => void): void;
    detachEvent(eventName: string, callback: (event: any) => void): void;
    
    getStackTrace: any;
    AudioContext: any;
    webkitAudioContext: any;
}

interface Document
{
    // attachEvent: any;
    // detachEvent: any;

    attachEvent(eventName: string, callback: (event: any) => void): void;
    detachEvent(eventName: string, callback: (event: any) => void): void;

    attachCustomEvent: any;
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
    value: any;
}

interface HTMLScriptElement
{
    onreadystatechange: any;
}

interface Element
{
    attachEvent: any;
    detachEvent: any;
    fireEvent: (eventName:string)=> void;
}

interface Event
{
    clientX: any;
    clientY: any;
}

interface CustomEvent
{
    pageX: number;
    pageY: number;
}
