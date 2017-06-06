(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        model.uid = $routeParams['uid'];

        WebsiteService
            .findWebsitesByUser(model.uid)
            .then(function(websites) {
                model.websites = websites;
            });

    }

})();