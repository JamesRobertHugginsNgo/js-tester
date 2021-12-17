const jsTest = require('../../dist/node/js-tester');

Promise.resolve()
	/////////////////////////////////////////////////////////////////////////////
	// TEST 1
	/////////////////////////////////////////////////////////////////////////////
	.then(jsTest('TESTER 1', () => {
		return 'TEST';
	}).test('TEST 1', (value) => {
		return value === 'TEST';
	}).test('TEST 2', (value) => {
		return value !== 'TEST';
	}).func())
	/////////////////////////////////////////////////////////////////////////////
	// TEST 2
	/////////////////////////////////////////////////////////////////////////////
	.then(jsTest('TESTER 2', () => {
		return 'TEST';
	}).test('TEST 1', (value) => {
		return value === 'TEST';
	}).test('TEST 2', (value) => {
		return value !== 'TEST';
	}).func());
