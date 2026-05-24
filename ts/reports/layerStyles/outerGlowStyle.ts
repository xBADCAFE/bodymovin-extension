import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { layerStyleTypes } from '../../enums/layerStyleTypes';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_propertyReport as propertyReport } from '../propertyReport';

function OuterGlow(this: any, style: any): void {
  this.style = style;
  this.messages = [];
  this.process();
}
generalUtils.extendPrototype(OuterGlow, MessageClass);

OuterGlow.prototype.processProperties = function (): void {
  this.blendMode = propertyReport(this.style.property('outerGlow/mode2'));
  this.opacity = propertyReport(this.style.property('outerGlow/opacity'));
  this.noise = propertyReport(this.style.property('outerGlow/noise'));
  this.colorChoice = propertyReport(this.style.property('outerGlow/AEColorChoice'));
  this.color = propertyReport(this.style.property('outerGlow/color'));
  this.gradient = propertyReport(this.style.property('outerGlow/gradient'));
  this.gradientSmoothness = propertyReport(this.style.property('outerGlow/gradientSmoothness'));
  this.glowTechnique = propertyReport(this.style.property('outerGlow/glowTechnique'));
  this.chokeMatte = propertyReport(this.style.property('outerGlow/chokeMatte'));
  this.blur = propertyReport(this.style.property('outerGlow/blur'));
  this.inputRange = propertyReport(this.style.property('outerGlow/inputRange'));
  this.shadingNoise = propertyReport(this.style.property('outerGlow/shadingNoise'));
};

OuterGlow.prototype.processStyle = function (): void {
  this.addMessage(messageTypes.WARNING,
    [
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.UNSUPPORTED_STYLE);
};

OuterGlow.prototype.process = function (): void {
  this.processProperties();
  this.processStyle();
};

OuterGlow.prototype.serialize = function (): any {
  return {
    name: this.style.name,
    type: layerStyleTypes.outerGlow,
    messages: this.serializeMessages(),
    blendMode: this.blendMode.serialize(),
    opacity: this.opacity.serialize(),
    noise: this.noise.serialize(),
    colorChoice: this.colorChoice.serialize(),
    color: this.color.serialize(),
    gradient: this.gradient.serialize(),
    gradientSmoothness: this.gradientSmoothness.serialize(),
    glowTechnique: this.glowTechnique.serialize(),
    chokeMatte: this.chokeMatte.serialize(),
    blur: this.blur.serialize(),
    inputRange: this.inputRange.serialize(),
    shadingNoise: this.shadingNoise.serialize(),
  };
};

export function bm_layerStylesOuterGlowFactory(style: any): any {
  return new (OuterGlow as any)(style);
}
