//testSuite.js
const describe = require('./describe');
const test = require('./test');

// Import your expect function
const expect = require('./expect');

// Example of how to use describe and test
describe('My test suite', () => {
	test('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toEqual(3);
	});

	test('checks if an array contains a specific value', () => {
		const myArray = [1, 2, 3, 4];
		expect(myArray).toHaveArrayValueOf(3);
	});

	// Add more tests as needed
});
