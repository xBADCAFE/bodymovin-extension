export function exportAudio(layerInfo: any, data: any, frameRate: number): void {
  var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
  var settingsHelper = $.__bodymovin.bm_settingsHelper;
  if (!settingsHelper.shouldRasterizeWaveform()) {
    var stretch = data.sr;
    var audioProperty = layerInfo.property('Audio');
    data.au = {
      lv: bm_keyframeHelper.exportKeyframes(audioProperty.property('Audio Levels'), frameRate, stretch),
    };
  }
}

export const bm_audioHelper = { exportAudio };
