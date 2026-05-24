import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_propertyReport as propertyReport } from '../propertyReport';

function Stroke(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(Stroke, MessageClass);

Stroke.prototype.processProperties = function (): void {
  this.color = propertyReport(this.style.property('frameFX/color'));
  this.size = propertyReport(this.style.property('frameFX/size'));
  this.blendMode = propertyReport(this.style.property('frameFX/mode2'));
  this.opacity = propertyReport(this.style.property('frameFX/opacity'));
  this.position = propertyReport(this.style.property('frameFX/style'));
};

Stroke.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

Stroke.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

Stroke.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.stroke,
    messages: this.serializeMessages(),
    color: this.color.serialize(),
    size: this.size.serialize(),
    blendMode: this.blendMode.serialize(),
    opacity: this.opacity.serialize(),
    position: this.position.serialize(),
  };
};

export function bm_layerStylesStrokeFactory(style: any): any {
  return new (Stroke as any)(style);
}
