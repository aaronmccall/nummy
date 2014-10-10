/*jshint node:true*/

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
  *  All code herein except the Nummy constructor and modifications necessary
  *  to apply the methods to Nummys stored number--i.e. this => this.number--
  *  are copyright Andrew Plummer per the original license and copyright header above.
  *  The Nummy constructor and method modifications are Copyright (c) 2014 Aaron McCall
  */
var Nummy = require('./lib/Nummy');
var NummyChain = require('./lib/NummyChain').init(Nummy);

function isUndefined(o) {
    return typeof o === 'undefined';
}

var ceil = Math.ceil;
var floor = Math.floor;
var min = Math.min;
var max = Math.max;

// Add chaining to Nummy's prototype
Nummy.prototype.chain = function () {
    return new NummyChain(this.number);
};

var nummy = module.exports = function (number) {
    var instance = new Nummy(number);
    if (nummy.defaultFormat) {
        instance.setDefaultFormat.apply(instance, nummy.defaultFormat);
    }
    return instance;
};

nummy.Nummy = Nummy;
nummy.NummyChain = NummyChain;

// Add chain entry point to exports
nummy.chain = function (number) {
    return new NummyChain(number);
};

/***
 * @method Number.random([n1], [n2])
 * @returns Number
 * @short Returns a random integer between [n1] and [n2].
 * @extra If only 1 number is passed, the other will be 0. If none are passed, the number will be either 0 or 1.
 * @example
 *
 *   Number.random(50, 100) -> ex. 85
 *   Number.random(50)      -> ex. 27
 *   Number.random()        -> ex. 0
 *
 ***/
nummy.random = function(n1, n2) {
    var minNum, maxNum;
    if (arguments.length == 1) {
        n2 = n1;
        n1 = 0;
    }
    minNum = min(n1 || 0, isUndefined(n2) ? 1 : n2);
    maxNum = max(n1 || 0, isUndefined(n2) ? 1 : n2) + 1;
    return floor((Math.random() * (maxNum - minNum)) + minNum);
};