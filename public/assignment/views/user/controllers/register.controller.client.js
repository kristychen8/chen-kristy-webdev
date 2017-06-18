(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $scope) {
        var model = this;

        // event handlers
        model.register = register;

        //implementations
        function register(user, password2) {
            $scope.profilepage.submitted = true;

            if (user) {
                if (user.password !== password2) {
                    model.alert = "Passwords must match";
                    return;
                }

                if (user.username === undefined) {
                    model.alert = "Need username";
                    return;
                }

                if(user.password && password2 && user.username) {
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
                                    .register(u)
                                    .then(function (user) {
                                        $location.url('/profile');
                                    });
                            }
                        )
                }
                else {
                    model.alert = "Need password";
                }
            }
            else {
                model.alert = "Input info";
            }
        }
    }
})();