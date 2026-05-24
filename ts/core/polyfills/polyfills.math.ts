// @ts-nocheck
/**
 * Math polyfills for ExtendScript ES3/ES5 compatibility
 * Provides modern Math methods for After Effects render scripts
 */

// eslint-disable-next-line
interface Math {
  trunc(x: number): number;
  sign(x: number): number;
  log10(x: number): number;
}

/**
 * Math.trunc() polyfill
 * Returns the integer part of a number by removing any fractional digits.
 *
 * @param {number} x - A number.
 * @returns {number} The integer part of the given number.
 */
if (!Math.trunc) {
  Math.trunc = function (x: number): number {
    // Handle special cases
    if (isNaN(x)) {
      return NaN;
    }
    if (x === 0 || x === Infinity || x === -Infinity) {
      return x;
    }

    // Remove fractional part
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };
}

/**
 * Math.sign() polyfill
 * Returns the sign of a number, indicating whether the number is positive, negative, or zero.
 *
 * @param {number} x - A number.
 * @returns {number} 1 if x is positive, -1 if x is negative, 0 if x is 0, NaN if x is NaN.
 */
if (!Math.sign) {
  Math.sign = function (x: number): number {
    // Convert to number
    x = +x;

    // Handle special cases
    if (x === 0 || isNaN(x)) {
      return x;
    }

    // Return sign
    return x > 0 ? 1 : -1;
  };
}

/**
 * Math.log10() polyfill
 * Returns the base 10 logarithm of a number.
 *
 * @param {number} x - A number.
 * @returns {number} The base 10 logarithm of the given number. If the number is negative, NaN is returned.
 */
Math.log10 = function (x: number): number {
  // Math.log10(x) = Math.log(x) / Math.log(10)
  // Math.LN10 is the natural log of 10 ≈ 2.302585092994046
  return Math.log(x) / Math.LN10;
};
