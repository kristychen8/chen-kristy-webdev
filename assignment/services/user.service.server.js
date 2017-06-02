var app = require('../../express');

app.get('/api/assignment/user/:userId', createUser);
app.get   ('/api/assignment/user', findUserByUsername);
app.get   ('/api/assignment/user', findUserByCredentials);
app.get   ('/api/assignment/user', findUserById);
app.put   ('/api/assignment/user', updateUser);
app.delete   ('/api/assignment/user', deleteUser);

var users = [
    {_id: "123", username: "alice", password: "alice", email: "alice@wonderland.com", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", email: "bob@marley.com", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", email: "charly@garcia.com", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", email: "jose@annunzi.com", firstName: "Jose", lastName: "Annunzi"}
];

function createUser(req, res) {
    res.send(users);
}

function findUserByUsername(req, res) {

}

function findUserByCredentials(req, res) {

}

function findUserById(req, res) {

}

function updateUser(req, res) {

}

function deleteUser(req, res) {

}


