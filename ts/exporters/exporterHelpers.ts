import { bm_fileManager } from '../helpers/fileManager';
import { bm_eventDispatcher } from '../eventManager';

const ob: any = {};

function getJsonData(rawFiles: any[]): string {
  let i = 0;
  const len = rawFiles.length;
  while (i < len) {
    if (rawFiles[i].type === 'main') {
      break;
    }
    i += 1;
  }
  const fileData = bm_fileManager.getFileById(rawFiles[i].id);
  const jsonFile = fileData.file;
  jsonFile.open('r');
  const content = jsonFile.read();
  jsonFile.close();
  return content;
}

function saveAssets(rawFiles: any[], destinationFolder: any): void {
  let i = 0;
  const len = rawFiles.length;
  while (i < len) {
    if (rawFiles[i].type !== 'main') {
      const fileData = bm_fileManager.getFileById(rawFiles[i].id);
      if (fileData) {
        const file = fileData.file;
        if (file.exists) {
          const destinationFileFolder = new Folder(destinationFolder.fsName);
          destinationFileFolder.changePath('images');
          if (!destinationFileFolder.exists) {
            destinationFileFolder.create();
          }
          const destinationFile = new File(destinationFileFolder.fsName);
          destinationFile.changePath(file.name);
          file.copy(destinationFile.fsName);
        }
      }
    }
    i += 1;
  }
}

function parseDestination(destinationPath: string, subFolder: string): any {
  const destinationFile = new File(destinationPath);
  const destinationFolder = new Folder(destinationFile.parent as any);
  if (subFolder) {
    destinationFolder.changePath(subFolder);
    if (!destinationFolder.exists) {
      destinationFolder.create();
    }
  }
  const destinationFileName = destinationFile.name;
  const destinationFileNameWithoutExtension = destinationFileName.substr(0, destinationFileName.lastIndexOf('.'));
  const destinationExtension = destinationFileName.substr(destinationFileName.lastIndexOf('.') + 1);

  return {
    extension: destinationExtension,
    file: destinationFile,
    fileName: destinationFileNameWithoutExtension,
    folder: destinationFolder,
    fullFileName: destinationFileName,
  };
}

ob.getJsonData = getJsonData;
ob.saveAssets = saveAssets;
ob.parseDestination = parseDestination;

ob.exportTypes = {
  AVD: 'avd',
  SMIL: 'smil',
  BANNER: 'banner',
  DEMO: 'demo',
  RIVE: 'rive',
  STANDALONE: 'standalone',
  STANDARD: 'standard',
};

ob.exportStatuses = {
  IDLE: 'idle',
  SUCCESS: 'success',
  FAILED: 'failed',
};

export const bm_exporterHelpers = ob;
