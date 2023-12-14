const expect = function (actual) {
	return {
		// Comparison assertions
		// Compare the actual value with the expected value
		toEqual: function (expected) {
			if (actual !== expected) {
				throw new Error(`Expected ${expected}, but got ${actual}`);
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

		// Other assertions...
	};
};

module.exports = expect;
