let _callback: any;

function save(destinationPath: string, config: any, callback: any, data: any): void {
  const bm_downloadManager = $.__bodymovin.bm_downloadManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const JSON = $.__bodymovin.JSON;

  _callback = callback;

  if (config.export_modes.demo) {

    const destinationData = exporterHelpers.parseDestination(destinationPath, 'demo');

    const rawFiles = bm_fileManager.getFilesOnPath(['raw']);

    exporterHelpers.saveAssets(rawFiles, destinationData.folder);

    const animationStringData = exporterHelpers.getJsonData(rawFiles);

    let demoStr = bm_downloadManager.getDemoData();
    demoStr = demoStr.replace('"__[[ANIMATIONDATA]]__"', "" + animationStringData + "");
    if (data.ddd) {
      demoStr = demoStr.replace('__[[RENDERER]]__', "html");
    } else {
      demoStr = demoStr.replace('__[[RENDERER]]__', "svg");
    }
    const color = config.demoData.backgroundColor || '#FFF';
    demoStr = demoStr.replace('__[[BODY_BACKGROUND_COLOR]]__', color);
    demoStr = demoStr.replace('__[[LOTTIE_BACKGROUND_COLOR]]__', color);

    const demoDestinationFile = new File(destinationData.folder.fsName);
    demoDestinationFile.changePath(destinationData.fileName + '.html');
    demoDestinationFile.open('w', 'TEXT', '????');
    demoDestinationFile.encoding = 'UTF-8';
    try {
      demoDestinationFile.write(demoStr);
      demoDestinationFile.close();
      _callback(exporterHelpers.exportTypes.DEMO, exporterHelpers.exportStatuses.SUCCESS);
    } catch (errr) {
      _callback(exporterHelpers.exportTypes.DEMO, exporterHelpers.exportStatuses.FAILED);
    }
  } else {
    _callback(exporterHelpers.exportTypes.DEMO, exporterHelpers.exportStatuses.SUCCESS);
  }
}

export const bm_demoExporter = {
  save: save,
};
