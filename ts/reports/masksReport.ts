import { bm_messageClassReport as MessageClass } from './messageClassReport';
import { bm_generalUtils as generalUtils } from '../utils/generalUtils';

function Masks(this: any, maskElements: any): void {
  this.maskElements = maskElements;
  this.masks = [];
  this.process();
}

generalUtils.extendPrototype(Masks, MessageClass);

Masks.prototype.process = function (): void {
  const maskReportFactory = $.__bodymovin.bm_maskReportFactory;
  let maskElement: any;
  for (let i = 0; i < this.maskElements.numProperties; i += 1) {
    maskElement = this.maskElements(i + 1);
    this.masks.push(maskReportFactory(maskElement));
  }
};

Masks.prototype.serialize = function (): any {
  const serializedMasks: any[] = [];
  for (let i = 0; i < this.masks.length; i += 1) {
    serializedMasks.push(this.masks[i].serialize());
  }

  return {
    messages: this.serializeMessages(),
    masks: serializedMasks,
  };
};

export function bm_masksReportFactory(maskElements: any): any {
  return new (Masks as any)(maskElements);
}
