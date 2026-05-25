// Generated from ts/ — do not edit by hand.
(function () {
    'use strict';

    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    };
    String.prototype.startsWith = function (search, position) {
        position = position || 0;
        return this.indexOf(search, position) === position;
    };
    String.prototype.endsWith = function (search, position) {
        var len = this.length;
        if (typeof position !== "number" || !isFinite(position) || position > len) {
            position = len;
        }
        position -= search.length;
        var lastIndex = this.indexOf(search, position);
        return lastIndex !== -1 && lastIndex === position;
    };
    String.prototype.includes = function (search, start) {
        if (typeof start !== "number") {
            start = 0;
        }
        return this.indexOf(search, start) !== -1;
    };
    String.prototype.repeat = function (count) {
        if (count < 0) {
            throw new RangeError("repeat count must be non-negative");
        }
        if (count === Infinity) {
            throw new RangeError("repeat count must be less than infinity");
        }
        count = Math.floor(count);
        if (count === 0) {
            return "";
        }
        var str = String(this);
        var result = "";
        while (count > 0) {
            if (count & 1) {
                result += str;
            }
            count >>= 1;
            if (count > 0) {
                str += str;
            }
        }
        return result;
    };
    String.prototype.padStart = function (targetLength, padString) {
        var str = String(this);
        if (targetLength <= str.length) {
            return str;
        }
        padString = String(padString || " ");
        var padLength = targetLength - str.length;
        if (padLength > padString.length) {
            padString = padString.repeat(Math.ceil(padLength / padString.length));
        }
        return padString.slice(0, padLength) + str;
    };
    String.prototype.padEnd = function (targetLength, padString) {
        var str = String(this);
        if (targetLength <= str.length) {
            return str;
        }
        padString = String(padString || " ");
        var padLength = targetLength - str.length;
        if (padLength > padString.length) {
            padString = padString.repeat(Math.ceil(padLength / padString.length));
        }
        return str + padString.slice(0, padLength);
    };

    Object.keys = function (obj) {
        if (obj === null || obj === undefined || typeof obj !== "object") {
            var message = "Object.keys called on a non-object";
            throw new Error(message);
        }
        var keys = [];
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                keys.push(key);
            }
        }
        return keys;
    };
    Object.values = function (obj) {
        if (obj === null || typeof obj !== "object") {
            var message = "Object.values called on a non-object";
            throw new Error(message);
        }
        var result = [];
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result.push(obj[key]);
            }
        }
        return result;
    };
    Object.entries = function (obj) {
        if (obj === null || typeof obj !== "object") {
            var message = "Object.entries called on a non-object";
            throw new Error(message);
        }
        var entries = [];
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                entries.push([key, obj[key]]);
            }
        }
        return entries;
    };
    Object.fromEntries = function (entries) {
        if (entries == null) {
            var message = "Cannot convert undefined or null to object";
            logger.error(message);
            throw new TypeError(message);
        }
        var obj = {};
        if (entries.length !== undefined) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry && entry.length >= 2) {
                    var key = String(entry[0]);
                    obj[key] = entry[1];
                }
            }
        }
        return obj;
    };
    Object.assign = function (target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (target == null) {
            var message = "Cannot convert undefined or null to object";
            logger.error(message);
            throw new TypeError(message);
        }
        var to = Object(target);
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        to[key] = source[key];
                    }
                }
            }
        }
        return to;
    };

    Array.prototype.includes = function (searchElement, fromIndex) {
        if (this == null) {
            throw new Error('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return false;
        }
        var n = fromIndex || 0;
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (o[k] === searchElement || (searchElement !== searchElement && o[k] !== o[k])) {
                return true;
            }
            k++;
        }
        return false;
    };
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        if (this == null) {
            throw new Error('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = fromIndex || 0;
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (o[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
    Array.prototype.map = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        var T;
        if (arguments.length > 1) {
            T = thisArg;
        }
        var A = new Array(len);
        var k = 0;
        while (k < len) {
            var kValue = void 0, mappedValue = void 0;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };
    Array.from = function (arrayLike, mapFn, thisArg) {
        if (arrayLike == null) {
            throw new TypeError("Array.from requires an array-like object");
        }
        var items = Object(arrayLike);
        var len = items.length >>> 0;
        var result = new Array(len);
        for (var i = 0; i < len; i++) {
            if (i in items) {
                if (mapFn) {
                    result[i] = mapFn.call(thisArg, items[i], i);
                }
                else {
                    result[i] = items[i];
                }
            }
        }
        return result;
    };
    Array.prototype.forEach = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        var T;
        if (arguments.length > 1) {
            T = thisArg;
        }
        for (var k = 0; k < len; k++) {
            if (k in O) {
                callback.call(T, O[k], k, O);
            }
        }
    };
    Array.prototype.filter = function (predicate, thisArg) {
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof predicate !== "function") {
            throw new TypeError(predicate + " is not a function");
        }
        var result = [];
        var T;
        if (arguments.length > 1) {
            T = thisArg;
        }
        for (var k = 0; k < len; k++) {
            if (k in O) {
                var val = O[k];
                if (predicate.call(T, val, k, O)) {
                    result.push(val);
                }
            }
        }
        return result;
    };
    Array.prototype.find = function (predicate, thisArg) {
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof predicate !== "function") {
            throw new TypeError(predicate + " is not a function");
        }
        var T;
        if (arguments.length > 1) {
            T = thisArg;
        }
        for (var k = 0; k < len; k++) {
            if (k in O) {
                var val = O[k];
                if (predicate.call(T, val, k, O)) {
                    return val;
                }
            }
        }
        return undefined;
    };
    Array.prototype.findIndex = function (predicate, thisArg) {
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof predicate !== "function") {
            throw new TypeError(predicate + " is not a function");
        }
        var T;
        if (arguments.length > 1) {
            T = thisArg;
        }
        for (var k = 0; k < len; k++) {
            if (k in O) {
                var val = O[k];
                if (predicate.call(T, val, k, O)) {
                    return k;
                }
            }
        }
        return -1;
    };
    Array.prototype.reduce = function (callback, initialValue) {
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (len === 0 && arguments.length < 2) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        var k = 0;
        var accumulator;
        if (arguments.length >= 2) {
            accumulator = initialValue;
        }
        else {
            var kPresent = false;
            while (!kPresent && k < len) {
                kPresent = k in O;
                if (kPresent) {
                    accumulator = O[k];
                }
                k++;
            }
            if (!kPresent) {
                throw new TypeError("Reduce of empty array with no initial value");
            }
        }
        while (k < len) {
            if (k in O) {
                accumulator = callback(accumulator, O[k], k, O);
            }
            k++;
        }
        return accumulator;
    };
    Array.prototype.some = function (predicate, thisArg) {
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof predicate !== "function") {
            throw new TypeError(predicate + " is not a function");
        }
        var T;
        if (arguments.length > 1) {
            T = thisArg;
        }
        for (var k = 0; k < len; k++) {
            if (k in O) {
                if (predicate.call(T, O[k], k, O)) {
                    return true;
                }
            }
        }
        return false;
    };
    Array.prototype.every = function (predicate, thisArg) {
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof predicate !== "function") {
            throw new TypeError(predicate + " is not a function");
        }
        var T;
        if (arguments.length > 1) {
            T = thisArg;
        }
        for (var k = 0; k < len; k++) {
            if (k in O) {
                if (!predicate.call(T, O[k], k, O)) {
                    return false;
                }
            }
        }
        return true;
    };
    Array.prototype.flat = function (depth) {
        if (depth === void 0) { depth = 1; }
        if (this == null) {
            throw new TypeError("this is null or undefined");
        }
        var O = Object(this);
        O.length >>> 0;
        var flatten = function (arr, d) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                if (i in arr) {
                    var element = arr[i];
                    if (Array.isArray(element) && d > 0) {
                        var flattened = flatten(element, d - 1);
                        for (var j = 0; j < flattened.length; j++) {
                            result.push(flattened[j]);
                        }
                    }
                    else {
                        result.push(element);
                    }
                }
            }
            return result;
        };
        return flatten(O, depth);
    };

    if (!Math.trunc) {
        Math.trunc = function (x) {
            if (isNaN(x)) {
                return NaN;
            }
            if (x === 0 || x === Infinity || x === -Infinity) {
                return x;
            }
            return x < 0 ? Math.ceil(x) : Math.floor(x);
        };
    }
    if (!Math.sign) {
        Math.sign = function (x) {
            x = +x;
            if (x === 0 || isNaN(x)) {
                return x;
            }
            return x > 0 ? 1 : -1;
        };
    }
    Math.log10 = function (x) {
        return Math.log(x) / Math.LN10;
    };

    var xLib;
    try {
        xLib = new ExternalObject('lib:\PlugPlugExternalObject');
    }
    catch (e) {
        alert$1('Missing ExternalObject: ');
    }
    function sendEvent(type, data) {
        var JSON = $.__bodymovin.JSON;
        if (xLib) {
            if (data && data instanceof Object) {
                data = JSON.stringify(data);
            }
            if (typeof data === 'number') {
                data = data.toString();
            }
            var eventObj = new CSXSEvent();
            eventObj.type = type;
            eventObj.data = data || '';
            eventObj.dispatch();
        }
    }
    function log(data) {
        sendEvent('console:log', data);
    }
    function alert$1(message) {
        sendEvent('bm:alert', { message: message });
    }
    var bm_eventDispatcher = { sendEvent: sendEvent, log: log, alert: alert$1 };

    function getActiveComp() {
        if (!app.project) {
            return undefined;
        }
        var item = app.project.activeItem;
        if (item instanceof CompItem) {
            return item;
        }
        return undefined;
    }

    var layers$1 = [];
    var textPropertyMatchName = 'Pseudo/Bodymovin Text Props 7';
    var pseudoEffects = [
        {
            path: '/assets/annotations/bodymovin_text_props_7.ffx',
            matchName: textPropertyMatchName,
            name: 'Text Properties',
        },
        {
            path: '/assets/annotations/bodymovin_image_props.ffx',
            matchName: 'Pseudo/Bodymovin Asset Props',
            name: 'Asset Properties',
        },
    ];
    var textAnnotationMatchNames = [
        'Pseudo/Bodymovin Text Props 4',
        'Pseudo/Bodymovin Text Props 4-0001',
        'Pseudo/Bodymovin Text Props 4-0002',
        'Pseudo/Bodymovin Text Props 4-0003',
        'Pseudo/Bodymovin Text Props 4-0004',
        'Pseudo/Bodymovin Text Props 4-0005',
        'Pseudo/Bodymovin Text Props 4-0006',
        'Pseudo/Bodymovin Text Props 5',
        'Pseudo/Bodymovin Text Props 5-0001',
        'Pseudo/Bodymovin Text Props 5-0002',
        'Pseudo/Bodymovin Text Props 5-0003',
        'Pseudo/Bodymovin Text Props 5-0004',
        'Pseudo/Bodymovin Text Props 5-0005',
        'Pseudo/Bodymovin Text Props 5-0006',
        'Pseudo/Bodymovin Text Props 6',
        'Pseudo/Bodymovin Text Props 6-0001',
        'Pseudo/Bodymovin Text Props 6-0002',
        'Pseudo/Bodymovin Text Props 6-0003',
        'Pseudo/Bodymovin Text Props 6-0004',
        'Pseudo/Bodymovin Text Props 6-0005',
        'Pseudo/Bodymovin Text Props 6-0006',
        'Pseudo/Bodymovin Text Props 6-0007',
        'Pseudo/Bodymovin Text Props 7',
        'Pseudo/Bodymovin Text Props 7-0001',
        'Pseudo/Bodymovin Text Props 7-0002',
        'Pseudo/Bodymovin Text Props 7-0003',
        'Pseudo/Bodymovin Text Props 7-0004',
        'Pseudo/Bodymovin Text Props 7-0005',
        'Pseudo/Bodymovin Text Props 7-0006',
        'Pseudo/Bodymovin Text Props 7-0007',
        'Pseudo/Bodymovin Text Props 7-0008',
    ];
    var assetAnnotationMatchNames = [
        'Pseudo/Bodymovin Asset Props',
        'Pseudo/Bodymovin Asset Props-0001',
        'Pseudo/Bodymovin Asset Props-0002',
        'Pseudo/Bodymovin Asset Props-0003',
        'Pseudo/Bodymovin Asset Props-0004',
        'Pseudo/Bodymovin Asset Props-0005',
        'Pseudo/Bodymovin Asset Props-0006',
        'Pseudo/Bodymovin Asset Props-0007',
        'Pseudo/Bodymovin Asset Props-0008',
    ];
    var allAnnotations = textAnnotationMatchNames.concat(assetAnnotationMatchNames);
    function createLayerReference(layer) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        return {
            layer: layer,
            id: bm_generalUtils.random(10),
        };
    }
    function findLayerId(layer) {
        var i = 0;
        var len = layers$1.length;
        for (i = 0; i < len; i += 1) {
            if (layers$1[i].layer === layer) {
                return layers$1[i].id;
            }
        }
        var newLayer = createLayerReference(layer);
        layers$1.push(newLayer);
        return newLayer.id;
    }
    function findLayerById(id) {
        var i = 0;
        var len = layers$1.length;
        for (i = 0; i < len; i += 1) {
            if (layers$1[i].id === id) {
                return layers$1[i].layer;
            }
        }
    }
    function searchPseudoEffectByMatchName(matchName) {
        var i = 0;
        var len = pseudoEffects.length;
        while (i < len) {
            if (pseudoEffects[i].matchName === matchName) {
                return true;
            }
            i += 1;
        }
        return false;
    }
    function buildAnnotations(layer) {
        var effects = layer.effect;
        var i;
        var effect;
        var annotations = [];
        for (i = 0; i < effects.numProperties; i += 1) {
            effect = effects(i + 1);
            if (searchPseudoEffectByMatchName(effect.matchName)) {
                annotations.push({
                    matchName: effect.matchName,
                });
            }
        }
        return annotations;
    }
    function buildLayerInfo(layer) {
        var layerId = findLayerId(layer);
        return {
            id: layerId,
            name: layer.name,
            annotations: buildAnnotations(layer),
        };
    }
    function getLayers() {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var comp = getActiveComp();
        if (comp) {
            var selectedLayers = comp.selectedLayers;
            var i = 0;
            var layersInfo = [];
            for (i = 0; i < selectedLayers.length; i += 1) {
                var layerInfo = buildLayerInfo(selectedLayers[i]);
                layersInfo.push(layerInfo);
            }
            bm_eventDispatcher.sendEvent('bm:annotations:list', layersInfo);
        }
    }
    function findPseudoEffectByMatchName(matchName) {
        for (var i = 0; i < pseudoEffects.length; i += 1) {
            if (pseudoEffects[i].matchName === matchName) {
                return pseudoEffects[i];
            }
        }
        return null;
    }
    function activateAnnotations(layerId, annotationId) {
        var presetHelper = $.__bodymovin.presetHelper;
        var layer = findLayerById(layerId);
        var pseudoEffect = findPseudoEffectByMatchName(annotationId) || pseudoEffects[0];
        if (layer) {
            presetHelper.applyPreset(layer, annotationId, pseudoEffect);
        }
    }
    function getAvailableAnnotation() {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        bm_eventDispatcher.sendEvent('bm:annotations:annotationsList', pseudoEffects);
    }
    function calculateLineJoin(value) {
        if (value === 1) {
            return 1;
        }
        return value - 1;
    }
    function formatVerticalAlignment(value) {
        return value - 1 + 3;
    }
    function addTextProperties(effect, data) {
        var i;
        var len = effect.numProperties;
        var prop;
        for (i = 0; i < len; i += 1) {
            prop = effect.property(i + 1);
            if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0001') {
                data.vj = formatVerticalAlignment(prop.value);
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0002') {
                data.rs = prop.value - 1;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0003') {
                if (prop.value !== 1) {
                    data.m = prop.value - 2;
                }
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0004') {
                data.mc = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0005') {
                data.mf = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0006') {
                data.xf = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0007') {
                data.lj = calculateLineJoin(prop.value);
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 7-0008') {
                data.xl = prop.value;
            }
            if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0001') {
                data.vj = prop.value - 1;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0002') {
                data.rs = prop.value - 1;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0003') {
                if (prop.value !== 1) {
                    data.m = prop.value - 2;
                }
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0004') {
                data.mc = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0005') {
                data.mf = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0006') {
                data.xf = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 6-0007') {
                data.lj = calculateLineJoin(prop.value);
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0001') {
                data.vj = prop.value - 1;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0002') {
                data.rs = prop.value - 1;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0003') {
                if (prop.value !== 1) {
                    data.m = prop.value - 2;
                }
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0004') {
                data.mc = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0005') {
                data.mf = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 5-0006') {
                data.xf = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0001') {
                data.vj = prop.value - 1;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0002') {
                data.rs = prop.value - 1;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0003') {
                data.mc = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0004') {
                data.mf = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Text Props 4-0005') {
                data.xf = prop.value;
            }
        }
    }
    function addAssetProperties(effect) {
        var i;
        var len = effect.numProperties;
        var prop;
        var data = {};
        for (i = 0; i < len; i += 1) {
            prop = effect.property(i + 1);
            if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0001') {
                data.originalAsset = prop.value === 1 ? false : true;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0002') {
                data.sourceAsId = prop.value === 1 ? false : true;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0003') {
                data.copyAsset = prop.value === 1 ? false : true;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0004') {
                data.enableCompression = prop.value === 1 ? false : true;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0005') {
                data.compression = prop.value;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0006') {
                data.includeInJson = prop.value === 1 ? false : true;
            }
            else if (prop.matchName === 'Pseudo/Bodymovin Asset Props-0007') {
                data.usePreviousExport = prop.value === 1 ? false : true;
            }
        }
        return data;
    }
    function searchTextProperties(layerInfo) {
        var textDocumentData = {};
        if (!(layerInfo.effect && layerInfo.effect.numProperties > 0)) {
            return textDocumentData;
        }
        var effects = layerInfo.effect;
        var i;
        var len = effects.numProperties;
        var effectElement;
        for (i = 0; i < len; i += 1) {
            effectElement = effects(i + 1);
            if (effectElement.enabled && isTextAnnotation(effectElement.matchName)) {
                addTextProperties(effectElement, textDocumentData);
            }
        }
        return textDocumentData;
    }
    function searchAnnotationInList(matchName, list) {
        var i;
        var len = list.length;
        for (i = 0; i < len; i += 1) {
            if (list[i] === matchName) {
                return true;
            }
        }
        return false;
    }
    function isTextAnnotation(matchName) {
        return searchAnnotationInList(matchName, textAnnotationMatchNames);
    }
    function isAnnotation(matchName) {
        return searchAnnotationInList(matchName, allAnnotations);
    }
    function searchAssetAnnotationInLayer(layerInfo) {
        if (!(layerInfo.effect && layerInfo.effect.numProperties > 0)) {
            return null;
        }
        var effects = layerInfo.effect;
        var i;
        var len = effects.numProperties;
        var effectElement;
        for (i = 0; i < len; i += 1) {
            effectElement = effects(i + 1);
            if (effectElement.enabled && searchAnnotationInList(effectElement.matchName, assetAnnotationMatchNames)) {
                return addAssetProperties(effectElement);
            }
        }
        return null;
    }
    var bm_annotationsManager = {
        getLayers: getLayers,
        activateAnnotations: activateAnnotations,
        getAvailableAnnotation: getAvailableAnnotation,
        findAnnotationEffectByMatchName: findPseudoEffectByMatchName,
        searchTextProperties: searchTextProperties,
        isAnnotation: isAnnotation,
        searchAssetAnnotationInLayer: searchAssetAnnotationInLayer,
    };

    var layerStyleTypes = {
        stroke: 0,
        dropShadow: 1,
        innerShadow: 2,
        outerGlow: 3,
        innerGlow: 4,
        bevelEmboss: 5,
        satin: 6,
        colorOverlay: 7,
        gradientOverlay: 8,
    };

    var layerTypes = {
        precomp: 0,
        solid: 1,
        still: 2,
        nullLayer: 3,
        shape: 4,
        text: 5,
        audio: 6,
        pholderVideo: 7,
        imageSeq: 8,
        video: 9,
        pholderStill: 10,
        guide: 11,
        adjustment: 12,
        camera: 13,
        light: 14,
        data: 15,
    };

    var maskTypes = {
        NONE: 'n',
        ADD: 'a',
        SUBTRACT: 's',
        INTERSECT: 'i',
        LIGHTEN: 'l',
        DARKEN: 'd',
        DIFFERENCE: 'f',
    };

    var shapeTypes = {
        shape: 'sh',
        rect: 'rc',
        ellipse: 'el',
        star: 'sr',
        fill: 'fl',
        gfill: 'gf',
        gStroke: 'gs',
        stroke: 'st',
        merge: 'mm',
        trim: 'tm',
        twist: 'tw',
        group: 'gr',
        repeater: 'rp',
        roundedCorners: 'rd',
        offsetPath: 'op',
        puckerAndBloat: 'pb',
        zigZag: 'zz',
    };

    function createFilePath(compositionUid) {
        var appTemporaryFolder = new Folder(Folder.temp.absoluteURI);
        appTemporaryFolder.changePath('Bodymovin');
        appTemporaryFolder.changePath(compositionUid);
        if (!appTemporaryFolder.exists) {
            if (!appTemporaryFolder.create()) {
                return null;
            }
        }
        var file = new File(appTemporaryFolder.absoluteURI);
        file.changePath('assets.json');
        return file;
    }
    function filterStoringAssets(assets) {
        var i = 0;
        var len = assets.length;
        var storingAssets = [];
        for (i = 0; i < len; i += 1) {
            if (!assets[i].layers) {
                storingAssets.push(assets[i]);
            }
        }
        return storingAssets;
    }
    function storeAssets(assets, compositionUid) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var JSON = $.__bodymovin.JSON;
        var file = createFilePath(compositionUid);
        var storingAssets = filterStoringAssets(assets);
        if (file) {
            file.open('w', 'TEXT', '????');
            file.encoding = 'UTF-8';
            try {
                file.write(JSON.stringify(storingAssets));
            }
            catch (error) {
                var e = error;
                bm_eventDispatcher.log(e.message);
                bm_eventDispatcher.log(e.line);
                bm_eventDispatcher.log(e.fileName);
                bm_eventDispatcher.log($.stack);
            }
        }
        bm_eventDispatcher.log(file.absoluteURI);
    }
    function getAssets(compositionUid) {
        var JSON = $.__bodymovin.JSON;
        var file = createFilePath(compositionUid);
        if (file) {
            try {
                file.open('r');
                var str = file.read();
                var assets = JSON.parse(str);
                if (assets.length) {
                    return assets;
                }
            }
            catch (error) {
            }
        }
        return null;
    }
    var assetsStorage = { createFilePath: createFilePath, storeAssets: storeAssets, getAssets: getAssets };

    var blendModes = {
        normal: 0,
        multiply: 1,
        screen: 2,
        overlay: 3,
        darken: 4,
        lighten: 5,
        colorDodge: 6,
        colorBurn: 7,
        hardLight: 8,
        softLight: 9,
        difference: 10,
        exclusion: 11,
        hue: 12,
        saturation: 13,
        color: 14,
        luminosity: 15,
        add: 16,
        hardMix: 17,
    };
    var BlendingModeShape = {
        DARKEN: 3,
        MULTIPLY: 4,
        COLOR_BURN: 5,
        LIGHTEN: 9,
        SCREEN: 10,
        COLOR_DODGE: 11,
        OVERLAY: 15,
        SOFT_LIGHT: 16,
        HARD_LIGHT: 17,
        HARD_MIX: 21,
        DIFFERENCE: 23,
        EXCLUSION: 24,
        HUE: 26,
        SATURATION: 27,
        COLOR: 28,
        LUMINOSITY: 29,
    };
    function getBlendMode(value) {
        var blendModeValue = blendModes.normal;
        switch (value) {
            case BlendingMode.MULTIPLY:
                blendModeValue = blendModes.multiply;
                break;
            case BlendingMode.SCREEN:
                blendModeValue = blendModes.screen;
                break;
            case BlendingMode.OVERLAY:
                blendModeValue = blendModes.overlay;
                break;
            case BlendingMode.DARKEN:
                blendModeValue = blendModes.darken;
                break;
            case BlendingMode.LIGHTEN:
                blendModeValue = blendModes.lighten;
                break;
            case BlendingMode.CLASSIC_COLOR_DODGE:
            case BlendingMode.COLOR_DODGE:
                blendModeValue = blendModes.colorDodge;
                break;
            case BlendingMode.CLASSIC_COLOR_BURN:
            case BlendingMode.COLOR_BURN:
                blendModeValue = blendModes.colorBurn;
                break;
            case BlendingMode.HARD_LIGHT:
                blendModeValue = blendModes.hardLight;
                break;
            case BlendingMode.SOFT_LIGHT:
                blendModeValue = blendModes.softLight;
                break;
            case BlendingMode.DIFFERENCE:
                blendModeValue = blendModes.difference;
                break;
            case BlendingMode.EXCLUSION:
                blendModeValue = blendModes.exclusion;
                break;
            case BlendingMode.HUE:
                blendModeValue = blendModes.hue;
                break;
            case BlendingMode.SATURATION:
                blendModeValue = blendModes.saturation;
                break;
            case BlendingMode.COLOR:
                blendModeValue = blendModes.color;
                break;
            case BlendingMode.LUMINOSITY:
                blendModeValue = blendModes.luminosity;
                break;
            case BlendingMode.ADD:
                blendModeValue = blendModes.add;
                break;
            case BlendingMode.HARD_MIX:
                blendModeValue = blendModes.hardMix;
                break;
            default:
                blendModeValue = blendModes.normal;
        }
        return blendModeValue;
    }
    function getBlendModeShape(value) {
        var blendModeValue = blendModes.normal;
        switch (value) {
            case BlendingModeShape.MULTIPLY:
                blendModeValue = blendModes.multiply;
                break;
            case BlendingModeShape.SCREEN:
                blendModeValue = blendModes.screen;
                break;
            case BlendingModeShape.OVERLAY:
                blendModeValue = blendModes.overlay;
                break;
            case BlendingModeShape.DARKEN:
                blendModeValue = blendModes.darken;
                break;
            case BlendingModeShape.COLOR_BURN:
                blendModeValue = blendModes.colorBurn;
                break;
            case BlendingModeShape.LIGHTEN:
                blendModeValue = blendModes.lighten;
                break;
            case BlendingModeShape.COLOR_DODGE:
                blendModeValue = blendModes.colorDodge;
                break;
            case BlendingModeShape.SOFT_LIGHT:
                blendModeValue = blendModes.softLight;
                break;
            case BlendingModeShape.HARD_LIGHT:
                blendModeValue = blendModes.hardLight;
                break;
            case BlendingModeShape.DIFFERENCE:
                blendModeValue = blendModes.difference;
                break;
            case BlendingModeShape.EXCLUSION:
                blendModeValue = blendModes.exclusion;
                break;
            case BlendingModeShape.HUE:
                blendModeValue = blendModes.hue;
                break;
            case BlendingModeShape.SATURATION:
                blendModeValue = blendModes.saturation;
                break;
            case BlendingModeShape.COLOR:
                blendModeValue = blendModes.color;
                break;
            case BlendingModeShape.LUMINOSITY:
                blendModeValue = blendModes.luminosity;
                break;
            case BlendingModeShape.HARD_MIX:
                blendModeValue = blendModes.hardMix;
                break;
            default:
                blendModeValue = blendModes.normal;
        }
        return blendModeValue;
    }
    var bm_blendModes = { getBlendMode: getBlendMode, getBlendModeShape: getBlendModeShape };

    function getPoint(p1, p2, p3, p4, t) {
        var a = p1[0], b = p2[0], c = p3[0], d = p4[0];
        var diffT = 1 - t;
        var diffTSq = diffT * diffT;
        var diffTCu = diffTSq * diffT;
        var tSq = t * t;
        var tCu = tSq * t;
        var x = a * diffTCu + b * 3 * diffTSq * t + c * 3 * diffT * tSq + d * tCu;
        a = p1[1];
        b = p2[1];
        c = p3[1];
        d = p4[1];
        var y = a * diffTCu + b * 3 * diffTSq * t + c * 3 * diffT * tSq + d * tCu;
        return [x, y];
    }
    function getTPos(p1, p2, p3, p4, arr) {
        var i;
        for (i = 0; i < 2; i += 1) {
            var c1 = p1[i], c2 = p2[i], c3 = p3[i], c4 = p4[i];
            var a = 3 * (-c1 + 3 * c2 - 3 * c3 + c4);
            var b = 6 * (c1 - 2 * c2 + c3);
            var c = 3 * (c2 - c1);
            var toSquareTerm = b * b - 4 * a * c;
            if (toSquareTerm >= 0) {
                var sqRtToSquareTerm = Math.sqrt(toSquareTerm);
                var t1 = (-b + sqRtToSquareTerm) / (2 * a);
                var t2 = (-b - sqRtToSquareTerm) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    arr.push(getPoint(p1, p2, p3, p4, t1));
                }
                if (t2 >= 0 && t2 <= 1) {
                    arr.push(getPoint(p1, p2, p3, p4, t2));
                }
            }
        }
    }
    function getCurveBox(p1, p2, p3, p4) {
        var bounds = {
            l: 10000000000,
            r: -1e10,
            t: 10000000000,
            b: -1e10,
        };
        var pts = [p1, p4];
        getTPos(p1, p2, p3, p4, pts);
        var minX = bounds.l, minY = bounds.t, maxX = bounds.r, maxY = bounds.b, pt;
        var i, len = pts.length;
        for (i = 0; i < len; i += 1) {
            pt = pts[i];
            if (minX > pt[0]) {
                minX = pt[0];
            }
            if (maxX < pt[0]) {
                maxX = pt[0];
            }
            if (minY > pt[1]) {
                minY = pt[1];
            }
            if (maxY < pt[1]) {
                maxY = pt[1];
            }
        }
        bounds.l = minX;
        bounds.t = minY;
        bounds.r = maxX;
        bounds.b = maxY;
        return bounds;
    }
    function getBoundingBox(shapeData, matrix) {
        var i, len = shapeData.v.length;
        var pt1, pt2, pt3, pt4, curveBox;
        var box = {
            l: 10000000000,
            r: -1e10,
            t: 10000000000,
            b: -1e10,
        };
        for (i = 0; i < len - 1; i += 1) {
            var pt1Tr = matrix.applyToPoint(shapeData.v[i][0], shapeData.v[i][1], 0);
            pt1 = [pt1Tr.x, pt1Tr.y];
            var pt2Tr = matrix.applyToPoint(shapeData.o[i][0] + shapeData.v[i][0], shapeData.o[i][1] + shapeData.v[i][1], 0);
            pt2 = [pt2Tr.x, pt2Tr.y];
            var pt3Tr = matrix.applyToPoint(shapeData.i[i + 1][0] + shapeData.v[i + 1][0], shapeData.i[i + 1][1] + shapeData.v[i + 1][1], 0);
            pt3 = [pt3Tr.x, pt3Tr.y];
            var pt4Tr = matrix.applyToPoint(shapeData.v[i + 1][0], shapeData.v[i + 1][1], 0);
            pt4 = [pt4Tr.x, pt4Tr.y];
            curveBox = getCurveBox(pt1, pt2, pt3, pt4);
            box.l = Math.min(box.l, curveBox.l);
            box.r = Math.max(box.r, curveBox.r);
            box.t = Math.min(box.t, curveBox.t);
            box.b = Math.max(box.b, curveBox.b);
        }
        pt1 = shapeData.v[i];
        pt2 = [shapeData.o[i][0] + shapeData.v[i][0], shapeData.o[i][1] + shapeData.v[i][1]];
        pt3 = [shapeData.i[0][0] + shapeData.v[0][0], shapeData.i[0][1] + shapeData.v[0][1]];
        pt4 = shapeData.v[0];
        curveBox = getCurveBox(pt1, pt2, pt3, pt4);
        box.l = Math.min(box.l, curveBox.l);
        box.r = Math.max(box.r, curveBox.r);
        box.t = Math.min(box.t, curveBox.t);
        box.b = Math.max(box.b, curveBox.b);
        return box;
    }
    function isBoxInContainer(box, container) {
        return container.l <= box.l && container.r >= box.r && container.t <= box.t && container.b >= box.b;
    }
    var bm_boundingBox = { getBoundingBox: getBoundingBox, isBoxInContainer: isBoxInContainer };

    var temporaryFolder;
    var renderFiles = [];
    var _isLocked = false;
    function createTemporaryFolder() {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        var folder_random_name = bm_generalUtils.random(10);
        temporaryFolder = new Folder(Folder.temp.absoluteURI);
        temporaryFolder.changePath('Bodymovin/' + folder_random_name);
        if (!temporaryFolder.exists) {
            if (!temporaryFolder.create()) {
                bm_eventDispatcher.sendEvent('alert', 'folder failed to be created at: ' + temporaryFolder.fsName);
                return false;
            }
        }
        renderFiles = [];
        return true;
    }
    function getTemporaryFolder() {
        return temporaryFolder;
    }
    function addFile(fileName, path, content, type) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var renderFileData = createFile(fileName, path, type);
        var dataFile = renderFileData.file;
        dataFile.open('w', 'TEXT', '????');
        dataFile.encoding = 'UTF-8';
        try {
            dataFile.write(content);
            dataFile.close();
        }
        catch (err) {
            bm_eventDispatcher.sendEvent('bm:alert', { message: 'Could not write file.<br /> Make sure you have enabled scripts to write files. <br /> Edit > Preferences > General > Allow Scripts to Write Files and Access Network ' });
        }
        return renderFileData;
    }
    function createFile(fileName, path, type) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        type = type || 'regular';
        var i = 0, len = path.length;
        var fileFolder = new Folder(temporaryFolder.absoluteURI);
        while (i < len) {
            fileFolder.changePath(path[i]);
            if (!fileFolder.exists) {
                fileFolder.create();
            }
            i += 1;
        }
        var file = new File(fileFolder.absoluteURI);
        file.changePath(decodeURIComponent(fileName));
        var renderFile = {
            name: fileName,
            path: path,
            id: bm_generalUtils.random(10),
            file: file,
            type: type,
        };
        renderFiles.push(renderFile);
        return renderFile;
    }
    function isRenderFileOnPath(file, path) {
        var filePath = file.path;
        for (var i = 0; i < path.length; i += 1) {
            if (filePath[i] !== path[i]) {
                return false;
            }
        }
        return true;
    }
    function getFilesOnPath(path) {
        var files = [];
        var i, len = renderFiles.length;
        for (i = 0; i < len; i += 1) {
            if (isRenderFileOnPath(renderFiles[i], path)) {
                files.push(renderFiles[i]);
            }
        }
        return files;
    }
    function getFileById(id) {
        var i, len = renderFiles.length, renderFile;
        for (i = 0; i < len; i += 1) {
            renderFile = renderFiles[i];
            if (renderFile.id === id) {
                return renderFile;
            }
        }
    }
    function getIndexById(id) {
        var i, len = renderFiles.length, renderFile;
        for (i = 0; i < len; i += 1) {
            renderFile = renderFiles[i];
            if (renderFile.id === id) {
                return i;
            }
        }
    }
    function replaceFileExtension(id, extension) {
        var renderFileData = getFileById(id);
        renderFileData.name = renderFileData.name.substr(0, renderFileData.name.lastIndexOf('.') + 1);
        renderFileData.name += extension;
        var file = renderFileData.file;
        file.changePath(file.parent.fsName);
        file.changePath(renderFileData.name);
    }
    function removeFile(id) {
        var renderFileIndex = getIndexById(id);
        var renderFileData = getFileById(id);
        var file = renderFileData.file;
        file.remove();
        renderFiles.splice(renderFileIndex, 1);
    }
    function removeFolderContent(folder) {
        var folderFiles = folder.getFiles();
        var fileOrFolder;
        for (var i = 0; i < folderFiles.length; i += 1) {
            fileOrFolder = folderFiles[i];
            if (fileOrFolder.constructor === Folder) {
                removeFolderContent(fileOrFolder);
            }
            else {
                fileOrFolder.remove();
            }
        }
        folder.remove();
    }
    function removeOldTemporaryFolder() {
        if (_isLocked) {
            return;
        }
        _isLocked = true;
        var currentDate = new Date();
        var appTemporaryFolder = new Folder(Folder.temp.absoluteURI);
        appTemporaryFolder.changePath('Bodymovin');
        var appFolderFiles = appTemporaryFolder.getFiles();
        var temporaryRemovableFolder;
        for (var i = 0; i < appFolderFiles.length; i += 1) {
            temporaryRemovableFolder = appFolderFiles[i];
            if (temporaryRemovableFolder.getFiles) {
                var createdDate = temporaryRemovableFolder.created;
                var elapsedTime = (currentDate.getTime() - createdDate.getTime()) / 1000;
                if (elapsedTime > 60 * 60 * 24) {
                    removeFolderContent(temporaryRemovableFolder);
                }
            }
        }
        _isLocked = false;
    }
    var bm_fileManager = {
        createTemporaryFolder: createTemporaryFolder,
        getTemporaryFolder: getTemporaryFolder,
        addFile: addFile,
        createFile: createFile,
        getFilesOnPath: getFilesOnPath,
        getFileById: getFileById,
        replaceFileExtension: replaceFileExtension,
        removeFile: removeFile,
        removeOldTemporaryFolder: removeOldTemporaryFolder,
    };

    function avLayerType(lObj) {
        var layerTypes = $.__bodymovin.layerTypes;
        var lSource = lObj.source;
        if (lSource instanceof CompItem) {
            return layerTypes.precomp;
        }
        var lMainSource = lSource.mainSource;
        if (!lObj.hasVideo) {
            if (lObj.hasAudio) {
                return layerTypes.audio;
            }
            else {
                return layerTypes.data;
            }
        }
        else if (lSource instanceof CompItem) {
            return layerTypes.precomp;
        }
        else if (lSource.frameDuration < 1) {
            if (lMainSource instanceof PlaceholderSource) {
                return layerTypes.pholderVideo;
            }
            else if (lSource.name.toString().indexOf("].") !== -1) {
                return layerTypes.imageSeq;
            }
            else {
                if (lMainSource.isStill) {
                    return layerTypes.still;
                }
                else {
                    return layerTypes.video;
                }
            }
        }
        else if (lSource.frameDuration === 1) {
            if (lMainSource instanceof PlaceholderSource) {
                return layerTypes.pholderStill;
            }
            else if (lMainSource.color) {
                return layerTypes.solid;
            }
            else {
                return layerTypes.still;
            }
        }
    }
    function getLayerType(layerOb) {
        var layerTypes = $.__bodymovin.layerTypes;
        try {
            var curLayer = void 0, instanceOfArray = void 0, instanceOfArrayLength = void 0, result = void 0;
            curLayer = layerOb;
            instanceOfArray = [AVLayer, CameraLayer, LightLayer, ShapeLayer, TextLayer];
            instanceOfArrayLength = instanceOfArray.length;
            if (curLayer.adjustmentLayer) {
                return layerTypes.adjustment;
            }
            else if (curLayer.nullLayer) {
                return layerTypes.nullLayer;
            }
            var i = void 0;
            for (i = 0; i < instanceOfArrayLength; i++) {
                if (curLayer instanceof instanceOfArray[i]) {
                    result = instanceOfArray[i].name;
                    break;
                }
            }
            if (result === "AVLayer") {
                result = avLayerType(curLayer);
            }
            else if (result === "CameraLayer") {
                result = layerTypes.camera;
            }
            else if (result === "LightLayer") {
                result = layerTypes.light;
            }
            else if (result === "ShapeLayer") {
                result = layerTypes.shape;
            }
            else if (result === "TextLayer") {
                result = layerTypes.text;
            }
            return result;
        }
        catch (err) {
            var e = err;
            alert(e.line.toString + " " + e.toString());
        }
    }

    function getLayerStyleType(name) {
        var layerStyleTypes = $.__bodymovin.layerStyleTypes;
        switch (name) {
            case 'frameFX/enabled':
                return layerStyleTypes.stroke;
            case 'dropShadow/enabled':
                return layerStyleTypes.dropShadow;
            case 'innerShadow/enabled':
                return layerStyleTypes.innerShadow;
            case 'outerGlow/enabled':
                return layerStyleTypes.outerGlow;
            case 'innerGlow/enabled':
                return layerStyleTypes.innerGlow;
            case 'bevelEmboss/enabled':
                return layerStyleTypes.bevelEmboss;
            case 'chromeFX/enabled':
                return layerStyleTypes.satin;
            case 'solidFill/enabled':
                return layerStyleTypes.colorOverlay;
            case 'gradientFill/enabled':
                return layerStyleTypes.gradientOverlay;
            default:
                return '';
        }
    }

    function getMaskType(mode) {
        var maskTypes = $.__bodymovin.maskTypes;
        switch (mode) {
            case MaskMode.NONE:
                return maskTypes.NONE;
            case MaskMode.ADD:
                return maskTypes.ADD;
            case MaskMode.SUBTRACT:
                return maskTypes.SUBTRACT;
            case MaskMode.INTERSECT:
                return maskTypes.INTERSECT;
            case MaskMode.LIGHTEN:
                return maskTypes.LIGHTEN;
            case MaskMode.DARKEN:
                return maskTypes.DARKEN;
            case MaskMode.DIFFERENCE:
                return maskTypes.DIFFERENCE;
            default:
                return undefined;
        }
    }

    function applyPreset(layer, matchName, pseudoEffectData) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_downloadManager = $.__bodymovin.bm_downloadManager;
        var myComp = app.project.activeItem;
        if (!myComp || !(myComp instanceof CompItem)) {
            myComp = app.project.items.addComp("My Comp", 1920, 1080, 1, 10, 24);
            myComp.openInViewer();
        }
        var myLayer = layer;
        if (!myLayer)
            myLayer = myComp.layers.addSolid([0, 0, 0], "My Layer", myComp.width, myComp.height, 1);
        var effectsProp = myLayer.property("ADBE Effect Parade");
        if (effectsProp.canAddProperty(pseudoEffectData.matchName)) {
            effectsProp.addProperty(pseudoEffectData.matchName);
        }
        else {
            applyPseudoEffect(pseudoEffectData, effectsProp);
        }
        function applyPseudoEffect(myPseudoEffect, effectsProp) {
            var animationPreset = createResourceFile(myPseudoEffect);
            if (animationPreset) {
                var masterLayer = effectsProp.parentProperty;
                var curentComp = masterLayer.containingComp;
                var tempSolid = curentComp.layers.addSolid([0, 0, 0], "Temp Solid", 10, 10, 1);
                var tempSolidSource = tempSolid.source;
                var tempSolidFolder = tempSolidSource.parentFolder;
                tempSolid.applyPreset(File(animationPreset.fsName));
                myPseudoEffect.matchName = tempSolid.property("ADBE Effect Parade").property(1).matchName;
                masterLayer.selected = true;
                try {
                    effectsProp.addProperty(myPseudoEffect.matchName);
                }
                catch (err) {
                    var e = err;
                    bm_eventDispatcher.log(e.message);
                }
                tempSolidSource.remove();
                if (tempSolidFolder.numItems === 0)
                    tempSolidFolder.remove();
            }
        }
        function createResourceFile(myPseudoEffect) {
            try {
                var extensionFolder = bm_downloadManager.getExtensionFolder();
                var myFile = new File(extensionFolder.absoluteURI + myPseudoEffect.path);
                if (myFile.exists) {
                    return myFile;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                var e = err;
                alert("Error in createResourceFile function\n" + e.toString());
            }
        }
    }
    var presetHelper = { applyPreset: applyPreset };

    var _renderRange = [];
    function pushRenderRange(range) {
        _renderRange.push(range);
    }
    function popRenderRange() {
        return _renderRange.pop();
    }
    function getCurrentRange() {
        return _renderRange[_renderRange.length - 1];
    }
    function resetRenderRange() {
        return (_renderRange = []);
    }
    var bm_renderHelper = {
        pushRenderRange: pushRenderRange,
        popRenderRange: popRenderRange,
        getCurrentRange: getCurrentRange,
        resetRenderRange: resetRenderRange,
    };

    var playSound, autoSave, canEditPrefs;
    var storedRenderQueue = [];
    function backupRenderQueue() {
        try {
            playSound = app.preferences.getPrefAsLong("Misc Section", "Play sound when render finishes", PREFType.PREF_Type_MACHINE_INDEPENDENT);
            autoSave = app.preferences.getPrefAsLong("Auto Save", "Enable Auto Save RQ2", PREFType.PREF_Type_MACHINE_INDEPENDENT);
            app.preferences.savePrefAsLong("Misc Section", "Play sound when render finishes", 0, PREFType.PREF_Type_MACHINE_INDEPENDENT);
            app.preferences.savePrefAsLong("Auto Save", "Enable Auto Save RQ2", 0, PREFType.PREF_Type_MACHINE_INDEPENDENT);
        }
        catch (err) {
            canEditPrefs = false;
        }
        storedRenderQueue = [];
        for (var i = 1; i <= app.project.renderQueue.numItems; i++) {
            var item = app.project.renderQueue.item(i);
            if (item.status === RQItemStatus.QUEUED) {
                storedRenderQueue.push(i);
                item.render = false;
            }
        }
    }
    function restoreRenderQueue() {
        for (var i = 0; i < storedRenderQueue.length; i++) {
            try {
                app.project.renderQueue.item(storedRenderQueue[i]).render = true;
            }
            catch (error) { }
        }
        if (canEditPrefs) {
            app.preferences.savePrefAsLong("Misc Section", "Play sound when render finishes", playSound, PREFType.PREF_Type_MACHINE_INDEPENDENT);
            app.preferences.savePrefAsLong("Auto Save", "Enable Auto Save RQ2", autoSave, PREFType.PREF_Type_MACHINE_INDEPENDENT);
        }
    }
    function renderQueueIsBusy() {
        for (var i = 1; i <= app.project.renderQueue.numItems; i++) {
            if (app.project.renderQueue.item(i).status == RQItemStatus.RENDERING) {
                return true;
            }
        }
        return false;
    }
    var bm_renderQueueHelper = {
        backupRenderQueue: backupRenderQueue,
        restoreRenderQueue: restoreRenderQueue,
        renderQueueIsBusy: renderQueueIsBusy,
    };

    var _settings;
    function set$1(data) {
        _settings = data;
    }
    function get$2() {
        return _settings;
    }
    function shouldCompressImages() {
        return _settings.should_compress && !_settings.original_assets;
    }
    function getCompressionQuality() {
        return _settings.compression_rate;
    }
    function shouldEncodeImages() {
        return _settings.should_encode_images;
    }
    function shouldSkipImages() {
        return _settings.should_skip_images && !_settings.should_encode_images;
    }
    function shouldReuseImages() {
        return _settings.should_reuse_images;
    }
    function shouldIgnoreExpressionProperties() {
        return _settings.ignore_expression_properties;
    }
    function shouldExportOldFormat() {
        return _settings.export_old_format;
    }
    function shouldUseSourceNames() {
        return _settings.use_source_names;
    }
    function shouldSkipDefaultProperties() {
        return _settings.skip_default_properties;
    }
    function shouldIncludeNotSupportedProperties() {
        return _settings.not_supported_properties;
    }
    function shouldIncludeReport() {
        return _settings.export_modes.reports;
    }
    function shouldIncludeHiddenLayers() {
        return _settings.hiddens;
    }
    function shouldIncludeGuidedLayers() {
        return _settings.guideds;
    }
    function shouldBakeExpressions() {
        return _settings.expressions.shouldBake;
    }
    function shouldBakeBeyondWorkArea() {
        return _settings.expressions.shouldBakeBeyondWorkArea;
    }
    function shouldBundleFonts() {
        return !_settings.glyphs && _settings.bundleFonts;
    }
    function shouldInlineFonts() {
        return shouldBundleFonts() && _settings.inlineFonts;
    }
    function shouldPrettyPrint() {
        return _settings.pretty_print;
    }
    function shouldRenderAudio() {
        return _settings.audio.isEnabled;
    }
    function getAudioBitRateTemplate() {
        return _settings.audio.bitrate;
    }
    function shouldTrimData() {
        return _settings.shouldTrimData;
    }
    function shouldRasterizeWaveform() {
        return _settings.audio.shouldRaterizeWaveform;
    }
    function shouldUserOriginalNames() {
        return _settings.original_names;
    }
    function shouldReplaceCharactersWithComps() {
        return _settings.includeExtraChars;
    }
    function shouldUseCompNamesAsIds() {
        return _settings.useCompNamesAsIds;
    }
    function shouldCopyOriginalAsset() {
        return _settings.original_assets;
    }
    function shouldExportEssentialProperties() {
        return _settings.essentialProperties.active;
    }
    function shouldExportEssentialPropertiesAsSlots() {
        return _settings.essentialProperties.useSlots;
    }
    function shouldSkipExternalComposition() {
        return shouldExportEssentialProperties() && _settings.essentialProperties.skipExternalComp;
    }
    var bm_settingsHelper = {
        set: set$1,
        get: get$2,
        shouldCompressImages: shouldCompressImages,
        getCompressionQuality: getCompressionQuality,
        shouldEncodeImages: shouldEncodeImages,
        shouldSkipImages: shouldSkipImages,
        shouldReuseImages: shouldReuseImages,
        shouldIgnoreExpressionProperties: shouldIgnoreExpressionProperties,
        shouldExportOldFormat: shouldExportOldFormat,
        shouldUseSourceNames: shouldUseSourceNames,
        shouldSkipDefaultProperties: shouldSkipDefaultProperties,
        shouldIncludeNotSupportedProperties: shouldIncludeNotSupportedProperties,
        shouldIncludeReport: shouldIncludeReport,
        shouldIncludeHiddenLayers: shouldIncludeHiddenLayers,
        shouldIncludeGuidedLayers: shouldIncludeGuidedLayers,
        shouldBakeExpressions: shouldBakeExpressions,
        shouldBakeBeyondWorkArea: shouldBakeBeyondWorkArea,
        shouldBundleFonts: shouldBundleFonts,
        shouldInlineFonts: shouldInlineFonts,
        shouldPrettyPrint: shouldPrettyPrint,
        shouldRenderAudio: shouldRenderAudio,
        getAudioBitRateTemplate: getAudioBitRateTemplate,
        shouldTrimData: shouldTrimData,
        shouldRasterizeWaveform: shouldRasterizeWaveform,
        shouldUserOriginalNames: shouldUserOriginalNames,
        shouldReplaceCharactersWithComps: shouldReplaceCharactersWithComps,
        shouldUseCompNamesAsIds: shouldUseCompNamesAsIds,
        shouldCopyOriginalAsset: shouldCopyOriginalAsset,
        shouldExportEssentialProperties: shouldExportEssentialProperties,
        shouldExportEssentialPropertiesAsSlots: shouldExportEssentialPropertiesAsSlots,
        shouldSkipExternalComposition: shouldSkipExternalComposition,
    };

    function getShapeType(matchName) {
        var shapeItemTypes = $.__bodymovin.shapeTypes;
        switch (matchName) {
            case 'ADBE Vector Shape - Group':
                return shapeItemTypes.shape;
            case 'ADBE Vector Shape - Star':
                return shapeItemTypes.star;
            case 'ADBE Vector Shape - Rect':
                return shapeItemTypes.rect;
            case 'ADBE Vector Shape - Ellipse':
                return shapeItemTypes.ellipse;
            case 'ADBE Vector Graphic - Fill':
                return shapeItemTypes.fill;
            case 'ADBE Vector Graphic - Stroke':
                return shapeItemTypes.stroke;
            case 'ADBE Vector Graphic - Merge':
            case 'ADBE Vector Filter - Merge':
                return shapeItemTypes.merge;
            case 'ADBE Vector Graphic - Trim':
            case 'ADBE Vector Filter - Trim':
                return shapeItemTypes.trim;
            case 'ADBE Vector Graphic - Twist':
            case 'ADBE Vector Filter - Twist':
                return shapeItemTypes.twist;
            case 'ADBE Vector Filter - RC':
                return shapeItemTypes.roundedCorners;
            case 'ADBE Vector Group':
                return shapeItemTypes.group;
            case 'ADBE Vector Graphic - G-Fill':
                return shapeItemTypes.gfill;
            case 'ADBE Vector Graphic - G-Stroke':
                return shapeItemTypes.gStroke;
            case 'ADBE Vector Filter - Repeater':
                return shapeItemTypes.repeater;
            case 'ADBE Vector Filter - Offset':
                return shapeItemTypes.offsetPath;
            case 'ADBE Vector Filter - PB':
                return shapeItemTypes.puckerAndBloat;
            case 'ADBE Vector Filter - Zigzag':
                return shapeItemTypes.zigZag;
            default:
                return '';
        }
    }

    var version_number = '4.8.0';
    function set(data) {
    }
    function get$1() {
        return version_number;
    }
    var bm_versionHelper = { set: set, get: get$1 };

    var completeCallback;
    var compCount = 0;
    function prepareLayer(layerInfo, shouldIncludeAVAssets) {
        var layerTypes = $.__bodymovin.layerTypes;
        var getLayerType = $.__bodymovin.getLayerType;
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var layerData = {};
        var layerType = getLayerType(layerInfo);
        if (layerType === layerTypes.light
            || layerType === layerTypes.pholderStill
            || layerType === layerTypes.pholderVideo
            || (layerType === layerTypes.audio && !settingsHelper.shouldRenderAudio())) {
            layerData.isValid = false;
            layerData.render = false;
        }
        if (layerInfo.guideLayer) {
            layerData.isGuide = true;
            layerData.render = false;
        }
        if (layerInfo.enabled === false && layerType !== layerTypes.data) {
            layerData.enabled = false;
            layerData.render = false;
        }
        if (layerInfo.threeDLayer) {
            layerData.ddd = 1;
        }
        else {
            layerData.ddd = 0;
        }
        layerData.ind = layerInfo.index;
        layerData.ty = layerType === layerTypes.adjustment ? layerTypes.nullLayer : layerType;
        layerData.isAdjustment = layerType === layerTypes.adjustment;
        layerData.nm = layerInfo.name;
        var layerAttributes = bm_generalUtils.findAttributes(layerInfo.name);
        if (layerAttributes.ln) {
            layerData.ln = layerAttributes.ln;
        }
        if (layerAttributes.cl) {
            layerData.cl = layerAttributes.cl;
        }
        if (layerAttributes.tg) {
            layerData.tg = layerAttributes.tg;
        }
        if (layerInfo.parent !== null) {
            layerData.parent = layerInfo.parent.index;
        }
        if (layerInfo.hasTrackMatte) {
            switch (layerInfo.trackMatteType) {
                case TrackMatteType.ALPHA:
                    layerData.tt = 1;
                    break;
                case TrackMatteType.ALPHA_INVERTED:
                    layerData.tt = 2;
                    break;
                case TrackMatteType.LUMA:
                    layerData.tt = 3;
                    break;
                case TrackMatteType.LUMA_INVERTED:
                    layerData.tt = 4;
                    break;
            }
            if ('trackMatteLayer' in layerInfo) {
                layerData.tp = layerInfo.trackMatteLayer.index;
            }
            else {
                layerData.tp = layerInfo.index - 1;
            }
        }
        else if (layerInfo.isTrackMatte) {
            if (layerInfo.isValid !== false) {
                layerData.render = true;
                layerData.td = 1;
            }
        }
        return layerData;
    }
    function checkLayerSource(layerInfo, layerData) {
        var layerTypes = $.__bodymovin.layerTypes;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if (layerData.render === false) {
            return;
        }
        var bm_sourceHelper = $.__bodymovin.bm_sourceHelper;
        var bm_dataSourceHelper = $.__bodymovin.bm_dataSourceHelper;
        var layerType = layerData.ty;
        var sourceId;
        if (layerType === layerTypes.precomp) {
            sourceId = bm_sourceHelper.checkCompSource(layerInfo);
            if (sourceId !== false) {
                layerData.refId = sourceId;
            }
            else {
                if (settingsHelper.shouldUseCompNamesAsIds()) {
                    layerData.compId = layerInfo.source.name;
                }
                else {
                    layerData.compId = 'comp_' + compCount;
                }
                layerData.compName = layerInfo.source.name;
                layerData.frameRate = layerInfo.source.frameRate;
                layerData.preserveNestedFrameRate = layerInfo.source.preserveNestedFrameRate ? 1 : undefined;
                compCount += 1;
                layerData.refId = layerData.compId;
                bm_sourceHelper.setCompSourceId(layerInfo.source, layerData.compId);
            }
        }
        else if (layerType === layerTypes.still) {
            layerData.refId = bm_sourceHelper.checkImageSource(layerInfo);
        }
        else if (layerType === layerTypes.imageSeq) {
            sourceId = bm_sourceHelper.searchSequenceSource(layerInfo);
            layerData.refId = sourceId;
            if (!sourceId) {
                sourceId = bm_sourceHelper.addSequenceSource(layerInfo);
                layerData.refId = sourceId;
                layerData.compId = sourceId;
            }
        }
        else if (layerType === layerTypes.video) {
            layerData.refId = bm_sourceHelper.checkVideoSource(layerInfo);
        }
        else if (layerType === layerTypes.audio) {
            layerData.refId = bm_sourceHelper.checkAudioSource(layerInfo);
        }
        else if (layerType === layerTypes.data) {
            layerData.refId = bm_dataSourceHelper.checkDataSource(layerInfo);
        }
    }
    function renderLayer(layerOb, includeHiddenData, callback) {
        var layerTypes = $.__bodymovin.layerTypes;
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        var bm_transformHelper = $.__bodymovin.bm_transformHelper;
        var bm_maskHelper = $.__bodymovin.bm_maskHelper;
        var bm_timeremapHelper = $.__bodymovin.bm_timeremapHelper;
        var bm_effectsHelper = $.__bodymovin.bm_effectsHelper;
        var bm_layerStylesHelper = $.__bodymovin.bm_layerStylesHelper;
        var bm_cameraHelper = $.__bodymovin.bm_cameraHelper;
        var bm_textHelper = $.__bodymovin.bm_textHelper;
        var bm_imageSeqHelper = $.__bodymovin.bm_imageSeqHelper;
        var bm_blendModes = $.__bodymovin.bm_blendModes;
        var bm_audioHelper = $.__bodymovin.bm_audioHelper;
        var bm_dataHelper = $.__bodymovin.bm_dataHelper;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var layerInfo = layerOb.layer;
        var layerData = layerOb.data;
        var frameRate = layerOb.framerate;
        completeCallback = callback;
        if (layerData.render === false) {
            completeCallback();
            return;
        }
        layerData.sr = layerInfo.stretch / 100;
        var lType = layerData.ty;
        if (lType !== layerTypes.camera && lType !== layerTypes.audio && lType !== layerTypes.data) {
            bm_transformHelper.exportTransform(layerInfo, layerData, frameRate);
            bm_maskHelper.exportMasks(layerInfo, layerData, frameRate);
            bm_effectsHelper.exportEffects(layerInfo, layerData, frameRate, includeHiddenData);
            bm_layerStylesHelper.exportStyles(layerInfo, layerData, frameRate);
            bm_timeremapHelper.exportTimeremap(layerInfo, layerData, frameRate);
        }
        if (lType === layerTypes.shape) {
            var extraParams = { is_rubberhose_autoflop: false };
            if (layerInfo.name.indexOf('::AutoFlop') !== -1) {
                extraParams.is_rubberhose_autoflop = true;
            }
            $.__bodymovin.bm_shapeHelper.exportShape(layerInfo, layerData, frameRate, false, extraParams, includeHiddenData);
        }
        else if (lType === layerTypes.solid) {
            layerData.sw = layerInfo.source.width;
            layerData.sh = layerInfo.source.height;
            layerData.sc = bm_generalUtils.arrayRgbToHex(layerInfo.source.mainSource.color);
        }
        else if (lType === layerTypes.text) {
            bm_textHelper.exportText(layerInfo, layerData, frameRate);
        }
        else if (lType === layerTypes.precomp) {
            layerData.w = layerInfo.width;
            layerData.h = layerInfo.height;
        }
        else if (lType === layerTypes.imageSeq) {
            bm_imageSeqHelper.exportStills(layerInfo, layerData, frameRate);
        }
        else if (lType === layerTypes.camera) {
            bm_cameraHelper.exportCamera(layerInfo, layerData, frameRate);
        }
        else if (lType === layerTypes.audio) {
            bm_audioHelper.exportAudio(layerInfo, layerData, frameRate);
        }
        else if (lType === layerTypes.data) {
            bm_dataHelper.exportData(layerInfo, layerData, frameRate);
        }
        layerData.ip = layerInfo.inPoint * frameRate;
        layerData.op = layerInfo.outPoint * frameRate;
        layerData.st = layerInfo.startTime * frameRate;
        layerData.ct = layerInfo.collapseTransformation ? 1 : undefined;
        if (lType === layerTypes.audio) {
            layerData.st = layerData.ip;
        }
        if (settingsHelper.shouldIncludeNotSupportedProperties()) {
            layerData.cp = layerInfo.collapseTransformation;
            if (layerInfo.motionBlur) {
                layerData.mb = true;
            }
        }
        layerData.bm = bm_blendModes.getBlendMode(layerInfo.blendingMode);
        completeCallback();
    }
    function reset$a() {
        compCount = 0;
    }
    var bm_layerElement = {
        prepareLayer: prepareLayer,
        checkLayerSource: checkLayerSource,
        renderLayer: renderLayer,
        reset: reset$a,
    };

    var mainFolder;
    var elements = {};
    var frameRate$1 = 0;
    function getElementById(id) {
        if (elements[id]) {
            return elements[id].element;
        }
        return null;
    }
    function addElement(id, element) {
        elements[id] = {
            element: element,
        };
    }
    function createFolder$1(name) {
        name = name || 'Imported_Lottie_Animation';
        mainFolder = app.project.items.addFolder(name);
    }
    function createComp$1(name, width, height, duration, id) {
        name = name || 'Lottie_Main_Comp';
        var comp = app.project.items.addComp(name, width, height, 1, duration / frameRate$1, frameRate$1);
        addElement(id, comp);
        comp.parentFolder = mainFolder;
    }
    function setCompWorkArea$1(inPoint, outPoint, id) {
        var destComp = getElementById(id);
        destComp.workAreaStart = inPoint;
        destComp.workAreaDuration = Math.max(0.1, outPoint - inPoint);
    }
    function createNull$1(duration, elementId, parentCompId) {
        var comp = getElementById(parentCompId);
        var element = comp.layers.addNull(duration / frameRate$1);
        addElement(elementId, element);
    }
    function createSolid$1(color, name, width, height, duration, elementId, parentCompId) {
        var comp = getElementById(parentCompId);
        var element = comp.layers.addSolid(color, name, width, height, 1, duration / frameRate$1);
        addElement(elementId, element);
    }
    function createShapeLayer$1(elementId, parentCompId) {
        var comp = getElementById(parentCompId);
        var element = comp.layers.addShape();
        addElement(elementId, element);
    }
    function createTextLayer$1(elementId, parentCompId) {
        var comp = getElementById(parentCompId);
        var element = comp.layers.addText('');
        addElement(elementId, element);
    }
    function addComposition(compSourceId, parentCompId, elementId) {
        var comp = getElementById(compSourceId);
        var parentComp = getElementById(parentCompId);
        var compLayer = parentComp.layers.add(comp);
        addElement(elementId, compLayer);
    }
    function addImageLayer(imageSourceId, parentCompId, elementId) {
        var image = getElementById(imageSourceId);
        var parentComp = getElementById(parentCompId);
        var imageLayer = parentComp.layers.add(image);
        addElement(elementId, imageLayer);
    }
    function setFrameRate$1(value) {
        frameRate$1 = value;
    }
    function setElementTemporalKeyAtIndex(propertyName, index, inInfluences, inSpeeds, outInfluences, outSpeeds, elementId) {
        var element = getElementById(elementId);
        var property = element.property(propertyName);
        var inEases = [];
        var outEases = [];
        for (var i = 0; i < inInfluences.length; i += 1) {
            var easeIn = new KeyframeEase(inSpeeds[i], inInfluences[i]);
            inEases.push(easeIn);
            var easeOut = new KeyframeEase(outSpeeds[i], outInfluences[i]);
            outEases.push(easeOut);
        }
        property.setTemporalEaseAtKey(index, inEases, outEases);
    }
    var keyInterpolatioTypes = {
        1: KeyframeInterpolationType.LINEAR,
        2: KeyframeInterpolationType.BEZIER,
        3: KeyframeInterpolationType.HOLD,
    };
    function getKeyInterpolationType(type) {
        return keyInterpolatioTypes[type] || keyInterpolatioTypes[1];
    }
    function setInterpolationTypeAtKey(propertyName, index, elementId, type) {
        var element = getElementById(elementId);
        var property = element.property(propertyName);
        property.setInterpolationTypeAtKey(index, getKeyInterpolationType(2), getKeyInterpolationType(type));
    }
    function separateDimensions(elementId) {
        var element = getElementById(elementId);
        var property = element.property('Position');
        property.dimensionsSeparated = true;
    }
    function setSpatialTangentsAtKey(propertyName, index, inTangents, outTangents, elementId) {
        var element = getElementById(elementId);
        var property = element.property(propertyName);
        property.setSpatialTangentsAtKey(index, inTangents, outTangents);
    }
    function formatValue(propertyName, value) {
        if (typeof value === 'object' && value.i) {
            var sVerts = value.v;
            var sITans = value.i;
            var sOTans = value.o;
            var sShape = new Shape();
            sShape.vertices = sVerts;
            sShape.inTangents = sITans;
            sShape.outTangents = sOTans;
            sShape.closed = value.c;
            return sShape;
        }
        else {
            return value;
        }
    }
    function setElementPropertyValue(propertyName, value, elementId) {
        var element = getElementById(elementId);
        if (propertyName === 'name') {
            element[propertyName] = decodeURIComponent(value);
        }
        else {
            element[propertyName].setValue(formatValue(propertyName, value));
        }
    }
    function setElementPropertyExpression(propertyName, value, elementId) {
        var element = getElementById(elementId);
        element[propertyName].expression = decodeURIComponent(value);
    }
    function setElementKey(propertyName, time, value, elementId) {
        var element = getElementById(elementId);
        if (propertyName === 'Colors') {
            element[propertyName].addKey(time / frameRate$1);
        }
        else {
            element[propertyName].setValueAtTime(time / frameRate$1, formatValue(propertyName, value));
        }
    }
    function setLayerParent(layerId, parentLayerId) {
        var layer = getElementById(layerId);
        var parent = getElementById(parentLayerId);
        layer.setParentWithJump(parent);
    }
    function setLayerStartTime(layerId, time) {
        var layer = getElementById(layerId);
        layer.startTime = time / frameRate$1;
    }
    function setLayerInPoint(layerId, time) {
        var layer = getElementById(layerId);
        layer.inPoint = time / frameRate$1;
    }
    function setLayerName(layerId, name) {
        var layer = getElementById(layerId);
        layer.name = decodeURIComponent(name);
    }
    function setElementAsDisabled(elementId, name) {
        var element = getElementById(elementId);
        element.enabled = false;
    }
    function setLayerOutPoint(layerId, time) {
        var layer = getElementById(layerId);
        layer.outPoint = time / frameRate$1;
    }
    function setLayerStretch(layerId, stretch) {
        var layer = getElementById(layerId);
        layer.stretch = stretch;
    }
    function createShapeGroup(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Group");
        addElement(elementId, elementProperty);
    }
    function createRectangle(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Shape - Rect");
        addElement(elementId, elementProperty);
    }
    function createEllipse(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Shape - Ellipse");
        addElement(elementId, elementProperty);
    }
    function createStar(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Shape - Star");
        addElement(elementId, elementProperty);
    }
    function createFill(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Graphic - Fill");
        addElement(elementId, elementProperty);
    }
    function createGradientFill(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Graphic - G-Fill");
        addElement(elementId, elementProperty);
    }
    function createGradientStroke(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Graphic - G-Stroke");
        addElement(elementId, elementProperty);
    }
    function createStroke(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Graphic - Stroke");
        addElement(elementId, elementProperty);
    }
    function createRepeater(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Filter - Repeater");
        addElement(elementId, elementProperty);
    }
    function createRoundedCorners(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Filter - RC");
        addElement(elementId, elementProperty);
    }
    function createTrimPath(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Filter - Trim");
        addElement(elementId, elementProperty);
    }
    function createShape(elementId, containerId) {
        var element = getElementById(containerId);
        var property = element.property("Contents");
        var elementProperty = property.addProperty("ADBE Vector Shape - Group");
        addElement(elementId, elementProperty);
    }
    function getJustification$1(value) {
        switch (value) {
            case 0:
                return ParagraphJustification.LEFT_JUSTIFY;
            case 1:
                return ParagraphJustification.RIGHT_JUSTIFY;
            case 2:
                return ParagraphJustification.CENTER_JUSTIFY;
            case 3:
                return ParagraphJustification.FULL_JUSTIFY_LASTLINE_LEFT;
            case 4:
                return ParagraphJustification.FULL_JUSTIFY_LASTLINE_RIGHT;
            case 5:
                return ParagraphJustification.FULL_JUSTIFY_LASTLINE_CENTER;
            case 6:
                return ParagraphJustification.FULL_JUSTIFY_LASTLINE_FULL;
            default:
                return ParagraphJustification.LEFT_JUSTIFY;
        }
    }
    function buildTextDocument(textDocument, text, fontSize, font, fillColor, tracking, justification, baselineShift) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        try {
            textDocument.text = text;
            textDocument.justification = getJustification$1(justification);
            textDocument.font = decodeURIComponent(font);
            textDocument.baselineShift = baselineShift;
            textDocument.fontSize = fontSize;
            textDocument.fillColor = fillColor;
            textDocument.tracking = tracking;
        }
        catch (error) {
            var e = error;
            bm_eventDispatcher.log(e.message);
        }
    }
    function setTextDocumentValue(sourceTextId, text, fontSize, font, fillColor, tracking, justification, baselineShift) {
        var layer = getElementById(sourceTextId);
        var textDocument = new TextDocument(text);
        layer.property("Source Text").setValue(textDocument);
        textDocument = layer.property("Source Text").value;
        buildTextDocument(textDocument, text, fontSize, font, fillColor, tracking, justification, baselineShift);
        layer.property("Source Text").setValue(textDocument);
    }
    function setTextDocumentValueAtTime(sourceTextId, time, text, fontSize, font, fillColor, tracking, justification, baselineShift) {
        var layer = getElementById(sourceTextId);
        var textDocument = new TextDocument(text);
        layer.property("Source Text").setValueAtTime(time / frameRate$1, textDocument);
        textDocument = layer.property("Source Text").value;
        buildTextDocument(textDocument, text, fontSize, font, fillColor, tracking, justification, baselineShift);
        layer.property("Source Text").setValueAtTime(time / frameRate$1, textDocument);
    }
    var maskModes = {
        a: MaskMode.ADD,
        s: MaskMode.SUBTRACT,
        i: MaskMode.INTERSECT,
        l: MaskMode.LIGHTEN,
        d: MaskMode.DARKEN,
        f: MaskMode.DIFFERENCE,
    };
    var trackMatteModes = {
        1: TrackMatteType.ALPHA,
        2: TrackMatteType.ALPHA_INVERTED,
        3: TrackMatteType.LUMA,
        4: TrackMatteType.LUMA_INVERTED,
    };
    function getMaskMode(mode) {
        return maskModes[mode] || maskModes.a;
    }
    function getTrackMatteMode(mode) {
        return trackMatteModes[mode] || trackMatteModes[1];
    }
    function createMask$1(maskId, layerId, maskMode, isInverted) {
        var element = getElementById(layerId);
        var mask = element.Masks.addProperty("Mask");
        addElement(maskId, mask);
        mask.maskMode = getMaskMode(maskMode);
        mask.inverted = isInverted;
    }
    function setTrackMatte(layerId, trackMatteMode) {
        var element = getElementById(layerId);
        element.trackMatteType = getTrackMatteMode(trackMatteMode);
    }
    function assignIdToProp(propName, elementId, containerId) {
        var element = getElementById(containerId);
        var elementProperty = element.property(propName);
        addElement(elementId, elementProperty);
    }
    function importFile(jsonPath, fileRelativePath, assetId) {
        var importFileOptions = new ImportOptions();
        var file = new File(decodeURIComponent(jsonPath));
        file.changePath(decodeURIComponent(fileRelativePath));
        if (file.exists) {
            importFileOptions.file = file;
        }
        var footage = app.project.importFile(importFileOptions);
        addElement(assetId, footage);
    }
    function addFootageToMainFolder$1(footageList) {
        var i;
        var len = footageList.length;
        for (i = 0; i < len; i += 1) {
            var footage = getElementById(footageList[i]);
            footage.parentFolder = mainFolder;
        }
    }
    function reset$9() {
        elements = {};
        mainFolder = null;
    }
    var bm_lottieImporter = {
        reset: reset$9,
        createFolder: createFolder$1,
        createComp: createComp$1,
        setCompWorkArea: setCompWorkArea$1,
        createNull: createNull$1,
        createSolid: createSolid$1,
        createShapeLayer: createShapeLayer$1,
        createTextLayer: createTextLayer$1,
        addComposition: addComposition,
        addImageLayer: addImageLayer,
        setFrameRate: setFrameRate$1,
        setElementPropertyValue: setElementPropertyValue,
        setElementPropertyExpression: setElementPropertyExpression,
        setElementKey: setElementKey,
        setElementTemporalKeyAtIndex: setElementTemporalKeyAtIndex,
        setInterpolationTypeAtKey: setInterpolationTypeAtKey,
        separateDimensions: separateDimensions,
        setSpatialTangentsAtKey: setSpatialTangentsAtKey,
        setLayerParent: setLayerParent,
        setLayerStartTime: setLayerStartTime,
        setLayerStretch: setLayerStretch,
        setLayerInPoint: setLayerInPoint,
        setLayerName: setLayerName,
        setElementAsDisabled: setElementAsDisabled,
        setLayerOutPoint: setLayerOutPoint,
        createShapeGroup: createShapeGroup,
        createRectangle: createRectangle,
        createEllipse: createEllipse,
        createStar: createStar,
        createFill: createFill,
        createStroke: createStroke,
        createGradientFill: createGradientFill,
        createGradientStroke: createGradientStroke,
        createShape: createShape,
        createRepeater: createRepeater,
        createRoundedCorners: createRoundedCorners,
        createTrimPath: createTrimPath,
        createMask: createMask$1,
        setTrackMatte: setTrackMatte,
        assignIdToProp: assignIdToProp,
        importFile: importFile,
        addFootageToMainFolder: addFootageToMainFolder$1,
        setTextDocumentValue: setTextDocumentValue,
        setTextDocumentValueAtTime: setTextDocumentValueAtTime,
    };

    function random$1(len) {
        var length = len;
        var sequence = 'abcdefghijklmnoqrstuvwxyz1234567890';
        var returnString = '';
        var i;
        for (i = 0; i < length; i += 1) {
            returnString += sequence.charAt(Math.floor(Math.random() * sequence.length));
        }
        return returnString;
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    }
    function hexToRgbAsNormalizedArray(hex) {
        var color = hexToRgb(hex);
        if (!color) {
            return [0, 0, 0];
        }
        return [color.r / 255, color.g / 255, color.b / 255];
    }

    var _alerts = [];
    var _compsStack = [];
    var _currentLayer = '';
    function add(message) {
        var entry = {};
        var key;
        for (key in message) {
            if (message.hasOwnProperty(key)) {
                entry[key] = message[key];
            }
        }
        entry.layer = _currentLayer;
        entry.comp = _compsStack.length ? _compsStack[_compsStack.length - 1] : '';
        _alerts.push(entry);
    }
    function get() {
        var copy = [];
        var i;
        for (i = 0; i < _alerts.length; i += 1) {
            copy.push(_alerts[i]);
        }
        return copy;
    }
    function reset$8() {
        _alerts.length = 0;
        _compsStack.length = 0;
        _currentLayer = '';
    }
    function setLayer(name) {
        _currentLayer = name;
    }
    function pushComp(name) {
        _compsStack.push(name);
    }
    function popComp(_name) {
        _compsStack.pop();
    }

    var _frameRate = 0;
    function setFrameRate(value) {
        _frameRate = value;
    }
    function getFrameRate() {
        return _frameRate;
    }

    function formatProperty(property) {
        if (Array.isArray(property) && typeof property[0] === 'object' && property[0] && 'i' in property[0]) {
            return property[0];
        }
        return property;
    }
    function addKeyframes(keyframes, propertyName, elementId) {
        keyframes.forEach(function (keyframe, index) {
            var value = 's' in keyframe ? keyframe.s : keyframes[index - 1].e;
            bm_lottieImporter.setElementKey(propertyName, keyframe.t, formatProperty(value), elementId);
        });
        var inSpeeds = [];
        var inInfluences = [];
        var outSpeeds = [];
        var outInfluences = [];
        var totalDimensions = keyframes[0].i
            ? (Array.isArray(keyframes[0].i.x) ? keyframes[0].i.x.length : 1)
            : keyframes[0].s.length;
        keyframes.forEach(function (keyframe, index) {
            if (keyframe.i && keyframe.o && index < keyframes.length - 1) {
                outSpeeds[index] = [];
                outInfluences[index] = [];
                inSpeeds[index + 1] = [];
                inInfluences[index + 1] = [];
                var inX = Array.isArray(keyframe.i.x) ? keyframe.i.x : [keyframe.i.x];
                inX.forEach(function (_arrayElement, dimension) {
                    var nextValue = 'e' in keyframe ? keyframe.e : keyframes[index + 1].s;
                    var inXDimension = Array.isArray(keyframe.i.x) ? keyframe.i.x[dimension] : keyframe.i.x;
                    var inYDimension = Array.isArray(keyframe.i.y) ? keyframe.i.y[dimension] : keyframe.i.y;
                    var outXDimension = Array.isArray(keyframe.o.x) ? keyframe.o.x[dimension] : keyframe.o.x;
                    var outYDimension = Array.isArray(keyframe.o.y) ? keyframe.o.y[dimension] : keyframe.o.y;
                    var nextKeyframe = keyframes[index + 1];
                    var keyInInfluence = (inXDimension - 1) * -100;
                    var lastKeyOutInfluence = (outXDimension) * 100;
                    var duration = (nextKeyframe.t - keyframe.t) / getFrameRate();
                    var curVal = keyframe.s[dimension];
                    var nextVal = nextValue[dimension];
                    var yNormal = (typeof curVal === 'number' && typeof nextVal === 'number')
                        ? nextVal - curVal
                        : 0;
                    var bezierInY = -(inYDimension - 1) * yNormal / duration;
                    var bezierY = outYDimension * yNormal / duration;
                    var lastKeyOutSpeed = bezierY / lastKeyOutInfluence * 100;
                    var keyInSpeed = bezierInY / keyInInfluence * 100;
                    outSpeeds[index].push(lastKeyOutSpeed);
                    outInfluences[index].push(lastKeyOutInfluence);
                    inSpeeds[index + 1].push(keyInSpeed);
                    inInfluences[index + 1].push(keyInInfluence);
                });
            }
        });
        var fillingArray = [];
        var f;
        for (f = 0; f < totalDimensions; f += 1) {
            fillingArray.push(1);
        }
        inSpeeds[0] = fillingArray;
        inInfluences[0] = fillingArray;
        outSpeeds.push(fillingArray);
        outInfluences.push(fillingArray);
        inSpeeds.forEach(function (_easing, index) {
            bm_lottieImporter.setElementTemporalKeyAtIndex(propertyName, index + 1, inInfluences[index], inSpeeds[index], outInfluences[index], outSpeeds[index], elementId);
        });
        keyframes.forEach(function (keyframe, index) {
            if (keyframe.h) {
                bm_lottieImporter.setInterpolationTypeAtKey(propertyName, index + 1, elementId, 3);
            }
            if (keyframe.to || (index > 0 && keyframes[index - 1].to)) {
                var outTangents = (index === keyframes.length - 1)
                    ? keyframes[index - 1].to.map(function (_value) { return 0; })
                    : keyframe.to;
                var inTangents = (index === 0)
                    ? keyframe.ti.map(function (_value) { return 0; })
                    : keyframes[index - 1].ti;
                bm_lottieImporter.setSpatialTangentsAtKey(propertyName, index + 1, inTangents, outTangents, elementId);
            }
        });
    }
    function formatExpression(expression) {
        expression = expression
            .replace(/\$bm_sum/g, 'add')
            .replace(/\$bm_sub/g, 'sub')
            .replace(/\$bm_mul/g, 'mul')
            .replace(/\$bm_div/g, 'div')
            .replace(/\$bm_mod/g, 'mod')
            .replace(/ sum\(/g, ' add(');
        return encodeURIComponent(expression);
    }
    function processProperty(propertyName, propertyData, elementId, defaultValue) {
        if (typeof propertyData === 'number' || typeof propertyData === 'string') {
            bm_lottieImporter.setElementPropertyValue(propertyName, propertyData, elementId);
        }
        else if (propertyData) {
            if ('k' in propertyData) {
                if (typeof propertyData.k === 'number' || !Array.isArray(propertyData.k)) {
                    if (defaultValue !== propertyData.k) {
                        bm_lottieImporter.setElementPropertyValue(propertyName, formatProperty(propertyData.k), elementId);
                    }
                }
                else if (Array.isArray(propertyData.k) && typeof propertyData.k[0] === 'number') {
                    var differentIndex = propertyData.k.findIndex(function (value, index) {
                        return defaultValue === undefined || defaultValue[index] !== value;
                    });
                    if (differentIndex !== -1) {
                        bm_lottieImporter.setElementPropertyValue(propertyName, propertyData.k, elementId);
                    }
                }
                else {
                    addKeyframes(propertyData.k, propertyName, elementId);
                }
            }
            if ('x' in propertyData) {
                bm_lottieImporter.setElementPropertyExpression(propertyName, formatExpression(propertyData.x), elementId);
            }
        }
    }

    function processTransform(transformData, elementId) {
        var transformId = random$1(10);
        bm_lottieImporter.assignIdToProp('transform', transformId, elementId);
        if (transformData.p) {
            if (transformData.p.s) {
                bm_lottieImporter.separateDimensions(elementId);
                processProperty('ADBE Position_0', transformData.p.x, transformId);
                processProperty('ADBE Position_1', transformData.p.y, transformId);
                if (transformData.p.z) {
                    processProperty('ADBE Position_2', transformData.p.z, transformId);
                }
            }
            else {
                processProperty('Position', transformData.p, transformId);
            }
        }
        if (transformData.r) {
            processProperty('Rotation', transformData.r, transformId, 0);
        }
        if (transformData.rx) {
            processProperty('ADBE Rotate X', transformData.rx, transformId, 0);
        }
        if (transformData.ry) {
            processProperty('ADBE Rotate Y', transformData.ry, transformId, 0);
        }
        if (transformData.rz) {
            processProperty('ADBE Rotate Z', transformData.rz, transformId, 0);
        }
        if (transformData.s) {
            processProperty('Scale', transformData.s, transformId, [100, 100]);
        }
        if (transformData.a) {
            processProperty('Anchor Point', transformData.a, transformId);
        }
        if (transformData.o) {
            processProperty('Opacity', transformData.o, transformId);
        }
        if (transformData.so) {
            processProperty('Start Opacity', transformData.so, transformId);
        }
        if (transformData.eo) {
            processProperty('End Opacity', transformData.eo, transformId);
        }
        if (transformData.sk) {
            processProperty('Skew', transformData.sk, transformId, 0);
        }
        if (transformData.sa) {
            processProperty('Skew Axis', transformData.sa, transformId, 0);
        }
    }

    function getKeyframes(gradientKeys) {
        if (typeof gradientKeys[0] === 'number') {
            return [{
                    s: gradientKeys,
                }];
        }
        return gradientKeys;
    }
    function buildGradientKeyframes(gradientData) {
        var totalPositions = gradientData.p;
        var colors = [];
        var alphas = [];
        var keyframes = getKeyframes(gradientData.k.k);
        keyframes.forEach(function (gradient) {
            var gradientValue = gradient.s;
            var hasAlpha = gradientValue.length / 4 !== totalPositions;
            var colorList = [];
            var alphaList = [];
            var count = 0;
            var index = 0;
            while (count < totalPositions) {
                index = count * 4;
                colorList.push({
                    p: Math.round(100 * gradientValue[index + 0] * 100) / 100,
                    r: Math.round(gradientValue[index + 1] * 255 * 100) / 100,
                    g: Math.round(gradientValue[index + 2] * 255 * 100) / 100,
                    b: Math.round(gradientValue[index + 3] * 255 * 100) / 100,
                });
                count += 1;
            }
            colors.push(colorList);
            if (hasAlpha) {
                count = 0;
                var totalAlphaPositions = ((gradientValue.length - (totalPositions * 4)) / 2);
                index = 0;
                while (count < totalAlphaPositions) {
                    index = totalPositions * 4 + count * 2;
                    alphaList.push({
                        p: Math.round(100 * gradientValue[index + 0] * 100) / 100,
                        a: Math.round(gradientValue[index + 1] * 100 * 100) / 100,
                    });
                    count += 1;
                }
                alphas.push(alphaList);
            }
        });
        return {
            colors: colors,
            alphas: alphas,
        };
    }
    function buildGradientAlert(layerData) {
        return {
            type: 'gradient',
            message: "Gradient data can't be imported. You will need to fill it manually.",
            colorData: buildGradientKeyframes(layerData.g),
        };
    }

    function processCommonProperties(data, id) {
        if (data.hd === true) {
            bm_lottieImporter.setElementAsDisabled(id);
        }
    }
    function groupHandler(data, parentId) {
        var groupId = random$1(10);
        bm_lottieImporter.createShapeGroup(groupId, parentId);
        processProperty('name', encodeURIComponent(data.nm), groupId);
        iterateShapes(data.it, groupId);
        processCommonProperties(data, groupId);
    }
    function transformHandler(data, parentId) {
        processTransform(data, parentId);
    }
    function rectangleHandler(data, parentId) {
        var rectId = random$1(10);
        bm_lottieImporter.createRectangle(rectId, parentId);
        processProperty('Size', data.s, rectId, [100, 100]);
        processProperty('Position', data.p, rectId, [0, 0]);
        processProperty('Roundness', data.r, rectId, 0);
        processProperty('name', encodeURIComponent(data.nm), rectId);
        processCommonProperties(data, rectId);
    }
    function fillHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createFill(id, parentId);
        processProperty('Color', data.c, id);
        processProperty('Opacity', data.o, id, 100);
        processProperty('Fill Rule', data.r, id);
        processProperty('name', encodeURIComponent(data.nm), id);
        processCommonProperties(data, id);
    }
    function strokeHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createStroke(id, parentId);
        processProperty('Color', data.c, id);
        processProperty('Opacity', data.o, id, 100);
        processProperty('Stroke Width', data.w, id, 1);
        processProperty('Line Cap', data.lc, id, 1);
        processProperty('Line Join', data.lj, id, 1);
        if (data.lj === 1) {
            processProperty('Miter Limit', data.ml, id, 4);
        }
        processProperty('name', encodeURIComponent(data.nm), id);
        processCommonProperties(data, id);
    }
    function ellipseHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createEllipse(id, parentId);
        processProperty('Shape Direction', data.d, id);
        processProperty('Size', data.s, id, [100, 100]);
        processProperty('Position', data.p, id, [0, 0]);
        processProperty('name', encodeURIComponent(data.nm), id);
        processCommonProperties(data, id);
    }
    function starHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createStar(id, parentId);
        processProperty('Type', data.sy, id, 1);
        processProperty('Shape Direction', data.d, id, 1);
        processProperty('Points', data.pt, id, 5);
        processProperty('Position', data.p, id, [0, 0]);
        processProperty('Rotation', data.r, id, 0);
        if (data.sy === 1) {
            processProperty('Inner Radius', data.ir, id, 50);
            processProperty('Inner Roundness', data.is, id, 0);
        }
        processProperty('Outer Radius', data.or, id, 100);
        processProperty('Outer Roundness', data.os, id, 0);
        processProperty('name', encodeURIComponent(data.nm), id);
        processCommonProperties(data, id);
    }
    function shapeHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createShape(id, parentId);
        processProperty('ADBE Vector Shape', data.ks, id, null);
        processCommonProperties(data, id);
    }
    function repeaterHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createRepeater(id, parentId);
        processProperty('Copies', data.c, id);
        processProperty('Offset', data.o, id, 0);
        processProperty('Composite', data.m, id);
        processProperty('name', encodeURIComponent(data.nm), id);
        processTransform(data.tr, id);
        processCommonProperties(data, id);
    }
    function roundedCornersHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createRoundedCorners(id, parentId);
        processProperty('Radius', data.r, id);
        processProperty('name', encodeURIComponent(data.nm), id);
        processCommonProperties(data, id);
    }
    function trimPathHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createTrimPath(id, parentId);
        processProperty('Start', data.s, id, 0);
        processProperty('End', data.e, id, 100);
        processProperty('Offset', data.o, id, 0);
        processProperty('Trim Multiple Shapes', data.m, id);
        processProperty('name', encodeURIComponent(data.nm), id);
        processCommonProperties(data, id);
    }
    function gradientFillHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createGradientFill(id, parentId);
        processProperty('Colors', data.g.k, id, 100);
        processProperty('Opacity', data.o, id, 100);
        processProperty('Fill Rule', data.r, id, 1);
        processProperty('Blend Mode', data.bm, id, 0);
        processProperty('Start Point', data.s, id, [0, 0]);
        processProperty('End Point', data.e, id, [100, 0]);
        processProperty('Type', data.t, id, 1);
        if (data.t === 2) {
            processProperty('Highlight Length', data.h, id, 0);
            processProperty('Highlight Angle', data.a, id, 0);
        }
        add(buildGradientAlert(data));
        processProperty('name', data.nm, id);
        processCommonProperties(data, id);
    }
    function gradientStrokeHandler(data, parentId) {
        var id = random$1(10);
        bm_lottieImporter.createGradientStroke(id, parentId);
        processProperty('Colors', data.g.k, id, 100);
        processProperty('Opacity', data.o, id, 100);
        processProperty('Stroke Width', data.w, id, 2);
        processProperty('Fill Rule', data.r, id, 1);
        processProperty('Blend Mode', data.bm, id, 0);
        processProperty('Start Point', data.s, id, [0, 0]);
        processProperty('End Point', data.e, id, [100, 0]);
        processProperty('Type', data.t, id, 1);
        if (data.t === 2) {
            processProperty('Highlight Length', data.h, id, 0);
            processProperty('Highlight Angle', data.a, id, 0);
        }
        processProperty('Line Cap', data.lc, id, 1);
        processProperty('Line Join', data.lj, id, 1);
        if (data.lj === 1) {
            processProperty('Miter Limit', data.ml2, id, 4);
        }
        processProperty('name', encodeURIComponent(data.nm), id);
        processCommonProperties(data, id);
        add(buildGradientAlert(data));
    }
    var shapeHandlers = {
        gr: groupHandler,
        rc: rectangleHandler,
        fl: fillHandler,
        tr: transformHandler,
        sh: shapeHandler,
        st: strokeHandler,
        el: ellipseHandler,
        sr: starHandler,
        rp: repeaterHandler,
        rd: roundedCornersHandler,
        tm: trimPathHandler,
        gf: gradientFillHandler,
        gs: gradientStrokeHandler,
    };
    function iterateShapes(shapes, parentId) {
        shapes.forEach(function (shape) {
            if (shapeHandlers[shape.ty]) {
                shapeHandlers[shape.ty](shape, parentId);
            }
        });
    }
    function processShape$1(layerData, layerId) {
        iterateShapes(layerData.shapes, layerId);
    }

    function getTextDocumentData(textDocumentData) {
        if ('k' in textDocumentData) {
            return textDocumentData.k;
        }
        return [
            {
                s: textDocumentData,
            },
        ];
    }
    function processText(textData, layerId) {
        var textDocumentData = getTextDocumentData(textData.d);
        var sourceTextIdId = random$1(10);
        bm_lottieImporter.assignIdToProp('Source Text', sourceTextIdId, layerId);
        if (textDocumentData.length === 1) {
            var textDocumentValue = textDocumentData[0].s;
            bm_lottieImporter.setTextDocumentValue(layerId, encodeURIComponent(textDocumentValue.t), textDocumentValue.s, encodeURIComponent(textDocumentValue.f), textDocumentValue.fc, textDocumentValue.tr, textDocumentValue.j, textDocumentValue.ls || 0);
        }
        else {
            textDocumentData.forEach(function (textDocument) {
                var docValue = textDocument.s;
                bm_lottieImporter.setTextDocumentValueAtTime(layerId, textDocument.t, encodeURIComponent(docValue.t), docValue.s, encodeURIComponent(docValue.f), docValue.fc, docValue.tr, docValue.j, docValue.ls || 0);
            });
        }
    }

    function createMask(maskData, elementId) {
        var maskId = random$1(10);
        bm_lottieImporter.createMask(maskId, elementId, maskData.mode, maskData.inv);
        processProperty('Mask Opacity', maskData.o, maskId, 100);
        processProperty('Mask Expansion', maskData.x, maskId, 0);
        if (maskData.f) {
            processProperty('Mask Feather', maskData.f, maskId, 0);
        }
        processProperty('maskShape', maskData.pt, maskId, null);
    }
    function processMasks(masks, elementId) {
        if (masks && masks.length) {
            masks.forEach(function (mask) {
                createMask(mask, elementId);
            });
        }
    }

    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    function decodeBase64ToBinaryString(input) {
        var str = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        var output = '';
        var i = 0;
        var len = str.length;
        while (i < len) {
            var enc1 = ALPHABET.indexOf(str.charAt(i++));
            var enc2 = ALPHABET.indexOf(str.charAt(i++));
            var enc3 = ALPHABET.indexOf(str.charAt(i++));
            var enc4 = ALPHABET.indexOf(str.charAt(i++));
            var chr1 = (enc1 << 2) | (enc2 >> 4);
            var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            var chr3 = ((enc3 & 3) << 6) | enc4;
            output += String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output += String.fromCharCode(chr3);
            }
        }
        return output;
    }

    var LOTTIE_IMAGES_IMPORT = 'lottie_images_import';
    function getSeparator() {
        return ($.os && $.os.indexOf('Windows') !== -1) ? '\\' : '/';
    }
    function ensureFolder(path) {
        var folder = new Folder(path);
        if (!folder.exists) {
            return folder.create();
        }
        return true;
    }
    function getEmbeddedExtension(prefix) {
        var slashIndex = prefix.indexOf('/');
        var semiIndex = prefix.indexOf(';');
        return prefix.substr(slashIndex + 1, semiIndex - slashIndex - 1);
    }
    function writeEmbeddedAsset(base64Data, folderPath, assetName) {
        if (!ensureFolder(folderPath)) {
            return false;
        }
        var filePath = folderPath + assetName;
        var file = new File(filePath);
        file.encoding = 'BINARY';
        if (!file.open('w')) {
            return false;
        }
        try {
            var binary = decodeBase64ToBinaryString(base64Data);
            file.write(binary);
        }
        finally {
            file.close();
        }
        return true;
    }
    function importEmbeddedAsset(asset, assetsPath) {
        var data = asset.p;
        if (typeof data !== 'string' || data.indexOf(',') === -1) {
            return null;
        }
        var prefix = data.substr(0, data.indexOf(','));
        var extension = getEmbeddedExtension(prefix);
        var base64Data = data.substr(data.indexOf(',') + 1);
        var assetId = random$1(10);
        var assetName = assetId + '.' + extension;
        if (!writeEmbeddedAsset(base64Data, assetsPath, assetName)) {
            return null;
        }
        bm_lottieImporter.importFile(encodeURIComponent(assetsPath), encodeURIComponent(assetName), assetId);
        return assetId;
    }
    function importLinkedAsset(asset, assetsPath) {
        var assetId = random$1(10);
        var assetName = (asset.u || '') + asset.p;
        bm_lottieImporter.importFile(encodeURIComponent(assetsPath), encodeURIComponent(assetName), assetId);
        return assetId;
    }
    function importLottieAssets(assets, assetsPath) {
        if (!assets) {
            return;
        }
        var imageAssets = assets.filter(function (asset) {
            return asset.id && asset.w;
        });
        var i;
        for (i = 0; i < imageAssets.length; i += 1) {
            var asset = imageAssets[i];
            var sourceId = null;
            if (asset.e) {
                var embeddedPath = assetsPath + LOTTIE_IMAGES_IMPORT + getSeparator();
                sourceId = importEmbeddedAsset(asset, embeddedPath);
                if (!sourceId) {
                    add({
                        type: 'message',
                        message: 'Embedded asset could not be imported',
                    });
                    continue;
                }
            }
            else {
                if (!assetsPath) {
                    add({
                        type: 'message',
                        message: 'Asset path not provided; skipping linked asset',
                    });
                    continue;
                }
                sourceId = importLinkedAsset(asset, assetsPath);
            }
            asset.__sourceId = sourceId;
        }
    }

    function createFolder(name) {
        bm_lottieImporter.createFolder(name || '');
    }
    function createComp(name, width, height, duration, compId) {
        bm_lottieImporter.createComp(name, width, height, duration, compId);
    }
    function setCompWorkArea(inPoint, outPoint, compId) {
        bm_lottieImporter.setCompWorkArea(inPoint, outPoint, compId);
    }
    function createSolid(layerData, compId) {
        var layerId = random$1(10);
        layerData.__importId = layerId;
        var color = hexToRgbAsNormalizedArray(layerData.sc);
        bm_lottieImporter.createSolid(color, layerData.nm, layerData.sw, layerData.sh, layerData.op - layerData.ip, layerId, compId);
        processLayerExtraProps(layerData, layerId);
        processTransform(layerData.ks, layerId);
        processMasks(layerData.masksProperties, layerId);
    }
    function createImageLayer(layerData, compId, assets) {
        var imageSourceData = assets.find(function (asset) {
            return asset.id === layerData.refId;
        });
        var layerId = random$1(10);
        layerData.__importId = layerId;
        if (imageSourceData && imageSourceData.__sourceId) {
            bm_lottieImporter.addImageLayer(imageSourceData.__sourceId, compId, layerId);
        }
        processLayerExtraProps(layerData, layerId);
        processTransform(layerData.ks, layerId);
        processMasks(layerData.masksProperties, layerId);
    }
    function createNull(layerData, compId) {
        var layerId = random$1(10);
        layerData.__importId = layerId;
        bm_lottieImporter.createNull(layerData.op - layerData.ip, layerId, compId);
        processLayerExtraProps(layerData, layerId);
        processTransform(layerData.ks, layerId);
    }
    function createShapeLayer(layerData, compId) {
        var layerId = random$1(10);
        layerData.__importId = layerId;
        bm_lottieImporter.createShapeLayer(layerId, compId);
        processLayerExtraProps(layerData, layerId);
        processShape$1(layerData, layerId);
        processTransform(layerData.ks, layerId);
        processMasks(layerData.masksProperties, layerId);
    }
    function createTextLayer(layerData, compId) {
        var layerId = random$1(10);
        layerData.__importId = layerId;
        bm_lottieImporter.createTextLayer(layerId, compId);
        processLayerExtraProps(layerData, layerId);
        processText(layerData.t, layerId);
        processTransform(layerData.ks, layerId);
        processMasks(layerData.masksProperties, layerId);
        add({ type: 'message', message: 'Text layers are not fully supported' });
    }
    function createCompositionLayer(layerData, parentCompId, assets) {
        var compositionSourceData = assets.find(function (asset) {
            return asset.id === layerData.refId;
        });
        if (!compositionSourceData) {
            return;
        }
        if (!compositionSourceData.__created) {
            compositionSourceData.__created = true;
            var sourceCompId = random$1(10);
            compositionSourceData.__sourceId = sourceCompId;
            createComp(layerData.nm, layerData.w, layerData.h, 9999, sourceCompId);
            pushComp(layerData.nm);
            iterateLayers(compositionSourceData.layers, sourceCompId, assets);
            popComp(layerData.nm);
        }
        var layerId = random$1(10);
        layerData.__importId = layerId;
        bm_lottieImporter.addComposition(compositionSourceData.__sourceId, parentCompId, layerId);
        processLayerExtraProps(layerData, layerId);
        processTransform(layerData.ks, layerId);
        processMasks(layerData.masksProperties, layerId);
    }
    function processLayerExtraProps(layerData, layerId) {
        if (layerData.ip - layerData.st !== 0) {
            bm_lottieImporter.setLayerInPoint(layerId, layerData.ip - layerData.st);
        }
        if (layerData.st !== 0) {
            bm_lottieImporter.setLayerStartTime(layerId, layerData.st);
        }
        if (layerData.sr !== 1) {
            bm_lottieImporter.setLayerStretch(layerId, layerData.sr * 100);
        }
        if (layerData.nm) {
            bm_lottieImporter.setLayerName(layerId, encodeURIComponent(layerData.nm));
        }
        if (layerData.hd === true) {
            bm_lottieImporter.setElementAsDisabled(layerId);
        }
        bm_lottieImporter.setLayerOutPoint(layerId, layerData.op);
    }
    function createLayer$1(layerData, compId, assets) {
        setLayer(layerData.nm);
        switch (layerData.ty) {
            case 0:
                createCompositionLayer(layerData, compId, assets);
                break;
            case 1:
                createSolid(layerData, compId);
                break;
            case 2:
                createImageLayer(layerData, compId, assets);
                break;
            case 3:
                createNull(layerData, compId);
                break;
            case 4:
                createShapeLayer(layerData, compId);
                break;
            case 5:
                createTextLayer(layerData, compId);
                break;
        }
    }
    function findLayerByIndexProperty(layers, index) {
        return layers.find(function (layer) {
            return layer.ind === index;
        });
    }
    function iterateLayers(layers, compId, assets) {
        layers.reverse().forEach(function (layer) {
            createLayer$1(layer, compId, assets);
        });
        layers.forEach(function (layer) {
            if ('parent' in layer) {
                var parentLayer = findLayerByIndexProperty(layers, layer.parent);
                if (parentLayer) {
                    bm_lottieImporter.setLayerParent(layer.__importId, parentLayer.__importId);
                }
            }
            if ('tt' in layer) {
                bm_lottieImporter.setTrackMatte(layer.__importId, layer.tt);
            }
        });
    }
    function addFootageToMainFolder(assets) {
        var footageIds = (assets || [])
            .filter(function (asset) { return asset.id && asset.w && asset.__sourceId; })
            .map(function (asset) { return asset.__sourceId; });
        if (footageIds.length) {
            bm_lottieImporter.addFootageToMainFolder(footageIds);
        }
    }
    function convert(lottieData, mainCompId) {
        setFrameRate(lottieData.fr);
        bm_lottieImporter.setFrameRate(lottieData.fr);
        pushComp(lottieData.nm || 'Main Comp');
        createFolder(lottieData.nm);
        addFootageToMainFolder(lottieData.assets);
        createComp(lottieData.nm, lottieData.w, lottieData.h, lottieData.op, mainCompId);
        setCompWorkArea(lottieData.ip / lottieData.fr, lottieData.op / lottieData.fr, mainCompId);
        iterateLayers(lottieData.layers, mainCompId, lottieData.assets);
    }
    function importLottieData(lottieData, options) {
        var assetsPath = (options && options.assetsPath) || '';
        reset$8();
        bm_lottieImporter.reset();
        var mainCompId = random$1(10);
        try {
            importLottieAssets(lottieData.assets, assetsPath);
            convert(lottieData, mainCompId);
            return {
                success: true,
                mainCompId: mainCompId,
                alerts: get(),
            };
        }
        catch (err) {
            var message = (err && err.message) ? err.message : 'There has been an error';
            return {
                success: false,
                mainCompId: mainCompId,
                alerts: get(),
                error: message,
            };
        }
    }

    var _callback$6;
    function saveAVDDataSuccess() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$6(exporterHelpers.exportTypes.AVD, exporterHelpers.exportStatuses.SUCCESS);
    }
    function saveAVDFailed() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$6(exporterHelpers.exportTypes.AVD, exporterHelpers.exportStatuses.FAILED);
    }
    function save$8(destinationPath, config, callback) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$6 = callback;
        if (config.export_modes.avd) {
            var destinationData = exporterHelpers.parseDestination(destinationPath, 'avd');
            var avdDestinationFileName = new File(destinationData.folder.fsName);
            avdDestinationFileName.changePath(destinationData.fileName + '.xml');
            var temporaryFolder = bm_fileManager.getTemporaryFolder();
            var jsonFile = new File(temporaryFolder.fsName);
            jsonFile.changePath('raw');
            jsonFile.changePath(destinationData.fileName + '.json');
            bm_eventDispatcher.sendEvent('bm:create:avd', { origin: jsonFile.fsName, destination: avdDestinationFileName.fsName });
        }
        else {
            _callback$6(exporterHelpers.exportTypes.AVD, exporterHelpers.exportStatuses.SUCCESS);
        }
    }
    var bm_avdExporter = {
        save: save$8,
        saveAVDDataSuccess: saveAVDDataSuccess,
        saveAVDFailed: saveAVDFailed,
    };

    var bm_projectManager$1;
    var lottiePaths = [];
    var _callback$5;
    function getLottiePath(bannerConfig) {
        var sourcePath = '';
        if (bannerConfig.lottie_origin === 'local' || bannerConfig.lottie_origin === 'cdnjs') {
            var i = 0;
            var len = lottiePaths.length;
            while (i < len) {
                if (lottiePaths[i].value === bannerConfig.lottie_library) {
                    sourcePath = lottiePaths[i][bannerConfig.lottie_origin];
                }
                i += 1;
            }
        }
        else if (bannerConfig.lottie_origin === 'file system') {
            sourcePath = 'lottie.js';
        }
        else {
            sourcePath = bannerConfig.lottie_path;
        }
        return sourcePath;
    }
    function getSizes(bannerConfig) {
        return {
            width: bannerConfig.use_original_sizes ? bannerConfig.original_width : bannerConfig.width,
            height: bannerConfig.use_original_sizes ? bannerConfig.original_height : bannerConfig.height,
        };
    }
    function createTemplate(config, filePathName, animationStringData) {
        var bm_downloadManager = $.__bodymovin.bm_downloadManager;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var bannerConfig = config.banner;
        var templateData = bm_downloadManager.getTemplateData();
        var sizes = getSizes(bannerConfig);
        templateData = templateData
            .replace(/__CONTENT_WIDTH__/g, sizes.width)
            .replace(/__CONTENT_HEIGHT__/g, sizes.height)
            .replace(/__LOTTIE_RENDERER__/g, bannerConfig.lottie_renderer)
            .replace(/__CLICK_TAG__/g, bannerConfig.click_tag)
            .replace(/__LOTTIE_SOURCE__/g, getLottiePath(bannerConfig));
        if (bannerConfig.shouldIncludeAnimationDataInTemplate) {
            templateData = templateData
                .replace(/__DATA_LOAD__/g, 'animationData: ' + animationStringData);
        }
        else {
            templateData = templateData
                .replace(/__DATA_LOAD__/g, 'path: \'' + filePathName + '\'');
        }
        if (bannerConfig.shouldLoop) {
            templateData = templateData
                .replace(/__LOOP__/g, 'true');
        }
        else if (bannerConfig.loopCount === 0 || bannerConfig.loopCount === '0') {
            templateData = templateData
                .replace(/__LOOP__/g, 'false');
        }
        else {
            templateData = templateData
                .replace(/__LOOP__/g, bannerConfig.loopCount);
        }
        var indexFile = bm_fileManager.addFile('index.html', ['banner'], templateData);
        return [indexFile];
    }
    function includeLottiePlayer(bannerConfig) {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var i = 0;
        var len = lottiePaths.length;
        var sourcePath;
        while (i < len) {
            if (lottiePaths[i].value === bannerConfig.lottie_library) {
                sourcePath = lottiePaths[i][bannerConfig.lottie_origin];
            }
            i += 1;
        }
        var file = bm_projectManager$1.getFile('/assets/player/' + sourcePath);
        var lottieFileData = bm_fileManager.createFile(sourcePath, ['banner']);
        file.copy(lottieFileData.file.fsName);
        return [lottieFileData];
    }
    function includeLocalFilePlayer(bannerConfig) {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        if (bannerConfig.localPath) {
            var file = new File(bannerConfig.localPath.absoluteURI);
            var lottieFileData = bm_fileManager.createFile('lottie.js', ['banner']);
            file.copy(lottieFileData.file.fsName);
            return [lottieFileData];
        }
        else {
            return [];
        }
    }
    function copyAssets$2() {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var rawFiles = bm_fileManager.getFilesOnPath(['raw']);
        var copiedFiles = [];
        var i = 0;
        var len = rawFiles.length;
        while (i < len) {
            if (rawFiles[i].type !== 'main') {
                var fileData = bm_fileManager.getFileById(rawFiles[i].id);
                if (fileData) {
                    var file = fileData.file;
                    if (file.exists) {
                        var destinationFileData = bm_fileManager.createFile(fileData.name, ['banner', 'images']);
                        file.copy(destinationFileData.file.fsName);
                        copiedFiles.push(destinationFileData);
                    }
                }
            }
            i += 1;
        }
        return copiedFiles;
    }
    function includeAdditionalFiles(config) {
        var additionalFiles = [];
        if (!bm_projectManager$1) {
            bm_projectManager$1 = $.__bodymovin.bm_projectManager;
        }
        var bannerConfig = config.banner;
        if (bannerConfig.lottie_origin === 'local') {
            additionalFiles = additionalFiles.concat(includeLottiePlayer(bannerConfig));
        }
        else if (bannerConfig.lottie_origin === 'file system') {
            additionalFiles = additionalFiles.concat(includeLocalFilePlayer(bannerConfig));
        }
        additionalFiles = additionalFiles.concat(copyAssets$2());
        return additionalFiles;
    }
    function copyBannerFolder(destinationFolder) {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        var bannerFiles = bm_fileManager.getFilesOnPath(['banner']);
        var i;
        var len = bannerFiles.length;
        var j;
        var jLen;
        var copiedFile;
        var copiedDestinationFolder;
        var bannerFileData;
        var bannerFile;
        for (i = 0; i < len; i += 1) {
            bannerFileData = bannerFiles[i];
            bannerFile = bannerFileData.file;
            jLen = bannerFileData.path.length;
            j = 1;
            copiedDestinationFolder = new Folder(destinationFolder.fsName);
            while (j < jLen) {
                copiedDestinationFolder.changePath(bannerFileData.path[j]);
                if (!copiedDestinationFolder.exists) {
                    copiedDestinationFolder.create();
                }
                j += 1;
            }
            copiedFile = new File(copiedDestinationFolder.fsName);
            copiedFile.changePath(bannerFileData.name);
            bannerFile.copy(copiedFile.fsName);
        }
        _callback$5(exporterHelpers.exportTypes.BANNER, exporterHelpers.exportStatuses.SUCCESS);
    }
    function save$7(destinationPath, config, callback) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$5 = callback;
        if (config.export_modes.banner) {
            var destinationData = exporterHelpers.parseDestination(destinationPath, 'banner');
            var rawFiles = bm_fileManager.getFilesOnPath(['raw']);
            var animationStringData = exporterHelpers.getJsonData(rawFiles);
            var bannerConfig = config.banner;
            var bannerFiles = [];
            bannerFiles = bannerFiles.concat(createTemplate(config, destinationData.fileName + '.json', animationStringData));
            bannerFiles = bannerFiles.concat(includeAdditionalFiles(config));
            if (!bannerConfig.shouldIncludeAnimationDataInTemplate) {
                var jsonFile = bm_fileManager.addFile(destinationData.fileName + '.json', ['banner'], animationStringData);
                bannerFiles.push(jsonFile);
            }
            if (bannerConfig.zip_files) {
                var temporaryFolder = bm_fileManager.getTemporaryFolder();
                var bannerFolder = new Folder(temporaryFolder.fsName);
                bannerFolder.changePath('banner');
                bm_eventDispatcher.sendEvent('bm:zip:banner', {
                    destinationPath: destinationData.folder.fsName + '/' + destinationData.fileName + '.zip',
                    folderPath: bannerFolder.fsName,
                });
            }
            else {
                copyBannerFolder(destinationData.folder);
            }
        }
        else {
            _callback$5(exporterHelpers.exportTypes.BANNER, exporterHelpers.exportStatuses.SUCCESS);
        }
    }
    function setLottiePaths(paths) {
        lottiePaths = paths;
    }
    function bannerFinished() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$5(exporterHelpers.exportTypes.BANNER, exporterHelpers.exportStatuses.SUCCESS);
    }
    function bannerFailed() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$5(exporterHelpers.exportTypes.BANNER, exporterHelpers.exportStatuses.FAILED);
    }
    var bm_bannerExporter = {
        save: save$7,
        setLottiePaths: setLottiePaths,
        bannerFinished: bannerFinished,
        bannerFailed: bannerFailed,
    };

    var _callback$4;
    function save$6(destinationPath, config, callback, data) {
        var bm_downloadManager = $.__bodymovin.bm_downloadManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        $.__bodymovin.JSON;
        _callback$4 = callback;
        if (config.export_modes.demo) {
            var destinationData = exporterHelpers.parseDestination(destinationPath, 'demo');
            var rawFiles = bm_fileManager.getFilesOnPath(['raw']);
            exporterHelpers.saveAssets(rawFiles, destinationData.folder);
            var animationStringData = exporterHelpers.getJsonData(rawFiles);
            var demoStr = bm_downloadManager.getDemoData();
            demoStr = demoStr.replace('"__[[ANIMATIONDATA]]__"', "" + animationStringData + "");
            if (data.ddd) {
                demoStr = demoStr.replace('__[[RENDERER]]__', "html");
            }
            else {
                demoStr = demoStr.replace('__[[RENDERER]]__', "svg");
            }
            var color = config.demoData.backgroundColor || '#FFF';
            demoStr = demoStr.replace('__[[BODY_BACKGROUND_COLOR]]__', color);
            demoStr = demoStr.replace('__[[LOTTIE_BACKGROUND_COLOR]]__', color);
            var demoDestinationFile = new File(destinationData.folder.fsName);
            demoDestinationFile.changePath(destinationData.fileName + '.html');
            demoDestinationFile.open('w', 'TEXT', '????');
            demoDestinationFile.encoding = 'UTF-8';
            try {
                demoDestinationFile.write(demoStr);
                demoDestinationFile.close();
                _callback$4(exporterHelpers.exportTypes.DEMO, exporterHelpers.exportStatuses.SUCCESS);
            }
            catch (errr) {
                _callback$4(exporterHelpers.exportTypes.DEMO, exporterHelpers.exportStatuses.FAILED);
            }
        }
        else {
            _callback$4(exporterHelpers.exportTypes.DEMO, exporterHelpers.exportStatuses.SUCCESS);
        }
    }
    var bm_demoExporter = {
        save: save$6,
    };

    var ob$2 = {};
    function getJsonData(rawFiles) {
        var i = 0;
        var len = rawFiles.length;
        while (i < len) {
            if (rawFiles[i].type === 'main') {
                break;
            }
            i += 1;
        }
        var fileData = bm_fileManager.getFileById(rawFiles[i].id);
        var jsonFile = fileData.file;
        jsonFile.open('r');
        var content = jsonFile.read();
        jsonFile.close();
        return content;
    }
    function saveAssets(rawFiles, destinationFolder) {
        var i = 0;
        var len = rawFiles.length;
        while (i < len) {
            if (rawFiles[i].type !== 'main') {
                var fileData = bm_fileManager.getFileById(rawFiles[i].id);
                if (fileData) {
                    var file = fileData.file;
                    if (file.exists) {
                        var destinationFileFolder = new Folder(destinationFolder.fsName);
                        destinationFileFolder.changePath('images');
                        if (!destinationFileFolder.exists) {
                            destinationFileFolder.create();
                        }
                        var destinationFile = new File(destinationFileFolder.fsName);
                        destinationFile.changePath(file.name);
                        file.copy(destinationFile.fsName);
                    }
                }
            }
            i += 1;
        }
    }
    function parseDestination(destinationPath, subFolder) {
        var destinationFile = new File(destinationPath);
        var destinationFolder = new Folder(destinationFile.parent);
        if (subFolder) {
            destinationFolder.changePath(subFolder);
            if (!destinationFolder.exists) {
                destinationFolder.create();
            }
        }
        var destinationFileName = destinationFile.name;
        var destinationFileNameWithoutExtension = destinationFileName.substr(0, destinationFileName.lastIndexOf('.'));
        var destinationExtension = destinationFileName.substr(destinationFileName.lastIndexOf('.') + 1);
        return {
            extension: destinationExtension,
            file: destinationFile,
            fileName: destinationFileNameWithoutExtension,
            folder: destinationFolder,
            fullFileName: destinationFileName,
        };
    }
    ob$2.getJsonData = getJsonData;
    ob$2.saveAssets = saveAssets;
    ob$2.parseDestination = parseDestination;
    ob$2.exportTypes = {
        AVD: 'avd',
        SMIL: 'smil',
        BANNER: 'banner',
        DEMO: 'demo',
        RIVE: 'rive',
        STANDALONE: 'standalone',
        STANDARD: 'standard',
    };
    ob$2.exportStatuses = {
        IDLE: 'idle',
        SUCCESS: 'success',
        FAILED: 'failed',
    };
    var bm_exporterHelpers = ob$2;

    var _callback$3;
    function saveSuccess() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$3(exporterHelpers.exportTypes.RIVE, exporterHelpers.exportStatuses.SUCCESS);
    }
    function saveFailed() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$3(exporterHelpers.exportTypes.RIVE, exporterHelpers.exportStatuses.FAILED);
    }
    function copyAssets$1() {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var rawFiles = bm_fileManager.getFilesOnPath(['raw']);
        var i = 0;
        var len = rawFiles.length;
        while (i < len) {
            var fileData = bm_fileManager.getFileById(rawFiles[i].id);
            if (fileData) {
                var file = fileData.file;
                if (file.exists) {
                    var filePath = fileData.path;
                    var j = 1;
                    var jLen = filePath.length;
                    var destinationFolder = ['rive'];
                    while (j < jLen) {
                        destinationFolder.push(filePath[j]);
                        j += 1;
                    }
                    var destinationFileData = bm_fileManager.createFile(fileData.name, destinationFolder);
                    file.copy(destinationFileData.file.fsName);
                }
            }
            i += 1;
        }
    }
    function save$5(destinationPath, config, callback) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$3 = callback;
        if (config.export_modes.rive) {
            var destinationData = exporterHelpers.parseDestination(destinationPath, 'rive');
            copyAssets$1();
            var temporaryFolder = bm_fileManager.getTemporaryFolder();
            var originFolder = new Folder(temporaryFolder.fsName);
            originFolder.changePath('rive');
            bm_eventDispatcher.sendEvent('bm:create:rive', {
                origin: originFolder.fsName,
                destination: destinationData.folder.fsName,
                fileName: destinationData.fileName + '.flr2d',
            });
        }
        else {
            _callback$3(exporterHelpers.exportTypes.RIVE, exporterHelpers.exportStatuses.SUCCESS);
        }
    }
    var bm_riveExporter = {
        save: save$5,
        saveSuccess: saveSuccess,
        saveFailed: saveFailed,
    };

    var _callback$2;
    function saveSMILDataSuccess() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$2(exporterHelpers.exportTypes.SMIL, exporterHelpers.exportStatuses.SUCCESS);
    }
    function saveSMILFailed() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$2(exporterHelpers.exportTypes.SMIL, exporterHelpers.exportStatuses.FAILED);
    }
    function save$4(destinationPath, config, callback) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback$2 = callback;
        if (config.export_modes.smil) {
            var destinationData = exporterHelpers.parseDestination(destinationPath, 'smil');
            var smilDestinationFileName = new File(destinationData.folder.fsName);
            smilDestinationFileName.changePath(destinationData.fileName + '.svg');
            var temporaryFolder = bm_fileManager.getTemporaryFolder();
            var jsonFile = new File(temporaryFolder.fsName);
            jsonFile.changePath('raw');
            jsonFile.changePath(destinationData.fileName + '.json');
            bm_eventDispatcher.sendEvent('bm:create:smil', { origin: jsonFile.fsName, destination: smilDestinationFileName.fsName });
        }
        else {
            _callback$2(exporterHelpers.exportTypes.SMIL, exporterHelpers.exportStatuses.SUCCESS);
        }
    }
    var bm_smilExporter = {
        save: save$4,
        saveSMILDataSuccess: saveSMILDataSuccess,
        saveSMILFailed: saveSMILFailed,
    };

    var _callback$1;
    function save$3(destinationPath, config, callback) {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        var bm_downloadManager = $.__bodymovin.bm_downloadManager;
        _callback$1 = callback;
        if (config.export_modes.standalone) {
            var destinationData = exporterHelpers.parseDestination(destinationPath, 'standalone');
            var destinationFile = new File(destinationData.folder.fsName);
            destinationFile.changePath(destinationData.fileName + '.js');
            var rawFiles = bm_fileManager.getFilesOnPath(['raw']);
            var animationStringData = exporterHelpers.getJsonData(rawFiles);
            var bodymovinJsStr = bm_downloadManager.getStandaloneData();
            animationStringData = bodymovinJsStr.replace("\"__[ANIMATIONDATA]__\"", animationStringData);
            animationStringData = animationStringData.replace("\"__[STANDALONE]__\"", 'true');
            exporterHelpers.saveAssets(rawFiles, destinationData.folder);
            destinationFile.open('w', 'TEXT', '????');
            destinationFile.encoding = 'UTF-8';
            try {
                destinationFile.write(animationStringData);
                destinationFile.close();
                _callback$1(exporterHelpers.exportTypes.STANDALONE, exporterHelpers.exportStatuses.SUCCESS);
            }
            catch (err) {
                _callback$1(exporterHelpers.exportTypes.STANDALONE, exporterHelpers.exportStatuses.FAILED);
            }
        }
        else {
            _callback$1(exporterHelpers.exportTypes.STANDALONE, exporterHelpers.exportStatuses.SUCCESS);
        }
    }
    var bm_standaloneExporter = {
        save: save$3,
    };

    var _callback;
    var _destinationData;
    function copyAssets() {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var rawFiles = bm_fileManager.getFilesOnPath(['raw']);
        var i = 0;
        var len = rawFiles.length;
        while (i < len) {
            var fileData = bm_fileManager.getFileById(rawFiles[i].id);
            if (fileData) {
                var file = fileData.file;
                if (file.exists) {
                    var filePath = fileData.path;
                    var j = 1;
                    var jLen = filePath.length;
                    var destinationFolder = ['standard'];
                    while (j < jLen) {
                        destinationFolder.push(filePath[j]);
                        j += 1;
                    }
                    var destinationFileData = bm_fileManager.createFile(fileData.name, destinationFolder);
                    file.copy(destinationFileData.file.fsName);
                }
            }
            i += 1;
        }
    }
    function moveAssetsToDestination() {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        var rawFiles = bm_fileManager.getFilesOnPath(['standard']);
        var i = 0;
        var len = rawFiles.length;
        while (i < len) {
            var fileData = bm_fileManager.getFileById(rawFiles[i].id);
            if (fileData) {
                var file = fileData.file;
                if (file.exists) {
                    var filePath = fileData.path;
                    var j = 1;
                    var jLen = filePath.length;
                    var destinationFolder = new Folder(_destinationData.folder.fsName);
                    while (j < jLen) {
                        destinationFolder.changePath(filePath[j]);
                        if (!destinationFolder.exists) {
                            destinationFolder.create();
                        }
                        j += 1;
                    }
                    var destinationFile = new File(destinationFolder.fsName);
                    destinationFile.changePath(fileData.name);
                    file.copy(destinationFile.fsName);
                }
            }
            i += 1;
        }
        _callback(exporterHelpers.exportTypes.STANDARD, exporterHelpers.exportStatuses.SUCCESS);
    }
    function save$2(destinationPath, config, callback) {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        _callback = callback;
        if (config.export_modes.standard) {
            _destinationData = exporterHelpers.parseDestination(destinationPath, '');
            var destinationFile = new File(_destinationData.folder.fsName);
            destinationFile.changePath(_destinationData.fileName + '.json');
            copyAssets();
            if (config.segmented) {
                var temporaryFolder = bm_fileManager.getTemporaryFolder();
                var originFolder = new Folder(temporaryFolder.fsName);
                originFolder.changePath('raw');
                var destinationFolder = new Folder(temporaryFolder.fsName);
                destinationFolder.changePath('standard');
                bm_eventDispatcher.sendEvent('bm:split:animation', {
                    origin: originFolder.fsName,
                    destination: destinationFolder.fsName,
                    fileName: _destinationData.fileName,
                    time: config.segmentedTime,
                });
            }
            else {
                moveAssetsToDestination();
            }
        }
        else {
            _callback(exporterHelpers.exportTypes.STANDARD, exporterHelpers.exportStatuses.SUCCESS);
        }
    }
    function slotsSuccess() {
        moveAssetsToDestination();
    }
    function splitSuccess(totalSegments) {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        for (var i = 0; i < totalSegments; i += 1) {
            bm_fileManager.createFile(_destinationData.fileName + '_' + i + '.json', ['standard']);
        }
        moveAssetsToDestination();
    }
    function splitFailed() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        _callback(exporterHelpers.exportTypes.STANDARD, exporterHelpers.exportStatuses.FAILED);
    }
    var bm_standardExporter = {
        save: save$2,
        splitSuccess: splitSuccess,
        slotsSuccess: slotsSuccess,
        splitFailed: splitFailed,
    };

    var bm_reportBuilderTypes = {
        EXPRESSIONS: 'expressions',
        WIGGLE: 'wiggle',
        UNHANDLED_LAYER: 'unhandled layer',
        DISABLED_LAYER: 'disabled layer',
        MOTION_BLUR: 'motion blur',
        PRESERVE_TRANSPARENCY: 'preserve transparency',
        THREE_D_LAYER: 'three d layer',
        EFFECTS: 'effects',
        UNHANDLED_SHAPE_PROPERTY: 'unhandled shape',
        MERGE_PATHS: 'merge paths',
        TEXT_ANIMATORS: 'text animators',
        ANIMATOR_PROPERTIES: 'animator properties',
        LARGE_IMAGE: 'large image',
        ILLUSTRATOR_ASSET: 'illustrator asset',
        CAMERA_LAYER: 'camera layer',
        LIGHT_LAYER: 'light layer',
        AUDIO_LAYER: 'audio layer',
        IMAGE_LAYER: 'image layer',
        FAILED_LAYER: 'failed layer',
        ADJUSTMENT_LAYER: 'adjustment layer',
        UNSUPPORTED_STYLE: 'unsupported style',
        LARGE_MASK: 'large mask',
        FILTER_SIZE: 'filter size',
        UNSUPPORTED_PROPERTY: 'unsupported property',
        UNSUPPORTED_MASK_MODE: 'unsupported mask mode',
        LARGE_EFFECTS: 'large effects',
        TEXT_SELECTOR_TYPE: 'text selector type',
        TEXT_SELECTOR_PROPERTIES: 'text selector properties',
        PUCKER_AND_BLOAT: 'pucker and bloat',
    };

    var bm_reportRendererTypes = {
        BROWSER: 'browser',
        IOS: 'ios',
        ANDROID: 'android',
        SKOTTIE: 'skottie',
    };

    var bm_reportMessageTypes = {
        WARNING: 'warning',
        ERROR: 'error',
    };

    var bm_reportsEffectMessages = {
        'ADBE AUX CHANNEL EXTRACT': { name: '3D Channel Extract', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE DEPTH MATTE': { name: 'Depth Matte', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE DEPTH FIELD': { name: 'Depth of Field', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'EXtractoR': { name: 'EXtractoR', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE FOG_3D': { name: 'Fog 3D', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE ID MATTE': { name: 'ID Matte', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'IDentifier': { name: 'IDentifier', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud Reverse': { name: 'Backwards', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud BT': { name: 'Bass & Treble', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud Delay': { name: 'Delay', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud_Flange': { name: 'Flange & Chorus', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud HiLo': { name: 'High-Low Pass', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud Modulator': { name: 'Modulator', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Param EQ': { name: 'Parametric EQ', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud Reverb': { name: 'Reverb', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud Stereo Mixer': { name: 'Stereo Mixer', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Aud Tone': { name: 'Tone', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Bilateral': { name: 'Bilateral Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Camera Lens Blur': { name: 'Camera Lens Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE CameraShakeDeblur': { name: 'Camera-Shake Deblur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CS CrossBlur': { name: 'CC Cross Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Radial Blur': { name: 'CC Radial Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Radial Fast Blur': { name: 'CC Radial Fast Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Vector Blur': { name: 'CC Vector Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Channel Blur': { name: 'Channel Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Compound Blur': { name: 'Compound Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Motion Blur': { name: 'Directional Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Box Blur2': { name: 'Fast Box Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Gaussian Blur 2': { name: 'Gaussian Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID] }] },
        'ADBE Radial Blur': { name: 'Radial Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Sharpen': { name: 'Sharpen', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Smart Blur': { name: 'Smart Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Unsharp Mask2': { name: 'Unsharp Mask', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Arithmetic': { name: 'Arithmetic', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Blend': { name: 'Blend', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Calculations': { name: 'Calculations', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Composite': { name: 'CC Composite', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Channel Combiner': { name: 'Channel Combiner', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Compound Arithmetic': { name: 'Compound Arithmetic', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Invert': { name: 'Invert', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Minimax': { name: 'Minimax', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Remove Color Matting': { name: 'Remove Color Matting', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Set Channels': { name: 'Set Channels', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Set Matte3': { name: 'Set Matte', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Shift Channels': { name: 'Shift Channels', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Solid Composite': { name: 'Solid Composite', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CINEMA 4D Effect': { name: 'CINEWARE', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE AutoColor': { name: 'Auto Color', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE AutoContrast': { name: 'Auto Contrast', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE AutoLevels': { name: 'Auto Levels', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Black&White': { name: 'Black & White', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Brightness & Contrast 2': { name: 'Brightness & Contrast', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Broadcast Colors': { name: 'Broadcast Colors', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CS Color Neutralizer': { name: 'CC Color Neutralizer', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Color Offset': { name: 'CC Color Offset', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CS Kernel': { name: 'CC Kernel', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Toner': { name: 'CC Toner', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Change Color': { name: 'Change Color', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Change To Color': { name: 'Change to Color', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE CHANNEL MIXER': { name: 'Channel Mixer', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Balance 2': { name: 'Color Balance', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Balance (HLS)': { name: 'Color Balance (HLS)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Link': { name: 'Color Link', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Deflicker': { name: 'Color Stabilizer', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC Colorama': { name: 'Colorama', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE CurvesCustom': { name: 'Curves', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Equalize': { name: 'Equalize', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Exposure2': { name: 'Exposure', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Gamma/Pedestal/Gain2': { name: 'Gamma/Pedestal/Gain', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE HUE SATURATION': { name: 'Hue/Saturation', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Leave Color': { name: 'Leave Color', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Easy Levels2': { name: 'Levels', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Pro Levels2': { name: 'Levels (Individual Controls)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Lumetri': { name: 'Lumetri Color', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE PhotoFilterPS': { name: 'Photo Filter', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE PS Arbitrary Map': { name: 'PS Arbitrary Map', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE SelectiveColor': { name: 'Selective Color', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE ShadowHighlight': { name: 'Shadow/Highlight', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Tint': { name: 'Tint', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Tritone': { name: 'Tritone', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Vibrance': { name: 'Vibrance', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE BEZMESH': { name: 'Bezier Warp', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Bulge': { name: 'Bulge', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Bend It': { name: 'CC Bend It', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Bender': { name: 'CC Bender', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Blobbylize': { name: 'CC Blobbylize', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Flo Motion': { name: 'CC Flo Motion', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Griddler': { name: 'CC Griddler', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Lens': { name: 'CC Lens', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Page Turn': { name: 'CC Page Turn', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Power Pin': { name: 'CC Power Pin', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Ripple Pulse': { name: 'CC Ripple Pulse', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Slant': { name: 'CC Slant', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Smear': { name: 'CC Smear', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Split': { name: 'CC Split', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Split 2': { name: 'CC Split 2', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Tiler': { name: 'CC Tiler', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Corner Pin': { name: 'Corner Pin', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Upscale': { name: 'Detail-preserving Upscale', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Displacement Map': { name: 'Displacement Map', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE LIQUIFY': { name: 'Liquify', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Magnify': { name: 'Magnify', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE MESH WARP': { name: 'Mesh Warp', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Mirror': { name: 'Mirror', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Offset': { name: 'Offset', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Optics Compensation': { name: 'Optics Compensation', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Polar Coordinates': { name: 'Polar Coordinates', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE RESHAPE': { name: 'Reshape', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Ripple': { name: 'Ripple', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Rolling Shutter': { name: 'Rolling Shutter Repair', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE SCHMEAR': { name: 'Smear', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Spherize': { name: 'Spherize', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Geometry2': { name: 'Transform', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Turbulent Displace': { name: 'Turbulent Displace', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Twirl': { name: 'Twirl', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE WRPMESH': { name: 'Warp', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE SubspaceStabilizer': { name: 'Warp Stabilizer VFX', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Wave Warp': { name: 'Wave Warp', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Point3D Control': { name: '3D Point Control', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Angle Control': { name: 'Angle Control', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Checkbox Control': { name: 'Checkbox Control', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Control': { name: 'Color Control', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Layer Control': { name: 'Layer Control', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Point Control': { name: 'Point Control', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Slider Control': { name: 'Slider Control', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE 4ColorGradient': { name: '4-Color Gradient', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Lightning 2': { name: 'Advanced Lightning', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE AudSpect': { name: 'Audio Spectrum', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE AudWave': { name: 'Audio Waveform', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Laser': { name: 'Beam', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Glue Gun': { name: 'CC Glue Gun', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Light Burst 2.5': { name: 'CC Light Burst 2.5', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Light Rays': { name: 'CC Light Rays', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Light Sweep': { name: 'CC Light Sweep', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CS Threads': { name: 'CC Threads', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Cell Pattern': { name: 'Cell Pattern', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Checkerboard': { name: 'Checkerboard', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Circle': { name: 'Circle', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE ELLIPSE': { name: 'Ellipse', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Eyedropper Fill': { name: 'Eyedropper Fill', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Fill': { name: 'Fill', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Fractal': { name: 'Fractal', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Ramp': { name: 'Gradient Ramp', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Grid': { name: 'Grid', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Lens Flare': { name: 'Lens Flare', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Paint Bucket': { name: 'Paint Bucket', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC Radio Waves': { name: 'Radio Waves', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Scribble Fill': { name: 'Scribble', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Stroke': { name: 'Stroke', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC Vegas': { name: 'Vegas', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Write-on': { name: 'Write-on', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Spill2': { name: 'Advanced Spill Suppressor', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Simple Wire Removal': { name: 'CC Simple Wire Removal', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Difference Key': { name: 'Color Difference Key', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Range': { name: 'Color Range', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Difference Matte2': { name: 'Difference Matte', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Extract': { name: 'Extract', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE ATG Extract': { name: 'Inner/Outer Key', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE KeyCleaner': { name: 'Key Cleaner', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'Keylight 906': { name: 'Keylight (1.2)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Linear Color Key2': { name: 'Linear Color Key', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Matte Choker': { name: 'Matte Choker', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ISL MochaShapeImporter': { name: 'mocha shape', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE RefineRBMatte': { name: 'Refine Hard Matte', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE RefineMatte2': { name: 'Refine Soft Matte', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Simple Choker': { name: 'Simple Choker', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'VISINF Grain Implant': { name: 'Add Grain', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Dust & Scratches': { name: 'Dust & Scratches', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Fractal Noise': { name: 'Fractal Noise', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'VISINF Grain Duplication': { name: 'Match Grain', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Median': { name: 'Median', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Noise': { name: 'Noise', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Noise Alpha2': { name: 'Noise Alpha', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Noise HLS2': { name: 'Noise HLS', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Noise HLS Auto2': { name: 'Noise HLS Auto', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'VISINF Grain Removal': { name: 'Remove Grain', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE AIF Perlin Noise 3D': { name: 'Turbulent Noise', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Basic 3D': { name: 'Basic 3D', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Basic Text2': { name: 'Basic Text', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Key': { name: 'Color Key', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Fast Blur': { name: 'Fast Blur (Legacy)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Gaussian Blur': { name: 'Gaussian Blur (Legacy)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Lightning': { name: 'Lightning', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Luma Key': { name: 'Luma Key', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Path Text': { name: 'Path Text', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Reduce Interlace Flicker': { name: 'Reduce Interlace Flicker', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Spill Suppressor': { name: 'Spill Suppressor', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE 3D Tracker': { name: '3D Camera Tracker', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE 3D Glasses2': { name: '3D Glasses', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Bevel Alpha': { name: 'Bevel Alpha', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Bevel Edges': { name: 'Bevel Edges', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Cylinder': { name: 'CC Cylinder', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Environment': { name: 'CC Environment', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Sphere': { name: 'CC Sphere', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Spotlight': { name: 'CC Spotlight', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Drop Shadow': { name: 'Drop Shadow', messages: [
                { type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] },
                { type: bm_reportMessageTypes.WARNING, renderers: [bm_reportRendererTypes.BROWSER], builder: bm_reportBuilderTypes.FILTER_SIZE },
            ] },
        'ADBE Radial Shadow': { name: 'Radial Shadow', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC CardDanceCam': { name: 'Card Dance', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC Caustics': { name: 'Caustics', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Ball Action': { name: 'CC Ball Action', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Bubbles': { name: 'CC Bubbles', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Drizzle': { name: 'CC Drizzle', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Hair': { name: 'CC Hair', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Mr. Mercury': { name: 'CC Mr. Mercury', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Particle Systems II': { name: 'CC Particle Systems II', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Particle World': { name: 'CC Particle World', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Pixel Polly': { name: 'CC Pixel Polly', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CSRainfall': { name: 'CC Rainfall', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Scatterize': { name: 'CC Scatterize', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CSSnowfall': { name: 'CC Snowfall', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Star Burst': { name: 'CC Star Burst', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC Foam': { name: 'Foam', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Playgnd': { name: 'Particle Playground', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC Shatter': { name: 'Shatter', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC Wave World': { name: 'Wave World', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Brush Strokes': { name: 'Brush Strokes', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Cartoonify': { name: 'Cartoon', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CS BlockLoad': { name: 'CC Block Load', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Burn Film': { name: 'CC Burn Film', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Glass': { name: 'CC Glass', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CS HexTile': { name: 'CC HexTile', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Kaleida': { name: 'CC Kaleida', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Mr. Smoothie': { name: 'CC Mr. Smoothie', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Plastic': { name: 'CC Plastic', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC RepeTile': { name: 'CC RepeTile', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Threshold': { name: 'CC Threshold', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Threshold RGB': { name: 'CC Threshold RGB', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CS Vignette': { name: 'CC Vignette', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Emboss': { name: 'Color Emboss', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Emboss': { name: 'Emboss', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Find Edges': { name: 'Find Edges', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Glo2': { name: 'Glow', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Mosaic': { name: 'Mosaic', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Tile': { name: 'Motion Tile', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Posterize': { name: 'Posterize', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Roughen Edges': { name: 'Roughen Edges', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Scatter': { name: 'Scatter', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Strobe': { name: 'Strobe Light', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Texturize': { name: 'Texturize', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Threshold2': { name: 'Threshold', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'SYNTHAP CF Color Finesse 2': { name: 'SA Color Finesse 3', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Numbers2': { name: 'Numbers', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Timecode': { name: 'Timecode', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Force Motion Blur': { name: 'CC Force Motion Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Wide Time': { name: 'CC Wide Time', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Echo': { name: 'Echo', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE OFMotionBlur': { name: 'Pixel Motion Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Posterize Time': { name: 'Posterize Time', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Difference': { name: 'Time Difference', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Time Displacement': { name: 'Time Displacement', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Timewarp': { name: 'Timewarp', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Block Dissolve': { name: 'Block Dissolve', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'APC CardWipeCam': { name: 'Card Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Glass Wipe': { name: 'CC Glass Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Grid Wipe': { name: 'CC Grid Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Image Wipe': { name: 'CC Image Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Jaws': { name: 'CC Jaws', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Light Wipe': { name: 'CC Light Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CS LineSweep': { name: 'CC Line Sweep', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Radial ScaleWipe': { name: 'CC Radial ScaleWipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Scale Wipe': { name: 'CC Scale Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Twister': { name: 'CC Twister', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC WarpoMatic': { name: 'CC WarpoMatic', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Gradient Wipe': { name: 'Gradient Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE IRIS_WIPE': { name: 'Iris Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Linear Wipe': { name: 'Linear Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Radial Wipe': { name: 'Radial Wipe', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Venetian Blinds': { name: 'Venetian Blinds', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Apply Color LUT2': { name: 'Apply Color LUT', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Overbrights': { name: 'CC Overbrights', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Cineon Converter2': { name: 'Cineon Converter', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE ProfileToProfile': { name: 'Color Profile Converter', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE GROW BOUNDS': { name: 'Grow Bounds', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Compander': { name: 'HDR Compander', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE HDR ToneMap': { name: 'HDR Highlight Compression', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Paint': { name: 'Paint', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Samurai': { name: 'Roto Brush & Refine Edge', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE FreePin3': { name: 'Puppet', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE RefineMatte': { name: 'Refine Matte', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE 3D Glasses': { name: '3D Glasses (Obsolete)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Alpha Levels2': { name: 'Alpha Levels', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Alpha Levels3': { name: 'Alpha Levels', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Apply Color LUT': { name: 'Apply Color LUT', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Brightness & Contrast': { name: 'Brightness & Contrast', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Box Blur': { name: 'Box Blur', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Cineon Converter': { name: 'Cineon Converter', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Color Balance': { name: 'Color Balance', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC PS Classic': { name: 'CC PS Classic (obsolete)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC PS LE Classic': { name: 'CC PS LE Classic (obsolete)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Rain': { name: 'CC Rain', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Snow': { name: 'CC Snow', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Time Blend': { name: 'CC Time Blend', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'CC Time Blend FX': { name: 'CC Time Blend FX', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Exposure': { name: 'Exposure', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Easy Levels': { name: 'Levels', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Pro Levels': { name: 'Levels (Individual Controls)', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Noise Alpha': { name: 'Noise Alpha', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Noise HLS': { name: 'Noise HLS', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Noise HLS Auto': { name: 'Noise HLS Auto', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE PSL Bevel Emboss': { name: 'Photoshop Bevel And Emboss', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE PSL Drop Shadow': { name: 'Photoshop Drop Shadow', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE PSL Inner Glow': { name: 'Photoshop Inner Glow', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE PSL Inner Shadow': { name: 'Photoshop Inner Shadow', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE PSL Outer Glow': { name: 'Photoshop Outer Glow', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE PSL Solid Fill': { name: 'Photoshop Solid Fill', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Photo Filter': { name: 'Photo Filter', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Set Matte2': { name: 'Set Matte', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Three-Way Color Corrector': { name: 'Three-Way Color Corrector', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Threshold': { name: 'Threshold', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Geometry': { name: 'Transform', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Unsharp Mask': { name: 'Unsharp Mask', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
        'ADBE Vector Paint': { name: 'Vector Paint', messages: [{ type: bm_reportMessageTypes.ERROR, renderers: [bm_reportRendererTypes.BROWSER, bm_reportRendererTypes.IOS, bm_reportRendererTypes.ANDROID, bm_reportRendererTypes.SKOTTIE] }] },
    };

    function MessageClass() {
    }
    MessageClass.prototype.initializeMessages = function () {
        this.__messages = [];
    };
    MessageClass.prototype.addMessage = function (type, renderers, builder) {
        var reportMessageFactory = $.__bodymovin.bm_reportMessageFactory;
        if (!this.__messages) {
            this.initializeMessages();
        }
        var reportMessage = reportMessageFactory(type, renderers, builder);
        this.__messages.push(reportMessage);
    };
    MessageClass.prototype.serializeMessages = function () {
        if (!this.__messages) {
            this.initializeMessages();
        }
        var messages = [];
        for (var i = 0; i < this.__messages.length; i += 1) {
            messages.push(this.__messages[i].serialize());
        }
        return messages;
    };
    var bm_messageClassReport = MessageClass;

    function ReportMessage(type, renderers, builder) {
        this._type = type || 'warning';
        this._renderers = renderers || [];
        this._builder = builder || '';
    }
    ReportMessage.prototype.serialize = function () {
        return {
            type: this._type,
            renderers: this._renderers,
            builder: this._builder,
        };
    };
    function bm_reportMessageFactory(type, renderers, builder) {
        return new ReportMessage(type, renderers, builder);
    }

    function ReportEffectMessage(type, renderers, builderType) {
        var reportMessageFactory = $.__bodymovin.bm_reportMessageFactory;
        var builderTypes = $.__bodymovin.bm_reportBuilderTypes;
        builderType = builderType || builderTypes.EFFECTS;
        this._message = reportMessageFactory(type, renderers, builderType);
        this._effects = [];
    }
    ReportEffectMessage.prototype.addEffect = function (effect) {
        this._effects.push(effect);
    };
    ReportEffectMessage.prototype.serialize = function () {
        var messageData = this._message.serialize();
        var serializedData = {};
        for (var s in messageData) {
            if (messageData.hasOwnProperty(s)) {
                serializedData[s] = messageData[s];
            }
        }
        serializedData.payload = {
            effects: this._effects,
        };
        return serializedData;
    };
    function bm_reportEffectMessageFactory(type, renderers, effects) {
        return new ReportEffectMessage(type, renderers, effects);
    }

    function ReportAnimatorSelectorMessage(type, renderers) {
        var reportMessageFactory = $.__bodymovin.bm_reportMessageFactory;
        var builderTypes = $.__bodymovin.bm_reportBuilderTypes;
        this._message = reportMessageFactory(type, renderers, builderTypes.TEXT_SELECTOR_PROPERTIES);
        this._properties = [];
    }
    ReportAnimatorSelectorMessage.prototype.addProperty = function (property) {
        this._properties.push(property);
    };
    ReportAnimatorSelectorMessage.prototype.serialize = function () {
        var messageData = this._message.serialize();
        var serializedData = {};
        for (var s in messageData) {
            if (messageData.hasOwnProperty(s)) {
                serializedData[s] = messageData[s];
            }
        }
        serializedData.payload = {
            properties: this._properties,
        };
        return serializedData;
    };
    function bm_reportAnimatorSelectorMessageFactory(type, renderers) {
        return new ReportAnimatorSelectorMessage(type, renderers);
    }

    function ReportAnimatorMessage(type, renderers) {
        var reportMessageFactory = $.__bodymovin.bm_reportMessageFactory;
        var builderTypes = $.__bodymovin.bm_reportBuilderTypes;
        this._message = reportMessageFactory(type, renderers, builderTypes.ANIMATOR_PROPERTIES);
        this._properties = [];
    }
    ReportAnimatorMessage.prototype.addProperty = function (property) {
        this._properties.push(property);
    };
    ReportAnimatorMessage.prototype.serialize = function () {
        var messageData = this._message.serialize();
        var serializedData = {};
        for (var s in messageData) {
            if (messageData.hasOwnProperty(s)) {
                serializedData[s] = messageData[s];
            }
        }
        serializedData.payload = {
            properties: this._properties,
        };
        return serializedData;
    };
    function bm_reportAnimatorMessageFactory(type, renderers) {
        return new ReportAnimatorMessage(type, renderers);
    }

    var Gtlym = {
        CALL: {},
    };
    function random(len) {
        var sequence = 'abcdefghijklmnoqrstuvwxyz1234567890';
        var returnString = '';
        var i;
        for (i = 0; i < len; i += 1) {
            returnString += sequence.charAt(Math.floor(Math.random() * sequence.length));
        }
        return returnString;
    }
    function setTimeout(func, millis) {
        var guid = random(10);
        Gtlym.CALL["interval_" + guid] = func;
        return app.scheduleTask('$.__bodymovin.bm_generalUtils.Gtlym.CALL["interval_' + guid + '"]();', millis, false);
    }
    function roundArray(arr, decimals) {
        var i;
        var len = arr.length;
        var retArray = [];
        for (i = 0; i < len; i += 1) {
            if (typeof arr[i] === 'number') {
                retArray.push(roundNumber(arr[i], decimals));
            }
            else {
                retArray.push(roundArray(arr[i], decimals));
            }
        }
        return retArray;
    }
    function roundNumber(num, decimals) {
        num = num || 0;
        if (typeof num === 'number') {
            return parseFloat(num.toFixed(decimals));
        }
        else {
            return roundArray(num, decimals);
        }
    }
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    function arrayRgbToHex(values) {
        return rgbToHex(Math.round(values[0] * 255), Math.round(values[1] * 255), Math.round(values[2] * 255));
    }
    var iterateProperty = (function () {
        var response;
        function iterateProperties(property, ob) {
            ob.name = property.name;
            ob.matchName = property.matchName;
            if (property.numProperties) {
                ob.properties = [];
                var i = 0;
                var len = property.numProperties;
                while (i < len) {
                    var propertyOb = {};
                    ob.properties.push(propertyOb);
                    iterateProperties(property(i + 1), propertyOb);
                    i++;
                }
            }
            else {
                if (property.propertyValueType !== PropertyValueType.NO_VALUE && property.value !== undefined) {
                    ob.value = property.value.toString();
                }
                else {
                    ob.value = '--- No Value: ---';
                }
            }
        }
        return function (property) {
            response = {};
            iterateProperties(property, response);
            bm_eventDispatcher.sendEvent('console:log', response);
        };
    }());
    function iterateOwnProperties(property) {
        var propsArray = [];
        for (var s in property) {
            if (property.hasOwnProperty(s)) {
                propsArray.push(s);
            }
        }
        bm_eventDispatcher.log(propsArray);
    }
    function convertPathsToAbsoluteValues(ks) {
        var i, len;
        if (ks.i) {
            len = ks.i.length;
            for (i = 0; i < len; i += 1) {
                ks.i[i][0] += ks.v[i][0];
                ks.i[i][1] += ks.v[i][1];
                ks.o[i][0] += ks.v[i][0];
                ks.o[i][1] += ks.v[i][1];
            }
        }
        else {
            len = ks.length;
            for (i = 0; i < len - 1; i += 1) {
                convertPathsToAbsoluteValues(ks[i].s[0]);
                convertPathsToAbsoluteValues(ks[i].e[0]);
            }
        }
    }
    function findAttributes(name) {
        var ob = {
            ln: null,
            cl: '',
            tg: '',
        };
        var regexElem = /[\.|#][a-zA-Z0-9\-_]*/g;
        var match;
        var firstChar;
        var matchString;
        while ((match = regexElem.exec(name))) {
            matchString = match[0];
            firstChar = matchString.substring(0, 1);
            if (firstChar === '#') {
                ob.ln = matchString.substring(1);
            }
            else {
                ob.cl += ob.cl === '' ? '' : ' ';
                ob.cl += matchString.substring(1);
            }
        }
        regexElem = /<([a-zA-Z0-9\-_]*)>/g;
        while ((match = regexElem.exec(name))) {
            bm_eventDispatcher.log('FOUND');
            bm_eventDispatcher.log(match[1]);
            ob.tg = match[1];
        }
        return ob;
    }
    function extendPrototype(destination, origin) {
        for (var s in origin.prototype) {
            if (origin.prototype.hasOwnProperty(s)) {
                destination.prototype[s] = origin.prototype[s];
            }
        }
    }
    function sanitizeName(name) {
        var i;
        var len = name.length;
        var finalString = '';
        for (i = 0; i < len; i += 1) {
            var charCode = name.charCodeAt(i);
            try {
                if (charCode >= 0xD800 && charCode <= 0xDBFF) {
                    var nextCharCode = name.charCodeAt(i + 1);
                    if (nextCharCode >= 0xDC00 && nextCharCode <= 0xDFFF) {
                        finalString += name.charAt(i);
                    }
                    else {
                    }
                }
                else {
                    finalString += name.charAt(i);
                }
            }
            catch (error) {
                finalString += name.charAt(i);
            }
        }
        return finalString;
    }
    function trimText(text) {
        return text.replace(/^\s+|\s+$/g, '');
    }
    function cloneObject(ob, shallow) {
        if (shallow === undefined) {
            shallow = true;
        }
        var clone = {};
        for (var s in ob) {
            if (ob.hasOwnProperty(s)) {
                if (typeof s === 'object' && !shallow) {
                    clone[s] = cloneObject(ob[s], shallow);
                }
                else {
                    clone[s] = ob[s];
                }
            }
        }
        return clone;
    }
    var bm_generalUtils = {
        random: random,
        setTimeout: setTimeout,
        roundArray: roundArray,
        roundNumber: roundNumber,
        arrayRgbToHex: arrayRgbToHex,
        iterateProperty: iterateProperty,
        iterateOwnProperties: iterateOwnProperties,
        convertPathsToAbsoluteValues: convertPathsToAbsoluteValues,
        findAttributes: findAttributes,
        extendPrototype: extendPrototype,
        sanitizeName: sanitizeName,
        trimText: trimText,
        cloneObject: cloneObject,
        Gtlym: Gtlym,
    };

    function Property(property) {
        this.property = property;
        this.process();
    }
    bm_generalUtils.extendPrototype(Property, bm_messageClassReport);
    Property.prototype.processExpressions = function () {
        var rendererTypes = $.__bodymovin.bm_reportRendererTypes;
        var builderTypes = $.__bodymovin.bm_reportBuilderTypes;
        var messageTypes = $.__bodymovin.bm_reportMessageTypes;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var property = this.property;
        if (property.expressionEnabled && !property.expressionError && !settingsHelper.shouldBakeExpressions()) {
            this.addMessage(messageTypes.ERROR, [
                rendererTypes.SKOTTIE,
                rendererTypes.IOS,
                rendererTypes.ANDROID,
            ], builderTypes.EXPRESSIONS);
            if (property.expression.indexOf('wiggle(') !== -1) {
                this.addMessage(messageTypes.ERROR, [
                    rendererTypes.BROWSER,
                    rendererTypes.SKOTTIE,
                    rendererTypes.IOS,
                    rendererTypes.ANDROID,
                ], builderTypes.WIGGLE);
            }
        }
    };
    Property.prototype.areValuesEqual = function (value1, value2) {
        if (typeof value1 === 'number') {
            return value1 === value2;
        }
        else if (value1.length) {
            for (var i = 0; i < value1.length; i += 1) {
                if (value1[i] !== value2[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Property.prototype.checkModifiedValue = function (value) {
        if (!this.areValuesEqual(this.property.value, value)
            || this.property.numKeys > 1
            || (this.property.expressionEnabled && !this.property.expressionError)) {
            return true;
        }
        else {
            return false;
        }
    };
    Property.prototype.process = function () {
        this.processExpressions();
    };
    Property.prototype.serialize = function () {
        return this.serializeMessages();
    };
    function bm_propertyReport(property) {
        return new Property(property);
    }

    function Position(transform, isThreeD) {
        this.transform = transform;
        this.isThreeD = isThreeD;
        this.process();
    }
    bm_generalUtils.extendPrototype(Position, bm_messageClassReport);
    Position.prototype.processExpressions = function () {
    };
    Position.prototype.process = function () {
        var propertyReport = $.__bodymovin.bm_propertyReport;
        if (this.transform.position.dimensionsSeparated) {
            this.px = propertyReport(this.transform.property('ADBE Position_0'));
            this.py = propertyReport(this.transform.property('ADBE Position_1'));
            if (this.isThreeD) {
                this.pz = propertyReport(this.transform.property('ADBE Position_2'));
            }
        }
        else {
            this.p = propertyReport(this.transform.position);
        }
    };
    Position.prototype.serialize = function () {
        if (this.transform.position.dimensionsSeparated) {
            return {
                dimensionsSeparated: true,
                positionX: this.px.serialize(),
                positionY: this.py.serialize(),
                positionZ: this.isThreeD ? this.pz.serialize() : undefined,
            };
        }
        else {
            return {
                dimensionsSeparated: false,
                position: this.p.serialize(),
            };
        }
    };
    function bm_positionReport(property, isThreeD) {
        return new Position(property, isThreeD);
    }

    function Rotation(transform, isThreeD) {
        this.transform = transform;
        this.isThreeDimensional = isThreeD;
        this.process();
    }
    bm_generalUtils.extendPrototype(Rotation, bm_messageClassReport);
    Rotation.prototype.processExpressions = function () {
    };
    Rotation.prototype.process = function () {
        var propertyReport = $.__bodymovin.bm_propertyReport;
        if (this.isThreeDimensional) {
            this.rx = propertyReport(this.transform.property('ADBE Rotate X'));
            this.ry = propertyReport(this.transform.property('ADBE Rotate Y'));
            this.rz = propertyReport(this.transform.property('ADBE Rotate Z'));
            this.or = propertyReport(this.transform.Orientation);
        }
        else {
            this.r = propertyReport(this.transform.rotation);
        }
    };
    Rotation.prototype.serialize = function () {
        if (this.isThreeDimensional) {
            return {
                isThreeD: true,
                rotationX: this.rx.serialize(),
                rotationY: this.ry.serialize(),
                rotationZ: this.rz.serialize(),
                orientation: this.or.serialize(),
            };
        }
        else {
            return {
                isThreeD: false,
                rotation: this.r.serialize(),
            };
        }
    };
    function bm_rotationReport(property, isThreeD) {
        return new Rotation(property, isThreeD);
    }

    function Transform(transform, isThreeD) {
        this.transform = transform;
        this.isThreeD = isThreeD || false;
        this.process();
    }
    Transform.prototype.processProperties = function () {
        var propertyReport = $.__bodymovin.bm_propertyReport;
        var positionReport = $.__bodymovin.bm_positionReport;
        var rotationReport = $.__bodymovin.bm_rotationReport;
        if (this.transform.Scale) {
            this.scale = propertyReport(this.transform.Scale);
        }
        if (this.transform.Opacity) {
            this.opacity = propertyReport(this.transform.Opacity);
        }
        if (this.transform.property('Start Opacity')) {
            this.startOpacity = propertyReport(this.transform.property('Start Opacity'));
        }
        if (this.transform.property('End Opacity')) {
            this.endOpacity = propertyReport(this.transform.property('End Opacity'));
        }
        if (this.transform.property('Anchor Point')) {
            this.anchorPoint = propertyReport(this.transform.property('Anchor Point'));
        }
        this.rotation = rotationReport(this.transform, this.isThreeD);
        this.position = positionReport(this.transform, this.isThreeD);
        if (this.transform.property('Skew') && this.transform.property('Skew').canSetExpression) {
            this.skew = propertyReport(this.transform.property('Skew'));
            this.skewAxis = propertyReport(this.transform.property('Skew Axis'));
        }
    };
    Transform.prototype.process = function () {
        this.processProperties();
    };
    Transform.prototype.serialize = function () {
        return {
            anchorPoint: this.anchorPoint ? this.anchorPoint.serialize() : undefined,
            scale: this.scale ? this.scale.serialize() : undefined,
            opacity: this.opacity ? this.opacity.serialize() : undefined,
            rotation: this.rotation ? this.rotation.serialize() : undefined,
            position: this.position.serialize(),
            skew: this.skew ? this.skew.serialize() : undefined,
            skewAxis: this.skewAxis ? this.skewAxis.serialize() : undefined,
            startOpacity: this.startOpacity ? this.startOpacity.serialize() : undefined,
            endOpacity: this.endOpacity ? this.endOpacity.serialize() : undefined,
        };
    };
    function bm_transformReportFactory(transform, isThreeD) {
        return new Transform(transform, isThreeD);
    }

    var skippedEffectMatchNames = {
        'ADBE Effect Built In Params': 'ADBE Effect Built In Params',
        'Pseudo/Bodymovin Text Props 3': 'Pseudo/Bodymovin Text Props 3',
    };
    var supportedEffects = [
        'ADBE Tint',
        'ADBE Fill',
        'ADBE Stroke',
        'ADBE Tritone',
        'ADBE Pro Levels2',
        'ADBE Drop Shadow',
        'ADBE Set Matte3',
        'ADBE Gaussian Blur 2',
    ];
    function Effects(effects) {
        this.effectsProperty = effects;
        this.messages = [];
        this._addedEffects = [];
        this.process();
    }
    Effects.prototype.getMessageByTypeAndRenderers = function (type, renderers, builder) {
        var effectMessageFactory = $.__bodymovin.bm_reportEffectMessageFactory;
        var key = type + '_' + renderers.join('-');
        for (var i = 0; i < this.messages.length; i += 1) {
            if (this.messages[i].key === key) {
                return this.messages[i].message;
            }
        }
        var message = {
            key: key,
            message: effectMessageFactory(type, renderers, builder),
        };
        this.messages.push(message);
        return message.message;
    };
    Effects.prototype.addEffect = function (effectData) {
        var messages = effectData.messages;
        var messageData;
        for (var i = 0; i < messages.length; i += 1) {
            messageData = messages[i];
            var message = this.getMessageByTypeAndRenderers(messageData.type, messageData.renderers, messageData.builder);
            message.addEffect(effectData.name);
        }
    };
    Effects.prototype.process = function () {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var effectsMessages = $.__bodymovin.bm_reportsEffectMessages;
        for (var i = 0; i < this.effectsProperty.numProperties; i += 1) {
            var effectElement = this.effectsProperty(i + 1);
            bm_eventDispatcher.log('effectElement.matchName');
            bm_eventDispatcher.log(effectElement.matchName);
            if (effectElement.enabled && !skippedEffectMatchNames[effectElement.matchName]) {
                if (effectsMessages[effectElement.matchName]) {
                    this.addEffect(effectsMessages[effectElement.matchName]);
                }
                else {
                    this.addUnhandledEffect(effectElement);
                }
                this.checkSupportedEffects(effectElement.matchName);
            }
        }
    };
    Effects.prototype.checkSupportedEffects = function (effectName) {
        for (var i = 0; i < supportedEffects.length; i += 1) {
            if (supportedEffects[i] === effectName) {
                this._addedEffects.push(effectName);
            }
        }
    };
    Effects.prototype.hasSupportedEffects = function () {
        return this._addedEffects.length > 0;
    };
    Effects.prototype.addUnhandledEffect = function (effect) {
        var rendererTypes = $.__bodymovin.bm_reportRendererTypes;
        var messageTypes = $.__bodymovin.bm_reportMessageTypes;
        var message = this.getMessageByTypeAndRenderers(messageTypes.ERROR, [
            rendererTypes.BROWSER,
            rendererTypes.IOS,
            rendererTypes.ANDROID,
            rendererTypes.SKOTTIE,
        ]);
        message.addEffect(effect.name);
    };
    Effects.prototype.serialize = function () {
        if (this.messages.length === 0) {
            return undefined;
        }
        else {
            var messages = [];
            for (var i = 0; i < this.messages.length; i += 1) {
                messages.push(this.messages[i].message.serialize());
            }
            return messages;
        }
    };
    function bm_effectsReportFactory(effects) {
        return new Effects(effects);
    }

    function Masks(maskElements) {
        this.maskElements = maskElements;
        this.masks = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(Masks, bm_messageClassReport);
    Masks.prototype.process = function () {
        var maskReportFactory = $.__bodymovin.bm_maskReportFactory;
        var maskElement;
        for (var i = 0; i < this.maskElements.numProperties; i += 1) {
            maskElement = this.maskElements(i + 1);
            this.masks.push(maskReportFactory(maskElement));
        }
    };
    Masks.prototype.serialize = function () {
        var serializedMasks = [];
        for (var i = 0; i < this.masks.length; i += 1) {
            serializedMasks.push(this.masks[i].serialize());
        }
        return {
            messages: this.serializeMessages(),
            masks: serializedMasks,
        };
    };
    function bm_masksReportFactory(maskElements) {
        return new Masks(maskElements);
    }

    function Mask(mask) {
        this.mask = mask;
        this.process();
    }
    bm_generalUtils.extendPrototype(Mask, bm_messageClassReport);
    Mask.prototype.process = function () {
        this.processProperties();
        this.processMode();
    };
    Mask.prototype.processMode = function () {
        var mode = getMaskType(this.mask.maskMode);
        if (mode === maskTypes.DARKEN || mode === maskTypes.LIGHTEN) {
            this.addMessage(bm_reportMessageTypes.ERROR, [
                bm_reportRendererTypes.BROWSER,
                bm_reportRendererTypes.SKOTTIE,
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.UNSUPPORTED_MASK_MODE);
        }
    };
    Mask.prototype.processProperties = function () {
        var opacityProperty = this.mask.property('Mask Opacity');
        this.opacity = bm_propertyReport(opacityProperty);
        if (this.opacity.checkModifiedValue(100)) {
            this.opacity.addMessage(bm_reportMessageTypes.ERROR, [
                bm_reportRendererTypes.SKOTTIE,
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.UNSUPPORTED_PROPERTY);
        }
        this.expansion = bm_propertyReport(this.mask.property('Mask Expansion'));
        if (this.expansion.checkModifiedValue(0)) {
            this.expansion.addMessage(bm_reportMessageTypes.ERROR, [
                bm_reportRendererTypes.SKOTTIE,
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.UNSUPPORTED_PROPERTY);
        }
        this.feather = bm_propertyReport(this.mask.property('Mask Feather'));
        if (this.feather.checkModifiedValue([0, 0])) {
            this.feather.addMessage(bm_reportMessageTypes.ERROR, [
                bm_reportRendererTypes.BROWSER,
                bm_reportRendererTypes.SKOTTIE,
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.UNSUPPORTED_PROPERTY);
        }
        this.path = bm_propertyReport(this.mask.property('maskShape'));
    };
    Mask.prototype.serialize = function () {
        return {
            name: this.mask.name,
            messages: this.serializeMessages(),
            opacity: this.opacity.serialize(),
            expansion: this.expansion.serialize(),
            feather: this.feather.serialize(),
            path: this.path.serialize(),
        };
    };
    function bm_maskReportFactory(mask) {
        return new Mask(mask);
    }

    function Stroke$1(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(Stroke$1, bm_messageClassReport);
    Stroke$1.prototype.processProperties = function () {
        this.color = bm_propertyReport(this.style.property('frameFX/color'));
        this.size = bm_propertyReport(this.style.property('frameFX/size'));
        this.blendMode = bm_propertyReport(this.style.property('frameFX/mode2'));
        this.opacity = bm_propertyReport(this.style.property('frameFX/opacity'));
        this.position = bm_propertyReport(this.style.property('frameFX/style'));
    };
    Stroke$1.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    Stroke$1.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    Stroke$1.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.stroke,
            messages: this.serializeMessages(),
            color: this.color.serialize(),
            size: this.size.serialize(),
            blendMode: this.blendMode.serialize(),
            opacity: this.opacity.serialize(),
            position: this.position.serialize(),
        };
    };
    function bm_layerStylesStrokeFactory(style) {
        return new Stroke$1(style);
    }

    function DropShadow(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(DropShadow, bm_messageClassReport);
    DropShadow.prototype.processProperties = function () {
        this.color = bm_propertyReport(this.style.property('dropShadow/color'));
        this.opacity = bm_propertyReport(this.style.property('dropShadow/opacity'));
        this.angle = bm_propertyReport(this.style.property('dropShadow/localLightingAngle'));
        this.size = bm_propertyReport(this.style.property('dropShadow/blur'));
        this.distance = bm_propertyReport(this.style.property('dropShadow/distance'));
        this.spread = bm_propertyReport(this.style.property('dropShadow/chokeMatte'));
        this.blendMode = bm_propertyReport(this.style.property('dropShadow/mode2'));
        this.noise = bm_propertyReport(this.style.property('dropShadow/noise'));
        this.knocksOut = bm_propertyReport(this.style.property('dropShadow/layerConceals'));
    };
    DropShadow.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    DropShadow.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    DropShadow.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.dropShadow,
            messages: this.serializeMessages(),
            color: this.color.serialize(),
            opacity: this.opacity.serialize(),
            angle: this.angle.serialize(),
            size: this.size.serialize(),
            distance: this.distance.serialize(),
            spread: this.spread.serialize(),
            blendMode: this.blendMode.serialize(),
            noise: this.noise.serialize(),
            knocksOut: this.knocksOut.serialize(),
        };
    };
    function bm_layerStylesDropShadowFactory(style) {
        return new DropShadow(style);
    }

    function InnerShadow(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(InnerShadow, bm_messageClassReport);
    InnerShadow.prototype.processProperties = function () {
        this.blendMode = bm_propertyReport(this.style.property('innerShadow/mode2'));
        this.color = bm_propertyReport(this.style.property('innerShadow/color'));
        this.opacity = bm_propertyReport(this.style.property('innerShadow/opacity'));
        this.globalLight = bm_propertyReport(this.style.property('innerShadow/useGlobalAngle'));
        this.angle = bm_propertyReport(this.style.property('innerShadow/localLightingAngle'));
        this.distance = bm_propertyReport(this.style.property('innerShadow/distance'));
        this.choke = bm_propertyReport(this.style.property('innerShadow/chokeMatte'));
        this.size = bm_propertyReport(this.style.property('innerShadow/size'));
        this.noise = bm_propertyReport(this.style.property('innerShadow/noise'));
    };
    InnerShadow.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    InnerShadow.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    InnerShadow.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.innerShadow,
            messages: this.serializeMessages(),
            blendMode: this.blendMode.serialize(),
            color: this.color.serialize(),
            opacity: this.opacity.serialize(),
            globalLight: this.globalLight.serialize(),
            angle: this.angle.serialize(),
            distance: this.distance.serialize(),
            choke: this.choke.serialize(),
            size: this.size.serialize(),
            noise: this.noise.serialize(),
        };
    };
    function bm_layerStylesInnerShadowFactory(style) {
        return new InnerShadow(style);
    }

    function OuterGlow(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(OuterGlow, bm_messageClassReport);
    OuterGlow.prototype.processProperties = function () {
        this.blendMode = bm_propertyReport(this.style.property('outerGlow/mode2'));
        this.opacity = bm_propertyReport(this.style.property('outerGlow/opacity'));
        this.noise = bm_propertyReport(this.style.property('outerGlow/noise'));
        this.colorChoice = bm_propertyReport(this.style.property('outerGlow/AEColorChoice'));
        this.color = bm_propertyReport(this.style.property('outerGlow/color'));
        this.gradient = bm_propertyReport(this.style.property('outerGlow/gradient'));
        this.gradientSmoothness = bm_propertyReport(this.style.property('outerGlow/gradientSmoothness'));
        this.glowTechnique = bm_propertyReport(this.style.property('outerGlow/glowTechnique'));
        this.chokeMatte = bm_propertyReport(this.style.property('outerGlow/chokeMatte'));
        this.blur = bm_propertyReport(this.style.property('outerGlow/blur'));
        this.inputRange = bm_propertyReport(this.style.property('outerGlow/inputRange'));
        this.shadingNoise = bm_propertyReport(this.style.property('outerGlow/shadingNoise'));
    };
    OuterGlow.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    OuterGlow.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    OuterGlow.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.outerGlow,
            messages: this.serializeMessages(),
            blendMode: this.blendMode.serialize(),
            opacity: this.opacity.serialize(),
            noise: this.noise.serialize(),
            colorChoice: this.colorChoice.serialize(),
            color: this.color.serialize(),
            gradient: this.gradient.serialize(),
            gradientSmoothness: this.gradientSmoothness.serialize(),
            glowTechnique: this.glowTechnique.serialize(),
            chokeMatte: this.chokeMatte.serialize(),
            blur: this.blur.serialize(),
            inputRange: this.inputRange.serialize(),
            shadingNoise: this.shadingNoise.serialize(),
        };
    };
    function bm_layerStylesOuterGlowFactory(style) {
        return new OuterGlow(style);
    }

    function InnerGlow(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(InnerGlow, bm_messageClassReport);
    InnerGlow.prototype.processProperties = function () {
        this.blendMode = bm_propertyReport(this.style.property('innerGlow/mode2'));
        this.opacity = bm_propertyReport(this.style.property('innerGlow/opacity'));
        this.noise = bm_propertyReport(this.style.property('innerGlow/noise'));
        this.colorChoice = bm_propertyReport(this.style.property('innerGlow/AEColorChoice'));
        this.color = bm_propertyReport(this.style.property('innerGlow/color'));
        this.gradient = bm_propertyReport(this.style.property('innerGlow/gradient'));
        this.gradientSmoothness = bm_propertyReport(this.style.property('innerGlow/gradientSmoothness'));
        this.glowTechnique = bm_propertyReport(this.style.property('innerGlow/glowTechnique'));
        this.source = bm_propertyReport(this.style.property('innerGlow/innerGlowSource'));
        this.chokeMatte = bm_propertyReport(this.style.property('innerGlow/chokeMatte'));
        this.blur = bm_propertyReport(this.style.property('innerGlow/blur'));
        this.inputRange = bm_propertyReport(this.style.property('innerGlow/inputRange'));
        this.shadingNoise = bm_propertyReport(this.style.property('innerGlow/shadingNoise'));
    };
    InnerGlow.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    InnerGlow.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    InnerGlow.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.innerGlow,
            messages: this.serializeMessages(),
            blendMode: this.blendMode.serialize(),
            opacity: this.opacity.serialize(),
            noise: this.noise.serialize(),
            colorChoice: this.colorChoice.serialize(),
            color: this.color.serialize(),
            gradient: this.gradient.serialize(),
            gradientSmoothness: this.gradientSmoothness.serialize(),
            glowTechnique: this.glowTechnique.serialize(),
            source: this.source.serialize(),
            chokeMatte: this.chokeMatte.serialize(),
            blur: this.blur.serialize(),
            inputRange: this.inputRange.serialize(),
            shadingNoise: this.shadingNoise.serialize(),
        };
    };
    function bm_layerStylesInnerGlowFactory(style) {
        return new InnerGlow(style);
    }

    function BevelEmboss(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(BevelEmboss, bm_messageClassReport);
    BevelEmboss.prototype.processProperties = function () {
    };
    BevelEmboss.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.SKOTTIE,
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    BevelEmboss.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    BevelEmboss.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.bevelEmboss,
            messages: this.serializeMessages(),
        };
    };
    function bm_layerStylesBevelEmbossFactory(style) {
        return new BevelEmboss(style);
    }

    function Satin(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(Satin, bm_messageClassReport);
    Satin.prototype.processProperties = function () {
    };
    Satin.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.SKOTTIE,
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    Satin.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    Satin.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.satin,
            messages: this.serializeMessages(),
        };
    };
    function bm_layerStylesSatinFactory(style) {
        return new Satin(style);
    }

    function ColorOverlay(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(ColorOverlay, bm_messageClassReport);
    ColorOverlay.prototype.processProperties = function () {
    };
    ColorOverlay.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.SKOTTIE,
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    ColorOverlay.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    ColorOverlay.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.colorOverlay,
            messages: this.serializeMessages(),
        };
    };
    function bm_layerStylesColorOverlayFactory(style) {
        return new ColorOverlay(style);
    }

    function GradientOverlay(style) {
        this.style = style;
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(GradientOverlay, bm_messageClassReport);
    GradientOverlay.prototype.processProperties = function () {
    };
    GradientOverlay.prototype.processStyle = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.SKOTTIE,
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNSUPPORTED_STYLE);
    };
    GradientOverlay.prototype.process = function () {
        this.processProperties();
        this.processStyle();
    };
    GradientOverlay.prototype.serialize = function () {
        return {
            name: this.style.name,
            type: layerStyleTypes.gradientOverlay,
            messages: this.serializeMessages(),
        };
    };
    function bm_layerStylesGradientOverlayFactory(style) {
        return new GradientOverlay(style);
    }

    function LayerStyles(styles) {
        this.stylesProperty = styles;
        this.styles = [];
        this.messages = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(LayerStyles, bm_messageClassReport);
    function buildStyleReport(type, style) {
        var layerStyleTypes = $.__bodymovin.layerStyleTypes;
        var styleTypesFactories = {};
        styleTypesFactories[layerStyleTypes.stroke] = $.__bodymovin.bm_layerStylesStrokeFactory;
        styleTypesFactories[layerStyleTypes.dropShadow] = $.__bodymovin.bm_layerStylesDropShadowFactory;
        styleTypesFactories[layerStyleTypes.innerShadow] = $.__bodymovin.bm_layerStylesInnerShadowFactory;
        styleTypesFactories[layerStyleTypes.outerGlow] = $.__bodymovin.bm_layerStylesOuterGlowFactory;
        styleTypesFactories[layerStyleTypes.innerGlow] = $.__bodymovin.bm_layerStylesInnerGlowFactory;
        styleTypesFactories[layerStyleTypes.bevelEmboss] = $.__bodymovin.bm_layerStylesBevelEmbossFactory;
        styleTypesFactories[layerStyleTypes.satin] = $.__bodymovin.bm_layerStylesSatinFactory;
        styleTypesFactories[layerStyleTypes.colorOverlay] = $.__bodymovin.bm_layerStylesColorOverlayFactory;
        styleTypesFactories[layerStyleTypes.gradientOverlay] = $.__bodymovin.bm_layerStylesGradientOverlayFactory;
        return styleTypesFactories[type](style);
    }
    LayerStyles.prototype.process = function () {
        var getStyleType = $.__bodymovin.getLayerStyleType;
        var styleElement;
        var styleType;
        for (var i = 0; i < this.stylesProperty.numProperties; i += 1) {
            styleElement = this.stylesProperty(i + 1);
            styleType = getStyleType(styleElement.matchName);
            if (styleElement.enabled && styleType !== '') {
                this.styles.push(buildStyleReport(styleType, styleElement));
            }
        }
    };
    LayerStyles.prototype.serialize = function () {
        var styles = [];
        for (var i = 0; i < this.styles.length; i += 1) {
            styles.push(this.styles[i].serialize());
        }
        return {
            messages: this.serializeMessages(),
            styles: styles,
        };
    };
    function bm_layerStylesReportFactory(styles) {
        return new LayerStyles(styles);
    }

    function Unhandled(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Unhandled, bm_messageClassReport);
    Unhandled.prototype.process = function () {
        var renderers = [];
        for (var s in bm_reportRendererTypes) {
            if (bm_reportRendererTypes.hasOwnProperty(s)) {
                renderers.push(bm_reportRendererTypes[s]);
            }
        }
        this.addMessage(bm_reportMessageTypes.WARNING, renderers, bm_reportBuilderTypes.UNHANDLED_SHAPE_PROPERTY);
    };
    Unhandled.prototype.serialize = function () {
        return {
            type: 'un',
            name: this.element.name,
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeUnhandledReport(element) {
        return new Unhandled(element);
    }

    function Rect(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Rect, bm_messageClassReport);
    Rect.prototype.processProperties = function () {
        this.size = bm_propertyReport(this.element.property('Size'));
        this.position = bm_propertyReport(this.element.property('Position'));
        this.roundness = bm_propertyReport(this.element.property('Roundness'));
    };
    Rect.prototype.process = function () {
        this.processProperties();
    };
    Rect.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.rect,
            properties: {
                Size: this.size.serialize(),
                Position: this.position.serialize(),
                Roundness: this.roundness.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeRectReport(element) {
        return new Rect(element);
    }

    function Ellipse(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Ellipse, bm_messageClassReport);
    Ellipse.prototype.processProperties = function () {
        this.size = bm_propertyReport(this.element.property('Size'));
        this.position = bm_propertyReport(this.element.property('Position'));
    };
    Ellipse.prototype.process = function () {
        this.processProperties();
    };
    Ellipse.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.ellipse,
            properties: {
                Size: this.size.serialize(),
                Position: this.position.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeEllipseReport(element) {
        return new Ellipse(element);
    }

    function Star(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Star, bm_messageClassReport);
    Star.prototype.processProperties = function () {
        this.points = bm_propertyReport(this.element.property('Points'));
        this.position = bm_propertyReport(this.element.property('Position'));
        this.rotation = bm_propertyReport(this.element.property('Rotation'));
        this.outerRadius = bm_propertyReport(this.element.property('Outer Radius'));
        this.outerRoundness = bm_propertyReport(this.element.property('Outer Roundness'));
        var type = this.element.property('Type').value;
        if (type === 1) {
            this.innerRadius = bm_propertyReport(this.element.property('Inner Radius'));
            this.innerRoundness = bm_propertyReport(this.element.property('Inner Roundness'));
        }
    };
    Star.prototype.process = function () {
        this.processProperties();
    };
    Star.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.star,
            properties: {
                Points: this.points.serialize(),
                Position: this.position.serialize(),
                Rotation: this.rotation.serialize(),
                'Outer Radius': this.outerRadius.serialize(),
                'Outer Roundness': this.outerRoundness.serialize(),
                'Inner Radius': this.innerRadius ? this.innerRadius.serialize() : undefined,
                'Inner Roundness': this.innerRoundness ? this.innerRoundness.serialize() : undefined,
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeStarReport(element) {
        return new Star(element);
    }

    function Shape$1(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Shape$1, bm_messageClassReport);
    Shape$1.prototype.processProperties = function () {
        this.path = bm_propertyReport(this.element.property('Path'));
    };
    Shape$1.prototype.process = function () {
        this.processProperties();
    };
    Shape$1.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.shape,
            properties: {
                Path: this.path.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeShapeReport(element) {
        return new Shape$1(element);
    }

    function Stroke(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Stroke, bm_messageClassReport);
    Stroke.prototype.processProperties = function () {
        this.color = bm_propertyReport(this.element.property('Color'));
        this.opacity = bm_propertyReport(this.element.property('Opacity'));
        this.strokeWidth = bm_propertyReport(this.element.property('Stroke Width'));
    };
    Stroke.prototype.process = function () {
        this.processProperties();
    };
    Stroke.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.stroke,
            properties: {
                Color: this.color.serialize(),
                Opacity: this.opacity.serialize(),
                'Stroke Width': this.strokeWidth.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeStrokeReport(element) {
        return new Stroke(element);
    }

    function Fill(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Fill, bm_messageClassReport);
    Fill.prototype.processProperties = function () {
        this.color = bm_propertyReport(this.element.property('Color'));
        this.opacity = bm_propertyReport(this.element.property('Opacity'));
    };
    Fill.prototype.process = function () {
        this.processProperties();
    };
    Fill.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.fill,
            properties: {
                Color: this.color.serialize(),
                Opacity: this.opacity.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeFillReport(element) {
        return new Fill(element);
    }

    function GradientFill(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(GradientFill, bm_messageClassReport);
    GradientFill.prototype.processProperties = function () {
        this.startPoint = bm_propertyReport(this.element.property('Start Point'));
        this.endPoint = bm_propertyReport(this.element.property('End Point'));
        this.opacity = bm_propertyReport(this.element.property('Opacity'));
        var type = this.element.property('Type').value;
        if (type === 2) {
            this.highlightLength = bm_propertyReport(this.element.property('Highlight Length'));
            this.highlightAngle = bm_propertyReport(this.element.property('Highlight Angle'));
        }
    };
    GradientFill.prototype.process = function () {
        this.processProperties();
    };
    GradientFill.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.gfill,
            properties: {
                'Start Point': this.startPoint.serialize(),
                'End Point': this.endPoint.serialize(),
                'Highlight Length': this.highlightLength ? this.highlightLength.serialize() : undefined,
                'Highlight Angle': this.highlightAngle ? this.highlightAngle.serialize() : undefined,
                Opacity: this.opacity.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeGradientFillReport(element) {
        return new GradientFill(element);
    }

    function GradientStroke(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(GradientStroke, bm_messageClassReport);
    GradientStroke.prototype.processProperties = function () {
        this.startPoint = bm_propertyReport(this.element.property('Start Point'));
        this.endPoint = bm_propertyReport(this.element.property('End Point'));
        this.opacity = bm_propertyReport(this.element.property('Opacity'));
        this.strokeWidth = bm_propertyReport(this.element.property('Stroke Width'));
        this.miterLimit = bm_propertyReport(this.element.property('Miter Limit'));
        var type = this.element.property('Type').value;
        if (type === 2) {
            this.highlightLength = bm_propertyReport(this.element.property('Highlight Length'));
            this.highlightAngle = bm_propertyReport(this.element.property('Highlight Angle'));
        }
    };
    GradientStroke.prototype.process = function () {
        this.processProperties();
    };
    GradientStroke.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.gStroke,
            properties: {
                'Stroke Width': this.strokeWidth.serialize(),
                'Miter Limit': this.miterLimit.serialize(),
                'Start Point': this.startPoint.serialize(),
                'End Point': this.endPoint.serialize(),
                'Highlight Length': this.highlightLength ? this.highlightLength.serialize() : undefined,
                'Highlight Angle': this.highlightAngle ? this.highlightAngle.serialize() : undefined,
                Opacity: this.opacity.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeGradientStrokeReport(element) {
        return new GradientStroke(element);
    }

    function MergePaths(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(MergePaths, bm_messageClassReport);
    MergePaths.prototype.processProperties = function () {
    };
    MergePaths.prototype.process = function () {
        var mergeType = this.element.property('ADBE Vector Merge Type').value;
        var renderers = [];
        for (var s in bm_reportRendererTypes) {
            if (bm_reportRendererTypes.hasOwnProperty(s)) {
                renderers.push(bm_reportRendererTypes[s]);
            }
        }
        if (mergeType === 4) ;
        else {
            this.addMessage(bm_reportMessageTypes.ERROR, renderers, bm_reportBuilderTypes.MERGE_PATHS);
        }
    };
    MergePaths.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.merge,
            messages: this.serializeMessages(),
            properties: {},
        };
    };
    function bm_shapeMergePathsReport(element) {
        return new MergePaths(element);
    }

    function Repeater(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Repeater, bm_messageClassReport);
    Repeater.prototype.processProperties = function () {
        this.transform = bm_transformReportFactory(this.element.property('Transform'), false);
        this.copies = bm_propertyReport(this.element.property('Copies'));
        this.offset = bm_propertyReport(this.element.property('Offset'));
    };
    Repeater.prototype.process = function () {
        this.processProperties();
    };
    Repeater.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.repeater,
            copies: this.copies.serialize(),
            offset: this.offset.serialize(),
            transform: this.transform.serialize(),
        };
    };
    function bm_shapeRepeaterReport(element) {
        return new Repeater(element);
    }

    function RoundCorners(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(RoundCorners, bm_messageClassReport);
    RoundCorners.prototype.processProperties = function () {
        this.radius = bm_propertyReport(this.element.property('Radius'));
    };
    RoundCorners.prototype.process = function () {
        this.processProperties();
    };
    RoundCorners.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.roundedCorners,
            properties: {
                Radius: this.radius.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeRoundCornersReport(element) {
        return new RoundCorners(element);
    }

    function PuckerAndBloat(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(PuckerAndBloat, bm_messageClassReport);
    PuckerAndBloat.prototype.processProperties = function () {
        this.amount = bm_propertyReport(this.element.property('Amount'));
    };
    PuckerAndBloat.prototype.process = function () {
        this.processProperties();
        this.addMessage(bm_reportMessageTypes.ERROR, [
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.PUCKER_AND_BLOAT);
    };
    PuckerAndBloat.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.puckerAndBloat,
            properties: {
                Amount: this.amount.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapePuckerAndBloatReport(element) {
        return new PuckerAndBloat(element);
    }

    function TrimPaths(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(TrimPaths, bm_messageClassReport);
    TrimPaths.prototype.processProperties = function () {
        this.start = bm_propertyReport(this.element.property('Start'));
        this.end = bm_propertyReport(this.element.property('End'));
        this.offset = bm_propertyReport(this.element.property('Offset'));
    };
    TrimPaths.prototype.process = function () {
        this.processProperties();
    };
    TrimPaths.prototype.serialize = function () {
        return {
            name: this.element.name,
            type: shapeTypes.trim,
            properties: {
                Start: this.start.serialize(),
                End: this.end.serialize(),
                Offset: this.offset.serialize(),
            },
            messages: this.serializeMessages(),
        };
    };
    function bm_shapeTrimPathsReport(element) {
        return new TrimPaths(element);
    }

    function buildGroup(element) {
        return bm_shapeGroupReport(element);
    }
    function buildRect(element) {
        return bm_shapeRectReport(element);
    }
    function buildEllipse(element) {
        return bm_shapeEllipseReport(element);
    }
    function buildStar(element) {
        return bm_shapeStarReport(element);
    }
    function buildShape(element) {
        return bm_shapeShapeReport(element);
    }
    function buildFill(element) {
        return bm_shapeFillReport(element);
    }
    function buildStroke(element) {
        return bm_shapeStrokeReport(element);
    }
    function buildGradientFill(element) {
        return bm_shapeGradientFillReport(element);
    }
    function buildGradientStroke(element) {
        return bm_shapeGradientStrokeReport(element);
    }
    function buildMergePaths(element) {
        return bm_shapeMergePathsReport(element);
    }
    function buildRepeater(element) {
        return bm_shapeRepeaterReport(element);
    }
    function buildRoundCorners(element) {
        return bm_shapeRoundCornersReport(element);
    }
    function buildPuckerAndBloat(element) {
        return bm_shapePuckerAndBloatReport(element);
    }
    function buildTrimPaths(element) {
        return bm_shapeTrimPathsReport(element);
    }
    function buildUnhandled(element) {
        return bm_shapeUnhandledReport(element);
    }
    var builders = {};
    builders[shapeTypes.shape] = buildShape;
    builders[shapeTypes.rect] = buildRect;
    builders[shapeTypes.ellipse] = buildEllipse;
    builders[shapeTypes.stroke] = buildStroke;
    builders[shapeTypes.fill] = buildFill;
    builders[shapeTypes.group] = buildGroup;
    builders[shapeTypes.repeater] = buildRepeater;
    builders[shapeTypes.star] = buildStar;
    builders[shapeTypes.gfill] = buildGradientFill;
    builders[shapeTypes.gStroke] = buildGradientStroke;
    builders[shapeTypes.merge] = buildMergePaths;
    builders[shapeTypes.roundedCorners] = buildRoundCorners;
    builders[shapeTypes.puckerAndBloat] = buildPuckerAndBloat;
    builders[shapeTypes.trim] = buildTrimPaths;
    function processShape(element) {
        var shapeType = getShapeType(element.matchName);
        if (builders[shapeType]) {
            return builders[shapeType](element);
        }
        else {
            return buildUnhandled(element);
        }
    }
    var bm_shapeReportHelper = {
        processShape: processShape,
    };

    function ShapeCollection(shapes) {
        this.shapes = shapes;
        this.collection = [];
        this.process();
    }
    ShapeCollection.prototype.process = function () {
        var shapes = this.shapes;
        var collection = this.collection;
        var i;
        var len = shapes.numProperties;
        var shape;
        for (i = 0; i < len; i += 1) {
            shape = shapes.property(i + 1);
            collection.push(bm_shapeReportHelper.processShape(shape));
        }
    };
    ShapeCollection.prototype.serialize = function () {
        var shapes = [];
        for (var i = 0; i < this.collection.length; i += 1) {
            shapes.push(this.collection[i].serialize());
        }
        return {
            shapes: shapes,
        };
    };
    function bm_shapeCollectionReport(shapes) {
        return new ShapeCollection(shapes);
    }

    var shapeCollectionFactory = bm_shapeCollectionReport;
    function Group(element) {
        this.element = element;
        this.process();
    }
    bm_generalUtils.extendPrototype(Group, bm_messageClassReport);
    Group.prototype.processProperties = function () {
        if (!shapeCollectionFactory) {
            shapeCollectionFactory = $.__bodymovin.bm_shapeCollectionReport;
        }
        this.shapes = shapeCollectionFactory(this.element.property('Contents'));
        this.transform = bm_transformReportFactory(this.element.property('Transform'), false);
    };
    Group.prototype.process = function () {
        this.processProperties();
    };
    Group.prototype.serialize = function () {
        var shapesData = this.shapes.serialize();
        return {
            name: this.element.name,
            type: shapeTypes.group,
            shapes: shapesData.shapes,
            transform: this.transform.serialize(),
        };
    };
    function bm_shapeGroupReport(element) {
        return new Group(element);
    }

    var defaultRenderers$1 = [
        bm_reportRendererTypes.BROWSER,
        bm_reportRendererTypes.IOS,
        bm_reportRendererTypes.ANDROID,
        bm_reportRendererTypes.SKOTTIE,
    ];
    var onlyBrowserRenderers$1 = [
        bm_reportRendererTypes.IOS,
        bm_reportRendererTypes.ANDROID,
        bm_reportRendererTypes.SKOTTIE,
    ];
    var defaultMessageType$1 = bm_reportMessageTypes.ERROR;
    function TextSelector(selector) {
        this.selector = selector;
        this.messages = [];
        this.selectors = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(TextSelector, bm_messageClassReport);
    TextSelector.prototype.getMessageByTypeAndRenderers = function (type, renderers) {
        var key = type + '_' + renderers.join('-');
        for (var i = 0; i < this.messages.length; i += 1) {
            if (this.messages[i].key === key) {
                return this.messages[i].message;
            }
        }
        var message = {
            key: key,
            message: bm_reportAnimatorSelectorMessageFactory(type, renderers),
        };
        this.messages.push(message);
        return message.message;
    };
    TextSelector.prototype.addProperty = function (selectorData) {
        var messages = selectorData.messages;
        var messageData;
        for (var i = 0; i < messages.length; i += 1) {
            messageData = messages[i];
            var message = this.getMessageByTypeAndRenderers(messageData.type, messageData.renderers);
            message.addProperty(selectorData.name);
        }
    };
    TextSelector.prototype.processSelectorProperties = function (selectorProperty) {
        var advancedProperty = selectorProperty.property('ADBE Text Range Advanced');
        var isRandomized = advancedProperty.property('ADBE Text Randomize Order').value;
        if (isRandomized === 1) {
            this.addProperty({
                messages: [
                    {
                        type: defaultMessageType$1,
                        renderers: onlyBrowserRenderers$1,
                    },
                ],
                name: 'Randomize',
            });
        }
    };
    TextSelector.prototype.processSelector = function () {
        var propertyName = this.selector.matchName;
        if (propertyName === 'ADBE Text Selector') {
            this.processSelectorProperties(this.selector);
        }
        else if (propertyName === 'ADBE Text Expressible Selector'
            || propertyName === 'ADBE Text Wiggly Selector') {
            this.addMessage(defaultMessageType$1, defaultRenderers$1, bm_reportBuilderTypes.TEXT_SELECTOR_TYPE);
        }
    };
    TextSelector.prototype.process = function () {
        this.processSelector();
    };
    TextSelector.prototype.serialize = function () {
        var messages = this.serializeMessages();
        for (var i = 0; i < this.messages.length; i += 1) {
            messages.push(this.messages[i].message.serialize());
        }
        return {
            messages: messages,
            name: this.selector.name,
        };
    };
    function bm_textSelectorReport(element) {
        return new TextSelector(element);
    }

    var defaultRenderers = [
        bm_reportRendererTypes.BROWSER,
        bm_reportRendererTypes.IOS,
        bm_reportRendererTypes.ANDROID,
        bm_reportRendererTypes.SKOTTIE,
    ];
    var onlyBrowserRenderers = [
        bm_reportRendererTypes.IOS,
        bm_reportRendererTypes.ANDROID,
        bm_reportRendererTypes.SKOTTIE,
    ];
    var onlySkottieRenderers = [
        bm_reportRendererTypes.BROWSER,
        bm_reportRendererTypes.IOS,
        bm_reportRendererTypes.ANDROID,
    ];
    var defaultMessageType = bm_reportMessageTypes.ERROR;
    var unsupportedProperties = {
        'ADBE Text Line Anchor': {},
        'ADBE Text Track Type': {},
        'ADBE Text Character Replace': {},
        'ADBE Text Character Offset': {},
        'ADBE Text Line Spacing': {
            message: [
                {
                    type: defaultMessageType,
                    renderers: [
                        bm_reportRendererTypes.BROWSER,
                        bm_reportRendererTypes.IOS,
                        bm_reportRendererTypes.ANDROID,
                    ],
                },
            ],
        },
        'ADBE Text Blur': {
            renderers: onlySkottieRenderers,
        },
        'ADBE Text Anchor Point 3D': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Skew': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Skew Axis': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Fill Hue': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Fill Saturation': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Fill Brightness': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Stroke Hue': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Stroke Saturation': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Stroke Brightness': {
            renderers: onlyBrowserRenderers,
        },
        'ADBE Text Stroke Width': {
            renderers: onlyBrowserRenderers,
        },
    };
    function Animator(element) {
        this.element = element;
        this.messages = [];
        this.selectors = [];
        this.process();
    }
    bm_generalUtils.extendPrototype(Animator, bm_messageClassReport);
    Animator.prototype.getMessageByTypeAndRenderers = function (type, renderers) {
        var key = type + '_' + renderers.join('-');
        for (var i = 0; i < this.messages.length; i += 1) {
            if (this.messages[i].key === key) {
                return this.messages[i].message;
            }
        }
        var message = {
            key: key,
            message: bm_reportAnimatorMessageFactory(type, renderers),
        };
        this.messages.push(message);
        return message.message;
    };
    Animator.prototype.addProperty = function (animatorData) {
        var messages = animatorData.messages;
        var messageData;
        for (var i = 0; i < messages.length; i += 1) {
            messageData = messages[i];
            var message = this.getMessageByTypeAndRenderers(messageData.type, messageData.renderers);
            message.addProperty(animatorData.name);
        }
    };
    Animator.prototype.processProperties = function (animatorProperty) {
        var i;
        var len = animatorProperty.numProperties;
        var property;
        for (i = 0; i < len; i += 1) {
            property = animatorProperty.property(i + 1);
            if (property.canSetExpression) {
                if (unsupportedProperties[property.matchName]) {
                    var propertyData = unsupportedProperties[property.matchName];
                    this.addProperty({
                        messages: propertyData.message || [
                            {
                                type: propertyData.type || defaultMessageType,
                                renderers: propertyData.renderers || defaultRenderers,
                            },
                        ],
                        name: property.name,
                    });
                }
            }
        }
    };
    Animator.prototype.processSelectors = function (selectorProperty) {
        var textSelector = $.__bodymovin.bm_textSelectorReport;
        var i;
        var len = selectorProperty.numProperties;
        var property;
        for (i = 0; i < len; i += 1) {
            property = selectorProperty.property(i + 1);
            this.selectors.push(textSelector(property));
        }
    };
    Animator.prototype.processAnimator = function () {
        var i;
        var len = this.element.numProperties;
        var property;
        for (i = 0; i < len; i += 1) {
            property = this.element.property(i + 1);
            if (property.matchName === 'ADBE Text Animator Properties') {
                this.processProperties(property);
            }
            else if (property.matchName === 'ADBE Text Selectors') {
                this.processSelectors(property);
            }
        }
    };
    Animator.prototype.process = function () {
        this.processAnimator();
    };
    Animator.prototype.serialize = function () {
        var messages = [];
        var i;
        for (i = 0; i < this.messages.length; i += 1) {
            messages.push(this.messages[i].message.serialize());
        }
        var selectors = [];
        for (i = 0; i < this.selectors.length; i += 1) {
            selectors.push(this.selectors[i].serialize());
        }
        return {
            messages: messages,
            selectors: selectors,
            name: this.element.name,
        };
    };
    function bm_textAnimatorsReport(element) {
        return new Animator(element);
    }

    function Layer(layer) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        this.layer = layer;
        this.isExported = (layer.enabled && !this.layer.guideLayer)
            || (!this.layer.enabled && settingsHelper.shouldIncludeHiddenLayers())
            || (this.layer.guideLayer && settingsHelper.shouldIncludeGuidedLayers());
        this.LARGE_LAYER_SIZE = 1000 * 1000;
        this.layerRect = this.layer.sourceRectAtTime(0, false);
        this.process();
    }
    bm_generalUtils.extendPrototype(Layer, bm_messageClassReport);
    Layer.prototype.process = function () {
        if (!this.isExported) {
            return;
        }
        this.processProperties();
        this.processTransform();
        this.processStyles();
        this.processEffects();
        this.processMasks();
    };
    Layer.prototype.processProperties = function () {
        var rendererTypes = $.__bodymovin.bm_reportRendererTypes;
        var builderTypes = $.__bodymovin.bm_reportBuilderTypes;
        var messageTypes = $.__bodymovin.bm_reportMessageTypes;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if ((!this.layer.enabled && settingsHelper.shouldIncludeHiddenLayers())
            || (this.layer.guideLayer && settingsHelper.shouldIncludeGuidedLayers())) {
            this.addMessage(messageTypes.WARNING, [
                rendererTypes.SKOTTIE,
                rendererTypes.IOS,
                rendererTypes.ANDROID,
            ], builderTypes.DISABLED_LAYER);
        }
        if (this.layer.motionBlur) {
            this.addMessage(messageTypes.WARNING, [
                rendererTypes.BROWSER,
                rendererTypes.IOS,
                rendererTypes.ANDROID,
            ], builderTypes.MOTION_BLUR);
        }
        if (this.layer.preserveTransparency) {
            this.addMessage(messageTypes.WARNING, [
                rendererTypes.BROWSER,
                rendererTypes.SKOTTIE,
                rendererTypes.IOS,
                rendererTypes.ANDROID,
            ], builderTypes.PRESERVE_TRANSPARENCY);
        }
        if (this.layer.threeDLayer) {
            this.addMessage(messageTypes.ERROR, [
                rendererTypes.SKOTTIE,
                rendererTypes.IOS,
                rendererTypes.ANDROID,
            ], builderTypes.THREE_D_LAYER);
        }
        if (this.layer.threeDLayer) {
            this.addMessage(messageTypes.WARNING, [
                rendererTypes.BROWSER,
            ], builderTypes.THREE_D_LAYER);
        }
        if (this.layer.isTrackMatte) {
            var rect = this.layerRect;
            if (rect.height * rect.width >= this.LARGE_LAYER_SIZE) {
                this.addMessage(messageTypes.WARNING, [
                    rendererTypes.BROWSER,
                    rendererTypes.SKOTTIE,
                    rendererTypes.IOS,
                    rendererTypes.ANDROID,
                ], builderTypes.LARGE_MASK);
            }
        }
    };
    Layer.prototype.processTransform = function () {
        var transformFactory = $.__bodymovin.bm_transformReportFactory;
        var getLayerType = $.__bodymovin.getLayerType;
        var layerTypes = $.__bodymovin.layerTypes;
        var layerType = getLayerType(this.layer);
        var isThreeD = this.layer.threeDLayer || layerType === layerTypes.camera;
        if (this.layer.transform) {
            this.transform = transformFactory(this.layer.transform, isThreeD);
        }
    };
    Layer.prototype.processEffects = function () {
        var effectsFactory = $.__bodymovin.bm_effectsReportFactory;
        var rendererTypes = $.__bodymovin.bm_reportRendererTypes;
        var builderTypes = $.__bodymovin.bm_reportBuilderTypes;
        var messageTypes = $.__bodymovin.bm_reportMessageTypes;
        this.effects = effectsFactory(this.layer.effect || { numProperties: 0 });
        if (this.effects.hasSupportedEffects()) {
            var rect = this.layerRect;
            if (rect.height * rect.width >= this.LARGE_LAYER_SIZE) {
                this.addMessage(messageTypes.WARNING, [
                    rendererTypes.BROWSER,
                    rendererTypes.SKOTTIE,
                    rendererTypes.IOS,
                    rendererTypes.ANDROID,
                ], builderTypes.LARGE_EFFECTS);
            }
        }
    };
    Layer.prototype.processMasks = function () {
        var masksFactory = $.__bodymovin.bm_masksReportFactory;
        this.masks = masksFactory(this.layer.mask || { numProperties: 0 });
    };
    Layer.prototype.processStyles = function () {
        var layerStylesFactory = $.__bodymovin.bm_layerStylesReportFactory;
        this.styles = layerStylesFactory(this.layer.property('Layer Styles') || { numProperties: 0 });
    };
    Layer.prototype.serialize = function () {
        var getLayerType = $.__bodymovin.getLayerType;
        if (!this.isExported) {
            return {
                name: this.layer.name,
                index: this.layer.index,
                type: getLayerType(this.layer),
                messages: this.serializeMessages(),
            };
        }
        else {
            return {
                name: this.layer.name,
                index: this.layer.index,
                type: getLayerType(this.layer),
                messages: this.serializeMessages(),
                transform: this.transform ? this.transform.serialize() : undefined,
                styles: this.isExported ? this.styles.serialize() : undefined,
                effects: this.isExported ? this.effects.serialize() : undefined,
                masks: this.masks ? this.masks.serialize() : undefined,
            };
        }
    };
    function bm_layerReport(layer) {
        return new Layer(layer);
    }

    function ImageLayer(layer, onComplete, onFail) {
        this.layer = layer;
        bm_eventDispatcher.log(typeof layer.source);
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(ImageLayer, bm_messageClassReport);
    ImageLayer.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    ImageLayer.prototype.processImage = function () {
        var image = this.layer.source;
        if (image.width > 1500 || image.height > 1500) {
            this.addMessage(bm_reportMessageTypes.WARNING, [
                bm_reportRendererTypes.BROWSER,
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.LARGE_IMAGE);
        }
        if (image.name.indexOf('.ai') !== -1) {
            this.addMessage(bm_reportMessageTypes.WARNING, [
                bm_reportRendererTypes.BROWSER,
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.ILLUSTRATOR_ASSET);
        }
    };
    ImageLayer.prototype.process = function () {
        try {
            this.processLayer();
            this.processImage();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    ImageLayer.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        return serializedData;
    };
    function bm_imageLayerReport(layer, onComplete, onFail) {
        return new ImageLayer(layer, onComplete, onFail);
    }

    function ImageSequenceLayer(layer, onComplete, onFail) {
        this.layer = layer;
        bm_eventDispatcher.log(typeof layer.source);
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(ImageSequenceLayer, bm_messageClassReport);
    ImageSequenceLayer.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    ImageSequenceLayer.prototype.processImage = function () {
        var image = this.layer.source;
        if (image.width > 1500 || image.height > 1500) {
            this.addMessage(bm_reportMessageTypes.WARNING, [
                bm_reportRendererTypes.BROWSER,
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.LARGE_IMAGE);
        }
        if (image.name.indexOf('.ai') !== -1) {
            this.addMessage(bm_reportMessageTypes.WARNING, [
                bm_reportRendererTypes.BROWSER,
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.ILLUSTRATOR_ASSET);
        }
    };
    ImageSequenceLayer.prototype.process = function () {
        try {
            this.processLayer();
            this.processImage();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    ImageSequenceLayer.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        return serializedData;
    };
    function bm_imageSequenceLayerReport(layer, onComplete, onFail) {
        return new ImageSequenceLayer(layer, onComplete, onFail);
    }

    function CameraLayer$1(layer, onComplete, onFail) {
        this.layer = layer;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(CameraLayer$1, bm_messageClassReport);
    CameraLayer$1.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    CameraLayer$1.prototype.processType = function () {
        this.addMessage(bm_reportMessageTypes.ERROR, [
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
            bm_reportRendererTypes.SKOTTIE,
        ], bm_reportBuilderTypes.CAMERA_LAYER);
    };
    CameraLayer$1.prototype.process = function () {
        try {
            this.processLayer();
            this.processType();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    CameraLayer$1.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        return serializedData;
    };
    function bm_cameraLayerReport(layer, onComplete, onFail) {
        return new CameraLayer$1(layer, onComplete, onFail);
    }

    function AudioLayer(layer, onComplete, onFail) {
        this.layer = layer;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(AudioLayer, bm_messageClassReport);
    AudioLayer.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    AudioLayer.prototype.processType = function () {
        this.addMessage(bm_reportMessageTypes.ERROR, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
            bm_reportRendererTypes.SKOTTIE,
        ], bm_reportBuilderTypes.AUDIO_LAYER);
    };
    AudioLayer.prototype.process = function () {
        try {
            this.processLayer();
            this.processType();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    AudioLayer.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        return serializedData;
    };
    function bm_audioLayerReport(layer, onComplete, onFail) {
        return new AudioLayer(layer, onComplete, onFail);
    }

    function NullLayer(layer, onComplete, onFail) {
        this.layer = layer;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(NullLayer, bm_messageClassReport);
    NullLayer.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    NullLayer.prototype.process = function () {
        try {
            this.processLayer();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    NullLayer.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        return serializedData;
    };
    function bm_nullLayerReport(layer, onComplete, onFail) {
        return new NullLayer(layer, onComplete, onFail);
    }

    function SolidLayer(layer, onComplete, onFail) {
        this.layer = layer;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(SolidLayer, bm_messageClassReport);
    SolidLayer.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    SolidLayer.prototype.process = function () {
        try {
            this.processLayer();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    SolidLayer.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        return serializedData;
    };
    function bm_solidLayerReport(layer, onComplete, onFail) {
        return new SolidLayer(layer, onComplete, onFail);
    }

    function AdjustmentLayer(layer, onComplete, onFail) {
        this.layer = layer;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(AdjustmentLayer, bm_messageClassReport);
    AdjustmentLayer.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    AdjustmentLayer.prototype.processContent = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
            bm_reportRendererTypes.SKOTTIE,
        ], bm_reportBuilderTypes.ADJUSTMENT_LAYER);
    };
    AdjustmentLayer.prototype.process = function () {
        try {
            this.processLayer();
            this.processContent();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    AdjustmentLayer.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        return serializedData;
    };
    function bm_adjustmentLayerReport(layer, onComplete, onFail) {
        return new AdjustmentLayer(layer, onComplete, onFail);
    }

    function LightLayer$1(layer, onComplete, onFail) {
        this.layer = layer;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(LightLayer$1, bm_messageClassReport);
    LightLayer$1.prototype.processType = function () {
        this.addMessage(bm_reportMessageTypes.ERROR, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
            bm_reportRendererTypes.SKOTTIE,
        ], bm_reportBuilderTypes.LIGHT_LAYER);
    };
    LightLayer$1.prototype.process = function () {
        try {
            this.processType();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    LightLayer$1.prototype.serialize = function () {
        var localMessages = this.serializeMessages();
        var serializedData = {
            messages: localMessages,
            name: this.layer.name,
        };
        return serializedData;
    };
    function bm_lightLayerReport(layer, onComplete, onFail) {
        return new LightLayer$1(layer, onComplete, onFail);
    }

    function TextLayer$1(layer, onComplete, onFail) {
        this.layer = layer;
        this.animators = [];
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(TextLayer$1, bm_messageClassReport);
    TextLayer$1.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    TextLayer$1.prototype.processAnimators = function () {
        var animators = this.layer.property('Text').property('ADBE Text Animators');
        var i;
        var len = animators.numProperties;
        var textAnimator;
        for (i = 0; i < len; i += 1) {
            if (animators.property(i + 1).matchName === 'ADBE Text Animator') {
                textAnimator = bm_textAnimatorsReport(animators.property(i + 1));
                this.animators.push(textAnimator);
            }
        }
        if (this.animators.length > 0) {
            this.addMessage(bm_reportMessageTypes.ERROR, [
                bm_reportRendererTypes.IOS,
                bm_reportRendererTypes.ANDROID,
            ], bm_reportBuilderTypes.TEXT_ANIMATORS);
        }
    };
    TextLayer$1.prototype.process = function () {
        try {
            this.processLayer();
            this.processAnimators();
            this._onComplete();
        }
        catch (error) {
            if (error) {
                var e = error;
                bm_eventDispatcher.log(e.message);
                bm_eventDispatcher.log(e.line);
                bm_eventDispatcher.log(e.fileName);
            }
            bm_eventDispatcher.log($.stack);
            this._onFail(error);
        }
    };
    TextLayer$1.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        var animators = [];
        for (var i = 0; i < this.animators.length; i += 1) {
            animators.push(this.animators[i].serialize());
        }
        serializedData.text = {
            animators: animators,
        };
        return serializedData;
    };
    function bm_textLayerReport(layer, onComplete, onFail) {
        return new TextLayer$1(layer, onComplete, onFail);
    }

    function UnhandledLayer(layer, onComplete, onFail) {
        this.layer = layer;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(UnhandledLayer, bm_messageClassReport);
    UnhandledLayer.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.layer);
    };
    UnhandledLayer.prototype.processData = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.SKOTTIE,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.UNHANDLED_LAYER);
    };
    UnhandledLayer.prototype.process = function () {
        try {
            this.processData();
            this.processLayer();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    UnhandledLayer.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        return serializedData;
    };
    function bm_unhandledLayerReport(layer, onComplete, onFail) {
        return new UnhandledLayer(layer, onComplete, onFail);
    }

    function FailedLayer(layer, onComplete, onFail) {
        this.layer = layer;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(FailedLayer, bm_messageClassReport);
    FailedLayer.prototype.processData = function () {
        this.addMessage(bm_reportMessageTypes.WARNING, [
            bm_reportRendererTypes.BROWSER,
            bm_reportRendererTypes.SKOTTIE,
            bm_reportRendererTypes.IOS,
            bm_reportRendererTypes.ANDROID,
        ], bm_reportBuilderTypes.FAILED_LAYER);
    };
    FailedLayer.prototype.process = function () {
        try {
            this.processData();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    FailedLayer.prototype.serialize = function () {
        var serializedData = {
            messages: this.serializeMessages(),
            name: this.layer.name,
        };
        return serializedData;
    };
    function bm_failedLayerReport(layer, onComplete, onFail) {
        return new FailedLayer(layer, onComplete, onFail);
    }

    var layerCollectionFactory;
    function CompositionLayer(composition, onComplete, onFail) {
        this.composition = composition;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(CompositionLayer, bm_messageClassReport);
    CompositionLayer.prototype.createLayers = function () {
        if (!layerCollectionFactory) {
            layerCollectionFactory = $.__bodymovin.bm_layerCollectionReport;
        }
        this.layerCollection = layerCollectionFactory(this.composition.source.layers, this._onComplete, this._onFail);
    };
    CompositionLayer.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.composition);
    };
    CompositionLayer.prototype.process = function () {
        try {
            this.createLayers();
            this.processLayer();
            this.layerCollection.process();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    CompositionLayer.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var layerCollectionData = this.layerCollection.serialize();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        serializedData.layers = layerCollectionData.layers;
        serializedData.id = this.composition.source.id;
        return serializedData;
    };
    function bm_compositionLayerReport(composition, onComplete, onFail) {
        return new CompositionLayer(composition, onComplete, onFail);
    }

    function ShapeLayer$2(shape, onComplete, onFail) {
        this.shape = shape;
        this._onComplete = onComplete;
        this._onFail = onFail;
    }
    bm_generalUtils.extendPrototype(ShapeLayer$2, bm_messageClassReport);
    ShapeLayer$2.prototype.processLayer = function () {
        this.layerReport = bm_layerReport(this.shape);
    };
    ShapeLayer$2.prototype.processShapes = function () {
        var shapes = this.shape.property('ADBE Root Vectors Group');
        this.shapesCollection = bm_shapeCollectionReport(shapes);
    };
    ShapeLayer$2.prototype.process = function () {
        try {
            this.processLayer();
            this.processShapes();
            this._onComplete();
        }
        catch (error) {
            this._onFail(error);
        }
    };
    ShapeLayer$2.prototype.serialize = function () {
        var layerReportData = this.layerReport.serialize();
        var localMessages = this.serializeMessages();
        var shapesCollection = this.shapesCollection.serialize();
        var serializedData = {};
        for (var s in layerReportData) {
            if (layerReportData.hasOwnProperty(s)) {
                if (s === 'messages') {
                    serializedData[s] = localMessages.concat(layerReportData[s]);
                }
                else {
                    serializedData[s] = layerReportData[s];
                }
            }
        }
        serializedData.shapes = shapesCollection.shapes;
        return serializedData;
    };
    function bm_shapeLayerReport$1(shape, onComplete, onFail) {
        return new ShapeLayer$2(shape, onComplete, onFail);
    }

    function ShapeLayer$1(layer) {
        this.layer = layer;
        this.layers = [];
        this.processTransform(layer.transform);
    }
    ShapeLayer$1.prototype.processTransform = function () {
    };
    ShapeLayer$1.prototype.serialize = function () {
        return {
            transform: this.transform.serialize(),
        };
    };
    function bm_shapeLayerReport(layer) {
        return new ShapeLayer$1(layer);
    }

    function createSolidReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_solidLayerReport(layer, onComplete, onFail);
    }
    function createNullReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_nullLayerReport(layer, onComplete, onFail);
    }
    function createImageReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_imageLayerReport(layer, onComplete, onFail);
    }
    function createImageSequenceReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_imageSequenceLayerReport(layer, onComplete, onFail);
    }
    function createCameraReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_cameraLayerReport(layer, onComplete, onFail);
    }
    function createAudioReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_audioLayerReport(layer, onComplete, onFail);
    }
    function createCompositionReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_compositionLayerReport(layer, onComplete, onFail);
    }
    function createShapeReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_shapeLayerReport(layer, onComplete, onFail);
    }
    function createTextLayerReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_textLayerReport(layer, onComplete, onFail);
    }
    function createAdjustmentLayerReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_adjustmentLayerReport(layer, onComplete, onFail);
    }
    function createLightLayerReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_lightLayerReport(layer, onComplete, onFail);
    }
    function createUnhandledLayerReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_unhandledLayerReport(layer, onComplete, onFail);
    }
    function createFailedLayerReport(layer, onComplete, onFail) {
        return $.__bodymovin.bm_failedLayerReport(layer, onComplete, onFail);
    }
    function createLayer(layer, onComplete, onFail) {
        var getLayerType = $.__bodymovin.getLayerType;
        var layerTypes = $.__bodymovin.layerTypes;
        var layerType = getLayerType(layer);
        if (layerType === layerTypes.solid) {
            return createSolidReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.precomp) {
            return createCompositionReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.shape) {
            return createShapeReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.text) {
            return createTextLayerReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.nullLayer) {
            return createNullReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.still) {
            return createImageReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.imageSeq) {
            return createImageSequenceReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.camera) {
            return createCameraReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.audio) {
            return createAudioReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.adjustment) {
            return createAdjustmentLayerReport(layer, onComplete, onFail);
        }
        else if (layerType === layerTypes.light) {
            return createLightLayerReport(layer, onComplete, onFail);
        }
        else {
            return createUnhandledLayerReport(layer, onComplete, onFail);
        }
    }
    function createFailedLayer(layer, onComplete, onFail) {
        return createFailedLayerReport(layer, onComplete, onFail);
    }
    var bm_layerReportHelper = {
        createLayer: createLayer,
        createFailedLayer: createFailedLayer,
    };

    function LayerCollection(layers, onComplete, onFail) {
        this.layers = layers;
        this.collection = [];
        this.currentLayerIndex = 0;
        this._onComplete = onComplete;
        this._onFail = onFail;
        this.onLayerComplete = this.onLayerComplete.bm_bind(this);
        this.onLayerFailed = this.onLayerFailed.bm_bind(this);
        this.processCurrentLayer = this.processCurrentLayer.bm_bind(this);
    }
    LayerCollection.prototype.process = function () {
        var layerReportHelper = $.__bodymovin.bm_layerReportHelper;
        var layers = this.layers;
        var collection = this.collection;
        var len = layers.length;
        var layer;
        for (var i = 0; i < len; i += 1) {
            layer = layers[i + 1];
            collection.push(layerReportHelper.createLayer(layer, this.onLayerComplete, this.onLayerFailed));
        }
        this.asynchronouslyProcessCurrentLayer();
    };
    LayerCollection.prototype.processCurrentLayer = function () {
        try {
            var currentLayer = this.collection[this.currentLayerIndex];
            if (currentLayer) {
                currentLayer.process();
            }
            else {
                this._onComplete();
            }
        }
        catch (error) {
            this._onFail(error);
        }
    };
    LayerCollection.prototype.asynchronouslyProcessCurrentLayer = function () {
        $.__bodymovin.reportScheduledMethod = this.processCurrentLayer;
        app.scheduleTask('$.__bodymovin.reportScheduledMethod();', 20, false);
    };
    LayerCollection.prototype.onLayerFailed = function (error) {
        var layerReportHelper = $.__bodymovin.bm_layerReportHelper;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        if (error) {
            bm_eventDispatcher.log(error.message);
            bm_eventDispatcher.log(error.line);
            bm_eventDispatcher.log(error.fileName);
        }
        bm_eventDispatcher.log($.stack);
        this.collection[this.currentLayerIndex] = layerReportHelper.createFailedLayer(this.layers[this.currentLayerIndex + 1], this.onLayerComplete, this.onLayerFailed);
        this.processCurrentLayer();
    };
    LayerCollection.prototype.onLayerComplete = function () {
        this.currentLayerIndex += 1;
        this.asynchronouslyProcessCurrentLayer();
    };
    LayerCollection.prototype.serialize = function () {
        var layers = [];
        for (var i = 0; i < this.collection.length; i += 1) {
            layers.push(this.collection[i].serialize());
        }
        return {
            layers: layers,
        };
    };
    function bm_layerCollectionReport(layers, onComplete, onFail) {
        return new LayerCollection(layers, onComplete, onFail);
    }

    function Animation(animation, onComplete, onFail) {
        var layerCollectionFactory = $.__bodymovin.bm_layerCollectionReport;
        this.animation = animation;
        this.messages = [];
        this._onComplete = onComplete;
        this._onFail = onFail;
        this.onLayersComplete = this.onLayersComplete.bm_bind(this);
        try {
            this.layerCollection = layerCollectionFactory(animation.layers, this.onLayersComplete, this._onFail);
        }
        catch (error) {
            this._onFail(error);
        }
        this.process();
    }
    Animation.prototype.process = function () {
        this.layerCollection.process();
    };
    Animation.prototype.onLayersComplete = function () {
        this._onComplete(this);
    };
    Animation.prototype.serialize = function () {
        var versionHelper = $.__bodymovin.bm_versionHelper;
        try {
            var layerCollection = this.layerCollection.serialize();
            var serializedData = {
                layers: layerCollection.layers,
            };
            var messages = [];
            for (var i = 0; i < this.messages.length; i += 1) {
                messages.push(this.messages[i].serialize());
            }
            serializedData.messages = messages;
            serializedData.id = this.animation.id;
            serializedData.name = this.animation.name;
            serializedData.version = versionHelper.get();
            return serializedData;
        }
        catch (error) {
            return null;
        }
    };
    function bm_animationReport(animation, onComplete, onFail) {
        return new Animation(animation, onComplete, onFail);
    }

    function createReport$1(animation, onReportComplete, onReportFail) {
        var animationReportFactory = $.__bodymovin.bm_animationReport;
        animationReportFactory(animation, onReportComplete, onReportFail);
    }
    function createReportFromCompositionId(compositionId) {
    }
    var bm_reportsManager = {
        createReport: createReport$1,
        createReportFromCompositionId: createReportFromCompositionId,
    };

    function getPlayer(zippedFlag) {
        var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
        var folder = new Folder(extensionPath);
        folder = folder.parent;
        var fileName;
        if (zippedFlag) {
            fileName = 'lottie.js.gz';
        }
        else {
            fileName = 'lottie.js';
        }
        var bmFile = new File(folder.absoluteURI + '/assets/player/' + fileName);
        var uri = Folder.desktop.absoluteURI + '/lottie.js';
        var f = new File(uri);
        var saveFileData = f.saveDlg();
        if (saveFileData !== null) {
            if (bmFile.copy(saveFileData.absoluteURI)) {
                bm_eventDispatcher.sendEvent('bm:alert', { message: 'File saved', type: 'success' });
            }
            else {
                bm_eventDispatcher.sendEvent('bm:alert', { message: 'File could not be saved', type: 'fail' });
            }
        }
    }
    function getStandaloneData() {
        var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
        var folder = new Folder(extensionPath);
        folder = folder.parent;
        var bmFile = new File(folder.absoluteURI + '/assets/player/standalone.js');
        bmFile.open('r');
        var str = bmFile.read();
        bmFile.close();
        return str;
    }
    function getDemoData() {
        var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
        var folder = new Folder(extensionPath);
        folder = folder.parent;
        var bmFile = new File(folder.absoluteURI + '/assets/player/demo.html');
        bmFile.open('r');
        var str = bmFile.read();
        bmFile.close();
        return str;
    }
    function getTemplateData() {
        var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
        var folder = new Folder(extensionPath);
        folder = folder.parent;
        var bmFile = new File(folder.absoluteURI + '/assets/player/banner_template.html');
        bmFile.open('r');
        var str = bmFile.read();
        return str;
    }
    function getExtensionFolder() {
        var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
        return new Folder(extensionPath).parent;
    }
    var bm_downloadManager = {
        getPlayer: getPlayer,
        getStandaloneData: getStandaloneData,
        getDemoData: getDemoData,
        getTemplateData: getTemplateData,
        getExtensionFolder: getExtensionFolder,
    };

    var expressionStr;
    var renderingExpressions = [];
    var onStart;
    var onEnd;
    function expressionIsValue(expression) {
        if (expression === 'value') {
            return true;
        }
        return false;
    }
    function hasExpressions$1(prop) {
        return prop.expressionEnabled && !prop.expressionError;
    }
    function checkExpression(prop, returnOb) {
        if (hasExpressions$1(prop)) {
            if (expressionIsValue(prop.expression)) {
                return;
            }
            onStart();
            expressionStr = prop.expression;
            var objectData = {
                id: bm_generalUtils.random(10),
                ob: returnOb,
                text: expressionStr,
            };
            bm_eventDispatcher.sendEvent('bm:expression:process', objectData);
            renderingExpressions.push(objectData);
        }
    }
    function shouldBakeExpression(property) {
        if (hasExpressions$1(property)) {
            if (bm_settingsHelper.shouldBakeExpressions()
                || property.expression.indexOf("lottie:bake") !== -1) {
                return true;
            }
        }
        return false;
    }
    function saveExpression(expressionData, id) {
        var i = 0;
        var len = renderingExpressions.length;
        for (i = 0; i < len; i += 1) {
            if (renderingExpressions[i].id === id) {
                var keyframeOb = renderingExpressions[i].ob;
                if (expressionData.isStatic) {
                    keyframeOb.a = 0;
                    keyframeOb.k = expressionData.text;
                }
                else if (!expressionData.hasFailed) {
                    keyframeOb.x = expressionData.text;
                }
                renderingExpressions.splice(i, 1);
                break;
            }
        }
        if (renderingExpressions.length === 0) {
            onEnd();
        }
    }
    function checkReady() {
        return renderingExpressions.length === 0;
    }
    function reset$7() {
        renderingExpressions = [];
    }
    function setCallbacks(_onStart, _onEnd) {
        onStart = _onStart;
        onEnd = _onEnd;
    }
    var bm_expressionHelper = {
        hasExpressions: hasExpressions$1,
        checkExpression: checkExpression,
        shouldBakeExpression: shouldBakeExpression,
        saveExpression: saveExpression,
        checkReady: checkReady,
        reset: reset$7,
        setCallbacks: setCallbacks,
    };

    var fonts$1 = [];
    var count = 0;
    function buildTextData(comment) {
        var lines = comment.split('\r\n');
        if (lines[0] === 'font') {
            var i, len = lines.length;
            var textData = {};
            for (i = 1; i < len; i += 1) {
                var line = lines[i].split(':');
                if (line[0] === 'x') {
                    textData.x = line[1];
                }
                else if (line[0] === 'y') {
                    textData.y = line[1];
                }
                else if (line[0] === 'advance') {
                    textData.advance = line[1];
                }
            }
            return textData;
        }
        return null;
    }
    function searchTextDataMarker(comp) {
        if (comp.markerProperty && comp.markerProperty.numKeys >= 1) {
            var markerProperty = comp.markerProperty;
            var len = markerProperty.numKeys, markerElement;
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
    function addCompsFromFolder(folder, fontData) {
        var numInFolder = folder.numItems;
        var comps = [];
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
    function findExportedFolder(name) {
        var i = 0, len = fonts$1.length;
        while (i < len) {
            if (fonts$1[i].name === name) {
                return true;
            }
            i += 1;
        }
        return false;
    }
    function createFontData(name) {
        return {
            name: name,
            characters: [],
        };
    }
    function findCharacter(characters, character) {
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
    function findCharacterData(textDocument, character) {
        var i = 0;
        var len = fonts$1.length;
        var fontName = textDocument.fontFamily + '-' + textDocument.fontStyle;
        for (i = 0; i < len; i += 1) {
            var fontData = fonts$1[i];
            if (fontData.name === fontName) {
                return findCharacter(fontData.characters, character);
            }
        }
        return false;
    }
    function findFolderFont(layer) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if (settingsHelper.shouldReplaceCharactersWithComps()) {
            var items = app.project.items;
            var sourceTextProp = layer.property("Source Text");
            var numKeys = sourceTextProp.numKeys;
            var j, jLen = numKeys ? numKeys : 1;
            var textDocument;
            for (j = 0; j < jLen; j += 1) {
                if (numKeys === 0) {
                    textDocument = sourceTextProp.value;
                }
                else {
                    textDocument = sourceTextProp.keyValue(j + 1);
                }
                var fontName = textDocument.fontFamily + '-' + textDocument.fontStyle;
                for (var i = 0; i < items.length; i += 1) {
                    var item = items[i + 1];
                    if (item instanceof FolderItem) {
                        if (item.name === fontName && !findExportedFolder(fontName)) {
                            var fontData = createFontData(fontName);
                            fonts$1.push(fontData);
                            return addCompsFromFolder(item, fontData);
                        }
                    }
                }
            }
        }
        return [];
    }
    function getCharsFromFolder(folder) {
        var chars = '';
        var numInFolder = folder.numItems;
        for (var i = numInFolder; i >= 1; i--) {
            var comp = folder.item(i);
            chars += comp.name;
        }
        return chars;
    }
    function getCharsFromFont(textDocument) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var chars = '';
        if (settingsHelper.shouldReplaceCharactersWithComps()) {
            var items = app.project.items;
            var fontName = textDocument.fontFamily + '-' + textDocument.fontStyle;
            for (var i = 0; i < items.length; i += 1) {
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
    function reset$6() {
        fonts$1.length = 0;
        count = 0;
    }
    var bm_textCompHelper = {
        findFolderFont: findFolderFont,
        findCharacterData: findCharacterData,
        getCharsFromFont: getCharsFromFont,
        reset: reset$6,
    };

    var easingFunctions = {};
    var defaultCurveSegments = 200;
    var bm_abs = Math.abs;
    var bm_pow = Math.pow;
    var bm_sqrt = Math.sqrt;
    var bm_floor = Math.floor;
    function pointOnLine2D(x1, y1, x2, y2, x3, y3) {
        return bm_abs(((x2 - x1) * (y3 - y1)) - ((x3 - x1) * (y2 - y1))) < 0.00001;
    }
    function getEasingCurve(aa, bb, cc, dd, encodedFuncName) {
        if (!encodedFuncName) {
            encodedFuncName = ('bez_' + aa + '_' + bb + '_' + cc + '_' + dd).replace(/\./g, 'p');
        }
        if (easingFunctions[encodedFuncName]) {
            return easingFunctions[encodedFuncName];
        }
        var A0, B0, C0;
        var A1, B1, C1;
        easingFunctions[encodedFuncName] = function (x, t, b, c, d) {
            var tt = t / d;
            x = tt;
            var i = 0, z;
            while (++i < 20) {
                C0 = 3 * aa;
                B0 = 3 * (cc - aa) - C0;
                A0 = 1 - C0 - B0;
                z = (x * (C0 + x * (B0 + x * A0))) - tt;
                if (bm_abs(z) < 1e-3)
                    break;
                x -= z / (C0 + x * (2 * B0 + 3 * A0 * x));
            }
            C1 = 3 * bb;
            B1 = 3 * (dd - bb) - C1;
            A1 = 1 - C1 - B1;
            var polyB = x * (C1 + x * (B1 + x * A1));
            return c * polyB + b;
        };
        return easingFunctions[encodedFuncName];
    }
    var getBezierLength = (function () {
        var storedBezierCurves = {};
        function Segment(l, p) {
            this.l = l;
            this.p = p;
        }
        return function (pt1, pt2, pt3, pt4) {
            var bezierName = (pt1.join('_') + '_' + pt2.join('_') + '_' + pt3.join('_') + '_' + pt4.join('_')).replace(/\./g, 'p');
            if (storedBezierCurves[bezierName]) {
                return storedBezierCurves[bezierName];
            }
            var curveSegments = defaultCurveSegments;
            var k;
            var i, len;
            var ptCoord, perc, addedLength = 0;
            var ptDistance;
            var point = [], lastPoint = [];
            var lengthData = {
                addedLength: 0,
                segments: []
            };
            if ((pt1[0] != pt2[0] || pt1[1] != pt2[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt3[0], pt3[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt4[0], pt4[1])) {
                curveSegments = 2;
            }
            len = pt3.length;
            for (k = 0; k < curveSegments; k += 1) {
                perc = k / (curveSegments - 1);
                ptDistance = 0;
                for (i = 0; i < len; i += 1) {
                    ptCoord = bm_pow(1 - perc, 3) * pt1[i] + 3 * bm_pow(1 - perc, 2) * perc * pt3[i] + 3 * (1 - perc) * bm_pow(perc, 2) * pt4[i] + bm_pow(perc, 3) * pt2[i];
                    point[i] = ptCoord;
                    if (lastPoint[i] !== null) {
                        ptDistance += bm_pow(point[i] - lastPoint[i], 2);
                    }
                    lastPoint[i] = point[i];
                }
                if (ptDistance) {
                    ptDistance = bm_sqrt(ptDistance);
                    addedLength += ptDistance;
                }
                lengthData.segments.push(new Segment(addedLength, perc));
            }
            lengthData.addedLength = addedLength;
            storedBezierCurves[bezierName] = lengthData;
            return lengthData;
        };
    }());
    function BezierData(length) {
        this.segmentLength = 0;
        this.points = new Array(length);
    }
    function PointData(partial, point) {
        this.partialLength = partial;
        this.point = point;
    }
    var buildBezierData = (function () {
        var storedData = {};
        return function (keyData) {
            var pt1 = keyData.s;
            var pt2 = keyData.e;
            var pt3 = keyData.to;
            var pt4 = keyData.ti;
            var bezierName = (pt1.join('_') + '_' + pt2.join('_') + '_' + pt3.join('_') + '_' + pt4.join('_')).replace(/\./g, 'p');
            if (storedData[bezierName]) {
                return storedData[bezierName];
            }
            var curveSegments = defaultCurveSegments;
            var k, i, len;
            var ptCoord, perc, addedLength = 0;
            var ptDistance;
            var point, lastPoint = null;
            if ((pt1[0] != pt2[0] || pt1[1] != pt2[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt1[0] + pt3[0], pt1[1] + pt3[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt2[0] + pt4[0], pt2[1] + pt4[1])) {
                curveSegments = 2;
            }
            var bezierData = new BezierData(curveSegments);
            len = pt3.length;
            for (k = 0; k < curveSegments; k += 1) {
                point = new Array(len);
                perc = k / (curveSegments - 1);
                ptDistance = 0;
                for (i = 0; i < len; i += 1) {
                    ptCoord = bm_pow(1 - perc, 3) * pt1[i] + 3 * bm_pow(1 - perc, 2) * perc * (pt1[i] + pt3[i]) + 3 * (1 - perc) * bm_pow(perc, 2) * (pt2[i] + pt4[i]) + bm_pow(perc, 3) * pt2[i];
                    point[i] = ptCoord;
                    if (lastPoint !== null) {
                        ptDistance += bm_pow(point[i] - lastPoint[i], 2);
                    }
                }
                ptDistance = bm_sqrt(ptDistance);
                addedLength += ptDistance;
                bezierData.points[k] = new PointData(ptDistance, point);
                lastPoint = point;
            }
            bezierData.segmentLength = addedLength;
            storedData[bezierName] = bezierData;
            return bezierData;
        };
    }());
    function getDistancePerc(perc, bezierData) {
        var segments = bezierData.segments;
        var len = segments.length;
        var initPos = bm_floor((len - 1) * perc);
        var lengthPos = perc * bezierData.addedLength;
        var lPerc = 0;
        if (lengthPos == segments[initPos].l) {
            return segments[initPos].p;
        }
        else {
            var dir = segments[initPos].l > lengthPos ? -1 : 1;
            var flag = true;
            while (flag) {
                if (segments[initPos].l <= lengthPos && segments[initPos + 1].l > lengthPos) {
                    lPerc = (lengthPos - segments[initPos].l) / (segments[initPos + 1].l - segments[initPos].l);
                    flag = false;
                }
                else {
                    initPos += dir;
                }
                if (initPos < 0 || initPos >= len - 1) {
                    flag = false;
                }
            }
            return segments[initPos].p + (segments[initPos + 1].p - segments[initPos].p) * lPerc;
        }
    }
    function SegmentPoints() {
        this.pt1 = new Array(2);
        this.pt2 = new Array(2);
        this.pt3 = new Array(2);
        this.pt4 = new Array(2);
    }
    function getNewSegment(pt1, pt2, pt3, pt4, startPerc, endPerc, bezierData) {
        var pts = new SegmentPoints();
        startPerc = startPerc < 0 ? 0 : startPerc;
        var t0 = getDistancePerc(startPerc, bezierData);
        endPerc = endPerc > 1 ? 1 : endPerc;
        var t1 = getDistancePerc(endPerc, bezierData);
        var i;
        var len = pt1.length;
        var u0 = 1 - t0;
        var u1 = 1 - t1;
        for (i = 0; i < len; i += 1) {
            pts.pt1[i] = u0 * u0 * u0 * pt1[i] + (t0 * u0 * u0 + u0 * t0 * u0 + u0 * u0 * t0) * pt3[i] + (t0 * t0 * u0 + u0 * t0 * t0 + t0 * u0 * t0) * pt4[i] + t0 * t0 * t0 * pt2[i];
            pts.pt3[i] = u0 * u0 * u1 * pt1[i] + (t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1) * pt3[i] + (t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1) * pt4[i] + t0 * t0 * t1 * pt2[i];
            pts.pt4[i] = u0 * u1 * u1 * pt1[i] + (t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1) * pt3[i] + (t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1) * pt4[i] + t0 * t1 * t1 * pt2[i];
            pts.pt2[i] = u1 * u1 * u1 * pt1[i] + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * pt3[i] + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * pt4[i] + t1 * t1 * t1 * pt2[i];
        }
        return pts;
    }
    var bez = { getEasingCurve: getEasingCurve, getBezierLength: getBezierLength, buildBezierData: buildBezierData, getNewSegment: getNewSegment };

    var Matrix$1 = (function () {
        var _cos = Math.cos;
        var _sin = Math.sin;
        var _tan = Math.tan;
        var _rnd = Math.round;
        function reset() {
            this.props[0] = 1;
            this.props[1] = 0;
            this.props[2] = 0;
            this.props[3] = 0;
            this.props[4] = 0;
            this.props[5] = 1;
            this.props[6] = 0;
            this.props[7] = 0;
            this.props[8] = 0;
            this.props[9] = 0;
            this.props[10] = 1;
            this.props[11] = 0;
            this.props[12] = 0;
            this.props[13] = 0;
            this.props[14] = 0;
            this.props[15] = 1;
            return this;
        }
        function rotate(angle) {
            if (angle === 0) {
                return this;
            }
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function rotateX(angle) {
            if (angle === 0) {
                return this;
            }
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
        }
        function rotateY(angle) {
            if (angle === 0) {
                return this;
            }
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
        }
        function rotateZ(angle) {
            if (angle === 0) {
                return this;
            }
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function shear(sx, sy) {
            return this._t.call(this, 1, sy, sx, 1, 0, 0);
        }
        function skew(ax, ay) {
            return this.shear(_tan(ax), _tan(ay));
        }
        function skewFromAxis(ax, angle) {
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                ._t(1, 0, 0, 0, _tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                ._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function scale(sx, sy, sz) {
            sz = isNaN(sz) ? 1 : sz;
            if (sx == 1 && sy == 1 && sz == 1) {
                return this;
            }
            return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
        }
        function setTransform(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
            this.props[0] = a;
            this.props[1] = b;
            this.props[2] = c;
            this.props[3] = d;
            this.props[4] = e;
            this.props[5] = f;
            this.props[6] = g;
            this.props[7] = h;
            this.props[8] = i;
            this.props[9] = j;
            this.props[10] = k;
            this.props[11] = l;
            this.props[12] = m;
            this.props[13] = n;
            this.props[14] = o;
            this.props[15] = p;
            return this;
        }
        function translate(tx, ty, tz) {
            tz = tz || 0;
            if (tx !== 0 || ty !== 0 || tz !== 0) {
                return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
            }
            return this;
        }
        function transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
            var _p = this.props;
            if (a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0) {
                _p[12] = _p[12] * a2 + _p[15] * m2;
                _p[13] = _p[13] * f2 + _p[15] * n2;
                _p[14] = _p[14] * k2 + _p[15] * o2;
                _p[15] = _p[15] * p2;
                this._identityCalculated = false;
                return this;
            }
            var a1 = _p[0];
            var b1 = _p[1];
            var c1 = _p[2];
            var d1 = _p[3];
            var e1 = _p[4];
            var f1 = _p[5];
            var g1 = _p[6];
            var h1 = _p[7];
            var i1 = _p[8];
            var j1 = _p[9];
            var k1 = _p[10];
            var l1 = _p[11];
            var m1 = _p[12];
            var n1 = _p[13];
            var o1 = _p[14];
            var p1 = _p[15];
            _p[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
            _p[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2;
            _p[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2;
            _p[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2;
            _p[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2;
            _p[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2;
            _p[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2;
            _p[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2;
            _p[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2;
            _p[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2;
            _p[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2;
            _p[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2;
            _p[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2;
            _p[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2;
            _p[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2;
            _p[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2;
            this._identityCalculated = false;
            return this;
        }
        function isIdentity() {
            if (!this._identityCalculated) {
                this._identity = !(this.props[0] !== 1 || this.props[1] !== 0 || this.props[2] !== 0 || this.props[3] !== 0 || this.props[4] !== 0 || this.props[5] !== 1 || this.props[6] !== 0 || this.props[7] !== 0 || this.props[8] !== 0 || this.props[9] !== 0 || this.props[10] !== 1 || this.props[11] !== 0 || this.props[12] !== 0 || this.props[13] !== 0 || this.props[14] !== 0 || this.props[15] !== 1);
                this._identityCalculated = true;
            }
            return this._identity;
        }
        function equals(matr) {
            var i = 0;
            while (i < 16) {
                if (matr.props[i] !== this.props[i]) {
                    return false;
                }
                i += 1;
            }
            return true;
        }
        function clone(matr) {
            var i;
            for (i = 0; i < 16; i += 1) {
                matr.props[i] = this.props[i];
            }
        }
        function cloneFromProps(props) {
            var i;
            for (i = 0; i < 16; i += 1) {
                this.props[i] = props[i];
            }
        }
        function applyToPoint(x, y, z) {
            return {
                x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
                y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
                z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14],
            };
        }
        function applyToX(x, y, z) {
            return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
        }
        function applyToY(x, y, z) {
            return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
        }
        function applyToZ(x, y, z) {
            return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
        }
        function inversePoint(pt) {
            var determinant = this.props[0] * this.props[5] - this.props[1] * this.props[4];
            var a = this.props[5] / determinant;
            var b = -this.props[1] / determinant;
            var c = -this.props[4] / determinant;
            var d = this.props[0] / determinant;
            var e = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / determinant;
            var f = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / determinant;
            return [pt[0] * a + pt[1] * c + e, pt[0] * b + pt[1] * d + f, 0];
        }
        function inversePoints(pts) {
            var i;
            var len = pts.length;
            var retPts = [];
            for (i = 0; i < len; i += 1) {
                retPts[i] = inversePoint.call(this, pts[i]);
            }
            return retPts;
        }
        function applyToTriplePoints(pt1, pt2, pt3) {
            var arr = createTypedArray('float32', 6);
            if (this.isIdentity()) {
                arr[0] = pt1[0];
                arr[1] = pt1[1];
                arr[2] = pt2[0];
                arr[3] = pt2[1];
                arr[4] = pt3[0];
                arr[5] = pt3[1];
            }
            else {
                var p0 = this.props[0], p1 = this.props[1], p4 = this.props[4], p5 = this.props[5], p12 = this.props[12], p13 = this.props[13];
                arr[0] = pt1[0] * p0 + pt1[1] * p4 + p12;
                arr[1] = pt1[0] * p1 + pt1[1] * p5 + p13;
                arr[2] = pt2[0] * p0 + pt2[1] * p4 + p12;
                arr[3] = pt2[0] * p1 + pt2[1] * p5 + p13;
                arr[4] = pt3[0] * p0 + pt3[1] * p4 + p12;
                arr[5] = pt3[0] * p1 + pt3[1] * p5 + p13;
            }
            return arr;
        }
        function applyToPointArray(x, y, z) {
            var arr;
            if (this.isIdentity()) {
                arr = [x, y, z];
            }
            else {
                arr = [x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12], x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13], x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]];
            }
            return arr;
        }
        function applyToPointStringified(x, y) {
            if (this.isIdentity()) {
                return x + ',' + y;
            }
            var _p = this.props;
            return Math.round((x * _p[0] + y * _p[4] + _p[12]) * 100) / 100 + ',' + Math.round((x * _p[1] + y * _p[5] + _p[13]) * 100) / 100;
        }
        function toCSS() {
            var i = 0;
            var props = this.props;
            var cssValue = 'matrix3d(';
            var v = 10000;
            while (i < 16) {
                cssValue += _rnd(props[i] * v) / v;
                cssValue += i === 15 ? ')' : ',';
                i += 1;
            }
            return cssValue;
        }
        function roundMatrixProperty(val) {
            var v = 10000;
            if ((val < 0.000001 && val > 0) || (val > -1e-6 && val < 0)) {
                return _rnd(val * v) / v;
            }
            return val;
        }
        function to2dCSS() {
            var props = this.props;
            var _a = roundMatrixProperty(props[0]);
            var _b = roundMatrixProperty(props[1]);
            var _c = roundMatrixProperty(props[4]);
            var _d = roundMatrixProperty(props[5]);
            var _e = roundMatrixProperty(props[12]);
            var _f = roundMatrixProperty(props[13]);
            return 'matrix(' + _a + ',' + _b + ',' + _c + ',' + _d + ',' + _e + ',' + _f + ')';
        }
        return function () {
            this.reset = reset;
            this.rotate = rotate;
            this.rotateX = rotateX;
            this.rotateY = rotateY;
            this.rotateZ = rotateZ;
            this.skew = skew;
            this.skewFromAxis = skewFromAxis;
            this.shear = shear;
            this.scale = scale;
            this.setTransform = setTransform;
            this.translate = translate;
            this.transform = transform;
            this.applyToPoint = applyToPoint;
            this.applyToX = applyToX;
            this.applyToY = applyToY;
            this.applyToZ = applyToZ;
            this.applyToPointArray = applyToPointArray;
            this.applyToTriplePoints = applyToTriplePoints;
            this.applyToPointStringified = applyToPointStringified;
            this.toCSS = toCSS;
            this.to2dCSS = to2dCSS;
            this.clone = clone;
            this.cloneFromProps = cloneFromProps;
            this.equals = equals;
            this.inversePoints = inversePoints;
            this.inversePoint = inversePoint;
            this._t = this.transform;
            this.isIdentity = isIdentity;
            this._identity = true;
            this._identityCalculated = false;
            this.props = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.reset();
        };
    })();

    var initFrame = -999999;
    var degToRads = Math.PI / 180;
    var bm_min = Math.min;
    function getValue() {
        var bez = $.__bodymovin.bez;
        if (this.elem.globalData.frameId === this.frameId) {
            return;
        }
        this.mdf = false;
        this.frameId = this.elem.globalData.frameId;
        var frameNum = this.comp.renderedFrame - this.offsetTime;
        if (frameNum === this.lastFrame || (this.lastFrame !== initFrame && ((this.lastFrame >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime && frameNum >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime) || (this.lastFrame < this.keyframes[0].t - this.offsetTime && frameNum < this.keyframes[0].t - this.offsetTime)))) ;
        else {
            var i = 0, len = this.keyframes.length - 1, dir = 1, flag = true, keyData, nextKeyData;
            while (flag) {
                keyData = this.keyframes[i];
                nextKeyData = this.keyframes[i + 1];
                if (i === len - 1 && frameNum >= nextKeyData.t - this.offsetTime) {
                    if (keyData.h) {
                        keyData = nextKeyData;
                    }
                    break;
                }
                if ((nextKeyData.t - this.offsetTime) > frameNum) {
                    break;
                }
                if (i < len - 1) {
                    i += dir;
                }
                else {
                    flag = false;
                }
            }
            var k, kLen, perc, jLen, j = 0, fnc;
            if (keyData.to) {
                var bezierData = bez.buildBezierData(keyData);
                if (frameNum >= nextKeyData.t - this.offsetTime || frameNum < keyData.t - this.offsetTime) {
                    var ind = frameNum >= nextKeyData.t - this.offsetTime ? bezierData.points.length - 1 : 0;
                    kLen = bezierData.points[ind].point.length;
                    for (k = 0; k < kLen; k += 1) {
                        this.v[k] = this.mult ? bezierData.points[ind].point[k] * this.mult : bezierData.points[ind].point[k];
                        this.pv[k] = bezierData.points[ind].point[k];
                        if (this.lastPValue[k] !== this.pv[k]) {
                            this.mdf = true;
                            this.lastPValue[k] = this.pv[k];
                        }
                    }
                }
                else {
                    if (keyData.__fnct) {
                        fnc = keyData.__fnct;
                    }
                    else {
                        fnc = bez.getEasingCurve(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y, keyData.n);
                        keyData.__fnct = fnc;
                    }
                    perc = fnc('', (frameNum) - (keyData.t - this.offsetTime), 0, 1, (nextKeyData.t - this.offsetTime) - (keyData.t - this.offsetTime));
                    var distanceInLine = bezierData.segmentLength * perc;
                    var segmentPerc;
                    var addedLength = 0;
                    dir = 1;
                    flag = true;
                    jLen = bezierData.points.length;
                    while (flag) {
                        addedLength += bezierData.points[j].partialLength * dir;
                        if (distanceInLine === 0 || perc === 0 || j === bezierData.points.length - 1) {
                            kLen = bezierData.points[j].point.length;
                            for (k = 0; k < kLen; k += 1) {
                                this.v[k] = this.mult ? bezierData.points[j].point[k] * this.mult : bezierData.points[j].point[k];
                                this.pv[k] = bezierData.points[j].point[k];
                                if (this.lastPValue[k] !== this.pv[k]) {
                                    this.mdf = true;
                                    this.lastPValue[k] = this.pv[k];
                                }
                            }
                            break;
                        }
                        else if (distanceInLine >= addedLength && distanceInLine < addedLength + bezierData.points[j + 1].partialLength) {
                            segmentPerc = (distanceInLine - addedLength) / (bezierData.points[j + 1].partialLength);
                            kLen = bezierData.points[j].point.length;
                            for (k = 0; k < kLen; k += 1) {
                                this.v[k] = this.mult ? (bezierData.points[j].point[k] + (bezierData.points[j + 1].point[k] - bezierData.points[j].point[k]) * segmentPerc) * this.mult : bezierData.points[j].point[k] + (bezierData.points[j + 1].point[k] - bezierData.points[j].point[k]) * segmentPerc;
                                this.pv[k] = bezierData.points[j].point[k] + (bezierData.points[j + 1].point[k] - bezierData.points[j].point[k]) * segmentPerc;
                                if (this.lastPValue[k] !== this.pv[k]) {
                                    this.mdf = true;
                                    this.lastPValue[k] = this.pv[k];
                                }
                            }
                            break;
                        }
                        if ((j < jLen - 1 && dir === 1) || (j > 0 && dir === -1)) {
                            j += dir;
                        }
                        else {
                            flag = false;
                        }
                    }
                }
            }
            else {
                var outX, outY, inX, inY, isArray = false, keyValue;
                len = keyData.s.length;
                for (i = 0; i < len; i += 1) {
                    if (keyData.h !== 1) {
                        if (keyData.o.x instanceof Array) {
                            isArray = true;
                            if (!keyData.__fnct) {
                                keyData.__fnct = [];
                            }
                            if (!keyData.__fnct[i]) {
                                outX = keyData.o.x[i] || keyData.o.x[0];
                                outY = keyData.o.y[i] || keyData.o.y[0];
                                inX = keyData.i.x[i] || keyData.i.x[0];
                                inY = keyData.i.y[i] || keyData.i.y[0];
                            }
                        }
                        else {
                            isArray = false;
                            if (!keyData.__fnct) {
                                outX = keyData.o.x;
                                outY = keyData.o.y;
                                inX = keyData.i.x;
                                inY = keyData.i.y;
                            }
                        }
                        if (isArray) {
                            if (keyData.__fnct[i]) {
                                fnc = keyData.__fnct[i];
                            }
                            else {
                                fnc = bez.getEasingCurve(outX, outY, inX, inY);
                                keyData.__fnct[i] = fnc;
                            }
                        }
                        else {
                            if (keyData.__fnct) {
                                fnc = keyData.__fnct;
                            }
                            else {
                                fnc = bez.getEasingCurve(outX, outY, inX, inY);
                                keyData.__fnct = fnc;
                            }
                        }
                        if (frameNum >= nextKeyData.t - this.offsetTime) {
                            perc = 1;
                        }
                        else if (frameNum < keyData.t - this.offsetTime) {
                            perc = 0;
                        }
                        else {
                            perc = fnc('', (frameNum) - (keyData.t - this.offsetTime), 0, 1, (nextKeyData.t - this.offsetTime) - (keyData.t - this.offsetTime));
                        }
                    }
                    keyValue = keyData.h === 1 ? keyData.s[i] : keyData.s[i] + (keyData.e[i] - keyData.s[i]) * perc;
                    if (len === 1) {
                        this.v = this.mult ? keyValue * this.mult : keyValue;
                        this.pv = keyValue;
                        if (this.lastPValue !== this.pv) {
                            this.mdf = true;
                            this.lastPValue = this.pv;
                        }
                    }
                    else {
                        this.v[i] = this.mult ? keyValue * this.mult : keyValue;
                        this.pv[i] = keyValue;
                        if (this.lastPValue[i] !== this.pv[i]) {
                            this.mdf = true;
                            this.lastPValue[i] = this.pv[i];
                        }
                    }
                }
            }
        }
        this.lastFrame = frameNum;
    }
    function interpolateShape() {
        var bez = $.__bodymovin.bez;
        this.mdf = false;
        var frameNum = this.comp.renderedFrame - this.offsetTime;
        if (this.lastFrame !== initFrame && ((this.lastFrame < this.keyframes[0].t - this.offsetTime && frameNum < this.keyframes[0].t - this.offsetTime) || (this.lastFrame > this.keyframes[this.keyframes.length - 1].t - this.offsetTime && frameNum > this.keyframes[this.keyframes.length - 1].t - this.offsetTime))) ;
        else {
            var keyPropS, keyPropE, isHold;
            if (frameNum < this.keyframes[0].t - this.offsetTime) {
                this.mdf = true;
                keyPropS = this.keyframes[0].s[0];
                isHold = true;
            }
            else if (frameNum > this.keyframes[this.keyframes.length - 1].t - this.offsetTime) {
                this.mdf = true;
                if (this.keyframes[this.keyframes.length - 2].h === 1) {
                    keyPropS = this.keyframes[this.keyframes.length - 2].s[0];
                }
                else {
                    keyPropS = this.keyframes[this.keyframes.length - 2].e[0];
                }
                isHold = true;
            }
            else {
                this.mdf = true;
                var i = 0, len = this.keyframes.length - 1, dir = 1, flag = true, keyData, nextKeyData, j, jLen, k, kLen;
                while (flag) {
                    keyData = this.keyframes[i];
                    nextKeyData = this.keyframes[i + 1];
                    if ((nextKeyData.t - this.offsetTime) > frameNum && dir === 1) {
                        break;
                    }
                    if (i < len - 1 && dir === 1) {
                        i += dir;
                    }
                    else {
                        flag = false;
                    }
                }
                var perc;
                if (keyData.h !== 1) {
                    var fnc;
                    if (keyData.__fnct) {
                        fnc = keyData.__fnct;
                    }
                    else {
                        fnc = bez.getEasingCurve(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y);
                        keyData.__fnct = fnc;
                    }
                    if (frameNum >= nextKeyData.t - this.offsetTime) {
                        perc = 1;
                    }
                    else if (frameNum < keyData.t - this.offsetTime) {
                        perc = 0;
                    }
                    else {
                        perc = fnc('', (frameNum) - (keyData.t - this.offsetTime), 0, 1, (nextKeyData.t - this.offsetTime) - (keyData.t - this.offsetTime));
                    }
                    keyPropE = keyData.e[0];
                }
                keyPropS = keyData.s[0];
                isHold = keyData.h === 1;
            }
            jLen = this.v.i.length;
            kLen = keyPropS.i[0].length;
            for (j = 0; j < jLen; j += 1) {
                for (k = 0; k < kLen; k += 1) {
                    if (isHold) {
                        this.v.i[j][k] = keyPropS.i[j][k];
                        this.v.o[j][k] = keyPropS.o[j][k];
                        this.v.v[j][k] = keyPropS.v[j][k];
                        this.pv.i[j][k] = keyPropS.i[j][k];
                        this.pv.o[j][k] = keyPropS.o[j][k];
                        this.pv.v[j][k] = keyPropS.v[j][k];
                    }
                    else {
                        this.v.i[j][k] = keyPropS.i[j][k] + (keyPropE.i[j][k] - keyPropS.i[j][k]) * perc;
                        this.v.o[j][k] = keyPropS.o[j][k] + (keyPropE.o[j][k] - keyPropS.o[j][k]) * perc;
                        this.v.v[j][k] = keyPropS.v[j][k] + (keyPropE.v[j][k] - keyPropS.v[j][k]) * perc;
                        this.pv.i[j][k] = keyPropS.i[j][k] + (keyPropE.i[j][k] - keyPropS.i[j][k]) * perc;
                        this.pv.o[j][k] = keyPropS.o[j][k] + (keyPropE.o[j][k] - keyPropS.o[j][k]) * perc;
                        this.pv.v[j][k] = keyPropS.v[j][k] + (keyPropE.v[j][k] - keyPropS.v[j][k]) * perc;
                    }
                }
            }
        }
        this.lastFrame = frameNum;
    }
    function getKeys(arr) {
        var i = 0, len = arr.length;
        if (!this.keyframes) {
            while (i < len) {
                if (arr[i] === 0) {
                    return;
                }
                i += 1;
            }
            arr.push(0);
        }
        else {
            var j, jLen = this.keyframes.length, found;
            for (j = 0; j < jLen; j += 1) {
                i = 0;
                found = false;
                while (i < len) {
                    if (arr[i] === this.keyframes[j].t) {
                        found = true;
                    }
                    i += 1;
                }
                if (!found) {
                    arr.push(this.keyframes[j].t);
                }
            }
        }
    }
    function ValueProperty(elem, data, mult) {
        this.mult = mult;
        this.v = mult ? data.k * mult : data.k;
        this.pv = data.k;
        this.mdf = false;
        this.comp = elem.comp;
        this.k = false;
        this.getKeys = getKeys;
    }
    function MultiDimensionalProperty(elem, data, mult) {
        this.mult = mult;
        this.mdf = false;
        this.comp = elem.comp;
        this.k = false;
        this.v = new Array(data.k.length);
        this.pv = new Array(data.k.length);
        this.getKeys = getKeys;
        var i, len = data.k.length;
        for (i = 0; i < len; i += 1) {
            this.v[i] = mult ? data.k[i] * mult : data.k[i];
            this.pv[i] = data.k[i];
        }
    }
    function KeyframedValueProperty(elem, data, mult) {
        this.keyframes = data.k;
        this.offsetTime = elem.data.st;
        this.lastValue = -99999;
        this.lastPValue = -99999;
        this.frameId = -1;
        this.k = true;
        this.mult = mult;
        this.elem = elem;
        this.comp = elem.comp;
        this.lastFrame = initFrame;
        this.v = mult ? data.k[0].s[0] * mult : data.k[0].s[0];
        this.pv = data.k[0].s[0];
        this.getValue = getValue;
        this.getKeys = getKeys;
    }
    function KeyframedMultidimensionalProperty(elem, data, mult) {
        this.keyframes = data.k;
        this.offsetTime = elem.data.st;
        this.k = true;
        this.mult = mult;
        this.elem = elem;
        this.comp = elem.comp;
        this.getValue = getValue;
        this.frameId = -1;
        this.v = new Array(data.k[0].s.length);
        this.pv = new Array(data.k[0].s.length);
        this.lastValue = new Array(data.k[0].s.length);
        this.lastPValue = new Array(data.k[0].s.length);
        this.lastFrame = initFrame;
        this.getKeys = getKeys;
    }
    var TransformProperty = (function () {
        function getKeys(arr) {
            this.a.getKeys(arr);
            this.p.getKeys(arr);
            this.s.getKeys(arr);
            this.r.getKeys(arr);
        }
        function processKeys() {
            if (this.elem.globalData.frameId === this.frameId) {
                return;
            }
            this.mdf = false;
            this.frameId = this.elem.globalData.frameId;
            var i, len = this.dynamicProperties.length;
            for (i = 0; i < len; i += 1) {
                this.dynamicProperties[i].getValue();
                if (this.dynamicProperties[i].mdf) {
                    this.mdf = true;
                }
            }
            if (this.mdf) {
                if (this.data.p.s) {
                    this.v.reset().translate(this.px.v, this.py.v).rotate(this.r.v).scale(this.s.v[0], this.s.v[1]).translate(-this.a.v[0], -this.a.v[1]);
                }
                else {
                    this.v.reset().translate(this.p.v[0], this.p.v[1]).rotate(this.r.v).scale(this.s.v[0], this.s.v[1]).translate(-this.a.v[0], -this.a.v[1]);
                }
            }
        }
        return function (elem, data, arr) {
            this.elem = elem;
            this.frameId = -1;
            this.dynamicProperties = [];
            this.mdf = false;
            this.data = data;
            this.getValue = processKeys;
            this.getKeys = getKeys;
            this.v = new Matrix();
            this.a = getProp(elem, data.a, 1, 0, this.dynamicProperties);
            if (data.p.s) {
                this.px = getProp(elem, data.p.x, 0, 0, this.dynamicProperties);
                this.py = getProp(elem, data.p.y, 0, 0, this.dynamicProperties);
            }
            else {
                this.p = getProp(elem, data.p, 1, 0, this.dynamicProperties);
            }
            this.s = getProp(elem, data.s, 1, 0.01, this.dynamicProperties);
            this.r = getProp(elem, data.r, 0, degToRads, this.dynamicProperties);
            this.o = getProp(elem, data.o, 0, 0.01, arr);
            if (this.dynamicProperties.length) {
                arr.push(this);
            }
            else {
                if (this.data.p.s) {
                    this.v.translate(this.px.v, this.py.v).rotate(this.r.v).scale(this.s.v[0], this.s.v[1]).translate(-this.a.v[0], -this.a.v[1]);
                }
                else {
                    this.v.translate(this.p.v[0], this.p.v[1]).rotate(this.r.v).scale(this.s.v[0], this.s.v[1]).translate(-this.a.v[0], -this.a.v[1]);
                }
            }
        };
    }());
    function getProp(elem, data, type, mult, arr) {
        var p;
        if (type === 2) {
            p = new TransformProperty(elem, data, arr);
        }
        else if (!data.k.length) {
            p = new ValueProperty(elem, data, mult);
        }
        else if (typeof (data.k[0]) === 'number') {
            p = new MultiDimensionalProperty(elem, data, mult);
        }
        else {
            switch (type) {
                case 0:
                    p = new KeyframedValueProperty(elem, data, mult);
                    break;
                case 1:
                    p = new KeyframedMultidimensionalProperty(elem, data, mult);
                    break;
            }
        }
        if (p.k || p.x) {
            arr.push(p);
        }
        return p;
    }
    function ShapeProperty(elem, data, type) {
        this.comp = elem.comp;
        this.k = false;
        this.mdf = false;
        this.closed = type === 3 ? data.cl : data.closed;
        this.numNodes = type === 3 ? data.pt.k.v.length : data.ks.k.v.length;
        this.v = type === 3 ? data.pt.k : data.ks.k;
        type === 3 ? data.pt : data.ks;
        this.pv = this.v;
        this.getKeys = getKeys;
    }
    function KeyframedShapeProperty(elem, data, type) {
        this.comp = elem.comp;
        this.offsetTime = elem.data.st;
        this.getValue = interpolateShape;
        this.keyframes = type === 3 ? data.pt.k : data.ks.k;
        this.getKeys = getKeys;
        this.k = true;
        this.closed = type === 3 ? data.cl : data.closed;
        var i, len = this.keyframes[0].s[0].i.length;
        var jLen = this.keyframes[0].s[0].i[0].length;
        this.numNodes = len;
        this.v = {
            i: new Array(len),
            o: new Array(len),
            v: new Array(len)
        };
        this.pv = {
            i: new Array(len),
            o: new Array(len),
            v: new Array(len)
        };
        for (i = 0; i < len; i += 1) {
            this.v.i[i] = new Array(jLen);
            this.v.o[i] = new Array(jLen);
            this.v.v[i] = new Array(jLen);
            this.pv.i[i] = new Array(jLen);
            this.pv.o[i] = new Array(jLen);
            this.pv.v[i] = new Array(jLen);
        }
        this.lastFrame = initFrame;
    }
    var EllShapeProperty = (function () {
        var cPoint = 0.5519;
        function convertEllToPath() {
            var p0 = this.p.v[0], p1 = this.p.v[1], s0 = this.s.v[0] / 2, s1 = this.s.v[1] / 2;
            if (this.d !== 2 && this.d !== 3) {
                this.v.v[0] = [p0, p1 - s1];
                this.v.i[0] = [p0 - s0 * cPoint, p1 - s1];
                this.v.o[0] = [p0 + s0 * cPoint, p1 - s1];
                this.v.v[1] = [p0 + s0, p1];
                this.v.i[1] = [p0 + s0, p1 - s1 * cPoint];
                this.v.o[1] = [p0 + s0, p1 + s1 * cPoint];
                this.v.v[2] = [p0, p1 + s1];
                this.v.i[2] = [p0 + s0 * cPoint, p1 + s1];
                this.v.o[2] = [p0 - s0 * cPoint, p1 + s1];
                this.v.v[3] = [p0 - s0, p1];
                this.v.i[3] = [p0 - s0, p1 + s1 * cPoint];
                this.v.o[3] = [p0 - s0, p1 - s1 * cPoint];
            }
            else {
                this.v.v[0] = [p0, p1 - s1];
                this.v.o[0] = [p0 - s0 * cPoint, p1 - s1];
                this.v.i[0] = [p0 + s0 * cPoint, p1 - s1];
                this.v.v[1] = [p0 - s0, p1];
                this.v.o[1] = [p0 - s0, p1 + s1 * cPoint];
                this.v.i[1] = [p0 - s0, p1 - s1 * cPoint];
                this.v.v[2] = [p0, p1 + s1];
                this.v.o[2] = [p0 + s0 * cPoint, p1 + s1];
                this.v.i[2] = [p0 - s0 * cPoint, p1 + s1];
                this.v.v[3] = [p0 + s0, p1];
                this.v.o[3] = [p0 + s0, p1 - s1 * cPoint];
                this.v.i[3] = [p0 + s0, p1 + s1 * cPoint];
            }
        }
        function processKeys(frameNum) {
            var i, len = this.dynamicProperties.length;
            if (this.elem.globalData.frameId === this.frameId) {
                return;
            }
            this.mdf = false;
            this.frameId = this.elem.globalData.frameId;
            for (i = 0; i < len; i += 1) {
                this.dynamicProperties[i].getValue(frameNum);
                if (this.dynamicProperties[i].mdf) {
                    this.mdf = true;
                }
            }
            if (this.mdf) {
                this.convertEllToPath();
            }
        }
        function getKeys(arr) {
            this.p.getKeys(arr);
            this.s.getKeys(arr);
        }
        return function (elem, data) {
            this.v = {
                v: new Array(4),
                i: new Array(4),
                o: new Array(4),
                c: true
            };
            this.numNodes = 4;
            this.d = data.d;
            this.dynamicProperties = [];
            data.closed = true;
            this.closed = true;
            this.elem = elem;
            this.comp = elem.comp;
            this.frameId = -1;
            this.mdf = false;
            this.getValue = processKeys;
            this.convertEllToPath = convertEllToPath;
            this.getKeys = getKeys;
            this.p = getProp(elem, data.p, 1, 0, this.dynamicProperties);
            this.s = getProp(elem, data.s, 1, 0, this.dynamicProperties);
            if (this.dynamicProperties.length) {
                this.k = true;
            }
            else {
                this.convertEllToPath();
            }
        };
    }());
    var RectShapeProperty = (function () {
        function processKeys(frameNum) {
            if (this.elem.globalData.frameId === this.frameId) {
                return;
            }
            this.mdf = false;
            this.frameId = this.elem.globalData.frameId;
            var i, len = this.dynamicProperties.length;
            for (i = 0; i < len; i += 1) {
                this.dynamicProperties[i].getValue(frameNum);
                if (this.dynamicProperties[i].mdf) {
                    this.mdf = true;
                }
            }
            if (this.mdf) {
                this.convertRectToPath();
            }
        }
        function convertRectToPath() {
            var p0 = this.p.v[0], p1 = this.p.v[1], v0 = this.s.v[0] / 2, v1 = this.s.v[1] / 2;
            var round = bm_min(v0, v1, this.r.v);
            var cPoint = round * (1 - 0.5519);
            if (this.d === 2 || this.d === 1) {
                this.v.v[0] = [p0 + v0, p1 - v1 + round];
                this.v.o[0] = this.v.v[0];
                this.v.i[0] = [p0 + v0, p1 - v1 + cPoint];
                this.v.v[1] = [p0 + v0, p1 + v1 - round];
                this.v.o[1] = [p0 + v0, p1 + v1 - cPoint];
                this.v.i[1] = this.v.v[1];
                this.v.v[2] = [p0 + v0 - round, p1 + v1];
                this.v.o[2] = this.v.v[2];
                this.v.i[2] = [p0 + v0 - cPoint, p1 + v1];
                this.v.v[3] = [p0 - v0 + round, p1 + v1];
                this.v.o[3] = [p0 - v0 + cPoint, p1 + v1];
                this.v.i[3] = this.v.v[3];
                this.v.v[4] = [p0 - v0, p1 + v1 - round];
                this.v.o[4] = this.v.v[4];
                this.v.i[4] = [p0 - v0, p1 + v1 - cPoint];
                this.v.v[5] = [p0 - v0, p1 - v1 + round];
                this.v.o[5] = [p0 - v0, p1 - v1 + cPoint];
                this.v.i[5] = this.v.v[5];
                this.v.v[6] = [p0 - v0 + round, p1 - v1];
                this.v.o[6] = this.v.v[6];
                this.v.i[6] = [p0 - v0 + cPoint, p1 - v1];
                this.v.v[7] = [p0 + v0 - round, p1 - v1];
                this.v.o[7] = [p0 + v0 - cPoint, p1 - v1];
                this.v.i[7] = this.v.v[7];
            }
            else {
                this.v.v[0] = [p0 + v0, p1 - v1 + round];
                this.v.o[0] = [p0 + v0, p1 - v1 + cPoint];
                this.v.i[0] = this.v.v[0];
                this.v.v[1] = [p0 + v0 - round, p1 - v1];
                this.v.o[1] = this.v.v[1];
                this.v.i[1] = [p0 + v0 - cPoint, p1 - v1];
                this.v.v[2] = [p0 - v0 + round, p1 - v1];
                this.v.o[2] = [p0 - v0 + cPoint, p1 - v1];
                this.v.i[2] = this.v.v[2];
                this.v.v[3] = [p0 - v0, p1 - v1 + round];
                this.v.o[3] = this.v.v[3];
                this.v.i[3] = [p0 - v0, p1 - v1 + cPoint];
                this.v.v[4] = [p0 - v0, p1 + v1 - round];
                this.v.o[4] = [p0 - v0, p1 + v1 - cPoint];
                this.v.i[4] = this.v.v[4];
                this.v.v[5] = [p0 - v0 + round, p1 + v1];
                this.v.o[5] = this.v.v[5];
                this.v.i[5] = [p0 - v0 + cPoint, p1 + v1];
                this.v.v[6] = [p0 + v0 - round, p1 + v1];
                this.v.o[6] = [p0 + v0 - cPoint, p1 + v1];
                this.v.i[6] = this.v.v[6];
                this.v.v[7] = [p0 + v0, p1 + v1 - round];
                this.v.o[7] = this.v.v[7];
                this.v.i[7] = [p0 + v0, p1 + v1 - cPoint];
            }
        }
        function getKeys(arr) {
            this.p.getKeys(arr);
            this.s.getKeys(arr);
            this.r.getKeys(arr);
        }
        return function (elem, data) {
            this.v = {
                v: new Array(8),
                i: new Array(8),
                o: new Array(8),
                c: true
            };
            this.numNodes = 8;
            this.elem = elem;
            this.comp = elem.comp;
            this.frameId = -1;
            this.d = data.d;
            this.dynamicProperties = [];
            this.mdf = false;
            data.closed = true;
            this.closed = true;
            this.getValue = processKeys;
            this.convertRectToPath = convertRectToPath;
            this.getKeys = getKeys;
            this.p = getProp(elem, data.p, 1, 0, this.dynamicProperties);
            this.s = getProp(elem, data.s, 1, 0, this.dynamicProperties);
            this.r = getProp(elem, data.r, 0, 0, this.dynamicProperties);
            if (this.dynamicProperties.length) {
                this.k = true;
            }
            else {
                this.convertRectToPath();
            }
        };
    }());
    var StarShapeProperty = (function () {
        function convertPolygonToPath() {
            var numPts = Math.floor(this.pt.v);
            var angle = Math.PI * 2 / numPts;
            this.v.v.length = numPts;
            this.v.i.length = numPts;
            this.v.o.length = numPts;
            var rad = this.or.v;
            var roundness = this.os.v;
            var perimSegment = 2 * Math.PI * rad / (numPts * 4);
            var i, currentAng = -Math.PI / 2;
            var dir = this.data.d === 3 ? -1 : 1;
            currentAng += this.r.v;
            for (i = 0; i < numPts; i += 1) {
                var x = rad * Math.cos(currentAng);
                var y = rad * Math.sin(currentAng);
                var ox = x === 0 && y === 0 ? 0 : y / Math.sqrt(x * x + y * y);
                var oy = x === 0 && y === 0 ? 0 : -x / Math.sqrt(x * x + y * y);
                x += +this.p.v[0];
                y += +this.p.v[1];
                this.v.v[i] = [x, y];
                this.v.i[i] = [x + ox * perimSegment * roundness * dir, y + oy * perimSegment * roundness * dir];
                this.v.o[i] = [x - ox * perimSegment * roundness * dir, y - oy * perimSegment * roundness * dir];
                currentAng += angle * dir;
            }
            this.numNodes = numPts;
        }
        function convertStarToPath() {
            var numPts = Math.floor(this.pt.v) * 2;
            var angle = Math.PI * 2 / numPts;
            this.v.v.length = numPts;
            this.v.i.length = numPts;
            this.v.o.length = numPts;
            var longFlag = true;
            var longRad = this.or.v;
            var shortRad = this.ir.v;
            var longRound = this.os.v;
            var shortRound = this.is.v;
            var longPerimSegment = 2 * Math.PI * longRad / (numPts * 2);
            var shortPerimSegment = 2 * Math.PI * shortRad / (numPts * 2);
            var i, rad, roundness, perimSegment, currentAng = -Math.PI / 2;
            currentAng += this.r.v;
            var dir = this.data.d === 3 ? -1 : 1;
            for (i = 0; i < numPts; i += 1) {
                rad = longFlag ? longRad : shortRad;
                roundness = longFlag ? longRound : shortRound;
                perimSegment = longFlag ? longPerimSegment : shortPerimSegment;
                var x = rad * Math.cos(currentAng);
                var y = rad * Math.sin(currentAng);
                var ox = x === 0 && y === 0 ? 0 : y / Math.sqrt(x * x + y * y);
                var oy = x === 0 && y === 0 ? 0 : -x / Math.sqrt(x * x + y * y);
                x += +this.p.v[0];
                y += +this.p.v[1];
                this.v.v[i] = [x, y];
                this.v.i[i] = [x + ox * perimSegment * roundness * dir, y + oy * perimSegment * roundness * dir];
                this.v.o[i] = [x - ox * perimSegment * roundness * dir, y - oy * perimSegment * roundness * dir];
                longFlag = !longFlag;
                currentAng += angle * dir;
            }
            this.numNodes = numPts;
        }
        function processKeys() {
            if (this.elem.globalData.frameId === this.frameId) {
                return;
            }
            this.mdf = false;
            this.frameId = this.elem.globalData.frameId;
            var i, len = this.dynamicProperties.length;
            for (i = 0; i < len; i += 1) {
                this.dynamicProperties[i].getValue();
                if (this.dynamicProperties[i].mdf) {
                    this.mdf = true;
                }
            }
            if (this.mdf) {
                this.convertToPath();
            }
        }
        function getKeys(arr) {
            this.pt.getKeys(arr);
            this.p.getKeys(arr);
            this.r.getKeys(arr);
            this.or.getKeys(arr);
            this.os.getKeys(arr);
            if (this.data.sy === 1) {
                this.ir.getKeys(arr);
                this.is.getKeys(arr);
            }
        }
        return function StarShapeProperty(elem, data) {
            this.v = {
                v: [],
                i: [],
                o: [],
                c: true
            };
            this.elem = elem;
            this.comp = elem.comp;
            this.data = data;
            this.frameId = -1;
            this.d = data.d;
            this.dynamicProperties = [];
            this.mdf = false;
            data.closed = true;
            this.closed = true;
            this.getValue = processKeys;
            if (data.sy === 1) {
                this.ir = getProp(elem, data.ir, 0, 0, this.dynamicProperties);
                this.is = getProp(elem, data.is, 0, 0.01, this.dynamicProperties);
                this.convertToPath = convertStarToPath;
            }
            else {
                this.convertToPath = convertPolygonToPath;
            }
            this.getKeys = getKeys;
            this.pt = getProp(elem, data.pt, 0, 0, this.dynamicProperties);
            this.p = getProp(elem, data.p, 1, 0, this.dynamicProperties);
            this.r = getProp(elem, data.r, 0, degToRads, this.dynamicProperties);
            this.or = getProp(elem, data.or, 0, 0, this.dynamicProperties);
            this.os = getProp(elem, data.os, 0, 0.01, this.dynamicProperties);
            if (this.dynamicProperties.length) {
                this.k = true;
            }
            else {
                this.convertToPath();
            }
        };
    }());
    function getShapeProp(elem, data, type, arr, trims) {
        var prop;
        if (type === 3 || type === 4) {
            var keys = type === 3 ? data.pt.k : data.ks.k;
            if (keys.length) {
                prop = new KeyframedShapeProperty(elem, data, type);
            }
            else {
                prop = new ShapeProperty(elem, data, type);
            }
        }
        else if (type === 5) {
            prop = new RectShapeProperty(elem, data);
        }
        else if (type === 6) {
            prop = new EllShapeProperty(elem, data);
        }
        else if (type === 7) {
            prop = new StarShapeProperty(elem, data);
        }
        var hasTrims = false;
        if (trims) {
            var i = 0, len = trims.length;
            while (i < len) {
                if (!trims[i].closed) {
                    hasTrims = true;
                    break;
                }
                i += 1;
            }
        }
        if (hasTrims) {
            prop = new TrimTransformerProperty(prop, trims);
        }
        if (prop.k) {
            arr.push(prop);
        }
        return prop;
    }
    var PropertyFactory = {
        getProp: getProp,
        getShapeProp: getShapeProp,
    };

    var namespace = 'bodymovin';
    function init$1() {
        app.project;
        if (ExternalObject.AdobeXMPScript == undefined) {
            ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
        }
        var schemaNS = XMPMeta.getNamespaceURI(namespace);
        if (schemaNS == "" || schemaNS == undefined) {
            schemaNS = XMPMeta.registerNamespace(namespace, namespace);
        }
    }
    function setMetadata(property, value) {
        var proj = app.project;
        if (ExternalObject.AdobeXMPScript == undefined) {
            ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
        }
        var metaData = new XMPMeta(proj.xmpPacket);
        var schemaNS = XMPMeta.getNamespaceURI(namespace);
        if (schemaNS == "" || schemaNS == undefined) ;
        else {
            try {
                metaData.setProperty(schemaNS, namespace + ":" + property, value);
            }
            catch (err) {
            }
        }
        proj.xmpPacket = metaData.serialize();
    }
    function getMetadata(property) {
        var proj = app.project;
        if (ExternalObject.AdobeXMPScript == undefined) {
            ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
        }
        var metaData = new XMPMeta(proj.xmpPacket);
        var schemaNS = XMPMeta.getNamespaceURI(namespace);
        if (schemaNS == "" || schemaNS == undefined) {
            return undefined;
        }
        var metaValue = metaData.getProperty(schemaNS, property);
        if (!metaValue) {
            return undefined;
        }
        return metaValue.value;
    }
    function getMetadataFromCep(property, returnAsJson) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var JSON = $.__bodymovin.JSON;
        var data = getMetadata(property);
        if (data) {
            if (returnAsJson) {
                try {
                    data = JSON.parse(data.replace(/\\/g, '\\\\'));
                }
                catch (error) {
                }
            }
            bm_eventDispatcher.sendEvent('bm:xmpData:success:' + property, { value: data, property: property });
        }
        else {
            bm_eventDispatcher.sendEvent('bm:xmpData:failed:' + property, { property: property });
        }
    }
    init$1();
    var bm_XMPHelper = {
        init: init$1,
        setMetadata: setMetadata,
        getMetadata: getMetadata,
        getMetadataFromCep: getMetadataFromCep,
    };

    var fileString = '';
    function init() {
        fileString = '';
    }
    function end() {
        fileString = '';
    }
    function getProjectData() {
        var proj = app.project;
        var ff = proj.file;
        if (!ff) {
            fileString = '<no file>';
        }
        else {
            var demoFile = new File(ff.absoluteURI);
            demoFile.open('r', 'TEXT', '????');
            fileString = demoFile.read(demoFile.length);
        }
    }
    function sortFunction(a, b) {
        var a_0 = Number(a[0].toString());
        var b_0 = Number(b[0].toString());
        if (a_0 === b_0) {
            return 0;
        }
        else {
            return (a_0 < b_0) ? -1 : 1;
        }
    }
    function getGradientData(shapeNavigation, numKeys) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        if (!fileString) {
            getProjectData();
        }
        var hasNoGradColorData = false;
        if (fileString.indexOf('ADBE Vector Grad Colors') === -1) {
            hasNoGradColorData = true;
        }
        numKeys = numKeys ? numKeys : 1;
        var gradientIndex = 0, navigationIndex = 0;
        var i = 0, len = shapeNavigation.length;
        while (i < len) {
            var encoded = unescape(encodeURIComponent(shapeNavigation[i] + 'LIST'));
            var stringIndex = fileString.indexOf(encoded, navigationIndex + 1);
            if (stringIndex === -1) {
                encoded = unescape(encodeURIComponent(shapeNavigation[i] + ' LIST'));
                stringIndex = fileString.indexOf(encoded, navigationIndex + 1);
            }
            if (stringIndex === -1) {
                encoded = unescape(encodeURIComponent(shapeNavigation[i]));
                stringIndex = fileString.indexOf(encoded, navigationIndex + 1);
            }
            navigationIndex = stringIndex;
            i += 1;
        }
        gradientIndex = fileString.indexOf('ADBE Vector Grad Colors', navigationIndex);
        var gradFillIndex = fileString.indexOf('ADBE Vector Graphic - G-Fill', navigationIndex);
        var gradStrokeIndex = fileString.indexOf('ADBE Vector Graphic - G-Stroke', navigationIndex);
        var limitIndex;
        if (gradStrokeIndex !== -1 && gradFillIndex !== -1) {
            limitIndex = Math.min(gradFillIndex, gradStrokeIndex);
        }
        else {
            limitIndex = Math.max(gradFillIndex, gradStrokeIndex);
        }
        if (limitIndex === -1) {
            limitIndex = Number.MAX_VALUE;
        }
        var currentKey = 0;
        var keyframes = [];
        var hasOpacity = false, maxOpacities = 0, maxColors = 0;
        var lastIndex = 0;
        while (currentKey < numKeys) {
            var gradientData = {};
            gradientIndex = fileString.indexOf('<prop.map', gradientIndex);
            if (hasNoGradColorData || gradientIndex > limitIndex || (gradientIndex === -1 && limitIndex === Number.MAX_VALUE)) {
                gradientData.c = [[0, 1, 1, 1], [1, 0, 0, 0]];
                maxColors = Math.max(maxColors, 2);
            }
            else {
                var endMatch = '</prop.map>';
                lastIndex = fileString.indexOf(endMatch, gradientIndex);
                var xmlString = fileString.substr(gradientIndex, lastIndex + endMatch.length - gradientIndex);
                xmlString = xmlString.replace(/\n/g, '');
                var XML_Ob = new XML(xmlString);
                var stops = XML_Ob['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'];
                var colors = XML_Ob['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'][1]['prop.list'][0]['prop.pair'][0]['prop.list'][0]['prop.pair'];
                i = 0;
                len = stops.length();
                var opacitiesArr = [];
                var op = void 0, floats = void 0, nextFloats = void 0, midPoint = void 0, midPosition = void 0;
                while (i < len) {
                    floats = stops[i]['prop.list'][0]['prop.pair'][0]['array'][0].float;
                    op = [];
                    op.push(bm_generalUtils.roundNumber(Number(floats[0].toString()), 3));
                    op.push(bm_generalUtils.roundNumber(Number(floats[2].toString()), 3));
                    if (op[1] !== 1) {
                        hasOpacity = true;
                    }
                    opacitiesArr.push(op);
                    midPosition = bm_generalUtils.roundNumber(Number(floats[1].toString()), 3);
                    if (i < len - 1) {
                        op = [];
                        nextFloats = stops[i + 1]['prop.list'][0]['prop.pair'][0]['array'][0].float;
                        midPoint = Number(floats[0].toString()) + (Number(nextFloats[0].toString()) - Number(floats[0].toString())) * midPosition;
                        var midPointValue = Number(floats[2].toString()) + (Number(nextFloats[2].toString()) - Number(floats[2].toString())) * 0.5;
                        op.push(bm_generalUtils.roundNumber(midPoint, 3));
                        op.push(bm_generalUtils.roundNumber(midPointValue, 3));
                        opacitiesArr.push(op);
                    }
                    i += 1;
                }
                i = 0;
                len = colors.length();
                var colorsArr = [];
                var sortedColors = [];
                while (i < len) {
                    sortedColors.push(colors[i]['prop.list'][0]['prop.pair'][0]['array'][0].float);
                    i += 1;
                }
                sortedColors.sort(sortFunction);
                i = 0;
                while (i < len) {
                    floats = sortedColors[i];
                    op = [];
                    op.push(bm_generalUtils.roundNumber(Number(floats[0].toString()), 3));
                    op.push(bm_generalUtils.roundNumber(Number(floats[2].toString()), 3));
                    op.push(bm_generalUtils.roundNumber(Number(floats[3].toString()), 3));
                    op.push(bm_generalUtils.roundNumber(Number(floats[4].toString()), 3));
                    colorsArr.push(op);
                    midPosition = bm_generalUtils.roundNumber(Number(floats[1].toString()), 3);
                    if (i < len - 1) {
                        op = [];
                        nextFloats = sortedColors[i + 1];
                        midPoint = Number(floats[0].toString()) + (Number(nextFloats[0].toString()) - Number(floats[0].toString())) * midPosition;
                        var midPointValueR = Number(floats[2].toString()) + (Number(nextFloats[2].toString()) - Number(floats[2].toString())) * 0.5;
                        var midPointValueG = Number(floats[3].toString()) + (Number(nextFloats[3].toString()) - Number(floats[3].toString())) * 0.5;
                        var midPointValueB = Number(floats[4].toString()) + (Number(nextFloats[4].toString()) - Number(floats[4].toString())) * 0.5;
                        op.push(bm_generalUtils.roundNumber(midPoint, 3));
                        op.push(bm_generalUtils.roundNumber(midPointValueR, 3));
                        op.push(bm_generalUtils.roundNumber(midPointValueG, 3));
                        op.push(bm_generalUtils.roundNumber(midPointValueB, 3));
                        colorsArr.push(op);
                    }
                    i += 1;
                }
                gradientData.c = colorsArr;
                gradientData.o = opacitiesArr;
                maxOpacities = Math.max(maxOpacities, opacitiesArr.length);
                maxColors = Math.max(maxColors, colorsArr.length);
            }
            gradientIndex = lastIndex;
            keyframes.push(gradientData);
            currentKey += 1;
        }
        i = 0;
        var arr, arrayLength, count, lastValue, offsetValue;
        var mergedKeys = [];
        var mergedArr;
        var j;
        while (i < numKeys) {
            mergedArr = [];
            if (keyframes[i].c.length < maxColors) {
                arr = keyframes[i].c;
                arrayLength = arr.length;
                lastValue = arr[arrayLength - 1];
                offsetValue = lastValue[0];
                count = 0;
                while (arrayLength + count < maxColors) {
                    offsetValue -= 0.001;
                    arr.splice(arrayLength - 1, 0, [offsetValue, lastValue[1], lastValue[2], lastValue[3]]);
                    count += 1;
                }
            }
            for (j = 0; j < maxColors; j += 1) {
                for (var k = 0; k < 4; k += 1) {
                    mergedArr.push(keyframes[i].c[j][k]);
                }
            }
            if (!hasOpacity) {
                delete keyframes[i].o;
            }
            else {
                if (keyframes[i].o.length < maxOpacities) {
                    arr = keyframes[i].o;
                    arrayLength = arr.length;
                    lastValue = arr[arrayLength - 1];
                    offsetValue = lastValue[0];
                    count = 0;
                    while (arrayLength + count < maxOpacities) {
                        offsetValue -= 0.001;
                        arr.splice(arrayLength - 1, 0, [offsetValue, lastValue[1], lastValue[2], lastValue[3]]);
                        count += 1;
                    }
                }
                for (j = 0; j < maxOpacities; j += 1) {
                    for (var l = 0; l < 2; l += 1) {
                        mergedArr.push(keyframes[i].o[j][l]);
                    }
                }
            }
            if (numKeys <= 1) {
                mergedKeys = mergedArr;
            }
            else {
                mergedKeys.push(mergedArr);
            }
            i += 1;
        }
        return {
            m: mergedKeys,
            p: maxColors,
        };
    }
    var bm_ProjectHelper = {
        init: init,
        getGradientData: getGradientData,
        end: end,
    };

    function exportAudio(layerInfo, data, frameRate) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if (!settingsHelper.shouldRasterizeWaveform()) {
            var stretch = data.sr;
            var audioProperty = layerInfo.property('Audio');
            data.au = {
                lv: bm_keyframeHelper.exportKeyframes(audioProperty.property('Audio Levels'), frameRate, stretch),
            };
        }
    }
    var bm_audioHelper = { exportAudio: exportAudio };

    function exportCamera(layerInfo, data, frameRate) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var stretch = data.sr;
        data.pe = bm_keyframeHelper.exportKeyframes(layerInfo.property('ADBE Camera Options Group').property('ADBE Camera Zoom'), frameRate, stretch);
        data.ks = {};
        if (layerInfo.transform.property('ADBE Anchor Point').canSetExpression) {
            data.ks.a = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Anchor Point'), frameRate, stretch);
        }
        if (layerInfo.transform.position.dimensionsSeparated) {
            data.ks.p = { s: true };
            data.ks.p.x = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Position_0'), frameRate, stretch);
            data.ks.p.y = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Position_1'), frameRate, stretch);
            data.ks.p.z = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Position_2'), frameRate, stretch);
        }
        else {
            data.ks.p = bm_keyframeHelper.exportKeyframes(layerInfo.transform.position, frameRate, stretch);
        }
        data.ks.or = bm_keyframeHelper.exportKeyframes(layerInfo.transform.Orientation, frameRate, stretch);
        data.ks.rx = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Rotate X'), frameRate, stretch);
        data.ks.ry = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Rotate Y'), frameRate, stretch);
        data.ks.rz = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Rotate Z'), frameRate, stretch);
    }
    var bm_cameraHelper = { exportCamera: exportCamera };

    function exportData(layerInfo, data, frameRate) {
    }
    var bm_dataHelper = { exportData: exportData };

    var property;
    var j = 1;
    var jLen;
    var beziersArray;
    var averageSpeed;
    var duration;
    var bezierIn;
    var bezierOut;
    var frameRate;
    var hasRovingKeyframes = false;
    function getPropertyValue(value, roundFlag) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        switch (property.propertyValueType) {
            case PropertyValueType.SHAPE:
                var elem = {
                    i: roundFlag ? bm_generalUtils.roundNumber(value.inTangents, 3) : value.inTangents,
                    o: roundFlag ? bm_generalUtils.roundNumber(value.outTangents, 3) : value.outTangents,
                    v: roundFlag ? bm_generalUtils.roundNumber(value.vertices, 3) : value.vertices,
                    c: value.closed
                };
                return elem;
            case PropertyValueType.COLOR:
                var i, len = value.length;
                for (i = 0; i < len; i += 1) {
                    value[i] = Math.round(value[i] * 1000000000000) / 1000000000000;
                    value[i] = value[i];
                }
                return value;
            default:
                return roundFlag ? bm_generalUtils.roundNumber(value, 3) : value;
        }
    }
    function getCurveLength(initPos, endPos, outBezier, inBezier) {
        var k, curveSegments = 200, point, lastPoint = null, ptDistance, absToCoord, absTiCoord, triCoord1, triCoord2, triCoord3, liCoord1, liCoord2, ptCoord, perc, addedLength = 0, i, len;
        for (k = 0; k < curveSegments; k += 1) {
            point = [];
            perc = k / (curveSegments - 1);
            ptDistance = 0;
            absToCoord = [];
            absTiCoord = [];
            len = outBezier.length;
            for (i = 0; i < len; i += 1) {
                if (absToCoord[i] === null || absToCoord[i] === undefined) {
                    absToCoord[i] = initPos[i] + outBezier[i];
                    absTiCoord[i] = endPos[i] + inBezier[i];
                }
                triCoord1 = initPos[i] + (absToCoord[i] - initPos[i]) * perc;
                triCoord2 = absToCoord[i] + (absTiCoord[i] - absToCoord[i]) * perc;
                triCoord3 = absTiCoord[i] + (endPos[i] - absTiCoord[i]) * perc;
                liCoord1 = triCoord1 + (triCoord2 - triCoord1) * perc;
                liCoord2 = triCoord2 + (triCoord3 - triCoord2) * perc;
                ptCoord = liCoord1 + (liCoord2 - liCoord1) * perc;
                point.push(ptCoord);
                if (lastPoint !== null) {
                    ptDistance += Math.pow(point[i] - lastPoint[i], 2);
                }
            }
            ptDistance = Math.sqrt(ptDistance);
            addedLength += ptDistance;
            lastPoint = point;
        }
        return addedLength;
    }
    function buildKeyInfluence(key, lastKey, indexTime) {
        switch (property.propertyValueType) {
            case PropertyValueType.ThreeD_SPATIAL:
            case PropertyValueType.TwoD_SPATIAL:
            case PropertyValueType.SHAPE:
            case PropertyValueType.NO_VALUE:
                key.easeIn = {
                    influence: property.keyInTemporalEase(indexTime + 1)[0].influence,
                    speed: property.keyInTemporalEase(indexTime + 1)[0].speed
                };
                lastKey.easeOut = {
                    influence: property.keyOutTemporalEase(indexTime)[0].influence,
                    speed: property.keyOutTemporalEase(indexTime)[0].speed
                };
                break;
            default:
                key.easeIn = [];
                lastKey.easeOut = [];
                var inEase = property.keyInTemporalEase(indexTime + 1);
                var outEase = property.keyOutTemporalEase(indexTime);
                var i, len = inEase.length;
                for (i = 0; i < len; i += 1) {
                    key.easeIn.push({ influence: inEase[i].influence, speed: inEase[i].speed });
                    lastKey.easeOut.push({ influence: outEase[i].influence, speed: outEase[i].speed });
                }
        }
    }
    function exportKeys(prop, frRate, stretch, keyframeValues) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var exportOldFormat = settingsHelper.shouldExportOldFormat();
        var currentExpression = '';
        property = prop;
        var propertyValueType = property.propertyValueType;
        frameRate = frRate;
        beziersArray = [];
        if (propertyValueType === PropertyValueType.SHAPE) {
            if (prop.expressionEnabled && !prop.expressionError) {
                currentExpression = prop.expression;
                prop.expression = '';
            }
        }
        if (property.numKeys <= 1) {
            if (propertyValueType === PropertyValueType.NO_VALUE) {
                return keyframeValues;
            }
            var propertyValue = getPropertyValue(property.valueAtTime(0, true), true);
            if (currentExpression !== '') {
                prop.expression = currentExpression;
            }
            return propertyValue;
        }
        jLen = property.numKeys;
        var isPrevHoldInterpolated = false;
        var STRETCH_FACTOR = stretch;
        for (j = 1; j < jLen; j += 1) {
            isPrevHoldInterpolated = false;
            var segmentOb = {};
            var indexTime = j;
            var i, len;
            var k, kLen;
            var key = {};
            var lastKey = {};
            var interpolationType = '';
            key.time = property.keyTime(indexTime + 1);
            lastKey.time = property.keyTime(indexTime);
            if (propertyValueType !== PropertyValueType.NO_VALUE) {
                key.value = getPropertyValue(property.keyValue(indexTime + 1), false);
                lastKey.value = getPropertyValue(property.keyValue(indexTime), false);
                if (!(key.value instanceof Array)) {
                    key.value = [key.value];
                    lastKey.value = [lastKey.value];
                }
            }
            else {
                key.value = keyframeValues[j];
                lastKey.value = keyframeValues[j - 1];
            }
            if (property.keyOutInterpolationType(indexTime) === KeyframeInterpolationType.HOLD) {
                interpolationType = 'hold';
            }
            else {
                if (property.keyOutInterpolationType(indexTime) === KeyframeInterpolationType.LINEAR && property.keyInInterpolationType(indexTime + 1) === KeyframeInterpolationType.LINEAR) {
                    interpolationType = 'linear';
                }
                buildKeyInfluence(key, lastKey, indexTime);
                switch (property.propertyValueType) {
                    case PropertyValueType.ThreeD_SPATIAL:
                    case PropertyValueType.TwoD_SPATIAL:
                        lastKey.to = bm_generalUtils.roundNumber(property.keyOutSpatialTangent(indexTime), 3);
                        key.ti = bm_generalUtils.roundNumber(property.keyInSpatialTangent(indexTime + 1), 3);
                        break;
                }
            }
            if (interpolationType === 'hold') {
                isPrevHoldInterpolated = true;
                segmentOb.t = bm_generalUtils.roundNumber(lastKey.time * frameRate, 3);
                if (propertyValueType !== PropertyValueType.NO_VALUE) {
                    segmentOb.s = getPropertyValue(property.keyValue(j), true);
                    if (!(segmentOb.s instanceof Array)) {
                        segmentOb.s = [segmentOb.s];
                    }
                }
                else {
                    segmentOb.s = keyframeValues[j - 1];
                }
                segmentOb.h = 1;
            }
            else {
                duration = (key.time - lastKey.time) / STRETCH_FACTOR;
                len = propertyValueType === PropertyValueType.NO_VALUE ? 0 : key.value.length;
                bezierIn = {};
                bezierOut = {};
                averageSpeed = 0;
                var infOut, infIn;
                switch (property.propertyValueType) {
                    case PropertyValueType.ThreeD_SPATIAL:
                    case PropertyValueType.TwoD_SPATIAL:
                        var curveLength = getCurveLength(lastKey.value, key.value, lastKey.to, key.ti);
                        averageSpeed = curveLength / duration;
                        if (curveLength === 0) {
                            infOut = lastKey.easeOut.influence;
                            infIn = key.easeIn.influence;
                        }
                        else {
                            infOut = Math.min(100 * curveLength / (lastKey.easeOut.speed * duration), lastKey.easeOut.influence);
                            infIn = Math.min(100 * curveLength / (key.easeIn.speed * duration), key.easeIn.influence);
                        }
                        bezierIn.x = 1 - infIn / 100;
                        bezierOut.x = infOut / 100;
                        break;
                    case PropertyValueType.SHAPE:
                    case PropertyValueType.NO_VALUE:
                        averageSpeed = 1;
                        infOut = Math.min(100 / lastKey.easeOut.speed, lastKey.easeOut.influence);
                        infIn = Math.min(100 / key.easeIn.speed, key.easeIn.influence);
                        bezierIn.x = 1 - infIn / 100;
                        bezierOut.x = infOut / 100;
                        break;
                    case PropertyValueType.ThreeD:
                    case PropertyValueType.TwoD:
                    case PropertyValueType.OneD:
                    case PropertyValueType.COLOR:
                        bezierIn.x = [];
                        bezierOut.x = [];
                        kLen = key.easeIn.length;
                        for (k = 0; k < kLen; k += 1) {
                            bezierIn.x[k] = 1 - key.easeIn[k].influence / 100;
                            bezierOut.x[k] = lastKey.easeOut[k].influence / 100;
                        }
                        averageSpeed = [];
                        for (i = 0; i < len; i += 1) {
                            if (property.propertyValueType === PropertyValueType.COLOR) {
                                averageSpeed[i] = 255 * (key.value[i] - lastKey.value[i]) / duration;
                            }
                            else {
                                averageSpeed[i] = (key.value[i] - lastKey.value[i]) / duration;
                            }
                        }
                        break;
                }
                if (averageSpeed === 0) {
                    bezierIn.y = bezierIn.x;
                    bezierOut.y = bezierOut.x;
                }
                else {
                    switch (property.propertyValueType) {
                        case PropertyValueType.ThreeD_SPATIAL:
                        case PropertyValueType.TwoD_SPATIAL:
                        case PropertyValueType.SHAPE:
                        case PropertyValueType.NO_VALUE:
                            if (interpolationType === 'linear') {
                                bezierIn.y = bezierIn.x;
                                bezierOut.y = bezierOut.x;
                            }
                            else {
                                bezierIn.y = 1 - (key.easeIn.speed / averageSpeed) * (infIn / 100);
                                bezierOut.y = (lastKey.easeOut.speed / averageSpeed) * (infOut / 100);
                            }
                            break;
                        case PropertyValueType.ThreeD:
                        case PropertyValueType.TwoD:
                        case PropertyValueType.OneD:
                        case PropertyValueType.COLOR:
                            bezierIn.y = [];
                            bezierOut.y = [];
                            kLen = key.easeIn.length;
                            for (k = 0; k < kLen; k += 1) {
                                if (interpolationType === 'linear') {
                                    bezierIn.y[k] = bezierIn.x[k];
                                    bezierOut.y[k] = bezierOut.x[k];
                                }
                                else {
                                    var yNormal;
                                    if (property.propertyValueType === PropertyValueType.COLOR) {
                                        yNormal = 255 * (key.value[k] - lastKey.value[k]);
                                    }
                                    else {
                                        yNormal = (key.value[k] - lastKey.value[k]);
                                    }
                                    if (Math.abs(yNormal) < 0.0000001) {
                                        yNormal = 1;
                                    }
                                    var bezierY = (lastKey.easeOut[k].speed * lastKey.easeOut[k].influence / 100);
                                    var bezierInY = (key.easeIn[k].speed * key.easeIn[k].influence / 100);
                                    bezierIn.y[k] = 1 - (bezierInY * duration) / yNormal;
                                    bezierOut.y[k] = (bezierY * duration) / yNormal;
                                }
                            }
                            break;
                    }
                }
                bezierIn.x = bm_generalUtils.roundNumber(bezierIn.x, 3);
                bezierIn.y = bm_generalUtils.roundNumber(bezierIn.y, 3);
                bezierOut.x = bm_generalUtils.roundNumber(bezierOut.x, 3);
                bezierOut.y = bm_generalUtils.roundNumber(bezierOut.y, 3);
                segmentOb.i = bezierIn;
                segmentOb.o = bezierOut;
                segmentOb.t = bm_generalUtils.roundNumber(lastKey.time * frameRate, 3);
                if (propertyValueType !== PropertyValueType.NO_VALUE) {
                    segmentOb.s = getPropertyValue(property.keyValue(j), true);
                    if (exportOldFormat) {
                        segmentOb.e = getPropertyValue(property.keyValue(j + 1), true);
                    }
                    if (!(segmentOb.s instanceof Array)) {
                        segmentOb.s = [segmentOb.s];
                        if (exportOldFormat) {
                            segmentOb.e = [segmentOb.e];
                        }
                    }
                }
                else {
                    segmentOb.s = keyframeValues[j - 1];
                    if (exportOldFormat) {
                        segmentOb.e = keyframeValues[j];
                    }
                }
                if (property.propertyValueType === PropertyValueType.ThreeD_SPATIAL || property.propertyValueType === PropertyValueType.TwoD_SPATIAL) {
                    segmentOb.to = lastKey.to;
                    segmentOb.ti = key.ti;
                }
            }
            beziersArray.push(segmentOb);
        }
        if (exportOldFormat) {
            beziersArray.push({ t: property.keyTime(j) * frameRate });
        }
        else {
            var finalValue;
            if (propertyValueType !== PropertyValueType.NO_VALUE) {
                finalValue = getPropertyValue(property.keyValue(j), true);
                if (!(finalValue instanceof Array)) {
                    finalValue = [finalValue];
                }
            }
            else {
                finalValue = keyframeValues[j - 1];
            }
            beziersArray.push({ t: property.keyTime(j) * frameRate, s: finalValue });
        }
        if (property.keyOutInterpolationType(j) === KeyframeInterpolationType.HOLD || isPrevHoldInterpolated) {
            if (exportOldFormat) {
                var value;
                if (propertyValueType !== PropertyValueType.NO_VALUE) {
                    value = getPropertyValue(property.keyValue(j), true);
                    if (!(value instanceof Array)) {
                        value = [value];
                    }
                }
                else {
                    value = keyframeValues[j - 1];
                }
                beziersArray[beziersArray.length - 1].s = value;
            }
            beziersArray[beziersArray.length - 1].h = 1;
        }
        if (currentExpression !== '') {
            prop.expression = currentExpression;
        }
        return beziersArray;
    }
    function searchRovingKeyframes(property) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        hasRovingKeyframes = false;
        if (property.propertyValueType === PropertyValueType.ThreeD_SPATIAL || property.propertyValueType === PropertyValueType.TwoD_SPATIAL) {
            var numKeys = property.numKeys;
            var keyIndex;
            for (keyIndex = 1; keyIndex <= numKeys; keyIndex += 1) {
                if (property.keyRoving(keyIndex)) {
                    if (!hasRovingKeyframes) {
                        app.beginUndoGroup("Roving Undo Group");
                        hasRovingKeyframes = true;
                    }
                    property.setSelectedAtKey(keyIndex, true);
                    bm_eventDispatcher.log('IT IS ROVING');
                }
            }
            if (hasRovingKeyframes) {
                app.executeCommand(3153);
            }
        }
    }
    function restoreRovingKeyframes(property) {
        if (hasRovingKeyframes) {
            app.endUndoGroup();
            app.executeCommand(16);
            var keyIndex, numKeys = property.numKeys;
            for (keyIndex = 1; keyIndex <= numKeys; keyIndex += 1) {
                property.setSelectedAtKey(keyIndex, false);
            }
        }
    }
    function trimKeyframes(keyframes, frameRate) {
        var renderHelper = $.__bodymovin.bm_renderHelper;
        var range = renderHelper.getCurrentRange();
        range[0];
        (range[1] - range[0]) * frameRate;
        var initFrame = range[0] * frameRate;
        var endFrame = range[1] * frameRate;
        var i, len = keyframes.length;
        for (i = 0; i < len; i += 1) {
            if (keyframes[i + 1] && keyframes[i + 1].t < initFrame) {
                keyframes.splice(i, 1);
                i -= 1;
                len -= 1;
            }
            else if (keyframes[i - 1] && keyframes[i - 1].t > endFrame) {
                keyframes.splice(i, 1);
                i -= 1;
                len -= 1;
            }
        }
        return keyframes;
    }
    function exportKeyframes(prop, frRate, stretch, keyframeValues) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_expressionHelper = $.__bodymovin.bm_expressionHelper;
        var bakeExpressions = $.__bodymovin.bm_keyframeBakerHelper;
        var essentialPropertiesHelper = $.__bodymovin.bm_essentialPropertiesHelper;
        var returnOb = {};
        if (settingsHelper.shouldExportEssentialProperties()) {
            if (settingsHelper.shouldExportEssentialPropertiesAsSlots()) {
                var essentialPropId = essentialPropertiesHelper.searchPropertyId(prop);
                if (essentialPropId) {
                    returnOb.sid = essentialPropId;
                }
            }
            else {
                var essentialProperty = essentialPropertiesHelper.searchProperty(prop);
                if (essentialProperty) {
                    for (var key in essentialProperty) {
                        if (essentialProperty.hasOwnProperty(key)) {
                            returnOb[key] = essentialProperty[key];
                        }
                    }
                    if (prop.propertyIndex && !settingsHelper.shouldIgnoreExpressionProperties()) {
                        returnOb.ix = prop.propertyIndex;
                    }
                    return returnOb;
                }
            }
        }
        if (bm_expressionHelper.shouldBakeExpression(prop)) {
            returnOb = bakeExpressions(prop, frRate);
        }
        else {
            if (prop.numKeys <= 1) {
                returnOb.a = 0;
            }
            else {
                returnOb.a = 1;
            }
            searchRovingKeyframes(prop);
            var keys = exportKeys(prop, frRate, stretch, keyframeValues);
            if (settingsHelper.shouldTrimData() && prop.numKeys > 1) {
                keys = trimKeyframes(keys, frRate);
            }
            returnOb.k = keys;
            if (prop.propertyIndex && !settingsHelper.shouldIgnoreExpressionProperties()) {
                returnOb.ix = prop.propertyIndex;
            }
            bm_expressionHelper.checkExpression(prop, returnOb);
            restoreRovingKeyframes(prop);
        }
        return returnOb;
    }
    var bm_keyframeHelper = { exportKeyframes: exportKeyframes };

    function exportMasks(layerInfo, layerData, frameRate) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var getMaskMode = $.__bodymovin.getMaskType;
        if (!(layerInfo.mask && layerInfo.mask.numProperties > 0)) {
            return;
        }
        var stretch = layerData.sr;
        layerData.hasMask = true;
        layerData.masksProperties = [];
        var masks = layerInfo.mask;
        var i, len = masks.numProperties, maskElement;
        for (i = 0; i < len; i += 1) {
            maskElement = masks(i + 1);
            var shapeData = {
                inv: maskElement.inverted,
                mode: getMaskMode(maskElement.maskMode),
            };
            shapeData.pt = bm_keyframeHelper.exportKeyframes(maskElement.property('maskShape'), frameRate, stretch);
            $.__bodymovin.bm_shapeHelper.checkVertexCount(shapeData.pt.k);
            shapeData.o = bm_keyframeHelper.exportKeyframes(maskElement.property('Mask Opacity'), frameRate, stretch);
            shapeData.x = bm_keyframeHelper.exportKeyframes(maskElement.property('Mask Expansion'), frameRate, stretch);
            if (settingsHelper.shouldIncludeNotSupportedProperties()) {
                shapeData.f = bm_keyframeHelper.exportKeyframes(maskElement.property('Mask Feather'), frameRate, stretch);
            }
            shapeData.nm = maskElement.name;
            layerData.masksProperties.push(shapeData);
        }
    }
    var bm_maskHelper = { exportMasks: exportMasks };

    function searchMarkers(comp, ob) {
        if (!(comp.marker && comp.marker.numProperties > 0)) {
            return;
        }
        var markers = comp.marker, i, len = markers.numProperties;
        for (i = 0; i < len; i += 1) {
            markers(i + 1);
        }
    }
    var bm_markerHelper = { searchMarkers: searchMarkers };

    function exportTimeremap(layerInfo, layerData, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        if (layerInfo.canSetTimeRemapEnabled && layerInfo.timeRemapEnabled) {
            var stretch = layerData.sr;
            layerData.tm = bm_keyframeHelper.exportKeyframes(layerInfo['Time Remap'], frameRate, stretch);
        }
    }
    var bm_timeremapHelper = { exportTimeremap: exportTimeremap };

    var navigationShapeTree = [];
    function reverseShape(ks) {
        var newI = [], newO = [], newV = [];
        var i, len, isClosed;
        if (ks.i) {
            var init = 0;
            isClosed = ks.c;
            if (isClosed) {
                newI[0] = ks.o[0];
                newO[0] = ks.i[0];
                newV[0] = ks.v[0];
                init = 1;
            }
            len = ks.i.length;
            var cnt = len - 1;
            for (i = init; i < len; i += 1) {
                newI.push(ks.o[cnt]);
                newO.push(ks.i[cnt]);
                newV.push(ks.v[cnt]);
                cnt -= 1;
            }
            ks.i = newI;
            ks.o = newO;
            ks.v = newV;
        }
        else {
            len = ks.length;
            for (i = 0; i < len; i += 1) {
                if (ks[i].s) {
                    reverseShape(ks[i].s[0]);
                }
                if (ks[i].e) {
                    reverseShape(ks[i].e[0]);
                }
            }
        }
    }
    function getCurvesAtPerc(pt1, pt2, pt3, pt4, t) {
        var A = [pt1[0], pt1[1]];
        var B = [pt2[0], pt2[1]];
        var C = [pt3[0], pt3[1]];
        var D = [pt4[0], pt4[1]];
        var E = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
        var F = [B[0] + (C[0] - B[0]) * t, B[1] + (C[1] - B[1]) * t];
        var G = [C[0] + (D[0] - C[0]) * t, C[1] + (D[1] - C[1]) * t];
        var H = [E[0] + (F[0] - E[0]) * t, E[1] + (F[1] - E[1]) * t];
        var I = [F[0] + (G[0] - F[0]) * t, F[1] + (G[1] - F[1]) * t];
        var J = [H[0] + (I[0] - H[0]) * t, H[1] + (I[1] - H[1]) * t];
        if (A[0] === B[0] && A[1] === B[1] && C[0] === D[0] && C[1] === D[1]) {
            return {
                c1: [A, A, J, J],
                c2: [J, J, D, D],
            };
        }
        else {
            return {
                c1: [A, E, H, J],
                c2: [J, I, G, D],
            };
        }
    }
    function addVertices(shape, totalVertices) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        var iterations = [1, 2, 4, 7, 14, 28, 56, 112, 224, 448];
        var shapeVertices = shape.i.length;
        var closed = shape.c;
        var sides = shapeVertices;
        var interpolatableSides = closed ? sides : sides - 1;
        var missingVertices = totalVertices - shapeVertices;
        var i;
        var currentIteration = 0;
        var nodesPerSide = [];
        var count = 0;
        var newV = [];
        var newI = [];
        var newO = [];
        for (i = 0; i < sides; i += 1) {
            nodesPerSide[i] = 0;
        }
        if (interpolatableSides <= 0) {
            for (i = 0; i < missingVertices; i += 1) {
                newV[i] = [0, 0];
                newI[i] = [0, 0];
                newO[i] = [0, 0];
            }
            shape.v = newV;
            shape.o = newO;
            shape.i = newI;
            return;
        }
        while (missingVertices > 0) {
            for (i = 0; i < interpolatableSides; i += 1) {
                if (missingVertices > 0) {
                    nodesPerSide[i] += Math.min(missingVertices, iterations[currentIteration]);
                }
                missingVertices -= iterations[currentIteration];
            }
            currentIteration += 1;
        }
        var pt1 = [], pt2 = [], pt3 = [], pt4 = [], curves;
        var j;
        var rounder = bm_generalUtils.roundNumber;
        for (i = 0; i < sides; i += 1) {
            if (nodesPerSide[i] === 0) {
                newV[count] = [rounder(shape.v[i][0], 3), rounder(shape.v[i][1], 3)];
                newO[count] = [rounder(shape.o[i][0], 3), rounder(shape.o[i][1], 3)];
                if (i === sides - 1) {
                    newI[0] = [rounder(shape.i[0][0], 3), rounder(shape.i[0][1], 3)];
                }
                else {
                    newI[count + 1] = [rounder(shape.i[i + 1][0], 3), rounder(shape.i[i + 1][1], 3)];
                }
                count += 1;
            }
            else {
                if (i === sides - 1 && closed) {
                    pt1 = [shape.v[i][0], shape.v[i][1]];
                    pt2 = [shape.o[i][0] + shape.v[i][0], shape.o[i][1] + shape.v[i][1]];
                    pt3 = [shape.i[0][0] + shape.v[0][0], shape.i[0][1] + shape.v[0][1]];
                    pt4 = [shape.v[0][0], shape.v[0][1]];
                }
                else {
                    pt1 = [shape.v[i][0], shape.v[i][1]];
                    pt2 = [shape.o[i][0] + shape.v[i][0], shape.o[i][1] + shape.v[i][1]];
                    pt3 = [shape.i[i + 1][0] + shape.v[i + 1][0], shape.i[i + 1][1] + shape.v[i + 1][1]];
                    pt4 = [shape.v[i + 1][0], shape.v[i + 1][1]];
                }
                var sideNodes = nodesPerSide[i] + 1;
                for (j = 0; j < sideNodes; j += 1) {
                    if (j < sideNodes - 1) {
                        curves = getCurvesAtPerc(pt1, pt2, pt3, pt4, 1 / (sideNodes - j));
                        newV[count] = [rounder(curves.c1[0][0], 3), rounder(curves.c1[0][1], 3)];
                        newO[count] = [rounder(curves.c1[1][0] - curves.c1[0][0], 3), rounder(curves.c1[1][1] - curves.c1[0][1], 3)];
                        if (count === totalVertices - 1) {
                            newI[0] = [rounder(curves.c2[2][0] - curves.c2[0][0], 3), rounder(curves.c2[2][1] - curves.c2[0][1], 3)];
                        }
                        else {
                            newI[count + 1] = [rounder(curves.c1[2][0] - curves.c1[3][0], 3), rounder(curves.c1[2][1] - curves.c1[3][1], 3)];
                        }
                        pt1 = [curves.c2[0][0], curves.c2[0][1]];
                        pt2 = [curves.c2[1][0], curves.c2[1][1]];
                        pt3 = [curves.c2[2][0], curves.c2[2][1]];
                        pt4 = [curves.c2[3][0], curves.c2[3][1]];
                    }
                    else {
                        newV[count] = [rounder(curves.c2[0][0], 3), rounder(curves.c2[0][1], 3)];
                        newO[count] = [rounder(curves.c2[1][0] - curves.c2[0][0], 3), rounder(curves.c2[1][1] - curves.c2[0][1], 3)];
                        if (count === totalVertices - 1) {
                            newI[0] = [rounder(curves.c2[2][0] - curves.c2[3][0], 3), rounder(curves.c2[2][1] - curves.c2[3][1], 3)];
                        }
                        else {
                            newI[count + 1] = [rounder(curves.c2[2][0] - curves.c2[3][0], 3), rounder(curves.c2[2][1] - curves.c2[3][1], 3)];
                        }
                    }
                    count += 1;
                }
            }
        }
        shape.v = newV;
        shape.o = newO;
        shape.i = newI;
    }
    function checkVertexCount(shape) {
        if (shape.i) {
            return;
        }
        var i;
        var len = shape.length;
        var maxVertextCount = shape[0].s[0].i.length;
        for (i = 0; i < len; i += 1) {
            if (shape[i].s && shape[i].s[0]) {
                if (maxVertextCount !== shape[i].s[0].i.length) {
                    maxVertextCount = Math.max(maxVertextCount, shape[i].s[0].i.length);
                }
            }
            if (shape[i].e && shape[i].e[0]) {
                if (maxVertextCount !== shape[i].e[0].i.length) {
                    maxVertextCount = Math.max(maxVertextCount, shape[i].e[0].i.length);
                }
            }
        }
        for (i = 0; i < len; i += 1) {
            if (shape[i].s && shape[i].s[0] && maxVertextCount !== shape[i].s[0].i.length) {
                addVertices(shape[i].s[0], maxVertextCount);
            }
            if (shape[i].e && shape[i].e[0] && maxVertextCount !== shape[i].e[0].i.length) {
                addVertices(shape[i].e[0], maxVertextCount);
            }
        }
    }
    function iterateProperties(iteratable, array, frameRate, stretch, isText, isEnabled, includeHiddenData) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var bm_blendModes = $.__bodymovin.bm_blendModes;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var shapeItemTypes = $.__bodymovin.shapeTypes;
        var getItemType = $.__bodymovin.getShapeType;
        var i;
        var len = iteratable.numProperties;
        var ob, prop, itemType, enabled;
        for (i = 0; i < len; i += 1) {
            ob = null;
            prop = iteratable.property(i + 1);
            if (!includeHiddenData && !prop.enabled) {
                continue;
            }
            if (!isEnabled) {
                enabled = false;
            }
            else {
                enabled = prop.enabled;
            }
            itemType = getItemType(prop.matchName);
            if (isText && itemType !== shapeItemTypes.shape && itemType !== shapeItemTypes.group && itemType !== shapeItemTypes.merge) {
                continue;
            }
            if (itemType === shapeItemTypes.shape) {
                ob = {};
                ob.ind = i;
                ob.ty = itemType;
                ob.ix = prop.propertyIndex;
                ob.ks = bm_keyframeHelper.exportKeyframes(prop.property('Path'), frameRate, stretch);
                checkVertexCount(ob.ks.k);
                if (prop.property("Shape Direction").value === 3) {
                    reverseShape(ob.ks.k);
                }
            }
            else if (itemType === shapeItemTypes.rect && !isText) {
                ob = {};
                ob.ty = itemType;
                ob.d = prop.property("Shape Direction").value;
                ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Size'), frameRate, stretch);
                ob.p = bm_keyframeHelper.exportKeyframes(prop.property('Position'), frameRate, stretch);
                ob.r = bm_keyframeHelper.exportKeyframes(prop.property('Roundness'), frameRate, stretch);
            }
            else if (itemType === shapeItemTypes.star && !isText) {
                ob = {};
                ob.ty = itemType;
                ob.sy = prop.property("Type").value;
                ob.d = prop.property("Shape Direction").value;
                ob.pt = bm_keyframeHelper.exportKeyframes(prop.property('Points'), frameRate, stretch);
                ob.p = bm_keyframeHelper.exportKeyframes(prop.property('Position'), frameRate, stretch);
                ob.r = bm_keyframeHelper.exportKeyframes(prop.property('Rotation'), frameRate, stretch);
                if (ob.sy === 1) {
                    ob.ir = bm_keyframeHelper.exportKeyframes(prop.property('Inner Radius'), frameRate, stretch);
                    ob.is = bm_keyframeHelper.exportKeyframes(prop.property('Inner Roundness'), frameRate, stretch);
                }
                ob.or = bm_keyframeHelper.exportKeyframes(prop.property('Outer Radius'), frameRate, stretch);
                ob.os = bm_keyframeHelper.exportKeyframes(prop.property('Outer Roundness'), frameRate, stretch);
                ob.ix = prop.propertyIndex;
            }
            else if (itemType === shapeItemTypes.ellipse) {
                ob = {};
                ob.d = prop.property("Shape Direction").value;
                ob.ty = itemType;
                ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Size'), frameRate, stretch);
                ob.p = bm_keyframeHelper.exportKeyframes(prop.property('Position'), frameRate, stretch);
            }
            else if (itemType === shapeItemTypes.fill) {
                ob = {};
                ob.ty = itemType;
                ob.c = bm_keyframeHelper.exportKeyframes(prop.property('Color'), frameRate, stretch);
                ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Opacity'), frameRate, stretch);
                ob.r = prop.property('Fill Rule').value;
                ob.bm = bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value);
            }
            else if (itemType === shapeItemTypes.gfill) {
                ob = {};
                ob.ty = itemType;
                ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Opacity'), frameRate, stretch);
                ob.r = prop.property('Fill Rule').value;
                ob.bm = bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value);
                navigationShapeTree.push(prop.name);
                exportGradientData(ob, prop, frameRate, stretch, navigationShapeTree);
                navigationShapeTree.pop();
            }
            else if (itemType === shapeItemTypes.gStroke) {
                ob = {};
                ob.ty = itemType;
                ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Opacity'), frameRate, stretch);
                ob.w = bm_keyframeHelper.exportKeyframes(prop.property('Stroke Width'), frameRate, stretch);
                navigationShapeTree.push(prop.name);
                exportGradientData(ob, prop, frameRate, stretch, navigationShapeTree);
                navigationShapeTree.pop();
                ob.lc = prop.property('Line Cap').value;
                ob.lj = prop.property('Line Join').value;
                if (ob.lj === 1) {
                    ob.ml = Math.round(prop.property('Miter Limit').value * 100) / 100;
                    ob.ml2 = bm_keyframeHelper.exportKeyframes(prop.property('Miter Limit'), frameRate, stretch);
                }
                ob.bm = bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value);
                getDashData(ob, prop, frameRate, stretch);
            }
            else if (itemType === shapeItemTypes.stroke) {
                ob = {};
                ob.ty = itemType;
                ob.c = bm_keyframeHelper.exportKeyframes(prop.property('Color'), frameRate, stretch);
                ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Opacity'), frameRate, stretch);
                ob.w = bm_keyframeHelper.exportKeyframes(prop.property('Stroke Width'), frameRate, stretch);
                ob.lc = prop.property('Line Cap').value;
                ob.lj = prop.property('Line Join').value;
                if (ob.lj === 1) {
                    ob.ml = Math.round(prop.property('Miter Limit').value * 100) / 100;
                }
                ob.bm = bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value);
                getDashData(ob, prop, frameRate, stretch);
            }
            else if (itemType === shapeItemTypes.repeater) {
                ob = {};
                ob.ty = itemType;
                ob.c = bm_keyframeHelper.exportKeyframes(prop.property('Copies'), frameRate, stretch);
                ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Offset'), frameRate, stretch);
                ob.m = prop.property('Composite').value;
                ob.ix = prop.propertyIndex;
                var trOb = {};
                var transformProperty = prop.property('Transform');
                trOb.ty = 'tr';
                trOb.p = bm_keyframeHelper.exportKeyframes(transformProperty.property('Position'), frameRate, stretch);
                trOb.a = bm_keyframeHelper.exportKeyframes(transformProperty.property('Anchor Point'), frameRate, stretch);
                trOb.s = bm_keyframeHelper.exportKeyframes(transformProperty.property('Scale'), frameRate, stretch);
                trOb.r = bm_keyframeHelper.exportKeyframes(transformProperty.property('Rotation'), frameRate, stretch);
                trOb.so = bm_keyframeHelper.exportKeyframes(transformProperty.property('Start Opacity'), frameRate, stretch);
                trOb.eo = bm_keyframeHelper.exportKeyframes(transformProperty.property('End Opacity'), frameRate, stretch);
                trOb.nm = transformProperty.name;
                ob.tr = trOb;
            }
            else if (itemType === shapeItemTypes.merge) {
                ob = {};
                ob.ty = itemType;
                ob.mm = prop.property('ADBE Vector Merge Type').value;
            }
            else if (itemType === shapeItemTypes.trim) {
                ob = {};
                ob.ty = itemType;
                ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Start'), frameRate, stretch);
                ob.e = bm_keyframeHelper.exportKeyframes(prop.property('End'), frameRate, stretch);
                ob.o = bm_keyframeHelper.exportKeyframes(prop.property('Offset'), frameRate, stretch);
                ob.m = prop.property('Trim Multiple Shapes').value;
                ob.ix = prop.propertyIndex;
            }
            else if (itemType === shapeItemTypes.twist) {
                ob = {};
                ob.ty = itemType;
                ob.a = bm_keyframeHelper.exportKeyframes(prop.property('ADBE Vector Twist Angle'), frameRate, stretch);
                ob.c = bm_keyframeHelper.exportKeyframes(prop.property('ADBE Vector Twist Center'), frameRate, stretch);
                ob.ix = prop.propertyIndex;
            }
            else if (itemType === shapeItemTypes.group) {
                ob = {
                    ty: itemType,
                    it: [],
                    nm: prop.name,
                    np: prop.property('Contents').numProperties,
                    cix: prop.property('Contents').propertyIndex,
                    bm: bm_blendModes.getBlendModeShape(prop.property('Blend Mode').value),
                    ix: prop.propertyIndex,
                };
                navigationShapeTree.push(prop.name);
                iterateProperties(prop.property('Contents'), ob.it, frameRate, stretch, isText, enabled, includeHiddenData);
                if (!isText) {
                    trOb = {};
                    transformProperty = prop.property('Transform');
                    trOb.ty = 'tr';
                    trOb.p = bm_keyframeHelper.exportKeyframes(transformProperty.property('Position'), frameRate, stretch);
                    trOb.a = bm_keyframeHelper.exportKeyframes(transformProperty.property('Anchor Point'), frameRate, stretch);
                    trOb.s = bm_keyframeHelper.exportKeyframes(transformProperty.property('Scale'), frameRate, stretch);
                    trOb.r = bm_keyframeHelper.exportKeyframes(transformProperty.property('Rotation'), frameRate, stretch);
                    trOb.o = bm_keyframeHelper.exportKeyframes(transformProperty.property('Opacity'), frameRate, stretch);
                    if (transformProperty.property('Skew').canSetExpression) {
                        trOb.sk = bm_keyframeHelper.exportKeyframes(transformProperty.property('Skew'), frameRate, stretch);
                        trOb.sa = bm_keyframeHelper.exportKeyframes(transformProperty.property('Skew Axis'), frameRate, stretch);
                    }
                    trOb.nm = transformProperty.name;
                    ob.it.push(trOb);
                }
                navigationShapeTree.pop();
            }
            else if (itemType === shapeItemTypes.roundedCorners) {
                ob = {
                    ty: itemType,
                    nm: prop.name,
                };
                ob.r = bm_keyframeHelper.exportKeyframes(prop.property('Radius'), frameRate, stretch);
                ob.ix = prop.propertyIndex;
            }
            else if (itemType === shapeItemTypes.offsetPath) {
                ob = {
                    ty: itemType,
                    nm: prop.name,
                };
                ob.a = bm_keyframeHelper.exportKeyframes(prop.property('Amount'), frameRate, stretch);
                ob.lj = prop.property('Line Join').value;
                ob.ml = bm_keyframeHelper.exportKeyframes(prop.property('Miter Limit'), frameRate, stretch);
                ob.ix = prop.propertyIndex;
            }
            else if (itemType === shapeItemTypes.puckerAndBloat) {
                ob = {
                    ty: itemType,
                    nm: prop.name,
                };
                ob.a = bm_keyframeHelper.exportKeyframes(prop.property('Amount'), frameRate, stretch);
                ob.ix = prop.propertyIndex;
            }
            else if (itemType === shapeItemTypes.zigZag) {
                ob = {
                    ty: itemType,
                    nm: prop.name,
                };
                ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Size'), frameRate, stretch);
                ob.r = bm_keyframeHelper.exportKeyframes(prop.property('Ridges per segment'), frameRate, stretch);
                ob.pt = bm_keyframeHelper.exportKeyframes(prop.property('Points'), frameRate, stretch);
                bm_generalUtils.iterateProperty(prop);
                ob.ix = prop.propertyIndex;
            }
            if (ob) {
                ob.nm = bm_generalUtils.sanitizeName(prop.name);
                ob.mn = prop.matchName;
                if (settingsHelper.shouldIgnoreExpressionProperties()) {
                    delete ob.mn;
                    delete ob.np;
                    delete ob.cix;
                    delete ob.np;
                    delete ob.ix;
                }
                ob.hd = !enabled;
                var layerAttributes = bm_generalUtils.findAttributes(prop.name);
                if (layerAttributes.ln) {
                    ob.ln = layerAttributes.ln;
                }
                if (layerAttributes.cl) {
                    ob.cl = layerAttributes.cl;
                }
                array.push(ob);
            }
        }
    }
    function exportGradientData(ob, prop, frameRate, stretch, navigationShapeTree) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var bm_ProjectHelper = $.__bodymovin.bm_ProjectHelper;
        var property = prop.property('Colors');
        var gradientData = bm_ProjectHelper.getGradientData(navigationShapeTree, property.numKeys);
        ob.g = {
            p: gradientData.p,
            k: bm_keyframeHelper.exportKeyframes(property, frameRate, stretch, gradientData.m),
        };
        ob.s = bm_keyframeHelper.exportKeyframes(prop.property('Start Point'), frameRate, stretch);
        ob.e = bm_keyframeHelper.exportKeyframes(prop.property('End Point'), frameRate, stretch);
        ob.t = prop.property('Type').value;
        if (ob.t === 2) {
            ob.h = bm_keyframeHelper.exportKeyframes(prop.property('Highlight Length'), frameRate, stretch);
            ob.a = bm_keyframeHelper.exportKeyframes(prop.property('Highlight Angle'), frameRate, stretch);
        }
    }
    function getDashData(ob, prop, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var j;
        var jLen = prop.property('Dashes').numProperties;
        var dashesData = [];
        var changed = false;
        for (j = 0; j < jLen; j += 1) {
            if (prop.property('Dashes').property(j + 1).canSetExpression) {
                changed = true;
                var dashData = {};
                var name = '';
                if (prop.property('Dashes').property(j + 1).matchName.indexOf('ADBE Vector Stroke Dash') !== -1) {
                    name = 'd';
                }
                else if (prop.property('Dashes').property(j + 1).matchName.indexOf('ADBE Vector Stroke Gap') !== -1) {
                    name = 'g';
                }
                else if (prop.property('Dashes').property(j + 1).matchName === 'ADBE Vector Stroke Offset') {
                    name = 'o';
                }
                dashData.n = name;
                dashData.nm = prop.property('Dashes').property(j + 1).name.toLowerCase().split(' ').join('');
                dashData.v = bm_keyframeHelper.exportKeyframes(prop.property('Dashes').property(j + 1), frameRate, stretch);
                dashesData.push(dashData);
            }
        }
        if (changed) {
            ob.d = dashesData;
        }
    }
    function isStraightAngle(pt1, pt2, pt3) {
        var degToRads = Math.PI / 180;
        var side_a = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
        var side_b = Math.sqrt(Math.pow(pt2[0] - pt3[0], 2) + Math.pow(pt2[1] - pt3[1], 2));
        var side_c = Math.sqrt(Math.pow(pt3[0] - pt1[0], 2) + Math.pow(pt3[1] - pt1[1], 2));
        var angle = Math.acos((Math.pow(side_a, 2) + Math.pow(side_b, 2) - Math.pow(side_c, 2)) / (2 * side_a * side_b));
        return Math.abs((angle / degToRads) - 90) < 0.01;
    }
    function isShapeSquare(shapeData) {
        if (shapeData.v.length !== 4) {
            return false;
        }
        var i = 0;
        while (i < 4) {
            if (shapeData.i[i][0] !== 0
                || shapeData.i[i][1] !== 0
                || shapeData.o[i][0] !== 0
                || shapeData.o[i][1] !== 0) {
                return false;
            }
            i += 1;
        }
        var vertices = shapeData.v;
        return isStraightAngle(vertices[0], vertices[1], vertices[2]) && isStraightAngle(vertices[1], vertices[2], vertices[3]) && isStraightAngle(vertices[2], vertices[3], vertices[0]);
    }
    function removeUnwantedMergePaths(items) {
        var shapeItemTypes = $.__bodymovin.shapeTypes;
        if (!items) {
            return;
        }
        var i;
        var len = items.length;
        var canRemoveContainerShape = false;
        var containingBoxIndex = 0, containingShape;
        for (i = len - 1; i >= 0; i -= 1) {
            if (items[i].ty === shapeItemTypes.merge && items[i].mm === 4 && i > 0) {
                if (items[i - 1].ty === shapeItemTypes.shape) {
                    containingShape = items[i - 1];
                    if (containingShape.ks.a === 0 && isShapeSquare(containingShape.ks.k)) {
                        containingBoxIndex = i;
                        canRemoveContainerShape = true;
                    }
                }
                else if (items[i - 1].ty === shapeItemTypes.group) {
                    var containingGroup = items[i - 1];
                    var groupItems = containingGroup.it;
                    if (groupItems && groupItems.length > 1 && groupItems[groupItems.length - 2].ty === shapeItemTypes.shape) {
                        containingShape = groupItems[groupItems.length - 2];
                        if (containingShape.ks.a === 0 && isShapeSquare(containingShape.ks.k)) {
                            containingBoxIndex = i;
                            canRemoveContainerShape = true;
                        }
                    }
                }
            }
            if (items[i].ty === shapeItemTypes.group) {
                removeUnwantedMergePaths(items[i].it);
            }
        }
        if (canRemoveContainerShape) {
            items.splice(containingBoxIndex - 1, 2);
        }
    }
    function exportShape(layerInfo, layerOb, frameRate, isText, params, includeHiddenData) {
        var stretch = layerOb.sr || 1;
        var containingComp = layerInfo.containingComp;
        navigationShapeTree.length = 0;
        navigationShapeTree.push(containingComp.name);
        navigationShapeTree.push(layerInfo.name);
        var shapes = [];
        var contents = layerInfo.property('ADBE Root Vectors Group');
        layerOb.shapes = shapes;
        iterateProperties(contents, shapes, frameRate, stretch, isText, true, includeHiddenData);
        removeUnwantedMergePaths(shapes);
    }
    var bm_shapeHelper = { exportShape: exportShape, checkVertexCount: checkVertexCount };

    function exportTransform(layerInfo, data, frameRate) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var skipDefaultProperties = settingsHelper.shouldSkipDefaultProperties();
        if (!layerInfo.transform) {
            return;
        }
        var stretch = data.sr;
        data.ks = {};
        if (layerInfo.transform.opacity) {
            data.ks.o = bm_keyframeHelper.exportKeyframes(layerInfo.transform.opacity, frameRate, stretch);
        }
        if (layerInfo.threeDLayer) {
            data.ks.rx = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Rotate X'), frameRate, stretch);
            data.ks.ry = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Rotate Y'), frameRate, stretch);
            data.ks.rz = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Rotate Z'), frameRate, stretch);
            data.ks.or = bm_keyframeHelper.exportKeyframes(layerInfo.transform.Orientation, frameRate, stretch);
        }
        else if (layerInfo.transform.rotation) {
            data.ks.r = bm_keyframeHelper.exportKeyframes(layerInfo.transform.rotation, frameRate, stretch);
        }
        if (layerInfo.transform.position.dimensionsSeparated) {
            data.ks.p = { s: true };
            data.ks.p.x = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Position_0'), frameRate, stretch);
            data.ks.p.y = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Position_1'), frameRate, stretch);
            if (layerInfo.threeDLayer) {
                data.ks.p.z = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Position_2'), frameRate, stretch);
            }
        }
        else {
            data.ks.p = bm_keyframeHelper.exportKeyframes(layerInfo.transform.position, frameRate, stretch);
            if (!!data.ks.p
                && !layerInfo.threeDLayer
                && !settingsHelper.shouldIgnoreExpressionProperties()) {
                data.ks.p.l = 2;
            }
        }
        if (layerInfo.transform.property('ADBE Anchor Point')) {
            data.ks.a = bm_keyframeHelper.exportKeyframes(layerInfo.transform.property('ADBE Anchor Point'), frameRate, stretch);
            if (!!data.ks.a
                && !layerInfo.threeDLayer
                && !settingsHelper.shouldIgnoreExpressionProperties()) {
                data.ks.a.l = 2;
            }
        }
        if (layerInfo.transform.Scale) {
            data.ks.s = bm_keyframeHelper.exportKeyframes(layerInfo.transform.Scale, frameRate, stretch);
            if (!!data.ks.s
                && !layerInfo.threeDLayer
                && !settingsHelper.shouldIgnoreExpressionProperties()) {
                data.ks.s.l = 2;
            }
        }
        if (layerInfo.autoOrient === AutoOrientType.ALONG_PATH) {
            data.ao = 1;
        }
        else {
            data.ao = 0;
        }
        if (skipDefaultProperties) {
            if (data.ks.o && !data.ks.o.x && data.ks.o.k === 100) {
                delete data.ks.o;
            }
            if (data.ks.r && !data.ks.r.x && data.ks.r.k === 0) {
                delete data.ks.r;
            }
            if (data.ks.p && !data.ks.p.x && data.ks.p.k && data.ks.p.k.length) {
                if ((data.ks.p.k.length === 2 && data.ks.p.k[0] === 0 && data.ks.p.k[1] === 0)
                    || (data.ks.p.k.length === 3 && data.ks.p.k[0] === 0 && data.ks.p.k[1] === 0 && data.ks.p.k[2] === 0)) {
                    delete data.ks.p;
                }
            }
            if (data.ks.a && !data.ks.a.x && data.ks.a.k && data.ks.a.k.length) {
                if ((data.ks.a.k.length === 2 && data.ks.a.k[0] === 0 && data.ks.a.k[1] === 0)
                    || (data.ks.a.k.length === 3 && data.ks.a.k[0] === 0 && data.ks.a.k[1] === 0 && data.ks.a.k[2] === 0)) {
                    delete data.ks.a;
                }
            }
            if (data.ks.s && !data.ks.s.x && data.ks.s.k && data.ks.s.k.length) {
                if ((data.ks.s.k.length === 2 && data.ks.s.k[0] === 100 && data.ks.s.k[1] === 100)
                    || (data.ks.s.k.length === 3 && data.ks.s.k[0] === 100 && data.ks.s.k[1] === 100 && data.ks.s.k[2] === 100)) {
                    delete data.ks.s;
                }
            }
        }
    }
    var bm_transformHelper = {
        exportTransform: exportTransform,
    };

    var effectTypes = {
        sliderControl: 0,
        colorControl: 2,
        pointControl: 3,
        group: 5,
        noValue: 6,
        dropDownControl: 7,
        customValue: 9,
        layerIndex: 10,
        maskIndex: 11,
        tint: 20,
        fill: 21,
        stroke: 22,
        tritone: 23,
        proLevels: 24,
        dropShadow: 25,
        radialWipe: 26,
        displacementMap: 27,
        matte3: 28,
        gaussianBlur2: 29,
        twirl: 30,
        mesh_warp: 31,
        ripple: 32,
        spherize: 33,
        freePin3: 34,
        geometry2: 35,
    };
    function getEffectType(name) {
        switch (name) {
            case 'ADBE Tint':
                return effectTypes.tint;
            case 'ADBE Fill':
                return effectTypes.fill;
            case 'ADBE Stroke':
                return effectTypes.stroke;
            case 'ADBE Tritone':
                return effectTypes.tritone;
            case 'ADBE Pro Levels2':
                return effectTypes.proLevels;
            case 'ADBE Drop Shadow':
                return effectTypes.dropShadow;
            case 'ADBE Radial Wipe':
                return effectTypes.radialWipe;
            case 'ADBE Displacement Map':
                return effectTypes.displacementMap;
            case 'ADBE Set Matte3':
                return effectTypes.matte3;
            case 'ADBE Gaussian Blur 2':
                return effectTypes.gaussianBlur2;
            case 'ADBE Twirl':
                return effectTypes.twirl;
            case 'ADBE MESH WARP':
                return effectTypes.mesh_warp;
            case 'ADBE Ripple':
                return effectTypes.ripple;
            case 'ADBE Spherize':
                return effectTypes.spherize;
            case 'ADBE FreePin3':
                return effectTypes.freePin3;
            case 'ADBE Geometry2':
                return effectTypes.geometry2;
            default:
                return effectTypes.group;
        }
    }
    function findEffectPropertyType(prop) {
        var propertyValueType = prop.propertyValueType;
        if (propertyValueType === PropertyValueType.NO_VALUE) {
            return effectTypes.noValue;
        }
        else if (propertyValueType === PropertyValueType.OneD) {
            if (!prop.isInterpolationTypeValid(KeyframeInterpolationType.LINEAR)) {
                return effectTypes.dropDownControl;
            }
            return effectTypes.sliderControl;
        }
        else if (propertyValueType === PropertyValueType.COLOR) {
            return effectTypes.colorControl;
        }
        else if (propertyValueType === PropertyValueType.CUSTOM_VALUE) {
            return effectTypes.customValue;
        }
        else if (propertyValueType === PropertyValueType.LAYER_INDEX) {
            return effectTypes.layerIndex;
        }
        else if (propertyValueType === PropertyValueType.MASK_INDEX) {
            return effectTypes.maskIndex;
        }
        else {
            return effectTypes.pointControl;
        }
    }
    function setupBasicEffect(elem, effectType, matchName) {
        var ob = {};
        ob.ty = effectType;
        ob.nm = elem.name;
        ob.np = elem.numProperties + 1;
        ob.mn = matchName;
        ob.ix = elem.propertyIndex;
        ob.en = elem.enabled === true ? 1 : 0;
        ob.ef = [];
        return ob;
    }
    function exportNoValueControl(effect, frameRate, stretch) {
        var ob = {};
        ob.ty = effectTypes.noValue;
        ob.nm = effect.name;
        ob.mn = effect.matchName;
        ob.ix = effect.propertyIndex;
        ob.v = 0;
        return ob;
    }
    function exportSliderControl(effect, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.ty = effectTypes.sliderControl;
        ob.nm = effect.name;
        ob.mn = effect.matchName;
        ob.ix = effect.propertyIndex;
        ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
        return ob;
    }
    function exportColorControl(effect, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.ty = effectTypes.colorControl;
        ob.nm = effect.name;
        ob.mn = effect.matchName;
        ob.ix = effect.propertyIndex;
        ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
        return ob;
    }
    function exportPointControl(effect, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.ty = effectTypes.pointControl;
        ob.nm = effect.name;
        ob.mn = effect.matchName;
        ob.ix = effect.propertyIndex;
        ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
        return ob;
    }
    function exportDropDownControl(effect, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.ty = effectTypes.dropDownControl;
        ob.nm = effect.name;
        ob.mn = effect.matchName;
        ob.ix = effect.propertyIndex;
        ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
        return ob;
    }
    function exportLayerIndexControl(effect, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.ty = effectTypes.layerIndex;
        ob.nm = effect.name;
        ob.mn = effect.matchName;
        ob.ix = effect.propertyIndex;
        ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
        return ob;
    }
    function exportMaskIndexControl(effect, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.ty = effectTypes.layerIndex;
        ob.nm = effect.name;
        ob.mn = effect.matchName;
        ob.ix = effect.propertyIndex;
        ob.v = bm_keyframeHelper.exportKeyframes(effect, frameRate, stretch);
        return ob;
    }
    function exportCustomControl(effect, frameRate, stretch) {
        var ob = {};
        return ob;
    }
    function setChannelDropdownToValue(elem, value) {
        var firstProp = elem.property(1);
        if (firstProp.value !== value) {
            firstProp.setValue(value);
        }
    }
    function refreshChannelDropdownValue(elem) {
        elem.selected = true;
        var firstProp = elem.property(1);
        var value_2 = firstProp.value;
        firstProp.setValue(value_2);
    }
    function setChannelDropdownToFirst(elem) {
        setChannelDropdownToValue(elem, 1);
    }
    function handleProLevels(elem) {
        elem.selected = true;
        setChannelDropdownToFirst(elem);
    }
    function handleEasyLevels(elem, ob, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        elem.selected = true;
        ob.ty = effectTypes.proLevels;
        setChannelDropdownToValue(elem, 1);
        ob.ef.push({
            "ty": 7,
            "nm": "Channel:",
            "mn": "ADBE Pro Levels2-0001",
            "ix": 1,
            "v": {
                "a": 0,
                "k": 1,
                "ix": 1
            }
        });
        ob.ef.push({});
        ob.ef.push({
            "ty": 6,
            "nm": "RGB",
            "mn": "ADBE Pro Levels2-0003",
            "ix": 3,
            "v": 0
        });
        var prop = elem.property(3);
        ob.ef.push({
            "ty": 0,
            "nm": "Input Black",
            "mn": "ADBE Pro Levels2-0004",
            "ix": 4,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(4);
        ob.ef.push({
            "ty": 0,
            "nm": "Input White",
            "mn": "ADBE Pro Levels2-0005",
            "ix": 5,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(5);
        ob.ef.push({
            "ty": 0,
            "nm": "Gamma",
            "mn": "ADBE Pro Levels2-0006",
            "ix": 6,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(6);
        ob.ef.push({
            "ty": 0,
            "nm": "Output Black",
            "mn": "ADBE Pro Levels2-0007",
            "ix": 7,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(7);
        ob.ef.push({
            "ty": 0,
            "nm": "Output White",
            "mn": "ADBE Pro Levels2-0008",
            "ix": 8,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        ob.ef.push({
            "ty": 6,
            "nm": "RGB",
            "mn": "ADBE Pro Levels2-0009",
            "ix": 9,
            "v": 0
        });
        ob.ef.push({
            "ty": 6,
            "nm": "Red",
            "mn": "ADBE Pro Levels2-0010",
            "ix": 10,
            "v": 0
        });
        setChannelDropdownToValue(elem, 2);
        prop = elem.property(3);
        ob.ef.push({
            "ty": 0,
            "nm": "Red Input Black",
            "mn": "ADBE Pro Levels2-0011",
            "ix": 11,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(4);
        ob.ef.push({
            "ty": 0,
            "nm": "Red Input White",
            "mn": "ADBE Pro Levels2-0012",
            "ix": 12,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(5);
        ob.ef.push({
            "ty": 0,
            "nm": "Red Gamma",
            "mn": "ADBE Pro Levels2-0013",
            "ix": 13,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(6);
        ob.ef.push({
            "ty": 0,
            "nm": "Red Output Black",
            "mn": "ADBE Pro Levels2-0014",
            "ix": 14,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(7);
        ob.ef.push({
            "ty": 0,
            "nm": "Red Output White",
            "mn": "ADBE Pro Levels2-0015",
            "ix": 15,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        ob.ef.push({
            "ty": 6,
            "nm": "Red",
            "mn": "ADBE Pro Levels2-0016",
            "ix": 16,
            "v": 0
        });
        ob.ef.push({
            "ty": 6,
            "nm": "Green",
            "mn": "ADBE Pro Levels2-0017",
            "ix": 17,
            "v": 0
        });
        setChannelDropdownToValue(elem, 3);
        prop = elem.property(3);
        ob.ef.push({
            "ty": 0,
            "nm": "Green Input Black",
            "mn": "ADBE Pro Levels2-0018",
            "ix": 18,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(4);
        ob.ef.push({
            "ty": 0,
            "nm": "Green Input White",
            "mn": "ADBE Pro Levels2-0019",
            "ix": 19,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(5);
        ob.ef.push({
            "ty": 0,
            "nm": "Green Gamma",
            "mn": "ADBE Pro Levels2-0020",
            "ix": 20,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(6);
        ob.ef.push({
            "ty": 0,
            "nm": "Green Output Black",
            "mn": "ADBE Pro Levels2-0021",
            "ix": 21,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(7);
        ob.ef.push({
            "ty": 0,
            "nm": "Green Output White",
            "mn": "ADBE Pro Levels2-0022",
            "ix": 22,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        ob.ef.push({
            "ty": 6,
            "nm": "Green",
            "mn": "ADBE Pro Levels2-0023",
            "ix": 23,
            "v": 0
        });
        ob.ef.push({
            "ty": 6,
            "nm": "Blue",
            "mn": "ADBE Pro Levels2-0024",
            "ix": 24,
            "v": 0
        });
        setChannelDropdownToValue(elem, 4);
        prop = elem.property(3);
        ob.ef.push({
            "ty": 0,
            "nm": "Blue Input Black",
            "mn": "ADBE Pro Levels2-0025",
            "ix": 25,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(4);
        ob.ef.push({
            "ty": 0,
            "nm": "Blue Input White",
            "mn": "ADBE Pro Levels2-0026",
            "ix": 26,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(5);
        ob.ef.push({
            "ty": 0,
            "nm": "Blue Gamma",
            "mn": "ADBE Pro Levels2-0027",
            "ix": 27,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(6);
        ob.ef.push({
            "ty": 0,
            "nm": "Blue Output Black",
            "mn": "ADBE Pro Levels2-0028",
            "ix": 28,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(7);
        ob.ef.push({
            "ty": 0,
            "nm": "Blue Output White",
            "mn": "ADBE Pro Levels2-0029",
            "ix": 29,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        ob.ef.push({
            "ty": 6,
            "nm": "Blue",
            "mn": "ADBE Pro Levels2-0030",
            "ix": 30,
            "v": 0
        });
        ob.ef.push({
            "ty": 6,
            "nm": "Alpha",
            "mn": "ADBE Pro Levels2-0031",
            "ix": 31,
            "v": 0
        });
        setChannelDropdownToValue(elem, 5);
        prop = elem.property(3);
        ob.ef.push({
            "ty": 0,
            "nm": "Alpha Input Black",
            "mn": "ADBE Pro Levels2-0032",
            "ix": 32,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(4);
        ob.ef.push({
            "ty": 0,
            "nm": "Alpha Input White",
            "mn": "ADBE Pro Levels2-0033",
            "ix": 33,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(5);
        ob.ef.push({
            "ty": 0,
            "nm": "Alpha Gamma",
            "mn": "ADBE Pro Levels2-0034",
            "ix": 34,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(6);
        ob.ef.push({
            "ty": 0,
            "nm": "Alpha Output Black",
            "mn": "ADBE Pro Levels2-0035",
            "ix": 35,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(7);
        ob.ef.push({
            "ty": 0,
            "nm": "Alpha Output White",
            "mn": "ADBE Pro Levels2-0036",
            "ix": 36,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        ob.ef.push({
            "ty": 6,
            "nm": "Alpha",
            "mn": "ADBE Pro Levels2-0037",
            "ix": 37,
            "v": 0
        });
        prop = elem.property(8);
        ob.ef.push({
            "ty": 7,
            "nm": "Clip To Output Black",
            "mn": "ADBE Pro Levels2-0038",
            "ix": 38,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        prop = elem.property(9);
        ob.ef.push({
            "ty": 7,
            "nm": "Clip To Output White",
            "mn": "ADBE Pro Levels2-0039",
            "ix": 39,
            "v": bm_keyframeHelper.exportKeyframes(prop, frameRate, stretch)
        });
        return ob;
    }
    function handleHueSaturation(elem) {
        refreshChannelDropdownValue(elem);
    }
    function exportCustomEffect(elem, effectType, frameRate, stretch) {
        var annotationsManager = $.__bodymovin.bm_annotationsManager;
        if (effectType === effectTypes.proLevels) {
            handleProLevels(elem);
        }
        if (elem.matchName === 'ADBE Easy Levels2') {
            var ob_1 = setupBasicEffect(elem, effectType, 'ADBE Pro Levels2');
            return handleEasyLevels(elem, ob_1, frameRate, stretch);
        }
        var ob = setupBasicEffect(elem, effectType, elem.matchName);
        if (elem.matchName === 'ADBE HUE SATURATION') {
            handleHueSaturation(elem);
        }
        var i;
        var len = elem.numProperties;
        var prop;
        for (i = 0; i < len; i += 1) {
            prop = elem.property(i + 1);
            if (annotationsManager.isAnnotation(prop.matchName)) ;
            else if (prop.matchName === "ADBE FreePin3 ARAP Group"
                || prop.matchName === "ADBE FreePin3 Mesh Group"
                || prop.matchName === "ADBE FreePin3 Mesh Atom"
                || prop.matchName === "ADBE FreePin3 PosPins"
                || prop.matchName === "ADBE FreePin3 StarchPins"
                || prop.matchName === "ADBE FreePin3 HghtPins"
                || prop.matchName === "ADBE FreePin3 PosPin Atom") {
                ob.ef.push(exportCustomEffect(prop, '', frameRate, stretch));
            }
            else if (prop.propertyType === PropertyType.PROPERTY) {
                var type = findEffectPropertyType(prop);
                if (type === effectTypes.noValue) {
                    ob.ef.push(exportNoValueControl(prop));
                }
                else if (type === effectTypes.sliderControl) {
                    ob.ef.push(exportSliderControl(prop, frameRate, stretch));
                }
                else if (type === effectTypes.colorControl) {
                    ob.ef.push(exportColorControl(prop, frameRate, stretch));
                }
                else if (type === effectTypes.dropDownControl) {
                    ob.ef.push(exportDropDownControl(prop, frameRate, stretch));
                }
                else if (type === effectTypes.dropDownControl) {
                    ob.ef.push(exportDropDownControl(prop, frameRate, stretch));
                }
                else if (type === effectTypes.customValue) {
                    ob.ef.push(exportCustomControl());
                }
                else if (type === effectTypes.layerIndex) {
                    ob.ef.push(exportLayerIndexControl(prop, frameRate, stretch));
                }
                else if (type === effectTypes.maskIndex) {
                    ob.ef.push(exportMaskIndexControl(prop, frameRate, stretch));
                }
                else {
                    ob.ef.push(exportPointControl(prop, frameRate, stretch));
                }
            }
            else {
                if (prop.name !== 'Compositing Options' && prop.matchName !== 'ADBE Effect Built In Params' && prop.propertyType !== PropertyType.NAMED_GROUP) {
                    ob.ef.push(exportCustomEffect(prop, '', frameRate, stretch));
                }
            }
        }
        return ob;
    }
    function exportEffects(layerInfo, layerData, frameRate, includeHiddenData) {
        var annotationsManager = $.__bodymovin.bm_annotationsManager;
        var stretch = layerData.sr;
        if (!(layerInfo.effect && layerInfo.effect.numProperties > 0)) {
            return;
        }
        var effects = layerInfo.effect;
        var i;
        var len = effects.numProperties;
        var effectElement;
        var effectsArray = [];
        var annotationsArray = [];
        for (i = 0; i < len; i += 1) {
            effectElement = effects(i + 1);
            if (effectElement.enabled || includeHiddenData) {
                if (annotationsManager.isAnnotation(effectElement.matchName)) {
                    continue;
                }
                var effectType = getEffectType(effectElement.matchName);
                effectsArray.push(exportCustomEffect(effectElement, effectType, frameRate, stretch));
            }
        }
        if (effectsArray.length) {
            layerData.ef = effectsArray;
        }
        if (annotationsArray.length) {
            layerData.annots = annotationsArray;
        }
    }
    var bm_effectsHelper = {
        exportEffects: exportEffects,
    };

    function exportStroke(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.c = bm_keyframeHelper.exportKeyframes(style.property('frameFX/color'), frameRate, stretch);
        ob.s = bm_keyframeHelper.exportKeyframes(style.property('frameFX/size'), frameRate, stretch);
        return ob;
    }
    function exportDropShadow(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.c = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/color'), frameRate, stretch);
        ob.o = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/opacity'), frameRate, stretch);
        ob.a = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/localLightingAngle'), frameRate, stretch);
        ob.s = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/blur'), frameRate, stretch);
        ob.d = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/distance'), frameRate, stretch);
        ob.ch = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/chokeMatte'), frameRate, stretch);
        ob.bm = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/mode2'), frameRate, stretch);
        ob.no = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/noise'), frameRate, stretch);
        ob.lc = bm_keyframeHelper.exportKeyframes(style.property('dropShadow/layerConceals'), frameRate, stretch);
        return ob;
    }
    function exportInnerShadow(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.c = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/color'), frameRate, stretch);
        ob.o = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/opacity'), frameRate, stretch);
        ob.a = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/localLightingAngle'), frameRate, stretch);
        ob.s = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/blur'), frameRate, stretch);
        ob.d = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/distance'), frameRate, stretch);
        ob.ch = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/chokeMatte'), frameRate, stretch);
        ob.bm = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/mode2'), frameRate, stretch);
        ob.no = bm_keyframeHelper.exportKeyframes(style.property('innerShadow/noise'), frameRate, stretch);
        return ob;
    }
    function exportOuterGlow(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.c = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/color'), frameRate, stretch);
        ob.o = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/opacity'), frameRate, stretch);
        ob.s = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/blur'), frameRate, stretch);
        ob.r = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/inputRange'), frameRate, stretch);
        ob.ch = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/chokeMatte'), frameRate, stretch);
        ob.bm = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/mode2'), frameRate, stretch);
        ob.no = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/noise'), frameRate, stretch);
        ob.j = bm_keyframeHelper.exportKeyframes(style.property('outerGlow/shadingNoise'), frameRate, stretch);
        return ob;
    }
    function exportInnerGlow(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.c = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/color'), frameRate, stretch);
        ob.o = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/opacity'), frameRate, stretch);
        ob.s = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/blur'), frameRate, stretch);
        ob.r = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/inputRange'), frameRate, stretch);
        ob.sr = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/innerGlowSource'), frameRate, stretch);
        ob.ch = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/chokeMatte'), frameRate, stretch);
        ob.bm = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/mode2'), frameRate, stretch);
        ob.no = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/noise'), frameRate, stretch);
        ob.j = bm_keyframeHelper.exportKeyframes(style.property('innerGlow/shadingNoise'), frameRate, stretch);
        return ob;
    }
    function exportBevelEmboss(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        $.__bodymovin.bm_generalUtils.iterateProperty(style);
        ob.bs = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/bevelStyle'), frameRate, stretch);
        ob.bt = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/bevelTechnique'), frameRate, stretch);
        ob.sr = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/strengthRatio'), frameRate, stretch);
        ob.bd = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/bevelDirection'), frameRate, stretch);
        ob.s = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/blur'), frameRate, stretch);
        ob.sf = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/softness'), frameRate, stretch);
        ob.ga = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/useGlobalAngle'), frameRate, stretch);
        ob.a = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/localLightingAngle'), frameRate, stretch);
        ob.ll = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/localLightingAltitude'), frameRate, stretch);
        ob.hm = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/highlightMode'), frameRate, stretch);
        ob.hc = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/highlightColor'), frameRate, stretch);
        ob.ho = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/highlightOpacity'), frameRate, stretch);
        ob.sm = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/shadowMode'), frameRate, stretch);
        ob.sc = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/shadowColor'), frameRate, stretch);
        ob.so = bm_keyframeHelper.exportKeyframes(style.property('bevelEmboss/shadowOpacity'), frameRate, stretch);
        return ob;
    }
    function exportSatin(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.bm = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/mode2'), frameRate, stretch);
        ob.c = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/color'), frameRate, stretch);
        ob.o = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/opacity'), frameRate, stretch);
        ob.a = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/localLightingAngle'), frameRate, stretch);
        ob.d = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/distance'), frameRate, stretch);
        ob.s = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/blur'), frameRate, stretch);
        ob.in = bm_keyframeHelper.exportKeyframes(style.property('chromeFX/invert'), frameRate, stretch);
        return ob;
    }
    function exportColorOverlay(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.bm = bm_keyframeHelper.exportKeyframes(style.property('solidFill/mode2'), frameRate, stretch);
        ob.c = bm_keyframeHelper.exportKeyframes(style.property('solidFill/color'), frameRate, stretch);
        ob.so = bm_keyframeHelper.exportKeyframes(style.property('solidFill/opacity'), frameRate, stretch);
        return ob;
    }
    function exportGradientOverlay(style, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        ob.bm = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/mode2'), frameRate, stretch);
        ob.o = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/opacity'), frameRate, stretch);
        ob.gf = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/gradient'), frameRate, stretch);
        ob.gs = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/gradientSmoothness'), frameRate, stretch);
        ob.a = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/angle'), frameRate, stretch);
        ob.gt = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/type'), frameRate, stretch);
        ob.re = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/reverse'), frameRate, stretch);
        ob.al = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/align'), frameRate, stretch);
        ob.s = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/scale'), frameRate, stretch);
        ob.of = bm_keyframeHelper.exportKeyframes(style.property('gradientFill/offset'), frameRate, stretch);
        return ob;
    }
    function exportStyles(layerInfo, layerData, frameRate) {
        var layerStyleTypes = $.__bodymovin.layerStyleTypes;
        var getStyleType = $.__bodymovin.getLayerStyleType;
        if (!(layerInfo.property('Layer Styles') && layerInfo.property('Layer Styles').numProperties > 0)) {
            return;
        }
        var stretch = layerData.sr;
        var styles = layerInfo.property('Layer Styles');
        var i;
        var len = styles.numProperties;
        var styleElement;
        var stylesArray = [];
        for (i = 0; i < len; i += 1) {
            styleElement = styles(i + 1);
            if (styleElement.enabled) {
                var styleOb = null;
                var styleType = getStyleType(styleElement.matchName);
                switch (styleType) {
                    case layerStyleTypes.stroke:
                        styleOb = exportStroke(styleElement, frameRate, stretch);
                        break;
                    case layerStyleTypes.dropShadow:
                        styleOb = exportDropShadow(styleElement, frameRate, stretch);
                        break;
                    case layerStyleTypes.innerShadow:
                        styleOb = exportInnerShadow(styleElement, frameRate, stretch);
                        break;
                    case layerStyleTypes.outerGlow:
                        styleOb = exportOuterGlow(styleElement, frameRate, stretch);
                        break;
                    case layerStyleTypes.innerGlow:
                        styleOb = exportInnerGlow(styleElement, frameRate, stretch);
                        break;
                    case layerStyleTypes.bevelEmboss:
                        styleOb = exportBevelEmboss(styleElement, frameRate, stretch);
                        break;
                    case layerStyleTypes.satin:
                        styleOb = exportSatin(styleElement, frameRate, stretch);
                        break;
                    case layerStyleTypes.colorOverlay:
                        styleOb = exportColorOverlay(styleElement, frameRate, stretch);
                        break;
                    case layerStyleTypes.gradientOverlay:
                        styleOb = exportGradientOverlay(styleElement, frameRate, stretch);
                        break;
                }
                if (styleOb) {
                    styleOb.ty = styleType;
                    styleOb.nm = styleElement.name;
                    stylesArray.push(styleOb);
                }
            }
        }
        if (stylesArray.length) {
            layerData.sy = stylesArray;
        }
    }
    var bm_layerStylesHelper = {
        exportStyles: exportStyles,
    };

    var keyframeHelper;
    var textHelper;
    var rootProperties = [];
    var exportedProps = {};
    var propType = {
        Color: 1,
        Point: 2,
        Scale: 3,
        Float: 4,
        Asset: 50,
        Undefined: 99,
    };
    var matchType = {
        'ADBE Vector Fill Color': propType.Color,
        'ADBE Vector Stroke Color': propType.Color,
        'ADBE Text Stroke Color': propType.Color,
        'ADBE Text Fill Color': propType.Color,
        'ADBE Position': propType.Point,
        'ADBE Vector Repeater Position': propType.Point,
        'ADBE Vector Repeater Anchor': propType.Point,
        'ADBE Anchor Point': propType.Point,
        'ADBE Vector Grad Start Pt': propType.Point,
        'ADBE Vector Grad End Pt': propType.Point,
        'ADBE Vector Rect Position': propType.Point,
        'ADBE Vector Ellipse Position': propType.Point,
        'ADBE Vector Star Position': propType.Point,
        'ADBE Text Anchor Point 3D': propType.Point,
        'ADBE Text Position 3D': propType.Point,
        'ADBE Vector Position': propType.Point,
        'ADBE Vector Anchor': propType.Point,
        'ADBE Opacity': propType.Float,
        'ADBE Vector Fill Opacity': propType.Float,
        'ADBE Vector Stroke Opacity': propType.Float,
        'ADBE Vector Stroke Width': propType.Float,
        'ADBE Position_0': propType.Float,
        'ADBE Position_1': propType.Float,
        'ADBE Position_2': propType.Float,
        'ADBE Rotate X': propType.Float,
        'ADBE Rotate Y': propType.Float,
        'ADBE Rotate Z': propType.Float,
        'ADBE Vector Rect Roundness': propType.Float,
        'ADBE Vector Star Points': propType.Float,
        'ADBE Vector Star Rotation': propType.Float,
        'ADBE Vector Star Inner Radius': propType.Float,
        'ADBE Vector Star Inner Roundess': propType.Float,
        'ADBE Vector Star Outer Radius': propType.Float,
        'ADBE Vector Star Outer Roundess': propType.Float,
        'ADBE Vector Offset Amount': propType.Float,
        'ADBE Vector Offset Miter Limit': propType.Float,
        'ADBE Vector PuckerBloat Amount': propType.Float,
        'ADBE Vector Repeater Copies': propType.Float,
        'ADBE Vector Repeater Offset': propType.Float,
        'ADBE Vector Repeater Rotation': propType.Float,
        'ADBE Vector Repeater Opacity 1': propType.Float,
        'ADBE Vector Repeater Opacity 2': propType.Float,
        'ADBE Vector RoundCorner Radius': propType.Float,
        'ADBE Vector Trim Start': propType.Float,
        'ADBE Vector Trim End': propType.Float,
        'ADBE Vector Trim Offset': propType.Float,
        'ADBE Vector Twist Angle': propType.Float,
        'ADBE Vector Twist Center': propType.Float,
        'ADBE Vector Zigzag Size': propType.Float,
        'ADBE Vector Zigzag Detail': propType.Float,
        'ADBE Text Percent Start': propType.Float,
        'ADBE Text Percent End': propType.Float,
        'ADBE Text Index Start': propType.Float,
        'ADBE Text Index End': propType.Float,
        'ADBE Text Levels Max Ease': propType.Float,
        'ADBE Text Levels Min Ease': propType.Float,
        'ADBE Text Selector Max Amount': propType.Float,
        'ADBE Text Skew': propType.Float,
        'ADBE Text Skew Axis': propType.Float,
        'ADBE Text Rotation': propType.Float,
        'ADBE Text Opacity': propType.Float,
        'ADBE Text Fill Hue': propType.Float,
        'ADBE Text Fill Saturation': propType.Float,
        'ADBE Text Fill Brightness': propType.Float,
        'ADBE Text Stroke Opacity': propType.Float,
        'ADBE Text Stroke Hue': propType.Float,
        'ADBE Text Stroke Saturation': propType.Float,
        'ADBE Text Stroke Brightness': propType.Float,
        'ADBE Text Stroke Width': propType.Float,
        'ADBE Text Tracking Amount': propType.Float,
        'ADBE Vector Rotation': propType.Float,
        'ADBE Vector Group Opacity': propType.Float,
        'ADBE Vector Skew': propType.Float,
        'ADBE Vector Skew Axis': propType.Float,
        'ADBE Scale': propType.Scale,
        'ADBE Vector Rect Size': propType.Scale,
        'ADBE Vector Ellipse Size': propType.Scale,
        'ADBE Vector Repeater Scale': propType.Scale,
        'ADBE Text Scale 3D': propType.Scale,
        'ADBE Vector Scale': propType.Scale,
    };
    function clearTextProperties(propertyName, data) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        var textDict = {
            'font': 'f',
            'f': 'f',
            'size': 's',
            's': 's',
            'color': 'fc',
            'fc': 'fc',
            'justification': 'j',
            'justify': 'j',
            'j': 'j',
            'text': 't',
            't': 't',
            'all caps': 'ca',
            'allcaps': 'ca',
            'ca': 'ca',
        };
        if (propertyName.indexOf('|') !== -1) {
            var properties = propertyName.split('|');
            var keyframes = data.k;
            var persistingProps = {};
            var i = void 0;
            for (i = 0; i < properties.length; i += 1) {
                var sanitizedProp = bm_generalUtils.trimText(properties[i]);
                if (textDict.hasOwnProperty(sanitizedProp)) {
                    persistingProps[textDict[sanitizedProp]] = true;
                }
            }
            for (i = 0; i < keyframes.length; i += 1) {
                var keyframe = keyframes[i];
                var textDocumentProp = keyframe.s;
                for (var s in textDocumentProp) {
                    if (textDocumentProp.hasOwnProperty(s) && !persistingProps.hasOwnProperty(s)) {
                        delete textDocumentProp[s];
                    }
                }
            }
        }
    }
    function addCompProperties(composition, frameRate) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        bm_eventDispatcher.log('addCompProperties');
        function iterateProperty(parent, frameRate, properties) {
            var totalProperties = parent.numProperties;
            for (var i = 0; i < totalProperties; i += 1) {
                var property = parent.property(i + 1);
                var propData = {
                    property: property,
                    id: property.name,
                };
                if (property.matchName === 'ADBE Layer Source Alternate') {
                    propData.type = 'source';
                    propData.layer = property.essentialPropertySource;
                }
                else if (property.matchName === 'ADBE Layer Overrides Group') {
                    propData.type = 'group';
                    propData.properties = [];
                    iterateProperty(property, frameRate, propData.properties);
                }
                else if (property.matchName === 'ADBE Text Document'
                    || property.matchName === 'ADBE EP Text Document') {
                    propData.type = 'property';
                    propData.val = {};
                    var textDocumentSource = property.essentialPropertySource;
                    var textLayer = textDocumentSource.parentProperty.parentProperty;
                    textHelper.exportTextDocumentData(textLayer, propData.val, frameRate);
                    clearTextProperties(property.name, propData.val);
                }
                else {
                    propData.type = 'property';
                    if (propData.id.substr(0, 1) === '#') {
                        propData.val = keyframeHelper.exportKeyframes(property.essentialPropertySource, frameRate, 1);
                    }
                    else {
                        propData.val = keyframeHelper.exportKeyframes(property, frameRate, 1);
                    }
                }
                properties.push(propData);
            }
        }
        try {
            if (!composition.essentialProperty) {
                return;
            }
            if (!settingsHelper.shouldExportEssentialProperties()) {
                return;
            }
            if (!keyframeHelper) {
                keyframeHelper = $.__bodymovin.bm_keyframeHelper;
            }
            if (!textHelper) {
                textHelper = $.__bodymovin.bm_textHelper;
            }
            var essentialProperty = composition.essentialProperty;
            iterateProperty(essentialProperty, frameRate, rootProperties);
        }
        catch (error) {
            if (error) {
                var e = error;
                bm_eventDispatcher.log('ERROR:essentialPropertiesHelper:addCompProperties');
                bm_eventDispatcher.log(e.message);
                bm_eventDispatcher.log(e.line);
                bm_eventDispatcher.log(e.fileName);
            }
            bm_eventDispatcher.log($.stack);
        }
    }
    function searchProperty(property) {
        function searchPropertyInList(property, list) {
            var i;
            var len = list.length;
            for (i = 0; i < len; i += 1) {
                if (list[i].type === 'property') {
                    if (list[i].property.essentialPropertySource == property) {
                        return list[i].val;
                    }
                }
                else if (list[i].type === 'group') {
                    var prop = searchPropertyInList(property, list[i].properties);
                    if (prop) {
                        return prop;
                    }
                }
            }
            return null;
        }
        return searchPropertyInList(property, rootProperties);
    }
    function searchPropertyId(property) {
        function searchPropertyInList(property, list, groupId) {
            var i;
            var len = list.length;
            for (i = 0; i < len; i += 1) {
                if (list[i].type === 'property') {
                    if (list[i].property.essentialPropertySource == property) {
                        if (groupId) {
                            return groupId;
                        }
                        else {
                            if (matchType[property.matchName]) {
                                list[i].prop.t = matchType[property.matchName];
                            }
                            else {
                                list[i].prop.t = propType.Undefined;
                            }
                        }
                        return list[i].id;
                    }
                }
                else if (list[i].type === 'group') {
                    var propId = searchPropertyInList(property, list[i].properties, list[i].id);
                    if (propId) {
                        if (matchType[property.matchName]) {
                            list[i].prop.t = matchType[property.matchName];
                        }
                        else {
                            list[i].prop.t = propType.Undefined;
                        }
                        return propId;
                    }
                }
            }
            return null;
        }
        return searchPropertyInList(property, rootProperties, '');
    }
    function exportProperties() {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if (!settingsHelper.shouldExportEssentialPropertiesAsSlots()) {
            return undefined;
        }
        exportedProps = {};
        var count = 0;
        var prop;
        for (var i = 0; i < rootProperties.length; i += 1) {
            if (rootProperties[i].type === 'property') {
                prop = {
                    p: rootProperties[i].val,
                };
                rootProperties[i].prop = prop;
                exportedProps[rootProperties[i].id] = prop;
                count += 1;
            }
            else if (rootProperties[i].type === 'source') {
                count += 1;
            }
            else if (rootProperties[i].type === 'group' && rootProperties[i].properties.length > 0) {
                prop = {
                    p: rootProperties[i].properties[0].val,
                };
                rootProperties[i].prop = prop;
                exportedProps[rootProperties[i].id] = prop;
                count += 1;
            }
        }
        if (count === 0) {
            return undefined;
        }
        return exportedProps;
    }
    function searchAsset(sourceData, savingData) {
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        for (var i = 0; i < rootProperties.length; i += 1) {
            if (rootProperties[i].type === 'source' && rootProperties[i].layer.source === sourceData.source) {
                var prop = {
                    t: propType.Asset,
                    p: bm_generalUtils.cloneObject(savingData, true),
                };
                prop.p.fileId = undefined;
                exportedProps[rootProperties[i].id] = prop;
                return rootProperties[i].id;
            }
        }
        return '';
    }
    function reset$5() {
        rootProperties = [];
        exportedProps = {};
    }
    var bm_essentialPropertiesHelper = {
        addCompProperties: addCompProperties,
        exportProperties: exportProperties,
        searchProperty: searchProperty,
        searchPropertyId: searchPropertyId,
        searchAsset: searchAsset,
        reset: reset$5,
    };

    function getJustification(value) {
        switch (value) {
            case ParagraphJustification.LEFT_JUSTIFY:
                return 0;
            case ParagraphJustification.RIGHT_JUSTIFY:
                return 1;
            case ParagraphJustification.CENTER_JUSTIFY:
                return 2;
            case ParagraphJustification.FULL_JUSTIFY_LASTLINE_LEFT:
                return 3;
            case ParagraphJustification.FULL_JUSTIFY_LASTLINE_RIGHT:
                return 4;
            case ParagraphJustification.FULL_JUSTIFY_LASTLINE_CENTER:
                return 5;
            case ParagraphJustification.FULL_JUSTIFY_LASTLINE_FULL:
                return 6;
        }
    }
    function findLineHeight(textDocument) {
        var baselineLocs = textDocument.baselineLocs;
        var fontSize = textDocument.fontSize;
        var isFound = false;
        var counter = 1;
        var lineHeight = fontSize;
        while (!isFound) {
            if (baselineLocs.length > 1 + counter * 4) {
                lineHeight = (baselineLocs[1 + counter * 4] - baselineLocs[1]) / counter;
                if (lineHeight < 100000) {
                    isFound = true;
                }
                else {
                    lineHeight = fontSize;
                }
            }
            else {
                isFound = true;
            }
            counter += 1;
        }
        return lineHeight;
    }
    function exportTextDocumentData(layerInfo, data, frameRate, stretch) {
        var bm_expressionHelper = $.__bodymovin.bm_expressionHelper;
        var annotationsManager = $.__bodymovin.bm_annotationsManager;
        var essentialPropertiesHelper = $.__bodymovin.bm_essentialPropertiesHelper;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var duplicatedLayerInfo = layerInfo.duplicate();
        duplicatedLayerInfo.locked = false;
        removeLayerAnimators(duplicatedLayerInfo);
        var sourceTextProp = duplicatedLayerInfo.property("Source Text");
        bm_expressionHelper.checkExpression(sourceTextProp, data);
        var hasExpression = sourceTextProp.expressionEnabled;
        if (sourceTextProp.expressionEnabled) {
            sourceTextProp.expressionEnabled = false;
        }
        var arr = [];
        data.k = arr;
        if (settingsHelper.shouldExportEssentialProperties()) {
            if (settingsHelper.shouldExportEssentialPropertiesAsSlots()) {
                var essentialPropId = essentialPropertiesHelper.searchPropertyId(layerInfo.property("Source Text"));
                if (essentialPropId) {
                    data.sid = essentialPropId;
                }
            }
        }
        var numKeys = sourceTextProp.numKeys;
        var j, jLen = numKeys ? numKeys : 1;
        if (jLen === 0) {
            jLen = 1;
        }
        var additionalTextDocumentData = annotationsManager.searchTextProperties(layerInfo);
        for (j = 0; j < jLen; j += 1) {
            var ob = {};
            var textDocument, time;
            if (numKeys === 0) {
                time = 0;
                textDocument = sourceTextProp.value;
            }
            else {
                time = sourceTextProp.keyTime(j + 1);
                textDocument = sourceTextProp.keyValue(j + 1);
            }
            if (textDocument.boxText) {
                ob.sz = textDocument.boxTextSize;
                ob.ps = textDocument.boxTextPos;
            }
            var i, len;
            ob.s = textDocument.fontSize;
            ob.f = textDocument.font;
            $.__bodymovin.bm_sourceHelper.addFont(textDocument.font, textDocument.fontFamily, textDocument.fontStyle, textDocument.fontLocation);
            if (textDocument.allCaps) {
                ob.t = textDocument.text.toUpperCase();
                ob.ca = 1;
            }
            else {
                ob.t = textDocument.text;
                ob.ca = textDocument.smallCaps ? 2 : 0;
            }
            len = ob.t.length;
            ob.j = getJustification(textDocument.justification);
            ob.tr = textDocument.tracking;
            if (textDocument.leading) {
                ob.lh = textDocument.leading;
            }
            else if (textDocument.baselineLocs && textDocument.baselineLocs.length > 5) {
                if (textDocument.baselineLocs[5] > textDocument.baselineLocs[1]) {
                    ob.lh = findLineHeight(textDocument);
                }
                else {
                    ob.lh = ob.s * 1.2;
                }
            }
            else {
                ob.lh = ob.s * 1.2;
            }
            if (textDocument.baselineShift) {
                ob.ls = textDocument.baselineShift;
            }
            else {
                ob.ls = 0;
            }
            if (textDocument.applyFill) {
                len = textDocument.fillColor.length;
                ob.fc = [];
                for (i = 0; i < len; i += 1) {
                    ob.fc[i] = Math.round(1000 * textDocument.fillColor[i]) / 1000;
                }
            }
            if (textDocument.applyStroke) {
                len = textDocument.strokeColor.length;
                ob.sc = [];
                for (i = 0; i < len; i += 1) {
                    ob.sc[i] = Math.round(1000 * textDocument.strokeColor[i]) / 1000;
                }
                ob.sw = textDocument.strokeWidth;
                if (textDocument.applyFill) {
                    ob.of = textDocument.strokeOverFill;
                }
            }
            for (var s in additionalTextDocumentData) {
                if (additionalTextDocumentData.hasOwnProperty(s)) {
                    ob[s] = additionalTextDocumentData[s];
                }
            }
            arr.push({ s: ob, t: time * frameRate });
        }
        if (hasExpression) {
            sourceTextProp.expressionEnabled = true;
        }
        duplicatedLayerInfo.remove();
        $.__bodymovin.bm_textShapeHelper.addTextLayer(layerInfo);
    }
    function removeLayerAnimators(layerInfo) {
        var textProperty = layerInfo.property("Text");
        var i, len = textProperty.numProperties;
        for (i = 0; i < len; i += 1) {
            switch (textProperty(i + 1).matchName) {
                case "ADBE Text Animators":
                    removeAnimators(textProperty(i + 1));
                    break;
            }
        }
    }
    function removeAnimators(layerInfo) {
        var i, len = layerInfo.numProperties;
        for (i = 0; i < len; i += 1) {
            if (layerInfo.property(i + 1).matchName === "ADBE Text Animator") {
                layerInfo.property(i + 1).remove();
                i -= 1;
                len -= 1;
            }
        }
    }
    function exportTextPathData(pathOptions, ob, masksProperties, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        if (pathOptions.property("Path").value !== 0) {
            masksProperties[pathOptions.property("Path").value - 1].mode = 'n';
            ob.m = pathOptions.property("Path").value - 1;
            ob.f = bm_keyframeHelper.exportKeyframes(pathOptions.property("First Margin"), frameRate, stretch);
            ob.l = bm_keyframeHelper.exportKeyframes(pathOptions.property("Last Margin"), frameRate, stretch);
            ob.a = bm_keyframeHelper.exportKeyframes(pathOptions.property("Force Alignment"), frameRate, stretch);
            ob.p = bm_keyframeHelper.exportKeyframes(pathOptions.property("Perpendicular To Path"), frameRate, stretch);
            ob.r = bm_keyframeHelper.exportKeyframes(pathOptions.property("Reverse Path"), frameRate, stretch);
        }
    }
    function exportMoreOptionsData(pathOptions, ob, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        ob.g = pathOptions.property("Anchor Point Grouping").value;
        ob.a = bm_keyframeHelper.exportKeyframes(pathOptions.property("Grouping Alignment"), frameRate, stretch);
    }
    function exportAnimators(layerInfo, animatorArr, frameRate, stretch) {
        var bm_textAnimatorHelper = $.__bodymovin.bm_textAnimatorHelper;
        var i, len = layerInfo.numProperties;
        for (i = 0; i < len; i += 1) {
            if (layerInfo.property(i + 1).matchName === "ADBE Text Animator") {
                var animatorOb = {};
                bm_textAnimatorHelper.exportAnimator(layerInfo.property(i + 1), animatorOb, frameRate, stretch);
                animatorArr.push(animatorOb);
            }
        }
    }
    function exportText(layerInfo, layerOb, frameRate) {
        layerOb.t = {
            d: {},
            p: {},
            m: {}
        };
        var stretch = layerOb.sr || 1;
        exportTextDocumentData(layerInfo, layerOb.t.d, frameRate);
        var textProperty = layerInfo.property("Text");
        var i, len = textProperty.numProperties;
        for (i = 0; i < len; i += 1) {
            switch (textProperty(i + 1).matchName) {
                case "ADBE Text Path Options":
                    exportTextPathData(textProperty(i + 1), layerOb.t.p, layerOb.masksProperties, frameRate, stretch);
                    break;
                case "ADBE Text More Options":
                    exportMoreOptionsData(textProperty(i + 1), layerOb.t.m, frameRate, stretch);
                    break;
                case "ADBE Text Animators":
                    if (!layerOb.t.a) {
                        layerOb.t.a = [];
                    }
                    exportAnimators(textProperty(i + 1), layerOb.t.a, frameRate, stretch);
                    break;
            }
        }
    }
    var bm_textHelper = {
        exportText: exportText,
        exportTextDocumentData: exportTextDocumentData,
    };

    var chars = [];
    var charComp;
    var fontComp;
    var charCompTextLayer;
    var boxText;
    var layers = [];
    var currentFont;
    var compsAddedFlag = false;
    function reset$4() {
        chars.length = 0;
        layers.length = 0;
        currentFont = '';
        compsAddedFlag = false;
    }
    function addComps() {
        if (compsAddedFlag) {
            return;
        }
        compsAddedFlag = true;
        charComp = app.project.items.addComp('bm_charHelper', 1000, 1000, 1, 1, 1);
        charCompTextLayer = charComp.layers.addText();
        var textProp = charCompTextLayer.property("Source Text");
        var textDocument = textProp.value;
        textDocument.resetCharStyle();
        textDocument.resetParagraphStyle();
        textDocument.fontSize = 100;
        textDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
        textProp.setValue(textDocument);
        var fontProp = charCompTextLayer.property("Source Text");
        var fontDocument = fontProp.value;
        fontDocument.fontSize = 100;
        fontDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
        fontProp.setValue(fontDocument);
        fontComp = app.project.items.addComp('bm_fontHelper', 1000, 1000, 1, 1, 1);
        boxText = fontComp.layers.addBoxText([500, 500], 'm');
    }
    function addTextLayer(layer) {
        layers.push(layer);
    }
    function addChar(ch, size, font, style) {
        var i = 0;
        var charData;
        var len = chars.length;
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
    function getOutlinesLayer(comp) {
        var layerTypes = $.__bodymovin.layerTypes;
        var getLayerType = $.__bodymovin.getLayerType;
        var i = 1;
        var len = comp.layers.length;
        var layer;
        while (i <= len) {
            layer = comp.layers[i];
            var layerType = getLayerType(layer);
            if (layerType === layerTypes.shape) {
                return layer;
            }
            i += 1;
        }
    }
    function searchCharMetadata(originalTextDocument, ch, charData) {
        var textCompHelper = $.__bodymovin.bm_textCompHelper;
        var characterMetadata = textCompHelper.findCharacterData(originalTextDocument, ch);
        if (characterMetadata) {
            var yOffset = characterMetadata.compData.h;
            if (characterMetadata && characterMetadata.textData && characterMetadata.textData.y) {
                yOffset = characterMetadata.textData.y;
            }
            var xOffset = 0;
            if (characterMetadata && characterMetadata.textData && characterMetadata.textData.x) {
                xOffset = characterMetadata.textData.x;
            }
            var advance = characterMetadata.compData.w - xOffset;
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
    function createNewChar(layerInfo, originalTextDocument, ch, charData) {
        var bm_compsManager = $.__bodymovin.bm_compsManager;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_generalUtils = $.__bodymovin.bm_generalUtils;
        if (bm_compsManager.cancelled) {
            return;
        }
        try {
            var charCode = ch.charCodeAt(0);
            if (charCode === 13 || charCode === 3 || charCode === 160 || charCode === 65279) {
                charData.w = 0;
                return;
            }
            var hasCharMetadata = searchCharMetadata(originalTextDocument, ch, charData);
            if (hasCharMetadata) {
                return;
            }
            var shapeLayer = void 0;
            var l = void 0;
            var lLen = void 0;
            layerInfo.copyToComp(charComp);
            var textProp = charCompTextLayer.property("Source Text");
            var textDocument = textProp.value;
            if (charCode !== 32 && charCode !== 9) {
                textDocument.text = ch + ch;
            }
            else {
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
            var doubleSize = void 0;
            var singleSize = void 0;
            doubleSize = charCompTextLayer.sourceRectAtTime(0, false).width;
            if (charCode !== 32 && charCode !== 9) {
                textDocument.text = ch;
            }
            else {
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
                    var ks = charData.data.shapes[0].it[l].ks;
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
        }
        catch (err) {
            var e = err;
            bm_eventDispatcher.log('message');
            bm_eventDispatcher.log(e.message);
            bm_eventDispatcher.log(e.line);
            bm_eventDispatcher.log(e.fileName);
            if (ch !== '[]') {
                bm_eventDispatcher.alert('Character could not be created: ' + ch);
            }
        }
    }
    function exportChars(fonts) {
        var bm_renderManager = $.__bodymovin.bm_renderManager;
        var textCompHelper = $.__bodymovin.bm_textCompHelper;
        charComp.openInViewer();
        var i;
        var len = layers.length;
        var layerInfo;
        var k;
        var kLen;
        for (i = 0; i < len; i += 1) {
            layerInfo = layers[i];
            var textProp = layerInfo.property("Source Text");
            kLen = textProp.numKeys;
            var keysFlag = true;
            if (kLen === 0) {
                kLen = 1;
                keysFlag = false;
            }
            var textDocument = void 0;
            for (k = 0; k < kLen; k += 1) {
                if (!keysFlag) {
                    textDocument = textProp.value;
                }
                else {
                    textDocument = textProp.keyValue(k + 1);
                }
                var font = textDocument.font;
                var fontStyle = textDocument.fontStyle;
                var fontSize = textDocument.fontSize;
                var text = textDocument.allCaps ? textDocument.text.toUpperCase() : textDocument.text;
                var extraChars = textCompHelper.getCharsFromFont(textDocument);
                text += extraChars;
                var j = void 0;
                var jLen = text.length;
                if (currentFont !== font) {
                    currentFont = font;
                    createNewChar(layerInfo, textDocument, '[]', {});
                }
                var l = void 0;
                var lLen = void 0;
                var ch = void 0;
                for (j = 0; j < jLen; j += 1) {
                    var charCode = text.charCodeAt(j);
                    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
                        charCode = text.charCodeAt(j + 1);
                        if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
                            ch = text.substr(j, 2);
                            ++j;
                        }
                        else {
                            ch = text.substr(j, 1);
                        }
                    }
                    else {
                        ch = text.substr(j, 1);
                    }
                    var charData = addChar(ch, fontSize, font, fontStyle);
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
    function exportFonts(fonts) {
        fontComp.openInViewer();
        var i;
        var len = fonts.list.length;
        var rect;
        var baseLineShift;
        var fontProp = boxText.property("Source Text");
        var fontDocument = fontProp.value;
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
    function removeComps() {
        if (compsAddedFlag) {
            charComp.remove();
            fontComp.remove();
            compsAddedFlag = false;
        }
    }
    var bm_textShapeHelper = {
        reset: reset$4,
        addChar: addChar,
        addTextLayer: addTextLayer,
        exportChars: exportChars,
        exportFonts: exportFonts,
        addComps: addComps,
        removeComps: removeComps,
    };

    function exportTextSelectors(layerInfo, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var bm_expressionHelper = $.__bodymovin.bm_expressionHelper;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var selectors = [];
        function exportSelector(selectorProperty) {
            if (!selectorProperty)
                return;
            var ob = {};
            var advancedProperty = selectorProperty.property('ADBE Text Range Advanced');
            ob.t = 0;
            ob.xe = bm_keyframeHelper.exportKeyframes(advancedProperty.property('ADBE Text Levels Max Ease'), frameRate, stretch);
            ob.ne = bm_keyframeHelper.exportKeyframes(advancedProperty.property('ADBE Text Levels Min Ease'), frameRate, stretch);
            ob.a = bm_keyframeHelper.exportKeyframes(advancedProperty.property('ADBE Text Selector Max Amount'), frameRate, stretch);
            ob.b = advancedProperty.property("ADBE Text Range Type2").value;
            ob.rn = advancedProperty.property("ADBE Text Randomize Order").value;
            ob.sh = advancedProperty.property("ADBE Text Range Shape").value;
            ob.sm = bm_keyframeHelper.exportKeyframes(advancedProperty.property('ADBE Text Selector Smoothness'), frameRate, stretch);
            var rangeUnits = advancedProperty.property('ADBE Text Range Units').value;
            if (rangeUnits === 1) {
                if (selectorProperty.property('ADBE Text Percent Start').isModified) {
                    ob.s = bm_keyframeHelper.exportKeyframes(selectorProperty.property('ADBE Text Percent Start'), frameRate, stretch);
                }
                if (selectorProperty.property('ADBE Text Percent End').isModified) {
                    ob.e = bm_keyframeHelper.exportKeyframes(selectorProperty.property('ADBE Text Percent End'), frameRate, stretch);
                }
                if (selectorProperty.property('ADBE Text Percent Offset').isModified) {
                    ob.o = bm_keyframeHelper.exportKeyframes(selectorProperty.property('ADBE Text Percent Offset'), frameRate, stretch);
                }
            }
            else {
                if (selectorProperty.property('ADBE Text Index Start').isModified) {
                    ob.s = bm_keyframeHelper.exportKeyframes(selectorProperty.property('ADBE Text Index Start'), frameRate, stretch);
                }
                ob.e = bm_keyframeHelper.exportKeyframes(selectorProperty.property('ADBE Text Index End'), frameRate, stretch);
                if (selectorProperty.property('ADBE Text Index Offset').isModified) {
                    ob.o = bm_keyframeHelper.exportKeyframes(selectorProperty.property('ADBE Text Index Offset'), frameRate, stretch);
                }
            }
            ob.r = rangeUnits;
            selectors.push(ob);
        }
        function exportExpressibleSelector(selectorProperty) {
            if (!selectorProperty)
                return;
            var ob = {};
            ob.t = 1;
            ob.b = selectorProperty.property('ADBE Text Range Type2').value;
            var amount = selectorProperty.property('ADBE Text Expressible Amount');
            bm_expressionHelper.checkExpression(amount, ob);
            selectors.push(ob);
        }
        var len = layerInfo.numProperties;
        for (var i = 0; i < len; i += 1) {
            var prop = layerInfo.property(i + 1);
            var propertyName = prop.matchName;
            if (propertyName === 'ADBE Text Selector') {
                exportSelector(prop);
            }
            else if (propertyName === 'ADBE Text Expressible Selector') {
                exportExpressibleSelector(prop);
            }
        }
        if (selectors.length == 0) {
            selectors.push({
                t: 0,
                xe: { k: 0 },
                ne: { k: 0 },
                a: { k: 100 },
                b: 1,
                sh: 0,
                s: { k: 0 },
                e: { k: 100 },
                o: { k: 0 }
            });
        }
        var export_array = selectors.length > 1 && settingsHelper.shouldIncludeNotSupportedProperties();
        return export_array ? selectors : selectors[0];
    }
    function exportAnimationSelector(layerInfo, frameRate, stretch) {
        var bm_keyframeHelper = $.__bodymovin.bm_keyframeHelper;
        var ob = {};
        var i, len, property, propertyName;
        len = layerInfo.numProperties;
        for (i = 0; i < len; i += 1) {
            property = layerInfo.property(i + 1);
            if (property.canSetExpression) {
                propertyName = property.matchName;
                switch (propertyName) {
                    case 'ADBE Text Anchor Point 3D':
                        ob.a = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Position 3D':
                        ob.p = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Scale 3D':
                        ob.s = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Rotation':
                        ob.r = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Rotation X':
                        ob.rx = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Rotation Y':
                        ob.ry = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Opacity':
                        ob.o = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Fill Color':
                        ob.fc = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Fill Hue':
                        ob.fh = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Fill Saturation':
                        ob.fs = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Fill Brightness':
                        ob.fb = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Stroke Color':
                        ob.sc = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Stroke Hue':
                        ob.sh = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Stroke Saturation':
                        ob.ss = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Stroke Brightness':
                        ob.sb = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Stroke Width':
                        ob.sw = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Fill Opacity':
                        ob.fo = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Stroke Opacity':
                        ob.so = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Tracking Amount':
                        ob.t = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Skew':
                        ob.sk = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Skew Axis':
                        ob.sa = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Blur':
                        ob.bl = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                    case 'ADBE Text Line Spacing':
                        ob.ls = bm_keyframeHelper.exportKeyframes(property, frameRate, stretch);
                        break;
                }
            }
        }
        return ob;
    }
    function exportAnimator(layerInfo, ob, frameRate, stretch) {
        var i, len;
        len = layerInfo.numProperties;
        ob.nm = layerInfo.name;
        for (i = 0; i < len; i += 1) {
            switch (layerInfo.property(i + 1).matchName) {
                case "ADBE Text Selectors":
                    ob.s = exportTextSelectors(layerInfo.property(i + 1), frameRate, stretch);
                    break;
                case "ADBE Text Animator Properties":
                    ob.a = exportAnimationSelector(layerInfo.property(i + 1), frameRate, stretch);
                    break;
            }
        }
    }
    var bm_textAnimatorHelper = {
        exportAnimator: exportAnimator,
    };

    var compSources = [];
    var imageSources = [];
    var videoSources = [];
    var fonts = [];
    var currentExportingImage;
    var assetsArray$2;
    var folder;
    var currentCompID$1;
    var imageCount = 0;
    var videoCount = 0;
    var imageNameIndex$2 = 0;
    var fontCount = 0;
    var currentSavingAsset;
    var _lastSecond$1 = -1;
    var _lastMilliseconds$1 = -1;
    function checkCompSource(item) {
        var arr = compSources;
        var i = 0;
        var len = arr.length;
        var isRendered = false;
        while (i < len) {
            if (arr[i].source === item.source) {
                isRendered = true;
                break;
            }
            i += 1;
        }
        if (isRendered) {
            return arr[i].id;
        }
        arr.push({
            source: item.source,
        });
        return false;
    }
    function checkVideoSource(item) {
        var i = 0;
        var len = videoSources.length;
        while (i < len) {
            if (videoSources[i].source === item.source) {
                return videoSources[i].id;
            }
            i += 1;
        }
        videoSources.push({
            source: item.source,
            width: item.source.width,
            height: item.source.height,
            source_name: item.source.name,
            name: item.name,
            id: 'video_' + videoCount,
        });
        videoCount += 1;
        return videoSources[videoSources.length - 1].id;
    }
    function checkAudioSource$1(item) {
        var audioSourceHelper = $.__bodymovin.bm_audioSourceHelper;
        return audioSourceHelper.checkAudioSource(item);
    }
    function buildId(item, metadata) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if (metadata) {
            if (metadata.sourceAsId) {
                return item.source.name;
            }
        }
        else if (settingsHelper.shouldUseSourceNames()) {
            return item.source.name;
        }
        var name = 'image_' + imageCount;
        imageCount += 1;
        return name;
    }
    function checkImageSource(item) {
        var annotationsManager = $.__bodymovin.bm_annotationsManager;
        var arr = imageSources;
        var i = 0;
        var len = arr.length;
        while (i < len) {
            if (arr[i].source === item.source) {
                return arr[i].id;
            }
            i += 1;
        }
        var assetAnnotation = annotationsManager.searchAssetAnnotationInLayer(item);
        arr.push({
            source: item.source,
            width: item.source.width,
            height: item.source.height,
            source_name: item.source.name,
            name: item.name,
            id: buildId(item, assetAnnotation),
            metadata: assetAnnotation,
        });
        return arr[arr.length - 1].id;
    }
    function setCompSourceId(source, id) {
        var i = 0;
        var len = compSources.length;
        while (i < len) {
            if (compSources[i].source === source) {
                compSources[i].id = id;
                compSources[i].nm = 'test';
            }
            i += 1;
        }
    }
    var validRanges$2 = [[65, 90], [45, 46], [48, 57], [95, 95], [97, 122]];
    function isValidChar$2(charCode) {
        var i = 0;
        var len = validRanges$2.length;
        while (i < len) {
            if (charCode >= validRanges$2[i][0] && charCode <= validRanges$2[i][1]) {
                return true;
            }
            i += 1;
        }
        return false;
    }
    function checkSanitizedNameExists$2(name) {
        var i = 0;
        var len = assetsArray$2.length;
        while (i < len) {
            if (assetsArray$2[i].p === name) {
                return true;
            }
            i += 1;
        }
        return false;
    }
    function incrementSanizitedName$2(name) {
        return name + '_' + imageNameIndex$2++;
    }
    function formatImageName$2(name) {
        var sanitizedName = '';
        var totalChars = name.lastIndexOf('.');
        var extensionIndex = name.lastIndexOf('.');
        var extension = extensionIndex !== -1 ? name.substr(extensionIndex) : '.png';
        if (totalChars < 0) {
            totalChars = name.length;
        }
        var i;
        for (i = 0; i < totalChars; i += 1) {
            var charCode = name.charCodeAt(i);
            if (isValidChar$2(charCode)) {
                sanitizedName += name.substr(i, 1);
            }
            else {
                sanitizedName += '_';
            }
        }
        if (checkSanitizedNameExists$2(sanitizedName + extension)) {
            sanitizedName = incrementSanizitedName$2(sanitizedName);
        }
        return sanitizedName + extension;
    }
    function getImageName$2(originalName, generatedName, extension, metadata) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var imageName;
        var originalNamesFlag = metadata ? metadata.originalAsset : settingsHelper.shouldUserOriginalNames();
        var originalAssetsFlag = metadata ? metadata.copyAsset : settingsHelper.shouldCopyOriginalAsset();
        if (originalNamesFlag) {
            imageName = formatImageName$2(originalName);
        }
        else {
            imageName = generatedName;
            if (originalAssetsFlag) {
                imageName += originalName.substr(originalName.lastIndexOf('.')) || '.' + extension;
            }
            else {
                imageName += '.' + extension;
            }
        }
        return imageName;
    }
    var sequenceSources = [];
    var sequenceSourcesStills = [];
    var currentExportingImageSequenceIndex = 0;
    var currentExportingVideoIndex = 0;
    var sequenceSourcesStillsCount = 0;
    var currentStillIndex = 0;
    var currentSequenceTotalFrames = 0;
    var sequenceCount = 0;
    var helperSequenceComp = null;
    function searchSequenceSource(item) {
        var i = 0;
        var len = sequenceSources.length;
        while (i < len) {
            if (sequenceSources[i].source === item.source) {
                return sequenceSources[i].id;
            }
            i += 1;
        }
        return false;
    }
    function addSequenceSource(item) {
        var sequenceSource = {
            source: item.source,
            id: 'sequence_' + sequenceCount++,
        };
        sequenceSources.push(sequenceSource);
        return sequenceSource.id;
    }
    function buildSeqId(source, metadata) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var name = '';
        if (metadata) {
            if (metadata.sourceAsId) {
                name = source.name + '_' + sequenceSourcesStillsCount;
            }
            else {
                name = 'imgSeq_' + sequenceSourcesStillsCount;
            }
        }
        else if (settingsHelper.shouldUseSourceNames()) {
            name = source.name + '_' + sequenceSourcesStillsCount;
        }
        else {
            name = 'imgSeq_' + sequenceSourcesStillsCount;
        }
        sequenceSourcesStillsCount += 1;
        return name;
    }
    function addImageSequenceStills(layer, totalFrames) {
        var annotationsManager = $.__bodymovin.bm_annotationsManager;
        var source = layer.source;
        var i = 0;
        var sequenceRange = [];
        var assetAnnotation = annotationsManager.searchAssetAnnotationInLayer(layer);
        for (i = 0; i < totalFrames; i += 1) {
            sequenceRange.push(buildSeqId(source, assetAnnotation));
        }
        var sequenceStills = {
            totalFrames: totalFrames,
            source: source,
            name: source.name,
            source_name: source.name,
            range: sequenceRange,
            width: source.width,
            height: source.height,
            metadata: assetAnnotation,
        };
        sequenceSourcesStills.push(sequenceStills);
        sequenceSourcesStillsCount += totalFrames;
        return sequenceStills.range;
    }
    function getSequenceSourceBySource(source) {
        var i = 0;
        var len = sequenceSources.length;
        while (i < len) {
            if (sequenceSources[i].source === source) {
                return sequenceSources[i].id;
            }
            i += 1;
        }
    }
    function scheduleNextSaveStilInSequence() {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var now = new Date();
        var newSecond = now.getSeconds();
        var newMilliSeconds = now.getMilliseconds();
        var originalAssetsFlag = settingsHelper.shouldCopyOriginalAsset();
        if (newSecond !== _lastSecond$1 || originalAssetsFlag) {
            _lastSecond$1 = newSecond;
            _lastMilliseconds$1 = newMilliSeconds;
            saveNextStillInSequence();
        }
        else {
            app.scheduleTask('$.__bodymovin.bm_sourceHelper.scheduleNextSaveStilInSequence();', (1000 - _lastMilliseconds$1), false);
        }
    }
    function scheduleNextSaveImage() {
        var now = new Date();
        var newSecond = now.getSeconds();
        var newMilliSeconds = now.getMilliseconds();
        if (newSecond !== _lastSecond$1) {
            _lastSecond$1 = newSecond;
            _lastMilliseconds$1 = newMilliSeconds;
            saveNextImage();
        }
        else {
            app.scheduleTask('$.__bodymovin.bm_sourceHelper.scheduleNextSaveImage();', (1000 - _lastMilliseconds$1), false);
        }
    }
    function updateCurrentSecond$1() {
        var now = new Date();
        var newSecond = now.getSeconds();
        _lastSecond$1 = newSecond;
    }
    function saveNextStillInSequence() {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if (currentStillIndex === currentSequenceTotalFrames) {
            currentExportingImageSequenceIndex += 1;
            if (helperSequenceComp) {
                helperSequenceComp.remove();
            }
            saveNextImageSequence();
            return;
        }
        var currentSourceData = sequenceSourcesStills[currentExportingImageSequenceIndex];
        var metadata = currentSourceData.metadata;
        var totalFrames = currentSourceData.totalFrames;
        bm_eventDispatcher.sendEvent('bm:render:update', {
            type: 'update',
            message: 'Exporting sequence: ' + currentSourceData.name,
            compId: currentCompID$1,
            progress: currentStillIndex / totalFrames,
        });
        var imageName = getImageName$2(currentSourceData.source_name, 'seq_' + currentExportingImageSequenceIndex + '_' + currentStillIndex, 'png', metadata);
        var renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
        var file = renderFileData.file;
        currentSavingAsset = {
            id: currentSourceData.range[currentStillIndex],
            w: currentSourceData.width,
            h: currentSourceData.height,
            t: 'seq',
            u: 'images/',
            p: imageName,
            e: 0,
            fileId: renderFileData.id,
        };
        assetsArray$2.push(currentSavingAsset);
        var originalAssetsFlag = metadata ? metadata.copyAsset : settingsHelper.shouldCopyOriginalAsset();
        if (!originalAssetsFlag) {
            helperSequenceComp.workAreaStart = Math.max(0, Math.min(totalFrames - 3, currentStillIndex - 1)) / currentSourceData.source.frameRate;
            helperSequenceComp.workAreaDuration = 3 / currentSourceData.source.frameRate;
            var item_1 = app.project.renderQueue.items.add(helperSequenceComp);
            item_1.render = true;
            var outputModule = item_1.outputModule(1);
            outputModule.applyTemplate("_HIDDEN X-Factor 8 Premul");
            outputModule.file = file;
            item_1.onStatusChanged = function () {
                if (item_1.status === RQItemStatus.DONE) {
                    updateCurrentSecond$1();
                    var imgIndex = currentStillIndex.toString();
                    while (imgIndex.length < 5) {
                        imgIndex = '0' + imgIndex;
                    }
                    fixBugNameFile(imageName, file.fsName, imgIndex);
                    bm_eventDispatcher.sendEvent('bm:image:process', {
                        path: file.fsName,
                        should_compress: metadata ? metadata.enableCompression : settingsHelper.shouldCompressImages(),
                        compression_rate: (metadata ? metadata.compression : settingsHelper.getCompressionQuality()) / 100,
                        should_encode_images: metadata ? metadata.includeInJson : settingsHelper.shouldEncodeImages(),
                        assetType: 'image',
                    });
                }
            };
            app.project.renderQueue.render();
        }
        else {
            var currentSourceFile = currentSourceData.source.file;
            var currentSourceFilePath = currentSourceFile.fsName;
            var newName = getNextImageName(currentSourceFilePath, currentStillIndex);
            var copyingFile = new File(newName);
            if (copyingFile.exists) {
                copyingFile.copy(file.fsName);
            }
            else {
                currentSourceFile.copy(file.fsName);
            }
            updateCurrentSecond$1();
            bm_eventDispatcher.sendEvent('bm:image:process', {
                path: file.fsName,
                should_compress: metadata ? metadata.enableCompression : settingsHelper.shouldCompressImages(),
                compression_rate: (metadata ? metadata.compression : settingsHelper.getCompressionQuality()) / 100,
                should_encode_images: metadata ? metadata.includeInJson : settingsHelper.shouldEncodeImages(),
                assetType: 'image',
            });
        }
    }
    function getNextImageName(text, index) {
        var regex = /[0-9]+/g;
        var flag = true;
        var lastMatch;
        while (flag) {
            var match = regex.exec(text);
            if (!match) {
                flag = false;
            }
            else {
                lastMatch = match;
            }
        }
        if (lastMatch) {
            var value = lastMatch[0];
            var num = parseInt(value, 10) + index;
            var newValue = num.toString();
            var count = 0;
            while (newValue.length < value.length) {
                newValue = value.substr(count, 1) + newValue;
            }
            var newTexto = text.substr(0, lastMatch.index);
            newTexto += newValue;
            newTexto += text.substr(lastMatch.index + value.length);
            return newTexto;
        }
        return '';
    }
    function saveSequence() {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var currentSourceData = sequenceSourcesStills[currentExportingImageSequenceIndex];
        var metadata = currentSourceData.metadata;
        currentStillIndex = 0;
        currentSequenceTotalFrames = currentSourceData.totalFrames;
        var frameRate = currentSourceData.source.frameRate;
        var originalAssetsFlag = metadata ? metadata.copyAsset : settingsHelper.shouldCopyOriginalAsset();
        if (!originalAssetsFlag) {
            helperSequenceComp = app.project.items.addComp('tempConverterComp', Math.max(4, currentSourceData.width), Math.max(4, currentSourceData.height), 1, (currentSourceData.totalFrames + 1) / frameRate, frameRate);
            helperSequenceComp.layers.add(currentSourceData.source);
        }
        scheduleNextSaveStilInSequence();
    }
    function saveVideo() {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var currentSourceData = videoSources[currentExportingVideoIndex];
        var sourceExtension = currentSourceData.source_name.substr(currentSourceData.source_name.lastIndexOf('.') + 1) || 'mp4';
        var imageName = getImageName$2(currentSourceData.source_name, 'vid_' + currentExportingVideoIndex, sourceExtension);
        var renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
        var file = renderFileData.file;
        var currentSourceFile = currentSourceData.source.file;
        currentSourceFile.copy(file.fsName);
        assetsArray$2.push({
            id: currentSourceData.id,
            w: currentSourceData.width,
            h: currentSourceData.height,
            u: 'images/',
            p: imageName,
            e: 0,
            fileId: renderFileData.id,
        });
        currentExportingVideoIndex += 1;
        app.scheduleTask('$.__bodymovin.bm_sourceHelper.saveNextVideo();', 20, false);
    }
    function onDataFinishSave() {
        finishImageSave();
    }
    function onAudioFinishSave() {
        var dataSourceHelper = $.__bodymovin.bm_dataSourceHelper;
        dataSourceHelper.save(onDataFinishSave, assetsArray$2);
    }
    function saveNextVideo() {
        var audioSourceHelper = $.__bodymovin.bm_audioSourceHelper;
        if (currentExportingVideoIndex === videoSources.length) {
            audioSourceHelper.save(onAudioFinishSave, assetsArray$2);
        }
        else {
            saveVideo();
        }
    }
    function saveNextImageSequence() {
        if (currentExportingImageSequenceIndex === sequenceSourcesStills.length) {
            saveNextVideo();
        }
        else {
            saveSequence();
        }
    }
    function finishImageSave() {
        var renderQueueHelper = $.__bodymovin.bm_renderQueueHelper;
        var bm_renderManager = $.__bodymovin.bm_renderManager;
        renderQueueHelper.restoreRenderQueue();
        bm_renderManager.imagesReady();
    }
    function fixBugNameFile(imageName, fsName, suffix) {
        var bug = new File(fsName + suffix);
        if (bug.exists) {
            bug.rename(imageName);
        }
        else {
            var namename = fsName.substr(0, fsName.lastIndexOf('.')) + '_' + suffix + '.png';
            bug = new File(namename);
            if (bug.exists) {
                bug.rename(imageName);
            }
        }
    }
    function saveNextImage() {
        var bm_compsManager = $.__bodymovin.bm_compsManager;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var essentialPropertiesHelper = $.__bodymovin.bm_essentialPropertiesHelper;
        if (bm_compsManager.cancelled) {
            return;
        }
        if (currentExportingImage === imageSources.length) {
            saveNextImageSequence();
            return;
        }
        var currentSourceData = imageSources[currentExportingImage];
        var metadata = currentSourceData.metadata;
        bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Exporting image: ' + currentSourceData.name, compId: currentCompID$1, progress: currentExportingImage / imageSources.length });
        var currentSource = currentSourceData.source;
        var imageName = getImageName$2(currentSourceData.source_name, 'img_' + currentExportingImage, 'png', metadata);
        var renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
        var file = renderFileData.file;
        currentSavingAsset = {
            id: currentSourceData.id,
            w: currentSourceData.width,
            h: currentSourceData.height,
            u: 'images/',
            p: imageName,
            e: 0,
            fileId: renderFileData.id,
        };
        var essentialPropertyId = essentialPropertiesHelper.searchAsset(currentSourceData, currentSavingAsset);
        if (essentialPropertyId) {
            currentSavingAsset.sid = essentialPropertyId;
        }
        assetsArray$2.push(currentSavingAsset);
        var originalAssetsFlag = metadata ? metadata.copyAsset : settingsHelper.shouldCopyOriginalAsset();
        if (!originalAssetsFlag) {
            var helperComp = app.project.items.addComp('tempConverterComp', Math.max(4, currentSource.width), Math.max(4, currentSource.height), 1, 1, 1);
            helperComp.layers.add(currentSource);
            var item_2 = app.project.renderQueue.items.add(helperComp);
            item_2.render = true;
            var outputModule = item_2.outputModule(1);
            outputModule.applyTemplate("_HIDDEN X-Factor 8 Premul");
            outputModule.file = file;
            item_2.onStatusChanged = function () {
                if (item_2.status === RQItemStatus.DONE) {
                    updateCurrentSecond$1();
                    fixBugNameFile(imageName, file.fsName, '00000');
                    bm_eventDispatcher.sendEvent('bm:image:process', {
                        path: file.fsName,
                        should_compress: metadata ? metadata.enableCompression : settingsHelper.shouldCompressImages(),
                        compression_rate: (metadata ? metadata.compression : settingsHelper.getCompressionQuality()) / 100,
                        should_encode_images: metadata ? metadata.includeInJson : settingsHelper.shouldEncodeImages(),
                    });
                }
            };
            app.project.renderQueue.render();
            helperComp.remove();
        }
        else {
            var currentSourceFile = currentSourceData.source.file;
            currentSourceFile.copy(file.fsName);
            updateCurrentSecond$1();
            bm_eventDispatcher.sendEvent('bm:image:process', {
                path: file.fsName,
                should_compress: metadata ? metadata.enableCompression : settingsHelper.shouldCompressImages(),
                compression_rate: (metadata ? metadata.compression : settingsHelper.getCompressionQuality()) / 100,
                should_encode_images: metadata ? metadata.includeInJson : settingsHelper.shouldEncodeImages(),
            });
        }
    }
    function imageProcessed(changedFlag, encoded_data) {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        if (changedFlag) {
            currentSavingAsset.p = currentSavingAsset.p.replace(new RegExp('png' + '$'), 'jpg');
            bm_fileManager.replaceFileExtension(currentSavingAsset.fileId, 'jpg');
        }
        if (encoded_data) {
            currentSavingAsset.p = encoded_data;
            currentSavingAsset.u = '';
            currentSavingAsset.e = 1;
            bm_fileManager.removeFile(currentSavingAsset.fileId);
        }
        if (currentSavingAsset.t === 'seq') {
            currentStillIndex += 1;
            scheduleNextSaveStilInSequence();
        }
        else {
            currentExportingImage += 1;
            scheduleNextSaveImage();
        }
    }
    function copyAssetsToArray(assets, renderAssetsArray) {
        var i;
        var len = assets.length;
        for (i = 0; i < len; i += 1) {
            renderAssetsArray.push(assets[i]);
        }
    }
    function exportImages(path, assets, compId, compUid) {
        var audioSourceHelper = $.__bodymovin.bm_audioSourceHelper;
        var dataSourceHelper = $.__bodymovin.bm_dataSourceHelper;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_renderManager = $.__bodymovin.bm_renderManager;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var renderQueueHelper = $.__bodymovin.bm_renderQueueHelper;
        var assetsStorage = $.__bodymovin.assetsStorage;
        if ((imageSources.length === 0 && sequenceSourcesStills.length === 0 && videoSources.length === 0 && audioSourceHelper.isEmpty() && dataSourceHelper.isEmpty()) || settingsHelper.shouldSkipImages()) {
            bm_renderManager.imagesReady();
            return;
        }
        if (renderQueueHelper.renderQueueIsBusy()) {
            bm_eventDispatcher.sendEvent('bm:alert', { message: 'Render queue is currently busy. \n\rCan\'t continue with render.\n\rCheck for elements in AE\'s render queue in a Rendering status, remove them and try again.' });
            return;
        }
        currentCompID$1 = compId;
        if (settingsHelper.shouldReuseImages()) {
            var storedAssets = assetsStorage.getAssets(compUid);
            if (storedAssets) {
                copyAssetsToArray(storedAssets, assets);
                bm_renderManager.imagesReady();
                return;
            }
        }
        bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Exporting images', compId: currentCompID$1, progress: 0 });
        currentExportingImage = 0;
        currentExportingImageSequenceIndex = 0;
        currentExportingVideoIndex = 0;
        var file = new File(path);
        folder = file.parent;
        folder.changePath('images/');
        assetsArray$2 = assets;
        renderQueueHelper.backupRenderQueue();
        scheduleNextSaveImage();
    }
    function addFont(fontName, fontFamily, fontStyle, fontLocation) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var i = 0;
        var len = fonts.length;
        while (i < len) {
            if (fonts[i].name === fontName && fonts[i].family === fontFamily && fonts[i].style === fontStyle) {
                return;
            }
            i += 1;
        }
        var fontData = {
            name: fontName,
            family: fontFamily,
            style: fontStyle,
        };
        if (fontLocation && settingsHelper.shouldBundleFonts()) {
            var file = new File(fontLocation);
            if (file.exists) {
                if (!settingsHelper.shouldInlineFonts()) {
                    var fontFileName = 'font_' + fontCount++;
                    var destinationFileData = bm_fileManager.createFile(fontFileName, ['raw', 'images']);
                    var destinationFile = destinationFileData.file;
                    file.copy(destinationFile.fsName);
                    fontData.location = "images/" + fontFileName;
                }
                fontData.originalLocation = fontLocation;
            }
        }
        fonts.push(fontData);
    }
    function getFonts() {
        return fonts;
    }
    function reset$3() {
        var audioSourceHelper = $.__bodymovin.bm_audioSourceHelper;
        var dataSourceHelper = $.__bodymovin.bm_dataSourceHelper;
        compSources.length = 0;
        imageSources.length = 0;
        videoSources.length = 0;
        sequenceSources.length = 0;
        sequenceSourcesStills.length = 0;
        fonts.length = 0;
        imageCount = 0;
        fontCount = 0;
        videoCount = 0;
        sequenceCount = 0;
        sequenceSourcesStillsCount = 0;
        imageNameIndex$2 = 0;
        audioSourceHelper.reset();
        dataSourceHelper.reset();
    }
    var bm_sourceHelper$1 = {
        imageProcessed: imageProcessed,
        checkCompSource: checkCompSource,
        checkImageSource: checkImageSource,
        checkVideoSource: checkVideoSource,
        checkAudioSource: checkAudioSource$1,
        searchSequenceSource: searchSequenceSource,
        addSequenceSource: addSequenceSource,
        addImageSequenceStills: addImageSequenceStills,
        getSequenceSourceBySource: getSequenceSourceBySource,
        setCompSourceId: setCompSourceId,
        exportImages: exportImages,
        addFont: addFont,
        getFonts: getFonts,
        reset: reset$3,
        scheduleNextSaveStilInSequence: scheduleNextSaveStilInSequence,
        scheduleNextSaveImage: scheduleNextSaveImage,
        saveNextVideo: saveNextVideo,
    };

    var audioSources = [];
    var assetsArray$1;
    var audioCount = 0;
    var currentExportingAudioIndex = 0;
    var imageNameIndex$1 = 0;
    var finishCallback$1;
    var templateProject;
    var containingCompCopy;
    var _lastSecond = -1;
    var _lastMilliseconds = -1;
    function checkAudioSource(item) {
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
    var validRanges$1 = [[65, 90], [45, 46], [48, 57], [95, 95], [97, 122]];
    function isValidChar$1(charCode) {
        var i = 0;
        var len = validRanges$1.length;
        while (i < len) {
            if (charCode >= validRanges$1[i][0] && charCode <= validRanges$1[i][1]) {
                return true;
            }
            i += 1;
        }
        return false;
    }
    function checkSanitizedNameExists$1(name) {
        var i = 0;
        var len = assetsArray$1.length;
        while (i < len) {
            if (assetsArray$1[i].p === name) {
                return true;
            }
            i += 1;
        }
        return false;
    }
    function incrementSanizitedName$1(name) {
        return name + '_' + imageNameIndex$1++;
    }
    function formatImageName$1(name) {
        var sanitizedName = '';
        var totalChars = name.lastIndexOf('.');
        var extensionIndex = name.lastIndexOf('.');
        var extension = extensionIndex !== -1 ? name.substr(extensionIndex) : '.png';
        if (totalChars < 0) {
            totalChars = name.length;
        }
        var i;
        for (i = 0; i < totalChars; i += 1) {
            var charCode = name.charCodeAt(i);
            if (isValidChar$1(charCode)) {
                sanitizedName += name.substr(i, 1);
            }
            else {
                sanitizedName += '_';
            }
            if (checkSanitizedNameExists$1(sanitizedName + extension)) {
                sanitizedName = incrementSanizitedName$1(sanitizedName);
            }
        }
        return sanitizedName + extension;
    }
    function getImageName$1(originalName, generatedName, extension) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var imageName;
        if (settingsHelper.shouldUserOriginalNames()) {
            imageName = formatImageName$1(originalName);
        }
        else {
            imageName = generatedName;
            {
                imageName += '.' + extension;
            }
        }
        return imageName;
    }
    function getOutputModule(rqItem, templateName) {
        var i;
        var len = rqItem.numOutputModules;
        var outputModule;
        for (i = 0; i < len; i += 1) {
            outputModule = rqItem.outputModule(i + 1);
            if (outputModule.name === templateName) {
                return outputModule;
            }
        }
        return rqItem.outputModule(1);
    }
    function installTemplate(templateName) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        try {
            importTemplateProject();
            var comp = templateProject.item(1);
            var renderQueueItems = app.project.renderQueue.items;
            var i = void 0;
            var templateRenderItem = void 0;
            for (i = 0; i < renderQueueItems.length; i += 1) {
                templateRenderItem = renderQueueItems[i + 1];
                if (templateRenderItem.comp.name === comp.name) {
                    var outputModule = getOutputModule(templateRenderItem, templateName);
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
        }
        catch (err) {
            var e = err;
            bm_eventDispatcher.log(e.message);
        }
    }
    function importTemplateProject() {
        var bm_downloadManager = $.__bodymovin.bm_downloadManager;
        var extensionFolder = bm_downloadManager.getExtensionFolder();
        var templateFile = new File(extensionFolder.absoluteURI + '/assets/templates/__bodymovin_sound_template_2018.aep');
        templateProject = app.project.importFile(new ImportOptions(templateFile));
    }
    function applyTemplateToModule(outputModule, templateName, comp) {
        var installedTemplates = outputModule.templates;
        var isTemplateInstalled = false;
        for (var i = 0; i < installedTemplates.length; i += 1) {
            if (installedTemplates[i] === templateName) {
                isTemplateInstalled = true;
                break;
            }
        }
        if (!isTemplateInstalled) {
            installTemplate(templateName);
        }
        var item = getRenderItemByComp(comp);
        outputModule = item.outputModule(1);
        outputModule.applyTemplate(templateName);
    }
    function duplicateComposition(comp, layer) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var compCopy = comp.duplicate();
        var layerIndex = layer.index;
        while (layerIndex > 1) {
            compCopy.layer(1).remove();
            layerIndex -= 1;
        }
        while (compCopy.layers.length > 1) {
            compCopy.layer(2).remove();
        }
        compCopy.name = '__bodymovin_copy';
        var audioInPoint = layer.inPoint;
        var audioOutPoint = layer.outPoint;
        var compDuration = comp.duration;
        var workAreaStart = audioInPoint >= 0 ? audioInPoint : 0;
        var workAreaDuration = audioOutPoint - workAreaStart;
        if (workAreaStart + workAreaDuration > compDuration) {
            workAreaDuration = compDuration - workAreaStart;
        }
        compCopy.workAreaStart = workAreaStart;
        compCopy.workAreaStart = workAreaStart;
        compCopy.workAreaStart = workAreaStart;
        try {
            compCopy.workAreaDuration = workAreaDuration;
        }
        catch (err) {
            workAreaDuration -= comp.frameDuration;
            compCopy.workAreaDuration = workAreaDuration;
        }
        if (!settingsHelper.shouldRasterizeWaveform()) {
            var audioProperty = compCopy.layer(1).property('Audio');
            var levels = audioProperty.property('Audio Levels');
            while (levels.numKeys !== 0) {
                levels.removeKey(1);
            }
            levels.setValue([0, 0]);
        }
        return compCopy;
    }
    function getRenderItemByComp(comp) {
        var renderQueueItems = app.project.renderQueue.items;
        var i;
        var renderItem;
        for (i = 0; i < renderQueueItems.length; i += 1) {
            renderItem = renderQueueItems[i + 1];
            if (renderItem.comp === comp) {
                return renderItem;
            }
        }
    }
    function createContainingComp(sourceData) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var renderQueueHelper = $.__bodymovin.bm_renderQueueHelper;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var containingComp = sourceData.item.containingComp;
        var layer = sourceData.item;
        containingCompCopy = duplicateComposition(containingComp, layer);
        var item = app.project.renderQueue.items.add(containingCompCopy);
        var outputModule = item.outputModule(1);
        var template = settingsHelper.getAudioBitRateTemplate();
        applyTemplateToModule(outputModule, template, containingCompCopy);
        item = getRenderItemByComp(containingCompCopy);
        outputModule = item.outputModule(1);
        var imageName = getImageName$1(sourceData.source_name, 'aud_' + currentExportingAudioIndex, 'mp3');
        var renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
        var file = renderFileData.file;
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
                }
                else {
                    app.scheduleTask('$.__bodymovin.bm_audioSourceHelper.scheduleNextSave();', 20, false);
                }
            }
        };
        assetsArray$1.push({
            id: sourceData.id,
            u: 'images/',
            p: imageName,
            e: 0,
            fileId: renderFileData.id,
            t: 2,
        });
        app.project.renderQueue.render();
    }
    function assetProcessed(_, encoded_data) {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        if (encoded_data) {
            var currentSavingAsset = assetsArray$1[assetsArray$1.length - 1];
            currentSavingAsset.p = encoded_data;
            currentSavingAsset.u = '';
            currentSavingAsset.e = 1;
            bm_fileManager.removeFile(currentSavingAsset.fileId);
            app.scheduleTask('$.__bodymovin.bm_audioSourceHelper.scheduleNextSave();', 20, false);
        }
    }
    function updateCurrentSecond() {
        var now = new Date();
        var newSecond = now.getSeconds();
        _lastSecond = newSecond;
    }
    function saveAudio() {
        var currentSourceData = audioSources[currentExportingAudioIndex];
        createContainingComp(currentSourceData);
    }
    function scheduleNextSave() {
        var now = new Date();
        var newSecond = now.getSeconds();
        var newMilliSeconds = now.getMilliseconds();
        if (newSecond !== _lastSecond) {
            _lastSecond = newSecond;
            _lastMilliseconds = newMilliSeconds;
            saveNextAudio();
        }
        else {
            app.scheduleTask('$.__bodymovin.bm_audioSourceHelper.scheduleNextSave();', (1000 - _lastMilliseconds), false);
        }
    }
    function saveNextAudio() {
        var renderQueueHelper = $.__bodymovin.bm_renderQueueHelper;
        try {
            containingCompCopy.remove();
            containingCompCopy = null;
        }
        catch (err) {
        }
        if (currentExportingAudioIndex === audioSources.length) {
            if (templateProject) {
                try {
                    templateProject.remove();
                }
                catch (err) { }
            }
            renderQueueHelper.restoreRenderQueue();
            finishCallback$1();
        }
        else {
            saveAudio();
        }
    }
    function reset$2() {
        audioSources.length = 0;
        audioCount = 0;
        currentExportingAudioIndex = 0;
    }
    function save$1(_callback, _assetsArray) {
        assetsArray$1 = _assetsArray;
        finishCallback$1 = _callback;
        if (audioSources.length > 0) {
            saveNextAudio();
        }
        else {
            finishCallback$1();
        }
    }
    function isEmpty$1() {
        return audioSources.length === 0;
    }
    var bm_audioSourceHelper = {
        reset: reset$2,
        save: save$1,
        isEmpty: isEmpty$1,
        checkAudioSource: checkAudioSource,
        scheduleNextSave: scheduleNextSave,
        assetProcessed: assetProcessed,
    };

    var dataSources = [];
    var assetsArray;
    var dataCount = 0;
    var currentExportingDataIndex = 0;
    var imageNameIndex = 0;
    var finishCallback;
    function checkDataSource(item) {
        var i = 0;
        var len = dataSources.length;
        while (i < len) {
            if (dataSources[i].source === item.source) {
                return dataSources[i].id;
            }
            i += 1;
        }
        dataSources.push({
            source: item.source,
            source_name: item.source.name,
            name: item.name,
            id: 'footage_' + dataCount,
        });
        dataCount += 1;
        return dataSources[dataSources.length - 1].id;
    }
    var validRanges = [[65, 90], [45, 46], [48, 57], [95, 95], [97, 122]];
    function isValidChar(charCode) {
        var i = 0;
        var len = validRanges.length;
        while (i < len) {
            if (charCode >= validRanges[i][0] && charCode <= validRanges[i][1]) {
                return true;
            }
            i += 1;
        }
        return false;
    }
    function checkSanitizedNameExists(name) {
        var i = 0;
        var len = assetsArray.length;
        while (i < len) {
            if (assetsArray[i].p === name) {
                return true;
            }
            i += 1;
        }
        return false;
    }
    function incrementSanizitedName(name) {
        return name + '_' + imageNameIndex++;
    }
    function formatImageName(name) {
        var sanitizedName = '';
        var totalChars = name.lastIndexOf('.');
        var extensionIndex = name.lastIndexOf('.');
        var extension = extensionIndex !== -1 ? name.substr(extensionIndex) : '.png';
        if (totalChars < 0) {
            totalChars = name.length;
        }
        var i;
        for (i = 0; i < totalChars; i += 1) {
            var charCode = name.charCodeAt(i);
            if (isValidChar(charCode)) {
                sanitizedName += name.substr(i, 1);
            }
            else {
                sanitizedName += '_';
            }
            if (checkSanitizedNameExists(sanitizedName + extension)) {
                sanitizedName = incrementSanizitedName(sanitizedName);
            }
        }
        return sanitizedName + extension;
    }
    function getImageName(originalName, generatedName, extension) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var imageName;
        if (settingsHelper.shouldUserOriginalNames()) {
            imageName = formatImageName(originalName);
        }
        else {
            imageName = generatedName;
            {
                imageName += '.' + extension;
            }
        }
        return imageName;
    }
    function saveData$2() {
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var currentSourceData = dataSources[currentExportingDataIndex];
        var imageName = getImageName(currentSourceData.source_name, 'footage_' + currentExportingDataIndex, 'json');
        var renderFileData = bm_fileManager.createFile(imageName, ['raw', 'images']);
        var file = currentSourceData.source.file;
        file.copy(renderFileData.file.fsName);
        assetsArray.push({
            id: currentSourceData.id,
            u: 'images/',
            p: imageName,
            e: 0,
            fileId: renderFileData.id,
            t: 3,
        });
        currentExportingDataIndex += 1;
        if (currentExportingDataIndex === dataSources.length) {
            finishCallback();
        }
        else {
            saveData$2();
        }
    }
    function saveNextData() {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        bm_eventDispatcher.log('DATA: ');
        if (currentExportingDataIndex === dataSources.length) {
            finishCallback();
        }
        else {
            saveData$2();
        }
    }
    function reset$1() {
        dataSources.length = 0;
        dataCount = 0;
        currentExportingDataIndex = 0;
    }
    function save(_callback, _assetsArray) {
        assetsArray = _assetsArray;
        finishCallback = _callback;
        if (dataSources.length > 0) {
            saveNextData();
        }
        else {
            finishCallback();
        }
    }
    function isEmpty() {
        return dataSources.length === 0;
    }
    var bm_dataSourceHelper = {
        reset: reset$1,
        save: save,
        isEmpty: isEmpty,
        checkDataSource: checkDataSource,
    };

    var bm_sourceHelper;
    function getSourceHelper() {
        if (!bm_sourceHelper) {
            bm_sourceHelper = $.__bodymovin.bm_sourceHelper;
        }
        return bm_sourceHelper;
    }
    function exportStills(layerInfo, layerOb, frameRate) {
        var layerTypes = $.__bodymovin.layerTypes;
        var sourceHelper = getSourceHelper();
        layerOb.w = layerInfo.width;
        layerOb.h = layerInfo.height;
        layerOb.ty = layerTypes.precomp;
        if (layerOb.compId) {
            var totalFrames = Math.round(layerInfo.source.duration / layerInfo.source.frameDuration);
            var sequenceIds = sourceHelper.addImageSequenceStills(layerInfo, totalFrames);
            var i = void 0;
            var layers = [];
            for (i = 0; i < totalFrames; i += 1) {
                var duration = i === totalFrames - 1 ? 2 : 1;
                layers.push({
                    ty: layerTypes.still,
                    sc: "#00ffff",
                    refId: sequenceIds[i],
                    ks: {
                        p: { a: 0, k: [0, 0] },
                        a: { a: 0, k: [0, 0] },
                        s: { a: 0, k: [100, 100] },
                        r: { a: 0, k: [0] },
                        o: { a: 0, k: [100] },
                    },
                    ip: Math.round(1000 * i / 1) / 1000,
                    st: Math.round(1000 * i / 1) / 1000,
                    op: Math.round(1000 * (i + duration) / 1) / 1000,
                    sr: 1,
                    bm: 0,
                });
            }
            layerOb.layers = layers;
        }
    }
    var bm_imageSeqHelper = {
        exportStills: exportStills,
    };

    var commands = {};
    var projectId = '';
    var tempId = '';
    var project;
    function getItemType(item) {
        var getType = {};
        var type = getType.toString.call(item);
        var itemType = '';
        switch (type) {
            case "[object FolderItem]":
                itemType = 'Folder';
                break;
            case "[object FootageItem]":
                itemType = 'Footage';
                break;
            case "[object CompItem]":
                itemType = 'Comp';
                break;
            default:
                itemType = type;
                break;
        }
        return itemType;
    }
    function searchCommands() {
        commands.shapesFromText = 3781;
        commands.duplicate = 2080;
    }
    function getCommandID(key) {
        return commands[key];
    }
    function checkProject() {
        var storedProjectId;
        storedProjectId = bm_XMPHelper.getMetadata('project_id');
        if (!app.project || app.project.numItems === 0) {
            return;
        }
        if (!storedProjectId) {
            storedProjectId = bm_generalUtils.random(20);
            bm_XMPHelper.setMetadata('project_id', storedProjectId);
        }
        if (projectId !== storedProjectId) {
            projectId = storedProjectId;
            bm_eventDispatcher.sendEvent('bm:project:id', { id: projectId, name: app.project.file.name });
        }
        else {
            try {
                var areEqual = app.project === project;
            }
            catch (err) {
                storedProjectId = bm_generalUtils.random(20);
                bm_XMPHelper.setMetadata('project_id', storedProjectId);
                projectId = storedProjectId;
                bm_eventDispatcher.sendEvent('bm:project:id', { id: projectId, name: app.project.file.name });
            }
        }
    }
    function createTempId() {
        if (tempId) {
            return;
        }
        tempId = bm_generalUtils.random(32);
        bm_fileManager.removeOldTemporaryFolder();
        bm_eventDispatcher.sendEvent('bm:temp:id', { id: tempId });
        try {
            var tempIdFile = new File(Folder.temp.absoluteURI + '/bodymovin_uid.txt');
            tempIdFile.open('w', 'TEXT', '????');
            tempIdFile.encoding = 'UTF-8';
            tempIdFile.write(tempId);
            tempIdFile.close();
        }
        catch (error) {
        }
    }
    function getCompositions$1() {
        project = app.project;
        var arr = [];
        if (!project) {
            return arr;
        }
        var i;
        var numItems = project.numItems;
        for (i = 0; i < numItems; i += 1) {
            if (getItemType(project.item(i + 1)) === 'Comp') {
                arr.push(project.item(i + 1));
            }
        }
        return arr;
    }
    function getCompositionById(id) {
        var i;
        var numItems = project.numItems;
        for (i = 0; i < numItems; i += 1) {
            if (getItemType(project.item(i + 1)) === 'Comp') {
                if (project.item(i + 1).id == id) {
                    return project.item(i + 1);
                }
            }
        }
    }
    function getFile(path) {
        var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';
        var folder = new Folder(extensionPath);
        folder = folder.parent;
        var file = new File(folder.absoluteURI + '/' + path);
        return file;
    }
    function getProjectPath() {
        if (app.project && app.project.file && app.project.file.parent) {
            var projectFolder = app.project.file.parent;
            bm_eventDispatcher.sendEvent('bm:project:path', { path: projectFolder.fsName });
        }
    }
    function getUserFolders() {
        bm_eventDispatcher.sendEvent('bm:user:folders', { userData: Folder.userData.fsName });
    }
    function setDestinationPath(path) {
        var uri;
        if (path) {
            uri = path;
        }
        else {
            uri = Folder.desktop.absoluteURI + '/settings.json';
        }
        var f = new File(uri);
        var saveFileData = f.saveDlg();
        if (saveFileData !== null) {
            var compositionDestinationData = {
                absoluteURI: saveFileData.absoluteURI,
                destination: saveFileData.fsName,
                fsName: saveFileData.fsName,
            };
            bm_eventDispatcher.sendEvent('bm:destination:selected', compositionDestinationData);
        }
        else {
            bm_eventDispatcher.sendEvent('bm:destination:cancelled');
        }
    }
    function getSelectedProperties() {
        var props = [];
        var comp = getActiveComp();
        if (comp) {
            var selectedLayers = comp.selectedLayers;
            var i = 0;
            for (i = 0; i < selectedLayers.length; i += 1) {
                var layer = selectedLayers[i];
                try {
                    for (var j = 0; j < layer.selectedProperties.length; j += 1) {
                        props.push({
                            matchName: layer.selectedProperties[j].matchName,
                            name: layer.selectedProperties[j].name,
                        });
                    }
                }
                catch (error) {
                }
            }
        }
        bm_eventDispatcher.sendEvent('bm:properties:list', props);
    }
    var bm_projectManager = {
        checkProject: checkProject,
        createTempId: createTempId,
        getCompositions: getCompositions$1,
        getCompositionById: getCompositionById,
        searchCommands: searchCommands,
        getCommandID: getCommandID,
        getFile: getFile,
        getProjectPath: getProjectPath,
        getUserFolders: getUserFolders,
        setDestinationPath: setDestinationPath,
        getSelectedProperties: getSelectedProperties,
    };

    var compositions = [];
    var projectComps;
    var ob$1;
    var currentComposition;
    function getCompositionData(comp) {
        var i = 0;
        var len = compositions.length;
        var compData;
        while (i < len) {
            if (compositions[i].id === comp.id) {
                compData = compositions[i];
                break;
            }
            i += 1;
        }
        if (!compData) {
            compData = {
                id: comp.id,
                name: comp.name,
                width: comp.width,
                height: comp.height,
            };
        }
        return compData;
    }
    function searchCompositionDestination(id, absoluteURI, fileName) {
        var uri;
        if (absoluteURI) {
            uri = absoluteURI;
        }
        else {
            uri = Folder.desktop.absoluteURI + '/' + fileName;
        }
        var f = new File(uri);
        var saveFileData = f.saveDlg();
        if (saveFileData !== null) {
            var compositionDestinationData = {
                absoluteURI: saveFileData.absoluteURI,
                destination: saveFileData.fsName,
                id: id,
            };
            bm_eventDispatcher.sendEvent('bm:composition:destination_set', compositionDestinationData);
        }
    }
    function browseFolder$2(destination) {
        var file = new File(destination);
        file.parent.execute();
    }
    function browseFolderFromPath(path) {
        path = path ? path : Folder.desktop.absoluteURI;
        var f = new Folder(path);
        var openFileData = f.selectDlg();
        if (openFileData !== null) {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:uri', {
                absoluteURI: openFileData.absoluteURI,
                fsName: openFileData.fsName,
                path: openFileData.absoluteURI,
            });
        }
        else {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:cancel');
        }
    }
    function updateData() {
        bm_projectManager.checkProject();
        getCompositions();
    }
    function getCompositions() {
        var compositions = [];
        projectComps = bm_projectManager.getCompositions();
        var i;
        var len = projectComps.length;
        for (i = 0; i < len; i += 1) {
            compositions.push(getCompositionData(projectComps[i]));
        }
        bm_eventDispatcher.sendEvent('bm:compositions:list', compositions);
    }
    function renderComposition(compositionData) {
        ob$1.cancelled = false;
        currentComposition = compositionData;
        projectComps = bm_projectManager.getCompositions();
        var comp;
        var i = 0;
        var len = projectComps.length;
        while (i < len) {
            if (projectComps[i].id === currentComposition.id) {
                comp = projectComps[i];
                break;
            }
            i += 1;
        }
        bm_eventDispatcher.sendEvent('bm:render:start', currentComposition.id);
        var destination = currentComposition.absoluteURI;
        var fsDestination = currentComposition.destination;
        var destinationFile = new File(destination);
        var destinationFolder = destinationFile.parent;
        if (!destinationFolder.exists) {
            destinationFolder.create();
        }
        $.__bodymovin.bm_renderManager.render(comp, destination, fsDestination, currentComposition.settings, currentComposition.uid);
    }
    function renderComplete() {
        bm_eventDispatcher.sendEvent('bm:render:complete', currentComposition.id);
    }
    function cancel() {
        ob$1.cancelled = true;
        $.__bodymovin.bm_textShapeHelper.removeComps();
        bm_eventDispatcher.sendEvent('bm:render:cancel');
    }
    function navigateToLayer(compositionId, layerIndex) {
        var comps = bm_projectManager.getCompositions();
        var i = 0;
        var len = comps.length;
        var comp;
        while (i < len) {
            comp = projectComps[i];
            if (comp.id === compositionId) {
                try {
                    comp.openInViewer();
                    app.executeCommand(2004);
                    var layer = comp.layer(layerIndex);
                    layer.selected = true;
                }
                catch (err) {
                    bm_eventDispatcher.sendEvent('bm:navigation:cancel');
                }
                break;
            }
            i += 1;
        }
    }
    function getTimelinePosition() {
        var comp = getActiveComp();
        if (comp) {
            bm_eventDispatcher.sendEvent('bm:composition:timelinePosition', {
                active: true,
                data: {
                    inPoint: comp.workAreaStart * comp.frameRate,
                    outPoint: (comp.workAreaStart + comp.workAreaDuration) * comp.frameRate,
                    time: comp.time * comp.frameRate,
                },
            });
        }
        else {
            bm_eventDispatcher.sendEvent('bm:composition:timelinePosition', {
                active: false,
            });
        }
    }
    function setTimelinePosition(progress) {
        var comp = getActiveComp();
        if (comp) {
            var timeInSeconds = comp.workAreaStart + comp.workAreaDuration * progress;
            var timeInFrames = timeInSeconds * comp.frameRate;
            comp.time = Math.floor(timeInFrames) / comp.frameRate;
        }
    }
    ob$1 = {
        updateData: updateData,
        searchCompositionDestination: searchCompositionDestination,
        renderComplete: renderComplete,
        browseFolder: browseFolder$2,
        browseFolderFromPath: browseFolderFromPath,
        renderComposition: renderComposition,
        getTimelinePosition: getTimelinePosition,
        setTimelinePosition: setTimelinePosition,
        cancel: cancel,
        navigateToLayer: navigateToLayer,
        cancelled: false,
    };
    var bm_compsManager = ob$1;

    var _endCallback;
    function initialIdleStatus() {
        var bm = $.__bodymovin;
        var exporterHelpers = bm && bm.bm_exporterHelpers;
        return exporterHelpers ? exporterHelpers.exportStatuses.IDLE : undefined;
    }
    var results = {
        avd: {
            status: initialIdleStatus(),
        },
        smil: {
            status: initialIdleStatus(),
        },
        banner: {
            status: initialIdleStatus(),
        },
        demo: {
            status: initialIdleStatus(),
        },
        rive: {
            status: initialIdleStatus(),
        },
        standalone: {
            status: initialIdleStatus(),
        },
        standard: {
            status: initialIdleStatus(),
        },
    };
    function separateComps(layers, comps) {
        var layerTypes = $.__bodymovin.layerTypes;
        var i;
        var len = layers.length;
        for (i = 0; i < len; i += 1) {
            if (layers[i].ty === layerTypes.precomp && layers[i].compId) {
                comps.push({
                    id: layers[i].compId,
                    nm: layers[i].compName,
                    fr: layers[i].frameRate,
                    pfr: layers[i].preserveNestedFrameRate,
                    layers: layers[i].layers,
                });
                separateComps(layers[i].layers, comps);
                delete layers[i].compId;
                delete layers[i].layers;
                delete layers[i].compName;
                delete layers[i].frameRate;
                delete layers[i].preserveNestedFrameRate;
            }
        }
    }
    function deleteAssetParams(assets) {
        if (!assets) {
            return;
        }
        var i;
        var len = assets.length;
        for (i = 0; i < len; i += 1) {
            assets[i].fileId = undefined;
        }
    }
    function deleteLayerParams(layers) {
        var layerTypes = $.__bodymovin.layerTypes;
        var i;
        var len = layers.length;
        for (i = 0; i < len; i += 1) {
            delete layers[i].isValid;
            delete layers[i].isGuide;
            delete layers[i].isAdjustment;
            delete layers[i].render;
            delete layers[i].enabled;
            if (layers[i].ty === layerTypes.precomp && layers[i].layers) {
                deleteLayerParams(layers[i].layers);
            }
        }
    }
    function deleteExtraParams(data, settings) {
        if (data.fonts.length === 0) {
            delete data.fonts;
            delete data.chars;
        }
        else {
            if (!settings.glyphs) {
                delete data.chars;
            }
        }
        deleteAssetParams(data.assets);
        deleteExcludedLayers(data.layers);
        deleteLayerParams(data.layers);
    }
    function deleteExcludedLayers(layers) {
        var layerTypes = $.__bodymovin.layerTypes;
        var i;
        var len = layers.length;
        for (i = 0; i < len; i += 1) {
            if (layers[i]._excluded) {
                layers.splice(i, 1);
                i -= 1;
                len -= 1;
            }
            else if (layers[i].ty === layerTypes.precomp && layers[i].layers) {
                deleteExcludedLayers(layers[i].layers);
            }
        }
    }
    function moveCompsToAssets(data) {
        if (data.comps) {
            if (data.assets) {
                data.assets = data.assets.concat(data.comps);
            }
            else {
                data.assets = data.comps;
            }
            data.comps = null;
            delete data.comps;
        }
    }
    function onResult(type, status) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        var exportStatuses = exporterHelpers.exportStatuses;
        results[type].status = status;
        var idleCount = 0;
        var failedCount = 0;
        for (var exportType in results) {
            if (results[exportType].status === exportStatuses.IDLE) {
                idleCount += 1;
            }
            else if (results[exportType].status === exportStatuses.FAILED) {
                failedCount += 1;
            }
        }
        if (idleCount === 0) {
            if (failedCount > 0) {
                bm_eventDispatcher.sendEvent('bm:alert', { message: 'Some exports failed.<br /> Is Preferences > Scripting & Expressions > Allow Scripts to Write Files and Access Network enabled?' });
            }
            _endCallback();
        }
    }
    function resetStatus() {
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        var exportStatuses = exporterHelpers.exportStatuses;
        var exportTypes = exporterHelpers.exportTypes;
        results[exportTypes.AVD].status = exportStatuses.IDLE;
        results[exportTypes.SMIL].status = exportStatuses.IDLE;
        results[exportTypes.BANNER].status = exportStatuses.IDLE;
        results[exportTypes.DEMO].status = exportStatuses.IDLE;
        results[exportTypes.RIVE].status = exportStatuses.IDLE;
        results[exportTypes.STANDALONE].status = exportStatuses.IDLE;
        results[exportTypes.STANDARD].status = exportStatuses.IDLE;
    }
    function saveData$1(data, destinationPath, config, callback) {
        var JSON = $.__bodymovin.JSON;
        var bm_bannerExporter = $.__bodymovin.bm_bannerExporter;
        var bm_standardExporter = $.__bodymovin.bm_standardExporter;
        var bm_standaloneExporter = $.__bodymovin.bm_standaloneExporter;
        var bm_demoExporter = $.__bodymovin.bm_demoExporter;
        var bm_avdExporter = $.__bodymovin.bm_avdExporter;
        var bm_smilExporter = $.__bodymovin.bm_smilExporter;
        var bm_riveExporter = $.__bodymovin.bm_riveExporter;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        resetStatus();
        _endCallback = callback;
        var destinationFile = new File(destinationPath);
        var destinationFileName = destinationFile.name;
        var destinationFileNameWithoutExtension = destinationFileName.substr(0, destinationFileName.lastIndexOf('.'));
        deleteExtraParams(data, config);
        separateComps(data.layers, data.comps);
        moveCompsToAssets(data);
        var stringifiedData;
        if (settingsHelper.shouldPrettyPrint()) {
            stringifiedData = JSON.stringify(data, null, '\t');
        }
        else {
            stringifiedData = JSON.stringify(data);
            stringifiedData = stringifiedData.replace(/\n/g, '');
        }
        bm_fileManager.addFile(destinationFileNameWithoutExtension + '.json', ['raw'], stringifiedData, 'main');
        bm_avdExporter.save(destinationPath, config, onResult);
        bm_smilExporter.save(destinationPath, config, onResult);
        bm_bannerExporter.save(destinationPath, config, onResult);
        bm_demoExporter.save(destinationPath, config, onResult, data);
        bm_riveExporter.save(destinationPath, config, onResult);
        bm_standardExporter.save(destinationPath, config, onResult);
        bm_standaloneExporter.save(destinationPath, config, onResult);
    }
    function saveReport(reportData, destinationPath) {
        var JSON = $.__bodymovin.JSON;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var exporterHelpers = $.__bodymovin.bm_exporterHelpers;
        var destinationData = exporterHelpers.parseDestination(destinationPath, 'report');
        var demoDestinationFile = new File(destinationData.folder.fsName);
        demoDestinationFile.changePath('report.json');
        demoDestinationFile.open('w', 'TEXT', '????');
        demoDestinationFile.encoding = 'UTF-8';
        var reportStr = JSON.stringify(reportData);
        reportStr = reportStr.replace(/\n/g, '');
        try {
            demoDestinationFile.write(reportStr);
            demoDestinationFile.close();
        }
        catch (error) {
            bm_eventDispatcher.log('ERROR SAVE REPORT');
        }
        return demoDestinationFile.fsName;
    }
    var bm_dataManager = {
        saveData: saveData$1,
        saveReport: saveReport,
    };

    var ob = {};
    var pendingLayers = [];
    var destinationPath;
    var fsDestinationPath;
    var currentCompID;
    var totalLayers;
    var currentLayer;
    var currentCompUID;
    var currentExportedComps = [];
    var processesState = {
        render: 'idle',
        report: 'idle',
        expressions: 'idle',
        fonts: 'idle',
    };
    function getParentData(layers, id) {
        var i = 0, len = layers.length;
        while (i < len) {
            if (layers[i].ind === id) {
                return layers[i];
            }
            i += 1;
        }
    }
    function restoreParents(layers) {
        var layerTypes = $.__bodymovin.layerTypes;
        var layerData, parentData, i, len = layers.length, hasChangedState = false;
        for (i = 0; i < len; i += 1) {
            layerData = layers[i];
            if (layerData.parent) ;
            if (layerData.parent !== undefined && layerData.render !== false) {
                parentData = getParentData(layers, layerData.parent);
                if (parentData.render === false) {
                    parentData.ty = layerTypes.nullLayer;
                    hasChangedState = true;
                    parentData.render = true;
                    if (parentData.isValid === false || parentData.isGuide === false) {
                        parentData.isValid = true;
                    }
                    if (parentData.tt) {
                        delete parentData.tt;
                    }
                    if (parentData.td) {
                        delete parentData.td;
                    }
                }
            }
        }
        if (hasChangedState) {
            restoreParents(layers);
        }
    }
    function getLayerDataByLayer(layer) {
        var i = 0, len = pendingLayers.length;
        while (i < len) {
            if (pendingLayers[i].layer === layer) {
                return pendingLayers[i];
            }
            i += 1;
        }
    }
    function updateLayersRange(layers, compTimeRange) {
        var layerTypes = $.__bodymovin.layerTypes;
        var i, len = layers.length;
        var layer, layerData;
        for (i = 0; i < len; i += 1) {
            layer = layers[i + 1];
            layerData = getLayerDataByLayer(layer);
            if (layerData) {
                if (layerData.range[0] === layerData.range[1]) {
                    layerData.range[0] = compTimeRange[0];
                    layerData.range[1] = compTimeRange[1];
                }
                else {
                    layerData.range[0] = Math.min(layerData.range[0], compTimeRange[0]);
                    layerData.range[1] = Math.max(layerData.range[1], compTimeRange[1]);
                }
                if (layerData.data.ty === layerTypes.precomp
                    && layerData.data.render !== false) {
                    var newInPoint = Math.max(0, compTimeRange[0] - layer.startTime);
                    var newOutPoint = Math.min(layer.outPoint, compTimeRange[1]) - layer.startTime;
                    var newTimeRange = [newInPoint, newOutPoint];
                    updateLayersRange(layer.source.layers, newTimeRange);
                }
            }
        }
    }
    function searchFolderAndCharacter(layer) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var textCompHelper = $.__bodymovin.bm_textCompHelper;
        try {
            var comps = textCompHelper.findFolderFont(layer);
            var exportData = ob.renderData.exportData;
            for (var i = 0; i < comps.length; i += 1) {
                var compObject = comps[i];
                var compData = compObject.compData;
                var comp = compObject.comp;
                createLayers(comp, compData.layers, exportData.fr, false, [0, comp.duration]);
                exportData.comps.push(compData);
            }
        }
        catch (error) {
            var e = error;
            bm_eventDispatcher.log('error');
            bm_eventDispatcher.log(e.message);
            bm_eventDispatcher.log(e.line);
            bm_eventDispatcher.log(e.fileName);
        }
    }
    function createLayers(comp, layers, framerate, deepTraversing, compTimeRange) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_layerElement = $.__bodymovin.bm_layerElement;
        var layerTypes = $.__bodymovin.layerTypes;
        var essentialPropertiesHelper = $.__bodymovin.bm_essentialPropertiesHelper;
        var currentCompSettings = settingsHelper.get();
        var i, len = comp.layers.length, layerInfo, layerData;
        var newInPoint, newOutPoint, newTimeRange;
        for (i = 0; i < len; i += 1) {
            layerInfo = comp.layers[i + 1];
            layerData = bm_layerElement.prepareLayer(layerInfo, currentCompSettings.should_include_av_assets);
            ob.renderData.exportData.ddd = layerData.ddd === 1 ? 1 : ob.renderData.exportData.ddd;
            if (currentCompSettings.hiddens && layerData.enabled === false) {
                layerData.render = true;
                layerData.enabled = true;
                if (!layerData.td) {
                    layerData.hd = true;
                }
            }
            if (currentCompSettings.guideds && layerData.isGuide === true) {
                layerData.render = true;
                layerData.hd = true;
            }
            layers.push(layerData);
            if (settingsHelper.shouldBakeBeyondWorkArea()) {
                newTimeRange = [0, comp.duration];
            }
            else {
                newInPoint = Math.max(compTimeRange[0], layerInfo.inPoint);
                newOutPoint = Math.max(newInPoint, Math.min(compTimeRange[1], layerInfo.outPoint));
                newTimeRange = [newInPoint, newOutPoint];
            }
            if (currentCompSettings.shouldTrimData && newTimeRange[0] === newTimeRange[1]) {
                layerData._excluded = true;
            }
            pendingLayers.push({ data: layerData, layer: layerInfo, framerate: framerate, range: newTimeRange });
        }
        restoreParents(layers);
        for (i = 0; i < len; i += 1) {
            layerData = layers[i];
            layerInfo = comp.layers[i + 1];
            bm_layerElement.checkLayerSource(layerInfo, layerData);
            if (layerData.ty === layerTypes.text) {
                $.__bodymovin.bm_textShapeHelper.addComps();
                searchFolderAndCharacter(layerInfo);
            }
            if (layerData.ty === layerTypes.precomp && layerData.render !== false) {
                essentialPropertiesHelper.addCompProperties(layerInfo, framerate);
                if (settingsHelper.shouldBakeBeyondWorkArea()) {
                    newTimeRange = [0, comp.duration];
                }
                else {
                    newInPoint = Math.max(compTimeRange[0], layerInfo.inPoint);
                    newOutPoint = Math.max(newInPoint, Math.min(compTimeRange[1], layerInfo.outPoint));
                    newTimeRange = [newInPoint - layerInfo.startTime, newOutPoint - layerInfo.startTime];
                }
                if (layerData.compId) {
                    currentExportedComps.push(layerData.compId);
                    if (deepTraversing) {
                        layerData.layers = [];
                        createLayers(layerInfo.source, layerData.layers, framerate, deepTraversing, newTimeRange);
                    }
                }
                else {
                    updateLayersRange(layerInfo.source.layers, newTimeRange);
                }
            }
        }
    }
    function buildCompositionMetadata(metadata) {
        var metadataData = {};
        var hasMetadata = false;
        if (metadata) {
            if (metadata.includeFileName) {
                var projectName = "Untitled";
                if (app.project.file != null) {
                    projectName = decodeURIComponent(app.project.file.name);
                }
                metadataData.filename = projectName;
                hasMetadata = true;
            }
            if (metadata.customProps && metadata.customProps.length > 0) {
                for (var i = 0; i < metadata.customProps.length; i += 1) {
                    var customProp = metadata.customProps[i];
                    if (customProp.active === true) {
                        if (!metadataData.customProps) {
                            metadataData.customProps = {};
                            hasMetadata = true;
                        }
                        metadataData.customProps[customProp.name] = customProp.value;
                    }
                }
            }
        }
        if (hasMetadata) {
            return metadataData;
        }
    }
    function getRenderingComp(comp) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if (settingsHelper.shouldSkipExternalComposition()) {
            var totalLayers = comp.layers.length;
            if (totalLayers === 1) {
                return comp.layers[1];
            }
        }
        return comp;
    }
    function render(comp, destination, fsDestination, compSettings, compUid) {
        var textCompHelper = $.__bodymovin.bm_textCompHelper;
        var expressionHelper = $.__bodymovin.bm_expressionHelper;
        var essentialPropertiesHelper = $.__bodymovin.bm_essentialPropertiesHelper;
        var bm_fileManager = $.__bodymovin.bm_fileManager;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_ProjectHelper = $.__bodymovin.bm_ProjectHelper;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_layerElement = $.__bodymovin.bm_layerElement;
        var versionHelper = $.__bodymovin.bm_versionHelper;
        $.__bodymovin.bm_sourceHelper.reset();
        $.__bodymovin.bm_textShapeHelper.reset();
        textCompHelper.reset();
        expressionHelper.setCallbacks(expressionsStarted, expressionsSaved);
        expressionHelper.reset();
        essentialPropertiesHelper.reset();
        if (!bm_fileManager.createTemporaryFolder()) {
            return;
        }
        settingsHelper.set(compSettings);
        var renderingComp = getRenderingComp(comp);
        var renderingCompSource;
        if (renderingComp === comp) {
            renderingCompSource = comp;
        }
        else {
            renderingCompSource = renderingComp.source;
        }
        processesState.render = 'working';
        processesState.report = 'working';
        processesState.fonts = 'working';
        processesState.charFonts = 'working';
        processesState.expressions = 'ended';
        app.beginUndoGroup("Render Bodymovin Animation");
        currentExportedComps = [];
        currentCompID = renderingCompSource.id;
        currentCompUID = compUid;
        bm_ProjectHelper.init();
        bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Starting Render', compId: currentCompID, progress: 0 });
        destinationPath = destination;
        fsDestinationPath = fsDestination;
        bm_layerElement.reset();
        pendingLayers.length = 0;
        var exportData = {
            v: versionHelper.get(),
            fr: renderingCompSource.frameRate,
            ip: renderingCompSource.workAreaStart * renderingCompSource.frameRate,
            op: (renderingCompSource.workAreaStart + renderingCompSource.workAreaDuration) * renderingCompSource.frameRate,
            w: renderingCompSource.width,
            h: renderingCompSource.height,
            nm: renderingCompSource.name,
            ddd: 0,
            assets: [],
            comps: [],
            fonts: [],
            layers: [],
            markers: [],
            slots: {},
            props: {},
            metadata: buildCompositionMetadata(compSettings.metadata),
        };
        currentExportedComps.push(currentCompID);
        ob.renderData.exportData = exportData;
        ob.renderData.firstFrame = exportData.ip * renderingCompSource.frameRate;
        if (renderingCompSource !== comp) {
            essentialPropertiesHelper.addCompProperties(renderingComp, renderingComp.frameRate);
        }
        createLayers(renderingCompSource, exportData.layers, exportData.fr, true, [renderingCompSource.workAreaStart, renderingCompSource.workAreaStart + renderingCompSource.workAreaDuration]);
        exportExtraComps(exportData);
        exportCompMarkers(exportData, renderingCompSource);
        exportMotionBlur(exportData, renderingCompSource);
        exportEssentialProps(exportData);
        totalLayers = pendingLayers.length;
        currentLayer = 0;
        createReport();
        app.scheduleTask('$.__bodymovin.bm_renderManager.renderNextLayer();', 20, false);
    }
    function onReportFail(error) {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        if (error) {
            bm_eventDispatcher.log(error.message);
            bm_eventDispatcher.log(error.line);
            bm_eventDispatcher.log(error.fileName);
        }
        bm_eventDispatcher.log($.stack);
        processesState.report = 'ended';
        checkProcesses();
    }
    function onReportComplete(report) {
        var bm_dataManager = $.__bodymovin.bm_dataManager;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var reportData = report.serialize();
        var reportPath = bm_dataManager.saveReport(reportData, destinationPath);
        bm_eventDispatcher.sendEvent('bm:report:saved', {
            compId: currentCompID,
            reportPath: reportPath,
        });
        processesState.report = 'ended';
        checkProcesses();
    }
    function createReport() {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_projectManager = $.__bodymovin.bm_projectManager;
        var reportManager = $.__bodymovin.bm_reportsManager;
        if (settingsHelper.shouldIncludeReport()) {
            var comp = bm_projectManager.getCompositionById(currentCompID);
            reportManager.createReport(comp, onReportComplete, onReportFail);
        }
        else {
            processesState.report = 'ended';
            checkProcesses();
        }
    }
    function checkProcesses() {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        if (processesState.report === 'ended'
            && processesState.render === 'ended') {
            clearData();
            bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Render finished', compId: currentCompID, progress: 1, isFinished: true, fsPath: fsDestinationPath });
        }
        else if (processesState.render === 'ended') {
            bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Finishing Report', compId: currentCompID, progress: 1 });
        }
    }
    function exportMotionBlur(exportData, comp) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        if (comp.motionBlur && settingsHelper.shouldIncludeNotSupportedProperties()) {
            exportData.mb = {
                sa: comp.shutterAngle,
                sp: comp.shutterPhase,
                spf: comp.motionBlurSamplesPerFrame,
                asl: comp.motionBlurAdaptiveSampleLimit
            };
        }
    }
    function exportEssentialProps(exportData) {
        var essentialPropertiesHelper = $.__bodymovin.bm_essentialPropertiesHelper;
        exportData.slots = essentialPropertiesHelper.exportProperties();
    }
    function exportCompMarkers(exportData, comp) {
        if (comp.markerProperty && comp.markerProperty.numKeys >= 1) {
            var markerProperty = comp.markerProperty;
            var markersList = exportData.markers;
            var len = markerProperty.numKeys, markerElement;
            var markerData;
            for (var i = 0; i < len; i += 1) {
                markerData = {};
                markerElement = markerProperty.keyValue(i + 1);
                markerData.tm = markerProperty.keyTime(i + 1) * exportData.fr;
                markerData.cm = markerElement.comment;
                markerData.dr = markerElement.duration * exportData.fr;
                markersList.push(markerData);
            }
        }
    }
    function exportExtraComps(exportData) {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_projectManager = $.__bodymovin.bm_projectManager;
        var currentCompSettings = settingsHelper.get();
        if (currentCompSettings.extraComps.active) {
            var list = currentCompSettings.extraComps.list;
            var i, len = list.length, compData;
            var j, jLen = currentExportedComps.length;
            for (i = 0; i < len; i += 1) {
                j = 0;
                while (j < jLen) {
                    if (currentExportedComps[j] === list[i]) {
                        break;
                    }
                    j += 1;
                }
                if (j === jLen) {
                    var comp = bm_projectManager.getCompositionById(list[i]);
                    compData = {
                        layers: [],
                        id: comp.id,
                        nm: comp.name,
                        xt: 1,
                        w: comp.width,
                        h: comp.height
                    };
                    createLayers(comp, compData.layers, exportData.fr, false, [0, comp.duration]);
                    exportData.comps.push(compData);
                }
            }
        }
    }
    function reset() {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_ProjectHelper = $.__bodymovin.bm_ProjectHelper;
        pendingLayers.length = 0;
        settingsHelper.set(null);
        bm_ProjectHelper.end();
    }
    function dataSaved() {
        processesState.render = 'ended';
        checkProcesses();
    }
    function expressionsSaved() {
        processesState.expressions = 'ended';
        saveData();
    }
    function expressionsStarted() {
        processesState.expressions = 'working';
        checkProcesses();
    }
    function clearData() {
        var bm_compsManager = $.__bodymovin.bm_compsManager;
        reset();
        $.__bodymovin.bm_textShapeHelper.removeComps();
        bm_compsManager.renderComplete();
        app.endUndoGroup();
    }
    function saveData() {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_dataManager = $.__bodymovin.bm_dataManager;
        var assetsStorage = $.__bodymovin.assetsStorage;
        if (processesState.expressions === 'ended'
            && processesState.fonts === 'ended') {
            var currentCompSettings = settingsHelper.get();
            bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Saving data ', compId: currentCompID, progress: 1 });
            try {
                bm_dataManager.saveData(ob.renderData.exportData, destinationPath, currentCompSettings, dataSaved);
                assetsStorage.storeAssets(ob.renderData.exportData.assets, currentCompUID);
            }
            catch (err) {
                bm_eventDispatcher.sendEvent('bm:alert', { message: 'Could not export files <br /> Is Preferences > Scripting & Expressions > Allow Scripts to Write Files and Access Network enabled?' });
                bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Render Failed ', compId: currentCompID, progress: 1, isFinished: false, fsPath: fsDestinationPath });
            }
        }
    }
    function clearUnrenderedLayers(layers) {
        var layerTypes = $.__bodymovin.layerTypes;
        var i, len = layers.length;
        for (i = 0; i < len; i += 1) {
            if (layers[i].render === false) {
                layers.splice(i, 1);
                i -= 1;
                len -= 1;
            }
            else if (layers[i].ty === layerTypes.precomp && layers[i].layers) {
                clearUnrenderedLayers(layers[i].layers);
            }
        }
    }
    function removeExtraData() {
        var bm_ProjectHelper = $.__bodymovin.bm_ProjectHelper;
        clearUnrenderedLayers(ob.renderData.exportData.layers);
        bm_ProjectHelper.end();
    }
    function renderNextLayer() {
        var bm_compsManager = $.__bodymovin.bm_compsManager;
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var renderHelper = $.__bodymovin.bm_renderHelper;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var bm_layerElement = $.__bodymovin.bm_layerElement;
        try {
            if (bm_compsManager.cancelled) {
                return;
            }
            var currentCompSettings = settingsHelper.get();
            if (pendingLayers.length) {
                var nextLayerData = pendingLayers.pop();
                renderHelper.pushRenderRange(nextLayerData.range);
                currentLayer += 1;
                bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Rendering layer: ' + nextLayerData.layer.name, compId: currentCompID, progress: currentLayer / totalLayers });
                bm_layerElement.renderLayer(nextLayerData, currentCompSettings.hiddens, renderLayerComplete);
            }
            else {
                removeExtraData();
                $.__bodymovin.bm_sourceHelper.exportImages(destinationPath, ob.renderData.exportData.assets, currentCompID, currentCompUID);
            }
        }
        catch (error) {
            if (error) {
                var e = error;
                bm_eventDispatcher.log('ERROR:renderNextLayer');
                bm_eventDispatcher.log(e.message);
                bm_eventDispatcher.log(e.line);
                bm_eventDispatcher.log(e.fileName);
            }
            bm_eventDispatcher.log($.stack);
            bm_eventDispatcher.sendEvent('bm:render:update', { type: 'update', message: 'Render Failed ', compId: currentCompID, progress: 1, isFinished: false, fsPath: fsDestinationPath });
        }
    }
    function handleFontsEnded() {
        processesState.fonts = 'ended';
        saveData();
    }
    function checkFonts() {
        var settingsHelper = $.__bodymovin.bm_settingsHelper;
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var fonts = $.__bodymovin.bm_sourceHelper.getFonts();
        var exportData;
        if (fonts.length === 0) {
            handleFontsEnded();
        }
        else {
            var currentCompSettings = settingsHelper.get();
            if (currentCompSettings.glyphs) {
                var fontsInfo = {
                    list: []
                };
                var list = fontsInfo.list;
                var i, len = fonts.length, fontOb;
                for (i = 0; i < len; i += 1) {
                    fontOb = {};
                    fontOb.fName = fonts[i].name;
                    fontOb.fFamily = fonts[i].family;
                    fontOb.fStyle = fonts[i].style;
                    list.push(fontOb);
                }
                exportData = ob.renderData.exportData;
                exportData.fonts = fontsInfo;
                $.__bodymovin.bm_textShapeHelper.exportFonts(fontsInfo);
                $.__bodymovin.bm_textShapeHelper.exportChars(fontsInfo);
            }
            else {
                exportData = ob.renderData.exportData;
                bm_eventDispatcher.sendEvent('bm:render:fonts', {
                    type: 'save',
                    compId: currentCompID,
                    fonts: fonts,
                    bundleFonts: settingsHelper.shouldBundleFonts(),
                    inlineFonts: settingsHelper.shouldInlineFonts(),
                });
            }
        }
    }
    function setChars(chars) {
        var bm_compsManager = $.__bodymovin.bm_compsManager;
        if (bm_compsManager.cancelled) {
            return;
        }
        var i, len = chars.length;
        for (i = 0; i < len; i += 1) {
            delete chars[i].font;
        }
        setCharsData(chars);
    }
    function setFontData(fontData) {
        var exportData = ob.renderData.exportData;
        exportData.fonts = fontData;
        $.__bodymovin.bm_textShapeHelper.exportFonts(fontData);
        handleFontsEnded();
    }
    function setCharsData(charData) {
        var exportData = ob.renderData.exportData;
        exportData.chars = charData;
        handleFontsEnded();
    }
    function imagesReady() {
        checkFonts();
    }
    function renderLayerComplete() {
        var renderHelper = $.__bodymovin.bm_renderHelper;
        renderHelper.popRenderRange();
        app.scheduleTask('$.__bodymovin.bm_renderManager.renderNextLayer();', 20, false);
    }
    function hasExpressions() {
    }
    function getVersion() {
        var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
        var versionHelper = $.__bodymovin.bm_versionHelper;
        bm_eventDispatcher.sendEvent('bm:version', { value: versionHelper.get() });
        bm_eventDispatcher.sendEvent('app:version', { value: app.version });
    }
    ob.renderData = {
        exportData: {
            assets: []
        }
    };
    ob.render = render;
    ob.renderNextLayer = renderNextLayer;
    ob.setChars = setChars;
    ob.imagesReady = imagesReady;
    ob.setFontData = setFontData;
    ob.setCharsData = setCharsData;
    ob.hasExpressions = hasExpressions;
    ob.getVersion = getVersion;
    var bm_renderManager = ob;

    if (!$.__bodymovin) {
        $.__bodymovin = { esprima: {} };
    }
    function browseFile$1(path) {
        path = path ? path : Folder.desktop.absoluteURI;
        var f = new File(path);
        var openFileData = f.openDlg();
        if (openFileData !== null) {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:file:uri', {
                absoluteURI: openFileData.absoluteURI,
                fsName: openFileData.fsName,
                path: openFileData.path,
            });
        }
        else {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:file:cancel');
        }
    }
    function browseFolder$1(path) {
        path = path ? path : Folder.desktop.absoluteURI;
        var f = new Folder(path);
        var openFileData = f.selectDlg();
        if (openFileData !== null) {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:uri', {
                absoluteURI: openFileData.absoluteURI,
                fsName: openFileData.fsName,
                path: openFileData.path,
            });
        }
        else {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:cancel');
        }
    }
    var bm_main = {
        browseFile: browseFile$1,
        browseFolder: browseFolder$1,
    };

    if (!$.__bodymovin) {
        $.__bodymovin = { esprima: {} };
    }
    function browseFile(path) {
        path = path ? path : Folder.desktop.absoluteURI;
        var f = new File(path);
        var openFileData = f.openDlg();
        if (openFileData !== null) {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:file:uri', {
                absoluteURI: openFileData.absoluteURI,
                fsName: openFileData.fsName,
                path: openFileData.path,
            });
        }
        else {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:file:cancel');
        }
    }
    function browseFolder(path) {
        path = path ? path : Folder.desktop.absoluteURI;
        var f = new Folder(path);
        var openFileData = f.selectDlg();
        if (openFileData !== null) {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:uri', {
                absoluteURI: openFileData.absoluteURI,
                fsName: openFileData.fsName,
                path: openFileData.path,
            });
        }
        else {
            $.__bodymovin.bm_eventDispatcher.sendEvent('bm:folder:cancel');
        }
    }
    var host_script = {
        browseFile: browseFile,
        browseFolder: browseFolder,
    };

    bm_lottieImporter.importLottieData = importLottieData;
    $.__bodymovin = { esprima: {} };
    if (!Function.prototype.bm_bind) {
        (function () {
            var slice = Array.prototype.slice;
            Function.prototype.bm_bind = function () {
                var thatFunc = this, thatArg = arguments[0];
                var args = slice.call(arguments, 1);
                if (typeof thatFunc !== 'function') {
                    throw new TypeError('Function.prototype.bm_bind - ' +
                        'what is trying to be bound is not callable');
                }
                return function () {
                    var funcArgs = args.concat(slice.call(arguments));
                    return thatFunc.apply(thatArg, funcArgs);
                };
            };
        })();
    }
    var bm = $.__bodymovin;
    bm.bm_eventDispatcher = bm_eventDispatcher;
    bm.bm_annotationsManager = bm_annotationsManager;
    bm.layerStyleTypes = layerStyleTypes;
    bm.layerTypes = layerTypes;
    bm.maskTypes = maskTypes;
    bm.shapeTypes = shapeTypes;
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
    bm.bm_layerElement = bm_layerElement;
    bm.bm_lottieImporter = bm_lottieImporter;
    bm.bm_avdExporter = bm_avdExporter;
    bm.bm_bannerExporter = bm_bannerExporter;
    bm.bm_demoExporter = bm_demoExporter;
    bm.bm_exporterHelpers = bm_exporterHelpers;
    bm.bm_riveExporter = bm_riveExporter;
    bm.bm_smilExporter = bm_smilExporter;
    bm.bm_standaloneExporter = bm_standaloneExporter;
    bm.bm_standardExporter = bm_standardExporter;
    bm.bm_reportBuilderTypes = bm_reportBuilderTypes;
    bm.bm_reportsEffectMessages = bm_reportsEffectMessages;
    bm.bm_reportMessageTypes = bm_reportMessageTypes;
    bm.bm_reportRendererTypes = bm_reportRendererTypes;
    bm.bm_messageClassReport = bm_messageClassReport;
    bm.bm_reportMessageFactory = bm_reportMessageFactory;
    bm.bm_reportEffectMessageFactory = bm_reportEffectMessageFactory;
    bm.bm_reportAnimatorSelectorMessageFactory =
        bm_reportAnimatorSelectorMessageFactory;
    bm.bm_reportAnimatorMessageFactory = bm_reportAnimatorMessageFactory;
    bm.bm_propertyReport = bm_propertyReport;
    bm.bm_positionReport = bm_positionReport;
    bm.bm_rotationReport = bm_rotationReport;
    bm.bm_transformReportFactory = bm_transformReportFactory;
    bm.bm_effectsReportFactory = bm_effectsReportFactory;
    bm.bm_masksReportFactory = bm_masksReportFactory;
    bm.bm_maskReportFactory = bm_maskReportFactory;
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
    bm.bm_textSelectorReport = bm_textSelectorReport;
    bm.bm_textAnimatorsReport = bm_textAnimatorsReport;
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
    bm.bm_shapeLayerReport = bm_shapeLayerReport$1;
    bm.bm_shapeLayerReport = bm_shapeLayerReport;
    bm.bm_layerReportHelper = bm_layerReportHelper;
    bm.bm_layerCollectionReport = bm_layerCollectionReport;
    bm.bm_animationReport = bm_animationReport;
    bm.bm_reportsManager = bm_reportsManager;
    bm.bm_downloadManager = bm_downloadManager;
    bm.bm_expressionHelper = bm_expressionHelper;
    bm.bm_generalUtils = bm_generalUtils;
    bm.bm_textCompHelper = bm_textCompHelper;
    bm.bez = bez;
    bm.Matrix = Matrix$1;
    bm.PropertyFactory = PropertyFactory;
    bm.bm_XMPHelper = bm_XMPHelper;
    bm.bm_ProjectHelper = bm_ProjectHelper;
    bm.bm_audioHelper = bm_audioHelper;
    bm.bm_cameraHelper = bm_cameraHelper;
    bm.bm_dataHelper = bm_dataHelper;
    bm.bm_keyframeHelper = bm_keyframeHelper;
    bm.bm_maskHelper = bm_maskHelper;
    bm.bm_markerHelper = bm_markerHelper;
    bm.bm_timeremapHelper = bm_timeremapHelper;
    bm.bm_shapeHelper = bm_shapeHelper;
    bm.bm_transformHelper = bm_transformHelper;
    bm.bm_effectsHelper = bm_effectsHelper;
    bm.bm_layerStylesHelper = bm_layerStylesHelper;
    bm.bm_essentialPropertiesHelper = bm_essentialPropertiesHelper;
    bm.bm_textHelper = bm_textHelper;
    bm.bm_textShapeHelper = bm_textShapeHelper;
    bm.bm_textAnimatorHelper = bm_textAnimatorHelper;
    bm.bm_sourceHelper = bm_sourceHelper$1;
    bm.bm_audioSourceHelper = bm_audioSourceHelper;
    bm.bm_dataSourceHelper = bm_dataSourceHelper;
    bm.bm_imageSeqHelper = bm_imageSeqHelper;
    bm.bm_projectManager = bm_projectManager;
    bm.bm_compsManager = bm_compsManager;
    bm.bm_dataManager = bm_dataManager;
    bm.bm_renderManager = bm_renderManager;
    bm.bm_main = bm_main;
    bm.host_script = host_script;

})();
