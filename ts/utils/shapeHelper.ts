import { bm_boundingBox } from '../helpers/boundingBox';

let navigationShapeTree: string[] = [];
let extraParams: any = {};

function reverseShape(ks: any): void {
  const newI: any[] = [], newO: any[] = [], newV: any[] = [];
  let i: number, len: number, isClosed: boolean;
  if (ks.i) {
    let init = 0;
    isClosed = ks.c;

    if (isClosed) {
      newI[0] = ks.o[0];
      newO[0] = ks.i[0];
      newV[0] = ks.v[0];
      init = 1;
    }
    len = ks.i.length;
    let cnt = len - 1;

    for (i = init; i < len; i += 1) {
      newI.push(ks.o[cnt]);
      newO.push(ks.i[cnt]);
      newV.push(ks.v[cnt]);
      cnt -= 1;
    }

    ks.i = newI;
    ks.o = newO;
    ks.v = newV;
  } else {
    len = ks.length;
    for (i = 0; i < len; i += 1) {
      if (ks[i].s) {
        reverseShape(ks[i].s[0]);
      }
      if (ks[i].e) {
        reverseShape(ks[i].e[0]);
      }
    }
  }
}

function getCurvesAtPerc(pt1: number[], pt2: number[], pt3: number[], pt4: number[], t: number): any {
  const A = [pt1[0], pt1[1]];
  const B = [pt2[0], pt2[1]];
  const C = [pt3[0], pt3[1]];
  const D = [pt4[0], pt4[1]];
  const E = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
  const F = [B[0] + (C[0] - B[0]) * t, B[1] + (C[1] - B[1]) * t];
  const G = [C[0] + (D[0] - C[0]) * t, C[1] + (D[1] - C[1]) * t];
  const H = [E[0] + (F[0] - E[0]) * t, E[1] + (F[1] - E[1]) * t];
  const I = [F[0] + (G[0] - F[0]) * t, F[1] + (G[1] - F[1]) * t];
  const J = [H[0] + (I[0] - H[0]) * t, H[1] + (I[1] - H[1]) * t];
  if (A[0] === B[0] && A[1] === B[1] && C[0] === D[0] && C[1] === D[1]) {
    return {
      c1: [A, A, J, J],
      c2: [J, J, D, D],
    };
  } else {
    return {
      c1: [A, E, H, J],
      c2: [J, I, G, D],
    };
  }
}

