function Animation(this: any, animation: any, onComplete: any, onFail: any): void {
  const layerCollectionFactory = $.__bodymovin.bm_layerCollectionReport;
  this.animation = animation;
  this.messages = [];
  this._onComplete = onComplete;
  this._onFail = onFail;
  this.onLayersComplete = this.onLayersComplete.bm_bind(this);
  try {
    this.layerCollection = layerCollectionFactory(animation.layers, this.onLayersComplete, this._onFail);
  } catch (error) {
    this._onFail(error);
  }
  this.process();
}

Animation.prototype.process = function (): void {
  this.layerCollection.process();
};

Animation.prototype.onLayersComplete = function (): void {
  this._onComplete(this);
};

Animation.prototype.serialize = function (): any {
  const versionHelper = $.__bodymovin.bm_versionHelper;
  try {
    const layerCollection = this.layerCollection.serialize();
    const serializedData: any = {
      layers: layerCollection.layers,
    };

    const messages: any[] = [];
    for (let i = 0; i < this.messages.length; i += 1) {
      messages.push(this.messages[i].serialize());
    }
    serializedData.messages = messages;
    serializedData.id = this.animation.id;
    serializedData.name = this.animation.name;
    serializedData.version = versionHelper.get();
    return serializedData;
  } catch (error) {
    return null;
  }
};

export function bm_animationReport(animation: any, onComplete: any, onFail: any): any {
  return new (Animation as any)(animation, onComplete, onFail);
}
