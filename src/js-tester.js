const jsTester = (() => {
	/**
	 * @param {string} label
	 * @param {function} code
	 */
	function jsTester (label, code) {
		const tests = [];

		return {
			/**
			 * @param {string} label
			 * @param {function} code
			 */
			test(label, code) {
				tests.push({ label, code });

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
			promise(data) {
				if (!data || typeof data != 'object') {
					data = {};
				}

				let { value = {} } = data;
				let promise = Promise.resolve(value)
					.then(() => {
						console.log(label);
						return code(value);
					})
					.then((result = value) => void (value = result));

				for (let index = 0, length = tests.length; index < length; index++) {
					const { label, code } = tests[index];
					promise = promise
						.then(() => {
							console.log(`  ${label}`);
							return code(value);
						})
						.then((passed) => {
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

							tests[index] = { label, passed };
						});
				}

				return promise.then(() => {
					const { testers = [] } = data;
					testers.push({ label, value, tests });
					return { value, testers };
				});
			}
		};
	}

	return jsTester;
})();

/* @if MODULE="COMMONJS" */
module.exports = jsTester;
/* @endif */
/* @if MODULE!="COMMONJS" && MODULE!="ES6" **
/* exported jsTester */
/* @endif */
/* @if MODULE="ES6" **
export default jsTester;
/* @endif */
