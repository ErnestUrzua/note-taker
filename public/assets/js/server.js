
// DEPENDENCIES
var express = require("express");
var path = require("path");
var NotesDb = "../../db/db.json";
var fs = require("fs");



// EXPRESS CONFIGURATION
// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static('../../../public'));
app.use(express.static(path.join(__dirname, '../../../public')))


// Declaring a counter to keep track of the current ID for new notes
var idCounter = 0;


// HTML GET Requests-------------------------------------------------------------------
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../../public/notes.html"));
});



// API GET Requests-------------------------------------------------------------------
//gets json.db and returns as text data
app.get("/api/notes", function (req, res) {
    console.log('called api/notes')
    fs.readFile(NotesDb, "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        console.log("retriving notes from db")
        console.log(notes)
        return res.json(notes)
    })

});

//API Delete 
app.delete("/api/notes/:id", function (req, res) {


    //ONE RESPONSE
});


// API POST Requests
//Should recieve a new note to save on the request body, 
//add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
    console.log("app.post reached");
    fs.readFile(NotesDb, "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        console.log("retriving notes from db")
        console.log(notes)
    })

    idCounter++;//increment the count of posts

    var newNote = {id:idCounter, title: req.body.title,text: req.body.text}
    console.log("app.post newNote");
    console.log(newNote);

    //stringfy object to send over to server
    var notes = JSON.stringify(newNote);
    NotesDb.push(notes);//push into db
    // savefile and return the json object
    return res.json(NotesDb);
});

// If no matching route is found default to index
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../../public/index.html"));
});

// LISTENER
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});




