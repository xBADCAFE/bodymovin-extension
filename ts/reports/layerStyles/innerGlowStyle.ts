import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_propertyReport as propertyReport } from '../propertyReport';

function InnerGlow(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(InnerGlow, MessageClass);

InnerGlow.prototype.processProperties = function (): void {
  this.blendMode = propertyReport(this.style.property('innerGlow/mode2'));
  this.opacity = propertyReport(this.style.property('innerGlow/opacity'));
  this.noise = propertyReport(this.style.property('innerGlow/noise'));
  this.colorChoice = propertyReport(this.style.property('innerGlow/AEColorChoice'));
  this.color = propertyReport(this.style.property('innerGlow/color'));
  this.gradient = propertyReport(this.style.property('innerGlow/gradient'));
  this.gradientSmoothness = propertyReport(this.style.property('innerGlow/gradientSmoothness'));
  this.glowTechnique = propertyReport(this.style.property('innerGlow/glowTechnique'));
  this.source = propertyReport(this.style.property('innerGlow/innerGlowSource'));
  this.chokeMatte = propertyReport(this.style.property('innerGlow/chokeMatte'));
  this.blur = propertyReport(this.style.property('innerGlow/blur'));
  this.inputRange = propertyReport(this.style.property('innerGlow/inputRange'));
  this.shadingNoise = propertyReport(this.style.property('innerGlow/shadingNoise'));
};

InnerGlow.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

InnerGlow.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

InnerGlow.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.innerGlow,
    messages: this.serializeMessages(),
    blendMode: this.blendMode.serialize(),
    opacity: this.opacity.serialize(),
    noise: this.noise.serialize(),
    colorChoice: this.colorChoice.serialize(),
    color: this.color.serialize(),
    gradient: this.gradient.serialize(),
    gradientSmoothness: this.gradientSmoothness.serialize(),
    glowTechnique: this.glowTechnique.serialize(),
    source: this.source.serialize(),
    chokeMatte: this.chokeMatte.serialize(),
    blur: this.blur.serialize(),
    inputRange: this.inputRange.serialize(),
    shadingNoise: this.shadingNoise.serialize(),
  };
};

export function bm_layerStylesInnerGlowFactory(style: any): any {
  return new (InnerGlow as any)(style);
}
