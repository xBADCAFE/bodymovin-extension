import { bm_layerReport as layerReport } from '../layerReport';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';

function AdjustmentLayer(this: any, layer: any, onComplete: any, onFail: any): void {
  this.layer = layer;
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(AdjustmentLayer, MessageClass);

AdjustmentLayer.prototype.processLayer = function (): void {
  this.layerReport = layerReport(this.layer);
};

AdjustmentLayer.prototype.processContent = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
      rendererTypes.SKOTTIE,
    ],
    builderTypes.ADJUSTMENT_LAYER);
};

AdjustmentLayer.prototype.process = function (): void {
  try {
    this.processLayer();
    this.processContent();
    this._onComplete();
  } catch (error) {
    this._onFail(error);
  }
};

AdjustmentLayer.prototype.serialize = function (): any {
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

export function bm_adjustmentLayerReport(layer: any, onComplete: any, onFail: any): any {
  return new (AdjustmentLayer as any)(layer, onComplete, onFail);
}
