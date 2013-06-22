bitfield [![Build Status](https://travis-ci.org/CamShaft/bitfield.png)](https://travis-ci.org/CamShaft/bitfield)
========

simple bitfields for node

Usage
-----

```js
var bitfield = require('bitfield');

// Create a list of fields
var list = ['name', 'age', 'email', 'address', 'friends'];

// Fields to be enabled
var enabled = ['name', 'address'];

var packed = bitfield.pack(enabled, list);
// => <Buffer 09>

var unpacked = bitfield.unpack(packed, list);
// => ['name', 'address']
```

It also supports creating a `Bitfield` object

```js
var list = ['1','2','3','4','5','6','7','8','9']
  , enabled = ['4','7','9'];

// Create a `Bitfield` object and attach the list
var bits = bitfield(list);

var packed = bits.pack(enabled);
// => <Buffer 09>

var unpacked = bits.unpack(packed);
// => ['name', 'address']

unpacked.should.eql(enabled);
```

Tests
-----

```sh
$ npm test
```
