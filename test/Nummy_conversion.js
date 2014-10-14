var printf = require('util').format;
var _ = require('../lib/utils');

function wrapDone(fn) {
    return function(done) {
        fn();
        done();
    };
}

module.exports = function (nummy, lab, expect) {
    var describe = lab.experiment;
    var it = lab.test;
    var afterEach = lab.afterEach;
    var beforeEach = lab.beforeEach;

    describe('conversion', function () {
        describe('#toInteger', function () {
            _.each([
                [0, "0"],
                [1, 1.23],
                [-1, -1.5],
                [1000000, "1e6"],
                [NaN, null],
                [NaN, undefined]
            ], function (test) {

                var num = test[1];
                var expected = test[0];
                it(printf('%j becomes %d', num, expected), wrapDone(function () {
                    var nummied = nummy(num).toInteger();
                    if (isNaN(expected)) {
                        expected = isNaN(expected);
                        nummied = isNaN(nummied);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#toInt32', function () {
            _.each([
                [0, "0"],
                [1, 1.23],
                [-1, -1.5],
                [1000000, "1e6"],
                [0, null],
                [0, undefined]
            ], function (test) {

                var num = test[1];
                var expected = test[0];
                it(printf('%j becomes %d', num, expected), wrapDone(function () {
                    var nummied = nummy(num).toInt32();
                    if (isNaN(expected)) {
                        expected = isNaN(expected);
                        nummied = isNaN(nummied);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#toNumber', function () {
            it('4 is 4', wrapDone(function() {
                expect(nummy(4).toNumber()).to.equal(4);
            }));
            it('10000 is 10000', wrapDone(function() {
                expect(nummy(10000).toNumber()).to.equal(10000);
            }));
            it('5.2345 is 5.2345', wrapDone(function() {
                expect(nummy(5.2345).toNumber()).to.equal(5.2345);
            }));
        });

        describe('#toUInt32', function () {
            _.each([
                [0, "0"],
                [1, 1.23],
                [Math.pow(2, 32)-1, -1.5],
                [1000000, "1e6"],
                [0, null],
                [0, undefined],
                [0, -Infinity]
            ], function (test) {

                var num = test[1];
                var expected = test[0];
                it(printf('%j string(%s) becomes %d', num, num, expected), wrapDone(function () {
                    var nummied = nummy(num).toUInt32();
                    if (isNaN(expected)) {
                        expected = isNaN(expected);
                        nummied = isNaN(nummied);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });
    });
};