(function () {
    angular
        .module("MovieTag")
        .controller("ProfileControllerMovieTag", ProfileControllerMovieTag);

    function ProfileControllerMovieTag($rootScope, $routeParams, UserServiceMovieTag, $location) {
        var vm = this;

        var uid = $rootScope.currentUser._id;

        vm.user = $rootScope.currentUser;
        vm.profileUpdate = profileUpdate;
        vm.profileDelete = profileDelete;
        vm.logout = logout;


        function profileUpdate(updateuser) {
            UserServiceMovieTag
                .updateUser(updateuser._id, updateuser)
                .then(function () {
                    vm.message = "Updated Profile"
                });
        }

        function profileDelete(user) {
            UserServiceMovieTag
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    vm.error = "Unable to unregister you";
                });
        }

        function logout() {
            UserServiceMovieTag
                .logout()
                .then(function() {
                    $rootScope.currentUser = null;
                    $location.url('/login');
                    // $location.url('/');

                })
        }


    }
})();