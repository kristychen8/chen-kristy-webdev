(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(currentUser, $routeParams, UserService, $location) {
        var model = this;

        var uid = currentUser._id;

        model.user = currentUser;
        model.profileUpdate = profileUpdate;
        model.profileDelete = profileDelete;
        model.logout = logout;


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

        function logout() {
            UserService
                .logout()
                .then(function() {
                    $location.url('/');
                })
        }


    }
})();