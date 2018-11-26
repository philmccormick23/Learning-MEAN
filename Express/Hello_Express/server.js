var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);
// use app's get method and pass it the base route '/' and a callback

app.use(express.static(__dirname + "/static"));

app.get('/', function(request, response) {
    // just for fun, take a look at the request and response objects
   console.log("The request object", request);
   console.log("The response object", response);
   // use the response object's .send() method to respond with an h1
   response.send("<h1>Hello Express</h1>");
})
app.get('/cars', function(request, response) {
    // just for fun, take a look at the request and response objects
   content="<img src='image.jpeg' alt='cars'>"
   response.send(content);
})
app.get('/cats', function(request, response) {
    // just for fun, take a look at the request and response objects
   content="<img src='cat.jpg' alt='cats'>"
   response.send(content);
})

app.get('/form', function(request, response) {
    // just for fun, take a look at the request and response objects
   content="This is the form <form>Name:<input type='text'></form>"
   response.send(content);
})
// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})