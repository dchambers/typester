var ArgVerifier = require('./ArgVerifier');
var ArgumentError = require('./ArgumentError');
var topiarist = require('topiarist');

function ArgsVerifier(arguments) {
  if(arguments === undefined) throw new ArgumentError('arguments argument must be provided');

  this.arguments = arguments;
  this.argIndex = 0;
}

ArgsVerifier.prototype.verify = function(argName) {
  if(argName === undefined) throw new ArgumentError('argName argument must be provided');
  if(!topiarist.isA(argName, String)) throw new TypeError('argName argument must be a String');

  return new ArgVerifier(this, argName, this.arguments[this.argIndex++]);
};

module.exports = ArgsVerifier;
