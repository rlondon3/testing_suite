# Node.js Lightweight Testing Suite

A simple and lightweight testing suite for Node.js that allows you to make assertions with ease. This testing suite provides a set of assertion methods to check for equality, existence, data types, array values, and more. Additionally, it supports the organization of tests using the beforeAll, beforeEach, afterEach, and afterAll functions, allowing you to set up preconditions, execute code before and after each test, and perform cleanup tasks. The framework aims to offer flexibility and simplicity in writing and organizing tests for your Node.js projects.

## Installation

No installation is required. Simply copy the provided testing suite files (expect.js, test.js, describe.js, testFramework.js, and testRunner.js) into your Node.js project and start making assertions.

    const { expect } = require('./path/to/your/testingSuite');

### Testing Suite Methods

The testing suite includes a describe function for organizing tests and executing them:

    describe(suiteName, suiteFunction): Use this function to group related tests together.
    expect function provides a variety of assertion methods to cover different scenarios in your tests.

Example usage:

    describe('My Test Suite', (test) => {
        test('Assert equality', () => {
            expect(5).toEqual(5);
        });

        test('Assert existence', () => {
            expect('Hello').toExist();
        });

        test('Assert data type', () => {
            expect(42).toBeTypeOf('number');
        });

        test('Assert array length', () => {
            expect([1, 2, 3]).toHaveLengthOf(3);
        });

        test('Assert property existence', () => {
            const obj = { key: 'value' };
            expect(obj).toHavePropertyOf('key');
        });

        test('Assert array value', () => {
            expect(['apple', 'banana', 'orange']).toHaveArrayValueOf('banana');
        });

        test('Async/await resolves successfully', async () => {
            // Simulate an asynchronous operation
            const result = await new Promise((resolve) => setTimeout(() => resolve('Async Result'), 1000));
            expect(result).toEqual('Async Result');
        });
    });

### Example of Types of Assertions:

    Comparison assertions:
        toEqual(expected): Asserts that the actual value is equal to the expected value.

    Existence and null checks:
        toExist(): Asserts that the actual value is defined.
        toBeNull(): Asserts that the actual value is null.

    Numeric comparisons:
        toBeGreaterThan(expected): Asserts that the actual value is greater than the expected value.
        toBeGreaterThanOrEqual(expected): Asserts that the actual value is greater than or equal to the expected value.
        toBeLessThan(expected): Asserts that the actual value is less than the expected value.
        toBeLessThanOrEqual(expected): Asserts that the actual value is less than or equal to the expected value.

    Type check:
        toBeTypeOf(expectedType): Asserts that the type of the actual value matches the expected type.

    Grouping check for arrays of objects:
        toBeGroupedByProperty(expectedProperty): Asserts that the array is grouped by the specified property.

    Falsy and truthy checks:
        toBeTruthy(): Asserts that the actual value is truthy.
        toBeFalsy(): Asserts that the actual value is falsy.

    Length check for arrays and strings:
        toHaveLengthOf(expectedLength): Asserts that the length of the actual value matches the expected length.

    Property presence check for objects:
        toHavePropertyOf(expectedKey): Asserts that the actual object has the specified property.

    Array value inclusion check:
        toHaveArrayValueOf(expectedValue): Asserts that the actual array includes the specified value.

    Sum check for arrays of numbers:
        toHaveSumOf(expectedSum): Asserts that the sum of the actual values matches the expected sum.

    NaN check for numeric values:
        toBeNaN(): Asserts that the actual value is NaN.

### Test Reporter

The testing suite now includes a test reporter that generates an HTML report of your test results. The report is saved in the test-results folder as results.html.
![Alt Text](https://github.com/rlondon3/testing_suite/blob/main/codesmith_testing_suite/lib/assets/testSuit.png)

Feel free to customize and expand the testing suite based on your project's needs. Happy testing! 🚀
