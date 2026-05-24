import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_layerReport as layerReport } from '../layerReport';
import { bm_eventDispatcher } from '../../eventManager';

let layerCollectionFactory: any;

function CompositionLayer(this: any, composition: any, onComplete: any, onFail: any): void {
  this.composition = composition;
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(CompositionLayer, MessageClass);

CompositionLayer.prototype.createLayers = function (): void {
  if (!layerCollectionFactory) {
    layerCollectionFactory = $.__bodymovin.bm_layerCollectionReport;
  }
  this.layerCollection = layerCollectionFactory(this.composition.source.layers, this._onComplete, this._onFail);
};

CompositionLayer.prototype.processLayer = function (): void {
  this.layerReport = layerReport(this.composition);
};

CompositionLayer.prototype.process = function (): void {
  try {
    this.createLayers();
    this.processLayer();
    this.layerCollection.process();
  } catch (error) {
    this._onFail(error);
  }
};

CompositionLayer.prototype.serialize = function (): any {
  const layerReportData = this.layerReport.serialize();
  const localMessages = this.serializeMessages();
  const layerCollectionData = this.layerCollection.serialize();
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
  serializedData.layers = layerCollectionData.layers;
  serializedData.id = this.composition.source.id;
  return serializedData;
};

export function bm_compositionLayerReport(composition: any, onComplete: any, onFail: any): any {
  return new (CompositionLayer as any)(composition, onComplete, onFail);
}
