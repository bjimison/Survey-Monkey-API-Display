let db = require("../models");

// PUT /api/user/add

const addSurvey = (req, res) => {
    db.Survey.create(req.body);
    newSurvey.save((err, survey) => {
        if (err) {
            console.log(err);
            return err;
        }
        survey.save();
        console.log("Saved ", survey);
    });
    res.json(survey);
}

module.exports = {
    addSurvey: addSurvey
};