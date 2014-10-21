// TODO: we need to think more about performance before we build out the other verification methods

var ArgsVerifier = require('./ArgsVerifier');
var ArgVerifier = require('./ArgVerifier');
var ArgumentError = require('./ArgumentError');
var ValidationError = require('./ValidationError');
var TopiaristVerifier = require('./verifiers/TopiaristVerifier');

function verifierMethod(verifier, methodName) {
  return function() {
    if(this.argValue === undefined) throw new ArgumentError(this.argName + ' argument must be provided.');

    var arguments = Array.prototype.slice.call(arguments, 0);
    verifier[methodName].apply(verifier, [this.argName, this.argValue].concat(arguments));
    return this.argsVerifier;
  };
}

exports.using = function(arguments) {
  return new ArgsVerifier(Array.prototype.slice.call(arguments));
};

exports.addVerifier = function(verifier) {
  for(var methodName in verifier) {
    ArgVerifier.prototype[methodName] = verifierMethod(verifier, methodName);
  }
};

exports.ArgumentError = ArgumentError;
exports.ValidationError = ValidationError;

exports.addVerifier(new TopiaristVerifier());