function addVertices(shape: any, totalVertices: number): void {
  const bm_generalUtils = $.__bodymovin.bm_generalUtils;
  const iterations = [1, 2, 4, 7, 14, 28, 56, 112, 224, 448];
  const shapeVertices = shape.i.length;
  const closed = shape.c;
  const sides = shapeVertices;
  const interpolatableSides = closed ? sides : sides - 1;
  let missingVertices = totalVertices - shapeVertices;
  let i: number;
  let currentIteration = 0;
  const nodesPerSide: number[] = [];
  let count = 0;
  const newV: any[] = [];
  const newI: any[] = [];
  const newO: any[] = [];

  for (i = 0; i < sides; i += 1) {
    nodesPerSide[i] = 0;
  }

  if (interpolatableSides <= 0) {
    for (i = 0; i < missingVertices; i += 1) {
      newV[i] = [0, 0];
      newI[i] = [0, 0];
      newO[i] = [0, 0];
    }
    shape.v = newV;
    shape.o = newO;
    shape.i = newI;
    return;
  }

  while (missingVertices > 0) {
    for (i = 0; i < interpolatableSides; i += 1) {
      if (missingVertices > 0) {
        nodesPerSide[i] += Math.min(missingVertices, iterations[currentIteration]);
      }
      missingVertices -= iterations[currentIteration];
    }
    currentIteration += 1;
  }

  let pt1: number[] = [], pt2: number[] = [], pt3: number[] = [], pt4: number[] = [], curves: any;
  let j: number;
  const rounder = bm_generalUtils.roundNumber;
  for (i = 0; i < sides; i += 1) {
    if (nodesPerSide[i] === 0) {
      newV[count] = [rounder(shape.v[i][0], 3), rounder(shape.v[i][1], 3)];
      newO[count] = [rounder(shape.o[i][0], 3), rounder(shape.o[i][1], 3)];
      if (i === sides - 1) {
        newI[0] = [rounder(shape.i[0][0], 3), rounder(shape.i[0][1], 3)];
      } else {
        newI[count + 1] = [rounder(shape.i[i + 1][0], 3), rounder(shape.i[i + 1][1], 3)];
      }
      count += 1;
    } else {
      if (i === sides - 1 && closed) {
        pt1 = [shape.v[i][0], shape.v[i][1]];
        pt2 = [shape.o[i][0] + shape.v[i][0], shape.o[i][1] + shape.v[i][1]];
        pt3 = [shape.i[0][0] + shape.v[0][0], shape.i[0][1] + shape.v[0][1]];
        pt4 = [shape.v[0][0], shape.v[0][1]];
      } else {
        pt1 = [shape.v[i][0], shape.v[i][1]];
        pt2 = [shape.o[i][0] + shape.v[i][0], shape.o[i][1] + shape.v[i][1]];
        pt3 = [shape.i[i + 1][0] + shape.v[i + 1][0], shape.i[i + 1][1] + shape.v[i + 1][1]];
        pt4 = [shape.v[i + 1][0], shape.v[i + 1][1]];
      }

      const sideNodes = nodesPerSide[i] + 1;

      for (j = 0; j < sideNodes; j += 1) {
        if (j < sideNodes - 1) {
          curves = getCurvesAtPerc(pt1, pt2, pt3, pt4, 1 / (sideNodes - j));
          newV[count] = [rounder(curves.c1[0][0], 3), rounder(curves.c1[0][1], 3)];
          newO[count] = [rounder(curves.c1[1][0] - curves.c1[0][0], 3), rounder(curves.c1[1][1] - curves.c1[0][1], 3)];
          if (count === totalVertices - 1) {
            newI[0] = [rounder(curves.c2[2][0] - curves.c2[0][0], 3), rounder(curves.c2[2][1] - curves.c2[0][1], 3)];
          } else {
            newI[count + 1] = [rounder(curves.c1[2][0] - curves.c1[3][0], 3), rounder(curves.c1[2][1] - curves.c1[3][1], 3)];
          }
          pt1 = [curves.c2[0][0], curves.c2[0][1]];
          pt2 = [curves.c2[1][0], curves.c2[1][1]];
          pt3 = [curves.c2[2][0], curves.c2[2][1]];
          pt4 = [curves.c2[3][0], curves.c2[3][1]];
        } else {
          newV[count] = [rounder(curves.c2[0][0], 3), rounder(curves.c2[0][1], 3)];
          newO[count] = [rounder(curves.c2[1][0] - curves.c2[0][0], 3), rounder(curves.c2[1][1] - curves.c2[0][1], 3)];
          if (count === totalVertices - 1) {
            newI[0] = [rounder(curves.c2[2][0] - curves.c2[3][0], 3), rounder(curves.c2[2][1] - curves.c2[3][1], 3)];
          } else {
            newI[count + 1] = [rounder(curves.c2[2][0] - curves.c2[3][0], 3), rounder(curves.c2[2][1] - curves.c2[3][1], 3)];
          }
        }
        count += 1;
      }
    }
  }
  shape.v = newV;
  shape.o = newO;
  shape.i = newI;
}

