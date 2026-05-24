// Smoke test driver for the TS bundle.
// Loads vendored polyfills + the TS bundle, asserts the expected
// $.__bodymovin.* namespace surface, and writes a JSON report to disk.
//
// Designed to be eval'd via osascript from tests/smoke/run.sh.
// Uses native JSON (AE 2014+) for the report so it works even if the
// bundle's own JSON polyfill fails to load.

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
    polyfills_loaded: { JSON: false, esprima: false, escodegen: false },
    namespace_key_count: 0,
    namespace_keys: [],
    expected_keys_present: 0,
    expected_keys_missing: [],
    exception: null,
    elapsed_ms: 0
  };

  // Surface every key the panel calls via evalScript, plus core internals.
  // Drawn from bundle/jsx/initializer.jsx:179-184 + ts/index.ts wiring.
  var expectedKeys = [
    // event + main
    'bm_eventDispatcher', 'bm_main', 'host_script',
    // managers
    'bm_renderManager', 'bm_dataManager', 'bm_compsManager',
    'bm_projectManager', 'bm_downloadManager', 'bm_annotationsManager',
    // core utils
    'bm_generalUtils', 'bm_expressionHelper', 'bm_keyframeHelper',
    'bm_shapeHelper', 'bm_sourceHelper', 'bm_effectsHelper',
    'bm_transformHelper', 'bm_maskHelper', 'bm_timeremapHelper',
    'bm_cameraHelper', 'bm_audioHelper', 'bm_dataHelper', 'bm_markerHelper',
    'bm_layerStylesHelper', 'bm_essentialPropertiesHelper',
    'bm_textHelper', 'bm_textShapeHelper', 'bm_textAnimatorHelper',
    'bm_textCompHelper', 'bm_audioSourceHelper', 'bm_dataSourceHelper',
    'bm_imageSeqHelper', 'bm_XMPHelper', 'bm_ProjectHelper',
    'PropertyFactory', 'bez', 'Matrix',
    // helpers
    'bm_settingsHelper', 'bm_fileManager', 'bm_blendModes',
    'bm_boundingBox', 'bm_renderHelper', 'bm_renderQueueHelper',
    'bm_versionHelper', 'assetsStorage', 'presetHelper',
    'getLayerType', 'getShapeType', 'getMaskType', 'getLayerStyleType',
    // enums
    'layerTypes', 'shapeTypes', 'maskTypes', 'layerStyleTypes',
    // elements + importer
    'bm_layerElement', 'bm_lottieImporter',
    // exporters
    'bm_standardExporter', 'bm_bannerExporter', 'bm_avdExporter',
    'bm_smilExporter', 'bm_riveExporter', 'bm_standaloneExporter',
    'bm_demoExporter', 'bm_exporterHelpers',
    // reports — types
    'bm_reportRendererTypes', 'bm_reportMessageTypes',
    'bm_reportBuilderTypes', 'bm_reportsEffectMessages',
    // reports — sampling (full list ~30 more, just spot-check key ones)
    'bm_messageClassReport', 'bm_reportMessageFactory',
    'bm_layerReport', 'bm_layerCollectionReport',
    'bm_shapeCollectionReport', 'bm_animationReport',
    'bm_reportsManager'
  ];

  try {
    // Locate repo root: this file lives at <repo>/tests/smoke/driver.jsx
    var scriptFile = new File($.fileName);
    var repoRoot = scriptFile.parent.parent.parent;

    // Bundle dir for the vendored polyfills
    var vendoredDir = repoRoot.fsName + '/bundle/jsx';
    var bundleFile = new File(repoRoot.fsName + '/bundle/jsx-ts/bodymovin.bundle.jsx');

    // Initialize namespace before loading anything (matches initializer.jsx)
    $.__bodymovin = { esprima: {} };

    // Vendored polyfills — load in dependency order
    var jsonFile = new File(vendoredDir + '/JSON.jsx');
    if (jsonFile.exists) {
      $.evalFile(jsonFile.fsName);
      report.polyfills_loaded.JSON = !!($.__bodymovin.JSON && $.__bodymovin.JSON.stringify);
    }
    var esprimaFile = new File(vendoredDir + '/esprima.jsx');
    if (esprimaFile.exists) {
      $.evalFile(esprimaFile.fsName);
      var esprimaKeyCount = 0;
      if ($.__bodymovin.esprima) {
        for (var ek in $.__bodymovin.esprima) {
          if ($.__bodymovin.esprima.hasOwnProperty(ek)) esprimaKeyCount++;
        }
      }
      report.polyfills_loaded.esprima = esprimaKeyCount > 0;
    }

    // The TS bundle — must load BEFORE escodegen (escodegen mutates bm_expressionHelper)
    if (!bundleFile.exists) {
      report.exception = 'Bundle missing at ' + bundleFile.fsName;
    } else {
      $.evalFile(bundleFile.fsName);
      report.bundle_loaded = true;
    }

    var escodegenFile = new File(vendoredDir + '/escodegen.jsx');
    if (escodegenFile.exists) {
      $.evalFile(escodegenFile.fsName);
      report.polyfills_loaded.escodegen = !!($.__bodymovin.bm_expressionHelper && $.__bodymovin.bm_expressionHelper.escodegen);
    }

    // Enumerate everything attached to $.__bodymovin
    var k;
    var allKeys = [];
    for (k in $.__bodymovin) {
      if ($.__bodymovin.hasOwnProperty(k)) {
        allKeys.push(k);
      }
    }
    allKeys.sort();
    report.namespace_keys = allKeys;
    report.namespace_key_count = allKeys.length;

    // Check expected keys
    var present = 0;
    var missing = [];
    for (var i = 0; i < expectedKeys.length; i++) {
      if ($.__bodymovin[expectedKeys[i]] !== undefined && $.__bodymovin[expectedKeys[i]] !== null) {
        present++;
      } else {
        missing.push(expectedKeys[i]);
      }
    }
    report.expected_keys_present = present;
    report.expected_keys_missing = missing;

  } catch (e) {
    report.exception = e.toString() +
      ' @ line ' + (e.line || '?') +
      ' file ' + (e.fileName || '?');
  }

  report.elapsed_ms = new Date().getTime() - startMs;

  // Write report using native JSON (AE 14+ has it built-in)
  try {
    var outDir = new Folder(scriptFile.parent.fsName + '/output');
    if (!outDir.exists) outDir.create();
    var outputFile = new File(outDir.fsName + '/smoke-report.json');
    outputFile.encoding = 'UTF-8';
    outputFile.open('w');
    outputFile.write(JSON.stringify(report, null, 2));
    outputFile.close();
  } catch (e) {
    // Last-ditch: if even the report write fails, surface via a marker file
    var failFile = new File(scriptFile.parent.fsName + '/output/smoke-report.fail');
    failFile.open('w');
    failFile.write('Report write failed: ' + e.toString());
    failFile.close();
  }
})();
