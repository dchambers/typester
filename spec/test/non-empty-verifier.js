'use strict';

var typester = require('../../lib/typester');
var ValidationError = typester.ValidationError;
var using = typester.using;
var verify = typester.verify;

describe('non-empty-verifier', function() {
  describe('nonEmptyString', function() {
    it('throws a TypeError if something other than a string is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('str').nonEmptyString();
      });

      function func(str) {
        verifyArgs(str);
      }

      func.bind(func, true).should.throw(TypeError);
      func.bind(func, true).should.throw('str argument must be a String.');
    });

    it('throws a ValidationError if an empty string is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('str').nonEmptyString();
      });

      function func(str) {
        verifyArgs(str);
      }

      func.bind(func, '').should.throw(ValidationError);
      func.bind(func, '').should.throw('str argument must be a non-empty string.');
      func.bind(func, 'x').should.not.throw();
    });
  });

  describe('nonEmptyArray', function() {
    it('throws a TypeError if something other than an array is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('list').nonEmptyArray();
      });

      function func(list) {
        verifyArgs(list);
      }

      func.bind(func, true).should.throw(TypeError);
      func.bind(func, true).should.throw('list argument must be a Array.');
    });

    it('throws a ValidationError if an empty array is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('list').nonEmptyArray();
      });

      function func(list) {
        verifyArgs(list);
      }

      func.bind(func, new Array()).should.throw(ValidationError);
      func.bind(func, []).should.throw(ValidationError);
      func.bind(func, []).should.throw('list argument must be a non-empty array.');
      func.bind(func, [1]).should.not.throw();
    });
  });

  describe('object', function() {
    it('throws a type error if a function, string, or number is provided', function() {
        var verifyArgs = typester.createVerifier(function(verify) {
          verify('obj').object();
        });

        function func(obj) {
          verifyArgs(obj);
        }

        func.bind(func, {}).should.not.throw(ValidationError);
        func.bind(func, function() {}).should.throw(ValidationError);
        func.bind(func, 10).should.throw(ValidationError);
        func.bind(func, 'x').should.throw(ValidationError);
        func.bind(func, 'x').should.throw('obj argument must be an object.');
    });
  });
});
