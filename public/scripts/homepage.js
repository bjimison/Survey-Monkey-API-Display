const authToken = "bearer 7zF8BOnG4G7RzWhxfQxo2YjP7B-O0myhv7uUtPX8DL9gNqXvZvY.YfjdXqHQODdWf11OQQl6WPmRbeerKXG6Jwh0SMpOUsuVFMliRcw2GeifUQAwfGCdOu.Qp1F9-QFC";
const baseURL = "https://api.surveymonkey.com/v3/surveys"
const getSurveyResponsesURL = 'https://api.surveymonkey.com/v3/surveys/272379092/responses/bulk'
// let getSurveyDetailsURL = `https://api.surveymonkey.com/v3/surveys/${surveyId}/details`;
let surveyIds = [];


// ***** response object containing "question_id" as the key, and "answer" as the value *****
let responseObject = {};

// ********** Handle errors **********
const displayError = (err1, err2, err3) => {
    console.log(err1);
    console.log(err2);
    console.log(err3);
};

// call API with bearer Token to retrieve associated Survey ID's
const getSurveyIds = response => {
    // console.log("calling for Survey ID's", response);
    let survResponse = response.data;
    for (let i = 0; i < survResponse.length; i++) {
        let survey = survResponse[i].id;
        if (!surveyIds.includes(survey)) {
            surveyIds.push(survey);
            $("#id-list").append(`<li class="surveyId">Survey ID: ${surveyIds[i]}</li>`)
        } else {
            continue;
        }
    }
    // surveyIds.forEach(survey => {
    //     $("#id-list").append(`<li class="surveyId">Survey ID: ${survey}</li>`)
    // })
    // surveyIds.push(response.data[0].id, response.data[1].id);
    // surveyIds.forEach(survey => {
    //     if (!surveyIds.includes(survey)) {
    //         $("#id-list").append(`<li class="surveyId">Survey ID: ${survey}</li>`)
    //     }
    // })
    console.log("SurveyIds:", surveyIds);
}

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
        headers: { 'Authorization': authToken, 'content-type': 'application/json' },
        data: { Survey: responseObject },
        success: function () {
            console.log("Created the model!");
        },
        error: displayError
    });
};

// ********** Listen for get Survey ID click **********
$("#fetch-id-button").on("click", function (e) {
    e.preventDefault();
    let url = baseURL;
    $.ajax({
        method: "GET",
        headers: { 'Authorization': authToken, 'content-type': 'application/json' },
        url: url,
        success: getSurveyIds,
        error: displayError
    });
});

// ********** Listen for search submit **********
$("#fetch-button").on("click", function (e) {
    e.preventDefault();
    let url = getSurveyResponsesURL;
    $.ajax({
        method: "GET",
        headers: { 'Authorization': authToken, 'content-type': 'application/json' },
        url: url,
        success: displaySurvey,
        error: displayError
    });
    console.log("response Object", responseObject)
});

// ********** Listen for save click **********
$("#save-button").on("click", function (e) {
    e.preventDefault();
    $.ajax({
        method: "GET",
        url: 'https://api.surveymonkey.com/v3/surveys/272379092/responses/bulk',
        headers: { 'Authorization': authToken },
        // data: responseObject,
        success: createModel,
        error: displayError
    });
});