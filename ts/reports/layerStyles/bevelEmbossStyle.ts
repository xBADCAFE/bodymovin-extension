import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';

function BevelEmboss(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(BevelEmboss, MessageClass);

BevelEmboss.prototype.processProperties = function (): void {
};

BevelEmboss.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.SKOTTIE,
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

BevelEmboss.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

BevelEmboss.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.bevelEmboss,
    messages: this.serializeMessages(),
  };
};

export function bm_layerStylesBevelEmbossFactory(style: any): any {
  return new (BevelEmboss as any)(style);
}
