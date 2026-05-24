import type { AEError } from '../core/types';

let keyframeHelper: any;
let textHelper: any;

let rootProperties: any[] = [];
let exportedProps: { [key: string]: any } = {};

const propType = {
  Color: 1,
  Point: 2,
  Scale: 3,
  Float: 4,
  Asset: 50,
  Undefined: 99,
};

const matchType: { [key: string]: number } = {
  'ADBE Vector Fill Color': propType.Color,
  'ADBE Vector Stroke Color': propType.Color,
  'ADBE Text Stroke Color': propType.Color,
  'ADBE Text Fill Color': propType.Color,
  'ADBE Position': propType.Point,
  'ADBE Vector Repeater Position': propType.Point,
  'ADBE Vector Repeater Anchor': propType.Point,
  'ADBE Anchor Point': propType.Point,
  'ADBE Vector Grad Start Pt': propType.Point,
  'ADBE Vector Grad End Pt': propType.Point,
  'ADBE Vector Rect Position': propType.Point,
  'ADBE Vector Ellipse Position': propType.Point,
  'ADBE Vector Star Position': propType.Point,
  'ADBE Text Anchor Point 3D': propType.Point,
  'ADBE Text Position 3D': propType.Point,
  'ADBE Vector Position': propType.Point,
  'ADBE Vector Anchor': propType.Point,
  'ADBE Opacity': propType.Float,
  'ADBE Vector Fill Opacity': propType.Float,
  'ADBE Vector Stroke Opacity': propType.Float,
  'ADBE Vector Stroke Width': propType.Float,
  'ADBE Position_0': propType.Float,
  'ADBE Position_1': propType.Float,
  'ADBE Position_2': propType.Float,
  'ADBE Rotate X': propType.Float,
  'ADBE Rotate Y': propType.Float,
  'ADBE Rotate Z': propType.Float,
  'ADBE Vector Rect Roundness': propType.Float,
  'ADBE Vector Star Points': propType.Float,
  'ADBE Vector Star Rotation': propType.Float,
  'ADBE Vector Star Inner Radius': propType.Float,
  'ADBE Vector Star Inner Roundess': propType.Float,
  'ADBE Vector Star Outer Radius': propType.Float,
  'ADBE Vector Star Outer Roundess': propType.Float,
  'ADBE Vector Offset Amount': propType.Float,
  'ADBE Vector Offset Miter Limit': propType.Float,
  'ADBE Vector PuckerBloat Amount': propType.Float,
  'ADBE Vector Repeater Copies': propType.Float,
  'ADBE Vector Repeater Offset': propType.Float,
  'ADBE Vector Repeater Rotation': propType.Float,
  'ADBE Vector Repeater Opacity 1': propType.Float,
  'ADBE Vector Repeater Opacity 2': propType.Float,
  'ADBE Vector RoundCorner Radius': propType.Float,
  'ADBE Vector Trim Start': propType.Float,
  'ADBE Vector Trim End': propType.Float,
  'ADBE Vector Trim Offset': propType.Float,
  'ADBE Vector Twist Angle': propType.Float,
  'ADBE Vector Twist Center': propType.Float,
  'ADBE Vector Zigzag Size': propType.Float,
  'ADBE Vector Zigzag Detail': propType.Float,
  'ADBE Text Percent Start': propType.Float,
  'ADBE Text Percent End': propType.Float,
  'ADBE Text Index Start': propType.Float,
  'ADBE Text Index End': propType.Float,
  'ADBE Text Levels Max Ease': propType.Float,
  'ADBE Text Levels Min Ease': propType.Float,
  'ADBE Text Selector Max Amount': propType.Float,
  'ADBE Text Skew': propType.Float,
  'ADBE Text Skew Axis': propType.Float,
  'ADBE Text Rotation': propType.Float,
  'ADBE Text Opacity': propType.Float,
  'ADBE Text Fill Hue': propType.Float,
  'ADBE Text Fill Saturation': propType.Float,
  'ADBE Text Fill Brightness': propType.Float,
  'ADBE Text Stroke Opacity': propType.Float,
  'ADBE Text Stroke Hue': propType.Float,
  'ADBE Text Stroke Saturation': propType.Float,
  'ADBE Text Stroke Brightness': propType.Float,
  'ADBE Text Stroke Width': propType.Float,
  'ADBE Text Tracking Amount': propType.Float,
  'ADBE Vector Rotation': propType.Float,
  'ADBE Vector Group Opacity': propType.Float,
  'ADBE Vector Skew': propType.Float,
  'ADBE Vector Skew Axis': propType.Float,
  'ADBE Scale': propType.Scale,
  'ADBE Vector Rect Size': propType.Scale,
  'ADBE Vector Ellipse Size': propType.Scale,
  'ADBE Vector Repeater Scale': propType.Scale,
  'ADBE Text Scale 3D': propType.Scale,
  'ADBE Vector Scale': propType.Scale,
};

