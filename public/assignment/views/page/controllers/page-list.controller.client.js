(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function  PageListController ($routeParams, PageService) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

       PageService
           .findPageByWebsiteId(model.wid)
           .then(function(pages) {
               model.pages = pages;
           });
    }
})();