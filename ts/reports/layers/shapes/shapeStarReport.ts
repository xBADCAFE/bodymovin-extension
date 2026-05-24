import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';

function Star(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Star, MessageClass);

Star.prototype.processProperties = function (): void {
  this.points = propertyReport(this.element.property('Points'));
  this.position = propertyReport(this.element.property('Position'));
  this.rotation = propertyReport(this.element.property('Rotation'));
  this.outerRadius = propertyReport(this.element.property('Outer Radius'));
  this.outerRoundness = propertyReport(this.element.property('Outer Roundness'));

  const type = this.element.property('Type').value;
  if (type === 1) {
    this.innerRadius = propertyReport(this.element.property('Inner Radius'));
    this.innerRoundness = propertyReport(this.element.property('Inner Roundness'));
  }
};

Star.prototype.process = function (): void {
  this.processProperties();
};

Star.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.star,
    properties: {
      Points: this.points.serialize(),
      Position: this.position.serialize(),
      Rotation: this.rotation.serialize(),
      'Outer Radius': this.outerRadius.serialize(),
      'Outer Roundness': this.outerRoundness.serialize(),
      'Inner Radius': this.innerRadius ? this.innerRadius.serialize() : undefined,
      'Inner Roundness': this.innerRoundness ? this.innerRoundness.serialize() : undefined,
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeStarReport(element: any): any {
  return new (Star as any)(element);
}
