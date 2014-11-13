'use strict';

var build = require('dchambers-lib-build-tool');

Promise.resolve().then(function() {
  return build.mochaTest('Spec Tests', ['spec/test/tests.spec.js']);
}).then(function() {
  return build.karmaTest('Browser Tests', ['dist/typester-spec-tests.js'], ['Firefox', 'Chrome_Travis_ES6']);
}).catch(function(exitCode) {
	console.log('Exiting with status ' + exitCode);
	process.exit(exitCode);
});
