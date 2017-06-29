(function () {
    angular
        .module('MovieTag')
        .controller('MovieDetailControllerMovieTag', MovieDetailControllerMovieTag);

    function MovieDetailControllerMovieTag ($rootScope, $routeParams, MovieServiceMovieTag, $location, ListServiceMovieTag) {
        var vm = this;
        vm.uid = null;
        vm.search = $routeParams['search'];
        vm.mid = $routeParams['mid'];
        vm.fromProfile = $routeParams['p'];
        vm.fromOtherUser = $routeParams['fromOtherUser'];
        vm.rates = null;
        vm.cast ={};
        vm.bookmarked = false;
        vm.watched = false;
        vm.yourRating = 0;
        vm.count = 0;
        vm.rating = 0;
        var movie = {};
        var mainCast=[];
        var mainCrew=[];


        vm.bookmark = bookmark;
        vm.watch = watch;
        vm.rate = rate;
        vm.users = users;
        vm.totalMovieRating = totalMovieRating;

        function init() {
            if ($rootScope.currentUser) {
                vm.uid = $rootScope.currentUser._id;
                ListServiceMovieTag
                    .findListByUser(vm.uid)
                    .then(function (list) {
                        vm.listId = list[0]._id;
                        ListServiceMovieTag
                            .findListWithSpecificItem(vm.listId, vm.mid, "toWatch")
                            .then(function (list) {
                                if (list.length !== 0)
                                    vm.bookmarked = true;
                            });
                        ListServiceMovieTag
                            .findListWithSpecificItem(vm.listId, vm.mid, "alreadyWatched")
                            .then(function (list) {
                                if (list.length !== 0)
                                    vm.watched = true;
                            });
                        ListServiceMovieTag
                            .findListWithSpecificItem(vm.listId, vm.mid, "ratedMovies")
                            .then(function (list) {
                                if (list.length !== 0) {
                                    for (var i = 0; i < list[0].ratedMovies.length; i++) {
                                        if (list[0].ratedMovies[i].id == vm.mid) {
                                            vm.yourRating = list[0].ratedMovies[i].rate;
                                        }
                                    }
                                }
                            });
                    });
            }

            totalMovieRating();

            MovieServiceMovieTag
                .movieDetails(vm.mid)
                .then(function (response) {
                    vm.detail = response.data;
                    movie = {id: vm.mid, title: vm.detail.title};
                });

            MovieServiceMovieTag
                .movieCredits(vm.mid)
                .then(function (response) {
                    if (response.data.cast.length > 20) {
                        for (var i = 0; i < 20; i++) {
                            mainCast.push(response.data.cast[i]);
                        }
                    } else {
                        for (i = 0; i < response.data.cast.length; i++) {
                            mainCast.push(response.data.cast[i]);
                        }

                    }
                    if (response.data.crew.length > 5) {
                        for (i = 0; i < 5; i++) {
                            mainCrew.push(response.data.crew[i]);
                        }
                    } else {
                        for (i = 0; i < response.data.crew.length; i++) {
                            mainCrew.push(response.data.crew[i]);
                        }

                    }
                    vm.cast = mainCast;
                    vm.crew = mainCrew;
                });
        }
        init();

        function rate(value) {
            var r = {
                "rate" : value
            };
            if(vm.uid) {
                ListServiceMovieTag
                    .findListWithSpecificItem(vm.listId, vm.mid,"ratedMovies")
                    .then(function(list) {
                        if (list.length !== 0) {
                            ListServiceMovieTag
                                .updateRated(vm.listId, vm.mid, r);
                        }
                        else{
                            ListServiceMovieTag
                                .addItemToSpecificList(vm.listId,"ratedMovies", movie)
                                .then(function() {
                                    ListServiceMovieTag
                                        .updateRated(vm.listId, vm.mid, r);
                                });
                        }
                        vm.yourRating = value;
                        totalMovieRating();

                    });

            }
            else {
                vm.alert = "Sign in to rate movies"
            }
        }

        function bookmark(){
            if(vm.uid) {
                vm.bookmarked = !vm.bookmarked;
                ListServiceMovieTag
                    .findListWithSpecificItem(vm.listId, vm.mid,"toWatch")
                    .then(function(list) {
                        if (list.length !== 0) {
                            ListServiceMovieTag
                                .removeItemFromSpecificList(vm.listId,vm.mid, "toWatch");
                        }
                        else{
                            ListServiceMovieTag
                                .addItemToSpecificList(vm.listId,"toWatch", movie);
                        }
                    })
            }
            else {
                vm.alert = "Sign in to bookmark movies"
            }
        }

        function watch(){
            if(vm.uid) {
                vm.watched = !vm.watched;
                ListServiceMovieTag
                    .findListWithSpecificItem(vm.listId, vm.mid,"alreadyWatched")
                    .then(function(list) {
                        if (list.length !== 0) {
                            ListServiceMovieTag
                                .removeItemFromSpecificList(vm.listId,vm.mid, "alreadyWatched");
                        }
                        else{
                            ListServiceMovieTag
                                .addItemToSpecificList(vm.listId,"alreadyWatched", movie);
                        }
                    })
            }
            else {
                vm.alert = "Sign in to add movies to watched list"
            }
        }

        function users() {
            if (vm.uid) {
                $location.url("/profile/search/m/" + vm.mid +"/profiles");
            }
            else {
                vm.alert = "Sign in to see and follow other users"
            }
        }

        function totalMovieRating() {
            vm.count = 0;
            vm.rating = 0;
            ListServiceMovieTag
                .findListWithSpecificItem(0, vm.mid, "allRatingsForMovie")
                .then(function (list) {

                    var allRatingsForMovie = list;
                    for (i = 0; i < allRatingsForMovie.length; i++) {
                        for (j = 0; j < allRatingsForMovie[i].ratedMovies.length; j++) {
                            if(allRatingsForMovie[i].ratedMovies[j].id == vm.mid) {
                                vm.rating += allRatingsForMovie[i].ratedMovies[j].rate;
                                vm.count++;
                            }
                        }
                    }
                    vm.rating = vm.rating/vm.count;
                });
        }
    }
})();
