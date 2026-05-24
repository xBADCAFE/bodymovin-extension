import { bm_shapeReportHelper as shapeReportHelper } from './shapeReportHelper';

function ShapeCollection(this: any, shapes: any): void {
  this.shapes = shapes;
  this.collection = [];
  this.process();
}

ShapeCollection.prototype.process = function (): void {
  const shapes = this.shapes;
  const collection = this.collection;
  let i;
  const len = shapes.numProperties;
  let shape;
  for (i = 0; i < len; i += 1) {
    shape = shapes.property(i + 1);
    collection.push(shapeReportHelper.processShape(shape));
  }
};

ShapeCollection.prototype.serialize = function (): any {
  const shapes = [];
  for (let i = 0; i < this.collection.length; i += 1) {
    shapes.push(this.collection[i].serialize());
  }
  return {
    shapes: shapes,
  };
};

export function bm_shapeCollectionReport(shapes: any): any {
  return new (ShapeCollection as any)(shapes);
}
