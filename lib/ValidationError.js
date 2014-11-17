'use strict';

var topiarist = require('topiarist');

function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message;
}
topiarist.extend(ValidationError, Error);

module.exports = ValidationError;
