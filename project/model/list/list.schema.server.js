var mongoose = require('mongoose');
var listSchemaProject = mongoose.Schema({
    _user: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModelProject"}],
    followers: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref: "UserModelProject"},
        username: String
    }],
    following: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref: "UserModelProject"},
        username: String
    }],
    toWatch: [{
        id: Number,
        title: String
    }],
    alreadyWatched: [{
        id: Number,
        title: String
    }],
    ratedMovies: [{
        id: Number,
        title: String,
        rate: {type: Number, default:0}
    }],
    movieSchedule: [{
        id: Number,
        title: String
    }]
}, {collection: "listProject"});

module.exports = listSchemaProject;