if (!$.__bodymovin) {
  ($ as any).__bodymovin = { esprima: {} };
}

function browseFile(path: string): void {
  path = path ? path : Folder.desktop.absoluteURI;
  const f = new File(path);
  const openFileData: any = f.openDlg();
  if (openFileData !== null) {
    $.__bodymovin.bm_eventDispatcher.sendEvent('bm:file:uri', {
      absoluteURI: openFileData.absoluteURI,
      fsName: openFileData.fsName,
      path: openFileData.path,
    });
  } else {
    $.__bodymovin.bm_eventDispatcher.sendEvent('bm:file:cancel');
  }
}

function browseFolder(path: string): void {
  path = path ? path : Folder.desktop.absoluteURI;
  const f = new Folder(path);
  const openFileData: any = f.selectDlg();
  if (openFileData !== null) {
    $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:uri', {
      absoluteURI: openFileData.absoluteURI,
      fsName: openFileData.fsName,
      path: openFileData.path,
    });
  } else {
    $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:cancel');
  }
}

export const bm_main = {
  browseFile: browseFile,
  browseFolder: browseFolder,
};
