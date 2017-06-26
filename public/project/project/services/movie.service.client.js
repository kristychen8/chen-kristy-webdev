(function () {
    angular
        .module('MovieTag')
        .service('MovieServiceMovieTag', MovieServiceMovieTag);

    function MovieServiceMovieTag($http) {

        this.searchMovies = searchMovies;
        this.movieDetails = movieDetails;
        this.searchTheaters = searchTheaters;
        this.searchShowtimes = searchShowtimes;

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

        function searchTheaters(zipcode) {
            var urlBase = "https://data.tmsapi.com/v1.1/theatres?zip=ZIP_CODE&api_key=h7krhy5w6qupm59p7phqvsaa";
            var url = urlBase
                .replace("ZIP_CODE", zipcode);
            return $http.get(url);
        }

        function searchShowtimes(theaterID, startDate) {
            var urlBase = "https://data.tmsapi.com/v1.1/theatres/TID/showings?startDate=START_DATE&numDays=8&api_key=h7krhy5w6qupm59p7phqvsaa";
            var url = urlBase
                .replace("START_DATE", startDate)
                .replace("TID", theaterID);
            return $http.get(url);
        }
    }
})();