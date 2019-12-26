class Node{
	constructor(x, y){
		this.y    = y;
		this.x    = x
		this.next = null;
	}
}


class LinkedList{
	constructor(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}



	deleteList(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}



	getSize(){
		return this.size;
	}


	isEmpty(){
		return this.size == 0;
	}


	insertFront(x, y){
		let newNode = new Node(x, y);
		if( this.isEmpty() ){
			this.head = newNode;
			this.tail = newNode;
		}
		else{
			newNode.next = this.head;
			this.head = newNode;
		}
		this.size++;
	}




	insertLast(x, y){
		let newNode = new Node(x,y);
		if( this.isEmpty() ){
			this.head = newNode;
			this.tail = newNode;
		}
		else{
			this.tail.next = newNode;
			this.tail = this.tail.next;
		}
		this.size++;
	}


	removeFirst(){
		if( this.head == this.tail ){
			let first = this.head;
			this.head = null;
			this.tail = null;
			this.size--;
			return first;
		}

		else if( !this.isEmpty() ){
			let first = this.head;
			this.head = this.head.next;
			this.size--;
			return first;
		}
		return null;
	}



	removeLast(){
		if( this.head == this.tail ){
			let p = this.head;
			this.head = this.tail = null;
			return p;
			this.size--;
		}

		if( !this.isEmpty() ){
			let p = this.head;
			let i;
			for( i = 0; i < this.size-2; i++){
				p = p.next;
			}
			let last = p.next;
			this.tail = p;
			this.tail.next = null;
			this.size--;
			return last;
		}
		return null;
	}




	indexOf(node){
		let p = this.head;
		let index = 0;
		while( p != null ){
			if( node.x == p.x && node.y == p.y )
				return index;
			p = p.next;
			index++;
		}
		return null;
	}



	getFirst(){
		if( !this.isEmpty() ){
			return this.head;
		}
		return null;
	}


	getLast(){
		if( !this.isEmpty() ){
			return this.tail;
		}
		return null;
	}



	get(n){
		if( n < this.size ){
			let p = this.head;
			for( let i = 0; i < n; i++ ){
				p = p.next;
			}
			return p;
		}
		return null;
	}

	printList(){
		let currentNode = this.head;
		while( currentNode ){
			console.log(currentNode.x + ", " + currentNode.y);
			currentNode = currentNode.next;
		}
	}


}
