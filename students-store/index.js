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

const studentsArr = [];

app.get('/api/student/all', (request, response) => {
    const studentsString = JSON.stringify(studentsArr);
    response.end(studentsString);
});

app.post('/api/student/insert', (request, response) => {
    const buffer = [];
    request.on('data', (data) => {
        buffer.push(data);
    }).on('end', () => {
        let bodyString = buffer.join("");
        let bodyObject = null;
        try {
            bodyObject = JSON.parse(bodyString);
        } catch (err) {
            bodyObject = null;
        }
        if(bodyObject === null) {
            response.status(400);
            response.end("");
        } else {
            controlStudent(response, bodyObject);
        }
    });
});

function controlStudent(response, bodyObject) {
    let found = false;
    for(let i = 0; i < studentsArr.length; i++) {
        if(studentsArr[i].name === bodyObject.name) {
            found = true;
            break;
        }
    }
    if(found === true) {
        response.end(JSON.stringify({
            result: "STUDENT_ALREADY_EXISTS",
        }));
    } else {
        const student = {
            name: bodyObject.name,
            age: bodyObject.age,
        }
        studentsArr.push(student);
        response.end(JSON.stringify({
            result: "ADDING_OK",
        }));
    }
}

/*

curl http://localhost:5000/api/student/all

curl -d '{"name":"maxim", "age": 15}' http://localhost:5000/api/student/insert

*/

