interface Class {

    length: number;

    name: string;

    __proto__: Class | undefined;

    apply: Function;

    call: Function;

    bind: (arg: any) => void;

    constructor: (...args: any[]) => void;

    toString: () => string;

    hasOwnProperty: () => boolean;

    isPrototypeOf: () => boolean;

    propertyIsEnumerable: () => boolean;

    toLocaleString: () => string;

    valueOf: () => number;
    
}