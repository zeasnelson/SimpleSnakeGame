

class Snake{


	constructor(){
		this.snakeBody       = new LinkedList();
		this.foodXY          = new LinkedList();

		this.snacksEatenCount = 0;		    //to gradually increase snake speed
		this.snakeSize        = 3;				//starting snake speed
		this.gridSize         = 20;				//default grid size
		this.oldDirection     = "notMoving";	//to know when the snake turned, draws the body different at turns
		this.currentDirection = "notMoving";	//current snake direccion
		this.newDirection     = "notMoving"; //new requested direccion
		this.isSnakeDead      = false;
		this.isThereFood      = false;
	}




	getSnakeSize(){
		return this.snakeBody.getSize();
	}



	//creates the starting snake
	setStartingPoint(){
		//draw a snake lengh 3
		let lengh = 3;
		for( let i = 0; i < lengh; i++){
			let coordinates = new Node(8, i);
			this.snakeBody.insertFront(8, i);
			this.drawPixel( coordinates, "snakeTheme/" + (i < lengh-1 ? "bodyRight" : "headRight") );
		}
		//give it food
		this.generateFood(this.gridSize);
		this.isThereFood = true;
	}




	//moves the snake in the direccion spedified @currentDirection variable
	moveSnake(){

		let x = this.snakeBody.getFirst().x;
		let y = this.snakeBody.getFirst().y;

		switch(this.currentDirection){
			case "right":
				y++;
				break;
			case "left":
				y--;
				break;
			case "up":
				x--;
				break;
			case "down":
				x++;
				break;
			default:
				return;
		}

		//if "phasing" is allowed, phase coordinates :)
		if( !areThereWalls ){
			x = this.phaseX(x);
			y = this.phaseY(y);
		}

		let newCoordinates = new Node(x, y);
		this.drawTail();
		//before moving snake, check if it would die with the new coordinates
		if( this.couldSnakeDie(newCoordinates) ){
			this.isSnakeDead = true;
			setTimeout(drawGameOver, 800);
			return;
		}
		this.drawHead(newCoordinates);

	}


	//if areThereWalls == false
	//the snake can "phase" to the other side of the grid
	phaseX(x){
		if( x > 19 )
			return 0;
		else if( x < 0)
			return 19;
		else
			return x;
	}



	//same here
	phaseY(y){
		if( y > 19 )
			return 0;
		else if( y < 0)
			return 19;
		else
			return y;
	}



	//check if the snake would die, given new coordinates
	couldSnakeDie(coordinates){
		if( !coordinates instanceof Node ){
			return;
		}

		//if phasing is not allowed, check that it did't hit a wall or ate itself
		if(  areThereWalls &&  ( !this.isWithInMatrix(coordinates) ||  this.didSnakeEatItself(coordinates) ) ){
			return true;
		}
		//if phasing is allowed, check if the snake ate itself
		else if( !areThereWalls && this.didSnakeEatItself(coordinates) ){
			return true ;
		}

		return false;
	}




	//Find if snake ate itself, this is explained in the documentaiton file
	didSnakeEatItself(coordinates){
		if( coordinates instanceof Node ){
			let buttonText = grid.getButtonColor(coordinates.x, coordinates.y);
			if( buttonText.match('snakeTheme') )
				return true;
			else
				return false;
		}
		return false;
	}



	//draw the snake's head
	drawHead(newCoordinates){
		if( !newCoordinates instanceof Node ){
			return;
		}

		let oldCoordinates  = this.snakeBody.getFirst();//get the current head location in the grid
		let foodCoordinates = this.foodXY.getLast();		//the last generated food is the last node in the list

		//generate more food if the snake just ate something
		if( this.equal( foodCoordinates, oldCoordinates ) ){
					this.generateFood(this.gridSize);
					this.snacksEatenCount++;
					this.snakeSize++;
					this.drawPixel(oldCoordinates, "snakeTheme/eaten");//draw the bubble after snake eats something
		}
		else if( this.oldDirection != this.currentDirection && this.oldDirection != "notMoving"){
			this.drawTurn(oldCoordinates);
		}
		else{
			//Or just draw the body
			if(this.currentDirection == "up" || this.currentDirection == "down")
				this.drawPixel(oldCoordinates, "snakeTheme/bodyUp");
			else if( this.currentDirection == "left" || this.currentDirection == "right" )
				this.drawPixel(oldCoordinates, "snakeTheme/bodyRight");
		}


		//each snake "pixel" is not circular so each pixel has to be drawn according to the snake's direccion
		this.drawPixel(newCoordinates, this.getHeadDirection(newCoordinates) );
		//add the new snake head location to the linked list
		this.snakeBody.insertFront(newCoordinates.x, newCoordinates.y);

	}


