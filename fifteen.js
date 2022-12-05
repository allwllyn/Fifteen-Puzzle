// Andrew Llewellyn - Fall 2022
//Fifteen puzzle script file


//I'm using vmin instead px so the game scales to different browser sizes
//I also leave the top right corner as the empty space instead of bottom right
//multple tiles can be moved at once, moving multiple tiles at same time counts as one move


"use strict";

var tile; 
var moveCounter = 0;
var winAlert;
var timer;
var emptyY;
var emptyX;
var imgURL = "url('background.png')"
var displayNumbers = false;
var oneIndex;
var twoIndex;


//initialize location of empty tile space
//I'm using top right as empty
emptyX = '60vmin'; 
emptyY = '0vmin';


 window.onload = function ()
{
	var shuffle = document.getElementById('shuffleButton');
	var toggleNumbers = document.getElementById('numberToggle');


	var gameBoard = document.getElementById('gameboard');
	tile = gameBoard.getElementsByTagName('div'); 

		
	//set up game tiles ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	for (var i=0; i<tile.length; i++) 
	{
		tile[i].className = 'gametile'; 
		tile[i].style.color = "rgba(0,0,0,0)";
		tile[i].style.textShadow = "none";
		

		//my image looks better with top right corner missing, this makes the top right corner the empty space
		if(i >= 3){
		
		tile[i].style.left = ((i+1)%4*20)+'vmin'; 
		tile[i].style.top = (parseInt((i+1)/4)*20) + 'vmin';
		tile[i].style.backgroundPosition= '-' + tile[i].style.left + ' ' + '-' + tile[i].style.top; 
		tile[i].style.backgroundImage=imgURL;
		tile[i].style.backgroundSize= '80vmin';

		}

		else{
		
		tile[i].style.left = (i%4*20)+'vmin';

		tile[i].style.top = (parseInt(i/4)*20) + 'vmin';

		tile[i].style.backgroundPosition= '-' + tile[i].style.left + ' ' + '-' + tile[i].style.top; 
		tile[i].style.backgroundImage=imgURL;
		tile[i].style.backgroundSize= '80vmin';
		}


		// highlight moveable tiles ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
		tile[i].onmouseover = function() 
		{
			var curr = this;
			//checks current
			if(checkMove(parseInt(this.innerHTML))) {
				this.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
				this.style.fontWeight = "bolder";            
			}

		
				// check move multiple left –––––––––––––––––––––––––––––––––––––
				if(parseInt(this.style.left) > 0 && this.style.top == emptyY){
					if(checkOneLeft(this)){
						this.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						this.style.fontWeight = "bolder";            
						tile[getOneLeft(this)].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneLeft(this)].style.fontWeight = "bolder";      
					}
					if(parseInt(this.style.left) > 40){
					if(checkOneLeft(tile[getOneLeft(this)])){
						this.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						this.style.fontWeight = "bolder";            
						tile[getOneLeft(this)].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneLeft(this)].style.fontWeight = "bolder";
						tile[getOneLeft(tile[getOneLeft(this)])].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneLeft(tile[getOneLeft(this)])].style.fontWeight = "bolder";
					}
				}
				}
				
				// check move multiple right –––––––––––––––––––––––––––––––––––––
				if(parseInt(this.style.left) < 60 && this.style.top == emptyY){

					if(checkOneRight(this)){
						this.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						this.style.fontWeight = "bolder";            
						tile[getOneRight(this)].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneRight(this)].style.fontWeight = "bolder";      
					}

					if(checkOneRight(tile[getOneRight(curr)])){
						curr.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						curr.style.fontWeight = "bolder";            
						tile[getOneRight(curr)].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneRight(curr)].style.fontWeight = "bolder";
						tile[getOneRight(tile[getOneRight(curr)])].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneRight(tile[getOneRight(curr)])].style.fontWeight = "bolder";
					}
				}

				// check move multiple up –––––––––––––––––––––––––––––––––––––
				if(parseInt(this.style.top) > 0 && this.style.left == emptyX){

					if(checkOneUp(this)){
						this.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						this.style.fontWeight = "bolder";            
						tile[getOneUp(this)].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneUp(this)].style.fontWeight = "bolder";      
					}
					if(parseInt(this.style.top) > 40){
						if(checkOneUp(tile[getOneUp(curr)])){
							curr.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
							curr.style.fontWeight = "bolder";            
							tile[getOneUp(curr)].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
							tile[getOneUp(curr)].style.fontWeight = "bolder";
							tile[getOneUp(tile[getOneUp(curr)])].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
							tile[getOneUp(tile[getOneUp(curr)])].style.fontWeight = "bolder";
						}
					}

				}
				// check move multiple down –––––––––––––––––––––––––––––––––––––
				if(parseInt(this.style.top) < 60 && this.style.left == emptyX){

					if(checkOneDown(this)){
						this.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						this.style.fontWeight = "bolder";            
						tile[getOneDown(this)].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneDown(this)].style.fontWeight = "bolder";      
					}

					if(checkOneDown(tile[getOneDown(curr)])){
						curr.style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						curr.style.fontWeight = "bolder";            
						tile[getOneDown(curr)].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneDown(curr)].style.fontWeight = "bolder";
						tile[getOneDown(tile[getOneDown(curr)])].style.border = "0.5vmin solid rgba(255, 255, 150, .7)";
						tile[getOneDown(tile[getOneDown(curr)])].style.fontWeight = "bolder";
					}
				}

				
			
		}

		tile[i].onmouseout = function() 
		{
			for(var j = 0; j<tile.length;j++){
				tile[j].style.border = "1px solid black";
				tile[j].style.fontWeight = "normal"; 
			}
		}

		tile[i].onclick = function() 
		{
			var curr = this;
			
			if (checkMove(parseInt(this.innerHTML))){
				move(curr.innerHTML-1);
				moveCounter++; 
				if (imageComplete()){
					showAlert(); 
				}
				return;
			}

			//move multiple tiles left –––––––––––––––––––––––––––––––––––––––––––––

			if(parseInt(this.style.left) > 0 && this.style.top == emptyY) {

				if (moveLeft(emptyX,emptyY, getOneLeft(curr))){
					move(parseInt(getOneLeft(curr)));
					move(curr.innerHTML-1);
					moveCounter++;
					if (imageComplete()){
						showAlert(); 
					}
					return;
				}
				//fixes error that can move two right from middle
				if(parseInt(this.style.left) > 40){
					if (moveLeft(emptyX,emptyY, getOneLeft(tile[getOneLeft(curr)]))){
						move(parseInt(getOneLeft(tile[getOneLeft(curr)])));
						move(parseInt(getOneLeft(curr)));
						move(curr.innerHTML-1);
						moveCounter++;
						if (imageComplete()){
							showAlert(); 
						}
						return;
					}
				}
			}

			//move multiple tiles right –––––––––––––––––––––––––––––––––––––––––––––

			if(parseInt(this.style.left) < 60 && this.style.top == emptyY){

				if (moveRight(emptyX,emptyY, getOneRight(curr))){
					move(parseInt(getOneRight(curr)));
					move(curr.innerHTML-1);
					moveCounter++;
					if (imageComplete()){
						showAlert(); 
					}
					return;
				}

				else if (moveRight(emptyX,emptyY, getOneRight(tile[getOneRight(curr)]))){
					move(parseInt(getOneRight(tile[getOneRight(curr)])));
					move(parseInt(getOneRight(curr)));
					move(curr.innerHTML-1);
					moveCounter++;
					if (imageComplete()){
						showAlert(); 
					}
					return;
				}
			}
			//move multiple tiles up –––––––––––––––––––––––––––––––––––––––––––––
			if(parseInt(this.style.top) > 0 && this.style.left == emptyX){

				if (moveUp(emptyX,emptyY, getOneUp(curr))){
					move(parseInt(getOneUp(curr)));
					move(curr.innerHTML-1);
					moveCounter++;
					if (imageComplete()){
						showAlert(); 
					}
					return;
				}
				//fixes error that can move two down from middle
				if(parseInt(this.style.top) > 40){

					if (moveUp(emptyX,emptyY, getOneUp(tile[getOneUp(curr)]))){
						move(parseInt(getOneUp(tile[getOneUp(curr)])));
						move(parseInt(getOneUp(curr)));
						move(curr.innerHTML-1);
						moveCounter++;
						if (imageComplete()){
							showAlert(); 
						}
						return;
					}
				}
			}
			//move multiple tiles Down –––––––––––––––––––––––––––––––––––––––––––––
			if(parseInt(this.style.top) < 60 && this.style.left == emptyX){

				if (moveDown(emptyX,emptyY, getOneDown(curr))){
					move(parseInt(getOneDown(curr)));
					move(curr.innerHTML-1);
					moveCounter++;
					if (imageComplete()){
						showAlert(); 
					}
					return;
				}

				else if (moveDown(emptyX,emptyY, getOneDown(tile[getOneDown(curr)]))){
					move(parseInt(getOneDown(tile[getOneDown(curr)])));
					move(parseInt(getOneDown(curr)));
					move(curr.innerHTML-1);
					moveCounter++;
					if (imageComplete()){
						showAlert(); 
					}
					return;
				}
			}


		}
	}
	 
	 //displays number labels on tiles as hint
	toggleNumbers.onclick = function(){
		displayNumbers = !displayNumbers;

		if(displayNumbers == false){
			for(var i=0; i<tile.length; i++)
			{
				tile[i].style.color = "rgba(0,0,0,0)";
				tile[i].style.textShadow = "none";
			}
		}
		else{
			for(var i=0; i<tile.length; i++)
			{
				tile[i].style.color = "rgba(255,255,255,1.0)";
				tile[i].style.textShadow = "-1px 3px 5px black"
			}
		}
	}
	
	//shuffles the pieces
	shuffle.onclick = function(){
		for (var i=0; i<48; i++) 
		{
			var rand = parseInt(Math.floor(Math.random()* 4));

			if (rand == 0){
				var temp = shufUp(emptyX, emptyY); 

				if ( temp != -1){
					move(temp);
				}
			}

			if (rand == 1){
				var temp = shufDown(emptyX, emptyY);

				if ( temp != -1){
					move(temp);
				}
			}

			if (rand == 2){

				var temp = shufLeft(emptyX, emptyY);

				if ( temp != -1){
					move(temp);
				}
			}

			if (rand == 3){
				var temp = shufRight(emptyX, emptyY, i);

				if (temp != -1){
					move(temp);
				}
			}
		}
	}
}

