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
            .when("/admin", {
                templateUrl: "project/views/admin/templates/admin.view.client.html",
                controller: "AdminControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkAdmin}

            })
            .when("/admin/new", {
                templateUrl: "project/views/admin/templates/admin-new.view.client.html",
                controller: "AdminNewControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkAdmin}

            })
            .when("/admin/:user", {
                templateUrl: "project/views/admin/templates/admin-edit.view.client.html",
                controller: "AdminEditControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkAdmin}
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
            .when("/profile/search/t", {
                templateUrl: "project/views/movie/templates/search.view.client.html",
                controller: "SearchControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/search/m", {
                templateUrl: "project/views/movie/templates/search.view.client.html",
                controller: "SearchControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/search/m/:mid", {
                templateUrl: "project/views/movie/templates/movie-detail.view.client.html",
                controller: "MovieDetailControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/search/m/:mid/t/:p", {
                templateUrl: "project/views/movie/templates/movie-detail.view.client.html",
                controller: "MovieDetailControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            // .when("/profile/search/m/:mid/t/:fromOtherUser", {
            //     templateUrl: "project/views/movie/templates/movie-detail.view.client.html",
            //     controller: "MovieDetailControllerMovieTag",
            //     controllerAs: "vm",
            //     resolve: {currentUser: checkLoggedIn}
            // })
            .when("/profile/search/t/:tid", {
                templateUrl: "project/views/movie/templates/theater.view.client.html",
                controller: "TheaterControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/search/m/:mid/profiles", {
                templateUrl: "project/views/profile/templates/profile-list.view.client.html",
                controller: "ProfileListControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/search/m/:mid/profiles/:pid", {
                templateUrl: "project/views/profile/templates/profile-detail.view.client.html",
                controller: "ProfileDetailControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/community", {
                templateUrl: "project/views/profile/templates/profile-list.view.client.html",
                controller: "ProfileListControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/community/:pid", {
                templateUrl: "project/views/profile/templates/profile-detail.view.client.html",
                controller: "ProfileDetailControllerMovieTag",
                controllerAs: "vm",
                resolve: {currentUser: checkLoggedIn}
            })
            .when("/profile/community/:pid/t/:p", {
                templateUrl: "project/views/profile/templates/profile-detail.view.client.html",
                controller: "ProfileDetailControllerMovieTag",
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

    function checkAdmin($rootScope, $q, $location, UserServiceMovieTag) {
        var deferred = $q.defer();
        UserServiceMovieTag
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/profile');
                } else {
                    $rootScope.currentUser = currentUser;
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

})();