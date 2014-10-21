var ArgumentError = require('./ArgumentError');
var topiarist = require('topiarist');

function ArgVerifier(argsVerifier, argName, argValue) {
  this.argsVerifier = argsVerifier;
  this.argName = argName;
  this.argValue = argValue;
}

module.exports = ArgVerifier;
