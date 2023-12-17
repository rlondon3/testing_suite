//testRunner.js
const fs = require('fs');
const path = require('path');

// Import the test framework
require('./testFramework');

// Function to add Bootstrap and MDBootstrap styles to HTML
function addBootstrapStyles(htmlContent) {
	const bootstrapLink =
		'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">';
	const mdBootstrapLink =
		'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mdbootstrap@4.19.1/dist/css/mdb.min.css">';

	// Check if the styles are already present
	if (
		!htmlContent.includes(bootstrapLink) ||
		!htmlContent.includes(mdBootstrapLink)
	) {
		// Add Bootstrap and MDBootstrap links before the first </head> tag
		htmlContent = htmlContent.replace(
			'</head>',
			`${bootstrapLink}\n${mdBootstrapLink}\n</head>`
		);
	}

	return htmlContent;
}

// Find the path to the results.html file
const htmlPath = path.join(__dirname, 'test-results', 'results.html');

// Read the existing HTML content
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Add Bootstrap and MDBootstrap styles
htmlContent = addBootstrapStyles(htmlContent);

// Write the updated HTML content back to the file
fs.writeFileSync(htmlPath, htmlContent, 'utf8');

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
