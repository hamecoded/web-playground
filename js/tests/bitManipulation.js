export function countSetBitsInInteger(num = 254) {
    console.log("your input number is " + num + " and it's binary equivalent is " + dec2bin(num).value);
    var count = 0;
    //var indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    // a lookup table for the 4 bit sets, which can hold numbers 0-15, so the table holds the counted set bits for each one and put in lookup table...
    var table = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4]; 
    // https://developer.mozilla.org/he/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
    // shift 4 right-most bits so that they are discarded
    for(;num;num>>=4) {
        // perform an AND operation on the 4 right-most bits before the next iteration of the for discards them
        // num & 0xF determines the number behing the 4 right-most bits and looks them up in our predefined lookup table
        count += table[num & 0xF]  // 0xF = 1111 (4 right bits set)
    }
    return {
		description: "count the number of ones in a binary number",
		value: count
	};
}

// https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
export function dec2bin(dec){
    dec = dec || Number.MAX_SAFE_INTEGER; // https://developer.mozilla.org/he/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
    console.log('decimal input is: ' + numberWithCommas(dec) + ' with decimal length of ' + dec.toString().length + ' and has binary length of ' + (dec >>> 0).toString(2).length );
    return {
		description: "decimal to binary",
        value: (dec >>> 0).toString(2),
        code: `(dec >>> 0).toString(2)`,
        type: 'string',
        link: 'https://www.youtube.com/watch?v=8afbTaA-gOQ'

	};
}


export function bin2dec (bin = '11111111111111111111111111111111111111111111111111111') {
    // https://stackoverflow.com/questions/307179/what-is-javascripts-highest-integer-value-that-a-number-can-go-to-without-losin
    console.log('binary input is: ' + bin + ' of length ' + bin.length);
    return {
        description: "binary to decimal",
        code: `parseInt(bin, 2)`,
        value: numberWithCommas(parseInt(bin, 2)),
        type: 'string'

	};
}