const effectTypes = {
  sliderControl: 0,
  angleControl: 1,
  colorControl: 2,
  pointControl: 3,
  checkboxControl: 4,
  group: 5,
  noValue: 6,
  dropDownControl: 7,
  customValue: 9,
  layerIndex: 10,
  maskIndex: 11,
  tint: 20,
  fill: 21,
  stroke: 22,
  tritone: 23,
  proLevels: 24,
  dropShadow: 25,
  radialWipe: 26,
  displacementMap: 27,
  matte3: 28,
  gaussianBlur2: 29,
  twirl: 30,
  mesh_warp: 31,
  ripple: 32,
  spherize: 33,
  freePin3: 34,
  geometry2: 35,
};

function getEffectType(name: string): number {
  switch (name) {
    case 'ADBE Tint':
      return effectTypes.tint;
    case 'ADBE Fill':
      return effectTypes.fill;
    case 'ADBE Stroke':
      return effectTypes.stroke;
    case 'ADBE Tritone':
      return effectTypes.tritone;
    case 'ADBE Pro Levels2':
      return effectTypes.proLevels;
    case 'ADBE Drop Shadow':
      return effectTypes.dropShadow;
    case 'ADBE Radial Wipe':
      return effectTypes.radialWipe;
    case 'ADBE Displacement Map':
      return effectTypes.displacementMap;
    case 'ADBE Set Matte3':
      return effectTypes.matte3;
    case 'ADBE Gaussian Blur 2':
      return effectTypes.gaussianBlur2;
    case 'ADBE Twirl':
      return effectTypes.twirl;
    case 'ADBE MESH WARP':
      return effectTypes.mesh_warp;
    case 'ADBE Ripple':
      return effectTypes.ripple;
    case 'ADBE Spherize':
      return effectTypes.spherize;
    case 'ADBE FreePin3':
      return effectTypes.freePin3;
    case 'ADBE Geometry2':
      return effectTypes.geometry2;
    default:
      return effectTypes.group;
  }
}

function findEffectPropertyType(prop: any): number {
  const propertyValueType = prop.propertyValueType;
  if (propertyValueType === PropertyValueType.NO_VALUE) {
    return effectTypes.noValue;
  } else if (propertyValueType === PropertyValueType.OneD) {
    if (!prop.isInterpolationTypeValid(KeyframeInterpolationType.LINEAR)) {
      return effectTypes.dropDownControl;
    }
    return effectTypes.sliderControl;
  } else if (propertyValueType === PropertyValueType.COLOR) {
    return effectTypes.colorControl;
  } else if (propertyValueType === PropertyValueType.CUSTOM_VALUE) {
    return effectTypes.customValue;
  } else if (propertyValueType === PropertyValueType.LAYER_INDEX) {
    return effectTypes.layerIndex;
  } else if (propertyValueType === PropertyValueType.MASK_INDEX) {
    return effectTypes.maskIndex;
  } else {
    return effectTypes.pointControl;
  }
}

function setupBasicEffect(elem: any, effectType: number, matchName: string): any {
  const ob: any = {};
  ob.ty = effectType;
  ob.nm = elem.name;
  ob.np = elem.numProperties + 1;
  ob.mn = matchName;
  ob.ix = elem.propertyIndex;
  ob.en = elem.enabled === true ? 1 : 0;
  ob.ef = [];
  return ob;
}

function exportNoValueControl(effect: any, frameRate: number, stretch: number): any {
  const ob: any = {};
  ob.ty = effectTypes.noValue;
  ob.nm = effect.name;
  ob.mn = effect.matchName;
  ob.ix = effect.propertyIndex;
  ob.v = 0;
  return ob;
}

function exportSliderControl(effect: any, frameRate: number, stretch: number): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.ty = effectTypes.sliderControl;
  ob.nm = effect.name;
  ob.mn = effect.matchName;
  ob.ix = effect.propertyIndex;
  ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
  return ob;
}

function exportColorControl(effect: any, frameRate: number, stretch: number): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.ty = effectTypes.colorControl;
  ob.nm = effect.name;
  ob.mn = effect.matchName;
  ob.ix = effect.propertyIndex;
  ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
  return ob;
}

function exportPointControl(effect: any, frameRate: number, stretch: number): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.ty = effectTypes.pointControl;
  ob.nm = effect.name;
  ob.mn = effect.matchName;
  ob.ix = effect.propertyIndex;
  ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
  return ob;
}

