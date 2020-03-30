
// Proxy is an engine-feature, and therefore cannot be polyfilled ! 
// Promise & Fetch can be polyfilled 
// "lib": [ "dom", "es5", "es2015.promise" //, "es2015.proxy" ],
// ProxyConstructor, ProxyHandler, PropertyKey, Proxy copied from lib.es2015.proxy.d.ts
// Fetch is not an ECMAScript-feature -  It's part of the Web platform API defined by the standards bodies WHATWG and W3C.
// https://stackoverflow.com/questions/44058726/is-the-fetch-api-an-ecmascript-feature
// https://www.npmjs.com/package/node-fetch

// declare type PropertyKey = string | number | symbol;

/*
interface Iterable<T>
{}


interface Document
{
    getElementById(elementId: string): HTMLElement | null;
    getElementById<T>(elementId: string): T;
}


interface ProxyHandler<T extends object>
{
    getPrototypeOf?(target: T): object | null;
    setPrototypeOf?(target: T, v: any): boolean;
    isExtensible?(target: T): boolean;
    preventExtensions?(target: T): boolean;
    getOwnPropertyDescriptor?(target: T, p: PropertyKey): PropertyDescriptor | undefined;
    has?(target: T, p: PropertyKey): boolean;
    get?(target: T, p: PropertyKey, receiver: any): any;
    set?(target: T, p: PropertyKey, value: any, receiver: any): boolean;
    deleteProperty?(target: T, p: PropertyKey): boolean;
    defineProperty?(target: T, p: PropertyKey, attributes: PropertyDescriptor): boolean;
    enumerate?(target: T): PropertyKey[];
    ownKeys?(target: T): PropertyKey[];
    apply?(target: T, thisArg: any, argArray?: any): any;
    construct?(target: T, argArray: any, newTarget?: any): object;
}

interface ProxyConstructor
{
    revocable<T extends object>(target: T, handler: ProxyHandler<T>): { proxy: T; revoke: () => void; };
    new <T extends object>(target: T, handler: ProxyHandler<T>): T;
}

declare let Proxy: ProxyConstructor;
*/