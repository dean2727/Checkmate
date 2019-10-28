/* 
Script for a game of 2 player chess!
Includes rest API functionality
Copyright Dean Orenstein 2019, all rights reserved
*/

/*  LAYOUT:
    8x8 board, with black pieces top half and white pieces bottom half
    Tiles alternate color, starting with lighter then darker on top row
    Top and bottom sides are labeled a-h
    Left and right sides are numbered 1-8 from the bottom up

    Rook, knight, bishop, king, queen, bishop, knight, rook
    Pawn, pawn  , pawn  , pawn, pawn , pawn  , pawn  , pawn

    Pawn, pawn  , pawn  , pawn, pawn , pawn  , pawn  , pawn
    Rook, knight, bishop, king, queen, bishop, knight, rook


    RULES:
    Every piece attacks by being placed on another piece

    Pawns:  Any pawn can move 2 ahead on the first move
            1 up if it has moved
            Attacks diagonally upwards one space

    Bishops:No restriction in distance for movement, but only moves diagonally
            Attacks by being placed on another piece

    Knights:Any L shape when moving
            Only piece that can jump over pieces

    Rooks:  No restriction in distance for movement
            Moves vertically or horizontally

    Kings:  Moves any direction 1 space

    Queens: No restriction in distance for movement
            Moves any direction

    Winner is declared if he puts opponents king in checkmate (no way out of being captured)
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
var piecePlaced = false;
var possibleSquares = [];
var imageToMoveId;
var imageToMove;
var imageToMoveSrc;
var pieceId;
var currentDivId;
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// Prompt user to new game


/*
Functions to obtain possible pieces to move
arg1 = string thats the coordinate of the piece (id of the div)
arg2 = array of possible square coordinates
Top and bottom sides are labeled a-h
Left and right sides are numbered 1-8 from the bottom up
*/
function possibleSquaresPawnMove1(currentSquare, squares) {
    console.log("in function and currentSquare is " + currentSquare);
    // If the pawn is on the left side
    if (currentSquare[0] == "a") {

        // Just check top right adjacent square for enemy piece
        var enemySquare1Id = "b3";
        var enemySquare1 = document.getElementById(enemySquare1Id);
        if (enemySquare1.children.length != 0) {  // If the div has a child
            if (enemySquare1.id[0] == "7" || enemySquare1.id[0] == "8") {
                squares.push(enemySquare1Id);
            }
        }
    }
    
    // If the pawn is on the right side
    else if (currentSquare[0] == "h") {
        // Just check top right adjacent square for enemy piece
        var enemySquare1Id = "g3";
        var enemySquare1 = document.getElementById(enemySquare1Id);
        if (enemySquare1.children.length != 0) {
            if (enemySquare1.id[0] == "7" || enemySquare1.id[0] == "8") {
                squares.push(enemySquare1Id);
            }
        }
    }
    
    else {
        // Check top left and top right adjacent square for enemy piece
        for (var i = 0; i < LETTERS.length; ++i) {
            if (currentSquare[0] == LETTERS[i]) {
                var letterIndex = i;
                break;
            }
        }
        var enemySquare1Id = LETTERS[letterIndex-1] + "3";
        var enemySquare1 = document.getElementById(enemySquare1Id);
        if (enemySquare1.children.length != 0) {
            if (enemySquare1.id[0] == "7" || enemySquare1.id[0] == "8") {
                squares.push(enemySquare1Id);
            }
        }
        var enemySquare2Id = LETTERS[letterIndex+1] + "3";
        var enemySquare2 = document.getElementById(enemySquare2Id);
        if (enemySquare2.children.length != 0) {
            if (enemySquare2.id[0] == "7" || enemySquare2.id[0] == "8") {
                squares.push(enemySquare2Id);
            }
        }
    }

    // If theres an ally piece 1 square in front of the pawn
    var square1AheadId = currentSquare[0] + "3";
    var square1Ahead = document.getElementById(square1AheadId);
    if (square1Ahead.children.length != 0) {
        if (square1Ahead.id[0] == "1" || square1Ahead.id[0] == "2") {
            return;
        }
    }

    // If theres an ally piece 2 squares in front of the pawn
    var square2AheadId = currentSquare[0] + "4";
    var square2Ahead = document.getElementById(square2AheadId);
    if (square2Ahead.children.length != 0) {
        if (square2Ahead.id[0] == "1" || square2Ahead.id[0] == "2") {
            squares.push(square1AheadId);
            return;
        }
    }

    else {
        squares.push(square1AheadId);
        squares.push(square2AheadId);
    }
}

