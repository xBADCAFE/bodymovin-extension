import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';

function RoundCorners(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(RoundCorners, MessageClass);

RoundCorners.prototype.processProperties = function (): void {
  this.radius = propertyReport(this.element.property('Radius'));
};

RoundCorners.prototype.process = function (): void {
  this.processProperties();
};

RoundCorners.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.roundedCorners,
    properties: {
      Radius: this.radius.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeRoundCornersReport(element: any): any {
  return new (RoundCorners as any)(element);
}
