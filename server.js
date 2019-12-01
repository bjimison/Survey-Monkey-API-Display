// ************ SERVER JS ***********

// Set up express

const express = require("express");
const app = express();

// Set up body parser

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Allow express to use public files

app.use(express.static("public"));

let db = require("./models");
let controllers = require("./controllers");

// API Endpoint
app.post("/api/survey/add", controllers.survey.addSurvey);


// ********** SERVER *********

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});