function possibleSquaresPawnNextMoves(currentSquare, squares) {
    
    // If the pawn is on the left side
    if (currentSquare[0] == "a") {
        // Just check top right adjacent square for enemy piece
        var enemySquare1Id = "b" + (parseInt(currentSquare[1], 10) + 1).toString();
        var enemySquare1 = document.getElementById(enemySquare1Id);
        if (enemySquare1.children.length != 0) {
            if (enemySquare1.id[0] == "7" || enemySquare1.id[0] == "8") {
                squares.push(enemySquare1Id);
            }
        }
    }
    
    // If the pawn is on the right side
    if (currentSquare[0] == "h") {
        // Just check top right adjacent square for enemy piece
        var enemySquare1Id = "g" + (parseInt(currentSquare[1], 10) + 1).toString();
        var enemySquare1 = document.getElementById(enemySquare1Id);
        if (enemySquare1.children.length != 0) {
            if (enemySquare1.id[0] == "7" || enemySquare1.id[0] == "8") {
                squares.push(enemySquare1Id);
            }
        }
    }

    else {
        // Check top left and top right adjacent square for enemy piece
        for (var i = 0; i < LETTERS.length; ++i) {
            if (currentSquare[0] == LETTERS[i]) {
                var letterIndex = i;
                break;
            }
        }
        var enemySquare1Id = LETTERS[letterIndex-1] + (parseInt(currentSquare[1], 10) + 1).toString();
        var enemySquare1 = document.getElementById(enemySquare1Id);
        if (enemySquare1.children.length != 0) {
            if (enemySquare1.id[0] == "7" || enemySquare1.id[0] == "8") {
                squares.push(enemySquare1Id);
            }
        }
        var enemySquare2Id = LETTERS[letterIndex+1] + (parseInt(currentSquare[1], 10) + 1).toString();
        var enemySquare2 = document.getElementById(enemySquare2Id);
        if (enemySquare2.children.length != 0) {
            if (enemySquare2.id[0] == "7" || enemySquare2.id[0] == "8") {
                squares.push(enemySquare2Id);
            }
        }
    }

    // If theres an ally piece 1 square in front of the pawn
    var square1AheadId = currentSquare[0] + (parseInt(currentSquare[1], 10) + 1).toString();
    var square1Ahead = document.getElementById(square1AheadId);
    if (square1Ahead.children.length != 0) {
        if (square1Ahead.id[0] == "1" || square1Ahead.id[0] == "2") {
            return;
        }
    }

    else {
        squares.push(square1AheadId);
    }
}

function possibleSquaresRook(currentSquare, squares) {
    // Get the...
}

function possibleSquaresKnight(currentSquare, squares) {

}

function possibleSquaresBishop(currentSquare, squares) {

}

function possibleSquaresKing(currentSquare, squares) {

}

