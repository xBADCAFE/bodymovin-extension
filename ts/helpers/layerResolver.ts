function avLayerType(lObj: any): any {
  const layerTypes = $.__bodymovin.layerTypes;
  const lSource = lObj.source;
  if (lSource instanceof CompItem) {
    return layerTypes.precomp;
  }
  const lMainSource = lSource.mainSource;
  if (!lObj.hasVideo) {
    if (lObj.hasAudio) {
      return layerTypes.audio;
    } else {
      return layerTypes.data;
    }
  } else if (lSource instanceof CompItem) {
    return layerTypes.precomp;
  } else if (lSource.frameDuration < 1) {
    if (lMainSource instanceof PlaceholderSource) {
      return layerTypes.pholderVideo;
    } else if (lSource.name.toString().indexOf("].") !== -1) {
      return layerTypes.imageSeq;
    } else {
      if (lMainSource.isStill) {
        return layerTypes.still;
      } else {
        return layerTypes.video;
      }
    }
  } else if (lSource.frameDuration === 1) {
    if (lMainSource instanceof PlaceholderSource) {
      return layerTypes.pholderStill;
    } else if (lMainSource.color) {
      return layerTypes.solid;
    } else {
      return layerTypes.still;
    }
  }
}

export function getLayerType(layerOb: any): any {
  const layerTypes = $.__bodymovin.layerTypes;
  try {
    let curLayer: any, instanceOfArray: any[], instanceOfArrayLength: number, result: any;
    curLayer = layerOb;
    instanceOfArray = [AVLayer, CameraLayer, LightLayer, ShapeLayer, TextLayer];
    instanceOfArrayLength = instanceOfArray.length;
    if (curLayer.adjustmentLayer) {
      return layerTypes.adjustment;
    } else if (curLayer.nullLayer) {
      return layerTypes.nullLayer;
    }
    let i: number;
    for (i = 0; i < instanceOfArrayLength; i++) {
      if (curLayer instanceof instanceOfArray[i]) {
        result = instanceOfArray[i].name;
        break;
      }
    }
    if (result === "AVLayer") {
      result = avLayerType(curLayer);
    } else if (result === "CameraLayer") {
      result = layerTypes.camera;
    } else if (result === "LightLayer") {
      result = layerTypes.light;
    } else if (result === "ShapeLayer") {
      result = layerTypes.shape;
    } else if (result === "TextLayer") {
      result = layerTypes.text;
    }
    return result;
  } catch (err) {
    const e = err as any;
    alert(e.line.toString + " " + e.toString());
  }
}
