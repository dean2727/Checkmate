/* 
Script for a game of 2 player chess!
Includes rest API functionality
Copyright Dean Orenstein 2019, all rights reserved
*/

// Variable declaration
var r8rook1 = document.getElementById("8rook1");
var r8knight1 = document.getElementById("8knight1");
var r8bishop1 = document.getElementById("8bishop1");
var r8king = document.getElementById("8king");
var r8queen = document.getElementById("8queen");
var r8bishop2 = document.getElementById("8bishop2");
var r8knight2 = document.getElementById("8knight2");
var r8rook2 = document.getElementById("8rook2");

var r7pawn1 = document.getElementById("7pawn1");
var r7pawn2 = document.getElementById("7pawn2");
var r7pawn3 = document.getElementById("7pawn3");
var r7pawn4 = document.getElementById("7pawn4");
var r7pawn5 = document.getElementById("7pawn5");
var r7pawn6 = document.getElementById("7pawn6");
var r7pawn7 = document.getElementById("7pawn7");
var r7pawn8 = document.getElementById("7pawn8");

var r2pawn1 = document.getElementById("2pawn1");
var r2pawn2 = document.getElementById("2pawn2");
var r2pawn3 = document.getElementById("2pawn3");
var r2pawn4 = document.getElementById("2pawn4");
var r2pawn5 = document.getElementById("2pawn5");
var r2pawn6 = document.getElementById("2pawn6");
var r2pawn7 = document.getElementById("2pawn7");
var r2pawn8 = document.getElementById("2pawn8");

var r1rook1 = document.getElementById("1rook1");
var r1knight1 = document.getElementById("1knight1");
var r1bishop1 = document.getElementById("1bishop1");
var r1king = document.getElementById("1king");
var r1queen = document.getElementById("1queen");
var r1bishop2 = document.getElementById("1bishop2");
var r1knight2 = document.getElementById("1knight2");
var r1rook2 = document.getElementById("1rook2");

var pieceSelected = false;


// Prompt user to new game


// Functions

// This route is to have 64 functions, 1 for each piece
// Delete this once you know for sure that the next route is the correct way to do it
/*r2pawn1.onclick = function() {
    // Change the color of the div element it's in to a highlighted color rgb(255, 255, 0)
    var divId = this.parentNode.id;
    document.getElementById(divId).style.backgroundColor = "rgb(255, 255, 0)";

    // More functionality to highlight possible squares to move to
}*/

// This route is to have 1 function that checks what element was clicked and then proceed accordingly
// Event listener function for when the user clicks an element on the board
document.addEventListener('click', function(e) {

    // If it's a piece
    if(e.target.className == "piece") {
    
        // If theres already a square highlighted
        if (pieceSelected) {
            // Dont do anything
        }

        var divId = e.target.parentNode.id;
        var divBGColor = document.getElementById(divId).style.backgroundColor;
        // If the clicked div has color that is equal to the highlighted color
        if (divBGColor == "rgb(255, 255, 0)") {

            // Set pieceSelected to false
            pieceSelected = false;

            // De-highlight
            var divDarkOrLight = document.getElementsByClassName(divId).style.backgroundColor
            if ()
            divBGColor = document.getElementById(divId).style.backgroundColor = "rgb(124, 0, 0)";
        }

        // Else, change the color of the div element it's in to a highlighted yellow color
        else {
            var divId = e.target.parentNode.id;
            document.getElementById(divId).style.backgroundColor = "rgb(255, 255, 0)";
            pieceSelected = true;
        }
    
    // Else if it's a square with no piece
    else if(e.target.className == "square") {

        // If 
    }

    else {
        console.log("clicked outside the board");
    }
})


// Function to check if the square is valid for a move
/*function validSquare (square) {
    return isString(square) && square.search(/^[a-h][1-8]$/) !== -1
}




// While game is not over (kings arent checkmated), do the following
/*var gameNotOver = true;
while (gameNotOver) {
    
}*/

// Player 1 starts and player 2 cannot click or place pieces, (do later on) have a 30 second timer to move a piece

// (do later on) While the timer has not surpassed 30 seconds, do the following


// If user clicked one of the highlighted squares, move the piece


// If the piece landed on another piece, capture it (replace the image with attacker image)


// Once this happens, change board control to player 2

