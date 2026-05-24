let _callback: any;
let _destinationData: any;

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
        const destinationFolder = ['standard'];
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

function moveAssetsToDestination(): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;

  const rawFiles = bm_fileManager.getFilesOnPath(['standard']);
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
        const destinationFolder = new Folder(_destinationData.folder.fsName);
        while (j < jLen) {
          destinationFolder.changePath(filePath[j]);
          if (!destinationFolder.exists) {
            destinationFolder.create();
          }
          j += 1;
        }
        const destinationFile = new File(destinationFolder.fsName);
        destinationFile.changePath(fileData.name);
        file.copy(destinationFile.fsName);
      }
    }
    i += 1;
  }
  _callback(exporterHelpers.exportTypes.STANDARD, exporterHelpers.exportStatuses.SUCCESS);
}

function save(destinationPath: string, config: any, callback: any): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;

  _callback = callback;

  if (config.export_modes.standard) {
    _destinationData = exporterHelpers.parseDestination(destinationPath, '');

    const destinationFile = new File(_destinationData.folder.fsName);
    destinationFile.changePath(_destinationData.fileName + '.json');

    copyAssets();

    if (config.segmented) {

      const temporaryFolder = bm_fileManager.getTemporaryFolder();
      const originFolder = new Folder(temporaryFolder.fsName);
      originFolder.changePath('raw');
      const destinationFolder = new Folder(temporaryFolder.fsName);
      destinationFolder.changePath('standard');

      bm_eventDispatcher.sendEvent('bm:split:animation',
        {
          origin: originFolder.fsName,
          destination: destinationFolder.fsName,
          fileName: _destinationData.fileName,
          time: config.segmentedTime,
        });

    }
    else {
      moveAssetsToDestination();
    }

  } else {
    _callback(exporterHelpers.exportTypes.STANDARD, exporterHelpers.exportStatuses.SUCCESS);
  }

}

function slotsSuccess(): void {
  moveAssetsToDestination();
}

function splitSuccess(totalSegments: number): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  for (let i = 0; i < totalSegments; i += 1) {
    bm_fileManager.createFile(_destinationData.fileName + '_' + i + '.json', ['standard']);
  }
  moveAssetsToDestination();
}

function splitFailed(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.STANDARD, exporterHelpers.exportStatuses.FAILED);
}

export const bm_standardExporter = {
  save: save,
  splitSuccess: splitSuccess,
  slotsSuccess: slotsSuccess,
  splitFailed: splitFailed,
};
