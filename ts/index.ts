// Imports (rollup hoists these; their side-effects run before the code below)

// Polyfills MUST come first — patches Array/Object/String/Math prototypes
// for ES3-flavored ExtendScript before any other module runs.
import './core/polyfills';

// Event manager
import { bm_eventDispatcher } from './eventManager';

// Annotations
import { bm_annotationsManager } from './annotationsManager';

// Enums
import { layerStyleTypes } from './enums/layerStyleTypes';
import { layerTypes } from './enums/layerTypes';
import { maskTypes } from './enums/maskTypes';
import { shapeTypes } from './enums/shapeTypes';

// Helpers
import { assetsStorage } from './helpers/assetsStorage';
import { bm_blendModes } from './helpers/blendModes';
import { bm_boundingBox } from './helpers/boundingBox';
import { bm_fileManager } from './helpers/fileManager';
import { getLayerType } from './helpers/layerResolver';
import { getLayerStyleType } from './helpers/layerStyleResolver';
import { getMaskType } from './helpers/maskTypeResolver';
import { presetHelper } from './helpers/presetHelper';
import { bm_renderHelper } from './helpers/renderHelper';
import { bm_renderQueueHelper } from './helpers/renderQueueHelper';
import { bm_settingsHelper } from './helpers/settingsHelper';
import { getShapeType } from './helpers/shapeTypeResolver';
import { bm_versionHelper } from './helpers/versionHelper';

// Elements
import { bm_layerElement } from './elements/layerElement';

// Importers
import { bm_lottieImporter } from './importers/lottieImporter';

// Exporters
import { bm_avdExporter } from './exporters/avdExporter';
import { bm_bannerExporter } from './exporters/bannerExporter';
import { bm_demoExporter } from './exporters/demoExporter';
import { bm_exporterHelpers } from './exporters/exporterHelpers';
import { bm_riveExporter } from './exporters/riveExporter';
import { bm_smilExporter } from './exporters/smilExporter';
import { bm_standaloneExporter } from './exporters/standaloneExporter';
import { bm_standardExporter } from './exporters/standardExporter';

// Reports — types
import { bm_reportBuilderTypes } from './reports/builderTypes';
import { bm_reportsEffectMessages } from './reports/effectsMessageTypes';
import { bm_reportMessageTypes } from './reports/messageTypes';
import { bm_reportRendererTypes } from './reports/rendererTypes';

// Reports — factories
import { bm_messageClassReport } from './reports/messageClassReport';
import { bm_reportMessageFactory } from './reports/reportMessageFactory';
import { bm_reportEffectMessageFactory } from './reports/reportEffectMessageFactory';
import { bm_reportAnimatorSelectorMessageFactory } from './reports/reportAnimatorSelectorMessageFactory';
import { bm_reportAnimatorMessageFactory } from './reports/reportAnimatorMessageFactory';

// Reports — properties
import { bm_propertyReport } from './reports/propertyReport';
import { bm_positionReport } from './reports/positionReport';
import { bm_rotationReport } from './reports/rotationReport';
import { bm_transformReportFactory } from './reports/transformReport';
import { bm_effectsReportFactory } from './reports/effectsReport';
import { bm_masksReportFactory } from './reports/masksReport';

// Reports — masks
import { bm_maskReportFactory } from './reports/masks/maskReport';

// Reports — layer styles
import { bm_layerStylesStrokeFactory } from './reports/layerStyles/strokeStyle';
import { bm_layerStylesDropShadowFactory } from './reports/layerStyles/dropShadowStyle';
import { bm_layerStylesInnerShadowFactory } from './reports/layerStyles/innerShadowStyle';
import { bm_layerStylesOuterGlowFactory } from './reports/layerStyles/outerGlowStyle';
import { bm_layerStylesInnerGlowFactory } from './reports/layerStyles/innerGlowStyle';
import { bm_layerStylesBevelEmbossFactory } from './reports/layerStyles/bevelEmbossStyle';
import { bm_layerStylesSatinFactory } from './reports/layerStyles/satinStyle';
import { bm_layerStylesColorOverlayFactory } from './reports/layerStyles/colorOverlayStyle';
import { bm_layerStylesGradientOverlayFactory } from './reports/layerStyles/gradientOverlayStyle';
import { bm_layerStylesReportFactory } from './reports/layerStylesReport';

