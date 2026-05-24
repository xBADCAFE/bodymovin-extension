function createSolidReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_solidLayerReport(layer, onComplete, onFail);
}

function createNullReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_nullLayerReport(layer, onComplete, onFail);
}

function createImageReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_imageLayerReport(layer, onComplete, onFail);
}

function createImageSequenceReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_imageSequenceLayerReport(layer, onComplete, onFail);
}

function createCameraReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_cameraLayerReport(layer, onComplete, onFail);
}

function createAudioReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_audioLayerReport(layer, onComplete, onFail);
}

function createCompositionReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_compositionLayerReport(layer, onComplete, onFail);
}

function createShapeReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_shapeLayerReport(layer, onComplete, onFail);
}

function createTextLayerReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_textLayerReport(layer, onComplete, onFail);
}

function createAdjustmentLayerReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_adjustmentLayerReport(layer, onComplete, onFail);
}

function createLightLayerReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_lightLayerReport(layer, onComplete, onFail);
}

function createUnhandledLayerReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_unhandledLayerReport(layer, onComplete, onFail);
}

function createFailedLayerReport(layer: any, onComplete: any, onFail: any): any {
  return $.__bodymovin.bm_failedLayerReport(layer, onComplete, onFail);
}

function createLayer(layer: any, onComplete: any, onFail: any): any {
  const getLayerType = $.__bodymovin.getLayerType;
  const layerTypes = $.__bodymovin.layerTypes;
  const layerType = getLayerType(layer);
  if (layerType === layerTypes.solid) {
    return createSolidReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.precomp) {
    return createCompositionReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.shape) {
    return createShapeReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.text) {
    return createTextLayerReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.nullLayer) {
    return createNullReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.still) {
    return createImageReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.imageSeq) {
    return createImageSequenceReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.camera) {
    return createCameraReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.audio) {
    return createAudioReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.adjustment) {
    return createAdjustmentLayerReport(layer, onComplete, onFail);
  } else if (layerType === layerTypes.light) {
    return createLightLayerReport(layer, onComplete, onFail);
  } else {
    return createUnhandledLayerReport(layer, onComplete, onFail);
  }
}

function createFailedLayer(layer: any, onComplete: any, onFail: any): any {
  return createFailedLayerReport(layer, onComplete, onFail);
}

export const bm_layerReportHelper = {
  createLayer: createLayer,
  createFailedLayer: createFailedLayer,
};
