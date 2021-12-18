const jsTester = require('../../index');

const value = jsTester({}, 'TESTER 0', (value) => {
	value.data = 'DATA';
	return value; // OPTIONAL - VALUE WAS NOT CHANGED
}).test('TEST PASS', (value) => {
	return value.data === 'DATA'; // Pass
}).test('TEST FAIL', (value) => {
	return value.data !== 'DATA'; // Fail
}).end();

if (value instanceof Promise) {
	value.then((value) => {
		console.log('VALUE', value);
	});
} else {
	console.log('VALUE', value);
}

Promise.resolve({})
	.then(jsTester('TESTER 1', (value) => {
		value.data = 'DATA';
		return value; // OPTIONAL - VALUE WAS NOT CHANGED
	}).test('TEST PASS', (value) => {
		return value.data === 'DATA'; // Pass
	}).test('TEST FAIL', (value) => {
		return value.data !== 'DATA'; // Fail
	}).func())
	.then(jsTester('TESTER 2', (value) => {
		value.data = value.data + 2;
		return value; // OPTIONAL - VALUE WAS NOT CHANGED
	}).test('TEST PASS', (value) => {
		return value.data === 'DATA2'; // Pass
	}).test('TEST FAIL', (value) => {
		return value.data !== 'DATA2'; // Fail
	}).func())
	.then((value) => {
		console.log('VALUE', value);
	});
