/**
 * Module dependencies
 */

var debug = require('simple-debug')('bitfield');

/**
 * Expose the `Bitfield` obj
 */

exports = module.exports = Bitfield;

/**
 * Save a list into a `Bitfield`
 */

function Bitfield(list) {
  if(!(this instanceof Bitfield)) return new Bitfield(list);
  this.list = list
};

/**
 * Pack with the saved list
 */

Bitfield.prototype.pack = function(enabled) {
  return exports.pack(enabled, this.list);
};

/**
 * Unpack with the saved list
 */

Bitfield.prototype.unpack = function(buffer) {
  return exports.unpack(buffer, this.list);
};

/**
 * Pack enabled values into a `Buffer`
 */

exports.pack = function(enabled, list) {
  var bytes = [];

  for (var i = 0; i < Math.ceil(list.length / 8); i++) {
    var byte = 0x0
      , byteIndex = i * 8;
    for (var j = 0; j < 8; j++) {
      var item = list[byteIndex + j]
        , offset = 7 - j;

      (enabled && !!~enabled.indexOf(item))
        ? byte |= (1 << offset)
        : byte &= ~(1 << offset);
    };
    bytes.push(byte);
  };

  return new Buffer(bytes);
};

/**
 * Unpack enabled values from a `Buffer`
 */

exports.unpack = function(buffer, list) {
  var enabled = [];

  for (var i = 0; i < buffer.length; i++) {
    var byte = buffer[i]
      , byteIndex = i * 8;
    for (var j = 0; j < 8; j++) {
      var index = byteIndex + j
        , offset = 7 - j;
      if (index === list.length) return enabled;
      if (byte & (1 << offset)) enabled.push(list[index]);
    };
  };

  return enabled;
};