export function checkVertexCount(shape: any): void {
  if (shape.i) {
    return;
  }
  let i: number;
  const len = shape.length;
  let maxVertextCount = shape[0].s[0].i.length;
  for (i = 0; i < len; i += 1) {
    if (shape[i].s && shape[i].s[0]) {
      if (maxVertextCount !== shape[i].s[0].i.length) {
        maxVertextCount = Math.max(maxVertextCount, shape[i].s[0].i.length);
      }
    }
    if (shape[i].e && shape[i].e[0]) {
      if (maxVertextCount !== shape[i].e[0].i.length) {
        maxVertextCount = Math.max(maxVertextCount, shape[i].e[0].i.length);
      }
    }
  }
  for (i = 0; i < len; i += 1) {
    if (shape[i].s && shape[i].s[0] && maxVertextCount !== shape[i].s[0].i.length) {
      addVertices(shape[i].s[0], maxVertextCount);
    }
    if (shape[i].e && shape[i].e[0] && maxVertextCount !== shape[i].e[0].i.length) {
      addVertices(shape[i].e[0], maxVertextCount);
    }
  }
}

function iterateProperties(iteratable: any, array: any[], frameRate: number, stretch: number, isText: boolean, isEnabled: boolean, includeHiddenData: boolean): void {
  const bm_generalUtils = $.__bodymovin.bm_generalUtils;
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const bm_blendModes = $.__bodymovin.bm_blendModes;
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  const shapeItemTypes = $.__bodymovin.shapeTypes;
  const getItemType = $.__bodymovin.getShapeType;
  let i: number;
  const len = iteratable.numProperties;
  let ob: any, prop: any, itemType: any, enabled: boolean;
  for (i = 0; i < len; i += 1) {
    ob = null;
    prop = iteratable.property(i + 1);
    if (!includeHiddenData && !prop.enabled) {
      continue;
    }
    if (!isEnabled) {
      enabled = false;
    } else {
      enabled = prop.enabled;
    }
    itemType = getItemType(prop.matchName);
    if (isText && itemType !== shapeItemTypes.shape && itemType !== shapeItemTypes.group && itemType !== shapeItemTypes.merge) {
      continue;
    }
    if (itemType === shapeItemTypes.shape) {
      ob = {};
      ob.ind = i;
      ob.ty = itemType;
      ob.ix = prop.propertyIndex;
      ob.ks = bm_keyframeHelper.exportKeyframes(prop.property('Path'), frameRate, stretch);
      checkVertexCount(ob.ks.k);
      if (prop.property("Shape Direction").value === 3) {
        reverseShape(ob.ks.k);
      }
    } else if (itemType === shapeItemTypes.rect && !isText) {
      ob = {};
      ob.ty = itemType;
      ob.d = prop.property("Shape Direction").value;
      ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Size'), frameRate, stretch);
      ob.p = bm_keyframeHelper.exportKeyframes(prop.property('Position'), frameRate, stretch);
      ob.r = bm_keyframeHelper.exportKeyframes(prop.property('Roundness'), frameRate, stretch);
    } else if (itemType === shapeItemTypes.star && !isText) {
      ob = {};
      ob.ty = itemType;
      ob.sy = prop.property("Type").value;
      ob.d = prop.property("Shape Direction").value;
      ob.pt = bm_keyframeHelper.exportKeyframes(prop.property('Points'), frameRate, stretch);
      ob.p = bm_keyframeHelper.exportKeyframes(prop.property('Position'), frameRate, stretch);
      ob.r = bm_keyframeHelper.exportKeyframes(prop.property('Rotation'), frameRate, stretch);
      if (ob.sy === 1) {
        ob.ir = bm_keyframeHelper.exportKeyframes(prop.property('Inner Radius'), frameRate, stretch);
        ob.is = bm_keyframeHelper.exportKeyframes(prop.property('Inner Roundness'), frameRate, stretch);
      }
      ob.or = bm_keyframeHelper.exportKeyframes(prop.property('Outer Radius'), frameRate, stretch);
      ob.os = bm_keyframeHelper.exportKeyframes(prop.property('Outer Roundness'), frameRate, stretch);

      ob.ix = prop.propertyIndex;
    } else if (itemType === shapeItemTypes.ellipse) {
      ob = {};
      ob.d = prop.property("Shape Direction").value;
      ob.ty = itemType;
      ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Size'), frameRate, stretch);
      ob.p = bm_keyframeHelper.exportKeyframes(prop.property('Position'), frameRate, stretch);
    } else if (itemType === shapeItemTypes.fill) {
      ob = {};
      ob.ty = itemType;
      ob.c = bm_keyframeHelper.exportKeyframes(prop.property('Color'), frameRate, stretch);
      ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Opacity'), frameRate, stretch);
      ob.r = prop.property('Fill Rule').value;
      ob.bm = bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value);
    } else if (itemType === shapeItemTypes.gfill) {
      ob = {};
      ob.ty = itemType;
      ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Opacity'), frameRate, stretch);
      ob.r = prop.property('Fill Rule').value;
      ob.bm = bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value);
      navigationShapeTree.push(prop.name);
      exportGradientData(ob, prop, frameRate, stretch, navigationShapeTree);
      navigationShapeTree.pop();

    } else if (itemType === shapeItemTypes.gStroke) {
      ob = {};
      ob.ty = itemType;
      ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Opacity'), frameRate, stretch);
      ob.w = bm_keyframeHelper.exportKeyframes(prop.property('Stroke Width'), frameRate, stretch);
      navigationShapeTree.push(prop.name);
      exportGradientData(ob, prop, frameRate, stretch, navigationShapeTree);
      navigationShapeTree.pop();
      ob.lc = prop.property('Line Cap').value;
      ob.lj = prop.property('Line Join').value;
      if (ob.lj === 1) {
        ob.ml = Math.round(prop.property('Miter Limit').value * 100) / 100;
        ob.ml2 = bm_keyframeHelper.exportKeyframes(prop.property('Miter Limit'), frameRate, stretch);
      }
      ob.bm = bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value);
      getDashData(ob, prop, frameRate, stretch);

    } else if (itemType === shapeItemTypes.stroke) {
      ob = {};
      ob.ty = itemType;
      ob.c = bm_keyframeHelper.exportKeyframes(prop.property('Color'), frameRate, stretch);
      ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Opacity'), frameRate, stretch);
      ob.w = bm_keyframeHelper.exportKeyframes(prop.property('Stroke Width'), frameRate, stretch);
      ob.lc = prop.property('Line Cap').value;
      ob.lj = prop.property('Line Join').value;
      if (ob.lj === 1) {
        ob.ml = Math.round(prop.property('Miter Limit').value * 100) / 100;
      }
      ob.bm = bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value);
      getDashData(ob, prop, frameRate, stretch);

    } else if (itemType === shapeItemTypes.repeater) {
      ob = {};
      ob.ty = itemType;
      ob.c = bm_keyframeHelper.exportKeyframes(prop.property('Copies'), frameRate, stretch);
      ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Offset'), frameRate, stretch);
      ob.m = prop.property('Composite').value;
      ob.ix = prop.propertyIndex;
      var trOb: any = {};
      var transformProperty: any = prop.property('Transform');
      trOb.ty = 'tr';
      trOb.p = bm_keyframeHelper.exportKeyframes(transformProperty.property('Position'), frameRate, stretch);
      trOb.a = bm_keyframeHelper.exportKeyframes(transformProperty.property('Anchor Point'), frameRate, stretch);
      trOb.s = bm_keyframeHelper.exportKeyframes(transformProperty.property('Scale'), frameRate, stretch);
      trOb.r = bm_keyframeHelper.exportKeyframes(transformProperty.property('Rotation'), frameRate, stretch);
      trOb.so = bm_keyframeHelper.exportKeyframes(transformProperty.property('Start Opacity'), frameRate, stretch);
      trOb.eo = bm_keyframeHelper.exportKeyframes(transformProperty.property('End Opacity'), frameRate, stretch);
      trOb.nm = transformProperty.name;
      ob.tr = trOb;
    } else if (itemType === shapeItemTypes.merge) {
      ob = {};
      ob.ty = itemType;
      ob.mm = prop.property('ADBE Vector Merge Type').value;
    } else if (itemType === shapeItemTypes.trim) {
      ob = {};
      ob.ty = itemType;
      ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Start'), frameRate, stretch);
      ob.e = bm_keyframeHelper.exportKeyframes(prop.property('End'), frameRate, stretch);
      ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Offset'), frameRate, stretch);
      ob.m = prop.property('Trim Multiple Shapes').value;
      ob.ix = prop.propertyIndex;
    } else if (itemType === shapeItemTypes.twist) {
      ob = {};
      ob.ty = itemType;
      ob.a = bm_keyframeHelper.exportKeyframes(prop.property('ADBE Vector Twist Angle'), frameRate, stretch);
      ob.c = bm_keyframeHelper.exportKeyframes(prop.property('ADBE Vector Twist Center'), frameRate, stretch);
      ob.ix = prop.propertyIndex;
    } else if (itemType === shapeItemTypes.group) {
      ob = {
        ty: itemType,
        it: [],
        nm: prop.name,
        np: prop.property('Contents').numProperties,
        cix: prop.property('Contents').propertyIndex,
        bm: bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value),
        ix: prop.propertyIndex,
      };

      navigationShapeTree.push(prop.name);
      iterateProperties(prop.property('Contents'), ob.it, frameRate, stretch, isText, enabled, includeHiddenData);
      if (!isText) {
        trOb = {};
        transformProperty = prop.property('Transform');
        trOb.ty = 'tr';
        trOb.p = bm_keyframeHelper.exportKeyframes(transformProperty.property('Position'), frameRate, stretch);
        trOb.a = bm_keyframeHelper.exportKeyframes(transformProperty.property('Anchor Point'), frameRate, stretch);
        trOb.s = bm_keyframeHelper.exportKeyframes(transformProperty.property('Scale'), frameRate, stretch);
        trOb.r = bm_keyframeHelper.exportKeyframes(transformProperty.property('Rotation'), frameRate, stretch);
        trOb.o = bm_keyframeHelper.exportKeyframes(transformProperty.property('Opacity'), frameRate, stretch);
        if (transformProperty.property('Skew').canSetExpression) {
          trOb.sk = bm_keyframeHelper.exportKeyframes(transformProperty.property('Skew'), frameRate, stretch);
          trOb.sa = bm_keyframeHelper.exportKeyframes(transformProperty.property('Skew Axis'), frameRate, stretch);
        }
        trOb.nm = transformProperty.name;
        ob.it.push(trOb);
      }
      navigationShapeTree.pop();
    } else if (itemType === shapeItemTypes.roundedCorners) {
      ob = {
        ty: itemType,
        nm: prop.name,
      };
      ob.r = bm_keyframeHelper.exportKeyframes(prop.property('Radius'), frameRate, stretch);
      ob.ix = prop.propertyIndex;
    } else if (itemType === shapeItemTypes.offsetPath) {
      ob = {
        ty: itemType,
        nm: prop.name,
      };
      ob.a = bm_keyframeHelper.exportKeyframes(prop.property('Amount'), frameRate, stretch);
      ob.lj = prop.property('Line Join').value;
      ob.ml = bm_keyframeHelper.exportKeyframes(prop.property('Miter Limit'), frameRate, stretch);
      ob.ix = prop.propertyIndex;
    } else if (itemType === shapeItemTypes.puckerAndBloat) {
      ob = {
        ty: itemType,
        nm: prop.name,
      };
      ob.a = bm_keyframeHelper.exportKeyframes(prop.property('Amount'), frameRate, stretch);
      ob.ix = prop.propertyIndex;
    } else if (itemType === shapeItemTypes.zigZag) {
      ob = {
        ty: itemType,
        nm: prop.name,
      };
      ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Size'), frameRate, stretch);
      ob.r = bm_keyframeHelper.exportKeyframes(prop.property('Ridges per segment'), frameRate, stretch);
      ob.pt = bm_keyframeHelper.exportKeyframes(prop.property('Points'), frameRate, stretch);
      bm_generalUtils.iterateProperty(prop);
      ob.ix = prop.propertyIndex;
    }
    if (ob) {
      ob.nm = bm_generalUtils.sanitizeName(prop.name);
      ob.mn = prop.matchName;
      if (settingsHelper.shouldIgnoreExpressionProperties()) {
        delete ob.mn;
        delete ob.np;
        delete ob.cix;
        delete ob.np;
        delete ob.ix;
      }
      ob.hd = !enabled;
      const layerAttributes = bm_generalUtils.findAttributes(prop.name);
      if (layerAttributes.ln) {
        ob.ln = layerAttributes.ln;
      }
      if (layerAttributes.cl) {
        ob.cl = layerAttributes.cl;
      }
      array.push(ob);
    }

  }
}

