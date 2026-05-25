import { bm_lottieImporter } from '../lottieImporter';
import { random } from './util/random';

function getTextDocumentData(textDocumentData: any): any[] {
  if ('k' in textDocumentData) {
    return textDocumentData.k;
  }
  return [
    {
      s: textDocumentData,
    },
  ];
}

export function processText(textData: any, layerId: string): void {
  var textDocumentData = getTextDocumentData(textData.d);
  var sourceTextIdId = random(10);
  bm_lottieImporter.assignIdToProp('Source Text', sourceTextIdId, layerId);
  if (textDocumentData.length === 1) {
    var textDocumentValue = textDocumentData[0].s;
    bm_lottieImporter.setTextDocumentValue(
      layerId,
      encodeURIComponent(textDocumentValue.t),
      textDocumentValue.s,
      encodeURIComponent(textDocumentValue.f),
      textDocumentValue.fc,
      textDocumentValue.tr,
      textDocumentValue.j,
      textDocumentValue.ls || 0
    );
  } else {
    textDocumentData.forEach(function (textDocument: any) {
      var docValue = textDocument.s;
      bm_lottieImporter.setTextDocumentValueAtTime(
        layerId,
        textDocument.t,
        encodeURIComponent(docValue.t),
        docValue.s,
        encodeURIComponent(docValue.f),
        docValue.fc,
        docValue.tr,
        docValue.j,
        docValue.ls || 0
      );
    });
  }
}

export default processText;
