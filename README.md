# js-tester

Version 2.0.0

Tool for testing JavaScript codes.

## Install

Install the latest version as an NPM dependency.

```
npm install https://github.com/JamesRobertHugginsNgo/js-tester.git#2.0.0
```

## Usage

``` JavaScript
// NodeJS
const jsTester = require('js-tester');

// or

// Browser
/* global jsTester */
```

### jsTester

Create a JavaScript Tester.

``` JavaScript
const tester = jsTester({}, 'TESTER', (value) => {
	// Code that sets one or more values for testing
	value.data = 'VALUE';
	return value; // Optional, value was not changed
});
```

### test
Add one or more tests.

``` JavaScript
// Add a single test
tester.test('TEST 1', (value) => {
	return value.data == null;
});

// Chain to add multiple tests
tester
	.test('TEST 2', (value) => {
		return value.data === 'VALUE';
	})
	.test('TEST 3', (value) => {
		return value.data != 'VALUE';
	});
```

### end

End adding tests and execute. Should not be used with `promise` nor `func` method.

``` JavaScript
tester.end();
```

### promise

End adding tests and execute, always returns a `Promise` object. Should not be used with `end` nor `func` method.

``` JavaScript
tester.promise();
```

### func

End adding tests and execute, use as an argument to `Promise.then(...)`. Should not be used with `end` nor `promise` method.

``` JavaScript
Promise.resolve().then(tester.func());
```
