const compSources: any[] = [];
const imageSources: any[] = [];
const videoSources: any[] = [];
const fonts: any[] = [];
let currentExportingImage: number;
let assetsArray: any[];
let folder: any;
let currentCompID: any;
let imageCount = 0;
let videoCount = 0;
let imageNameIndex = 0;
let fontCount = 0;
let currentSavingAsset: any;
let _lastSecond = -1;
let _lastMilliseconds = -1;

function checkCompSource(item: any): any {
  const arr = compSources;
  let i = 0;
  const len = arr.length;
  let isRendered = false;
  while (i < len) {
    if (arr[i].source === item.source) {
      isRendered = true;
      break;
    }
    i += 1;
  }
  if (isRendered) {
    return arr[i].id;
  }
  arr.push({
    source: item.source,
  });
  return false;
}

function checkVideoSource(item: any): any {
  let i = 0;
  const len = videoSources.length;
  while (i < len) {
    if (videoSources[i].source === item.source) {
      return videoSources[i].id;
    }
    i += 1;
  }
  videoSources.push({
    source: item.source,
    width: item.source.width,
    height: item.source.height,
    source_name: item.source.name,
    name: item.name,
    id: 'video_' + videoCount,
  });
  videoCount += 1;
  return videoSources[videoSources.length - 1].id;
}

function checkAudioSource(item: any): any {
  const audioSourceHelper = $.__bodymovin.bm_audioSourceHelper;
  return audioSourceHelper.checkAudioSource(item);
}

function buildId(item: any, metadata: any): string {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  if (metadata) {
    if (metadata.sourceAsId) {
      return item.source.name;
    }
  } else if (settingsHelper.shouldUseSourceNames()) {
    return item.source.name;
  }
  const name = 'image_' + imageCount;
  imageCount += 1;
  return name;
}

function checkImageSource(item: any): any {
  const annotationsManager = $.__bodymovin.bm_annotationsManager;
  const arr = imageSources;
  let i = 0;
  const len = arr.length;
  while (i < len) {
    if (arr[i].source === item.source) {
      return arr[i].id;
    }
    i += 1;
  }
  const assetAnnotation = annotationsManager.searchAssetAnnotationInLayer(item);
  arr.push({
    source: item.source,
    width: item.source.width,
    height: item.source.height,
    source_name: item.source.name,
    name: item.name,
    id: buildId(item, assetAnnotation),
    metadata: assetAnnotation,
  });
  return arr[arr.length - 1].id;
}

function setCompSourceId(source: any, id: any): void {
  let i = 0;
  const len = compSources.length;
  while (i < len) {
    if (compSources[i].source === source) {
      compSources[i].id = id;
      compSources[i].nm = 'test';
    }
    i += 1;
  }
}

const validRanges: number[][] = [[65, 90], [45, 46], [48, 57], [95, 95], [97, 122]];

function isValidChar(charCode: number): boolean {
  let i = 0;
  const len = validRanges.length;
  while (i < len) {
    if (charCode >= validRanges[i][0] && charCode <= validRanges[i][1]) {
      return true;
    }
    i += 1;
  }
  return false;
}

function checkSanitizedNameExists(name: string): boolean {
  let i = 0;
  const len = assetsArray.length;
  while (i < len) {
    if (assetsArray[i].p === name) {
      return true;
    }
    i += 1;
  }
  return false;
}

function incrementSanizitedName(name: string): string {
  return name + '_' + imageNameIndex++;
}

function formatImageName(name: string): string {
  let sanitizedName = '';
  let totalChars = name.lastIndexOf('.');
  const extensionIndex = name.lastIndexOf('.');
  const extension = extensionIndex !== -1 ? name.substr(extensionIndex) : '.png';
  if (totalChars < 0) {
    totalChars = name.length;
  }
  let i: number;
  for (i = 0; i < totalChars; i += 1) {
    const charCode = name.charCodeAt(i);
    if (isValidChar(charCode)) {
      sanitizedName += name.substr(i, 1);
    } else {
      sanitizedName += '_';
    }
  }
  if (checkSanitizedNameExists(sanitizedName + extension)) {
    sanitizedName = incrementSanizitedName(sanitizedName);
  }
  return sanitizedName + extension;
}

