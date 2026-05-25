let _endCallback: () => void;

function initialIdleStatus(): any {
  const bm = $.__bodymovin;
  const exporterHelpers = bm && bm.bm_exporterHelpers;
  return exporterHelpers ? exporterHelpers.exportStatuses.IDLE : undefined;
}

const results: { [key: string]: { status: any } } = {
  avd: {
    status: initialIdleStatus(),
  },
  smil: {
    status: initialIdleStatus(),
  },
  banner: {
    status: initialIdleStatus(),
  },
  demo: {
    status: initialIdleStatus(),
  },
  rive: {
    status: initialIdleStatus(),
  },
  standalone: {
    status: initialIdleStatus(),
  },
  standard: {
    status: initialIdleStatus(),
  },
};

function separateComps(layers: any[], comps: any[]): void {
  const layerTypes = $.__bodymovin.layerTypes;
  let i: number;
  const len = layers.length;
  for (i = 0; i < len; i += 1) {
    if (layers[i].ty === layerTypes.precomp && layers[i].compId) {
      comps.push({
        id: layers[i].compId,
        nm: layers[i].compName,
        fr: layers[i].frameRate,
        pfr: layers[i].preserveNestedFrameRate,
        layers: layers[i].layers,
      });
      separateComps(layers[i].layers, comps);
      delete layers[i].compId;
      delete layers[i].layers;
      delete layers[i].compName;
      delete layers[i].frameRate;
      delete layers[i].preserveNestedFrameRate;
    }
  }
}

function deleteAssetParams(assets: any[]): void {
  if (!assets) {
    return;
  }
  let i: number;
  const len = assets.length;
  for (i = 0; i < len; i += 1) {
    assets[i].fileId = undefined;
  }
}

function deleteLayerParams(layers: any[]): void {
  const layerTypes = $.__bodymovin.layerTypes;
  let i: number;
  const len = layers.length;
  for (i = 0; i < len; i += 1) {
    delete layers[i].isValid;
    delete layers[i].isGuide;
    delete layers[i].isAdjustment;
    delete layers[i].render;
    delete layers[i].enabled;
    if (layers[i].ty === layerTypes.precomp && layers[i].layers) {
      deleteLayerParams(layers[i].layers);
    }
  }
}

function deleteExtraParams(data: any, settings: any): void {
  if (data.fonts.length === 0) {
    delete data.fonts;
    delete data.chars;
  } else {
    if (!settings.glyphs) {
      delete data.chars;
    }
  }
  deleteAssetParams(data.assets);
  deleteExcludedLayers(data.layers);
  deleteLayerParams(data.layers);
}

function deleteExcludedLayers(layers: any[]): void {
  const layerTypes = $.__bodymovin.layerTypes;
  let i: number;
  let len = layers.length;
  for (i = 0; i < len; i += 1) {
    if (layers[i]._excluded) {
      layers.splice(i, 1);
      i -= 1;
      len -= 1;
    } else if (layers[i].ty === layerTypes.precomp && layers[i].layers) {
      deleteExcludedLayers(layers[i].layers);
    }
  }
}

function moveCompsToAssets(data: any): void {
  if (data.comps) {
    if (data.assets) {
      data.assets = data.assets.concat(data.comps);
    } else {
      data.assets = data.comps;
    }
    data.comps = null;
    delete data.comps;
  }
}

function onResult(type: string, status: any): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  const exportStatuses = exporterHelpers.exportStatuses;

  results[type].status = status;
  let idleCount = 0;
  let failedCount = 0;
  for (const exportType in results) {
    if (results[exportType].status === exportStatuses.IDLE) {
      idleCount += 1;
    } else if (results[exportType].status === exportStatuses.FAILED) {
      failedCount += 1;
    }
  }

  if (idleCount === 0) {
    if (failedCount > 0) {
      bm_eventDispatcher.sendEvent('bm:alert', { message: 'Some exports failed.<br /> Is Preferences > Scripting & Expressions > Allow Scripts to Write Files and Access Network enabled?' });
    }
    _endCallback();
  }
}

function resetStatus(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  const exportStatuses = exporterHelpers.exportStatuses;
  const exportTypes = exporterHelpers.exportTypes;
  results[exportTypes.AVD].status = exportStatuses.IDLE;
  results[exportTypes.SMIL].status = exportStatuses.IDLE;
  results[exportTypes.BANNER].status = exportStatuses.IDLE;
  results[exportTypes.DEMO].status = exportStatuses.IDLE;
  results[exportTypes.RIVE].status = exportStatuses.IDLE;
  results[exportTypes.STANDALONE].status = exportStatuses.IDLE;
  results[exportTypes.STANDARD].status = exportStatuses.IDLE;
}

function saveData(data: any, destinationPath: string, config: any, callback: () => void): void {
  const JSON = $.__bodymovin.JSON;
  const bm_bannerExporter = $.__bodymovin.bm_bannerExporter;
  const bm_standardExporter = $.__bodymovin.bm_standardExporter;
  const bm_standaloneExporter = $.__bodymovin.bm_standaloneExporter;
  const bm_demoExporter = $.__bodymovin.bm_demoExporter;
  const bm_avdExporter = $.__bodymovin.bm_avdExporter;
  const bm_smilExporter = $.__bodymovin.bm_smilExporter;
  const bm_riveExporter = $.__bodymovin.bm_riveExporter;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const settingsHelper = $.__bodymovin.bm_settingsHelper;

  resetStatus();

  _endCallback = callback;

  const destinationFile = new File(destinationPath);
  const destinationFileName = destinationFile.name;
  const destinationFileNameWithoutExtension = destinationFileName.substr(0, destinationFileName.lastIndexOf('.'));

  deleteExtraParams(data, config);
  separateComps(data.layers, data.comps);
  moveCompsToAssets(data);

  let stringifiedData: string;

  if (settingsHelper.shouldPrettyPrint()) {
    stringifiedData = JSON.stringify(data, null, '\t');
  } else {
    stringifiedData = JSON.stringify(data);
    stringifiedData = stringifiedData.replace(/\n/g, '');
  }

  bm_fileManager.addFile(destinationFileNameWithoutExtension + '.json', ['raw'], stringifiedData, 'main');

  bm_avdExporter.save(destinationPath, config, onResult);
  bm_smilExporter.save(destinationPath, config, onResult);
  bm_bannerExporter.save(destinationPath, config, onResult);
  bm_demoExporter.save(destinationPath, config, onResult, data);
  bm_riveExporter.save(destinationPath, config, onResult);
  bm_standardExporter.save(destinationPath, config, onResult);
  bm_standaloneExporter.save(destinationPath, config, onResult);
}

function saveReport(reportData: any, destinationPath: string): string {
  const JSON = $.__bodymovin.JSON;
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  const destinationData = exporterHelpers.parseDestination(destinationPath, 'report');
  const demoDestinationFile = new File(destinationData.folder.fsName);
  demoDestinationFile.changePath('report.json');
  demoDestinationFile.open('w', 'TEXT', '????');
  demoDestinationFile.encoding = 'UTF-8';
  let reportStr = JSON.stringify(reportData);
  reportStr = reportStr.replace(/\n/g, '');
  try {
    demoDestinationFile.write(reportStr);
    demoDestinationFile.close();
  } catch (error) {
    bm_eventDispatcher.log('ERROR SAVE REPORT');
  }
  return demoDestinationFile.fsName;
}

export const bm_dataManager = {
  saveData: saveData,
  saveReport: saveReport,
};
