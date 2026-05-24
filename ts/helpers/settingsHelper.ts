let _settings: any;

export function set(data: any): void {
  _settings = data;
}

export function get(): any {
  return _settings;
}

export function shouldCompressImages(): boolean {
  return _settings.should_compress && !_settings.original_assets;
}

export function getCompressionQuality(): any {
  return _settings.compression_rate;
}

export function shouldEncodeImages(): boolean {
  return _settings.should_encode_images;
}

export function shouldSkipImages(): boolean {
  return _settings.should_skip_images && !_settings.should_encode_images;
}

export function shouldReuseImages(): boolean {
  return _settings.should_reuse_images;
}

export function shouldIgnoreExpressionProperties(): boolean {
  return _settings.ignore_expression_properties;
}

export function shouldExportOldFormat(): boolean {
  return _settings.export_old_format;
}

export function shouldUseSourceNames(): boolean {
  return _settings.use_source_names;
}

export function shouldSkipDefaultProperties(): boolean {
  return _settings.skip_default_properties;
}

export function shouldIncludeNotSupportedProperties(): boolean {
  return _settings.not_supported_properties;
}

export function shouldIncludeReport(): boolean {
  return _settings.export_modes.reports;
}

export function shouldIncludeHiddenLayers(): boolean {
  return _settings.hiddens;
}

export function shouldIncludeGuidedLayers(): boolean {
  return _settings.guideds;
}

export function shouldBakeExpressions(): boolean {
  return _settings.expressions.shouldBake;
}

export function shouldBakeBeyondWorkArea(): boolean {
  return _settings.expressions.shouldBakeBeyondWorkArea;
}

export function shouldBundleFonts(): boolean {
  return !_settings.glyphs && _settings.bundleFonts;
}

export function shouldInlineFonts(): boolean {
  return shouldBundleFonts() && _settings.inlineFonts;
}

export function shouldPrettyPrint(): boolean {
  return _settings.pretty_print;
}

export function shouldRenderAudio(): boolean {
  return _settings.audio.isEnabled;
}

export function getAudioBitRateTemplate(): any {
  return _settings.audio.bitrate;
}

export function shouldTrimData(): boolean {
  return _settings.shouldTrimData;
}

export function shouldRasterizeWaveform(): boolean {
  return _settings.audio.shouldRaterizeWaveform;
}

export function shouldUserOriginalNames(): boolean {
  return _settings.original_names;
}

export function shouldReplaceCharactersWithComps(): boolean {
  return _settings.includeExtraChars;
}

export function shouldUseCompNamesAsIds(): boolean {
  return _settings.useCompNamesAsIds;
}

export function shouldCopyOriginalAsset(): boolean {
  return _settings.original_assets;
}

export function shouldExportEssentialProperties(): boolean {
  return _settings.essentialProperties.active;
}

export function shouldExportEssentialPropertiesAsSlots(): boolean {
  return _settings.essentialProperties.useSlots;
}

export function shouldSkipExternalComposition(): boolean {
  return shouldExportEssentialProperties() && _settings.essentialProperties.skipExternalComp;
}

export const bm_settingsHelper = {
  set,
  get,
  shouldCompressImages,
  getCompressionQuality,
  shouldEncodeImages,
  shouldSkipImages,
  shouldReuseImages,
  shouldIgnoreExpressionProperties,
  shouldExportOldFormat,
  shouldUseSourceNames,
  shouldSkipDefaultProperties,
  shouldIncludeNotSupportedProperties,
  shouldIncludeReport,
  shouldIncludeHiddenLayers,
  shouldIncludeGuidedLayers,
  shouldBakeExpressions,
  shouldBakeBeyondWorkArea,
  shouldBundleFonts,
  shouldInlineFonts,
  shouldPrettyPrint,
  shouldRenderAudio,
  getAudioBitRateTemplate,
  shouldTrimData,
  shouldRasterizeWaveform,
  shouldUserOriginalNames,
  shouldReplaceCharactersWithComps,
  shouldUseCompNamesAsIds,
  shouldCopyOriginalAsset,
  shouldExportEssentialProperties,
  shouldExportEssentialPropertiesAsSlots,
  shouldSkipExternalComposition,
};
