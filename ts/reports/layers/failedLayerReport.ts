import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_eventDispatcher } from '../../eventManager';

function FailedLayer(this: any, layer: any, onComplete: any, onFail: any): void {
  this.layer = layer;
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(FailedLayer, MessageClass);

FailedLayer.prototype.processData = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.BROWSER,
      rendererTypes.SKOTTIE,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.FAILED_LAYER);
};

FailedLayer.prototype.process = function (): void {
  try {
    this.processData();
    this._onComplete();
  } catch (error) {
    this._onFail(error);
  }
};

FailedLayer.prototype.serialize = function (): any {
  const serializedData = {
    messages: this.serializeMessages(),
    name: this.layer.name,
  };
  return serializedData;
};

export function bm_failedLayerReport(layer: any, onComplete: any, onFail: any): any {
  return new (FailedLayer as any)(layer, onComplete, onFail);
}