function possibleSquaresQueen(currentSquare, squares) {

}
function validSquare(id, squares) {
    for (var i = 0; i < squares.length; ++i) {
        if (id == squares[i]) {
            return true;
        }
    }
    return false;
}
/*
Function to move a piece
oldImage = original image element
currDiv = original div element
target = e.target for the event listener (the empty target div)
squares = possible square to move to
*/
function movePiece(oldImage, currDiv, target, squares) {
    // append the image to the new square
    var newImage = document.createElement("IMG");
    newImage.className = "piece";
    newImage.id = oldImage.id;
    newImage.src = oldImage.src;
    target.appendChild(newImage);

    // remove image from old square
    console.log(currDiv);
    currDiv.removeChild(oldImage);

    // de-highlight old square
    if (currDiv.className[12] == "l") {  // Light color
        document.getElementById(currDiv.id).style.backgroundColor = "rgb(255, 255, 255)";
    }
    else if (currDiv.className[12] == "d") {  // Dark color
        document.getElementById(currDiv.id).style.backgroundColor = "rgb(124, 0, 0)";
    }

    piecePlaced = true;

    // Reset squares
    for (var i = 0; i < squares.length + 1; ++i) {
        squares.pop();
    }
}
/*
function to move a piece
arg1 = list of possible square id's obtained from one of the possible squares functions
arg2 = destination square for the piece to move
arg3 = originating square

function movePiece(squares, destSquare, origSquare) {

}*/

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

    // If there is a piece selected
    if (pieceSelected) {
        var currentDiv = document.getElementById(currentDivId[0]);
        
        // If the click is on a piece
        if(e.target.className == "piece") {
            var divId = e.target.parentNode.id;
            var divBGColor = document.getElementById(divId).style.backgroundColor;

            // Only check if the click happens on the highlighted piece
            if (divBGColor == "rgb(255, 255, 0)") {

                // Set pieceSelected to false
                pieceSelected = false;

                // De-highlight
                var divClass = e.target.parentNode.className;
                if (divClass[12] == "l") {  // Light color
                    document.getElementById(divId).style.backgroundColor = "rgb(255, 255, 255)";
                }
                else if (divClass[12] == "d") {  // Dark color
                    document.getElementById(divId).style.backgroundColor = "rgb(124, 0, 0)";
                }

                // Clear the possible squares array
                for (var i = 0; i < possibleSquares.length + 1; ++i) {
                    possibleSquares.pop();
                }
            }
        }

        // Else if the click is on an empty square
        if (e.target.className[0] == "s") {

            // Check if its a valid square
            var valid = validSquare(e.target.id, possibleSquares);
            if (valid) {
                var currentDiv = document.getElementById(currentDivId);
                movePiece(imageToMove, currentDiv, e.target, possibleSquares);
            }
        }
    }

    // Else if the user selects a piece
    else {
        // Change the color of the div element it's in to a highlighted yellow color
        currentDivId = e.target.parentNode.id;
        var currentDiv = document.getElementById(currentDivId);
        currentDiv.style.backgroundColor = "rgb(255, 255, 0)";

        pieceSelected = true;

        // Assign imagetomove properties to those of the current piece
        imageToMoveSrc = e.target.src;
        imageToMoveId = e.target.id;
        imageToMove = document.getElementById(imageToMoveId);

        // Obtain the possible squares to move to depending on the type of piece clicked
        pieceId = e.target.id;
        var pieceRow = pieceId[0];
        var shortenedId = pieceId.slice(1, 3);
        if (shortenedId == "pa" && pieceRow == "2") {
            possibleSquaresPawnMove1(currentDiv.id, possibleSquares);
        }
        currentDiv = document.getElementById(currentDivId);
        console.log("first click, current div is " + currentDiv);
        /*if (shortenedId == "pa" && pieceRow != "2") {
            possibleSquaresPawnNextMoves(divId, possibleSquares);
        }
        if (shortenedId == "ro") {
            possibleSquaresRook(divId, possibleSquares);
        }
        if (shortenedId == "kn") {
            possibleSquaresKnight(divId, possibleSquares);
        }
        if (shortenedId == "bi") {
            possibleSquaresBishop(divId, possibleSquares);
        }
        if (shortenedId == "ki") {
            possibleSquaresKing(divId, possibleSquares);
        }
        if (shortenedId == "qu") {
            possibleSquaresQueen(divId, possibleSquares);
        }*/
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
