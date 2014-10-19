var build = require('dchambers-lib-build-tool');
build.karmaTest('Browser Tests', ['dist/typester-spec-tests.js'], ['Firefox', 'Chrome_ES6'], true);
