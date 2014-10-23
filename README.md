Nummy
=============

Nummy is a functional and modular number computation, description, and formatting library.

## Usage

### Basic

```javascript
var nummy = require('nummy');

var abbr = nummy(1100).abbr(1);
// result: "1.1k"
```

### Chained

```javascript
var sixteenBitsInBytes = nummy.chain(2).pow(16).bytes();
// equivalent: nummy(2).chain().pow(16).bytes();

console.log(sixteenBitsInBytes.value());
// result: "64kB"

var obj = {};
obj[sixteenBitsInBytes] = sixteenBitsInBytes.toNumber();
console.log(obj);
// result: {"64kB": 65536}

```

### Single-method

```javascript
var _ = require('underscore');
var isEven = require('nummy/boolean/isEven');
var product = require('nummy/math/product');

var isProductEven = _.compose(isEven, product);

console.log(isProductEven(3, 5, 7))
// result: false
```

#### String methods

** Base conversion **

- \#base36: `nummy(135).base36(4) => "003R"`
- \#binary: `nummy(9740).binary(16) => "0010011000001100"`
- \#hex: `nummy(7178).hex(8) => "00001C0A"`

** Format numbers according to common measurement systems **
- \#abbr: `nummy(7645).abbr(3) => "7.645k"`
- \#bytes: `nummy(1478).bytes(2) => "1.44kB"`
- \#metric: `nummy(6918).metric(1) => "6.9k"`

- \#chr: `nummy(77).chr() => "M"`
- \#format: nummy(8822).format([optional: {place: null, thousands: ',', decimal: '.'}]) => "8,822"
- \#ordinalize: nummy(1257).ordinalize() => "1257th"
- \#pad: nummy(6275).pad(8) => "00006275"

#### Mathematical operation methods:

I've added a number of additional mathematical operation methods:

- \#add: (alias: plus) `nummy(3137).add(1) => 3138`
- \#abs: `nummy(-8635).abs() => 1`
- \#acos: `nummy(0).acos() => 1.5707963267948966`
- \#asin: `nummy(3880).asin(-0.6) => -0.6435011087932844`
- \#atan: `nummy(2).atan() => 1.1071487177940906`
- \#atan2: `nummy(3641).atan2(0) => 1.5707963267948966`
- \#ceil: `nummy(8688.5).ceil() => 8689`
- \#cos: `nummy(1494).cos() => 0.17183612697016132`
- \#divide: `nummy(7226).divide(2) => 0.0002767783005812344`
- \#divideBy: `nummy(7226).divideBy(2) => 3613`
- \#exp: `nummy(1).exp() => 2.718281828459045`
- \#floor: `nummy(748.9).floor() => 748`
- \#log: `nummy(3807).log() => 8.244596756382498` or `nummy(3807).log(0.2) => -5.122655986097307`
- \#max: `nummy(1347).max(1) => 1347`
- \#min: `nummy(8105).min(8102) => 8102`
- \#modulo: (alias: mod) `nummy(4508).modulo(3) => 2`
- \#moduloOf: `nummy(3).moduloOf(4508) => 2`
- \#multiply: `nummy(7435).multiply(2) => 14870`
- \#pow: `nummy(3).pow(3) => 27`
- \#product: `nummy(1).product(2,3,4) => 24`
- \#round: `nummy(65).round(-1) => 70`
- \#sin: `nummy(1).sin() => 0.8414709848078965`
- \#sqrt: `nummy(3950).sqrt() => 62.849025449882674`
- \#subtract: (alias: minus) `nummy(5283).subtract(1) => 5282`
- \#subtractFrom: `nummy(7908).subtractFrom(0) => -7908`
- \#sum: `nummy(1).sum(2,3,4) => 10`
- \#tan: `nummy(1.1).tan() => 1.9647596572486523`

#### Casting methods

- \#toInteger: `nummy(-735.2685004007071).toInteger() => -735`
- \#toInt32: `nummy(759630119195208).toInt32() => 728388168`
- \#toUInt32: `nummy(-1).toUInt32() => 4294967295`
- \#toNumber: `nummy('-482.50145046040416').toNumber() => -482.50145046040416`

#### Test (is) methods

- \#isEven: `nummy(5629).isEven() => false`
- \#isInteger: `nummy(1433).isInteger(0) => true`
- \#isMultipleOf: `nummy(832).isMultipleOf(3) => false`
- \#isFactorOf: `nummy(3).isFactorOf(9933) => true`
- \#isOdd: `nummy(6296).isOdd() => false`

#### Methods that return arrays

- \#factor: `nummy(234).factor() => [ 1, 2, 3, 6, 9, 13, 18, 26, 39, 78, 117 ]`

