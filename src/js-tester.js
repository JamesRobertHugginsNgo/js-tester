/**
 * Executes code and allow tests to be done agains the resulting value
 * @param  {...any} args
 * @returns {Promise}
 * @example
 * const tester = jsTester(() => {});
 * @example
 * const tester = jsTester('LABEL', () => {});
 * @example
 * const tester = jsTester({}, 'LABEL', () => {});
 */
function jsTester(...args) {
	if (args.length === 1) {
		return jsTester(null, ...args);
	}
	if (args.length === 2) {
		return jsTester({}, ...args);
	}

	const [initValue, label, code] = args;

	const tests = [];

	return {
		test(...args) {
			if (args.length === 1) {
				return this.test(null, ...args);
			}

			const [label, code] = args;

			tests.push((value) => {
				return Promise.resolve().then(() => {
					if (label) {
						console.log(`  ${label}`);
					}

					return code(value);
				}).then((passed) => {
					if (passed) {
						// @if TARGET="NODE"
						console.log('    \u001b[32m\u2714 Passed\u001b[0m');
						// @endif
						// @if TARGET="BROWSER"
						console.log('    %c\u2714 Passed', 'color: green;');
						// @endif
					} else {
						// @if TARGET="NODE"
						console.log('    \u001b[31m\u2716 Failed\u001b[0m');
						// @endif
						// @if TARGET="BROWSER"
						console.log('    %c\u2716 Failed', 'color: red;');
						// @endif
					}
				});
			});

			return this;
		},

		func() {
			return (value = initValue) => {
				let promise = Promise.resolve().then(() => {
					if (label) {
						console.log(label);
					}

					return code(value);
				}).then((finalValue = value) => {
					value = finalValue;

					return tests.reduce((promise, curTest) => {
						return promise.then(() => {
							return curTest(value);
						});
					}, Promise.resolve());
				});

				return promise.then(() => {
					return value;
				});
			};
		},

		end() {
			return (this.func())();
		}
	};
}

// @if TARGET="NODE"
module.exports = jsTester;
// @endif
// @if TARGET="BROWSER"
/* exported jsTester */
// @endif
