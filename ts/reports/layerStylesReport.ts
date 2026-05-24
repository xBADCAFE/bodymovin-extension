import { bm_messageClassReport as MessageClass } from './messageClassReport';
import { bm_generalUtils as generalUtils } from '../utils/generalUtils';

function LayerStyles(this: any, styles: any): void {
  this.stylesProperty = styles;
  this.styles = [];
  this.messages = [];
  this.process();
}

generalUtils.extendPrototype(LayerStyles, MessageClass);

function buildStyleReport(type: any, style: any): any {
  const layerStyleTypes = $.__bodymovin.layerStyleTypes;
  const styleTypesFactories: { [key: string]: (style: any) => any } = {};
  styleTypesFactories[layerStyleTypes.stroke] = $.__bodymovin.bm_layerStylesStrokeFactory;
  styleTypesFactories[layerStyleTypes.dropShadow] = $.__bodymovin.bm_layerStylesDropShadowFactory;
  styleTypesFactories[layerStyleTypes.innerShadow] = $.__bodymovin.bm_layerStylesInnerShadowFactory;
  styleTypesFactories[layerStyleTypes.outerGlow] = $.__bodymovin.bm_layerStylesOuterGlowFactory;
  styleTypesFactories[layerStyleTypes.innerGlow] = $.__bodymovin.bm_layerStylesInnerGlowFactory;
  styleTypesFactories[layerStyleTypes.bevelEmboss] = $.__bodymovin.bm_layerStylesBevelEmbossFactory;
  styleTypesFactories[layerStyleTypes.satin] = $.__bodymovin.bm_layerStylesSatinFactory;
  styleTypesFactories[layerStyleTypes.colorOverlay] = $.__bodymovin.bm_layerStylesColorOverlayFactory;
  styleTypesFactories[layerStyleTypes.gradientOverlay] = $.__bodymovin.bm_layerStylesGradientOverlayFactory;
  return styleTypesFactories[type](style);
}

LayerStyles.prototype.process = function (): void {
  const getStyleType = $.__bodymovin.getLayerStyleType;
  let styleElement: any;
  let styleType: any;
  for (let i = 0; i < this.stylesProperty.numProperties; i += 1) {
    styleElement = this.stylesProperty(i + 1);
    styleType = getStyleType(styleElement.matchName);
    if (styleElement.enabled && styleType !== '') {
      this.styles.push(buildStyleReport(styleType, styleElement));
    }
  }
};

LayerStyles.prototype.serialize = function (): any {
  const styles: any[] = [];
  for (let i = 0; i < this.styles.length; i += 1) {
    styles.push(this.styles[i].serialize());
  }
  return {
    messages: this.serializeMessages(),
    styles: styles,
  };
};

export function bm_layerStylesReportFactory(styles: any): any {
  return new (LayerStyles as any)(styles);
}
