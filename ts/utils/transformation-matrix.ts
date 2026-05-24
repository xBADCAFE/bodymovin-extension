declare function createTypedArray(type: string, length: number): number[];

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Matrix {
  props: number[];
  _identity: boolean;
  _identityCalculated: boolean;
  reset(this: Matrix): Matrix;
  rotate(this: Matrix, angle: number): Matrix;
  rotateX(this: Matrix, angle: number): Matrix;
  rotateY(this: Matrix, angle: number): Matrix;
  rotateZ(this: Matrix, angle: number): Matrix;
  skew(this: Matrix, ax: number, ay: number): Matrix;
  skewFromAxis(this: Matrix, ax: number, angle: number): Matrix;
  shear(this: Matrix, sx: number, sy: number): Matrix;
  scale(this: Matrix, sx: number, sy: number, sz: number): Matrix;
  setTransform(
    this: Matrix,
    a: number, b: number, c: number, d: number,
    e: number, f: number, g: number, h: number,
    i: number, j: number, k: number, l: number,
    m: number, n: number, o: number, p: number
  ): Matrix;
  translate(this: Matrix, tx: number, ty: number, tz?: number): Matrix;
  transform(
    this: Matrix,
    a2: number, b2: number, c2: number, d2: number,
    e2: number, f2: number, g2: number, h2: number,
    i2: number, j2: number, k2: number, l2: number,
    m2: number, n2: number, o2: number, p2: number
  ): Matrix;
  applyToPoint(this: Matrix, x: number, y: number, z: number): Point3D;
  applyToX(this: Matrix, x: number, y: number, z: number): number;
  applyToY(this: Matrix, x: number, y: number, z: number): number;
  applyToZ(this: Matrix, x: number, y: number, z: number): number;
  applyToPointArray(this: Matrix, x: number, y: number, z: number): number[];
  applyToTriplePoints(this: Matrix, pt1: number[], pt2: number[], pt3: number[]): number[];
  applyToPointStringified(this: Matrix, x: number, y: number): string;
  toCSS(this: Matrix): string;
  to2dCSS(this: Matrix): string;
  clone(this: Matrix, matr: Matrix): void;
  cloneFromProps(this: Matrix, props: number[]): void;
  equals(this: Matrix, matr: Matrix): boolean;
  inversePoints(this: Matrix, pts: number[][]): number[][];
  inversePoint(this: Matrix, pt: number[]): number[];
  isIdentity(this: Matrix): boolean;
  _t: Matrix['transform'];
}

