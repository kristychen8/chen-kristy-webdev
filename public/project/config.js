(function() {
    angular
        .module("MovieTag")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
        // project implementation
            .when("/", {
                templateUrl: "project/views/user/templates/login.view.client.html",
                controller: "LoginControllerMovieTag",
                controllerAs: "vm"
            })
            .when("/search", {
                templateUrl: "project/views/user/templates/login.view.client.html",
                controller: "LoginControllerMovieTag",
                controllerAs: "vm"
            })
            .when("/search/:search", {
                templateUrl: "project/views/movie/templates/anon-search-result.view.client.html",
                controller: "SearchControllerMovieTag",
                controllerAs: "vm"
            })
            .when("/search/:search/:mid", {
                templateUrl: "project/views/movie/templates/movie-detail.view.client.html",
                controller: "MovieDetailControllerMovieTag",
                controllerAs: "vm"
            })
            .when("/login", {
                templateUrl: "project/views/user/templates/login.view.client.html",
                controller: "LoginControllerMovieTag",
                controllerAs: "vm"
            })
            .when("/register", {
                templateUrl: "project/views/user/templates/register.view.client.html",
                controller: "RegisterControllerMovieTag",
                controllerAs: "vm"
            })
            .when("/profile", {
                templateUrl: "project/views/user/templates/profile.view.client.html",
                controller: "ProfileControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/search", {
                templateUrl: "project/views/movie/templates/search.view.client.html",
                controller: "SearchControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })



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

            //Prototype
            .when("/prototype", {
                templateUrl: "prototype/views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: 'model'
            })
            .when("/prototype/login", {
                templateUrl: "prototype/views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: 'model'
            })
            .when("/prototype/register", {
                templateUrl: "prototype/views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: 'model'
            })
            .when("/prototype/user/:uid", {
                templateUrl: "prototype/views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: 'model'
            })
            .when("/prototype/user/:uid/search", {
                templateUrl: "prototype/views/movie/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: 'model'
            })
            .when("/prototype/user/:uid/search/:mid", {
                templateUrl: "prototype/views/movie/templates/detail.view.client.html",
                controller: "DetailController",
                controllerAs: 'model'
            })
            .when("/prototype/user/:uid/profile", {
                templateUrl: "prototype/views/profile/templates/profiles.view.client.html",
                controller: "ProfilesController",
                controllerAs: 'model'
            })
            .when("/prototype/user/:uid/profile/:pid", {
                templateUrl: "prototype/views/profile/templates/profile-detail.view.client.html",
                controller: "ProfileDetailController",
                controllerAs: 'model'
            })
    }

        function checkLoggedIn($q, $location, UserServiceMovieTag, $rootScope) {
            var deferred = $q.defer();
            UserServiceMovieTag
                .checkLoggedIn()
                .then(function (currentUser) {
                    if (currentUser === '0') {
                        deferred.reject();
                        $location.url('/login');
                    } else {
                        $rootScope.currentUser = currentUser;
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }

})();