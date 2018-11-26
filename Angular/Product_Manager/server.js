var express = require("express");
//console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var validateEmail = function(email) { //this is the function for the email validation and match in the UserSchema below
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

app.use(express.static(__dirname + "/static"));
app.use(express.static( __dirname + '/sample-app/dist/sample-app' ));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const flash = require('express-flash');
app.use(flash());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/product_manager', { useNewUrlParser: true });


var ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 4 },
    price: { type: Number, required: true },
    imageURL: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


mongoose.model('Product', ProductSchema);
var Product = mongoose.model('Product');

//---------------------------------------------------------------------
// 1. Retrieve all Tasks
app.get('/products', function (req, res) {
    Product.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json(tasks);
        }
    })
})

// 2. Retrieve a Task by ID
app.get('/product/:id', function (req, res) {
    Product.findOne({ _id: req.params.id }, function (err, task) {
        if (err) {
            console.log("Returned error", err);
            res.json(err);
        } else {
            res.json({task: task});
        }
    })
})

// 3. Create a Task
app.post('/product', function (req, res) {
    //console.log("POST /task");
    console.log(req.body);
    var product = new Product({
        title: req.body.title,
        price: req.body.price,
        imageURL: req.body.imageURL
    })

    product.save(function (err) {
        if (err) {
            res.json(err)
        } else {
            res.json({ data: product })
        }
    })

})

// 4. Update a Task by ID
app.put('/product/:id', function (req, res) {
    console.log(req.body);
    // var obj = {};
    // if (req.body.title) {
    //     obj['title'] = req.body.title;
    // }
    // if (req.body.description) {
    //     obj['description'] = req.body.description;
    // }
    // if (req.body.completed != null) {
    //     obj['completed'] = req.body.completed;
    // }
    // obj['updated_at'] = Date.now();
    // var task = new Task({
    //     title: req.body.title,
    //     description: req.body.description,
    //     completed: req.body.completed
    // })
    Product.findByIdAndUpdate({ _id: req.params.id }, {$set: {title: req.body.title, price: req.body.price, imageURL: req.body.imageURL,}}, {new:true, runValidators: true} , function (err, task) {
        if (err) {
            res.json(err)
        } else {
            res.json({ message: "Success", data: task })
        }
    });
})

// 5. Delete a Task by ID
app.delete('/product/:id', function (req, res) {
    Product.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success"})
        }
    });
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./sample-app/dist/sample-app/index.html"))
  });


    app.listen(8000, function () {
        console.log("listening on port 8000");
    })

