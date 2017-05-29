(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", email: "alice@wonderland.com", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", email: "bob@marley.com", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", email: "charly@garcia.com", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", email: "jose@annunzi.com", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
        }

        function findUserById(userId) {
            return users.find(function (user) {
                return user._id === userId;
            })
        }

        function findUserByUsername(username) {
            return users.find(function (user) {
                return user.username === username;
            })
        }

        function findUserByCredentials(username, password) {
            return users.find(function(user) {
                return (user.username === username && user.password === password);
            })
        }

        function updateUser(userId, user) {
            var index = users.indexOf(findUserById(userId));
            users[index] = user;
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index, 1);
        }

    }
})();