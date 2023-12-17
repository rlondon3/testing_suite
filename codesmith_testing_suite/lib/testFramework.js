// testFramework.js

const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const http = require('http');
const getTestResults = require('./testResultsFormatter');

// Global variables to store test-related information
global.testSuites = [];
global.testCount = -1;
global.afterAllFunctions = [];
global.beforeEachFunctions = [];
global.afterEachFunctions = [];
global.beforeAllFunctions = [];
global.testResults = {}; // Global variable to store test results

/**
 * Define a test suite.
 * @param {string} suiteName - The name of the test suite.
 * @param {function} suiteFunction - The function containing test cases.
 */
function describe(suiteName, suiteFunction) {
	const tests = [];
	// Callback function to capture test cases within the suite
	suiteFunction((testName, testFunction) => {
		tests.push({ name: testName, func: testFunction });
	});
	global.testSuites.push({ suiteName, tests });
}

/**
 * Run all the defined test suites.
 */
function runTests() {
	// Inside the runTests function
	for (const suite of global.testSuites) {
		console.log(
			`\x1b[38;5;33mRunning Codesmith Testing Suite: \x1b[38;5;46m ${suite.suiteName}\x1b[0m`
		);
		for (const test of suite.tests) {
			try {
				// Execute beforeAll functions before the first test in the suite
				if (global.testCount === -1) {
					global.beforeAllFunctions.forEach((beforeAllFunction) => {
						beforeAllFunction();
					});
				}

				// Execute beforeEach functions before each test
				global.beforeEachFunctions.forEach((beforeEachFunction) => {
					beforeEachFunction();
				});

				global.testCount++;
				test.func();

				// Update the test results object after each test
				global.testResults[suite.suiteName] = global.testResults[
					suite.suiteName
				] || { tests: [] };
				global.testResults[suite.suiteName].tests.push({
					name: test.name,
					passed: true, // Assuming the test passed for now, modify as needed
				});

				console.log(`  \x1b[38;5;46m✓ ${test.name}\x1b[0m`);
			} catch (error) {
				// Update the test results object after each test (on failure)
				global.testResults[suite.suiteName] = global.testResults[
					suite.suiteName
				] || { tests: [] };
				global.testResults[suite.suiteName].tests.push({
					name: test.name,
					passed: false,
				});

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

	// Get test results HTML
	const testResultsHTML = getTestResults();

	// Create "test-results" folder if it doesn't exist
	const folderPath = path.join(__dirname, 'test-results');
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}

	// Write HTML to a file in the "test-results" folder (e.g., results.html)
	const filePath = path.join(folderPath, 'results.html');
	fs.writeFileSync(filePath, testResultsHTML);

	console.log(`Test results saved to ${filePath}`);
	startHttpServer();
}

/**
 * Define a test case.
 * @param {string} testName - The name of the test case.
 * @param {function} testFunction - The function containing the test logic.
 */
function test(testName, testFunction) {
	try {
		testFunction();
		console.log(`  ✓ ${testName}`);
	} catch (error) {
		console.error(`  ✗ ${testName}\n    ${error.message}`);
	}
}

/**
 * Register a function to be executed after all tests.
 * @param {function} afterAllFunction - The function to be executed after all tests.
 */
function afterAll(afterAllFunction) {
	global.afterAllFunctions.push(afterAllFunction);
}

/**
 * Register a function to be executed before each test.
 * @param {function} beforeEachFunction - The function to be executed before each test.
 */
function beforeEach(beforeEachFunction) {
	global.beforeEachFunctions.push(beforeEachFunction);
}

/**
 * Register a function to be executed after each test.
 * @param {function} afterEachFunction - The function to be executed after each test.
 */
function afterEach(afterEachFunction) {
	global.afterEachFunctions.push(afterEachFunction);
}

/**
 * Register a function to be executed before all tests.
 * @param {function} beforeAllFunction - The function to be executed before all tests.
 */
function beforeAll(beforeAllFunction) {
	global.beforeAllFunctions.push(beforeAllFunction);
}

/**
 * Start an HTTP server to serve the test results HTML.
 */
function startHttpServer() {
	const server = http.createServer((req, res) => {
		// Serve the HTML file dynamically with added styles and scripts
		const filePath = path.join(__dirname, 'test-results', 'results.html');
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('Not Found');
				return;
			}

			const $ = cheerio.load(data);

			// Add the link to Bootstrap CSS in the head of the HTML
			$('head').append(
				'<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css" />'
			);

			// Add the scripts to the end of the body in the HTML
			$('body').append(`
                <script src="node_modules/jquery/dist/jquery.min.js"></script>
                <script src="node_modules/popper.js/dist/umd/popper.min.js"></script>
                <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
                <script src="node_modules/mdbootstrap/js/mdb.min.js"></script>
            `);

			// Respond with the updated HTML
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end($.html());
		});
	});

	// Start the server with a dynamically assigned port
	server.listen(0, () => {
		const PORT = server.address().port;
		console.log(`Server running at http://localhost:${PORT}/`);
	});
}

/**
 * Function to update the test results object after each test.
 * @param {string} suiteName - The name of the test suite.
 * @param {string} testName - The name of the test case.
 * @param {boolean} passed - Whether the test passed or failed.
 * @returns {object} - The updated test results object.
 */
function getUpdatedTestResults(suiteName, testName, passed) {
	// Logic to update global.testResults with the result of the current test
	if (!global.testResults[suiteName]) {
		global.testResults[suiteName] = { tests: [] };
	}

	global.testResults[suiteName].tests.push({ name: testName, passed });

	return global.testResults;
}

// Expose functions and variables globally for use in other modules
global.describe = describe;
global.runTests = runTests;
global.test = test;
global.getTestCount = () => global.testCount;
global.afterAll = afterAll;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;

module.exports = {
	describe,
	runTests,
	test,
	getTestCount,
	afterAll,
	beforeEach,
	afterEach,
	beforeAll,
};
