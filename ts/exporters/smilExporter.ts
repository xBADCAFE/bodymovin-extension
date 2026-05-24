let _callback: any;

function saveSMILDataSuccess(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.SMIL, exporterHelpers.exportStatuses.SUCCESS);
}

function saveSMILFailed(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.SMIL, exporterHelpers.exportStatuses.FAILED);
}

function save(destinationPath: string, config: any, callback: any): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;

  _callback = callback;

  if (config.export_modes.smil) {
    const destinationData = exporterHelpers.parseDestination(destinationPath, 'smil');

    const smilDestinationFileName = new File(destinationData.folder.fsName);
    smilDestinationFileName.changePath(destinationData.fileName + '.svg');

    const temporaryFolder = bm_fileManager.getTemporaryFolder();
    const jsonFile = new File(temporaryFolder.fsName);
    jsonFile.changePath('raw');
    jsonFile.changePath(destinationData.fileName + '.json');

    bm_eventDispatcher.sendEvent('bm:create:smil', { origin: jsonFile.fsName, destination: smilDestinationFileName.fsName });

  } else {
    _callback(exporterHelpers.exportTypes.SMIL, exporterHelpers.exportStatuses.SUCCESS);
  }
}

export const bm_smilExporter = {
  save: save,
  saveSMILDataSuccess: saveSMILDataSuccess,
  saveSMILFailed: saveSMILFailed,
};