function clearTextProperties(propertyName: string, data: any): void {
  const bm_generalUtils = $.__bodymovin.bm_generalUtils;
  const textDict: { [key: string]: string } = {
    'font': 'f',
    'f': 'f',
    'size': 's',
    's': 's',
    'color': 'fc',
    'fc': 'fc',
    'justification': 'j',
    'justify': 'j',
    'j': 'j',
    'text': 't',
    't': 't',
    'all caps': 'ca',
    'allcaps': 'ca',
    'ca': 'ca',
  };
  if (propertyName.indexOf('|') !== -1) {
    const properties = propertyName.split('|');
    const keyframes = data.k;
    const persistingProps: { [key: string]: boolean } = {};
    let i: number;
    for (i = 0; i < properties.length; i += 1) {
      const sanitizedProp = bm_generalUtils.trimText(properties[i]);
      if (textDict.hasOwnProperty(sanitizedProp)) {
        persistingProps[textDict[sanitizedProp]] = true;
      }
    }
    for (i = 0; i < keyframes.length; i += 1) {
      const keyframe = keyframes[i];
      const textDocumentProp = keyframe.s;
      for (const s in textDocumentProp) {
        if (textDocumentProp.hasOwnProperty(s) && !persistingProps.hasOwnProperty(s)) {
          delete textDocumentProp[s];
        }
      }
    }
  }
}

function addCompProperties(composition: any, frameRate: number): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  bm_eventDispatcher.log('addCompProperties');

  function iterateProperty(parent: any, frameRate: number, properties: any[]): void {
    const totalProperties = parent.numProperties;
      for (let i = 0; i < totalProperties; i += 1) {
        const property = parent.property(i + 1);
        const propData: any = {
          property: property,
          id: property.name,
        };
        if (property.matchName === 'ADBE Layer Source Alternate') {
          propData.type = 'source';
          propData.layer = property.essentialPropertySource;
        } else if (property.matchName === 'ADBE Layer Overrides Group') {
          propData.type = 'group';
          propData.properties = [];
          iterateProperty(property, frameRate, propData.properties);
        } else if (property.matchName === 'ADBE Text Document'
              || property.matchName === 'ADBE EP Text Document') {
          propData.type = 'property';
          propData.val = {};
          const textDocumentSource = property.essentialPropertySource;
          const textLayer = textDocumentSource.parentProperty.parentProperty;
          textHelper.exportTextDocumentData(textLayer, propData.val, frameRate);
          clearTextProperties(property.name, propData.val);
        } else {
          propData.type = 'property';
          if (propData.id.substr(0, 1) === '#') {
            propData.val = keyframeHelper.exportKeyframes(property.essentialPropertySource, frameRate, 1);
          } else {
            propData.val = keyframeHelper.exportKeyframes(property, frameRate, 1);
          }
        }
        properties.push(propData);
      }
  }
  try {
    if (!composition.essentialProperty) {
      return;
    }
    if (!settingsHelper.shouldExportEssentialProperties()) {
      return;
    }

    if (!keyframeHelper) {
      keyframeHelper = $.__bodymovin.bm_keyframeHelper;
    }
    if (!textHelper) {
      textHelper = $.__bodymovin.bm_textHelper;
    }
    const essentialProperty = composition.essentialProperty;
    iterateProperty(essentialProperty, frameRate, rootProperties);

  } catch (error) {
    if (error) {
      const e = error as AEError;
      bm_eventDispatcher.log('ERROR:essentialPropertiesHelper:addCompProperties');
      bm_eventDispatcher.log(e.message);
      bm_eventDispatcher.log(e.line);
      bm_eventDispatcher.log(e.fileName);
    }
    bm_eventDispatcher.log(($ as any).stack);
  }
}

