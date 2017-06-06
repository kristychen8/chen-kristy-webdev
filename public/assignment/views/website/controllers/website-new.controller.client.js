(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.uid = $routeParams['uid'];

        model.createWebsite = createWebsite;
        model.clearForm = clearForm;

        WebsiteService
            .findWebsitesByUser(model.uid)
            .then(renderWebsites);


        function createWebsite(newWeb) {
            if (newWeb === undefined) {
                model.message = "Must have name and description";
            }
            else if ((newWeb.name === undefined || newWeb.name === "") || (newWeb.description === undefined || newWeb.description === "")) {
                model.message = "Must have name and description";
            }
            else {
                var website = {
                    name: newWeb.name,
                    description: newWeb.description
                };
                WebsiteService
                    .createWebsite(model.uid, website)
                    .then(function() {
                        $location.url('/user/' + model.uid + '/website');
                    });
            }
        }

        function clearForm(web) {
            if (web !== undefined) {
                web.name = undefined;
                web.description = undefined;
                model.message = null;
            }
        }

        function renderWebsites (websites) {
            model.websites = websites;
        }
    }
})();