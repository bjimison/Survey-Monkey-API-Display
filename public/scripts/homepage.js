const authToken = "bearer 7zF8BOnG4G7RzWhxfQxo2YjP7B-O0myhv7uUtPX8DL9gNqXvZvY.YfjdXqHQODdWf11OQQl6WPmRbeerKXG6Jwh0SMpOUsuVFMliRcw2GeifUQAwfGCdOu.Qp1F9-QFC";
const getSurveyResponsesURL = 'https://api.surveymonkey.com/v3/surveys/272379092/responses/bulk'

// ********** returned responses **********
let returnedResponses = [];

// ********** Handle errors **********
const displayError = (err1, err2, err3) => {
    console.log(err1);
    console.log(err2);
    console.log(err3);
};

// ********** Used for searching **********
const displaySurvey = response => {
    let surveyArr = response.data[0].pages[0].questions;;
    console.log("response from displaySurvey:", surveyArr);

    for (let i = 0; i < surveyArr.length; i++) {
        let survey = surveyArr[i];
        let answer = survey.answers[0].text;
        if (survey.answers[0].hasOwnProperty('choice_id')) {
            answer = survey.answers[0].choice_id;
        } else {
            answer = survey.answers[0].text;
        }

        console.log("********************************** answers:", survey.answers[0]);
        $("#results").append(`<div>${answer}</div>`);
    }
}

// ********** Listen for search submit **********
$("#fetch").on("click", function (e) {
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