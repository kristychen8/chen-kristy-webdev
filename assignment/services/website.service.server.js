var app = require('../../express');
var websiteModel = require('../model/website/website.model.server.js');


app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findWebsitesByUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

// var websites = [
//     {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
//     {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
//     {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
//     {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
//     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
//     {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
//     {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
// ];

function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function findWebsitesByUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params['userId'])
        .then(function (websites) {
            res.json(websites);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (websites) {
            res.json(websites);
        });
}

function updateWebsite(req, res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .deleteWebsite(websiteId)
        .then(function (status) {
            res.sendStatus(200);
        });
}


