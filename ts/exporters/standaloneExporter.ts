let _callback: any;

function save(destinationPath: string, config: any, callback: any): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  const bm_downloadManager = $.__bodymovin.bm_downloadManager;

  _callback = callback;

  if (config.export_modes.standalone) {
    const destinationData = exporterHelpers.parseDestination(destinationPath, 'standalone');

    const destinationFile = new File(destinationData.folder.fsName);
    destinationFile.changePath(destinationData.fileName + '.js');

    const rawFiles = bm_fileManager.getFilesOnPath(['raw']);
    let animationStringData = exporterHelpers.getJsonData(rawFiles);

    const bodymovinJsStr = bm_downloadManager.getStandaloneData();
    animationStringData = bodymovinJsStr.replace("\"__[ANIMATIONDATA]__\"", animationStringData);
    animationStringData = animationStringData.replace("\"__[STANDALONE]__\"", 'true');

    exporterHelpers.saveAssets(rawFiles, destinationData.folder);

    destinationFile.open('w', 'TEXT', '????');
    destinationFile.encoding = 'UTF-8';
    try {
      destinationFile.write(animationStringData);
      destinationFile.close();
      _callback(exporterHelpers.exportTypes.STANDALONE, exporterHelpers.exportStatuses.SUCCESS);
    } catch (err) {
      _callback(exporterHelpers.exportTypes.STANDALONE, exporterHelpers.exportStatuses.FAILED);
    }
  } else {
    _callback(exporterHelpers.exportTypes.STANDALONE, exporterHelpers.exportStatuses.SUCCESS);
  }
}

export const bm_standaloneExporter = {
  save: save,
};
