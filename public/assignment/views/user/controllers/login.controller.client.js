(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $scope) {
        var model = this;

        // event handlers
        model.login = login;

        //implementations
         function login(user) {

             if (user === undefined) {
                 $scope.loginpage.submitted = true;
                 model.alert = "Input login info";
             } else {
                 UserService
                     .login(user.username, user.password)
                     .then(login, handleError);

                 function handleError(error) {
                     model.alert = "Unable to login: incorrect username or password";
                     $scope.loginpage.submitted = true;

                 }

                 function login(user) {
                     if(user) {
                         $location.url('/profile');
                     }
                 }
             }

        }
    }
})();