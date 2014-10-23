// This module contains code subject to the following
// copyright and license statement:
/*
 *  Sugar Library v1.4.1
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
var _ = require('../utils');
var format = require('./format');

var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var min = Math.min;
var max = Math.max;

module.exports = function(n, opts) {
    if (!opts) opts = {
        str: ' ',
        mid: 0,
        limit: 0
    };
    var fixed = n.toFixed(20),
        decimalPlace = fixed.search(/\./),
        numeralPlace = fixed.search(/[1-9]/),
        significant = decimalPlace - numeralPlace,
        unit = '',
        i, divisor, result, atPrecision;
    if (significant > 0) {
        significant -= 1;
    }
    i = max(
        min(
            floor(significant / 3),
            opts.limit === false ? opts.str.length : opts.limit
        ), -opts.mid
    );
    unit = opts.str.charAt(i + opts.mid - 1);
    if (significant < -9) {
        i = -3;
        opts.roundTo = abs(significant) - 9;
        unit = opts.str ? opts.str.slice(0, 1) : '';
    }
    divisor = opts.bytes ? pow(2, 10 * i) : pow(10, i * 3);
    atPrecision = _.withPrecision(n / divisor, opts.roundTo || 0);
    result = format.call(this, atPrecision, opts.format || null);
    return result + unit.trim();
};