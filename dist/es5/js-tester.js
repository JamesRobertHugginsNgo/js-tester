"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * @param {string} label
 * @param {function} code
 */
function jsTester(label, code) {
  var tests = [];
  return {
    /**
     * @param {string} label
     * @param {function} code
     */
    test: function test(label, code) {
      tests.push({
        label: label,
        code: code
      });
      return this;
    },

    /**
     * @param {object} data
     * @param {*} [data.value]
     * @param {object[]} [data.testers]
     * @param {string} data.testers[].label
     * @param {*} data.testers[].value
     * @param {object[]} data.testers[].tests
     * @param {string} data.testers[].tests[].label
     * @param {boolean} data.testers[].tests[].passed
     */
    promise: function promise(data) {
      if (!data || _typeof(data) != 'object') {
        data = {};
      }

      var _data = data,
          _data$value = _data.value,
          value = _data$value === void 0 ? {} : _data$value;
      var promise = Promise.resolve(value).then(function () {
        console.group(label);
        return code(value);
      }).then(function () {
        var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : value;
        return void (value = result);
      });

      var _loop = function _loop(index, length) {
        var _tests$index = tests[index],
            label = _tests$index.label,
            code = _tests$index.code;
        promise = promise.then(function () {
          console.group(label);
          return code(value);
        }).then(function (passed) {
          if (passed) {
            console.log("%c\u2714 Passed", 'color: green;');
          } else {
            console.log("%c\u2716 Failed", 'color: red;');
          }

          tests[index] = {
            label: label,
            passed: passed
          };
          console.groupEnd();
        }, function (error) {
          console.groupEnd();
          return Promise.reject(error);
        });
      };

      for (var index = 0, length = tests.length; index < length; index++) {
        _loop(index, length);
      }

      return promise.then(function () {
        console.groupEnd();
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
      }, function (error) {
        console.groupEnd();
        return Promise.reject(error);
      });
    }
  };
}
/* exported jsTester */