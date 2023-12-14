// testSuite.js

const expect = require('../expect');

describe('My example test suite', (test) => {
	test('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toEqual(3);
	});

	test('checks if an array contains a specific value', () => {
		const myArray = [1, 2, 3, 4];
		expect(myArray).toHaveArrayValueOf(8);
	});

	// Add an assertions test
	test('assertions test', () => {
		expect().assertions(2); // Expecting 3 assertions
	});
});
