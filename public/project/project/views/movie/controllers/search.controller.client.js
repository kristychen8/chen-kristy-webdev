(function () {
    angular
        .module('MovieTag')
        .controller('SearchControllerMovieTag', SearchControllerMovieTag);

    function SearchControllerMovieTag($routeParams, MovieServiceMovieTag, $rootScope) {
        var vm = this;
        vm.search = $routeParams['search'];
        vm.uid = $rootScope.currentUser;
        var empty = [];
        var movies = 0;
        vm.searchMovie = searchMovie;
        vm.searchTheater = searchTheater;

        function init() {

            MovieServiceMovieTag
                .searchMovies(vm.search)
                .then(function (response) {
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
                    empty = [];
                });
        }
        init();


        function searchMovie(movie) {
            if (movie) {
                MovieServiceMovieTag
                    .searchMovies(movie)
                    .then(function (response) {
                        if (response.data.results.length !== 0) {
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
                            empty = [];
                            vm.inform2 = false;
                            vm.inform = false;
                        } else {
                            vm.inform2 = "Title of movie cannot be found.";
                            vm.inform = false;
                            vm.movies = "";
                        }
                    });
            } else {
                vm.inform2 = "Input Name of Movie";
                vm.inform = false;
                vm.movies = "";
            }
        }


        function searchTheater(zipcode) {
            if(zipcode) {
            MovieServiceMovieTag
                .searchTheaters(zipcode)
                .then(function (response) {
                    if (response.data === "") {
                        vm.inform = "Zip Code does not exist";
                        vm.inform2 = false;
                        vm.theaters = "";

                    }
                    else {
                        vm.inform = false;
                        vm.inform2 = false;
                        vm.theaters = response.data;
                    }
                });
            } else {
                vm.inform = "Input Zip Code";
                vm.inform2 = false;
                vm.theaters="";

            }
        }

    }
})();
