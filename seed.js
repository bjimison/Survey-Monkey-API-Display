let db = require("./models");

let surveyList = [
    {
        371935200: "Test",
    }
];

db.Survey.deleteMany({}, (err, surveys) => {
    db.Survey.create(surveyList, (err, surveys) => {
        if (err) {
            return console.log("ERROR", err);
        }
        console.log("All surveys: ", surveys);
        process.exit();
    });
});