// Reports — shape sub-reports
import { bm_shapeGroupReport } from './reports/layers/shapes/shapeGroupReport';
import { bm_shapeRectReport } from './reports/layers/shapes/shapeRectReport';
import { bm_shapeEllipseReport } from './reports/layers/shapes/shapeEllipseReport';
import { bm_shapeStarReport } from './reports/layers/shapes/shapeStarReport';
import { bm_shapeShapeReport } from './reports/layers/shapes/shapeShapeReport';
import { bm_shapeFillReport } from './reports/layers/shapes/shapeFillReport';
import { bm_shapeStrokeReport } from './reports/layers/shapes/shapeStrokeReport';
import { bm_shapeGradientFillReport } from './reports/layers/shapes/shapeGradientFillReport';
import { bm_shapeGradientStrokeReport } from './reports/layers/shapes/shapeGradientStrokeReport';
import { bm_shapeMergePathsReport } from './reports/layers/shapes/shapeMergePathsReport';
import { bm_shapeRoundCornersReport } from './reports/layers/shapes/shapeRoundCornersReport';
import { bm_shapePuckerAndBloatReport } from './reports/layers/shapes/shapePuckerAndBloatReport';
import { bm_shapeTrimPathsReport } from './reports/layers/shapes/shapeTrimPathsReport';
import { bm_shapeRepeaterReport } from './reports/layers/shapes/shapeRepeaterReport';
import { bm_shapeUnhandledReport } from './reports/layers/shapes/shapeUnhandledReport';
import { bm_shapeReportHelper } from './reports/layers/shapes/shapeReportHelper';
import { bm_shapeCollectionReport } from './reports/layers/shapes/shapeCollectionReport';

// Reports — text sub-reports
import { bm_textSelectorReport } from './reports/layers/texts/textAnimatorSelectorReport';
import { bm_textAnimatorsReport } from './reports/layers/texts/textAnimatorsReport';

// Reports — layer reports
import { bm_layerReport } from './reports/layerReport';
import { bm_imageLayerReport } from './reports/layers/imageLayerReport';
import { bm_imageSequenceLayerReport } from './reports/layers/imageSequenceLayerReport';
import { bm_cameraLayerReport } from './reports/layers/cameraLayerReport';
import { bm_audioLayerReport } from './reports/layers/audioLayerReport';
import { bm_nullLayerReport } from './reports/layers/nullLayerReport';
import { bm_solidLayerReport } from './reports/layers/solidLayerReport';
import { bm_adjustmentLayerReport } from './reports/layers/adjustmentLayerReport';
import { bm_lightLayerReport } from './reports/layers/lightLayerReport';
import { bm_textLayerReport } from './reports/layers/textLayerReport';
import { bm_unhandledLayerReport } from './reports/layers/unhandledLayerReport';
import { bm_failedLayerReport } from './reports/layers/failedLayerReport';
import { bm_compositionLayerReport } from './reports/layers/compositionLayerReport';
import { bm_shapeLayerReport as bm_shapeLayerReport_layers } from './reports/layers/shapeLayerReport';
import { bm_shapeLayerReport as bm_shapeLayerReport_root } from './reports/shapeLayerReport';
import { bm_layerReportHelper } from './reports/layerReportHelper';
import { bm_layerCollectionReport } from './reports/layerCollectionReport';
import { bm_animationReport } from './reports/animationReport';
import { bm_reportsManager } from './reports/reportsManager';

// Download manager
import { bm_downloadManager } from './downloadManager';

// Expressions
import { bm_expressionHelper } from './utils/expressionHelper';

// Utils — top-level helpers
import { bm_generalUtils } from './utils/generalUtils';
import { bm_textCompHelper } from './utils/textCompHelper';

