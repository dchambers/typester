var topiarist = require('topiarist');

function TopiaristVerifier() {
}

TopiaristVerifier.prototype.isA = function(argName, argValue, type) {
  if(!topiarist.isA(argValue, type)) throw new TypeError(argName + ' argument must be a ' + type.name + '.');
};

module.exports = TopiaristVerifier;
