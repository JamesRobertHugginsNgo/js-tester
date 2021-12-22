/* global jsTester */

Promise.resolve()
  .then(() => {
    return jsTester('TESTER 1', () => 'DATA')
      .test('TEST PASS', (value) => value === 'DATA')
      .test('TEST FAIL', (value) => value !== 'DATA')
      .promise()
      .then((data) => void console.log(JSON.stringify(data, null, 2)), (error) => void console.error(error));
  })
  .then(jsTester('TESTER 2', () => 'DATA')
    .test('TEST PASS', (value) => value === 'DATA')
    .test('TEST FAIL', (value) => value !== 'DATA')
    .promise)
  .then(jsTester('TESTER 3', (value) => `${value} B`)
    .test('TEST PASS', (value) => value === 'DATA B')
    .test('TEST FAIL', (value) => value !== 'DATA B')
    .promise)
  .then((data) => void console.log(JSON.stringify(data, null, 2)), (error) => void console.error(error));
