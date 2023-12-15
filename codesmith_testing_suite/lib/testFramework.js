global.testSuites = [];
global.testCount = -1;
global.afterAllFunctions = []; // Store functions to be executed after all tests
global.beforeEachFunctions = []; // Store functions to be executed before each test
global.afterEachFunctions = []; // Store functions to be executed after each test

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
				// Execute beforeEach functions before each test
				global.beforeEachFunctions.forEach((beforeEachFunction) => {
					beforeEachFunction();
				});

				global.testCount++;
				test.func();

				console.log(`  \x1b[38;5;46m✓ ${test.name}\x1b[0m`);
			} catch (error) {
				console.error(
					`  \x1b[38;5;196m✗ \x1b[38;5;196m${test.name}\n    ${error.message}\x1b[0m`
				);
			} finally {
				// Execute afterEach functions after each test
				global.afterEachFunctions.forEach((afterEachFunction) => {
					afterEachFunction();
				});
			}
		}
	}

	// Execute afterAll functions after all tests
	global.afterAllFunctions.forEach((afterAllFunction) => {
		afterAllFunction();
	});
}

function test(testName, testFunction) {
	try {
		testFunction();
		console.log(`  ✓ ${testName}`);
	} catch (error) {
		console.error(`  ✗ ${testName}\n    ${error.message}`);
	}
}

// Function to add an afterAll function
function afterAll(afterAllFunction) {
	global.afterAllFunctions.push(afterAllFunction);
}

// Function to add a beforeEach function
function beforeEach(beforeEachFunction) {
	global.beforeEachFunctions.push(beforeEachFunction);
}

// Function to add an afterEach function
function afterEach(afterEachFunction) {
	global.afterEachFunctions.push(afterEachFunction);
}

global.describe = describe;
global.runTests = runTests;
global.test = test;
global.getTestCount = () => global.testCount;
global.afterAll = afterAll;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
