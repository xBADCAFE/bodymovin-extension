function ReportEffectMessage(this: any, type: any, renderers: any, builderType: any): void {
  const reportMessageFactory = $.__bodymovin.bm_reportMessageFactory;
  const builderTypes = $.__bodymovin.bm_reportBuilderTypes;
  builderType = builderType || builderTypes.EFFECTS;
  this._message = reportMessageFactory(type, renderers, builderType);
  this._effects = [];
}

ReportEffectMessage.prototype.addEffect = function (effect: any): void {
  this._effects.push(effect);
};

ReportEffectMessage.prototype.serialize = function (): any {
  const messageData = this._message.serialize();
  const serializedData: any = {};
  for (const s in messageData) {
    if (messageData.hasOwnProperty(s)) {
      serializedData[s] = messageData[s];
    }
  }
  serializedData.payload = {
    effects: this._effects,
  };
  return serializedData;
};

export function bm_reportEffectMessageFactory(type: any, renderers: any, effects: any): any {
  return new (ReportEffectMessage as any)(type, renderers, effects);
}
