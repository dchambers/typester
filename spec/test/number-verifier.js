'use strict';

var typester = require('../../lib/typester');
var ValidationError = typester.ValidationError;
var using = typester.using;
var verify = typester.verify;

describe('number-verifier', function() {
  describe('number', function() {
    it('throws a TypeError if something other than a number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').number();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, true).should.throw(TypeError);
      func.bind(func, true).should.throw('num argument must be a Number');
    });

    it('throws a ValidationError if a conceptual number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').number();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, Number.NaN).should.throw(ValidationError);
      func.bind(func, Number.NaN).should.throw('num argument must be a real number');
      func.bind(func, 0).should.not.throw();
    });
  });

  describe('positiveNumber', function() {
    it('throws a TypeError if something other than a number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').positiveNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, true).should.throw('num argument must be a Number');
    });

    it('throws a ValidationError if a conceptual number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').positiveNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, Number.NaN).should.throw('num argument must be a real number');
    });

    it('throws a ValidationError if a non-positive number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').positiveNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, 1).should.not.throw();
      func.bind(func, 0.1).should.not.throw();
      func.bind(func, 0).should.throw(ValidationError);
      func.bind(func, 0).should.throw('num argument must be a positive number.');
    });
  });

  describe('negativeNumber', function() {
    it('throws a TypeError if something other than a number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').negativeNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, true).should.throw('num argument must be a Number');
    });

    it('throws a ValidationError if a conceptual number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').negativeNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, Number.NaN).should.throw('num argument must be a real number');
    });

    it('throws a ValidationError if a non-negative number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').negativeNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, -1).should.not.throw();
      func.bind(func, -0.1).should.not.throw();
      func.bind(func, 0).should.throw(ValidationError);
      func.bind(func, 0).should.throw('num argument must be a negative number.');
    });
  });

  describe('integerNumber', function() {
    it('throws a TypeError if something other than a number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').integerNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, true).should.throw('num argument must be a Number');
    });

    it('throws a ValidationError if a conceptual number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').integerNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, Number.NaN).should.throw('num argument must be a real number');
    });

    it('throws a ValidationError if a non-integer number is provided', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('num').integerNumber();
      });

      function func(num) {
        verifyArgs(num);
      }

      func.bind(func, -1).should.not.throw();
      func.bind(func, 0).should.not.throw();
      func.bind(func, 1).should.not.throw();
      func.bind(func, 0.5).should.throw(ValidationError);
      func.bind(func, 0.5).should.throw('num argument must be an integer number.');
    });
  });
});
