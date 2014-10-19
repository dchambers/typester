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

Here's how you might use Typester to implement `addEventListener()`:

``` javascript
var using = require('typester').using;

Window.prototype.addEventListener = function(target, listener, useCapture) {
  using(arguments)
    .verify('target').fulfills(Postable)
    .verify('listener').isA(Function)
    .verify('useCapture').maybe.isA(Boolean);

  // implement the actual method...
};
```
Some things to note here:

  * The `isA()` method can be used to do both `instanceof` checks against objects, and `typeof` checks against literal values.
  * The `fulfills()` method can be used do shape-based checks.
  * The `maybe` modifier can be used for optional arguments.

## Verifiers

Here's the core list of _verifiers_ you can use in Typester:

  * `isA()`
  * `classIsA()`
  * `fulfills()`
  * `classFulfills()`

and here's the list of _validating-verifiers_ that come with Typester:

  * `positiveNumber()`
  * `negativeNumber()`
  * `integerNumber()`
  * `floatNumber()`
  * `nonEmptyString()`
  * `nonEmptyArray()`

Validating verifiers are usually some additional check over and above a lone `isA()` invocation.


## Custom verifiers

Custom _verifiers_ can be added using the `typester.addVerifier()` method. For example, here's how you might create a custom _validating-verifier_ for verifying email addresses:

``` javascript
var typester = require('typester');
var ValidationError

typester.addVerifier({
  email: function(argName, argValue) {
    this.isA(argValue, String);
    if(arg.indexOf('@') == -1) throw new ValidationError(argName +
      ' argument must be a valid email address');
  }
})
```

## Error Types

Typester verifications that fail will always throw one of the following four error types:

  * `ArgumentError`: if a mandatory argument isn't provided.
  * `TypeError`: if `isA()`, `classIsA()`, `fulfills()` or `classFulfills()` fail.
  * `ValidationError`: if an argument is correctly typed but fails further validation.
  * `RangeError`: a special case of `ValidationError` for _validating-verifiers_ like `positiveNumber()` and `negativeNumber()`.
