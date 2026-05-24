function ReportMessage(this: any, type: any, renderers: any, builder: any): void {
  this._type = type || 'warning';
  this._renderers = renderers || [];
  this._builder = builder || '';
}

ReportMessage.prototype.serialize = function (): any {
  return {
    type: this._type,
    renderers: this._renderers,
    builder: this._builder,
  };
};

export function bm_reportMessageFactory(type: any, renderers: any, builder: any): any {
  return new (ReportMessage as any)(type, renderers, builder);
}
