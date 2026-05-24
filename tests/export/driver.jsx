// Export test driver: loads TS bundle, opens corpus .aep, finds the target
// comp, triggers a Lottie export, writes a report when done.
//
// Designed to be eval'd via osascript from tests/export/run.sh.
// Mimics what the panel does: builds a compositionData object identical
// to the one the React panel ships across evalScript, then calls
// bm_compsManager.renderComposition(compositionData).
//
// Env vars (read via $.getenv):
//   CORPUS_AEP    — full path to .aep file
//   TARGET_COMP   — comp name to export (default "Bm_fontAnim")
//   USE_JS_BUNDLE — if "1", loads bundle/jsx/initializer.jsx (original JS).
//                   Otherwise loads bundle/jsx-ts/bodymovin.bundle.jsx (TS).
//                   Lets the same driver produce both baseline + comparison.

(function () {
  function isoTimestamp() {
    var d = new Date();
    function p(n) { return n < 10 ? '0' + n : '' + n; }
    return d.getUTCFullYear() + '-' + p(d.getUTCMonth() + 1) + '-' + p(d.getUTCDate())
      + 'T' + p(d.getUTCHours()) + ':' + p(d.getUTCMinutes()) + ':' + p(d.getUTCSeconds()) + 'Z';
  }

  var startMs = new Date().getTime();
  var report = {
    timestamp: isoTimestamp(),
    bundle_kind: null,
    bundle_loaded: false,
    project_opened: false,
    comp_found: false,
    comp_name: null,
    render_triggered: false,
    output_written: false,
    output_path: null,
    output_size: 0,
    poll_iterations: 0,
    exception: null,
    elapsed_ms: 0
  };

  function writeReport() {
    try {
      var scriptFile = new File($.fileName);
      var outDir = new Folder(scriptFile.parent.fsName + '/output');
      if (!outDir.exists) outDir.create();
      var reportFile = new File(outDir.fsName + '/export-report.json');
      reportFile.encoding = 'UTF-8';
      reportFile.open('w');
      reportFile.write(JSON.stringify(report, null, 2));
      reportFile.close();
    } catch (e) {
      // ignore — nothing more we can do
    }
  }

  try {
    var scriptFile = new File($.fileName);
    var repoRoot = scriptFile.parent.parent.parent;
    var vendoredDir = repoRoot.fsName + '/bundle/jsx';

    var useJsBundle = $.global._BM_USE_JS_BUNDLE === '1';
    report.bundle_kind = useJsBundle ? 'js' : 'ts';

    if (useJsBundle) {
      // Original initializer evalFiles all sibling .jsx — runs the full
      // legacy load sequence. After it completes, $.__bodymovin is populated
      // exactly as it would be in the live CEP panel.
      $.evalFile(vendoredDir + '/initializer.jsx');
    } else {
      // TS bundle path. Load order matters: bundle FIRST (its index.ts
      // resets $.__bodymovin = {esprima:{}}); then vendored polyfills
      // attach onto the fresh namespace. Loading polyfills before the
      // bundle would lose them to the reset.
      $.evalFile(repoRoot.fsName + '/bundle/jsx-ts/bodymovin.bundle.jsx');
      $.evalFile(vendoredDir + '/JSON.jsx');
      $.evalFile(vendoredDir + '/esprima.jsx');
      $.evalFile(vendoredDir + '/escodegen.jsx');
    }
    report.bundle_loaded = !!($.__bodymovin && $.__bodymovin.bm_compsManager);

    // Locate corpus
    var corpusPath = $.global._BM_CORPUS_AEP;
    if (!corpusPath) {
      report.exception = 'CORPUS_AEP env var not set';
      writeReport();
      return;
    }
    var corpusFile = new File(corpusPath);
    if (!corpusFile.exists) {
      report.exception = 'Corpus .aep not found at ' + corpusPath;
      writeReport();
      return;
    }

    app.open(corpusFile);
    report.project_opened = true;

    // Find target comp by name
    var targetCompName = $.global._BM_TARGET_COMP || 'Bm_fontAnim';
    report.comp_name = targetCompName;
    var targetComp = null;
    var i;
    for (i = 1; i <= app.project.numItems; i += 1) {
      var item = app.project.item(i);
      if (item instanceof CompItem && item.name === targetCompName) {
        targetComp = item;
        break;
      }
    }
    if (!targetComp) {
      report.exception = 'Comp "' + targetCompName + '" not found in project';
      writeReport();
      return;
    }
    report.comp_found = true;

    // Output path under tests/export/output/
    var outDir = new Folder(scriptFile.parent.fsName + '/output');
    if (!outDir.exists) outDir.create();
    var outputBaseName = (useJsBundle ? 'js' : 'ts') + '-' + targetCompName + '.json';
    var outputPath = outDir.fsName + '/' + outputBaseName;
    var outputFile = new File(outputPath);
    if (outputFile.exists) outputFile.remove();
    report.output_path = outputPath;

    // Settings — mirrors src/redux/reducers/compositions.js default state
    // (with audio disabled to avoid needing the sound template + render queue).
    var settings = {
      segmented: false,
      segmentedTime: 10,
      standalone: false,
      avd: false,
      glyphs: true,
      includeExtraChars: false,
      bundleFonts: false,
      inlineFonts: false,
      hiddens: false,
      original_assets: false,
      original_names: false,
      should_encode_images: false,
      should_compress: true,
      should_skip_images: false,
      should_reuse_images: false,
      should_include_av_assets: false,
      compression_rate: 80,
      extraComps: { active: false, list: [] },
      guideds: false,
      ignore_expression_properties: false,
      export_old_format: false,
      use_source_names: false,
      shouldTrimData: false,
      skip_default_properties: false,
      not_supported_properties: false,
      pretty_print: false,
      useCompNamesAsIds: false,
      export_mode: 'standard',
      export_modes: {
        standard: true, demo: false, standalone: false, banner: false,
        avd: false, smil: false, rive: false, reports: false
      },
      demoData: { backgroundColor: '#ffffff' },
      banner: {
        lottie_origin: 'local', lottie_path: 'https://',
        lottie_library: '5.12.2', lottie_renderer: 'svg',
        width: 500, height: 500, use_original_sizes: true,
        original_width: 500, original_height: 500, click_tag: 'https://',
        zip_files: true, shouldIncludeAnimationDataInTemplate: false,
        shouldLoop: false, loopCount: 0, localPath: null
      },
      expressions: {
        shouldBake: false, shouldCacheExport: false,
        shouldBakeBeyondWorkArea: false, sampleSize: 1
      },
      audio: { isEnabled: false, shouldRaterizeWaveform: false, bitrate: 96 },
      metadata: { includeFileName: false, customProps: [] },
      template: { active: false, id: 0, errors: [] },
      essentialProperties: { active: true, useSlots: false, skipExternalComp: false }
    };

    var compositionData = {
      id: targetComp.id,
      name: targetComp.name,
      uid: 'export-test-' + new Date().getTime(),
      absoluteURI: outputFile.absoluteURI,
      destination: outputPath,
      settings: settings
    };

    // No pre-stub of setFontData — with settings.glyphs = true the render
    // self-drives via bm_textShapeHelper.exportFonts. setFontData is only
    // needed when glyphs = false (legacy fonts-from-panel flow), and calling
    // it pre-render crashes because fontComp isn't initialized yet (that
    // happens inside addComps() which runs when text layers are encountered).

    // Trigger render and EXIT IMMEDIATELY. Do not poll here — the render
    // pipeline drives itself via app.scheduleTask callbacks, which only
    // fire when the script thread is idle. Any $.sleep loop in this driver
    // would block the thread and starve the scheduler. The shell harness
    // polls for the output file appearing.
    $.__bodymovin.bm_compsManager.renderComposition(compositionData);
    report.render_triggered = true;

  } catch (e) {
    report.exception = e.toString()
      + ' @ line ' + (e.line || '?')
      + ' file ' + (e.fileName || '?');
  }

  report.elapsed_ms = new Date().getTime() - startMs;
  writeReport();
})();
