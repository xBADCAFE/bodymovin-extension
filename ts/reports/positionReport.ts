function Position(this: any, transform: any, isThreeD: any): void {
  this.transform = transform;
  this.isThreeD = isThreeD;
  this.process();
}

(function (): void {
  const generalUtils = $.__bodymovin.bm_generalUtils;
  const MessageClass = $.__bodymovin.bm_messageClassReport;
  generalUtils.extendPrototype(Position, MessageClass);
})();

Position.prototype.processExpressions = function (): void {
};

Position.prototype.process = function (): void {
  const propertyReport = $.__bodymovin.bm_propertyReport;
  if (this.transform.position.dimensionsSeparated) {
    this.px = propertyReport(this.transform.property('ADBE Position_0'));
    this.py = propertyReport(this.transform.property('ADBE Position_1'));
    if (this.isThreeD) {
      this.pz = propertyReport(this.transform.property('ADBE Position_2'));
    }
  } else {
    this.p = propertyReport(this.transform.position);
  }
};

Position.prototype.serialize = function (): any {
  if (this.transform.position.dimensionsSeparated) {
    return {
      dimensionsSeparated: true,
      positionX: this.px.serialize(),
      positionY: this.py.serialize(),
      positionZ: this.isThreeD ? this.pz.serialize() : undefined,
    };
  } else {
    return {
      dimensionsSeparated: false,
      position: this.p.serialize(),
    };
  }
};

export function bm_positionReport(property: any, isThreeD: any): any {
  return new (Position as any)(property, isThreeD);
}
