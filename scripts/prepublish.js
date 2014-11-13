'use strict';

var build = require('dchambers-lib-build-tool');

build.bundleDeps(
	build.bundle('typester.js', ['./lib/global-typester.js']),
	build.bundle('typester-spec-tests.js', ['./spec/test/tests.spec.js'])
);
