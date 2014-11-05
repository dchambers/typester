var ArgumentError = require('./ArgumentError');
var topiarist = require('topiarist');

function verifierMethod() {
  if(!this.skipVerification) {
    if(this.argValue === undefined) throw new this.ArgumentError(this.argName + ' argument must be provided.');

    this.METHOD_NAME(arg);
  }

  if(this.argsVerifier.argIndex < this.argsVerifier.arguments.length) {
    this.argsVerifier.constructor.pendingVerifier = this.argsVerifier;
  }

  return this.argsVerifier;
}
var verifierMethodStr = verifierMethod.toString().substring(verifierMethod.toString().indexOf('{') + 1, verifierMethod.toString().lastIndexOf('}'));

function ArgVerifier(argsVerifier, argName, argValue) {
  this.argsVerifier = argsVerifier;
  this.argName = argName;
  this.argValue = argValue;
}

ArgVerifier.addVerifier = function(verifier) {
  for(var methodName in verifier) {
    ArgVerifier.prototype['_' + methodName] = verifier[methodName];
    ArgVerifier.prototype[methodName] = new Function('arg', verifierMethodStr.replace('METHOD_NAME', '_' + methodName));
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

ArgVerifier.prototype.ArgumentError = ArgumentError;

module.exports = ArgVerifier;
