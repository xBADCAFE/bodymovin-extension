export function exportMasks(layerInfo: any, layerData: any, frameRate: number): void {
  var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  var settingsHelper = $.__bodymovin.bm_settingsHelper;
  var getMaskMode = $.__bodymovin.getMaskType;
  if (!(layerInfo.mask && layerInfo.mask.numProperties > 0)) {
    return;
  }
  var stretch = layerData.sr;
  layerData.hasMask = true;
  layerData.masksProperties = [];
  var masks = layerInfo.mask;
  var i: number, len: number = masks.numProperties, maskElement: any;
  for (i = 0; i < len; i += 1) {
    maskElement = masks(i + 1);
    var shapeData: any = {
      inv: maskElement.inverted,
      mode: getMaskMode(maskElement.maskMode),
    };
    shapeData.pt = bm_keyframeHelper.exportKeyframes(maskElement.property('maskShape'), frameRate, stretch);
    $.__bodymovin.bm_shapeHelper.checkVertexCount(shapeData.pt.k);
    shapeData.o = bm_keyframeHelper.exportKeyframes(maskElement.property('Mask Opacity'), frameRate, stretch);
    shapeData.x = bm_keyframeHelper.exportKeyframes(maskElement.property('Mask Expansion'), frameRate, stretch);
    if (settingsHelper.shouldIncludeNotSupportedProperties()) {
      shapeData.f = bm_keyframeHelper.exportKeyframes(maskElement.property('Mask Feather'), frameRate, stretch);
    }
    shapeData.nm = maskElement.name;
    layerData.masksProperties.push(shapeData);
  }
}

export const bm_maskHelper = { exportMasks };
