export function getMaskType(mode: any): string | undefined {
  const maskTypes = $.__bodymovin.maskTypes;
  switch (mode) {
    case MaskMode.NONE:
      return maskTypes.NONE;
    case MaskMode.ADD:
      return maskTypes.ADD;
    case MaskMode.SUBTRACT:
      return maskTypes.SUBTRACT;
    case MaskMode.INTERSECT:
      return maskTypes.INTERSECT;
    case MaskMode.LIGHTEN:
      return maskTypes.LIGHTEN;
    case MaskMode.DARKEN:
      return maskTypes.DARKEN;
    case MaskMode.DIFFERENCE:
      return maskTypes.DIFFERENCE;
    default:
      return undefined;
  }
}
