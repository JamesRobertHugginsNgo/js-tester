/* global jsTester */

jsTester({}, 'TESTER 0', function (value) {
	value.data = 'DATA';
	return value;
}).test('TEST PASS', function (value) {
	return value.data === 'DATA';
}).test('TEST FAIL', function (value) {
	return value.data !== 'DATA';
}).end();

Promise.resolve({})
	.then(jsTester('TESTER 1', function (value) {
		return new Promise(function (resolve) {
			value.data = 'DATA';
			resolve(value);
		});
	}).test('TEST PASS', function (value) {
		return new Promise(function (resolve) {
			setTimeout(() => resolve(value.data === 'DATA'), 500);
		});
	}).test('TEST FAIL', function (value) {
		return new Promise(function (resolve) {
			setTimeout(() => resolve(value.data !== 'DATA'), 500);
		});
	}).func())
	.then(jsTester('TESTER 2', function (value) {
		value.data = value.data + 2;
		return value;
	}).test('TEST PASS', function (value) {
		return value.data === 'DATA2';
	}).test('TEST FAIL', function (value) {
		return value.data !== 'DATA2';
	}).func())
	.then(function (value) {
		console.log(value);
	}, function (error) {
		console.error(error);
	});
