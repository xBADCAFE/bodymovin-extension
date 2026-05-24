declare const XMPMeta: any;

const namespace = 'bodymovin';

function init(): void {
  const proj = app.project;

  if (ExternalObject.AdobeXMPScript == undefined) {
    ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
  }
  let schemaNS = XMPMeta.getNamespaceURI(namespace);
  if (schemaNS == "" || schemaNS == undefined) {
    schemaNS = XMPMeta.registerNamespace(namespace, namespace);
  }
}

function setMetadata(property: string, value: any): void {
  const proj = app.project;

  if (ExternalObject.AdobeXMPScript == undefined) {
    ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
  }
  const metaData = new XMPMeta(proj.xmpPacket);
  const schemaNS = XMPMeta.getNamespaceURI(namespace);
  if (schemaNS == "" || schemaNS == undefined) {
  } else {
    try {
      metaData.setProperty(schemaNS, namespace + ":" + property, value);
    } catch (err) {
    }
  }
  proj.xmpPacket = metaData.serialize();
}

function getMetadata(property: string): any {
  const proj = app.project;

  if (ExternalObject.AdobeXMPScript == undefined) {
    ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
  }
  const metaData = new XMPMeta(proj.xmpPacket);
  const schemaNS = XMPMeta.getNamespaceURI(namespace);
  if (schemaNS == "" || schemaNS == undefined) {
    return undefined;
  }
  const metaValue = metaData.getProperty(schemaNS, property);
  if (!metaValue) {
    return undefined;
  }
  return metaValue.value;
}

function getMetadataFromCep(property: string, returnAsJson: boolean): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const JSON = $.__bodymovin.JSON;

  let data = getMetadata(property);
  if (data) {
    if (returnAsJson) {
      try {
        data = JSON.parse(data.replace(/\\/g, '\\\\'));
      } catch (error) {
      }
    }
    bm_eventDispatcher.sendEvent('bm:xmpData:success:' + property, { value: data, property: property });
  } else {
    bm_eventDispatcher.sendEvent('bm:xmpData:failed:' + property, { property: property });
  }
}

init();

export const bm_XMPHelper = {
  init: init,
  setMetadata: setMetadata,
  getMetadata: getMetadata,
  getMetadataFromCep: getMetadataFromCep,
};
