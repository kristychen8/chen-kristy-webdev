(function() {
    angular
        .module("MovieTag")
        .controller("AdminEditControllerMovieTag", AdminEditControllerMovieTag);

    function  AdminEditControllerMovieTag (currentUser, $location, $routeParams, UserServiceMovieTag) {
        var vm = this;
        vm.uid = currentUser._id;
        vm.username = $routeParams['user'];

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserServiceMovieTag
                .findUserByUsername(vm.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
        init();


        function updateUser() {
            UserServiceMovieTag
                    .updateUser(vm.user._id, vm.user)
                    .then(function() {
                        $location.url('/admin');
                    });
            }


        function deleteUser() {
            UserServiceMovieTag
                .deleteUser(vm.user._id)
                .then(function() {
                    $location.url('/admin');
                });
        }

    }
})();