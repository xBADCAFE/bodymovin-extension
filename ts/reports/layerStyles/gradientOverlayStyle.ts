import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';

function GradientOverlay(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(GradientOverlay, MessageClass);

GradientOverlay.prototype.processProperties = function (): void {
};

GradientOverlay.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.SKOTTIE,
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

GradientOverlay.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

GradientOverlay.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.gradientOverlay,
    messages: this.serializeMessages(),
  };
};

export function bm_layerStylesGradientOverlayFactory(style: any): any {
  return new (GradientOverlay as any)(style);
}
