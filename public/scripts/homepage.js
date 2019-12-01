const authToken = "bearer 7zF8BOnG4G7RzWhxfQxo2YjP7B-O0myhv7uUtPX8DL9gNqXvZvY.YfjdXqHQODdWf11OQQl6WPmRbeerKXG6Jwh0SMpOUsuVFMliRcw2GeifUQAwfGCdOu.Qp1F9-QFC";
const getSurveyResponsesURL = 'https://api.surveymonkey.com/v3/surveys/272379092/responses/bulk'
const surveyId = "272379092";

// ***** response object containing "question_id" as the key, and "answer" as the value *****
let responseObject = {};

// ********** Handle errors **********
const displayError = (err1, err2, err3) => {
    console.log(err1);
    console.log(err2);
    console.log(err3);
};

// ********** search response object for question_id and answer values **********
const displaySurvey = response => {
    let surveyArr = response.data[0].pages[0].questions;
    console.log("response from displaySurvey:", surveyArr);

    for (let i = 0; i < surveyArr.length; i++) {

        let survey = surveyArr[i];
        let question_id = surveyArr[i].id;
        let answer = survey.answers[0].text;
        if (survey.answers[0].hasOwnProperty('choice_id')) {
            answer = survey.answers[0].choice_id;
        } else {
            answer = survey.answers[0].text;
        }
        // now that question id and answer have been established, set them as key:value pairs in responseObject
        responseObject[question_id] = answer;

        console.log("******* answers:", survey.answers[0]);
        console.log("******* question id:", question_id);
        console.log("responseObject:", responseObject);
    }
    Object.keys(responseObject).map(function (key) {
        let answer = responseObject[key];
        $("#results").append(`<li id="question">Question ID: ${key}</li> <li>Answer: ${answer}</li>`)
    })
}

// ********** Create database model **********
const createModel = response => {
    console.log("Attempting to create model", response);
    $.ajax({
        method: "POST",
        url: "/api/survey/add",
        data: responseObject,
        success: function () {
            console.log("Created the model!");
        },
        error: displayError
    });
};

// ********** Listen for search submit **********
$("#fetch-button").on("click", function (e) {
    e.preventDefault();
    let url = getSurveyResponsesURL;
    $.ajax({
        method: "GET",
        headers: { 'Authorization': authToken },
        url: url,
        success: displaySurvey,
        error: displayError
    });
});

// ********** Listen for save click **********
$("#save-button").on("click", function (e) {
    e.preventDefault();
    $.ajax({
        method: "GET",
        url: "/api/survey/add",
        // data: responseObject,
        success: createModel,
        error: displayError
    });
});