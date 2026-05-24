import { bm_eventDispatcher } from './eventManager';
import { bm_projectManager } from './projectManager';
import { getActiveComp } from './core/types';

let compositions: any[] = [];
let projectComps: any[];
let ob: any;
let currentComposition: any;

function getCompositionData(comp: any): any {
  let i = 0;
  const len = compositions.length;
  let compData: any;
  while (i < len) {
    if (compositions[i].id === comp.id) {
      compData = compositions[i];
      break;
    }
    i += 1;
  }
  if (!compData) {
    compData = {
      id: comp.id,
      name: comp.name,
      width: comp.width,
      height: comp.height,
    };
  }

  return compData;
}

function searchCompositionDestination(id: any, absoluteURI: string, fileName: string): void {
  let uri: string;
  if (absoluteURI) {
    uri = absoluteURI;
  } else {
    uri = Folder.desktop.absoluteURI + '/' + fileName;
  }

  const f = new File(uri);
  const saveFileData = f.saveDlg();
  if (saveFileData !== null) {
    const compositionDestinationData = {
      absoluteURI: saveFileData.absoluteURI,
      destination: saveFileData.fsName,
      id: id,
    };
    bm_eventDispatcher.sendEvent('bm:composition:destination_set', compositionDestinationData);
  }
}

function browseFolder(destination: string): void {
  const file = new File(destination);
  file.parent.execute();
}

function browseFolderFromPath(path: string): void {
  path = path ? path : Folder.desktop.absoluteURI;
  const f = new Folder(path);
  const openFileData = f.selectDlg();
  if (openFileData !== null) {
    $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:uri', {
      absoluteURI: openFileData.absoluteURI,
      fsName: openFileData.fsName,
      path: openFileData.absoluteURI,
    });
  } else {
    $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:cancel');
  }
}

function updateData(): void {
  bm_projectManager.checkProject();
  getCompositions();
}

function getCompositions(): void {
  const compositions: any[] = [];
  projectComps = bm_projectManager.getCompositions();
  let i: number;
  const len = projectComps.length;
  for (i = 0; i < len; i += 1) {
    compositions.push(getCompositionData(projectComps[i]));
  }
  bm_eventDispatcher.sendEvent('bm:compositions:list', compositions);
}

function renderComposition(compositionData: any): void {
  ob.cancelled = false;
  currentComposition = compositionData;
  projectComps = bm_projectManager.getCompositions();
  let comp: any;
  let i = 0;
  const len = projectComps.length;
  while (i < len) {
    if (projectComps[i].id === currentComposition.id) {
      comp = projectComps[i];
      break;
    }
    i += 1;
  }

  bm_eventDispatcher.sendEvent('bm:render:start', currentComposition.id);
  const destination = currentComposition.absoluteURI;
  const fsDestination = currentComposition.destination;
  const destinationFile = new File(destination);
  const destinationFolder = destinationFile.parent;
  if (!destinationFolder.exists) {
    destinationFolder.create();
  }

  $.__bodymovin.bm_renderManager.render(comp, destination, fsDestination, currentComposition.settings, currentComposition.uid);
}

function renderComplete(): void {
  bm_eventDispatcher.sendEvent('bm:render:complete', currentComposition.id);
}

function cancel(): void {
  ob.cancelled = true;
  $.__bodymovin.bm_textShapeHelper.removeComps();
  bm_eventDispatcher.sendEvent('bm:render:cancel');
}

function navigateToLayer(compositionId: any, layerIndex: number): void {
  const comps = bm_projectManager.getCompositions();
  let i = 0;
  const len = comps.length;
  let comp: any;
  while (i < len) {
    comp = projectComps[i];
    if (comp.id === compositionId) {
      try {
        comp.openInViewer();
        app.executeCommand(2004);
        const layer = comp.layer(layerIndex);
        layer.selected = true;
      } catch (err) {
        bm_eventDispatcher.sendEvent('bm:navigation:cancel');
      }
      break;
    }
    i += 1;
  }
}

function getTimelinePosition(): void {
  const comp = getActiveComp();
  if (comp) {
    bm_eventDispatcher.sendEvent('bm:composition:timelinePosition', {
      active: true,
      data: {
        inPoint: comp.workAreaStart * comp.frameRate,
        outPoint: (comp.workAreaStart + comp.workAreaDuration) * comp.frameRate,
        time: comp.time * comp.frameRate,
      },
    });
  } else {
    bm_eventDispatcher.sendEvent('bm:composition:timelinePosition', {
      active: false,
    });
  }
}

function setTimelinePosition(progress: number): void {
  const comp = getActiveComp();
  if (comp) {
    const timeInSeconds = comp.workAreaStart + comp.workAreaDuration * progress;
    const timeInFrames = timeInSeconds * comp.frameRate;
    comp.time = Math.floor(timeInFrames) / comp.frameRate;
  }
}

ob = {
  updateData: updateData,
  searchCompositionDestination: searchCompositionDestination,
  renderComplete: renderComplete,
  browseFolder: browseFolder,
  browseFolderFromPath: browseFolderFromPath,
  renderComposition: renderComposition,
  getTimelinePosition: getTimelinePosition,
  setTimelinePosition: setTimelinePosition,
  cancel: cancel,
  navigateToLayer: navigateToLayer,
  cancelled: false,
};

export const bm_compsManager = ob;
