// @ts-nocheck

// eslint-disable-next-line
interface ObjectConstructor {
  values<T>(obj: { [key: string]: T } | object): T[];
  keys(obj: object): string[];
  entries<T>(obj: { [key: string]: T } | object): Array<[string, T]>;
  fromEntries<T = any>(entries: Array<[string | number | symbol, T]>): { [k: string]: T };
  assign<T, U>(target: T, source: U): T & U;
  assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
  assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
  assign(target: object, ...sources: any[]): any;
}

// Object.keys polyfill for ES3
// Always define our version to ensure consistent behavior in tests
Object.keys = function (obj: object): string[] {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    const message = "Object.keys called on a non-object";
    throw new Error(message);
  }

  const keys: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
};

Object.values = function <T>(obj: { [key: string]: T } | object): T[] {
  if (obj === null || typeof obj !== "object") {
    const message = "Object.values called on a non-object";
    throw new Error(message);
  }

  const result: T[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push((obj as { [key: string]: T })[key]);
    }
  }
  return result;
};

// Object.entries polyfill
Object.entries = function <T>(obj: { [key: string]: T } | object): Array<[string, T]> {
  if (obj === null || typeof obj !== "object") {
    const message = "Object.entries called on a non-object";
    throw new Error(message);
  }

  const entries: Array<[string, T]> = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      entries.push([key, (obj as { [key: string]: T })[key]]);
    }
  }
  return entries;
};

// Object.fromEntries polyfill
Object.fromEntries = function <T = any>(entries: any): { [k: string]: T } {
  if (entries == null) {
    const message = "Cannot convert undefined or null to object";
    logger.error(message);
    throw new TypeError(message);
  }

  const obj: { [k: string]: T } = {};

  // Handle array-like objects
  if (entries.length !== undefined) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry && entry.length >= 2) {
        const key = String(entry[0]);
        obj[key] = entry[1];
      }
    }
  }

  return obj;
};

// Object.assign polyfill
Object.assign = function (target: any, ...sources: any[]): any {
  if (target == null) {
    const message = "Cannot convert undefined or null to object";
    logger.error(message);
    throw new TypeError(message);
  }

  const to = Object(target);

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (source != null) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          to[key] = source[key];
        }
      }
    }
  }

  return to;
};
