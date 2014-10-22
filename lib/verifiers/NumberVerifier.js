var ValidationError = require('../ValidationError');

function NumberVerifier() {
}

NumberVerifier.prototype.number = function() {
  this.isA(Number);
  if((Number.isNaN(this.argValue)) || (this.argValue == Number.POSITIVE_INFINITY) ||
    (this.argValue == Number.NEGATIVE_INFINITY)) throw new ValidationError(this.argName + ' argument must be a real number.');
};

NumberVerifier.prototype.positiveNumber = function() {
  this.number();
  if(this.argValue <= 0) throw new ValidationError(this.argName + ' argument must be a positive number.');
};

NumberVerifier.prototype.negativeNumber = function() {
  this.number();
  if(this.argValue >= 0) throw new ValidationError(this.argName + ' argument must be a negative number.');
};

NumberVerifier.prototype.integerNumber = function() {
  this.number();
  if((this.argValue % 1) != 0) throw new ValidationError(this.argName + ' argument must be an integer number.');
};

module.exports = NumberVerifier;
