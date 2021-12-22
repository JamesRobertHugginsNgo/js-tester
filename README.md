# js-tester

Version 3.0.1

Tool for testing JavaScript codes.

## Install

Install the latest version as an NPM dependency.

``` console
npm install https://github.com/JamesRobertHugginsNgo/js-tester.git#3.0.1
```

## Usage

For NodeJS:

``` JavaScript
const jsTester = require('js-tester');
```

For web browser (ES5 or ES6):

``` JavaScript
/* global jsTester */
```

For web browser (ES6 Module):

``` JavaScript
import jsTester from 'path/js-tester.js';
```

For all:

``` JavaScript
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

```
