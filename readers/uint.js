'use strict'

/**
 * uint (unsigned integer) : parameters are the number of bits to
 * include in the value, and optionally the endianness for multi-bytes integers
 * Default is big endian
 */
module.exports = function readUInt (buffer, offset, length, endian, mod) {
  // console.log(buffer, offset, length, endian, mod);
    let useMask = false;
    const rLength = length;
    const off = 8 - length % 8;
    if (length % 8 !== 0) {
      useMask = true;
      length += off;
    }
    // console.log(useMask);
    let value = endian === 'big-endian'
    ? buffer.readUIntBE(offset, length / 8)
    : buffer.readUIntLE(offset, length / 8);
  
    if (useMask) {
      let multiplier = 1;
      const limit = off - mod;
      for (let i = 0; i < limit; i += 1) {
        multiplier *= 2;
      }
      let mask = Math.pow(2, rLength) - 1;
      mask *= multiplier;
      value &= mask;
      value /= multiplier;
    }
    return value;
}
