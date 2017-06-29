(function () {
    angular
        .module("MovieTag")
        .controller("AdminControllerMovieTag", AdminControllerMovieTag);

    function AdminControllerMovieTag($rootScope, UserServiceMovieTag) {
        var vm = this;

        var uid = $rootScope.currentUser._id;
        vm.user = $rootScope.currentUser;

        function init() {
            UserServiceMovieTag
                .findAllUsersButYours(uid)
                .then(function (users) {
                    vm.users = users;
                })
        }
        init();

    }
})();