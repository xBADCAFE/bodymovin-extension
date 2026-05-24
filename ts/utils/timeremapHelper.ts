export function exportTimeremap(layerInfo: any, layerData: any, frameRate: number, stretch?: any): void {
  var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  if (layerInfo.canSetTimeRemapEnabled && layerInfo.timeRemapEnabled) {
    var stretch = layerData.sr;
    layerData.tm = bm_keyframeHelper.exportKeyframes(layerInfo['Time Remap'], frameRate, stretch);
  }
}

export const bm_timeremapHelper = { exportTimeremap };
