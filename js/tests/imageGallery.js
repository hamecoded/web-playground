//DropBox Interview
var imgThumbs = ['http://placehold.it/400x400/f0d/f',
'http://placehold.it/300x350/00d/f',
'http://placehold.it/300x200/0df/f',
'http://placehold.it/350x300/fd0/f',
'http://placehold.it/200x300/9d0/f'];
var imgFull = [
'http://placehold.it/800x800/f0d/f',
'http://placehold.it/600x700/00d/f',
'http://placehold.it/600x400/0df/f',
'http://placehold.it/700x600/fd0/f',
'http://placehold.it/400x600/9d0/f'];

var myGallery, thumbnails, largePreview;

function setSelected (el) {
  var ls = thumbnails.querySelectorAll('.thumb');
  ls.forEach(function(thumb){
    thumb.classList.remove('selected');
  })
  el.classList.add('selected');
}


export function imageGallery () {
	myGallery = document.getElementById('myGallery');
	thumbnails = myGallery.querySelector('.thumbnails');
	largePreview = myGallery.querySelector('.largePreview');
	
	imgThumbs.forEach(function(url, index){
	  var el = document.createElement('div');
	  var img = new Image();
	  img.src = url;
	  el.appendChild(img);
	  el.classList.add('thumb');
	  if(index === 0){
	      el.classList.add('selected');
	  }
	  
	  el.dataset.i = index;
	  
	  thumbnails.appendChild(el);
	  
	  el.addEventListener('click', function(event){
	   var i = el.dataset.i;
	    console.log();
	    var img = new Image();
	  img.src = imgFull[i];
	  largePreview.innerHTML = "";
	    largePreview.appendChild(img);
	    setSelected(el);
	    //event.stopPropagation();
	  });
	});
 }