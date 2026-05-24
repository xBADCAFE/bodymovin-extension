function LayerCollection(this: any, layers: any, onComplete: any, onFail: any): void {
  this.layers = layers;
  this.collection = [];
  this.currentLayerIndex = 0;
  this._onComplete = onComplete;
  this._onFail = onFail;
  this.onLayerComplete = this.onLayerComplete.bm_bind(this);
  this.onLayerFailed = this.onLayerFailed.bm_bind(this);
  this.processCurrentLayer = this.processCurrentLayer.bm_bind(this);
}

LayerCollection.prototype.process = function (): void {
  const layerReportHelper = $.__bodymovin.bm_layerReportHelper;
  const layers = this.layers;
  const collection = this.collection;
  const len = layers.length;
  let layer: any;
  for (let i = 0; i < len; i += 1) {
    layer = layers[i + 1];
    collection.push(layerReportHelper.createLayer(layer, this.onLayerComplete, this.onLayerFailed));
  }
  this.asynchronouslyProcessCurrentLayer();
};

LayerCollection.prototype.processCurrentLayer = function (): void {
  try {
    const currentLayer = this.collection[this.currentLayerIndex];
    if (currentLayer) {
      currentLayer.process();
    } else {
      this._onComplete();
    }
  } catch (error) {
    this._onFail(error);
  }
};

LayerCollection.prototype.asynchronouslyProcessCurrentLayer = function (): void {
  $.__bodymovin.reportScheduledMethod = this.processCurrentLayer;
  app.scheduleTask('$.__bodymovin.reportScheduledMethod();', 20, false);
};

LayerCollection.prototype.onLayerFailed = function (error: any): void {
  const layerReportHelper = $.__bodymovin.bm_layerReportHelper;
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  if (error) {
    bm_eventDispatcher.log(error.message);
    bm_eventDispatcher.log(error.line);
    bm_eventDispatcher.log(error.fileName);
  }
  bm_eventDispatcher.log($.stack);
  this.collection[this.currentLayerIndex] = layerReportHelper.createFailedLayer(
    this.layers[this.currentLayerIndex + 1],
    this.onLayerComplete,
    this.onLayerFailed
  );
  this.processCurrentLayer();
};

LayerCollection.prototype.onLayerComplete = function (): void {
  this.currentLayerIndex += 1;
  this.asynchronouslyProcessCurrentLayer();
};

LayerCollection.prototype.serialize = function (): any {
  const layers: any[] = [];
  for (let i = 0; i < this.collection.length; i += 1) {
    layers.push(this.collection[i].serialize());
  }
  return {
    layers: layers,
  };
};

export function bm_layerCollectionReport(layers: any, onComplete: any, onFail: any): any {
  return new (LayerCollection as any)(layers, onComplete, onFail);
}
