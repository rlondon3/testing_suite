const fs = require('fs');
const path = require('path');

// Import the test framework
require('./testFramework');

// Find all test files in the 'test' directory
const testFiles = fs
	.readdirSync(path.join(__dirname, 'test'))
	.filter((file) => file.endsWith('.js'))
	.map((file) => path.join(__dirname, 'test', file));

// Run the tests
testFiles.forEach((file) => {
	// Import the tests from each test file
	const tests = require(file);

	// Describe the entire test suite using the file name
	describe(file, () => {
		// Iterate over the suites and describe each one
		Object.entries(tests).forEach(([suiteName, suiteFunction]) => {
			describe(suiteName, suiteFunction);
		});
	});
});

// Run all the tests
runTests();
