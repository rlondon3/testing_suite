// Define the describe function
const describe = (suiteName, suiteFunction) => {
	console.log(`Running suite: ${suiteName}`);
	suiteFunction();
};

module.exports = describe;
