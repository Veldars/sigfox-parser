'use strict'

/**
 * float : parameters are the length in bits of the value,
 * which can be either 32 or 64 bits, and optionally the endianness for
 * multi-bytes floats
 *
 * Default is big endian
 * Decoding is done according to the IEEE 754 standard
 */
module.exports = function readHex (buffer, offset, length) {
  const nbOfDigits = length / 8; 
  let bcdBuffer = buffer.slice(offset, offset + nbOfDigits);
  return buf2hex(bcdBuffer);
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  let s = '', h = '0123456789ABCDEF';
  buffer.forEach((v) => { s += h[v >> 4] + h[v & 15]; });
  return s;
}