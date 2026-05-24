import type { AEError } from '../core/types';

const pseudoEffects = [
  {
    path: '/assets/annotations/bodymovin_text_props.ffx',
    matchName: 'Pseudo/Bodymovin Text Props',
    name: 'Text Properties',
  },
];

export function applyPreset(layer: any, matchName: string, pseudoEffectData: any): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const bm_downloadManager = $.__bodymovin.bm_downloadManager;

  let myComp: any = app.project.activeItem;
  if (!myComp || !(myComp instanceof CompItem)) {
    myComp = app.project.items.addComp("My Comp", 1920, 1080, 1, 10, 24);
    myComp.openInViewer();
  }

  let myLayer = layer;
  if (!myLayer)
    myLayer = myComp.layers.addSolid([0, 0, 0], "My Layer", myComp.width, myComp.height, 1);

  const effectsProp = myLayer.property("ADBE Effect Parade");

  if (effectsProp.canAddProperty(pseudoEffectData.matchName)) {
    effectsProp.addProperty(pseudoEffectData.matchName);
  } else {
    applyPseudoEffect(pseudoEffectData, effectsProp);
  }

  function applyPseudoEffect(myPseudoEffect: any, effectsProp: any): void {
    const animationPreset = createResourceFile(myPseudoEffect);
    if (animationPreset) {
      const masterLayer = effectsProp.parentProperty;
      const curentComp = masterLayer.containingComp;

      const tempSolid = curentComp.layers.addSolid([0, 0, 0], "Temp Solid", 10, 10, 1);
      const tempSolidSource = tempSolid.source;
      const tempSolidFolder = tempSolidSource.parentFolder;

      tempSolid.applyPreset(File(animationPreset as any) as any);
      myPseudoEffect.matchName = tempSolid.property("ADBE Effect Parade").property(1).matchName;

      masterLayer.selected = true;
      try {
        effectsProp.addProperty(myPseudoEffect.matchName);
      } catch (err) {
        const e = err as AEError;
        bm_eventDispatcher.log(e.message);
      }

      tempSolidSource.remove();
      if (tempSolidFolder.numItems === 0) tempSolidFolder.remove();
    }
  }

  function createResourceFile(myPseudoEffect: any): File | false | undefined {
    try {
      const extensionFolder = bm_downloadManager.getExtensionFolder();
      const myFile = new File(extensionFolder.absoluteURI + myPseudoEffect.path);
      if (myFile.exists) {
        return myFile;
      } else {
        return false;
      }
    } catch (err) {
      const e = err as AEError;
      alert("Error in createResourceFile function\n" + e.toString());
    }
  }
}

export const presetHelper = { applyPreset };
