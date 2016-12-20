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

///////////////////////////////////////////////////////////////////////////////

let Node = class {
	constructor (item, next) {
		this.item = item;
		this.next = next && new Node(next);
	}
	appendToTail (item) {
		let n = this;
		while(n.next) { n = n.next; }
		n.next = new Node(item);
	}
	deleteNode (item) {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
		let nn = this, n;
		while(nn.item !== item) { 
			if(nn.next !== undefined){
				n = nn;
				nn = n.next;
			} else return;
		}
		n.next = nn.next;
		delete nn.item;
	}
	toString () {
		let print = "";
		let n = this;
		while(n.next) { 
			print += n.item + ":"; 
			n = n.next; 
		}
		print += n.item; 
		return print;
	}
}
export function doLinkedList () {
	let head = new Node (1);
	head.appendToTail(2);
	head.appendToTail(3);
	head.appendToTail(4);
	head.appendToTail(5);
	head.deleteNode(3);
	return {
		value: head,
		description: "LinkedList: appendToTail 1 through 5 and deleteNode 3."
	};
}