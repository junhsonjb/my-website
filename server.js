//this is the server code for my web site
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

fs.readFile('index.html', (err, html) => {

  if (err) {
    throw err;
  }

  //if no error then run the server code
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(html);
    res.end();
  });

  server.listen(port, hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
  });

});
