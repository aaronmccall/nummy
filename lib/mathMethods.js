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
var _ = require('./utils');
var product = require('./math/product');
var sum = require('./math/sum');

function createRoundingFunction(fn) {
  return function (n, precision) {
    return precision ? _.withPrecision(this.number, precision, fn) : fn(this.number);
  };
}

var methods = {
    // add num to this.number
    add: require('./math/add'),
    // n rounded up to the nearest integer or precision, if specified
    ceil: createRoundingFunction(Math.ceil),
    // divide num by n
    divide: require('./math/divide'),
    // divide n by num
    divideBy: require('./math/divideBy'),
    // n rounded down to the nearest integer or precision, if specified
    floor: createRoundingFunction(Math.floor),
    // logarithm of n with base <base>, or natural logarithm if base not defined
    log: require('./math/log'),
    // remainder of dividing n by num
    modulo: require('./math/modulo'),
    // remainder of dividing num by n
    moduloOf: require('./math/moduloOf'),
    // multiply n by num
    multiply: require('./math/multiply'),
    // product of this.number and all arguments: nummy(1).product(2, 3, 4) === 24
    product: function () {
        var args = _.slice(arguments);
        var num = _.ifNaN(Number(this.number), 1);
        return product(args, num);
    },
    // n reounded to the nearest integer or precision, if specified
    round: createRoundingFunction(Math.round),
    // subtract num from n
    subtract: require('./math/subtract'),
    // subtract n from num
    subtractFrom: require('./math/subtractFrom'),
    // sum of this.number and all arguments: nummy(1).sum(2, 3, 4) === 10
    sum: function () {
        var args = _.slice(arguments);
        var num = _.ifNaN(Number(this.number), 0);
        return sum(args, num);
    }
};

_.each(methods, function (method, name) {
    var methodLength = method.length;
    exports[name] = function () {
        var result, first, second;
        var argLength = arguments.length;
        if (methodLength === 0) {
            if (!argLength) result = method.call(this);
            if (argLength) result = method.apply(this, arguments);
        } else {
            first = argLength >= methodLength ? arguments[0] : this.number;
            if (methodLength === 2) {
                second = argLength >= methodLength ? arguments[1] : arguments[0];
            }
            result = method.call(this, first, second);
        }
        return result;
    };
});

var mathMethods = ['abs', 'sin', 'asin', 'cos', 'acos', 'atan', 'atan2', 'min', 'max', 'tan', 'exp', 'pow', 'sqrt'];
mathMethods.forEach(function (name) {
    var method = Math[name];
    var methodLength = method.length;
    exports[name] = function () {
        var argLength = arguments.length;
        if (methodLength === 1) return method.call(this, argLength ? arguments[0] : this.number);
        var first = argLength >= methodLength ? arguments[0] : this.number;
        var second = argLength >= methodLength ? arguments[1] : arguments[0];
        return method(first, second);
    };
});

exports.minus = exports.subtract;
exports.mod = exports.modulo;
exports.plus = exports.add;