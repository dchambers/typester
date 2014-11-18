'use strict';

var TopiaristVerifier = require('./verifiers/TopiaristVerifier');
var NumberVerifier = require('./verifiers/NumberVerifier');
var NonEmptyVerifier = require('./verifiers/NonEmptyVerifier');
var ArgumentError = require('./ArgumentError');
var ValidationError = require('./ValidationError');
var Typester = require('./Typester');

var typester = new Typester();
typester.addVerifier(new TopiaristVerifier());
typester.addVerifier(new NumberVerifier());
typester.addVerifier(new NonEmptyVerifier());

module.exports = typester;
exports.ArgumentError = ArgumentError;
exports.ValidationError = ValidationError;
