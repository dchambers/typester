'use strict';

var topiarist = require('topiarist');

function TopiaristVerifier() {
}

TopiaristVerifier.prototype.isA = function(type) {
  if(!topiarist.isA(this.argValue, type)) throw new TypeError(this.argName + ' argument must be a ' + type.name + '.');
};

TopiaristVerifier.prototype.classIsA = function(type) {
  if(!topiarist.classIsA(this.argValue, type)) throw new TypeError(this.argName + ' argument must be a ' + type.name + ' class.');
};

TopiaristVerifier.prototype.fulfills = function(type) {
  if(!topiarist.fulfills(this.argValue, type)) throw new TypeError(this.argName + ' argument must fulfill ' + type.name + '.');
};

TopiaristVerifier.prototype.classFulfills = function(type) {
  if(!topiarist.classFulfills(this.argValue, type)) throw new TypeError(this.argName + ' argument must fulfill ' + type.name + ' class.');
};

module.exports = TopiaristVerifier;
