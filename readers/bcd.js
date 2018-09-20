'use strict';

module.exports = function readBCD (buffer, offset, length) {
    const nbOfDigits = length % 8 === 4 ? length / 8 + 1 : length / 8; 
    let bcdBuffer = buffer.slice(offset, offset + nbOfDigits);
    return bcd2string(bcdBuffer);
}

// No used but maybe need to switch
function bcd2number(bcd) 
{
    var n = 0;
    var m = 1;
    for(var i = 0; i<bcd.length; i+=1) {
        n += (bcd[bcd.length-1-i] & 0x0F) * m;
        n += ((bcd[bcd.length-1-i]>>4) & 0x0F) * m * 10;
        m *= 100;
    }
    return n;
}

function bcd2string(bcd) 
{
    var n = '';
    for(var i = 0; i<bcd.length; i+=1) {
        const secondDigit = (bcd[i] & 0x0F);
        n += ((bcd[i]>>4) & 0x0F);
        n += secondDigit;
    }
    return n;
}