function exportGradientData(ob: any, prop: any, frameRate: number, stretch: number, navigationShapeTree: string[]): void {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const bm_ProjectHelper = $.__bodymovin.bm_ProjectHelper;
  const property = prop.property('Colors');
  const gradientData = bm_ProjectHelper.getGradientData(navigationShapeTree, property.numKeys);
  ob.g = {
    p: gradientData.p,
    k: bm_keyframeHelper.exportKeyframes(property, frameRate, stretch, gradientData.m),
  };
  ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Start Point'), frameRate, stretch);
  ob.e = bm_keyframeHelper.exportKeyframes(prop.property('End Point'), frameRate, stretch);
  ob.t = prop.property('Type').value;
  if (ob.t === 2) {
    ob.h = bm_keyframeHelper.exportKeyframes(prop.property('Highlight Length'), frameRate, stretch);
    ob.a = bm_keyframeHelper.exportKeyframes(prop.property('Highlight Angle'), frameRate, stretch);
  }
}

function getDashData(ob: any, prop: any, frameRate: number, stretch: number): void {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  let j: number;
  const jLen = prop.property('Dashes').numProperties;
  const dashesData: any[] = [];
  let changed = false;
  for (j = 0; j < jLen; j += 1) {
    if (prop.property('Dashes').property(j + 1).canSetExpression) {
      changed = true;
      const dashData: any = {};
      let name = '';
      if (prop.property('Dashes').property(j + 1).matchName.indexOf('ADBE Vector Stroke Dash') !== -1) {
        name = 'd';
      } else if (prop.property('Dashes').property(j + 1).matchName.indexOf('ADBE Vector Stroke Gap') !== -1) {
        name = 'g';
      } else if (prop.property('Dashes').property(j + 1).matchName === 'ADBE Vector Stroke Offset') {
        name = 'o';
      }
      dashData.n = name;
      dashData.nm = prop.property('Dashes').property(j + 1).name.toLowerCase().split(' ').join('');
      dashData.v = bm_keyframeHelper.exportKeyframes(prop.property('Dashes').property(j + 1), frameRate, stretch);
      dashesData.push(dashData);
    }
  }
  if (changed) {
    ob.d = dashesData;
  }
}

