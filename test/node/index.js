const jsTester = require('../../index.js');

jsTester({}, 'TEST CODE 0', (value) => {
	value.data = 'DATA';
	return value;
}).test('TEST PASS', (value) => {
	return value.data === 'DATA';
}).test('TEST FAIL', (value) => {
	return value.data !== 'DATA';
}).end();

Promise.resolve({})
	.then(jsTester('TEST CODE 1', (value) => {
		return new Promise((resolve) => {
			value.data = 'DATA';
			resolve(value);
		});
	}).test('TEST PASS', (value) => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(value.data === 'DATA'), 500);
		});
	}).test('TEST FAIL', (value) => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(value.data !== 'DATA'), 500);
		});
	}).callback)
	.then(jsTester('TEST CODE 2', (value) => {
		value.data = value.data + 2;
		return value;
	}).test('TEST PASS', (value) => {
		return value.data === 'DATA2';
	}).test('TEST FAIL', (value) => {
		return value.data !== 'DATA2';
	}).callback)
	.then((value) => {
		console.log(value);
	}, (error) => {
		console.error(error);
	});
