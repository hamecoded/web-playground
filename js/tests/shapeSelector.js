export function shapeSelector () {
	bindGroup1();
	return {
		description: 'Shape selector',
		value: ''
	}
}
// https://www.sitepoint.com/jquery-vs-raw-javascript-3-events-ajax/
function bindGroup1 (){
	let shapeEls = document.querySelectorAll("#groupA > div");
	shapeEls.forEach(function(shapeEl){
		shapeEl.addEventListener("click", function(e, i, list) {
			//e.target === shapeEl
			shapeEls.forEach(function(sEl){
				sEl.classList.remove("selected"); 
			});
			shapeEl.classList.add("selected"); 
			console.log("you clicked " + shapeEl.className);
			e.preventDefault();
		});
	});
	
}