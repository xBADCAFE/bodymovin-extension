let playSound: number, autoSave: number, canEditPrefs: boolean;
let storedRenderQueue: number[] = [];

export function backupRenderQueue(): void {
  try {
    playSound = app.preferences.getPrefAsLong("Misc Section", "Play sound when render finishes", PREFType.PREF_Type_MACHINE_INDEPENDENT);
    autoSave = app.preferences.getPrefAsLong("Auto Save", "Enable Auto Save RQ2", PREFType.PREF_Type_MACHINE_INDEPENDENT);
    app.preferences.savePrefAsLong("Misc Section", "Play sound when render finishes", 0, PREFType.PREF_Type_MACHINE_INDEPENDENT);
    app.preferences.savePrefAsLong("Auto Save", "Enable Auto Save RQ2", 0, PREFType.PREF_Type_MACHINE_INDEPENDENT);
  } catch (err) {
    canEditPrefs = false;
  }
  storedRenderQueue = [];
  for (let i = 1; i <= app.project.renderQueue.numItems; i++) {
    const item = app.project.renderQueue.item(i);
    if (item.status === RQItemStatus.QUEUED) {
      storedRenderQueue.push(i);
      item.render = false;
    }
  }
}

export function restoreRenderQueue(): void {
  for (let i = 0; i < storedRenderQueue.length; i++) {
    try {
      app.project.renderQueue.item(storedRenderQueue[i]).render = true;
    } catch (error) {}
  }
  if (canEditPrefs) {
    app.preferences.savePrefAsLong("Misc Section", "Play sound when render finishes", playSound, PREFType.PREF_Type_MACHINE_INDEPENDENT);
    app.preferences.savePrefAsLong("Auto Save", "Enable Auto Save RQ2", autoSave, PREFType.PREF_Type_MACHINE_INDEPENDENT);
  }
}

export function renderQueueIsBusy(): boolean {
  for (let i = 1; i <= app.project.renderQueue.numItems; i++) {
    if (app.project.renderQueue.item(i).status == RQItemStatus.RENDERING) {
      return true;
    }
  }
  return false;
}

export const bm_renderQueueHelper = {
  backupRenderQueue,
  restoreRenderQueue,
  renderQueueIsBusy,
};
