const dataSources: any[] = [];
let assetsArray: any[];
let originalAssetsFlag: any;
let dataCount = 0;
let currentExportingDataIndex = 0;
let imageNameIndex = 0;
let finishCallback: () => void;
let _lastSecond = -1;
let _lastMilliseconds = -1;

function checkDataSource(item: any): string {
  let i = 0;
  const len = dataSources.length;
  while (i < len) {
    if (dataSources[i].source === item.source) {
      return dataSources[i].id;
    }
    i += 1;
  }
  dataSources.push({
    source: item.source,
    source_name: item.source.name,
    name: item.name,
    id: 'footage_' + dataCount,
  });
  dataCount += 1;
  return dataSources[dataSources.length - 1].id;
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
    if (checkSanitizedNameExists(sanitizedName + extension)) {
      sanitizedName = incrementSanizitedName(sanitizedName);
    }
  }
  return sanitizedName + extension;
}

function getImageName(originalName: string, generatedName: string, extension: string): string {
  const settingsHelper = $.__bodymovin.bm_settingsHelper;

  let imageName: string;

  if (settingsHelper.shouldUserOriginalNames()) {
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

function saveData(): void {
  const bm_fileManager = $.__bodymovin.bm_fileManager;
  const currentSourceData = dataSources[currentExportingDataIndex];

  const imageName = getImageName(currentSourceData.source_name, 'footage_' + currentExportingDataIndex, 'json');
  const renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
  const file = currentSourceData.source.file;
  file.copy(renderFileData.file.fsName);

  assetsArray.push({
    id: currentSourceData.id,
    u: 'images/',
    p: imageName,
    e: 0,
    fileId: renderFileData.id,
    t: 3,
  });
  currentExportingDataIndex += 1;
  if (currentExportingDataIndex === dataSources.length) {
    finishCallback();
  } else {
    saveData();
  }
}

function saveNextData(): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  bm_eventDispatcher.log('DATA: ');

  if (currentExportingDataIndex === dataSources.length) {
    finishCallback();
  } else {
    saveData();
  }
}

function reset(): void {
  dataSources.length = 0;
  dataCount = 0;
  currentExportingDataIndex = 0;
}

function save(_callback: () => void, _assetsArray: any[]): void {
  assetsArray = _assetsArray;
  finishCallback = _callback;
  if (dataSources.length > 0) {
    saveNextData();
  } else {
    finishCallback();
  }
}

function isEmpty(): boolean {
  return dataSources.length === 0;
}

export const bm_dataSourceHelper = {
  reset: reset,
  save: save,
  isEmpty: isEmpty,
  checkDataSource: checkDataSource,
};
