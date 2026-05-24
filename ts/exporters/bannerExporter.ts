let bm_projectManager: any;
let lottiePaths: any[] = [];
let _callback: any;

function getLottiePath(bannerConfig: any): string {
  let sourcePath = '';
  if (bannerConfig.lottie_origin === 'local' || bannerConfig.lottie_origin === 'cdnjs') {
    let i = 0;
    const len = lottiePaths.length;
    while (i < len) {
      if (lottiePaths[i].value === bannerConfig.lottie_library) {
        sourcePath = lottiePaths[i][bannerConfig.lottie_origin];
      }
      i += 1;
    }
  } else if (bannerConfig.lottie_origin === 'file system') {
    sourcePath = 'lottie.js';
  } else {
    sourcePath = bannerConfig.lottie_path;
  }
  return sourcePath;
}

function getSizes(bannerConfig: any): { width: any; height: any } {
  return {
    width: bannerConfig.use_original_sizes ? bannerConfig.original_width : bannerConfig.width,
    height: bannerConfig.use_original_sizes ? bannerConfig.original_height : bannerConfig.height,
  };
}

function createTemplate(config: any, filePathName: string, animationStringData: string): any[] {
  const bm_downloadManager = $.__bodymovin.bm_downloadManager;
  const bm_fileManager = $.__bodymovin.bm_fileManager;

  const bannerConfig = config.banner;
  let templateData = bm_downloadManager.getTemplateData();
  const sizes = getSizes(bannerConfig);

  templateData = templateData
    .replace(/__CONTENT_WIDTH__/g, sizes.width)
    .replace(/__CONTENT_HEIGHT__/g, sizes.height)
    .replace(/__LOTTIE_RENDERER__/g, bannerConfig.lottie_renderer)
    .replace(/__CLICK_TAG__/g, bannerConfig.click_tag)
    .replace(/__LOTTIE_SOURCE__/g, getLottiePath(bannerConfig));

  if (bannerConfig.shouldIncludeAnimationDataInTemplate) {
    templateData = templateData
      .replace(/__DATA_LOAD__/g, 'animationData: ' + animationStringData);
  } else {
    templateData = templateData
      .replace(/__DATA_LOAD__/g, 'path: \'' + filePathName + '\'');

  }

  if (bannerConfig.shouldLoop) {
    templateData = templateData
      .replace(/__LOOP__/g, 'true');
  } else if (bannerConfig.loopCount === 0 || bannerConfig.loopCount === '0') {
    templateData = templateData
      .replace(/__LOOP__/g, 'false');
  } else {
    templateData = templateData
      .replace(/__LOOP__/g, bannerConfig.loopCount);
  }

  const indexFile = bm_fileManager.addFile('index.html', ['banner'], templateData);

  return [indexFile];
}

function includeLottiePlayer(bannerConfig: any): any[] {
  const bm_fileManager = $.__bodymovin.bm_fileManager;

  let i = 0;
  const len = lottiePaths.length;
  let sourcePath: string | undefined;
  while (i < len) {
    if (lottiePaths[i].value === bannerConfig.lottie_library) {
      sourcePath = lottiePaths[i][bannerConfig.lottie_origin];
    }
    i += 1;
  }
  const file = bm_projectManager.getFile('/assets/player/' + sourcePath);

  const lottieFileData = bm_fileManager.createFile(sourcePath, ['banner']);

  file.copy(lottieFileData.file.fsName);

  return [lottieFileData];
}

function includeLocalFilePlayer(bannerConfig: any): any[] {
  const bm_fileManager = $.__bodymovin.bm_fileManager;

  if (bannerConfig.localPath) {

    const file = new File(bannerConfig.localPath.absoluteURI);

    const lottieFileData = bm_fileManager.createFile('lottie.js', ['banner']);

    file.copy(lottieFileData.file.fsName);

    return [lottieFileData];
  } else {
    return [];
  }
}

function copyAssets(): any[] {
  const bm_fileManager = $.__bodymovin.bm_fileManager;

  const rawFiles = bm_fileManager.getFilesOnPath(['raw']);
  const copiedFiles: any[] = [];

  let i = 0;
  const len = rawFiles.length;
  while (i < len) {
    if (rawFiles[i].type !== 'main') {
      const fileData = bm_fileManager.getFileById(rawFiles[i].id);
      if (fileData) {
        const file = fileData.file;
        if (file.exists) {
          const destinationFileData = bm_fileManager.createFile(fileData.name, ['banner', 'images']);
          file.copy(destinationFileData.file.fsName);
          copiedFiles.push(destinationFileData);
        }
      }
    }
    i += 1;
  }

  return copiedFiles;
}

