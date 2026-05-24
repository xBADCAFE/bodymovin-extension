import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';

function Rect(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Rect, MessageClass);

Rect.prototype.processProperties = function (): void {
  this.size = propertyReport(this.element.property('Size'));
  this.position = propertyReport(this.element.property('Position'));
  this.roundness = propertyReport(this.element.property('Roundness'));
};

Rect.prototype.process = function (): void {
  this.processProperties();
};

Rect.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.rect,
    properties: {
      Size: this.size.serialize(),
      Position: this.position.serialize(),
      Roundness: this.roundness.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeRectReport(element: any): any {
  return new (Rect as any)(element);
}
