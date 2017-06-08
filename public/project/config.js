(function() {
    angular
        .module("MovieTag")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            // POC
            .when("/poc", {
                templateUrl: "poc/views/templates/home.view.client.html",
                controller: "SearchController",
                controllerAs: 'model'
            })
            .when("/poc/search", {
                templateUrl: "poc/views/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: 'model'
            })
            .when("/poc/detail/:mid", {
                templateUrl: "poc/views/templates/detail.view.client.html",
                controller: "DetailController",
                controllerAs: 'model'
            })
            .when("/poc/theater", {
                templateUrl: "poc/views/templates/local-theater-movies.view.client.html",
                controller: "TheaterController",
                controllerAs: 'model'
            })
            .when("/poc/theater/:tid", {
                templateUrl: "poc/views/templates/showtime.view.client.html",
                controller: "ShowtimeController",
                controllerAs: 'model'
            })
    }
})();