// check if selected tile is able to move ––––––––––––––––––––––––––––––––––––––––––––––––––
function checkMove(divMark){
	//div mark is the number in tile <div> html
	var i = divMark - 1;

	if (moveRight(emptyX, emptyY, i)){
		console.log("move right called");
		return true;
	}

	if (moveUp(emptyX, emptyY, i)){
		console.log("move up called");
		return true;
	}

	if (moveDown(emptyX, emptyY, i)){
		console.log("move down called");
		return true;
	}

	if (moveLeft(emptyX, emptyY, i)){
		console.log("move left called");
		return true;
	}
}

function checkOneLeft(t){
		var temp = getOneLeft(t);
		if(temp != -1)
		var oneLeft = tile[temp];
		if(moveLeft(emptyX,emptyY, temp)){
			return true;           
		}
		else{
			return false;
		}
}

function getOneLeft(t){
	var tileRect = t.getBoundingClientRect();
	var tileWidth = (tileRect.right - tileRect.left);
	var tileHeight = (tileRect.bottom - tileRect.top);
	var widthFactor = tileWidth - 5;
	var oneLeft;
	var oneLeftDivMark;
	var oneLeftIndex;
	var oneLeftX = (tileRect.left - widthFactor); // goes into middle of next tile
	var oneLeftY = tileRect.top; // goes into middle of next tile
	if(document.elementFromPoint(oneLeftX, oneLeftY).className == 'gametile'){
		console.log("called if game tile")
		oneLeft = document.elementFromPoint( oneLeftX,oneLeftY );
		oneLeftDivMark = parseInt(oneLeft.innerHTML);
		oneLeftIndex = oneLeftDivMark -1;
		console.log("got one right: index = "+ oneLeftIndex);
		return oneLeftIndex;
	}
	else{
		return -1;
	}
}

