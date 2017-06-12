(function () {
    angular
        .module('MovieTag')
        .controller('DetailController', DetailController);

    function DetailController ($routeParams, pocService, $location, UserService) {
        var model = this;
        model.mid = $routeParams['mid'];
        model.uid = $routeParams['uid'];
        model.detail = {};
        var movie = {};

        model.bookmark = bookmark;

        pocService
            .movieDetails(model.mid)
            .then(function(response) {
                model.detail = response.data;
                movie = {id: model.mid, name: model.detail.title};
            });

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