function includeAdditionalFiles(config: any): any[] {

  let additionalFiles: any[] = [];

  if (!bm_projectManager) {
    bm_projectManager = $.__bodymovin.bm_projectManager;
  }
  const bannerConfig = config.banner;
  if (bannerConfig.lottie_origin === 'local') {
    additionalFiles = additionalFiles.concat(includeLottiePlayer(bannerConfig));
  } else if (bannerConfig.lottie_origin === 'file system') {
    additionalFiles = additionalFiles.concat(includeLocalFilePlayer(bannerConfig));
  }
  additionalFiles = additionalFiles.concat(copyAssets());

  return additionalFiles;
}

function copyBannerFolder(destinationFolder: any): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;

  const bannerFiles = bm_fileManager.getFilesOnPath(['banner']);
  let i: number;
  const len = bannerFiles.length;
  let j: number;
  let jLen: number;
  let copiedFile: any;
  let copiedDestinationFolder: any;
  let bannerFileData: any;
  let bannerFile: any;
  for (i = 0; i < len; i += 1) {
    bannerFileData = bannerFiles[i];
    bannerFile = bannerFileData.file;
    jLen = bannerFileData.path.length;
    j = 1;
    copiedDestinationFolder = new Folder(destinationFolder.fsName);
    while (j < jLen) {
      copiedDestinationFolder.changePath(bannerFileData.path[j]);
      if (!copiedDestinationFolder.exists) {
        copiedDestinationFolder.create();
      }
      j += 1;
    }
    copiedFile = new File(copiedDestinationFolder.fsName);
    copiedFile.changePath(bannerFileData.name);
    bannerFile.copy(copiedFile.fsName);
  }
  _callback(exporterHelpers.exportTypes.BANNER, exporterHelpers.exportStatuses.SUCCESS);
}

function save(destinationPath: string, config: any, callback: any): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;

  _callback = callback;

  if (config.export_modes.banner) {
    const destinationData = exporterHelpers.parseDestination(destinationPath, 'banner');

    const rawFiles = bm_fileManager.getFilesOnPath(['raw']);

    const animationStringData = exporterHelpers.getJsonData(rawFiles);

    const bannerConfig = config.banner;


    let bannerFiles: any[] = [];
    bannerFiles = bannerFiles.concat(createTemplate(config, destinationData.fileName + '.json', animationStringData));
    bannerFiles = bannerFiles.concat(includeAdditionalFiles(config));

    if (!bannerConfig.shouldIncludeAnimationDataInTemplate) {
      const jsonFile = bm_fileManager.addFile(destinationData.fileName + '.json', ['banner'], animationStringData);
      bannerFiles.push(jsonFile);
    }

    if (bannerConfig.zip_files) {
      const temporaryFolder = bm_fileManager.getTemporaryFolder();
      const bannerFolder = new Folder(temporaryFolder.fsName);
      bannerFolder.changePath('banner');
      bm_eventDispatcher.sendEvent(
        'bm:zip:banner',
        {
          destinationPath: destinationData.folder.fsName + '/' + destinationData.fileName + '.zip',
          folderPath: bannerFolder.fsName,
        }
      );
    } else {
      copyBannerFolder(destinationData.folder);
    }
  } else {
    _callback(exporterHelpers.exportTypes.BANNER, exporterHelpers.exportStatuses.SUCCESS);
  }
}

function setLottiePaths(paths: any[]): void {
  lottiePaths = paths;
}

function bannerFinished(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.BANNER, exporterHelpers.exportStatuses.SUCCESS);
}

function bannerFailed(): void {
  const exporterHelpers = $.__bodymovin.bm_exporterHelpers;
  _callback(exporterHelpers.exportTypes.BANNER, exporterHelpers.exportStatuses.FAILED);
}

export const bm_bannerExporter = {
  save: save,
  setLottiePaths: setLottiePaths,
  bannerFinished: bannerFinished,
  bannerFailed: bannerFailed,
};
