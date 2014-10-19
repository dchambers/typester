var topiarist = require('topiarist');

function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message;
}
topiarist.extend(ArgumentError, Error);
ArgumentError.prototype.constructor = ArgumentError;

module.exports = ArgumentError;
