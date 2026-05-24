import { bm_messageClassReport as MessageClass } from './messageClassReport';
import { bm_generalUtils as generalUtils } from '../utils/generalUtils';

function Layer(this: any, layer: any): void {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  this.layer = layer;
  this.isExported = (layer.enabled && !this.layer.guideLayer)
    || (!this.layer.enabled && settingsHelper.shouldIncludeHiddenLayers())
    || (this.layer.guideLayer && settingsHelper.shouldIncludeGuidedLayers());
  this.LARGE_LAYER_SIZE = 1000 * 1000;
  this.layerRect = this.layer.sourceRectAtTime(0, false);
  this.process();
}

generalUtils.extendPrototype(Layer, MessageClass);

Layer.prototype.process = function (): void {
  if (!this.isExported) {
    return;
  }
  this.processProperties();
  this.processTransform();
  this.processStyles();
  this.processEffects();
  this.processMasks();
};

Layer.prototype.processProperties = function (): void {
  const rendererTypes = $.__bodymovin.bm_reportRendererTypes;
  const builderTypes = $.__bodymovin.bm_reportBuilderTypes;
  const messageTypes = $.__bodymovin.bm_reportMessageTypes;
  const settingsHelper = $.__bodymovin.bm_settingsHelper;

  if ((!this.layer.enabled && settingsHelper.shouldIncludeHiddenLayers())
    || (this.layer.guideLayer && settingsHelper.shouldIncludeGuidedLayers())) {
    this.addMessage(messageTypes.WARNING,
      [
        rendererTypes.SKOTTIE,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.DISABLED_LAYER);
  }
  if (this.layer.motionBlur) {
    this.addMessage(messageTypes.WARNING,
      [
        rendererTypes.BROWSER,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.MOTION_BLUR);
  }
  if (this.layer.preserveTransparency) {
    this.addMessage(messageTypes.WARNING,
      [
        rendererTypes.BROWSER,
        rendererTypes.SKOTTIE,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.PRESERVE_TRANSPARENCY);
  }
  if (this.layer.threeDLayer) {
    this.addMessage(messageTypes.ERROR,
      [
        rendererTypes.SKOTTIE,
        rendererTypes.IOS,
        rendererTypes.ANDROID,
      ],
      builderTypes.THREE_D_LAYER);
  }
  if (this.layer.threeDLayer) {
    this.addMessage(messageTypes.WARNING,
      [
        rendererTypes.BROWSER,
      ],
      builderTypes.THREE_D_LAYER);
  }
  if (this.layer.isTrackMatte) {
    const rect = this.layerRect;
    if (rect.height * rect.width >= this.LARGE_LAYER_SIZE) {
      this.addMessage(messageTypes.WARNING,
        [
          rendererTypes.BROWSER,
          rendererTypes.SKOTTIE,
          rendererTypes.IOS,
          rendererTypes.ANDROID,
        ],
        builderTypes.LARGE_MASK);
    }
  }
};

Layer.prototype.processTransform = function (): void {
  const transformFactory = $.__bodymovin.bm_transformReportFactory;
  const getLayerType = $.__bodymovin.getLayerType;
  const layerTypes = $.__bodymovin.layerTypes;
  const layerType = getLayerType(this.layer);
  const isThreeD = this.layer.threeDLayer || layerType === layerTypes.camera;
  if (this.layer.transform) {
    this.transform = transformFactory(this.layer.transform, isThreeD);
  }
};

Layer.prototype.processEffects = function (): void {
  const effectsFactory = $.__bodymovin.bm_effectsReportFactory;
  const rendererTypes = $.__bodymovin.bm_reportRendererTypes;
  const builderTypes = $.__bodymovin.bm_reportBuilderTypes;
  const messageTypes = $.__bodymovin.bm_reportMessageTypes;
  this.effects = effectsFactory(this.layer.effect || { numProperties: 0 });
  if (this.effects.hasSupportedEffects()) {
    const rect = this.layerRect;
    if (rect.height * rect.width >= this.LARGE_LAYER_SIZE) {
      this.addMessage(messageTypes.WARNING,
        [
          rendererTypes.BROWSER,
          rendererTypes.SKOTTIE,
          rendererTypes.IOS,
          rendererTypes.ANDROID,
        ],
        builderTypes.LARGE_EFFECTS);
    }
  }
};

Layer.prototype.processMasks = function (): void {
  const masksFactory = $.__bodymovin.bm_masksReportFactory;
  this.masks = masksFactory(this.layer.mask || { numProperties: 0 });
};

Layer.prototype.processStyles = function (): void {
  const layerStylesFactory = $.__bodymovin.bm_layerStylesReportFactory;
  this.styles = layerStylesFactory(this.layer.property('Layer Styles') || { numProperties: 0 });
};

Layer.prototype.serialize = function (): any {
  const getLayerType = $.__bodymovin.getLayerType;
  if (!this.isExported) {
    return {
      name: this.layer.name,
      index: this.layer.index,
      type: getLayerType(this.layer),
      messages: this.serializeMessages(),
    };
  } else {
    return {
      name: this.layer.name,
      index: this.layer.index,
      type: getLayerType(this.layer),
      messages: this.serializeMessages(),
      transform: this.transform ? this.transform.serialize() : undefined,
      styles: this.isExported ? this.styles.serialize() : undefined,
      effects: this.isExported ? this.effects.serialize() : undefined,
      masks: this.masks ? this.masks.serialize() : undefined,
    };
  }
};

export function bm_layerReport(layer: any): any {
  return new (Layer as any)(layer);
}
