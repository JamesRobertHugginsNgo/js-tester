const jsTester = (() => {
	function processTestResult(passed) {
		if (passed instanceof Promise) {
			return passed.then((value) => processTestResult(value));
		}

		if (passed) {
			console.log('    %c\u2714 Passed', 'color: green;');
		} else {
			console.log('    %c\u2716 Failed', 'color: red;');
		}
	}

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
					if (label) {
						console.log(`  ${label}`);
					}
					return processTestResult(code(value));
				});

				return this;
			},

			callback(value = initValue) {
				if (label) {
					console.log(label);
				}

				let promiseOrValue = code(value);
				if (promiseOrValue instanceof Promise) {
					promiseOrValue = promiseOrValue.then((returnValue = value) => {
						value = returnValue;
					});
				} else {
					value = promiseOrValue;
				}

				for (let index = 0, length = tests.length; index < length; index++) {
					const test = tests[index];
					if (promiseOrValue instanceof Promise) {
						promiseOrValue = promiseOrValue.then(() => test(value));
					} else {
						promiseOrValue = test(value);
					}
				}

				if (promiseOrValue instanceof Promise) {
					return promiseOrValue.then(() => {
						return value;
					});
				}

				return value;
			},

			end() {
				return this.callback();
			},

			promise() {
				try {
					const promiseOrValue = this.end();

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
})();

/* exported jsTester */