function getImageName(originalName: string, generatedName: string, extension: string, metadata?: any): string {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;

  let imageName: string;

  const originalNamesFlag = metadata ? metadata.originalAsset : settingsHelper.shouldUserOriginalNames();
  const originalAssetsFlag = metadata ? metadata.copyAsset : settingsHelper.shouldCopyOriginalAsset();

  if (originalNamesFlag) {
    imageName = formatImageName(originalName);
  } else {
    imageName = generatedName;
    if (originalAssetsFlag) {
      imageName += originalName.substr(originalName.lastIndexOf('.')) || '.' + extension;
    } else {
      imageName += '.' + extension;
    }
  }

  return imageName;
}

const sequenceSources: any[] = [];
const sequenceSourcesStills: any[] = [];
let currentExportingImageSequenceIndex = 0;
let currentExportingVideoIndex = 0;
let currentExportingAudioIndex = 0;
let sequenceSourcesStillsCount = 0;
let currentStillIndex = 0;
let currentSequenceTotalFrames = 0;
let sequenceCount = 0;
let helperSequenceComp: any = null;

function searchSequenceSource(item: any): any {
  let i = 0;
  const len = sequenceSources.length;
  while (i < len) {
    if (sequenceSources[i].source === item.source) {
      return sequenceSources[i].id;
    }
    i += 1;
  }
  return false;
}

function addSequenceSource(item: any): string {
  const sequenceSource = {
    source: item.source,
    id: 'sequence_' + sequenceCount++,
  };
  sequenceSources.push(sequenceSource);
  return sequenceSource.id;
}

function buildSeqId(source: any, metadata: any): string {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  let name = '';
  if (metadata) {
    if (metadata.sourceAsId) {
      name = source.name + '_' + sequenceSourcesStillsCount;
    } else {
      name = 'imgSeq_' + sequenceSourcesStillsCount;
    }
  } else if (settingsHelper.shouldUseSourceNames()) {
    name = source.name + '_' + sequenceSourcesStillsCount;
  } else {
    name = 'imgSeq_' + sequenceSourcesStillsCount;
  }
  sequenceSourcesStillsCount += 1;
  return name;
}

function addImageSequenceStills(layer: any, totalFrames: number): any[] {
  const annotationsManager = $.__bodymovin.bm_annotationsManager;

  const source = layer.source;

  let i = 0;
  const sequenceRange: string[] = [];
  const assetAnnotation = annotationsManager.searchAssetAnnotationInLayer(layer);
  for (i = 0; i < totalFrames; i += 1) {
    sequenceRange.push(buildSeqId(source, assetAnnotation));
  }

  const sequenceStills = {
    totalFrames: totalFrames,
    source: source,
    name: source.name,
    source_name: source.name,
    range: sequenceRange,
    width: source.width,
    height: source.height,
    metadata: assetAnnotation,
  };
  sequenceSourcesStills.push(sequenceStills);
  sequenceSourcesStillsCount += totalFrames;
  return sequenceStills.range;
}

function getSequenceSourceBySource(source: any): any {
  let i = 0;
  const len = sequenceSources.length;
  while (i < len) {
    if (sequenceSources[i].source === source) {
      return sequenceSources[i].id;
    }
    i += 1;
  }
}

function scheduleNextSaveStilInSequence(): void {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  const now = new Date();
  const newSecond = now.getSeconds();
  const newMilliSeconds = now.getMilliseconds();
  const originalAssetsFlag = settingsHelper.shouldCopyOriginalAsset();
  if (newSecond !== _lastSecond || originalAssetsFlag) {
    _lastSecond = newSecond;
    _lastMilliseconds = newMilliSeconds;
    saveNextStillInSequence();
  } else {
    app.scheduleTask('$.__bodymovin.bm_sourceHelper.scheduleNextSaveStilInSequence();', (1000 - _lastMilliseconds), false);
  }
}

