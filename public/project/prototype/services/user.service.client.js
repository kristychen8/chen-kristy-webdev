(function () {
    angular
        .module("MovieTag")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", email: "alice@wonderland.com", firstName: "Alice", lastName: "Wonder", followers: [], followed: [], bookmark: []},
            {_id: "234", username: "bob", password: "bob", email: "bob@marley.com", firstName: "Bob", lastName: "Marley", followers: [], followed: [], bookmark: []}
        ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "addFollowed": addFollowed,
            "findFollowedId":findFollowedId,
            "findBookmarked":findBookmarked,
            "addbookmark" : addbookmark,
            "getAllUsersButYours": getAllUsersButYours
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            user.followers = [];
            user.followed = [];
            user.bookmark = [];
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

        function addFollowed(userId, followId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);

            var follow = findUserById(followId);
            var index2 = users.indexOf(follow);

            users[index].followed.push(follow);
            users[index2].followers.push(user);
            console.log(users);

        }

        function addbookmark(userId, movie) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users[index].bookmark.push(movie);
        }

        function getAllUsersButYours(userId) {
            var u = users.slice();
            var user = findUserById(userId);
            var index = u.indexOf(user);
            u.splice(index, 1);
            return u;
        }

        function findFollowedId(userId, followId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);

            return users[index].followed.find(function(user) {
                return (user._id === followId);
            })
        }

        function findBookmarked(userId, movieId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);

            return users[index].bookmark.find(function(bk) {
                return (bk.id === movieId);
            })
        }


    }
})();