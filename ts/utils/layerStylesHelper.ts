function exportStroke(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.c = bm_keyframeHelper.exportKeyframes(style.property('frameFX/color'), frameRate, stretch);
  ob.s = bm_keyframeHelper.exportKeyframes(style.property('frameFX/size'), frameRate, stretch);
  return ob;
}

function exportDropShadow(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.c = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/color'), frameRate, stretch);
  ob.o = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/opacity'), frameRate, stretch);
  ob.a = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/localLightingAngle'), frameRate, stretch);
  ob.s = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/blur'), frameRate, stretch);
  ob.d = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/distance'), frameRate, stretch);
  ob.ch = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/chokeMatte'), frameRate, stretch);
  ob.bm = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/mode2'), frameRate, stretch);
  ob.no = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/noise'), frameRate, stretch);
  ob.lc = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/layerConceals'), frameRate, stretch);
  return ob;
}

function exportInnerShadow(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.c = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/color'), frameRate, stretch);
  ob.o = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/opacity'), frameRate, stretch);
  ob.a = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/localLightingAngle'), frameRate, stretch);
  ob.s = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/blur'), frameRate, stretch);
  ob.d = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/distance'), frameRate, stretch);
  ob.ch = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/chokeMatte'), frameRate, stretch);
  ob.bm = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/mode2'), frameRate, stretch);
  ob.no = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/noise'), frameRate, stretch);
  return ob;
}

function exportOuterGlow(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.c = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/color'), frameRate, stretch);
  ob.o = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/opacity'), frameRate, stretch);
  ob.s = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/blur'), frameRate, stretch);
  ob.r = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/inputRange'), frameRate, stretch);
  ob.ch = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/chokeMatte'), frameRate, stretch);
  ob.bm = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/mode2'), frameRate, stretch);
  ob.no = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/noise'), frameRate, stretch);
  ob.j = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/shadingNoise'), frameRate, stretch);
  return ob;
}

function exportInnerGlow(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.c = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/color'), frameRate, stretch);
  ob.o = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/opacity'), frameRate, stretch);
  ob.s = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/blur'), frameRate, stretch);
  ob.r = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/inputRange'), frameRate, stretch);
  ob.sr = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/innerGlowSource'), frameRate, stretch);
  ob.ch = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/chokeMatte'), frameRate, stretch);
  ob.bm = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/mode2'), frameRate, stretch);
  ob.no = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/noise'), frameRate, stretch);
  ob.j = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/shadingNoise'), frameRate, stretch);
  return ob;
}

function exportBevelEmboss(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  $.__bodymovin.bm_generalUtils.iterateProperty(style);
  ob.bs = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/bevelStyle'), frameRate, stretch);
  ob.bt = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/bevelTechnique'), frameRate, stretch);
  ob.sr = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/strengthRatio'), frameRate, stretch);
  ob.bd = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/bevelDirection'), frameRate, stretch);
  ob.s = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/blur'), frameRate, stretch);
  ob.sf = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/softness'), frameRate, stretch);
  ob.ga = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/useGlobalAngle'), frameRate, stretch);
  ob.a = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/localLightingAngle'), frameRate, stretch);
  ob.ll = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/localLightingAltitude'), frameRate, stretch);
  ob.hm = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/highlightMode'), frameRate, stretch);
  ob.hc = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/highlightColor'), frameRate, stretch);
  ob.ho = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/highlightOpacity'), frameRate, stretch);
  ob.sm = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/shadowMode'), frameRate, stretch);
  ob.sc = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/shadowColor'), frameRate, stretch);
  ob.so = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/shadowOpacity'), frameRate, stretch);
  return ob;
}

function exportSatin(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.bm = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/mode2'), frameRate, stretch);
  ob.c = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/color'), frameRate, stretch);
  ob.o = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/opacity'), frameRate, stretch);
  ob.a = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/localLightingAngle'), frameRate, stretch);
  ob.d = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/distance'), frameRate, stretch);
  ob.s = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/blur'), frameRate, stretch);
  ob.in = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/invert'), frameRate, stretch);
  return ob;
}

function exportColorOverlay(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.bm = bm_keyframeHelper.exportKeyframes(style.property('solidFill/mode2'), frameRate, stretch);
  ob.c = bm_keyframeHelper.exportKeyframes(style.property('solidFill/color'), frameRate, stretch);
  ob.so = bm_keyframeHelper.exportKeyframes(style.property('solidFill/opacity'), frameRate, stretch);
  return ob;
}

function exportGradientOverlay(style: any, frameRate: number, stretch: any): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.bm = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/mode2'), frameRate, stretch);
  ob.o = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/opacity'), frameRate, stretch);
  ob.gf = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/gradient'), frameRate, stretch);
  ob.gs = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/gradientSmoothness'), frameRate, stretch);
  ob.a = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/angle'), frameRate, stretch);
  ob.gt = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/type'), frameRate, stretch);
  ob.re = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/reverse'), frameRate, stretch);
  ob.al = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/align'), frameRate, stretch);
  ob.s = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/scale'), frameRate, stretch);
  ob.of = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/offset'), frameRate, stretch);

  return ob;
}

function exportStyles(layerInfo: any, layerData: any, frameRate: number): void {
  const layerStyleTypes = $.__bodymovin.layerStyleTypes;
  const getStyleType = $.__bodymovin.getLayerStyleType;

  if (!(layerInfo.property('Layer Styles') && layerInfo.property('Layer Styles').numProperties > 0)) {
    return;
  }
  const stretch = layerData.sr;
  const styles = layerInfo.property('Layer Styles');
  let i: number;
  const len = styles.numProperties;
  let styleElement: any;
  const stylesArray: any[] = [];
  for (i = 0; i < len; i += 1) {
    styleElement = styles(i + 1);
    if (styleElement.enabled) {
      let styleOb: any = null;
      const styleType = getStyleType(styleElement.matchName);

      switch (styleType) {
        case layerStyleTypes.stroke:
          styleOb = exportStroke(styleElement, frameRate, stretch);
          break;
        case layerStyleTypes.dropShadow:
          styleOb = exportDropShadow(styleElement, frameRate, stretch);
          break;
        case layerStyleTypes.innerShadow:
          styleOb = exportInnerShadow(styleElement, frameRate, stretch);
          break;
        case layerStyleTypes.outerGlow:
          styleOb = exportOuterGlow(styleElement, frameRate, stretch);
          break;
        case layerStyleTypes.innerGlow:
          styleOb = exportInnerGlow(styleElement, frameRate, stretch);
          break;
        case layerStyleTypes.bevelEmboss:
          styleOb = exportBevelEmboss(styleElement, frameRate, stretch);
          break;
        case layerStyleTypes.satin:
          styleOb = exportSatin(styleElement, frameRate, stretch);
          break;
        case layerStyleTypes.colorOverlay:
          styleOb = exportColorOverlay(styleElement, frameRate, stretch);
          break;
        case layerStyleTypes.gradientOverlay:
          styleOb = exportGradientOverlay(styleElement, frameRate, stretch);
          break;
      }

      if (styleOb) {
        styleOb.ty = styleType;
        styleOb.nm = styleElement.name;

        stylesArray.push(styleOb);
      }
    }
  }
  if (stylesArray.length) {
    layerData.sy = stylesArray;
  }
}

export const bm_layerStylesHelper = {
  exportStyles: exportStyles,
};
