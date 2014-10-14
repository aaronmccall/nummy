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

    describe('number', function () {
        describe('#abs', function () {
            it('-5', wrapDone(function() {
                expect(nummy(-5).abs()).to.equal(5);
            }));
            it('5', wrapDone(function() {
                expect(nummy(5).abs()).to.equal(5);
            }));
            it('-3.324', wrapDone(function() {
                expect(nummy(-3.324).abs()).to.equal(3.324);
            }));
            it('3.324', wrapDone(function() {
                expect(nummy(3.324).abs()).to.equal(3.324);
            }));
        });

        describe('#acos', function () {
            it('0', wrapDone(function() {
                expect(nummy(0).acos()).to.equal(Math.PI / 2);
            }));
            it('1', wrapDone(function() {
                expect(nummy(1).acos()).to.equal(0);
            }));
        });

        describe('#add', function () {
            _.each([
                [1, 1],
                [2, 2],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(0, 10), nummy.random(0, 100)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                it(printf('%s %s %s', values[0], '+', values[1]), wrapDone(function () {
                    var nummied = nummy(values[0]).add(values[1]);
                    var expected = values[0] + values[1];
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#asin', function () {
            it('0', wrapDone(function() {
                expect(nummy(0).asin()).to.equal(0);
            }));
            it('1', wrapDone(function() {
                expect(nummy(1).asin()).to.equal(Math.PI / 2);
            }));
        });

        describe('#atan', function () {
            it('0', wrapDone(function() {
                expect(nummy().atan(0)).to.equal(0);
            }));
            it('45', wrapDone(function() {
                expect(nummy(45).atan()).to.equal(Math.atan(45));
            }));
        });

        describe('#atan2', function () {
            it('0, 0', wrapDone(function() {
                expect(nummy(0).atan2(0)).to.equal(0);
            }));
            it('45, 5', wrapDone(function() {
                expect(nummy().atan2(45, 5)).to.equal(Math.atan2(45, 5));
            }));
        });

        describe('#ceil', function () {
            it('5.5', wrapDone(function() {
                expect(nummy(5.5).ceil()).to.equal(6);
            }));
            it('5.14', wrapDone(function() {
                expect(nummy(5.14).ceil()).to.equal(6);
            }));
            it('5', wrapDone(function() {
                expect(nummy(5).ceil()).to.equal(5);
            }));
            it('-5.5', wrapDone(function() {
                expect(nummy(-5.5).ceil()).to.equal(-5);
            }));
            it('-5.14', wrapDone(function() {
                expect(nummy(-5.14).ceil()).to.equal(-5);
            }));
            it('-5', wrapDone(function() {
                expect(nummy(-5).ceil()).to.equal(-5);
            }));
            it('0', wrapDone(function() {
                expect(nummy(4417.1318).ceil(0)).to.equal(4418);
            }));
            it('1', wrapDone(function() {
                expect(nummy(4417.1318).ceil(1)).to.equal(4417.2);
            }));
            it('2', wrapDone(function() {
                expect(nummy(4417.1318).ceil(2)).to.equal(4417.14);
            }));
            it('3', wrapDone(function() {
                expect(nummy(4417.1318).ceil(3)).to.equal(4417.132);
            }));
            it('-1', wrapDone(function() {
                expect(nummy(4417.1318).ceil(-1)).to.equal(4420);
            }));
            it('-2', wrapDone(function() {
                expect(nummy(4417.1318).ceil(-2)).to.equal(4500);
            }));
            it('-3', wrapDone(function() {
                expect(nummy(4417.1318).ceil(-3)).to.equal(5000);
            }));
        });

        describe('#cos', function () {
            it('0', wrapDone(function() {
                expect(nummy(0).cos()).to.equal(1);
            }));
            it('PI', wrapDone(function() {
                expect(nummy(Math.PI).cos()).to.equal(-1);
            }));
            it('PI*2', wrapDone(function() {
                expect(nummy(Math.PI * 2).cos()).to.equal(1);
            }));
        });

        describe('#divide', function () {
            _.each([
                [0, nummy.random(0, 100)],
                [1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                it(printf('%s %s %s', values[0], 'dividing', values[1]), wrapDone(function () {
                    var nummied = nummy(values[0]).divide(values[1]);
                    var expected = values[1] / values[0];
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#divideBy', function () {
            _.each([
                [0, nummy.random(0, 100)],
                [1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                values.reverse();
                it(printf('%s %s %s', values[0], 'divided by', values[1]), wrapDone(function () {
                    var nummied = nummy(values[0]).divideBy(values[1]);
                    var expected = values[0] / values[1];
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#exp', function () {
            it('1', wrapDone(function() {
                expect(nummy(1).exp()).to.equal(Math.E);
            }));
            it('0', wrapDone(function() {
                expect(nummy(0).exp()).to.equal(1);
            }));
        });

        describe('#floor', function () {
            it('5.5', wrapDone(function() {
                expect(nummy(5.5).floor()).to.equal(5);
            }));
            it('5.14', wrapDone(function() {
                expect(nummy(5.14).floor()).to.equal(5);
            }));
            it('5.9', wrapDone(function() {
                expect(nummy(5.9).floor()).to.equal(5);
            }));
            it('5', wrapDone(function() {
                expect(nummy(5).floor()).to.equal(5);
            }));
            it('-5.5', wrapDone(function() {
                expect(nummy(-5.5).floor()).to.equal(-6);
            }));
            it('-5.14', wrapDone(function() {
                expect(nummy(-5.14).floor()).to.equal(-6);
            }));
            it('-5', wrapDone(function() {
                expect(nummy(-5).floor()).to.equal(-5);
            }));
            it('0', wrapDone(function() {
                expect(nummy(4417.1318).floor(0)).to.equal(4417);
            }));
            it('1', wrapDone(function() {
                expect(nummy(4417.1318).floor(1)).to.equal(4417.1);
            }));
            it('2', wrapDone(function() {
                expect(nummy(4417.1318).floor(2)).to.equal(4417.13);
            }));
            it('3', wrapDone(function() {
                expect(nummy(4417.1318).floor(3)).to.equal(4417.131);
            }));
            it('-1', wrapDone(function() {
                expect(nummy(4417.1318).floor(-1)).to.equal(4410);
            }));
            it('-2', wrapDone(function() {
                expect(nummy(4417.1318).floor(-2)).to.equal(4400);
            }));
            it('-3', wrapDone(function() {
                expect(nummy(4417.1318).floor(-3)).to.equal(4000);
            }));
        });

        describe('#log', function () {
            it('64 with base 2', wrapDone(function() {
                expect(nummy(64).log(2)).to.equal(6);
            }));
            it('9 with base 3', wrapDone(function() {
                expect(nummy(9).log(3)).to.equal(2);
            }));
            it('5', wrapDone(function() {
                expect(nummy(5).log()).to.equal(1.6094379124341003);
            }));
            it('E', wrapDone(function() {
                expect(nummy(Math.E).log()).to.equal(1);
            }));
        });

        describe('#max', function () {
            _.each([
                [0, nummy.random(0, 100)],
                [1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = Math.max.apply(null, values);
                it(printf('%s %s and %s is %s', 'maximum of', values[0], values[1], expected), wrapDone(function () {
                    var nummied = nummy(values[0]).max(values[1]);
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#min', function () {
            _.each([
                [0, nummy.random(0, 100)],
                [1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = Math.min.apply(null, values);
                it(printf('%s %s and %s is %s', 'minimum of', values[0], values[1], expected), wrapDone(function () {
                    var nummied = nummy(values[0]).min(values[1]);
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#modulo', function () {
            _.each([
                [0, nummy.random(0, 100)],
                [1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = values[0] % values[1];
                it(printf('%s %s %s is %s', values[0], '%', values[1], expected), wrapDone(function () {
                    var nummied = nummy(values[0]).modulo(values[1]);
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#moduloOf', function () {
            _.each([
                [0, nummy.random(0, 100)],
                [1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = values[1] % values[0];
                it(printf('%s %s %s is %s', values[0], 'modulo of', values[1], expected), wrapDone(function () {
                    var nummied = nummy(values[0]).moduloOf(values[1]);
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#multiply', function () {
            _.each([
                [0, nummy.random(0, 100)],
                [1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = values[1] * values[0];
                it(printf('%s %s %s is %s', values[0], '*', values[1], expected), wrapDone(function () {
                    var nummied = nummy(values[0]).multiply(values[1]);
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#pow', function () {
            it('3 ^ 2', wrapDone(function() {
                expect(nummy(3).pow(2)).to.equal(9);
            }));
            it('3 ^ 1', wrapDone(function() {
                expect(nummy(3).pow(1)).to.equal(3);
            }));
            it('12 ^ 2', wrapDone(function() {
                expect(nummy(12).pow(2)).to.equal(144);
            }));
            it('3 ^ 3', wrapDone(function() {
                expect(nummy(3).pow(3)).to.equal(27);
            }));
            it('zero is allowed', wrapDone(function() {
                expect(nummy(3).pow(0)).to.equal(1);
            }));
            it('defaults to no number', wrapDone(function() {
                expect(isNaN(nummy(3).pow())).to.equal(true);
            }));
        });

        describe('#product', function () {
            _.each([
                "foobar".split("").map(nummy.random.bind(null, 1, 100)),
                "foobar".split("").map(nummy.random.bind(null, 0, 10)),
                [1, 1, 1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = values.reduce(function (prev, curr) {
                    return prev * curr;
                });
                it(printf('of %j is %s', values.map(String), expected), wrapDone(function () {
                    var myNummy = nummy(1);
                    var nummied = myNummy.product.apply(myNummy, values);
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#round', function () {
            it('3', wrapDone(function() {
                expect(nummy(3).round()).to.equal(3);
            }));
            it('3.241', wrapDone(function() {
                expect(nummy(3.241).round()).to.equal(3);
            }));
            it('3.752', wrapDone(function() {
                expect(nummy(3.752).round()).to.equal(4);
            }));
            it('-3.241', wrapDone(function() {
                expect(nummy(-3.241).round()).to.equal(-3);
            }));
            it('-3.752', wrapDone(function() {
                expect(nummy(-3.752).round()).to.equal(-4);
            }));
            it('3.241 to 1 place', wrapDone(function() {
                expect(nummy(3.241).round(1)).to.equal(3.2);
            }));

            it('3.752 to 1 place', wrapDone(function() {
                expect(nummy(3.752).round(1)).to.equal(3.8);
            }));
            it('3.241 to 2 places', wrapDone(function() {
                expect(nummy(3.241).round(2)).to.equal(3.24);
            }));
            it('3.752 to 2 places', wrapDone(function() {
                expect(nummy(3.752).round(2)).to.equal(3.75);
            }));

            it('322855.241 to -2 places', wrapDone(function() {
                expect(nummy(322855.241).round(-2)).to.equal(322900);
            }));
            it('322855.241 to -3 places', wrapDone(function() {
                expect(nummy(322855.241).round(-3)).to.equal(323000);
            }));
            it('322855.241 to -4 places', wrapDone(function() {
                expect(nummy(322855.241).round(-4)).to.equal(320000);
            }));
            it('322855.241 to -6 places', wrapDone(function() {
                expect(nummy(322855.241).round(-6)).to.equal(0);
            }));
            it('722855.241 to -6 places', wrapDone(function() {
                expect(nummy(722855.241).round(-6)).to.equal(1000000);
            }));
            it('722855.241 to -8 places', wrapDone(function() {
                expect(nummy(722855.241).round(-8)).to.equal(0);
            }));
        });

        describe('#sin', function () {
            it('1', wrapDone(function() {
                expect(nummy(1).sin()).to.equal(0.8414709848078965);
            }));
            it('0', wrapDone(function() {
                expect(nummy(0).sin()).to.equal(0);
            }));
            it('PI/2', wrapDone(function() {
                expect(nummy(Math.PI / 2).sin()).to.equal(1);
            }));
        });

        describe('#sqrt', function () {
            it('9', wrapDone(function() {
                expect(nummy(9).sqrt()).to.equal(3);
            }));
            it('1024', wrapDone(function() {
                expect(nummy(1024).sqrt()).to.equal(32);
            }));
        });

        describe('#subtract', function () {
            _.each([
                [1, 1],
                [2, 2],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(0, 10), nummy.random(0, 100)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = values[0] - values[1];
                it(printf('%s %s %s is %s', values[0], '-', values[1], expected), wrapDone(function () {
                    var nummied = nummy().subtract(values[0], values[1]);
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#subtractFrom', function () {
            _.each([
                [1, 1],
                [2, 2],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(0, 10), nummy.random(0, 100)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = values[1] - values[0];
                it(printf('%s %s %s is %s', values[0], 'subtracted from', values[1], expected), wrapDone(function () {
                    var nummied = nummy(values[0]).subtractFrom(values[1]);
                    if (_.anyNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected);
                }));
            });
        });

        describe('#sum', function () {
            _.each([
                "foobar".split("").map(nummy.random.bind(null, 1, 100)),
                "foobar".split("").map(nummy.random.bind(null, 0, 10)),
                [1, 1, 1, 1],
                [13, 92],
                [Math.pow(2, 8), Math.pow(3, 3)],
                [nummy.random(20, 100), nummy.random(0, 10)],
                [nummy.random(0, 100), Infinity],
                [NaN, nummy.random(0, 100)]
            ], function (values) {
                var expected = values.reduce(function (prev, curr) {
                    return prev + curr;
                });
                it(printf('of %j is %s', values.map(String), expected), wrapDone(function () {
                    var myNummy = nummy(0);
                    var nummied = myNummy.sum.apply(myNummy, values);
                    if (_.allNaN(nummied, expected)) {
                        nummied = isNaN(nummied);
                        expected = isNaN(expected);
                    }
                    expect(nummied).to.equal(expected, 'nummied: ' + nummied);
                }));
            });
        });

        describe('#tan', function () {
            it('0', wrapDone(function() {
                expect(nummy(0).tan()).to.equal(0);
            }));
            it('45', wrapDone(function() {
                expect(nummy(45).tan()).to.equal(1.6197751905438615);
            }));
            it('90', wrapDone(function() {
                expect(nummy(90).tan()).to.equal(-1.995200412208242);
            }));
        });
    });
};