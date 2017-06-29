var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionStringProject = 'mongodb://localhost/webdevProject';

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionStringProject = 'mongodb://' + username + ':' + password;
    connectionStringProject += '@ds153677.mlab.com:53677/heroku_hb4pgxdb'; // user yours
}
mongoose.connect(connectionStringProject);


require("./services/user.service.server.js");
require("./services/list.service.server.js");