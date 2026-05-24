import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';
import { bm_eventDispatcher } from '../../eventManager';
import { bm_propertyReport as propertyReport } from '../propertyReport';
import { getMaskType } from '../../helpers/maskTypeResolver';
import { maskTypes } from '../../enums/maskTypes';

function Mask(this: any, mask: any): void {
  this.mask = mask;
  this.process();
}

generalUtils.extendPrototype(Mask, MessageClass);

Mask.prototype.process = function (): void {
  this.processProperties();
  this.processMode();
};

Mask.prototype.processMode = function (): void {
  const mode = getMaskType(this.mask.maskMode);
  if (mode === maskTypes.DARKEN || mode === maskTypes.LIGHTEN) {
    this.addMessage(messageTypes.ERROR,
      [
        rendererTypes.BROWSER,
        rendererTypes.SKOTTIE,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.UNSUPPORTED_MASK_MODE);
  }
};

Mask.prototype.processProperties = function (): void {
  const opacityProperty = this.mask.property('Mask Opacity');
  this.opacity = propertyReport(opacityProperty);
  if (this.opacity.checkModifiedValue(100)) {
    this.opacity.addMessage(messageTypes.ERROR,
      [
        rendererTypes.SKOTTIE,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.UNSUPPORTED_PROPERTY);
  }
  this.expansion = propertyReport(this.mask.property('Mask Expansion'));
  if (this.expansion.checkModifiedValue(0)) {
    this.expansion.addMessage(messageTypes.ERROR,
      [
        rendererTypes.SKOTTIE,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.UNSUPPORTED_PROPERTY);
  }
  this.feather = propertyReport(this.mask.property('Mask Feather'));
  if (this.feather.checkModifiedValue([0, 0])) {
    this.feather.addMessage(messageTypes.ERROR,
      [
        rendererTypes.BROWSER,
        rendererTypes.SKOTTIE,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.UNSUPPORTED_PROPERTY);
  }
  this.path = propertyReport(this.mask.property('maskShape'));
};

Mask.prototype.serialize = function (): any {
  return {
    name: this.mask.name,
    messages: this.serializeMessages(),
    opacity: this.opacity.serialize(),
    expansion: this.expansion.serialize(),
    feather: this.feather.serialize(),
    path: this.path.serialize(),
  };
};

export function bm_maskReportFactory(mask: any): any {
  return new (Mask as any)(mask);
}
