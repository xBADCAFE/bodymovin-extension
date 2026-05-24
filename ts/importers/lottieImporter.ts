import type { AEError } from '../core/types';

var mainFolder: any;
var elements: { [key: string]: any } = {};
var frameRate = 0;

function getElementById(id: string): any {
  if (elements[id]) {
    return elements[id].element;
  }
  return null;
}

function addElement(id: string, element: any): void {
  elements[id] = {
    element: element,
  };
}

function createFolder(name?: string): void {
  name = name || 'Imported_Lottie_Animation';
  mainFolder = app.project.items.addFolder(name);
}

function createComp(name: string | undefined, width: number, height: number, duration: number, id: string): void {
  name = name || 'Lottie_Main_Comp';
  var comp = app.project.items.addComp(name, width, height, 1, duration / frameRate, frameRate);
  addElement(id, comp);
  comp.parentFolder = mainFolder;
}

function setCompWorkArea(inPoint: number, outPoint: number, id: string): void {
  var destComp = getElementById(id);
  destComp.workAreaStart = inPoint;
  destComp.workAreaDuration = Math.max(0.1, outPoint - inPoint);
}

function createNull(duration: number, elementId: string, parentCompId: string): void {
  var comp = getElementById(parentCompId);

  var element = comp.layers.addNull(duration / frameRate);
  addElement(elementId, element);
}

function createSolid(color: any, name: string, width: number, height: number, duration: number, elementId: string, parentCompId: string): void {
  var comp = getElementById(parentCompId);

  var element = comp.layers.addSolid(color, name, width, height, 1, duration / frameRate);
  addElement(elementId, element);
}

function createShapeLayer(elementId: string, parentCompId: string): void {
  var comp = getElementById(parentCompId);

  var element = comp.layers.addShape();
  addElement(elementId, element);
}

function createTextLayer(elementId: string, parentCompId: string): void {
  var comp = getElementById(parentCompId);

  var element = comp.layers.addText('');
  addElement(elementId, element);
}

function addComposition(compSourceId: string, parentCompId: string, elementId: string): void {
  var comp = getElementById(compSourceId);
  var parentComp = getElementById(parentCompId);
  var compLayer = parentComp.layers.add(comp);
  addElement(elementId, compLayer);
}

function addImageLayer(imageSourceId: string, parentCompId: string, elementId: string): void {
  var image = getElementById(imageSourceId);
  var parentComp = getElementById(parentCompId);
  var imageLayer = parentComp.layers.add(image);
  addElement(elementId, imageLayer);
}

function setFrameRate(value: number): void {
  frameRate = value;
}

function setElementTemporalKeyAtIndex(propertyName: string, index: number, inInfluences: number[], inSpeeds: number[], outInfluences: number[], outSpeeds: number[], elementId: string): void {
  var element = getElementById(elementId);
  var property = element.property(propertyName);
  var inEases: any[] = [];
  var outEases: any[] = [];
  for (var i = 0; i < inInfluences.length; i += 1) {
    var easeIn = new KeyframeEase(inSpeeds[i], inInfluences[i]);
    inEases.push(easeIn);
    var easeOut = new KeyframeEase(outSpeeds[i], outInfluences[i]);
    outEases.push(easeOut);
  }
  property.setTemporalEaseAtKey(index, inEases, outEases);
}

var keyInterpolatioTypes: { [key: number]: any } = {
  1: KeyframeInterpolationType.LINEAR,
  2: KeyframeInterpolationType.BEZIER,
  3: KeyframeInterpolationType.HOLD,
};

function getKeyInterpolationType(type: number): any {
  return keyInterpolatioTypes[type] || keyInterpolatioTypes[1];
}

function setInterpolationTypeAtKey(propertyName: string, index: number, elementId: string, type: number): void {
  var element = getElementById(elementId);
  var property = element.property(propertyName);
  property.setInterpolationTypeAtKey(index, getKeyInterpolationType(2), getKeyInterpolationType(type));
}

function separateDimensions(elementId: string): void {
  var element = getElementById(elementId);
  var property = element.property('Position');
  property.dimensionsSeparated = true;
}

function setSpatialTangentsAtKey(propertyName: string, index: number, inTangents: any, outTangents: any, elementId: string): void {
  var element = getElementById(elementId);
  var property = element.property(propertyName);
  property.setSpatialTangentsAtKey(index, inTangents, outTangents);
}

function formatValue(propertyName: string, value: any): any {
  if (typeof value === 'object' && value.i) {
    var sVerts = value.v;
    var sITans = value.i;
    var sOTans = value.o;
    var sShape = new Shape();
    sShape.vertices = sVerts;
    sShape.inTangents = sITans;
    sShape.outTangents = sOTans;
    sShape.closed = value.c;
    return sShape;
  } else {
    return value;
  }
}

