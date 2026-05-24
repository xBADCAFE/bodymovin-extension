// @ts-nocheck
/**
 * @internal
 * ArrayLike interface for ES3 compatibility
 */
interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

/**
 * Array constructor polyfill interface.
 * Extends ArrayConstructor with ES5 compatibility methods for ExtendScript.
 *
 * @internal
 */
// eslint-disable-next-line
interface ArrayConstructor {
  isArray<T>(arg: any): arg is T[];
  from<T, U = T>(arrayLike: ArrayLike<T>, mapfn?: (v: T, k: number) => U, thisArg?: any): U[];
}

/**
 * Array prototype polyfill interface.
 * Extends Array with ES5/ES6 compatibility methods for ExtendScript.
 *
 * @internal
 */
// eslint-disable-next-line
interface Array<T> {
  includes(searchElement: T, fromIndex?: number): boolean;
  indexOf(searchElement: T, fromIndex?: number): number;
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
  filter(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
  find(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): T | undefined;
  findIndex(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): number;
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  some(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): boolean;
  every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
  flat<D extends number = 1>(depth?: D): any[];
}

Array.prototype.includes = function <T>(this: T[], searchElement: T, fromIndex?: number): boolean {
  if (this == null) {
    throw new Error('"this" is null or not defined');
  }

  const o = Object(this);
  const len = o.length >>> 0;

  if (len === 0) {
    return false;
  }

  const n = fromIndex || 0;
  let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

  while (k < len) {
    if (o[k] === searchElement || (searchElement !== searchElement && o[k] !== o[k])) {
      return true;
    }
    k++;
  }

  return false;
};

Array.prototype.indexOf = function <T>(searchElement: T, fromIndex?: number): number {
  if (this == null) {
    throw new Error('"this" is null or not defined');
  }

  const o = Object(this);
  const len = o.length >>> 0;

  if (len === 0) {
    return -1;
  }

  const n = fromIndex || 0;
  let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

  for (; k < len; k++) {
    if (o[k] === searchElement) {
      return k;
    }
  }

  return -1;
};

Array.isArray = function (arg: any): arg is any[] {
  return Object.prototype.toString.call(arg) === "[object Array]";
};

Array.prototype.map = function <T, U>(callback: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  let T;
  if (arguments.length > 1) {
    T = thisArg;
  }
  const A = new Array(len);
  let k = 0;
  while (k < len) {
    let kValue, mappedValue;
    if (k in O) {
      kValue = O[k];
      mappedValue = callback.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
    k++;
  }
  return A;
};

// Array.from polyfill
Array.from = function <T, U>(arrayLike: ArrayLike<T>, mapFn?: (v: T, k: number) => U, thisArg?: any): any[] {
  if (arrayLike == null) {
    throw new TypeError("Array.from requires an array-like object");
  }

  const items = Object(arrayLike);
  const len = items.length >>> 0;
  const result: any[] = new Array(len);

  for (let i = 0; i < len; i++) {
    if (i in items) {
      if (mapFn) {
        result[i] = mapFn.call(thisArg, items[i], i);
      } else {
        result[i] = items[i];
      }
    }
  }

  return result;
};

// Array.prototype.forEach polyfill
Array.prototype.forEach = function <T>(callback: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  let T;
  if (arguments.length > 1) {
    T = thisArg;
  }

  for (let k = 0; k < len; k++) {
    if (k in O) {
      callback.call(T, O[k], k, O);
    }
  }
};

// Array.prototype.filter polyfill
Array.prototype.filter = function <T>(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): T[] {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof predicate !== "function") {
    throw new TypeError(predicate + " is not a function");
  }

  const result: T[] = [];
  let T;
  if (arguments.length > 1) {
    T = thisArg;
  }

  for (let k = 0; k < len; k++) {
    if (k in O) {
      const val = O[k];
      if (predicate.call(T, val, k, O)) {
        result.push(val);
      }
    }
  }

  return result;
};

// Array.prototype.find polyfill
Array.prototype.find = function <T>(
  predicate: (value: T, index: number, array: T[]) => any,
  thisArg?: any
): T | undefined {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof predicate !== "function") {
    throw new TypeError(predicate + " is not a function");
  }

  let T;
  if (arguments.length > 1) {
    T = thisArg;
  }

  for (let k = 0; k < len; k++) {
    if (k in O) {
      const val = O[k];
      if (predicate.call(T, val, k, O)) {
        return val;
      }
    }
  }

  return undefined;
};

// Array.prototype.findIndex polyfill
Array.prototype.findIndex = function <T>(
  predicate: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): number {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof predicate !== "function") {
    throw new TypeError(predicate + " is not a function");
  }

  let T;
  if (arguments.length > 1) {
    T = thisArg;
  }

  for (let k = 0; k < len; k++) {
    if (k in O) {
      const val = O[k];
      if (predicate.call(T, val, k, O)) {
        return k;
      }
    }
  }

  return -1;
};

// Array.prototype.reduce polyfill
Array.prototype.reduce = function <T, U>(
  callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue?: U
): U {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (len === 0 && arguments.length < 2) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let k = 0;
  let accumulator: any;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    let kPresent = false;
    while (!kPresent && k < len) {
      kPresent = k in O;
      if (kPresent) {
        accumulator = O[k];
      }
      k++;
    }
    if (!kPresent) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  }

  while (k < len) {
    if (k in O) {
      accumulator = callback(accumulator, O[k], k, O);
    }
    k++;
  }

  return accumulator;
};

// Array.prototype.some polyfill
Array.prototype.some = function <T>(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): boolean {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof predicate !== "function") {
    throw new TypeError(predicate + " is not a function");
  }

  let T;
  if (arguments.length > 1) {
    T = thisArg;
  }

  for (let k = 0; k < len; k++) {
    if (k in O) {
      if (predicate.call(T, O[k], k, O)) {
        return true;
      }
    }
  }

  return false;
};

// Array.prototype.every polyfill
Array.prototype.every = function <T>(predicate: (value: T, index: number, array: T[]) => any, thisArg?: any): boolean {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;
  if (typeof predicate !== "function") {
    throw new TypeError(predicate + " is not a function");
  }

  let T;
  if (arguments.length > 1) {
    T = thisArg;
  }

  for (let k = 0; k < len; k++) {
    if (k in O) {
      if (!predicate.call(T, O[k], k, O)) {
        return false;
      }
    }
  }

  return true;
};

// Array.prototype.flat polyfill (1 level only for simplicity)
Array.prototype.flat = function <T>(depth = 1): any[] {
  if (this == null) {
    throw new TypeError("this is null or undefined");
  }
  const O = Object(this);
  const len = O.length >>> 0;

  const flatten = function (arr: any[], d: number): any[] {
    const result: any[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (i in arr) {
        const element = arr[i];
        if (Array.isArray(element) && d > 0) {
          const flattened = flatten(element, d - 1);
          for (let j = 0; j < flattened.length; j++) {
            result.push(flattened[j]);
          }
        } else {
          result.push(element);
        }
      }
    }
    return result;
  };

  return flatten(O, depth);
};
