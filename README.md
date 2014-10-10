nummy
=============

All the sweetness of [Sugar's number module](http://sugarjs.com/api/Number) without the mess.

Usage:

```javascript
var nummy = require('nummy');

var abbr = nummy(1100).abbr(1);
// result: "1.1k"
```

**NOTE**: I have omitted the methods that don't directly work with numbers.

## Differences

Since nummy doesn't extend the Number prototype, you won't be able to chain method the same way you could in Sugar.

To replace that ability I have provided nummy.chain and nummy().chain().

The chaining implementation provides the current numerical value via the `valueOf` method and the current string value via the `toString` method.
This allows for some creative uses such as the object key/value setting example below.

Chain usage:

```javascript
var sixteenBitsInBytes = nummy.chain(2).pow(16).bytes();
// equivalent: nummy(2).chain().pow(16).bytes();

console.log(sixteenBitsInBytes.value());
// result: "64kB"

var obj = {};
obj[sixteenBitsInBytes] = Number(sixteenBitsInBytes);
console.log(obj);
// result: {"64kB": 65536}

```

In addition several, not directly number-related methods are omitted.

## Omitted Features

### Range methods

- Number.range
- \#downto/\#upto
- \#clamp
- \#cap


### Date methods

- \#duration
- \#{unit}, \#{unit}Ago, \#{unit}Before, \#{unit}After, \#{unit}FromNow