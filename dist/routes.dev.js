"use strict";

var fs = require('fs');

var requestHandler = function requestHandler(req, res) {
  var url = req.url;
  var method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    var body = [];
    req.on('data', function (chunk) {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', function () {
      var parsedBody = Buffer.concat(body).toString();
      var message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, function (err) {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
}; // module.exports = requestHandler;
// module.exports = {
//    handler: requestHandler,
//    someText: 'Some hard coded text'
// };
// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';


exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
//# sourceMappingURL=routes.dev.js.map
