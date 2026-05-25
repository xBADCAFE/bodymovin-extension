// Round-trip driver: load bundle, open empty AE project, import a Lottie
// JSON file via bm_lottieImporter.importLottieData, find the resulting
// comp by name, re-export it via bm_compsManager.renderComposition.
//
// Output JSON lands at tests/roundtrip/output/roundtrip-<compName>.json.
// Shell harness diffs that against the input.
//
// Env vars (read off $.global, planted by run.sh):
//   _BM_INPUT_JSON  — full path to Lottie JSON to import (e.g. the
//                     ts-Bm_fontAnim.json we exported)

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
    bundle_loaded: false,
    input_loaded: false,
    input_path: null,
    input_size: 0,
    new_project_created: false,
    import_called: false,
    import_success: false,
    import_alerts: [],
    import_alert_count: 0,
    import_error: null,
    main_comp_id: null,
    imported_comp_found: false,
    comp_name: null,
    re_export_triggered: false,
    output_path: null,
    exception: null,
    elapsed_ms: 0
  };

  function writeReport() {
    try {
      var scriptFile = new File($.fileName);
      var outDir = new Folder(scriptFile.parent.fsName + '/output');
      if (!outDir.exists) outDir.create();
      var reportFile = new File(outDir.fsName + '/roundtrip-report.json');
      reportFile.encoding = 'UTF-8';
      reportFile.open('w');
      reportFile.write(JSON.stringify(report, null, 2));
      reportFile.close();
    } catch (e) {
      // best effort
    }
  }

  try {
    var scriptFile = new File($.fileName);
    var repoRoot = scriptFile.parent.parent.parent;
    var vendoredDir = repoRoot.fsName + '/bundle/jsx';
    var bundleFile = new File(repoRoot.fsName + '/bundle/jsx-ts/bodymovin.bundle.jsx');

    // Load TS bundle then vendored polyfills (proven order from smoke + export)
    $.evalFile(bundleFile.fsName);
    $.evalFile(vendoredDir + '/JSON.jsx');
    $.evalFile(vendoredDir + '/esprima.jsx');
    $.evalFile(vendoredDir + '/escodegen.jsx');
    report.bundle_loaded = !!(
      $.__bodymovin
      && $.__bodymovin.bm_lottieImporter
      && $.__bodymovin.bm_lottieImporter.importLottieData
      && $.__bodymovin.bm_compsManager
    );
    if (!report.bundle_loaded) {
      report.exception = 'Bundle loaded but importLottieData or bm_compsManager missing';
      writeReport();
      return;
    }

    // Locate input
    var inputPath = $.global._BM_INPUT_JSON;
    if (!inputPath) {
      report.exception = '_BM_INPUT_JSON not set';
      writeReport();
      return;
    }
    var inputFile = new File(inputPath);
    if (!inputFile.exists) {
      report.exception = 'Input not found: ' + inputPath;
      writeReport();
      return;
    }
    inputFile.encoding = 'UTF-8';
    inputFile.open('r');
    var jsonStr = inputFile.read();
    inputFile.close();
    report.input_loaded = true;
    report.input_path = inputPath;
    report.input_size = jsonStr.length;

    var jsonData = $.__bodymovin.JSON.parse(jsonStr);

    // Fresh empty project for the import
    app.newProject();
    report.new_project_created = true;

    // Import
    var importResult = $.__bodymovin.bm_lottieImporter.importLottieData(jsonData);
    report.import_called = true;
    report.import_success = !!(importResult && importResult.success);
    report.main_comp_id = (importResult && importResult.mainCompId) || null;
    report.import_alerts = (importResult && importResult.alerts) || [];
    report.import_alert_count = report.import_alerts.length;
    report.import_error = (importResult && importResult.error) || null;

    if (!report.import_success) {
      writeReport();
      return;
    }

    // Find the imported comp by name (top-level nm in the JSON)
    var targetCompName = jsonData.nm;
    report.comp_name = targetCompName;
    var importedComp = null;
    var i;
    for (i = 1; i <= app.project.numItems; i += 1) {
      var item = app.project.item(i);
      if (item instanceof CompItem && item.name === targetCompName) {
        importedComp = item;
        break;
      }
    }
    if (!importedComp) {
      report.exception = 'Imported comp "' + targetCompName + '" not found in project';
      writeReport();
      return;
    }
    report.imported_comp_found = true;

    // Output path for re-export
    var outDir = new Folder(scriptFile.parent.fsName + '/output');
    if (!outDir.exists) outDir.create();
    var outputPath = outDir.fsName + '/roundtrip-' + targetCompName + '.json';
    var outputFile = new File(outputPath);
    if (outputFile.exists) outputFile.remove();
    report.output_path = outputPath;

    // Settings mirror tests/export/driver.jsx defaults
    var settings = {
      segmented: false, segmentedTime: 10, standalone: false, avd: false,
      glyphs: true, includeExtraChars: false, bundleFonts: false, inlineFonts: false,
      hiddens: false, original_assets: false, original_names: false,
      should_encode_images: false, should_compress: true, should_skip_images: false,
      should_reuse_images: false, should_include_av_assets: false, compression_rate: 80,
      extraComps: { active: false, list: [] },
      guideds: false, ignore_expression_properties: false, export_old_format: false,
      use_source_names: false, shouldTrimData: false, skip_default_properties: false,
      not_supported_properties: false, pretty_print: false, useCompNamesAsIds: false,
      export_mode: 'standard',
      export_modes: { standard: true, demo: false, standalone: false, banner: false, avd: false, smil: false, rive: false, reports: false },
      demoData: { backgroundColor: '#ffffff' },
      banner: { lottie_origin: 'local', lottie_path: 'https://', lottie_library: '5.12.2', lottie_renderer: 'svg', width: 500, height: 500, use_original_sizes: true, original_width: 500, original_height: 500, click_tag: 'https://', zip_files: true, shouldIncludeAnimationDataInTemplate: false, shouldLoop: false, loopCount: 0, localPath: null },
      expressions: { shouldBake: false, shouldCacheExport: false, shouldBakeBeyondWorkArea: false, sampleSize: 1 },
      audio: { isEnabled: false, shouldRaterizeWaveform: false, bitrate: 96 },
      metadata: { includeFileName: false, customProps: [] },
      template: { active: false, id: 0, errors: [] },
      essentialProperties: { active: true, useSlots: false, skipExternalComp: false }
    };

    var compositionData = {
      id: importedComp.id,
      name: importedComp.name,
      uid: 'roundtrip-' + new Date().getTime(),
      absoluteURI: outputFile.absoluteURI,
      destination: outputPath,
      settings: settings
    };

    $.__bodymovin.bm_compsManager.renderComposition(compositionData);
    report.re_export_triggered = true;

  } catch (e) {
    report.exception = e.toString()
      + ' @ line ' + (e.line || '?')
      + ' file ' + (e.fileName || '?');
  }

  report.elapsed_ms = new Date().getTime() - startMs;
  writeReport();
})();
