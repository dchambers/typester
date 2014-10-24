var ArgVerifier = require('./ArgVerifier');
var ArgumentError = require('./ArgumentError');

function ArgsVerifier(arguments) {
  if(ArgsVerifier.pendingVerifier) throw pendingVerifierError();
  if(arguments === undefined) throw new ArgumentError('arguments argument must be provided');

  this.arguments = arguments;
  this.argIndex = 0;
}

ArgsVerifier.prototype.verify = function(argName) {
  ArgsVerifier.pendingVerifier = null;
  if(typeof(argName) != 'string') throw new TypeError('argName argument must be a String');

  return new ArgVerifier(this, argName, this.arguments[this.argIndex++]);
};

function pendingVerifierError() {
  var pendingVerifier = ArgsVerifier.pendingVerifier;
  var pendingVerifierArgs = Array.prototype.slice.call(pendingVerifier.arguments);
  ArgsVerifier.pendingVerifier = null;

  return new ArgumentError('only ' + pendingVerifier.argIndex + ' argument(s) verified but ' + pendingVerifierArgs.length +
    ' were provided: [' + pendingVerifierArgs.join(', ') + ']');
}

module.exports = ArgsVerifier;
