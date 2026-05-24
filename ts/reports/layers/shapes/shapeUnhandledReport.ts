import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { bm_reportRendererTypes as rendererTypes } from '../../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../../messageTypes';

function Unhandled(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(Unhandled, MessageClass);

Unhandled.prototype.process = function (): void {
  const renderers = [];
  for (const s in rendererTypes) {
    if (rendererTypes.hasOwnProperty(s)) {
      renderers.push((rendererTypes as any)[s]);
    }
  }
  this.addMessage(messageTypes.WARNING,
    renderers,
    builderTypes.UNHANDLED_SHAPE_PROPERTY);
};

Unhandled.prototype.serialize = function (): any {
  return {
    type: 'un',
    name: this.element.name,
    messages: this.serializeMessages(),
  };
};

export function bm_shapeUnhandledReport(element: any): any {
  return new (Unhandled as any)(element);
}
