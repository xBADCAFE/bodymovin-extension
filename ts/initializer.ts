$.__bodymovin = { esprima: {} };


if (!(Function.prototype as any).bm_bind) (function () {
  const slice = Array.prototype.slice;
  (Function.prototype as any).bm_bind = function (this: any) {
    const thatFunc = this;
    const thatArg = arguments[0];
    const args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      throw new TypeError('Function.prototype.bm_bind - ' +
        'what is trying to be bound is not callable');
    }
    return function (this: any) {
      const funcArgs = args.concat(slice.call(arguments));
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();

// $.evalFile calls removed — handled by rollup bundle
(function () {
})();

const globalVariables = ['bm_eventDispatcher', 'bm_generalUtils', 'bm_expressionHelper', 'esprima', 'escodegen'
  , 'bez', 'PropertyFactory', 'bm_keyframeHelper', 'bm_transformHelper', 'bm_maskHelper', 'bm_timeremapHelper'
  , 'bm_effectsHelper', 'bm_layerStylesHelper', 'bm_cameraHelper', 'bm_XMPHelper', 'bm_ProjectHelper', 'bm_markerHelper'
  , 'bm_textHelper', 'bm_boundingBox', 'bm_layerElement', 'bm_projectManager', 'bm_compsManager', 'bm_dataManager'
  , 'bm_renderManager', 'bm_downloadManager', 'bm_sourceHelper', 'bm_shapeHelper', 'bm_textAnimatorHelper'
  , 'bm_textShapeHelper', 'bm_essentialPropertiesHelper', 'bm_settingsHelper'];
let i: number;
const len = globalVariables.length;
for (i = 0; i < len; i += 1) {
  if ((this as any)[globalVariables[i]]) {
    (this as any)[globalVariables[i]] = null;
    delete (this as any)[globalVariables[i]];
  } else {
  }
}