// Utils — bez + matrix + PropertyFactory
import { bez } from './utils/bez';
import { Matrix } from './utils/transformation-matrix';
import { PropertyFactory } from './utils/PropertyFactory';

// Utils — XMP/Project
import { bm_XMPHelper } from './utils/XMPParser';
import { bm_ProjectHelper } from './utils/ProjectParser';

// Utils — single-function helpers (must be wrapped as { fn } to match original surface)
import { bm_audioHelper } from './utils/audioHelper';
import { bm_cameraHelper } from './utils/cameraHelper';
import { bm_dataHelper } from './utils/dataHelper';
import { bm_keyframeHelper } from './utils/keyframeHelper';
import { bm_maskHelper } from './utils/maskHelper';
import { bm_markerHelper } from './utils/markerHelper';
import { bm_timeremapHelper } from './utils/timeremapHelper';
import { bm_shapeHelper } from './utils/shapeHelper';

// Utils — multi-export objects
import { bm_transformHelper } from './utils/transformHelper';
import { bm_effectsHelper } from './utils/effectsHelper';
import { bm_layerStylesHelper } from './utils/layerStylesHelper';
import { bm_essentialPropertiesHelper } from './utils/essentialPropertiesHelper';
import { bm_textHelper } from './utils/textHelper';
import { bm_textShapeHelper } from './utils/textShapeHelper';
import { bm_textAnimatorHelper } from './utils/textAnimatorHelper';
import { bm_sourceHelper } from './utils/sourceHelper';
import { bm_audioSourceHelper } from './utils/audioSourceHelper';
import { bm_dataSourceHelper } from './utils/dataSourceHelper';
import { bm_imageSeqHelper } from './utils/imageSeqHelper';

// Managers
import { bm_projectManager } from './projectManager';
import { bm_compsManager } from './compsManager';
import { bm_dataManager } from './dataManager';
import { bm_renderManager } from './renderManager';

// Main + host script
import { bm_main } from './main';
import { host_script } from './hostscript';

// Side-effect-only module (initializer registers things directly)
import './initializer';

// ---------------------------------------------------------------------------
// Namespace skeleton — recreated every load (matches original initializer.jsx)
// ---------------------------------------------------------------------------
$.__bodymovin = { esprima: {} };

// ---------------------------------------------------------------------------
// Function.prototype.bm_bind polyfill (port of initializer.jsx:11-27)
// ---------------------------------------------------------------------------
if (!(Function.prototype as any).bm_bind) {
  (function () {
    var slice = Array.prototype.slice;
    (Function.prototype as any).bm_bind = function () {
      var thatFunc = this,
        thatArg = arguments[0];
      var args = slice.call(arguments, 1);
      if (typeof thatFunc !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError(
          'Function.prototype.bm_bind - ' +
            'what is trying to be bound is not callable'
        );
      }
      return function () {
        var funcArgs = args.concat(slice.call(arguments));
        return thatFunc.apply(thatArg, funcArgs);
      };
    };
  })();
}

// ---------------------------------------------------------------------------
// Wire each module's public surface onto $.__bodymovin
// (key names mirror the original bundle/jsx/*.jsx `$.__bodymovin.X = ...` lines)
// ---------------------------------------------------------------------------

const bm = $.__bodymovin;

// Event manager
bm.bm_eventDispatcher = bm_eventDispatcher;

// Annotations
bm.bm_annotationsManager = bm_annotationsManager;

// Enums
bm.layerStyleTypes = layerStyleTypes;
bm.layerTypes = layerTypes;
bm.maskTypes = maskTypes;
bm.shapeTypes = shapeTypes;

// Helpers
bm.assetsStorage = assetsStorage;
bm.bm_blendModes = bm_blendModes;
bm.bm_boundingBox = bm_boundingBox;
bm.bm_fileManager = bm_fileManager;
bm.getLayerType = getLayerType;
bm.getLayerStyleType = getLayerStyleType;
bm.getMaskType = getMaskType;
bm.presetHelper = presetHelper;
bm.bm_renderHelper = bm_renderHelper;
bm.bm_renderQueueHelper = bm_renderQueueHelper;
bm.bm_settingsHelper = bm_settingsHelper;
bm.getShapeType = getShapeType;
bm.bm_versionHelper = bm_versionHelper;

