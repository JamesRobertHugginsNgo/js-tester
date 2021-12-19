# js-tester

Version 2.0.0

Tool for testing JavaScript codes.

## Install

Install the latest version as an NPM dependency.

``` console
npm install https://github.com/JamesRobertHugginsNgo/js-tester.git#2.0.0
```

## Usage

``` JavaScript
// NODEJS
const jsTester = require('js-tester');

// OR

// BROWSER + ES5 OR ES6
/* global jsTester */

// OR

// BROWSER + ES6 MODULE
import jsTester from 'path/js-tester.js';
```

### jsTester

Create a JavaScript Tester.

``` JavaScript
const tester = jsTester({}, 'TESTER', (value) => {
  // EXECUTE CODE, RETURN VALUE FOR TESTING
  value.data = 'VALUE';
  return value; // OPTIONAL WHEN VALUE IS NOT CHANGED, RETURN PROMISE FOR ASYNC
});
```

### test

Add one or more tests.

``` JavaScript
// ADD A SINGLE TEST
tester.test('TEST FOR VALUE', (value) => {
  return value.data == null;
});

// CHAIN TO ADD MULTIPLE TESTS
tester.test('TEST PASS', (value) => {
  return value.data === 'VALUE';
}).test('TEST FAIL', (value) => {
  return value.data != 'VALUE';
});
```

### end

End adding tests and execute. Should not be used with `promise` nor `func` method.

``` JavaScript
tester.end(); // RETURNS A VALUE OR A PROMISE OR THROWS AN ERROR
```

### promise

End adding tests and execute, always returns a `Promise` object. Should not be used with `end` nor `func` method.

``` JavaScript
tester.promise(); // RETURNS A PROMISE
```

### func

End adding tests and execute, use as an argument to `Promise.then(...)`. Should not be used with `end` nor `promise` method.

``` JavaScript
Promise.resolve().then(tester.func());
```
