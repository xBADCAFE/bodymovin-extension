import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_layerReport as layerReport } from '../layerReport';
import { bm_eventDispatcher } from '../../eventManager';
import { bm_shapeCollectionReport as shapeCollectionFactory } from './shapes/shapeCollectionReport';

function ShapeLayer(this: any, shape: any, onComplete: any, onFail: any): void {
  this.shape = shape;
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(ShapeLayer, MessageClass);

ShapeLayer.prototype.processLayer = function (): void {
  this.layerReport = layerReport(this.shape);
};

ShapeLayer.prototype.processShapes = function (): void {
  const shapes = this.shape.property('ADBE Root Vectors Group');
  this.shapesCollection = shapeCollectionFactory(shapes);
};

ShapeLayer.prototype.process = function (): void {
  try {
    this.processLayer();
    this.processShapes();
    this._onComplete();
  } catch (error) {
    this._onFail(error);
  }
};

ShapeLayer.prototype.serialize = function (): any {
  const layerReportData = this.layerReport.serialize();
  const localMessages = this.serializeMessages();
  const shapesCollection = this.shapesCollection.serialize();
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
  serializedData.shapes = shapesCollection.shapes;
  return serializedData;
};

export function bm_shapeLayerReport(shape: any, onComplete: any, onFail: any): any {
  return new (ShapeLayer as any)(shape, onComplete, onFail);
}
