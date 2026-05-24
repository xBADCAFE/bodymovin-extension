import { bm_layerReport as layerReport } from '../layerReport';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';

function LightLayer(this: any, layer: any, onComplete: any, onFail: any): void {
  this.layer = layer;
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(LightLayer, MessageClass);

LightLayer.prototype.processType = function (): void {
  this.addMessage(messageTypes.ERROR,
    [
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
      rendererTypes.SKOTTIE,
    ],
    (builderTypes as any).LIGHT_LAYER);
};

LightLayer.prototype.process = function (): void {
  try {
    this.processType();
    this._onComplete();
  } catch (error) {
    this._onFail(error);
  }
};

LightLayer.prototype.serialize = function (): any {
  const localMessages = this.serializeMessages();
  const serializedData = {
    messages: localMessages,
    name: this.layer.name,
  };
  return serializedData;
};

export function bm_lightLayerReport(layer: any, onComplete: any, onFail: any): any {
  return new (LightLayer as any)(layer, onComplete, onFail);
}
