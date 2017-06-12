(function () {
    angular
        .module('MovieTag')
        .service('pocService', pocService);

    function pocService($http) {

        this.searchMovies = searchMovies;
        this.movieDetails = movieDetails;

        function searchMovies(searchTerm) {
            var urlBase = "https://api.themoviedb.org/3/search/movie?api_key=a17412c76b1a0f72ad9b1279bcb178e2&language=en-US&query=QUERY&page=1&include_adult=false";
            var url = urlBase
                .replace("QUERY", searchTerm);
            return $http.get(url);
        }

        function movieDetails(movieId) {
            var urlBase = " https://api.themoviedb.org/3/movie/MOVIE_ID?api_key=a17412c76b1a0f72ad9b1279bcb178e2&language=en-US";
            var url = urlBase
                .replace("MOVIE_ID", movieId);
            return $http.get(url);
        }

    }

})();