function checkOneRight(t){
		var temp = getOneRight(t);
		if(temp != -1)
		var oneRight = tile[temp];
		if(moveRight(emptyX,emptyY, temp)){
			return true;           
		}
		else{
			return false;
		}
	
}

function getOneRight(t){
	var tileRect = t.getBoundingClientRect();
	var tileWidth = (tileRect.right - tileRect.left);
	var tileHeight = (tileRect.bottom - tileRect.top);
	var widthFactor = tileWidth + 5;
	var oneRight;
	var oneRightDivMark;
	var oneRightIndex;
	var oneRightX = (tileRect.left + widthFactor); // goes into middle of next tile
	var oneRightY = tileRect.top; // goes into middle of next tile
	if(document.elementFromPoint(oneRightX, oneRightY).className == 'gametile'){
		console.log("called if game tile")
		oneRight = document.elementFromPoint( oneRightX,oneRightY );
		oneRightDivMark = parseInt(oneRight.innerHTML);
		oneRightIndex = oneRightDivMark -1;
		console.log("got one Right: index = "+ oneRightIndex);
		return oneRightIndex;
	}
	else{
		return -1;
	}
}

function checkOneUp(t){
		var temp = getOneUp(t);
		if(temp != -1)
		var oneUp = tile[temp];
		if(moveUp(emptyX,emptyY, temp)){
			return true;           
		}
		else{
			return false;
		}
}

