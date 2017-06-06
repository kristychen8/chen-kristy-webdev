(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function  EditWebsiteController ($location, $routeParams, WebsiteService) {
        var model = this;
        model.uid = $routeParams['uid'];
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
            if (model.website.name === "" || model.website.description === "") {
                model.message = "Must have name and description";
            } else {
                WebsiteService
                    .updateWebsite(model.websiteId, model.website)
                    .then(function() {
                        $location.url('/user/'+ model.uid +'/website');
                    });
            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(model.websiteId)
                .then(function() {
                    $location.url('/user/'+ model.uid +'/website');
                });
        }

    }
})();