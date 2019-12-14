// Websocket server for the game page
// PUT requests may be used, where the path includes the id of what is edited

// Users will primarily interact with the board squares
/* 
Basic structure of a resource for API requests:
- oldDivId
- newDivId
- permission 
*/

// Port to use
var serverPort = 6969;

// Importing the server modules
var webSocketServer = require('websocket').server;
var http = require('http');

var newServer = new webSocketServer({ httpsServer: server });


