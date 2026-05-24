import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';

function Satin(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(Satin, MessageClass);

Satin.prototype.processProperties = function (): void {
};

Satin.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.SKOTTIE,
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

Satin.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

Satin.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.satin,
    messages: this.serializeMessages(),
  };
};

export function bm_layerStylesSatinFactory(style: any): any {
  return new (Satin as any)(style);
}
