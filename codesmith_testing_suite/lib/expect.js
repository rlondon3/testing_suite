const { deepStrictEqual } = require('../../helpers/helperFunctions');

const expect = function (actual) {
	return {
		// Automatically increment the assertion count
		// New method to access global assertions
		assertions: function (expectedCount) {
			if (expectedCount !== global.getTestCount()) {
				throw new Error(
					`Expected ${expectedCount} assertions, but ${global.getTestCount()} assertions were called`
				);
			}
		},
		assertionsCountToBe: function (expectedCount) {
			const totalAssertions = global.getTestCount() + 1;
			if (expectedCount !== totalAssertions) {
				throw new Error(
					`Expected ${expectedCount} assertions, but ${totalAssertions} assertions were called`
				);
			}
		},
		hasAssertions: function () {
			if (global.getTestCount() < 1) {
				throw new Error(`Expected at least 1 assertion, but got none`);
			}
		},
		// Comparison assertions
		// Compare the actual value with the expected value
		toEqual: function (expected) {
			if (actual !== expected) {
				throw new Error(`Expected ${expected}, but got ${actual}`);
			}
		},

		// Compare objects for strict equality
		toStrictEqual: function (expected) {
			const areEqual = deepStrictEqual(actual, expected);
			if (!areEqual) {
				throw new Error(
					`Expected objects to be strictly equal, but they are not`
				);
			}
		},
		// Check if the actual object matches a subset of the expected object's properties
		toMatchObject: function (expected) {
			const actualKeys = Object.keys(actual);
			const expectedKeys = Object.keys(expected);

			for (const key of expectedKeys) {
				if (
					!actualKeys.includes(key) ||
					!deepStrictEqual(actual[key], expected[key])
				) {
					throw new Error(`Expected object to match subset, but it does not`);
				}
			}

			return true;
		},
		// Check if the actual string matches a regular expression
		toMatch: function (expectedRegex) {
			if (!expectedRegex.test(actual)) {
				throw new Error(
					`Expected string to match the regular expression, but it does not`
				);
			}
		},
		// Existence and null checks
		// Check if the actual value is defined
		toExist: function () {
			if (actual === undefined) {
				throw new Error(`Expected value to be defined, but got undefined`);
			}
		},
		// Check if the actual value is not null
		toBeNull: function () {
			if (actual !== null) {
				throw new Error(`Expected a null value, but got ${actual}`);
			}
		},

		// Numeric comparisons
		// Check if the actual value is greater than the expected value
		toBeGreaterThan: function (expected) {
			if (actual <= expected) {
				throw new Error(`Expected ${actual} to be greater than ${expected}`);
			}
		},
		// Check if the actual value is greater than or equal to the expected value
		toBeGreaterThanOrEqual: function (expected) {
			if (actual < expected) {
				throw new Error(
					`Expected ${actual} to be greater than or equal to ${expected}`
				);
			}
		},
		// Check if the actual value is less than the expected value
		toBeLessThan: function (expected) {
			if (actual >= expected) {
				throw new Error(`Expected ${actual} to be less than ${expected}`);
			}
		},
		// Check if the actual value is less than or equal to the expected value
		toBeLessThanOrEqual: function (expected) {
			if (actual > expected) {
				throw new Error(
					`Expected ${actual} to be less than or equal to ${expected}`
				);
			}
		},

		// Type check
		// Check if the actual value has the expected type
		toBeTypeOf: function (expectedType) {
			if (typeof actual !== expectedType) {
				throw new Error(
					`Expected type ${expectedType}, but got ${typeof actual}`
				);
			}
		},

		// Grouping check for arrays of objects
		// Check if the array is grouped by the specified property
		toBeGroupedByProperty: function (expectedProperty) {
			if (!Array.isArray(actual)) {
				throw new Error(`Expected an array, but got ${typeof actual}`);
			}

			const allElementsHaveProperty = actual.every((element) =>
				Object.prototype.hasOwnProperty.call(element, expectedProperty)
			);

			if (!allElementsHaveProperty) {
				throw new Error(
					`Expected all elements to have property ${expectedProperty}, but some do not`
				);
			}

			const isGrouped = actual.every(
				(element, index, array) =>
					index === 0 ||
					element[expectedProperty] === array[index - 1][expectedProperty]
			);

			if (!isGrouped) {
				throw new Error(
					`Expected array to be grouped by property ${expectedProperty}, but it is not`
				);
			}
		},

		// Other assertions...

		// Falsy and truthy checks
		// Check if the actual value is truthy
		toBeTruthy: function () {
			if (!actual) {
				throw new Error(`Expected a truthy value, but got ${actual}`);
			}
		},
		// Check if the actual value is falsy
		toBeFalsy: function () {
			if (actual) {
				throw new Error(`Expected a falsy value, but got ${actual}`);
			}
		},

		// Length check for arrays and strings
		// Check if the length of the actual value matches the expected length
		toHaveLengthOf: function (expectedLength) {
			if (actual.length !== expectedLength) {
				throw new Error(
					`Expected length of ${expectedLength}, but got ${actual.length}`
				);
			}
		},

		// Property presence check for objects
		// Check if the actual object has the specified property
		toHavePropertyOf: function (expectedKey) {
			if (!Object.prototype.hasOwnProperty.call(actual, expectedKey)) {
				throw new Error(
					`Expected property of ${expectedKey}, but got ${actual}`
				);
			}
		},

		// Array value inclusion check
		// Check if the actual array includes the specified value
		toHaveArrayValueOf: function (expectedValue) {
			if (!actual.includes(expectedValue)) {
				throw new Error(
					`Expected array value of ${expectedValue}, but got ${actual}`
				);
			}
		},
		// Check if the actual array contains the expected item
		toContain: function (expectedItem) {
			if (!actual.includes(expectedItem)) {
				throw new Error(
					`Expected array to contain ${expectedItem}, but it does not`
				);
			}
		},

		// Sum check for arrays of numbers
		// Check if the sum of the actual values matches the expected sum
		toHaveSumOf: function (expectedSum) {
			const actualSum = actual.reduce((acc, curr) => acc + curr, 0);
			if (actualSum !== expectedSum) {
				throw new Error(`Expected sum of ${expectedSum}, but got ${actualSum}`);
			}
		},

		// NaN check for numeric values
		// Check if the actual value is NaN
		toBeNaN: function () {
			if (!isNaN(actual)) {
				throw new Error(`Expected NaN, but got ${actual}`);
			}
		},

		// Modifiers
		//Negates a comparison- check if the actual value is not equal to the expected value.
		not: function (expected) {
			if (actual == expected) {
				throw new Error(`Expected ${expected} to not equal ${actual}`);
			}
		},

		// Matchers
		// Resolves for unwrapping the value of a fulfilled promise
		resolves: async function () {
			// Check if the actual value is a promise
			if (!(actual instanceof Promise)) {
				throw new Error(`Expected a promise, but got ${typeof actual}`);
			}

			try {
				// Wait for the promise to resolve
				const result = await actual;
				return result; // Return the unwrapped result
			} catch (error) {
				// If the promise is rejected, throw an error
				throw new Error(
					`Expected promise to be fulfilled, but it was rejected with: ${error}`
				);
			}
		},
		// Rejects for unwrapping the reason of a rejected promise
		rejects: async function () {
			// Check if the actual value is a promise
			if (!(actual instanceof Promise)) {
				throw new Error(`Expected a promise, but got ${typeof actual}`);
			}

			try {
				// Wait for the promise to be rejected
				await actual;
				// If the promise is fulfilled, throw an error
				throw new Error(
					'Expected promise to be rejected, but it was fulfilled'
				);
			} catch (reason) {
				// Return the unwrapped reason for further assertions
				return reason;
			}
		},
		isPromise: async function () {
			if (!(actual instanceof Promise)) {
				throw new Error(`Expected promise, but got typeof ${actual}`);
			}
		},
		// ToThrow for testing if a function throws an exception
		toThrow: function () {
			// Check if the actual value is a function
			if (typeof actual !== 'function') {
				throw new Error(`Expected a function, but got ${typeof actual}`);
			}

			try {
				// Call the function
				actual();
				// If the function did not throw, throw an error
				throw new Error('Expected function to throw, but it did not');
			} catch (error) {
				// Return the caught error for further assertions
				return error;
			}
		},
		// Returns for testing if a function returns a value
		returns: function () {
			// Check if the actual value is a function
			if (typeof actual !== 'function') {
				throw new Error(`Expected a function, but got ${typeof actual}`);
			}

			try {
				// Call the function
				const result = actual();
				// Return the result for further assertions
				return result;
			} catch (error) {
				// If the function throws, return the caught error
				return error;
			}
		},
	};
};

module.exports = expect;
