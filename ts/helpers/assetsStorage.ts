export function createFilePath(compositionUid: string): File | null {
  const appTemporaryFolder = new Folder(Folder.temp.absoluteURI);
  appTemporaryFolder.changePath('Bodymovin');
  appTemporaryFolder.changePath(compositionUid);
  if (!appTemporaryFolder.exists) {
    if (!appTemporaryFolder.create()) {
      return null;
    }
  }
  const file = new File(appTemporaryFolder.absoluteURI);
  file.changePath('assets.json');
  return file;
}

function filterStoringAssets(assets: any[]): any[] {
  let i = 0;
  const len = assets.length;
  const storingAssets: any[] = [];
  for (i = 0; i < len; i += 1) {
    if (!assets[i].layers) {
      storingAssets.push(assets[i]);
    }
  }
  return storingAssets;
}

export function storeAssets(assets: any[], compositionUid: string): void {
  const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
  const JSON = $.__bodymovin.JSON;
  const file = createFilePath(compositionUid);
  const storingAssets = filterStoringAssets(assets);
  if (file) {
    file.open('w', 'TEXT', '????');
    file.encoding = 'UTF-8';
    try {
      file.write(JSON.stringify(storingAssets));
    } catch (error) {
      const e = error as any;
      bm_eventDispatcher.log(e.message);
      bm_eventDispatcher.log(e.line);
      bm_eventDispatcher.log(e.fileName);
      bm_eventDispatcher.log($.stack);
    }
  }
  bm_eventDispatcher.log((file as File).absoluteURI);
}

export function getAssets(compositionUid: string): any[] | null {
  const JSON = $.__bodymovin.JSON;
  const file = createFilePath(compositionUid);
  if (file) {
    try {
      file.open('r');
      const str = file.read();
      const assets = JSON.parse(str);
      if (assets.length) {
        return assets;
      }
    } catch (error) {
    }
  }
  return null;
}

export const assetsStorage = { createFilePath, storeAssets, getAssets };
