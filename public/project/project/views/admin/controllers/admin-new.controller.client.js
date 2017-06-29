(function () {
    angular
        .module("MovieTag")
        .controller("AdminNewControllerMovieTag", AdminNewControllerMovieTag);

    function AdminNewControllerMovieTag(currentUser, $location, $scope, UserServiceMovieTag) {
        var vm = this;
        vm.uid = currentUser._id;

        vm.createUser = createUser;


        function createUser(newUser, password2) {
                $scope.adminpage.submitted = true;

                if (newUser) {
                    if (newUser.password !== password2) {
                        vm.alert = "Passwords must match";
                        return;
                    }

                    if (newUser.username === undefined) {
                        vm.alert = "Need username";
                        return;
                    }

                    if(newUser.password && password2 && newUser.username) {
                        UserServiceMovieTag
                            .findUserByUsername(newUser.username)
                            .then(
                                function () {
                                    vm.alert = "Username is not available";
                                },
                                function () {
                                    return UserServiceMovieTag
                                        .createUser(newUser)
                                        .then(function () {
                                            $location.url('/admin');
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