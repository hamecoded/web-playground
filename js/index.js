let tests = ["inheritanceDepth", "doInheritance", "defaultES6Import"];

import defaultES6Import from 'js/tests/defaultES6Import.js'; 
import {description as defaultES6ImportDESC} from 'js/tests/defaultES6Import.js'; 
import {doInheritance} from 'js/tests/protoTypeInheritance.js';
import {description as doInheritanceDESC} from 'js/tests/protoTypeInheritance.js';
import {inheritanceDepth} from 'js/tests/inheritanceDepth.js';
import {description as inheritanceDepthDESC} from 'js/tests/inheritanceDepth.js';




















//Determine which test to run
let value, 
	testsSelectEl = document.getElementById("testsSelectEl"), 
	content = document.getElementById("content"),
	desc = document.getElementById("test_description");
for(let test in tests){
	let option = document.createElement('option');
	let optionTxt = document.createTextNode(tests[test]);
    option.appendChild(optionTxt);
	testsSelectEl.append(option);
}
document.getElementById("justDoit").addEventListener('click', function(event){
	value= document.getElementById("justDoitValue").value;
	value = value === "" ? undefined : value;
	let testName = testsSelectEl.value;
	let output = eval(testName)(value);
	desc.innerText = eval(testName + "DESC");
	if(output){
  		content.insertAdjacentHTML( 'beforeend', '<p>' + output + '</p>');
	}
});
document.getElementById("clearContent").addEventListener('click', function(event){
	content.innerHTML = "";
	desc.innerText = "";
});
