import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';

function Stroke(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Stroke, MessageClass);

Stroke.prototype.processProperties = function (): void {
  this.color = propertyReport(this.element.property('Color'));
  this.opacity = propertyReport(this.element.property('Opacity'));
  this.strokeWidth = propertyReport(this.element.property('Stroke Width'));
};

Stroke.prototype.process = function (): void {
  this.processProperties();
};

Stroke.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.stroke,
    properties: {
      Color: this.color.serialize(),
      Opacity: this.opacity.serialize(),
      'Stroke Width': this.strokeWidth.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeStrokeReport(element: any): any {
  return new (Stroke as any)(element);
}
