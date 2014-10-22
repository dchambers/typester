var typester = require('../../lib/typester');
var using = typester.using;
var ArgumentError = typester.ArgumentError;

describe('topiarist-verifier', function() {
  describe('isA', function() {
    it('can be used to verify both literal and non-literal objects', function() {
      function func() {
        using(arguments)
          .verify('func').isA(String);
      }

      func.bind(func, '').should.not.throw();
      func.bind(func, new String('')).should.not.throw();
      func.bind(func, {}).should.throw(TypeError);
    });

    it('can be used to verify objects created from custom classes', function() {
      function func() {
        using(arguments)
          .verify('func').isA(Class);
      }

      function Class() {
      }

      func.bind(func, new Class()).should.not.throw();
      func.bind(func, {}).should.throw(TypeError);
    });
  });
});
