// TODO: we need to think more about performance before we build out the other verification methods

var ArgsVerifier = require('./ArgsVerifier');
var ArgumentError = require('./ArgumentError');
var ValidationError = require('./ValidationError');
var TopiaristVerifier = require('./verifiers/TopiaristVerifier');
var verifiers = [new TopiaristVerifier()];

exports.using = function(arguments) {
  return new ArgsVerifier(arguments, verifiers);
};

exports.addVerifier = function(verifier) {
  verifiers.push(verifier);
};

exports.ArgumentError = ArgumentError;
exports.ValidationError = ValidationError;