function compareShapeWithBox(shape: any, matrix: any, containerBox: any): boolean {
  let shapeBox: any;
  if (shape.ks.a === 0) {
    shapeBox = bm_boundingBox.getBoundingBox(shape.ks.k, matrix);
    return bm_boundingBox.isBoxInContainer(shapeBox, containerBox);
  } else {
    let i: number;
    const len = shape.ks.k.length;
    for (i = 0; i < len; i += 1) {
      if (shape.ks.k[i].s) {
        shapeBox = bm_boundingBox.getBoundingBox(shape.ks.k[i].s[0], matrix);
        if (!bm_boundingBox.isBoxInContainer(shapeBox, containerBox)) {
          return false;
        }
      }
      if (shape.ks.k[i].e) {
        shapeBox = bm_boundingBox.getBoundingBox(shape.ks.k[i].e[0], matrix);
        if (!bm_boundingBox.isBoxInContainer(shapeBox, containerBox)) {
          return false;
        }
      }
    }
    return true;
  }
}

function isStraightAngle(pt1: number[], pt2: number[], pt3: number[]): boolean {
  const degToRads = Math.PI / 180;
  const side_a = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
  const side_b = Math.sqrt(Math.pow(pt2[0] - pt3[0], 2) + Math.pow(pt2[1] - pt3[1], 2));
  const side_c = Math.sqrt(Math.pow(pt3[0] - pt1[0], 2) + Math.pow(pt3[1] - pt1[1], 2));
  const angle = Math.acos((Math.pow(side_a, 2) + Math.pow(side_b, 2) - Math.pow(side_c, 2)) / (2 * side_a * side_b));
  return Math.abs((angle / degToRads) - 90) < 0.01;
}

