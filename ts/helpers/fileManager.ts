let temporaryFolder: Folder;
let renderFiles: any[] = [];
let _isLocked = false;

export function createTemporaryFolder(): boolean {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_generalUtils = $.__bodymovin.bm_generalUtils;
  const folder_random_name = bm_generalUtils.random(10);
  temporaryFolder = new Folder(Folder.temp.absoluteURI);
  temporaryFolder.changePath('Bodymovin/' + folder_random_name);
  if (!temporaryFolder.exists) {
    if (!temporaryFolder.create()) {
      bm_eventDispatcher.sendEvent('alert', 'folder failed to be created at: ' + temporaryFolder.fsName);
      return false;
    }
  }
  renderFiles = [];
  return true;
}

export function getTemporaryFolder(): Folder {
  return temporaryFolder;
}

export function addFile(fileName: string, path: string[], content: string, type?: string): any {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const renderFileData = createFile(fileName, path, type);
  const dataFile = renderFileData.file;
  dataFile.open('w', 'TEXT', '????');
  dataFile.encoding = 'UTF-8';
  try {
    dataFile.write(content);
    dataFile.close();
  } catch (err) {
    bm_eventDispatcher.sendEvent('bm:alert', { message: 'Could not write file.<br /> Make sure you have enabled scripts to write files. <br /> Edit > Preferences > General > Allow Scripts to Write Files and Access Network ' });
  }
  return renderFileData;
}

export function createFile(fileName: string, path: string[], type?: string): any {
  const bm_generalUtils = $.__bodymovin.bm_generalUtils;
  type = type || 'regular';
  let i = 0, len = path.length;
  const fileFolder = new Folder(temporaryFolder.absoluteURI);
  while (i < len) {
    fileFolder.changePath(path[i]);
    if (!fileFolder.exists) {
      fileFolder.create();
    }
    i += 1;
  }
  const file = new File(fileFolder.absoluteURI);
  file.changePath(decodeURIComponent(fileName));

  const renderFile = {
    name: fileName,
    path: path,
    id: bm_generalUtils.random(10),
    file: file,
    type: type,
  };
  renderFiles.push(renderFile);
  return renderFile;
}

function isRenderFileOnPath(file: any, path: string[]): boolean {
  const filePath = file.path;
  for (let i = 0; i < path.length; i += 1) {
    if (filePath[i] !== path[i]) {
      return false;
    }
  }
  return true;
}

export function getFilesOnPath(path: string[]): any[] {
  const files: any[] = [];
  let i: number, len = renderFiles.length;
  for (i = 0; i < len; i += 1) {
    if (isRenderFileOnPath(renderFiles[i], path)) {
      files.push(renderFiles[i]);
    }
  }
  return files;
}

export function getFileById(id: string): any {
  let i: number, len = renderFiles.length, renderFile: any;
  for (i = 0; i < len; i += 1) {
    renderFile = renderFiles[i];
    if (renderFile.id === id) {
      return renderFile;
    }
  }
}

function getIndexById(id: string): number | undefined {
  let i: number, len = renderFiles.length, renderFile: any;
  for (i = 0; i < len; i += 1) {
    renderFile = renderFiles[i];
    if (renderFile.id === id) {
      return i;
    }
  }
}

export function replaceFileExtension(id: string, extension: string): void {
  const renderFileData = getFileById(id);
  renderFileData.name = renderFileData.name.substr(0, renderFileData.name.lastIndexOf('.') + 1);
  renderFileData.name += extension;
  const file = renderFileData.file;
  file.changePath(file.parent.fsName);
  file.changePath(renderFileData.name);
}

export function removeFile(id: string): void {
  const renderFileIndex = getIndexById(id);
  const renderFileData = getFileById(id);
  const file = renderFileData.file;
  file.remove();
  renderFiles.splice(renderFileIndex as number, 1);
}

function removeFolderContent(folder: Folder): void {
  const folderFiles = folder.getFiles();
  let fileOrFolder: any;
  for (let i = 0; i < folderFiles.length; i += 1) {
    fileOrFolder = folderFiles[i];
    if (fileOrFolder.constructor === Folder) {
      removeFolderContent(fileOrFolder);
    } else {
      fileOrFolder.remove();
    }
  }
  folder.remove();
}

export function removeOldTemporaryFolder(): void {
  if (_isLocked) {
    return;
  }
  _isLocked = true;
  const currentDate = new Date();
  const appTemporaryFolder = new Folder(Folder.temp.absoluteURI);
  appTemporaryFolder.changePath('Bodymovin');
  const appFolderFiles = appTemporaryFolder.getFiles();
  let temporaryRemovableFolder: any;
  for (let i = 0; i < appFolderFiles.length; i += 1) {
    temporaryRemovableFolder = appFolderFiles[i];
    if (temporaryRemovableFolder.getFiles) {
      const createdDate = temporaryRemovableFolder.created;
      const elapsedTime = (currentDate.getTime() - createdDate.getTime()) / 1000;
      if (elapsedTime > 60 * 60 * 24) {
        removeFolderContent(temporaryRemovableFolder);
      }
    }
  }
  _isLocked = false;
}

export const bm_fileManager = {
  createTemporaryFolder,
  getTemporaryFolder,
  addFile,
  createFile,
  getFilesOnPath,
  getFileById,
  replaceFileExtension,
  removeFile,
  removeOldTemporaryFolder,
};
