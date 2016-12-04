/**
 * example console output:
 * 
 function.prototype>constructor: Class2
	>__proto__.constructor: Class1
		>__proto__.constructor: Class0
			>__proto__.constructor: Object
		
 * @param  {Number} 	depth how many nested classes you'd like to generate
 * @return {undefined}       
 */
export function inheritanceDepth(depth = 3){
	var classes = [];

	for(let i =0; depth > i; i++){
		let className = `Class${i}`;
		let f = new Function("param1, param2", 'console.log("hello, with args: " + param1 + " and " + param2);');
		Object.defineProperty(f, 'name', {value: className, configurable: true});
		if(i>0){
			f.prototype = Object.create(classes[i-1].prototype);
			f.prototype.constructor = f;
		}
		classes.push(f);
	}

	let last = [...classes].pop();
	let current = last;
	let analyze = "function.prototype>constructor: ";
	var count = 1;
	while(current.prototype){
		analyze += (count >1 ? ">__proto__.constructor: " : "" ) + current.name + "\n" + Array(++count).join("\t");
		if(current.prototype.__proto__){
			current = current.prototype.__proto__.constructor;
		}else{
			break;
		}
	}
	console.log(analyze);
	return analyze;

}