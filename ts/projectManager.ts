import { bm_eventDispatcher } from './eventManager';
import { bm_generalUtils } from './utils/generalUtils';
import { bm_XMPHelper } from './utils/XMPParser';
import { bm_fileManager } from './helpers/fileManager';
import { getActiveComp } from './core/types';
const commands: { [key: string]: number } = {};
let projectId = '';
let tempId = '';
let project: any;

function getItemType(item: any): string {
  const getType: any = {};
  const type = getType.toString.call(item);
  let itemType = '';
  switch (type) {
    case "[object FolderItem]":
      itemType = 'Folder';
      break;
    case "[object FootageItem]":
      itemType = 'Footage';
      break;
    case "[object CompItem]":
      itemType = 'Comp';
      break;
    default:
      itemType = type;
      break;
  }
  return itemType;
}

function searchCommands(): void {
  commands.shapesFromText = 3781;
  commands.duplicate = 2080;
}

function getCommandID(key: string): number {
  return commands[key];
}

function checkProject(): void {
  let storedProjectId: string;
  storedProjectId = bm_XMPHelper.getMetadata('project_id');
  if (!app.project || app.project.numItems === 0) {
    return;
  }

  if (!storedProjectId) {
    storedProjectId = bm_generalUtils.random(20);
    bm_XMPHelper.setMetadata('project_id', storedProjectId);
  }
  if (projectId !== storedProjectId) {
    projectId = storedProjectId;
    bm_eventDispatcher.sendEvent('bm:project:id', { id: projectId, name: (app.project.file as any).name });
  } else {
    try {
      const areEqual = app.project === project;
    } catch (err) {
      storedProjectId = bm_generalUtils.random(20);
      bm_XMPHelper.setMetadata('project_id', storedProjectId);
      projectId = storedProjectId;
      bm_eventDispatcher.sendEvent('bm:project:id', { id: projectId, name: (app.project.file as any).name });
    }
  }
}

function createTempId(): void {
  if (tempId) {
    return;
  }
  tempId = bm_generalUtils.random(32);
  bm_fileManager.removeOldTemporaryFolder();

  bm_eventDispatcher.sendEvent('bm:temp:id', { id: tempId });

  try {
    const tempIdFile = new File(Folder.temp.absoluteURI + '/bodymovin_uid.txt');
    tempIdFile.open('w', 'TEXT', '????');
    tempIdFile.encoding = 'UTF-8';
    tempIdFile.write(tempId);
    tempIdFile.close();
  } catch (error) {
  }
}

function getCompositions(): any[] {
  project = app.project;
  const arr: any[] = [];
  if (!project) {
    return arr;
  }
  let i: number;
  const numItems = project.numItems;
  for (i = 0; i < numItems; i += 1) {
    if (getItemType(project.item(i + 1)) === 'Comp') {
      arr.push(project.item(i + 1));
    }
  }
  return arr;
}

function getCompositionById(id: any): any {
  let i: number;
  const numItems = project.numItems;
  for (i = 0; i < numItems; i += 1) {
    if (getItemType(project.item(i + 1)) === 'Comp') {
      if (project.item(i + 1).id == id) {
        return project.item(i + 1);
      }
    }
  }
}

function getFile(path: string): File {
  const extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
  let folder = new Folder(extensionPath);
  folder = folder.parent;
  const file = new File(folder.absoluteURI + '/' + path);
  return file;
}

function getProjectPath(): void {
  if (app.project && app.project.file && app.project.file.parent) {
    const projectFolder = app.project.file.parent;
    bm_eventDispatcher.sendEvent('bm:project:path', { path: projectFolder.fsName });
  }
}

function getUserFolders(): void {
  bm_eventDispatcher.sendEvent('bm:user:folders', { userData: Folder.userData.fsName });
}

function setDestinationPath(path: string): void {
  let uri: string;
  if (path) {
    uri = path;
  } else {
    uri = Folder.desktop.absoluteURI + '/settings.json';
  }

  const f = new File(uri);
  const saveFileData = f.saveDlg();
  if (saveFileData !== null) {
    const compositionDestinationData = {
      absoluteURI: saveFileData.absoluteURI,
      destination: saveFileData.fsName,
      fsName: saveFileData.fsName,
    };
    bm_eventDispatcher.sendEvent('bm:destination:selected', compositionDestinationData);
  } else {
    bm_eventDispatcher.sendEvent('bm:destination:cancelled');
  }
}

function getSelectedProperties(): void {
  const props: any[] = [];
  const comp = getActiveComp();
  if (comp) {
    const selectedLayers = comp.selectedLayers;
    let i = 0;
    for (i = 0; i < selectedLayers.length; i += 1) {
      const layer: any = selectedLayers[i];
      try {
        for (let j = 0; j < layer.selectedProperties.length; j += 1) {
          props.push({
            matchName: layer.selectedProperties[j].matchName,
            name: layer.selectedProperties[j].name,
          });
        }
      } catch (error) {
      }
    }
  }
  bm_eventDispatcher.sendEvent('bm:properties:list', props);
}

export const bm_projectManager = {
  checkProject: checkProject,
  createTempId: createTempId,
  getCompositions: getCompositions,
  getCompositionById: getCompositionById,
  searchCommands: searchCommands,
  getCommandID: getCommandID,
  getFile: getFile,
  getProjectPath: getProjectPath,
  getUserFolders: getUserFolders,
  setDestinationPath: setDestinationPath,
  getSelectedProperties: getSelectedProperties,
};
