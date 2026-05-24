import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { shapeTypes } from '../../../enums/shapeTypes';
import { bm_reportRendererTypes as rendererTypes } from '../../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../../messageTypes';

function MergePaths(this: any, element: any): void {
  this.element = element;
  this.process();
}

generalUtils.extendPrototype(MergePaths, MessageClass);

MergePaths.prototype.processProperties = function (): void {
};

MergePaths.prototype.process = function (): void {
  const mergeType = this.element.property('ADBE Vector Merge Type').value;
  const renderers = [];
  for (const s in rendererTypes) {
    if (rendererTypes.hasOwnProperty(s)) {
      renderers.push((rendererTypes as any)[s]);
    }
  }
  if (mergeType === 4) {
  } else {
    this.addMessage(messageTypes.ERROR,
      renderers,
      builderTypes.MERGE_PATHS);
  }
};

MergePaths.prototype.serialize = function (): any {
  return {
    name: this.element.name,
    type: shapeTypes.merge,
    messages: this.serializeMessages(),
    properties: {
    },
  };
};

export function bm_shapeMergePathsReport(element: any): any {
  return new (MergePaths as any)(element);
}
