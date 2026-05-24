import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { bm_eventDispatcher } from '../../../eventManager';
import { bm_reportAnimatorSelectorMessageFactory as animatorMessageFactory } from '../../reportAnimatorSelectorMessageFactory';
import { bm_reportRendererTypes as rendererTypes } from '../../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../../messageTypes';
import { bm_reportBuilderTypes as builderTypes } from '../../builderTypes';

const defaultRenderers = [
  rendererTypes.BROWSER,
  rendererTypes.IOS,
  rendererTypes.ANDROID,
  rendererTypes.SKOTTIE,
];
const onlyBrowserRenderers = [
  rendererTypes.IOS,
  rendererTypes.ANDROID,
  rendererTypes.SKOTTIE,
];

const defaultMessageType = messageTypes.ERROR;

const unsupportedProperties: { [key: string]: any } = {};

function TextSelector(this: any, selector: any): void {
  this.selector = selector;
  this.messages = [];
  this.selectors = [];
  this.process();
}

generalUtils.extendPrototype(TextSelector, MessageClass);

TextSelector.prototype.getMessageByTypeAndRenderers = function (type: any, renderers: any): any {
  const key = type + '_' + renderers.join('-');
  for (let i = 0; i < this.messages.length; i += 1) {
    if (this.messages[i].key === key) {
      return this.messages[i].message;
    }
  }
  const message = {
    key: key,
    message: animatorMessageFactory(type, renderers),
  };
  this.messages.push(message);
  return message.message;
};

TextSelector.prototype.addProperty = function (selectorData: any): void {
  const messages = selectorData.messages;
  let messageData;
  for (let i = 0; i < messages.length; i += 1) {
    messageData = messages[i];
    const message = this.getMessageByTypeAndRenderers(messageData.type, messageData.renderers);
    message.addProperty(selectorData.name);
  }
};

TextSelector.prototype.processSelectorProperties = function (selectorProperty: any): void {
  const advancedProperty = selectorProperty.property('ADBE Text Range Advanced');
  const isRandomized = advancedProperty.property('ADBE Text Randomize Order').value;
  if (isRandomized === 1) {
    this.addProperty({
      messages: [
        {
          type: defaultMessageType,
          renderers: onlyBrowserRenderers,
        },
      ],
      name: 'Randomize',
    });
  }
};

TextSelector.prototype.processSelector = function (): void {
  const propertyName = this.selector.matchName;
  if (propertyName === 'ADBE Text Selector') {
    this.processSelectorProperties(this.selector);
  } else if (propertyName === 'ADBE Text Expressible Selector'
    || propertyName === 'ADBE Text Wiggly Selector'
  ) {
    this.addMessage(defaultMessageType,
      defaultRenderers,
      builderTypes.TEXT_SELECTOR_TYPE);
  }
};

TextSelector.prototype.process = function (): void {
  this.processSelector();
};

TextSelector.prototype.serialize = function (): any {
  const messages = this.serializeMessages();
  for (let i = 0; i < this.messages.length; i += 1) {
    messages.push(this.messages[i].message.serialize());
  }
  return {
    messages: messages,
    name: this.selector.name,
  };
};

export function bm_textSelectorReport(element: any): any {
  return new (TextSelector as any)(element);
}
