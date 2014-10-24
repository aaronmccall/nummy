var _ = require('./utils');
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

var methods = {
    abbr: require('./string/abbr'),
    base36: require('./string/base36'),
    binary: require('./string/binary'),
    bytes: require('./string/bytes'),
    chr: require('./string/chr'),
    format: require('./string/format'),
    hex: require('./string/hex'),
    metric: require('./string/metric'),
    ordinalize: require('./string/ordinalize'),
    pad: require('./string/pad')
};

_.each(methods, function (method, name) {
    var methodLength = method.length;
    exports[name] = function () {
        var argLength = arguments.length;
        var args = _.slice(arguments);
        var argsFull = argLength >= methodLength;
        if (!argsFull && !isNaN(this.number)) args.unshift(this.number);
        return method.apply(this, args);
    };
});

exports.methods = methods;

