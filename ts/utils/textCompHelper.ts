var fonts: any[] = [];
var count = 0;

function buildTextData(comment: string): any {
    var lines = comment.split('\r\n');
    if (lines[0] === 'font') {
        var i: number, len = lines.length;
        var textData: any = {};
        for (i = 1; i < len; i += 1) {
            var line = lines[i].split(':');
            if (line[0] === 'x') {
                textData.x = line[1];
            } else if (line[0] === 'y') {
                textData.y = line[1];
            } else if (line[0] === 'advance') {
                textData.advance = line[1];
            }
        }
        return textData;
    }
    return null;
}

function searchTextDataMarker(comp: any): any {
    if (comp.markerProperty && comp.markerProperty.numKeys >= 1) {
        var markerProperty = comp.markerProperty;
        var len = markerProperty.numKeys, markerElement: any;
        for (var i = 0; i < len; i += 1) {
            markerElement = markerProperty.keyValue(i + 1);
            var comment = markerElement.comment;
            var parsedComment = buildTextData(comment);
            if (parsedComment) {
                return parsedComment;
            }
        }
    }
}

function addCompsFromFolder(folder: any, fontData: any): any[] {
    var numInFolder = folder.numItems;
    var comps: any[] = [];
    for (var i = numInFolder; i >= 1; i--) {
        var comp = folder.item(i);
        var textData = searchTextDataMarker(comp);
        var compData = {
            layers: [],
            id: 'fontComp_' + count++,
            nm: comp.name,
            w: comp.width,
            h: comp.height,
        };
        var characterData = {
            comp: comp,
            compData: compData,
            character: comp.name,
            textData: textData,
        };
        comps.push(characterData);
    }
    fontData.characters = comps;
    return comps;
}

function findExportedFolder(name: string): boolean {
    var i = 0, len = fonts.length;
    while ( i < len) {
        if (fonts[i].name === name) {
            return true;
        }
        i += 1;
    }
    return false;
}

function createFontData(name: string): any {
    return {
        name: name,
        characters: [],
    };
}

function findCharacter(characters: any[], character: string): any {
    var i = 0;
    var len = characters.length;
    for (i = 0; i < len; i += 1) {
        var characterData = characters[i];
        if (characterData.character === character) {
            return characterData;
        }
    }
    return false;
}

function findCharacterData(textDocument: any, character: string): any {
    var i = 0;
    var len = fonts.length;
    var fontName = textDocument.fontFamily + '-' + textDocument.fontStyle;
    for (i = 0; i < len; i += 1) {
        var fontData = fonts[i];
        if (fontData.name === fontName) {
            return findCharacter(fontData.characters, character);
        }
    }
    return false;
}

function findFolderFont(layer: any): any[] {
    var settingsHelper = $.__bodymovin.bm_settingsHelper;
    if (settingsHelper.shouldReplaceCharactersWithComps()) {
        var items = app.project.items;
        var sourceTextProp = layer.property("Source Text");
        var numKeys = sourceTextProp.numKeys;
        var j: number, jLen = numKeys ? numKeys : 1;
        var textDocument: any;
        for(j=0;j<jLen;j+=1){
            if(numKeys === 0){
                textDocument = sourceTextProp.value;
            } else {
                textDocument = sourceTextProp.keyValue(j + 1);
            }
            var fontName = textDocument.fontFamily + '-' + textDocument.fontStyle;
            for ( var i = 0; i < items.length; i+= 1) {
                var item = items[i + 1];
                if (item instanceof FolderItem) {
                    if (item.name === fontName && !findExportedFolder(fontName)) {
                        var fontData = createFontData(fontName);
                        fonts.push(fontData);
                        return addCompsFromFolder(item, fontData);
                    }
                }
            }
        }
    }
    return [];
}

function getCharsFromFolder(folder: any): string {
    var chars = '';
    var numInFolder = folder.numItems;
    for (var i = numInFolder; i >= 1; i--) {
        var comp = folder.item(i);
        chars += comp.name;
    }
    return chars;
}

function getCharsFromFont(textDocument: any): string {
    var settingsHelper = $.__bodymovin.bm_settingsHelper;
    var chars = '';
    if (settingsHelper.shouldReplaceCharactersWithComps()) {
        var items = app.project.items;
        var fontName = textDocument.fontFamily + '-' + textDocument.fontStyle;
        for ( var i = 0; i < items.length; i+= 1) {
            var item = items[i + 1];
            if (item instanceof FolderItem) {
                if (item.name === fontName) {
                    chars = getCharsFromFolder(item);
                }
            }
        }
    }
    return chars;
}

function reset(): void {
    fonts.length = 0;
    count = 0;
}

export const bm_textCompHelper = {
    findFolderFont: findFolderFont,
    findCharacterData: findCharacterData,
    getCharsFromFont: getCharsFromFont,
    reset: reset,
};
