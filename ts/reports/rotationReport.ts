function Rotation(this: any, transform: any, isThreeD: any): void {
  this.transform = transform;
  this.isThreeDimensional = isThreeD;
  this.process();
}

(function (): void {
  const generalUtils = $.__bodymovin.bm_generalUtils;
  const MessageClass = $.__bodymovin.bm_messageClassReport;
  generalUtils.extendPrototype(Rotation, MessageClass);
})();

Rotation.prototype.processExpressions = function (): void {
};

Rotation.prototype.process = function (): void {
  const propertyReport = $.__bodymovin.bm_propertyReport;
  if (this.isThreeDimensional) {
    this.rx = propertyReport(this.transform.property('ADBE Rotate X'));
    this.ry = propertyReport(this.transform.property('ADBE Rotate Y'));
    this.rz = propertyReport(this.transform.property('ADBE Rotate Z'));
    this.or = propertyReport(this.transform.Orientation);
  } else {
    this.r = propertyReport(this.transform.rotation);
  }
};

Rotation.prototype.serialize = function (): any {
  if (this.isThreeDimensional) {
    return {
      isThreeD: true,
      rotationX: this.rx.serialize(),
      rotationY: this.ry.serialize(),
      rotationZ: this.rz.serialize(),
      orientation: this.or.serialize(),
    };
  } else {
    return {
      isThreeD: false,
      rotation: this.r.serialize(),
    };
  }
};

export function bm_rotationReport(property: any, isThreeD: any): any {
  return new (Rotation as any)(property, isThreeD);
}
