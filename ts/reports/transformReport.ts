function Transform(this: any, transform: any, isThreeD: any): void {
  this.transform = transform;
  this.isThreeD = isThreeD || false;
  this.process();
}

Transform.prototype.processProperties = function (): void {
  const propertyReport = $.__bodymovin.bm_propertyReport;
  const positionReport = $.__bodymovin.bm_positionReport;
  const rotationReport = $.__bodymovin.bm_rotationReport;
  if (this.transform.Scale) {
    this.scale = propertyReport(this.transform.Scale);
  }
  if (this.transform.Opacity) {
    this.opacity = propertyReport(this.transform.Opacity);
  }
  if (this.transform.property('Start Opacity')) {
    this.startOpacity = propertyReport(this.transform.property('Start Opacity'));
  }
  if (this.transform.property('End Opacity')) {
    this.endOpacity = propertyReport(this.transform.property('End Opacity'));
  }
  if (this.transform.property('Anchor Point')) {
    this.anchorPoint = propertyReport(this.transform.property('Anchor Point'));
  }

  this.rotation = rotationReport(this.transform, this.isThreeD);
  this.position = positionReport(this.transform, this.isThreeD);

  if (this.transform.property('Skew') && this.transform.property('Skew').canSetExpression) {
    this.skew = propertyReport(this.transform.property('Skew'));
    this.skewAxis = propertyReport(this.transform.property('Skew Axis'));
  }
};

Transform.prototype.process = function (): void {
  this.processProperties();
};

Transform.prototype.serialize = function (): any {
  return {
    anchorPoint: this.anchorPoint ? this.anchorPoint.serialize() : undefined,
    scale: this.scale ? this.scale.serialize() : undefined,
    opacity: this.opacity ? this.opacity.serialize() : undefined,
    rotation: this.rotation ? this.rotation.serialize() : undefined,
    position: this.position.serialize(),
    skew: this.skew ? this.skew.serialize() : undefined,
    skewAxis: this.skewAxis ? this.skewAxis.serialize() : undefined,
    startOpacity: this.startOpacity ? this.startOpacity.serialize() : undefined,
    endOpacity: this.endOpacity ? this.endOpacity.serialize() : undefined,
  };
};

export function bm_transformReportFactory(transform: any, isThreeD: any): any {
  return new (Transform as any)(transform, isThreeD);
}
