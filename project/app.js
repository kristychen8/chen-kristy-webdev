var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionStringProject = 'mongodb://localhost/webdevProject';

// if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
//     var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
//     var password = process.env.MLAB_PASSWORD_WEBDEV;
//     connectionString = 'mongodb://' + username + ':' + password;
//     connectionString += '@ds137882.mlab.com:37882/heroku_x0bgswvw'; // user yours
// }

mongoose.connect(connectionStringProject);


require("./services/user.service.server.js");
require("./services/list.service.server.js");