(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var model = this;

        var uid = $routeParams['uid'];

        model.profileUpdate = profileUpdate;
        model.profileDelete = profileDelete;

        UserService
            .findUserById(uid)
            .then(renderUser);

        function profileUpdate(updateuser) {
            UserService
                .updateUser(updateuser._id, updateuser)
                .then(function () {
                    model.message = "Updated Profile"
                });
        }

        function profileDelete(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function renderUser (user) {
            model.user = user;
        }

    }
})();