// BEGIN original license and copyright header
/*
 *  Sugar Library v1.4.1
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
 // END original license and copyright header

 /* 
  * Copyright (c) 2014 Aaron McCall except where specified to be copied
  * from Sugar Library 1.4.1 which is Copyright (c) Andrew Plummer 2013
  */
'use strict';

var utils = require('./utils');
var booleanMethods = require('./booleanMethods');
var conversionMethods = require('./conversionMethods');
var stringMethods = require('./stringMethods');
var mathMethods = require('./mathMethods');

var options;
var defaultOptions = {
    updateValue: true,
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
    this.options = utils.extend({}, options, opts);
    if (typeof number !== 'number') number = this.toNumber(number);
    this.number = number;
    this.lastType = 'number';
}

var proto = Nummy.prototype;
utils.extend(proto, conversionMethods, stringMethods, mathMethods, booleanMethods);

utils.each(proto, function (method, name) {
    if (name === 'constructor') return;
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
    if (utils.smartTypeof(format) === 'object') this.options.format = format;
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