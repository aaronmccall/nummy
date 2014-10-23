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
 var isMultipleOf = require('./isMultipleOf');

module.exports = function(n) {
    return !isNaN(n) && !isMultipleOf(n, 2);
};