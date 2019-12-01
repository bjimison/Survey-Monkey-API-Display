const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/survey",
    { useNewUrlParser: true },
    // { useUnifiedTopology: true }
);

let Survey = require("./survey.js");

module.exports = {
    Survey: Survey
};