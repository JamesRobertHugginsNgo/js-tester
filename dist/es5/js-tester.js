"use strict";

var jsTester = function jsTester(label, code) {
  return function (label, code) {
    var tests = [];
    return {
      test: function test(label, code) {
        tests.push({
          label: label,
          code: code
        });
        return this;
      },
      promise: function promise() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var _data$value = data.value,
            value = _data$value === void 0 ? {} : _data$value;
        var promise = Promise.resolve(value).then(function () {
          console.log(label);
          return code(value);
        }).then(function () {
          var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : value;
          return void (value = result);
        });

        var _loop = function _loop(index, length) {
          var test = tests[index];
          var label = test.label,
              code = test.code;
          promise = promise.then(function () {
            console.log("  ".concat(label));
            return code(value);
          }).then(function (passed) {
            if (passed) {
              console.log("    %c\u2714 Passed", 'color: green;');
            } else {
              console.log("    %c\u2716 Failed", 'color: red;');
            }

            Object.assign(test, {
              passed: passed
            });
          });
        };

        for (var index = 0, length = tests.length; index < length; index++) {
          _loop(index, length);
        }

        return promise.then(function () {
          var _data$testers = data.testers,
              testers = _data$testers === void 0 ? [] : _data$testers;
          testers.push({
            label: label,
            value: value,
            tests: tests
          });
          return {
            value: value,
            testers: testers
          };
        });
      }
    };
  }(label, code);
};
/* exported jsTester */