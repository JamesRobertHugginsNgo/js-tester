const jsTester = require('../../dist/node/js-tester');

Promise.resolve()
	/////////////////////////////////////////////////////////////////////////////
	// TEST 1
	/////////////////////////////////////////////////////////////////////////////
	.then(jsTester('TESTER 1', () => {
		return 'TEST';
	}).test('TEST 1.1', (value) => {
		return value === 'TEST';
	}).test('TEST 1.2', (value) => {
		return value !== 'TEST';
	}).func())
	/////////////////////////////////////////////////////////////////////////////
	// TEST 2
	/////////////////////////////////////////////////////////////////////////////
	.then(jsTester('TESTER 2', () => {
		return 'TEST';
	}).test('TEST 2.1', (value) => {
		return value === 'TEST';
	}).test('TEST 2.2', (value) => {
		return value !== 'TEST';
	}).func());
