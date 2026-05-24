function Property(this: any, property: any): void {
  this.property = property;
  this.process();
}

(function (): void {
  const generalUtils = $.__bodymovin.bm_generalUtils;
  const MessageClass = $.__bodymovin.bm_messageClassReport;
  generalUtils.extendPrototype(Property, MessageClass);
})();

Property.prototype.processExpressions = function (): void {
  const rendererTypes = $.__bodymovin.bm_reportRendererTypes;
  const builderTypes = $.__bodymovin.bm_reportBuilderTypes;
  const messageTypes = $.__bodymovin.bm_reportMessageTypes;
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  const property = this.property;
  if (property.expressionEnabled && !property.expressionError && !settingsHelper.shouldBakeExpressions()) {
    this.addMessage(messageTypes.ERROR,
      [
        rendererTypes.SKOTTIE,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.EXPRESSIONS);
    if (property.expression.indexOf('wiggle(') !== -1) {
      this.addMessage(messageTypes.ERROR,
        [
          rendererTypes.BROWSER,
          rendererTypes.SKOTTIE,
          rendererTypes.IOS,
          rendererTypes.ANDROID,
        ],
        builderTypes.WIGGLE);
    }
  }
};

Property.prototype.areValuesEqual = function (value1: any, value2: any): boolean {
  if (typeof value1 === 'number') {
    return value1 === value2;
  } else if (value1.length) {
    for (let i = 0; i < value1.length; i += 1) {
      if (value1[i] !== value2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};

Property.prototype.checkModifiedValue = function (value: any): boolean {
  if (!this.areValuesEqual(this.property.value, value)
    || this.property.numKeys > 1
    || (this.property.expressionEnabled && !this.property.expressionError)
  ) {
    return true;
  } else {
    return false;
  }
};

Property.prototype.process = function (): void {
  this.processExpressions();
};

Property.prototype.serialize = function (): any {
  return this.serializeMessages();
};

export function bm_propertyReport(property: any): any {
  return new (Property as any)(property);
}