// Elements
bm.bm_layerElement = bm_layerElement;

// Importers
bm.bm_lottieImporter = bm_lottieImporter;

// Exporters
bm.bm_avdExporter = bm_avdExporter;
bm.bm_bannerExporter = bm_bannerExporter;
bm.bm_demoExporter = bm_demoExporter;
bm.bm_exporterHelpers = bm_exporterHelpers;
bm.bm_riveExporter = bm_riveExporter;
bm.bm_smilExporter = bm_smilExporter;
bm.bm_standaloneExporter = bm_standaloneExporter;
bm.bm_standardExporter = bm_standardExporter;

// Reports — types
bm.bm_reportBuilderTypes = bm_reportBuilderTypes;
bm.bm_reportsEffectMessages = bm_reportsEffectMessages;
bm.bm_reportMessageTypes = bm_reportMessageTypes;
bm.bm_reportRendererTypes = bm_reportRendererTypes;

// Reports — factories
bm.bm_messageClassReport = bm_messageClassReport;
bm.bm_reportMessageFactory = bm_reportMessageFactory;
bm.bm_reportEffectMessageFactory = bm_reportEffectMessageFactory;
bm.bm_reportAnimatorSelectorMessageFactory =
  bm_reportAnimatorSelectorMessageFactory;
bm.bm_reportAnimatorMessageFactory = bm_reportAnimatorMessageFactory;

// Reports — properties
bm.bm_propertyReport = bm_propertyReport;
bm.bm_positionReport = bm_positionReport;
bm.bm_rotationReport = bm_rotationReport;
bm.bm_transformReportFactory = bm_transformReportFactory;
bm.bm_effectsReportFactory = bm_effectsReportFactory;
bm.bm_masksReportFactory = bm_masksReportFactory;

// Reports — masks
bm.bm_maskReportFactory = bm_maskReportFactory;

// Reports — layer styles
bm.bm_layerStylesStrokeFactory = bm_layerStylesStrokeFactory;
bm.bm_layerStylesDropShadowFactory = bm_layerStylesDropShadowFactory;
bm.bm_layerStylesInnerShadowFactory = bm_layerStylesInnerShadowFactory;
bm.bm_layerStylesOuterGlowFactory = bm_layerStylesOuterGlowFactory;
bm.bm_layerStylesInnerGlowFactory = bm_layerStylesInnerGlowFactory;
bm.bm_layerStylesBevelEmbossFactory = bm_layerStylesBevelEmbossFactory;
bm.bm_layerStylesSatinFactory = bm_layerStylesSatinFactory;
bm.bm_layerStylesColorOverlayFactory = bm_layerStylesColorOverlayFactory;
bm.bm_layerStylesGradientOverlayFactory = bm_layerStylesGradientOverlayFactory;
bm.bm_layerStylesReportFactory = bm_layerStylesReportFactory;

// Reports — shape sub-reports
bm.bm_shapeGroupReport = bm_shapeGroupReport;
bm.bm_shapeRectReport = bm_shapeRectReport;
bm.bm_shapeEllipseReport = bm_shapeEllipseReport;
bm.bm_shapeStarReport = bm_shapeStarReport;
bm.bm_shapeShapeReport = bm_shapeShapeReport;
bm.bm_shapeFillReport = bm_shapeFillReport;
bm.bm_shapeStrokeReport = bm_shapeStrokeReport;
bm.bm_shapeGradientFillReport = bm_shapeGradientFillReport;
bm.bm_shapeGradientStrokeReport = bm_shapeGradientStrokeReport;
bm.bm_shapeMergePathsReport = bm_shapeMergePathsReport;
bm.bm_shapeRoundCornersReport = bm_shapeRoundCornersReport;
bm.bm_shapePuckerAndBloatReport = bm_shapePuckerAndBloatReport;
bm.bm_shapeTrimPathsReport = bm_shapeTrimPathsReport;
bm.bm_shapeRepeaterReport = bm_shapeRepeaterReport;
bm.bm_shapeUnhandledReport = bm_shapeUnhandledReport;
bm.bm_shapeReportHelper = bm_shapeReportHelper;
bm.bm_shapeCollectionReport = bm_shapeCollectionReport;

