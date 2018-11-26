var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({ extended: true }));
const flash = require('express-flash');
app.use(flash());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoose_dashboard', { useNewUrlParser: true });

var FishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    length: { type: Number, required: true },
}, { timestamps: true });

mongoose.model('fishes', FishSchema); // We are setting this Schema in our Models as 'fishes'
var Fish = mongoose.model('fishes');

app.get('/', function (req, res) {
    Fish.find({}, function (err, fishies) {
        console.log(err);
        console.log(fishies);
        if (err) {
            res.render('index');
        } else {
            res.render('index', { fishData: fishies });
        }
    })
})

app.get('/new', function (req, res) {

    res.render("create");
});


app.post('/create', function (req, res) {
    const fish = new Fish({ name: req.body.name, length: req.body.length });
    fish.save(function (err) {
        if (err) {
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            res.redirect('/');
        }

    });
});

app.get('/fishes/:id', function (req, res) {
    Fish.findOne({ _id: req.params.id }, function (err, fishies) {
        if (err) {
            console.log("didn't get fish data");
            res.redirect('/')
        } else {
            console.log("got fish data", fishies);
            res.render('showFish', {fishData: fishies});
        }
    })
})

app.get('/fishes/edit/:id', function(req, res) {
    console.log("fish id-----"+"ObjectId('"+req.params.id+"')")
    // Fish.find({_id:"ObjectId('"+req.params.id+"')"}, function(err, fishies) {
    Fish.findOne({_id:req.params.id}, function(err, fishies) {
        if(err) {
            console.log("didn't get fish data");
            res.render('showFish');
        } else {
            console.log("got fish data", fishies);
            res.render('edit', {fishData: fishies});
        }
    })
})

app.post('/fishes/update/:id', function (req, res) {
    Fish.findOne({ _id: req.params.id }, function (err, fishy) {
        fishy.name = req.body.name;
        fishy.length = req.body.length;
        fishy.save();
    })
    res.redirect('/');
})

app.get('/fishes/destroy/:id', function(req, res) {
    console.log('here');
    Fish.remove({_id:req.params.id}, function(err) { 
    })
    res.redirect('/');
})


    // tell the express app to listen on port 8000, always put this at the end of your server.js file
    app.listen(8000, function () {
        console.log("listening on port 8000");
    })
