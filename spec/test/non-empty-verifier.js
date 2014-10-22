var typester = require('../../lib/typester');
var ValidationError = typester.ValidationError;
var using = typester.using;

describe('non-empty-verifier', function() {
  describe('nonEmptyString', function() {
    it('throws a TypeError if something other than a string is provided', function() {
      function func(str) {
        using(arguments)
          .verify('str').nonEmptyString();
      }

      func.bind(func, true).should.throw(TypeError);
      func.bind(func, true).should.throw('str argument must be a String');
    });

    it('throws a ValidationError if an empty string is provided', function() {
      function func(str) {
        using(arguments)
          .verify('str').nonEmptyString();
      }

      func.bind(func, '').should.throw(ValidationError);
      func.bind(func, '').should.throw('str argument must be a non-empty string');
      func.bind(func, 'x').should.not.throw();
    });
  });

  describe('nonEmptyArray', function() {
    it('throws a TypeError if something other than an array is provided', function() {
      function func(list) {
        using(arguments)
          .verify('list').nonEmptyArray();
      }

      func.bind(func, true).should.throw(TypeError);
      func.bind(func, true).should.throw('list argument must be a Array');
    });

    it('throws a ValidationError if an empty array is provided', function() {
      function func(list) {
        using(arguments)
          .verify('list').nonEmptyArray();
      }

      func.bind(func, new Array()).should.throw(ValidationError);
      func.bind(func, []).should.throw(ValidationError);
      func.bind(func, []).should.throw('list argument must be a non-empty array');
      func.bind(func, [1]).should.not.throw();
    });
  });
});
