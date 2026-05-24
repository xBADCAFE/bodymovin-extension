import { bm_layerReport as layerReport } from '../layerReport';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_eventDispatcher } from '../../eventManager';

function UnhandledLayer(this: any, layer: any, onComplete: any, onFail: any): void {
  this.layer = layer;
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(UnhandledLayer, MessageClass);

UnhandledLayer.prototype.processLayer = function (): void {
  this.layerReport = layerReport(this.layer);
};

UnhandledLayer.prototype.processData = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.BROWSER,
      rendererTypes.SKOTTIE,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNHANDLED_LAYER);
};

UnhandledLayer.prototype.process = function (): void {
  try {
    this.processData();
    this.processLayer();
    this._onComplete();
  } catch (error) {
    this._onFail(error);
  }
};

UnhandledLayer.prototype.serialize = function (): any {
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

export function bm_unhandledLayerReport(layer: any, onComplete: any, onFail: any): any {
  return new (UnhandledLayer as any)(layer, onComplete, onFail);
}
