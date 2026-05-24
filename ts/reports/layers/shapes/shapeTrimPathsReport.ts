import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';

function TrimPaths(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(TrimPaths, MessageClass);

TrimPaths.prototype.processProperties = function (): void {
  this.start = propertyReport(this.element.property('Start'));
  this.end = propertyReport(this.element.property('End'));
  this.offset = propertyReport(this.element.property('Offset'));
};

TrimPaths.prototype.process = function (): void {
  this.processProperties();
};

TrimPaths.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.trim,
    properties: {
      Start: this.start.serialize(),
      End: this.end.serialize(),
      Offset: this.offset.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapeTrimPathsReport(element: any): any {
  return new (TrimPaths as any)(element);
}
