export function random(len?: number): string {
  var length = len === undefined ? 10 : len;
  var sequence = 'abcdefghijklmnoqrstuvwxyz1234567890';
  var returnString = '';
  var i: number;
  for (i = 0; i < length; i += 1) {
    returnString += sequence.charAt(Math.floor(Math.random() * sequence.length));
  }
  return returnString;
}
