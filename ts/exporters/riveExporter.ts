let _callback: any;

function saveSuccess(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.RIVE, exporterHelpers.exportStatuses.SUCCESS);
}

function saveFailed(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.RIVE, exporterHelpers.exportStatuses.FAILED);
}

function copyAssets(): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;

  const rawFiles = bm_fileManager.getFilesOnPath(['raw']);

  let i = 0;
  const len = rawFiles.length;
  while (i < len) {
    const fileData = bm_fileManager.getFileById(rawFiles[i].id);
    if (fileData) {
      const file = fileData.file;
      if (file.exists) {
        const filePath = fileData.path;
        let j = 1;
        const jLen = filePath.length;
        const destinationFolder = ['rive'];
        while (j < jLen) {
          destinationFolder.push(filePath[j]);
          j += 1;
        }
        const destinationFileData = bm_fileManager.createFile(fileData.name, destinationFolder);
        file.copy(destinationFileData.file.fsName);
      }
    }
    i += 1;
  }
}

function save(destinationPath: string, config: any, callback: any): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;

  _callback = callback;

  if (config.export_modes.rive) {

    const destinationData = exporterHelpers.parseDestination(destinationPath, 'rive');

    copyAssets();
    const temporaryFolder = bm_fileManager.getTemporaryFolder();
    const originFolder = new Folder(temporaryFolder.fsName);
    originFolder.changePath('rive');

    bm_eventDispatcher.sendEvent('bm:create:rive',
      {
        origin: originFolder.fsName,
        destination: destinationData.folder.fsName,
        fileName: destinationData.fileName + '.flr2d',
      });

  } else {
    _callback(exporterHelpers.exportTypes.RIVE, exporterHelpers.exportStatuses.SUCCESS);
  }
}

export const bm_riveExporter = {
  save: save,
  saveSuccess: saveSuccess,
  saveFailed: saveFailed,
};
