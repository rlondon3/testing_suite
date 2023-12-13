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
		// Define a method 'toExist' for asserting that 'actual' is not undefined
		toExist: function () {
			// Check if 'actual' is equal to undefined
			if (actual === undefined) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(`Expected value to be defined, but got ${actual}`);
			}
		},
		// Define a method 'toExist' for asserting that 'actual' is not undefined
		toBeDefined: function () {
			// Check if 'actual' is equal to undefined
			if (actual === undefined) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(`Expected the value ${actual}, but got ${actual}`);
			}
		},
		// Define a method 'toBeNull' for asserting that 'actual' is null
		toBeNull: function () {
			// Check if 'actual' is not null
			if (actual !== null) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(`Expected a null value, but got ${actual}`);
			}
		},
		// Define a method 'toBeTruthy' for asserting that 'actual' is truthy
		toBeTruthy: function () {
			// Check if 'actual' is falsy
			if (!actual) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(`Expected a truthy value, but got ${actual}`);
			}
		},
		// Define a method 'toBeFalsy' for asserting that 'actual' is falsy
		toBeFalsy: function () {
			// Check if 'actual' is truthy
			if (actual) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(`Expected a falsy value, but got ${actual}`);
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
		// Define a method 'toBeGroupedByPropery' for asserting that an array is grouped by a specific property
		toBeGroupedByPropery: function (expectedProperty) {
			// Check if 'actual' is an array
			if (!Array.isArray(actual)) {
				throw new Error(`Expected an array, but got ${typeof actual}`);
			}
			// Check if each element in 'actual' has the expected property
			const allElementsHaveProperty = actual.every((element) =>
				Object.prototype.hasOwnProperty.call(element, expectedProperty)
			);
			if (!allElementsHaveProperty) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(
					`Expected all elements to have property ${expectedProperty}, but some do not`
				);
			}
			// Check if the array is effectively grouped by the expected property
			const isGrouped = actual.every(
				(element, index, array) =>
					index === 0 ||
					element[expectedProperty] === array[index - 1][expectedProperty]
			);
			if (!isGrouped) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(
					`Expected array to be grouped by property ${expectedProperty}, but it is not`
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
		// Define a method 'toHaveSumOf' for asserting the sum of 'actual' values
		toHaveSumOf: function (expectedSum) {
			// Check if the sum of 'actual' values is not equal to 'expectedSum'
			const actualSum = actual.reduce((acc, curr) => acc + curr, 0);
			if (actualSum !== expectedSum) {
				// Throw an error with a message indicating the expectation failure
				throw new Error(`Expected sum of ${expectedSum}, but got ${actualSum}`);
			}
		},
	};
};
