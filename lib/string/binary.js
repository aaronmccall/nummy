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

module.exports = function(n, pad) {
    if (isNaN(n) || Math.abs(n) === Infinity) return String(n);
    return _.padNumber(n, pad || 1, 2);
};