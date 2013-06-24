
var bitfield = require('..')
  , should = require('should');

describe('bitfield', function() {
  it('should support creating a `Bitfield` object', function() {
    var list = ['1','2','3','4','5','6','7','8','9']
      , enabled = ['4','7','9']
      , bits = bitfield(list);

    var packed = bits.pack(enabled)
      , unpacked = bits.unpack(packed);

    unpacked.should.eql(enabled);
  });

  it('should pack/unpack a bitfield', function() {
    var list = ['1','2','3','4','5','6','7','8','9']
      , enabled = ['4','7','9'];

    var packed = bitfield.pack(enabled, list)
      , unpacked = bitfield.unpack(packed, list);

    unpacked.should.eql(enabled);
  });

  it('should pack undefined an empty set', function() {
    var list = ['1','2','3','4','5','6','7','8','9']
      , enabled = undefined;

    var packed = bitfield.pack(enabled, list)
      , unpacked = bitfield.unpack(packed, list);

    unpacked.should.eql([]);
  });

  it('should pack/unpack a bunch of bitfield sets', function() {
    runTests(1000, function() {
      var list = createList(Math.floor(Math.random() * 256));

      runTests(8, function() {
        var enabled = randomItems(list, Math.random());

        var packed = bitfield.pack(enabled, list)
          , unpacked = bitfield.unpack(packed, list);

        unpacked.should.eql(enabled);
      });
    });
  });
});

function createList(length) {
  var list = [];
  for (var i = 0; i < length; i++) {
    list.push(''+i);
  }
  return list;
};

function randomItems(list, freq) {
  return list.filter(function() {
    return Math.random() > .5;
  });
};

function runTests(length, fn) {
  for (var i = 0; i < length; i++) {
    fn();
  }
};
