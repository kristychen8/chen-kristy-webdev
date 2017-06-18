(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController(currentUser, $location, WebsiteService, $scope) {
        var model = this;
        model.uid = currentUser._id;

        model.createWebsite = createWebsite;
        model.clearForm = clearForm;

        WebsiteService
            .findWebsitesByUser(model.uid)
            .then(renderWebsites);


        function createWebsite(newWeb) {
            $scope.websitepage.submitted = true;
            if (newWeb === undefined) {
                model.message = "Must have name";
            }
            else if (newWeb.name === undefined || newWeb.name === "") {
                model.message = "Must have name";
            }
            else {
                var website = {
                    name: newWeb.name,
                    description: newWeb.description
                };
                WebsiteService
                    .createWebsite(model.uid, website)
                    .then(function() {
                        $location.url('/website');
                    });
            }
        }

        function clearForm(web) {
            $scope.websitepage.submitted = false;
            model.message = null;
            if (web !== undefined) {
                web.name = undefined;
                web.description = undefined;
            }
            // web = undefined;
        }

        function renderWebsites (websites) {
            model.websites = websites;
        }
    }
})();