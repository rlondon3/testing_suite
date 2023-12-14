global.testSuites = [];

function describe(suiteName, suiteFunction) {
	const tests = [];
	suiteFunction((testName, testFunction) => {
		tests.push({ name: testName, func: testFunction });
	});
	global.testSuites.push({ suiteName, tests });
}

function runTests() {
	for (const suite of global.testSuites) {
		console.log(
			`\x1b[38;5;33mRunning Codesmith Testing Suite: \x1b[38;5;46m ${suite.suiteName}\x1b[0m`
		);
		for (const test of suite.tests) {
			try {
				test.func();
				console.log(`  \x1b[38;5;46m✓ ${test.name}\x1b[0m`);
			} catch (error) {
				console.error(
					`  \x1b[38;5;196m✗ \x1b[38;5;196m${test.name}\n    ${error.message}\x1b[0m`
				);
			}
		}
	}
}

function test(testName, testFunction) {
	try {
		testFunction();
		console.log(`  ✓ ${testName}`);
	} catch (error) {
		console.error(`  ✗ ${testName}\n    ${error.message}`);
	}
}

global.describe = describe;
global.runTests = runTests;
global.test = test;
