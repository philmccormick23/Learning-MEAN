var express = require("express");
//console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var validateEmail = function(email) { //this is the function for the email validation and match in the UserSchema below
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({ extended: true }));
const flash = require('express-flash');
app.use(flash());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/1955', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var Schema1955 = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


mongoose.model("People", Schema1955);


var People = mongoose.model("People");


mongoose.Promise = global.Promise;

//---------------------------------------------------------------------

app.get('/', function(req, res){
    People.find({}, function(err, data){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log(data);
            res.json({
                message: "Success",
                data: data
            });
        };
    });
});

app.get("/new/:name", function(req, res){
    console.log(req.params.name);
    var person = new People({
        name: req.params.name
    });
    person.save(function (err){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log("Successfully created and saved a new person");
            res.redirect('/');
        };
    });
});

app.get("/remove/:name", function(req, res){
    console.log(req.params.name);
    People.remove({
        name: req.params.name
    }, function(err){
        if (err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log("Successfully removed this person");
            res.redirect('/')
        };
    });
});

app.get("/:name", function(req, res){
    console.log(req.params.name);
    People.find({
        name: req.params.name
    },
    function(err, data){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log(data);
            res.json({
                message: "Success",
                data: data
            });
        };
    });
});
    // tell the express app to listen on port 8000, always put this at the end of your server.js file
    app.listen(8000, function () {
        console.log("listening on port 8000");
    })
