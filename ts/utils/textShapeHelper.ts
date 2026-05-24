import type { AEError } from '../core/types';

const chars: any[] = [];
let charComp: any;
let fontComp: any;
let charCompTextLayer: any;
let boxText: any;
const layers: any[] = [];
let currentFont: string;
let compsAddedFlag = false;

function reset(): void {
    chars.length = 0;
    layers.length = 0;
    currentFont = '';
    compsAddedFlag = false;
}

function addComps(): void {
    if (compsAddedFlag) {
        return;
    }
    compsAddedFlag = true;
    charComp = app.project.items.addComp('bm_charHelper', 1000, 1000, 1, 1, 1);
    charCompTextLayer = charComp.layers.addText();
    const textProp = charCompTextLayer.property("Source Text");
    const textDocument = textProp.value;
    textDocument.resetCharStyle();
    textDocument.resetParagraphStyle();
    textDocument.fontSize = 100;
    textDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
    textProp.setValue(textDocument);
    const fontProp = charCompTextLayer.property("Source Text");
    const fontDocument = fontProp.value;
    fontDocument.fontSize = 100;
    fontDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
    fontProp.setValue(fontDocument);
    fontComp = app.project.items.addComp('bm_fontHelper', 1000, 1000, 1, 1, 1);
    boxText = fontComp.layers.addBoxText([500, 500], 'm');

}

function addTextLayer(layer: any): void {
    layers.push(layer);
}

function addChar(ch: string, size: number, font: string, style: string): any {
    let i = 0;
    let charData: any;
    const len = chars.length;
    while (i < len) {
        if (chars[i].ch === ch && chars[i].font === font && chars[i].style === style) {
            return false;
        }
        i += 1;
    }
    charData = {
        ch: ch,
        size: size,
        font: font,
        style: style,
    };
    chars.push(charData);
    return charData;
}

function getOutlinesLayer(comp: any): any {
    const layerTypes = $.__bodymovin.layerTypes;
    const getLayerType = $.__bodymovin.getLayerType;
    let i = 1;
    const len = comp.layers.length;
    let layer: any;
    while (i <= len) {
        layer = comp.layers[i];
        const layerType = getLayerType(layer);
        if (layerType === layerTypes.shape) {
            return layer;
        }
        i += 1;
    }
}

function searchCharMetadata(originalTextDocument: any, ch: string, charData: any): boolean {
    const textCompHelper = $.__bodymovin.bm_textCompHelper;
    const characterMetadata = textCompHelper.findCharacterData(originalTextDocument, ch);
    if (characterMetadata) {
        let yOffset = characterMetadata.compData.h;
        if (characterMetadata && characterMetadata.textData && characterMetadata.textData.y) {
            yOffset = characterMetadata.textData.y;
        }
        let xOffset = 0;
        if (characterMetadata && characterMetadata.textData && characterMetadata.textData.x) {
            xOffset = characterMetadata.textData.x;
        }
        let advance = characterMetadata.compData.w - xOffset;
        if (characterMetadata && characterMetadata.textData && characterMetadata.textData.advance) {
            advance = characterMetadata.textData.advance;
        }
        charData.t = 1;
        charData.w = advance;
        charData.data = {
            refId: characterMetadata.compData.id,
            ip: 0,
            op: 99999,
            sr: 1,
            st: 0,
            ks: {
                a: { k: [0, 0, 0], a: 0 },
                p: { k: [-xOffset, -yOffset, 0], a: 0 },
                r: { k: 0, a: 0 },
                s: { k: [100, 100], a: 0 },
                o: { k: 100, a: 0 },
            },
        };
        return true;
    }
    return false;
}

