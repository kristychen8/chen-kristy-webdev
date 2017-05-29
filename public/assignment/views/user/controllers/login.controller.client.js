(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;

        // event handlers
        model.login = login;

        //implementations
         function login(user) {

             if (user === undefined) {
                 model.alert = "Input login info";
             } else {
                 user = UserService.findUserByCredentials(user.username, user.password);
                 if(user) {
                     $location.url('/user/' + user._id);
                 } else {
                     model.alert = "Unable to login: incorrect username or password";
                 }
             }

        }
    }
})();