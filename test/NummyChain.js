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

describe('NummyChain', function() {
    it('provides a fluent interface', wrapDone(function () {
        var chain = nummy.chain(5);
        var abs = chain.abs();
        expect(abs).to.equal(chain);
        var sqrt = abs.sqrt();
        expect(sqrt).to.equal(chain);
    }));
    it('provides the result of chained operations via #value()', wrapDone(function () {
        var chain = nummy.chain(-5);
        var result = chain.abs().pow(2);
        expect(result).to.equal(chain);
        expect(result.value()).to.equal(Math.pow(Math.abs(-5), 2));
    }));
    it('sets #_last to type of last operation', wrapDone(function () {
        var chain = nummy.chain(2);
        expect(chain.isOdd()._last).to.equal('boolean');
        expect(chain.abbr()._last).to.equal('string');
        expect(chain.exp()._last).to.equal('number');
    }));
    it('determines return type of #value() by value of #_last', wrapDone(function () {
        var chain = nummy.chain(2);
        expect(chain.isOdd().value()).to.be.a(chain._last);
        expect(chain.abbr().value()).to.be.a(chain._last);
        expect(chain.exp().value()).to.be.a(chain._last);
    }));
    describe('wraps Nummy methods', function () {

        it('calls and returns the wrapped method\'s result for toString/valueOf', wrapDone(function () {
            var valueOf = sinon.spy(nummy.Nummy.prototype, 'valueOf');
            var toString = sinon.spy(nummy.Nummy.prototype, 'toString');
            var chain = nummy.chain(5000);
            expect(String(chain)).to.equal("5,000");
            expect(toString.called).to.equal(true);
            expect(Number(chain) - 1000).to.equal(4000);
            expect(valueOf.called).to.equal(true);
            valueOf.restore();
            toString.restore();
        }));

        it('calls setDefaultFormat and returns itself', wrapDone(function () {
            var setDefaultFormat = sinon.spy(nummy.Nummy.prototype, 'setDefaultFormat');
            var chain = nummy.chain(5000.00);
            expect(chain.setDefaultFormat(1, '.', ',')).to.equal(chain);
            expect(setDefaultFormat.called).to.equal(true);
            expect(setDefaultFormat.returned(undefined)).to.equal(true);
            expect(String(chain)).to.equal('5.000,0');
        }));

        it('number methods call the Nummy instance method and update the instance\'s number prop', wrapDone(function () {
            var chain = nummy.chain(10);
            nummy.NummyChain._numberMethods.forEach(function (name) {
                var spy = sinon.spy(nummy.Nummy.prototype, name);
                chain[name](1);
                expect(spy.returned(chain.value())).to.equal(true);
                expect(chain.nummy.number).to.equal(chain.value());
                spy.restore();
            });
        }));

        it('boolean methods call the Nummy instance method and update the NummyChain instance\'s _value prop', wrapDone(function () {
            var chain = nummy.chain(10);
            nummy.NummyChain._booleanMethods.forEach(function (name) {
                var spy = sinon.spy(nummy.Nummy.prototype, name);
                chain[name](3);
                expect(spy.returned(chain.value())).to.equal(true);
                expect(chain._value).to.equal(chain.value());
                spy.restore();
            });
        }));

        it('string methods call the Nummy instance method and update the instance\'s string prop', wrapDone(function () {
            var chain = nummy.chain(10);
            nummy.NummyChain._stringMethods.forEach(function (name) {
                var spy = sinon.spy(nummy.Nummy.prototype, name);
                chain[name](1);
                expect(spy.returned(chain.value())).to.equal(true);
                expect(chain.nummy.string).to.equal(chain.value());
                spy.restore();
            });
        }));
    });
});