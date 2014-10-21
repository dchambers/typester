var typester = require('../../lib/typester');
var using = typester.using;
var ArgumentError = typester.ArgumentError;

describe('typester', function() {
	it('throws an ArgumentError if we try to validate a non-existent argument', function() {
    function func() {
      using([])
        .verify('num').isA(Number);
    }

    func.should.throw('num argument must be provided');
    func.should.throw(ArgumentError);
	});

	it('works with real function argument arrays', function() {
		function func() {
			using(arguments)
				.verify('num').isA(Number);
		}

		func.bind(func, undefined).should.throw(ArgumentError);
		func.bind(func, 10).should.not.throw();
	});

	it('throws an ArgumentError if we try to validate a subsequent non-existent argument', function() {
		function func() {
			using([true])
				.verify('bool').isA(Boolean)
				.verify('num').isA(Number);
		}

		func.should.throw('num argument must be provided');
		func.should.throw(ArgumentError);
	});

	it('throws a TypeError if we try to validate a provided argument is of the wrong type', function() {
		function func() {
			using([true])
				.verify('num').isA(Number);
		}

		func.should.throw('num argument must be a Number');
		func.should.throw(TypeError);
	});
});
