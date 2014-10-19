var ArgVerifier = require('./ArgVerifier');

function ArgsVerifier(arguments, verifiers) {
  this.arguments = arguments;
  this.verifiers = verifiers;
}

ArgsVerifier.prototype.verify = function(argName) {
  return new ArgVerifier(this, argName, this.arguments.shift());
};

module.exports = ArgsVerifier;
