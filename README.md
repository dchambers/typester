# Typester

Fluent type verification for JavaScript.

## Introduction

Typester is inspired by the [check-types](https://www.npmjs.org/package/check-types) library, but seeks to improve it by:

  * Using a fluent declarative syntax that makes the type checking code easier to read, reducing the need for developers to unit-test their type verification code.
  * Throwing appropriately typed errors so that developers that do want to unit-test their type-verification code can easily do so.
  * Providing rich textual error messages by default, that inform developers what argument led to a failure, and exactly why an argument was invalid.
  * By using an advanced type-verification library ([topiarist](https://github.com/BladeRunnerJS/topiarist)) that performs shape-based type verification the first time, but uses instant tree-based verification on subsequent checks.
  * Using a smaller set of verification methods to do the same thing.

Here's how you might use Typester to implement `addEventListener()`:

```
Window.prototype.addEventListener = function(target, listener, useCapture) {
  with(arguments)
    .verify('target').fulfills(Postable)
    .verify('listener').isA(Function)
    .verify('useCapture').maybe.isA(Boolean);

  // implement the actual method...
};
```
Some things to note here:

  * The `isA()` method can be used to do both `instanceof` checks against rich objects, and `typeof` checks against
    primitive types.
  * The `fulfills()` method can be used do shape-based checks.
  * The `maybe` modifier can be used for optional arguments.

Here's the full list of verifiers you can use in Typester:

  * `isA()`
  * `classIsA()`
  * `fulfills()`
  * `classFulfills()`
  * `positiveNumber()`
  * `negativeNumber()`
  * `integerNumber()`
  * `floatNumber()`
  * `nonEmptyString()`
  * `webUrl()`
  * `gitUrl()`
  * `email()`

Typester throws the following errors, in case you wish to unit test your type-verification code:

  * `ArgumentError`: if a mandatory argument isn't provided.
  * `TypeError`: if `isA()`, `classIsA()`, `fulfills()` or `classFulfills()` fail.
  * `RangeError`: if `positiveNumber()` or `negativeNumber()` are incorrect.
  * `ValidationError`: if an argument is correclty typed but fails futher validation, for example
    as a result of `nonEmptyString()`, `webUrl()`, `gitUrl()` and `email()` throw this error.