	//Returns the name of the image according to the direction the snake is going next
	getHeadDirection(coordinates){

		let headTheme = (this.isNeighborCellFood(coordinates) ? "open" : "head");
		switch(this.currentDirection){
			case "right":
				return "snakeTheme/"+ headTheme + "Right";

			case "left":
				return "snakeTheme/"+ headTheme + "Left";

			case "up":
				return "snakeTheme/"+ headTheme + "Up";

			case "down":
			  return "snakeTheme/"+ headTheme + "Down";
			}
	}


	//Draws the tail
	drawTail(){
		let food = this.foodXY.getFirst();
		let tail = this.snakeBody.getLast();

		if( food && this.equal( food, tail ) ){
			this.foodXY.removeFirst();
		}
		else{
			this.drawPixel(tail, "white");
			this.snakeBody.removeLast();
		}

	}


	//Properly draw snake when it turns
	drawTurn(coordinates){

		if( !coordinates instanceof Node ){
			return;
		}

		if( this.oldDirection == "right" && this.currentDirection == "up" || this.oldDirection == "down" && this.currentDirection == "left")
			this.drawPixel(coordinates, "snakeTheme/rightUp");

		else if( this.oldDirection == "up" && this.currentDirection == "left" || this.oldDirection == "right" && this.currentDirection == "down")
			this.drawPixel(coordinates, "snakeTheme/rightDown");

		else if( this.oldDirection == "down" && this.currentDirection == "right" || this.oldDirection == "left" && this.currentDirection == "up")
			this.drawPixel(coordinates, "snakeTheme/upLeft");

		else if( this.oldDirection == "up" && this.currentDirection == "right" || this.oldDirection == "left" && this.currentDirection == "down")
			this.drawPixel(coordinates, "snakeTheme/upRight");

	}



	//Checks if the "cell" next to the snake's head has food
	//to open the snakes mouth
	isNeighborCellFood(head){
		if( !head instanceof Node ){
			return;
		}
	  	let food = this.foodXY.getLast();

	  	//ckech down
	  	if( food.x == head.x+1 && food.y == head.y )
	    	return true;

	  	//ckech up
	  	else if( food.x == head.x-1 && food.y == head.y )
	    	return true;

	  	//ckech right
	  	else if( food.x == head.x && food.y == head.y+1 )
	    	return true;

	  	//ckech left
	  	else if( food.x == head.x && food.y == head.y-1 )
	    	return true;

	  	return false;
	}



	//Sets the new snake direccion spedified by the user
	setSnakeDirection(newDirection){
		if( this.currentDirection == "notMoving"){
			if( newDirection != "left") //the snake is initially pointing to the right, so it can't go left
				this.currentDirection = newDirection;
			return;
		}

		let tempDirection = this.getNewDirection(newDirection, this.newDirection);
		if( tempDirection != null)
			this.newDirection = tempDirection;
	}



	//Checks if the new direccion requested by the player is allowerd
	getNewDirection(oldDirection, newDirection){

		if( oldDirection == "left" && newDirection != "right")
			return "left";

		else if( oldDirection == "right" && newDirection != "left")
			return "right";

		else if( oldDirection == "up" && newDirection != "down")
			return "up";

		else if( oldDirection == "down" && newDirection != "up")
			return "down";

		else return null;
	}


	//because of this function, the grid file has to be compiled first
	drawPixel(coordinates, color) {
		if( !coordinates instanceof Node ){
			return;
		}
		let button = document.getElementById("img_" + coordinates.x + "_" + coordinates.y);
		button.setAttribute("src", "images/" + color + ".jpg");
		button.setAttribute("alt", color);
	}



	//Check if given coordinates are within the matrix or grid
	//checks if the snake's head location is still with the grid
	isWithInMatrix(coordinates){
		if( !coordinates instanceof Node ){
			return;
		}
		let x = coordinates.x;
		let y = coordinates.y;
		if( x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize ){
			return true;
		}
		return false;
	}




	//generates food at a random place in the grid
	generateFood(gridSize){
		let foundNewFoodLocation = false;

		while( !foundNewFoodLocation ){
			let x = this.randomNumber(gridSize);
			let y = this.randomNumber(gridSize);
			let coordinates = new Node(x, y);

			if( grid.getButtonColor(x, y) == "white" ){
				this.drawPixel( coordinates, "Food/food" + this.randomNumber(7));
				this.foodXY.insertLast(x, y);
				foundNewFoodLocation = true;
			}

		}

	}





	//generates random number
	randomNumber(range){
		return Math.floor(Math.random() * range);
	}


	//checks equallity of two nodes by the x and y coordinates
	equal(node1, node2){
		if( !node1 instanceof Node && !node2 instanceof Node){
			return;
		}

		if( node1 && node2 ){
			return (node1.x == node2.x) && (node1.y == node2.y);
		}
		return false;
	}


}