function getOneUp(t){
	var tileRect = t.getBoundingClientRect();
	var tileWidth = (tileRect.right - tileRect.left);
	var tileHeight = (tileRect.bottom - tileRect.top);
	var heightFactor = tileHeight;
	var oneUp;
	var oneUpDivMark;
	var oneUpIndex;
	var oneUpY = (tileRect.top - heightFactor); // goes into middle of next tile
	var oneUpX = tileRect.left; // goes into middle of next tile
	if(document.elementFromPoint(oneUpX, oneUpY).className == 'gametile'){
		console.log("called if game tile")
		oneUp = document.elementFromPoint( oneUpX,oneUpY );
		oneUpDivMark = parseInt(oneUp.innerHTML);
		oneUpIndex = oneUpDivMark -1;
		console.log("got one up: index = "+ oneUpIndex);
		return oneUpIndex;
	}
	else{
		return -1;
	}
}

function checkOneDown(t){
		var temp = getOneDown(t);
		if(temp != -1)
		var oneDown = tile[temp];
		if(moveDown(emptyX,emptyY, temp)){
			return true;           
		}
		else{
			return false;
		}
}

function getOneDown(t){
	var tileRect = t.getBoundingClientRect();
	var tileHeight = (tileRect.bottom - tileRect.top);
	var heightFactor = tileHeight + 15;
	var oneDown;
	var oneDownDivMark;
	var oneDownIndex;
	var oneDownY = parseInt(tileRect.top) + heightFactor; // goes into middle of next tile
	var oneDownX = tileRect.left; // goes into middle of next tile
	if(document.elementFromPoint(oneDownX, oneDownY).className == 'gametile'){
		console.log("called if game tile")
		oneDown = document.elementFromPoint( oneDownX,oneDownY );
		oneDownDivMark = parseInt(oneDown.innerHTML);
		oneDownIndex = oneDownDivMark -1;
		console.log("got one down: index = "+ oneDownIndex);
		return oneDownIndex;
	}
	else{
		return -1;
	}
}


