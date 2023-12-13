# Node.js Lightweight Testing Suite

A simple and lightweight testing suite for Node.js that allows you to make assertions with ease. This testing suite provides a set of assertion methods to check for equality, existence, data types, array values, and more.

## Installation

No installation is required. Simply copy the provided expect function into your Node.js project and start making assertions.

    const { expect } = require('./path/to/your/testingSuite');

Example usage:

    try {
    // Assert equality
    expect(5).toEqual(5);

    // Assert existence
    expect('Hello').toExist();

    // Assert data type
    expect(42).toBeTypeOf('number');

    // Assert array length
    expect([1, 2, 3]).toHaveLengthOf(3);

    // Assert property existence
    const obj = { key: 'value' };
    expect(obj).toHavePropertyOf('key');

    // Assert array value
    expect(['apple', 'banana', 'orange']).toHaveArrayValueOf('banana');

    } catch (error) {
    console.error(error.message);
    }

### Assertion Methods

    toEqual(expected): Asserts that the actual value is equal to the expected value.

    toExist(): Asserts that the actual value is neither null nor undefined.

    toBeTypeOf(expectedType): Asserts that the type of the actual value matches the expected type.

    toHaveLengthOf(expectedLength): Asserts that the length of the actual value (for arrays or strings) matches the expected length.

    toHavePropertyOf(expectedKey): Asserts that the actual object has a property with the expected key.

    toHaveArrayValueOf(expectedValue): Asserts that the actual array includes the expected value.

### Testing Suite Methods

The expect function includes a variety of assertion methods to cover different scenarios in your tests. Here's an overview of the available methods:

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

Feel free to customize and expand the testing suite based on your project's needs. Happy testing! 🚀
