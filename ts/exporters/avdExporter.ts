let _callback: any;

function saveAVDDataSuccess(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.AVD, exporterHelpers.exportStatuses.SUCCESS);
}

function saveAVDFailed(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.AVD, exporterHelpers.exportStatuses.FAILED);
}

function save(destinationPath: string, config: any, callback: any): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;

  _callback = callback;

  if (config.export_modes.avd) {
    const destinationData = exporterHelpers.parseDestination(destinationPath, 'avd');

    const avdDestinationFileName = new File(destinationData.folder.fsName);
    avdDestinationFileName.changePath(destinationData.fileName + '.xml');

    const temporaryFolder = bm_fileManager.getTemporaryFolder();
    const jsonFile = new File(temporaryFolder.fsName);
    jsonFile.changePath('raw');
    jsonFile.changePath(destinationData.fileName + '.json');

    bm_eventDispatcher.sendEvent('bm:create:avd', { origin: jsonFile.fsName, destination: avdDestinationFileName.fsName });

  } else {
    _callback(exporterHelpers.exportTypes.AVD, exporterHelpers.exportStatuses.SUCCESS);
  }
}

export const bm_avdExporter = {
  save: save,
  saveAVDDataSuccess: saveAVDDataSuccess,
  saveAVDFailed: saveAVDFailed,
};
