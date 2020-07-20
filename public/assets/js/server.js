
// DEPENDENCIES
var express = require("express");
var path = require("path");
var NotesDb = require("../../db/db.json");
var fs = require("fs");


// EXPRESS CONFIGURATION
// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



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

// API GET Requests-------------------------------------------------------------------
//gets json.db and returns as text data
app.get("/api/notes", function (req, res) {
    fs.readFile(NotesDb, "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
    })
    return res.json(notes);
});

//API Delete 
app.delete("/api/notes/:id", function (req, res) {
    res.send(req.params)
    res.json(NotesDb);
});


// API POST Requests
//Should recieve a new note to save on the request body, 
//add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {

    NotesDb.push(req.body);

    fs.readFile(NotesDb, "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
    })
    return res.json(notes);

});


// LISTENER
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});




