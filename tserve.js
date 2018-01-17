/* This file will hold test server code */

/* requires go here */
const express = require('express');
const http = require('http');
const fs = require('fs');

/* some helpful constants */
const hostname = '127.0.0.1';
const port = 3000;
const success = "app running on port " + port + "!";

/* declare my express app */
const app = express();

app.use(express.static('public'));

/* General 404 method */
function send404(response) {
  response.writeHead(404, {"Content-Type" : "text/plain"});
  response.write("Status Code 404: File Not Found");
  response.end();
}

/* function to run on the get method for '/' route */
function resumePDF(request, response) {
  const resume = "./files/resume.pdf";
  fs.readFile(resume, function(err, data) {
    response.contentType("application/pdf");
    response.send(data);
  });
}

function runner(request, response) {
  response.send("This is cool");
}

app.get('/', runner);

app.listen(port, () => console.log(success));
