import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_shapeCollectionReport } from './shapeCollectionReport';
import { bm_transformReportFactory as transformFactory } from '../../transformReport';

let shapeCollectionFactory: any = bm_shapeCollectionReport;

function Group(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Group, MessageClass);

Group.prototype.processProperties = function (): void {
  if (!shapeCollectionFactory) {
    shapeCollectionFactory = $.__bodymovin.bm_shapeCollectionReport;
  }
  this.shapes = shapeCollectionFactory(this.element.property('Contents'));
  this.transform = transformFactory(this.element.property('Transform'), false);
};

Group.prototype.process = function (): void {
  this.processProperties();
};

Group.prototype.serialize = function (): any {
  const shapesData = this.shapes.serialize();

  return {
    name: this.element.name,
    type: shapeTypes.group,
    shapes: shapesData.shapes,
    transform: this.transform.serialize(),
  };
};

export function bm_shapeGroupReport(element: any): any {
  return new (Group as any)(element);
}
