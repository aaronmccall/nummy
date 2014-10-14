/*jshint unused: true */
// arithmetic methods
var utils = require('./utils');

function createRoundingFunction(fn) {
  return function (n, precision) {
    return precision ? utils.withPrecision(this.number, precision, fn) : fn(this.number);
  };
}

var methods = {
    // add num to this.number
    add: function (n, num) {
        return n + Number(num);
    },
    // n rounded up to the nearest integer or precision, if specified
    ceil: createRoundingFunction(Math.ceil),
    // divide num by n
    divide: function (n, num) {
        return num / n;
    },
    // divide n by num
    divideBy: function (n, num) {
        return n / num;
    },
    // n rounded down to the nearest integer or precision, if specified
    floor: createRoundingFunction(Math.floor),
    // logarithm of n with base <base>, or natural logarithm if base not defined
    log: function(n, base) {
        return Math.log(n) / (base ? Math.log(base) : 1);
    },
    // remainder of dividing n by num
    modulo: function (n, num) {
        return +n % +num;
    },
    // remainder of dividing num by n
    moduloOf: function (n, num) {
        return num % n;
    },
    // multiply n by num
    multiply: function (n, num) {
        return n * num;
    },
    // product of n and all arguments: nummy(1).product(2, 3, 4) === 24
    product: function () {
        return this.number * utils.slice(arguments).reduce(function (prev, current) {
            return Number(prev) * Number(current);
        });
    },
    // n reounded to the nearest integer or precision, if specified
    round: createRoundingFunction(Math.round),
    // subtract num from n
    subtract: function (n, num) {
        return n - num;
    },
    // subtract n from num
    subtractFrom: function (n, num) {
        return num - n;
    },
    // sum of n and all arguments: nummy(1).sum(2, 3, 4) === 10
    sum: function () {
        return this.number + [].slice.call(arguments).reduce(function (prev, current, i) {
            if (i === 1) {
                prev = +(prev);
            }
            current = +(current);
            return prev + current;
        });
    }
};

utils.each(methods, function (method, name) {
    var methodLength = method.length;
    exports[name] = function () {
        var result;
        var argLength = arguments.length;
        if (methodLength === 0) {
            result = method.apply(this, arguments);
        } else {
            var first = argLength >= methodLength ? arguments[0] : this.number;
            var second = argLength >= methodLength ? arguments[1] : arguments[0];
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