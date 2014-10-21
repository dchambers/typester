// TODO: we need to think more about performance before we build out the other verification methods

var ArgsVerifier = require('./ArgsVerifier');
var ArgVerifier = require('./ArgVerifier');
var ArgumentError = require('./ArgumentError');
var ValidationError = require('./ValidationError');
var TopiaristVerifier = require('./verifiers/TopiaristVerifier');

exports.using = function(arguments) {
  return new ArgsVerifier(arguments);
};

exports.addVerifier = function(verifier) {
  ArgVerifier.addVerifier(verfier);
};

exports.ArgumentError = ArgumentError;
exports.ValidationError = ValidationError;

ArgVerifier.addVerifier(new TopiaristVerifier());
