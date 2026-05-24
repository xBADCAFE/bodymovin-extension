import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';
import { bm_transformReportFactory as transformFactory } from '../../transformReport';

function Repeater(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Repeater, MessageClass);

Repeater.prototype.processProperties = function (): void {
  this.transform = transformFactory(this.element.property('Transform'), false);
  this.copies = propertyReport(this.element.property('Copies'));
  this.offset = propertyReport(this.element.property('Offset'));
};

Repeater.prototype.process = function (): void {
  this.processProperties();
};

Repeater.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.repeater,
    copies: this.copies.serialize(),
    offset: this.offset.serialize(),
    transform: this.transform.serialize(),
  };
};

export function bm_shapeRepeaterReport(element: any): any {
  return new (Repeater as any)(element);
}
