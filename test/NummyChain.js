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
    it('keeps the stack from outgrowing its max size', wrapDone(function () {
        var chain = nummy.chain(1);
        chain.options.stackSize = 10;
        var shift = sinon.spy(chain._stack, 'shift');
        (1e15+"").split("").map(Number).map(chain.add.bind(chain));
        expect(shift.called).to.equal(true);
        var stack = chain.take();
        expect(stack).to.be.an('array').with.length(10);
    }));
    it('only adds to the stack if keepStack is true', wrapDone(function () {
        var chain = nummy.chain(1);
        chain.options.keepStack = false;
        (1e15+"").split("").map(Number).map(chain.add.bind(chain));
        var stack = chain.take();
        expect(stack).to.be.an('array').with.length(1).and.contain(1);
    }));

    describe('#take', function () {
        it('returns all if no length', wrapDone(function () {
            var chain = nummy.chain(1);
            (1e15+"").split("").map(Number).map(chain.add.bind(chain));
            var steps = chain.take();
            expect(steps).to.be.an('array').with.length(chain._stack.length).and.eql(chain._stack);
        }));
        it('returns the last n steps if length is given', wrapDone(function () {
            var chain = nummy.chain(1);
            (1e15+"").split("").map(Number).map(chain.add.bind(chain));
            var stack = chain.take(5);
            expect(stack).to.be.an('array').with.length(5).and.eql(chain._stack.slice(-5));
        }));
        it('returns [valueOf] if no stack', wrapDone(function () {

            var chain = nummy.chain(1);
            chain.options.keepStack = false;
            chain._stack = [];
            var stack = chain.take(5);
            expect(stack).to.be.an('array').with.length(1).and.eql([1]);
        }));
    });

    describe('#undo', function () {
        var chain;
        beforeEach(wrapDone(function () {
            chain = nummy.chain(1);
            (1e6+"").split("").map(Number).map(chain.add.bind(chain));
        }));
        it('resets the stack if called with length greater than stack size', wrapDone(function () {
            var resetStack = sinon.spy(nummy.NummyChain.prototype, 'resetStack');
            var stack = chain.undo(20);
            expect(stack).to.be.an('array').with.length(7);
            expect(String(chain)).to.equal('1');
            expect(resetStack.called).to.equal(true);
            nummy.NummyChain.prototype.resetStack.restore();
        }));
        it('undoes one step if called without arguments', wrapDone(function () {
            var stack = chain.undo();
            expect(stack).to.be.an('array').with.length(1);
            expect(+chain).to.equal(chain._stack.slice(-1).pop());
        }));
        it('undoes nothing if steps is zero', wrapDone(function () {
            var stack = chain.undo("0");
            expect(stack).to.not.exist;
            expect(+chain).to.equal(chain._stack.slice(-1).pop());
        }));
    });

    describe('wraps Nummy methods', function () {
        it('valueOf', wrapDone(function () {
            var chain = nummy.chain(5000);
            var valueOf = sinon.spy(nummy.Nummy.prototype, 'valueOf');
            var converted = Number(chain);
            expect(converted).to.equal(5000);
            expect(valueOf.called).to.equal(true);
            valueOf.restore();
        }));
        it('calls and returns toString, calling undo if lastType not string', wrapDone(function () {
            var toString = sinon.spy(nummy.Nummy.prototype, 'toString');
            var undo = sinon.spy(nummy.NummyChain.prototype, 'undo');
            var chain = nummy.chain(5000);
            expect(String(chain)).to.equal("5,000");
            expect(toString.called).to.equal(true);
            expect(undo.called).to.equal(true);
            nummy.Nummy.prototype.toString.restore();
            nummy.NummyChain.prototype.undo.restore();
        }));
        it('calls and returns toString, in new base if specified', wrapDone(function () {
            var toString = sinon.spy(nummy.Nummy.prototype, 'toString');
            var chain = nummy.chain(5000);
            expect(chain.toString(36)).to.equal(String(chain.base36(0)).toLowerCase());
            expect(toString.called).to.equal(true);
            toString.restore();
        }));

        it('calls setDefaultFormat and returns itself', wrapDone(function () {
            var setDefaultFormat = sinon.spy(nummy.Nummy.prototype, 'setDefaultFormat');
            var chain = nummy.chain(5000.00);
            var oldFormat = 
            expect(chain.setDefaultFormat(1, '.', ',')).to.equal(chain);
            expect(setDefaultFormat.called).to.equal(true);
            expect(setDefaultFormat.returned(undefined)).to.equal(true);
            expect(String(chain)).to.equal('5.000,0');
        }));

        describe('number methods call the Nummy instance method and update the its number prop', function () {
            nummy.NummyChain._numberMethods.forEach(function (name) {
                if (name === 'methods') return;
                it ('#' + name, wrapDone(function () {
                    var chain = nummy.chain(10);
                    var spy = sinon.spy(nummy.Nummy.prototype, name);
                    chain[name](2);
                    expect(spy.returned(chain.value())).to.equal(true);
                    if (isNaN(chain.nummy.number)) {
                        expect(isNaN(chain.nummy.number)).to.equal(isNaN(chain.value()));
                    } else {
                        expect(chain.nummy.number).to.equal(chain.value(), name + ' failed');
                    }
                    spy.restore();
                }));
            });
        });
        

        describe('boolean methods call the Nummy instance method and update the its boolean prop', function () {
            var chain = nummy.chain(10);
            nummy.NummyChain._booleanMethods.forEach(function (name) {
                if (name === 'methods') return;
                it('#' + name, wrapDone(function () {
                    var spy = sinon.spy(nummy.Nummy.prototype, name);
                    chain[name](3);
                    expect(spy.returned(chain.value())).to.equal(true, name + ': chain.value() ' + chain.value() + ' Nummy.valueOf() ' + chain.nummy.valueOf());
                    expect(chain.nummy.boolean).to.equal(chain.value());
                    spy.restore();
                }));
            });
        });

        describe('string methods call the Nummy instance method and update the instance\'s string prop', function () {
            nummy.NummyChain._stringMethods.forEach(function (name) {
                if (name.charAt(0) === '_' || name === 'methods') return;
                it('#' + name, wrapDone(function () {
                    var chain = nummy.chain(10);
                    var spy = sinon.spy(nummy.Nummy.prototype, name);
                    chain[name](1);
                    expect(spy.returned(chain.value())).to.equal(true, name + ': chain.value() ' + chain.value() + ' Nummy.valueOf() ' + chain.nummy.valueOf());
                    expect(chain.nummy.string).to.equal(chain.value());
                    spy.restore();
                }));
            });
        });
    });
});