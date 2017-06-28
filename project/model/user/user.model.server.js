var mongoose = require('mongoose');
var userSchemaProject = require('./user.schema.server');
var UserModelProject = mongoose.model('UserModelProject', userSchemaProject);
// var listSchema = require('../list/list.schema.server');
// var ListModelProject = mongoose.model('ListModelProject', listSchema);

UserModelProject.createUser = createUser;
UserModelProject.findUserById = findUserById;
UserModelProject.findUserByUsername = findUserByUsername;
UserModelProject.findUserByCredentials = findUserByCredentials;
UserModelProject.deleteUser = deleteUser;
UserModelProject.updateUser = updateUser;
UserModelProject.findUserByGoogleId = findUserByGoogleId;
UserModelProject.findAllUsersButYours = findAllUsersButYours;

module.exports = UserModelProject;

function createUser(user) {
    return UserModelProject.create(user);
}

function findUserById(userId) {
    return UserModelProject.findById(userId);
}

function findUserByUsername(username) {
    return UserModelProject.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return UserModelProject.findOne({username: username, password: password});
}

function updateUser(userId, user) {
    return UserModelProject.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    return UserModelProject.remove({_id: userId});
}

function findUserByGoogleId(googleId) {
    return UserModelProject.findOne({'google.id': googleId});
}

function findAllUsersButYours(userId) {
    return UserModelProject.find({'_id':{$ne: userId}});
}