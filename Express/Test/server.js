var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

console.log("Let's find out what app is", app);


app.get('/', function(request, response) {
    // just for fun, take a look at the request and response objects
   console.log("The request object", request);
   console.log("The response object", response);
   // use the response object's .send() method to respond with an h1
   response.send("<h1>Hello Express</h1>");
})

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})