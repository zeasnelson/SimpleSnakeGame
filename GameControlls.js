
//disable the default acction of the arrow keys and the space key
window.addEventListener("keydown", function(e) {
    // prevent arrow key from scrolling page
    if([32, 37, 38,39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);



//controlls
document.onkeydown = (evt) => {

    evt = evt || window.event;
    if( [32, 37, 38,39, 40].indexOf(evt.keyCode) > -1 ){
      let key = evt.keyCode;
        if( key != 32 ){
            if( autoSpeed){
                document.getElementById("speedRange").disabled = true;//disable range slider only if auto speed is not on
            }
            document.getElementById('cage-state').disabled = true;
            document.getElementById("auto-speed").disabled = true; //diable auto speed button
        }


        setDirection(evt.keyCode);

    }

}


function setDirection(key){
  //for pausing or un-pausing the game
  if( isGamePaused )
      isGamePaused = false;
  else if( key == 32 )
      pauseGame();

  //controll snake's direccion
  if( key == 37 )
      snake.setSnakeDirection("left");

  else if( key == 38 )
      snake.setSnakeDirection("up");

  else if( key == 39 )
      snake.setSnakeDirection("right");

  else if( key == 40 )
      snake.setSnakeDirection("down");
}
