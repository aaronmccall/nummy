// BEGIN original license and copyright header
/*
 *  Sugar Library v1.4.1
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
 // END original license and copyright header

 /* 
  *  All code herein except the Nummy constructor and modifications necessary
  *  to apply the methods to Nummys stored number--i.e. this => this.number--
  *  are copyright Andrew Plummer per the original license and copyright header above.
  *  The Nummy constructor and method modifications are Copyright (c) 2014 Aaron McCall
  */
'use strict';

// Utility functions and references
var abs = Math.abs;
var pow = Math.pow;
var ceil = Math.ceil;
var floor = Math.floor;
var round = Math.round;
var min = Math.min;
var max = Math.max;

function getOrdinalizedSuffix(num) {
    if (num >= 11 && num <= 13) {
        return 'th';
    } else {
        switch (num % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }
}

function isUndefined(o) {
    return typeof o === 'undefined';
}

function isNumber(o) {
    return typeof o === 'number';
}

function padNumber(num, place, sign, base) {
    var str = abs(num).toString(base || 10);
    str = repeatString('0', place - str.replace(/\.\d+/, '').length) + str;
    if (sign || num < 0) {
        str = (num < 0 ? '-' : '+') + str;
    }
    return str;
}

function repeatString(str, num) {
    var result = '';
    str = str.toString();
    while (num > 0) {
        if (num & 1) {
            result += str;
        }
        if (num >>= 1) {
            str += str;
        }
    }
    return result;
}

function withPrecision(val, precision, fn) {
    var multiplier = pow(10, abs(precision || 0));
    fn = fn || round;
    if (precision < 0) multiplier = 1 / multiplier;
    return fn(val * multiplier) / multiplier;
}

function format(num, place, thousands, decimal) {
    var i, str, split, integer, fraction, result = '';
    if (isUndefined(thousands)) {
        thousands = ',';
    }
    if (isUndefined(decimal)) {
        decimal = '.';
    }
    str = (
        isNumber(place) ?
        withPrecision(num, place || 0).toFixed(max(place, 0)) :
        num.toString()
    ).replace(/^-/, '');
    split = str.split('.');
    integer = split[0];
    fraction = split[1];
    for (i = integer.length; i > 0; i -= 3) {
        if (i < integer.length) {
            result = thousands + result;
        }
        result = integer.slice(max(0, i - 3), i) + result;
    }
    if (fraction) {
        result += decimal + repeatString('0', (place || 0) - fraction.length) + fraction;
    }
    return (num < 0 ? '-' : '') + result;
}

/*
 * Nummy constructor
 */
function Nummy(number) {
    this.number = number;
    if (typeof this.number !== 'number') {
        this.number = this.toNumber();
    }
}


/***
 * @package Number
 * @dependency core
 * @description Number formatting, rounding (with precision), and ranges. Aliases to Math methods.
 *
 ***/
Nummy.prototype.abbreviateNumber = function (roundTo, str, mid, limit, bytes) {
    var fixed = this.number.toFixed(20),
        decimalPlace = fixed.search(/\./),
        numeralPlace = fixed.search(/[1-9]/),
        significant = decimalPlace - numeralPlace,
        unit, i, divisor, formatArgs;
    if (significant > 0) {
        significant -= 1;
    }
    i = max(min(floor(significant / 3), limit === false ? str.length : limit), -mid);
    unit = str.charAt(i + mid - 1);
    if (significant < -9) {
        i = -3;
        roundTo = abs(significant) - 9;
        unit = str.slice(0, 1);
    }
    divisor = bytes ? pow(2, 10 * i) : pow(10, i * 3);
    formatArgs = this._format || [];
    formatArgs.unshift(withPrecision(this.number / divisor, roundTo || 0));
    return format.apply(null, formatArgs) + unit.trim();
};

Nummy.prototype.valueOf = function () {
    return this.number;
};

Nummy.prototype.toString = function(base) {
    if (typeof base === 'number') return Number.prototype.toString.call(this.number, base);
    if (this.string) return this.string;
    return this.format();
};

Nummy.prototype.setDefaultFormat = function () {
    this._format = [].slice.call(arguments);
};

/***
 * @method log(<base> = Math.E)
 * @returns Number
 * @short Returns the logarithm of the number with base <base>, or natural logarithm of the number if <base> is undefined.
 * @example
 *
 *   nummy(64).log(2) -> 6
 *   nummy(9).log(3)  -> 2
 *   nummy(5).log()   -> 1.6094379124341003
 *
 ***/

Nummy.prototype.log = function(base) {
    return Math.log(this.number) / (base ? Math.log(base) : 1);
};

/***
 * @method abbr([precision] = 0)
 * @returns String
 * @short Returns an abbreviated form of the number.
 * @extra [precision] will round to the given precision.
 * @example
 *
 *   nummy(1000).abbr()    -> "1k"
 *   nummy(1000000).abbr() -> "1m"
 *   nummy(1280).abbr(1)   -> "1.3k"
 *
 ***/
Nummy.prototype.abbr = function(precision) {
    return this.abbreviateNumber(precision, 'kmbt', 0, 4);
};

/***
 * @method metric([precision] = 0, [limit] = 1)
 * @returns String
 * @short Returns the number as a string in metric notation.
 * @extra [precision] will round to the given precision. Both very large numbers and very small numbers are supported. [limit] is the upper limit for the units. The default is %1%, which is "kilo". If [limit] is %false%, the upper limit will be "exa". The lower limit is "nano", and cannot be changed.
 * @example
 *
 *   nummy(1000).metric()            -> "1k"
 *   nummy(1000000).metric()         -> "1,000k"
 *   nummy(1000000).metric(0, false) -> "1M"
 *   nummy(1249).metric(2) + 'g'     -> "1.25kg"
 *   nummy(0.025).metric() + 'm'     -> "25mm"
 *
 ***/
Nummy.prototype.metric = function(precision, limit) {
    return this.abbreviateNumber(precision, 'nμm kMGTPE', 4, isUndefined(limit) ? 1 : limit);
};

/***
 * @method bytes([precision] = 0, [limit] = 4)
 * @returns String
 * @short Returns an abbreviated form of the number, considered to be "Bytes".
 * @extra [precision] will round to the given precision. [limit] is the upper limit for the units. The default is %4%, which is "terabytes" (TB). If [limit] is %false%, the upper limit will be "exa".
 * @example
 *
 *   nummy(1000).bytes()                 -> "1kB"
 *   nummy(1000).bytes(2)                -> "0.98kB"
 *   nummy(nummy(10).pow(20)).bytes()         -> "90,949,470TB"
 *   nummy(nummy(10).pow(20)).bytes(0, false) -> "87EB"
 *
 ***/
Nummy.prototype.bytes = function(precision, limit) {
    return this.abbreviateNumber(precision, 'kMGTPE', 0, isUndefined(limit) ? 4 : limit, true) + 'B';
};

/***
 * @method isInteger()
 * @returns Boolean
 * @short Returns true if the number has no trailing decimal.
 * @example
 *
 *   nummy(420).isInteger() -> true
 *   nummy(4.5).isInteger() -> false
 *
 ***/
Nummy.prototype.isInteger = function() {
    return this.number % 1 === 0;
};

/***
 * @method isOdd()
 * @returns Boolean
 * @short Returns true if the number is odd.
 * @example
 *
 *   nummy(3).isOdd()  -> true
 *   nummy(18).isOdd() -> false
 *
 ***/
Nummy.prototype.isOdd = function() {
    return !isNaN(this.number) && !this.isMultipleOf(2);
};

/***
 * @method isEven()
 * @returns Boolean
 * @short Returns true if the number is even.
 * @example
 *
 *   nummy(6).isEven()  -> true
 *   nummy(17).isEven() -> false
 *
 ***/
Nummy.prototype.isEven = function() {
    return !isNaN(this.number) && this.isMultipleOf(2);
};

/***
 * @method isMultipleOf(<num>)
 * @returns Boolean
 * @short Returns true if the number is a multiple of <num>.
 * @example
 *
 *   nummy(6).isMultipleOf(2)  -> true
 *   nummy(17).isMultipleOf(2) -> false
 *   nummy(32).isMultipleOf(4) -> true
 *   nummy(34).isMultipleOf(4) -> false
 *
 ***/
Nummy.prototype.isMultipleOf = function(num) {
    return this.number % num === 0;
};


/***
 * @method format([place] = 0, [thousands] = ',', [decimal] = '.')
 * @returns String
 * @short Formats the number to a readable string.
 * @extra If [place] is %undefined%, will automatically determine the place. [thousands] is the character used for the thousands separator. [decimal] is the character used for the decimal point.
 * @example
 *
 *   nummy(56782).format()           -> '56,782'
 *   nummy(56782).format(2)          -> '56,782.00'
 *   nummy(4388.43).format(2, ' ')      -> '4 388.43'
 *   nummy(4388.43).format(2, '.', ',') -> '4.388,43'
 *
 ***/
Nummy.prototype.format = function(place, thousands, decimal) {
    if (arguments.length === 0 && this._format && this._format.length) {
        place = this._format[0];
        thousands = this._format[1];
        decimal = this._format[2];
    }
    return format(this.number, place, thousands, decimal);
};

/***
 * @method hex([pad] = 1)
 * @returns String
 * @short Converts the number to hexidecimal.
 * @extra [pad] will pad the resulting string to that many places.
 * @example
 *
 *   nummy(255).hex()   -> 'ff';
 *   nummy(255).hex(4)  -> '00ff';
 *   nummy(23654).hex() -> '5c66';
 *
 ***/
Nummy.prototype.hex = function(pad) {
    return this.pad(pad || 1, false, 16);
};

/***
 * @method times(<fn>)
 * @returns Number
 * @short Calls <fn> a number of times equivalent to the number.
 * @example
 *
 *   nummy(8).times(function(i) {
 *     // This function is called 8 times.
 *   });
 *
 ***/
Nummy.prototype.times = function(fn) {
    if (fn) {
        for (var i = 0; i < this.number; i++) {
            fn.call(this, this.number, i);
        }
    }
    return this;
};

/***
 * @method chr()
 * @returns String
 * @short Returns a string at the code point of the number.
 * @example
 *
 *   nummy(65).chr() -> "A"
 *   nummy(75).chr() -> "K"
 *
 ***/
Nummy.prototype.chr = function() {
    return String.fromCharCode(this.number);
};

/***
 * @method pad(<place> = 0, [sign] = false, [base] = 10)
 * @returns String
 * @short Pads a number with "0" to <place>.
 * @extra [sign] allows you to force the sign as well (+05, etc). [base] can change the base for numeral conversion.
 * @example
 *
 *   nummy(5).pad(2)        -> '05'
 *   nummy(-5).pad(4)       -> '-0005'
 *   nummy(82).pad(3, true) -> '+082'
 *
 ***/
Nummy.prototype.pad = function(place, sign, base) {
    return padNumber(this.number, place, sign, base);
};

/***
 * @method ordinalize()
 * @returns String
 * @short Returns an ordinalized (English) string, i.e. "1st", "2nd", etc.
 * @example
 *
 *   nummy(1).ordinalize() -> '1st';
 *   nummy(2).ordinalize() -> '2nd';
 *   nummy(8).ordinalize() -> '8th';
 *
 ***/
Nummy.prototype.ordinalize = function() {
    var suffix;
    var num = abs(this.number);
    var last = parseInt(num.toString().slice(-2), 10);
    return this.number + getOrdinalizedSuffix(last);
};

/***
 * @method toNumber()
 * @returns Number
 * @short Returns a number. This is mostly for compatibility reasons.
 * @example
 *
 *   nummy(420).toNumber() -> 420
 *
 ***/
Nummy.prototype.toNumber = function() {
    return parseFloat(this.number, 10);
};

function createRoundingFunction(fn) {
  return function (precision) {
    return precision ? withPrecision(this.number, precision, fn) : fn(this.number);
  };
}

Nummy.prototype.ceil = createRoundingFunction(ceil);
Nummy.prototype.round = createRoundingFunction(round);
Nummy.prototype.floor = createRoundingFunction(floor);

var mathMethods = ['abs', 'sin', 'asin', 'cos', 'acos', 'tan', 'atan', 'exp', 'pow', 'sqrt'];

mathMethods.forEach(function (name) {
    Nummy.prototype[name] = function (a, b) {
        return Math[name](this.number, a, b);
    };
});

module.exports = Nummy;