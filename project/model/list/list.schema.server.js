var mongoose = require('mongoose');
var listSchemaProject = mongoose.Schema({
    username: String,
    followers: [{
        uid: {type: mongoose.Schema.Types.ObjectId, ref: "UserModelProject"},
        username: String
    }],
    following: [{
        uid: {type: mongoose.Schema.Types.ObjectId, ref: "UserModelProject"},
        username: String
    }],
    toWatch: [{
        mid: Number,
        title: String
    }],
    alreadyWatched: [{
        mid: Number,
        title: String
    }],
    ratedMovies: [{
        mid: Number,
        title: String,
        rate: Number
    }],
    movieSchedule: [{
        mid: Number,
        title: String
    }]
}, {collection: "listProject"});

module.exports = listSchemaProject;