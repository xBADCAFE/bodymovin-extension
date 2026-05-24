import { shapeTypes } from '../../../enums/shapeTypes';
import { getShapeType } from '../../../helpers/shapeTypeResolver';
import { bm_shapeUnhandledReport as shapeUnhandled } from './shapeUnhandledReport';
import { bm_shapeGroupReport as shapeGroup } from './shapeGroupReport';
import { bm_shapeRectReport as shapeRect } from './shapeRectReport';
import { bm_shapeEllipseReport as shapeEllipse } from './shapeEllipseReport';
import { bm_shapeStarReport as shapeStar } from './shapeStarReport';
import { bm_shapeShapeReport as shapeShape } from './shapeShapeReport';
import { bm_shapeStrokeReport as shapeStroke } from './shapeStrokeReport';
import { bm_shapeFillReport as shapeFill } from './shapeFillReport';
import { bm_shapeGradientFillReport as shapeGradientFill } from './shapeGradientFillReport';
import { bm_shapeGradientStrokeReport as shapeGradientStroke } from './shapeGradientStrokeReport';
import { bm_shapeMergePathsReport as shapeMergePaths } from './shapeMergePathsReport';
import { bm_shapeRepeaterReport as shapeRepeater } from './shapeRepeaterReport';
import { bm_shapeRoundCornersReport as roundCorners } from './shapeRoundCornersReport';
import { bm_shapePuckerAndBloatReport as puckerAndBloat } from './shapePuckerAndBloatReport';
import { bm_shapeTrimPathsReport as trimPaths } from './shapeTrimPathsReport';

function buildGroup(element: any): any {
  return shapeGroup(element);
}

function buildRect(element: any): any {
  return shapeRect(element);
}

function buildEllipse(element: any): any {
  return shapeEllipse(element);
}

function buildStar(element: any): any {
  return shapeStar(element);
}

function buildShape(element: any): any {
  return shapeShape(element);
}

function buildFill(element: any): any {
  return shapeFill(element);
}

function buildStroke(element: any): any {
  return shapeStroke(element);
}

function buildGradientFill(element: any): any {
  return shapeGradientFill(element);
}

function buildGradientStroke(element: any): any {
  return shapeGradientStroke(element);
}

function buildMergePaths(element: any): any {
  return shapeMergePaths(element);
}

function buildRepeater(element: any): any {
  return shapeRepeater(element);
}

function buildRoundCorners(element: any): any {
  return roundCorners(element);
}

function buildPuckerAndBloat(element: any): any {
  return puckerAndBloat(element);
}

function buildTrimPaths(element: any): any {
  return trimPaths(element);
}

function buildUnhandled(element: any): any {
  return shapeUnhandled(element);
}

const builders: { [key: string]: (element: any) => any } = {};
builders[shapeTypes.shape] = buildShape;
builders[shapeTypes.rect] = buildRect;
builders[shapeTypes.ellipse] = buildEllipse;
builders[shapeTypes.stroke] = buildStroke;
builders[shapeTypes.fill] = buildFill;
builders[shapeTypes.group] = buildGroup;
builders[shapeTypes.repeater] = buildRepeater;
builders[shapeTypes.star] = buildStar;
builders[shapeTypes.gfill] = buildGradientFill;
builders[shapeTypes.gStroke] = buildGradientStroke;
builders[shapeTypes.merge] = buildMergePaths;
builders[shapeTypes.roundedCorners] = buildRoundCorners;
builders[shapeTypes.puckerAndBloat] = buildPuckerAndBloat;
builders[shapeTypes.trim] = buildTrimPaths;

function processShape(element: any): any {
  const shapeType = getShapeType(element.matchName);
  if (builders[shapeType]) {
    return builders[shapeType](element);
  } else {
    return buildUnhandled(element);
  }
}

export const bm_shapeReportHelper = {
  processShape: processShape,
};