function isShapeSquare(shapeData: any): boolean {
  if (shapeData.v.length !== 4) {
    return false;
  }
  let i = 0;
  while (i < 4) {
    if (shapeData.i[i][0] !== 0
      || shapeData.i[i][1] !== 0
      || shapeData.o[i][0] !== 0
      || shapeData.o[i][1] !== 0) {
      return false;
    }
    i += 1;
  }
  const vertices = shapeData.v;
  return isStraightAngle(vertices[0], vertices[1], vertices[2]) && isStraightAngle(vertices[1], vertices[2], vertices[3]) && isStraightAngle(vertices[2], vertices[3], vertices[0]);
}

function removeUnwantedMergePaths(items: any[]): void {
  const shapeItemTypes = $.__bodymovin.shapeTypes;
  if (!items) {
    return;
  }
  let i: number;
  const len = items.length;
  let canRemoveContainerShape = false;
  let containingBoxIndex: number = 0, containingShape: any;
  for (i = len - 1; i >= 0; i -= 1) {
    if (items[i].ty === shapeItemTypes.merge && items[i].mm === 4 && i > 0) {
      if (items[i - 1].ty === shapeItemTypes.shape) {
        containingShape = items[i - 1];
        if (containingShape.ks.a === 0 && isShapeSquare(containingShape.ks.k)) {
          containingBoxIndex = i;
          canRemoveContainerShape = true;
        }
      } else if (items[i - 1].ty === shapeItemTypes.group) {
        const containingGroup = items[i - 1];
        const groupItems = containingGroup.it;
        if (groupItems && groupItems.length > 1 && groupItems[groupItems.length - 2].ty === shapeItemTypes.shape) {
          containingShape = groupItems[groupItems.length - 2];
          if (containingShape.ks.a === 0 && isShapeSquare(containingShape.ks.k)) {
            containingBoxIndex = i;
            canRemoveContainerShape = true;
          }
        }
      }
    }
    if (items[i].ty === shapeItemTypes.group) {
      removeUnwantedMergePaths(items[i].it);
    }
  }
  if (canRemoveContainerShape) {
    items.splice(containingBoxIndex - 1, 2);
  }
}

export function exportShape(layerInfo: any, layerOb: any, frameRate: number, isText: boolean, params: any, includeHiddenData: boolean): void {
  const stretch = layerOb.sr || 1;
  extraParams = params;
  const containingComp = layerInfo.containingComp;
  navigationShapeTree.length = 0;
  navigationShapeTree.push(containingComp.name);
  navigationShapeTree.push(layerInfo.name);
  const shapes: any[] = [];
  const contents = layerInfo.property('ADBE Root Vectors Group');
  layerOb.shapes = shapes;
  iterateProperties(contents, shapes, frameRate, stretch, isText, true, includeHiddenData);
  removeUnwantedMergePaths(shapes);
}

export const bm_shapeHelper = { exportShape, checkVertexCount };