function scheduleNextSaveImage(): void {
  const now = new Date();
  const newSecond = now.getSeconds();
  const newMilliSeconds = now.getMilliseconds();
  if (newSecond !== _lastSecond) {
    _lastSecond = newSecond;
    _lastMilliseconds = newMilliSeconds;
    saveNextImage();
  } else {
    app.scheduleTask('$.__bodymovin.bm_sourceHelper.scheduleNextSaveImage();', (1000 - _lastMilliseconds), false);
  }
}

function updateCurrentSecond(): void {
  const now = new Date();
  const newSecond = now.getSeconds();
  _lastSecond = newSecond;
}

function saveNextStillInSequence(): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const settingsHelper = $.__bodymovin.bm_settingsHelper;

  if (currentStillIndex === currentSequenceTotalFrames) {
    currentExportingImageSequenceIndex += 1;
    if (helperSequenceComp) {
      helperSequenceComp.remove();
    }
    saveNextImageSequence();
    return;
  }

  const currentSourceData = sequenceSourcesStills[currentExportingImageSequenceIndex];
  const metadata = currentSourceData.metadata;
  const totalFrames = currentSourceData.totalFrames;

  bm_eventDispatcher.sendEvent('bm:render:update',
    {
      type: 'update',
      message: 'Exporting sequence: ' + currentSourceData.name,
      compId: currentCompID,
      progress: currentStillIndex / totalFrames,
    }
  );

  const imageName = getImageName(currentSourceData.source_name, 'seq_' + currentExportingImageSequenceIndex + '_' + currentStillIndex, 'png', metadata);

  const renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
  const file = renderFileData.file;

  currentSavingAsset = {
    id: currentSourceData.range[currentStillIndex],
    w: currentSourceData.width,
    h: currentSourceData.height,
    t: 'seq',
    u: 'images/',
    p: imageName,
    e: 0,
    fileId: renderFileData.id,
  };
  assetsArray.push(currentSavingAsset);

  const originalAssetsFlag = metadata ? metadata.copyAsset : settingsHelper.shouldCopyOriginalAsset();

  if (!originalAssetsFlag) {

    helperSequenceComp.workAreaStart = Math.max(0, Math.min(totalFrames - 3, currentStillIndex - 1)) / currentSourceData.source.frameRate;
    helperSequenceComp.workAreaDuration = 3 / currentSourceData.source.frameRate;

    const item = app.project.renderQueue.items.add(helperSequenceComp);
    item.render = true;

    const outputModule = item.outputModule(1);
    outputModule.applyTemplate("_HIDDEN X-Factor 8 Premul");
    outputModule.file = file;

    item.onStatusChanged = function () {
      if (item.status === RQItemStatus.DONE) {
        updateCurrentSecond();

        let imgIndex = currentStillIndex.toString();
        while (imgIndex.length < 5) {
          imgIndex = '0' + imgIndex;
        }

        fixBugNameFile(imageName, file.fsName, imgIndex);

        bm_eventDispatcher.sendEvent('bm:image:process', {
          path: file.fsName,
          should_compress: metadata ? metadata.enableCompression : settingsHelper.shouldCompressImages(),
          compression_rate: (metadata ? metadata.compression : settingsHelper.getCompressionQuality()) / 100,
          should_encode_images: metadata ? metadata.includeInJson : settingsHelper.shouldEncodeImages(),
          assetType: 'image',
        });

      }
    };

    app.project.renderQueue.render();
  } else {

    const currentSourceFile = currentSourceData.source.file;
    const currentSourceFilePath = currentSourceFile.fsName;
    const newName = getNextImageName(currentSourceFilePath, currentStillIndex);
    const copyingFile = new File(newName);
    if (copyingFile.exists) {
      copyingFile.copy(file.fsName);
    } else {
      currentSourceFile.copy(file.fsName);
    }
    updateCurrentSecond();

    bm_eventDispatcher.sendEvent('bm:image:process', {
      path: file.fsName,
      should_compress: metadata ? metadata.enableCompression : settingsHelper.shouldCompressImages(),
      compression_rate: (metadata ? metadata.compression : settingsHelper.getCompressionQuality()) / 100,
      should_encode_images: metadata ? metadata.includeInJson : settingsHelper.shouldEncodeImages(),
      assetType: 'image',
    });
  }

}

