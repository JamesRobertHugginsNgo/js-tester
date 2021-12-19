let jsTester;

{
	const processTestResult = (passed) => {
		if (passed) {
			/* @if TARGET="NODEJS" */
			console.log('    \u001b[32m\u2714 Passed\u001b[0m');
			/* @endif */
			/* @if TARGET="BROWSER" **
			console.log('    %c\u2714 Passed', 'color: green;');
			/* @endif */
		} else {
			/* @if TARGET="NODEJS" */
			console.log('    \u001b[31m\u2716 Failed\u001b[0m');
			/* @endif */
			/* @if TARGET="BROWSER" **
			console.log('    %c\u2716 Failed', 'color: red;');
			/* @endif */
		}
	};

	jsTester = (...args) => {
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
					return code(value);
				});

				return this;
			},

			func() {
				return (value = initValue) => {
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
							promiseOrValue = promiseOrValue.then(() => {
								return test(value);
							});
						} else {
							const nextPromiseOrValue = test(value);
							if (nextPromiseOrValue instanceof Promise) {
								if (!(promiseOrValue instanceof Promise)) {
									promiseOrValue = Promise.resolve();
								}
								promiseOrValue = promiseOrValue.then(() => {
									return nextPromiseOrValue;
								});
							} else {
								promiseOrValue = nextPromiseOrValue;
							}
						}

						if (promiseOrValue instanceof Promise) {
							promiseOrValue = promiseOrValue.then(processTestResult);
						} else {
							processTestResult(promiseOrValue);
						}
					}

					if (promiseOrValue instanceof Promise) {
						return promiseOrValue.then(() => {
							return value;
						});
					}

					return value;
				};
			},

			end() {
				return (this.func())();
			},

			promise() {
				const promiseOrValue = this.end();

				if (!(promiseOrValue instanceof Promise)) {
					return Promise.resolve().then(() => {
						return promiseOrValue;
					});
				}

				return promiseOrValue;
			}
		};
	};
}

/* @if MODULE="COMMONJS" */
module.exports = jsTester;
/* @endif */
/* @if MODULE!="COMMONJS" && MODULE!="ES6" **
/* exported jsTester */
/* @endif */
/* @if MODULE="ES6" **
export default jsTester;
/* @endif */
