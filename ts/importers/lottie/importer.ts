import { bm_lottieImporter } from '../lottieImporter';
import { random } from './util/random';
import { hexToRgbAsNormalizedArray } from './util/colorConverter';
import { reset as resetAlerts, get as getAlerts, setLayer, pushComp, popComp, add as addAlert } from './alertsHelper';
import { processTransform } from './transform';
import { processShape } from './shape';
import { processText } from './text';
import { processMasks } from './mask';
import { setFrameRate } from './frameRateHelper';
import { importLottieAssets } from './assets';

function createFolder(name?: string): void {
  bm_lottieImporter.createFolder(name || '');
}

function createComp(name: string, width: number, height: number, duration: number, compId: string): void {
  bm_lottieImporter.createComp(name, width, height, duration, compId);
}

function setCompWorkArea(inPoint: number, outPoint: number, compId: string): void {
  bm_lottieImporter.setCompWorkArea(inPoint, outPoint, compId);
}

function createSolid(layerData: any, compId: string): void {
  var layerId = random(10);
  layerData.__importId = layerId;
  var color = hexToRgbAsNormalizedArray(layerData.sc);
  bm_lottieImporter.createSolid(
    color,
    layerData.nm,
    layerData.sw,
    layerData.sh,
    layerData.op - layerData.ip,
    layerId,
    compId
  );
  processLayerExtraProps(layerData, layerId);
  processTransform(layerData.ks, layerId);
  processMasks(layerData.masksProperties, layerId);
}

function createImageLayer(layerData: any, compId: string, assets: any[]): void {
  var imageSourceData = assets.find(function (asset: any) {
    return asset.id === layerData.refId;
  });
  var layerId = random(10);
  layerData.__importId = layerId;
  if (imageSourceData && imageSourceData.__sourceId) {
    bm_lottieImporter.addImageLayer(imageSourceData.__sourceId, compId, layerId);
  }
  processLayerExtraProps(layerData, layerId);
  processTransform(layerData.ks, layerId);
  processMasks(layerData.masksProperties, layerId);
}

function createNull(layerData: any, compId: string): void {
  var layerId = random(10);
  layerData.__importId = layerId;
  bm_lottieImporter.createNull(layerData.op - layerData.ip, layerId, compId);
  processLayerExtraProps(layerData, layerId);
  processTransform(layerData.ks, layerId);
}

function createShapeLayer(layerData: any, compId: string): void {
  var layerId = random(10);
  layerData.__importId = layerId;
  bm_lottieImporter.createShapeLayer(layerId, compId);
  processLayerExtraProps(layerData, layerId);
  processShape(layerData, layerId);
  processTransform(layerData.ks, layerId);
  processMasks(layerData.masksProperties, layerId);
}

function createTextLayer(layerData: any, compId: string): void {
  var layerId = random(10);
  layerData.__importId = layerId;
  bm_lottieImporter.createTextLayer(layerId, compId);
  processLayerExtraProps(layerData, layerId);
  processText(layerData.t, layerId);
  processTransform(layerData.ks, layerId);
  processMasks(layerData.masksProperties, layerId);
  addAlert({ type: 'message', message: 'Text layers are not fully supported' });
}

function createCompositionLayer(layerData: any, parentCompId: string, assets: any[]): void {
  var compositionSourceData = assets.find(function (asset: any) {
    return asset.id === layerData.refId;
  });
  if (!compositionSourceData) {
    return;
  }
  if (!compositionSourceData.__created) {
    compositionSourceData.__created = true;
    var sourceCompId = random(10);
    compositionSourceData.__sourceId = sourceCompId;
    createComp(layerData.nm, layerData.w, layerData.h, 9999, sourceCompId);
    pushComp(layerData.nm);
    iterateLayers(compositionSourceData.layers, sourceCompId, assets);
    popComp(layerData.nm);
  }
  var layerId = random(10);
  layerData.__importId = layerId;
  bm_lottieImporter.addComposition(compositionSourceData.__sourceId, parentCompId, layerId);
  processLayerExtraProps(layerData, layerId);
  processTransform(layerData.ks, layerId);
  processMasks(layerData.masksProperties, layerId);
}

