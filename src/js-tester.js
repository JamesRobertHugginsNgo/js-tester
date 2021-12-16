function jsTester(...args) {
	if (args.length === 1) {
		return jsTester(null, ...args);
	}
	if (args.length === 2) {
		return jsTester({}, ...args);
	}

	const [initValue, label, code] = args;
	let value = initValue;

	let promise = Promise.resolve().then(() => {
		if (label) {
			console.log(label);
		}
		return code(value);
	}).then((returnedValue = value) => {
		value = returnedValue;
	});

	return {
		test(...args) {
			if (args.length === 1) {
				return jsTester(null, ...args);
			}
			const [label, code] = args;

			promise = promise.then(() => {
				if (label) {
					console.log(`  ${label}`);
				}
				return code(value);
			}).then((passed) => {
				if (passed) {
					console.log('    %c\u2714 Passed', 'color: green;');
				} else {
					console.log('    %c\u2716 Failed', 'color: red;');
				}
			}, () => {
				console.error('Error');
			});

			return this;
		},

		end() {
			return promise;
		}
	};
}

// @ifdef NODE
module.exports = jsTester;
// @endif
