'use strict';

var topiarist = require('topiarist');

function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message;
}
topiarist.extend(ArgumentError, Error);

module.exports = ArgumentError;
