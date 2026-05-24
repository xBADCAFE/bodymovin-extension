import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_propertyReport as propertyReport } from '../propertyReport';

function DropShadow(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(DropShadow, MessageClass);

DropShadow.prototype.processProperties = function (): void {
  this.color = propertyReport(this.style.property('dropShadow/color'));
  this.opacity = propertyReport(this.style.property('dropShadow/opacity'));
  this.angle = propertyReport(this.style.property('dropShadow/localLightingAngle'));
  this.size = propertyReport(this.style.property('dropShadow/blur'));
  this.distance = propertyReport(this.style.property('dropShadow/distance'));
  this.spread = propertyReport(this.style.property('dropShadow/chokeMatte'));
  this.blendMode = propertyReport(this.style.property('dropShadow/mode2'));
  this.noise = propertyReport(this.style.property('dropShadow/noise'));
  this.knocksOut = propertyReport(this.style.property('dropShadow/layerConceals'));
};

DropShadow.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

DropShadow.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

DropShadow.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.dropShadow,
    messages: this.serializeMessages(),
    color: this.color.serialize(),
    opacity: this.opacity.serialize(),
    angle: this.angle.serialize(),
    size: this.size.serialize(),
    distance: this.distance.serialize(),
    spread: this.spread.serialize(),
    blendMode: this.blendMode.serialize(),
    noise: this.noise.serialize(),
    knocksOut: this.knocksOut.serialize(),
  };
};

export function bm_layerStylesDropShadowFactory(style: any): any {
  return new (DropShadow as any)(style);
}
