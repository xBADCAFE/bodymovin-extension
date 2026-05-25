import { bm_lottieImporter } from '../lottieImporter';
import { getFrameRate } from './frameRateHelper';

function formatProperty(property: any): any {
  if (Array.isArray(property) && typeof property[0] === 'object' && property[0] && 'i' in property[0]) {
    return property[0];
  }
  return property;
}

function addKeyframes(keyframes: any[], propertyName: string, elementId: string): void {
  keyframes.forEach(function (keyframe: any, index: number) {
    var value = 's' in keyframe ? keyframe.s : keyframes[index - 1].e;
    bm_lottieImporter.setElementKey(
      propertyName,
      keyframe.t,
      formatProperty(value),
      elementId
    );
  });
  var inSpeeds: any[] = [];
  var inInfluences: any[] = [];
  var outSpeeds: any[] = [];
  var outInfluences: any[] = [];

  var totalDimensions = keyframes[0].i
    ? (Array.isArray(keyframes[0].i.x) ? keyframes[0].i.x.length : 1)
    : keyframes[0].s.length;

  keyframes.forEach(function (keyframe: any, index: number) {
    if (keyframe.i && keyframe.o && index < keyframes.length - 1) {
      outSpeeds[index] = [];
      outInfluences[index] = [];
      inSpeeds[index + 1] = [];
      inInfluences[index + 1] = [];
      var inX = Array.isArray(keyframe.i.x) ? keyframe.i.x : [keyframe.i.x];
      inX.forEach(function (_arrayElement: any, dimension: number) {
        var nextValue = 'e' in keyframe ? keyframe.e : keyframes[index + 1].s;
        var inXDimension = Array.isArray(keyframe.i.x) ? keyframe.i.x[dimension] : keyframe.i.x;
        var inYDimension = Array.isArray(keyframe.i.y) ? keyframe.i.y[dimension] : keyframe.i.y;
        var outXDimension = Array.isArray(keyframe.o.x) ? keyframe.o.x[dimension] : keyframe.o.x;
        var outYDimension = Array.isArray(keyframe.o.y) ? keyframe.o.y[dimension] : keyframe.o.y;
        var nextKeyframe = keyframes[index + 1];
        var keyInInfluence = (inXDimension - 1) * -100;
        var lastKeyOutInfluence = (outXDimension) * 100;
        var duration = (nextKeyframe.t - keyframe.t) / getFrameRate();
        var yNormal = nextValue[dimension] - keyframe.s[dimension];

        var bezierInY = -(inYDimension - 1) * yNormal / duration;
        var bezierY = outYDimension * yNormal / duration;

        var lastKeyOutSpeed = bezierY / lastKeyOutInfluence * 100;
        var keyInSpeed = bezierInY / keyInInfluence * 100;
        outSpeeds[index].push(lastKeyOutSpeed);
        outInfluences[index].push(lastKeyOutInfluence);
        inSpeeds[index + 1].push(keyInSpeed);
        inInfluences[index + 1].push(keyInInfluence);
      });
    }
  });

  var fillingArray: number[] = [];
  var f: number;
  for (f = 0; f < totalDimensions; f += 1) {
    fillingArray.push(1);
  }
  inSpeeds[0] = fillingArray;
  inInfluences[0] = fillingArray;
  outSpeeds.push(fillingArray);
  outInfluences.push(fillingArray);

  inSpeeds.forEach(function (_easing: any, index: number) {
    bm_lottieImporter.setElementTemporalKeyAtIndex(
      propertyName,
      index + 1,
      inInfluences[index],
      inSpeeds[index],
      outInfluences[index],
      outSpeeds[index],
      elementId
    );
  });

  keyframes.forEach(function (keyframe: any, index: number) {
    if (keyframe.h) {
      bm_lottieImporter.setInterpolationTypeAtKey(
        propertyName,
        index + 1,
        elementId,
        3
      );
    }

    if (keyframe.to || (index > 0 && keyframes[index - 1].to)) {
      var outTangents = (index === keyframes.length - 1)
        ? keyframes[index - 1].to.map(function (_value: any) { return 0; })
        : keyframe.to;
      var inTangents = (index === 0)
        ? keyframe.ti.map(function (_value: any) { return 0; })
        : keyframes[index - 1].ti;
      bm_lottieImporter.setSpatialTangentsAtKey(
        propertyName,
        index + 1,
        inTangents,
        outTangents,
        elementId
      );
    }
  });
}

function formatExpression(expression: string): string {
  expression = expression
    .replace(/\$bm_sum/g, 'add')
    .replace(/\$bm_sub/g, 'sub')
    .replace(/\$bm_mul/g, 'mul')
    .replace(/\$bm_div/g, 'div')
    .replace(/\$bm_mod/g, 'mod')
    .replace(/ sum\(/g, ' add(');
  return encodeURIComponent(expression);
}

export function processProperty(propertyName: string, propertyData: any, elementId: string, defaultValue?: any): void {
  if (typeof propertyData === 'number' || typeof propertyData === 'string') {
    bm_lottieImporter.setElementPropertyValue(propertyName, propertyData, elementId);
  } else if (propertyData) {
    if ('k' in propertyData) {
      if (typeof propertyData.k === 'number' || !Array.isArray(propertyData.k)) {
        if (defaultValue !== propertyData.k) {
          bm_lottieImporter.setElementPropertyValue(propertyName, formatProperty(propertyData.k), elementId);
        }
      } else if (Array.isArray(propertyData.k) && typeof propertyData.k[0] === 'number') {
        var differentIndex = propertyData.k.findIndex(function (value: any, index: number) {
          return defaultValue === undefined || defaultValue[index] !== value;
        });
        if (differentIndex !== -1) {
          bm_lottieImporter.setElementPropertyValue(propertyName, propertyData.k, elementId);
        }
      } else {
        addKeyframes(propertyData.k, propertyName, elementId);
      }
    }
    if ('x' in propertyData) {
      bm_lottieImporter.setElementPropertyExpression(propertyName, formatExpression(propertyData.x), elementId);
    }
  }
}

export default processProperty;
