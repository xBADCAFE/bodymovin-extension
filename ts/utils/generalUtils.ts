import { bm_eventDispatcher } from '../eventManager';

export const Gtlym: { CALL: { [key: string]: () => void } } = {
  CALL: {},
};

export function random(len: number): string {
  const sequence = 'abcdefghijklmnoqrstuvwxyz1234567890';
  let returnString = '';
  let i: number;
  for (i = 0; i < len; i += 1) {
    returnString += sequence.charAt(Math.floor(Math.random() * sequence.length));
  }
  return returnString;
}

export function setTimeout(func: () => void, millis: number): any {
  const guid = random(10);
  Gtlym.CALL["interval_" + guid] = func;
  return app.scheduleTask('$.__bodymovin.bm_generalUtils.Gtlym.CALL["interval_' + guid + '"]();', millis, false);
}

export function roundArray(arr: any[], decimals: number): any[] {
  let i: number;
  const len = arr.length;
  const retArray: any[] = [];
  for (i = 0; i < len; i += 1) {
    if (typeof arr[i] === 'number') {
      retArray.push(roundNumber(arr[i], decimals));
    } else {
      retArray.push(roundArray(arr[i], decimals));
    }
  }
  return retArray;
}

export function roundNumber(num: any, decimals: number): any {
  num = num || 0;
  if (typeof num === 'number') {
    return parseFloat(num.toFixed(decimals));
  } else {
    return roundArray(num, decimals);
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function arrayRgbToHex(values: number[]): string {
  return rgbToHex(Math.round(values[0] * 255), Math.round(values[1] * 255), Math.round(values[2] * 255));
}

export const iterateProperty = (function () {

  let response: any;

  function iterateProperties(property: any, ob: any): void {
    ob.name = property.name;
    ob.matchName = property.matchName;
    if (property.numProperties) {
      ob.properties = [];
      let i = 0;
      const len = property.numProperties;
      while (i < len) {
        const propertyOb: any = {};
        ob.properties.push(propertyOb);
        iterateProperties(property(i + 1), propertyOb);
        i++;
      }
    } else {
      if (property.propertyValueType !== PropertyValueType.NO_VALUE && property.value !== undefined) {
        ob.value = property.value.toString();
      } else {
        ob.value = '--- No Value: ---';
      }
    }
  }

  return function (property: any): void {
    response = {};
    iterateProperties(property, response);
    bm_eventDispatcher.sendEvent('console:log', response);
  };
}());

export function iterateOwnProperties(property: any): void {
  const propsArray: string[] = [];
  for (const s in property) {
    if (property.hasOwnProperty(s)) {
      propsArray.push(s);
    }
  }
  bm_eventDispatcher.log(propsArray);
}

export function convertPathsToAbsoluteValues(ks: any): void {
  let i: number, len: number;
  if (ks.i) {
    len = ks.i.length;
    for (i = 0; i < len; i += 1) {
      ks.i[i][0] += ks.v[i][0];
      ks.i[i][1] += ks.v[i][1];
      ks.o[i][0] += ks.v[i][0];
      ks.o[i][1] += ks.v[i][1];
    }
  } else {
    len = ks.length;
    for (i = 0; i < len - 1; i += 1) {
      convertPathsToAbsoluteValues(ks[i].s[0]);
      convertPathsToAbsoluteValues(ks[i].e[0]);
    }
  }
}

export function findAttributes(name: string): { ln: string | null; cl: string; tg: string } {
  const ob: { ln: string | null; cl: string; tg: string } = {
    ln: null,
    cl: '',
    tg: '',
  };
  let regexElem = /[\.|#][a-zA-Z0-9\-_]*/g;
  let match: RegExpExecArray | null;
  let firstChar: string;
  let matchString: string;
  while ((match = regexElem.exec(name))) {
    matchString = match[0];
    firstChar = matchString.substring(0, 1);
    if (firstChar === '#') {
      ob.ln = matchString.substring(1);
    } else {
      ob.cl += ob.cl === '' ? '' : ' ';
      ob.cl += matchString.substring(1);
    }
  }
  regexElem = /<([a-zA-Z0-9\-_]*)>/g;
  while ((match = regexElem.exec(name))) {
    bm_eventDispatcher.log('FOUND');
    bm_eventDispatcher.log(match[1]);
    ob.tg = match[1];
  }
  return ob;
}

export function extendPrototype(destination: any, origin: any): void {
  for (const s in origin.prototype) {
    if (origin.prototype.hasOwnProperty(s)) {
      destination.prototype[s] = origin.prototype[s];
    }
  }
}

export function sanitizeName(name: string): string {
  let i: number;
  const len = name.length;
  let finalString = '';
  for (i = 0; i < len; i += 1) {
    const charCode = name.charCodeAt(i);
    try {
      if (charCode >= 0xD800 && charCode <= 0xDBFF) {
        const nextCharCode = name.charCodeAt(i + 1);
        if (nextCharCode >= 0xDC00 && nextCharCode <= 0xDFFF) {
          finalString += name.charAt(i);
        } else {

        }
      } else {
        finalString += name.charAt(i);
      }

    } catch (error) {
      finalString += name.charAt(i);
    }
  }
  return finalString;
}

export function trimText(text: string): string {
  return text.replace(/^\s+|\s+$/g, '');
}

export function cloneObject(ob: any, shallow?: boolean): any {
  if (shallow === undefined) {
    shallow = true;
  }
  const clone: any = {};
  for (const s in ob) {
    if (ob.hasOwnProperty(s)) {
      if (typeof s === 'object' && !shallow) {
        clone[s] = cloneObject(ob[s], shallow);
      } else {
        clone[s] = ob[s];
      }
    }
  }
  return clone;
}

export const bm_generalUtils = {
  random,
  setTimeout,
  roundArray,
  roundNumber,
  arrayRgbToHex,
  iterateProperty,
  iterateOwnProperties,
  convertPathsToAbsoluteValues,
  findAttributes,
  extendPrototype,
  sanitizeName,
  trimText,
  cloneObject,
  Gtlym,
};
