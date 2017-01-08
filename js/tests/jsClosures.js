//https://www.linkedin.com/groups/121615/121615-6215005143927128066?midToken=AQGYhO7AWA4_Qw&trk=eml-b2_anet_digest_of_digests-group_discussions-38-discussion~subject&trkEmail=eml-b2_anet_digest_of_digests-group_discussions-38-discussion~subject-null-aimy5~ixn1x1jy~ci

export function q1 () {
	return {
		description: '',
		code: new Function (`
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
		`)
	};
}