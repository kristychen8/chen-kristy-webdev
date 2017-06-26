(function () {
    angular
        .module("MovieTag")
        .controller("RegisterControllerMovieTag", RegisterControllerMovieTag);

    function RegisterControllerMovieTag($location, UserServiceMovieTag, $scope) {
        var vm = this;

        // event handlers
        vm.register = register;

        //implementations
        function register(user, password2) {
            $scope.profilepage.submitted = true;

            if (user) {
                if (user.password !== password2) {
                    vm.alert = "Passwords must match";
                    return;
                }

                if (user.username === undefined) {
                    vm.alert = "Need username";
                    return;
                }

                if(user.password && password2 && user.username) {
                    UserServiceMovieTag
                        .findUserByUsername(user.username)
                        .then(
                            function () {
                                vm.alert = "Username is not available";
                            },
                            function () {
                                var u = {
                                    username: user.username,
                                    password: user.password
                                };
                                return UserServiceMovieTag
                                    .register(u)
                                    .then(function (user) {
                                        $location.url('/profile');
                                    });
                            }
                        )
                }
                else {
                    vm.alert = "Need password";
                }
            }
            else {
                vm.alert = "Input info";
            }
        }
    }
})();