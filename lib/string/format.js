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

module.exports = function(n, format) {
    format = _.defaults(format || {}, this.options && this.options.format, {
        thousands: ',',
        decimal: '.'
    });
    var i, str, split, integer, fraction, result = '';
    str = (
        _.isNumber(format.place) ?
        _.withPrecision(n, format.place || 0).toFixed(Math.max(format.place, 0)) :
        n.toString()
    ).replace(/^-/, '');
    split = str.split('.');
    integer = split[0];
    fraction = split[1];
    for (i = integer.length; i > 0; i -= 3) {
        if (i < integer.length) {
            result = (format.thousands) + result;
        }
        result = integer.slice(Math.max(0, i - 3), i) + result;
    }
    if (fraction) {
        result += (format.decimal) + _.repeatString('0', (format.place || 0) - fraction.length) + fraction;
    }
    return (n < 0 ? '-' : '') + result;
};