var ArgsVerifier = require('./ArgsVerifier');
var ArgVerifier = require('./ArgVerifier');
var TopiaristVerifier = require('./verifiers/TopiaristVerifier');
var NumberVerifier = require('./verifiers/NumberVerifier');
var NonEmptyVerifier = require('./verifiers/NonEmptyVerifier');
var ArgumentError = require('./ArgumentError');
var ValidationError = require('./ValidationError');

ArgVerifier.addVerifier(new TopiaristVerifier());
ArgVerifier.addVerifier(new NumberVerifier());
ArgVerifier.addVerifier(new NonEmptyVerifier());

exports.using = function(arguments) {
  return new ArgsVerifier(arguments);
};

exports.addVerifier = function(verifier) {
  ArgVerifier.addVerifier(verfier);
};

exports.ArgumentError = ArgumentError;
exports.ValidationError = ValidationError;
