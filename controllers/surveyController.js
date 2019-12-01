let db = require("../models");

// POST /api/user/add

const addSurvey = (req, res) => {
    console.log("Survey Controller triggered")
    let newSurvey = req.body;
    db.Survey.create(newSurvey, (err, createdSurvey) => {
        console.log("created Survey", createdSurvey);
        if (err) {
            console.log(err);
            return err;
        } else {
            res.json(createdSurvey);
        }
    })
}

module.exports = {
    addSurvey: addSurvey
};