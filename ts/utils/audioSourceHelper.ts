import type { AEError } from '../core/types';

const audioSources: any[] = [];
let assetsArray: any[];
let originalAssetsFlag: any;
let audioCount = 0;
let currentExportingAudioIndex = 0;
let imageNameIndex = 0;
let finishCallback: any;
let templateProject: any;
let containingCompCopy: any;
let _lastSecond = -1;
let _lastMilliseconds = -1;

function checkAudioSource(item: any): string {

    audioSources.push({
        item: item,
        source: item.source,
        source_name: item.source.name,
        name: item.name,
        id: 'audio_' + audioCount,
    });
    audioCount += 1;
    return audioSources[audioSources.length - 1].id;
}

const validRanges: number[][] = [[65, 90], [45, 46], [48, 57], [95, 95], [97, 122]];

function isValidChar(charCode: number): boolean {
    let i = 0;
    const len = validRanges.length;
    while (i < len) {
        if (charCode >= validRanges[i][0] && charCode <= validRanges[i][1]) {
            return true;
        }
        i += 1;
    }
    return false;
}

function checkSanitizedNameExists(name: string): boolean {
    let i = 0;
    const len = assetsArray.length;
    while (i < len) {
        if (assetsArray[i].p === name) {
            return true;
        }
        i += 1;
    }
    return false;
}

function incrementSanizitedName(name: string): string {
    return name + '_' + imageNameIndex++;
}

function formatImageName(name: string): string {
    let sanitizedName = '';
    let totalChars = name.lastIndexOf('.');
    const extensionIndex = name.lastIndexOf('.');
    const extension = extensionIndex !== -1 ? name.substr(extensionIndex) : '.png';
    if (totalChars < 0) {
        totalChars = name.length;
    }
    let i: number;
    for (i = 0; i < totalChars; i += 1) {
        const charCode = name.charCodeAt(i);
        if (isValidChar(charCode)) {
            sanitizedName += name.substr(i, 1);
        } else {
            sanitizedName += '_';
        }
        if (checkSanitizedNameExists(sanitizedName + extension)) {
            sanitizedName = incrementSanizitedName(sanitizedName);
        }
    }
    return sanitizedName + extension;
}

function getImageName(originalName: string, generatedName: string, extension: string): string {
    const settingsHelper = $.__bodymovin.bm_settingsHelper;

    let imageName: string;

    if (settingsHelper.shouldUserOriginalNames()) {
        imageName = formatImageName(originalName);
    } else {
        imageName = generatedName;
        if (originalAssetsFlag) {
            imageName += originalName.substr(originalName.lastIndexOf('.')) || '.' + extension;
        } else {
            imageName += '.' + extension;
        }
    }

    return imageName;
}

function getOutputModule(rqItem: any, templateName: string): any {
    let i: number;
    const len = rqItem.numOutputModules;
    let outputModule: any;
    for (i = 0; i < len; i += 1) {
        outputModule = rqItem.outputModule(i + 1);
        if (outputModule.name === templateName) {
            return outputModule;
        }
    }
    return rqItem.outputModule(1);
}

function installTemplate(templateName: string): void {
    const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
    try {
        importTemplateProject();
        const comp = templateProject.item(1);
        const renderQueueItems = app.project.renderQueue.items;
        let i: number;
        let templateRenderItem: any;
        for (i = 0; i < renderQueueItems.length; i += 1) {
            templateRenderItem = renderQueueItems[i + 1];
            if (templateRenderItem.comp.name === comp.name) {
                const outputModule = getOutputModule(templateRenderItem, templateName);
                outputModule.saveAsTemplate(outputModule.name);
                break;
            }
        }
        for (i = 0; i < renderQueueItems.length; i += 1) {
            templateRenderItem = renderQueueItems[i + 1];
            if (templateRenderItem.comp === comp) {
                templateRenderItem.remove();
                i -= 1;
            }
        }
    } catch (err) {
        const e = err as AEError;
        bm_eventDispatcher.log(e.message);
    }
}

function importTemplateProject(): void {
    const bm_downloadManager = $.__bodymovin.bm_downloadManager;
    const extensionFolder = bm_downloadManager.getExtensionFolder();
    const templateFile = new File(extensionFolder.absoluteURI + '/assets/templates/__bodymovin_sound_template_2018.aep');
    templateProject = app.project.importFile(new ImportOptions(templateFile));
}

function applyTemplateToModule(outputModule: any, templateName: string, comp: any): void {
    const installedTemplates = outputModule.templates;
    let isTemplateInstalled = false;
    for (let i = 0; i < installedTemplates.length; i += 1) {
        if (installedTemplates[i] === templateName) {
            isTemplateInstalled = true;
            break;
        }
    }

    if (!isTemplateInstalled) {
        installTemplate(templateName);
    }
    const item = getRenderItemByComp(comp);
    outputModule = item.outputModule(1);
    outputModule.applyTemplate(templateName);
}