function setElementPropertyValue(propertyName: string, value: any, elementId: string): void {
  var element = getElementById(elementId);
  if (propertyName === 'name') {
    element[propertyName] = decodeURIComponent(value);
  } else {
    element[propertyName].setValue(formatValue(propertyName, value));
  }
}

function setElementPropertyExpression(propertyName: string, value: string, elementId: string): void {
  var element = getElementById(elementId);
  element[propertyName].expression = decodeURIComponent(value);
}

function setElementKey(propertyName: string, time: number, value: any, elementId: string): void {
  var element = getElementById(elementId);
  if (propertyName === 'Colors') {
    element[propertyName].addKey(time / frameRate);
  } else {
    element[propertyName].setValueAtTime(time / frameRate, formatValue(propertyName, value));
  }
}

function setLayerParent(layerId: string, parentLayerId: string): void {
  var layer = getElementById(layerId);
  var parent = getElementById(parentLayerId);
  layer.setParentWithJump(parent);
}

function setLayerStartTime(layerId: string, time: number): void {
  var layer = getElementById(layerId);
  layer.startTime = time / frameRate;
}

function setLayerInPoint(layerId: string, time: number): void {
  var layer = getElementById(layerId);
  layer.inPoint = time / frameRate;
}

function setLayerName(layerId: string, name: string): void {
  var layer = getElementById(layerId);
  layer.name = decodeURIComponent(name);
}

function setElementAsDisabled(elementId: string, name?: string): void {
  var element = getElementById(elementId);
  element.enabled = false;
}

function setLayerOutPoint(layerId: string, time: number): void {
  var layer = getElementById(layerId);
  layer.outPoint = time / frameRate;
}

function setLayerStretch(layerId: string, stretch: number): void {
  var layer = getElementById(layerId);
  layer.stretch = stretch;
}

function createShapeGroup(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Group");
  addElement(elementId, elementProperty);
}

function createRectangle(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Shape - Rect");
  addElement(elementId, elementProperty);
}

function createEllipse(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Shape - Ellipse");
  addElement(elementId, elementProperty);
}

function createStar(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Shape - Star");
  addElement(elementId, elementProperty);
}

function createFill(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Graphic - Fill");
  addElement(elementId, elementProperty);
}

function createGradientFill(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Graphic - G-Fill");
  addElement(elementId, elementProperty);
}

function createGradientStroke(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Graphic - G-Stroke");
  addElement(elementId, elementProperty);
}

function createStroke(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Graphic - Stroke");
  addElement(elementId, elementProperty);
}

function createRepeater(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Filter - Repeater");
  addElement(elementId, elementProperty);
}

function createRoundedCorners(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Filter - RC");
  addElement(elementId, elementProperty);
}

function createTrimPath(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Filter - Trim");
  addElement(elementId, elementProperty);
}

function createShape(elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var property = element.property("Contents");
  var elementProperty = property.addProperty("ADBE Vector Shape - Group");
  addElement(elementId, elementProperty);
}

function getJustification(value: number): any {
  switch (value) {
  case 0:
    return ParagraphJustification.LEFT_JUSTIFY;
  case 1:
    return ParagraphJustification.RIGHT_JUSTIFY;
  case 2:
    return ParagraphJustification.CENTER_JUSTIFY;
  case 3:
    return ParagraphJustification.FULL_JUSTIFY_LASTLINE_LEFT;
  case 4:
    return ParagraphJustification.FULL_JUSTIFY_LASTLINE_RIGHT;
  case 5:
    return ParagraphJustification.FULL_JUSTIFY_LASTLINE_CENTER;
  case 6:
    return ParagraphJustification.FULL_JUSTIFY_LASTLINE_FULL;
  default:
    return ParagraphJustification.LEFT_JUSTIFY;
  }
}

function buildTextDocument(textDocument: any, text: string, fontSize: number, font: string, fillColor: any, tracking: number, justification: number, baselineShift: number): void {
  var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  try {
    textDocument.text = text;
    textDocument.justification = getJustification(justification);
    textDocument.font = decodeURIComponent(font);
    textDocument.baselineShift = baselineShift;
    textDocument.fontSize = fontSize;
    textDocument.fillColor = fillColor;
    textDocument.tracking = tracking;
  } catch (error) {
    const e = error as AEError;
    bm_eventDispatcher.log(e.message);
  }
}

function setTextDocumentValue(sourceTextId: string, text: string, fontSize: number, font: string, fillColor: any, tracking: number, justification: number, baselineShift: number): void {
  var layer = getElementById(sourceTextId);
  var textDocument: any = new TextDocument(text);
  layer.property("Source Text").setValue(textDocument);
  textDocument = layer.property("Source Text").value;
  buildTextDocument(textDocument, text, fontSize, font, fillColor, tracking, justification, baselineShift);
  layer.property("Source Text").setValue(textDocument);
}

