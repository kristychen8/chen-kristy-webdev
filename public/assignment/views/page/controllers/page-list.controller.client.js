(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function  PageListController ($routeParams, PageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.wid);
        }

        init();

    }
})();