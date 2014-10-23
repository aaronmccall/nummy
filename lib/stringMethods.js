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

exports.methods = methods;

