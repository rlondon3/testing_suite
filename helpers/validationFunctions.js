// validationHelpers.js

// Import the deepStrictEqual function from the helperFunctions module
const { deepStrictEqual } = require('./helperFunctions');

// Helper Functions

// Validate Assertion Count
function validateAssertionCount(expectedCount, actualCount) {
	// Check if the expected and actual assertion counts match
	if (expectedCount !== actualCount) {
		throw new Error(
			`Expected ${expectedCount} assertions, but ${actualCount} assertions were called`
		);
	}
}

// Validate Equality
function validateEquality(actual, expected) {
	// Check if the actual value is equal to the expected value
	if (actual !== expected) {
		throw new Error(`Expected ${expected}, but got ${actual}`);
	}
}

// Validate Deep Equality
function validateDeepEquality(actual, expected) {
	// Check if objects are deeply equal using the deepStrictEqual function
	const areEqual = deepStrictEqual(actual, expected);
	if (!areEqual) {
		throw new Error(`Expected objects to be strictly equal, but they are not`);
	}
}

// Validate Object Subset
function validateObjectSubset(actual, expected) {
	// Check if the actual object contains all key-value pairs of the expected object
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
}

// Validate String Match
function validateStringMatch(actual, expectedRegex) {
	// Check if the actual string matches the expected regular expression
	if (!expectedRegex.test(actual)) {
		throw new Error(
			`Expected string to match the regular expression, but it does not`
		);
	}
}

// Validate Existence
function validateExistence(actual) {
	// Check if the value is defined
	if (actual === undefined) {
		throw new Error(`Expected value to be defined, but got undefined`);
	}
}

// Validate Null
function validateNull(actual) {
	// Check if the value is null
	if (actual !== null) {
		throw new Error(`Expected a null value, but got ${actual}`);
	}
}

// Validate Numeric Comparison
function validateNumericComparison(actual, expected, comparisonType) {
	// Check if the numeric comparison holds true based on the specified type
	if (
		!(
			(comparisonType === 'greater than' && actual > expected) ||
			(comparisonType === 'greater than or equal to' && actual >= expected) ||
			(comparisonType === 'less than' && actual < expected) ||
			(comparisonType === 'less than or equal to' && actual <= expected)
		)
	) {
		throw new Error(`Expected ${actual} to be ${comparisonType} ${expected}`);
	}
}

// Validate Type
function validateType(actual, expectedType) {
	// Check if the actual value has the expected type
	if (typeof actual !== expectedType) {
		throw new Error(`Expected type ${expectedType}, but got ${typeof actual}`);
	}
}

// Validate Array Grouping
function validateArrayGrouping(actual, expectedProperty) {
	// Check if the array is properly grouped by the specified property
	if (!Array.isArray(actual)) {
		throw new Error(`Expected an array, but got ${typeof actual}`);
	}

	if (actual.length < 2) {
		// Array with less than two elements is always considered grouped
		console.log('Array has less than two elements. Considered grouped.');
		return;
	}

	const isGrouped = actual.every(
		(element, index, array) =>
			index === 0 || element[expectedProperty] === array[0][expectedProperty]
	);

	if (!isGrouped) {
		throw new Error(
			`Expected array to be grouped by property ${expectedProperty}, but it is not`
		);
	}
}

// Validate Array Inclusion
function validateArrayInclusion(actual, expectedItem) {
	// Check if the array contains the expected item
	if (!actual.includes(expectedItem)) {
		throw new Error(
			`Expected array to contain ${expectedItem}, but it does not`
		);
	}
}

// Validate Array Inclusion Equal
function validateArrayInclusionEqual(actual, expectedItem) {
	// Check if the array contains an item equal to the expected item
	const isContained = actual.some((item) =>
		deepStrictEqual(item, expectedItem)
	);
	if (!isContained) {
		throw new Error(
			`Expected array to contain an item equal to ${expectedItem}, but it does not`
		);
	}
}

// Validate Instance of
function validateInstanceOf(actual, expectedClass) {
	// Check if the actual value is an instance of the expected class
	if (!(actual instanceof expectedClass)) {
		throw new Error(
			`Expected ${actual} to be an instance of ${expectedClass.name}`
		);
	}
}

// Validate Array Sum
function validateArraySum(actual, expectedSum) {
	// Check if the sum of array elements matches the expected sum
	const actualSum = actual.reduce((acc, curr) => acc + curr, 0);
	if (actualSum !== expectedSum) {
		throw new Error(`Expected sum of ${expectedSum}, but got ${actualSum}`);
	}
}

// Validate NaN
function validateNaN(actual) {
	// Check if the value is NaN
	if (!isNaN(actual)) {
		throw new Error(`Expected NaN, but got ${actual}`);
	}
}

// Validate Not Equality
function validateNotEquality(actual, expected) {
	// Check if the actual value is not equal to the expected value
	if (actual == expected) {
		throw new Error(`Expected ${expected} to not equal ${actual}`);
	}
}

// Validate Function Throws
function validateFunctionThrows(func) {
	// Check if
	if (typeof func !== 'function') {
		throw new Error(`Expected a function, but got ${typeof func}`);
	}

	try {
		// Call the function
		func();
		// If the function did not throw, throw an error
		throw new Error('Expected function to throw, but it did not');
	} catch (error) {
		// Return the caught error for further assertions
		return error;
	}
}

// Validate Function Returns
function validateFunctionReturns(func) {
	// Check if the input is a function and return the result.
	if (typeof func !== 'function') {
		throw new Error(`Expected a function, but got ${typeof func}`);
	}

	try {
		// Call the function
		const result = func();
		// Return the result for further assertions
		return result;
	} catch (error) {
		// If the function throws, return the caught error
		return error;
	}
}

// Validate Promise Rejection
async function validatePromiseRejection(promise) {
	// Check if the input is a promise and wait for it to be rejected.
	if (!(promise instanceof Promise)) {
		throw new Error(`Expected a promise, but got ${typeof promise}`);
	}

	try {
		// Wait for the promise to be rejected
		await promise;
		// If the promise is fulfilled, throw an error
		throw new Error('Expected promise to be rejected, but it was fulfilled');
	} catch (reason) {
		// Return the unwrapped reason for further assertions
		return reason;
	}
}

// Validate Promise Resolution
async function validatePromiseResolution(promise) {
	// Check if the input is a promise and wait for it to be resolved.
	if (!(promise instanceof Promise)) {
		throw new Error(`Expected a promise, but got ${typeof promise}`);
	}

	try {
		// Wait for the promise to resolve
		const result = await promise;
		return result; // Return the unwrapped result
	} catch (error) {
		// If the promise is rejected, throw an error
		throw new Error(
			`Expected promise to be fulfilled, but it was rejected with: ${error}`
		);
	}
}

// Validate Is Promise
function validateIsPromise(value) {
	// Check if the input is a promise
	if (!(value instanceof Promise)) {
		throw new Error(`Expected a promise, but got ${typeof value}`);
	}
}

// Export the helper functions
module.exports = {
	validateAssertionCount,
	validateEquality,
	validateDeepEquality,
	validateObjectSubset,
	validateStringMatch,
	validateExistence,
	validateNull,
	validateNumericComparison,
	validateType,
	validateArrayGrouping,
	validateArrayInclusion,
	validateArrayInclusionEqual,
	validateInstanceOf,
	validateArraySum,
	validateNaN,
	validateNotEquality,
	validateFunctionThrows,
	validateFunctionReturns,
	validatePromiseResolution,
	validatePromiseRejection,
	validateIsPromise,
};
