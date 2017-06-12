var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionString = 'mongodb://localhost/webdev';

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds153677.mlab.com:53677/heroku_hb4pgxdb'; // user yours
}

mongoose.connect(connectionString);


require("./services/user.service.server.js");
require("./services/website.service.server.js");
require("./services/page.service.server.js");
require("./services/widget.service.server.js");
