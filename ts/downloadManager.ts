import { bm_eventDispatcher } from './eventManager';

function getPlayer(zippedFlag: boolean): void {
  const extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
  let folder = new Folder(extensionPath);
  folder = folder.parent;
  let fileName: string;
  if (zippedFlag) {
    fileName = 'lottie.js.gz';
  } else {
    fileName = 'lottie.js';
  }
  const bmFile = new File(folder.absoluteURI + '/assets/player/' + fileName);

  const uri = Folder.desktop.absoluteURI + '/lottie.js';
  const f = new File(uri);
  const saveFileData = f.saveDlg();
  if (saveFileData !== null) {
    if (bmFile.copy(saveFileData.absoluteURI)) {
      bm_eventDispatcher.sendEvent('bm:alert', { message: 'File saved', type: 'success' });
    } else {
      bm_eventDispatcher.sendEvent('bm:alert', { message: 'File could not be saved', type: 'fail' });
    }
  }
}

function getStandaloneData(): string {
  const extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
  let folder = new Folder(extensionPath);
  folder = folder.parent;
  const bmFile = new File(folder.absoluteURI + '/assets/player/standalone.js');
  bmFile.open('r');
  const str = bmFile.read();
  bmFile.close();
  return str;
}

function getDemoData(): string {
  const extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
  let folder = new Folder(extensionPath);
  folder = folder.parent;
  const bmFile = new File(folder.absoluteURI + '/assets/player/demo.html');
  bmFile.open('r');
  const str = bmFile.read();
  bmFile.close();
  return str;
}

function getTemplateData(): string {
  const extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
  let folder = new Folder(extensionPath);
  folder = folder.parent;
  const bmFile = new File(folder.absoluteURI + '/assets/player/banner_template.html');
  bmFile.open('r');
  const str = bmFile.read();
  return str;
}

function getExtensionFolder(): Folder {
  const extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
  return new Folder(extensionPath).parent;
}

export const bm_downloadManager = {
  getPlayer: getPlayer,
  getStandaloneData: getStandaloneData,
  getDemoData: getDemoData,
  getTemplateData: getTemplateData,
  getExtensionFolder: getExtensionFolder,
};
