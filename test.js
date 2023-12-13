// Define the test function
const test = (testName, testFunction) => {
	try {
		// Run the test function
		testFunction();
		console.log(`  \x1b[38;5;46m✓ ${testName}\x1b[0m`);
	} catch (error) {
		console.error(
			`  \x1b[38;5;196m✗ \x1b[38;5;196m${testName}\n    ${error.message}\x1b[0m`
		);
	}
};

module.exports = test;
