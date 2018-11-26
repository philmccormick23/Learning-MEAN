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
app.use(express.static( __dirname + '/public/dist/public' ));
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
mongoose.connect('mongodb://localhost/restful_task_API', { useNewUrlParser: true });


var TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

//---------------------------------------------------------------------
// 1. Retrieve all Tasks
app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("Returned error", err);
            res.json({ message: "Error", error: err });
        } else {
            res.json(tasks);
        }
    })
})

// 2. Retrieve a Task by ID
// app.get('/task/:id', function (req, res) {
//     Task.findOne({ _id: req.params.id }, function (err, task) {
//         if (err) {
//             console.log("Returned error", err);
//             res.json({ message: "Error", error: err });
//         } else {
//             res.json(task);
//         }
//     })
// })

// 3. Create a Task
app.post('/API/task', function (req, res) {
    //console.log("POST /task");
    console.log(req.body);
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    })

    task.save(function (err) {
        if (err) {
            res.json({ message: "Error", error: err })
        } else {
            res.json({ message: "Success", data: task })
        }
    })

})

// // 4. Update a Task by ID
// app.put('/task/:id', function (req, res) {
//     var obj = {};
//     if (req.body.title) {
//         obj['title'] = req.body.title;
//     }
//     if (req.body.description) {
//         obj['description'] = req.body.description;
//     }
//     if (req.body.completed != null) {
//         obj['completed'] = req.body.completed;
//     }
//     obj['updated_at'] = Date.now();
//     Task.update({ _id: req.params.id }, {
//         $set: obj
//     }, function (err, task) {
//         if (err) {
//             res.json({ message: "Error", error: err })
//         } else {
//             res.json({ message: "Success", data: task })
//         }
//     });
// })

// // 5. Delete a Task by ID
// app.delete('/tasks/:id', function (req, res) {
//     Task.remove({ _id: req.params.id }, function (err) {
//         if (err) {
//             res.json({ message: "Error", error: err })
//         } else {
//             res.json({ message: "Success"})
//         }
//     });
// })

    // tell the express app to listen on port 8000, always put this at the end of your server.js file
    app.listen(8000, function () {
        console.log("listening on port 8000");
    })
