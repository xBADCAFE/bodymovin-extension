import { bm_lottieImporter } from '../lottieImporter';
import { random } from './util/random';
import { decodeBase64ToBinaryString } from './util/base64';
import { add as addAlert } from './alertsHelper';

var LOTTIE_IMAGES_IMPORT = 'lottie_images_import';

function getSeparator(): string {
  return ($.os && $.os.indexOf('Windows') !== -1) ? '\\' : '/';
}

function ensureFolder(path: string): boolean {
  var folder = new Folder(path);
  if (!folder.exists) {
    return folder.create();
  }
  return true;
}

function getEmbeddedExtension(prefix: string): string {
  var slashIndex = prefix.indexOf('/');
  var semiIndex = prefix.indexOf(';');
  return prefix.substr(slashIndex + 1, semiIndex - slashIndex - 1);
}

function writeEmbeddedAsset(base64Data: string, folderPath: string, assetName: string): boolean {
  if (!ensureFolder(folderPath)) {
    return false;
  }
  var filePath = folderPath + assetName;
  var file: any = new File(filePath);
  file.encoding = 'BINARY';
  if (!file.open('w')) {
    return false;
  }
  try {
    var binary = decodeBase64ToBinaryString(base64Data);
    file.write(binary);
  } finally {
    file.close();
  }
  return true;
}

function importEmbeddedAsset(asset: any, assetsPath: string): string | null {
  var data = asset.p;
  if (typeof data !== 'string' || data.indexOf(',') === -1) {
    return null;
  }
  var prefix = data.substr(0, data.indexOf(','));
  var extension = getEmbeddedExtension(prefix);
  var base64Data = data.substr(data.indexOf(',') + 1);
  var assetId = random(10);
  var assetName = assetId + '.' + extension;
  if (!writeEmbeddedAsset(base64Data, assetsPath, assetName)) {
    return null;
  }
  bm_lottieImporter.importFile(
    encodeURIComponent(assetsPath),
    encodeURIComponent(assetName),
    assetId
  );
  return assetId;
}

function importLinkedAsset(asset: any, assetsPath: string): string {
  var assetId = random(10);
  var assetName = (asset.u || '') + asset.p;
  bm_lottieImporter.importFile(
    encodeURIComponent(assetsPath),
    encodeURIComponent(assetName),
    assetId
  );
  return assetId;
}

export function importLottieAssets(assets: any[] | undefined, assetsPath: string): void {
  if (!assets) {
    return;
  }
  var imageAssets = assets.filter(function (asset: any) {
    return asset.id && asset.w;
  });
  var i: number;
  for (i = 0; i < imageAssets.length; i += 1) {
    var asset = imageAssets[i];
    var sourceId: string | null = null;
    if (asset.e) {
      var embeddedPath = assetsPath + LOTTIE_IMAGES_IMPORT + getSeparator();
      sourceId = importEmbeddedAsset(asset, embeddedPath);
      if (!sourceId) {
        addAlert({
          type: 'message',
          message: 'Embedded asset could not be imported',
        });
        continue;
      }
    } else {
      if (!assetsPath) {
        addAlert({
          type: 'message',
          message: 'Asset path not provided; skipping linked asset',
        });
        continue;
      }
      sourceId = importLinkedAsset(asset, assetsPath);
    }
    asset.__sourceId = sourceId;
  }
}
