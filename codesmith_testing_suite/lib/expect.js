// Import the deepStrictEqual function from the helperFunctions module
const validationHelpers = require('../../helpers/validationFunctions');

// Define the main expect function
const expect = function (actual) {
	// Return an object with various assertion methods
	return {
		// Assertion Count Methods
		assertions: function (expectedCount) {
			validationHelpers.validateAssertionCount(
				expectedCount,
				global.getTestCount()
			);
		},
		assertionsCountToBe: function (expectedCount) {
			const totalAssertions = global.getTestCount() + 1;
			validationHelpers.validateAssertionCount(expectedCount, totalAssertions);
		},
		hasAssertions: function () {
			if (global.getTestCount() < 1) {
				throw new Error(`Expected at least 1 assertion, but got none`);
			}
		},

		// Comparison Assertions
		toEqual: function (expected) {
			validationHelpers.validateEquality(actual, expected);
		},
		toStrictEqual: function (expected) {
			validationHelpers.validateDeepEquality(actual, expected);
		},
		toMatchObject: function (expected) {
			validationHelpers.validateObjectSubset(actual, expected);
		},
		toMatch: function (expectedRegex) {
			validationHelpers.validateStringMatch(actual, expectedRegex);
		},

		// Existence and Null Checks
		toExist: function () {
			validationHelpers.validateExistence(actual);
		},
		toBeNull: function () {
			validationHelpers.validateNull(actual);
		},

		// Numeric Comparisons
		toBeGreaterThan: function (expected) {
			validationHelpers.validateNumericComparison(
				actual,
				expected,
				'greater than'
			);
		},
		toBeGreaterThanOrEqual: function (expected) {
			validationHelpers.validateNumericComparison(
				actual,
				expected,
				'greater than or equal to'
			);
		},
		toBeLessThan: function (expected) {
			validationHelpers.validateNumericComparison(
				actual,
				expected,
				'less than'
			);
		},
		toBeLessThanOrEqual: function (expected) {
			validationHelpers.validateNumericComparison(
				actual,
				expected,
				'less than or equal to'
			);
		},

		// Type Check
		toBeTypeOf: function (expectedType) {
			validationHelpers.validateType(actual, expectedType);
		},

		// Grouping Check for Arrays of Objects
		toBeGroupedByProperty: function (expectedProperty) {
			validationHelpers.validateArrayGrouping(actual, expectedProperty);
		},

		// Other Assertions...

		// Array Value Inclusion Check
		toContain: function (expectedItem) {
			validationHelpers.validateArrayInclusion(actual, expectedItem);
		},
		toContainEqual: function (expectedItem) {
			validationHelpers.validateArrayInclusionEqual(actual, expectedItem);
		},
		// Instance of Check
		toBeInstanceOf: function (expectedClass) {
			validationHelpers.validateInstanceOf(actual, expectedClass);
		},

		// Sum Check for Arrays of Numbers
		toHaveSumOf: function (expectedSum) {
			validationHelpers.validateArraySum(actual, expectedSum);
		},

		// NaN Check for Numeric Values
		toBeNaN: function () {
			validationHelpers.validateNaN(actual);
		},

		// Modifiers
		not: function (expected) {
			validationHelpers.validateNotEquality(actual, expected);
		},

		// Matchers
		resolves: async function () {
			validationHelpers.validatePromiseResolution(actual);
		},
		rejects: async function () {
			validationHelpers.validatePromiseRejection(actual);
		},
		isPromise: async function () {
			validationHelpers.validateIsPromise(actual);
		},
		toThrow: function () {
			validationHelpers.validateFunctionThrows(actual);
		},
		returns: function () {
			validationHelpers.validateFunctionReturns(actual);
		},
	};
};

// Export the expect function
module.exports = expect;
