var mongoose = require('mongoose');
var listSchema = require('./list.schema.server');
var ListModelProject = mongoose.model('ListModelProject', listSchema);
var userSchema = require('../user/user.schema.server');
var UserModelProject = mongoose.model('UserModelProject', userSchema);


ListModelProject.createList = createList;
ListModelProject.findListByUser = findListByUser;
ListModelProject.findListById = findListById;
ListModelProject.findListWithSpecificItem = findListWithSpecificItem;
ListModelProject.addItemToSpecificList = addItemToSpecificList;
ListModelProject.removeItemFromSpecificList = removeItemFromSpecificList;
ListModelProject.updateRated = updateRated;
ListModelProject.deleteList = deleteList;


module.exports = ListModelProject;

function createList(list){
    return ListModelProject.create(list);
}

function findListByUser(userId){
    return ListModelProject.find({_user: userId});
}

function findListById(listId){
    return ListModelProject.findById(listId);
}

function findListWithSpecificItem(listId, id, list){
    if (list === "ratedMovies") {
        return ListModelProject.find({"ratedMovies.id":id, _id:listId}, {"ratedMovies":1})
    }
    if (list === "toWatch") {
        return ListModelProject.find({"toWatch.id":id, _id:listId}, {"toWatch":1})
    }
    if (list === "alreadyWatched") {
        return ListModelProject.find({"alreadyWatched.id":id, _id:listId}, {"alreadyWatched":1})

    }
    if (list === "following") {
        return ListModelProject.find({"following.id":id, _id:listId}, {"following":1})

    }
    if (list === "followers") {
        return ListModelProject.find({"followers.id":id, _id:listId}, {"followers":1})
    }
    if (list === "usersSeenSameMovie") {
        return ListModelProject.find({"alreadyWatched.id":id}, {"_user":1})
    }
}

function addItemToSpecificList(listId, list, array){
    if (list === "ratedMovies") {
        return ListModelProject.update({_id: listId}, {$push: { ratedMovies: array }});
    }
    if (list === "toWatch") {
        return ListModelProject.update({_id: listId}, {$push: { toWatch: array }});
    }
    if (list === "alreadyWatched") {
        return ListModelProject.update({_id: listId}, {$push: { alreadyWatched: array }});
    }
    if (list === "following") {
        return ListModelProject.update({_id: listId}, {$push: { following: array }});
    }
    if (list === "followers") {
        return ListModelProject.update({_id: listId}, {$push: { followers: array }});
    }
}

function removeItemFromSpecificList(listId, id, list){
    if (list === "ratedMovies") {
        return ListModelProject.update({_id : listId}, {$pull: {ratedMovies: {"id": id } }});
    }
    if (list === "toWatch") {
        return ListModelProject.update({_id: listId}, {$pull: {toWatch: {"id": id } }});
    }
    if (list === "alreadyWatched") {
        return ListModelProject.update({_id: listId}, {$pull: {alreadyWatched: {"id": id } }});
    }
    if (list === "following") {
        return ListModelProject.update({_id: listId}, {$pull: {following: {"id": id } }});
    }
    if (list === "followers") {
        return ListModelProject.update({_id: listId}, {$pull: {followers: {"id": id } }});
    }
}

function updateRated(listId, mid, rate){
    return ListModelProject.update({_id: listId, "ratedMovies.id": mid}, {$set: {"ratedMovies.$.rate": rate}})
}

function deleteList(userId) {
    return ListModelProject.remove({_user: userId});
}