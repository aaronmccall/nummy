var _ = require('./utils');
/*
 *  Sugar Library v1.4.1
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */

var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
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

function padNumber(num, place, base) {
    var str = abs(num).toString(base || 10);
    var sigLength = str.replace(/\.\d+/, '').length;
    if (place > sigLength) {
        str = repeatString('0', place - sigLength) + str;
    }
    return (num < 0) ? '-' + str : str;
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

var methods = {
    abbr: function(n, precision) {
        return this._abbreviateNumber(n, {
            roundTo: precision,
            str: 'kmbt',
            mid: 0,
            limit: 4
        });
    },
    _abbreviateNumber: function (n, opts) {
        if (!opts) opts = {
            str: ' ',
            mid: 0,
            limit: 0
        };
        var fixed = n.toFixed(20),
            decimalPlace = fixed.search(/\./),
            numeralPlace = fixed.search(/[1-9]/),
            significant = decimalPlace - numeralPlace,
            unit = '', i, divisor, result, atPrecision;
        if (significant > 0) {
            significant -= 1;
        }
        i = max(
            min(
                floor(significant / 3),
                opts.limit === false ? opts.str.length : opts.limit
            ),
            -opts.mid
        );
        unit = opts.str.charAt(i + opts.mid - 1);
        if (significant < -9) {
            i = -3;
            opts.roundTo = abs(significant) - 9;
            unit = opts.str ? opts.str.slice(0, 1) : '';
        }
        divisor = opts.bytes ? pow(2, 10 * i) : pow(10, i * 3);
        atPrecision = _.withPrecision(n / divisor, opts.roundTo || 0);
        result = this.format(atPrecision, null);
        return result + unit.trim();
    },
    base36: function (n, pad) {
        if (isNaN(n) || Math.abs(n) === Infinity) return String(n);
        return padNumber(n, pad || 1, 36).toUpperCase();
    },
    binary: function (n, pad) {
        if (isNaN(n) || Math.abs(n) === Infinity) return String(n);
        return padNumber(n, pad || 1, 2);
    },
    bytes: function(n, precision, limit) {
        return this._abbreviateNumber(n, {
            roundTo: precision,
            str: 'kMGTPE',
            mid: 0,
            limit: _.isUndefined(limit) ? 4 : limit,
            bytes: true
        }) + 'B';
    },
    chr: function(n) {
        return String.fromCharCode(n);
    },
    format: function (n, format) {
        format = _.defaults(format || {}, this.options.format);
        var i, str, split, integer, fraction, result = '';
        str = (
            _.isNumber(format.place) ?
            _.withPrecision(n, format.place || 0).toFixed(max(format.place, 0)) :
            n.toString()
        ).replace(/^-/, '');
        split = str.split('.');
        integer = split[0];
        fraction = split[1];
        for (i = integer.length; i > 0; i -= 3) {
            if (i < integer.length) {
                result = (format.thousands || '') + result;
            }
            result = integer.slice(max(0, i - 3), i) + result;
        }
        if (fraction) {
            result += (format.decimal || '') + repeatString('0', (format.place || 0) - fraction.length) + fraction;
        }
        return (n < 0 ? '-' : '') + result;
    },
    hex: function(n, pad) {
        return padNumber(n, pad || 1, 16).toUpperCase();
    },
    metric: function(n, precision, limit) {
        return this._abbreviateNumber(n, {
            roundTo: precision,
            str: 'nμm kMGTPE',
            mid: 4,
            limit: _.isUndefined(limit) ? 1 : limit
        });
    },
    ordinalize: function(n) {
        var num = abs(n);
        var last = parseInt(num.toString().slice(-2), 10);
        return n + getOrdinalizedSuffix(last);
    },
    pad: function(n, place) {
        return padNumber(n, place);
    }
};

_.each(methods, function (method, name) {
    var methodLength = method.length;
    exports[name] = function () {
        var argLength = arguments.length;
        var result;

        if (methodLength === 1) {
            result = method.call(this, argLength ? arguments[0] :this.number);
        }
        
        var argsFull = argLength >= methodLength;
        var first, second, third;
        if (methodLength === 2) {
            first = argsFull ? arguments[0] : this.number;
            second = arguments[argsFull ? 1 : 0];
            result = method.call(this, first, second);
        }

        if (methodLength === 3) {
            first = argsFull ? arguments[0] : this.number;
            second = arguments[argsFull ? 1 : 0];
            third = arguments[argsFull ? 2 : 1];
            result = method.call(this, first, second, third);
        }
        return result;
    };
});
