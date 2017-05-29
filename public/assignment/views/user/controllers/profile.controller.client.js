(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var model = this;

        var uid = $routeParams['uid'];
        var userCopy = {};

        model.profileUpdate = profileUpdate;
        model.toProfile = toProfile;

        function init() {
            model.user = {};
            userCopy = UserService.findUserById(uid);
            angular.copy(userCopy, model.user);

        }
        init();

        function profileUpdate(updateuser) {
            UserService.updateUser(uid, updateuser);
            angular.copy(model.user, userCopy);
            model.message = "Updated Profile";
        }

        function toProfile() {
            model.message = false;
            angular.copy(userCopy, model.user);
        }

    }
})();