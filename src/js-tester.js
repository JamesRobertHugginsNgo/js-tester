/**
 * @param {string} label
 * @param {function} code
 */
function jsTester(label, code) {
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
					console.group(label);
					return code(value);
				})
				.then((result = value) => void (value = result));

			for (let index = 0, length = tests.length; index < length; index++) {
				const { label, code } = tests[index];
				promise = promise
					.then(() => {
						console.group(label);

						return code(value);
					})
					.then((passed) => {
						if (passed) {
							/* @if TARGET="NODEJS" */
							console.log('\u001b[32m\u2714 Passed\u001b[0m');
							/* @endif */
							/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" || TARGET="BROWSER_ES6MODULE" **
							console.log('%c\u2714 Passed', 'color: green;');
							/* @endif */
						} else {
							/* @if TARGET="NODEJS" */
							console.log('\u001b[31m\u2716 Failed\u001b[0m');
							/* @endif */
							/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" || TARGET="BROWSER_ES6MODULE" **
							console.log('%c\u2716 Failed', 'color: red;');
							/* @endif */
						}

						tests[index] = { label, passed };

						console.groupEnd();
					}, (error) => {
						console.groupEnd();
						return Promise.reject(error);
					});
			}

			return promise.then(() => {
				console.groupEnd();
				const { testers = [] } = data;
				testers.push({ label, value, tests });
				return { value, testers };
			}, (error) => {
				console.groupEnd();
				return Promise.reject(error);
			});
		}
	};
}

/* @if TARGET="NODEJS" */
module.exports = jsTester;
/* @endif */
/* @if TARGET="BROWSER_ES6MODULE" **
export default jsTester;
/* @endif */
/* @if TARGET="BROWSER_ES5" || TARGET="BROWSER_ES6" **
/* exported jsTester */
/* @endif */
