export function countSetBitsInInteger(num = 254) {
    var count = 0;
    //var indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var table = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4]; // 4 bit sets can hold numbers 0-15, so we count set bits for each one and put in lookup table...
    for(;num;num>>=4) {
        count = count + table[num & 0xF]  // 0xF = 1111 (4 right bits set)
    }
    return {
		description: "count the number of ones in a binary number",
		value: count
	};
}

