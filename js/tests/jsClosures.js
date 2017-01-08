//Taken from: https://www.linkedin.com/groups/121615/121615-6215005143927128066?midToken=AQGYhO7AWA4_Qw&trk=eml-b2_anet_digest_of_digests-group_discussions-38-discussion~subject&trkEmail=eml-b2_anet_digest_of_digests-group_discussions-38-discussion~subject-null-aimy5~ixn1x1jy~ci

export function q1 () {
	return {
		description: 'the this is the Window Object',
		link: 'https://www.linkedin.com/groups/121615/121615-6215005143927128066?midToken=AQGYhO7AWA4_Qw&trk=eml-b2_anet_digest_of_digests-group_discussions-38-discussion~subject&trkEmail=eml-b2_anet_digest_of_digests-group_discussions-38-discussion~subject-null-aimy5~ixn1x1jy~ci',
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

export function q4 () {
	return {
		description: 'pass by ref, obj receives a whole new object. obj2 points to original instance',
		code: `
var obj = {
	"undefined": "GoodBye",
	"property": "Hello World!"
};

var obj2 = obj;
obj = {
	"property": "GoodBye"
}

console.log(obj2.property);
		`
	};
}

export function q5_1 () {
	return {
		description: 'all logs would appear by order, all holding 10 for value since by the time first timeout, loop had already finished, and "i" hanged on 10.',
		code: `
for (var i = 0; i < 10; ++i){
	setTimeout(function(){
		console.log(i);
	}, 1000);
}
		`
	};
}


export function q5_2 () {
	return {
		description: 'now let\'s repeat only using the "let" keyword. note that scope is kept.',
		code: `
for (let i = 0; i < 10; ++i){
	setTimeout(function(){
		console.log(i);
	}, 1000);
}
		`
	};
}



export function q5_3 () {
	return {
		description: 'and what if pre incrementation is substitutated for post incrementation?',
		code: `
for (let i = 0; i < 10; i++){
	setTimeout(function(){
		console.log(i);
	}, 1000);
}
		`
	};
}


export function q6 () {
	return {
		description: 'in first call the this is the array Object which has no \'n\' so evaluates to undefined, and undefined * 10, it\'s 10 because at the time of execution the for loop had long completed.',
		code: `
function createFunctions(){
	var result = new Array();
	for (var i=0; i <10;i++){
		result[i] = function(){
			return this.n * i;
		};
	}
	return result;
}

var multyplBy = createFunctions();
n = 10;

console.log(multyplBy[1]());
console.log(multyplBy[1].call({n:10}));
`
	};
}