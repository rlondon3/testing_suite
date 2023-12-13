// Define the test function
const test = (testName, testFunction) => {
	try {
		// Run the test function
		testFunction();
		console.log(`  ✓ ${testName}`); // Log success if no errors are thrown
	} catch (error) {
		console.error(`  ✗ ${testName}\n    ${error.message}`); // Log failure with error message
	}
};

module.exports = test;
