'use strict';

var sinon = require('sinon');
var typester = require('../../lib/typester');
var ArgumentError = typester.ArgumentError;

describe('typester', function() {
	describe('incorrect usage', function() {
		it('throws a TypeError if createVerifier() is passed something other than a function', function() {
			(function() {
				typester.createVerifier(true)
			}).should.throw('verifications argument must be a function');

			(function() {
				typester.createVerifier(true)
			}).should.throw(TypeError);
		});
	});

	describe('validation', function() {
		it('throws an ArgumentError if we try to validate a non-existent argument', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('num').isA(Number);
			});

			function func(num) {
				verifyArgs(num);
			}

			func.should.throw('num argument must be provided');
			func.should.throw(ArgumentError);
			func.bind(func, 10).should.not.throw();
		});

		it('throws an ArgumentError if we try to validate a subsequent non-existent argument', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('bool').isA(Boolean)
				verify('num').isA(Number);
			});

			function func(bool, num) {
				verifyArgs(bool, num)
			}

			func.bind(func, true).should.throw('num argument must be provided');
			func.bind(func, true).should.throw(ArgumentError);
			func.bind(func, true, 10).should.not.throw();
		});

		it('throws a TypeError if we try to validate a provided argument is of the wrong type', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('num').isA(Number);
			});

			function func() {
				verifyArgs(true);
			}

			func.should.throw(TypeError);
			func.should.throw('num argument must be a Number');
		});

		it('does not require optional arguments to be provided, but throws if they are incorrect', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('bool').isA(Boolean);
				verify('num').optionally.isA(Number);
			});

			function func(bool, num) {
				verifyArgs(bool, num);
			}

			func.bind(func, true).should.not.throw();
			func.bind(func, true, 10).should.not.throw();
			func.bind(func, true, '10').should.throw(TypeError);
			func.bind(func, true, '').should.throw(TypeError);
			func.bind(func, true, []).should.throw(TypeError);
		});

		it('allows mandatory arguments to appear after an optional argument', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('num').optionally.isA(Number);
				verify('bool').isA(Boolean);
			});

			function func(num, bool) {
				verifyArgs(num, bool);
			}

			func.bind(func, null, true).should.not.throw();
			func.bind(func, undefined, true).should.not.throw();
			func.bind(func, null).should.throw(ArgumentError);
			func.bind(func, null, {}).should.throw(TypeError);
			func.bind(func, '10', true).should.throw(TypeError);
			func.bind(func, '10', true).should.throw('num argument must be a Number');
		});

		it('throws an error if not all of the arguments were verified', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('bool').isA(Boolean);
				verify('num').optionally.isA(Number);
			});

			function func(bool, num, x) {
				verifyArgs(bool, num, x);
			}

			func.bind(func, true, 10, 'text').should.throw(ArgumentError);
			func.bind(func, true, 10, 'text').should.throw('only 2 argument(s) verified but 3 were provided: [true, 10, text]');
		});
	});

	describe('hotspotting', function() {
		var clock;

		beforeEach(function() {
			clock = sinon.useFakeTimers();
		});

		afterEach(function() {
			clock.restore();
		});

		it('disables type verification once 100 invocations have ocurred in less than 100ms', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('bool').isA(Boolean);
			});

			function func(bool) {
				verifyArgs(bool);
			}

			var validInvocation = func.bind(func, true);
			var invalidInvocation = func.bind(func, 10);

			for(var i = 0; i < 100; ++i) {
				validInvocation.should.not.throw();
				clock.tick(1);
			}

			invalidInvocation.should.not.throw();
		});

		it('does not disable type verification if less than 100 invocations have ocurred', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('bool').isA(Boolean);
			});

			function func(bool) {
				verifyArgs(bool);
			}

			var validInvocation = func.bind(func, true);
			var invalidInvocation = func.bind(func, 10);

			for(var i = 0; i < 99; ++i) {
				validInvocation.should.not.throw();
			}

			invalidInvocation.should.throw(TypeError);
		});

		it('does not disable type verification if the 100 invocations took greater than or equal to 100ms', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('bool').isA(Boolean);
			});

			function func(bool) {
				verifyArgs(bool);
			}

			var validInvocation = func.bind(func, true);
			var invalidInvocation = func.bind(func, 10);

			for(var i = 0; i < 99; ++i) {
				validInvocation.should.not.throw();
				clock.tick(1);
			}
			clock.tick(2);
			validInvocation.should.not.throw();

			invalidInvocation.should.throw(TypeError);
		});

		it('does not disable type verification if any of the 100 invocations failed', function() {
			var verifyArgs = typester.createVerifier(function(verify) {
				verify('bool').isA(Boolean);
			});

			function func(bool) {
				verifyArgs(bool);
			}

			var validInvocation = func.bind(func, true);
			var invalidInvocation = func.bind(func, 10);

			for(var i = 0; i < 99; ++i) {
				validInvocation.should.not.throw();
			}
			invalidInvocation.should.throw(TypeError);

			invalidInvocation.should.throw(TypeError);
		});
	});
});
