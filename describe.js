// Define the describe function
const describe = (suiteName, suiteFunction) => {
	console.log(
		`\x1b[38;5;33mCodeSmith Test Suite: \x1b[38;5;46m ${suiteName}\x1b[0m`
	);
	suiteFunction();
};

module.exports = describe;
