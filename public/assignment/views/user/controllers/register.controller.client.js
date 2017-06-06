(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var model = this;

        // event handlers
        model.register = register;

        //implementations
        function register(user, password2) {

            if (user.password !== password2) {
                model.alert = "Passwords must match";
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .then(
                    function () {
                        model.alert = "Username is not available";
                    },
                    function () {
                        var u = {
                            username: user.username,
                            password: user.password
                        };
                        return UserService
                            .createUser(u)
                            .then(function (user) {
                                $location.url('/user/' + user._id);
                            });
                    }
                )
        }
    }
})();