(function () {
    angular
        .module("MovieTag")
        .factory("UserServiceMovieTag", UserServiceMovieTag);

    function UserServiceMovieTag($http) {
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "login": login,
            "register": register,
            "logout": logout,
            "checkLoggedIn": checkLoggedIn,
            "checkAdmin": checkAdmin,
            "findAllUsersButYours": findAllUsersButYours,
            "findAllUsers": findAllUsers
        };
        return api;

        function login(username, password) {
            var url = "/api/movietag/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/movietag/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/movietag/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/movietag/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/movietag/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/movietag/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userId) {
            var url = "/api/movietag/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/movietag/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/movietag/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/movietag/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/movietag/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsersButYours(userId) {
            var url = "/api/movietag/user/profileList/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/movietag/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();