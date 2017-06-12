(function () {
    angular
        .module('MovieTag')
        .controller('ProfilesController', ProfilesController);

    function ProfilesController ($routeParams, UserService) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.users = UserService.getAllUsersButYours(model.uid);
    }
})();
