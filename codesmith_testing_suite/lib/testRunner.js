const fs = require('fs');
const path = require('path');

require('./testFramework'); // Import the test framework

// Find all test files in the 'test' directory
const testFiles = fs
	.readdirSync(path.join(__dirname, 'test'))
	.filter((file) => file.endsWith('.js'))
	.map((file) => path.join(__dirname, 'test', file));

// Run the tests
testFiles.forEach((file) => {
	const tests = require(file);
	describe(file, () => {
		Object.entries(tests).forEach(([suiteName, suiteFunction]) => {
			describe(suiteName, suiteFunction);
		});
	});
});

runTests(); // Run all the tests