function getNextImageName(text: string, index: number): string {
  const regex = /[0-9]+/g;
  let flag = true;
  let lastMatch: RegExpExecArray | undefined;
  while (flag) {
    const match = regex.exec(text);
    if (!match) {
      flag = false;
    } else {
      lastMatch = match;
    }
  }
  if (lastMatch) {
    const value = lastMatch[0];
    const num = parseInt(value, 10) + index;
    let newValue = num.toString();
    let count = 0;
    while (newValue.length < value.length) {
      newValue = value.substr(count, 1) + newValue;
    }
    let newTexto = text.substr(0, lastMatch.index);
    newTexto += newValue;
    newTexto += text.substr(lastMatch.index + value.length);
    return newTexto;
  }
  return '';
}

function saveSequence(): void {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  const currentSourceData = sequenceSourcesStills[currentExportingImageSequenceIndex];
  const metadata = currentSourceData.metadata;
  currentStillIndex = 0;
  currentSequenceTotalFrames = currentSourceData.totalFrames;
  const frameRate = currentSourceData.source.frameRate;
  const originalAssetsFlag = metadata ? metadata.copyAsset : settingsHelper.shouldCopyOriginalAsset();

  if (!originalAssetsFlag) {
    helperSequenceComp = app.project.items.addComp('tempConverterComp', Math.max(4, currentSourceData.width), Math.max(4, currentSourceData.height), 1, (currentSourceData.totalFrames + 1) / frameRate, frameRate);
    helperSequenceComp.layers.add(currentSourceData.source);
  }
  scheduleNextSaveStilInSequence();
}

function saveVideo(): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;

  const currentSourceData = videoSources[currentExportingVideoIndex];
  const sourceExtension = currentSourceData.source_name.substr(currentSourceData.source_name.lastIndexOf('.') + 1) || 'mp4';
  const imageName = getImageName(currentSourceData.source_name, 'vid_' + currentExportingVideoIndex, sourceExtension);
  const renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
  const file = renderFileData.file;
  const currentSourceFile = currentSourceData.source.file;
  currentSourceFile.copy(file.fsName);
  assetsArray.push({
    id: currentSourceData.id,
    w: currentSourceData.width,
    h: currentSourceData.height,
    u: 'images/',
    p: imageName,
    e: 0,
    fileId: renderFileData.id,
  });

  currentExportingVideoIndex += 1;
  app.scheduleTask('$.__bodymovin.bm_sourceHelper.saveNextVideo();', 20, false);
}

function onDataFinishSave(): void {
  finishImageSave();
}

function onAudioFinishSave(): void {
  const dataSourceHelper = $.__bodymovin.bm_dataSourceHelper;
  dataSourceHelper.save(onDataFinishSave, assetsArray);
}

function saveNextVideo(): void {
  const audioSourceHelper = $.__bodymovin.bm_audioSourceHelper;
  if (currentExportingVideoIndex === videoSources.length) {
    audioSourceHelper.save(onAudioFinishSave, assetsArray);
  } else {
    saveVideo();
  }
}

function saveNextImageSequence(): void {
  if (currentExportingImageSequenceIndex === sequenceSourcesStills.length) {
    saveNextVideo();
  } else {
    saveSequence();
  }
}

function finishImageSave(): void {
  const renderQueueHelper = $.__bodymovin.bm_renderQueueHelper;
  const bm_renderManager = $.__bodymovin.bm_renderManager;

  renderQueueHelper.restoreRenderQueue();

  bm_renderManager.imagesReady();
}

function fixBugNameFile(imageName: string, fsName: string, suffix: string): void {
  let bug = new File(fsName + suffix);
  if (bug.exists) {
    bug.rename(imageName);
  } else {
    const namename = fsName.substr(0, fsName.lastIndexOf('.')) + '_' + suffix + '.png';
    bug = new File(namename);
    if (bug.exists) {
      bug.rename(imageName);
    }
  }
}

