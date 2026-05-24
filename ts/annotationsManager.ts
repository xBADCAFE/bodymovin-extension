import { getActiveComp } from './core/types';

const layers: any[] = [];
const textPropertyMatchName = 'Pseudo/Bodymovin Text Props 7';

const pseudoEffects = [
  {
    path: '/assets/annotations/bodymovin_text_props_7.ffx',
    matchName: textPropertyMatchName,
    name: 'Text Properties',
  },
  {
    path: '/assets/annotations/bodymovin_image_props.ffx',
    matchName: 'Pseudo/Bodymovin Asset Props',
    name: 'Asset Properties',
  },
];

const textAnnotationMatchNames: string[] = [
  'Pseudo/Bodymovin Text Props 4',
  'Pseudo/Bodymovin Text Props 4-0001',
  'Pseudo/Bodymovin Text Props 4-0002',
  'Pseudo/Bodymovin Text Props 4-0003',
  'Pseudo/Bodymovin Text Props 4-0004',
  'Pseudo/Bodymovin Text Props 4-0005',
  'Pseudo/Bodymovin Text Props 4-0006',
  'Pseudo/Bodymovin Text Props 5',
  'Pseudo/Bodymovin Text Props 5-0001',
  'Pseudo/Bodymovin Text Props 5-0002',
  'Pseudo/Bodymovin Text Props 5-0003',
  'Pseudo/Bodymovin Text Props 5-0004',
  'Pseudo/Bodymovin Text Props 5-0005',
  'Pseudo/Bodymovin Text Props 5-0006',
  'Pseudo/Bodymovin Text Props 6',
  'Pseudo/Bodymovin Text Props 6-0001',
  'Pseudo/Bodymovin Text Props 6-0002',
  'Pseudo/Bodymovin Text Props 6-0003',
  'Pseudo/Bodymovin Text Props 6-0004',
  'Pseudo/Bodymovin Text Props 6-0005',
  'Pseudo/Bodymovin Text Props 6-0006',
  'Pseudo/Bodymovin Text Props 6-0007',
  'Pseudo/Bodymovin Text Props 7',
  'Pseudo/Bodymovin Text Props 7-0001',
  'Pseudo/Bodymovin Text Props 7-0002',
  'Pseudo/Bodymovin Text Props 7-0003',
  'Pseudo/Bodymovin Text Props 7-0004',
  'Pseudo/Bodymovin Text Props 7-0005',
  'Pseudo/Bodymovin Text Props 7-0006',
  'Pseudo/Bodymovin Text Props 7-0007',
  'Pseudo/Bodymovin Text Props 7-0008',
];

const assetAnnotationMatchNames: string[] = [
  'Pseudo/Bodymovin Asset Props',
  'Pseudo/Bodymovin Asset Props-0001',
  'Pseudo/Bodymovin Asset Props-0002',
  'Pseudo/Bodymovin Asset Props-0003',
  'Pseudo/Bodymovin Asset Props-0004',
  'Pseudo/Bodymovin Asset Props-0005',
  'Pseudo/Bodymovin Asset Props-0006',
  'Pseudo/Bodymovin Asset Props-0007',
  'Pseudo/Bodymovin Asset Props-0008',
];

const allAnnotations = textAnnotationMatchNames.concat(assetAnnotationMatchNames);

function createLayerReference(layer: any): any {
  const bm_generalUtils = $.__bodymovin.bm_generalUtils;
  return {
    layer: layer,
    id: bm_generalUtils.random(10),
  };
}

function findLayerId(layer: any): any {
  let i = 0;
  const len = layers.length;
  for (i = 0; i < len; i += 1) {
    if (layers[i].layer === layer) {
      return layers[i].id;
    }
  }
  const newLayer = createLayerReference(layer);
  layers.push(newLayer);
  return newLayer.id;
}

function findLayerById(id: any): any {
  let i = 0;
  const len = layers.length;
  for (i = 0; i < len; i += 1) {
    if (layers[i].id === id) {
      return layers[i].layer;
    }
  }
}

function searchPseudoEffectByMatchName(matchName: string): boolean {
  let i = 0;
  const len = pseudoEffects.length;
  while (i < len) {
    if (pseudoEffects[i].matchName === matchName) {
      return true;
    }
    i += 1;
  }
  return false;
}

function buildAnnotations(layer: any): any[] {
  const effects = layer.effect;
  let i: number;
  let effect: any;
  const annotations: any[] = [];
  for (i = 0; i < effects.numProperties; i += 1) {
    effect = effects(i + 1);
    if (searchPseudoEffectByMatchName(effect.matchName)) {
      annotations.push({
        matchName: effect.matchName,
      });
    }
  }
  return annotations;
}

function buildLayerInfo(layer: any): any {
  const layerId = findLayerId(layer);
  return {
    id: layerId,
    name: layer.name,
    annotations: buildAnnotations(layer),
  };
}

function getLayers(): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const comp = getActiveComp();
  if (comp) {
    const selectedLayers = comp.selectedLayers;
    let i = 0;
    const layersInfo: any[] = [];
    for (i = 0; i < selectedLayers.length; i += 1) {
      const layerInfo = buildLayerInfo(selectedLayers[i]);
      layersInfo.push(layerInfo);
    }
    bm_eventDispatcher.sendEvent('bm:annotations:list', layersInfo);
  }
}

