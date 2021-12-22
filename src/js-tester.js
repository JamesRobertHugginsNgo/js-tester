const jsTester = (label, code) => ((label, code) => {
	const tests = [];
	return {
		test(label, code) {
			tests.push({ label, code });
			return this;
		},

		promise(data = {}) {
			let { value = {} } = data;
			let promise = Promise.resolve(value)
				.then(() => {
					console.log(label);
					return code(value);
				})
				.then((result = value) => void (value = result));

			for (let index = 0, length = tests.length; index < length; index++) {
				const test = tests[index];
				const { label, code } = test;
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
						Object.assign(test, { passed });
					});
			}

			return promise.then(() => {
				const { testers = [] } = data;
				testers.push({ label, value, tests });
				return { value, testers };
			});
		}
	};
})(label, code);

/* @if MODULE="COMMONJS" */
module.exports = jsTester;
/* @endif */
/* @if MODULE!="COMMONJS" && MODULE!="ES6" **
/* exported jsTester */
/* @endif */
/* @if MODULE="ES6" **
export default jsTester;
/* @endif */
