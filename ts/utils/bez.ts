type EasingFunction = (x: number, t: number, b: number, c: number, d: number) => number;

interface SegmentType {
  l: number;
  p: number;
}

interface LengthData {
  addedLength: number;
  segments: SegmentType[];
}

interface PointDataType {
  partialLength: number;
  point: number[];
}

interface BezierDataType {
  segmentLength: number;
  points: PointDataType[];
}

interface KeyData {
  s: number[];
  e: number[];
  to: number[];
  ti: number[];
}

interface SegmentPointsType {
  pt1: number[];
  pt2: number[];
  pt3: number[];
  pt4: number[];
}

const easingFunctions: { [key: string]: EasingFunction } = {};
const defaultCurveSegments = 200;
const bm_abs = Math.abs;
const bm_pow = Math.pow;
const bm_sqrt = Math.sqrt;
const bm_floor = Math.floor;

function pointOnLine2D(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): boolean {
  return bm_abs(((x2 - x1) * (y3 - y1)) - ((x3 - x1) * (y2 - y1))) < 0.00001;
}

export function getEasingCurve(aa: number, bb: number, cc: number, dd: number, encodedFuncName?: string): EasingFunction {
  if (!encodedFuncName) {
    encodedFuncName = ('bez_' + aa + '_' + bb + '_' + cc + '_' + dd).replace(/\./g, 'p');
  }
  if (easingFunctions[encodedFuncName]) {
    return easingFunctions[encodedFuncName];
  }
  let A0: number, B0: number, C0: number;
  let A1: number, B1: number, C1: number;
  easingFunctions[encodedFuncName] = function (x: number, t: number, b: number, c: number, d: number): number {
    const tt = t / d;
    x = tt;
    let i = 0, z: number;
    while (++i < 20) {
      C0 = 3 * aa;
      B0 = 3 * (cc - aa) - C0;
      A0 = 1 - C0 - B0;
      z = (x * (C0 + x * (B0 + x * A0))) - tt;
      if (bm_abs(z) < 1e-3) break;
      x -= z / (C0 + x * (2 * B0 + 3 * A0 * x));
    }
    C1 = 3 * bb;
    B1 = 3 * (dd - bb) - C1;
    A1 = 1 - C1 - B1;
    const polyB = x * (C1 + x * (B1 + x * A1));
    return c * polyB + b;
  };
  return easingFunctions[encodedFuncName];
}

export const getBezierLength = (function () {
  const storedBezierCurves: { [key: string]: LengthData } = {};

  function Segment(this: SegmentType, l: number, p: number): void {
    this.l = l;
    this.p = p;
  }

  return function (pt1: number[], pt2: number[], pt3: number[], pt4: number[]): LengthData {
    const bezierName = (pt1.join('_') + '_' + pt2.join('_') + '_' + pt3.join('_') + '_' + pt4.join('_')).replace(/\./g, 'p');
    if (storedBezierCurves[bezierName]) {
      return storedBezierCurves[bezierName];
    }
    let curveSegments = defaultCurveSegments;
    let k: number;
    let i: number, len: number;
    let ptCoord: number, perc: number, addedLength = 0;
    let ptDistance: number;
    const point: number[] = [], lastPoint: (number | null)[] = [];
    const lengthData: LengthData = {
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
          ptDistance += bm_pow(point[i] - (lastPoint[i] as number), 2);
        }
        lastPoint[i] = point[i];
      }
      if (ptDistance) {
        ptDistance = bm_sqrt(ptDistance);
        addedLength += ptDistance;
      }
      lengthData.segments.push(new (Segment as any)(addedLength, perc));
    }
    lengthData.addedLength = addedLength;
    storedBezierCurves[bezierName] = lengthData;
    return lengthData;
  };
}());

function BezierData(this: BezierDataType, length: number): void {
  this.segmentLength = 0;
  this.points = new Array(length);
}

function PointData(this: PointDataType, partial: number, point: number[]): void {
  this.partialLength = partial;
  this.point = point;
}

