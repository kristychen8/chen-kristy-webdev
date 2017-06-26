var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET,
app.use(session({ secret: "somesession",
    resave: true,
    saveUninitialized: true}));


app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js");

// assignments
// require("./assignment/model/models.server");
// require("./assignment/app.js");

//project
require("./project/model/models.server");
require("./project/app.js");

var port = process.env.PORT || 3000;

app.listen(port);