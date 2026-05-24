import { bm_settingsHelper as settingsHelper } from '../helpers/settingsHelper';
import { bm_eventDispatcher } from '../eventManager';
import { bm_generalUtils as generalUtils } from './generalUtils';

let expressionStr: string;
let renderingExpressions: any[] = [];
let onStart: () => void;
let onEnd: () => void;

function expressionIsValue(expression: string): boolean {
  if (expression === 'value') {
    return true;
  }
  return false;
}

export function hasExpressions(prop: any): boolean {
  return prop.expressionEnabled && !prop.expressionError;
}

export function checkExpression(prop: any, returnOb: any): void {
  if (hasExpressions(prop)) {
    if (expressionIsValue(prop.expression)) {
      return;
    }
    onStart();
    expressionStr = prop.expression;
    const objectData = {
      id: generalUtils.random(10),
      ob: returnOb,
      text: expressionStr,
    };
    bm_eventDispatcher.sendEvent('bm:expression:process', objectData);
    renderingExpressions.push(objectData);
  }
}

export function shouldBakeExpression(property: any): boolean {
  if (hasExpressions(property)) {
    if (settingsHelper.shouldBakeExpressions()
    || property.expression.indexOf("lottie:bake") !== -1) {
      return true;
    }
  }
  return false;
}

export function saveExpression(expressionData: any, id: string): void {
  let i = 0;
  const len = renderingExpressions.length;
  for (i = 0; i < len; i += 1) {
    if (renderingExpressions[i].id === id) {
      const keyframeOb = renderingExpressions[i].ob;
      if (expressionData.isStatic) {
        keyframeOb.a = 0;
        keyframeOb.k = expressionData.text;
      } else if (!expressionData.hasFailed) {
        keyframeOb.x = expressionData.text;
      }
      renderingExpressions.splice(i, 1);
      break;
    }
  }
  if (renderingExpressions.length === 0) {
    onEnd();
  }
}

export function checkReady(): boolean {
  return renderingExpressions.length === 0;
}

export function reset(): void {
  renderingExpressions = [];
}

export function setCallbacks(_onStart: () => void, _onEnd: () => void): void {
  onStart = _onStart;
  onEnd = _onEnd;
}

export const bm_expressionHelper = {
  hasExpressions,
  checkExpression,
  shouldBakeExpression,
  saveExpression,
  checkReady,
  reset,
  setCallbacks,
};
