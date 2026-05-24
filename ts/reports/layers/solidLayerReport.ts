import { bm_layerReport as layerReport } from '../layerReport';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';

function SolidLayer(this: any, layer: any, onComplete: any, onFail: any): void {
  this.layer = layer;
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(SolidLayer, MessageClass);

SolidLayer.prototype.processLayer = function (): void {
  this.layerReport = layerReport(this.layer);
};

SolidLayer.prototype.process = function (): void {
  try {
    this.processLayer();
    this._onComplete();
  } catch (error) {
    this._onFail(error);
  }
};

SolidLayer.prototype.serialize = function (): any {
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

export function bm_solidLayerReport(layer: any, onComplete: any, onFail: any): any {
  return new (SolidLayer as any)(layer, onComplete, onFail);
}