function exportDropDownControl(effect: any, frameRate: number, stretch: number): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.ty = effectTypes.dropDownControl;
  ob.nm = effect.name;
  ob.mn = effect.matchName;
  ob.ix = effect.propertyIndex;
  ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
  return ob;
}

function exportLayerIndexControl(effect: any, frameRate: number, stretch: number): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  ob.ty = effectTypes.layerIndex;
  ob.nm = effect.name;
  ob.mn = effect.matchName;
  ob.ix = effect.propertyIndex;
  ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
  return ob;
}

function exportMaskIndexControl(effect: any, frameRate: number, stretch: number): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  const ob: any = {};
  // TODO: fix original bug once testing — emits ty: layerIndex (10) instead of maskIndex (11). Preserved verbatim from bundle/jsx/utils/effectsHelper.jsx.
  ob.ty = effectTypes.layerIndex;
  ob.nm = effect.name;
  ob.mn = effect.matchName;
  ob.ix = effect.propertyIndex;
  ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
  return ob;
}

function exportCustomControl(effect: any, frameRate: number, stretch?: number): any {
  const ob: any = {};
  return ob;
}

function setChannelDropdownToValue(elem: any, value: number): void {
  const firstProp = elem.property(1);
  if (firstProp.value !== value) {
    firstProp.setValue(value);
  }
}

function refreshChannelDropdownValue(elem: any): void {
  elem.selected = true;
  const firstProp = elem.property(1);
  const value_2 = firstProp.value;
  firstProp.setValue(value_2);
}

function setChannelDropdownToFirst(elem: any): void {
  setChannelDropdownToValue(elem, 1);
}

function handleProLevels(elem: any): void {
  elem.selected = true;
  setChannelDropdownToFirst(elem);
}

