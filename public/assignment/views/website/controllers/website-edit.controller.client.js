(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function  EditWebsiteController (currentUser, $location, $routeParams, WebsiteService, $scope) {
        var model = this;
        model.uid = currentUser._id;
        model.websiteId = $routeParams['wid'];

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        WebsiteService
            .findWebsitesByUser(model.uid)
            .then(function(websites) {
                model.websites = websites;
            });
        WebsiteService
            .findWebsiteById(model.websiteId)
            .then(function(website) {
                model.website = website;
            });


        function updateWebsite() {
            $scope.websitepage.submitted = true;
            if (model.website.name === "" || model.website.name === undefined) {
                model.message = "Must have name";
            } else {
                WebsiteService
                    .updateWebsite(model.websiteId, model.website)
                    .then(function() {
                        $location.url('/website');
                    });
            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(model.websiteId)
                .then(function() {
                    $location.url('/website');
                });
        }

    }
})();