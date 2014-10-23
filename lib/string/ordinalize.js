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

module.exports = function(n) {
    var num = Math.abs(n);
    var last = parseInt(num.toString().slice(-2), 10);
    return n + getOrdinalizedSuffix(last);
};