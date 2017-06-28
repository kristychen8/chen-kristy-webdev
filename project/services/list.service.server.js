var app = require('../../express');
var ListModelProject = require('../model/list/list.model.server.js');

app.post('/api/movietag/user/list', createList);
app.get("/api/movietag/user/:userId/list", findListByUser);
app.get('/api/movietag/list/:listId', findListById);
app.get("/api/movietag/list/:listId/type/:list/:id", findListWithSpecificItem);
app.post("/api/movietag/list/:listId/type/:list", addItemToSpecificList);
app.delete("/api/movietag/list/:listId/type/:list/:id", removeItemFromSpecificList);
app.put("/api/movietag/list/:listId/type/rate/:mid", updateRated);


function createList(req, res) {
    var list = req.body;
    ListModelProject
        .createList(list)
        .then(function (list) {
            res.json(list);
        });
}

function findListByUser(req, res) {
    ListModelProject
        .findListByUser(req.params['userId'])
        .then(function (list) {
            res.json(list);
        });
}

function findListById(req, res) {
    var listId = req.params['listId'];
    ListModelProject
        .findListById(listId)
        .then(function (list) {
            res.json(list);
        });
}

function findListWithSpecificItem(req, res) {
    var listId = req.params['listId'];
    var list = req.params['list'];
    var id = req.params['id'];

    ListModelProject
        .findListWithSpecificItem(listId, id, list)
        .then(function (list) {
            res.json(list);
        });
}

function addItemToSpecificList(req, res) {
    var listId = req.params['listId'];
    var list = req.params['list'];
    var array = req.body;
    ListModelProject
        .addItemToSpecificList(listId, list, array)
        .then(function (list) {
            res.json(list);
        });
}

function removeItemFromSpecificList(req, res) {
    var listId = req.params['listId'];
    var list = req.params['list'];
    var id = req.params['id'];

    ListModelProject
        .removeItemFromSpecificList(listId, id, list)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateRated(req, res) {
    var listId = req.params['listId'];
    var mid = req.params['mid'];
    var rate = req.body.rate;
    ListModelProject
        .updateRated(listId, mid, rate)
        .then(function (status) {
            res.sendStatus(200);
        });
}






