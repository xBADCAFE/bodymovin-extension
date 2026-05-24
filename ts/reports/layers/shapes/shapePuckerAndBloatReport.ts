import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_propertyReport as propertyReport } from '../../propertyReport';
import { bm_reportRendererTypes as rendererTypes } from '../../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../../messageTypes';

function PuckerAndBloat(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(PuckerAndBloat, MessageClass);

PuckerAndBloat.prototype.processProperties = function (): void {
  this.amount = propertyReport(this.element.property('Amount'));
};

PuckerAndBloat.prototype.process = function (): void {
  this.processProperties();
  this.addMessage(messageTypes.ERROR,
    [
      rendererTypes.IOS,
      rendererTypes.ANDROID,
    ],
    builderTypes.PUCKER_AND_BLOAT);
};

PuckerAndBloat.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.puckerAndBloat,
    properties: {
      Amount: this.amount.serialize(),
    },
    messages: this.serializeMessages(),
  };
};

export function bm_shapePuckerAndBloatReport(element: any): any {
  return new (PuckerAndBloat as any)(element);
}
