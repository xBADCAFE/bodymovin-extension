import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';

function Ellipse(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Ellipse, MessageClass);

Ellipse.prototype.processProperties = function (): void {
  this.size = propertyReport(this.element.property('Size'));
  this.position = propertyReport(this.element.property('Position'));
};

Ellipse.prototype.process = function (): void {
  this.processProperties();
};

Ellipse.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.ellipse,
    properties: {
      Size: this.size.serialize(),
      Position: this.position.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeEllipseReport(element: any): any {
  return new (Ellipse as any)(element);
}
