import { bm_messageClassReport as MessageClass } from '../../messageClassReport';
import { bm_generalUtils as generalUtils } from '../../../utils/generalUtils';
import { bm_eventDispatcher } from '../../../eventManager';
import { bm_reportAnimatorMessageFactory as animatorMessageFactory } from '../../reportAnimatorMessageFactory';
import { bm_reportRendererTypes as rendererTypes } from '../../rendererTypes';
import { bm_reportMessageTypes as messageTypes } from '../../messageTypes';

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
const onlySkottieRenderers = [
  rendererTypes.BROWSER,
  rendererTypes.IOS,
  rendererTypes.ANDROID,
];

const defaultMessageType = messageTypes.ERROR;

const unsupportedProperties: { [key: string]: any } = {
  'ADBE Text Line Anchor': {
  },
  'ADBE Text Track Type': {
  },
  'ADBE Text Character Replace': {
  },
  'ADBE Text Character Offset': {
  },
  'ADBE Text Line Spacing': {
    message: [
      {
        type: defaultMessageType,
        renderers: [
          rendererTypes.BROWSER,
          rendererTypes.IOS,
          rendererTypes.ANDROID,
        ],
      },
    ],
  },
  'ADBE Text Blur': {
    renderers: onlySkottieRenderers,
  },
  'ADBE Text Anchor Point 3D': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Skew': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Skew Axis': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Fill Hue': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Fill Saturation': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Fill Brightness': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Stroke Hue': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Stroke Saturation': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Stroke Brightness': {
    renderers: onlyBrowserRenderers,
  },
  'ADBE Text Stroke Width': {
    renderers: onlyBrowserRenderers,
  },
};

function Animator(this: any, element: any): void {
  this.element = element;
  this.messages = [];
  this.selectors = [];
  this.process();
}

generalUtils.extendPrototype(Animator, MessageClass);

Animator.prototype.getMessageByTypeAndRenderers = function (type: any, renderers: any): any {
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

Animator.prototype.addProperty = function (animatorData: any): void {
  const messages = animatorData.messages;
  let messageData;
  for (let i = 0; i < messages.length; i += 1) {
    messageData = messages[i];
    const message = this.getMessageByTypeAndRenderers(messageData.type, messageData.renderers);
    message.addProperty(animatorData.name);
  }
};

Animator.prototype.processProperties = function (animatorProperty: any): void {
  let i;
  const len = animatorProperty.numProperties;
  let property;
  for (i = 0; i < len; i += 1) {
    property = animatorProperty.property(i + 1);
    if (property.canSetExpression) {
      if (unsupportedProperties[property.matchName]) {
        const propertyData = unsupportedProperties[property.matchName];
        this.addProperty({
          messages: propertyData.message || [
            {
              type: propertyData.type || defaultMessageType,
              renderers: propertyData.renderers || defaultRenderers,
            },
          ],
          name: property.name,
        });
      }
    }
  }
};

Animator.prototype.processSelectors = function (selectorProperty: any): void {
  const textSelector = $.__bodymovin.bm_textSelectorReport;
  let i;
  const len = selectorProperty.numProperties;
  let property;
  for (i = 0; i < len; i += 1) {
    property = selectorProperty.property(i + 1);
    this.selectors.push(textSelector(property));
  }
};

Animator.prototype.processAnimator = function (): void {
  let i;
  const len = this.element.numProperties;
  let property;
  for (i = 0; i < len; i += 1) {
    property = this.element.property(i + 1);
    if (property.matchName === 'ADBE Text Animator Properties') {
      this.processProperties(property);
    } else if (property.matchName === 'ADBE Text Selectors') {
      this.processSelectors(property);
    }
  }
};

Animator.prototype.process = function (): void {
  this.processAnimator();
};

Animator.prototype.serialize = function (): any {
  const messages = [];
  let i;
  for (i = 0; i < this.messages.length; i += 1) {
    messages.push(this.messages[i].message.serialize());
  }
  const selectors = [];
  for (i = 0; i < this.selectors.length; i += 1) {
    selectors.push(this.selectors[i].serialize());
  }
  return {
    messages: messages,
    selectors: selectors,
    name: this.element.name,
  };
};

export function bm_textAnimatorsReport(element: any): any {
  return new (Animator as any)(element);
}
