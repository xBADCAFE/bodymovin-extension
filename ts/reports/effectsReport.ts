const skippedEffectMatchNames: { [key: string]: string } = {
  'ADBE Effect Built In Params': 'ADBE Effect Built In Params',
  'Pseudo/Bodymovin Text Props 3': 'Pseudo/Bodymovin Text Props 3',
};

const supportedEffects: string[] = [
  'ADBE Tint',
  'ADBE Fill',
  'ADBE Stroke',
  'ADBE Tritone',
  'ADBE Pro Levels2',
  'ADBE Drop Shadow',
  'ADBE Set Matte3',
  'ADBE Gaussian Blur 2',
];

function Effects(this: any, effects: any): void {
  this.effectsProperty = effects;
  this.messages = [];
  this._addedEffects = [];
  this.process();
}

Effects.prototype.getMessageByTypeAndRenderers = function (type: any, renderers: any, builder: any): any {
  const effectMessageFactory = $.__bodymovin.bm_reportEffectMessageFactory;
  const key = type + '_' + renderers.join('-');
  for (let i = 0; i < this.messages.length; i += 1) {
    if (this.messages[i].key === key) {
      return this.messages[i].message;
    }
  }
  const message = {
    key: key,
    message: effectMessageFactory(type, renderers, builder),
  };
  this.messages.push(message);
  return message.message;
};

Effects.prototype.addEffect = function (effectData: any): void {
  const messages = effectData.messages;
  let messageData: any;
  for (let i = 0; i < messages.length; i += 1) {
    messageData = messages[i];
    const message = this.getMessageByTypeAndRenderers(messageData.type, messageData.renderers, messageData.builder);
    message.addEffect(effectData.name);
  }
};

Effects.prototype.process = function (): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const effectsMessages = $.__bodymovin.bm_reportsEffectMessages;
  for (let i = 0; i < this.effectsProperty.numProperties; i += 1) {
    const effectElement = this.effectsProperty(i + 1);
    bm_eventDispatcher.log('effectElement.matchName');
    bm_eventDispatcher.log(effectElement.matchName);
    if (effectElement.enabled && !skippedEffectMatchNames[effectElement.matchName]) {
      if (effectsMessages[effectElement.matchName]) {
        this.addEffect(effectsMessages[effectElement.matchName]);
      } else {
        this.addUnhandledEffect(effectElement);
      }
      this.checkSupportedEffects(effectElement.matchName);
    }
  }
};

Effects.prototype.checkSupportedEffects = function (effectName: any): void {
  for (let i = 0; i < supportedEffects.length; i += 1) {
    if (supportedEffects[i] === effectName) {
      this._addedEffects.push(effectName);
    }
  }
};

Effects.prototype.hasSupportedEffects = function (): boolean {
  return this._addedEffects.length > 0;
};

Effects.prototype.addUnhandledEffect = function (effect: any): void {
  const rendererTypes = $.__bodymovin.bm_reportRendererTypes;
  const messageTypes = $.__bodymovin.bm_reportMessageTypes;
  const message = this.getMessageByTypeAndRenderers(messageTypes.ERROR,
    [
      rendererTypes.BROWSER,
      rendererTypes.IOS,
      rendererTypes.ANDROID,
      rendererTypes.SKOTTIE,
    ]);
  message.addEffect(effect.name);
};

Effects.prototype.serialize = function (): any {
  if (this.messages.length === 0) {
    return undefined;
  } else {
    const messages: any[] = [];
    for (let i = 0; i < this.messages.length; i += 1) {
      messages.push(this.messages[i].message.serialize());
    }
    return messages;
  }
};

export function bm_effectsReportFactory(effects: any): any {
  return new (Effects as any)(effects);
}