function saveNextImage(): void {
  const bm_compsManager = $.__bodymovin.bm_compsManager;
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  const essentialPropertiesHelper = $.__bodymovin.bm_essentialPropertiesHelper;

  if (bm_compsManager.cancelled) {
    return;
  }
  if (currentExportingImage === imageSources.length) {
    saveNextImageSequence();
    return;
  }
  const currentSourceData = imageSources[currentExportingImage];
  const metadata = currentSourceData.metadata;
  bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Exporting image: ' + currentSourceData.name, compId: currentCompID, progress: currentExportingImage / imageSources.length });
  const currentSource = currentSourceData.source;
  const imageName = getImageName(currentSourceData.source_name, 'img_' + currentExportingImage, 'png', metadata);

  const renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
  const file = renderFileData.file;

  currentSavingAsset = {
    id: currentSourceData.id,
    w: currentSourceData.width,
    h: currentSourceData.height,
    u: 'images/',
    p: imageName,
    e: 0,
    fileId: renderFileData.id,
  };
  const essentialPropertyId = essentialPropertiesHelper.searchAsset(currentSourceData, currentSavingAsset);
  if (essentialPropertyId) {
    currentSavingAsset.sid = essentialPropertyId;
  }
  assetsArray.push(currentSavingAsset);
  const originalAssetsFlag = metadata ? metadata.copyAsset : settingsHelper.shouldCopyOriginalAsset();

  if (!originalAssetsFlag) {
    const helperComp = app.project.items.addComp('tempConverterComp', Math.max(4, currentSource.width), Math.max(4, currentSource.height), 1, 1, 1);
    helperComp.layers.add(currentSource);

    const item = app.project.renderQueue.items.add(helperComp);
    item.render = true;

    const outputModule = item.outputModule(1);
    outputModule.applyTemplate("_HIDDEN X-Factor 8 Premul");
    outputModule.file = file;

    item.onStatusChanged = function () {
      if (item.status === RQItemStatus.DONE) {
        updateCurrentSecond();

        fixBugNameFile(imageName, file.fsName, '00000');

        bm_eventDispatcher.sendEvent('bm:image:process', {
          path: file.fsName,
          should_compress: metadata ? metadata.enableCompression : settingsHelper.shouldCompressImages(),
          compression_rate: (metadata ? metadata.compression : settingsHelper.getCompressionQuality()) / 100,
          should_encode_images: metadata ? metadata.includeInJson : settingsHelper.shouldEncodeImages(),
        });
      }
    };

    app.project.renderQueue.render();

    helperComp.remove();
  } else {
    const currentSourceFile = currentSourceData.source.file;
    currentSourceFile.copy(file.fsName);
    updateCurrentSecond();

    bm_eventDispatcher.sendEvent('bm:image:process', {
      path: file.fsName,
      should_compress: metadata ? metadata.enableCompression : settingsHelper.shouldCompressImages(),
      compression_rate: (metadata ? metadata.compression : settingsHelper.getCompressionQuality()) / 100,
      should_encode_images: metadata ? metadata.includeInJson : settingsHelper.shouldEncodeImages(),
    });
  }
}

function imageProcessed(changedFlag: boolean, encoded_data: any): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;

  if (changedFlag) {
    currentSavingAsset.p = currentSavingAsset.p.replace(new RegExp('png' + '$'), 'jpg');
    bm_fileManager.replaceFileExtension(currentSavingAsset.fileId, 'jpg');
  }
  if (encoded_data) {
    currentSavingAsset.p = encoded_data;
    currentSavingAsset.u = '';
    currentSavingAsset.e = 1;
    bm_fileManager.removeFile(currentSavingAsset.fileId);
  }
  if (currentSavingAsset.t === 'seq') {
    currentStillIndex += 1;
    scheduleNextSaveStilInSequence();
  } else {
    currentExportingImage += 1;
    scheduleNextSaveImage();
  }
}

function copyAssetsToArray(assets: any[], renderAssetsArray: any[]): void {
  let i: number;
  const len = assets.length;
  for (i = 0; i < len; i += 1) {
    renderAssetsArray.push(assets[i]);
  }
}