function searchProperty(property: any): any {

  function searchPropertyInList(property: any, list: any[]): any {
    let i: number;
    const len = list.length;
    for (i = 0; i < len; i += 1) {
      if (list[i].type === 'property') {
        // eslint-disable-next-line eqeqeq
        if (list[i].property.essentialPropertySource == property) {
          return list[i].val;
        }
      } else if (list[i].type === 'group') {
        const prop = searchPropertyInList(property, list[i].properties);
        if (prop) {
          return prop;
        }
      }
    }
    return null;
  }

  return searchPropertyInList(property, rootProperties);
}

function searchPropertyId(property: any): any {

  function searchPropertyInList(property: any, list: any[], groupId: string): any {
    let i: number;
    const len = list.length;
    for (i = 0; i < len; i += 1) {
      if (list[i].type === 'property') {
        // eslint-disable-next-line eqeqeq
        if (list[i].property.essentialPropertySource == property) {
          if (groupId) {
            return groupId;
          } else {
            if (matchType[property.matchName]) {
              list[i].prop.t = matchType[property.matchName];
            } else {
              list[i].prop.t = propType.Undefined;
            }
          }
          return list[i].id;
        }
      } else if (list[i].type === 'group') {
        const propId = searchPropertyInList(property, list[i].properties, list[i].id);
        if (propId) {
          if (matchType[property.matchName]) {
            list[i].prop.t = matchType[property.matchName];
          } else {
            list[i].prop.t = propType.Undefined;
          }
          return propId;
        }
      }
    }
    return null;
  }

  return searchPropertyInList(property, rootProperties, '');
}

function exportProperties(): { [key: string]: any } | undefined {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  if (!settingsHelper.shouldExportEssentialPropertiesAsSlots()) {
    return undefined;
  }
  exportedProps = {};
  let count = 0;
  let prop: any;
  for (let i = 0; i < rootProperties.length; i += 1) {
    if (rootProperties[i].type === 'property') {
      prop = {
        p: rootProperties[i].val,
      };
      rootProperties[i].prop = prop;
      exportedProps[rootProperties[i].id] = prop;
      count += 1;
    } else if (rootProperties[i].type === 'source') {
      count += 1;
    } else if (rootProperties[i].type === 'group' && rootProperties[i].properties.length > 0) {
      prop = {
        p: rootProperties[i].properties[0].val,
      };
      rootProperties[i].prop = prop;
      exportedProps[rootProperties[i].id] = prop;
      count += 1;
    }
  }
  if (count === 0) {
    return undefined;
  }
  return exportedProps;
}

function searchAsset(sourceData: any, savingData: any): string {
  const bm_generalUtils = $.__bodymovin.bm_generalUtils;
  for (let i = 0; i < rootProperties.length; i += 1) {
    if (rootProperties[i].type === 'source' && rootProperties[i].layer.source === sourceData.source) {
      const prop: any = {
        t: propType.Asset,
        p: bm_generalUtils.cloneObject(savingData, true),
      };
      prop.p.fileId = undefined;
      exportedProps[rootProperties[i].id] = prop;
      return rootProperties[i].id;
    }
  }
  return '';
}

function reset(): void {
  rootProperties = [];
  exportedProps = {};
}

export const bm_essentialPropertiesHelper = {
  addCompProperties: addCompProperties,
  exportProperties: exportProperties,
  searchProperty: searchProperty,
  searchPropertyId: searchPropertyId,
  searchAsset: searchAsset,
  reset: reset,
};
