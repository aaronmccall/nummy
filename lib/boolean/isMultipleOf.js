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
var modulo = require('../math/modulo');

module.exports = function(n, num) {
    return !_.anyNaN(n, num) && modulo(n, num) === 0;
};