function inspectDom(el, descendant) {
	descendant = descendant || {};
	for(let child of el.children){		
		descendant[child.nodeName] = descendant[child.nodeName] ? ++descendant[child.nodeName] : 1;
		if(child.children.length > 0){
			inspectDom(child, descendant);
		}
	}
	return descendant;
}

/**
 * shallow compare
 * @param  {Object}  obj1  
 * @param  {Object}  obj2 
 * @return {Boolean}      [description]
 */
function isEqual (obj1, obj2) {
	if( Object.keys(obj1).length !== Object.keys(obj2).length ) return false;

	for(let key in obj1){
		if( obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key] ) {
			return false;
		}
	}

	return true;
}

export function areEqual() {
	let element1= document.getElementById("element1");
	let element2= document.getElementById("element2");

	let el1Inspection = inspectDom(element1), el2Inspection = inspectDom(element2);

	return {
		description: 'Question 1: DOM Equality - DOM Nodes are “DOM Equal” if they have the same number of descendant elements of every type.',
		value: isEqual(el1Inspection,el2Inspection)
	}
	// Note: JSON.stringify(el1Inspection) === JSON.stringify(el2Inspection)
	// does not promise order hence unreliable
}

