var utils = require('./utils');
var arrayMethods = require('./arrayMethods');
var booleanMethods = require('./booleanMethods');
var conversionMethods = require('./conversionMethods');
var stringMethods = require('./stringMethods');
var mathMethods = require('./mathMethods');

var options;
var defaultOptions = {
    updateValue: false,
    autoValueOf: false,
    format: {
        place: undefined,
        thousands: ',',
        decimal: '.'
    }
};
/*
 * Nummy constructor
 */
function Nummy(number, opts) {
    this.options = utils.defaults(opts || {}, options);
    if (typeof number !== 'number') number = this.toNumber(number);
    this.number = number;
    this.lastType = 'number';
}

var proto = Nummy.prototype;

var methods = utils.extend({}, conversionMethods, stringMethods, mathMethods, booleanMethods, arrayMethods);

utils.each(methods, function (method, name) {
    if (name === 'methods') return;
    proto[name] = utils.resultify(method);
});

Nummy.prototype.valueOf = function () {
    return (this.options.autoValueOf) ? this[this.lastType] : this.number;
};

Nummy.prototype.toString = function(base) {
    if (typeof base === 'number') {
        return Number.prototype.toString.call(this.number, base);
    }
    if (this.lastType === 'string') {
        return this.valueOf();
    }
    return this.format();
};

Nummy.prototype.setDefaultFormat = function (format) {
    if (utils.smartTypeof(format) === 'object') {
        this.options.format = format;
        return;
    }
    this.options.format = {
        place: arguments[0],
        thousands: arguments[1],
        decimal: arguments[2]
    };
};

Nummy.prototype._handleResult = function(result) {
    if (this.options.updateValue) {
        var type = this.lastType = utils.smartTypeof(result);
        this[type] = result;
    }
};

exports.init = function (opts) {
    options = utils.extend({}, defaultOptions, opts);
    return Nummy;
};

exports.Nummy = Nummy;