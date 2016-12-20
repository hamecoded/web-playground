//class declaration done in the form of class expression 
//for es6 module loader, export function to know off class Queue, otherwize Queue would be undefined
//so classic "class Queue {" would simpy not work cause babel export support is yet experimental 
//while no js runtime yet implemented es6 modules 
let Queue = class {
	constructor () {
		this.queue = [];
	}

	dequeue (){
		return this.queue.shift();
	}

	enqueue (item){
		this.queue.push(item);
	}

	//get the item at the front of the queue
	peek () {
		return this.queue[0];
	}

	toString() {
        return this.queue.toString();
    }
}

export function doQueue () {
	let q = new Queue ();
	q.enqueue(1);
	q.enqueue(2);
	q.enqueue(3);
	q.dequeue();
	return { value: q, 
		description: "queue implementation. enqueue 1 2 3 and then dequeue"};
};