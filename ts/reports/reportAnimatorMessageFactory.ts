function ReportAnimatorMessage(this: any, type: any, renderers: any): void {
  const reportMessageFactory = $.__bodymovin.bm_reportMessageFactory;
  const builderTypes = $.__bodymovin.bm_reportBuilderTypes;
  this._message = reportMessageFactory(type, renderers, builderTypes.ANIMATOR_PROPERTIES);
  this._properties = [];
}

ReportAnimatorMessage.prototype.addProperty = function (property: any): void {
  this._properties.push(property);
};

ReportAnimatorMessage.prototype.serialize = function (): any {
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

export function bm_reportAnimatorMessageFactory(type: any, renderers: any): any {
  return new (ReportAnimatorMessage as any)(type, renderers);
}
