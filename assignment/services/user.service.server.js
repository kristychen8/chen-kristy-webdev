var app = require('../../express');

app.post('/api/user', createUser);
app.get('/api/user', findUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

var users = [
    {_id: "123", username: "alice", password: "alice", email: "alice@wonderland.com", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", email: "bob@marley.com", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", email: "charly@garcia.com", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", email: "jose@annunzi.com", firstName: "Jose", lastName: "Annunzi"}
];

function createUser(req, res) {
    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    res.json(user);
}

function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if (username && password) {
        findUserByCredentials(req, res);
    }
    else if(username) {
        findUserByUsername(req, res);
    }
}

function findUserByUsername(req, res) {
    var username = req.query['username'];
    for(var u in users) {
        var user = users[u];
        if( user.username === username) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    for(var u in users) {
        var user = users[u];
        if( user.username === username &&
            user.password === password) {
            res.json(user);
            return;
        }
    }
    res.sendStatus(404);

}

function findUserById(req, res) {
    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    for(var u in users) {
        if(userId === users[u]._id) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res) {
    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}


