var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var session = require('express-session');
var bodyParser = require('body-parser');
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
  app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {

    res.render("form");
});

app.post('/users', function(req, res){
    console.log(req.body);
    console.log(req.body);
    info = req.body;
    res.redirect('/userData')  
});

app.get('/userData', function(req, res) {
    console.log(req);
    res.render("userData", {user : info}); 
});




// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})