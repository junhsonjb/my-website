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

/* tell express that we want to use static files in the 'public' folder */
app.use(express.static('public'));

/* General 404 method */
function send404(response) {
  response.writeHead(404, {"Content-Type" : "text/plain"});
  response.write("Status Code 404: File Not Found");
  response.end();
}

/* function to run on the get method for '/resume' route */
//...

/* this is the method that handles responses to/for the home page */
function runner(request, response) {
  //response.writeHead(200, {"Content-Type" : "text/html"});
  /* const index = "/index.html"; */
  const index = "./public/index.html"; //the homepage with emojis in it
  fs.readFile(index, function(err, data) {
    response.contentType("text/html");
    response.send(data);
  });
}

function writeresume(request, response) {
  const resume = "./public/files/resume.pdf";
  fs.readFile(resume, function(err, data) {
    response.contentType("application/pdf");
    response.send(data);
  });
}

app.get('/', runner);

app.get('/resume', writeresume);

app.listen(process.env.PORT || port, () => console.log(success));
