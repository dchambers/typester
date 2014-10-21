var ArgVerifier = require('./ArgVerifier');

function ArgsVerifier(arguments) {
  this.arguments = arguments;
  this.argIndex = 0;
}

ArgsVerifier.prototype.verify = function(argName) {
  return new ArgVerifier(this, argName, this.arguments[this.argIndex++]);
};

module.exports = ArgsVerifier;
