(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function  EditWebsiteController ($location, $routeParams, WebsiteService) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        var web = {};

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.uid);
            model.website = {};
            web = WebsiteService.findWebsiteById(model.websiteId);
            angular.copy(web, model.website);
        }
        init();

        function updateWebsite() {
            if (model.website.name === "" || model.website.description === "") {
                model.message = "Must have name and description";
            } else {
                WebsiteService.updateWebsite(model.websiteId, model.website);
                $location.url('/user/'+ model.uid +'/website');
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.websiteId);
            $location.url('/user/'+ model.uid +'/website');
        }

    }
})();