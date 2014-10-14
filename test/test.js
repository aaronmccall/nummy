var Lab = require('lab');
var sinon = require('sinon');
var expect = Lab.expect;
var lab = Lab.script();
var describe = lab.experiment;
var it = lab.test;
var afterEach = lab.afterEach;
var beforeEach = lab.beforeEach;

var nummy = require('../');

exports.lab = lab;

function wrapDone(fn) {
    return function(done) {
        fn();
        done();
    };
}

describe('nummy', function() {
    it('nummy() returns a Nummy instance', wrapDone(function () {
        expect(nummy(1)).to.be.an.instanceOf(nummy.Nummy);
    }));
    it('nummy().chain() returns a NummyChain instance', wrapDone(function () {
        expect(nummy(1).chain()).to.be.an.instanceOf(nummy.NummyChain);
    }));
    it('nummy.chain() returns a NummyChain instance', wrapDone(function () {
        expect(nummy.chain(1)).to.be.an.instanceOf(nummy.NummyChain);
    }));
    it('sets nummy() default format if defaultFormat is set', wrapDone(function () {
        var oldFormat = nummy(1).options.format;
        nummy.setOptions({ format: {place: 3, thousands: 'k', decimal: 'd'} });
        var $num = nummy(5000.0000);
        expect($num._format).to.eql(nummy.defaultFormat);
        expect(String($num)).to.equal('5k000d000');
        nummy.setOptions({ format: oldFormat });
    }));
    describe('.random', function() {
        it('returns 0 or 1 when called with no params', wrapDone(function() {
            var i = 0;
            while (i++ < 3) expect([0, 1].indexOf(nummy.random())).to.be.gte(-1);
        }));

        it('when called with 1 param returns number between 0 and param', wrapDone(function() {
            var i = 0;
            while (i++ < 3) {
                var rand = nummy.random(10);
                expect(rand).to.be.gte(0);
                expect(rand).to.be.lte(10);
            }
        }));

        it('always returns an integer', wrapDone(function() {
            var i = -1;
            var j = 1;
            var args = [0, 0, 10];
            while (++i <= args.length) {
                expect(nummy.random(args[i], args[j++]) % 1).to.equal(0);
            }
        }));

        it('returns a number between first and second parameters regardless of which is greater', wrapDone(function() {
            var rand = nummy.random(536224, 536280);
            expect(rand).to.be.gte(536224);
            expect(rand).to.be.lte(536280);
            rand = nummy.random(6, -5);
            expect(rand).to.be.gte(-5);
            expect(rand).to.be.lte(6);
        }));

        it('always returns 0 when both parameters are 0', wrapDone(function() {
            var i = 0;
            while (i++ < 5) expect(nummy.random(0, 0)).to.equal(0);
        }));
    });

});