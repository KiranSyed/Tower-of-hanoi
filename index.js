// Variable Declarations

var colors=["blue", "red", "green", "yellow"]; // four colors corresponding to block colors
var towers=[["blue", "red", "green", "yellow"],[],[]];// each items represents a tower, initially all color blocks are in first tower
var selectedTower=0; // the tower selected by user on click
var selectedColor=""; //the color of the selected block
var numOfMoves=0; // number of moves made
var selected= new Boolean(false); // status of block if selected already or not

// Displaying the rules of the game Modal at the start
$(document).ready(function(){
        $("#myModal").modal('show');
    });
//tower1 is clicked
$(".tower1").click(function(event){
	towerClicked(1); 
});
//tower2 is clicked
$(".tower2").click(function(event){
	towerClicked(2); 
});
//tower3 is clicked
$(".tower3").click(function(event){
	towerClicked(3); 
});
//argument is: the tower number of the tower clicked
function towerClicked(towerNum){
	playMusic();
	displayNumOfMoves(numOfMoves);
	if (selected==true){ 
		// clicked to shift an already selected block to this tower 
		selected=false;
			// Checking if move is allowed
			if (validMove(selectedColor, towers[towerNum-1][0],  towers[towerNum-1].length))
			{
				// Valid Move: display block in new tower and hide the block from previous tower
				displayBlock(towerNum, selectedColor);
				removeBlock(selectedTower, selectedColor);
				towers[towerNum-1].unshift(selectedColor);
				selectedTower=0;
				numOfMoves++;
				displayNumOfMoves(numOfMoves);
				if (towerNum===3 && gameWin()){
					document.getElementById("myAudio").pause();
					playSound("win.mp3");
					setTimeout(function(){
						$('h1').text("Total Number of Moves is "+numOfMoves);
					}, 3000);
					setTimeout(
				 		function() 
				  		{
				   		 resetGame();
				  		}, 5000);

					
				}
			}
			else{
				// Move is not allowed
				invalidMove(selectedTower, selectedColor);
				
			}
	}
	else{
			// clicked to select a block from tower 1
		if (towers[towerNum-1].length>0){
			// Tower is not empty
			selectTopBlock(towerNum, towers[towerNum-1][0]);
		
		}else{
			// empty tower
			emptyTower();
		
	}
	}
}

// Makes the block visible of the given colour and given tower number
function displayBlock(towerNum, blockColor){
	$(".tower"+towerNum+" ."+blockColor).removeClass("hidden selected");
}
// Makes the block invisible of the given colour and given tower number
// Also removes corresponding entry from array of that tower
function removeBlock(towerNum, blockColor){
	$(".tower"+towerNum+" ."+blockColor).addClass("hidden");
		towers[towerNum-1].shift();	
}
// Checking if move is allowed or not
function validMove(blockColor, towerColor, towerLength){
	if ((colors.indexOf(blockColor)<colors.indexOf(towerColor)) || towerLength===0){
		playSound("correct.mp3");
		return(true);
	}else return(false);
	
}

// move made is invalid
function invalidMove(towerNum, blockColor){
		playSound("wrong.mp3");
		$("h1 span").text("invalid move, try again");
		$(".tower"+towerNum+" ."+blockColor).removeClass("selected");
	}
//displays total number of moves made 
function displayNumOfMoves(numOfMoves){
	$("h1 span").text("Number of Moves = "+ numOfMoves);
}
// selecting the top block of the tower clicked
function selectTopBlock(towerNum, blockColor){
	$(".tower"+towerNum+" ."+blockColor).addClass("selected");
		selected=true;
		selectedTower=towerNum;
		selectedColor=blockColor;
}
// if tower does not have any block
function emptyTower(){
	playSound("wrong.mp3");
	$("h1 span").text("Tower is empty, try again");
}
//palying background music
function playMusic(){
	document.getElementById("myAudio").play();
}
//palying sounds according to move(valid/invalid)
function playSound(path){
	var sound=new Audio(path);
	sound.play();
}
//checking if all the blocks are shifted to tower 3
function gameWin(){
	if (towers[2].length===colors.length){
		$('h1 span').text("YOU HAVE WON THIS GAME");
		$("i").addClass("fas fa-trophy fa-2x");
		$("i").css("color","red");
		return(true);
	} else return(false);
}
//restarting game again
function resetGame(){
	window.location.reload();
}