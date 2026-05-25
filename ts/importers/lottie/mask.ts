import { bm_lottieImporter } from '../lottieImporter';
import { processProperty } from './property';
import { random } from './util/random';

function createMask(maskData: any, elementId: string): void {
  var maskId = random(10);
  bm_lottieImporter.createMask(maskId, elementId, maskData.mode, maskData.inv);
  processProperty('Mask Opacity', maskData.o, maskId, 100);
  processProperty('Mask Expansion', maskData.x, maskId, 0);
  if (maskData.f) {
    processProperty('Mask Feather', maskData.f, maskId, 0);
  }
  processProperty('maskShape', maskData.pt, maskId, null);
}

export function processMasks(masks: any[] | undefined, elementId: string): void {
  if (masks && masks.length) {
    masks.forEach(function (mask: any) {
      createMask(mask, elementId);
    });
  }
}

export default processMasks;
