[![Build Status](https://travis-ci.org/dchambers/typester.png)](https://travis-ci.org/dchambers/typester)

# Typester

Fluent type verification for JavaScript.

## Introduction

Typester is inspired by the [check-types](https://www.npmjs.org/package/check-types) library, but seeks to improve it by:

  * Using a fluent declarative syntax that makes the type checking code easier to read, reducing the impulse developers otherwise have to unit-test their type verification code.
  * Throwing appropriately typed errors so that developers that still do want to unit-test their type-verification code can easily do so.
  * Providing rich textual error messages that inform developers why an argument has been deemed to be invalid.
  * Using a smaller set of verification methods to do the same thing.
  * Leveraging [topiarist](https://github.com/BladeRunnerJS/topiarist) to:
    * Allow a single `isA()` check to be used for what would otherwise have to be done with both `instanceof` and `typeof()`checks, as appropriate.
    * Provide a `fulfills()` method that can verify any object using shape-based duck typing.
    *  Allow `isA()` checks to efficiently verify multiple inheritance (e.g. sand-boxed mix-ins and implemented interfaces) for applications that themselves used [topiarist](https://github.com/BladeRunnerJS/topiarist) to set these up.
  * Failing if a method is invoked with more arguments than are expected.

Here's how you might use Typester to implement `addEventListener()`:

``` javascript
var using = require('typester').using;

Window.prototype.addEventListener = function(target, listener, useCapture) {
  using(arguments)
    .verify('target').fulfills(Postable)
    .verify('listener').isA(Function)
    .verify('useCapture').optionally.isA(Boolean);

  // implement the actual method...
};
```
Some things to note here:

  * The `isA()` method can be used to do both `instanceof` checks against objects, and `typeof` checks against literal values.
  * The `fulfills()` method can be used do shape-based checks.
  * The `optionally` modifier can be used for optional arguments.
  * It's the developer's responsibility to ensure the `verify()` statements are performed in the correct order &mdash; the provided argument name is only used for informational purposes when an error is thrown.
  * it's the developer's responsibility to ensure that verifications are provided for all arguments &mdash; otherwise an error will be thrown.

## Verifiers

Here's the list of core _verifiers_ you can use in Typester:

  * `isA()`
  * `classIsA()`
  * `fulfills()`
  * `classFulfills()`

and here's the list of _validating-verifiers_ that come with Typester:

  * `object()`
  * `number()`
  * `positiveNumber()`
  * `negativeNumber()`
  * `integerNumber()`
  * `nonEmptyString()`
  * `nonEmptyArray()`

Validating verifiers are usually some additional check over and above a simple `isA()` invocation. The `object()` and `number()` verifiers are worth mentioning, as these enhance `isA(Object)` and `isA(Number)` respectively. By ensuring that `typeof(object) == true` in the case of `object()`, and by ensuring failure for `NaN`, `NEGATIVE_INFINITY` and `POSITIVE_INFINITY` in the case of `number()`.


## Custom verifiers

Custom _verifiers_ can be added using the `typester.addVerifier()` method. For example, here's how you might create a custom _validating-verifier_ for email addresses:

``` javascript
var typester = require('typester');
var ValidationError = typester.ValidationError;

typester.addVerifier({
  isEmailAddress: function() {
    this.isA(String);
    if(this.argValue.indexOf('@') == -1) throw new ValidationError(this.argName +
      ' argument must be a valid email address');
  }
})
```

Subsequently, our custom `isEmailAddress()` verifier might be used like this:

``` javascript
var using = require('typester').using;

function Person(name, email) {
  using(arguments)
    .verify('name').isA(String)
    .verify('email').isEmailAddress();

  this.name = name;
  this.email = email;
}
```


## Error Types

Typester verifications that fail will always throw one of the following four error types:

  * `ArgumentError`: if a mandatory argument isn't provided.
  * `TypeError`: if `isA()`, `classIsA()`, `fulfills()` or `classFulfills()` fail.
  * `ValidationError`: if an argument is correctly typed but fails further validation.
  * `RangeError`: a special case of `ValidationError` for _validating-verifiers_ like `positiveNumber()` and `negativeNumber()`.


## Performance

Typester has been written with performance in mind. On my machine using Chrome, I found that it adds about a tenth of a microsecond of execution-time per verified argument, when compared with doing the same verification using plain JavaScript.


## Installing

### NPM Instructions

If you use NPM then you should install as follows:

``` shell
npm install typester
```

and start making use of typester using the following code:

``` javascript
var using = require('typester').using;
```

### Alternate Instructions

Alternatively, you can download the latest release, unzip, and start making use of typester using the following code:

``` html
<script src="dist/typester.js"></script>
```


# Running Tests

### NPM Instructions

If you've installed via NPM you can run the tests as follows:

``` shell
npm test
```

which runs all the tests in Node.js (using _mocha_), and the main spec tests in Firefox and Chrome (using _karma_). You can run the tests against Firefox and Chrome, with automatic re-runs as files are changed, using the command:

``` shell
npm run test-browser
```

Finally, you also have the option to manually open 'spec/index.html' in the browser of your choice. To ensure that changes to the source code automatically cause the bundles to be re-built, you can run:

``` shell
npm run watch
```

### Alternate Instructions

If you haven't installed via NPM then there isn't too much point to running the tests since any changes to the source code won't be reflected. However, if you want to anyway, you can run the tests by opening 'spec/index.html' in the browser of your choice.
