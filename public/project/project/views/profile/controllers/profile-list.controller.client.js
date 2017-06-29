(function () {
    angular
        .module('MovieTag')
        .controller('ProfileListControllerMovieTag', ProfileListControllerMovieTag);

    function ProfileListControllerMovieTag ($rootScope, $routeParams, UserServiceMovieTag, ListServiceMovieTag) {
        var vm = this;
        vm.uid = $rootScope.currentUser._id;
        vm.users = [];
        var usersSeenSameMovie = [];
        vm.mid = null;

        function init() {
            if ($routeParams['mid']) {
                vm.mid = $routeParams['mid'];

                ListServiceMovieTag
                    .findListWithSpecificItem(0, vm.mid, "usersSeenSameMovie")
                    .then(function (list) {
                        usersSeenSameMovie = list;
                        var index = -1;
                        for (var i = 0; i < usersSeenSameMovie.length; i++) {
                            if (usersSeenSameMovie[i]._user[0] === vm.uid) {
                                index = i;
                            }
                        }

                        if (index > -1) {
                            usersSeenSameMovie.splice(index, 1);
                        }

                        for (i = 0; i < usersSeenSameMovie.length; i++) {
                            UserServiceMovieTag
                                .findUserById(usersSeenSameMovie[i]._user[0])
                                .then(function (user) {
                                    vm.users.push(user);
                                })
                        }
                    })

            } else {
                UserServiceMovieTag
                    .findAllUsersButYours(vm.uid)
                    .then(function (users) {
                        vm.users = users;
                    });
            }
        }
        init();

    }
})();
