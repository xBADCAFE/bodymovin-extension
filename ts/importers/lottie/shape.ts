import { bm_lottieImporter } from '../lottieImporter';
import { add as addAlert } from './alertsHelper';
import { processTransform } from './transform';
import { random } from './util/random';
import { processProperty } from './property';
import gradientAlert from './alerts/gradientAlert';

function processCommonProperties(data: any, id: string): void {
  if (data.hd === true) {
    bm_lottieImporter.setElementAsDisabled(id);
  }
}

function groupHandler(data: any, parentId: string): void {
  var groupId = random(10);
  bm_lottieImporter.createShapeGroup(groupId, parentId);

  processProperty('name', encodeURIComponent(data.nm), groupId);
  iterateShapes(data.it, groupId);
  processCommonProperties(data, groupId);
}

function transformHandler(data: any, parentId: string): void {
  processTransform(data, parentId);
}

function rectangleHandler(data: any, parentId: string): void {
  var rectId = random(10);
  bm_lottieImporter.createRectangle(rectId, parentId);
  processProperty('Size', data.s, rectId, [100, 100]);
  processProperty('Position', data.p, rectId, [0, 0]);
  processProperty('Roundness', data.r, rectId, 0);
  processProperty('name', encodeURIComponent(data.nm), rectId);
  processCommonProperties(data, rectId);
}

function fillHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createFill(id, parentId);
  processProperty('Color', data.c, id);
  processProperty('Opacity', data.o, id, 100);
  processProperty('Fill Rule', data.r, id);
  processProperty('name', encodeURIComponent(data.nm), id);
  processCommonProperties(data, id);
}

function strokeHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createStroke(id, parentId);
  processProperty('Color', data.c, id);
  processProperty('Opacity', data.o, id, 100);
  processProperty('Stroke Width', data.w, id, 1);
  processProperty('Line Cap', data.lc, id, 1);
  processProperty('Line Join', data.lj, id, 1);
  if (data.lj === 1) {
    processProperty('Miter Limit', data.ml, id, 4);
  }
  processProperty('name', encodeURIComponent(data.nm), id);
  processCommonProperties(data, id);
}

function ellipseHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createEllipse(id, parentId);
  processProperty('Shape Direction', data.d, id);
  processProperty('Size', data.s, id, [100, 100]);
  processProperty('Position', data.p, id, [0, 0]);
  processProperty('name', encodeURIComponent(data.nm), id);
  processCommonProperties(data, id);
}

function starHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createStar(id, parentId);
  processProperty('Type', data.sy, id, 1);
  processProperty('Shape Direction', data.d, id, 1);
  processProperty('Points', data.pt, id, 5);
  processProperty('Position', data.p, id, [0, 0]);
  processProperty('Rotation', data.r, id, 0);
  if (data.sy === 1) {
    processProperty('Inner Radius', data.ir, id, 50);
    processProperty('Inner Roundness', data.is, id, 0);
  }
  processProperty('Outer Radius', data.or, id, 100);
  processProperty('Outer Roundness', data.os, id, 0);
  processProperty('name', encodeURIComponent(data.nm), id);
  processCommonProperties(data, id);
}

function shapeHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createShape(id, parentId);
  processProperty('ADBE Vector Shape', data.ks, id, null);
  processCommonProperties(data, id);
}

function repeaterHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createRepeater(id, parentId);
  processProperty('Copies', data.c, id);
  processProperty('Offset', data.o, id, 0);
  processProperty('Composite', data.m, id);
  processProperty('name', encodeURIComponent(data.nm), id);
  processTransform(data.tr, id);
  processCommonProperties(data, id);
}

function roundedCornersHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createRoundedCorners(id, parentId);
  processProperty('Radius', data.r, id);
  processProperty('name', encodeURIComponent(data.nm), id);
  processCommonProperties(data, id);
}

function trimPathHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createTrimPath(id, parentId);
  processProperty('Start', data.s, id, 0);
  processProperty('End', data.e, id, 100);
  processProperty('Offset', data.o, id, 0);
  processProperty('Trim Multiple Shapes', data.m, id);
  processProperty('name', encodeURIComponent(data.nm), id);
  processCommonProperties(data, id);
}

function gradientFillHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createGradientFill(id, parentId);
  processProperty('Colors', data.g.k, id, 100);
  processProperty('Opacity', data.o, id, 100);
  processProperty('Fill Rule', data.r, id, 1);
  processProperty('Blend Mode', data.bm, id, 0);
  processProperty('Start Point', data.s, id, [0, 0]);
  processProperty('End Point', data.e, id, [100, 0]);
  processProperty('Type', data.t, id, 1);
  if (data.t === 2) {
    processProperty('Highlight Length', data.h, id, 0);
    processProperty('Highlight Angle', data.a, id, 0);
  }
  addAlert(gradientAlert(data));
  processProperty('name', data.nm, id);
  processCommonProperties(data, id);
}

function gradientStrokeHandler(data: any, parentId: string): void {
  var id = random(10);
  bm_lottieImporter.createGradientStroke(id, parentId);
  processProperty('Colors', data.g.k, id, 100);
  processProperty('Opacity', data.o, id, 100);
  processProperty('Stroke Width', data.w, id, 2);
  processProperty('Fill Rule', data.r, id, 1);
  processProperty('Blend Mode', data.bm, id, 0);
  processProperty('Start Point', data.s, id, [0, 0]);
  processProperty('End Point', data.e, id, [100, 0]);
  processProperty('Type', data.t, id, 1);
  if (data.t === 2) {
    processProperty('Highlight Length', data.h, id, 0);
    processProperty('Highlight Angle', data.a, id, 0);
  }
  processProperty('Line Cap', data.lc, id, 1);
  processProperty('Line Join', data.lj, id, 1);
  if (data.lj === 1) {
    processProperty('Miter Limit', data.ml2, id, 4);
  }
  processProperty('name', encodeURIComponent(data.nm), id);
  processCommonProperties(data, id);

  addAlert(gradientAlert(data));
}

var shapeHandlers: { [key: string]: (data: any, parentId: string) => void } = {
  gr: groupHandler,
  rc: rectangleHandler,
  fl: fillHandler,
  tr: transformHandler,
  sh: shapeHandler,
  st: strokeHandler,
  el: ellipseHandler,
  sr: starHandler,
  rp: repeaterHandler,
  rd: roundedCornersHandler,
  tm: trimPathHandler,
  gf: gradientFillHandler,
  gs: gradientStrokeHandler,
};

function iterateShapes(shapes: any[], parentId: string): void {
  shapes.forEach(function (shape: any) {
    if (shapeHandlers[shape.ty]) {
      shapeHandlers[shape.ty](shape, parentId);
    }
  });
}

export function processShape(layerData: any, layerId: string): void {
  iterateShapes(layerData.shapes, layerId);
}

export default processShape;
