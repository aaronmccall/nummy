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
var abbreviateNumber = require('./abbreviateNumber');

module.exports = function(n, precision) {
    return abbreviateNumber.call(this, n, {
        roundTo: precision,
        str: 'kmbt',
        mid: 0,
        limit: 4
    });
};