//gameover functions –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function winAlert(){
		alert('You won in ' + moveCounter + ' moves!'); 
}


function showAlert(){
	setTimeout(winAlert, 200);
	setTimeout(resetCount, 205);

}

function resetCount(){
	moveCounter = 0;
}


function imageComplete(){
	var correctPosition = true;

	for (var i = 0; i < tile.length; i++) 
	{
		var top = parseInt(tile[i].style.top);
		var left = parseInt(tile[i].style.left);

		if(i < 3){
			if (left != (i%4*20) || top != parseInt(i/4)*20){
				correctPosition = false;
				break;
			}
		}
		else{
			if (left != ((i+1)%4*20) || top != parseInt((i+1)/4)*20){
				correctPosition = false;
				break;
			}
		}
	}
	return correctPosition;
}

// move tile function ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function move(tileIndex){
	var temp = tile[tileIndex].style.top;

	tile[tileIndex].style.top = emptyY;
	emptyY = temp;

	temp = tile[tileIndex].style.left;

	tile[tileIndex].style.left = emptyX;
	emptyX = temp;
	// moveCounter ++;
}

// shuffle moves ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function shufRight(x, y){
	var emptX = parseInt(x); // emptyX
	var emptY = parseInt(y); // emptyY

	if (emptX > 0){
		for (var i = 0; i < tile.length; i++) 
		{
			if (parseInt(tile[i].style.left) + 20 == emptX && parseInt(tile[i].style.top) == emptY){
				return i;
			} 
		}
	}

	else{
		return -1;
	}
}
function shufLeft (x, y){
	var emptX = parseInt(x);
	var emptY = parseInt(y);

	if (emptX < 60){
		for (var i =0; i<tile.length; i++){
			if (parseInt(tile[i].style.left) - 20 == emptX && parseInt(tile[i].style.top) == emptY){
				return i;
			}
		}
	}

	else{
		return -1;
	} 
}
function shufDown(x, y){
	var emptX = parseInt(x);
	var emptY = parseInt(y);

	if (emptY > 0){
		for (var i=0; i<tile.length; i++)
		{
			if (parseInt(tile[i].style.top) + 20 == emptY && parseInt(tile[i].style.left) == emptX){
				return i;
			}
		} 
	}

	else{
		return -1;
	}
}
function shufUp (x, y){
	var emptX = parseInt(x);
	var emptY = parseInt(y);

	if (emptY < 60 ){
		for (var i=0; i<tile.length; i++)
		{
			if (parseInt(tile[i].style.top) - 20 == emptY && parseInt(tile[i].style.left) == emptX){
				return i;
			}
		}
	}

	else{
		return -1;
	} 
}

// player moves ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function moveRight(x, y, i){
	var emptX = parseInt(x); // emptyX
	var emptY = parseInt(y); // emptyY

	if (emptX > 0){
			if (parseInt(tile[i].style.left) + 20 == emptX && parseInt(tile[i].style.top) == emptY){
				return true;
			} 
	}

	else{
		return false;
	}
}

function moveLeft (x, y, i){
	var emptX = parseInt(x);
	var emptY = parseInt(y);


	if (emptX < 60){
			if (parseInt(tile[i].style.left) - 20 == emptX && parseInt(tile[i].style.top) == emptY){
				console.log("i = " + i);
				return true;
			}
	}

	else{
		return false;
	} 
}

function moveDown(x, y,i){
	var emptX = parseInt(x);
	var emptY = parseInt(y);

	if (emptY > 0){
			if (parseInt(tile[i].style.top) + 20 == emptY && parseInt(tile[i].style.left) == emptX){
				return true;
			}
	}

	else{
		return false;
	}
}

function moveUp (x, y, i){
	var emptX = parseInt(x);
	var emptY = parseInt(y);

	if (emptY < 60 ){
			if (parseInt(tile[i].style.top) - 20 == emptY && parseInt(tile[i].style.left) == emptX){
				return true;
			}
	}

	else{
		return false;
	} 
}








