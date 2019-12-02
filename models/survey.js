// create the MongoDB schema for Survey entries

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SurveySchema = new Schema({
    Survey: Object
});

let Survey = mongoose.model("Survey", SurveySchema);

module.exports = Survey;