// Define a function named 'expect' that takes a single argument 'actual'
export const expect = function (actual) {
	// Return an object with several methods for making assertions
	return {
		// Define a method 'toEqual' for asserting equality between 'actual' and 'expected'
		toEqual: function (expected) {
			// Check if 'actual' is not equal to 'expected'
			if (actual !== expected) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(`Expected ${expected}, but got ${actual}`);
			}
		},
		// Define a method 'toExist' for asserting that 'actual' is neither null nor undefined
		toExist: function () {
			// Check if 'actual' is equal to null or undefined
			if (actual === null || actual === undefined) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(`Expected ${actual} to be defined, but got ${actual}`);
			}
		},
		// Define a method 'toBeTypeOf' for asserting the type of 'actual'
		toBeTypeOf: function (expectedType) {
			// Check if the type of 'actual' is not equal to 'expectedType'
			if (typeof actual !== expectedType) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(
					`Expected type ${expectedType}, but got ${typeof actual}`
				);
			}
		},
		// Define a method 'toHaveLengthOf' for asserting the length of 'actual'
		toHaveLengthOf: function (expectedLength) {
			// Check if the length of 'actual' is not equal to 'expectedLength'
			if (actual.length !== expectedLength) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(
					`Expected length of ${expectedLength}, but got ${actual.length}`
				);
			}
		},
		// Define a method 'toHavePropertyOf' for asserting the presence of a property in 'actual'
		toHavePropertyOf: function (expectedKey) {
			// Check if 'actual' has a property named 'expectedKey'
			if (!Object.prototype.hasOwnProperty.call(actual, expectedKey)) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(
					`Expected property of ${expectedKey}, but got ${actual}`
				);
			}
		},
		// Define a method 'toHaveArrayValueOf' for asserting that 'actual' array includes a specific value
		toHaveArrayValueOf: function (expectedValue) {
			// Check if 'actual' array does not include the 'expectedValue'
			if (!actual.includes(expectedValue)) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(
					`Expected array value of ${expectedValue}, but got ${actual}`
				);
			}
		},
	};
};
