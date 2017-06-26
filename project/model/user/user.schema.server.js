var mongoose = require('mongoose');
var userSchemaProject = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    list: [{type: mongoose.Schema.Types.ObjectId, ref:"ListModelProject"}],
    dateCreated: {type: Date, default: Date.now},
    roles:[{type: String, default: 'reviewer', enum:['reviewer', 'admin']}],
    google: {
        id: String,
        token: String
    }
}, {collection: "userProject"});

module.exports = userSchemaProject;