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
mongoose.connect('mongodb://localhost/message_board', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    name:{type: String, required: true, minlength: 2},
    message: {type: String, required: true, minlength: 2},
    comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}]
    },{ timestamps:true }, { usePushEach: true } );

var CommentSchema = new mongoose.Schema({
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    name: {type: String, required: true, minlength: 2},
    text: {type: String, required: true, minlength: 2}
    },{ timestamps: true }, { usePushEach: true } );


// set models by passing the schemas
mongoose.model("Message", MessageSchema);
mongoose.model("Comment", CommentSchema);

// store models in variables
var Message = mongoose.model("Message");
var Comment = mongoose.model("Comment");

app.get('/', function(request, response){
    Message.find({}).populate('comments').exec(function(err, messages){
        if(err){
           
        } else {
            console.log('Success');
             response.render('index', {posts: messages});
        }
    })
});

app.post('/add', function(request, response){
    console.log("ADD: ", request.body);
    var new_message = new Message({
        name: request.body.name,
        message: request.body.message
    });
    new_message.save(function(error, results){
        if(error){
            for(var key in error.errors){
                request.flash('registration', error.errors[key].message);
            }
            response.redirect('/');
        } else {
            console.log('success from add POST SAVE message', results);
            response.redirect('/');
        }
    })
});

app.post('/comment/:id', function(request,response){
    console.log(request.params.id)
    Message.findOne({_id: request.params.id}, function(error, message){
        var new_comment = new Comment({
            name: request.body.name,
            _message: message._id,
            text: request.body.text});

        new_comment.save(function(error){
            if(error){
                console.log("error adding comment!!", error)
                response.redirect('/');
            } else {
                message.comments.push(new_comment);
                message.save(function(error){
                    if(error){
                        console.log('message DIDNT save', error);
                    } else {
                        console.log('message saved!');
                    }
                console.log("comment added!")
                response.redirect('/');
                });
            }
        });
    });
});

    // tell the express app to listen on port 8000, always put this at the end of your server.js file
    app.listen(8000, function () {
        console.log("listening on port 8000");
    })
