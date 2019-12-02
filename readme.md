SUMMARY
This project demonstrates a calling of the SurveyMonkey API in order to retrieve survey responses and display them in a third party app/webpage for easier interpretation. Once a SurveyMonkey account has been created, a bearer token will be provided. Once you manually copy and paste the bearer token, the getSurveyIds function is able to retrieve the survey Id's using this token. Once the survey Id's are obtained, they are pushed into an array. The displaySurvey function iterates through this array, calling the API with each unique survey Id. Each Survey question and its corresponding response is then appended as list items to the Results container (unordered list).

SERVER-SIDE CODE
The server-side code displays the flow of being called by the front end via AJAX calls. the Server route gets called by the AJAX call. This route sends the request and its information to the surveyController, which then creates a new instance of the survey to this server's own database (MongoDB). This demonstrates how a SurveyMonkey client may retain information in their own database rather than having to call the SurveyMonkey API each time. While the MongoDB database successfully connected to the server, its functionality is currently experiencing difficulties with CORS errors that are proving to be difficult to circumvent. Therefore, the local database is not currently populated with survey instances.

IMPROVEMENTS
Given more time, there are two significant improvements I would make; 1) fix the CORS errors blocking the creation of survey instances in the client's database, and 2) improve the html layout to separate the surveys as they are currently grouped together. 

1) Through extensive research I have found that the CORS Error I am experiencing (405 METHOD NOT Allowed) is a common issue that is not easily solved. If this was a project given to me by an employer, I would seek the expertise of a senior Engineer for help in fixing this matter.

2) If the goal was to push this code to production-level code, I would create a functionality that allows the user to click on the surveyId to display that survey's details. Currently, the html displays all questions and answers from both of my created surveys grouped together. This refactor would improve user experience, but for the scope and purpose of this project, might not be necessary.