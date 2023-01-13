// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Get method handler to send the client all project data and be parsed at client side
app.get('/getDATA',getData);

function getData(req,res){
    // send just the last index in the array
    res.send(projectData[projectData.length-1]);

    // Clear all the array
    projectData = [];
}

// POST method handler receive data from client and add it in an object to push it in projectData
app.post('/postDATA', (req,res) => {
    let reqBody = req.body;
    let obj = {};
    obj["date"] = reqBody.date;
    obj["temp"] = reqBody.temp;
    obj["feeling"] = reqBody.feeling;

    projectData.push(obj);

    // print for debugging
    console.log(reqBody);
});