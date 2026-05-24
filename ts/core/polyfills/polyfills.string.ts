// @ts-nocheck
// eslint-disable-next-line
interface String {
  trim(): string;
  startsWith(search: string, position?: number): boolean;
  endsWith(search: string, position?: number): boolean;
  includes(search: string, start?: number): boolean;
  repeat(count: number): string;
  padStart(targetLength: number, padString?: string): string;
  padEnd(targetLength: number, padString?: string): string;
}

// Polyfill for String.prototype.trim
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, ""); // Removes leading and trailing spaces
};

// Polyfill for String.prototype.startsWith
String.prototype.startsWith = function (search: string, position?: number) {
  position = position || 0;
  return this.indexOf(search, position) === position;
};

// Polyfill for String.prototype.endsWith
String.prototype.endsWith = function (search: string, position?: number) {
  const len = this.length;
  if (typeof position !== "number" || !isFinite(position) || position > len) {
    position = len;
  }
  position -= search.length;
  const lastIndex = this.indexOf(search, position);
  return lastIndex !== -1 && lastIndex === position;
};

// Polyfill for String.prototype.includes
String.prototype.includes = function (search: string, start?: number) {
  if (typeof start !== "number") {
    start = 0;
  }
  return this.indexOf(search, start) !== -1;
};

// Fixed repeat implementation
String.prototype.repeat = function (count: number): string {
  if (count < 0) {
    throw new RangeError("repeat count must be non-negative");
  }
  if (count === Infinity) {
    throw new RangeError("repeat count must be less than infinity");
  }
  count = Math.floor(count); // Ensure the count is an integer

  if (count === 0) {
    return "";
  }

  // Convert this to string to ensure we're working with a string
  let str = String(this);
  let result = "";

  // Efficient algorithm using binary exponentiation
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

/**
 * Polyfill for String.prototype.padStart
 *
 * The padStart() method pads the current string with another string
 * until the resulting string reaches the given length.
 * The padding is applied from the start of the current string.
 *
 * @param {number} targetLength - The length of the resulting string once the current string has been padded.
 * @param {string} [padString=' '] - The string to pad the current string with. Default is space.
 * @returns {string} A String of the specified targetLength with the padString applied from the start.
 */
String.prototype.padStart = function (targetLength: number, padString?: string): string {
  // Convert this to a string
  const str = String(this);

  // Return original string if the targetLength is less than or equal to string length
  if (targetLength <= str.length) {
    return str;
  }

  // Default padString is a space
  padString = String(padString || " ");

  // Calculate padding length
  const padLength = targetLength - str.length;

  // Create padding
  if (padLength > padString.length) {
    // Use repeat to create enough padding
    padString = padString.repeat(Math.ceil(padLength / padString.length));
  }

  // Return the padded string
  return padString.slice(0, padLength) + str;
};

/**
 * Polyfill for String.prototype.padEnd
 *
 * The padEnd() method pads the current string with another string
 * until the resulting string reaches the given length.
 * The padding is applied from the end of the current string.
 *
 * @param {number} targetLength - The length of the resulting string once the current string has been padded.
 * @param {string} [padString=' '] - The string to pad the current string with. Default is space.
 * @returns {string} A String of the specified targetLength with the padString applied from the end.
 */
String.prototype.padEnd = function (targetLength: number, padString?: string): string {
  // Convert this to a string
  const str = String(this);

  // Return original string if the targetLength is less than or equal to string length
  if (targetLength <= str.length) {
    return str;
  }

  // Default padString is a space
  padString = String(padString || " ");

  // Calculate padding length
  const padLength = targetLength - str.length;

  // Create padding
  if (padLength > padString.length) {
    // Use repeat to create enough padding
    padString = padString.repeat(Math.ceil(padLength / padString.length));
  }

  // Return the padded string
  return str + padString.slice(0, padLength);
};
