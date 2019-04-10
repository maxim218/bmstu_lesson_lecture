"use strict";

const port = 5000;

const express = require("express");
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

app.listen(port);
console.log("Server works on port: " + port);

const request = require("request");

const headers = {};
headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
headers["Connection"] = "close";

function sendQuery(url, callback) {
    request.get({
        url: url,
        body: null,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

app.get("/students/all/age", (request, response) => {
    const dict = request.query;
    const age = parseInt(dict["age"]);
    sendQuery("http://students-store:5000/api/student/all", (answer) => {
        const resultArray = [];
        const arr = JSON.parse(answer);
        for(let i = 0; i < arr.length; i++) {
            const student = arr[i];
            if(parseInt(student.age) === parseInt(age)) {
                resultArray.push(student);
            }
        }
        response.end(JSON.stringify(resultArray));
    });
});

/*

curl http://localhost:5005/students/all/age?age=18

*/

