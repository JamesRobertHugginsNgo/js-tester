"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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
      promise: function promise(data) {
        if (!data || _typeof(data) != 'object') {
          data = {};
        }

        var _data = data,
            _data$value = _data.value,
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
          var _data2 = data,
              _data2$testers = _data2.testers,
              testers = _data2$testers === void 0 ? [] : _data2$testers;
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