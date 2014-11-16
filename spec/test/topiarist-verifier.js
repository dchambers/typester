'use strict';

var topiarist = require('topiarist');
var typester = require('../../lib/typester');
var using = typester.using;
var verify = typester.verify;
var ArgumentError = typester.ArgumentError;

topiarist.install();

describe('topiarist-verifier', function() {
  function Class() {
  }

  Class.prototype.classMethod = function() {
  };

  function SubClass() {
  }
  SubClass.extends(Class);

  SubClass.prototype.subClassMethod = function() {
  };

  describe('isA', function() {
    it('can be used to verify both literal and non-literal objects', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('str').isA(String);
      });

      function func(str) {
        verifyArgs(str);
      }

      func.bind(func, '').should.not.throw();
      func.bind(func, new String('')).should.not.throw();
      func.bind(func, {}).should.throw(TypeError);
      func.bind(func, {}).should.throw('str argument must be a String.');
    });

    it('can be used to verify objects created from custom classes', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('obj').isA(Class);
      });

      function func(obj) {
        verifyArgs(obj);
      }

      func.bind(func, new Class()).should.not.throw();
      func.bind(func, {}).should.throw(TypeError);
    });
  });

  describe('classIsA', function() {
    it('can be used to verify that classes would produce instance variables that pass the isA() check', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('classRef').classIsA(Class);
      });

      function func(classRef) {
        verifyArgs(classRef);
      }

      func.bind(func, Class).should.not.throw();
      func.bind(func, SubClass).should.not.throw();
      func.bind(func, function() {}).should.throw(TypeError);
      func.bind(func, function() {}).should.throw('classRef argument must be a Class class.');
    });
  });

  describe('fulfills', function() {
    it('can be used to verify an objects shape', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('obj').fulfills(SubClass);
      });

      function func(obj) {
        verifyArgs(obj);
      }

      func.bind(func, new SubClass()).should.not.throw();
      func.bind(func, {classMethod: function() {}, subClassMethod: function() {}}).should.not.throw();
      func.bind(func, new Class()).should.throw(TypeError);
      func.bind(func, new Class()).should.throw('obj argument must fulfill SubClass.');
    });
  });

  describe('classFulfills', function() {
    it('can be used to verify that classes would produce instance variables that pass the fulfills() check', function() {
      var verifyArgs = typester.createVerifier(function(verify) {
        verify('classRef').classFulfills(SubClass);
      });

      function func(classRef) {
        verifyArgs(classRef);
      }

      function MyClass() {
      }

      MyClass.prototype.classMethod = function() {
      };

      MyClass.prototype.subClassMethod = function() {
      };

      func.bind(func, SubClass).should.not.throw();
      func.bind(func, MyClass).should.not.throw();
      func.bind(func, Class).should.throw(TypeError);
      func.bind(func, Class).should.throw('classRef argument must fulfill SubClass class.');
    });
  });
});
