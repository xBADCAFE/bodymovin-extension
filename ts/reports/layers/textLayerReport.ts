import type { AEError } from '../../core/types';
import { bm_layerReport as layerReport } from '../layerReport';
import { bm_messageClassReport as MessageClass } from '../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../utils/generalUtils';
import { bm_textAnimatorsReport as textAnimatorsReport } from './texts/textAnimatorsReport';
import { bm_eventDispatcher } from '../../eventManager';
import { bm_reportRendererTypes as rendererTypes } from '../rendererTypes';
import { bm_reportBuilderTypes as builderTypes } from '../builderTypes';
import { bm_reportMessageTypes as messageTypes } from '../messageTypes';

function TextLayer(this: any, layer: any, onComplete: any, onFail: any): void {
  this.layer = layer;
  this.animators = [];
  this._onComplete = onComplete;
  this._onFail = onFail;
}

generalUtils.extendPrototype(TextLayer, MessageClass);

TextLayer.prototype.processLayer = function (): void {
  this.layerReport = layerReport(this.layer);
};

TextLayer.prototype.processAnimators = function (): void {
  const animators = this.layer.property('Text').property('ADBE Text Animators');
  let i;
  const len = animators.numProperties;
  let textAnimator;
  for (i = 0; i < len; i += 1) {
    if (animators.property(i + 1).matchName === 'ADBE Text Animator') {
      textAnimator = textAnimatorsReport(animators.property(i + 1));
      this.animators.push(textAnimator);
    }
  }
  if (this.animators.length > 0) {
    this.addMessage(messageTypes.ERROR,
      [
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.TEXT_ANIMATORS);
  }
};

TextLayer.prototype.process = function (): void {
  try {
    this.processLayer();
    this.processAnimators();
    this._onComplete();
  } catch (error) {
    if (error) {
      const e = error as AEError;
      bm_eventDispatcher.log(e.message);
      bm_eventDispatcher.log(e.line);
      bm_eventDispatcher.log(e.fileName);
    }
    bm_eventDispatcher.log(($ as any).stack);
    this._onFail(error);
  }
};

TextLayer.prototype.serialize = function (): any {
  const layerReportData = this.layerReport.serialize();
  const localMessages = this.serializeMessages();
  const serializedData: any = {};
  for (const s in layerReportData) {
    if (layerReportData.hasOwnProperty(s)) {
      if (s === 'messages') {
        serializedData[s] = localMessages.concat(layerReportData[s]);
      } else {
        serializedData[s] = layerReportData[s];
      }
    }
  }
  const animators = [];
  for (let i = 0; i < this.animators.length; i += 1) {
    animators.push(this.animators[i].serialize());
  }
  serializedData.text = {
    animators: animators,
  };
  return serializedData;
};

export function bm_textLayerReport(layer: any, onComplete: any, onFail: any): any {
  return new (TextLayer as any)(layer, onComplete, onFail);
}
