(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;

        model.uid = $routeParams['uid'];

        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.uid);
        }

        init();

    }

})();