(function() {
    angular
        .module("MovieTag")
        .controller("RegisterController", RegisterController);

    function  RegisterController ($location, UserService) {
        var model = this;

        // event handlers
        model.register = register;

        //implementations
        function register(user, password2) {

            if(user.password !== password2) {
                model.alert = "Passwords must match";
                return;
            }

            var found = UserService.findUserByUsername(user.username);

            if(found) {
                model.alert = "Username is not available";
            } else {
                var u = {
                    username: user.username,
                    password: user.password
                };
                UserService.createUser(u);
                $location.url('/prototype/user/' + u._id);
            }
        }
    }
})();