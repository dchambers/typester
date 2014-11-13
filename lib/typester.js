'use strict';

var ArgVerifier = require('./ArgVerifier');
var TopiaristVerifier = require('./verifiers/TopiaristVerifier');
var NumberVerifier = require('./verifiers/NumberVerifier');
var NonEmptyVerifier = require('./verifiers/NonEmptyVerifier');
var ArgumentError = require('./ArgumentError');
var ValidationError = require('./ValidationError');

ArgVerifier.addVerifier(new TopiaristVerifier());
ArgVerifier.addVerifier(new NumberVerifier());
ArgVerifier.addVerifier(new NonEmptyVerifier());

var args, argIndex;

exports.using = function(_args, verifications) {
  if(_args === undefined) throw new ArgumentError('args argument must be provided');

  args = _args;
  argIndex = 0;
  verifications();

  if(args.length > argIndex) {
    var argsArray = Array.prototype.slice.call(args);

    throw new ArgumentError('only ' + argIndex + ' argument(s) verified but ' +
      args.length + ' were provided: [' + argsArray.join(', ') + ']');
  }
};

exports.verify = function(argName) {
  if(typeof(argName) != 'string') throw new TypeError('argName argument must be a String');

  return new ArgVerifier(argName, args[argIndex++]);
};

exports.addVerifier = function(verifier) {
  ArgVerifier.addVerifier(verfier);
};

exports.ArgumentError = ArgumentError;
exports.ValidationError = ValidationError;
