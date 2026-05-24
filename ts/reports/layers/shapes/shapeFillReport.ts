import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';

function Fill(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Fill, MessageClass);

Fill.prototype.processProperties = function (): void {
  this.color = propertyReport(this.element.property('Color'));
  this.opacity = propertyReport(this.element.property('Opacity'));
};

Fill.prototype.process = function (): void {
  this.processProperties();
};

Fill.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.fill,
    properties: {
      Color: this.color.serialize(),
      Opacity: this.opacity.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeFillReport(element: any): any {
  return new (Fill as any)(element);
}
