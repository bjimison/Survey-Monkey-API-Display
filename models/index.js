const MongoClient = require('mongodb', { useUnifiedTopology: true }).MongoClient;
const url = "mongodb://localhost:27017/survey";


// **************************************************************

const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/survey",
    { useNewUrlParser: true },
);

async function main() {
    const client = new MongoClient(url, { newUrlParser: true });

    try {
        await client.connect();
        console.log('connected!');
        await client.close();
    } catch (err) {
        console.dir(err);
    }
}

main().catch(console.dir);

let Survey = require("./survey.js");

module.exports = {
    Survey: Survey
};