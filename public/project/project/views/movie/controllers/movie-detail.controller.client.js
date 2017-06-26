(function () {
    angular
        .module('MovieTag')
        .controller('MovieDetailControllerMovieTag', MovieDetailControllerMovieTag);

    function MovieDetailControllerMovieTag ($rootScope, $routeParams, MovieServiceMovieTag, $location, ListServiceMovieTag) {
        var vm = this;
        vm.uid = null;
        vm.rating = 0;
        vm.search = $routeParams['search'];
        vm.mid = $routeParams['mid'];
        vm.rates = null;
        vm.watched = null;
        vm.yourRating = 0;
        var movie = {};
        var mainCast=[];
        var mainCrew=[];

        vm.cast ={};
        vm.bookmarked = false;


        vm.bookmark = bookmark;
        vm.watch = watch;
        vm.rate = rate;
        vm.users = users;

        if($rootScope.currentUser) {
            vm.uid = $rootScope.currentUser._id;

            // ListServiceMovieTag
            //     .findIndexMovie('mid')
            //     .then(function(index){
            //         vm.rates = vm.uid.list.ratedMovies[index].rate
            //     });
        }


        MovieServiceMovieTag
            .movieDetails(vm.mid)
            .then(function(response) {
                vm.detail = response.data;
                // console.log(vm.detail);
                movie = {id: vm.mid, name: vm.detail.title};
            });

        MovieServiceMovieTag
            .movieCredits(vm.mid)
            .then(function(response){
                if (response.data.cast.length > 20) {
                    for (var i = 0; i < 20; i++) {
                        mainCast.push(response.data.cast[i]);
                    }
                }else {
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


        function rate(value) {
            if(vm.uid) {

            }
            else {
                vm.alert = "Sign in to rate movies"
            }
        }

        function bookmark(){
            if(vm.uid) {
                if (vm.bookmarked) {
                    vm.bookmarked = false;
                }
                else {
                    vm.bookmarked = true;
                }
            }
            else {
                vm.alert = "Sign in to bookmark movies"
            }
            // if (UserServiceMovieTag.findBookmarked(vm.uid, vm.mid)){
            //     vm.alert = "Movie Already Bookmarked"
            // } else{
            //
            //     UserServiceMovieTag
            //         .addbookmark(vm.uid, movie);
            //     $location.url('/prototype/user/' + vm.uid);
            // }
        }

        function watch(){
            if(vm.watched) {

            }
            else {
                vm.alert = "Sign in to add movies to watched list"
            }
            // if (UserServiceMovieTag.findBookmarked(vm.uid, vm.mid)){
            //     vm.alert = "Movie Already Bookmarked"
            // } else{
            //
            //     UserServiceMovieTag
            //         .addbookmark(vm.uid, movie);
            //     $location.url('/prototype/user/' + vm.uid);
            // }
        }

        function users() {
            if (vm.uid) {

            }
            else {
                vm.alert = "Sign in to see and follow other users"
            }
            // if (UserServiceMovieTag.findBookmarked(vm.uid, vm.mid)){
            //     vm.alert = "Movie Already Bookmarked"
            // } else{
            //
            //     UserServiceMovieTag
            //         .addbookmark(vm.uid, movie);
            //     $location.url('/prototype/user/' + vm.uid);
        }
    }
})();
