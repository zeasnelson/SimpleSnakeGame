//This code simply draws "GAME OVER" after the snake dies
//Not the best way to do it but this was done last minute :(


let Gx = [6, 6, 6, 6, 7, 8, 9, 10, 11, 11, 11, 11, 10, 9, 9];
let Gy = [4, 3, 2, 1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 3];

let Ax = [11, 10, 9, 8, 7, 6, 6, 6, 6, 7, 8, 9, 10, 11, 9, 9]; 
let Ay = [9, 9, 9, 9, 9, 9, 8, 7, 6, 6, 6, 6, 6, 6, 7, 8];

let Mx = [11, 10, 9, 8, 7, 6, 7, 8, 7, 6, 7, 8, 9, 10, 11];
let My = [15, 15, 15, 15, 15, 15, 14, 13, 12, 11, 11, 11, 11, 11, 11];

let Ex = [6, 6, 6, 7, 8, 9, 10, 11, 11, 11, 9, 9];
let Ey = [19, 18, 17, 17, 17, 17, 17, 17, 18, 19, 18, 19];

let Ox = [13, 14, 15, 16, 17, 18, 18, 18, 18, 17, 16, 15, 14, 13, 13, 13];
let Oy = [1, 1, 1, 1, 1, 1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2];

let Vx = [13, 14, 15, 16, 17, 18, 17, 16, 15, 14, 13];
let Vy = [6, 6, 6, 6, 7, 8, 9, 10, 10, 10, 10];

let EEx = [13, 13, 13, 14, 15, 16, 17, 18, 18, 18, 16, 16];
let EEy = [14, 13, 12, 12, 12, 12, 12, 12, 13, 14, 13, 14];

let Rx = [18, 17, 16, 15, 14, 13, 13, 13, 13, 14, 15, 16, 16, 16, 17, 18];
let Ry = [16, 16, 16, 16, 16, 16, 17, 18, 19, 19, 19, 19, 18, 17, 18, 19];




function drawGameOver(){
	setTimeout(drawG, 100);
	setTimeout(drawA, 200);
	setTimeout(drawM, 300);
	setTimeout(drawE, 400);
	setTimeout(drawO, 500);
	setTimeout(drawV, 600);
	setTimeout(drawEE,700);
	setTimeout(drawR, 800);
}

function drawG(){
	drawLetter(Gx, Gy);
}

function drawA(){
	drawLetter(Ax, Ay);
}

function drawM(){
	drawLetter(Mx, My);
}

function drawE(){
	drawLetter(Ex, Ey);
}
function drawO(){
	drawLetter(Ox, Oy);
}

function drawV(){
	drawLetter(Vx, Vy);
}

//there are to e's but with different coodinates
function drawEE(){
	drawLetter(EEx, EEy);
}

function drawR(){
	drawLetter(Rx, Ry);
}

function drawLetter(letterX, letterY){
	for( i = 0; i < letterX.length; i++ ){
		grid.setButtonColor(letterX[i]-2, letterY[i]-1, "black");
	}
}