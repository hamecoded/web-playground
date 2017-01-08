export function Promise_all () {
	return {
		description: 'Promise.all resolves with a single array argument holding all resolved promises values by order once all have completed.',
		link: 'https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
		code: `
	var promise = new Promise(function(resolve) {
		setTimeout(resolve, 1000);
	})
	var promises = ['Hello World', 'Goodbye', 'undefined'].map(function(label){
		return Promise.resolve(label);
	});
	Promise.all(promises).then(console.log);
		`
	}
}