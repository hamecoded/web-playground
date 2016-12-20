let tests = ["|data sources", "doLinkedList", "doQueue", "|inheritance", "inheritanceDepth", "doInheritance", "|basic", "defaultES6Import"];

import {doQueue, doLinkedList} from 'js/tests/dataStructures.js';
import {inheritanceDepth} from 'js/tests/inheritanceDepth.js';
import {doInheritance} from 'js/tests/protoTypeInheritance.js';
import defaultES6Import from 'js/tests/defaultES6Import.js'; 















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
	let output = eval(testName)(testInp);
	desc.innerText = output.description;
	if(output){
  		content.insertAdjacentHTML( 'beforeend', '<p>' + output.value + '</p>');
	}
});
document.getElementById("clearContent").addEventListener('click', function(event){
	content.innerHTML = "";
	desc.innerText = "";
});
