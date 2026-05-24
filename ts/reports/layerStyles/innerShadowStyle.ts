import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_propertyReport as propertyReport } from '../propertyReport';

function InnerShadow(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(InnerShadow, MessageClass);

InnerShadow.prototype.processProperties = function (): void {
  this.blendMode = propertyReport(this.style.property('innerShadow/mode2'));
  this.color = propertyReport(this.style.property('innerShadow/color'));
  this.opacity = propertyReport(this.style.property('innerShadow/opacity'));
  this.globalLight = propertyReport(this.style.property('innerShadow/useGlobalAngle'));
  this.angle = propertyReport(this.style.property('innerShadow/localLightingAngle'));
  this.distance = propertyReport(this.style.property('innerShadow/distance'));
  this.choke = propertyReport(this.style.property('innerShadow/chokeMatte'));
  this.size = propertyReport(this.style.property('innerShadow/size'));
  this.noise = propertyReport(this.style.property('innerShadow/noise'));
};

InnerShadow.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

InnerShadow.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

InnerShadow.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.innerShadow,
    messages: this.serializeMessages(),
    blendMode: this.blendMode.serialize(),
    color: this.color.serialize(),
    opacity: this.opacity.serialize(),
    globalLight: this.globalLight.serialize(),
    angle: this.angle.serialize(),
    distance: this.distance.serialize(),
    choke: this.choke.serialize(),
    size: this.size.serialize(),
    noise: this.noise.serialize(),
  };
};

export function bm_layerStylesInnerShadowFactory(style: any): any {
  return new (InnerShadow as any)(style);
}
