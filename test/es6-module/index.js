import jsTester from '../../dist/es6-module/js-tester.js';

jsTester({}, 'TESTER 0', (value) => {
	value.data = 'DATA';
	return value;
}).test('TEST PASS', (value) => {
	return value.data === 'DATA';
}).test('TEST FAIL', (value) => {
	return value.data !== 'DATA';
}).end();

Promise.resolve({})
	.then(jsTester('TESTER 1', (value) => {
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
	}).func())
	.then(jsTester('TESTER 2', (value) => {
		value.data = value.data + 2;
		return value;
	}).test('TEST PASS', (value) => {
		return value.data === 'DATA2';
	}).test('TEST FAIL', (value) => {
		return value.data !== 'DATA2';
	}).func())
	.then((value) => {
		console.log(value);
	}, (error) => {
		console.error(error);
	});
