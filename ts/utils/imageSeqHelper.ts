let bm_sourceHelper: any;

function getSourceHelper(): any {
  if (!bm_sourceHelper) {
    bm_sourceHelper = $.__bodymovin.bm_sourceHelper;
  }
  return bm_sourceHelper;
}

function exportStills(layerInfo: any, layerOb: any, frameRate: number): void {
  const layerTypes = $.__bodymovin.layerTypes;
  const sourceHelper = getSourceHelper();
  layerOb.w = layerInfo.width;
  layerOb.h = layerInfo.height;
  layerOb.ty = layerTypes.precomp;
  if (layerOb.compId) {
    const totalFrames = Math.round(layerInfo.source.duration / layerInfo.source.frameDuration);
    const sequenceIds = sourceHelper.addImageSequenceStills(layerInfo, totalFrames);
    let i: number;
    const layers: any[] = [];
    for (i = 0; i < totalFrames; i += 1) {

      const duration = i === totalFrames - 1 ? 2 : 1;

      layers.push({
        ty: layerTypes.still,
        sc: "#00ffff",
        refId: sequenceIds[i],
        ks: {
          p: { a: 0, k: [0, 0] },
          a: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] },
          r: { a: 0, k: [0] },
          o: { a: 0, k: [100] },
        },
        ip: Math.round(1000 * i / 1) / 1000,
        st: Math.round(1000 * i / 1) / 1000,
        op: Math.round(1000 * (i + duration) / 1) / 1000,
        sr: 1,
        bm: 0,
      });
    }
    layerOb.layers = layers;
  }
}

export const bm_imageSeqHelper = {
  exportStills: exportStills,
};