function duplicateComposition(comp: any, layer: any): any {
    const settingsHelper = $.__bodymovin.bm_settingsHelper;
    const compCopy = comp.duplicate();
    let layerIndex = layer.index;
    while (layerIndex > 1) {
        compCopy.layer(1).remove();
        layerIndex -= 1;
    }
    while (compCopy.layers.length > 1) {
        compCopy.layer(2).remove();
    }
    compCopy.name = '__bodymovin_copy';

    const audioInPoint = layer.inPoint;
    const audioOutPoint = layer.outPoint;
    const compDuration = comp.duration;
    const workAreaStart = audioInPoint >= 0 ? audioInPoint : 0;
    let workAreaDuration = audioOutPoint - workAreaStart;
    if (workAreaStart + workAreaDuration > compDuration) {
        workAreaDuration = compDuration - workAreaStart;
    }
    compCopy.workAreaStart = workAreaStart;
    compCopy.workAreaStart = workAreaStart;
    compCopy.workAreaStart = workAreaStart;
    try {
        compCopy.workAreaDuration = workAreaDuration;
    } catch (err) {
        workAreaDuration -= comp.frameDuration;
        compCopy.workAreaDuration = workAreaDuration;
    }

    if (!settingsHelper.shouldRasterizeWaveform()) {
        const audioProperty = compCopy.layer(1).property('Audio');
        const levels = audioProperty.property('Audio Levels');
        while (levels.numKeys !== 0) {
            levels.removeKey(1);
        }
        levels.setValue([0, 0]);
    }
    return compCopy;
}

function getRenderItemByComp(comp: any): any {
    const renderQueueItems = app.project.renderQueue.items;
    let i: number;
    let renderItem: any;
    for (i = 0; i < renderQueueItems.length; i += 1) {
        renderItem = renderQueueItems[i + 1];
        if (renderItem.comp === comp) {
            return renderItem;
        }
    }
}

function createContainingComp(sourceData: any): void {
    const bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
    const renderQueueHelper = $.__bodymovin.bm_renderQueueHelper;
    const bm_fileManager = $.__bodymovin.bm_fileManager;
    const settingsHelper = $.__bodymovin.bm_settingsHelper;

    const containingComp = sourceData.item.containingComp;
    const layer = sourceData.item;
    containingCompCopy = duplicateComposition(containingComp, layer);
    let item = app.project.renderQueue.items.add(containingCompCopy);
    let outputModule = item.outputModule(1);
    const template = settingsHelper.getAudioBitRateTemplate();
    applyTemplateToModule(outputModule, template, containingCompCopy);
    item = getRenderItemByComp(containingCompCopy);
    outputModule = item.outputModule(1);
    const imageName = getImageName(sourceData.source_name, 'aud_' + currentExportingAudioIndex, 'mp3');
    const renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
    const file = renderFileData.file;
    outputModule.file = file;
    item.render = false;
    renderQueueHelper.backupRenderQueue();
    item.render = true;
    outputModule.file = file;

    item.onStatusChanged = function () {
        if (item.status === RQItemStatus.DONE) {
            updateCurrentSecond();
            currentExportingAudioIndex += 1;

            if (settingsHelper.shouldEncodeImages()) {
                bm_eventDispatcher.sendEvent('bm:image:process', {
                    path: file.fsName,
                    should_compress: false,
                    compression_rate: 100,
                    should_encode_images: settingsHelper.shouldEncodeImages(),
                    assetType: 'audio',
                });
            } else {
                app.scheduleTask('$.__bodymovin.bm_audioSourceHelper.scheduleNextSave();', 20, false);
            }
        }
    };

    assetsArray.push({
        id: sourceData.id,
        u: 'images/',
        p: imageName,
        e: 0,
        fileId: renderFileData.id,
        t: 2,
    });

    app.project.renderQueue.render();

}

function assetProcessed(_: any, encoded_data: any): void {
    const bm_fileManager = $.__bodymovin.bm_fileManager;
    if (encoded_data) {
        const currentSavingAsset = assetsArray[assetsArray.length - 1];
        currentSavingAsset.p = encoded_data;
        currentSavingAsset.u = '';
        currentSavingAsset.e = 1;
        bm_fileManager.removeFile(currentSavingAsset.fileId);
        app.scheduleTask('$.__bodymovin.bm_audioSourceHelper.scheduleNextSave();', 20, false);
    }
}

function updateCurrentSecond(): void {
    const now = new Date();
    const newSecond = now.getSeconds();
    _lastSecond = newSecond;
}

function saveAudio(): void {
    const currentSourceData = audioSources[currentExportingAudioIndex];
    createContainingComp(currentSourceData);
}

function scheduleNextSave(): void {

    const now = new Date();
    const newSecond = now.getSeconds();
    const newMilliSeconds = now.getMilliseconds();
    if (newSecond !== _lastSecond) {
        _lastSecond = newSecond;
        _lastMilliseconds = newMilliSeconds;
        saveNextAudio();
    } else {
        app.scheduleTask('$.__bodymovin.bm_audioSourceHelper.scheduleNextSave();', (1000 - _lastMilliseconds), false);
    }
}

function saveNextAudio(): void {
    const renderQueueHelper = $.__bodymovin.bm_renderQueueHelper;
    try {
        containingCompCopy.remove();
        containingCompCopy = null;
    } catch (err) {

    }

    if (currentExportingAudioIndex === audioSources.length) {
        if (templateProject) {
            try {
                templateProject.remove();
            } catch (err) {}
        }
        renderQueueHelper.restoreRenderQueue();
        finishCallback();
    } else {
        saveAudio();
    }
}

function reset(): void {
    audioSources.length = 0;
    audioCount = 0;
    currentExportingAudioIndex = 0;
}

function save(_callback: any, _assetsArray: any[]): void {
    assetsArray = _assetsArray;
    finishCallback = _callback;
    if (audioSources.length > 0) {
        saveNextAudio();
    } else {
        finishCallback();
    }
}

function isEmpty(): boolean {
    return audioSources.length === 0;
}

export const bm_audioSourceHelper = {
    reset: reset,
    save: save,
    isEmpty: isEmpty,
    checkAudioSource: checkAudioSource,
    scheduleNextSave: scheduleNextSave,
    assetProcessed: assetProcessed,
};
