//https://www.linkedin.com/groups/121615/121615-6215005143927128066?midToken=AQGYhO7AWA4_Qw&trk=eml-b2_anet_digest_of_digests-group_discussions-38-discussion~subject&trkEmail=eml-b2_anet_digest_of_digests-group_discussions-38-discussion~subject-null-aimy5~ixn1x1jy~ci

export function q1 () {
	return {
		description: 'the this is the Window Object',
		code: `
	var obj = {
		value: "Hello World!",
		method: function () {
			console.log(this.value);
		}
	};

	var obj2 = {
		value: "Goodbye !",
		method: obj.method.bind(this)
	}
	
	obj2.method();
		`
	};
}

export function q2_1 () {
	return {
		description: 'upon invocation method is called under obj context',
		code: `
	var obj = {
		value: "Hello World!",
		method: function () {
			console.log(this.value);
		}
	};

	var method = obj.method();
		`
	};
}


export function q2_2 () {
	return {
		description: 'upon invocation method is called under Window context',
		code: `
	var obj = {
		value: "Hello World!",
		method: function () {
			console.log(this.value);
		}
	};

	var method = obj.method;
	method();
		`
	};
}

export function q3_1 () {
	return {
		description: 'delete will not delete',
		code: `
	var obj = {
		"undefined": "GoodBye",
		"property": "Hello World!"
	};

	delete obj;
	console.log(obj.property);
		`
	};
}

export function q3_2 () {
	return {
		description: 'Using strict mode, not only delete won\'t delete but also you\'ll get an exception thrown',
		code: `
	"use strict";
	var obj = {
		"undefined": "GoodBye",
		"property": "Hello World!"
	};

	delete obj;
	console.log(obj.property);
		`
	};
}