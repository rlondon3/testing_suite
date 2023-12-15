// testResultsFormatter.js

// Function to get test results dynamically
function getTestResults() {
	const testResults = global.testResults || {};

	// Generate HTML dynamically based on test results
	const suiteResultsHTML = Object.keys(testResults).map((suiteName) => {
		const suite = testResults[suiteName];
		const suiteHeader = `<h2>Test Suite: ${suiteName}</h2>`;

		// Generate HTML for each test case in the suite
		const testCasesHTML = suite.tests.map((test) => {
			const status = test.passed ? 'Passed' : 'Failed';
			const testCaseHTML = `<p>Test Case ${test.name}: ${status}</p>`;
			return testCaseHTML;
		});

		return suiteHeader + testCasesHTML.join('');
	});

	return `<div>${suiteResultsHTML.join('')}</div>`;
}

// Expose the function for use in other modules
module.exports = getTestResults;
