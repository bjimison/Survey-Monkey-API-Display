const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SurveySchema = new Schema({
    question_id: String
});

let Survey = mongoose.model("Survey", SurveySchema);

module.exports = Survey;