export const Matrix: { new (): Matrix } = (function () {
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _tan = Math.tan;
  var _rnd = Math.round;

  function reset(this: Matrix): Matrix {
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

  function rotate(this: Matrix, angle: number): Matrix {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  function rotateX(this: Matrix, angle: number): Matrix {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
  }

  function rotateY(this: Matrix, angle: number): Matrix {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
  }

  function rotateZ(this: Matrix, angle: number): Matrix {
    if (angle === 0) {
      return this;
    }
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  function shear(this: Matrix, sx: number, sy: number): Matrix {
    return (this._t as unknown as (...args: number[]) => Matrix).call(this, 1, sy, sx, 1, 0, 0);
  }

  function skew(this: Matrix, ax: number, ay: number): Matrix {
    return this.shear(_tan(ax), _tan(ay));
  }

  function skewFromAxis(this: Matrix, ax: number, angle: number): Matrix {
    var mCos = _cos(angle);
    var mSin = _sin(angle);
    return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
      ._t(1, 0, 0, 0, _tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
      ._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  function scale(this: Matrix, sx: number, sy: number, sz: number): Matrix {
    sz = isNaN(sz) ? 1 : sz;
    if (sx == 1 && sy == 1 && sz == 1) {
      return this;
    }
    return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
  }

  function setTransform(
    this: Matrix,
    a: number, b: number, c: number, d: number,
    e: number, f: number, g: number, h: number,
    i: number, j: number, k: number, l: number,
    m: number, n: number, o: number, p: number
  ): Matrix {
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

  function translate(this: Matrix, tx: number, ty: number, tz?: number): Matrix {
    tz = tz || 0;
    if (tx !== 0 || ty !== 0 || tz !== 0) {
      return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
    }
    return this;
  }

  function transform(
    this: Matrix,
    a2: number, b2: number, c2: number, d2: number,
    e2: number, f2: number, g2: number, h2: number,
    i2: number, j2: number, k2: number, l2: number,
    m2: number, n2: number, o2: number, p2: number
  ): Matrix {
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

  function isIdentity(this: Matrix): boolean {
    if (!this._identityCalculated) {
      this._identity = !(this.props[0] !== 1 || this.props[1] !== 0 || this.props[2] !== 0 || this.props[3] !== 0 || this.props[4] !== 0 || this.props[5] !== 1 || this.props[6] !== 0 || this.props[7] !== 0 || this.props[8] !== 0 || this.props[9] !== 0 || this.props[10] !== 1 || this.props[11] !== 0 || this.props[12] !== 0 || this.props[13] !== 0 || this.props[14] !== 0 || this.props[15] !== 1);
      this._identityCalculated = true;
    }
    return this._identity;
  }

  function equals(this: Matrix, matr: Matrix): boolean {
    var i = 0;
    while (i < 16) {
      if (matr.props[i] !== this.props[i]) {
        return false;
      }
      i += 1;
    }
    return true;
  }

  function clone(this: Matrix, matr: Matrix): void {
    var i: number;
    for (i = 0; i < 16; i += 1) {
      matr.props[i] = this.props[i];
    }
  }

  function cloneFromProps(this: Matrix, props: number[]): void {
    var i: number;
    for (i = 0; i < 16; i += 1) {
      this.props[i] = props[i];
    }
  }

  function applyToPoint(this: Matrix, x: number, y: number, z: number): Point3D {
    return {
      x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
      y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
      z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14],
    };
  }

  function applyToX(this: Matrix, x: number, y: number, z: number): number {
    return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
  }

  function applyToY(this: Matrix, x: number, y: number, z: number): number {
    return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
  }

  function applyToZ(this: Matrix, x: number, y: number, z: number): number {
    return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
  }

  function inversePoint(this: Matrix, pt: number[]): number[] {
    var determinant = this.props[0] * this.props[5] - this.props[1] * this.props[4];
    var a = this.props[5] / determinant;
    var b = -this.props[1] / determinant;
    var c = -this.props[4] / determinant;
    var d = this.props[0] / determinant;
    var e = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / determinant;
    var f = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / determinant;
    return [pt[0] * a + pt[1] * c + e, pt[0] * b + pt[1] * d + f, 0];
  }

  function inversePoints(this: Matrix, pts: number[][]): number[][] {
    var i: number;
    var len = pts.length;
    var retPts: number[][] = [];
    for (i = 0; i < len; i += 1) {
      retPts[i] = (inversePoint as (this: Matrix, pt: number[]) => number[]).call(this, pts[i]);
    }
    return retPts;
  }

  function applyToTriplePoints(this: Matrix, pt1: number[], pt2: number[], pt3: number[]): number[] {
    var arr = createTypedArray('float32', 6);
    if (this.isIdentity()) {
      arr[0] = pt1[0];
      arr[1] = pt1[1];
      arr[2] = pt2[0];
      arr[3] = pt2[1];
      arr[4] = pt3[0];
      arr[5] = pt3[1];
    } else {
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

  function applyToPointArray(this: Matrix, x: number, y: number, z: number): number[] {
    var arr: number[];
    if (this.isIdentity()) {
      arr = [x, y, z];
    } else {
      arr = [x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12], x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13], x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]];
    }
    return arr;
  }

  function applyToPointStringified(this: Matrix, x: number, y: number): string {
    if (this.isIdentity()) {
      return x + ',' + y;
    }
    var _p = this.props;
    return Math.round((x * _p[0] + y * _p[4] + _p[12]) * 100) / 100 + ',' + Math.round((x * _p[1] + y * _p[5] + _p[13]) * 100) / 100;
  }

  function toCSS(this: Matrix): string {
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

  function roundMatrixProperty(val: number): number {
    var v = 10000;
    if ((val < 0.000001 && val > 0) || (val > -0.000001 && val < 0)) {
      return _rnd(val * v) / v;
    }
    return val;
  }

  function to2dCSS(this: Matrix): string {
    var props = this.props;
    var _a = roundMatrixProperty(props[0]);
    var _b = roundMatrixProperty(props[1]);
    var _c = roundMatrixProperty(props[4]);
    var _d = roundMatrixProperty(props[5]);
    var _e = roundMatrixProperty(props[12]);
    var _f = roundMatrixProperty(props[13]);
    return 'matrix(' + _a + ',' + _b + ',' + _c + ',' + _d + ',' + _e + ',' + _f + ')';
  }

  return function (this: Matrix) {
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
  } as unknown as { new (): Matrix };
})();
