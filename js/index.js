let tests = ["|DropBox", "equalElements", "areEqual", "getByClassName", "|data sources", "doBinaryTree", "doStack", "doLinkedList", "doQueue", "|inheritance", "inheritanceDepth", "doInheritance", "|basic", "defaultES6Import"];

import {doQueue, doLinkedList, doStack, doBinaryTree} from 'js/tests/dataStructures.js';
import {inheritanceDepth} from 'js/tests/inheritanceDepth.js';
import {doInheritance} from 'js/tests/protoTypeInheritance.js';
import defaultES6Import from 'js/tests/defaultES6Import.js'; 
import {areEqual, equalElements, getByClassName} from 'js/tests/interviewQuestionsDropbox.js';












//Determine which test to run
let testsSelectEl = document.getElementById("testsSelectEl"), 
	content = document.getElementById("content"),
	desc = document.getElementById("test_description");
let goption;	
for(let test of tests){
	let option;
	if(test.startsWith("|")){
		if(goption){
			testsSelectEl.append(goption);
		}
		goption = document.createElement('optgroup');
		goption.label = test.substr(1);
	}else{
		option = document.createElement('option');
		let optionTxt = document.createTextNode(test);
	    option.appendChild(optionTxt);
	}
	if(option && goption){
	    goption.append(option);
	}
}
testsSelectEl.append(goption);
document.getElementById("justDoit").addEventListener('click', function(event){
	let testInp= document.getElementById("justDoitValue").value;
	testInp = testInp === "" ? undefined : testInp;
	let testName = testsSelectEl.value;
	content.innerHTML = "";
	initTemplate(testName);
	let output = eval(testName)(testInp);
	
	desc.innerText = output.description;
	if(output){
		let strVal = output.value;
		if(typeof output.value !== 'string'){
			strVal = JSON.stringify(output.value);
		}
  		content.insertAdjacentHTML( 'beforeend', '<p>' + strVal + '</p>');
	}
	window.o = output.value;
});
document.getElementById("clearContent").addEventListener('click', function(event){
	content.innerHTML = "";
	desc.innerText = "";
});

/**
 * searches for an html template with a given test name for it's id
 * clones and inserts it to #content
 * https://developer.mozilla.org/en/docs/Web/HTML/Element/template
 * @param  {[type]} testName [description]
 * @return {[type]}          [description]
 */
function initTemplate (testName){
	// Test to see if the browser supports the HTML template element by checking
	// for the presence of the template element's content attribute.
	if ('content' in document.createElement('template')) {

	  // Instantiate the table with the existing HTML tbody
	  // and the row with the template
	  var t = document.querySelector(`#${testName}Template`);
	  if(t === null) return;
	  // Clone the new row and insert it into the table
	  var tmpl = document.createElement('div');
	  tmpl.id = "template";

	  var clone = document.importNode(t.content, true);
	  tmpl.appendChild(clone);
	  content.appendChild(tmpl);

	} else {
	  // HTML template element is not supported.
	}
}
