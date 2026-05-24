declare const XML: any;

let fileString = '';

function init(): void {
  fileString = '';
}

function end(): void {
  fileString = '';
}

function getProjectData(): void {
  const proj = app.project;
  const ff = proj.file;
  if (!ff) {
    fileString = '<no file>';
  } else {
    const demoFile = new File(ff.absoluteURI);
    demoFile.open('r', 'TEXT', '????');
    fileString = demoFile.read(demoFile.length);
  }
}

function sortFunction(a: any, b: any): number {
  const a_0 = Number(a[0].toString());
  const b_0 = Number(b[0].toString());
  if (a_0 === b_0) {
    return 0;
  } else {
    return (a_0 < b_0) ? -1 : 1;
  }
}

function getGradientData(shapeNavigation: string[], numKeys: number): { m: any; p: number } {
  const bm_generalUtils = $.__bodymovin.bm_generalUtils;

  if (!fileString) {
    getProjectData();
  }
  let hasNoGradColorData = false;
  if (fileString.indexOf('ADBE Vector Grad Colors') === -1) {
    hasNoGradColorData = true;
  }
  numKeys = numKeys ? numKeys : 1;
  let gradientIndex = 0, navigationIndex = 0;
  let i = 0, len: number = shapeNavigation.length;
  while (i < len) {
    let encoded = unescape(encodeURIComponent(shapeNavigation[i] + 'LIST'));
    let stringIndex = fileString.indexOf(encoded, navigationIndex + 1);
    if (stringIndex === -1) {
      encoded = unescape(encodeURIComponent(shapeNavigation[i] + ' LIST'));
      stringIndex = fileString.indexOf(encoded, navigationIndex + 1);
    }
    if (stringIndex === -1) {
      encoded = unescape(encodeURIComponent(shapeNavigation[i]));
      stringIndex = fileString.indexOf(encoded, navigationIndex + 1);
    }
    navigationIndex = stringIndex;
    i += 1;
  }
  gradientIndex = fileString.indexOf('ADBE Vector Grad Colors', navigationIndex);
  const gradFillIndex = fileString.indexOf('ADBE Vector Graphic - G-Fill', navigationIndex);
  const gradStrokeIndex = fileString.indexOf('ADBE Vector Graphic - G-Stroke', navigationIndex);
  let limitIndex: number;
  if (gradStrokeIndex !== -1 && gradFillIndex !== -1) {
    limitIndex = Math.min(gradFillIndex, gradStrokeIndex);
  } else {
    limitIndex = Math.max(gradFillIndex, gradStrokeIndex);
  }
  if (limitIndex === -1) {
    limitIndex = Number.MAX_VALUE;
  }
  let currentKey = 0;
  const keyframes: any[] = [];
  let hasOpacity = false, maxOpacities = 0, maxColors = 0;
  let lastIndex = 0;
  while (currentKey < numKeys) {
    const gradientData: any = {};
    gradientIndex = fileString.indexOf('<prop.map', gradientIndex);
    if (hasNoGradColorData || gradientIndex > limitIndex || (gradientIndex === -1 && limitIndex === Number.MAX_VALUE)) {
      gradientData.c = [[0, 1, 1, 1], [1, 0, 0, 0]];
      maxColors = Math.max(maxColors, 2);
    } else {
      const endMatch = '</prop.map>';
      lastIndex = fileString.indexOf(endMatch, gradientIndex);
      let xmlString = fileString.substr(gradientIndex, lastIndex + endMatch.length - gradientIndex);
      xmlString = xmlString.replace(/\n/g, '');
      const XML_Ob = new XML(xmlString);
      const stops = XML_Ob['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'];
      const colors = XML_Ob['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'][1]['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'];
      i = 0;
      len = stops.length();
      const opacitiesArr: any[] = [];
      let op: any[], floats: any, nextFloats: any, midPoint: number, midPosition: number;
      while (i < len) {
        floats = stops[i]['prop.list'][0]['prop.pair'][0]['array'][0].float;
        op = [];
        op.push(bm_generalUtils.roundNumber(Number(floats[0].toString()), 3));
        op.push(bm_generalUtils.roundNumber(Number(floats[2].toString()), 3));
        if (op[1] !== 1) {
          hasOpacity = true;
        }
        opacitiesArr.push(op);
        midPosition = bm_generalUtils.roundNumber(Number(floats[1].toString()), 3);
        if (i < len - 1) {
          op = [];
          nextFloats = stops[i + 1]['prop.list'][0]['prop.pair'][0]['array'][0].float;
          midPoint = Number(floats[0].toString()) + (Number(nextFloats[0].toString()) - Number(floats[0].toString())) * midPosition;
          const midPointValue = Number(floats[2].toString()) + (Number(nextFloats[2].toString()) - Number(floats[2].toString())) * 0.5;
          op.push(bm_generalUtils.roundNumber(midPoint, 3));
          op.push(bm_generalUtils.roundNumber(midPointValue, 3));
          opacitiesArr.push(op);
        }
        i += 1;
      }
      i = 0;
      len = colors.length();
      const colorsArr: any[] = [];
      const sortedColors: any[] = [];
      while (i < len) {
        sortedColors.push(colors[i]['prop.list'][0]['prop.pair'][0]['array'][0].float);
        i += 1;
      }

      sortedColors.sort(sortFunction);

      i = 0;

      while (i < len) {
        floats = sortedColors[i];
        op = [];
        op.push(bm_generalUtils.roundNumber(Number(floats[0].toString()), 3));
        op.push(bm_generalUtils.roundNumber(Number(floats[2].toString()), 3));
        op.push(bm_generalUtils.roundNumber(Number(floats[3].toString()), 3));
        op.push(bm_generalUtils.roundNumber(Number(floats[4].toString()), 3));
        colorsArr.push(op);
        midPosition = bm_generalUtils.roundNumber(Number(floats[1].toString()), 3);
        if (i < len - 1) {
          op = [];
          nextFloats = sortedColors[i + 1];
          midPoint = Number(floats[0].toString()) + (Number(nextFloats[0].toString()) - Number(floats[0].toString())) * midPosition;
          const midPointValueR = Number(floats[2].toString()) + (Number(nextFloats[2].toString()) - Number(floats[2].toString())) * 0.5;
          const midPointValueG = Number(floats[3].toString()) + (Number(nextFloats[3].toString()) - Number(floats[3].toString())) * 0.5;
          const midPointValueB = Number(floats[4].toString()) + (Number(nextFloats[4].toString()) - Number(floats[4].toString())) * 0.5;
          op.push(bm_generalUtils.roundNumber(midPoint, 3));
          op.push(bm_generalUtils.roundNumber(midPointValueR, 3));
          op.push(bm_generalUtils.roundNumber(midPointValueG, 3));
          op.push(bm_generalUtils.roundNumber(midPointValueB, 3));
          colorsArr.push(op);
        }
        i += 1;
      }
      gradientData.c = colorsArr;
      gradientData.o = opacitiesArr;
      maxOpacities = Math.max(maxOpacities, opacitiesArr.length);
      maxColors = Math.max(maxColors, colorsArr.length);
    }

    gradientIndex = lastIndex;

    keyframes.push(gradientData);
    currentKey += 1;
  }
  i = 0;
  let arr: any[], arrayLength: number, count: number, lastValue: any[], offsetValue: number;
  let mergedKeys: any = [];
  let mergedArr: any[];
  let j: number;
  while (i < numKeys) {
    mergedArr = [];
    if (keyframes[i].c.length < maxColors) {
      arr = keyframes[i].c;
      arrayLength = arr.length;
      lastValue = arr[arrayLength - 1];
      offsetValue = lastValue[0];
      count = 0;
      while (arrayLength + count < maxColors) {
        offsetValue -= 0.001;
        arr.splice(arrayLength - 1, 0, [offsetValue, lastValue[1], lastValue[2], lastValue[3]]);
        count += 1;
      }
    }
    for (j = 0; j < maxColors; j += 1) {
      for (let k = 0; k < 4; k += 1) {
        mergedArr.push(keyframes[i].c[j][k]);
      }
    }
    if (!hasOpacity) {
      delete keyframes[i].o;
    } else {
      if (keyframes[i].o.length < maxOpacities) {
        arr = keyframes[i].o;
        arrayLength = arr.length;
        lastValue = arr[arrayLength - 1];
        offsetValue = lastValue[0];
        count = 0;
        while (arrayLength + count < maxOpacities) {
          offsetValue -= 0.001;
          arr.splice(arrayLength - 1, 0, [offsetValue, lastValue[1], lastValue[2], lastValue[3]]);
          count += 1;
        }
      }
      for (j = 0; j < maxOpacities; j += 1) {
        for (let l = 0; l < 2; l += 1) {
          mergedArr.push(keyframes[i].o[j][l]);
        }
      }
    }
    if (numKeys <= 1) {
      mergedKeys = mergedArr;
    } else {
      mergedKeys.push(mergedArr);
    }
    i += 1;
  }

  return {
    m: mergedKeys,
    p: maxColors,
  };
}

export const bm_ProjectHelper = {
  init: init,
  getGradientData: getGradientData,
  end: end,
};
