(function () {
    angular
        .module('MovieTag')
        .controller('SearchController', SearchController);

    function SearchController ($routeParams, pocService) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.searchMovie = searchMovie;

        function searchMovie(searchTerm) {
            pocService
                .searchMovies(searchTerm)
                .then(function(response) {
                    if (response.data.results.length === 0) {
                        model.alert = "Title of movie cannot be found.";
                    }
                    else {
                        model.alert = false;
                        model.movies = response.data.results;
                    }
                });
        }
    }
})();
