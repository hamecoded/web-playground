let tests = ["doQueue", "inheritanceDepth", "doInheritance", "defaultES6Import"];

import {doQueue} from 'js/tests/dataStructures.js';
import {inheritanceDepth} from 'js/tests/inheritanceDepth.js';
import {doInheritance} from 'js/tests/protoTypeInheritance.js';
import defaultES6Import from 'js/tests/defaultES6Import.js'; 















//Determine which test to run
let testsSelectEl = document.getElementById("testsSelectEl"), 
	content = document.getElementById("content"),
	desc = document.getElementById("test_description");
for(let test in tests){
	let option = document.createElement('option');
	let optionTxt = document.createTextNode(tests[test]);
    option.appendChild(optionTxt);
	testsSelectEl.append(option);
}
document.getElementById("justDoit").addEventListener('click', function(event){
	let testInp= document.getElementById("justDoitValue").value;
	testInp = testInp === "" ? undefined : testInp;
	let testName = testsSelectEl.value;
	let output = eval(testName)(testInp);
	desc.innerText = output.descrition;
	if(output){
  		content.insertAdjacentHTML( 'beforeend', '<p>' + output.value + '</p>');
	}
});
document.getElementById("clearContent").addEventListener('click', function(event){
	content.innerHTML = "";
	desc.innerText = "";
});
