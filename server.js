/* Dependecies */
const http = require('http');
const fs = require('fs');
const express = require('express');

/* 'app' (express variable) declaration and its middleware */
const app = express();
app.use(express.static('public'));

/* Just some constant values contained here */
const hostname = '127.0.0.1'; //just the place to host it at
const port = 3000; //the port
const success = `Server Running at http://${hostname}:${port}`

/* Function to call when user requests a page that doesn't exist */
function send404(response) {
  response.writeHead(404, {"Content-Type" : "text/plain"});
  response.write("Status Code 404: File Not Found");
  response.end();
}

function resumePDF(request, response) {
  const resume = "./files/resume.pdf";
  fs.readFile(resume, function(err, data) {
    response.contentType("application/pdf");
    response.send(data);
  });
}

/* when called, this function will serve up the user's requests or send a 404 msg */
function runner(request, response) {

  /* Server Code here */
  //old server code (WITHOUT EXPRESS)
  // response.writeHead(200, {"Content-Type" : "text/html"});
  // fs.createReadStream("./index.html").pipe(response);

  const index = "./index.html";
  fs.readFile(index, function(err, data) {
    response.contentType("text/html");
    response.send(data);
  });


}

// Original Running Code (WITHOUT EXPRESS)
// /* call the runner function on a server variable to create a server */
// var server = http.createServer(runner);
//
// /*  tell the server variable to listen at either the defined port or the
//     one defined by the environment in which the code is running */
// server.listen(process.env.PORT || port, () => {
//   console.log(`Server Running at http://${hostname}:${port}`);
// });

app.get('/', runner);
app.get('/resume', resumePDF);
app.listen(process.env.PORT || port, () => console.log(success));
