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

    describe('#setDefaultFormat', function () {
        it('sets format\'s default format spec', wrapDone(function () {
            var myNummy = nummy(5400);
            myNummy.setDefaultFormat(2, '.', ',');
            expect(myNummy._format).to.eql([2, '.', ',']);
            expect(myNummy.abbr(1)).to.equal('5,40k');
        }));
    });

    describe('#toString', function () {
        it('returns in specified base system', wrapDone(function () {
            var myNummy = nummy(90);
            expect(myNummy.toString(36)).to.equal('2i');
            expect(myNummy.toString(16)).to.equal('5a');
        }));
        it('returns #string if set', wrapDone(function () {
            var myNummy = nummy(0);
            myNummy.string = 'zed';
            expect(myNummy.toString()).to.equal('zed');
        }));
        it('returns the same as #format if no base and #string not set', wrapDone(function () {
            var myNummy = nummy(9000);
            expect(myNummy.toString()).to.equal(myNummy.format());
        }));
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

    describe('#asin', function () {
        it('0', wrapDone(function() {
            expect(nummy(0).asin()).to.equal(0);
        }));
        it('1', wrapDone(function() {
            expect(nummy(1).asin()).to.equal(Math.PI / 2);
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

    describe('#atan', function () {
        it('0', wrapDone(function() {
            expect(nummy(0).atan()).to.equal(0);
        }));
        it('45', wrapDone(function() {
            expect(nummy(45).atan()).to.equal(Math.atan(45));
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

    describe('#exp', function () {
        it('1', wrapDone(function() {
            expect(nummy(1).exp()).to.equal(Math.E);
        }));
        it('0', wrapDone(function() {
            expect(nummy(0).exp()).to.equal(1);
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

    describe('#chr', function () {
        it('65', wrapDone(function() {
            expect(nummy(65).chr()).to.equal('A');
        }));
        it('24536', wrapDone(function() {
            expect(nummy(24536).chr()).to.equal('忘');
        }));
        it('20294', wrapDone(function() {
            expect(nummy(20294).chr()).to.equal('但');
        }));
    });

    describe('#multipleOf', function () {
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
            expect(nummy(2).isMultipleOf(null)).to.equal(false);
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

    describe('#ordinalize', function () {
        it('1', wrapDone(function() {
            expect(nummy(1).ordinalize()).to.equal('1st');
        }));
        it('2', wrapDone(function() {
            expect(nummy(2).ordinalize()).to.equal('2nd');
        }));
        it('3', wrapDone(function() {
            expect(nummy(3).ordinalize()).to.equal('3rd');
        }));
        it('4', wrapDone(function() {
            expect(nummy(4).ordinalize()).to.equal('4th');
        }));
        it('5', wrapDone(function() {
            expect(nummy(5).ordinalize()).to.equal('5th');
        }));
        it('6', wrapDone(function() {
            expect(nummy(6).ordinalize()).to.equal('6th');
        }));
        it('7', wrapDone(function() {
            expect(nummy(7).ordinalize()).to.equal('7th');
        }));
        it('8', wrapDone(function() {
            expect(nummy(8).ordinalize()).to.equal('8th');
        }));
        it('9', wrapDone(function() {
            expect(nummy(9).ordinalize()).to.equal('9th');
        }));
        it('10', wrapDone(function() {
            expect(nummy(10).ordinalize()).to.equal('10th');
        }));
        it('11', wrapDone(function() {
            expect(nummy(11).ordinalize()).to.equal('11th');
        }));
        it('12', wrapDone(function() {
            expect(nummy(12).ordinalize()).to.equal('12th');
        }));
        it('13', wrapDone(function() {
            expect(nummy(13).ordinalize()).to.equal('13th');
        }));
        it('14', wrapDone(function() {
            expect(nummy(14).ordinalize()).to.equal('14th');
        }));
        it('15', wrapDone(function() {
            expect(nummy(15).ordinalize()).to.equal('15th');
        }));
        it('20', wrapDone(function() {
            expect(nummy(20).ordinalize()).to.equal('20th');
        }));
        it('21', wrapDone(function() {
            expect(nummy(21).ordinalize()).to.equal('21st');
        }));
        it('22', wrapDone(function() {
            expect(nummy(22).ordinalize()).to.equal('22nd');
        }));
        it('23', wrapDone(function() {
            expect(nummy(23).ordinalize()).to.equal('23rd');
        }));
        it('24', wrapDone(function() {
            expect(nummy(24).ordinalize()).to.equal('24th');
        }));
        it('25', wrapDone(function() {
            expect(nummy(25).ordinalize()).to.equal('25th');
        }));
        it('100', wrapDone(function() {
            expect(nummy(100).ordinalize()).to.equal('100th');
        }));
        it('101', wrapDone(function() {
            expect(nummy(101).ordinalize()).to.equal('101st');
        }));
        it('102', wrapDone(function() {
            expect(nummy(102).ordinalize()).to.equal('102nd');
        }));
        it('103', wrapDone(function() {
            expect(nummy(103).ordinalize()).to.equal('103rd');
        }));
        it('104', wrapDone(function() {
            expect(nummy(104).ordinalize()).to.equal('104th');
        }));
        it('105', wrapDone(function() {
            expect(nummy(105).ordinalize()).to.equal('105th');
        }));
        it('111', wrapDone(function() {
            expect(nummy(111).ordinalize()).to.equal('111th');
        }));
        it('112', wrapDone(function() {
            expect(nummy(112).ordinalize()).to.equal('112th');
        }));
        it('113', wrapDone(function() {
            expect(nummy(113).ordinalize()).to.equal('113th');
        }));
        it('114', wrapDone(function() {
            expect(nummy(114).ordinalize()).to.equal('114th');
        }));
        it('-1', wrapDone(function() {
            expect(nummy(-1).ordinalize()).to.equal('-1st');
        }));

        // Moved from inflections tests
        it('properly converts numbers to ordinals', wrapDone(function() {
            var OrdinalNumbers = {
                "-1": "-1st",
                "-2": "-2nd",
                "-3": "-3rd",
                "-4": "-4th",
                "-5": "-5th",
                "-6": "-6th",
                "-7": "-7th",
                "-8": "-8th",
                "-9": "-9th",
                "-10": "-10th",
                "-11": "-11th",
                "-12": "-12th",
                "-13": "-13th",
                "-14": "-14th",
                "-20": "-20th",
                "-21": "-21st",
                "-22": "-22nd",
                "-23": "-23rd",
                "-24": "-24th",
                "-100": "-100th",
                "-101": "-101st",
                "-102": "-102nd",
                "-103": "-103rd",
                "-104": "-104th",
                "-110": "-110th",
                "-111": "-111th",
                "-112": "-112th",
                "-113": "-113th",
                "-1000": "-1000th",
                "-1001": "-1001st",
                "0": "0th",
                "1": "1st",
                "2": "2nd",
                "3": "3rd",
                "4": "4th",
                "5": "5th",
                "6": "6th",
                "7": "7th",
                "8": "8th",
                "9": "9th",
                "10": "10th",
                "11": "11th",
                "12": "12th",
                "13": "13th",
                "14": "14th",
                "20": "20th",
                "21": "21st",
                "22": "22nd",
                "23": "23rd",
                "24": "24th",
                "100": "100th",
                "101": "101st",
                "102": "102nd",
                "103": "103rd",
                "104": "104th",
                "110": "110th",
                "111": "111th",
                "112": "112th",
                "113": "113th",
                "1000": "1000th",
                "1001": "1001st"
            }

            // Test ordinalize
            Object.keys(OrdinalNumbers).forEach(function(str) {
                expect(nummy(parseInt(str, 10)).ordinalize()).to.equal(OrdinalNumbers[str]);
            });

        }));
    });

    describe('#format', function () {
        it('100', wrapDone(function() {
            expect(nummy(100).format()).to.equal('100');
        }));
        it('1', wrapDone(function() {
            expect(nummy(1).format()).to.equal('1');
        }));
        it('10', wrapDone(function() {
            expect(nummy(10).format()).to.equal('10');
        }));
        it('100', wrapDone(function() {
            expect(nummy(100).format()).to.equal('100');
        }));
        it('1,000', wrapDone(function() {
            expect(nummy(1000).format()).to.equal('1,000');
        }));
        it('10,000', wrapDone(function() {
            expect(nummy(10000).format()).to.equal('10,000');
        }));
        it('100,000', wrapDone(function() {
            expect(nummy(100000).format()).to.equal('100,000');
        }));
        it('1,000,000', wrapDone(function() {
            expect(nummy(1000000).format()).to.equal('1,000,000');
        }));
        it('1,000,000.01', wrapDone(function() {
            expect(nummy(1000000.01).format()).to.equal('1,000,000.01');
        }));
        it('-100', wrapDone(function() {
            expect(nummy(-100).format()).to.equal('-100');
        }));
        it('-1', wrapDone(function() {
            expect(nummy(-1).format()).to.equal('-1');
        }));
        it('-1,000', wrapDone(function() {
            expect(nummy(-1000).format()).to.equal('-1,000');
        }));
        it('-1,000,000.01', wrapDone(function() {
            expect(nummy(-1000000.01).format()).to.equal('-1,000,000.01');
        }));

        it('0.52', wrapDone(function() {
            expect(nummy(0.52).format()).to.equal('0.52');
        }));

        // These discrepancies are due to floating point variable limitations.
        it('100,046,546,510,000', wrapDone(function() {
            expect(nummy(100046546510000.022435451).format().replace(/\.\d+$/,'')).to.equal('100,046,546,510,000');

        }));
        it('-100,046,546,510,000', wrapDone(function() {
            expect(nummy(-100046546510000.022435451).format().replace(/\.\d+$/,'')).to.equal('-100,046,546,510,000');

        }));

        it('1000', wrapDone(function() {
            expect(nummy(1000).format(null, ' ')).to.equal('1 000');
        }));
        it('larger number', wrapDone(function() {
            expect(nummy(1532587).format(null, ' ')).to.equal('1 532 587');
        }));
        it(',', wrapDone(function() {
            expect(nummy(1532587.5752).format(null, ' ', ',')).to.equal('1 532 587,5752');
        }));
        it('Standard', wrapDone(function() {
            expect(nummy(9999999.99).format()).to.equal('9,999,999.99');
        }));
        it('Euro style!', wrapDone(function() {
            expect(nummy(9999999.99).format(null,'.',',')).to.equal('9.999.999,99');
        }));
        it('empty string', wrapDone(function() {
            expect(nummy(9999999.99).format(null,'')).to.equal('9999999.99');
        }));
        it('no punctuation', wrapDone(function() {
            expect(nummy(9999999.99).format(null,'','')).to.equal('999999999');
        }));

        it('to 2 places', wrapDone(function() {
            expect(nummy(1).format(2)).to.equal('1.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(10).format(2)).to.equal('10.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(100).format(2)).to.equal('100.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(1000).format(2)).to.equal('1,000.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(10000).format(2)).to.equal('10,000.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(100000).format(2)).to.equal('100,000.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(1000000).format(2)).to.equal('1,000,000.00');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(1).format(4)).to.equal('1.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(10).format(4)).to.equal('10.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(100).format(4)).to.equal('100.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(1000).format(4)).to.equal('1,000.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(10000).format(4)).to.equal('10,000.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(100000).format(4)).to.equal('100,000.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(1000000).format(4)).to.equal('1,000,000.0000');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(-1).format(2)).to.equal('-1.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(-10).format(2)).to.equal('-10.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(-100).format(2)).to.equal('-100.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(-1000).format(2)).to.equal('-1,000.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(-10000).format(2)).to.equal('-10,000.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(-100000).format(2)).to.equal('-100,000.00');
        }));
        it('to 2 places', wrapDone(function() {
            expect(nummy(-1000000).format(2)).to.equal('-1,000,000.00');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(-1).format(4)).to.equal('-1.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(-10).format(4)).to.equal('-10.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(-100).format(4)).to.equal('-100.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(-1000).format(4)).to.equal('-1,000.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(-10000).format(4)).to.equal('-10,000.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(-100000).format(4)).to.equal('-100,000.0000');
        }));
        it('to 4 places', wrapDone(function() {
            expect(nummy(-1000000).format(4)).to.equal('-1,000,000.0000');
        }));

        it('2.44', wrapDone(function() {
            expect(nummy(2.435).format(2)).to.equal('2.44');
        }));
        it('553,599.44', wrapDone(function() {
            expect(nummy(553599.435).format(2)).to.equal('553,599.44');
        }));
        it('553,599.4', wrapDone(function() {
            expect(nummy(553599.435).format(1)).to.equal('553,599.4');
        }));
        it('553,599', wrapDone(function() {
            expect(nummy(553599.435).format(0)).to.equal('553,599');
        }));
        it('553,600', wrapDone(function() {
            expect(nummy(553599.435).format(-1)).to.equal('553,600');
        }));
        it('553,600', wrapDone(function() {
            expect(nummy(553599.435).format(-2)).to.equal('553,600');
        }));
        it('553,600', wrapDone(function() {
            expect(nummy(553599.435).format(-3)).to.equal('554,000');
        }));
        it('550,000', wrapDone(function() {
            expect(nummy(553599.435).format(-4)).to.equal('550,000');
        }));
        it('600,000', wrapDone(function() {
            expect(nummy(553599.435).format(-5)).to.equal('600,000');
        }));
    });

    describe('#pad', function () {
        it('1 no padding', wrapDone(function() {
            expect(nummy(1).pad(0)).to.equal('1');
        }));
        it('1 padded to 1 place', wrapDone(function() {
            expect(nummy(1).pad(1)).to.equal('1');
        }));
        it('1 padded to 2 places', wrapDone(function() {
            expect(nummy(1).pad(2)).to.equal('01');
        }));
        it('1 padded to 3 places', wrapDone(function() {
            expect(nummy(1).pad(3)).to.equal('001');
        }));
        it('1 padded to 4 places', wrapDone(function() {
            expect(nummy(1).pad(4)).to.equal('0001');
        }));
        it('547 no padding', wrapDone(function() {
            expect(nummy(547).pad(0)).to.equal('547');
        }));
        it('547 padded to 1 place', wrapDone(function() {
            expect(nummy(547).pad(1)).to.equal('547');
        }));
        it('547 padded to 2 places', wrapDone(function() {
            expect(nummy(547).pad(2)).to.equal('547');
        }));
        it('547 padded to 3 places', wrapDone(function() {
            expect(nummy(547).pad(3)).to.equal('547');
        }));
        it('547 padded to 4 places', wrapDone(function() {
            expect(nummy(547).pad(4)).to.equal('0547');
        }));
        it('0 no padding', wrapDone(function() {
            expect(nummy(0).pad(0)).to.equal('0');
        }));
        it('0 padded to 1 place', wrapDone(function() {
            expect(nummy(0).pad(1)).to.equal('0');
        }));
        it('0 padded to 2 places', wrapDone(function() {
            expect(nummy(0).pad(2)).to.equal('00');
        }));
        it('0 padded to 3 places', wrapDone(function() {
            expect(nummy(0).pad(3)).to.equal('000');
        }));
        it('0 padded to 4 places', wrapDone(function() {
            expect(nummy(0).pad(4)).to.equal('0000');
        }));
        it('-1 padded to 1 places', wrapDone(function() {
            expect(nummy(-1).pad(1)).to.equal('-1');
        }));
        it('-1 padded to 2 places', wrapDone(function() {
            expect(nummy(-1).pad(2)).to.equal('-01');
        }));
        it('-1 padded to 3 places', wrapDone(function() {
            expect(nummy(-1).pad(3)).to.equal('-001');
        }));
        it('-1 padded to 4 places', wrapDone(function() {
            expect(nummy(-1).pad(4)).to.equal('-0001');
        }));
        it('1 padded to 1 places and sign', wrapDone(function() {
            expect(nummy(1).pad(1, true)).to.equal('+1');
        }));
        it('1 padded to 2 places and sign', wrapDone(function() {
            expect(nummy(1).pad(2, true)).to.equal('+01');
        }));
        it('1 padded to 3 places and sign', wrapDone(function() {
            expect(nummy(1).pad(3, true)).to.equal('+001');
        }));
        it('1 padded to 4 places and sign', wrapDone(function() {
            expect(nummy(1).pad(4, true)).to.equal('+0001');
        }));
        it('0 padded to 1 place and sign', wrapDone(function() {
            expect(nummy(0).pad(1, true)).to.equal('+0');
        }));
        it('does not take decimal places into account', wrapDone(function() {
            expect(nummy(547.528).pad(4)).to.equal('0547.528');
        }));

        it('handles hex', wrapDone(function() {
            expect(nummy(255).pad(4, false, 16)).to.equal('00ff');
        }));
        it('handles binary', wrapDone(function() {
            expect(nummy(2).pad(4, false, 2)).to.equal('0010');
        }));
    });

    describe('#hex', function () {
        it('0', wrapDone(function() {
            expect(nummy(0).hex()).to.equal('0');
        }));
        it('10', wrapDone(function() {
            expect(nummy(10).hex()).to.equal('a');
        }));
        it('255', wrapDone(function() {
            expect(nummy(255).hex()).to.equal('ff');
        }));
        it('0.5', wrapDone(function() {
            expect(nummy(0.5).hex()).to.equal('0.8');
        }));
        it('2.8', wrapDone(function() {
            expect(nummy(2.5).hex()).to.equal('2.8');
        }));
        it('2553423', wrapDone(function() {
            expect(nummy(2553423).hex()).to.equal('26f64f');
        }));

        it('padding 2 places | 0', wrapDone(function() {
            expect(nummy(0).hex(2)).to.equal('00');
        }));
        it('padding 2 places | 10', wrapDone(function() {
            expect(nummy(10).hex(2)).to.equal('0a');
        }));
        it('padding 2 places | 10', wrapDone(function() {
            expect(nummy(255).hex(2)).to.equal('ff');
        }));
        it('padding 2 places | 0.5', wrapDone(function() {
            expect(nummy(0.5).hex(2)).to.equal('00.8');
        }));
        it('padding 2 places | 2.8', wrapDone(function() {
            expect(nummy(2.5).hex(2)).to.equal('02.8');
        }));

        it('padding 4 places | 0', wrapDone(function() {
            expect(nummy(0).hex(4)).to.equal('0000');
        }));
        it('padding 4 places | 10', wrapDone(function() {
            expect(nummy(10).hex(4)).to.equal('000a');
        }));
        it('padding 4 places | 10', wrapDone(function() {
            expect(nummy(255).hex(4)).to.equal('00ff');
        }));
        it('padding 4 places | 0.5', wrapDone(function() {
            expect(nummy(0.5).hex(4)).to.equal('0000.8');
        }));
        it('padding 4 places | 2.8', wrapDone(function() {
            expect(nummy(2.5).hex(4)).to.equal('0002.8');
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
    });

    describe('#abbr', function () {
        it('1', wrapDone(function() {
            expect(nummy(1).abbr()).to.equal('1');
        }));
        it('10', wrapDone(function() {
            expect(nummy(10).abbr()).to.equal('10');
        }));
        it('100', wrapDone(function() {
            expect(nummy(100).abbr()).to.equal('100');
        }));
        it('1,000', wrapDone(function() {
            expect(nummy(1000).abbr()).to.equal('1k');
        }));
        it('10,000', wrapDone(function() {
            expect(nummy(10000).abbr()).to.equal('10k');
        }));
        it('100,000', wrapDone(function() {
            expect(nummy(100000).abbr()).to.equal('100k');
        }));
        it('1,000,000', wrapDone(function() {
            expect(nummy(1000000).abbr()).to.equal('1m');
        }));
        it('10,000,000', wrapDone(function() {
            expect(nummy(10000000).abbr()).to.equal('10m');
        }));
        it('100,000,000', wrapDone(function() {
            expect(nummy(100000000).abbr()).to.equal('100m');
        }));
        it('1,000,000,000', wrapDone(function() {
            expect(nummy(1000000000).abbr()).to.equal('1b');
        }));
        it('10,000,000,000', wrapDone(function() {
            expect(nummy(10000000000).abbr()).to.equal('10b');
        }));
        it('100,000,000,000', wrapDone(function() {
            expect(nummy(100000000000).abbr()).to.equal('100b');
        }));
        it('1,000,000,000,000', wrapDone(function() {
            expect(nummy(1000000000000).abbr()).to.equal('1t');
        }));
        it('1,000,000,000,000,000,000', wrapDone(function() {
            expect(nummy(1000000000000000000).abbr()).to.equal('1,000,000t');
        }));

        it('decimal | 1', wrapDone(function() {
            expect(nummy(1).abbr()).to.equal('1');
        }));
        it('decimal | 12', wrapDone(function() {
            expect(nummy(12).abbr()).to.equal('12');
        }));
        it('decimal | 124', wrapDone(function() {
            expect(nummy(124).abbr()).to.equal('124');
        }));
        it('decimal | 1,249', wrapDone(function() {
            expect(nummy(1249).abbr()).to.equal('1k');
        }));
        it('decimal | 1,749', wrapDone(function() {
            expect(nummy(1749).abbr()).to.equal('2k');
        }));
        it('decimal | 12,495', wrapDone(function() {
            expect(nummy(12495).abbr()).to.equal('12k');
        }));
        it('decimal | 17,495', wrapDone(function() {
            expect(nummy(17495).abbr()).to.equal('17k');
        }));
        it('decimal | 124,958', wrapDone(function() {
            expect(nummy(124958).abbr()).to.equal('125k');
        }));
        it('decimal | 174,958', wrapDone(function() {
            expect(nummy(174958).abbr()).to.equal('175k');
        }));
        it('decimal | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).abbr()).to.equal('1m');
        }));
        it('decimal | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).abbr()).to.equal('2m');
        }));

        it('decimal 1 place | 1', wrapDone(function() {
            expect(nummy(1).abbr(1)).to.equal('1');
        }));
        it('decimal 1 place | 12', wrapDone(function() {
            expect(nummy(12).abbr(1)).to.equal('12');
        }));
        it('decimal 1 place | 124', wrapDone(function() {
            expect(nummy(124).abbr(1)).to.equal('124');
        }));
        it('decimal 1 place | 1,249', wrapDone(function() {
            expect(nummy(1249).abbr(1)).to.equal('1.2k');
        }));
        it('decimal 1 place | 1,749', wrapDone(function() {
            expect(nummy(1749).abbr(1)).to.equal('1.7k');
        }));
        it('decimal 1 place | 12,495', wrapDone(function() {
            expect(nummy(12495).abbr(1)).to.equal('12.5k');
        }));
        it('decimal 1 place | 17,495', wrapDone(function() {
            expect(nummy(17495).abbr(1)).to.equal('17.5k');
        }));
        it('decimal 1 place | 124,958', wrapDone(function() {
            expect(nummy(124958).abbr(1)).to.equal('125k');
        }));
        it('decimal 1 place | 174,958', wrapDone(function() {
            expect(nummy(174958).abbr(1)).to.equal('175k');
        }));
        it('decimal 1 place | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).abbr(1)).to.equal('1.2m');
        }));
        it('decimal 1 place | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).abbr(1)).to.equal('1.7m');
        }));

        it('decimal 2 places | 1', wrapDone(function() {
            expect(nummy(1).abbr(2)).to.equal('1');
        }));
        it('decimal 2 places | 12', wrapDone(function() {
            expect(nummy(12).abbr(2)).to.equal('12');
        }));
        it('decimal 2 places | 124', wrapDone(function() {
            expect(nummy(124).abbr(2)).to.equal('124');
        }));
        it('decimal 2 places | 1,249', wrapDone(function() {
            expect(nummy(1249).abbr(2)).to.equal('1.25k');
        }));
        it('decimal 2 places | 1,749', wrapDone(function() {
            expect(nummy(1749).abbr(2)).to.equal('1.75k');
        }));
        it('decimal 2 places | 12,495', wrapDone(function() {
            expect(nummy(12495).abbr(2)).to.equal('12.5k');
        }));
        it('decimal 2 places | 17,495', wrapDone(function() {
            expect(nummy(17495).abbr(2)).to.equal('17.5k');
        }));
        it('decimal 2 places | 124,958', wrapDone(function() {
            expect(nummy(124958).abbr(2)).to.equal('124.96k');
        }));
        it('decimal 2 places | 174,958', wrapDone(function() {
            expect(nummy(174958).abbr(2)).to.equal('174.96k');
        }));
        it('decimal 2 places | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).abbr(2)).to.equal('1.25m');
        }));
        it('decimal 2 places | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).abbr(2)).to.equal('1.75m');
        }));

        it('decimal 3 places | 1', wrapDone(function() {
            expect(nummy(1).abbr(3)).to.equal('1');
        }));
        it('decimal 3 places | 12', wrapDone(function() {
            expect(nummy(12).abbr(3)).to.equal('12');
        }));
        it('decimal 3 places | 124', wrapDone(function() {
            expect(nummy(124).abbr(3)).to.equal('124');
        }));
        it('decimal 3 places | 1,249', wrapDone(function() {
            expect(nummy(1249).abbr(3)).to.equal('1.249k');
        }));
        it('decimal 3 places | 1,749', wrapDone(function() {
            expect(nummy(1749).abbr(3)).to.equal('1.749k');
        }));
        it('decimal 3 places | 12,495', wrapDone(function() {
            expect(nummy(12495).abbr(3)).to.equal('12.495k');
        }));
        it('decimal 3 places | 17,495', wrapDone(function() {
            expect(nummy(17495).abbr(3)).to.equal('17.495k');
        }));
        it('decimal 3 places | 124,958', wrapDone(function() {
            expect(nummy(124958).abbr(3)).to.equal('124.958k');
        }));
        it('decimal 3 places | 174,958', wrapDone(function() {
            expect(nummy(174958).abbr(3)).to.equal('174.958k');
        }));
        it('decimal 3 places | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).abbr(3)).to.equal('1.25m');
        }));
        it('decimal 3 places | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).abbr(3)).to.equal('1.75m');
        }));

        it('decimal -1 places | 1', wrapDone(function() {
            expect(nummy(1).abbr(-1)).to.equal('0');
        }));
        it('decimal -1 places | 12', wrapDone(function() {
            expect(nummy(12).abbr(-1)).to.equal('10');
        }));
        it('decimal -1 places | 124', wrapDone(function() {
            expect(nummy(124).abbr(-1)).to.equal('120');
        }));
        it('decimal -1 places | 1,249', wrapDone(function() {
            expect(nummy(1249).abbr(-1)).to.equal('0k');
        }));
        it('decimal -1 places | 1,749', wrapDone(function() {
            expect(nummy(1749).abbr(-1)).to.equal('0k');
        }));
        it('decimal -1 places | 12,495', wrapDone(function() {
            expect(nummy(12495).abbr(-1)).to.equal('10k');
        }));
        it('decimal -1 places | 17,495', wrapDone(function() {
            expect(nummy(17495).abbr(-1)).to.equal('20k');
        }));
        it('decimal -1 places | 124,958', wrapDone(function() {
            expect(nummy(124958).abbr(-1)).to.equal('120k');
        }));
        it('decimal -1 places | 174,958', wrapDone(function() {
            expect(nummy(174958).abbr(-1)).to.equal('170k');
        }));
        it('decimal -1 places | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).abbr(-1)).to.equal('0m');
        }));
        it('decimal -1 places | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).abbr(-1)).to.equal('0m');
        }));

        it('0.1', wrapDone(function() {
            expect(nummy(0.1).abbr()).to.equal('0');
        }));
        it('0.01', wrapDone(function() {
            expect(nummy(0.01).abbr()).to.equal('0');
        }));
        it('0.001', wrapDone(function() {
            expect(nummy(0.001).abbr()).to.equal('0');
        }));
        it('0.00001', wrapDone(function() {
            expect(nummy(0.0001).abbr()).to.equal('0');
        }));
        it('0.000001', wrapDone(function() {
            expect(nummy(0.00001).abbr()).to.equal('0');
        }));
        it('0.0000001', wrapDone(function() {
            expect(nummy(0.000001).abbr()).to.equal('0');
        }));
        it('0.00000001', wrapDone(function() {
            expect(nummy(0.0000001).abbr()).to.equal('0');
        }));
        it('0.000000001', wrapDone(function() {
            expect(nummy(0.00000001).abbr()).to.equal('0');
        }));

        it('1.1', wrapDone(function() {
            expect(nummy(1.1).abbr()).to.equal('1');
        }));
        it('1.01', wrapDone(function() {
            expect(nummy(1.01).abbr()).to.equal('1');
        }));
        it('1.001', wrapDone(function() {
            expect(nummy(1.001).abbr()).to.equal('1');
        }));
        it('1.00001', wrapDone(function() {
            expect(nummy(1.0001).abbr()).to.equal('1');
        }));
        it('1.000001', wrapDone(function() {
            expect(nummy(1.00001).abbr()).to.equal('1');
        }));
        it('1.0000001', wrapDone(function() {
            expect(nummy(1.000001).abbr()).to.equal('1');
        }));
        it('1.00000001', wrapDone(function() {
            expect(nummy(1.0000001).abbr()).to.equal('1');
        }));
        it('1.000000001', wrapDone(function() {
            expect(nummy(1.00000001).abbr()).to.equal('1');
        }));

        it('1000.004', wrapDone(function() {
            expect(nummy(1000.004).abbr()).to.equal('1k');
        }));
        it('10,000.004', wrapDone(function() {
            expect(nummy(10000.004).abbr()).to.equal('10k');
        }));
        it('100,000.004', wrapDone(function() {
            expect(nummy(100000.004).abbr()).to.equal('100k');
        }));
        it('1,000,000.004', wrapDone(function() {
            expect(nummy(1000000.004).abbr()).to.equal('1m');
        }));

        it('2 places | 1000.004', wrapDone(function() {
            expect(nummy(1000.004).abbr(2)).to.equal('1k');
        }));
        it('2 places | 10,000.004', wrapDone(function() {
            expect(nummy(10000.004).abbr(2)).to.equal('10k');
        }));
        it('2 places | 100,000.004', wrapDone(function() {
            expect(nummy(100000.004).abbr(2)).to.equal('100k');
        }));
        it('2 places | 1,000,000.004', wrapDone(function() {
            expect(nummy(1000000.004).abbr(2)).to.equal('1m');
        }));
    });

    describe('#metric', function () {
        it('1', wrapDone(function() {
            expect(nummy(1).metric(0, false)).to.equal('1');
        }));
        it('10', wrapDone(function() {
            expect(nummy(10).metric(0, false)).to.equal('10');
        }));
        it('100', wrapDone(function() {
            expect(nummy(100).metric(0, false)).to.equal('100');
        }));
        it('1,000', wrapDone(function() {
            expect(nummy(1000).metric(0, false)).to.equal('1k');
        }));
        it('10,000', wrapDone(function() {
            expect(nummy(10000).metric(0, false)).to.equal('10k');
        }));
        it('100,000', wrapDone(function() {
            expect(nummy(100000).metric(0, false)).to.equal('100k');
        }));
        it('1,000,000', wrapDone(function() {
            expect(nummy(1000000).metric(0, false)).to.equal('1M');
        }));
        it('10,000,000', wrapDone(function() {
            expect(nummy(10000000).metric(0, false)).to.equal('10M');
        }));
        it('100,000,000', wrapDone(function() {
            expect(nummy(100000000).metric(0, false)).to.equal('100M');
        }));
        it('1,000,000,000', wrapDone(function() {
            expect(nummy(1000000000).metric(0, false)).to.equal('1G');
        }));
        it('10,000,000,000', wrapDone(function() {
            expect(nummy(10000000000).metric(0, false)).to.equal('10G');
        }));
        it('100,000,000,000', wrapDone(function() {
            expect(nummy(100000000000).metric(0, false)).to.equal('100G');
        }));
        it('10,000,000,000,000', wrapDone(function() {
            expect(nummy(1000000000000).metric(0, false)).to.equal('1T');
        }));
        it('100,000,000,000,000', wrapDone(function() {
            expect(nummy(10000000000000).metric(0, false)).to.equal('10T');
        }));
        it('1,000,000,000,000,000', wrapDone(function() {
            expect(nummy(100000000000000).metric(0, false)).to.equal('100T');
        }));
        it('10,000,000,000,000,000', wrapDone(function() {
            expect(nummy(1000000000000000).metric(0, false)).to.equal('1P');
        }));
        it('100,000,000,000,000,000', wrapDone(function() {
            expect(nummy(10000000000000000).metric(0, false)).to.equal('10P');
        }));
        it('1,000,000,000,000,000,000', wrapDone(function() {
            expect(nummy(100000000000000000).metric(0, false)).to.equal('100P');
        }));

        it('decimal | 1', wrapDone(function() {
            expect(nummy(1).metric(0, false)).to.equal('1');
        }));
        it('decimal | 12', wrapDone(function() {
            expect(nummy(12).metric(0, false)).to.equal('12');
        }));
        it('decimal | 124', wrapDone(function() {
            expect(nummy(124).metric(0, false)).to.equal('124');
        }));
        it('decimal | 1,249', wrapDone(function() {
            expect(nummy(1249).metric(0, false)).to.equal('1k');
        }));
        it('decimal | 1,749', wrapDone(function() {
            expect(nummy(1749).metric(0, false)).to.equal('2k');
        }));
        it('decimal | 12,495', wrapDone(function() {
            expect(nummy(12495).metric(0, false)).to.equal('12k');
        }));
        it('decimal | 17,495', wrapDone(function() {
            expect(nummy(17495).metric(0, false)).to.equal('17k');
        }));
        it('decimal | 124,958', wrapDone(function() {
            expect(nummy(124958).metric(0, false)).to.equal('125k');
        }));
        it('decimal | 174,958', wrapDone(function() {
            expect(nummy(174958).metric(0, false)).to.equal('175k');
        }));
        it('decimal | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).metric(0, false)).to.equal('1M');
        }));
        it('decimal | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).metric(0, false)).to.equal('2M');
        }));
        it('decimal | 1,249,584,000', wrapDone(function() {
            expect(nummy(1249584000).metric(0, false)).to.equal('1G');
        }));
        it('decimal | 1,749,584,000', wrapDone(function() {
            expect(nummy(1749584000).metric(0, false)).to.equal('2G');
        }));

        it('decimal 1 place | 1', wrapDone(function() {
            expect(nummy(1).metric(1, false)).to.equal('1');
        }));
        it('decimal 1 place | 12', wrapDone(function() {
            expect(nummy(12).metric(1, false)).to.equal('12');
        }));
        it('decimal 1 place | 124', wrapDone(function() {
            expect(nummy(124).metric(1, false)).to.equal('124');
        }));
        it('decimal 1 place | 1,249', wrapDone(function() {
            expect(nummy(1249).metric(1, false)).to.equal('1.2k');
        }));
        it('decimal 1 place | 1,749', wrapDone(function() {
            expect(nummy(1749).metric(1, false)).to.equal('1.7k');
        }));
        it('decimal 1 place | 12,495', wrapDone(function() {
            expect(nummy(12495).metric(1, false)).to.equal('12.5k');
        }));
        it('decimal 1 place | 17,495', wrapDone(function() {
            expect(nummy(17495).metric(1, false)).to.equal('17.5k');
        }));
        it('decimal 1 place | 124,958', wrapDone(function() {
            expect(nummy(124958).metric(1, false)).to.equal('125k');
        }));
        it('decimal 1 place | 174,958', wrapDone(function() {
            expect(nummy(174958).metric(1, false)).to.equal('175k');
        }));
        it('decimal 1 place | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).metric(1, false)).to.equal('1.2M');
        }));
        it('decimal 1 place | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).metric(1, false)).to.equal('1.7M');
        }));
        it('decimal 1 place | 1,249,584,000', wrapDone(function() {
            expect(nummy(1249584000).metric(1, false)).to.equal('1.2G');
        }));
        it('decimal 1 place | 1,749,584,000', wrapDone(function() {
            expect(nummy(1749584000).metric(1, false)).to.equal('1.7G');
        }));

        it('decimal 2 places | 1', wrapDone(function() {
            expect(nummy(1).metric(2, false)).to.equal('1');
        }));
        it('decimal 2 places | 12', wrapDone(function() {
            expect(nummy(12).metric(2, false)).to.equal('12');
        }));
        it('decimal 2 places | 124', wrapDone(function() {
            expect(nummy(124).metric(2, false)).to.equal('124');
        }));
        it('decimal 2 places | 1,249', wrapDone(function() {
            expect(nummy(1249).metric(2, false)).to.equal('1.25k');
        }));
        it('decimal 2 places | 1,749', wrapDone(function() {
            expect(nummy(1749).metric(2, false)).to.equal('1.75k');
        }));
        it('decimal 2 places | 12,495', wrapDone(function() {
            expect(nummy(12495).metric(2, false)).to.equal('12.5k');
        }));
        it('decimal 2 places | 17,495', wrapDone(function() {
            expect(nummy(17495).metric(2, false)).to.equal('17.5k');
        }));
        it('decimal 2 places | 124,958', wrapDone(function() {
            expect(nummy(124958).metric(2, false)).to.equal('124.96k');
        }));
        it('decimal 2 places | 174,958', wrapDone(function() {
            expect(nummy(174958).metric(2, false)).to.equal('174.96k');
        }));
        it('decimal 2 places | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).metric(2, false)).to.equal('1.25M');
        }));
        it('decimal 2 places | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).metric(2, false)).to.equal('1.75M');
        }));
        it('decimal 2 places | 1,249,584,000', wrapDone(function() {
            expect(nummy(1249584000).metric(2, false)).to.equal('1.25G');
        }));
        it('decimal 2 places | 1,749,584,000', wrapDone(function() {
            expect(nummy(1749584000).metric(2, false)).to.equal('1.75G');
        }));

        it('decimal 3 places | 1', wrapDone(function() {
            expect(nummy(1).metric(3, false)).to.equal('1');
        }));
        it('decimal 3 places | 12', wrapDone(function() {
            expect(nummy(12).metric(3, false)).to.equal('12');
        }));
        it('decimal 3 places | 124', wrapDone(function() {
            expect(nummy(124).metric(3, false)).to.equal('124');
        }));
        it('decimal 3 places | 1,249', wrapDone(function() {
            expect(nummy(1249).metric(3, false)).to.equal('1.249k');
        }));
        it('decimal 3 places | 1,749', wrapDone(function() {
            expect(nummy(1749).metric(3, false)).to.equal('1.749k');
        }));
        it('decimal 3 places | 12,495', wrapDone(function() {
            expect(nummy(12495).metric(3, false)).to.equal('12.495k');
        }));
        it('decimal 3 places | 17,495', wrapDone(function() {
            expect(nummy(17495).metric(3, false)).to.equal('17.495k');
        }));
        it('decimal 3 places | 124,958', wrapDone(function() {
            expect(nummy(124958).metric(3, false)).to.equal('124.958k');
        }));
        it('decimal 3 places | 174,958', wrapDone(function() {
            expect(nummy(174958).metric(3, false)).to.equal('174.958k');
        }));
        it('decimal 3 places | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).metric(3, false)).to.equal('1.25M');
        }));
        it('decimal 3 places | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).metric(3, false)).to.equal('1.75M');
        }));
        it('decimal 3 places | 1,249,584,000', wrapDone(function() {
            expect(nummy(1249584000).metric(3, false)).to.equal('1.25G');
        }));
        it('decimal 3 places | 1,749,584,000', wrapDone(function() {
            expect(nummy(1749584000).metric(3, false)).to.equal('1.75G');
        }));


        it('decimal -1 places | 1', wrapDone(function() {
            expect(nummy(1).metric(-1, false)).to.equal('0');
        }));
        it('decimal -1 places | 12', wrapDone(function() {
            expect(nummy(12).metric(-1, false)).to.equal('10');
        }));
        it('decimal -1 places | 124', wrapDone(function() {
            expect(nummy(124).metric(-1, false)).to.equal('120');
        }));
        it('decimal -1 places | 1,249', wrapDone(function() {
            expect(nummy(1249).metric(-1, false)).to.equal('0k');
        }));
        it('decimal -1 places | 1,749', wrapDone(function() {
            expect(nummy(1749).metric(-1, false)).to.equal('0k');
        }));
        it('decimal -1 places | 12,495', wrapDone(function() {
            expect(nummy(12495).metric(-1, false)).to.equal('10k');
        }));
        it('decimal -1 places | 17,495', wrapDone(function() {
            expect(nummy(17495).metric(-1, false)).to.equal('20k');
        }));
        it('decimal -1 places | 124,958', wrapDone(function() {
            expect(nummy(124958).metric(-1, false)).to.equal('120k');
        }));
        it('decimal -1 places | 174,958', wrapDone(function() {
            expect(nummy(174958).metric(-1, false)).to.equal('170k');
        }));
        it('decimal -1 places | 1,249,584', wrapDone(function() {
            expect(nummy(1249584).metric(-1, false)).to.equal('0M');
        }));
        it('decimal -1 places | 1,749,584', wrapDone(function() {
            expect(nummy(1749584).metric(-1, false)).to.equal('0M');
        }));
        it('decimal -1 places | 1,249,584,000', wrapDone(function() {
            expect(nummy(1249584000).metric(-1, false)).to.equal('0G');
        }));
        it('decimal -1 places | 1,749,584,000', wrapDone(function() {
            expect(nummy(1749584000).metric(-1, false)).to.equal('0G');
        }));

        it('fractional | 0.1', wrapDone(function() {
            expect(nummy(0.1000000000000).metric()).to.equal('100m');
        }));
        it('fractional | 0.01', wrapDone(function() {
            expect(nummy(0.0100000000000).metric()).to.equal('10m');
        }));
        it('fractional | 0.001', wrapDone(function() {
            expect(nummy(0.0010000000000).metric()).to.equal('1m');
        }));
        it('fractional | 0.0001', wrapDone(function() {
            expect(nummy(0.0001000000000).metric()).to.equal('100μ');
        }));
        it('fractional | 0.00001', wrapDone(function() {
            expect(nummy(0.0000100000000).metric()).to.equal('10μ');
        }));
        it('fractional | 0.000001', wrapDone(function() {
            expect(nummy(0.0000010000000).metric()).to.equal('1μ');
        }));
        it('fractional | 0.0000001', wrapDone(function() {
            expect(nummy(0.0000001000000).metric()).to.equal('100n');
        }));
        it('fractional | 0.00000001', wrapDone(function() {
            expect(nummy(0.0000000100000).metric()).to.equal('10n');
        }));
        it('fractional | 0.000000001', wrapDone(function() {
            expect(nummy(0.0000000010000).metric()).to.equal('1n');
        }));
        it('fractional | 0.0000000001', wrapDone(function() {
            expect(nummy(0.0000000001000).metric()).to.equal('0.1n');
        }));
        it('fractional | 0.00000000001', wrapDone(function() {
            expect(nummy(0.0000000000100).metric()).to.equal('0.01n');
        }));
        it('fractional | 0.000000000001', wrapDone(function() {
            expect(nummy(0.0000000000010).metric()).to.equal('0.001n');
        }));
        it('fractional | 0.0000000000001', wrapDone(function() {
            expect(nummy(0.0000000000001).metric()).to.equal('0.0001n');
        }));

        it('fractional | 0 places | 0.1111111111111', wrapDone(function() {
            expect(nummy(0.1111111111111).metric()).to.equal('111m');
        }));
        it('fractional | 0 places | 0.0111111111111', wrapDone(function() {
            expect(nummy(0.0111111111111).metric()).to.equal('11m');
        }));
        it('fractional | 0 places | 0.0011111111111', wrapDone(function() {
            expect(nummy(0.0011111111111).metric()).to.equal('1m');
        }));
        it('fractional | 0 places | 0.0001111111111', wrapDone(function() {
            expect(nummy(0.0001111111111).metric()).to.equal('111μ');
        }));
        it('fractional | 0 places | 0.0000111111111', wrapDone(function() {
            expect(nummy(0.0000111111111).metric()).to.equal('11μ');
        }));
        it('fractional | 0 places | 0.0000011111111', wrapDone(function() {
            expect(nummy(0.0000011111111).metric()).to.equal('1μ');
        }));
        it('fractional | 0 places | 0.0000001111111', wrapDone(function() {
            expect(nummy(0.0000001111111).metric()).to.equal('111n');
        }));
        it('fractional | 0 places | 0.0000000111111', wrapDone(function() {
            expect(nummy(0.0000000111111).metric()).to.equal('11n');
        }));
        it('fractional | 0 places | 0.0000000011111', wrapDone(function() {
            expect(nummy(0.0000000011111).metric()).to.equal('1n');
        }));
        it('fractional | 0 places | 0.0000000001111', wrapDone(function() {
            expect(nummy(0.0000000001111).metric()).to.equal('0.1n');
        }));
        it('fractional | 0 places | 0.0000000000111', wrapDone(function() {
            expect(nummy(0.0000000000111).metric()).to.equal('0.01n');
        }));
        it('fractional | 0 places | 0.0000000000011', wrapDone(function() {
            expect(nummy(0.0000000000011).metric()).to.equal('0.001n');
        }));
        it('fractional | 0 places | 0.0000000000001', wrapDone(function() {
            expect(nummy(0.0000000000001).metric()).to.equal('0.0001n');
        }));

        it('fractional | 2 places | 0.1111111111111', wrapDone(function() {
            expect(nummy(0.1111111111111).metric(2, false)).to.equal('111.11m');
        }));
        it('fractional | 2 places | 0.0111111111111', wrapDone(function() {
            expect(nummy(0.0111111111111).metric(2, false)).to.equal('11.11m');
        }));
        it('fractional | 2 places | 0.0011111111111', wrapDone(function() {
            expect(nummy(0.0011111111111).metric(2, false)).to.equal('1.11m');
        }));
        it('fractional | 2 places | 0.0001111111111', wrapDone(function() {
            expect(nummy(0.0001111111111).metric(2, false)).to.equal('111.11μ');
        }));
        it('fractional | 2 places | 0.0000111111111', wrapDone(function() {
            expect(nummy(0.0000111111111).metric(2, false)).to.equal('11.11μ');
        }));
        it('fractional | 2 places | 0.0000011111111', wrapDone(function() {
            expect(nummy(0.0000011111111).metric(2, false)).to.equal('1.11μ');
        }));
        it('fractional | 2 places | 0.0000001111111', wrapDone(function() {
            expect(nummy(0.0000001111111).metric(2, false)).to.equal('111.11n');
        }));
        it('fractional | 2 places | 0.0000000111111', wrapDone(function() {
            expect(nummy(0.0000000111111).metric(2, false)).to.equal('11.11n');
        }));
        it('fractional | 2 places | 0.0000000011111', wrapDone(function() {
            expect(nummy(0.0000000011111).metric(2, false)).to.equal('1.11n');
        }));
        it('fractional | 2 places | 0.0000000001111', wrapDone(function() {
            expect(nummy(0.0000000001111).metric(2, false)).to.equal('0.1n');
        }));
        it('fractional | 2 places | 0.0000000000111', wrapDone(function() {
            expect(nummy(0.0000000000111).metric(2, false)).to.equal('0.01n');
        }));
        it('fractional | 2 places | 0.0000000000011', wrapDone(function() {
            expect(nummy(0.0000000000011).metric(2, false)).to.equal('0.001n');
        }));
        it('fractional | 2 places | 0.0000000000001', wrapDone(function() {
            expect(nummy(0.0000000000001).metric(2, false)).to.equal('0.0001n');
        }));

        it('fractional | 0 places | 1.1111111111111', wrapDone(function() {
            expect(nummy(1.1111111111111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0111111111111', wrapDone(function() {
            expect(nummy(1.0111111111111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0011111111111', wrapDone(function() {
            expect(nummy(1.0011111111111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0001111111111', wrapDone(function() {
            expect(nummy(1.0001111111111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000111111111', wrapDone(function() {
            expect(nummy(1.0000111111111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000011111111', wrapDone(function() {
            expect(nummy(1.0000011111111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000001111111', wrapDone(function() {
            expect(nummy(1.0000001111111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000111111', wrapDone(function() {
            expect(nummy(1.0000000111111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000011111', wrapDone(function() {
            expect(nummy(1.0000000011111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000001111', wrapDone(function() {
            expect(nummy(1.0000000001111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000000111', wrapDone(function() {
            expect(nummy(1.0000000000111).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000000011', wrapDone(function() {
            expect(nummy(1.0000000000011).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000000001', wrapDone(function() {
            expect(nummy(1.0000000000001).metric()).to.equal('1');
        }));

        it('fractional | 2 places | 1.1111111111111', wrapDone(function() {
            expect(nummy(1.1111111111111).metric(2, false)).to.equal('1.11');
        }));
        it('fractional | 2 places | 1.0111111111111', wrapDone(function() {
            expect(nummy(1.0111111111111).metric(2, false)).to.equal('1.01');
        }));
        it('fractional | 2 places | 1.0011111111111', wrapDone(function() {
            expect(nummy(1.0011111111111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0001111111111', wrapDone(function() {
            expect(nummy(1.0001111111111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000111111111', wrapDone(function() {
            expect(nummy(1.0000111111111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000011111111', wrapDone(function() {
            expect(nummy(1.0000011111111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000001111111', wrapDone(function() {
            expect(nummy(1.0000001111111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000111111', wrapDone(function() {
            expect(nummy(1.0000000111111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000011111', wrapDone(function() {
            expect(nummy(1.0000000011111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000001111', wrapDone(function() {
            expect(nummy(1.0000000001111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000000111', wrapDone(function() {
            expect(nummy(1.0000000000111).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000000011', wrapDone(function() {
            expect(nummy(1.0000000000011).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000000001', wrapDone(function() {
            expect(nummy(1.0000000000001).metric(2, false)).to.equal('1');
        }));

        it('fractional | 0 places | 1.1000000000001', wrapDone(function() {
            expect(nummy(1.1000000000001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0100000000001', wrapDone(function() {
            expect(nummy(1.0100000000001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0010000000001', wrapDone(function() {
            expect(nummy(1.0010000000001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0001000000001', wrapDone(function() {
            expect(nummy(1.0001000000001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000100000001', wrapDone(function() {
            expect(nummy(1.0000100000001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000010000001', wrapDone(function() {
            expect(nummy(1.0000010000001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000001000001', wrapDone(function() {
            expect(nummy(1.0000001000001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000100001', wrapDone(function() {
            expect(nummy(1.0000000100001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000010001', wrapDone(function() {
            expect(nummy(1.0000000010001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000001001', wrapDone(function() {
            expect(nummy(1.0000000001001).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000000101', wrapDone(function() {
            expect(nummy(1.0000000000101).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000000011', wrapDone(function() {
            expect(nummy(1.0000000000011).metric()).to.equal('1');
        }));
        it('fractional | 0 places | 1.0000000000001', wrapDone(function() {
            expect(nummy(1.0000000000001).metric()).to.equal('1');
        }));

        it('fractional | 2 places | 1.1000000000001', wrapDone(function() {
            expect(nummy(1.1000000000001).metric(2, false)).to.equal('1.1');
        }));
        it('fractional | 2 places | 1.0100000000001', wrapDone(function() {
            expect(nummy(1.0100000000001).metric(2, false)).to.equal('1.01');
        }));
        it('fractional | 2 places | 1.0010000000001', wrapDone(function() {
            expect(nummy(1.0010000000001).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0001000000001', wrapDone(function() {
            expect(nummy(1.0001000000001).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000100000001', wrapDone(function() {
            expect(nummy(1.0000100000001).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000010000001', wrapDone(function() {
            expect(nummy(1.0000010000001).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000001000001', wrapDone(function() {
            expect(nummy(1.0000001000001).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000100001', wrapDone(function() {
            expect(nummy(1.0000000100001).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000010001', wrapDone(function() {
            expect(nummy(1.0000000010001).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000001001', wrapDone(function() {
            expect(nummy(1.0000000001001).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000000101', wrapDone(function() {
            expect(nummy(1.0000000000101).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000000011', wrapDone(function() {
            expect(nummy(1.0000000000011).metric(2, false)).to.equal('1');
        }));
        it('fractional | 2 places | 1.0000000000001', wrapDone(function() {
            expect(nummy(1.0000000000001).metric(2, false)).to.equal('1');
        }));

        it('fractional | 3 places | 12334.5880', wrapDone(function() {
            expect(nummy(12334.5880).metric(3, false)).to.equal('12.335k');
        }));
        it('fractional | 0 places | 12334.5880', wrapDone(function() {
            expect(nummy(12334.5880).metric()).to.equal('12k');
        }));
        it('fractional | 9 places | .5885', wrapDone(function() {
            expect(nummy(.588500).metric(9, false)).to.equal('588.5m');
        }));
        it('fractional | 9 places | .580085', wrapDone(function() {
            expect(nummy(.580085).metric(9, false)).to.equal('580.085m');
        }));
        it('fractional | 7 places | .580085', wrapDone(function() {
            expect(nummy(.580085).metric(7, false)).to.equal('580.085m');
        }));
        it('fractional | 5 places | .580085', wrapDone(function() {
            expect(nummy(.580085).metric(5, false)).to.equal('580.085m');
        }));
        it('fractional | 3 places | .580085', wrapDone(function() {
            expect(nummy(.580085).metric(3, false)).to.equal('580.085m');
        }));
        it('fractional | 1 places | .580085', wrapDone(function() {
            expect(nummy(.580085).metric(1, false)).to.equal('580.1m');
        }));


        it('100μm', wrapDone(function() {
            expect(nummy(0.0001).metric() +'m').to.equal('100μm');
        }));
        it('1mm', wrapDone(function() {
            expect(nummy(0.001).metric() +'m').to.equal('1mm');
        }));
        it('10mm', wrapDone(function() {
            expect(nummy(0.01).metric() +'m').to.equal('10mm');
        }));
        it('100mm', wrapDone(function() {
            expect(nummy(0.1).metric() +'m').to.equal('100mm');
        }));
        it('1m', wrapDone(function() {
            expect(nummy(1).metric() +'m').to.equal('1m');
        }));
        it('1km', wrapDone(function() {
            expect(nummy(1000).metric() +'m').to.equal('1km');
        }));
        it('1,000km', wrapDone(function() {
            expect(nummy(1000000).metric() +'m').to.equal('1,000km');
        }));
        it('1,000,000km', wrapDone(function() {
            expect(nummy(1000000000).metric() +'m').to.equal('1,000,000km');
        }));

        it('limited to meters | 1,000,000,000m', wrapDone(function() {
            expect(nummy(1000000000).metric(0, 0) +'m').to.equal('1,000,000,000m');
        }));
        it('limited to meters | 1,000,000m', wrapDone(function() {
            expect(nummy(1000000).metric(0, 0) +'m').to.equal('1,000,000m');
        }));
        it('limited to meters | 1,000m', wrapDone(function() {
            expect(nummy(1000).metric(0, 0) +'m').to.equal('1,000m');
        }));
        it('limited to meters | 1m', wrapDone(function() {
            expect(nummy(1).metric(0, 0) +'m').to.equal('1m');
        }));

        it('limited and 3 decimals', wrapDone(function() {
            expect(nummy(12323.424558).metric(3, 0)).to.equal('12,323.425');
        }));
        it('1 meter is 1,000mm', wrapDone(function() {
            expect(nummy(1).metric(0, -1) +'m').to.equal('1,000mm');
        }));
    });


    describe('#bytes', function () {
        it('1B', wrapDone(function() {
            expect(nummy(1).bytes()).to.equal('1B');
        }));
        it('10B', wrapDone(function() {
            expect(nummy(10).bytes()).to.equal('10B');
        }));
        it('100B', wrapDone(function() {
            expect(nummy(100).bytes()).to.equal('100B');
        }));
        it('1kB', wrapDone(function() {
            expect(nummy(1000).bytes()).to.equal('1kB');
        }));
        it('10kB', wrapDone(function() {
            expect(nummy(10000).bytes()).to.equal('10kB');
        }));
        it('100kB', wrapDone(function() {
            expect(nummy(100000).bytes()).to.equal('98kB');
        }));
        it('1MB', wrapDone(function() {
            expect(nummy(1000000).bytes()).to.equal('1MB');
        }));
        it('10MB', wrapDone(function() {
            expect(nummy(10000000).bytes()).to.equal('10MB');
        }));
        it('100MB', wrapDone(function() {
            expect(nummy(100000000).bytes()).to.equal('95MB');
        }));
        it('1GB', wrapDone(function() {
            expect(nummy(1000000000).bytes()).to.equal('1GB');
        }));
        it('10GB', wrapDone(function() {
            expect(nummy(10000000000).bytes()).to.equal('9GB');
        }));
        it('100GB', wrapDone(function() {
            expect(nummy(100000000000).bytes()).to.equal('93GB');
        }));
        it('1TB', wrapDone(function() {
            expect(nummy(1000000000000).bytes()).to.equal('1TB');
        }));
        it('10TB', wrapDone(function() {
            expect(nummy(10000000000000).bytes()).to.equal('9TB');
        }));
        it('100TB', wrapDone(function() {
            expect(nummy(100000000000000).bytes()).to.equal('91TB');
        }));
        it('1,000TB', wrapDone(function() {
            expect(nummy(1000000000000000).bytes()).to.equal('909TB');
        }));
        it('10,000TB', wrapDone(function() {
            expect(nummy(10000000000000000).bytes()).to.equal('9,095TB');
        }));
        it('10,000TB', wrapDone(function() {
            expect(nummy(100000000000000000).bytes()).to.equal('90,949TB');
        }));

        it('no limit | 1B', wrapDone(function() {
            expect(nummy(1).bytes(0, false)).to.equal('1B');
        }));
        it('no limit | 10B', wrapDone(function() {
            expect(nummy(10).bytes(0, false)).to.equal('10B');
        }));
        it('no limit | 100B', wrapDone(function() {
            expect(nummy(100).bytes(0, false)).to.equal('100B');
        }));
        it('no limit | 1kB', wrapDone(function() {
            expect(nummy(1000).bytes(0, false)).to.equal('1kB');
        }));
        it('no limit | 10kB', wrapDone(function() {
            expect(nummy(10000).bytes(0, false)).to.equal('10kB');
        }));
        it('no limit | 100kB', wrapDone(function() {
            expect(nummy(100000).bytes(0, false)).to.equal('98kB');
        }));
        it('no limit | 1MB', wrapDone(function() {
            expect(nummy(1000000).bytes(0, false)).to.equal('1MB');
        }));
        it('no limit | 10MB', wrapDone(function() {
            expect(nummy(10000000).bytes(0, false)).to.equal('10MB');
        }));
        it('no limit | 100MB', wrapDone(function() {
            expect(nummy(100000000).bytes(0, false)).to.equal('95MB');
        }));
        it('no limit | 1GB', wrapDone(function() {
            expect(nummy(1000000000).bytes(0, false)).to.equal('1GB');
        }));
        it('no limit | 10GB', wrapDone(function() {
            expect(nummy(10000000000).bytes(0, false)).to.equal('9GB');
        }));
        it('no limit | 100GB', wrapDone(function() {
            expect(nummy(100000000000).bytes(0, false)).to.equal('93GB');
        }));
        it('no limit | 1TB', wrapDone(function() {
            expect(nummy(1000000000000).bytes(0, false)).to.equal('1TB');
        }));
        it('no limit | 10TB', wrapDone(function() {
            expect(nummy(10000000000000).bytes(0, false)).to.equal('9TB');
        }));
        it('no limit | 100TB', wrapDone(function() {
            expect(nummy(100000000000000).bytes(0, false)).to.equal('91TB');
        }));
        it('no limit | 1,000TB', wrapDone(function() {
            expect(nummy(1000000000000000).bytes(0, false)).to.equal('1PB');
        }));
        it('no limit | 10,000TB', wrapDone(function() {
            expect(nummy(10000000000000000).bytes(0, false)).to.equal('9PB');
        }));
        it('no limit | 10,000TB', wrapDone(function() {
            expect(nummy(100000000000000000).bytes(0, false)).to.equal('89PB');
        }));

        it('no limit, 2 places | 1B', wrapDone(function() {
            expect(nummy(1).bytes(2, false)).to.equal('1B');
        }));
        it('no limit, 2 places | 10B', wrapDone(function() {
            expect(nummy(10).bytes(2, false)).to.equal('10B');
        }));
        it('no limit, 2 places | 100B', wrapDone(function() {
            expect(nummy(100).bytes(2, false)).to.equal('100B');
        }));
        it('no limit, 2 places | 1kB', wrapDone(function() {
            expect(nummy(1000).bytes(2, false)).to.equal('0.98kB');
        }));
        it('no limit, 2 places | 10kB', wrapDone(function() {
            expect(nummy(10000).bytes(2, false)).to.equal('9.77kB');
        }));
        it('no limit, 2 places | 100kB', wrapDone(function() {
            expect(nummy(100000).bytes(2, false)).to.equal('97.66kB');
        }));
        it('no limit, 2 places | 1MB', wrapDone(function() {
            expect(nummy(1000000).bytes(2, false)).to.equal('0.95MB');
        }));
        it('no limit, 2 places | 10MB', wrapDone(function() {
            expect(nummy(10000000).bytes(2, false)).to.equal('9.54MB');
        }));
        it('no limit, 2 places | 100MB', wrapDone(function() {
            expect(nummy(100000000).bytes(2, false)).to.equal('95.37MB');
        }));
        it('no limit, 2 places | 1GB', wrapDone(function() {
            expect(nummy(1000000000).bytes(2, false)).to.equal('0.93GB');
        }));
        it('no limit, 2 places | 10GB', wrapDone(function() {
            expect(nummy(10000000000).bytes(2, false)).to.equal('9.31GB');
        }));
        it('no limit, 2 places | 100GB', wrapDone(function() {
            expect(nummy(100000000000).bytes(2, false)).to.equal('93.13GB');
        }));
        it('no limit, 2 places | 1TB', wrapDone(function() {
            expect(nummy(1000000000000).bytes(2, false)).to.equal('0.91TB');
        }));
        it('no limit, 2 places | 10TB', wrapDone(function() {
            expect(nummy(10000000000000).bytes(2, false)).to.equal('9.09TB');
        }));
        it('no limit, 2 places | 100TB', wrapDone(function() {
            expect(nummy(100000000000000).bytes(2, false)).to.equal('90.95TB');
        }));
        it('no limit, 2 places | 1,000TB', wrapDone(function() {
            expect(nummy(1000000000000000).bytes(2, false)).to.equal('0.89PB');
        }));
        it('no limit, 2 places | 10,000TB', wrapDone(function() {
            expect(nummy(10000000000000000).bytes(2, false)).to.equal('8.88PB');
        }));
        it('no limit, 2 places | 10,000TB', wrapDone(function() {
            expect(nummy(100000000000000000).bytes(2, false)).to.equal('88.82PB');
        }));

        it('1024 bytes is 1kB', wrapDone(function() {
            expect(nummy(1024).bytes()).to.equal('1kB');
        }));
        it('2 places | 1024 bytes is 1kB', wrapDone(function() {
            expect(nummy(1024).bytes(2)).to.equal('1kB');
        }));
        it('2 places | 1048576 bytes is 1MB', wrapDone(function() {
            expect(nummy(1048576).bytes()).to.equal('1MB');
        }));
        it('2 places | 1048576 bytes is 1MB', wrapDone(function() {
            expect(nummy(1048576).bytes(2)).to.equal('1MB');
        }));

        it('10 ^ 16 bytes', wrapDone(function() {
            expect(nummy(nummy(10).pow(16)).bytes()).to.equal('9,095TB');
        }));
        it('10 ^ 16 bytes | -2 places', wrapDone(function() {
        expect(nummy(nummy(10).pow(16)).bytes(-2)).to.equal('9,100TB');
        }));
    });

    describe('#times', function () {
        var myNummy;
        beforeEach(wrapDone(function () {
            myNummy = nummy(5);
        }));
        it('calls function argument this.number times', wrapDone(function () {
            var callCount = 0;
            myNummy.times(function () {
                callCount++;
            });
            expect(callCount).to.equal(myNummy.number);
        }));
        it('calls function arg with this.number & current iteration as args', wrapDone(function () {
            var calls = [];
            var slice = [].slice;
            myNummy.times(function () {
                calls.push(slice.call(arguments));
            });
            expect(calls.length).to.equal(myNummy.number);
            calls.forEach(function (callArgs, iteration) {
                expect(callArgs).to.eql([myNummy.number, iteration]);
            });
        }));
        it('calls function arg with nummy instance as this context', wrapDone(function () {
            var contexts = [];
            myNummy.times(function () {
                contexts.push(this);
            });
            contexts.forEach(function (context) {
                expect(context).to.equal(myNummy);
            });
        }));
        it('returns the nummy instance', wrapDone(function () {
            expect(myNummy.times()).to.equal(myNummy);
        }));
    });
});