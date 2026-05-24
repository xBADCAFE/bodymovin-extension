export function getLayerStyleType(name: string): number | string {
  const layerStyleTypes = $.__bodymovin.layerStyleTypes;
  switch (name) {
    case 'frameFX/enabled':
      return layerStyleTypes.stroke;
    case 'dropShadow/enabled':
      return layerStyleTypes.dropShadow;
    case 'innerShadow/enabled':
      return layerStyleTypes.innerShadow;
    case 'outerGlow/enabled':
      return layerStyleTypes.outerGlow;
    case 'innerGlow/enabled':
      return layerStyleTypes.innerGlow;
    case 'bevelEmboss/enabled':
      return layerStyleTypes.bevelEmboss;
    case 'chromeFX/enabled':
      return layerStyleTypes.satin;
    case 'solidFill/enabled':
      return layerStyleTypes.colorOverlay;
    case 'gradientFill/enabled':
      return layerStyleTypes.gradientOverlay;
    default:
      return '';
  }
}
