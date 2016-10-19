$(document).ready(function() {

    $('#convert-from').change(function() {
        var baseFrom = $('#convert-from option:selected').text();
        baseTo = $('#convert-to option:selected').text();
        if (baseFrom === baseTo) {
            alert('Can\'t convert to the same type. Please change the convert from value');
        }
        $('#field').val('');
    });

    // Converts the number on button click
    $('.btn-convert').click(function(e) {
        inputVal = $('#field').val();
        e.preventDefault();
        var baseFrom = $('#convert-from option:selected').text();
        if (inputVal == '') {
            alert('Please enter a number');
        }
        else if (baseFrom == 'Binary') {
            var decimal = binaryToDecimal(inputVal);
                hex = binaryToHexadecimal(inputVal);
                octal = binaryToOctal(inputVal);
            displayOutput(baseFrom, inputVal, decimal, hex, octal, 2, 10, 16, 8);
        }
        else if (baseFrom == 'Decimal') {
            var binary = decimalToBinary(inputVal);
                hex = decimalToHexadecimal(inputVal);
                octal = decimalToOctal(inputVal);
            displayOutput(baseFrom, inputVal, binary, hex, octal, 10, 2, 16, 8);
        }
        else if (baseFrom == 'Hexadecimal') {
            var binary = hexadecimalToBinary(inputVal);
                decimal = hexadecimalToDecimal(inputVal);
                octal = hexadecimalToOctal(inputVal);
            displayOutput('Hex', inputVal, binary, decimal, octal, 16, 2, 10, 8);
        }
        else if (baseFrom == 'Octal') {
            var binary = octalToBinary(inputVal);
                decimal = octalToDecimal(inputVal);
                hex = octalToHexadecimal(inputVal);
            displayOutput(baseFrom, inputVal, binary, decimal, hex, 8, 2, 10, 16);
        }

    });

    $('.btn-clear').click(function(e) {
        // e.preventDefault();
        $('#field').val('');
        $('#convert-from').val(0);
    });

    function binaryToDecimal(binaryValue) {
        var arr = binaryValue.split('').reverse();
        value = 0;
        for (var i = 0; i < arr.length; i++) {
            value = value + (Math.pow(2, i) * arr[i]);
        }
        return value;
    }

    function binaryToOctal(binaryValue) {
        var decimalVal = binaryToDecimal(binaryValue);
        return decimalToOctal(decimalVal);
    }

    function binaryToHexadecimal(binaryValue) {
        var decimalVal = binaryToDecimal(binaryValue);
        return decimalToHexadecimal(decimalVal);
    }

    function decimalToBinary(decimalValue) {
        // Converting decimal to binary
        var binary = '';
        remainder = 0;

        while (decimalValue > 0) {
            remainder = decimalValue % 2; // gets the remainder
            binary += remainder.toString();
            decimalValue = Math.floor(decimalValue / 2);
        }
        var appendZero = Math.floor(binary.length / 4);
        for (var i = 0; i < appendZero; i++) {
            binary = '0'.repeat((i+1)) + binary;
        }
        return binary.split('').reverse().join('');
    }

    function decimalToOctal(decimalValue) {
        var octal = '';
        remainder = 0;

        while (decimalValue > 0) {
            remainder = decimalValue % 8;
            octal += remainder.toString();
            decimalValue = Math.floor(decimalValue / 8);
        }
        return octal.split('').reverse().join('');
    }

    function decimalToHexadecimal(decimalValue) {
        var hex = '';
        remainder = 0;

        while (decimalValue > 0) {
            remainder = decimalValue % 16;
            if (remainder === 10) hex+= 'A';
            else if (remainder === 11) hex+= 'B';
            else if (remainder === 12) hex+= 'C';
            else if (remainder === 13) hex+= 'D';
            else if (remainder === 14) hex+= 'E';
            else if (remainder === 15) hex+= 'F';
            else hex += remainder.toString();
            decimalValue = Math.floor(decimalValue / 16);
        }
        return '0x' + hex.split('').reverse().join('');
    }

    function octalToDecimal(octalValue) {
        var arr = octalValue.split('').reverse();
        value = 0;
        for (var i = 0; i < arr.length; i++) {
            value = value + (Math.pow(8, i) * arr[i]);
        }
        return value;
    }

    function octalToBinary(octalValue) {
        var decimalVal = octalToDecimal(octalValue);
        // Works but needs to work on formatting: ie: 3 -> 11 instead of 011
        return decimalToBinary(decimalVal);
    }

    function octalToHexadecimal(octalValue) {
        var decimalVal = octalToDecimal(octalValue);
        return decimalToHexadecimal(decimalVal);
    }

    function hexadecimalToDecimal(hexValue) {
        if(hexValue.substring(0, 2) == '0x') hexValue = hexValue.replace('0x', '');
        var arr = hexValue.toUpperCase().split('').reverse();
        var value = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == 'A' || arr[i] == 'a') arr[i] = '10';
            else if (arr[i] == 'B') arr[i] = '11';
            else if (arr[i] == 'C') arr[i] = '12';
            else if (arr[i] == 'D') arr[i] = '13';
            else if (arr[i] == 'E') arr[i] = '14';
            else if (arr[i] == 'F') arr[i] = '15';
            value = value + (Math.pow(16, i) * arr[i]);
        }
        return value;
    }

    function hexadecimalToBinary(hexValue) {
        var decimalVal = hexadecimalToDecimal(hexValue);
        return decimalToBinary(decimalVal);
    }

    function hexadecimalToOctal(hexValue) {
        var decimalVal = hexadecimalToDecimal(hexValue);
        return decimalToOctal(decimalVal);
    }

    function changeConvertText(n, x, y, z) {
        $('#convert-from-x').html(n);
        $('#convert-to-x').html(x);
        $('#convert-to-y').html(y);
        $('#convert-to-z').html(z);
    }

    function displayOutput(convertFrom, val, xVal, yVal, zVal, valBase, xBase, yBase, zBase) {

        if (convertFrom == 'Decimal') {
            changeConvertText('Decimal:', 'Binary:', 'Hex:', 'Octal:');
        }
        else if (convertFrom == 'Binary') {
            changeConvertText('Binary:', 'Decimal:', 'Hex:', 'Octal:');
        }
        else if (convertFrom == 'Hex') {
            changeConvertText('Hex:', 'Binary:', 'Decimal:', 'Octal:');
        }
        else if (convertFrom == 'Octal') {
            changeConvertText('Octal:', 'Binary:', 'Decimal:', 'Hex:');
        }

        $('#display-from').html(val + '<sub>' + valBase.toString() + '</sub>');
        $('#display-x').html(xVal + '<sub>' + xBase.toString() + '</sub>');
        $('#display-y').html(yVal + '<sub>' + yBase.toString() + '</sub>');
        $('#display-z').html(zVal + '<sub>' + zBase.toString() + '</sub>');

        dirtyDOMCleanUp(convertFrom);
    }

    function dirtyDOMCleanUp(convertFrom) {
        var $displayFrom = $('#display-from').html();
            $convertX = $('#convert-to-x').html();
            $convertY = $('#convert-to-y').html();
            $convertZ = $('#convert-to-z').html();

            $displayX = $('#display-x').html();
            $displayY = $('#display-y').html();
            $displayZ = $('#display-z').html();

        $('#conversion').html('<span id="convert-from-x">' + convertFrom + '</span>' +
                              '<span id="display-from">' + $displayFrom + '</span>' +
                              '<br>' +
                              '<span id="convert-to-x">' + $convertX + '</span>' +
                              '<span id="display-x">' + $displayX + '</span>' +
                              '<br>' +
                              '<span id="convert-to-y">' + $convertY + '</span>' +
                              '<span id="display-y">' + $displayY + '</span>' +
                              '<br>' +
                              '<span id="convert-to-z">' + $convertZ + '</span>' +
                              '<span id="display-z">' + $displayZ + '</span>');
    }
});
