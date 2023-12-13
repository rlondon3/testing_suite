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

Feel free to customize and expand the testing suite based on your project's needs. Happy testing! 🚀
