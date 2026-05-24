function ReportAnimatorSelectorMessage(this: any, type: any, renderers: any): void {
  const reportMessageFactory = $.__bodymovin.bm_reportMessageFactory;
  const builderTypes = $.__bodymovin.bm_reportBuilderTypes;
  this._message = reportMessageFactory(type, renderers, builderTypes.TEXT_SELECTOR_PROPERTIES);
  this._properties = [];
}

ReportAnimatorSelectorMessage.prototype.addProperty = function (property: any): void {
  this._properties.push(property);
};

ReportAnimatorSelectorMessage.prototype.serialize = function (): any {
  const messageData = this._message.serialize();
  const serializedData: any = {};
  for (const s in messageData) {
    if (messageData.hasOwnProperty(s)) {
      serializedData[s] = messageData[s];
    }
  }
  serializedData.payload = {
    properties: this._properties,
  };
  return serializedData;
};

export function bm_reportAnimatorSelectorMessageFactory(type: any, renderers: any): any {
  return new (ReportAnimatorSelectorMessage as any)(type, renderers);
}
