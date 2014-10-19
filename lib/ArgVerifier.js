var ArgumentError = require('./ArgumentError');
var topiarist = require('topiarist');

function ArgVerifier(argsVerifier, argName, argValue) {
  this.argsVerifier = argsVerifier;
  this.argName = argName;
  this.argValue = argValue;

  for(var key in argsVerifier.verifiers) {
    var verifier = argsVerifier.verifiers[key];

    for(var methodName in verifier) {
      this[methodName] = verifierMethod(verifier, methodName).bind(this);
    }
  }
}

function verifierMethod(verifier, methodName) {
  return function() {
    if(this.argValue === undefined) throw new ArgumentError(this.argName + ' argument must be provided.');

    var arguments = Array.prototype.slice.call(arguments, 0);
    verifier[methodName].apply(verifier, [this.argName, this.argValue].concat(arguments));
    return this.argsVerifier;
  };
}

module.exports = ArgVerifier;
