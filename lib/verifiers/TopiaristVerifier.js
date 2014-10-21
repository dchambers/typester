var topiarist = require('topiarist');

function TopiaristVerifier() {
}

TopiaristVerifier.prototype.isA = function(type) {
  if(!topiarist.isA(this.argValue, type)) throw new TypeError(this.argName + ' argument must be a ' + type.name + '.');
};

module.exports = TopiaristVerifier;
