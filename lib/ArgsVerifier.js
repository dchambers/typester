var ArgVerifier = require('./ArgVerifier');
var ArgumentError = require('./ArgumentError');

function ArgsVerifier(arguments) {
  if(arguments === undefined) throw new ArgumentError('arguments argument must be provided');

  this.arguments = arguments;
  this.argIndex = 0;
}

ArgsVerifier.prototype.verify = function(argName) {
  if(typeof(argName) != 'string') throw new TypeError('argName argument must be a String');

  return new ArgVerifier(this, argName, this.arguments[this.argIndex++]);
};

module.exports = ArgsVerifier;
