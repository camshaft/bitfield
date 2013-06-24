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
    var byte = 0x0;
    for (var j = 0; j < 8; j++) {
      var index = i * 8 + j
        , item = list[index];

      (enabled && !!~enabled.indexOf(item))
        ? byte |= (1 << j)
        : byte &= ~(1 << j);
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
    var byte = buffer[i];
    for (var j = 0; j < 8; j++) {
      var index = i * 8 + j;
      if (index === list.length) return enabled;
      if (byte & (1 << j)) enabled.push(list[index]);
    };
  };

  return enabled;
};
