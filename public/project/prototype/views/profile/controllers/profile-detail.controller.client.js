(function () {
    angular
        .module('MovieTag')
        .controller('ProfileDetailController', ProfileDetailController);

    function ProfileDetailController($routeParams, UserService, $location) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.pid = $routeParams['pid'];
        var userCopy = {};

        model.follow = follow;

        function init() {
            model.user = {};
            userCopy = UserService.findUserById(model.pid);
            angular.copy(userCopy, model.user);
            console.log(model.user);
        }
        init();

        function follow(){
            if (UserService.findFollowedId(model.uid, model.pid)) {
                model.alert = "Already Following"
            } else {

                UserService
                    .addFollowed(model.uid, model.pid);
                $location.url('/prototype/user/' + model.uid);
            }
        }
    }
})();
