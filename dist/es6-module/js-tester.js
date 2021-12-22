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
							console.log('    %c\u2714 Passed', 'color: green;');
						} else {
							console.log('    %c\u2716 Failed', 'color: red;');
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

export default jsTester;
