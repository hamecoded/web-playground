/**
 * interview Questions Dropbox
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

export function eliminateInlineStyle(){
	let el = document.getElementById('template');

	_eliminateInlineStyle(el);

	return {
		description: 'traverse the document and replace every inline style with a dynamic css class definition',
		value: ''
	}
}

/**
 *  recurse over el and it's children to replace any inline styles with 
 *  a single style block
 * @param  {[type]} el  [description]
 * @param  {Array} clz  an Array of css body per class
 * @return {[type]}     [description]
 */
function _eliminateInlineStyle(el, clz){
	let startPoint = false;
	let clzPrefix = 'eisClass';

	if(!clz){
		startPoint = true;
		clz = [];
	}

	// eliminateInlineStyle for current el
	let css = el.getAttribute('style');
	if(css){
		let i = clz.length;
		clz.push(css);
		el.removeAttribute('style');
		el.classList.add(clzPrefix + i);
	}
	// recurse on children
	for ( let child of el.children) {
		_eliminateInlineStyle(child, clz);
	}

	// embed style element back when recursion completed
	if(startPoint){
		let styleEl = _genStyleElement(clz, clzPrefix);
		el.prepend(styleEl);
	}
}

/**
 * given a hash of classNames and their contents,
 *  create and return an HTMLStyleElement off it 
 * @param  {Array} stylz an Array of css body per class
 * @return {StyleDomElement}   the generated style block 
 */
function _genStyleElement(stylz, prefix) {
	let style = document.createElement('style');
	style.type = 'text/css';

	//build css
	let css = '';
	for(let i in stylz){
		css += '.' + prefix + i + ' {' + stylz[i] + '}\n';
	}

	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	return style;
}