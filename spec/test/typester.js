var typester = require('../../lib/typester');
var using = typester.using;
var ArgumentError = typester.ArgumentError;

describe('typester', function() {
	it('throws an ArgumentError if we try to validate a non-existent argument', function() {
    function func() {
      using(arguments)
        .verify('num').isA(Number);
    }

    func.should.throw('num argument must be provided');
    func.should.throw(ArgumentError);
		func.bind(func, 10).should.not.throw();
	});

	it('throws an ArgumentError if we try to validate a subsequent non-existent argument', function() {
		function func() {
			using(arguments)
				.verify('bool').isA(Boolean)
				.verify('num').isA(Number);
		}

		func.bind(func, true).should.throw('num argument must be provided');
		func.bind(func, true).should.throw(ArgumentError);
		func.bind(func, true, 10).should.not.throw();
	});

	it('throws a TypeError if we try to validate a provided argument is of the wrong type', function() {
		function func() {
			using([true])
				.verify('num').isA(Number);
		}

		func.should.throw(TypeError);
		func.should.throw('num argument must be a Number');
	});

	it('does not require optional arguments to be provided, but throws if they are incorrect', function() {
		function func() {
			using(arguments)
				.verify('bool').isA(Boolean)
				.verify('num').optionally.isA(Number);
		}

		func.bind(func, true).should.not.throw();
		func.bind(func, true, 10).should.not.throw();
		func.bind(func, true, '10').should.throw(TypeError);
		func.bind(func, true, '').should.throw(TypeError);
		func.bind(func, true, []).should.throw(TypeError);
	});

	it('allows mandatory arguments to appear after an optional argument', function() {
		function func() {
			using(arguments)
				.verify('num').optionally.isA(Number)
				.verify('bool').isA(Boolean);
		}

		func.bind(func, null, true).should.not.throw();
		func.bind(func, undefined, true).should.not.throw();
		func.bind(func, null).should.throw(ArgumentError);
		func.bind(func, null, {}).should.throw(TypeError);
		func.bind(func, '10', true).should.throw(TypeError);
		func.bind(func, '10', true).should.throw('num argument must be a Number');
	});
});
