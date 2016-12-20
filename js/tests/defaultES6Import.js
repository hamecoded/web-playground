export default function(param = "default param"){
	console.log('demonstrating default ES6 Import ran! with param: ', param);
	return { value: 'demonstrating default ES6 Import ran! with param: ' + param,
	description: "A test to demonstrate using a default module export and passing it params"};
}