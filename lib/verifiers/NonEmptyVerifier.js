var ValidationError = require('../ValidationError');

function NonEmptyVerifier() {
}

NonEmptyVerifier.prototype.nonEmptyString = function() {
  this.isA(String);
  if(this.argValue === '') throw new ValidationError(this.argName + ' argument must be a non-empty string.');
};

NonEmptyVerifier.prototype.nonEmptyArray = function() {
  this.isA(Array);
  if(this.argValue.length == 0) throw new ValidationError(this.argName + ' argument must be a non-empty array.');
};

module.exports = NonEmptyVerifier;