// Reports — text sub-reports
bm.bm_textSelectorReport = bm_textSelectorReport;
bm.bm_textAnimatorsReport = bm_textAnimatorsReport;

// Reports — layer reports
bm.bm_layerReport = bm_layerReport;
bm.bm_imageLayerReport = bm_imageLayerReport;
bm.bm_imageSequenceLayerReport = bm_imageSequenceLayerReport;
bm.bm_cameraLayerReport = bm_cameraLayerReport;
bm.bm_audioLayerReport = bm_audioLayerReport;
bm.bm_nullLayerReport = bm_nullLayerReport;
bm.bm_solidLayerReport = bm_solidLayerReport;
bm.bm_adjustmentLayerReport = bm_adjustmentLayerReport;
bm.bm_lightLayerReport = bm_lightLayerReport;
bm.bm_textLayerReport = bm_textLayerReport;
bm.bm_unhandledLayerReport = bm_unhandledLayerReport;
bm.bm_failedLayerReport = bm_failedLayerReport;
bm.bm_compositionLayerReport = bm_compositionLayerReport;
// Two files export the same identifier `bm_shapeLayerReport`. Original code
// also loads both — the later one wins. Match that order: layers/ first, root second.
bm.bm_shapeLayerReport = bm_shapeLayerReport_layers;
bm.bm_shapeLayerReport = bm_shapeLayerReport_root;
bm.bm_layerReportHelper = bm_layerReportHelper;
bm.bm_layerCollectionReport = bm_layerCollectionReport;
bm.bm_animationReport = bm_animationReport;
bm.bm_reportsManager = bm_reportsManager;

// Download manager
bm.bm_downloadManager = bm_downloadManager;

// Expressions
bm.bm_expressionHelper = bm_expressionHelper;

// Utils — top-level helpers
bm.bm_generalUtils = bm_generalUtils;
bm.bm_textCompHelper = bm_textCompHelper;

// Utils — bez + matrix + PropertyFactory
bm.bez = bez;
bm.Matrix = Matrix;
bm.PropertyFactory = PropertyFactory;

// Utils — XMP/Project
bm.bm_XMPHelper = bm_XMPHelper;
bm.bm_ProjectHelper = bm_ProjectHelper;

// Utils — single-function helpers (match original object surface)
bm.bm_audioHelper = bm_audioHelper;
bm.bm_cameraHelper = bm_cameraHelper;
bm.bm_dataHelper = bm_dataHelper;
bm.bm_keyframeHelper = bm_keyframeHelper;
bm.bm_maskHelper = bm_maskHelper;
bm.bm_markerHelper = bm_markerHelper;
bm.bm_timeremapHelper = bm_timeremapHelper;
bm.bm_shapeHelper = bm_shapeHelper;

// Utils — multi-export objects
bm.bm_transformHelper = bm_transformHelper;
bm.bm_effectsHelper = bm_effectsHelper;
bm.bm_layerStylesHelper = bm_layerStylesHelper;
bm.bm_essentialPropertiesHelper = bm_essentialPropertiesHelper;
bm.bm_textHelper = bm_textHelper;
bm.bm_textShapeHelper = bm_textShapeHelper;
bm.bm_textAnimatorHelper = bm_textAnimatorHelper;
bm.bm_sourceHelper = bm_sourceHelper;
bm.bm_audioSourceHelper = bm_audioSourceHelper;
bm.bm_dataSourceHelper = bm_dataSourceHelper;
bm.bm_imageSeqHelper = bm_imageSeqHelper;

// Managers
bm.bm_projectManager = bm_projectManager;
bm.bm_compsManager = bm_compsManager;
bm.bm_dataManager = bm_dataManager;
bm.bm_renderManager = bm_renderManager;

// Main + host script
bm.bm_main = bm_main;
bm.host_script = host_script;