function exportImages(path: string, assets: any[], compId: any, compUid: any): void {
  const audioSourceHelper = $.__bodymovin.bm_audioSourceHelper;
  const dataSourceHelper = $.__bodymovin.bm_dataSourceHelper;
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_renderManager = $.__bodymovin.bm_renderManager;
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  const renderQueueHelper = $.__bodymovin.bm_renderQueueHelper;
  const assetsStorage = $.__bodymovin.assetsStorage;

  if ((imageSources.length === 0 && sequenceSourcesStills.length === 0 && videoSources.length === 0 && audioSourceHelper.isEmpty() && dataSourceHelper.isEmpty()) || settingsHelper.shouldSkipImages()) {
    bm_renderManager.imagesReady();
    return;
  }
  if (renderQueueHelper.renderQueueIsBusy()) {
    bm_eventDispatcher.sendEvent('bm:alert', { message: 'Render queue is currently busy. \n\rCan\'t continue with render.\n\rCheck for elements in AE\'s render queue in a Rendering status, remove them and try again.' });
    return;
  }
  currentCompID = compId;
  if (settingsHelper.shouldReuseImages()) {
    const storedAssets = assetsStorage.getAssets(compUid);
    if (storedAssets) {
      copyAssetsToArray(storedAssets, assets);
      bm_renderManager.imagesReady();
      return;
    }
  }
  bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Exporting images', compId: currentCompID, progress: 0 });
  currentExportingImage = 0;
  currentExportingImageSequenceIndex = 0;
  currentExportingVideoIndex = 0;
  currentExportingAudioIndex = 0;
  const file = new File(path);
  folder = file.parent;
  folder.changePath('images/');
  assetsArray = assets;

  renderQueueHelper.backupRenderQueue();
  scheduleNextSaveImage();
}

function addFont(fontName: string, fontFamily: string, fontStyle: string, fontLocation?: string): void {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  let i = 0;
  const len = fonts.length;
  while (i < len) {
    if (fonts[i].name === fontName && fonts[i].family === fontFamily && fonts[i].style === fontStyle) {
      return;
    }
    i += 1;
  }
  const fontData: any = {
    name: fontName,
    family: fontFamily,
    style: fontStyle,
  };

  if (fontLocation && settingsHelper.shouldBundleFonts()) {
    const file = new File(fontLocation);
    if (file.exists) {
      if (!settingsHelper.shouldInlineFonts()) {
        const fontFileName = 'font_' + fontCount++;
        const destinationFileData = bm_fileManager.createFile(fontFileName, ['raw', 'images']);
        const destinationFile = destinationFileData.file;
        file.copy(destinationFile.fsName);
        fontData.location = "images/" + fontFileName;
      }
      fontData.originalLocation = fontLocation;
    }
  }
  fonts.push(fontData);
}

function getFonts(): any[] {
  return fonts;
}

function reset(): void {
  const audioSourceHelper = $.__bodymovin.bm_audioSourceHelper;
  const dataSourceHelper = $.__bodymovin.bm_dataSourceHelper;
  compSources.length = 0;
  imageSources.length = 0;
  videoSources.length = 0;
  sequenceSources.length = 0;
  sequenceSourcesStills.length = 0;
  fonts.length = 0;
  imageCount = 0;
  fontCount = 0;
  videoCount = 0;
  sequenceCount = 0;
  sequenceSourcesStillsCount = 0;
  imageNameIndex = 0;
  audioSourceHelper.reset();
  dataSourceHelper.reset();
}

export const bm_sourceHelper = {
  imageProcessed: imageProcessed,
  checkCompSource: checkCompSource,
  checkImageSource: checkImageSource,
  checkVideoSource: checkVideoSource,
  checkAudioSource: checkAudioSource,
  searchSequenceSource: searchSequenceSource,
  addSequenceSource: addSequenceSource,
  addImageSequenceStills: addImageSequenceStills,
  getSequenceSourceBySource: getSequenceSourceBySource,
  setCompSourceId: setCompSourceId,
  exportImages: exportImages,
  addFont: addFont,
  getFonts: getFonts,
  reset: reset,
  scheduleNextSaveStilInSequence: scheduleNextSaveStilInSequence,
  scheduleNextSaveImage: scheduleNextSaveImage,
  saveNextVideo: saveNextVideo,
};
