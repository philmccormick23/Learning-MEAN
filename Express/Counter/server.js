var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var session = require('express-session');
var app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

  app.get('/', function(request, response) {
//  response.send("<h1>Hello Express</h1>");
    if(request.session.count){
    request.session.count++;
    } else {
    request.session.count = 1;
    }
    response.render("counter", {count: request.session.count});
});
app.get('/2', function(request, response) {
        request.session.count+=1;
        response.redirect('/');
    });

app.get('/clear', function(request, response) {
    request.session.destroy();
    response.redirect('/');
});


// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})