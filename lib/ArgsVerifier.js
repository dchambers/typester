var ArgVerifier = require('./ArgVerifier');

function ArgsVerifier(arguments) {
  this.arguments = arguments;
}

ArgsVerifier.prototype.verify = function(argName) {
  return new ArgVerifier(this, argName, this.arguments.shift());
};

module.exports = ArgsVerifier;
