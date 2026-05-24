import { bm_layerReport as layerReport } from '../layerReport';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_eventDispatcher } from '../../eventManager';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';

function ImageSequenceLayer(this: any, layer: any, onComplete: any, onFail: any): void {
  this.layer = layer;
  bm_eventDispatcher.log(typeof layer.source);
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(ImageSequenceLayer, MessageClass);

ImageSequenceLayer.prototype.processLayer = function (): void {
  this.layerReport = layerReport(this.layer);
};

ImageSequenceLayer.prototype.processImage = function (): void {
  const image = this.layer.source;
  if (image.width > 1500 || image.height > 1500) {
    this.addMessage(messageTypes.WARNING,
      [
        rendererTypes.BROWSER,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.LARGE_IMAGE);
  }
  if (image.name.indexOf('.ai') !== -1) {
    this.addMessage(messageTypes.WARNING,
      [
        rendererTypes.BROWSER,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.ILLUSTRATOR_ASSET);
  }
};

ImageSequenceLayer.prototype.process = function (): void {
  try {
    this.processLayer();
    this.processImage();
    this._onComplete();
  } catch (error) {
    this._onFail(error);
  }
};

ImageSequenceLayer.prototype.serialize = function (): any {
  const layerReportData = this.layerReport.serialize();
  const localMessages = this.serializeMessages();
  const serializedData: any = {};
  for (const s in layerReportData) {
    if (layerReportData.hasOwnProperty(s)) {
      if (s === 'messages') {
        serializedData[s] = localMessages.concat(layerReportData[s]);
      } else {
        serializedData[s] = layerReportData[s];
      }
    }
  }
  return serializedData;
};

export function bm_imageSequenceLayerReport(layer: any, onComplete: any, onFail: any): any {
  return new (ImageSequenceLayer as any)(layer, onComplete, onFail);
}
