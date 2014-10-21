var ArgumentError = require('./ArgumentError');
var topiarist = require('topiarist');

function verifierMethod(verifier, methodName) {
  return function() {
    if(this.argValue === undefined) throw new ArgumentError(this.argName + ' argument must be provided.');

    var arguments = Array.prototype.slice.call(arguments, 0);
    verifier[methodName].apply(this, arguments);
    return this.argsVerifier;
  };
}

function ArgVerifier(argsVerifier, argName, argValue) {
  this.argsVerifier = argsVerifier;
  this.argName = argName;
  this.argValue = argValue;
}

ArgVerifier.addVerifier = function(verifier) {
  for(var methodName in verifier) {
    ArgVerifier.prototype[methodName] = verifierMethod(verifier, methodName);
  }
};

module.exports = ArgVerifier;
