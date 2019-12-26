


let grid           = new Grid();
let snake          = new Snake();

let areThereWalls  = false;
let autoSpeed      = false;
let isGamePaused   = true;
let speedInterval  = 60;  //default slowest snake speed


//Sets everything up
function setup() {
    grid.fillMatrix();
    grid.updateSpeedCount();
    snake.setStartingPoint();
    loop();//loop game
}



/*
  Loop that keeps the game running
  */
function loop(){

    let microSecondsCount = 0;
    setInterval( () => {
      //there is no need for the value to go beyond 6000, so just reset to zero
      if( microSecondsCount > 6000 ){
        microSecondsCount = 0;
      }
        microSecondsCount++;


      /**************************************************************************************************************************/

      if( autoSpeed && snake.snacksEatenCount >= 5 ){ //eat 5 times before increasing speed when "autoSpeed" is ON
          snake.snacksEatenCount = 0;
          if( speedInterval-2 > 12 ) {  //14 is the fastest playable speed
              speedInterval = speedInterval -2
          }
          grid.setRangeSliderPos( 100-((speedInterval-14)*2) );
      }

      if( !isGamePaused && microSecondsCount >= speedInterval ){
          let tempDirection = snake.getNewDirection(snake.newDirection, snake.currentDirection);
          if( tempDirection != null){
              snake.oldDirection = snake.currentDirection;//old direction is to draw turns
              snake.currentDirection = tempDirection;       //this prevents a serious bug, explained in the documentation file
          }

          if( !snake.isSnakeDead ){ //but still, don't walk snake if it's dead
              snake.moveSnake();
              grid.setSizeLabelText(snake.snakeSize);
          }

          microSecondsCount = 0;
      }

      /**************************************************************************************************************************/
    }, 0);
}


//starts a new game
//reset all variables
function newGame(){
    grid.clearGrid();
    snake = new Snake();
    snake.setStartingPoint();

    //also reset this glabal variables
    speedInterval = 60;
    isGamePaused  = true;
    areThereWalls = false;
    autoSpeed     = false;


    grid.setRangeSliderPos(1);  //reset the slider to 1 again
    grid.setSizeLabelText(3);//reset the snake's size label on top

    //auto speed button
    document.getElementById("auto-speed").style.background = "#61656b";
    document.getElementById("auto-speed").disabled  = false;
    document.getElementById("auto-speed").innerHTML = 'Auto speed OFF';

    //enable speed range slider
    document.getElementById("speedRange").disabled  = false;

    //phase button
    document.getElementById('cage-state').innerHTML = 'Disable phasing';
    document.getElementById('cage-state').disabled = false;
    document.getElementById('cage-state').style.background = '#61656b';
    document.getElementById('walls').style.background = '#61656b';

 }



//ends a game
function stopGame(){
    snake.isSnakeDead = true;
}



//pauses the game
function pauseGame(){
    if( isGamePaused == true )
        isGamePaused = false;
    else
        isGamePaused = true;
}








//enable automatic speed
function setAutoSpeed(){
    if( autoSpeed  ){
        snake.autoSpeed = false;
        document.getElementById("auto-speed").innerHTML = 'Auto speed OFF';
        document.getElementById("auto-speed").style.background = '#61656b';
        document.getElementById("speedRange").disabled = false;//disable range slider
    }
    else{
        autoSpeed = true;
        document.getElementById("auto-speed").innerHTML = 'Auto speed ON ';
        document.getElementById("auto-speed").style.background = '#d7d9dd';
        document.getElementById("speedRange").disabled = true;//disable range slider

    }

   snake.snacksEatenCount = 0;
   speedInterval          = 60;
   grid.setRangeSliderPos(1);
   grid.updateSpeedCount();
}



//Activates or diactives "phasing"
function phaseOnOff(){
    if( areThereWalls ){
        areThereWalls = false;
        document.getElementById('cage-state').innerHTML = 'Disable phasing';
        document.getElementById('cage-state').style.background = '#61656b';
        document.getElementById('walls').style.background = '#61656b';
    }
    else{
        areThereWalls = true;
        document.getElementById('cage-state').innerHTML = 'Enable phasing';
        document.getElementById('cage-state').style.background = '#d7d9dd';
        document.getElementById('walls').style.background = '#f44298';
    }

}
