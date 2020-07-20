
// DEPENDENCIES
var express = require("express");
var path = require("path");
var NotesDb = require("../../db/db.json");


// EXPRESS CONFIGURATION
// Tells node that we are creating an "express" server
var app = express();


// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// LISTENER
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});


// Declaring a counter to keep track of the current ID for new notes
var idCounter = 0;


// HTML GET Requests-------------------------------------------------------------------
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../../../public/notes.html"));
});

// If no matching route is found default to index
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../../public/index.html"));
});


// API GET Requests
//works on returning the JSON
app.get("/api/notes", function (req, res) {
  res.json(NotesDb);
});


// //API Delete 
// app.delete("/api/notes/:id", function (req, res) {
//   res.send(req.params)
//   res.json(NotesDb);
// });


// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate JavaScript array
// (ex. User fills out a reservation request... this data is then sent to the server...
// Then the server saves the data to the tableData array)
// ---------------------------------------------------------------------------

// app.post("/api/notes", function (req, res) {
//   // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//   // It will do this by sending out the value "true" have a table
//   // req.body is available since we're using the body parsing middleware

//   NotesDb.push(req.body);
//   res.json(true);

// });




