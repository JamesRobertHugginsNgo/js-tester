"use strict";

var jsTester = function () {
  function processTestResult(passed) {
    if (passed instanceof Promise) {
      return passed.then(function (value) {
        return processTestResult(value);
      });
    }

    if (passed) {
      console.log("    %c\u2714 Passed", 'color: green;');
    } else {
      console.log("    %c\u2716 Failed", 'color: red;');
    }
  }

  function jsTester() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      return jsTester.apply(void 0, [null].concat(args));
    }

    if (args.length === 2) {
      return jsTester.apply(void 0, [{}].concat(args));
    }

    var initValue = args[0],
        label = args[1],
        code = args[2];
    var tests = [];
    return {
      test: function test() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (args.length === 1) {
          return this.test.apply(this, [null].concat(args));
        }

        var label = args[0],
            code = args[1];
        tests.push(function (value) {
          if (label) {
            console.log("  ".concat(label));
          }

          return processTestResult(code(value));
        });
        return this;
      },
      callback: function callback() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initValue;

        if (label) {
          console.log(label);
        }

        var promiseOrValue = code(value);

        if (promiseOrValue instanceof Promise) {
          promiseOrValue = promiseOrValue.then(function () {
            var returnValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : value;
            value = returnValue;
          });
        } else {
          value = promiseOrValue;
        }

        var _loop = function _loop(index, length) {
          var test = tests[index];

          if (promiseOrValue instanceof Promise) {
            promiseOrValue = promiseOrValue.then(function () {
              return test(value);
            });
          } else {
            promiseOrValue = test(value);
          }
        };

        for (var index = 0, length = tests.length; index < length; index++) {
          _loop(index, length);
        }

        if (promiseOrValue instanceof Promise) {
          return promiseOrValue.then(function () {
            return value;
          });
        }

        return value;
      },
      end: function end() {
        return this.callback();
      },
      promise: function promise() {
        try {
          var promiseOrValue = this.end();

          if (promiseOrValue instanceof Promise) {
            return promiseOrValue;
          }

          return Promise.resolve(promiseOrValue);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    };
  }

  return jsTester;
}();
/* exported jsTester */