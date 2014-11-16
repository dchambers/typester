'use strict';

var ArgVerifier = require('./ArgVerifier');
var TopiaristVerifier = require('./verifiers/TopiaristVerifier');
var NumberVerifier = require('./verifiers/NumberVerifier');
var NonEmptyVerifier = require('./verifiers/NonEmptyVerifier');
var ArgumentError = require('./ArgumentError');
var ValidationError = require('./ValidationError');

ArgVerifier.addVerifier(new TopiaristVerifier());
ArgVerifier.addVerifier(new NumberVerifier());
ArgVerifier.addVerifier(new NonEmptyVerifier());

exports.createVerifier = function(verifications) {
  if(typeof(verifications) != 'function') throw new TypeError('verifications argument must be a function');

  var state = {
    hotspot:false
  };

  return function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    if(!state.hotspot) {
      doVerifyArgs(state, verifications, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    }
  };
};

exports.addVerifier = function(verifier) {
  ArgVerifier.addVerifier(verfier);
};

function doVerifyArgs(state, verifications, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
  state.argIndex = 0;

  if(state.invocationCount === undefined) {
    state.invocationCount = 0;
    state.firstInvocation = Date.now();
  }
  else {
    if(state.invocationCount++ > 100) {
      var currentTime = Date.now();

      if((currentTime - state.firstInvocation) <= 100) {
        state.hotspot = true;
      }
      else {
        state.invocationCount = 0;
        state.firstInvocation = currentTime;
      }
    }
  }

  verifications(createVerifyFunction(state, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9));

  var numArgs = argsLength(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
  if(numArgs > state.argIndex) {
    var args = [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9];
    var usedArgs = args.slice(0, numArgs);

    throw new ArgumentError('only ' + state.argIndex + ' argument(s) verified but ' +
      numArgs + ' were provided: [' + usedArgs.join(', ') + ']');
  }
}

function createVerifyFunction(state, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
  return function(argName) {
    if(typeof(argName) != 'string') throw new TypeError('argName argument must be a String');

    var nextArg;
    switch(state.argIndex++) {
      case 0:
        nextArg = arg0;
        break;

      case 1:
        nextArg = arg1;
        break;

      case 2:
        nextArg = arg2;
        break;

      case 3:
        nextArg = arg3;
        break;

      case 4:
        nextArg = arg4;
        break;

      case 5:
        nextArg = arg5;
        break;

      case 6:
        nextArg = arg6;
        break;

      case 7:
        nextArg = arg7;
        break;

      case 8:
        nextArg = arg8;
        break;

      case 9:
        nextArg = arg9;
        break;
    }

    return new ArgVerifier(argName, nextArg);
  };
}

function argsLength(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
  if(arg0 === undefined) {
    return 0;
  }
  else if(arg1 === undefined) {
    return 1;
  }
  else if(arg2 === undefined) {
    return 2;
  }
  else if(arg3 === undefined) {
    return 3;
  }
  else if(arg4 === undefined) {
    return 4;
  }
  else if(arg5 === undefined) {
    return 5;
  }
  else if(arg6 === undefined) {
    return 6;
  }
  else if(arg7 === undefined) {
    return 7;
  }
  else if(arg8 === undefined) {
    return 8;
  }
  else if(arg9 === undefined) {
    return 9;
  }
}

exports.ArgumentError = ArgumentError;
exports.ValidationError = ValidationError;
