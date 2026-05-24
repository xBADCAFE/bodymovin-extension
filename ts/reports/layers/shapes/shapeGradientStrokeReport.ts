import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';

function GradientStroke(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(GradientStroke, MessageClass);

GradientStroke.prototype.processProperties = function (): void {
  this.startPoint = propertyReport(this.element.property('Start Point'));
  this.endPoint = propertyReport(this.element.property('End Point'));
  this.opacity = propertyReport(this.element.property('Opacity'));
  this.strokeWidth = propertyReport(this.element.property('Stroke Width'));
  this.miterLimit = propertyReport(this.element.property('Miter Limit'));
  const type = this.element.property('Type').value;
  if (type === 2) {
    this.highlightLength = propertyReport(this.element.property('Highlight Length'));
    this.highlightAngle = propertyReport(this.element.property('Highlight Angle'));
  }
};

GradientStroke.prototype.process = function (): void {
  this.processProperties();
};

GradientStroke.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.gStroke,
    properties: {
      'Stroke Width': this.strokeWidth.serialize(),
      'Miter Limit': this.miterLimit.serialize(),
      'Start Point': this.startPoint.serialize(),
      'End Point': this.endPoint.serialize(),
      'Highlight Length': this.highlightLength ? this.highlightLength.serialize() : undefined,
      'Highlight Angle': this.highlightAngle ? this.highlightAngle.serialize() : undefined,
      Opacity: this.opacity.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeGradientStrokeReport(element: any): any {
  return new (GradientStroke as any)(element);
}
