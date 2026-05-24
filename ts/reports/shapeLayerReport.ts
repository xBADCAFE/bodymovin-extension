function ShapeLayer(this: any, layer: any): void {
  this.layer = layer;
  this.layers = [];
  this.processTransform(layer.transform);
}

ShapeLayer.prototype.processTransform = function (): void {
};

ShapeLayer.prototype.serialize = function (): any {
  return {
    transform: this.transform.serialize(),
  };
};

export function bm_shapeLayerReport(layer: any): any {
  return new (ShapeLayer as any)(layer);
}
