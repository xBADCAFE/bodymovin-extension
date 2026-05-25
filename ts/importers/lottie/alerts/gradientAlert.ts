function getKeyframes(gradientKeys: any): any[] {
  if (typeof gradientKeys[0] === 'number') {
    return [{
      s: gradientKeys,
    }];
  }
  return gradientKeys;
}

function buildGradientKeyframes(gradientData: any): { colors: any[]; alphas: any[] } {
  var totalPositions = gradientData.p;
  var colors: any[] = [];
  var alphas: any[] = [];
  var keyframes = getKeyframes(gradientData.k.k);
  keyframes.forEach(function (gradient: any) {
    var gradientValue = gradient.s;
    var hasAlpha = gradientValue.length / 4 !== totalPositions;
    var colorList: any[] = [];
    var alphaList: any[] = [];
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

export function buildGradientAlert(layerData: any): any {
  return {
    type: 'gradient',
    message: "Gradient data can't be imported. You will need to fill it manually.",
    colorData: buildGradientKeyframes(layerData.g),
  };
}

export default buildGradientAlert;