function createNewChar(layerInfo: any, originalTextDocument: any, ch: string, charData: any): void {
    const bm_compsManager = $.__bodymovin.bm_compsManager;
    const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
    const bm_generalUtils = $.__bodymovin.bm_generalUtils;
    if (bm_compsManager.cancelled) {
        return;
    }
    try {
        const charCode = ch.charCodeAt(0);
        if (charCode === 13 || charCode === 3 || charCode === 160 || charCode === 65279) {
            charData.w = 0;
            return;
        }
        const hasCharMetadata = searchCharMetadata(originalTextDocument, ch, charData);
        if (hasCharMetadata) {
            return;
        }
        let shapeLayer: any;
        let l: number;
        let lLen: number;
        layerInfo.copyToComp(charComp);
        const textProp = charCompTextLayer.property("Source Text");
        const textDocument = textProp.value;
        if (charCode !== 32 && charCode !== 9) {
            textDocument.text = ch + ch;
        } else {
            textDocument.text = 'i' + ch + 'i';
        }
        textDocument.font = originalTextDocument.font;
        textDocument.fontSize = 100;
        textDocument.tracking = 0;
        textDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
        textProp.setValue(textDocument);
        charCompTextLayer.enabled = true;
        charCompTextLayer.selected = true;
        if (charCode !== 32 && charCode !== 9) {
            app.executeCommand(3781);
        }
        charCompTextLayer.selected = false;
        let doubleSize: number;
        let singleSize: number;
        doubleSize = charCompTextLayer.sourceRectAtTime(0, false).width;
        if (charCode !== 32 && charCode !== 9) {
            textDocument.text = ch;
        } else {
            textDocument.text = 'ii';
        }
        textProp.setValue(textDocument);
        singleSize = charCompTextLayer.sourceRectAtTime(0, false).width;
        charData.w = bm_generalUtils.roundNumber(doubleSize - singleSize, 2);
        shapeLayer = getOutlinesLayer(charComp);
        charData.data = {};
        if (charCode !== 32 && charCode !== 9) {
            $.__bodymovin.bm_shapeHelper.exportShape(shapeLayer, charData.data, 1, true);
            while (charData.data.shapes.length > 1) {
                charData.data.shapes.pop();
            }
            lLen = charData.data.shapes[0].it.length;
            for (l = 0; l < lLen; l += 1) {
                const ks = charData.data.shapes[0].it[l].ks;
                if (!ks) {
                    charData.data.shapes[0].it.splice(l, 1);
                    l -= 1;
                    lLen -= 1;
                }
            }
        }




        if (shapeLayer && shapeLayer.containingComp) {
            shapeLayer.selected = false;
            shapeLayer.remove();
        }
    } catch (err) {
        const e = err as AEError;
        bm_eventDispatcher.log('message');
        bm_eventDispatcher.log(e.message);
        bm_eventDispatcher.log(e.line);
        bm_eventDispatcher.log(e.fileName);
        if (ch !== '[]') {
            bm_eventDispatcher.alert('Character could not be created: ' + ch);
        }
    }
}

function exportChars(fonts: any): void {
    const bm_renderManager = $.__bodymovin.bm_renderManager;
    const textCompHelper = $.__bodymovin.bm_textCompHelper;

    charComp.openInViewer();
    let i: number;
    const len = layers.length;
    let layerInfo: any;
    let k: number;
    let kLen: number;
    for (i = 0; i < len; i += 1) {
        layerInfo = layers[i];
        const textProp = layerInfo.property("Source Text");
        kLen = textProp.numKeys;
        let keysFlag = true;
        if (kLen === 0) {
            kLen = 1;
            keysFlag = false;
        }
        let textDocument: any;
        for (k = 0; k < kLen; k += 1) {
            if (!keysFlag) {
                textDocument = textProp.value;
            } else {
                textDocument = textProp.keyValue(k + 1);
            }
            const font = textDocument.font;
            const fontStyle = textDocument.fontStyle;
            const fontSize = textDocument.fontSize;
            let text = textDocument.allCaps ? textDocument.text.toUpperCase() : textDocument.text;
            const extraChars = textCompHelper.getCharsFromFont(textDocument);
            text += extraChars;
            let j: number;
            const jLen = text.length;

            if (currentFont !== font) {
                currentFont = font;
                createNewChar(layerInfo, textDocument, '[]', {});
            }
            let l: number;
            let lLen: number;
            let ch: string;
            for (j = 0; j < jLen; j += 1) {
                let charCode = text.charCodeAt(j);
                if (charCode >= 0xD800 && charCode <= 0xDBFF) {
                    charCode = text.charCodeAt(j + 1);
                    if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
                        ch = text.substr(j, 2);
                        ++j;
                    } else {
                        ch = text.substr(j, 1);
                    }
                } else {
                    ch = text.substr(j, 1);
                }
                const charData = addChar(ch, fontSize, font, fontStyle);
                if (charData !== false) {
                    createNewChar(layerInfo, textDocument, ch, charData);
                    l = 0;
                    lLen = fonts.list.length;
                    while (l < lLen) {
                        if (fonts.list[l].fName === charData.font) {
                            charData.fFamily = fonts.list[l].fFamily;
                            break;
                        }
                        l += 1;
                    }
                }
            }
        }

    }

    bm_renderManager.setChars(chars);
}

function exportFonts(fonts: any): void {
    fontComp.openInViewer();
    let i: number;
    const len = fonts.list.length;
    let rect: any;
    let baseLineShift: number;
    const fontProp = boxText.property("Source Text");
    const fontDocument = fontProp.value;
    fontDocument.text = 'm';
    for (i = 0; i < len; i += 1) {
        fontDocument.font = fonts.list[i].fName;
        fontDocument.fontSize = 100;
        fontDocument.tracking = 0;
        fontProp.setValue(fontDocument);
        rect = boxText.sourceRectAtTime(0, false);
        baseLineShift = 0;
        if (fontDocument.baselineShift) {
            baseLineShift = fontDocument.baselineShift;
        }
        fonts.list[i].ascent = 250 + rect.top + rect.height + baseLineShift;
    }
}

function removeComps(): void {
    if (compsAddedFlag) {
        charComp.remove();
        fontComp.remove();
        compsAddedFlag = false;
    }
}

export const bm_textShapeHelper = {
    reset: reset,
    addChar: addChar,
    addTextLayer: addTextLayer,
    exportChars: exportChars,
    exportFonts: exportFonts,
    addComps: addComps,
    removeComps: removeComps,
};
