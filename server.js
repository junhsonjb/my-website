/* Dependecies */
var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1'; //just the place to host it at
var port = 3000; //the port

/* Function to call when user requests a page that doesn't exist */
function send404(response) {
  response.writeHead(404, {"Content-Type" : "text/plain"});
  response.write("Status Code 404: File Not Found");
  response.end();
}

/* when called, this function will serve up the user's requests or send a 404 msg */
function runner(request, response) {

  /* Server Code here */
  if (request.method == 'GET' && request.url == "/") {
    response.writeHead(200, {"Content-Type" : "text/html"});
    fs.createReadStream("./index.html").pipe(response);
  } else {
    send404(response);
  }

}

/* call the runner function to create a server */
var server = http.createServer(runner);

/* set the server to listen at the defined port and hostname */
server.listen(port, hostname, () => {
  console.log(`Server Running at http://${hostname}:${port}`);
});
