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
    describe('boolean', function () {
        describe('#isEven', function () {
            it('0', wrapDone(function() {
                expect(nummy(0).isEven()).to.equal(true);
            }));
            it('1', wrapDone(function() {
                expect(nummy(1).isEven()).to.equal(false);
            }));
            it('2', wrapDone(function() {
                expect(nummy(2).isEven()).to.equal(true);
            }));
            it('24', wrapDone(function() {
                expect(nummy(24).isEven()).to.equal(true);
            }));
            it('200', wrapDone(function() {
                expect(nummy(200).isEven()).to.equal(true);
            }));
            it('NaN', wrapDone(function() {
                expect(nummy(NaN).isEven()).to.equal(false);
            }));
        });

        describe('#isFactorOf', function () {
            it('2 and 7 are factors of 14', wrapDone(function () {
                expect(nummy(2).isFactorOf(14)).to.equal(true);
                expect(nummy(7).isFactorOf(14)).to.equal(true);
            }));
            it('3 and 5 are factors of 15', wrapDone(function () {
                expect(nummy(2).isFactorOf(14)).to.equal(true);
                expect(nummy(7).isFactorOf(14)).to.equal(true);
            }));
            it('NaN is not a factor of any number', wrapDone(function () {
                var i = 150;
                while ((i-=10)) {
                    expect(nummy(NaN).isFactorOf(nummy.random(0, 5))).to.equal(false);
                }
            }));
            it('no numbers are factors NaN', wrapDone(function () {
                var i = 150;
                while ((i-=10)) {
                    expect(nummy(nummy.random(0, 5)).isFactorOf(NaN)).to.equal(false);
                }
            }));
            it('Infinity is not a factor of any number except 0', wrapDone(function () {
                var i = 150, rando;
                while ((i-=10)) {
                    rando = nummy.random(0, 5);
                    expect(nummy(Infinity).isFactorOf(rando)).to.equal(rando ? false : true, 'Infinity is a factor of ' + rando);
                }
            }));
            it('no number is a factor of Infinity', wrapDone(function () {
                var i = 150;
                while ((i-=10)) {
                    expect(nummy(nummy.random(0, 5)).isFactorOf(Infinity)).to.equal(false);
                }
            }));
        });

        describe('#isInteger', function () {
            it('15', wrapDone(function() {
                expect(nummy(15).isInteger()).to.equal(true);
            }));
            it('15.2', wrapDone(function() {
                expect(nummy(15.2).isInteger()).to.equal(false);
            }));
            it('15.2668', wrapDone(function() {
                expect(nummy(15.2668).isInteger()).to.equal(false);
            }));
            it('15.0', wrapDone(function() {
                expect(nummy(15.0).isInteger()).to.equal(true);
            }));
            it('NaN', wrapDone(function() {
                expect(nummy().isInteger(NaN)).to.equal(false);
            }));
        });

        describe('#isMultipleOf', function () {
            it('2 is a multiple of 2', wrapDone(function() {
                expect(nummy(2).isMultipleOf(2)).to.equal(true);
            }));
            it('6 is a multiple of 2', wrapDone(function() {
                expect(nummy(6).isMultipleOf(2)).to.equal(true);
            }));
            it('100 is a multiple of 2', wrapDone(function() {
                expect(nummy(100).isMultipleOf(2)).to.equal(true);
            }));
            it('2 is a multiple of 100', wrapDone(function() {
                expect(nummy(2).isMultipleOf(100)).to.equal(false);
            }));
            it('100 is a multiple of -2', wrapDone(function() {
                expect(nummy(100).isMultipleOf(-2)).to.equal(true);
            }));
            it('6 is a multiple of -2', wrapDone(function() {
                expect(nummy(6).isMultipleOf(-2)).to.equal(true);
            }));
            it('6 is a multiple of 3', wrapDone(function() {
                expect(nummy(6).isMultipleOf(3)).to.equal(true);
            }));
            it('7 is a multiple of 3', wrapDone(function() {
                expect(nummy(7).isMultipleOf(3)).to.equal(false);
            }));
            it('2.5 is a multiple of 1.25', wrapDone(function() {
                expect(nummy(2.5).isMultipleOf(1.25)).to.equal(true);
            }));
            it('string arguments', wrapDone(function() {
                expect(nummy(2).isMultipleOf('a')).to.equal(false);
            }));
            it('other random arguments', wrapDone(function() {
                expect(nummy(2).isMultipleOf(/af/)).to.equal(false);
            }));
            it('null', wrapDone(function() {
                expect(nummy().isMultipleOf(2, null)).to.equal(false);
            }));
            it('no argument passed', wrapDone(function() {
                expect(nummy(2).isMultipleOf()).to.equal(false);
            }));
        });

        describe('#isOdd', function () {
            it('0', wrapDone(function() {
                expect(nummy(0).isOdd()).to.equal(false);
            }));
            it('1', wrapDone(function() {
                expect(nummy(1).isOdd()).to.equal(true);
            }));
            it('2', wrapDone(function() {
                expect(nummy(2).isOdd()).to.equal(false);
            }));
            it('24', wrapDone(function() {
                expect(nummy(24).isOdd()).to.equal(false);
            }));
            it('200', wrapDone(function() {
                expect(nummy(200).isOdd()).to.equal(false);
            }));
            it('NaN', wrapDone(function() {
                expect(nummy(NaN).isOdd()).to.equal(false);
            }));
        });

    });
};