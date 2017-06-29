(function () {
    angular
        .module('MovieTag')
        .controller('TheaterControllerMovieTag', TheaterControllerMovieTag);

    function TheaterControllerMovieTag ($routeParams, pocService, $location, UserService) {
        var model = this;
        model.mid = $routeParams['mid'];
        model.uid = $routeParams['uid'];
        model.detail = {};
        var movie = {};

        model.bookmark = bookmark;

        function init() {
            pocService
                .movieDetails(model.mid)
                .then(function (response) {
                    model.detail = response.data;
                    movie = {id: model.mid, name: model.detail.title};
                });
        }
        init();

        function bookmark(){
            if (UserService.findBookmarked(model.uid, model.mid)){
                model.alert = "Movie Already Bookmarked"
            } else{

                UserService
                    .addbookmark(model.uid, movie);
                $location.url('/prototype/user/' + model.uid);
            }
        }
    }
})();
