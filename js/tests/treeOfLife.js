/**
 *
 http://jsfiddle.net/m1erickson/JGSJ5/

 http://www.kevlindev.com/geometry/index.htm
 http://www.kevlindev.com/gui/math/intersection/Intersection.js
 https://github.com/thelonious/kld-intersections

 http://mathworld.wolfram.com/Circle-CircleIntersection.html

 canvas to video:
 https://stackoverflow.com/questions/18509385/html-5-video-recording-and-storing-a-stream
 https://github.com/antimatter15/whammy
 http://www.smartjava.org/content/capture-canvas-and-webgl-output-video-using-websockets

 */


var context, stream, recorder;
const radius = 50;
var timeGap= 0;

function draw (point, stroke, fill, r, gap) {
	timeGap += gap !== undefined || 100;
	_.delay(() => {
		context.beginPath();
		context.fillStyle = fill || 'white';
		context.strokeStyle = stroke || 'black';

		context.arc(point.x, point.y, r || radius, 0, 2 * Math.PI, false);
		context.lineWidth = 2;
	    context.stroke();
	    fill && context.fill();
	}, timeGap);
}


function finalize (color, prevTier){
	context.strokeStyle = color;
	var retTier= [];

	for(let i = 0 ; i < 12;) {
		let cn = Intersection.intersectCircleCircle(prevTier[++i],radius,prevTier[++i%12],radius).points[1];
		retTier.push( cn );
		draw(cn, 'black','rgba(0, 0, 0, 0.5)',undefined, 0);
	}

	return retTier;
}

function nextTier (color, prevTier, prev2Tier, count, fill, gap) {
  	context.strokeStyle = color;
	var retTier= [];
	count = count || 5;

	if(prev2Tier){
		for(let i = 0; i < count; ){
			let cn = Intersection.intersectCircleCircle(prevTier[i],radius,prev2Tier[i],radius).points[0];
			retTier.push( cn );
			draw(cn, color);
			cn = Intersection.intersectCircleCircle(prevTier[i],radius,prev2Tier[++i],radius).points[1];
			retTier.push( cn );
			draw(cn, color);
		}
		let cn = Intersection.intersectCircleCircle(prevTier[count],radius,prev2Tier[count],radius).points[0];
		retTier.push( cn );
		draw(cn, color);
		cn = Intersection.intersectCircleCircle(prev2Tier[0],radius,prevTier[count],radius).points[0];
		retTier.push( cn );
		draw(cn, color);
		return retTier;
	}

	let i = 0;
	while(i < count) {
		let cn = Intersection.intersectCircleCircle(prevTier[i],radius,prevTier[++i],radius).points[1];
		retTier.push( cn );
		draw(cn, color, fill, undefined, gap);
	}
	let cn = Intersection.intersectCircleCircle(prevTier[count],radius,prevTier[0],radius).points[1];
	retTier.push( cn );
	draw(cn, color, fill, undefined, gap);

	return retTier;
};


var startBtn, stopBtn, ul;
function startRecording() {
	var options;
	if (MediaRecorder.isTypeSupported('video/mp4')) {
		options = {mimeType: 'video/mp4'};
	} else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
		options = {mimeType: 'video/webm; codecs=vp9'};
	} else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
		options = {mimeType: 'video/webm; codecs=vp8'};
	}else {
		return;
	}
	recorder = new MediaRecorder(stream, options);
	recorder.start();
	stopBtn.removeAttribute('disabled');
	startBtn.disabled = true;
}
function stopRecording() {
  recorder.ondataavailable = e => {
    ul.style.display = 'block';
    var a = document.createElement('a'),
      li = document.createElement('li');
    a.download = ['TreeOfLife_', (new Date() + '').slice(4, 28), '.webm'].join('');
    a.href = URL.createObjectURL(e.data);
    a.textContent = a.download;
    li.appendChild(a);
    ul.appendChild(li);
  };
  recorder.stop();
  startBtn.removeAttribute('disabled');
  stopBtn.disabled = true;
}

export function treeOfLife (step) {
	step= parseInt(step);
	console.log("input 1: for the Vesica Paisis\ninput 2: for the Flower Of Life\ninput 3: for the Tree Of Life\nno input: up to the Fruit Of Life");

	var canvas = document.getElementById('treeOfLifeCanvas');

	// initialize video recorder
	startBtn = document.getElementById('start');
	stopBtn = document.getElementById('stop');
	ul = document.getElementById('ul');
	startBtn.onclick = startRecording;
	stopBtn.onclick = stopRecording;
	ul.style.display = 'none';
	stopBtn.disabled = true;

	// create stream from canvas
	stream = canvas.captureStream(25);
	var video = document.querySelector('#treeOfLifeVideo');
	video.srcObject = stream;

	// start recording
	startRecording();
	//_.delay(stopRecording, 15000); // record 15 seconds

	// initialize context
	context = canvas.getContext('2d');
	context.save();
	
	// center circle
	var c1 = new Point2D(canvas.width / 2, canvas.height / 2);
	draw(c1, 'orange');

	// tier 2 circles - vesica paisis
	//first circle above central circle
    var c2 = new Point2D(c1.x, c1.y-radius);
	draw(c2, 'red');
	//the rest of tier 2 looping circles
	var arrTier2= [c2];
	var i = 5, inter = Intersection.intersectCircleCircle(c1,radius,c2,radius);
	while(inter.points.length > 0 && i--) {
		let cn = inter.points[0];
		arrTier2.push(cn);
		draw(cn, 'red');
		inter = Intersection.intersectCircleCircle(c1,radius,cn,radius);
	}

	if(step === 1) return;
	// the tree of life
	var arrTier3= nextTier('green ', arrTier2);
	var arrTier4= nextTier('pink', arrTier3);

	// the tree of life encompassing circle
	draw(c1, 'black', 'rgba(0, 0, 0, 0.2)', radius*3);
	
	if(step === 2) return;
	// the outer circles
	var arrTier5= nextTier('blue', arrTier4, arrTier3);
	var arrTier6= nextTier('yellow', arrTier5,undefined,11);
	var arrTier7= nextTier('red', arrTier6,undefined,11);
	//var arrTier8= nextTier('gray', arrTier7,arrTier6,11);
	//var arrTier9= nextTier('brown', arrTier8,undefined,23);

	if(step === 3) return;
	// marking the fruit of life
	draw(c1, 'black', 'rgba(0, 0, 0, 0.5)', 0); //first circle fill
	nextTier('black', arrTier3, undefined, undefined, 'rgba(0, 0, 0, 0.5)', 0); //fill for the fruit of life middle tier
	var arrFinalize= finalize('black', arrTier7); //the fruit of life completion

	return {
		description: "tree of life rendered on a Canvas."
	};
}