function handleEasyLevels(elem: any, ob: any, frameRate: number, stretch: number): any {
  const bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  elem.selected = true;
  ob.ty = effectTypes.proLevels;
  setChannelDropdownToValue(elem, 1);
  ob.ef.push({
    "ty": 7,
    "nm": "Channel:",
    "mn": "ADBE Pro Levels2-0001",
    "ix": 1,
    "v": {
      "a": 0,
      "k": 1,
      "ix": 1
    }
  });
  ob.ef.push({});
  ob.ef.push({
    "ty": 6,
    "nm": "RGB",
    "mn": "ADBE Pro Levels2-0003",
    "ix": 3,
    "v": 0
  });
  let prop = elem.property(3);
  ob.ef.push({
    "ty": 0,
    "nm": "Input Black",
    "mn": "ADBE Pro Levels2-0004",
    "ix": 4,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(4);
  ob.ef.push({
    "ty": 0,
    "nm": "Input White",
    "mn": "ADBE Pro Levels2-0005",
    "ix": 5,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(5);
  ob.ef.push({
    "ty": 0,
    "nm": "Gamma",
    "mn": "ADBE Pro Levels2-0006",
    "ix": 6,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(6);
  ob.ef.push({
    "ty": 0,
    "nm": "Output Black",
    "mn": "ADBE Pro Levels2-0007",
    "ix": 7,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(7);
  ob.ef.push({
    "ty": 0,
    "nm": "Output White",
    "mn": "ADBE Pro Levels2-0008",
    "ix": 8,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  ob.ef.push({
    "ty": 6,
    "nm": "RGB",
    "mn": "ADBE Pro Levels2-0009",
    "ix": 9,
    "v": 0
  });
  ob.ef.push({
    "ty": 6,
    "nm": "Red",
    "mn": "ADBE Pro Levels2-0010",
    "ix": 10,
    "v": 0
  });
  setChannelDropdownToValue(elem, 2);
  prop = elem.property(3);
  ob.ef.push({
    "ty": 0,
    "nm": "Red Input Black",
    "mn": "ADBE Pro Levels2-0011",
    "ix": 11,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(4);
  ob.ef.push({
    "ty": 0,
    "nm": "Red Input White",
    "mn": "ADBE Pro Levels2-0012",
    "ix": 12,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(5);
  ob.ef.push({
    "ty": 0,
    "nm": "Red Gamma",
    "mn": "ADBE Pro Levels2-0013",
    "ix": 13,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(6);
  ob.ef.push({
    "ty": 0,
    "nm": "Red Output Black",
    "mn": "ADBE Pro Levels2-0014",
    "ix": 14,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(7);
  ob.ef.push({
    "ty": 0,
    "nm": "Red Output White",
    "mn": "ADBE Pro Levels2-0015",
    "ix": 15,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  ob.ef.push({
    "ty": 6,
    "nm": "Red",
    "mn": "ADBE Pro Levels2-0016",
    "ix": 16,
    "v": 0
  });
  ob.ef.push({
    "ty": 6,
    "nm": "Green",
    "mn": "ADBE Pro Levels2-0017",
    "ix": 17,
    "v": 0
  });
  setChannelDropdownToValue(elem, 3);
  prop = elem.property(3);
  ob.ef.push({
    "ty": 0,
    "nm": "Green Input Black",
    "mn": "ADBE Pro Levels2-0018",
    "ix": 18,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(4);
  ob.ef.push({
    "ty": 0,
    "nm": "Green Input White",
    "mn": "ADBE Pro Levels2-0019",
    "ix": 19,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(5);
  ob.ef.push({
    "ty": 0,
    "nm": "Green Gamma",
    "mn": "ADBE Pro Levels2-0020",
    "ix": 20,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(6);
  ob.ef.push({
    "ty": 0,
    "nm": "Green Output Black",
    "mn": "ADBE Pro Levels2-0021",
    "ix": 21,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(7);
  ob.ef.push({
    "ty": 0,
    "nm": "Green Output White",
    "mn": "ADBE Pro Levels2-0022",
    "ix": 22,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  ob.ef.push({
    "ty": 6,
    "nm": "Green",
    "mn": "ADBE Pro Levels2-0023",
    "ix": 23,
    "v": 0
  });
  ob.ef.push({
    "ty": 6,
    "nm": "Blue",
    "mn": "ADBE Pro Levels2-0024",
    "ix": 24,
    "v": 0
  });
  setChannelDropdownToValue(elem, 4);
  prop = elem.property(3);
  ob.ef.push({
    "ty": 0,
    "nm": "Blue Input Black",
    "mn": "ADBE Pro Levels2-0025",
    "ix": 25,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(4);
  ob.ef.push({
    "ty": 0,
    "nm": "Blue Input White",
    "mn": "ADBE Pro Levels2-0026",
    "ix": 26,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(5);
  ob.ef.push({
    "ty": 0,
    "nm": "Blue Gamma",
    "mn": "ADBE Pro Levels2-0027",
    "ix": 27,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(6);
  ob.ef.push({
    "ty": 0,
    "nm": "Blue Output Black",
    "mn": "ADBE Pro Levels2-0028",
    "ix": 28,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(7);
  ob.ef.push({
    "ty": 0,
    "nm": "Blue Output White",
    "mn": "ADBE Pro Levels2-0029",
    "ix": 29,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  ob.ef.push({
    "ty": 6,
    "nm": "Blue",
    "mn": "ADBE Pro Levels2-0030",
    "ix": 30,
    "v": 0
  });
  ob.ef.push({
    "ty": 6,
    "nm": "Alpha",
    "mn": "ADBE Pro Levels2-0031",
    "ix": 31,
    "v": 0
  });
  setChannelDropdownToValue(elem, 5);
  prop = elem.property(3);
  ob.ef.push({
    "ty": 0,
    "nm": "Alpha Input Black",
    "mn": "ADBE Pro Levels2-0032",
    "ix": 32,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(4);
  ob.ef.push({
    "ty": 0,
    "nm": "Alpha Input White",
    "mn": "ADBE Pro Levels2-0033",
    "ix": 33,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(5);
  ob.ef.push({
    "ty": 0,
    "nm": "Alpha Gamma",
    "mn": "ADBE Pro Levels2-0034",
    "ix": 34,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(6);
  ob.ef.push({
    "ty": 0,
    "nm": "Alpha Output Black",
    "mn": "ADBE Pro Levels2-0035",
    "ix": 35,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(7);
  ob.ef.push({
    "ty": 0,
    "nm": "Alpha Output White",
    "mn": "ADBE Pro Levels2-0036",
    "ix": 36,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  ob.ef.push({
    "ty": 6,
    "nm": "Alpha",
    "mn": "ADBE Pro Levels2-0037",
    "ix": 37,
    "v": 0
  });
  prop = elem.property(8);
  ob.ef.push({
    "ty": 7,
    "nm": "Clip To Output Black",
    "mn": "ADBE Pro Levels2-0038",
    "ix": 38,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  prop = elem.property(9);
  ob.ef.push({
    "ty": 7,
    "nm": "Clip To Output White",
    "mn": "ADBE Pro Levels2-0039",
    "ix": 39,
    "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
  });
  return ob;
}

function handleHueSaturation(elem: any): void {
  refreshChannelDropdownValue(elem);
}

function exportCustomEffect(elem: any, effectType: any, frameRate: number, stretch: number): any {
  const annotationsManager = $.__bodymovin.bm_annotationsManager;
  if (effectType === effectTypes.proLevels) {
    handleProLevels(elem);
  }
  if (elem.matchName === 'ADBE Easy Levels2') {
    const ob = setupBasicEffect(elem, effectType, 'ADBE Pro Levels2');
    return handleEasyLevels(elem, ob, frameRate, stretch);
  }

  const ob = setupBasicEffect(elem, effectType, elem.matchName);
  if (elem.matchName === 'ADBE HUE SATURATION') {
    handleHueSaturation(elem);
  }
  let i: number;
  const len = elem.numProperties;
  let prop: any;
  for (i = 0; i < len; i += 1) {
    prop = elem.property(i + 1);
    if (annotationsManager.isAnnotation(prop.matchName)) {
    } else if (prop.matchName === "ADBE FreePin3 ARAP Group"
      || prop.matchName === "ADBE FreePin3 Mesh Group"
      || prop.matchName === "ADBE FreePin3 Mesh Atom"
      || prop.matchName === "ADBE FreePin3 PosPins"
      || prop.matchName === "ADBE FreePin3 StarchPins"
      || prop.matchName === "ADBE FreePin3 HghtPins"
      || prop.matchName === "ADBE FreePin3 PosPin Atom") {
      ob.ef.push(exportCustomEffect(prop, '', frameRate, stretch));
    } else if (prop.propertyType === PropertyType.PROPERTY) {
      const type = findEffectPropertyType(prop);
      if (type === effectTypes.noValue) {
        ob.ef.push(exportNoValueControl(prop, frameRate, stretch));
      } else if (type === effectTypes.sliderControl) {
        ob.ef.push(exportSliderControl(prop, frameRate, stretch));
      } else if (type === effectTypes.colorControl) {
        ob.ef.push(exportColorControl(prop, frameRate, stretch));
      } else if (type === effectTypes.dropDownControl) {
        ob.ef.push(exportDropDownControl(prop, frameRate, stretch));
        // TODO: fix original bug once testing — duplicate dropDownControl branch; second condition was likely intended to be angleControl or checkboxControl. Preserved verbatim from bundle/jsx/utils/effectsHelper.jsx.
      } else if (type === effectTypes.dropDownControl) {
        ob.ef.push(exportDropDownControl(prop, frameRate, stretch));
      } else if (type === effectTypes.customValue) {
        ob.ef.push(exportCustomControl(prop, frameRate, stretch));
      } else if (type === effectTypes.layerIndex) {
        ob.ef.push(exportLayerIndexControl(prop, frameRate, stretch));
      } else if (type === effectTypes.maskIndex) {
        ob.ef.push(exportMaskIndexControl(prop, frameRate, stretch));
      } else {
        ob.ef.push(exportPointControl(prop, frameRate, stretch));
      }
    } else {
      if (prop.name !== 'Compositing Options' && prop.matchName !== 'ADBE Effect Built In Params' && prop.propertyType !== PropertyType.NAMED_GROUP) {
        ob.ef.push(exportCustomEffect(prop, '', frameRate, stretch));
      } else {
      }
    }
  }
  return ob;
}

function exportEffects(layerInfo: any, layerData: any, frameRate: number, includeHiddenData: boolean): void {
  const annotationsManager = $.__bodymovin.bm_annotationsManager;
  const stretch = layerData.sr;
  if (!(layerInfo.effect && layerInfo.effect.numProperties > 0)) {
    return;
  }
  const effects = layerInfo.effect;

  let i: number;
  const len = effects.numProperties;
  let effectElement: any;
  const effectsArray: any[] = [];
  const annotationsArray: any[] = [];
  for (i = 0; i < len; i += 1) {
    effectElement = effects(i + 1);
    if (effectElement.enabled || includeHiddenData) {
      if (annotationsManager.isAnnotation(effectElement.matchName)) {
        continue;
      }
      const effectType = getEffectType(effectElement.matchName);
      effectsArray.push(exportCustomEffect(effectElement, effectType, frameRate, stretch));
    }
  }
  if (effectsArray.length) {
    layerData.ef = effectsArray;
  }
  if (annotationsArray.length) {
    layerData.annots = annotationsArray;
  }
}

export const bm_effectsHelper = {
  exportEffects: exportEffects,
};
