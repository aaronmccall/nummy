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
var abbreviateNumber = require('./abbreviateNumber');

module.exports = function(n, precision, limit) {
    return abbreviateNumber.call(this, n, {
        roundTo: precision,
        str: 'kMGTPE',
        mid: 0,
        limit: _.isUndefined(limit) ? 4 : limit,
        bytes: true
    }) + 'B';
};