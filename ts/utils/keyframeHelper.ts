let property: any;
let j: number = 1;
let jLen: number;
let beziersArray: any[];
let averageSpeed: any;
let duration: number;
let bezierIn: any;
let bezierOut: any;
let frameRate: number;
let hasRovingKeyframes = false;

function getPropertyValue(value: any, roundFlag: boolean): any {
    var bm_generalUtils = $.__bodymovin.bm_generalUtils;
    switch (property.propertyValueType) {
    case PropertyValueType.SHAPE:
        var elem = {
            i : roundFlag ? bm_generalUtils.roundNumber(value.inTangents, 3) :  value.inTangents,
            o : roundFlag ? bm_generalUtils.roundNumber(value.outTangents, 3) : value.outTangents,
            v : roundFlag ? bm_generalUtils.roundNumber(value.vertices, 3) : value.vertices,
            c: value.closed
        };
        return elem;
    case PropertyValueType.COLOR:
        var i: number, len = value.length;
        for (i = 0; i < len; i += 1) {
            value[i] = Math.round(value[i]*1000000000000)/1000000000000;
            value[i] = value[i];
        }
        return value;
    default:
        return roundFlag ? bm_generalUtils.roundNumber(value, 3) :  value;
    }
}

function getCurveLength(initPos: any, endPos: any, outBezier: any, inBezier: any): number {
    var k: number, curveSegments = 200, point: number[], lastPoint: number[] | null = null, ptDistance: number, absToCoord: number[], absTiCoord: number[], triCoord1: number, triCoord2: number, triCoord3: number, liCoord1: number, liCoord2: number, ptCoord: number, perc: number, addedLength = 0, i: number, len: number;
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

function buildKeyInfluence(key: any, lastKey: any, indexTime: number): void {
    switch (property.propertyValueType) {
    case PropertyValueType.ThreeD_SPATIAL:
    case PropertyValueType.TwoD_SPATIAL:
    case PropertyValueType.SHAPE:
    case PropertyValueType.NO_VALUE:
        key.easeIn = {
            influence : property.keyInTemporalEase(indexTime + 1)[0].influence,
            speed : property.keyInTemporalEase(indexTime + 1)[0].speed
        };
        lastKey.easeOut = {
            influence : property.keyOutTemporalEase(indexTime)[0].influence,
            speed : property.keyOutTemporalEase(indexTime)[0].speed
        };
        break;
    default:
        key.easeIn = [];
        lastKey.easeOut = [];
        var inEase = property.keyInTemporalEase(indexTime + 1);
        var outEase = property.keyOutTemporalEase(indexTime);
        var i: number, len = inEase.length;
        for (i = 0; i < len; i += 1) {
            key.easeIn.push({influence: inEase[i].influence, speed: inEase[i].speed});
            lastKey.easeOut.push({influence: outEase[i].influence, speed: outEase[i].speed});
        }
    }
}

function exportKeys(prop: any, frRate: number, stretch: number, keyframeValues: any): any {
    var bm_generalUtils = $.__bodymovin.bm_generalUtils;
    var settingsHelper = $.__bodymovin.bm_settingsHelper;
    var exportOldFormat = settingsHelper.shouldExportOldFormat();
    var currentExpression = '';
    property = prop;
    var propertyValueType = property.propertyValueType;

    frameRate = frRate;
    beziersArray = [];
    if(propertyValueType === PropertyValueType.SHAPE) {
        if (prop.expressionEnabled && !prop.expressionError) {
            currentExpression = prop.expression;
            prop.expression = '';
        }
    }
    if (property.numKeys <= 1) {
        if(propertyValueType === PropertyValueType.NO_VALUE){
            return keyframeValues;
        }
        var propertyValue = getPropertyValue(property.valueAtTime(0, true), true);
        if(currentExpression !== ''){
            prop.expression = currentExpression;
        }
        return propertyValue;
    }
    jLen = property.numKeys;
    var isPrevHoldInterpolated = false;
    var STRETCH_FACTOR = stretch;
    for (j = 1; j < jLen; j += 1) {
        isPrevHoldInterpolated = false;
        var segmentOb: any = {};
        ///////
        var indexTime = j;
        var i: number, len: number;
        var k: number, kLen: number;
        var key: any = {};
        var lastKey: any = {};
        var interpolationType = '';
        key.time = property.keyTime(indexTime + 1);
        lastKey.time = property.keyTime(indexTime);
        if(propertyValueType !== PropertyValueType.NO_VALUE){
            key.value = getPropertyValue(property.keyValue(indexTime + 1), false);
            lastKey.value = getPropertyValue(property.keyValue(indexTime), false);
            if (!(key.value instanceof Array)) {
                key.value = [key.value];
                lastKey.value = [lastKey.value];
            }
        } else {
            key.value = keyframeValues[j];
            lastKey.value = keyframeValues[j-1];
        }
        if (property.keyOutInterpolationType(indexTime) === KeyframeInterpolationType.HOLD) {
            interpolationType = 'hold';
        } else {
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
            if(propertyValueType !== PropertyValueType.NO_VALUE){
                segmentOb.s = getPropertyValue(property.keyValue(j), true);
                if (!(segmentOb.s instanceof Array)) {
                    segmentOb.s = [segmentOb.s];
                }
            } else {
                segmentOb.s = keyframeValues[j-1];
            }
            segmentOb.h = 1;
        } else {
            duration = (key.time - lastKey.time)/STRETCH_FACTOR;
            len = propertyValueType === PropertyValueType.NO_VALUE ? 0 : key.value.length;
            bezierIn = {};
            bezierOut = {};
            averageSpeed = 0;
            var infOut: number, infIn: number;
            switch (property.propertyValueType) {
            case PropertyValueType.ThreeD_SPATIAL:
            case PropertyValueType.TwoD_SPATIAL:
                var curveLength = getCurveLength(lastKey.value, key.value, lastKey.to, key.ti);
                averageSpeed = curveLength / duration;
                if (curveLength === 0) {
                    infOut = lastKey.easeOut.influence;
                    infIn = key.easeIn.influence;
                } else {
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
                    if(property.propertyValueType === PropertyValueType.COLOR){
                        averageSpeed[i] =  255*(key.value[i] - lastKey.value[i]) / duration;
                    } else {
                        averageSpeed[i] =  (key.value[i] - lastKey.value[i]) / duration;
                    }
                }
                break;
            }
            if (averageSpeed === 0) {
                bezierIn.y = bezierIn.x;
                bezierOut.y = bezierOut.x;
            } else {
                switch (property.propertyValueType) {
                case PropertyValueType.ThreeD_SPATIAL:
                case PropertyValueType.TwoD_SPATIAL:
                case PropertyValueType.SHAPE:
                case PropertyValueType.NO_VALUE:
                    if (interpolationType === 'linear') {
                        bezierIn.y = bezierIn.x;
                        bezierOut.y = bezierOut.x;
                    } else {
                        bezierIn.y =  1 - (key.easeIn.speed / averageSpeed)  * (infIn! / 100);
                        bezierOut.y = (lastKey.easeOut.speed / averageSpeed) * (infOut! / 100);
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
                        } else {
                            var yNormal: number;
                            if(property.propertyValueType === PropertyValueType.COLOR){
                                yNormal = 255*(key.value[k] - lastKey.value[k]);
                            } else {
                                yNormal = (key.value[k] - lastKey.value[k]);
                            }
                            if(Math.abs(yNormal) < 0.0000001) {
                                yNormal = 1;
                            }
                            var bezierY = (lastKey.easeOut[k].speed*lastKey.easeOut[k].influence/100);
                            var bezierInY = (key.easeIn[k].speed*key.easeIn[k].influence/100);
                            bezierIn.y[k] = 1 - (bezierInY*duration)/yNormal;
                            bezierOut.y[k] = (bezierY*duration)/yNormal;
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
            if(propertyValueType !== PropertyValueType.NO_VALUE) {
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
            } else {
                segmentOb.s = keyframeValues[j-1];
                if (exportOldFormat) {
                    segmentOb.e = keyframeValues[j];
                }

            }
            if (property.propertyValueType === PropertyValueType.ThreeD_SPATIAL || property.propertyValueType === PropertyValueType.TwoD_SPATIAL) {
                segmentOb.to = lastKey.to;
                segmentOb.ti = key.ti;
            }
        }

        ///////
        beziersArray.push(segmentOb);
    }
    //
    if (exportOldFormat) {
        beziersArray.push({t: property.keyTime(j) * frameRate});
    } else {
        var finalValue: any;
        if(propertyValueType !== PropertyValueType.NO_VALUE) {
            finalValue = getPropertyValue(property.keyValue(j), true);
            if (!(finalValue instanceof Array)) {
                finalValue = [finalValue];
            }
        } else {
            finalValue = keyframeValues[j-1];

        }
        beziersArray.push({t: property.keyTime(j) * frameRate, s: finalValue});
    }

    //

    if (property.keyOutInterpolationType(j) === KeyframeInterpolationType.HOLD || isPrevHoldInterpolated) {
        if (exportOldFormat) {
            var value: any;
            if(propertyValueType !== PropertyValueType.NO_VALUE) {
                value = getPropertyValue(property.keyValue(j), true);
                if (!(value instanceof Array)) {
                    value = [value];
                }
            } else {
                value = keyframeValues[j-1];
            }
            beziersArray[beziersArray.length - 1].s = value;
        }
        beziersArray[beziersArray.length - 1].h = 1;
    }
    if(currentExpression !== ''){
        prop.expression = currentExpression;
    }
    return beziersArray;
}

function searchRovingKeyframes(property: any): void {
    var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
    hasRovingKeyframes = false;
    if(property.propertyValueType === PropertyValueType.ThreeD_SPATIAL ||  property.propertyValueType === PropertyValueType.TwoD_SPATIAL){
        var numKeys = property.numKeys;
        var keyIndex: number;
        for(keyIndex = 1; keyIndex <= numKeys; keyIndex += 1) {
            if(property.keyRoving(keyIndex)) {
                if(!hasRovingKeyframes) {
                    app.beginUndoGroup("Roving Undo Group");
                    hasRovingKeyframes = true;
                }
                property.setSelectedAtKey(keyIndex, true);
                bm_eventDispatcher.log('IT IS ROVING')
            }
        }
        if(hasRovingKeyframes) {
            app.executeCommand(3153);
        }
    }
}

function restoreRovingKeyframes(property: any): void {

    if(hasRovingKeyframes) {
        app.endUndoGroup();
        app.executeCommand(16);
        var keyIndex: number, numKeys = property.numKeys;
        for(keyIndex = 1; keyIndex <= numKeys; keyIndex += 1) {
            property.setSelectedAtKey(keyIndex, false);
        }
    }
}

function trimKeyframes(keyframes: any[], frameRate: number): any[] {
    var renderHelper = $.__bodymovin.bm_renderHelper;

    var range = renderHelper.getCurrentRange();
    var time = range[0];
    var index = 0;
    var totalFrames = (range[1] - range[0]) * frameRate;
    var initFrame = range[0] * frameRate
    var endFrame = range[1] * frameRate
    var i: number, len = keyframes.length;
    var count = 0
    for (i = 0; i < len; i += 1) {
        if (keyframes[i + 1] && keyframes[i + 1].t < initFrame) {
            keyframes.splice(i, 1);
            i -= 1;
            len -= 1;
        } else if(keyframes[i - 1] && keyframes[i - 1].t > endFrame) {
            keyframes.splice(i, 1);
            i -= 1
            len -= 1
        }
    }

    return keyframes
}

export function exportKeyframes(prop: any, frRate: number, stretch: number, keyframeValues?: any): any {
    var settingsHelper = $.__bodymovin.bm_settingsHelper;
    var bm_expressionHelper = $.__bodymovin.bm_expressionHelper;
    var bakeExpressions = $.__bodymovin.bm_keyframeBakerHelper;
    var essentialPropertiesHelper = $.__bodymovin.bm_essentialPropertiesHelper;
    var returnOb: any = {}
    if (settingsHelper.shouldExportEssentialProperties()) {
        if (settingsHelper.shouldExportEssentialPropertiesAsSlots()) {
            var essentialPropId = essentialPropertiesHelper.searchPropertyId(prop);
            if (essentialPropId) {
                returnOb.sid = essentialPropId;
            }
        } else {
            var essentialProperty = essentialPropertiesHelper.searchProperty(prop);
            if (essentialProperty) {
                for (var key in essentialProperty) {
                    if (essentialProperty.hasOwnProperty(key)) {
                        returnOb[key] = essentialProperty[key];
                    }
                }
                if(prop.propertyIndex && !settingsHelper.shouldIgnoreExpressionProperties()) {
                    returnOb.ix = prop.propertyIndex;
                }
                return returnOb;
            }
        }
    }
    if (bm_expressionHelper.shouldBakeExpression(prop)) {
        returnOb = bakeExpressions(prop, frRate);
    } else {
        if (prop.numKeys <= 1) {
            returnOb.a = 0;
        } else {
            returnOb.a = 1;
        }
        searchRovingKeyframes(prop);
        var keys = exportKeys(prop, frRate, stretch, keyframeValues);
        if (settingsHelper.shouldTrimData() && prop.numKeys > 1) {
            keys = trimKeyframes(keys, frRate)
        }
        returnOb.k = keys;
        if(prop.propertyIndex && !settingsHelper.shouldIgnoreExpressionProperties()) {
            returnOb.ix = prop.propertyIndex;
        }
        bm_expressionHelper.checkExpression(prop, returnOb);
        restoreRovingKeyframes(prop);
    }
    return returnOb;
}

export const bm_keyframeHelper = { exportKeyframes };
