(function () {
    angular
        .module("MovieTag")
        .controller("LoginControllerMovieTag", LoginControllerMovieTag);

    function LoginControllerMovieTag($location, UserServiceMovieTag, $scope, MovieServiceMovieTag) {
        var vm = this;

        // event handlers
        vm.login = login;
        vm.searchMovieDetail = searchMovieDetail;
        var empty = [];

        //implementations
        function login(user) {
            vm.inform = false;
            if (user === undefined) {
                $scope.loginpage.submitted = true;
                vm.alert = "Input login info";
            } else {
                UserServiceMovieTag
                    .findUserByUsername(user.username)
                    .then (function(u) {
                        UserServiceMovieTag
                            .login(user.username, user.password)
                            .then(function(u) {
                                if(u) {
                                    $location.url('/profile');
                                }
                            }, handleError);
                        function handleError(error) {
                            vm.alert = "Unable to login: incorrect username or password";
                            $scope.loginpage.submitted = true;

                        }
                    }, handleError);
                function handleError(error) {
                    vm.alert = "Unable to login: incorrect username or password";
                    $scope.loginpage.submitted = true;

                }
            }
        }

        function searchMovieDetail(searchText) {
            vm.alert = false;
            $scope.loginpage.submitted = false;

            if (searchText) {
                MovieServiceMovieTag
                    .searchMovies(searchText)
                    .then(function(response) {
                        vm.movies = response.data.results;
                        for (m in vm.movies) {
                            if (vm.movies[m].poster_path === null) {
                                empty.push(vm.movies[m]);
                            }
                        }

                        for (m in empty) {
                            index = vm.movies.indexOf(empty[m]);
                            vm.movies.splice(index, 1);
                        }

                        if (vm.movies.length === 0) {
                            vm.inform = "Title of movie cannot be found.";
                        }
                        else {
                            $location.url('/search/' + searchText);
                        }
                    });
            }
        }
    }
})();