function setTextDocumentValueAtTime(sourceTextId: string, time: number, text: string, fontSize: number, font: string, fillColor: any, tracking: number, justification: number, baselineShift: number): void {
  var layer = getElementById(sourceTextId);
  var textDocument: any = new TextDocument(text);
  layer.property("Source Text").setValueAtTime(time / frameRate, textDocument);
  textDocument = layer.property("Source Text").value;
  buildTextDocument(textDocument, text, fontSize, font, fillColor, tracking, justification, baselineShift);
  layer.property("Source Text").setValueAtTime(time / frameRate, textDocument);
}

var maskModes: { [key: string]: any } = {
  a: MaskMode.ADD,
  s: MaskMode.SUBTRACT,
  i: MaskMode.INTERSECT,
  l: MaskMode.LIGHTEN,
  d: MaskMode.DARKEN,
  f: MaskMode.DIFFERENCE,
};

var trackMatteModes: { [key: number]: any } = {
  1: TrackMatteType.ALPHA,
  2: TrackMatteType.ALPHA_INVERTED,
  3: TrackMatteType.LUMA,
  4: TrackMatteType.LUMA_INVERTED,
};

function getMaskMode(mode: string): any {
  return maskModes[mode] || maskModes.a;
}

function getTrackMatteMode(mode: number): any {
  return trackMatteModes[mode] || trackMatteModes[1];
}

function createMask(maskId: string, layerId: string, maskMode: string, isInverted: boolean): void {
  var element = getElementById(layerId);
  var mask = element.Masks.addProperty("Mask");
  addElement(maskId, mask);
  mask.maskMode = getMaskMode(maskMode);
  mask.inverted = isInverted;
}

function setTrackMatte(layerId: string, trackMatteMode: number): void {
  var element = getElementById(layerId);
  element.trackMatteType = getTrackMatteMode(trackMatteMode);
}

function assignIdToProp(propName: string, elementId: string, containerId: string): void {
  var element = getElementById(containerId);
  var elementProperty = element.property(propName);
  addElement(elementId, elementProperty);
}

function importFile(jsonPath: string, fileRelativePath: string, assetId: string): void {
  var importFileOptions = new ImportOptions();
  var file = new File(decodeURIComponent(jsonPath));
  file.changePath(decodeURIComponent(fileRelativePath));
  if (file.exists) {
    importFileOptions.file = file;
  }
  var footage = app.project.importFile(importFileOptions);
  addElement(assetId, footage);
}

function addFootageToMainFolder(footageList: string[]): void {
  var i: number;
  var len = footageList.length;
  for (i = 0; i < len; i += 1) {
    var footage = getElementById(footageList[i]);
    footage.parentFolder = mainFolder;
  }
}

function reset(): void {
  elements = {};
  mainFolder = null;
}

export const bm_lottieImporter = {
  reset: reset,
  createFolder: createFolder,
  createComp: createComp,
  setCompWorkArea: setCompWorkArea,
  createNull: createNull,
  createSolid: createSolid,
  createShapeLayer: createShapeLayer,
  createTextLayer: createTextLayer,
  addComposition: addComposition,
  addImageLayer: addImageLayer,
  setFrameRate: setFrameRate,
  setElementPropertyValue: setElementPropertyValue,
  setElementPropertyExpression: setElementPropertyExpression,
  setElementKey: setElementKey,
  setElementTemporalKeyAtIndex: setElementTemporalKeyAtIndex,
  setInterpolationTypeAtKey: setInterpolationTypeAtKey,
  separateDimensions: separateDimensions,
  setSpatialTangentsAtKey: setSpatialTangentsAtKey,
  setLayerParent: setLayerParent,
  setLayerStartTime: setLayerStartTime,
  setLayerStretch: setLayerStretch,
  setLayerInPoint: setLayerInPoint,
  setLayerName: setLayerName,
  setElementAsDisabled: setElementAsDisabled,
  setLayerOutPoint: setLayerOutPoint,
  createShapeGroup: createShapeGroup,
  createRectangle: createRectangle,
  createEllipse: createEllipse,
  createStar: createStar,
  createFill: createFill,
  createStroke: createStroke,
  createGradientFill: createGradientFill,
  createGradientStroke: createGradientStroke,
  createShape: createShape,
  createRepeater: createRepeater,
  createRoundedCorners: createRoundedCorners,
  createTrimPath: createTrimPath,
  createMask: createMask,
  setTrackMatte: setTrackMatte,
  assignIdToProp: assignIdToProp,
  importFile: importFile,
  addFootageToMainFolder: addFootageToMainFolder,
  setTextDocumentValue: setTextDocumentValue,
  setTextDocumentValueAtTime: setTextDocumentValueAtTime,
};