function processLayerExtraProps(layerData: any, layerId: string): void {
  if (layerData.ip - layerData.st !== 0) {
    bm_lottieImporter.setLayerInPoint(layerId, layerData.ip - layerData.st);
  }
  if (layerData.st !== 0) {
    bm_lottieImporter.setLayerStartTime(layerId, layerData.st);
  }
  if (layerData.sr !== 1) {
    bm_lottieImporter.setLayerStretch(layerId, layerData.sr * 100);
  }
  if (layerData.nm) {
    bm_lottieImporter.setLayerName(layerId, encodeURIComponent(layerData.nm));
  }
  if (layerData.hd === true) {
    bm_lottieImporter.setElementAsDisabled(layerId);
  }
  bm_lottieImporter.setLayerOutPoint(layerId, layerData.op);
}

function skipLayer(_layerData: any): void {
}

function createLayer(layerData: any, compId: string, assets: any[]): void {
  setLayer(layerData.nm);
  switch (layerData.ty) {
    case 0:
      createCompositionLayer(layerData, compId, assets);
      break;
    case 1:
      createSolid(layerData, compId);
      break;
    case 2:
      createImageLayer(layerData, compId, assets);
      break;
    case 3:
      createNull(layerData, compId);
      break;
    case 4:
      createShapeLayer(layerData, compId);
      break;
    case 5:
      createTextLayer(layerData, compId);
      break;
    default:
      skipLayer(layerData);
  }
}

function findLayerByIndexProperty(layers: any[], index: number): any {
  return layers.find(function (layer: any) {
    return layer.ind === index;
  });
}

function iterateLayers(layers: any[], compId: string, assets: any[]): void {
  layers.reverse().forEach(function (layer: any) {
    createLayer(layer, compId, assets);
  });

  layers.forEach(function (layer: any) {
    if ('parent' in layer) {
      var parentLayer = findLayerByIndexProperty(layers, layer.parent);
      if (parentLayer) {
        bm_lottieImporter.setLayerParent(layer.__importId, parentLayer.__importId);
      }
    }

    if ('tt' in layer) {
      bm_lottieImporter.setTrackMatte(layer.__importId, layer.tt);
    }
  });
}

function addFootageToMainFolder(assets: any[] | undefined): void {
  var footageIds = (assets || [])
    .filter(function (asset: any) { return asset.id && asset.w && asset.__sourceId; })
    .map(function (asset: any) { return asset.__sourceId; });

  if (footageIds.length) {
    bm_lottieImporter.addFootageToMainFolder(footageIds);
  }
}

function convert(lottieData: any, mainCompId: string): void {
  setFrameRate(lottieData.fr);
  bm_lottieImporter.setFrameRate(lottieData.fr);
  pushComp(lottieData.nm || 'Main Comp');
  createFolder(lottieData.nm);
  addFootageToMainFolder(lottieData.assets);

  createComp(lottieData.nm, lottieData.w, lottieData.h, lottieData.op, mainCompId);
  setCompWorkArea(lottieData.ip / lottieData.fr, lottieData.op / lottieData.fr, mainCompId);
  iterateLayers(lottieData.layers, mainCompId, lottieData.assets);
}

export interface ImportLottieOptions {
  assetsPath?: string;
}

export interface ImportLottieResult {
  success: boolean;
  mainCompId: string;
  alerts: any[];
  error?: string;
}

export function importLottieData(lottieData: any, options?: ImportLottieOptions): ImportLottieResult {
  var assetsPath = (options && options.assetsPath) || '';
  resetAlerts();
  bm_lottieImporter.reset();
  var mainCompId = random(10);
  try {
    importLottieAssets(lottieData.assets, assetsPath);
    convert(lottieData, mainCompId);
    return {
      success: true,
      mainCompId: mainCompId,
      alerts: getAlerts(),
    };
  } catch (err) {
    var message = (err && (err as Error).message) ? (err as Error).message : 'There has been an error';
    return {
      success: false,
      mainCompId: mainCompId,
      alerts: getAlerts(),
      error: message,
    };
  }
}
