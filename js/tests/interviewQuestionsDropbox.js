/**
 * return all elements containing a certain class name
 *  afterwhich step 2 of the interview was:
 *   getByClassNameByHierarchy(element, hierarchyClassName)   // a > b > c
 * @param  {[type]} domElement [description]
 * @param  {[type]} className  [description]
 * @return {[type]}            Returns: [<div id="e1" />, <div id="e3" />, <div id="e5" />] 
 */
export function getByClassName(domElement = 'e1', className = 'a') {
	let isId = typeof domElement === 'string';
	if(isId){
		domElement = document.getElementById(domElement);
	}
    let arr = _getByClassName(domElement, className);
    let output = arr.reduce(function(accumulator, currentValue) {
	  return accumulator + currentValue.id + ',';
	}, '');

    return {
		description: 'First Interview: implement getByClassName then getByClassNameByHierarchy',
		value: output
	};
}

function _getByClassName(domElement, className) {
    let output = [];
    if(domElement.classList.contains(className)){
      output.push(domElement);
    }
    for ( let el of domElement.children) {
        output = output.concat(_getByClassName(el, className));
    }
    return output;
}

///////////////////////////////////////////////////////////

/**
 * given an element return it's DOM Equality signature
 * 
 * @param  {[type]} el         element to inspect
 * @param  {[type]} descendant a recursion backtracing Object that would eventally get returned
 * @return {[type]}            return it's DOM Equality signature, 
 *                              eg: ['SPAN':1,'DIV':1,'IMG':2]
 */
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
		let notFound =  obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key);
		let notEqual = obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key];
		if( notFound || notEqual ) {
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
		description: 'Question 1-1: DOM Equality - DOM Nodes are “DOM Equal” if they have the same number of descendant elements of every type.',
		value: isEqual(el1Inspection,el2Inspection)
	}
	// Note: JSON.stringify(el1Inspection) === JSON.stringify(el2Inspection)
	// does not promise order hence unreliable
}

///////////////////////////////////////////////////////////

/**
 * Given an element, please implement the following function:
 *  function equalElements(element)
 * Which returns all the equality groups.
 * Equality group is defined as a list of all descendant elements which are DOM Equal
 *  [[elem1, elem2], ...]
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
export function equalElements(element) {
	element = element || document.getElementById("root");
	let domSnapshots = _equalElements(element);

	let output = '';
	
	// print domSnapshots
	for (var [el, value] of domSnapshots) {
	  output += el.tagName + '>' + JSON.stringify(value) + '\n';
	}

	// build groups map of el to dom-snapshot map
	output += '\nResults of comaprisons: \n';
	let groups = new Map ();
	domSnapshots.forEach(function(valueObj, keyEl, map){
		let group = groups.get(valueObj) || [];
		group.push(keyEl);
		groups.set(valueObj, group);
	});

	// print groups
	for (var [key, value] of groups) {
		let els = value.reduce(function(accumulator, currentValue) {
		  return accumulator + (currentValue.id || currentValue.tagName) + ',';
		}, '');
	  	output += JSON.stringify(key) + '> ' + els + '\n';
	}

	return {
		description: 'Question 1-2: returns all the equality groups descendant off given element',
		value: output
	}
}

/**
 * returns a map with an el as a key and the domEquality snapshot object as the value
 * check is limited on siblings only, no drilling down
 * @param  {[type]} element      [description]
 * @param  {[type]} domSnapshots [description]
 * @return {[type]}              [description]
 */
function _equalElements(element, domSnapshots) {
	domSnapshots = domSnapshots || new Map ();
	for(let child of element.children){		
		if(child.children.length > 0){ 	// take into account only none leaf elements
			let domEq = inspectDom(child);
			for (var [el, xdomEq] of domSnapshots) {
			  //refactor domSnapshots to hold similar value refs based on isEqual
			  if(isEqual(domEq, xdomEq)){
			  	domEq = xdomEq;
			  }
			}
			domSnapshots.set(child, domEq);
			_equalElements(child, domSnapshots);
		}
	}
	return domSnapshots;
}

///////////////////////////////////////////////////////////

