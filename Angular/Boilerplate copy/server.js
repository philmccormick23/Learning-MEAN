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
mongoose.connect('mongodb://localhost/pet_shelter', { useNewUrlParser: true });


var PetSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], minlength: [3, "Name must be 3 characters"] },
    type: { type: String, required: [true, "Type is required"], minlength: [3, "Type must be 3 characters"] },
    description: { type: String, required: [true, "Description is required"], minlength: [3, "Description must be 3 characters"] },
    skill1: { type: String},
    skill2: { type: String},
    skill3: { type: String},
    likes: {type: Number, default: 0},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet');

//---------------------------------------------------------------------
// 1. Retrieve all Tasks
app.get('/pets', function (req, res) {
    Pet.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json(tasks);
        }
    })
})

// 2. Retrieve a Task by ID
app.get('/pet/:id', function (req, res) {
    Pet.findOne({ _id: req.params.id }, function (err, task) {
        if (err) {
            console.log("Returned error", err);
            res.json(err);
        } else {
            res.json({task: task});
        }
    })
})

// 3. Create a Task
app.post('/pet', function (req, res) {
    //console.log("POST /task");
    console.log(req.body);
    var pet = new Pet({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3   
    })

    pet.save(function (err) {
        if (err) {
            res.json(err)
        } else {
            res.json({ data: pet })
        }
    })

})

// 4. Update a Task by ID
app.put('/pet/:id', function (req, res) {
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
    Pet.findByIdAndUpdate({ _id: req.params.id }, {$set: {name: req.body.name, type: req.body.type, description: req.body.description, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3}}, {new:true, runValidators: true} , function (err, task) {
        if (err) {
            res.json(err)
        } else {
            res.json({ message: "Success", data: task })
        }
    });
})

// 5. Delete a Task by ID
app.delete('/pet/:id', function (req, res) {
    Pet.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success"})
        }
    });
})

//Adding a like
// app.put('/api/pets/:id/like', function (req, res) {
//     Pet.findOneAndUpdate({_id:req.params.id}, {$inc: {likes: 1}}, {new:true}), function (err, pet) {
//         if (err) {
//             res.json({ message: "Error", error: err })
//         } else {
//             res.json({data: pet})
//         }
//     }
//     });



// app.all("*", (req,res,next) => {
//     res.sendFile(path.resolve("./sample-app/dist/sample-app/index.html"))
//   });


    app.listen(8000, function () {
        console.log("listening on port 8000");
    })

