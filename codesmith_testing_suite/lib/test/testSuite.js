const expect = require('../expect');

// Test suite for expect.js methods
describe('Expect.js methods test suite', (test) => {
	// Define a variable to store information across tests
	let sharedData;

	// beforeAll: Run once before any test in the suite
	beforeAll(() => {
		sharedData = { key: 'initial value' };
		console.log(`Data before all test: ${sharedData.key}`);
	});

	// beforeEach: Set up before each test
	beforeEach(() => {
		console.log('Setting up before each test...');
		// Additional setup logic, if needed
	});

	// afterEach: Tear down after each test
	afterEach(() => {
		console.log('Tearing down after each test...');
		// Additional teardown logic, if needed
	});

	// afterAll: Run after all tests in the suite
	afterAll(() => {
		sharedData = null; // Reset shared data- clean up
		console.log(`Data after all test: ${sharedData}`);
	});
	// Comparison Assertions
	test('toEqual method', () => {
		expect(42).toEqual(42);
	});

	test('toStrictEqual method', () => {
		const obj = { key: 'value' };
		expect(obj).toStrictEqual(obj);
	});

	test('toMatchObject method', () => {
		const actual = { key1: 'value1', key2: 'value2' };
		const expected = { key1: 'value1' };
		expect(actual).toMatchObject(expected);
	});

	test('toMatch method', () => {
		const actual = 'Hello, World!';
		const regex = /World/;
		expect(actual).toMatch(regex);
	});

	// Existence and Null Checks
	test('toExist method', () => {
		expect(42).toExist();
	});

	test('toBeNull method', () => {
		expect(null).toBeNull();
	});

	// Numeric Comparisons
	test('toBeGreaterThan method', () => {
		expect(5).toBeGreaterThan(3);
	});

	test('toBeGreaterThanOrEqual method', () => {
		expect(5).toBeGreaterThanOrEqual(5);
	});

	test('toBeLessThan method', () => {
		expect(3).toBeLessThan(5);
	});

	test('toBeLessThanOrEqual method', () => {
		expect(5).toBeLessThanOrEqual(5);
	});

	// Type Check
	test('toBeTypeOf method', () => {
		expect('Hello').toBeTypeOf('string');
	});

	// Grouping Check for Arrays of Objects
	test('toBeGroupedByProperty method', () => {
		const array = [{ group: 'A' }, { group: 'A' }, { group: 'A' }];
		expect(array).toBeGroupedByProperty('group');
	});

	// Array Value Inclusion Check
	test('toContain method', () => {
		const array = [1, 2, 3];
		expect(array).toContain(2);
	});

	test('toContainEqual method', () => {
		const array = [{ key: 'value' }, { key: 'value2' }];
		expect(array).toContainEqual({ key: 'value' });
	});

	// Instance of Check
	test('toBeInstanceOf method', () => {
		class TestClass {}
		const instance = new TestClass();
		expect(instance).toBeInstanceOf(TestClass);
	});

	// Sum Check for Arrays of Numbers
	test('toHaveSumOf method', () => {
		const array = [1, 2, 3];
		expect(array).toHaveSumOf(6);
	});

	// NaN Check for Numeric Values
	test('toBeNaN method', () => {
		expect(NaN).toBeNaN();
	});

	// Modifiers
	test('not method', () => {
		expect(42).not(3);
	});

	// Matchers
	test('resolves method', async () => {
		const promise = Promise.resolve('Resolved');
		await expect(promise).resolves();
	});

	test('rejects method', async () => {
		const promise = Promise.reject('Rejected');
		await expect(promise).rejects();
	});

	test('isPromise method', async () => {
		const promise = Promise.resolve();
		await expect(promise).isPromise();
	});

	test('toThrow method', () => {
		const throwingFunction = () => {
			throw new Error('Thrown error');
		};
		expect(throwingFunction).toThrow();
	});

	test('returns method', () => {
		const returningFunction = () => 'Returned value';
		expect(returningFunction).returns();
	});

	// Async test with a delay longer than the timeout
	test('Timeout test', async () => {
		// Simulate a delay longer than the default timeout (5 seconds)
		await new Promise((resolve) => setTimeout(resolve, 10000));
	});
	// Assertion Count Methods

	test('hasAssertions method', () => {
		expect().hasAssertions();
	});

	test('assertionsCountToBe method', () => {
		expect().assertionsCountToBe(26);
	});

	test('assertions method', () => {
		expect().assertions(25);
	});
});
