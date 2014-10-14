var Lab = require('lab');
var sinon = require('sinon');
var expect = Lab.expect;
var lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var afterEach = lab.afterEach;
var beforeEach = lab.beforeEach;

var nummy = require('../');

var booleanTests = require('./Nummy_boolean');
var conversionTests = require('./Nummy_conversion');
var numberTests = require('./Nummy_number');
var stringTests = require('./Nummy_string');
var _ = require('../lib/utils');

exports.lab = lab;

function wrapDone(fn) {
    return function(done) {
        fn();
        done();
    };
}

describe('Nummy', function() {

    describe('constructor', function () {
        var toNumber;
        beforeEach(wrapDone(function () {
            toNumber = sinon.spy(nummy.Nummy.prototype, 'toNumber');
        }));
        afterEach(wrapDone(function () {
            toNumber.restore();
        }));
        it('stores numbers directly to .number', wrapDone(function () {
            var myNummy = nummy(1);
            expect(toNumber.called).to.equal(false);
            expect(myNummy.number).to.equal(1);
        }));
        it('converts numeric strings to a number', wrapDone(function () {
            var myNummy = nummy("-2e6");
            expect(toNumber.called).to.equal(true);
            expect(myNummy.number).to.equal(-2e6);
        }));
        it('stores unconvertible values as NaN', wrapDone(function () {
            var unconvertible = [null, "", [], {}];
            unconvertible.forEach(function (val) {
                var myNummy = nummy(val);
                expect(toNumber.called).to.equal(true);
                expect(isNaN(myNummy.number)).to.equal(true);
            });
        }));
    });

    describe('#_handleResult', function () {

        it('sets #lastType to type of last operation', wrapDone(function () {
            var spy = sinon.spy(nummy.Nummy.prototype, '_handleResult');
            var results = [];
            var lastTypes = [];
            ['isOdd', 'exp', 'abbr'].forEach(function (name) {
                var $num = nummy(2000);
                results.push($num[name]());
                lastTypes.push($num.lastType);
            });
            expect(results[0]).to.equal(false);
            expect(spy.firstCall.args[0]).to.be.a('boolean');
            expect(lastTypes[0]).to.equal('boolean');
            expect(results[1]).to.equal(Math.exp(2000));
            expect(spy.secondCall.args[0]).to.be.a('number');
            expect(lastTypes[1]).to.equal('number');
            expect(results[2]).to.equal('2k');
            expect(spy.thirdCall.args[0]).to.be.a('string');
            expect(lastTypes[2]).to.equal('string');
            spy.restore();
        }));
    });

    describe('#setDefaultFormat', function () {
        it('sets format\'s default format spec', wrapDone(function () {
            var myNummy = nummy(5400);
            var oldFormat = _.extend({}, myNummy.options.format);
            myNummy.setDefaultFormat(2, '.', ',');
            expect(myNummy.options.format).to.eql({place: 2, thousands: '.', decimal: ','});
            expect(myNummy.abbr(1)).to.equal('5,40k');
            myNummy.setDefaultFormat(oldFormat);
        }));
    });

    describe('#toString', function () {
        it('returns in specified base system', wrapDone(function () {
            var myNummy = nummy(90);
            expect(myNummy.toString(36)).to.equal('2i');
            expect(myNummy.toString(16)).to.equal('5a');
        }));
        it('returns #string if lastType is string and autoValue is true', wrapDone(function () {
            var myNummy = nummy(0);
            myNummy.options.autoValueOf = true;
            myNummy.lastType = 'string';
            myNummy.string = 'zed';
            expect(myNummy.toString()).to.equal('zed');
        }));
        it('returns the same as #format if no base and #string not set', wrapDone(function () {
            var myNummy = nummy(9000);
            expect(myNummy.toString()).to.equal(myNummy.format());
        }));
    });

    booleanTests(nummy, lab, expect);

    conversionTests(nummy, lab, expect);

    numberTests(nummy, lab, expect);

    stringTests(nummy, lab, expect);
});