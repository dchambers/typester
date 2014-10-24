var ArgumentError = require('./ArgumentError');
var topiarist = require('topiarist');

function verifierMethod(verifier, methodName) {
  return function() {
    if(!this.skipVerification) {
      if(this.argValue === undefined) throw new ArgumentError(this.argName + ' argument must be provided.');

      verifier[methodName].apply(this, arguments);
    }

    if(this.argsVerifier.argIndex < this.argsVerifier.arguments.length) {
      this.argsVerifier.constructor.pendingVerifier = this.argsVerifier;
    }

    return this.argsVerifier;
  };
}

function ArgVerifier(argsVerifier, argName, argValue) {
  this.argsVerifier = argsVerifier;
  this.argName = argName;
  this.argValue = argValue;
}

ArgVerifier.addVerifier = function(verifier) {
  for(var methodName in verifier) {
    ArgVerifier.prototype[methodName] = verifierMethod(verifier, methodName);
  }
};

Object.defineProperty(ArgVerifier.prototype, 'optionally', {
  get: function optionally() {
    if((this.argValue === undefined) || (this.argValue === null)) {
      this.skipVerification = true;
    }

    return this;
  }
});

module.exports = ArgVerifier;
