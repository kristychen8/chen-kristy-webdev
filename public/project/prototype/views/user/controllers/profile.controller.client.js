(function () {
    angular
        .module("MovieTag")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var model = this;

        model.uid = $routeParams['uid'];
        var userCopy = {};

        model.profileUpdate = profileUpdate;
        model.toProfile = toProfile;

        function init() {
            model.user = {};
            userCopy = UserService.findUserById(model.uid);
            angular.copy(userCopy, model.user);
            model.bookmark = model.user;
            model.follow = model.user;

        }
        init();

        function profileUpdate(updateuser) {
            UserService.updateUser(model.uid, updateuser);
            angular.copy(model.user, userCopy);
            model.message = "Updated Profile";
        }

        function toProfile() {
            model.message = false;
            angular.copy(userCopy, model.user);
        }

    }
})();