function findPseudoEffectByMatchName(matchName: string): any {
  for (let i = 0; i < pseudoEffects.length; i += 1) {
    if (pseudoEffects[i].matchName === matchName) {
      return pseudoEffects[i];
    }
  }
  return null;
}

function activateAnnotations(layerId: any, annotationId: string): void {
  const presetHelper = $.__bodymovin.presetHelper;

  const layer = findLayerById(layerId);
  const pseudoEffect = findPseudoEffectByMatchName(annotationId) || pseudoEffects[0];
  if (layer) {
    presetHelper.applyPreset(layer, annotationId, pseudoEffect);
  }
}

function getAvailableAnnotation(): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  bm_eventDispatcher.sendEvent('bm:annotations:annotationsList', pseudoEffects);
}

function calculateLineJoin(value: number): number {
  if (value === 1) {
    return 1;
  }
  return value - 1;
}

function formatVerticalAlignment(value: number): number {
  return value - 1 + 3;
}

function addTextProperties(effect: any, data: any): void {
  let i: number;
  const len = effect.numProperties;
  let prop: any;
  for (i = 0; i < len; i += 1) {
    prop = effect.property(i + 1);
    if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0001') {

      data.vj = formatVerticalAlignment(prop.value);
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0002') {
      data.rs = prop.value - 1;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0003') {
      if (prop.value !== 1) {
        data.m = prop.value - 2;
      }
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0004') {
      data.mc = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0005') {
      data.mf = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0006') {
      data.xf = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0007') {
      data.lj = calculateLineJoin(prop.value);

    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0008') {
      data.xl = prop.value;

    }
    if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0001') {
      data.vj = prop.value - 1;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0002') {
      data.rs = prop.value - 1;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0003') {
      if (prop.value !== 1) {
        data.m = prop.value - 2;
      }
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0004') {
      data.mc = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0005') {
      data.mf = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0006') {
      data.xf = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0007') {
      data.lj = calculateLineJoin(prop.value);

    }
    else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0001') {
      data.vj = prop.value - 1;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0002') {
      data.rs = prop.value - 1;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0003') {
      if (prop.value !== 1) {
        data.m = prop.value - 2;
      }
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0004') {
      data.mc = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0005') {
      data.mf = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0006') {
      data.xf = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0001') {
      data.vj = prop.value - 1;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0002') {
      data.rs = prop.value - 1;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0003') {
      data.mc = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0004') {
      data.mf = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0005') {
      data.xf = prop.value;
    }
  }
}

function addAssetProperties(effect: any): any {
  let i: number;
  const len = effect.numProperties;
  let prop: any;
  const data: any = {};
  for (i = 0; i < len; i += 1) {
    prop = effect.property(i + 1);
    if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0001') {
      data.originalAsset = prop.value === 1 ? false : true;
    } else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0002') {
      data.sourceAsId = prop.value === 1 ? false : true;
    } else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0003') {
      data.copyAsset = prop.value === 1 ? false : true;
    } else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0004') {
      data.enableCompression = prop.value === 1 ? false : true;
    } else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0005') {
      data.compression = prop.value;
    } else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0006') {
      data.includeInJson = prop.value === 1 ? false : true;
    } else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0007') {
      data.usePreviousExport = prop.value === 1 ? false : true;
    }
  }
  return data;
}

function searchTextProperties(layerInfo: any): any {
  const textDocumentData: any = {};
  if (!(layerInfo.effect && layerInfo.effect.numProperties > 0)) {
    return textDocumentData;
  }
  const effects = layerInfo.effect;

  let i: number;
  const len = effects.numProperties;
  let effectElement: any;
  for (i = 0; i < len; i += 1) {
    effectElement = effects(i + 1);
    if (effectElement.enabled && isTextAnnotation(effectElement.matchName)) {
      addTextProperties(effectElement, textDocumentData);
    }
  }
  return textDocumentData;
}

function searchAnnotationInList(matchName: string, list: string[]): boolean {
  let i: number;
  const len = list.length;
  for (i = 0; i < len; i += 1) {
    if (list[i] === matchName) {
      return true;
    }
  }
  return false;
}

function isTextAnnotation(matchName: string): boolean {
  return searchAnnotationInList(matchName, textAnnotationMatchNames);
}

function isAnnotation(matchName: string): boolean {
  return searchAnnotationInList(matchName, allAnnotations);
}

function searchAssetAnnotationInLayer(layerInfo: any): any {
  if (!(layerInfo.effect && layerInfo.effect.numProperties > 0)) {
    return null;
  }
  const effects = layerInfo.effect;

  let i: number;
  const len = effects.numProperties;
  let effectElement: any;
  for (i = 0; i < len; i += 1) {
    effectElement = effects(i + 1);
    if (effectElement.enabled && searchAnnotationInList(effectElement.matchName, assetAnnotationMatchNames)) {
      return addAssetProperties(effectElement);
    }
  }
  return null;
}

export const bm_annotationsManager = {
  getLayers: getLayers,
  activateAnnotations: activateAnnotations,
  getAvailableAnnotation: getAvailableAnnotation,
  findAnnotationEffectByMatchName: findPseudoEffectByMatchName,
  searchTextProperties: searchTextProperties,
  isAnnotation: isAnnotation,
  searchAssetAnnotationInLayer: searchAssetAnnotationInLayer,
};