export const buildBezierData = (function () {

  const storedData: { [key: string]: BezierDataType } = {};

  return function (keyData: KeyData): BezierDataType {
    const pt1 = keyData.s;
    const pt2 = keyData.e;
    const pt3 = keyData.to;
    const pt4 = keyData.ti;
    const bezierName = (pt1.join('_') + '_' + pt2.join('_') + '_' + pt3.join('_') + '_' + pt4.join('_')).replace(/\./g, 'p');
    if (storedData[bezierName]) {
      return storedData[bezierName];
    }
    let curveSegments = defaultCurveSegments;
    let k: number, i: number, len: number;
    let ptCoord: number, perc: number, addedLength = 0;
    let ptDistance: number;
    let point: number[], lastPoint: number[] | null = null;
    if ((pt1[0] != pt2[0] || pt1[1] != pt2[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt1[0] + pt3[0], pt1[1] + pt3[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt2[0] + pt4[0], pt2[1] + pt4[1])) {
      curveSegments = 2;
    }
    const bezierData: BezierDataType = new (BezierData as any)(curveSegments);
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
      bezierData.points[k] = new (PointData as any)(ptDistance, point);
      lastPoint = point;
    }
    bezierData.segmentLength = addedLength;
    storedData[bezierName] = bezierData;
    return bezierData;

  };
}());

function getDistancePerc(perc: number, bezierData: LengthData): number {
  const segments = bezierData.segments;
  const len = segments.length;
  let initPos = bm_floor((len - 1) * perc);
  const lengthPos = perc * bezierData.addedLength;
  let lPerc = 0;
  if (lengthPos == segments[initPos].l) {
    return segments[initPos].p;
  } else {
    const dir = segments[initPos].l > lengthPos ? -1 : 1;
    let flag = true;
    while (flag) {
      if (segments[initPos].l <= lengthPos && segments[initPos + 1].l > lengthPos) {
        lPerc = (lengthPos - segments[initPos].l) / (segments[initPos + 1].l - segments[initPos].l);
        flag = false;
      } else {
        initPos += dir;
      }
      if (initPos < 0 || initPos >= len - 1) {
        flag = false;
      }
    }
    return segments[initPos].p + (segments[initPos + 1].p - segments[initPos].p) * lPerc;
  }
}

function SegmentPoints(this: SegmentPointsType): void {
  this.pt1 = new Array(2);
  this.pt2 = new Array(2);
  this.pt3 = new Array(2);
  this.pt4 = new Array(2);
}

export function getNewSegment(pt1: number[], pt2: number[], pt3: number[], pt4: number[], startPerc: number, endPerc: number, bezierData: LengthData): SegmentPointsType {
  const pts: SegmentPointsType = new (SegmentPoints as any)();
  startPerc = startPerc < 0 ? 0 : startPerc;
  const t0 = getDistancePerc(startPerc, bezierData);
  endPerc = endPerc > 1 ? 1 : endPerc;
  const t1 = getDistancePerc(endPerc, bezierData);
  let i: number;
  const len = pt1.length;
  const u0 = 1 - t0;
  const u1 = 1 - t1;
  for (i = 0; i < len; i += 1) {
    pts.pt1[i] = u0 * u0 * u0 * pt1[i] + (t0 * u0 * u0 + u0 * t0 * u0 + u0 * u0 * t0) * pt3[i] + (t0 * t0 * u0 + u0 * t0 * t0 + t0 * u0 * t0) * pt4[i] + t0 * t0 * t0 * pt2[i];
    pts.pt3[i] = u0 * u0 * u1 * pt1[i] + (t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1) * pt3[i] + (t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1) * pt4[i] + t0 * t0 * t1 * pt2[i];
    pts.pt4[i] = u0 * u1 * u1 * pt1[i] + (t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1) * pt3[i] + (t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1) * pt4[i] + t0 * t1 * t1 * pt2[i];
    pts.pt2[i] = u1 * u1 * u1 * pt1[i] + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * pt3[i] + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * pt4[i] + t1 * t1 * t1 * pt2[i];
  }
  return pts;
}

export const bez = { getEasingCurve, getBezierLength, buildBezierData, getNewSegment };
