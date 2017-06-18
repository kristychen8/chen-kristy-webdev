(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController(currentUser, $routeParams, WebsiteService) {
        var model = this;

        model.uid = currentUser._id;

        WebsiteService
            .findWebsitesByUser(model.uid)
            .then(function(websites) {
                model.websites = websites;
            });

    }

})();