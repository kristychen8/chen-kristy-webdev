var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var websiteSchema = require('../website/website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.deleteWebsite = deleteWebsite;
userModel.addWebsite = addWebsite;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    websiteModel.findAllWebsitesForUser(userId)
        .then(function(websites) {
            for (w in websites) {
                var wid = websites[w]._id;
                websiteModel.deleteWebsite(wid);
            }
        });
    return userModel.remove({_id: userId});
}

function deleteWebsite(websiteId) {
    return userModel
        .findOne({websites: websiteId})
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}
