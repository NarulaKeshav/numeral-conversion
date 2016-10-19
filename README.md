# Numeral Conversion
Numeral Conversion is a calculator that converts numerical systems with base `x` to decimal, binary, hexadecimal, and/or octal numerical systems.

____________________________________________________________________________

### Screenshot and Link
Link [to Numeral Conversion](http://narulakeshav.com/numeral-conversion/)
![Screenshot](http://i.imgur.com/sohsIPG.jpg)

____________________________________________________________________________

### My Approach
My approach here was to turn everything into decimal system and then call `decimalToBinary(val)` or `decimalToHex(val)` or `decimalToOctal(val)` to convert it into the desired system.

### Binary to Decimal
To convert `Base 2` to `Base 10`, you multiply by the binary digit with `2^{ith index}` and add them all together. Since the first index in the array is to the left, we're going to reverse the array to make it all happen. Here's the snippet:
```
// Converts binary system to decimal system
function binaryToDecimal(binaryVal) { // binaryVal = '101010110101'
    var arr = binaryVal.split('').reverse(); // arr: [1,0,1,0,1,1,0,1,0,1,0,1]
        value = 0; // Stores the decimal value in this
    for (var i = 0; i < arr.length; i++) { // Iteration
        value = value + (Math.pow(2, i) * arr[i]); // i = 0; value = 0 + (2^(0) + 1)
    }
    return value; // Returns the value in decimal system
}
```

### From Decimal to Binary, Hex, and Octal
Then once I get everything in decimal system, call the appropriate method to convert the system to the desired system. Here's the snippet of how I did it:
Decimal to Binary
```
// Converts decimal (base 10) to binary (base 2)
function decimalToBinary(decimalVal) {
    var binary = '';
        remainder = 0;
    while (decimalValue > 0) { // As long as the divident (decimalVal) > 0, keep going
        remainder = decimalValue % 2; // gets the remainder (either 1 or 0)
        binary += remainder.toString(); // concatenate the remainder to binary variable
        decimalValue = Math.floor(decimalVal / 2); // divide by 2 and update divident
    }
    // Go bottom up to return the conversion, put into array, reverse, and join into string
    return binary.split('').reverse().join('');
}
```
Decimal to Octal
```
// Converts decimal (base 10) to octal (base 8)
function decimalToOctal(decimalVal) {
    var octal = '';
        remainder = 0;
    while (decimalValue > 0) { // As long as the divident (decimalVal) > 0, keep going
        remainder = decimalValue % 8; // gets the remainder (between 0-7)
        octal += remainder.toString(); // concatenate the remainder to octal variable
        decimalValue = Math.floor(decimalVal / 8); // divide by 8 and update divident
    }
    // Go bottom up to return the conversion, put into array, reverse, and join into string
    return octal.split('').reverse().join('');
}
```
Decimal to Hexadecimal
```
// Converts decimal (base 10) to hex (base 16)
function decimalToHex(decimalVal) {
    var hex = '';
        remainder = 0;
    while (decimalValue > 0) { // As long as the divident (decimalVal) > 0, keep going
        remainder = decimalValue % 16; // gets the remainder (between 0-9 and A-F)
        if (remainder === 10) hex+= 'A';
        else if (remainder === 11) hex+= 'B';
        else if (remainder === 12) hex+= 'C';
        else if (remainder === 13) hex+= 'D';
        else if (remainder === 14) hex+= 'E';
        else if (remainder === 15) hex+= 'F';
        else hex += remainder.toString();
        hex += remainder.toString(); // concatenate the remainder to octal variable
        decimalValue = Math.floor(decimalVal / 16); // divide by 16 and update divident
    }
    // Go bottom up to return the conversion, put into array, reverse, and join into string
    return '0x' + hex.split('').reverse().join('');
}
```