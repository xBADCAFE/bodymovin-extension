var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function decodeBase64ToBinaryString(input: string): string {
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
