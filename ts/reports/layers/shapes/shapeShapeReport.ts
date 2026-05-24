import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { bm_propertyReport as propertyReport } from '../../propertyReport';
import { shapeTypes } from '../../../enums/shapeTypes';

function Shape(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Shape, MessageClass);

Shape.prototype.processProperties = function (): void {
  this.path = propertyReport(this.element.property('Path'));
};

Shape.prototype.process = function (): void {
  this.processProperties();
};

Shape.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.shape,
    properties: {
      Path: this.path.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeShapeReport(element: any): any {
  return new (Shape as any)(element);
}
