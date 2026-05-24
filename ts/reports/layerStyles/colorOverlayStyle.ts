import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';

function ColorOverlay(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(ColorOverlay, MessageClass);

ColorOverlay.prototype.processProperties = function (): void {
};

ColorOverlay.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.SKOTTIE,
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

ColorOverlay.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

ColorOverlay.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.colorOverlay,
    messages: this.serializeMessages(),
  };
};

export function bm_layerStylesColorOverlayFactory(style: any): any {
  return new (ColorOverlay as any)(style);
}
